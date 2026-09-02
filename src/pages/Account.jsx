import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  User,
  Package,
  Heart,
  MapPin,
  LogOut,
  Mail,
  Phone,
  Calendar,
  ShoppingBag,
  ChevronRight,
  Sparkles,
  Truck,
  CheckCircle2,
  Clock,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useStore } from '../context/StoreContext';
import { formatPrice } from '../data/products';

const statusStyle = {
  Delivered: {
    bg: 'bg-emerald-50',
    text: 'text-emerald-700',
    icon: CheckCircle2,
  },
  Shipped: {
    bg: 'bg-sky-50',
    text: 'text-sky-700',
    icon: Truck,
  },
  Processing: {
    bg: 'bg-amber-50',
    text: 'text-amber-700',
    icon: Clock,
  },
};

export default function Account() {
  const { user, orders, logout, isLoggedIn } = useAuth();
  const { wishlistCount, cartCount } = useStore();
  const navigate = useNavigate();

  if (!isLoggedIn) {
    return (
      <div className="pt-24 pb-20 min-h-[70vh] flex items-center">
        <div className="max-w-lg mx-auto px-4 text-center">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-gold-100 to-gold-200 text-gold-700 flex items-center justify-center mx-auto mb-6 shadow-inner">
            <User size={32} strokeWidth={1.5} />
          </div>
          <h1 className="font-serif text-3xl md:text-4xl text-charcoal mb-3">My Account</h1>
          <p className="text-charcoal/60 text-sm mb-8 max-w-sm mx-auto">
            Sign in to track orders, manage your wishlist and enjoy a personalised shopping experience.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/login"
              className="bg-gold-500 hover:bg-gold-400 text-charcoal font-semibold px-8 py-3.5 rounded-full transition-colors shadow-md shadow-gold-500/20"
            >
              Sign In
            </Link>
            <Link
              to="/signup"
              className="border border-gold-300 hover:border-gold-500 text-charcoal font-medium px-8 py-3.5 rounded-full transition-colors"
            >
              Create Account
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const initial = user.name.charAt(0).toUpperCase();
  const deliveredCount = orders.filter((o) => o.status === 'Delivered').length;

  return (
    <div className="pt-24 pb-20 bg-gradient-to-b from-gold-50/40 to-cream min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero banner */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden rounded-2xl bg-charcoal text-cream p-6 sm:p-8 md:p-10 mb-8 shadow-xl"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-gold-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
          <div className="absolute bottom-0 left-1/3 w-40 h-40 bg-gold-400/10 rounded-full blur-2xl pointer-events-none" />

          <div className="relative flex flex-col sm:flex-row sm:items-center gap-6">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-gold-400 to-gold-600 text-charcoal flex items-center justify-center text-3xl sm:text-4xl font-serif font-semibold shadow-lg ring-4 ring-gold-500/30 shrink-0">
              {initial}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-gold-300 text-xs tracking-[0.2em] uppercase mb-1 flex items-center gap-1.5">
                <Sparkles size={12} /> Member
              </p>
              <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl text-cream mb-1 truncate">
                {user.name}
              </h1>
              <p className="text-cream/55 text-sm truncate">{user.email}</p>
            </div>
            <button
              onClick={handleLogout}
              className="inline-flex items-center justify-center gap-2 text-sm text-cream/70 hover:text-cream border border-white/15 hover:border-white/30 px-5 py-2.5 rounded-full transition-colors self-start sm:self-center"
            >
              <LogOut size={15} /> Sign Out
            </button>
          </div>

          {/* Quick stats */}
          <div className="relative grid grid-cols-3 gap-3 mt-8 pt-6 border-t border-white/10">
            {[
              { label: 'Orders', value: orders.length, icon: Package },
              { label: 'Delivered', value: deliveredCount, icon: CheckCircle2 },
              { label: 'Wishlist', value: wishlistCount, icon: Heart },
            ].map((s) => (
              <div key={s.label} className="text-center sm:text-left sm:flex sm:items-center sm:gap-3">
                <div className="hidden sm:flex w-10 h-10 rounded-full bg-white/5 border border-white/10 items-center justify-center text-gold-400">
                  <s.icon size={16} />
                </div>
                <div>
                  <p className="text-xl sm:text-2xl font-serif text-gold-300 font-semibold">{s.value}</p>
                  <p className="text-[10px] sm:text-xs text-cream/45 tracking-wide uppercase">{s.label}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-6">
          {/* Sidebar */}
          <motion.aside
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.05 }}
            className="lg:col-span-4 space-y-4"
          >
            {/* Profile card */}
            <div className="bg-white rounded-2xl border border-gold-100 p-6 shadow-sm">
              <h2 className="font-serif text-lg mb-4 text-charcoal">Profile details</h2>
              <ul className="space-y-4 text-sm">
                <li className="flex items-start gap-3">
                  <span className="w-9 h-9 rounded-full bg-gold-50 text-gold-600 flex items-center justify-center shrink-0">
                    <Mail size={15} />
                  </span>
                  <div className="min-w-0">
                    <p className="text-[10px] uppercase tracking-wide text-charcoal/40 mb-0.5">Email</p>
                    <p className="text-charcoal/80 truncate">{user.email}</p>
                  </div>
                </li>
                {user.phone && (
                  <li className="flex items-start gap-3">
                    <span className="w-9 h-9 rounded-full bg-gold-50 text-gold-600 flex items-center justify-center shrink-0">
                      <Phone size={15} />
                    </span>
                    <div>
                      <p className="text-[10px] uppercase tracking-wide text-charcoal/40 mb-0.5">Phone</p>
                      <p className="text-charcoal/80">{user.phone}</p>
                    </div>
                  </li>
                )}
                <li className="flex items-start gap-3">
                  <span className="w-9 h-9 rounded-full bg-gold-50 text-gold-600 flex items-center justify-center shrink-0">
                    <Calendar size={15} />
                  </span>
                  <div>
                    <p className="text-[10px] uppercase tracking-wide text-charcoal/40 mb-0.5">Member since</p>
                    <p className="text-charcoal/80">{user.joined}</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-9 h-9 rounded-full bg-gold-50 text-gold-600 flex items-center justify-center shrink-0">
                    <MapPin size={15} />
                  </span>
                  <div>
                    <p className="text-[10px] uppercase tracking-wide text-charcoal/40 mb-0.5">Default address</p>
                    <p className="text-charcoal/80 leading-relaxed">
                      {user.address?.line || 'No address saved'}
                      {user.address?.city && (
                        <>
                          <br />
                          {user.address.city}, {user.address.state} {user.address.pincode}
                        </>
                      )}
                    </p>
                  </div>
                </li>
              </ul>
            </div>

            {/* Quick links */}
            <div className="bg-white rounded-2xl border border-gold-100 p-4 shadow-sm">
              <p className="text-[10px] uppercase tracking-wide text-charcoal/40 px-2 mb-2">Quick links</p>
              {[
                { to: '/wishlist', icon: Heart, label: 'Wishlist', badge: wishlistCount },
                { to: '/cart', icon: ShoppingBag, label: 'Cart', badge: cartCount },
                { to: '/store', icon: Sparkles, label: 'Continue shopping' },
              ].map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className="flex items-center gap-3 px-2 py-3 rounded-xl hover:bg-gold-50 transition-colors group"
                >
                  <span className="w-9 h-9 rounded-full bg-gold-50 text-gold-600 flex items-center justify-center group-hover:bg-gold-100 transition-colors">
                    <item.icon size={15} />
                  </span>
                  <span className="flex-1 text-sm font-medium text-charcoal">{item.label}</span>
                  {item.badge > 0 && (
                    <span className="text-[10px] font-semibold bg-gold-100 text-gold-800 px-2 py-0.5 rounded-full">
                      {item.badge}
                    </span>
                  )}
                  <ChevronRight size={14} className="text-charcoal/30 group-hover:text-gold-500" />
                </Link>
              ))}
            </div>
          </motion.aside>

          {/* Main: Orders */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-8"
          >
            <div className="bg-white rounded-2xl border border-gold-100 shadow-sm overflow-hidden">
              <div className="flex items-center justify-between px-6 py-5 border-b border-gold-100">
                <h2 className="font-serif text-xl text-charcoal flex items-center gap-2">
                  <Package size={20} className="text-gold-500" />
                  Order history
                </h2>
                <span className="text-xs text-charcoal/45">{orders.length} total</span>
              </div>

              {orders.length === 0 ? (
                <div className="text-center py-16 px-6">
                  <div className="w-14 h-14 rounded-full bg-gold-50 text-gold-400 flex items-center justify-center mx-auto mb-4">
                    <Package size={24} strokeWidth={1.5} />
                  </div>
                  <p className="text-charcoal/60 mb-2 font-medium">No orders yet</p>
                  <p className="text-sm text-charcoal/40 mb-6">Your saree orders will appear here</p>
                  <Link
                    to="/store"
                    className="inline-flex items-center gap-2 bg-gold-500 hover:bg-gold-400 text-charcoal font-semibold text-sm px-6 py-3 rounded-full transition-colors"
                  >
                    Explore collection <ChevronRight size={16} />
                  </Link>
                </div>
              ) : (
                <div className="divide-y divide-gold-50">
                  {orders.map((order, idx) => {
                    const st = statusStyle[order.status] || statusStyle.Processing;
                    const StatusIcon = st.icon;
                    return (
                      <motion.div
                        key={order.id}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.05 * idx }}
                        className="p-5 sm:p-6 hover:bg-gold-50/40 transition-colors"
                      >
                        <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                          <div>
                            <p className="font-medium text-charcoal text-sm sm:text-base">{order.id}</p>
                            <p className="text-xs text-charcoal/45 mt-0.5">
                              Placed on{' '}
                              {new Date(order.date).toLocaleDateString('en-IN', {
                                day: 'numeric',
                                month: 'short',
                                year: 'numeric',
                              })}
                            </p>
                          </div>
                          <div className="flex items-center gap-3">
                            <span
                              className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full ${st.bg} ${st.text}`}
                            >
                              <StatusIcon size={12} />
                              {order.status}
                            </span>
                            <span className="font-semibold text-charcoal text-sm sm:text-base">
                              {formatPrice(order.total)}
                            </span>
                          </div>
                        </div>

                        <div className="space-y-2.5 bg-cream/80 rounded-xl p-3.5 border border-gold-50">
                          {order.items.map((item, i) => (
                            <div
                              key={i}
                              className="flex items-center justify-between text-sm gap-3"
                            >
                              <div className="flex items-center gap-3 min-w-0">
                                <span className="w-8 h-8 rounded-lg bg-gold-100 text-gold-700 flex items-center justify-center text-xs font-serif font-semibold shrink-0">
                                  {item.qty}
                                </span>
                                <span className="text-charcoal/75 truncate">{item.name}</span>
                              </div>
                              <span className="text-charcoal/60 shrink-0 font-medium">
                                {formatPrice(item.price * item.qty)}
                              </span>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
