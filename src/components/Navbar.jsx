import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Heart, Menu, X, Search, User } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { useAuth } from '../context/AuthContext';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/store', label: 'Shop' },
  { to: '/collections', label: 'Collections' },
  { to: '/blog', label: 'New Arrivals' },
  { to: '/about', label: 'About Us' },
  { to: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { cartCount, wishlistCount } = useStore();
  const { user, isLoggedIn } = useAuth();
  const location = useLocation();
  const isHome = location.pathname === '/';
  const light = isHome && !scrolled;
  const initial = user?.name?.charAt(0)?.toUpperCase() || 'U';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-[#faf7f2]/95 backdrop-blur-md shadow-sm py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex flex-col group">
            <span
              className={`font-serif text-xl md:text-2xl font-semibold tracking-[0.15em] uppercase transition-colors ${
                light ? 'text-white group-hover:text-[#e8d5a3]' : 'text-charcoal group-hover:text-gold-600'
              }`}
            >
              Saree
            </span>
            <span
              className={`text-[10px] tracking-[0.4em] uppercase -mt-0.5 transition-colors ${
                light ? 'text-[#e8d5a3]' : 'text-gold-500'
              }`}
            >
              Elegance
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `text-xs font-medium tracking-[0.15em] uppercase transition-colors relative after:absolute after:bottom-[-6px] after:left-0 after:h-[1.5px] after:bg-[#c9a84c] after:transition-all after:duration-300 ${
                    isActive
                      ? light
                        ? 'text-[#e8d5a3] after:w-full'
                        : 'text-gold-600 after:w-full'
                      : light
                        ? 'text-white/85 hover:text-[#e8d5a3] after:w-0 hover:after:w-full'
                        : 'text-charcoal/75 hover:text-gold-600 after:w-0 hover:after:w-full'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          <div
            className={`flex items-center gap-3 sm:gap-4 transition-colors ${
              light ? 'text-white' : 'text-charcoal'
            }`}
          >
            <Link
              to="/search"
              className={`p-1.5 transition-colors hidden sm:block ${light ? 'hover:text-[#e8d5a3]' : 'hover:text-gold-600'}`}
              aria-label="Search"
            >
              <Search size={18} strokeWidth={1.5} />
            </Link>

            {/* Account: avatar letter when logged in */}
            <Link
              to={isLoggedIn ? '/account' : '/login'}
              className={`relative flex items-center gap-1.5 p-0.5 transition-colors ${light ? 'hover:opacity-90' : 'hover:opacity-90'}`}
              aria-label={isLoggedIn ? 'My Account' : 'Sign in'}
              title={isLoggedIn ? user.name : 'Sign in'}
            >
              {isLoggedIn ? (
                <span
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold font-serif shadow-sm ring-2 transition-all ${
                    light
                      ? 'bg-[#c9a84c] text-[#2a1a10] ring-[#e8d5a3]/50'
                      : 'bg-gold-500 text-charcoal ring-gold-200'
                  }`}
                >
                  {initial}
                </span>
              ) : (
                <span className={`p-1.5 ${light ? 'hover:text-[#e8d5a3]' : 'hover:text-gold-600'}`}>
                  <User size={18} strokeWidth={1.5} />
                </span>
              )}
            </Link>

            <Link
              to="/wishlist"
              className={`relative p-1.5 transition-colors ${light ? 'hover:text-[#e8d5a3]' : 'hover:text-gold-600'}`}
              aria-label="Wishlist"
            >
              <Heart size={18} strokeWidth={1.5} />
              {wishlistCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-[#a62743] text-white text-[9px] font-semibold rounded-full flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </Link>
            <Link
              to="/cart"
              className={`relative p-1.5 transition-colors ${light ? 'hover:text-[#e8d5a3]' : 'hover:text-gold-600'}`}
              aria-label="Cart"
            >
              <ShoppingBag size={18} strokeWidth={1.5} />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-[#c9a84c] text-[#2a1a10] text-[9px] font-semibold rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`lg:hidden p-1.5 transition-colors ${light ? 'hover:text-[#e8d5a3]' : 'hover:text-gold-600'}`}
              aria-label="Menu"
            >
              {isOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-[#faf7f2] border-t border-gold-100 overflow-hidden"
          >
            <nav className="flex flex-col px-6 py-6 gap-3">
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) =>
                    `text-sm font-medium tracking-wide uppercase py-2 ${
                      isActive ? 'text-gold-600' : 'text-charcoal'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
              <Link
                to={isLoggedIn ? '/account' : '/login'}
                className="flex items-center gap-2 text-sm font-medium py-2 text-charcoal border-t border-gold-100 mt-2 pt-4"
              >
                {isLoggedIn ? (
                  <>
                    <span className="w-7 h-7 rounded-full bg-gold-500 text-charcoal flex items-center justify-center text-xs font-serif font-semibold">
                      {initial}
                    </span>
                    My Account
                  </>
                ) : (
                  <>
                    <User size={16} /> Sign In
                  </>
                )}
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
