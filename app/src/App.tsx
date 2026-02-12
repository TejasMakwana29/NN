import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ScrollToTop } from '@/components/ScrollToTop';
import { Navbar } from '@/sections/Navbar';
import { Footer } from '@/sections/Footer';
import { WhatsAppWidget } from '@/sections/WhatsAppWidget';
import { BackToTop } from '@/components/BackToTop';
import { Home } from '@/pages/Home';
import { Products } from '@/pages/Products';
import { ProductDetail } from '@/pages/ProductDetail';
import { Quote } from '@/pages/Quote';
import { About } from '@/pages/About';
import { Contact } from '@/pages/Contact';
import { Search } from '@/pages/Search';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex flex-col" id="main-scroll-root">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:categorySlug" element={<Products />} />
          <Route path="/products/:categorySlug/:typeSlug" element={<Products />} />
          <Route path="/products/:categorySlug/:typeSlug/:sizeSlug" element={<Products />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/quote" element={<Quote />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/search" element={<Search />} />
          <Route path="/services" element={<div className="flex-1 flex items-center justify-center"><h1 className="text-3xl font-bold">Services Page Coming Soon</h1></div>} />
        </Routes>
        </div>
        <Footer />
        <WhatsAppWidget />
        <BackToTop />
      </div>
    </Router>
  );
}

export default App;
