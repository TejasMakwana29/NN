import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search as SearchIcon, Scale, ChevronRight, Check } from 'lucide-react';
import { searchProducts, type Product } from '@/data/products';
import { getProductImageUrl, getPlaceholderImageUrl } from '@/lib/productImages';

export function Search() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [results, setResults] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [compareList, setCompareList] = useState<string[]>([]);

  useEffect(() => {
    let cancelled = false;
    const t = setTimeout(() => {
      const searchResults = searchProducts(query);
      if (!cancelled) {
        setResults(searchResults);
        setIsLoading(false);
      }
    }, 600);
    return () => {
      cancelled = true;
      clearTimeout(t);
    };
  }, [query]);

  const toggleCompare = (productId: string) => {
    setCompareList(prev => {
      if (prev.includes(productId)) {
        return prev.filter(id => id !== productId);
      }
      if (prev.length >= 3) return prev;
      return [...prev, productId];
    });
  };

  return (
    <motion.main
      className="min-h-screen bg-gray-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
    >
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-8">
          <nav className="flex items-center gap-2 text-sm text-gray-600 mb-4">
            <Link to="/" className="hover:text-blue-600">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-blue-600">Search Results</span>
          </nav>
          
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Search Results
          </h1>
          <p className="text-gray-600">
            {isLoading ? 'Searching...' : `${results.length} results for "${query}"`}
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-white rounded-xl overflow-hidden shadow-sm">
                <div className="h-56 w-full skeleton-shimmer" />
                <div className="p-4 space-y-3">
                  <div className="h-5 w-3/4 skeleton-shimmer rounded" />
                  <div className="h-4 w-1/2 skeleton-shimmer rounded" />
                  <div className="h-8 w-1/3 skeleton-shimmer rounded" />
                </div>
              </div>
            ))}
          </div>
        ) : results.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16"
          >
            <SearchIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">No results found</h2>
            <p className="text-gray-600 mb-6">
              We couldn't find any products matching "{query}"
            </p>
            <div className="space-y-4">
              <p className="text-gray-500">Try:</p>
              <ul className="text-gray-500 space-y-1">
                <li>Checking your spelling</li>
                <li>Using more general terms</li>
                <li>Trying different keywords</li>
              </ul>
              <Link
                to="/products"
                className="inline-block mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-indigo-900 transition-colors"
              >
                Browse All Products
              </Link>
            </div>
          </motion.div>
        ) : (
          <>
            {compareList.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-4 bg-blue-600/10 rounded-lg flex items-center justify-between"
              >
                <span className="font-medium">
                  {compareList.length} product{compareList.length > 1 ? 's' : ''} selected for comparison
                </span>
                <button
                  onClick={() => setCompareList([])}
                  className="text-sm text-blue-600 hover:underline"
                >
                  Clear
                </button>
              </motion.div>
            )}

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {results.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100"
                >
                  {/* Image - UPDATED TO PERFECT SIZE */}
                  <div className="relative h-56 p-4 overflow-hidden bg-slate-50/50 flex items-center justify-center border-b border-gray-100">
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
                    <div className="absolute top-3 left-3 z-10">
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

                    {/* Category Badge */}
                    <div className="absolute top-3 right-3">
                      <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-xs font-medium text-gray-700 rounded-full shadow-sm">
                        {product.category}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <h3 className="font-semibold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors line-clamp-1">
                      {product.name}
                    </h3>
                    
                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-4 font-medium">
                      <span className="flex items-center gap-1 bg-gray-50 px-2 py-1 rounded border border-gray-100">
                        <Scale className="w-3.5 h-3.5 text-blue-500" />
                        {product.baseCapacity}
                      </span>
                      
                      {/* FIXED: Hide ±N/A here */}
                      {product.precision && product.precision !== 'N/A' && (
                        <span className="bg-gray-50 px-2 py-1 rounded border border-gray-100">
                          ±{product.precision}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center justify-end">
                      <Link
                        to={`/product/${product.id}`}
                        className="flex items-center gap-1 text-sm font-bold text-blue-600 hover:text-blue-800 transition-colors"
                      >
                        View Details
                        <ChevronRight className="w-4 h-4" />
                      </Link>
                    </div>

                    <Link
                      to="/quote"
                      className="mt-4 block w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-center rounded-lg font-bold transition-all duration-300 hover:shadow-md"
                    >
                      Request Quote
                    </Link>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </>
        )}
      </div>
    </motion.main>
  );
}