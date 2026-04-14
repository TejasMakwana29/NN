import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ChevronRight, 
  Scale, 
  Cpu,
  Anchor,
  Package,
  ArrowRight
} from 'lucide-react';

interface ProductNode {
  id: string;
  name: string;
  slug: string;
  icon?: React.ReactNode;
  description?: string;
  capacities?: string[];
  children?: ProductNode[];
}

const productTree: ProductNode[] = [
  {
    id: 'counter',
    name: 'Counter Scales',
    slug: 'counter',
    icon: <Scale className="w-5 h-5" />,
    description: 'Perfect for retail shops and commercial use',
    children: [
      {
        id: 'counter-embossed',
        name: 'Embossed Body',
        slug: 'counter',
        description: 'Heavy-duty embossed body counter scales'
      },
      {
        id: 'counter-plain',
        name: 'Plain Body',
        slug: 'counter',
        description: 'Classic plain body counter scales'
      },
      {
        id: 'counter-super',
        name: 'Super Body',
        slug: 'counter',
        description: 'Premium super body counter scales for intensive use'
      }
    ]
  },
  {
    id: 'beam',
    name: 'Beam Scales',
    slug: 'beam',
    icon: <Scale className="w-5 h-5" />,
    description: 'Traditional mechanical precision scales',
    children: [
      {
        id: 'beam-class-b',
        name: 'Class B - Jewelry',
        slug: 'class-b',
        description: 'High precision for jewelry and precious metals'
      },
      {
        id: 'beam-class-c',
        name: 'Class C - General',
        slug: 'class-c',
        description: 'Versatile scales for various applications'
      }
    ]
  },
  {
    id: 'electronic',
    name: 'Electronic Scales',
    slug: 'electronic',
    icon: <Cpu className="w-5 h-5" />,
    description: 'Modern digital scales with LED displays',
    children: [
      { id: 'micro', name: 'Micro Scales', slug: 'micro', description: 'Laboratory-grade micro precision' },
      { id: 'tabletop', name: 'Table Top', slug: 'tabletop', description: 'Versatile table top digital scales' },
      { id: 'chicken', name: 'Chicken(Poultry) Scale', slug: 'poultry', description: 'Water for poultry and meat applications' },
      { id: 'platform', name: 'Platform', slug: 'platform', description: 'Heavy duty industrial platforms' },
      { id: 'jewellery', name: 'Jewellery', slug: 'jewellery', description: 'High precision for gems and jewelry' },
      { id: 'kitchen', name: 'Kitchen', slug: 'kitchen', description: 'Compact kitchen scales for home use' },
      { id: 'bathroom', name: 'Bathroom (Body)', slug: 'bathroom', description: 'Personal body weight scales' },
      { id: 'luggage', name: 'Luggage Scale', slug: 'luggage', description: 'Portable scales for travel' }
    ]
  },
  {
    id: 'hanging',
    name: 'Hanging Scales',
    slug: 'hanging',
    icon: <Anchor className="w-5 h-5" />,
    description: 'Spring balance scales for portable weighing',
    children: [
      { id: 'circular', name: 'Circular', slug: 'circular', description: 'Classic dial display' },
      { id: 'pocket', name: 'Pocket', slug: 'pocket', description: 'Compact pocket-sized' },
      { id: 'tubular', name: 'Tubular', slug: 'tubular', description: 'Heavy duty tubular design' },
      { id: 'digital', name: 'Digital Hanging Scales', slug: 'digital', description: 'Backlit digital display hanging scales' },
      { id: 'crane', name: 'Crane Scales', slug: 'crane', description: 'Heavy-duty crane scales for industrial lifting' }
    ]
  },
  {
    id: 'accessories',
    name: 'Accessories',
    slug: 'accessories',
    icon: <Package className="w-5 h-5" />,
    description: 'Weights, calibration tools and spare parts',
    children: [
      { id: 'weights', name: 'Calibration Weights', slug: 'weights', description: 'Standard weights for calibration' },
      { id: 'adapters', name: 'Power Adapters', slug: 'adapters', description: 'Power supplies and adapters' },
      { id: 'batteries', name: 'Batteries', slug: 'batteries', description: 'Replacement batteries for scales' },
      { id: 'displays', name: 'External Displays', slug: 'displays', description: 'Additional display units' },
      { id: 'parts', name: 'Spare Parts', slug: 'parts', description: 'Load cells, motherboards, and parts' }
    ]
  }
];

interface TreeNodeProps {
  node: ProductNode;
  level: number;
  index: number;
}

