import { Link } from 'react-router-dom';
import { Instagram, Facebook, Twitter, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-charcoal text-cream pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          <div>
            <h3 className="font-serif text-2xl font-semibold mb-4 text-gold-300">Ethereal</h3>
            <p className="text-cream/70 text-sm leading-relaxed mb-6">
              Curating the finest handcrafted sarees from across India. Tradition meets contemporary elegance.
            </p>
            <div className="flex gap-4">
              <a href="#" className="p-2 rounded-full bg-white/5 hover:bg-gold-500/20 hover:text-gold-300 transition-colors" aria-label="Instagram">
                <Instagram size={18} />
              </a>
              <a href="#" className="p-2 rounded-full bg-white/5 hover:bg-gold-500/20 hover:text-gold-300 transition-colors" aria-label="Facebook">
                <Facebook size={18} />
              </a>
              <a href="#" className="p-2 rounded-full bg-white/5 hover:bg-gold-500/20 hover:text-gold-300 transition-colors" aria-label="Twitter">
                <Twitter size={18} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-serif text-lg mb-4 text-gold-200">Shop</h4>
            <ul className="space-y-2.5 text-sm text-cream/70">
              <li><Link to="/store" className="hover:text-gold-300 transition-colors">All Sarees</Link></li>
              <li><Link to="/collections" className="hover:text-gold-300 transition-colors">Collections</Link></li>
              <li><Link to="/store?category=banarasi" className="hover:text-gold-300 transition-colors">Banarasi</Link></li>
              <li><Link to="/store?category=kanjeevaram" className="hover:text-gold-300 transition-colors">Kanjeevaram</Link></li>
              <li><Link to="/store?category=silk" className="hover:text-gold-300 transition-colors">Pure Silk</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-lg mb-4 text-gold-200">Support</h4>
            <ul className="space-y-2.5 text-sm text-cream/70">
              <li><Link to="/contact" className="hover:text-gold-300 transition-colors">Contact Us</Link></li>
              <li><Link to="/faq" className="hover:text-gold-300 transition-colors">FAQ</Link></li>
              <li><Link to="/about" className="hover:text-gold-300 transition-colors">About Us</Link></li>
              <li><Link to="/blog" className="hover:text-gold-300 transition-colors">Blog</Link></li>
              <li><a href="#" className="hover:text-gold-300 transition-colors">Shipping & Returns</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-lg mb-4 text-gold-200">Contact</h4>
            <ul className="space-y-3 text-sm text-cream/70">
              <li className="flex items-start gap-3">
                <MapPin size={16} className="mt-0.5 shrink-0 text-gold-400" />
                <span>12 Heritage Lane, Mumbai 400001</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={16} className="shrink-0 text-gold-400" />
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={16} className="shrink-0 text-gold-400" />
                <span>hello@etherealsarees.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-cream/50">
          <p>© 2026 Ethereal Sarees. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-gold-300 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-gold-300 transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
