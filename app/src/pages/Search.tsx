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

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price);
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
            <Link to="/" className="hover:text-[#0056b3]">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-[#0056b3]">Search Results</span>
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
                <div className="aspect-square skeleton-shimmer" />
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
                className="inline-block mt-6 px-6 py-3 bg-[#0056b3] text-white rounded-lg font-medium hover:bg-[#003d80] transition-colors"
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
                className="mb-6 p-4 bg-[#0056b3]/10 rounded-lg flex items-center justify-between"
              >
                <span className="font-medium">
                  {compareList.length} product{compareList.length > 1 ? 's' : ''} selected for comparison
                </span>
                <button
                  onClick={() => setCompareList([])}
                  className="text-sm text-[#0056b3] hover:underline"
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
                  className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  {/* Image */}
                  <div className="relative aspect-square overflow-hidden bg-gray-100">
                    <img
                      src={getProductImageUrl(product, 'medium')}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
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
                        className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                          compareList.includes(product.id)
                            ? 'bg-[#0056b3] text-white'
                            : 'bg-white/90 text-gray-400 hover:bg-white'
                        }`}
                      >
                        {compareList.includes(product.id) ? (
                          <Check className="w-4 h-4" />
                        ) : (
                          <span className="text-xs">VS</span>
                        )}
                      </button>
                    </div>

                    {/* Category Badge */}
                    <div className="absolute top-3 right-3">
                      <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-xs font-medium text-gray-700 rounded-full">
                        {product.category}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <h3 className="font-semibold text-gray-800 mb-2 group-hover:text-[#0056b3] transition-colors">
                      {product.name}
                    </h3>
                    
                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                      <span className="flex items-center gap-1">
                        <Scale className="w-4 h-4" />
                        {product.capacity}
                      </span>
                      <span>±{product.precision}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-xl font-bold text-[#0056b3]">
                        {formatPrice(product.price)}
                      </span>
                      <Link
                        to={`/product/${product.id}`}
                        className="flex items-center gap-1 text-sm font-medium text-gray-500 hover:text-[#0056b3] transition-colors"
                      >
                        Details
                        <ChevronRight className="w-4 h-4" />
                      </Link>
                    </div>

                    <Link
                      to="/quote"
                      className="mt-4 block w-full py-2.5 bg-[#28a745] hover:bg-[#1e7e34] text-white text-center rounded-lg font-medium transition-all duration-300 hover:scale-[1.02] hover:shadow-md"
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
