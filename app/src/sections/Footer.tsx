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
    <footer className="bg-gradient-to-br from-slate-900 via-indigo-950 to-blue-950 text-slate-300 relative overflow-hidden" role="contentinfo">
      {/* Subtle background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10">
        {/* Trust Badges Strip */}
        <div className="border-b border-indigo-900/50 bg-white/5">
          <div className="container mx-auto px-4 py-6">
            <div className="flex flex-wrap justify-center gap-8 md:gap-16">
              {badges.map((badge, i) => (
                <div key={i} className="flex items-center gap-2 text-blue-100">
                  <badge.icon className="w-5 h-5 text-amber-400" aria-hidden="true" />
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
                <div className="relative w-14 h-14 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-blue-500/50 transition-shadow">
                  <Scale className="w-8 h-8 text-white" aria-hidden="true" />
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-amber-400 rounded-full flex items-center justify-center border-2 border-indigo-950">
                    <span className="text-[8px] font-bold text-gray-900">MS</span>
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">
                    <span className="text-blue-400">Manish</span> Scale
                  </h3>
                  <p className="text-xs text-blue-200 tracking-wider uppercase">Where trust carries weight</p>
                </div>
              </Link>
              <p className="text-blue-100/70 mb-6 leading-relaxed">
                Carrying forward a legacy that began in 1950, we deliver <strong className="text-white font-medium">precision you can trust and strength you can rely on</strong>.
                <br /><br />
                <span className="text-amber-400 font-medium tracking-wide">Manish Scale — A Name of Quality & Precision. A Legacy of Trust.</span>
              </p>
              <div className="flex gap-3">
                <a 
                  href="#" 
                  className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center hover:bg-blue-500 hover:text-white hover:scale-110 transition-all shadow-lg hover:shadow-blue-500/25"
                  aria-label="Facebook"
                >
                  <Facebook className="w-5 h-5" />
                </a>
                <a 
                  href="#" 
                  className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center hover:bg-gradient-to-r hover:from-pink-500 hover:to-purple-500 hover:text-white hover:scale-110 transition-all shadow-lg hover:shadow-pink-500/25"
                  aria-label="Instagram"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a 
                  href="#" 
                  className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center hover:bg-blue-600 hover:text-white hover:scale-110 transition-all shadow-lg hover:shadow-blue-600/25"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a 
                  href="#" 
                  className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center hover:bg-red-500 hover:text-white hover:scale-110 transition-all shadow-lg hover:shadow-red-500/25"
                  aria-label="YouTube"
                >
                  <Youtube className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold mb-6 flex items-center gap-2 text-white">
                <span className="w-1.5 h-6 bg-blue-500 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
                Quick Links
              </h4>
              <ul className="space-y-3" role="list">
                {quickLinks.map((link) => (
                  <li key={link.label}>
                    <Link 
                      to={link.href}
                      className="text-blue-100/70 hover:text-white transition-all duration-300 flex items-center gap-2 group hover:translate-x-1"
                    >
                      <ChevronRight className="w-4 h-4 text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden="true" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Products & Services */}
            <div>
              <h4 className="text-lg font-semibold mb-6 flex items-center gap-2 text-white">
                <span className="w-1.5 h-6 bg-amber-400 rounded-full shadow-[0_0_10px_rgba(251,191,36,0.5)]" />
                Products
              </h4>
              <ul className="space-y-3" role="list">
                {productCategories.map((link) => (
                  <li key={link.label}>
                    <Link 
                      to={link.href}
                      className="text-blue-100/70 hover:text-white transition-all duration-300 flex items-center gap-2 group hover:translate-x-1"
                    >
                      <ChevronRight className="w-4 h-4 text-amber-400 opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden="true" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
              <h4 className="text-lg font-semibold mb-4 mt-8 flex items-center gap-2 text-white">
                <span className="w-1.5 h-6 bg-emerald-400 rounded-full shadow-[0_0_10px_rgba(52,211,153,0.5)]" />
                Services
              </h4>
              <ul className="space-y-3" role="list">
                {services.map((link) => (
                  <li key={link.label}>
                    <Link 
                      to={link.href}
                      className="text-blue-100/70 hover:text-white transition-all duration-300 flex items-center gap-2 group hover:translate-x-1"
                    >
                      <ChevronRight className="w-4 h-4 text-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden="true" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="text-lg font-semibold mb-6 flex items-center gap-2 text-white">
                <span className="w-1.5 h-6 bg-purple-400 rounded-full shadow-[0_0_10px_rgba(167,139,250,0.5)]" />
                Contact Us
              </h4>
              <ul className="space-y-4">
                <li className="flex items-start gap-3 group">
                  <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-blue-500 transition-colors shadow-md">
                    <MapPin className="w-5 h-5 text-blue-300 group-hover:text-white" />
                  </div>
                  <div className="text-blue-100/70 space-y-3">
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
                  <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-emerald-500 transition-colors shadow-md">
                    <Phone className="w-5 h-5 text-emerald-400 group-hover:text-white" aria-hidden="true" />
                  </div>
                  <div>
                    <a href="tel:+919284405090" className="text-blue-100/70 hover:text-white transition-colors block font-medium">
                      +91 92844 05090
                    </a>
                    <a href="tel:+919426951916" className="text-blue-100/50 hover:text-white transition-colors block text-sm">
                      +91 94269 51916
                    </a>
                  </div>
                </li>
                <li className="flex items-center gap-3 group">
                  <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-amber-500 transition-colors shadow-md">
                    <Mail className="w-5 h-5 text-amber-400 group-hover:text-white" aria-hidden="true" />
                  </div>
                  <div>
                    <a href="mailto:manishscaleindia@gmail.com" className="text-blue-100/70 hover:text-white transition-colors block">
                      manishscaleindia@gmail.com
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-3 group">
                  <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-purple-500 transition-colors shadow-md">
                    <Clock className="w-5 h-5 text-purple-400 group-hover:text-white" aria-hidden="true" />
                  </div>
                  <span className="text-blue-100/70">
                    Mon - Sun: 9:00 AM - 8:00 PM<br />
                    <span className="text-blue-100/50">Open all 7 days</span>
                  </span>
                </li>
              </ul>

              {/* Quick Quote Button */}
              <Link
                to="/quote"
                className="mt-8 w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-gradient-to-r from-amber-400 to-orange-500 text-slate-900 rounded-xl font-bold hover:shadow-lg hover:shadow-amber-500/25 hover:scale-[1.02] transition-all"
              >
                Get Free Quote
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-indigo-900/50 bg-slate-950/50 backdrop-blur-sm">
          <div className="container mx-auto px-4 py-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-blue-100/50 text-sm text-center md:text-left">
                © {new Date().getFullYear()} <span className="text-blue-400 font-medium">Manish Scale</span>. All rights reserved. 
                <span className="hidden md:inline"> | A Legacy of Trust Since 1950</span>
              </p>
              <div className="flex flex-wrap justify-center gap-4 md:gap-6 text-sm">
                <Link to="/privacy" className="text-blue-100/50 hover:text-white transition-colors">
                  Privacy Policy
                </Link>
                <Link to="/terms" className="text-blue-100/50 hover:text-white transition-colors">
                  Terms of Service
                </Link>
                <Link to="/sitemap" className="text-blue-100/50 hover:text-white transition-colors">
                  Sitemap
                </Link>
                <a
                  href="https://share.google/BFm1HVLjVwez8BzKC"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-100/50 hover:text-white transition-colors"
                >
                  View on Google Maps
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}