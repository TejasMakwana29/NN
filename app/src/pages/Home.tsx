import { Hero } from '@/sections/Hero';
import { ProductGrid } from '@/sections/ProductGrid';
import { ProductHierarchy } from '@/sections/ProductHierarchy';
import { CategoryShowcase } from '@/sections/CategoryShowcase';
import { UnitConverter } from '@/sections/UnitConverter';
import { motion } from 'framer-motion';
import { Award, Truck, Headphones, Shield, Star, Quote, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const features = [
  { icon: Award, title: 'ISO 9001:2015 Certified', description: 'Meeting international quality standards and certifications' },
  { icon: Shield, title: 'Registered Trademark', description: 'Govt. of India Recognized and Registered Trademark' },
  { icon: Truck, title: 'GST No. 24ADBPM0391A1Z8', description: 'Registered and compliant manufacturer across India' },
  { icon: Headphones, title: 'Dedicated Support', description: 'Expert customer service and technical support team' }
];

const avatarPlaceholder = 'data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" viewBox="0 0 56 56"><circle cx="28" cy="28" r="28" fill="%23e2e8f0"/><circle cx="28" cy="22" r="10" fill="%2394a3b8"/><path fill="%2394a3b8" d="M8 56c0-11 8.95-20 20-20s20 9 20 20H8z"/></svg>');

const testimonials = [
  {
    name: 'Rajesh Patel',
    company: 'Patel Traders, Ahmedabad',
    text: 'Manish Scale has been our trusted supplier for over 10 years. Their counter scales are incredibly accurate and have never let us down.',
    rating: 5,
    image: avatarPlaceholder
  },
  {
    name: 'Priya Sharma',
    company: 'Golden Jewellers, Mumbai',
    text: 'The jewelry scales we purchased have exceptional 0.001g precision. Perfect for our diamond and gold grading work.',
    rating: 5,
    image: avatarPlaceholder
  },
  {
    name: 'Mohammed Khan',
    company: 'Khan Poultry, Delhi',
    text: 'Their electronic poultry scales are water-resistant and easy to clean. Exactly what we needed for our processing unit.',
    rating: 5,
    image: avatarPlaceholder
  }
];

