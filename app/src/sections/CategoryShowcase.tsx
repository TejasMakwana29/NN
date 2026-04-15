import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Scale, 
  Cpu, 
  Anchor, 
  Package,
  ArrowRight,
  Check,
  Sparkles
} from 'lucide-react';
import { IMAGES } from '@/lib/productImages';
import { categories } from '@/data/products';

// Helper to count actual products from the data file dynamically
const getProductCount = (categorySlug: string) => {
  const category = categories.find(c => c.slug === categorySlug);
  if (!category) return 1; 
  
  let count = 0;
  if (category.products) count += category.products.length;
  if (category.types) {
    category.types.forEach(type => {
      if (type.products) count += type.products.length;
    });
  }
  if (category.subcategories) {
    category.subcategories.forEach(sub => {
      if (sub.products) count += sub.products.length;
      if (sub.sizes) {
        sub.sizes.forEach(size => {
          if (size.products) count += size.products.length;
        });
      }
    });
  }
  return count > 0 ? count : 1;
};

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
    productCount: getProductCount('counter'),
    priceRange: '',
    image: IMAGES.counter,
    color: 'blue',
    gradient: 'from-blue-500 to-blue-700'
  },
  {
    id: 'beam',
    name: 'Beam Scales',
    slug: 'beam',
    icon: <Scale className="w-8 h-8" />,
    description: 'Traditional mechanical precision scales for accurate measurements',
    features: ['No Power Required', 'Class B & C Options', 'Heavy Duty Build', 'Lifetime Durability'],
    productCount: getProductCount('beam'),
    priceRange: '',
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
    productCount: getProductCount('electronic'),
    priceRange: '',
    image: IMAGES.electronic,
    color: 'violet',
    gradient: 'from-violet-500 to-violet-700'
  },
  {
    id: 'hanging',
    name: 'Hanging Scales',
    slug: 'hanging',
    icon: <Anchor className="w-8 h-8" />,
    description: 'Spring balance scales for portable and overhead weighing',
    features: ['Portable Design', 'Hook Attachment', 'Circular/Tubular Options', 'Weather Resistant'],
    productCount: getProductCount('hanging'),
    priceRange: '',
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
    productCount: getProductCount('accessories'),
    priceRange: '',
    image: IMAGES.accessories,
    color: 'rose',
    gradient: 'from-rose-500 to-rose-700'
  }
];

