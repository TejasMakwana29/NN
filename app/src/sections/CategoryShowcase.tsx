import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Scale, 
  Gauge, 
  Cpu, 
  CircleDot, 
  Package,
  ArrowRight,
  Check,
  Sparkles
} from 'lucide-react';
import { IMAGES } from '@/lib/productImages';

interface CategoryCard {
  id: string;
  name: string;
  slug: string;
  icon: React.ReactNode;
  description: string;
  features: string[];
  productCount: number;
  priceRange: string;
  image: string;
  color: string;
  gradient: string;
}

const categoryCards: CategoryCard[] = [
  {
    id: 'counter',
    name: 'Counter Scales',
    slug: 'counter',
    icon: <Scale className="w-8 h-8" />,
    description: 'Perfect for retail shops, grocery stores, and commercial establishments',
    features: ['Digital LCD Display', 'Tare Function', 'Auto Power Off', 'Rechargeable Battery'],
    productCount: 5,
    priceRange: '₹2,499 - ₹4,499',
    image: IMAGES.counter,
    color: 'blue',
    gradient: 'from-blue-500 to-blue-700'
  },
  {
    id: 'beam',
    name: 'Beam Scales',
    slug: 'beam',
    icon: <Gauge className="w-8 h-8" />,
    description: 'Traditional mechanical precision scales for accurate measurements',
    features: ['No Power Required', 'Class B & C Options', 'Heavy Duty Build', 'Lifetime Durability'],
    productCount: 10,
    priceRange: '₹1,999 - ₹24,999',
    image: IMAGES.beam,
    color: 'emerald',
    gradient: 'from-emerald-500 to-emerald-700'
  },
  {
    id: 'electronic',
    name: 'Electronic Scales',
    slug: 'electronic',
    icon: <Cpu className="w-8 h-8" />,
    description: 'Modern digital scales with advanced features and LCD displays',
    features: ['High Precision', 'Multiple Units', 'Memory Function', 'Stainless Steel Platform'],
    productCount: 20,
    priceRange: '₹1,299 - ₹34,999',
    image: IMAGES.electronic,
    color: 'violet',
    gradient: 'from-violet-500 to-violet-700'
  },
  {
    id: 'hanging',
    name: 'Hanging Scales',
    slug: 'hanging',
    icon: <CircleDot className="w-8 h-8" />,
    description: 'Spring balance scales for portable and overhead weighing',
    features: ['Portable Design', 'Hook Attachment', 'Circular/Tubular Options', 'Weather Resistant'],
    productCount: 6,
    priceRange: '₹699 - ₹2,499',
    image: IMAGES.hanging,
    color: 'amber',
    gradient: 'from-amber-500 to-amber-700'
  },
  {
    id: 'accessories',
    name: 'Accessories',
    slug: 'accessories',
    icon: <Package className="w-8 h-8" />,
    description: 'Calibration weights, adapters, batteries and spare parts',
    features: ['Calibration Weights', 'Power Adapters', 'Battery Packs', 'Spare Parts'],
    productCount: 5,
    priceRange: '₹499 - ₹4,499',
    image: IMAGES.accessories,
    color: 'rose',
    gradient: 'from-rose-500 to-rose-700'
  }
];

export function CategoryShowcase() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [selectedCard, setSelectedCard] = useState<string | null>(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1] as const
      }
    }
  };

  return (
    <section 
      className="py-24 bg-gradient-to-b from-gray-50 to-white overflow-hidden"
      aria-labelledby="categories-title"
    >
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-full mb-6"
          >
            <Sparkles className="w-5 h-5 text-blue-600" />
            <span className="text-sm font-semibold text-blue-700">Browse by Category</span>
          </motion.div>

          <h2 
            id="categories-title" 
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
          >
            Our <span className="text-gradient">Scale Categories</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover the perfect weighing solution from our comprehensive range 
            of high-quality scales designed for every industry and application.
          </p>
        </motion.div>

        {/* Category Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {categoryCards.map((category, index) => (
            <motion.div
              key={category.id}
              variants={cardVariants}
              onMouseEnter={() => setHoveredCard(category.id)}
              onMouseLeave={() => setHoveredCard(null)}
              onClick={() => setSelectedCard(selectedCard === category.id ? null : category.id)}
              whileTap={{ scale: 0.99 }}
              className={`
                group relative bg-white rounded-3xl overflow-hidden cursor-pointer
                transition-all duration-500 ease-out
                ${hoveredCard === category.id ? 'shadow-2xl -translate-y-2' : 'shadow-lg'}
                ${index === 2 ? 'md:col-span-2 lg:col-span-1' : ''}
              `}
              role="article"
              aria-label={`${category.name} category with ${category.productCount} products`}
            >
              {/* Background gradient on hover */}
              <div className={`
                absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-0 
                group-hover:opacity-5 transition-opacity duration-500
              `} />

              {/* Image Section */}
              <div className="relative h-48 overflow-hidden">
                <motion.img
                  src={category.image}
                  alt={`${category.name} - Weighing scales`}
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                />
                
                {/* Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/20 to-transparent`} />
                
                {/* Category Icon */}
                <div className={`
                  absolute top-4 left-4 w-14 h-14 rounded-2xl 
                  bg-gradient-to-br ${category.gradient} 
                  flex items-center justify-center text-white shadow-lg
                  transform transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3
                `}>
                  {category.icon}
                </div>

                {/* Product Count Badge */}
                <div className="absolute top-4 right-4 px-3 py-1.5 bg-white/90 backdrop-blur-sm rounded-full">
                  <span className="text-sm font-semibold text-gray-800">
                    {category.productCount}+ Products
                  </span>
                </div>

                {/* Title on Image */}
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-2xl font-bold text-white mb-1">
                    {category.name}
                  </h3>
                  <p className="text-sm text-white/80">
                    {category.priceRange}
                  </p>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <p className="text-gray-600 mb-4 line-clamp-2">
                  {category.description}
                </p>

                {/* Features */}
                <ul className="space-y-2 mb-6" role="list" aria-label={`${category.name} features`}>
                  {category.features.map((feature, i) => (
                    <motion.li
                      key={feature}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.1 * i }}
                      className="flex items-center gap-2 text-sm text-gray-700"
                    >
                      <span className={`w-5 h-5 rounded-full bg-gradient-to-br ${category.gradient} flex items-center justify-center flex-shrink-0`}>
                        <Check className="w-3 h-3 text-white" />
                      </span>
                      {feature}
                    </motion.li>
                  ))}
                </ul>

                {/* Action Button */}
                <Link
                  to={`/products/${category.slug}`}
                  className={`
                    w-full py-3.5 rounded-xl font-semibold flex items-center justify-center gap-2
                    bg-gradient-to-r ${category.gradient} text-white
                    transform transition-all duration-300
                    hover:shadow-lg hover:scale-[1.02]
                    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
                  `}
                  aria-label={`Browse ${category.name}`}
                >
                  <span>Browse {category.name}</span>
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>

              {/* Hover shine effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <Link
            to="/products"
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl font-semibold shadow-xl shadow-blue-500/25 hover:shadow-2xl hover:shadow-blue-500/30 hover:scale-105 transition-all duration-300"
          >
            <span>View All Products</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
          <p className="mt-4 text-gray-500">
            Over 45+ products across 5 categories
          </p>
        </motion.div>
      </div>
    </section>
  );
}
