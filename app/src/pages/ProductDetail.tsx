import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ChevronRight, 
  Scale, 
  Shield, 
  Truck, 
  Headphones,
  Share2,
  Heart
} from 'lucide-react';
import { getProductById, getProductsByCategory, type Product } from '@/data/products';
import { getProductImageUrl, getPlaceholderImageUrl } from '@/lib/productImages';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [currentImage, setCurrentImage] = useState<string>(''); 

  useEffect(() => {
    let cancelled = false;
    const t = setTimeout(() => {
      const foundProduct = getProductById(id || '');
      if (cancelled) return;
      if (foundProduct) {
        setProduct(foundProduct);
        
        setCurrentImage(foundProduct.capacities?.[0]?.image || foundProduct.image);
        
        const related = getProductsByCategory(foundProduct.categorySlug || '')
          .filter(p => p.id !== id)
          .slice(0, 4);
        setRelatedProducts(related);
      }
      setIsLoading(false);
    }, 600);
    return () => {
      cancelled = true;
      clearTimeout(t);
    };
  }, [id]);

  if (isLoading) {
    return (
      <motion.main
        className="min-h-screen bg-gray-50 pt-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
      >
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            <div className="aspect-square skeleton-shimmer rounded-xl" />
            <div className="space-y-4">
              <div className="h-8 w-3/4 skeleton-shimmer rounded" />
              <div className="h-6 w-1/2 skeleton-shimmer rounded" />
              <div className="h-12 w-1/3 skeleton-shimmer rounded" />
              <div className="h-24 w-full skeleton-shimmer rounded" />
            </div>
          </div>
        </div>
      </motion.main>
    );
  }

  if (!product) {
    return (
      <motion.main
        className="min-h-screen bg-gray-50 pt-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="container mx-auto px-4 text-center">
          <Scale className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Product Not Found</h1>
          <p className="text-gray-600 mb-6">The product you're looking for doesn't exist.</p>
          <Link to="/products" className="text-blue-600 hover:underline">
            Browse All Products
          </Link>
        </div>
      </motion.main>
    );
  }

  return (
    <motion.main
      className="min-h-screen bg-gray-50"
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center gap-2 text-sm text-gray-600">
            <Link to="/" className="hover:text-blue-600">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <Link to="/products" className="hover:text-blue-600">Products</Link>
            <ChevronRight className="w-4 h-4" />
            {product.category && (
              <>
                <Link to={`/products/${product.categorySlug}`} className="hover:text-blue-600">
                  {product.category}
                </Link>
                <ChevronRight className="w-4 h-4" />
              </>
            )}
            <span className="text-blue-600 font-medium">{product.name}</span>
          </nav>
        </div>
      </div>

      {/* Product Details */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Image Gallery */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
              <div className="aspect-square relative">
                <img
                  src={currentImage} 
                  alt={product.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = getPlaceholderImageUrl(product.name, 600);
                  }}
                />
                <div className="absolute top-4 right-4 flex gap-2">
                  <button
                    onClick={() => setIsWishlisted(!isWishlisted)}
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                      isWishlisted ? 'bg-red-500 text-white' : 'bg-white/90 text-gray-600 hover:bg-white'
                    }`}
                  >
                    <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
                  </button>
                  <button className="w-10 h-10 bg-white/90 rounded-full flex items-center justify-center text-gray-600 hover:bg-white transition-colors">
                    <Share2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              {product.name}
            </h1>

            {/* Capacity Options */}
            {product.capacities && product.capacities.length > 0 && product.capacities[0].weight !== 'N/A' && (
              <div className="mb-8">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Available Capacities:
                </label>
                <div className="flex flex-wrap gap-2">
                  {product.capacities.map((cap, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 border rounded-lg text-sm font-medium bg-white text-gray-700"
                    >
                      {cap.weight}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Link
                to="/quote"
                className="flex-1 py-4 bg-emerald-600 text-white text-center rounded-xl font-semibold hover:bg-emerald-700 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
              >
                Request Quote
              </Link>
              <a
                href={`https://wa.me/919284405090?text=Hi, I'm interested in ${product.name}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-4 bg-[#25D366] text-white text-center rounded-xl font-semibold hover:bg-[#128C7E] transition-all duration-300 hover:scale-[1.02]"
              >
                Inquiry on WhatsApp
              </a>
            </div>

            {/* Features */}
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <Shield className="w-6 h-6 mx-auto mb-2 text-blue-600" />
                <p className="text-xs text-gray-600">1 Year Warranty</p>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <Truck className="w-6 h-6 mx-auto mb-2 text-blue-600" />
                <p className="text-xs text-gray-600">Pan-India Service Network</p>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <Headphones className="w-6 h-6 mx-auto mb-2 text-blue-600" />
                <p className="text-xs text-gray-600">24/7 Support</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Product Tabs */}
        <div className="mt-16">
          <Tabs defaultValue="description" className="bg-white rounded-xl shadow-sm">
            <TabsList className="w-full justify-start border-b rounded-none p-0 h-auto overflow-x-auto flex-nowrap whitespace-nowrap hide-scrollbar">
              <TabsTrigger 
                value="description" 
                className="px-8 py-4 rounded-none data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:text-blue-600"
              >
                Description
              </TabsTrigger>
              <TabsTrigger 
                value="specifications"
                className="px-8 py-4 rounded-none data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:text-blue-600"
              >
                Specifications
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="description" className="p-8">
              <h3 className="text-xl font-semibold mb-4">Product Description</h3>
              <p className="text-gray-600 leading-relaxed">
                The {product.name} is a high-quality weighing solution designed for 
                {product.category ? ` ${product.category.toLowerCase()}` : ' various'} applications.
                {product.baseCapacity && ` With a capacity range of ${product.baseCapacity}`}
                {product.precision && product.precision !== 'N/A' && `, and an accuracy of ±${product.precision}`}
                , it delivers reliable and precise measurements every time. Built with durable materials like {product.bodyMaterial || 'industry-standard components'}, it ensures long-lasting performance for your business needs.
              </p>
            </TabsContent>
            
            <TabsContent value="specifications" className="p-8">
              <h3 className="text-xl font-semibold mb-4">Technical Specifications</h3>
              <table className="w-full max-w-2xl">
                <tbody className="divide-y">
                  {product.capacities && product.capacities[0].weight !== 'N/A' && (
                    <tr>
                      <td className="py-3 text-gray-500">Available Capacities</td>
                      <td className="py-3 font-medium">
                        {product.capacities.map(cap => cap.weight).join(', ')}
                      </td>
                    </tr>
                  )}
                  {product.precision && product.precision !== 'N/A' && (
                    <tr>
                      <td className="py-3 text-gray-500">Accuracy</td>
                      <td className="py-3 font-medium">{product.precision}</td>
                    </tr>
                  )}
                  {product.brand && (
                    <tr>
                      <td className="py-3 text-gray-500">Brand</td>
                      <td className="py-3 font-medium">{product.brand}</td>
                    </tr>
                  )}
                  {product.bodyMaterial && (
                    <tr>
                      <td className="py-3 text-gray-500">Body Material</td>
                      <td className="py-3 font-medium">{product.bodyMaterial}</td>
                    </tr>
                  )}
                  {product.color && (
                    <tr>
                      <td className="py-3 text-gray-500">Color Options</td>
                      <td className="py-3 font-medium">{product.color}</td>
                    </tr>
                  )}
                  {product.panSize && (
                    <tr>
                      <td className="py-3 text-gray-500">Pan Size</td>
                      <td className="py-3 font-medium">{product.panSize}</td>
                    </tr>
                  )}
                  {product.panMaterial && (
                    <tr>
                      <td className="py-3 text-gray-500">Pan Material</td>
                      <td className="py-3 font-medium">{product.panMaterial}</td>
                    </tr>
                  )}
                  {product.weighingOption && (
                    <tr>
                      <td className="py-3 text-gray-500">Weighing Options</td>
                      <td className="py-3 font-medium">{product.weighingOption}</td>
                    </tr>
                  )}
                  {product.displayType && (
                    <tr>
                      <td className="py-3 text-gray-500">Display</td>
                      <td className="py-3 font-medium">{product.displayType}</td>
                    </tr>
                  )}
                  {product.battery && (
                    <tr>
                      <td className="py-3 text-gray-500">Battery</td>
                      <td className="py-3 font-medium">{product.battery}</td>
                    </tr>
                  )}
                  {product.onOff && (
                    <tr>
                      <td className="py-3 text-gray-500">On/Off Operation</td>
                      <td className="py-3 font-medium">{product.onOff}</td>
                    </tr>
                  )}
                  {product.glass && (
                    <tr>
                      <td className="py-3 text-gray-500">Glass Type</td>
                      <td className="py-3 font-medium">{product.glass}</td>
                    </tr>
                  )}
                  {product.adjustable && (
                    <tr>
                      <td className="py-3 text-gray-500">Adjustable</td>
                      <td className="py-3 font-medium">{product.adjustable}</td>
                    </tr>
                  )}
                  {product.hook && (
                    <tr>
                      <td className="py-3 text-gray-500">Hook System</td>
                      <td className="py-3 font-medium">{product.hook}</td>
                    </tr>
                  )}
                  {product.designType && (
                    <tr>
                      <td className="py-3 text-gray-500">Design Type</td>
                      <td className="py-3 font-medium">{product.designType}</td>
                    </tr>
                  )}
                  {product.keyPoints && (
                    <tr>
                      <td className="py-3 text-gray-500">Add ons / Key Points</td>
                      <td className="py-3 font-medium">{product.keyPoints}</td>
                    </tr>
                  )}
                  {product.warranty && (
                    <tr>
                      <td className="py-3 text-gray-500">Warranty</td>
                      <td className="py-3 font-medium">{product.warranty}</td>
                    </tr>
                  )}
                  {/* FEATURES MOVED HERE */}
                  {product.features && product.features.length > 0 && (
                    <tr>
                      <td className="py-3 text-gray-500 align-top">Features</td>
                      <td className="py-3 font-medium">
                        <ul className="list-disc list-inside space-y-1">
                          {product.features.map((feature, idx) => (
                            <li key={idx}>{feature}</li>
                          ))}
                        </ul>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </TabsContent>
          </Tabs>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Related Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <Link
                  key={relatedProduct.id}
                  to={`/product/${relatedProduct.id}`}
                  className="group block bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="aspect-square overflow-hidden bg-gray-100">
                    <img
                      src={getProductImageUrl(relatedProduct, 'medium')}
                      alt={relatedProduct.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">
                      {relatedProduct.name}
                    </h3>
                    <p className="text-sm text-gray-500 mt-2">
                      View details for capacity and specifications
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </motion.main>
  );
}