export function CategoryShowcase() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

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
      className="py-20 relative bg-slate-950 overflow-hidden"
      aria-labelledby="categories-title"
    >
      {/* --- STRONG, SOLID DARK BACKGROUND DESIGN --- */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {/* White Circular / Lining SVG Pattern */}
        <div 
          className="absolute inset-0 opacity-[0.07]" 
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M50 100c27.614 0 50-22.386 50-50S77.614 0 50 0 0 22.386 0 50s22.386 50 50 50zm0-2c26.51 0 48-21.49 48-48S76.51 2 50 2 2 23.49 2 50s21.49 48 48 48zm0-8c22.091 0 40-17.909 40-40S72.091 10 50 10 10 27.909 10 50s17.909 40 40 40zm0-2c20.987 0 38-17.013 38-38S70.987 12 50 12 12 29.013 12 50s17.013 38 38 38zm0-8c17.673 0 32-14.327 32-32S67.673 18 50 18 18 32.327 18 50s14.327 32 32 32zm0-2c16.569 0 30-13.431 30-30S66.569 20 50 20 20 33.431 20 50s13.431 30 30 30zm0-8c13.255 0 24-10.745 24-24S63.255 26 50 26 26 36.745 26 50s10.745 24 24 24zm0-2c12.15 0 22-9.85 22-22S62.15 28 50 28 28 37.85 28 50s9.85 22 22 22z' fill='%23ffffff' fill-rule='evenodd'/%3E%3C/svg%3E")`,
            backgroundSize: '100px 100px'
          }} 
        />
        {/* Vibrant Glowing Orbs for extra depth */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/20 rounded-full filter blur-[120px] -translate-y-1/3 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-indigo-600/20 rounded-full filter blur-[120px] translate-y-1/3 -translate-x-1/3" />
      </div>
      {/* ---------------------------------- */}

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full mb-6 border border-white/20"
          >
            <Sparkles className="w-5 h-5 text-amber-400" />
            <span className="text-sm font-semibold text-blue-100 tracking-wide uppercase">Browse by Category</span>
          </motion.div>

          <h2 
            id="categories-title" 
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
          >
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-amber-400">Scale Categories</span>
          </h2>
          <p className="text-xl text-blue-100/80 max-w-2xl mx-auto font-medium leading-relaxed">
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
              className={`
                group relative bg-white rounded-3xl overflow-hidden flex flex-col
                transition-all duration-500 ease-out border border-white/10
                ${hoveredCard === category.id ? 'shadow-2xl shadow-blue-900/50 -translate-y-2' : 'shadow-xl'}
                ${index === 2 ? 'md:col-span-2 lg:col-span-1' : ''}
              `}
              role="article"
              aria-label={`${category.name} category with ${category.productCount} products`}
            >
              {/* Background gradient on hover */}
              <div className={`
                absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-0 
                group-hover:opacity-[0.03] transition-opacity duration-500
              `} />

              {/* Image Section */}
              <div className="relative h-48 overflow-hidden bg-gray-100 shrink-0">
                <motion.img
                  src={category.image}
                  alt={`${category.name} - Weighing scales`}
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                />
                
                {/* Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/30 to-transparent`} />
                
                {/* Category Icon */}
                <div className={`
                  absolute top-4 left-4 w-14 h-14 rounded-2xl 
                  bg-gradient-to-br ${category.gradient} 
                  flex items-center justify-center text-white shadow-lg border border-white/20
                  transform transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3
                `}>
                  {category.icon}
                </div>

                {/* Product Count Badge */}
                <div className="absolute top-4 right-4 px-3 py-1.5 bg-white/95 backdrop-blur-sm rounded-full shadow-sm">
                  <span className="text-sm font-bold text-gray-800">
                    {category.productCount}+ Products
                  </span>
                </div>

                {/* Title on Image */}
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-2xl font-bold text-white mb-1 drop-shadow-md">
                    {category.name}
                  </h3>
                  <p className="text-sm text-white/90 drop-shadow-md font-medium">
                    {category.priceRange}
                  </p>
                </div>
              </div>

              {/* Content Container (flex-1 pushes the button down) */}
              <div className="p-6 flex flex-col flex-1">
                <p className="text-gray-600 mb-5 line-clamp-2 leading-relaxed">
                  {category.description}
                </p>

                {/* Features */}
                <ul className="space-y-2.5 mb-6" role="list" aria-label={`${category.name} features`}>
                  {category.features.map((feature, i) => (
                    <motion.li
                      key={feature}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.1 * i }}
                      className="flex items-center gap-3 text-sm text-gray-700 font-medium"
                    >
                      <span className={`w-5 h-5 rounded-full bg-gradient-to-br ${category.gradient} flex items-center justify-center flex-shrink-0 shadow-sm`}>
                        <Check className="w-3 h-3 text-white" />
                      </span>
                      {feature}
                    </motion.li>
                  ))}
                </ul>

                {/* Action Button - mt-auto pushes this to the absolute bottom */}
                <Link
                  to={`/products/${category.slug}`}
                  className={`
                    mt-auto
                    w-full py-3.5 rounded-xl font-bold flex items-center justify-center gap-2
                    bg-gradient-to-r ${category.gradient} text-white
                    transform transition-all duration-300 shadow-md
                    hover:shadow-lg hover:shadow-blue-500/30 hover:scale-[1.02]
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
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link
            to="/products"
            className="inline-flex items-center gap-3 px-8 py-4 bg-white text-slate-900 rounded-2xl font-bold shadow-xl hover:shadow-2xl hover:bg-blue-50 hover:scale-105 transition-all duration-300"
          >
            <span>View All Products</span>
            <ArrowRight className="w-5 h-5 text-blue-600" />
          </Link>
          <p className="mt-4 text-blue-200/60 font-medium">
            Over 25+ Scale Types across 5 categories
          </p>
        </motion.div>
      </div>
    </section>
  );
}