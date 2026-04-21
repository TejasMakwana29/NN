import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Send,
  Check,
  MessageCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// Comprehensive list of countries, flags, and dial codes
const COUNTRIES = [
  { code: 'IN', dialCode: '+91', name: 'India', flag: '🇮🇳' },
  { code: 'US', dialCode: '+1', name: 'United States / Canada', flag: '🇺🇸' },
  { code: 'GB', dialCode: '+44', name: 'United Kingdom', flag: '🇬🇧' },
  { code: 'AE', dialCode: '+971', name: 'United Arab Emirates', flag: '🇦🇪' },
  { code: 'AU', dialCode: '+61', name: 'Australia', flag: '🇦🇺' },
  { code: 'SG', dialCode: '+65', name: 'Singapore', flag: '🇸🇬' },
  { code: 'ZA', dialCode: '+27', name: 'South Africa', flag: '🇿🇦' },
  { code: 'NZ', dialCode: '+64', name: 'New Zealand', flag: '🇳🇿' },
  { code: 'SA', dialCode: '+966', name: 'Saudi Arabia', flag: '🇸🇦' },
  { code: 'QA', dialCode: '+966', name: 'Qatar', flag: '🇶🇦' },
  { code: 'OM', dialCode: '+974', name: 'Oman', flag: '🇴🇲' },
  { code: 'KW', dialCode: '+965', name: 'Kuwait', flag: '🇰🇼' },
  { code: 'BH', dialCode: '+965', name: 'Bahrain', flag: '🇧🇭' },
  { code: 'MY', dialCode: '+65', name: 'Malaysia', flag: '🇲🇾' },
  { code: 'DE', dialCode: '+49', name: 'Germany', flag: '🇩🇪' },
  { code: 'FR', dialCode: '+49', name: 'France', flag: '🇫🇷' },
  { code: 'IT', dialCode: '+33', name: 'Italy', flag: '🇮🇹' },
  { code: 'ES', dialCode: '+39', name: 'Spain', flag: '🇪🇸' },
  { code: 'NP', dialCode: '+977', name: 'Nepal', flag: '🇳🇵' },
  { code: 'BD', dialCode: '+880', name: 'Bangladesh', flag: '🇧🇩' },
  { code: 'LK', dialCode: '+94', name: 'Sri Lanka', flag: '🇱🇰' },
  { code: 'KE', dialCode: '+27', name: 'Kenya', flag: '🇰🇪' },
  { code: 'NG', dialCode: '+234', name: 'Nigeria', flag: '🇳🇬' },
  { code: 'BR', dialCode: '+234', name: 'Brazil', flag: '🇧🇷' },
  { code: 'MX', dialCode: '+52', name: 'Mexico', flag: '🇲🇽' },
  { code: 'JP', dialCode: '+81', name: 'Japan', flag: '🇯🇵' },
  { code: 'CN', dialCode: '+86', name: 'China', flag: '🇨🇳' },
  { code: 'RU', dialCode: '+7', name: 'Russia', flag: '🇷🇺' },
];

