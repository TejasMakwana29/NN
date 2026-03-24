import { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Award, Users, Globe, TrendingUp, Scale, Phone } from 'lucide-react';
import { IMAGES } from '@/lib/productImages';

function AnimatedCounter({ start = 0, end, decimals = 0, suffix = '' }: { start?: number; end: number; decimals?: number; suffix?: string }) {
  const [count, setCount] = useState(start);
  const ref = useRef(null);
  
  // This hook ensures the animation only starts when the user scrolls to it
  // and will reset/replay whenever the page is refreshed.
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return; // Wait until element is visible on screen

    let startTime: number | null = null;
    const duration = 5000; // 5 seconds animation duration
    
    const step = (currentTime: number) => {
      if (startTime === null) startTime = currentTime;
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function (easeOutQuart) for a smooth slowdown at the end
      const easeOut = 1 - Math.pow(1 - progress, 4);
      
      setCount(start + (end - start) * easeOut);
      
      if (progress < 1) {
        requestAnimationFrame(step);
      }
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

export function Hero() {
  const [slideIndex, setSlideIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setSlideIndex((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(id);
  }, []);

  const stats = [
    { icon: Award, start: 0, end: 70, decimals: 0, suffix: '+', label: 'Years Experience' },
    { icon: Users, start: 10, end: 50, decimals: 0, suffix: 'K+', label: 'Happy Customers' },
    { icon: Globe, start: null, end: null, suffix: 'All Over India', label: 'Service Coverage' },
    { icon: TrendingUp, start: 0, end: 99.9, decimals: 1, suffix: '%', label: 'Accuracy Rate' }
  ];

  return (
    <section 
      className="relative min-h-screen overflow-hidden"
      aria-label="Manish Scale - Premium Weighing Solutions"
    >
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      {/* Animated Colorful Background */}
      <motion.div className="absolute inset-0 z-0">
        <div className="absolute inset-0 animated-gradient" />
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #3b82f6 1px, transparent 0)`,
            backgroundSize: '24px 24px'
          }}
        />
      </motion.div>

      {/* Content */}
      <motion.div className="relative z-10 container mx-auto px-4 pt-24 pb-16 lg:pt-32 lg:pb-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center min-h-[70vh]">
          {/* Left Content */}
          <div className="text-slate-800">
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <span className="inline-flex items-center gap-2 px-5 py-2.5 bg-white rounded-full text-sm font-bold border border-blue-100 text-blue-700 shadow-sm mb-6">
                <Scale className="w-4 h-4 text-blue-500" />
                <span>India's Most Trusted Weighing Scale Brand</span>
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-2 text-slate-900"
            >
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-indigo-700">Manish </span>
              <span className="text-slate-800">Scale</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-xl md:text-2xl text-blue-600 mb-4 font-medium"
            >
              Where trust carries weight
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="text-lg text-slate-600 mb-8 max-w-xl font-medium leading-relaxed"
            >
              Carrying forward a legacy that began in 1950 with India's first manufacturer of beam scales. 
              Today, we deliver premium weighing solutions trusted by businesses across India with 
              over seven decades of traditional expertise and modern precision.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-wrap gap-4"
            >
              <Link
                to="/products"
                className="group inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-xl font-bold transition-all duration-300 shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 hover:scale-[1.02]"
              >
                <span>Explore Products</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/quote"
                className="inline-flex items-center gap-3 bg-white text-blue-700 px-8 py-4 rounded-xl font-bold border-2 border-blue-100 transition-all duration-300 hover:border-blue-300 hover:bg-blue-50 hover:scale-[1.02]"
              >
                <span>Get Free Quote</span>
                <Phone className="w-5 h-5 text-emerald-500" />
              </Link>
            </motion.div>

            {/* ENLARGED CERTIFICATION SECTION */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="mt-8 flex flex-wrap items-center gap-6 text-lg md:text-xl font-bold text-slate-700"
            >
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
            className="hidden lg:block"
            style={{ perspective: 1000 }}
          >
            <div className="relative">
              <div className="relative bg-white/80 backdrop-blur-xl rounded-2xl p-8 border border-white shadow-xl shadow-blue-900/10">

                <div className="relative h-72 mb-6 rounded-xl overflow-hidden bg-gradient-to-br from-blue-50/50 to-indigo-50 flex items-center justify-center border border-blue-100/50 shadow-inner">
                  <motion.img
                    key={slideIndex}
                    src={heroSlides[slideIndex]}
                    alt="Featured weighing scale"
                    className="w-full h-64 object-contain drop-shadow-2xl"
                    loading="eager"
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                  />
                  
                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
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

                <div className="text-center">
                  <h3 className="text-2xl font-bold text-slate-800 mt-1 mb-6">
                    Our Top Scales Collection
                  </h3>
                  
                  <div className="flex gap-3">
                    <Link
                      to="/products"
                      className="flex-1 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl font-bold transition-all duration-300 flex items-center justify-center gap-2 shadow-md hover:shadow-lg hover:shadow-blue-500/25"
                    >
                      View All Products
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                    <Link
                      to="/quote"
                      className="flex-1 py-3 bg-white border-2 border-blue-100 text-blue-700 hover:bg-blue-50 hover:border-blue-300 rounded-xl font-bold transition-all duration-300"
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
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.4, delay: 1 + index * 0.1 }}
              className="group relative overflow-hidden bg-white/80 backdrop-blur-md rounded-2xl p-6 text-center border border-blue-50 shadow-sm hover:shadow-xl hover:shadow-blue-500/10 hover:border-blue-100 transition-all duration-300"
            >
              <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-100 transition-colors">
                <stat.icon className="w-6 h-6 text-blue-600" />
              </div>
              <div className="text-4xl font-black mb-1 text-slate-800">
                {stat.end !== null && stat.end !== undefined ? (
                  <AnimatedCounter start={stat.start || 0} end={stat.end} decimals={stat.decimals} suffix={stat.suffix} />
                ) : (
                  <span className="text-2xl sm:text-3xl bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-indigo-700">{stat.suffix}</span>
                )}
              </div>
              <div className="text-sm font-semibold text-slate-500 uppercase tracking-wide">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}