export function Home() {
  return (
    <main id="main-content">
      <Hero />
      
      {/* Trust Features Section */}
      <section className="py-12 bg-blue-50/40 relative overflow-hidden" aria-labelledby="features-title">
        <div className="container mx-auto px-4 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-blue-100 text-blue-700 rounded-full text-sm font-semibold mb-4 shadow-sm">
              <CheckCircle2 className="w-4 h-4 text-blue-600" />
              Why Choose Manish Scale
            </span>
            <h2 id="features-title" className="text-3xl md:text-4xl font-bold text-slate-900">
              Trusted by <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 font-bold">50,000+ Businesses</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="group relative bg-white p-8 rounded-2xl border border-blue-50 shadow-sm hover:shadow-xl hover:shadow-blue-500/10 hover:border-blue-100 transition-all duration-300"
              >
                <div className="relative">
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl flex items-center justify-center mb-5 border border-blue-100/50 group-hover:from-blue-600 group-hover:to-indigo-600 transition-all duration-300">
                    <feature.icon className="w-7 h-7 text-blue-600 group-hover:text-white transition-colors" aria-hidden="true" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-blue-700 transition-colors">{feature.title}</h3>
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
      
      <ProductGrid 
        title="Our Top Products"
        subtitle="Explore our best-selling weighing scales trusted by businesses nationwide"
        limit={4}
      />

      {/* Testimonials Section */}
      <section className="py-16 bg-white" aria-labelledby="testimonials-title">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-amber-50 text-amber-700 rounded-full text-sm font-semibold mb-4 border border-amber-100">
              <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
              Customer Reviews
            </span>
            <h2 id="testimonials-title" className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              What Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 font-bold">Customers Say</span>
            </h2>
            <p className="text-xl text-slate-600">
              Trusted by thousands of businesses across India
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -4, boxShadow: '0 20px 25px -5px rgba(59, 130, 246, 0.1)' }}
                className="group relative bg-white rounded-2xl p-8 border border-slate-100 shadow-sm hover:border-blue-100 transition-all duration-300"
              >
                <Quote className="absolute top-6 right-6 w-10 h-10 text-blue-50 group-hover:text-blue-100 transition-colors" aria-hidden="true" />
                
                <div className="flex gap-1 mb-4" role="img" aria-label={`${testimonial.rating} out of 5 stars`}>
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-amber-400 fill-amber-400" />
                  ))}
                </div>
                
                <p className="text-slate-700 text-lg mb-6 leading-relaxed">"{testimonial.text}"</p>
                
                <div className="flex items-center gap-4">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name}
                    className="w-14 h-14 rounded-full object-cover border-2 border-blue-100"
                    loading="lazy"
                    decoding="async"
                  />
                  <div>
                    <p className="font-bold text-slate-900">{testimonial.name}</p>
                    <p className="text-sm text-slate-500">{testimonial.company}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div className="mt-10 overflow-hidden relative w-full pt-8 border-t border-slate-100">
            <span className="text-sm font-semibold uppercase tracking-wider text-center block mb-6 text-blue-400">Trusted by leading brands</span>
            <div className="flex w-full overflow-hidden">
              <div className="flex animate-[marquee_20s_linear_infinite] whitespace-nowrap gap-16 items-center">
                {['L&T', 'Wipro', 'UPL', 'Adani', 'Metso', 'Hitachi', 'Texspin'].map((brand, i) => (
                  <span key={i} className="text-3xl font-bold text-slate-300 mx-8 hover:text-blue-500 transition-colors cursor-default">{brand}</span>
                ))}
                {/* Duplicate for infinite effect */}
                {['L&T', 'Wipro', 'UPL', 'Adani', 'Metso', 'Hitachi', 'Texspin'].map((brand, i) => (
                  <span key={`dup-${i}`} className="text-3xl font-bold text-slate-300 mx-8">{brand}</span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 relative overflow-hidden bg-gradient-to-br from-blue-900 via-indigo-900 to-slate-900" aria-labelledby="cta-title">
        <div className="absolute inset-0 opacity-[0.05]" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #fff 1px, transparent 0)`,
          backgroundSize: '32px 32px'
        }} />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-blue-500/20 blur-[120px] rounded-full pointer-events-none" />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 200 }}
              className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-lg shadow-blue-500/30 border border-blue-400/50"
            >
              <Award className="w-10 h-10 text-white" />
            </motion.div>

            <h2 id="cta-title" className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Ready to Get Your <span className="text-amber-400 font-semibold">Perfect Scale?</span>
            </h2>
            <p className="text-xl text-blue-100/80 mb-10 max-w-2xl mx-auto">
              Contact us today for a free consultation and quote. Our experts will help you 
              find the ideal weighing solution for your business needs.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4">
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                <Link
                  to="/quote"
                  className="group inline-flex items-center gap-3 px-10 py-5 bg-white text-blue-800 rounded-xl font-bold text-lg shadow-xl shadow-white/10 hover:bg-blue-50 transition-all duration-300"
                >
                  <span>Request Free Quote</span>
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </motion.div>
              <motion.a
                href="tel:+919284405090"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-xl hover:shadow-orange-500/20 transition-all duration-300 border-none"
              >
                <span>Call Now: +91 92844 05090</span>
              </motion.a>
            </div>

            <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { label: 'Years Experience', value: '70+' },
                { label: 'Happy Customers', value: '50K+' },
                { label: 'Service Coverage', value: 'All Over India' },
                { label: 'Accuracy Rate', value: '99.9%' }
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * i }}
                  className="text-center p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10"
                >
                  <div className="text-4xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-sm font-medium text-blue-200">{stat.label}</div>
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