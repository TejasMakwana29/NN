import { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  Award, 
  Users, 
  Globe, 
  TrendingUp, 
  Scale, 
  Truck, 
  Headphones, 
  Shield, 
  Star, 
  StarHalf, 
  Quote, 
  CheckCircle2 
} from 'lucide-react';
import { IMAGES } from '@/lib/productImages';
import { ProductGrid } from '@/sections/ProductGrid';
import { ProductHierarchy } from '@/sections/ProductHierarchy';
import { CategoryShowcase } from '@/sections/CategoryShowcase';
import { UnitConverter } from '@/sections/UnitConverter';

// --- Hero Section Counter ---
function AnimatedCounter({ start = 0, end, decimals = 0, suffix = '' }: { start?: number; end: number; decimals?: number; suffix?: string }) {
  const [count, setCount] = useState(start);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return; 
    let startTime: number | null = null;
    const duration = 5000; 
    
    const step = (currentTime: number) => {
      if (startTime === null) startTime = currentTime;
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 4);
      setCount(start + (end - start) * easeOut);
      if (progress < 1) requestAnimationFrame(step);
    };
    
    const id = requestAnimationFrame(step);
    return () => cancelAnimationFrame(id);
  }, [start, end, isInView]);
  
  return <span ref={ref}>{count.toFixed(decimals)}{suffix}</span>;
}

const heroSlides = [
  IMAGES.hero,
  IMAGES.counter,
  IMAGES.electronic,
  IMAGES.beam,
  IMAGES.hanging,
];

// --- Data ---
const trustFeatures = [
  { 
    icon: Award, title: 'ISO 9001:2015 Certified', description: 'Meeting international quality standards and certifications',
    bgClass: 'bg-gradient-to-br from-sky-50 to-white', borderClass: 'border-sky-200 hover:border-sky-400 hover:shadow-sky-500/25',
    iconBg: 'bg-gradient-to-br from-sky-400 to-sky-600 shadow-md shadow-sky-500/30', iconColor: 'text-white', titleHover: 'group-hover:text-sky-600'
  },
  { 
    icon: Shield, title: 'Registered Trademark', description: 'Govt. of India Recognized and Registered Trademark',
    bgClass: 'bg-gradient-to-br from-violet-50 to-white', borderClass: 'border-violet-200 hover:border-violet-400 hover:shadow-violet-500/25',
    iconBg: 'bg-gradient-to-br from-violet-400 to-violet-600 shadow-md shadow-violet-500/30', iconColor: 'text-white', titleHover: 'group-hover:text-violet-600'
  },
  { 
    icon: Truck, title: 'GST No. 24ADBPM0391A1Z8', description: 'Registered and compliant manufacturer across India',
    bgClass: 'bg-gradient-to-br from-teal-50 to-white', borderClass: 'border-teal-200 hover:border-teal-400 hover:shadow-teal-500/25',
    iconBg: 'bg-gradient-to-br from-teal-400 to-teal-600 shadow-md shadow-teal-500/30', iconColor: 'text-white', titleHover: 'group-hover:text-teal-600'
  },
  { 
    icon: Headphones, title: 'Dedicated Support', description: 'Expert customer service and technical support team',
    bgClass: 'bg-gradient-to-br from-rose-50 to-white', borderClass: 'border-rose-200 hover:border-rose-400 hover:shadow-rose-500/25',
    iconBg: 'bg-gradient-to-br from-rose-400 to-rose-600 shadow-md shadow-rose-500/30', iconColor: 'text-white', titleHover: 'group-hover:text-rose-600'
  }
];

const testimonials = [
  {
    name: 'Rajesh Patel',
    company: 'Patel Traders, Ahmedabad',
    text: 'Manish Scale has been our trusted supplier for over 10 years. Their counter scales are incredibly accurate and have never let us down.',
    rating: 3.5
  },
  {
    name: 'Priya Sharma',
    company: 'Golden Jewellers, Mumbai',
    text: 'The jewelry scales we purchased have exceptional 0.001g precision. Perfect for our diamond and gold grading work.',
    rating: 5
  },
  {
    name: 'Mohammed Khan',
    company: 'Khan Poultry, Savarkundla',
    text: 'Their electronic poultry scales are water-resistant and easy to clean. Exactly what we needed for our processing unit.',
    rating: 4
  }
];

