import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Menu, 
  X, 
  ChevronDown, 
  ChevronRight,
  Phone, 
  Mail, 
  Clock,
  Facebook,
  Instagram,
  Linkedin,
  Youtube,
  Scale,
  Sparkles
} from 'lucide-react';
import { categories } from '@/data/products';
import { Link, useNavigate, useLocation } from 'react-router-dom';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const megaMenuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let ticking = false;

    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const currentScrollY = window.scrollY;
        
        // Track if we've scrolled past the top
        setIsScrolled(currentScrollY > 50);

        // Smart Navbar Logic
        if (currentScrollY <= 0) {
          // Always show at the very top
          setIsVisible(true);
        } else if (currentScrollY < lastScrollY) {
          // Show when scrolling UP
          setIsVisible(true);
        } else if (currentScrollY > 100 && currentScrollY > lastScrollY) {
          // Hide when scrolling DOWN (past 100px threshold)
          setIsVisible(false);
          setIsMegaMenuOpen(false); // Close mega menu if scrolling away
        }

        lastScrollY = currentScrollY;
        ticking = false;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (megaMenuRef.current && !megaMenuRef.current.contains(event.target as Node)) {
        setIsMegaMenuOpen(false);
        setActiveCategory(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const t = setTimeout(() => {
      setIsMobileMenuOpen(false);
      setIsMegaMenuOpen(false);
    }, 0);
    return () => clearTimeout(t);
  }, [location.pathname]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
    }
  };

  const isActivePath = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  return (
    <header 
      className={`sticky top-0 z-50 w-full transition-transform duration-300 ease-in-out ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      }`}
      role="banner"
    >
      {/* Top Bar - Vibrant Gradient */}
      <div className="bg-gradient-to-r from-blue-900 to-indigo-900 text-blue-100 py-2.5 text-sm border-b border-blue-800/50 shadow-inner">
        <div className="container mx-auto px-4 flex flex-wrap items-center justify-between text-sm">
          <div className="flex items-center gap-4 md:gap-6">
            <a 
              href="mailto:manishscaleindia@gmail.com" 
              className="flex items-center gap-2 hover:text-white transition-colors"
              aria-label="Email us at manishscaleindia@gmail.com"
            >
              <Mail className="w-4 h-4 text-blue-300" aria-hidden="true" />
              <span className="hidden sm:inline">manishscaleindia@gmail.com</span>
            </a>
            {/* Phone icon only, but still clickable */}
            <a 
              href="tel:+919284405090" 
              className="flex items-center gap-2 hover:text-white transition-colors"
              aria-label="Call us at +91 92844 05090"
            >
              <Phone className="w-4 h-4 text-emerald-400" aria-hidden="true" />
            </a>
            <div className="hidden lg:flex items-center gap-2 text-blue-200/80">
              <Clock className="w-4 h-4" aria-hidden="true" />
              <span>Mon - Sun: 9:00 AM - 8:00 PM</span>
            </div>
          </div>
            <div className="flex items-center gap-4">
            <span className="hidden md:flex items-center gap-2 text-blue-200/80 text-xs font-medium">
              <Sparkles className="w-3 h-3 text-amber-400" />
              GST No. 24ADBPM0391A1Z8
            </span>
            <div className="flex items-center gap-3" role="list" aria-label="Social media links">
              <a href="#" className="hover:text-white hover:scale-110 transition-all p-1" aria-label="Facebook" role="listitem">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="hover:text-white hover:scale-110 transition-all p-1" aria-label="Instagram" role="listitem">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="hover:text-white hover:scale-110 transition-all p-1" aria-label="LinkedIn" role="listitem">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="#" className="hover:text-white hover:scale-110 transition-all p-1" aria-label="YouTube" role="listitem">
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav 
        className={`w-full transition-colors duration-500 ${
          isScrolled 
            ? 'bg-white/95 backdrop-blur-md shadow-lg shadow-blue-900/5' 
            : 'bg-white'
        }`}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link 
              to="/" 
              className="flex items-center gap-3 group"
              aria-label="Manish Scale - Home"
            >
              <motion.div 
                className="relative w-14 h-14 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl flex items-center justify-center shadow-md shadow-blue-600/20"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <Scale className="w-8 h-8 text-white" aria-hidden="true" />
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-amber-400 border border-white rounded-full flex items-center justify-center">
                  <span className="text-[8px] font-bold text-gray-900">MS</span>
                </div>
              </motion.div>
              <div>
                <h1 className="text-2xl font-bold">
                  <span className="text-blue-700">Manish</span>
                  <span className="text-slate-700"> Scale</span>
                </h1>
                <p className="text-xs font-semibold text-blue-500/80 -mt-0.5 tracking-wider uppercase">Where trust carries weight</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              <Link 
                to="/" 
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                  isActivePath('/') && location.pathname === '/'
                    ? 'text-blue-700 bg-blue-50' 
                    : 'text-slate-600 hover:text-blue-600 hover:bg-slate-50'
                }`}
              >
                Home
              </Link>
              
              {/* Products Mega Menu */}
              <div className="relative" ref={megaMenuRef}>
                <button
                  onClick={() => setIsMegaMenuOpen(!isMegaMenuOpen)}
                  onMouseEnter={() => setIsMegaMenuOpen(true)}
                  className={`flex items-center gap-1 px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                    isActivePath('/products') || isMegaMenuOpen
                      ? 'text-blue-700 bg-blue-50' 
                      : 'text-slate-600 hover:text-blue-600 hover:bg-slate-50'
                  }`}
                  aria-expanded={isMegaMenuOpen}
                  aria-haspopup="true"
                >
                  Products
                  <motion.div
                    animate={{ rotate: isMegaMenuOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </motion.div>
                </button>

                <AnimatePresence>
                  {isMegaMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-1/2 -translate-x-1/2 w-[850px] mt-2 bg-white rounded-xl shadow-2xl border border-blue-100 overflow-hidden z-50"
                      onMouseLeave={() => {
                        setIsMegaMenuOpen(false);
                        setActiveCategory(null);
                      }}
                      role="menu"
                    >
                      <div className="flex">
                        {/* Categories List */}
                        <div className="w-64 bg-slate-50/80 border-r border-slate-100 py-4">
                          <div className="px-4 mb-3">
                            <span className="text-xs font-bold text-blue-500 uppercase tracking-wider">Categories</span>
                          </div>
                          {categories.map((category) => (
                            <button
                              key={category.id}
                              onMouseEnter={() => setActiveCategory(category.id)}
                              onClick={() => {
                                navigate(`/products/${category.slug}`);
                                setIsMegaMenuOpen(false);
                              }}
                              className={`w-full flex items-center justify-between px-4 py-3 text-left transition-all duration-200 ${
                                activeCategory === category.id 
                                  ? 'bg-white text-blue-700 border-l-4 border-blue-600 font-semibold shadow-sm' 
                                  : 'text-slate-600 hover:bg-white/70 border-l-4 border-transparent font-medium'
                              }`}
                              role="menuitem"
                            >
                              <span>{category.name}</span>
                              <ChevronRight className={`w-4 h-4 ${activeCategory === category.id ? 'text-blue-600' : 'text-slate-400'}`} />
                            </button>
                          ))}
                        </div>

                        {/* Category Details */}
                        <div className="flex-1 p-6">
                          {activeCategory ? (
                            <motion.div
                              key={activeCategory}
                              initial={{ opacity: 0, x: 20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.2 }}
                            >
                              {categories.filter(c => c.id === activeCategory).map(category => (
                                <div key={category.id}>
                                  <div className="flex items-center gap-3 mb-4">
                                    <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-xl flex items-center justify-center text-blue-600 border border-blue-200">
                                      <Scale className="w-5 h-5" />
                                    </div>
                                    <div>
                                      <h3 className="font-bold text-slate-900 text-lg">{category.name}</h3>
                                      <p className="text-sm text-slate-500">{category.description}</p>
                                    </div>
                                  </div>
                                  
                                  <div className="grid grid-cols-2 gap-2">
                                    {category.types?.map((type) => (
                                      <Link
                                        key={type.id}
                                        to={`/products/${category.slug}/${type.slug}`}
                                        onClick={() => setIsMegaMenuOpen(false)}
                                        className="flex items-center gap-2 p-2 rounded-lg text-sm text-slate-600 hover:text-blue-700 hover:bg-blue-50 transition-colors font-medium"
                                      >
                                        <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                                        {type.name}
                                      </Link>
                                    ))}
                                    {category.subcategories?.map((sub) => (
                                      <Link
                                        key={sub.id}
                                        to={`/products/${category.slug}/${sub.slug}`}
                                        onClick={() => setIsMegaMenuOpen(false)}
                                        className="flex items-center gap-2 p-2 rounded-lg text-sm text-slate-600 hover:text-blue-700 hover:bg-blue-50 transition-colors font-medium"
                                      >
                                        <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                                        {sub.name}
                                      </Link>
                                    ))}
                                    {category.products?.slice(0, 4).map((product) => (
                                      <Link
                                        key={product.id}
                                        to={`/product/${product.id}`}
                                        onClick={() => setIsMegaMenuOpen(false)}
                                        className="flex items-center gap-2 p-2 rounded-lg text-sm text-slate-600 hover:text-blue-700 hover:bg-blue-50 transition-colors font-medium"
                                      >
                                        <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                                        {product.name}
                                      </Link>
                                    ))}
                                  </div>

                                  <Link
                                    to={`/products/${category.slug}`}
                                    onClick={() => setIsMegaMenuOpen(false)}
                                    className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-blue-600 hover:text-blue-800"
                                  >
                                    View all {category.name}
                                    <ChevronRight className="w-4 h-4" />
                                  </Link>
                                </div>
                              ))}
                            </motion.div>
                          ) : (
                            <div className="flex flex-col items-center justify-center h-full text-center py-8">
                              <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-4">
                                <Scale className="w-8 h-8 text-blue-200" />
                              </div>
                              <p className="text-slate-500 font-medium">Hover over a category to see products</p>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Bottom Bar */}
                      <div className="px-6 py-4 bg-gradient-to-r from-slate-50 to-blue-50 flex items-center justify-between border-t border-blue-100/50">
                        <div className="flex items-center gap-2 text-slate-700">
                          <Sparkles className="w-5 h-5 text-amber-500" />
                          <span className="font-bold">Precision Engineered. Trust Delivered.</span>
                          <span className="text-slate-500 font-medium ml-1">Since 1950</span>
                        </div>
                        <Link
                          to="/products"
                          onClick={() => setIsMegaMenuOpen(false)}
                          className="px-5 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-sm"
                        >
                          View All Products
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <Link 
                to="/about" 
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                  isActivePath('/about')
                    ? 'text-blue-700 bg-blue-50' 
                    : 'text-slate-600 hover:text-blue-600 hover:bg-slate-50'
                }`}
              >
                About
              </Link>
              <Link 
                to="/contact" 
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                  isActivePath('/contact')
                    ? 'text-blue-700 bg-blue-50' 
                    : 'text-slate-600 hover:text-blue-600 hover:bg-slate-50'
                }`}
              >
                Contact
              </Link>
            </div>

            {/* Search & CTA */}
            <div className="hidden lg:flex items-center gap-3">
              <form onSubmit={handleSearch} className="relative group">
                <input
                  type="text"
                  placeholder="Search scales..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-52 pl-4 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:bg-white focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all"
                  aria-label="Search for scales"
                />
                <button 
                  type="submit" 
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-blue-600 transition-colors"
                  aria-label="Submit search"
                >
                  <Search className="w-5 h-5" />
                </button>
              </form>
              <a
                href="tel:+919284405090"
                className="flex items-center gap-2 px-4 py-2.5 text-slate-700 hover:text-blue-600 transition-colors"
                aria-label="Call us"
              >
                <Phone className="w-5 h-5 text-emerald-500" />
                <span className="font-bold">Call</span>
              </a>
              <Link
                to="/quote"
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white px-6 py-2.5 rounded-xl font-semibold transition-all duration-300 shadow-md shadow-blue-600/20 hover:shadow-lg hover:shadow-blue-600/40 hover:-translate-y-0.5"
              >
                Get Quote
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-blue-50 text-slate-700 hover:text-blue-600 transition-colors"
              aria-expanded={isMobileMenuOpen}
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              <motion.div
                animate={{ rotate: isMobileMenuOpen ? 90 : 0 }}
                transition={{ duration: 0.2 }}
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </motion.div>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden bg-white border-t border-blue-100 shadow-xl"
              role="menu"
            >
              <div className="container mx-auto px-4 py-6">
                {/* Search */}
                <form onSubmit={handleSearch} className="relative mb-6">
                  <input
                    type="text"
                    placeholder="Search scales..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-4 pr-12 py-4 bg-slate-50 border border-slate-200 rounded-xl text-base focus:outline-none focus:bg-white focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all"
                  />
                  <button 
                    type="submit" 
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shadow-md shadow-blue-600/20"
                  >
                    <Search className="w-4 h-4 text-white" />
                  </button>
                </form>
                
                {/* Navigation Links */}
                <nav className="space-y-1" role="menubar">
                  <Link
                    to="/"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center gap-3 py-4 px-4 rounded-xl font-bold transition-all ${
                      location.pathname === '/' 
                        ? 'bg-blue-50 text-blue-700' 
                        : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <span className="w-2 h-2 rounded-full bg-blue-600" />
                    Home
                  </Link>

                  <div className="py-2">
                    <Link
                      to="/products"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`flex items-center gap-3 py-4 px-4 rounded-xl font-bold transition-all ${
                        isActivePath('/products')
                          ? 'bg-blue-50 text-blue-700' 
                          : 'text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <span className="w-2 h-2 rounded-full bg-blue-600" />
                      All Products
                    </Link>
                    
                    <div className="ml-6 mt-2 space-y-1 border-l-2 border-blue-100 pl-4">
                      {categories.map((category) => (
                        <Link
                          key={category.id}
                          to={`/products/${category.slug}`}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="block py-2.5 px-3 text-sm font-medium text-slate-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors"
                        >
                          {category.name}
                        </Link>
                      ))}
                    </div>
                  </div>

                  <Link
                    to="/about"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center gap-3 py-4 px-4 rounded-xl font-bold transition-all ${
                      isActivePath('/about')
                        ? 'bg-blue-50 text-blue-700' 
                        : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <span className="w-2 h-2 rounded-full bg-blue-600" />
                    About Us
                  </Link>
                  
                  <Link
                    to="/contact"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center gap-3 py-4 px-4 rounded-xl font-bold transition-all ${
                      isActivePath('/contact')
                        ? 'bg-blue-50 text-blue-700' 
                        : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <span className="w-2 h-2 rounded-full bg-blue-600" />
                    Contact
                  </Link>
                </nav>
                
                {/* CTA Buttons */}
                <div className="mt-6 space-y-3">
                  <a
                    href="tel:+919284405090"
                    className="flex items-center justify-center gap-2 w-full py-4 border-2 border-blue-100 text-blue-700 rounded-xl font-bold hover:bg-blue-50 transition-colors"
                  >
                    <Phone className="w-5 h-5 text-emerald-500" />
                    Call: +91 92844 05090
                  </a>
                  <Link
                    to="/quote"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center justify-center gap-2 w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-bold shadow-lg shadow-blue-500/30"
                  >
                    <Sparkles className="w-5 h-5 text-amber-300" />
                    Get Free Quote
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}