function TreeNode({ node, level, index }: TreeNodeProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const navigate = useNavigate();
  const hasChildren = node.children && node.children.length > 0;

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 + level * 0.05 }}
      className={`relative ${level > 0 ? 'ml-6' : ''}`}
    >
      {/* Connection Line */}
      {level > 0 && (
        <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-blue-400 to-blue-600 -ml-4" />
      )}
      
      <div
        className={`
          group flex items-center gap-3 p-4 rounded-xl cursor-pointer transition-all duration-300
          ${level === 0 
            ? 'bg-gradient-to-r from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 border border-blue-100' 
            : 'hover:bg-gray-50'}
          ${isExpanded && hasChildren ? 'bg-blue-50' : ''}
        `}
        onClick={() => {
          if (hasChildren) {
            setIsExpanded(!isExpanded);
          } else {
            navigate(`/products/${node.slug}`);
          }
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            if (hasChildren) {
              setIsExpanded(prev => !prev);
            } else {
              navigate(`/products/${node.slug}`);
            }
          }
        }}
        role={hasChildren ? 'button' : 'link'}
        tabIndex={0}
        aria-expanded={hasChildren ? isExpanded : undefined}
        aria-label={`${node.name}${node.description ? `: ${node.description}` : ''}`}
      >
        {/* Horizontal Connection Line */}
        {level > 0 && (
          <div className="absolute left-0 top-1/2 w-4 h-px bg-blue-400 -ml-4" />
        )}
        
        {/* Expand/Collapse or Link Icon */}
        {hasChildren ? (
          <motion.div
            animate={{ rotate: isExpanded ? 90 : 0 }}
            transition={{ duration: 0.2 }}
            className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-600"
          >
            <ChevronRight className="w-4 h-4" />
          </motion.div>
        ) : (
          <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
            <ArrowRight className="w-4 h-4" />
          </div>
        )}

        {/* Icon */}
        {node.icon && (
          <div className={`flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${
            level === 0 
              ? 'bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/30'
              : 'bg-blue-100 text-blue-600 group-hover:bg-blue-200'
          }`}>
            {node.icon}
          </div>
        )}

        {/* Content */}
          <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h4 className={`font-semibold transition-colors ${
              level === 0 ? 'text-gray-900 text-lg' : 'text-gray-800'
            } group-hover:text-blue-700`}>
              {node.name}
            </h4>
          </div>
          {node.description && (
            <p className="text-sm text-gray-500 mt-0.5">{node.description}</p>
          )}
        </div>

        {/* Action Button */}
        <Link
          to={`/products/${node.slug}`}
          onClick={(e) => e.stopPropagation()}
          className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg flex items-center gap-1"
          aria-label={`View ${node.name} products`}
        >
          View
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Children */}
      <AnimatePresence>
        {isExpanded && hasChildren && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="pt-2 space-y-2">
              {node.children?.map((child, i) => (
                <TreeNode key={child.id} node={child} level={level + 1} index={i} />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function ProductHierarchy() {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50" aria-labelledby="hierarchy-title">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-4"
          >
            <Scale className="w-4 h-4" />
            Complete Product Range
          </motion.span>
          
          <h2 id="hierarchy-title" className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Explore Our <span className="text-gradient">Product Categories</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            From precision micro scales to heavy-duty industrial platforms, 
            discover the perfect weighing solution for your needs.
          </p>
        </motion.div>

        {/* Interactive Tree */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
          {/* Manish Scale Root Node */}
          <div className="relative mb-8">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              className="flex items-center justify-center gap-4 p-6 bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 rounded-2xl shadow-2xl shadow-blue-500/30"
            >
              <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                <Scale className="w-10 h-10 text-white" />
              </div>
              <div className="text-white">
                <h3 className="text-2xl md:text-3xl font-bold">Manish Scale</h3>
                <p className="text-blue-200">Premium Weighing Solutions Since 1952</p>
              </div>
            </motion.div>
            
            {/* Vertical Connection */}
            <div className="absolute left-1/2 -translate-x-1/2 w-1 h-8 bg-gradient-to-b from-blue-600 to-blue-400 rounded-full" />
          </div>

          {/* Category Tree */}
          <div className="space-y-3 bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
            {productTree.map((node, index) => (
              <TreeNode key={node.id} node={node} level={0} index={index} />
            ))}
          </div>
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 max-w-4xl mx-auto"
        >
          {[
            { label: 'Product Categories', value: '5+' },
            { label: 'Scale Types', value: '25+' },
            { label: 'Capacity Range', value: '1mg - 5 Ton' },
            { label: 'Client Satisfaction', value: '100%' }
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 + i * 0.1 }}
              className="text-center p-4 bg-white rounded-xl shadow-sm border border-gray-100"
            >
              <div className="text-2xl md:text-3xl font-bold text-gradient mb-1">{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}