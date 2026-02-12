import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Award, Users, Globe, TrendingUp, Scale, Phone, ChevronDown } from 'lucide-react';
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

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start']
  });

  // Light parallax - reduced range to avoid jank
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '15%']);
  const opacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);

  const stats = [
    { icon: Award, value: 30, suffix: '+', label: 'Years Experience' },
    { icon: Users, value: 10, suffix: 'K+', label: 'Happy Customers' },
    { icon: Globe, value: 25, suffix: '+', label: 'States Served' },
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
      ref={containerRef} 
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
        style={{ y: backgroundY }}
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
        style={{ opacity }}
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
              Precision You Can Trust
            </motion.p>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="text-lg text-slate-600 mb-8 max-w-xl"
            >
              From micro precision jewelry scales to heavy-duty industrial platforms, 
              we manufacture premium weighing solutions trusted by over 10,000+ businesses 
              across India since 1994.
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
                Free Shipping India-wide
              </span>
            </motion.div>
          </div>

          {/* Right Content - 3D Product Showcase */}
          <motion.div
            initial={{ opacity: 0, x: 50, rotateY: -10 }}
            animate={{ opacity: 1, x: 0, rotateY: 0 }}
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

                {/* Product Image */}
                <div className="relative h-72 mb-6 rounded-xl overflow-hidden bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center border border-slate-200 shadow-inner">
                  <img
                    src={IMAGES.hero}
                    alt="Premium Digital Table Top Scale - 30kg capacity"
                    className="w-full h-64 object-contain drop-shadow-2xl"
                    loading="eager"
                    decoding="async"
                  />
                  
                  {/* Floating specs */}
                  <div className="absolute left-4 top-4 px-3 py-1.5 bg-slate-700 text-white text-xs font-medium rounded-lg">
                    LCD Display
                  </div>
                  <div className="absolute right-4 bottom-4 px-3 py-1.5 bg-slate-600 text-white text-xs font-medium rounded-lg">
                    High Precision
                  </div>
                </div>

                {/* Product Info */}
                <div className="text-center">
                  <span className="text-sm text-slate-500 uppercase tracking-wider">Electronic Scale</span>
                  <h3 className="text-2xl font-bold text-slate-800 mt-1 mb-3">
                    Premium Table Top Scale
                  </h3>
                  
                  {/* Specs */}
                  <div className="flex justify-center gap-6 mb-4 text-sm">
                    <span className="flex items-center gap-2 text-slate-600">
                      <Scale className="w-4 h-4 text-slate-500" />
                      <span>30kg Capacity</span>
                    </span>
                    <span className="flex items-center gap-2 text-slate-600">
                      <TrendingUp className="w-4 h-4 text-slate-500" />
                      <span>±1g Precision</span>
                    </span>
                  </div>

                  {/* Price */}
                  <div className="flex items-center justify-center gap-3 mb-4">
                    <span className="text-4xl font-bold text-slate-800">
                      ₹4,999
                    </span>
                    <span className="text-xl text-slate-400 line-through">
                      ₹6,999
                    </span>
                    <span className="px-2 py-1 bg-slate-100 text-slate-700 text-sm font-semibold rounded">
                      -29%
                    </span>
                  </div>

                  {/* Quick Actions */}
                  <div className="flex gap-3">
                    <Link
                      to="/product/ett-30"
                      className="flex-1 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2"
                    >
                      View Details
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
              <div className="text-4xl font-bold mb-1 text-slate-900">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-sm text-slate-500">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center text-slate-400">
          <span className="text-sm mb-2">Scroll to explore</span>
          <ChevronDown className="w-6 h-6" />
        </div>
      </motion.div>
    </section>
  );
}