export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneCode: '+91', // Default to India
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccessDialogOpen, setIsSuccessDialogOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Combine phone code and number for the final submission
    const fullPhoneNumber = `${formData.phoneCode} ${formData.phone}`;
    console.log("Submitting:", { ...formData, fullPhoneNumber });

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSuccessDialogOpen(true);
    setFormData({ name: '', email: '', phoneCode: '+91', phone: '', subject: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  // Custom handler for phone to auto-detect country codes
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;

    // Auto-detect country code if user types a '+' sign
    if (value.startsWith('+')) {
      // Sort to match longer codes first (e.g. +971 before +9)
      const sortedCountries = [...COUNTRIES].sort((a, b) => b.dialCode.length - a.dialCode.length);
      const cleanValue = value.replace(/\s/g, ''); // remove spaces for checking
      
      const match = sortedCountries.find(c => cleanValue.startsWith(c.dialCode));

      if (match) {
        // Automatically switch the dropdown to the matched country
        // and remove the dial code from the text input area
        const remainingPhone = cleanValue.slice(match.dialCode.length);
        setFormData(prev => ({
          ...prev,
          phoneCode: match.dialCode,
          phone: remainingPhone
        }));
        return;
      }
    }

    // Normal typing
    setFormData(prev => ({
      ...prev,
      phone: value.replace(/[^\d\s-]/g, '') // Only allow numbers, spaces, and dashes
    }));
  };

  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="bg-blue-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            Contact Us
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-blue-100 max-w-3xl mx-auto text-justify"
          >
            Looking for <strong className="text-white font-semibold">precision you can trust and strength you can rely on</strong>? 
            Get in touch with our team for solutions that deliver <strong className="text-white font-semibold">accurate results and long-lasting performance</strong>.
          </motion.p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-3 gap-12 max-w-6xl mx-auto">
          {/* Contact Info (Remains Unchanged) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-semibold mb-6">Get in Touch</h3>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-600/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="text-justify">
                    <h4 className="font-semibold text-gray-800 mb-2">Manufacturing Unit</h4>
                    <p className="text-gray-600 mb-4">
                      3, Shivaji Nagar, Savarkundla,<br />Dist. Amreli, Gujarat - 364515
                    </p>
                    <h4 className="font-semibold text-gray-800 mb-2">Branch</h4>
                    <p className="text-gray-600">
                      B-21, Shivalik Industrial Park, OPP. Karmbhoomi Estate,<br />Bakrol (Bujrang), Ahmedabad - 382430
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-600/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-1">Phone</h4>
                    <p className="text-gray-600 font-medium">
                      <a href="tel:+919284405090" className="hover:text-blue-600 transition-colors">
                        +91 92844 05090
                      </a><br />
                      <a href="tel:+919426951916" className="hover:text-blue-600 transition-colors">
                        +91 94269 51916
                      </a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-600/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-1">Email</h4>
                    <p className="text-gray-600">
                      <a href="mailto:manishscaleindia@gmail.com" className="hover:text-blue-600 transition-colors">
                        manishscaleindia@gmail.com
                      </a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-600/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-1">Business Hours</h4>
                    <p className="text-gray-600">
                      Monday - Sunday: 9:00 AM - 8:00 PM<br />
                      <span className="text-blue-600 font-medium">Open all 7 days</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* WhatsApp CTA */}
            <div className="bg-[#25D366] rounded-2xl shadow-lg p-6 text-white">
              <div className="flex items-center gap-3 mb-4">
                <MessageCircle className="w-8 h-8" />
                <div>
                  <h4 className="font-semibold">Chat on WhatsApp</h4>
                  <p className="text-sm text-white/80">Get instant responses</p>
                </div>
              </div>
              <a
                href="https://wa.me/919284405090"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full py-3 bg-white text-[#25D366] text-center rounded-lg font-bold hover:bg-gray-100 transition-colors shadow-sm"
              >
                Start Chat
              </a>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">
                      Full Name <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">
                      Email Address <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      required
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {/* --- NEW INTERNATIONAL PHONE FIELD --- */}
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <div className="flex gap-2">
                      <Select 
                        value={formData.phoneCode} 
                        onValueChange={(val) => setFormData(prev => ({ ...prev, phoneCode: val }))}
                      >
                        <SelectTrigger className="w-[110px] shrink-0 bg-white">
                          <SelectValue placeholder="Code" />
                        </SelectTrigger>
                        <SelectContent>
                          {COUNTRIES.map((country, index) => (
                            <SelectItem key={`${country.code}-${index}`} value={country.dialCode}>
                              <span className="flex items-center gap-2">
                                <span>{country.flag}</span>
                                <span>{country.dialCode}</span>
                              </span>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handlePhoneChange}
                        placeholder="98765 43210"
                        className="flex-1"
                      />
                    </div>
                  </div>
                  {/* -------------------------------------- */}

                  <div className="space-y-2">
                    <Label htmlFor="subject">
                      Subject <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="How can we help?"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">
                    Message <span className="text-red-500">*</span>
                  </Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Write your message here..."
                    required
                    rows={6}
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-6 bg-blue-600 hover:bg-indigo-900 text-lg font-bold shadow-lg shadow-blue-200"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5 mr-2" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Two Maps Section */}
      <section className="py-12 bg-gray-50 border-t border-gray-100">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Locations</h2>
            <p className="text-gray-600">Visit us in Savarkundla or Ahmedabad</p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
            {/* Map 1: Manufacturing Unit */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-200 group"
            >
              <div className="p-3 bg-blue-50 border-b border-gray-100">
                <p className="text-xs font-bold text-blue-700 uppercase tracking-wider">Manufacturing Unit - Savarkundla</p>
              </div>
              <div className="h-80 w-full">
                <iframe 
                  src="https://maps.google.com/maps?q=Manish+Scale,+3,+Shivaji+Nagar,+Savarkundla,+Gujarat&t=&z=14&ie=UTF8&iwloc=&output=embed"
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen={true} 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Savarkundla Location"
                ></iframe>
              </div>
            </motion.div>

            {/* Map 2: Ahmedabad Branch */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-200 group"
            >
              <div className="p-3 bg-indigo-50 border-b border-gray-100">
                <p className="text-xs font-bold text-indigo-700 uppercase tracking-wider">Branch - Ahmedabad</p>
              </div>
              <div className="h-80 w-full">
                <iframe 
                  src="https://maps.google.com/maps?q=B-21,+Shivalik+Industrial+Park,+Bakrol,+Ahmedabad&t=&z=14&ie=UTF8&iwloc=&output=embed"
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen={true} 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Ahmedabad Location"
                ></iframe>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Success Dialog */}
      <Dialog open={isSuccessDialogOpen} onOpenChange={setIsSuccessDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center">
              <div className="w-16 h-16 bg-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="w-8 h-8 text-white" />
              </div>
              Message Sent!
            </DialogTitle>
          </DialogHeader>
          <div className="text-center">
            <p className="text-gray-600 mb-6">
              Thank you for reaching out. We've received your message and will get back to you within 24 hours.
            </p>
            <Button
              onClick={() => setIsSuccessDialogOpen(false)}
              className="w-full bg-blue-600 hover:bg-indigo-900"
            >
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </main>
  );
}