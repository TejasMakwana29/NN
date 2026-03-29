import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Scale, 
  Check, 
  ChevronRight, 
  BarChart3
} from 'lucide-react';
import { getAllProducts, type Product } from '@/data/products';
import { getProductImageUrl, getPlaceholderImageUrl } from '@/lib/productImages';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface ProductGridProps {
  title?: string;
  subtitle?: string;
  limit?: number;
  categorySlug?: string;
  showComparison?: boolean;
}

export function ProductGrid({ 
  title = 'Featured Products', 
  subtitle = 'Discover our range of precision weighing solutions',
  limit = 8,
  categorySlug,
  showComparison = true
}: ProductGridProps) {
  const [compareList, setCompareList] = useState<string[]>([]);
  const [isCompareDialogOpen, setIsCompareDialogOpen] = useState(false);

  // Memoized product list - no artificial delay to avoid UI hang
  const products = useMemo(() => {
    let allProducts = getAllProducts();
    if (categorySlug) {
      allProducts = allProducts.filter(p => (p as Product & { categorySlug?: string }).categorySlug === categorySlug);
    }
    return allProducts.slice(0, limit);
  }, [limit, categorySlug]);

  const toggleCompare = (productId: string) => {
    setCompareList(prev => {
      if (prev.includes(productId)) {
        return prev.filter(id => id !== productId);
      }
      if (prev.length >= 3) {
        return prev;
      }
      return [...prev, productId];
    });
  };

  const compareProducts = products.filter(p => compareList.includes(p.id));

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut' as const
      }
    }
  };

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-8">
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold text-gray-800 mb-4"
            >
              {title}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-gray-600"
            >
              {subtitle}
            </motion.p>
          </div>
          
          {showComparison && compareList.length > 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-4 md:mt-0"
            >
              <Button
                onClick={() => setIsCompareDialogOpen(true)}
                className="bg-blue-600 hover:bg-indigo-900 w-full md:w-auto"
              >
                <BarChart3 className="w-4 h-4 mr-2" />
                Compare ({compareList.length})
              </Button>
            </motion.div>
          )}
        </div>

        {/* Product Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              variants={itemVariants}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              whileTap={{ scale: 0.98 }}
              className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 relative"
            >
              {index === 0 && (
                <span className="absolute top-3 left-3 z-10 px-2.5 py-1 bg-amber-500 text-white text-xs font-bold rounded-md shadow-md">
                  Bestseller
                </span>
              )}
              {/* Image */}
              <div className="relative aspect-square overflow-hidden bg-gray-100">
                <img
                  src={getProductImageUrl(product, 'medium')}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                  decoding="async"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = getPlaceholderImageUrl(product.name);
                  }}
                />
                
                {/* Comparison Checkbox */}
                {showComparison && (
                  <div className="absolute top-3 left-3 z-10">
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        toggleCompare(product.id);
                      }}
                      className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                        compareList.includes(product.id)
                          ? 'bg-blue-600 text-white'
                          : 'bg-white/90 text-gray-400 hover:bg-white'
                      }`}
                    >
                      {compareList.includes(product.id) ? (
                        <Check className="w-4 h-4" />
                      ) : null}
                    </button>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="font-semibold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">
                  {product.name}
                </h3>
                
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                  <span className="flex items-center gap-1">
                    <Scale className="w-4 h-4" />
                    {product.baseCapacity}
                  </span>
                  {product.precision && product.precision !== 'N/A' && (
                    <span>±{product.precision}</span>
                  )}
                </div>

                <div className="flex items-center justify-end">
                  {!['Platform Load Cell', 'Table Top Load Cell', 'Mechanical Hanging Scale Hook', 'Digital Hanging Scale Hook', 'Crane Scale Hook'].includes(product.name) && (
                    <Link
                      to={`/product/${product.id}`}
                      className="flex items-center gap-1 text-sm font-medium text-gray-500 hover:text-blue-600 transition-colors"
                    >
                      Details
                      <ChevronRight className="w-4 h-4" />
                    </Link>
                  )}
                </div>

                <Link
                  to="/quote"
                  className="mt-4 block w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-center rounded-lg font-medium transition-all duration-300 hover:scale-[1.02] hover:shadow-md"
                >
                  Request Quote
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center mt-8"
        >
          <Link
            to="/products"
            className="inline-flex items-center gap-2 px-8 py-3 border-2 border-blue-600 text-blue-600 rounded-full font-semibold hover:bg-blue-600 hover:text-white transition-all duration-300"
          >
            View All Products
            <ChevronRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </div>

      {/* Comparison Dialog */}
      <Dialog open={isCompareDialogOpen} onOpenChange={setIsCompareDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden flex flex-col p-4 md:p-6">
          <DialogHeader className="shrink-0 mb-2">
            <DialogTitle className="text-xl md:text-2xl font-bold flex items-center gap-2">
              <BarChart3 className="w-5 h-5 md:w-6 md:h-6" />
              Product Comparison
            </DialogTitle>
          </DialogHeader>
          
          {compareProducts.length > 0 ? (
            <div className="flex-1 overflow-y-auto overflow-x-hidden min-h-0">
              <div className="overflow-x-auto pb-4 custom-scrollbar">
                <table className="w-full comparison-table min-w-[600px]">
                  <thead>
                    <tr>
                      <th className="bg-gray-50 text-left p-3">Feature</th>
                      {compareProducts.map(product => (
                        <th key={product.id} className="text-center p-3">
                          <div className="flex flex-col items-center">
                            <img
                              src={getProductImageUrl(product, 'thumb')}
                              alt={product.name}
                              className="w-16 h-16 md:w-20 md:h-20 object-cover rounded-lg mb-2"
                            />
                            <span className="text-xs md:text-sm max-w-[120px] truncate">{product.name}</span>
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="font-semibold p-3 border-b">Category</td>
                      {compareProducts.map(product => (
                        <td key={product.id} className="text-center p-3 border-b text-sm">{product.category}</td>
                      ))}
                    </tr>
                    <tr>
                      <td className="font-semibold p-3 border-b">Capacity</td>
                      {compareProducts.map(product => (
                        <td key={product.id} className="text-center p-3 border-b text-sm">{product.baseCapacity}</td>
                      ))}
                    </tr>
                    <tr>
                      <td className="font-semibold p-3 border-b">Accuracy</td>
                      {compareProducts.map(product => (
                        <td key={product.id} className="text-center p-3 border-b text-sm">
                          {product.precision && product.precision !== 'N/A' ? `±${product.precision}` : '-'}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="font-semibold p-3">Action</td>
                      {compareProducts.map(product => (
                        <td key={product.id} className="text-center p-3">
                          <Link
                            to="/quote"
                            onClick={() => setIsCompareDialogOpen(false)}
                            className="inline-block px-3 py-2 bg-emerald-600 text-white text-xs md:text-sm rounded-lg hover:bg-emerald-700 transition-colors whitespace-nowrap"
                          >
                            Get Quote
                          </Link>
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
              
              <div className="mt-6 flex flex-col sm:flex-row justify-end gap-3 pt-4 border-t">
                <Button
                  variant="outline"
                  onClick={() => {
                    setCompareList([]);
                    setIsCompareDialogOpen(false);
                  }}
                  className="w-full sm:w-auto"
                >
                  Clear Comparison
                </Button>
                <Button
                  onClick={() => setIsCompareDialogOpen(false)}
                  className="bg-blue-600 hover:bg-indigo-900 w-full sm:w-auto"
                >
                  Close
                </Button>
              </div>
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              No products selected for comparison
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}