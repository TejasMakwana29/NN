import { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Award, Users, Globe, TrendingUp, Scale } from 'lucide-react';
import { IMAGES } from '@/lib/productImages';

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

  // Upgraded vibrant gradient stats
  const stats = [
    { 
      icon: Award, start: 0, end: 70, decimals: 0, suffix: '+', label: 'Years Experience',
      bgClass: 'bg-gradient-to-br from-blue-50 to-white',
      borderClass: 'border-blue-200 hover:border-blue-400 hover:shadow-blue-500/25',
      iconBg: 'bg-gradient-to-br from-blue-500 to-blue-600 shadow-md shadow-blue-500/30',
      iconColor: 'text-white', textColor: 'text-slate-900', labelColor: 'text-blue-700'
    },
    { 
      icon: Users, start: 10, end: 50, decimals: 0, suffix: 'K+', label: 'Happy Customers',
      bgClass: 'bg-gradient-to-br from-emerald-50 to-white',
      borderClass: 'border-emerald-200 hover:border-emerald-400 hover:shadow-emerald-500/25',
      iconBg: 'bg-gradient-to-br from-emerald-500 to-emerald-600 shadow-md shadow-emerald-500/30',
      iconColor: 'text-white', textColor: 'text-slate-900', labelColor: 'text-emerald-700'
    },
    { 
      icon: Globe, start: null, end: null, suffix: 'All Over India', label: 'Service Coverage',
      bgClass: 'bg-gradient-to-br from-amber-50 to-white',
      borderClass: 'border-amber-200 hover:border-amber-400 hover:shadow-amber-500/25',
      iconBg: 'bg-gradient-to-br from-amber-500 to-orange-500 shadow-md shadow-amber-500/30',
      iconColor: 'text-white', textColor: 'text-slate-900', labelColor: 'text-amber-700'
    },
    { 
      icon: TrendingUp, start: 0, end: 99.9, decimals: 1, suffix: '%', label: 'Accuracy Rate',
      bgClass: 'bg-gradient-to-br from-purple-50 to-white',
      borderClass: 'border-purple-200 hover:border-purple-400 hover:shadow-purple-500/25',
      iconBg: 'bg-gradient-to-br from-purple-500 to-purple-600 shadow-md shadow-purple-500/30',
      iconColor: 'text-white', textColor: 'text-slate-900', labelColor: 'text-purple-700'
    }
  ];

  return (
    <section 
      className="relative min-h-screen overflow-hidden"
      aria-label="Manish Scale - Premium Weighing Solutions"
    >
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

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

      <motion.div className="relative z-10 container mx-auto px-4 pt-20 pb-12 lg:pt-24 lg:pb-16">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center min-h-[60vh]">
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
              className="text-lg text-slate-600 mb-8 max-w-xl font-medium leading-relaxed text-justify"
            >
              As <strong className="font-bold text-slate-900">India's leading manufacturer of mechanical, electronic, and hanging scales</strong>, we offer a wide variety of weighing solutions crafted with <strong className="font-bold text-slate-900">exceptional quality</strong>. <strong className="font-bold text-slate-900">Trusted by businesses across India</strong>, we combine <strong className="font-bold text-slate-900">over seven decades of tradition</strong> with a commitment to <strong className="font-bold text-slate-900">complete customer satisfaction</strong>.
            </motion.p>

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

          {/* Right Content */}
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
          className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.4, delay: 1 + index * 0.1 }}
              className={`group relative overflow-hidden rounded-2xl p-6 text-center border shadow-sm hover:-translate-y-1 transition-all duration-300 ${stat.bgClass} ${stat.borderClass}`}
            >
              <div className={`w-14 h-14 ${stat.iconBg} rounded-xl flex items-center justify-center mx-auto mb-5 transition-transform duration-300 group-hover:scale-110`}>
                <stat.icon className={`w-7 h-7 ${stat.iconColor}`} />
              </div>
              <div className={`text-4xl font-black mb-1 ${stat.textColor}`}>
                {stat.end !== null && stat.end !== undefined ? (
                  <AnimatedCounter start={stat.start || 0} end={stat.end} decimals={stat.decimals} suffix={stat.suffix} />
                ) : (
                  <span className={`text-2xl sm:text-3xl ${stat.textColor}`}>{stat.suffix}</span>
                )}
              </div>
              <div className={`text-sm font-bold uppercase tracking-wide ${stat.labelColor}`}>{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}