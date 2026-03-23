import { Link } from 'react-router-dom';
import { 
  Scale, 
  MapPin, 
  Phone, 
  Mail, 
  Clock,
  Facebook,
  Instagram,
  Linkedin,
  Youtube,
  ChevronRight,
  Award,
  Shield,
  Truck,
  ArrowRight
} from 'lucide-react';

export function Footer() {
  const quickLinks = [
    { label: 'Home', href: '/' },
    { label: 'Products', href: '/products' },
    { label: 'About Us', href: '/about' },
    { label: 'Contact', href: '/contact' },
    { label: 'Request Quote', href: '/quote' }
  ];

  const productCategories = [
    { label: 'Counter Scales', href: '/products/counter' },
    { label: 'Beam Scales', href: '/products/beam' },
    { label: 'Electronic Scales', href: '/products/electronic' },
    { label: 'Hanging Scales', href: '/products/hanging' },
    { label: 'Accessories', href: '/products/accessories' }
  ];

  const services = [
    { label: 'Scale Calibration', href: '/services' },
    { label: 'Repair & Maintenance', href: '/services' },
    { label: 'Installation', href: '/services' },
    { label: 'Annual Contracts', href: '/services' }
  ];

const badges = [
    { icon: Award, label: 'ISO Certified' },
    { icon: Shield, label: 'Registered Trademark' },
    { icon: Truck, label: 'GST No. 24ADBPM0391A1Z8' }
  ];

  return (
    <footer className="bg-gradient-to-b from-gray-900 to-gray-950 text-white" role="contentinfo">
      {/* Trust Badges Strip */}
      <div className="border-b border-gray-800">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-wrap justify-center gap-8 md:gap-16">
            {badges.map((badge, i) => (
              <div key={i} className="flex items-center gap-2 text-gray-400">
                <badge.icon className="w-5 h-5 text-amber-500" aria-hidden="true" />
                <span className="text-sm font-medium">{badge.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Company Info */}
          <div>
            <Link to="/" className="flex items-center gap-3 mb-6 group" aria-label="Manish Scale Home">
              <div className="relative w-14 h-14 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-blue-500/30 transition-shadow">
                <Scale className="w-8 h-8 text-white" aria-hidden="true" />
                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-amber-400 rounded-full flex items-center justify-center">
                  <span className="text-[8px] font-bold text-gray-900">MS</span>
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-bold">
                  <span className="text-blue-400">Manish</span> Scale
                </h3>
                <p className="text-xs text-gray-500 tracking-wider uppercase">Where trust carries weight</p>
              </div>
            </Link>
            <p className="text-gray-400 mb-6 leading-relaxed">
  A legacy of trust beginning in 1952 as India's first beam scale manufacturer. 
  Today, Manish Scale continues to set the standard for quality, precision, 
  and durability in weighing solutions across the nation.
</p>
            <div className="flex gap-3">
              <a 
                href="#" 
                className="w-10 h-10 bg-gray-800 rounded-xl flex items-center justify-center hover:bg-blue-600 hover:scale-110 transition-all"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-gray-800 rounded-xl flex items-center justify-center hover:bg-gradient-to-r hover:from-pink-500 hover:to-purple-500 hover:scale-110 transition-all"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-gray-800 rounded-xl flex items-center justify-center hover:bg-blue-700 hover:scale-110 transition-all"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-gray-800 rounded-xl flex items-center justify-center hover:bg-red-600 hover:scale-110 transition-all"
                aria-label="YouTube"
              >
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-blue-500 rounded-full" />
              Quick Links
            </h4>
            <ul className="space-y-3" role="list">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link 
                    to={link.href}
                    className="text-gray-400 hover:text-white transition-all duration-300 flex items-center gap-2 group hover:translate-x-1"
                  >
                    <ChevronRight className="w-4 h-4 text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden="true" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Products */}
          <div>
            <h4 className="text-lg font-semibold mb-6 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-amber-500 rounded-full" />
              Products
            </h4>
            <ul className="space-y-3" role="list">
              {productCategories.map((link) => (
                <li key={link.label}>
                  <Link 
                    to={link.href}
                    className="text-gray-400 hover:text-white transition-all duration-300 flex items-center gap-2 group hover:translate-x-1"
                  >
                    <ChevronRight className="w-4 h-4 text-amber-500 opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden="true" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <h4 className="text-lg font-semibold mb-4 mt-8 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-emerald-500 rounded-full" />
              Services
            </h4>
            <ul className="space-y-3" role="list">
              {services.map((link) => (
                <li key={link.label}>
                  <Link 
                    to={link.href}
                    className="text-gray-400 hover:text-white transition-all duration-300 flex items-center gap-2 group hover:translate-x-1"
                  >
                    <ChevronRight className="w-4 h-4 text-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden="true" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-6 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-purple-500 rounded-full" />
              Contact Us
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 group">
  <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-blue-600 transition-colors">
    <MapPin className="w-5 h-5 text-blue-400 group-hover:text-white" />
  </div>
  <div className="text-gray-400 space-y-3">
    <div>
      <h5 className="text-white font-medium mb-1">Head Office & Mfg. Unit</h5>
      <p>3, Shivaji Nagar, Savarkundla,<br />Dist. Amreli, Gujarat - 364515</p>
    </div>
    <div>
      <h5 className="text-white font-medium mb-1">Ahmedabad Branch</h5>
      <p>B-21, Shivalik Industrial Park, OPP. Karmbhoomi Estate,<br />Bakrol (Bujrang), Ahmedabad - 382430</p>
    </div>
  </div>
</li>
              <li className="flex items-center gap-3 group">
                <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-green-600 transition-colors">
                  <Phone className="w-5 h-5 text-green-400 group-hover:text-white" aria-hidden="true" />
                </div>
                <div>
                  <a href="tel:+919284405090" className="text-gray-400 hover:text-white transition-colors block font-medium">
                    +91 92844 05090
                  </a>
                  <a href="tel:+919426951916" className="text-gray-500 hover:text-white transition-colors block text-sm">
                    +91 94269 51916
                  </a>
                </div>
              </li>
              <li className="flex items-center gap-3 group">
                <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-amber-600 transition-colors">
                  <Mail className="w-5 h-5 text-amber-400 group-hover:text-white" aria-hidden="true" />
                </div>
                <div>
                  <a href="mailto:manishscaleindia@gmail.com" className="text-gray-400 hover:text-white transition-colors block">
                    manishscaleindia@gmail.com
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3 group">
                <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-purple-600 transition-colors">
                  <Clock className="w-5 h-5 text-purple-400 group-hover:text-white" aria-hidden="true" />
                </div>
                <span className="text-gray-400">
                  Mon - Sun: 9:00 AM - 8:00 PM<br />
                  <span className="text-gray-500">Open all 7 days</span>
                </span>
              </li>
            </ul>

            {/* Quick Quote Button */}
            <Link
              to="/quote"
              className="mt-6 w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-400 text-gray-900 rounded-xl font-semibold hover:shadow-lg hover:shadow-amber-500/20 transition-all"
            >
              Get Free Quote
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800 bg-gray-950/50">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-500 text-sm text-center md:text-left">
              © {new Date().getFullYear()} <span className="text-blue-400">Manish Scale</span>. All rights reserved. 
              <span className="hidden md:inline"> | A Legacy of Trust Since 1952</span>
            </p>
            <div className="flex flex-wrap justify-center gap-4 md:gap-6 text-sm">
              <Link to="/privacy" className="text-gray-500 hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-gray-500 hover:text-white transition-colors">
                Terms of Service
              </Link>
              <Link to="/sitemap" className="text-gray-500 hover:text-white transition-colors">
                Sitemap
              </Link>
              <a
                href="https://share.google/BFm1HVLjVwez8BzKC"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-white transition-colors"
              >
                View on Google Maps
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
