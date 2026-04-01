import { motion } from 'framer-motion';
import { Target, Eye, ShieldCheck, History, Scale, CheckCircle2, ChevronRight, Gem, HeartHandshake, Lightbulb } from 'lucide-react';
import { Link } from 'react-router-dom';

export function About() {
  const coreValues = [
    {
      icon: Gem,
      title: "Uncompromising Quality",
      description: "We use only high-grade materials to ensure every scale we manufacture stands the test of time and tough environments."
    },
    {
      icon: Target,
      title: "Absolute Precision",
      description: "Accuracy is our foundation. Our instruments are engineered to deliver exact, reliable measurements every single time."
    },
    {
      icon: HeartHandshake,
      title: "Legacy of Trust",
      description: "Building lasting relationships with our customers since 1950 through transparency, integrity, and consistent performance."
    },
    {
      icon: Lightbulb,
      title: "Continuous Innovation",
      description: "Combining decades of traditional expertise with modern manufacturing techniques to bring the best solutions to the market."
    }
  ];

  return (
    <main className="min-h-screen bg-gray-50 pb-20">
      
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center gap-2 text-sm text-gray-600">
            <Link to="/" className="hover:text-blue-600 transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-blue-600 font-medium">About Us</span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-900 via-indigo-900 to-slate-900 text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #fff 1px, transparent 0)`,
          backgroundSize: '32px 32px'
        }} />
        <div className="container mx-auto px-4 relative z-10 text-center max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Scale className="w-16 h-16 mx-auto mb-6 text-blue-400" />
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              About <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">Manish Scale</span>
            </h1>
            <p className="text-2xl md:text-3xl text-blue-100 font-light italic">
              "Where trust carries weight"
            </p>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-4 -mt-10 relative z-20">
        <div className="grid lg:grid-cols-12 gap-8">
          
          {/* Main Story Content (Left Side) */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-8 space-y-8"
          >
            {/* The Legacy Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-10">
              <div className="flex items-center gap-3 mb-6">
                <History className="w-8 h-8 text-blue-600" />
                <h2 className="text-3xl font-bold text-gray-900">Our Legacy</h2>
              </div>
              
              <div className="space-y-6 text-gray-700 text-lg leading-relaxed text-justify">
                <p>
                  <strong className="font-bold text-blue-900">Manish Scale</strong> carries forward a legacy that began in <strong className="font-bold text-blue-900">1950</strong> with <strong className="font-bold text-blue-900">Karshan Ramji and Sons</strong>, a pioneering company that became <strong className="font-bold text-blue-900">India’s first manufacturer of beam scales and mechanical weighing scales</strong>. At a time when the weighing industry in India was still developing, <strong className="font-bold text-blue-900">Karshan Ramji and Sons</strong> set new standards with its commitment to precision, quality craftsmanship, and reliable performance. Over the decades, the company earned the trust of businesses across the country and became a respected name in the weighing scale industry.
                </p>
                <p>
                  With changing times and advancements in technology, the business continued to evolve while preserving its strong foundation of accuracy and reliability. In <strong className="font-bold text-blue-900">2012</strong>, the next chapter of this legacy began with the establishment of <strong className="font-bold text-blue-900">Manish Scale</strong>, focusing on the manufacturing of <strong className="font-bold text-blue-900">Hanging Spring Balances</strong>. By combining decades of traditional expertise with modern manufacturing techniques, the brand quickly gained recognition for producing high-quality and highly precise weighing instruments.
                </p>
                <p>
                  Today, <strong className="font-bold text-blue-900">Manish Scale is proudly recognized as one of the leading manufacturers of Circular Spring Balances in India</strong>, known for its <strong className="font-bold text-blue-900">exceptional quality, precision, durability</strong>, and consistent performance. Every product is designed and manufactured with strict quality standards to ensure accurate measurements and long-lasting reliability.
                </p>
                <p>
                  With more than <strong className="font-bold text-blue-900">seven decades of experience in the weighing industry</strong>, <strong className="font-bold text-blue-900">Manish Scale</strong> continues to build on its heritage of innovation, trust, and precision. Our mission is to provide dependable weighing solutions that businesses across India can rely on every day.
                </p>
                <div className="pt-6 border-t border-gray-100 text-center">
                  <p className="text-xl md:text-2xl text-blue-800 italic">
                    <strong className="font-bold">Manish Scale — A Name of Quality & Precision. A Legacy of Trust. ⚖️✨</strong>
                  </p>
                </div>
              </div>
            </div>

            {/* Why Choose Us Card */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl shadow-sm border border-blue-100 p-8 md:p-10">
              <div className="flex items-center gap-3 mb-6">
                <ShieldCheck className="w-8 h-8 text-blue-700" />
                <h2 className="text-3xl font-bold text-gray-900">Why Choose Manish Scale?</h2>
              </div>

              <div className="space-y-6 text-gray-700 text-lg leading-relaxed text-justify">
                <p>
                  At <strong className="font-bold text-blue-900">Manish Scale</strong>, we don’t just manufacture weighing instruments—we deliver <strong className="font-bold text-blue-900">precision you can trust and strength you can rely on</strong>. With a legacy dating back to <strong className="font-bold text-blue-900">1925</strong>, our journey is built on <strong className="font-bold text-blue-900">quality, innovation, and customer confidence</strong>.
                </p>
                <p>
                  Every product is crafted using <strong className="font-bold text-blue-900">high-grade materials and advanced technology</strong>, ensuring <strong className="font-bold text-blue-900">accurate results and long-lasting performance</strong> even in the toughest environments. Our premium brand <strong className="font-bold text-blue-900">Paras</strong> stands as a symbol of <strong className="font-bold text-blue-900">power, durability, and unmatched reliability</strong> across industries.
                </p>
                <p>
                  From <strong className="font-bold text-blue-900">agriculture to heavy industries</strong>, our solutions are designed to perform where it matters most—<strong className="font-bold text-blue-900">on the ground, in real working conditions</strong>. Backed by decades of expertise and a commitment to excellence, we continue to set benchmarks in the weighing industry.
                </p>
                <div className="pt-4 text-center md:text-left">
                  <span className="inline-block bg-blue-600 text-white font-bold px-6 py-3 rounded-xl shadow-md">
                    Manish Scale – Precision Engineered. Trust Delivered. 🚀
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Sidebar (Right Side) */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="lg:col-span-4 space-y-8"
          >
            {/* Vision Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 hover:shadow-lg transition-shadow duration-300 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-blue-50 rounded-bl-full -z-10" />
              <Eye className="w-12 h-12 text-blue-600 mb-6" />
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h3>
              <p className="text-gray-600 leading-relaxed text-justify">
                To become a globally trusted leader in weighing solutions, delivering precision, durability, and innovation across every industry we serve.
                <br /><br />
                We envision building a future where Manish Scale sets the benchmark for quality and accuracy, empowering businesses with reliable tools that drive efficiency and growth.
                <br /><br />
                By continuously evolving with advanced technology and uncompromising standards, we aim to expand our legacy of trust from India to the world.
              </p>
            </div>

            {/* Mission Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 hover:shadow-lg transition-shadow duration-300 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-50 rounded-bl-full -z-10" />
              <Target className="w-12 h-12 text-emerald-600 mb-6" />
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
              <p className="text-gray-600 leading-relaxed text-justify">
                To deliver high-performance, precision-engineered weighing solutions that empower industries with unmatched Quality, reliability, and excellence.
              </p>
            </div>

            {/* Quick Stats / Highlights Sidebar */}
            <div className="bg-slate-900 text-white rounded-2xl shadow-lg p-8">
              <h3 className="text-xl font-bold mb-6 border-b border-slate-700 pb-4">At a Glance</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-emerald-400 flex-shrink-0" />
                  <span>Legacy spanning <strong className="text-white">Seven Decades</strong></span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-emerald-400 flex-shrink-0" />
                  <span>India's <strong className="text-white">First Manufacturer</strong> of beam scales</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-emerald-400 flex-shrink-0" />
                  <span>Makers of the Premium <strong className="text-white">Paras</strong> brand</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-emerald-400 flex-shrink-0" />
                  <span>Trusted from <strong className="text-white">Agriculture to Heavy Industry</strong></span>
                </li>
              </ul>
            </div>
          </motion.div>
        </div>

        {/* Our Core Values Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-16"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Core Values</h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto rounded-full" />
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {coreValues.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <div className="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center mb-6">
                  <value.icon className="w-7 h-7 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed text-justify">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </main>
  );
}