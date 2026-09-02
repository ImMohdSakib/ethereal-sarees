import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Package, Heart, MapPin, LogOut, Mail, Phone, Calendar } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useStore } from '../context/StoreContext';
import { formatPrice } from '../data/products';

export default function Account() {
  const { user, orders, logout, isLoggedIn } = useAuth();
  const { wishlistCount } = useStore();
  const navigate = useNavigate();

  if (!isLoggedIn) {
    return (
      <div className="pt-24 pb-20">
        <div className="max-w-lg mx-auto px-4 text-center">
          <div className="w-16 h-16 rounded-full bg-gold-100 text-gold-600 flex items-center justify-center mx-auto mb-4">
            <User size={28} strokeWidth={1.5} />
          </div>
          <h1 className="font-serif text-3xl text-charcoal mb-2">My Account</h1>
          <p className="text-charcoal/60 text-sm mb-8">Sign in to manage orders, wishlist and profile</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/login" className="bg-gold-500 hover:bg-gold-400 text-charcoal font-semibold px-8 py-3.5 rounded-full transition-colors">
              Sign In
            </Link>
            <Link to="/signup" className="border border-gold-200 hover:border-gold-400 text-charcoal font-medium px-8 py-3.5 rounded-full transition-colors">
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

  return (
    <div className="pt-24 pb-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
          <div>
            <p className="text-gold-600 text-sm tracking-[0.15em] uppercase mb-1">Account</p>
            <h1 className="font-serif text-3xl md:text-4xl text-charcoal">Hello, {user.name.split(' ')[0]}</h1>
          </div>
          <button
            onClick={handleLogout}
            className="inline-flex items-center gap-2 text-sm text-charcoal/60 hover:text-maroon-600 border border-gold-200 px-4 py-2 rounded-full transition-colors"
          >
            <LogOut size={16} /> Sign Out
          </button>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 mb-10">
          {/* Profile card */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-1 bg-white rounded-xl border border-gold-100 p-6"
          >
            <div className="w-14 h-14 rounded-full bg-gold-100 text-gold-700 flex items-center justify-center font-serif text-xl font-semibold mb-4">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <h2 className="font-serif text-xl mb-4">{user.name}</h2>
            <ul className="space-y-3 text-sm text-charcoal/70">
              <li className="flex items-center gap-2"><Mail size={14} className="text-gold-500" /> {user.email}</li>
              {user.phone && <li className="flex items-center gap-2"><Phone size={14} className="text-gold-500" /> {user.phone}</li>}
              <li className="flex items-center gap-2"><Calendar size={14} className="text-gold-500" /> Joined {user.joined}</li>
              <li className="flex items-start gap-2">
                <MapPin size={14} className="text-gold-500 mt-0.5 shrink-0" />
                <span>
                  {user.address?.line || 'No address saved'}
                  {user.address?.city && (
                    <><br />{user.address.city}, {user.address.state} {user.address.pincode}</>
                  )}
                </span>
              </li>
            </ul>
            <div className="mt-6 pt-4 border-t border-gold-100 flex gap-3">
              <Link to="/wishlist" className="flex-1 text-center text-xs font-medium border border-gold-200 py-2.5 rounded-full hover:bg-gold-50">
                Wishlist ({wishlistCount})
              </Link>
              <Link to="/store" className="flex-1 text-center text-xs font-medium bg-gold-500 text-charcoal py-2.5 rounded-full hover:bg-gold-400">
                Shop
              </Link>
            </div>
          </motion.div>

          {/* Orders */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08 }}
            className="lg:col-span-2 bg-white rounded-xl border border-gold-100 p-6"
          >
            <h2 className="font-serif text-xl mb-5 flex items-center gap-2">
              <Package size={20} className="text-gold-500" /> Order History
            </h2>
            {orders.length === 0 ? (
              <div className="text-center py-10 text-charcoal/50 text-sm">
                <p className="mb-4">No orders yet</p>
                <Link to="/store" className="text-gold-600 font-medium hover:underline">Start shopping</Link>
              </div>
            ) : (
              <div className="space-y-4">
                {orders.map((order) => (
                  <div key={order.id} className="border border-gold-100 rounded-lg p-4">
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                      <div>
                        <p className="font-medium text-sm">{order.id}</p>
                        <p className="text-xs text-charcoal/50">{order.date}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span
                          className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                            order.status === 'Delivered'
                              ? 'bg-green-50 text-green-700'
                              : order.status === 'Shipped'
                                ? 'bg-blue-50 text-blue-700'
                                : 'bg-gold-50 text-gold-700'
                          }`}
                        >
                          {order.status}
                        </span>
                        <span className="font-semibold text-sm">{formatPrice(order.total)}</span>
                      </div>
                    </div>
                    <ul className="space-y-1">
                      {order.items.map((item, i) => (
                        <li key={i} className="text-sm text-charcoal/70 flex justify-between">
                          <span>{item.name} × {item.qty}</span>
                          <span>{formatPrice(item.price * item.qty)}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
