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
  productIds?: string[]; // Added this to hand-pick products
  showComparison?: boolean;
}

export function ProductGrid({ 
  title = 'Featured Products', 
  subtitle = 'Discover our range of precision weighing solutions',
  limit = 8,
  categorySlug,
  productIds,
  showComparison = true
}: ProductGridProps) {
  const [compareList, setCompareList] = useState<string[]>([]);
  const [isCompareDialogOpen, setIsCompareDialogOpen] = useState(false);

  // Memoized product list - filters by specific IDs if provided
  const products = useMemo(() => {
    let allProducts = getAllProducts();
    
    if (productIds && productIds.length > 0) {
      // Return only the exact products requested, in the order requested
      return productIds
        .map(id => allProducts.find(p => p.id === id))
        .filter(Boolean) as Product[];
    }
    
    if (categorySlug) {
      allProducts = allProducts.filter(p => (p as Product & { categorySlug?: string }).categorySlug === categorySlug);
    }
    return allProducts.slice(0, limit);
  }, [limit, categorySlug, productIds]);

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
              className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 relative border border-gray-100"
            >
              {/*index === 0 && (
                <span className="absolute top-3 left-3 z-10 px-2.5 py-1 bg-amber-500 text-white text-xs font-bold rounded-md shadow-md">
                  Bestseller
                </span>
              )*/}
              
              {/* Image Container - REDUCED HEIGHT AND FIXED OBJECT FIT */}
              <div className="relative h-56 p-4 overflow-hidden bg-slate-50/50 flex items-center justify-center border-b border-gray-50">
                <img
                  src={getProductImageUrl(product, 'medium')}
                  alt={product.name}
                  className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110 drop-shadow-md"
                  loading="lazy"
                  decoding="async"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = getPlaceholderImageUrl(product.name);
                  }}
                />
                
                {/* Comparison Checkbox */}
                {showComparison && (
                  <div className="absolute top-3 right-3 z-10">
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        toggleCompare(product.id);
                      }}
                      className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 shadow-sm border ${
                        compareList.includes(product.id)
                          ? 'bg-blue-600 border-blue-600 text-white'
                          : 'bg-white text-gray-400 border-gray-200 hover:bg-gray-50'
                      }`}
                      aria-label="Compare product"
                    >
                      {compareList.includes(product.id) ? (
                        <Check className="w-4 h-4" />
                      ) : (
                        <BarChart3 className="w-4 h-4 opacity-50" />
                      )}
                    </button>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-1">
                  {product.name}
                </h3>
                
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-5 font-medium">
                  <span className="flex items-center gap-1.5 bg-gray-50 px-2 py-1 rounded-md border border-gray-100">
                    <Scale className="w-3.5 h-3.5 text-blue-500" />
                    {product.baseCapacity}
                  </span>
                  {product.precision && product.precision !== 'N/A' && (
                    <span className="bg-gray-50 px-2 py-1 rounded-md border border-gray-100">
                      ±{product.precision}
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-between mt-auto">
                  {!['Platform Load Cell', 'Table Top Load Cell', 'Mechanical Hanging Scale Hook', 'Digital Hanging Scale Hook', 'Crane Scale Hook'].includes(product.name) && (
                    <Link
                      to={`/product/${product.id}`}
                      className="text-sm font-bold text-blue-600 hover:text-blue-800 transition-colors"
                    >
                      View Details
                    </Link>
                  )}
                  <Link
                    to="/quote"
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm rounded-lg font-bold transition-all duration-300 shadow-sm hover:shadow-md"
                  >
                    Get Quote
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-center mt-10"
        >
          <Link
            to="/products"
            className="inline-flex items-center gap-2 px-8 py-3 border-2 border-blue-600 text-blue-600 rounded-xl font-bold hover:bg-blue-600 hover:text-white transition-all duration-300 shadow-sm hover:shadow-md"
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
                              className="w-16 h-16 md:w-20 md:h-20 object-contain rounded-lg mb-2 bg-white border p-1"
                            />
                            <span className="text-xs md:text-sm font-bold max-w-[120px] truncate">{product.name}</span>
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="font-semibold p-3 border-b text-gray-700">Category</td>
                      {compareProducts.map(product => (
                        <td key={product.id} className="text-center p-3 border-b text-sm font-medium">{product.category}</td>
                      ))}
                    </tr>
                    <tr>
                      <td className="font-semibold p-3 border-b text-gray-700">Capacity</td>
                      {compareProducts.map(product => (
                        <td key={product.id} className="text-center p-3 border-b text-sm font-medium">{product.baseCapacity}</td>
                      ))}
                    </tr>
                    <tr>
                      <td className="font-semibold p-3 border-b text-gray-700">Accuracy</td>
                      {compareProducts.map(product => (
                        <td key={product.id} className="text-center p-3 border-b text-sm font-medium">
                          {product.precision && product.precision !== 'N/A' ? `±${product.precision}` : '-'}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="font-semibold p-3 border-b text-gray-700">Brand</td>
                      {compareProducts.map(product => (
                        <td key={product.id} className="text-center p-3 border-b text-sm font-medium">
                          {product.brand || 'Manish Scale'}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="font-semibold p-3 text-gray-700">Action</td>
                      {compareProducts.map(product => (
                        <td key={product.id} className="text-center p-3">
                          <Link
                            to="/quote"
                            onClick={() => setIsCompareDialogOpen(false)}
                            className="inline-block px-4 py-2 bg-emerald-600 text-white text-xs md:text-sm font-bold rounded-lg hover:bg-emerald-700 transition-colors whitespace-nowrap shadow-sm"
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
                  className="w-full sm:w-auto font-semibold"
                >
                  Clear Comparison
                </Button>
                <Button
                  onClick={() => setIsCompareDialogOpen(false)}
                  className="bg-blue-600 hover:bg-blue-700 w-full sm:w-auto font-semibold"
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