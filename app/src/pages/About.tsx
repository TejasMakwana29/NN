import { motion } from 'framer-motion';
import { Award, Users, Globe, TrendingUp, Check, Target, Lightbulb, Shield } from 'lucide-react';

/* const milestones = [
  { year: '1952', title: 'Company Founded', description: 'Started as a small weighing scale repair shop in Savarkundla' },
  { year: '2000', title: 'Manufacturing Begin', description: 'Launched our first line of mechanical counter scales' },
  { year: '2005', title: 'ISO Certification', description: 'Achieved ISO 9001:2000 certification for quality management' },
  { year: '2010', title: 'Digital Revolution', description: 'Expanded into electronic and digital weighing solutions' },
  { year: '2015', title: 'Export Business', description: 'Started exporting to Middle East and African markets' },
  { year: '2020', title: 'Industry Leader', description: 'Became one of India\'s top 5 weighing scale manufacturers' },
  { year: '2024', title: 'Global Presence', description: 'Serving customers in 25+ countries worldwide' }
]; */

const values = [
  {
    icon: Target,
    title: 'Precision First',
    description: 'We never compromise on accuracy. Every scale we manufacture undergoes rigorous testing to ensure precise measurements.'
  },
  {
    icon: Lightbulb,
    title: 'Innovation Driven',
    description: 'Continuously investing in R&D to bring the latest weighing technology to our customers.'
  },
  {
    icon: Shield,
    title: 'Quality Assured',
    description: 'ISO 9001:2015 certified manufacturing with strict quality control at every stage.'
  },
  {
    icon: Users,
    title: 'Customer Focused',
    description: 'Our customers are at the heart of everything we do. We provide personalized solutions and exceptional support.'
  }
];

/* const team = [
  { name: 'Rajesh Patel', role: 'Founder & CEO', image: 'RP' },
  { name: 'Priya Sharma', role: 'Technical Director', image: 'PS' },
  { name: 'Amit Kumar', role: 'Head of Operations', image: 'AK' },
  { name: 'Sneha Gupta', role: 'Sales Director', image: 'SG' }
]; */

export function About() {
  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="bg-[#0056b3] text-white py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">About Precision Weighing Solutions</h1>
            <p className="text-xl text-blue-100">
              India's trusted name in precision weighing since 1952. 
              Committed to quality, accuracy, and customer satisfaction.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: Award, value: '70+', label: 'Years Experience' },
              { icon: Users, value: '50K+', label: 'Happy Customers' },
              { icon: Globe, value: 'All Over India', label: 'Service Coverage' },
              { icon: TrendingUp, value: '99.9%', label: 'Accuracy Rate' }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-[#0056b3]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-8 h-8 text-[#0056b3]" />
                </div>
                <div className="text-4xl font-bold text-gray-800 mb-1">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">Our Story</h2>
              
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  <strong className="text-gray-800">Manish Scale carries forward a legacy that began in 1950 with Karshan Ramji and Sons</strong>, a pioneering company that became India's first manufacturer of beam scales and mechanical weighing scales. At a time when the weighing industry in India was still developing, Karshan Ramji and Sons set new standards with its commitment to precision, quality craftsmanship, and reliable performance. Over the decades, the company earned the trust of businesses across the country and became a respected name in the weighing scale industry.
                </p>
                <p>
                  With changing times and advancements in technology, the business continued to evolve while preserving its strong foundation of accuracy and reliability. <strong className="text-gray-800">In 2012, the next chapter of this legacy began with the establishment of Manish Scale</strong>, focusing on the manufacturing of Hanging Spring Balances. By combining decades of traditional expertise with modern manufacturing techniques, the brand quickly gained recognition for producing high-quality and highly precise weighing instruments.
                </p>
                <p>
                  Today, Manish Scale is proudly recognized as one of the leading manufacturers of Circular Spring Balances in India, known for its exceptional quality, precision, durability, and consistent performance. Every product is designed and manufactured with strict quality standards to ensure accurate measurements and long-lasting reliability.
                </p>
                <p className="font-medium text-[#0056b3] text-lg mt-6">
                  Manish Scale — A Name of Quality & Precision. A Legacy of Trust.
                </p>
              </div>

              <div className="mt-8 grid grid-cols-2 gap-4">
                {[
                  'ISO 9001:2015 Certified',
                  'Registered Trademark',
                  'NABL Accredited Lab',
                  'Export Quality Products'
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <Check className="w-5 h-5 text-[#28a745]" />
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-video bg-gradient-to-br from-[#0056b3] to-[#003d80] rounded-2xl flex items-center justify-center">
                <div className="text-center text-white p-8">
                  <div className="text-6xl font-bold mb-2">70+</div>
                  <div className="text-xl">Years of Excellence</div>
                  <div className="text-sm mt-2 text-blue-200">Since 1950</div>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Our Core Values</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              These principles have guided us since 1950, from product design to customer service.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center p-6 rounded-xl bg-gray-50 hover:bg-[#0056b3]/5 transition-colors"
              >
                <div className="w-16 h-16 bg-[#0056b3]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <value.icon className="w-8 h-8 text-[#0056b3]" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline 
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Our Journey</h2>
            <p className="text-gray-600">Three decades of growth and innovation</p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            {milestones.map((milestone, index) => (
              <motion.div
                key={milestone.year}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex gap-6 mb-8 last:mb-0"
              >
                <div className="flex-shrink-0 w-24 text-right">
                  <span className="text-2xl font-bold text-[#0056b3]">{milestone.year}</span>
                </div>
                <div className="flex-shrink-0 relative">
                  <div className="w-4 h-4 bg-[#0056b3] rounded-full" />
                  <div className="absolute top-4 left-1/2 -translate-x-1/2 w-0.5 h-full bg-gray-200" />
                </div>
                <div className="flex-1 pb-8">
                  <h3 className="text-xl font-semibold text-gray-800 mb-1">{milestone.title}</h3>
                  <p className="text-gray-600">{milestone.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section> */}

     { /* Team
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Leadership Team</h2>
            <p className="text-gray-600">Meet the people behind our success</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -6 }}
                className="text-center group"
              >
                <div className="w-32 h-32 bg-[#0056b3] rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:shadow-xl group-hover:scale-105 transition-all duration-300">
                  <span className="text-3xl font-bold text-white">{member.image}</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-800">{member.name}</h3>
                <p className="text-gray-600">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section> */}

      {/* CTA 
      <section className="py-16 bg-[#0056b3]">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Partner With Us
            </h2>
            <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
              Join thousands of satisfied customers who trust Precision Weighing Solutions 
              for their weighing needs.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="/quote"
                className="px-8 py-4 bg-[#28a745] text-white rounded-full font-semibold hover:bg-[#1e7e34] transition-all duration-300 hover:scale-105"
              >
                Request a Quote
              </a>
              <a
                href="/contact"
                className="px-8 py-4 bg-white text-[#0056b3] rounded-full font-semibold hover:bg-gray-100 transition-all duration-300 hover:scale-105"
              >
                Contact Us
              </a>
            </div>
          </motion.div>
        </div>
      </section> */}
    </main>
  );
}