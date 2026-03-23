import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Scale, 
  Factory, 
  ShoppingBag, 
  Utensils, 
  Briefcase,
  Dumbbell,
  Microscope,
  Check,
  ChevronLeft
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface WizardStep {
  id: number;
  title: string;
  description: string;
}

interface Recommendation {
  category: string;
  type: string;
  capacity: string;
  precision: string;
  reason: string;
}

const steps: WizardStep[] = [
  {
    id: 1,
    title: 'What are you weighing?',
    description: 'Select your application type'
  },
  {
    id: 2,
    title: 'Maximum Weight?',
    description: 'Enter the maximum weight you need to measure'
  },
  {
    id: 3,
    title: 'Your Recommendation',
    description: 'Based on your requirements'
  }
];

const applicationOptions = [
  { id: 'retail', label: 'Retail/Shop', icon: ShoppingBag, description: 'Grocery, counter, general retail' },
  { id: 'industrial', label: 'Industrial', icon: Factory, description: 'Warehouse, shipping, manufacturing' },
  { id: 'food', label: 'Food/Poultry', icon: Utensils, description: 'Kitchen, meat, chicken weighing' },
  { id: 'jewelry', label: 'Jewelry/Precious', icon: Briefcase, description: 'Gold, diamonds, gems' },
  { id: 'health', label: 'Health/Fitness', icon: Dumbbell, description: 'Body weight, gym use' },
  { id: 'lab', label: 'Laboratory', icon: Microscope, description: 'Scientific, research, micro' }
];

const weightRanges = [
  { value: '1', label: 'Up to 1 kg', description: 'Small items, jewelry' },
  { value: '5', label: '1 - 5 kg', description: 'Kitchen, small packages' },
  { value: '30', label: '5 - 30 kg', description: 'Retail, counter scales' },
  { value: '100', label: '30 - 100 kg', description: 'Platform, industrial' },
  { value: '500', label: '100 - 500 kg', description: 'Heavy duty platforms' },
  { value: '1000', label: 'Above 500 kg', description: 'Extra heavy capacity' }
];

