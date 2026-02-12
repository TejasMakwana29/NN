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
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 50000]);
  const [compareList, setCompareList] = useState<string[]>([]);
  const [isCompareDialogOpen, setIsCompareDialogOpen] = useState(false);
  const [pageTitle, setPageTitle] = useState('All Products');
  const contentTopRef = useRef<HTMLDivElement>(null);

  // Scroll to top when view mode or filters change so user sees the result
  useEffect(() => {
    contentTopRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [viewMode, priceRange]);

  useEffect(() => {
    let cancelled = false;
    const t = setTimeout(() => {
      let allProducts = getAllProducts();
      let title = 'All Products';

      if (categorySlug) {
        const category = categories.find(c => c.slug === categorySlug);
        if (category) {
          title = category.name;
          allProducts = allProducts.filter((p): p is Product & { categorySlug?: string } => (p as Product & { categorySlug?: string }).categorySlug === categorySlug);

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
    }, 800);
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

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price);
  };

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
            <Link to="/" className="hover:text-[#0056b3]">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <Link to="/products" className="hover:text-[#0056b3]">Products</Link>
            {categorySlug && (
              <>
                <ChevronRight className="w-4 h-4" />
                <span className="text-[#0056b3] font-medium">{pageTitle}</span>
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
                  className="bg-[#0056b3] hover:bg-[#003d80]"
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
                <Filter className="w-5 h-5" />
                <h3 className="font-semibold">Filters</h3>
              </div>

              {/* Categories */}
              <div className="mb-6">
                <h4 className="font-medium mb-3">Categories</h4>
                <ul className="space-y-2">
                  <li>
                    <Link 
                      to="/products"
                      className={`text-sm ${!categorySlug ? 'text-[#0056b3] font-medium' : 'text-gray-600 hover:text-[#0056b3]'}`}
                    >
                      All Products
                    </Link>
                  </li>
                  {categories.map(cat => (
                    <li key={cat.id}>
                      <Link 
                        to={`/products/${cat.slug}`}
                        className={`text-sm ${categorySlug === cat.slug ? 'text-[#0056b3] font-medium' : 'text-gray-600 hover:text-[#0056b3]'}`}
                      >
                        {cat.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <h4 className="font-medium mb-3">Price Range</h4>
                <input
                  type="range"
                  min="0"
                  max="50000"
                  value={priceRange[1]}
                  onChange={(e) => {
                    const newMax = parseInt(e.target.value);
                    setPriceRange([0, newMax]);
                    setFilteredProducts(products.filter(p => p.price <= newMax));
                  }}
                  className="w-full accent-[#0056b3]"
                />
                <div className="flex justify-between text-sm text-gray-600 mt-2">
                  <span>₹0</span>
                  <span>₹{priceRange[1].toLocaleString()}</span>
                </div>
              </div>
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
                    className={`group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 ${
                      viewMode === 'list' ? 'flex' : ''
                    }`}
                  >
                    {/* Image */}
                    <div className={`relative overflow-hidden bg-gray-100 ${
                      viewMode === 'list' ? 'w-48 flex-shrink-0' : 'aspect-square'
                    }`}>
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
                    </div>

                    {/* Content */}
                    <div className="p-5 flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-semibold text-gray-800 group-hover:text-[#0056b3] transition-colors">
                          {product.name}
                        </h3>
                      </div>
                      
                      <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500 mb-4">
                        <span className="flex items-center gap-1">
                          <Scale className="w-4 h-4" />
                          {product.capacity}
                        </span>
                        <span>±{product.precision}</span>
                        {product.category && (
                          <span className="px-2 py-1 bg-gray-100 rounded text-xs">
                            {product.category}
                          </span>
                        )}
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-xl font-bold text-[#0056b3]">
                          {formatPrice(product.price)}
                        </span>
                      </div>

                      <div className="flex gap-2 mt-4">
                        <Link
                          to={`/product/${product.id}`}
                          className="flex-1 py-2 border border-[#0056b3] text-[#0056b3] text-center rounded-lg font-medium hover:bg-[#0056b3] hover:text-white transition-colors"
                        >
                          View Details
                        </Link>
                        <Link
                          to="/quote"
                          className="flex-1 py-2 bg-[#28a745] text-white text-center rounded-lg font-medium hover:bg-[#1e7e34] transition-colors"
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
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">Product Comparison</DialogTitle>
          </DialogHeader>
          
          {compareProducts.length > 0 ? (
            <div className="mt-4">
              <table className="w-full comparison-table">
                <thead>
                  <tr>
                    <th className="bg-gray-50">Feature</th>
                    {compareProducts.map(product => (
                      <th key={product.id} className="text-center">
                        <div className="flex flex-col items-center">
                          <img
                            src={getProductImageUrl(product, 'thumb')}
                            alt={product.name}
                            className="w-20 h-20 object-cover rounded-lg mb-2"
                          />
                          <span className="text-sm">{product.name}</span>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="font-semibold">Category</td>
                    {compareProducts.map(product => (
                      <td key={product.id} className="text-center">{product.category}</td>
                    ))}
                  </tr>
                  <tr>
                    <td className="font-semibold">Capacity</td>
                    {compareProducts.map(product => (
                      <td key={product.id} className="text-center">{product.capacity}</td>
                    ))}
                  </tr>
                  <tr>
                    <td className="font-semibold">Precision</td>
                    {compareProducts.map(product => (
                      <td key={product.id} className="text-center">±{product.precision}</td>
                    ))}
                  </tr>
                  <tr>
                    <td className="font-semibold">Price</td>
                    {compareProducts.map(product => (
                      <td key={product.id} className="text-center font-bold text-[#0056b3]">
                        {formatPrice(product.price)}
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
              
              <div className="mt-6 flex justify-end gap-3">
                <Button
                  variant="outline"
                  onClick={() => {
                    setCompareList([]);
                    setIsCompareDialogOpen(false);
                  }}
                >
                  Clear Comparison
                </Button>
                <Button
                  onClick={() => setIsCompareDialogOpen(false)}
                  className="bg-[#0056b3] hover:bg-[#003d80]"
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
