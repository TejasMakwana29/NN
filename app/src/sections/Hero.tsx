import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Award, Users, Globe, TrendingUp, Scale, Phone } from 'lucide-react';
import { IMAGES } from '@/lib/productImages';

// Lightweight counter - single RAF update to avoid 60 setState calls
function AnimatedCounter({ value, suffix = '' }: { value: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let start: number | null = null;
    const duration = 1200;
    const step = (t: number) => {
      if (start == null) start = t;
      const elapsed = t - start;
      const progress = Math.min(elapsed / duration, 1);
      setCount(Math.floor(value * progress));
      if (progress < 1) requestAnimationFrame(step);
    };
    const id = requestAnimationFrame(step);
    return () => cancelAnimationFrame(id);
  }, [value]);
  return <span>{count}{suffix}</span>;
}

const heroSlides = [
  IMAGES.hero,
  IMAGES.counter,
  IMAGES.electronic,
  IMAGES.beam,
  IMAGES.hanging,
];

export function Hero() {
  const [slideIndex, setSlideIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setSlideIndex((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(id);
  }, []);

  const stats = [
    { icon: Award, value: 70, suffix: '+', label: 'Years Experience' },
    { icon: Users, value: 50, suffix: 'K+', label: 'Happy Customers' },
    { icon: Globe, value: null, suffix: 'All Over India', label: 'Service Coverage' },
    { icon: TrendingUp, value: 99, suffix: '.9%', label: 'Accuracy Rate' }
  ];

  const categories = [
    { label: 'Counter Scales', slug: 'counter' },
    { label: 'Beam Scales', slug: 'beam' },
    { label: 'Electronic Scales', slug: 'electronic' },
    { label: 'Hanging Scales', slug: 'hanging' },
    { label: 'Accessories', slug: 'accessories' },
  ];

  return (
    <section 
      className="relative min-h-screen overflow-hidden"
      aria-label="Manish Scale - Premium Weighing Solutions"
    >
      {/* Skip to main content link for accessibility */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      {/* Animated Background */}
      <motion.div 
        className="absolute inset-0 z-0"
      >
        {/* Base gradient */}
        <div className="absolute inset-0 animated-gradient" />
        
        {/* Subtle dot pattern */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #64748b 1px, transparent 0)`,
            backgroundSize: '24px 24px'
          }}
        />
      </motion.div>

      {/* Content */}
      <motion.div 
        className="relative z-10 container mx-auto px-4 pt-24 pb-16 lg:pt-32 lg:pb-24"
      >
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center min-h-[70vh]">
          {/* Left Content */}
          <div className="text-slate-800">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <span className="inline-flex items-center gap-2 px-5 py-2.5 bg-white rounded-full text-sm font-medium border border-slate-200 text-slate-600 shadow-sm mb-6">
                <Scale className="w-4 h-4 text-slate-500" />
                <span>India's Most Trusted Weighing Scale Brand</span>
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              </span>
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6 text-slate-900"
            >
              <span className="block">Manish</span>
              <span className="block text-slate-700">Scale</span>
            </motion.h1>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-xl md:text-2xl text-slate-600 mb-4 font-light"
            >
              Where trust carries weight
            </motion.p>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="text-lg text-slate-600 mb-8 max-w-xl"
            >
              Carrying forward a legacy that began in 1952 with India's first manufacturer of beam scales. 
              Today, we deliver premium weighing solutions trusted by businesses across India with 
              over seven decades of traditional expertise and modern precision.
            </motion.p>

            {/* Category Pills */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-wrap gap-2 mb-8"
              role="list"
              aria-label="Product categories"
            >
              {categories.map((cat, i) => (
                <motion.div
                  key={cat.slug}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6 + i * 0.1 }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Link
                    to={`/products/${cat.slug}`}
                    className="inline-block px-4 py-2.5 bg-white rounded-xl text-sm font-medium text-slate-600 border border-slate-200 hover:bg-slate-800 hover:text-white hover:border-slate-800 transition-all duration-300 cursor-pointer shadow-sm hover:shadow-md"
                    role="listitem"
                  >
                    {cat.label}
                  </Link>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-wrap gap-4"
            >
              <Link
                to="/products"
                className="group inline-flex items-center gap-3 bg-slate-800 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 hover:bg-slate-700 shadow-md hover:shadow-lg"
                aria-label="Explore all weighing scale products"
              >
                <span>Explore Products</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/quote"
                className="inline-flex items-center gap-3 bg-white text-slate-700 px-8 py-4 rounded-xl font-semibold border-2 border-slate-200 transition-all duration-300 hover:border-slate-300 hover:bg-slate-50"
                aria-label="Request a free quote"
              >
                <span>Get Free Quote</span>
                <Phone className="w-5 h-5" />
              </Link>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="mt-8 flex items-center gap-6 text-sm text-slate-500"
            >
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                ISO 9001:2015 Certified
              </span>
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                Registered Trademark
              </span>
            </motion.div>
          </div>

          {/* Right Content - 3D Product Showcase */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="hidden lg:block"
            style={{ perspective: 1000 }}
          >
          <div className="relative">
              {/* Main Card - minimal */}
              <div className="relative bg-white rounded-2xl p-8 border border-slate-200 shadow-lg">
                {/* Featured Badge */}
                <div className="absolute -top-3 -right-3 px-4 py-2 bg-slate-700 text-white rounded-full text-xs font-semibold shadow">
                  BESTSELLER
                </div>

                {/* Product Image Slider */}
                <div className="relative h-72 mb-6 rounded-xl overflow-hidden bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center border border-slate-200 shadow-inner">
                  <motion.img
                    key={slideIndex}
                    src={heroSlides[slideIndex]}
                    alt="Featured weighing scale"
                    className="w-full h-64 object-contain drop-shadow-2xl"
                    loading="eager"
                    decoding="async"
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                  />
                  
                  {/* Floating specs */}
                  {/* Slider dots */}
                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
                    {heroSlides.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setSlideIndex(i)}
                        className={`w-2.5 h-2.5 rounded-full border border-slate-400 ${
                          i === slideIndex ? 'bg-slate-700' : 'bg-white/70'
                        }`}
                        aria-label={`Show slide ${i + 1}`}
                      />
                    ))}
                  </div>
                </div>

                {/* Product Info */}
                <div className="text-center">
  <h3 className="text-2xl font-bold text-slate-800 mt-1 mb-6">
    Our Top Scales Collection
  </h3>
  
  {/* Quick Actions */}
  <div className="flex gap-3">
    <Link
      to="/products"
      className="flex-1 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2"
    >
      View All Products
      <ArrowRight className="w-4 h-4" />
    </Link>
    <Link
      to="/quote"
      className="flex-1 py-3 bg-white border-2 border-slate-200 text-slate-700 hover:bg-slate-50 rounded-xl font-semibold transition-all duration-300"
    >
      Get Quote
    </Link>
  </div>
</div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6"
          role="list"
          aria-label="Company statistics"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.4, delay: 1 + index * 0.1 }}
              className="group relative overflow-hidden bg-white rounded-xl p-6 text-center text-slate-800 border border-slate-200 shadow-sm hover:shadow-md hover:border-slate-300 transition-all duration-300"
              role="listitem"
            >
              <stat.icon className="w-8 h-8 mx-auto mb-3 text-slate-600" aria-hidden="true" />
              
              {/* FIXED ANIMATION LOGIC */}
              <div className="text-4xl font-bold mb-1 text-slate-900">
                {stat.value !== null ? (
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                ) : (
                  <span className="text-3xl">{stat.suffix}</span>
                )}
              </div>
              
              <div className="text-sm text-slate-500">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

      </motion.div>
    </section>
  );
}