export function FindYourScaleWizard() {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedApplication, setSelectedApplication] = useState('');
  const [, setSelectedWeight] = useState('');
  const [recommendation, setRecommendation] = useState<Recommendation | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleApplicationSelect = (appId: string) => {
    setSelectedApplication(appId);
    setTimeout(() => setCurrentStep(2), 300);
  };

  const recommendationTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleWeightSelect = (weight: string) => {
    setSelectedWeight(weight);
    setIsLoading(true);
    if (recommendationTimerRef.current) clearTimeout(recommendationTimerRef.current);
    // Brief feedback only - no long delay that causes perceived hang
    recommendationTimerRef.current = setTimeout(() => {
      const rec = generateRecommendation(selectedApplication, weight);
      setRecommendation(rec);
      setIsLoading(false);
      setCurrentStep(3);
      recommendationTimerRef.current = null;
    }, 350);
  };

  useEffect(() => () => {
    if (recommendationTimerRef.current) clearTimeout(recommendationTimerRef.current);
  }, []);

  const generateRecommendation = (app: string, weight: string): Recommendation => {
    const weightNum = parseInt(weight);
    
    const recommendations: Record<string, Record<string, Recommendation>> = {
      retail: {
        '1': { category: 'Electronic Scales', type: 'Table Top', capacity: '3kg', precision: '0.5g', reason: 'Perfect for small retail items' },
        '5': { category: 'Counter Scales', type: 'Standard', capacity: '5kg', precision: '1g', reason: 'Ideal for grocery counters' },
        '30': { category: 'Counter Scales', type: 'Standard', capacity: '20kg', precision: '5g', reason: 'Best for busy retail shops' },
        '100': { category: 'Electronic Scales', type: 'Platform', capacity: '100kg', precision: '50g', reason: 'For larger retail items' }
      },
      industrial: {
        '30': { category: 'Electronic Scales', type: 'Platform', capacity: '50kg', precision: '20g', reason: 'Compact industrial solution' },
        '100': { category: 'Electronic Scales', type: 'Platform', capacity: '100kg', precision: '50g', reason: 'Standard industrial platform' },
        '500': { category: 'Electronic Scales', type: 'Platform', capacity: '500kg', precision: '200g', reason: 'Heavy duty industrial use' },
        '1000': { category: 'Beam Scales', type: 'Heavy Duty', capacity: '1 Tonne', precision: '100g', reason: 'Maximum capacity needed' }
      },
      food: {
        '1': { category: 'Electronic Scales', type: 'Kitchen', capacity: '3kg', precision: '1g', reason: 'Perfect for recipe accuracy' },
        '5': { category: 'Electronic Scales', type: 'Kitchen', capacity: '5kg', precision: '1g', reason: 'For larger kitchen batches' },
        '30': { category: 'Electronic Scales', type: 'Poultry', capacity: '20kg', precision: '10g', reason: 'Water-resistant for wet environments' },
        '100': { category: 'Electronic Scales', type: 'Poultry', capacity: '50kg', precision: '20g', reason: 'For bulk food processing' }
      },
      jewelry: {
        '1': { category: 'Electronic Scales', type: 'Jewellery', capacity: '100g', precision: '0.001g', reason: 'Ultra-high precision for gems' },
        '5': { category: 'Electronic Scales', type: 'Jewellery', capacity: '500g', precision: '0.01g', reason: 'For larger jewelry pieces' }
      },
      health: {
        '1': { category: 'Electronic Scales', type: 'Kitchen', capacity: '5kg', precision: '1g', reason: 'For dietary tracking' },
        '100': { category: 'Electronic Scales', type: 'Bathroom', capacity: '180kg', precision: '100g', reason: 'Professional body weight scale' }
      },
      lab: {
        '1': { category: 'Electronic Scales', type: 'Micro', capacity: '100g', precision: '0.0001g', reason: 'Laboratory-grade precision' },
        '5': { category: 'Electronic Scales', type: 'Micro', capacity: '200g', precision: '0.0001g', reason: 'Extended range micro scale' }
      }
    };

    const appRecs = recommendations[app] || recommendations.retail;
    return appRecs[weight] || { 
      category: 'Electronic Scales', 
      type: 'Table Top', 
      capacity: `${weightNum}kg`, 
      precision: '1g', 
      reason: 'General purpose recommendation' 
    };
  };

  const resetWizard = () => {
    setCurrentStep(1);
    setSelectedApplication('');
    setSelectedWeight('');
    setRecommendation(null);
  };
 
  return (
    <section className="py-16 bg-gradient-to-br from-[#f5f7fa] to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block px-4 py-2 bg-blue-600/10 text-blue-600 rounded-full text-sm font-medium mb-4">
              Smart Finder
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Find Your Perfect Scale
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Answer a few simple questions and we'll recommend the best weighing scale 
              for your specific needs.
            </p>
          </motion.div>
        </div>

        {/* Wizard Container */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
          {/* Progress Steps */}
          <div className="flex items-center justify-center mb-8">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full font-semibold transition-all duration-300 ${
                  currentStep >= step.id 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-200 text-gray-500'
                }`}>
                  {currentStep > step.id ? (
                    <Check className="w-5 h-5" />
                  ) : (
                    step.id
                  )}
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-16 md:w-24 h-1 mx-2 transition-all duration-300 ${
                    currentStep > step.id ? 'bg-blue-600' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>

          {/* Step Content */}
          <div className="bg-white rounded-2xl shadow-xl p-6 md:p-10 min-h-[400px]">
            <AnimatePresence mode="wait">
              {/* Step 1: Application Selection */}
              {currentStep === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.4 }}
                >
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">
                    {steps[0].title}
                  </h3>
                  <p className="text-gray-600 mb-8">{steps[0].description}</p>

                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {applicationOptions.map((option) => (
                      <button
                        key={option.id}
                        onClick={() => handleApplicationSelect(option.id)}
                        className={`p-6 rounded-xl border-2 text-left transition-all duration-300 hover:scale-105 ${
                          selectedApplication === option.id
                            ? 'border-blue-600 bg-blue-600/5'
                            : 'border-gray-200 hover:border-blue-600/50'
                        }`}
                      >
                        <option.icon className={`w-8 h-8 mb-3 ${
                          selectedApplication === option.id ? 'text-blue-600' : 'text-gray-400'
                        }`} />
                        <h4 className="font-semibold text-gray-800 mb-1">{option.label}</h4>
                        <p className="text-sm text-gray-500">{option.description}</p>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Step 2: Weight Selection */}
              {currentStep === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.4 }}
                >
                  <button
                    onClick={() => setCurrentStep(1)}
                    className="flex items-center gap-2 text-gray-500 hover:text-blue-600 mb-6 transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5" />
                    Back
                  </button>

                  <h3 className="text-2xl font-bold text-gray-800 mb-2">
                    {steps[1].title}
                  </h3>
                  <p className="text-gray-600 mb-8">{steps[1].description}</p>

                  {isLoading ? (
                    <div className="flex flex-col items-center justify-center py-12">
                      <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4" />
                      <p className="text-gray-600">Finding the best scale for you...</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {weightRanges.map((range) => (
                        <button
                          key={range.value}
                          onClick={() => handleWeightSelect(range.value)}
                          className="p-5 rounded-xl border-2 border-gray-200 text-left transition-all duration-300 hover:border-blue-600 hover:bg-blue-600/5 hover:scale-105"
                        >
                          <Scale className="w-6 h-6 text-blue-600 mb-2" />
                          <h4 className="font-semibold text-gray-800">{range.label}</h4>
                          <p className="text-sm text-gray-500">{range.description}</p>
                        </button>
                      ))}
                    </div>
                  )}
                </motion.div>
              )}

              {/* Step 3: Recommendation */}
              {currentStep === 3 && recommendation && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.4 }}
                >
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">
                    {steps[2].title}
                  </h3>
                  <p className="text-gray-600 mb-8">{steps[2].description}</p>

                  <div className="bg-gradient-to-br from-[#0056b3]/5 to-[#28a745]/5 rounded-xl p-8 mb-6">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                        <Scale className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h4 className="text-xl font-bold text-gray-800">
                          {recommendation.category}
                        </h4>
                        <p className="text-blue-600 font-medium">{recommendation.type}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4 mb-6">
                      <div className="text-center p-4 bg-white rounded-lg">
                        <p className="text-sm text-gray-500 mb-1">Capacity</p>
                        <p className="text-lg font-bold text-gray-800">{recommendation.capacity}</p>
                      </div>
                      <div className="text-center p-4 bg-white rounded-lg">
                        <p className="text-sm text-gray-500 mb-1">Precision</p>
                        <p className="text-lg font-bold text-gray-800">{recommendation.precision}</p>
                      </div>
                      <div className="text-center p-4 bg-white rounded-lg">
                        <p className="text-sm text-gray-500 mb-1">Warranty</p>
                        <p className="text-lg font-bold text-gray-800">1 Year</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-2 text-gray-600">
                      <Check className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                      <p>{recommendation.reason}</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-4">
                    <Link
                      to={`/products/${recommendation.category.toLowerCase().replace(' ', '-')}`}
                      className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold text-center transition-all duration-300 hover:scale-105 hover:shadow-lg"
                    >
                      View Products
                    </Link>
                    <Link
                      to="/quote"
                      className="flex-1 bg-emerald-600 text-white px-6 py-3 rounded-lg font-semibold text-center transition-all duration-300 hover:scale-105 hover:shadow-lg"
                    >
                      Request Quote
                    </Link>
                    <button
                      onClick={resetWizard}
                      className="px-6 py-3 border-2 border-gray-300 rounded-lg font-semibold text-gray-600 hover:border-blue-600 hover:text-blue-600 transition-all duration-300"
                    >
                      Start Over
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
