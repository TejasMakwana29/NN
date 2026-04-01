import { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ChevronRight, 
  Filter, 
  Grid3X3, 
  List,
  Scale,
  Check
} from 'lucide-react';
import { categories, getAllProducts, type Product } from '@/data/products';
import { getProductImageUrl, getPlaceholderImageUrl } from '@/lib/productImages';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

export function Products() {
  const { categorySlug, typeSlug, sizeSlug } = useParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [compareList, setCompareList] = useState<string[]>([]);
  const [isCompareDialogOpen, setIsCompareDialogOpen] = useState(false);
  const [pageTitle, setPageTitle] = useState('All Products');
  const contentTopRef = useRef<HTMLDivElement>(null);

  // Scroll to top when view mode changes so user sees the result
  useEffect(() => {
    contentTopRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [viewMode]);

  useEffect(() => {
    let cancelled = false;
    setIsLoading(true); 

    const t = setTimeout(() => {
      let allProducts = getAllProducts();
      let title = 'All Products';

      if (categorySlug) {
        const category = categories.find(c => c.slug === categorySlug);
        if (category) {
          title = category.name;
          allProducts = allProducts.filter(p => p.categorySlug === categorySlug);

          if (typeSlug && category.types) {
            const type = category.types.find(t => t.slug === typeSlug);
            if (type) {
              title = `${category.name} - ${type.name}`;
              allProducts = allProducts.filter(p => p.type === type.name);
            }
          }

          if (sizeSlug && category.subcategories) {
            const subcategory = category.subcategories.find(s => s.slug === typeSlug);
            if (subcategory && subcategory.sizes) {
              const size = subcategory.sizes.find(s => s.slug === sizeSlug);
              if (size) {
                title = `${category.name} - ${subcategory.name} - ${size.name}`;
                allProducts = allProducts.filter(p => p.size === size.name);
              }
            }
          }
        }
      }

      if (!cancelled) {
        setPageTitle(title);
        setProducts(allProducts);
        setFilteredProducts(allProducts);
        setIsLoading(false);
      }
    }, 400); 

    return () => {
      cancelled = true;
      clearTimeout(t);
    };
  }, [categorySlug, typeSlug, sizeSlug]);

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
      transition: { staggerChildren: 0.08 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 }
    }
  };

  return (
    <motion.main
      className="min-h-screen bg-gray-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
    >
      <div ref={contentTopRef} className="absolute top-0 left-0 w-full h-0" aria-hidden />
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center gap-2 text-sm text-gray-600">
            <Link to="/" className="hover:text-blue-600">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <Link to="/products" className="hover:text-blue-600">Products</Link>
            {categorySlug && (
              <>
                <ChevronRight className="w-4 h-4" />
                <span className="text-blue-600 font-medium">{pageTitle}</span>
              </>
            )}
          </nav>
        </div>
      </div>

      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800">{pageTitle}</h1>
              <p className="text-gray-600 mt-2">
                {products.length} products available
              </p>
            </div>
            
            <div className="flex items-center gap-4">
              {/* View Toggle */}
              <div className="flex bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-md transition-colors ${
                    viewMode === 'grid' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'
                  }`}
                >
                  <Grid3X3 className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-md transition-colors ${
                    viewMode === 'list' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'
                  }`}
                >
                  <List className="w-5 h-5" />
                </button>
              </div>

              {/* Compare Button */}
              {compareList.length > 0 && (
                <Button
                  onClick={() => setIsCompareDialogOpen(true)}
                  className="bg-blue-600 hover:bg-indigo-900"
                >
                  Compare ({compareList.length})
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Sidebar Filters */}
          <aside className="lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-24">
              <div className="flex items-center gap-2 mb-6">
                <Filter className="w-5 h-5 text-gray-700" />
                <h3 className="font-semibold text-gray-800">Categories</h3>
              </div>

              <ul className="space-y-3">
                <li>
                  <Link 
                    to="/products"
                    className={`block text-sm transition-colors ${!categorySlug ? 'text-blue-600 font-bold' : 'text-gray-600 hover:text-blue-600'}`}
                  >
                    All Products
                  </Link>
                </li>
                {categories.map(cat => (
                  <li key={cat.id}>
                    <Link 
                      to={`/products/${cat.slug}`}
                      className={`block text-sm transition-colors ${categorySlug === cat.slug ? 'text-blue-600 font-bold' : 'text-gray-600 hover:text-blue-600'}`}
                    >
                      {cat.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          {/* Product Grid */}
          <div className="flex-1">
            {isLoading ? (
              <div className={`grid gap-6 ${
                viewMode === 'grid' 
                  ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' 
                  : 'grid-cols-1'
              }`}>
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100">
                    <div className="h-56 w-full skeleton-shimmer" />
                    <div className="p-4 space-y-3">
                      <div className="h-5 w-3/4 skeleton-shimmer rounded" />
                      <div className="h-4 w-1/2 skeleton-shimmer rounded" />
                      <div className="h-8 w-1/3 skeleton-shimmer rounded" />
                    </div>
                  </div>
                ))}
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="text-center py-16">
                <Scale className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">No products found</h3>
                <p className="text-gray-500">Try adjusting your filters</p>
              </div>
            ) : (
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className={`grid gap-6 ${
                  viewMode === 'grid' 
                    ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' 
                    : 'grid-cols-1'
                }`}
              >
                {filteredProducts.map((product) => (
                  <motion.div
                    key={product.id}
                    variants={itemVariants}
                    className={`group bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 ${
                      viewMode === 'list' ? 'flex flex-col sm:flex-row' : 'flex flex-col'
                    }`}
                  >
                    {/* Image - UPDATED TO PERFECT SIZE */}
                    <div className={`relative p-4 overflow-hidden bg-slate-50/50 flex items-center justify-center ${
                      viewMode === 'list' ? 'w-full sm:w-64 min-h-[14rem] flex-shrink-0 border-b sm:border-b-0 sm:border-r border-gray-100' : 'h-56 border-b border-gray-100'
                    }`}>
                      <img
                        src={getProductImageUrl(product, 'medium')}
                        alt={product.name}
                        className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110 drop-shadow-md"
                        loading="lazy"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = getPlaceholderImageUrl(product.name);
                        }}
                      />
                      
                      {/* Compare Checkbox */}
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
                        >
                          {compareList.includes(product.id) ? (
                            <Check className="w-4 h-4" />
                          ) : null}
                        </button>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-5 flex-1 flex flex-col">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                          {product.name}
                        </h3>
                      </div>
                      
                      <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500 mb-4 font-medium">
                        <span className="flex items-center gap-1.5 bg-gray-50 px-2 py-1 rounded-md border border-gray-100">
                          <Scale className="w-3.5 h-3.5 text-blue-500" />
                          {product.baseCapacity}
                        </span>
                        
                        {product.precision && product.precision !== 'N/A' && (
                          <span className="bg-gray-50 px-2 py-1 rounded-md border border-gray-100">
                            ±{product.precision}
                          </span>
                        )}
                        
                        {product.category && (
                          <span className="px-2 py-1 bg-blue-50 text-blue-700 rounded-md border border-blue-100 text-xs">
                            {product.category}
                          </span>
                        )}
                      </div>

                      {viewMode === 'list' && product.description && (
                        <p className="text-sm text-gray-600 mb-6 line-clamp-2 leading-relaxed">
                          {product.description.replace(/\*\*/g, '')}
                        </p>
                      )}

                      <div className="flex gap-2 mt-auto">
                        {!['Platform Load Cell', 'Table Top Load Cell', 'Mechanical Hanging Scale Hook', 'Digital Hanging Scale Hook', 'Crane Scale Hook'].includes(product.name) && (
                          <Link
                            to={`/product/${product.id}`}
                            className="flex-1 py-2 border border-blue-600 text-blue-600 text-center rounded-lg font-bold hover:bg-blue-600 hover:text-white transition-colors"
                          >
                            View Details
                          </Link>
                        )}
                        <Link
                          to="/quote"
                          className="flex-1 py-2 bg-emerald-600 text-white text-center rounded-lg font-bold hover:bg-emerald-700 transition-colors shadow-sm"
                        >
                          Get Quote
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* Comparison Dialog */}
      <Dialog open={isCompareDialogOpen} onOpenChange={setIsCompareDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden flex flex-col p-4 md:p-6">
          <DialogHeader className="shrink-0 mb-2">
            <DialogTitle className="text-2xl font-bold flex items-center gap-2">
              <Scale className="w-6 h-6 text-blue-600" />
              Product Comparison
            </DialogTitle>
          </DialogHeader>
          
          {compareProducts.length > 0 ? (
            <div className="flex-1 overflow-y-auto overflow-x-hidden min-h-0">
              <div className="overflow-x-auto pb-4 custom-scrollbar">
                <table className="w-full comparison-table min-w-[600px]">
                  <thead>
                    <tr>
                      <th className="bg-gray-50 text-left p-3 border-b">Feature</th>
                      {compareProducts.map(product => (
                        <th key={product.id} className="text-center p-3 border-b">
                          <div className="flex flex-col items-center">
                            <img
                              src={getProductImageUrl(product, 'thumb')}
                              alt={product.name}
                              className="w-16 h-16 md:w-20 md:h-20 object-contain bg-white border border-gray-200 p-1 rounded-lg mb-2"
                            />
                            <span className="text-xs md:text-sm font-bold max-w-[120px] truncate text-gray-900">{product.name}</span>
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
    </motion.main>
  );
}