const clientBrands = [
  { name: 'L&T', image: '/logos/lnt.png' },
  { name: 'Wipro', image: '/logos/wipro.png' },
  { name: 'UPL', image: '/logos/upl.png' },
  { name: 'Adani', image: '/logos/adani.png' },
  { name: 'Metso', image: '/logos/metso.png' },
  { name: 'Hitachi', image: '/logos/hitachi.png' },
  { name: 'Texspin', image: '/logos/texspin.png' }
];

export function Home() {
  const [slideIndex, setSlideIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setSlideIndex((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(id);
  }, []);

  const heroStats = [
    { 
      icon: Award, start: 0, end: 70, decimals: 0, suffix: '+', label: 'Years Experience',
      bgClass: 'bg-gradient-to-br from-blue-50 to-white', borderClass: 'border-blue-200 hover:border-blue-400 hover:shadow-blue-500/25',
      iconBg: 'bg-gradient-to-br from-blue-500 to-blue-600 shadow-md shadow-blue-500/30', iconColor: 'text-white', textColor: 'text-slate-900', labelColor: 'text-blue-700'
    },
    { 
      icon: Users, start: 800, end: 1000, decimals: 0, suffix: '+', label: 'Happy Customers',
      bgClass: 'bg-gradient-to-br from-emerald-50 to-white', borderClass: 'border-emerald-200 hover:border-emerald-400 hover:shadow-emerald-500/25',
      iconBg: 'bg-gradient-to-br from-emerald-500 to-emerald-600 shadow-md shadow-emerald-500/30', iconColor: 'text-white', textColor: 'text-slate-900', labelColor: 'text-emerald-700'
    },
    { 
      icon: Globe, start: null, end: null, suffix: 'All Over India', label: 'Supply Coverage',
      bgClass: 'bg-gradient-to-br from-amber-50 to-white', borderClass: 'border-amber-200 hover:border-amber-400 hover:shadow-amber-500/25',
      iconBg: 'bg-gradient-to-br from-amber-500 to-orange-500 shadow-md shadow-amber-500/30', iconColor: 'text-white', textColor: 'text-slate-900', labelColor: 'text-amber-700'
    },
    { 
      icon: TrendingUp, start: 0, end: 99.9, decimals: 1, suffix: '%', label: 'Accuracy Rate',
      bgClass: 'bg-gradient-to-br from-purple-50 to-white', borderClass: 'border-purple-200 hover:border-purple-400 hover:shadow-purple-500/25',
      iconBg: 'bg-gradient-to-br from-purple-500 to-purple-600 shadow-md shadow-purple-500/30', iconColor: 'text-white', textColor: 'text-slate-900', labelColor: 'text-purple-700'
    }
  ];

  return (
    <main id="main-content">
      {/* Hero Section */}
      <section className="relative min-h-screen overflow-hidden" aria-label="Manish Scale - Premium Weighing Solutions">
        <a href="#main-content" className="skip-link">Skip to main content</a>

        <motion.div className="absolute inset-0 z-0">
          <div className="absolute inset-0 animated-gradient" />
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: `radial-gradient(circle at 1px 1px, #3b82f6 1px, transparent 0)`, backgroundSize: '24px 24px' }} />
        </motion.div>

        <motion.div className="relative z-10 container mx-auto px-4 pt-20 pb-12 lg:pt-24 lg:pb-16">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center min-h-[60vh]">
            
            {/* Left Content */}
            <div className="text-slate-800">
              <motion.div initial={{ opacity: 0, y: 30, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.6, delay: 0.2 }}>
                <span className="inline-flex items-center gap-2 px-5 py-2.5 bg-white rounded-full text-sm font-bold border border-blue-100 text-blue-700 shadow-sm mb-6">
                  <Scale className="w-4 h-4 text-blue-500" />
                  <span>India's Most Trusted Weighing Scale Brand</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                </span>
              </motion.div>

              <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }} className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-2 text-slate-900">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-indigo-700">Manish </span>
                <span className="text-slate-800">Scale</span>
              </motion.h1>

              <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4 }} className="text-xl md:text-2xl text-blue-600 mb-4 font-medium">
                Where trust carries weight
              </motion.p>

              <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.45 }} className="text-lg text-slate-600 mb-8 max-w-xl font-medium leading-relaxed text-justify">
                As <strong className="font-bold text-slate-900">India's leading manufacturer of mechanical, electronic, and hanging scales</strong>, we offer a wide variety of weighing solutions crafted with <strong className="font-bold text-slate-900">exceptional quality</strong>. <strong className="font-bold text-slate-900">Trusted by businesses across India</strong>, we combine <strong className="font-bold text-slate-900">over seven decades of tradition</strong> with a commitment to <strong className="font-bold text-slate-900">complete customer satisfaction</strong>.
              </motion.p>

              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }} className="mt-8 flex flex-wrap items-center gap-6 text-lg md:text-xl font-bold text-slate-700">
                <span className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)]" />
                  ISO 9001:2015 Certified
                </span>
                <span className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.6)]" />
                  Registered Trademark
                </span>
              </motion.div>
            </div>

            {/* Right Content - 3D Product Showcase */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="w-full"
              style={{ perspective: 1000 }}
            >
              <div className="relative">
                <div className="relative bg-white/80 backdrop-blur-xl rounded-2xl p-6 md:p-8 border border-white shadow-xl shadow-blue-900/10">
                  <div className="relative h-[300px] md:h-[400px] rounded-xl overflow-hidden bg-gradient-to-br from-blue-50/50 to-indigo-50 flex items-center justify-center border border-blue-100/50 shadow-inner">
                    <motion.img
                      key={slideIndex}
                      src={heroSlides[slideIndex]}
                      alt="Featured weighing scale"
                      className="w-full h-[240px] md:h-[320px] object-contain drop-shadow-2xl"
                      loading="eager"
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5 }}
                    />
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                      {heroSlides.map((_, i) => (
                        <button
                          key={i}
                          onClick={() => setSlideIndex(i)}
                          className={`w-2.5 h-2.5 rounded-full border border-blue-300 transition-all ${
                            i === slideIndex ? 'bg-blue-600 w-4' : 'bg-white/70 hover:bg-white'
                          }`}
                          aria-label={`Show slide ${i + 1}`}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="text-center mt-6">
                    <h3 className="text-xl md:text-2xl font-bold text-slate-800">
                      Our Top Scales Collection
                    </h3>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Stats Bar */}
          <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.9 }} className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {heroStats.map((stat, index) => (
              <motion.div key={stat.label} initial={{ opacity: 0, y: 20, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.4, delay: 1 + index * 0.1 }} className={`group relative overflow-hidden rounded-2xl p-4 md:p-6 text-center border shadow-sm hover:-translate-y-1 transition-all duration-300 ${stat.bgClass} ${stat.borderClass}`}>
                <div className={`w-12 h-12 md:w-14 md:h-14 ${stat.iconBg} rounded-xl flex items-center justify-center mx-auto mb-3 md:mb-5 transition-transform duration-300 group-hover:scale-110`}>
                  <stat.icon className={`w-6 h-6 md:w-7 md:h-7 ${stat.iconColor}`} />
                </div>
                <div className={`text-2xl md:text-4xl font-black mb-1 ${stat.textColor}`}>
                  {stat.end !== null && stat.end !== undefined ? (
                    <AnimatedCounter start={stat.start || 0} end={stat.end} decimals={stat.decimals} suffix={stat.suffix} />
                  ) : (
                    <span className={`text-xl md:text-3xl ${stat.textColor}`}>{stat.suffix}</span>
                  )}
                </div>
                <div className={`text-xs md:text-sm font-bold uppercase tracking-wide ${stat.labelColor}`}>{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* Trust Features Section */}
      <section className="py-12 bg-white relative overflow-hidden" aria-labelledby="features-title">
        <div className="container mx-auto px-4 relative">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 border border-blue-100 text-blue-700 rounded-full text-sm font-semibold mb-4 shadow-sm">
              <CheckCircle2 className="w-4 h-4 text-blue-600" />
              Why Choose Manish Scale
            </span>
            <h2 id="features-title" className="text-3xl md:text-4xl font-bold text-slate-900">
              Trusted by <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 font-bold">50,000+ Businesses</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {trustFeatures.map((feature, index) => (
              <motion.div key={feature.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.1 }} whileHover={{ y: -4, transition: { duration: 0.2 } }} className={`group relative p-6 md:p-8 rounded-2xl border shadow-sm hover:shadow-xl transition-all duration-300 ${feature.bgClass} ${feature.borderClass}`}>
                <div className="relative">
                  <div className={`w-12 h-12 md:w-14 md:h-14 ${feature.iconBg} rounded-xl flex items-center justify-center mb-4 md:mb-6 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3 border border-white/50`}>
                    <feature.icon className={`w-6 h-6 md:w-7 md:h-7 ${feature.iconColor} group-hover:text-white transition-colors`} aria-hidden="true" />
                  </div>
                  <h3 className={`text-lg md:text-xl font-bold text-slate-900 mb-2 md:mb-3 ${feature.titleHover} transition-colors`}>{feature.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Product Hierarchy */}
      <ProductHierarchy />

      {/* Category Showcase */}
      <CategoryShowcase />
      
      {/* Top Products Grid */}
      <ProductGrid 
        title="Our Top Products"
        subtitle="Explore our best-selling weighing scales trusted by businesses nationwide"
        productIds={['hc-100', 'epl-multi', 'ht-multi', 'ett-30']}
      />

      {/* Testimonials Section */}
      <section className="py-16 bg-gray-50" aria-labelledby="testimonials-title">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-amber-100 text-amber-800 rounded-full text-sm font-semibold mb-4 border border-amber-200">
              <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
              Customer Reviews
            </span>
            <h2 id="testimonials-title" className="text-3xl md:text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              What Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 font-bold">Customers Say</span>
            </h2>
            <p className="text-lg md:text-xl text-slate-600">
              Trusted by thousands of businesses across India
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div key={testimonial.name} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.1 }} whileHover={{ y: -4, boxShadow: '0 20px 25px -5px rgba(59, 130, 246, 0.1)' }} className="group relative bg-white rounded-2xl p-6 md:p-8 border border-slate-100 shadow-md hover:border-blue-200 transition-all duration-300 flex flex-col">
                <Quote className="absolute top-6 right-6 w-8 h-8 md:w-10 md:h-10 text-blue-50 group-hover:text-blue-100 transition-colors" aria-hidden="true" />
                
                <div className="flex gap-1 mb-4" role="img" aria-label={`${testimonial.rating} out of 5 stars`}>
                  {[...Array(5)].map((_, i) => {
                    if (testimonial.rating >= i + 1) return <Star key={i} className="w-4 h-4 md:w-5 md:h-5 text-amber-400 fill-amber-400" />;
                    else if (testimonial.rating > i) return <StarHalf key={i} className="w-4 h-4 md:w-5 md:h-5 text-amber-400 fill-amber-400" />;
                    else return <Star key={i} className="w-4 h-4 md:w-5 md:h-5 text-gray-200" />;
                  })}
                </div>
                
                <p className="text-slate-700 text-base md:text-lg mb-6 md:mb-8 leading-relaxed flex-1">"{testimonial.text}"</p>
                
                <div className="flex items-center gap-4 mt-auto">
                  <div>
                    <p className="font-bold text-slate-900">{testimonial.name}</p>
                    <p className="text-xs md:text-sm font-medium text-blue-600">{testimonial.company}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <style>
            {`
              @keyframes seamless-scroll {
                0% { 
                  transform: translate3d(0, 0, 0); 
                  -webkit-transform: translate3d(0, 0, 0); 
                }
                100% { 
                  transform: translate3d(-100%, 0, 0); 
                  -webkit-transform: translate3d(-100%, 0, 0); 
                }
              }
              .animate-seamless-scroll {
                animation: seamless-scroll 35s linear infinite;
                -webkit-animation: seamless-scroll 35s linear infinite;
                will-change: transform;
                transform: translateZ(0);
                -webkit-transform: translateZ(0);
                backface-visibility: hidden;
                perspective: 1000px;
              }
            `}
          </style>

          {/* Seamless Image Brand Logos */}
          <motion.div className="mt-16 md:mt-20 overflow-hidden relative w-full pt-8 md:pt-10 border-t border-slate-200">
            <span className="text-xs md:text-sm font-bold uppercase tracking-widest text-center block mb-6 md:mb-8 text-slate-400">Trusted by leading brands</span>
            
            <div className="flex w-full overflow-hidden flex-nowrap">
              <div className="flex items-center flex-nowrap animate-seamless-scroll">
                {clientBrands.map((brand, i) => (
                  <div key={i} className="flex-shrink-0 w-24 h-12 md:w-32 md:h-16 flex items-center justify-center mx-6 md:mx-12">
                    <img 
                      src={brand.image} alt={`${brand.name} logo`} className="max-w-full max-h-full object-contain"
                      onError={(e) => { (e.target as HTMLElement).style.display = 'none'; e.currentTarget.parentElement!.innerHTML = `<span class="text-xl md:text-2xl font-bold text-slate-400">${brand.name}</span>`; }}
                    />
                  </div>
                ))}
              </div>

              <div className="flex items-center flex-nowrap animate-seamless-scroll" aria-hidden="true">
                {clientBrands.map((brand, i) => (
                  <div key={`dup1-${i}`} className="flex-shrink-0 w-24 h-12 md:w-32 md:h-16 flex items-center justify-center mx-6 md:mx-12">
                    <img 
                      src={brand.image} alt={`${brand.name} logo`} className="max-w-full max-h-full object-contain"
                      onError={(e) => { (e.target as HTMLElement).style.display = 'none'; e.currentTarget.parentElement!.innerHTML = `<span class="text-xl md:text-2xl font-bold text-slate-400">${brand.name}</span>`; }}
                    />
                  </div>
                ))}
              </div>

              <div className="flex items-center flex-nowrap animate-seamless-scroll" aria-hidden="true">
                {clientBrands.map((brand, i) => (
                  <div key={`dup2-${i}`} className="flex-shrink-0 w-24 h-12 md:w-32 md:h-16 flex items-center justify-center mx-6 md:mx-12">
                    <img 
                      src={brand.image} alt={`${brand.name} logo`} className="max-w-full max-h-full object-contain"
                      onError={(e) => { (e.target as HTMLElement).style.display = 'none'; e.currentTarget.parentElement!.innerHTML = `<span class="text-xl md:text-2xl font-bold text-slate-400">${brand.name}</span>`; }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 relative overflow-hidden bg-gradient-to-br from-blue-900 via-indigo-900 to-slate-900" aria-labelledby="cta-title">
        <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: `radial-gradient(circle at 1px 1px, #fff 1px, transparent 0)`, backgroundSize: '32px 32px' }} />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-blue-500/20 blur-[120px] rounded-full pointer-events-none" />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-4xl mx-auto text-center">
            <motion.div initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 200 }} className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center mx-auto mb-6 md:mb-8 shadow-lg shadow-blue-500/30 border border-blue-400/50">
              <Award className="w-8 h-8 md:w-10 md:h-10 text-white" />
            </motion.div>

            <h2 id="cta-title" className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-4 md:mb-6">
              Ready to Get Your <span className="text-amber-400 font-semibold block md:inline mt-2 md:mt-0">Perfect Scale?</span>
            </h2>
            <p className="text-lg md:text-xl text-blue-100/80 mb-8 md:mb-10 max-w-2xl mx-auto">
              Contact us today for a free consultation and quote. Our experts will help you 
              find the ideal weighing solution for your business needs.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }} className="w-full sm:w-auto">
                <Link to="/quote" className="group flex items-center justify-center gap-3 px-8 py-4 md:px-10 md:py-5 bg-white text-blue-800 rounded-xl font-bold text-base md:text-lg shadow-xl shadow-white/10 hover:bg-blue-50 transition-all duration-300 w-full">
                  <span>Request Free Quote</span>
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </motion.div>
              <motion.a href="tel:+919284405090" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }} className="flex items-center justify-center gap-3 px-8 py-4 md:px-10 md:py-5 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl font-bold text-base md:text-lg shadow-lg hover:shadow-xl hover:shadow-orange-500/20 transition-all duration-300 border-none w-full sm:w-auto">
                <span>Call: +91 92844 05090</span>
              </motion.a>
            </div>

            <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {[
                { label: 'Years Experience', value: '70+' },
                { label: 'Happy Customers', value: '1000+' },
                { label: 'Supply Coverage', value: 'All Over India' },
                { label: 'Accuracy Rate', value: '99.9%' }
              ].map((stat, i) => (
                <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 * i }} className="text-center p-3 md:p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
                  <div className="text-2xl md:text-4xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-xs md:text-sm font-medium text-blue-200">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <UnitConverter />
    </main>
  );
}