import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { formatPrice } from '../data/products';

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, cartTotal, cartCount } = useStore();

  if (cart.length === 0) {
    return (
      <div className="pt-32 pb-20 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <ShoppingBag size={48} className="mx-auto text-gold-300 mb-4" strokeWidth={1} />
          <h1 className="font-serif text-3xl mb-3">Your cart is empty</h1>
          <p className="text-charcoal/60 mb-8">Discover our exquisite collection of sarees</p>
          <Link
            to="/store"
            className="inline-flex items-center gap-2 bg-gold-500 hover:bg-gold-400 text-charcoal font-semibold px-8 py-3.5 rounded-full transition-colors"
          >
            Continue Shopping <ArrowRight size={16} />
          </Link>
        </motion.div>
      </div>
    );
  }

  const shipping = cartTotal >= 2999 ? 0 : 149;
  const total = cartTotal + shipping;

  return (
    <div className="pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="font-serif text-4xl mb-2">Shopping Cart</h1>
        <p className="text-charcoal/60 mb-10">{cartCount} item{cartCount !== 1 ? 's' : ''}</p>

        <div className="grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="flex gap-4 bg-white rounded-xl border border-gold-100 p-4 sm:p-5"
              >
                <Link to={`/product/${item.id}`} className="w-24 sm:w-28 aspect-[3/4] rounded-lg overflow-hidden shrink-0 bg-gold-50">
                  <img src={item.images[0]} alt={item.name} className="w-full h-full object-cover" />
                </Link>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between gap-2">
                    <div>
                      <Link to={`/product/${item.id}`} className="font-serif text-lg text-charcoal hover:text-gold-700 transition-colors line-clamp-1">
                        {item.name}
                      </Link>
                      <p className="text-xs text-charcoal/50 mt-0.5 capitalize">{item.category} · {item.color}</p>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="p-1.5 text-charcoal/40 hover:text-maroon-600 transition-colors shrink-0"
                      aria-label="Remove"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center border border-gold-200 rounded-full">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-1.5 hover:text-gold-600"
                        aria-label="Decrease"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-1.5 hover:text-gold-600"
                        aria-label="Increase"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                    <p className="font-semibold">{formatPrice(item.price * item.quantity)}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-28 bg-white rounded-xl border border-gold-100 p-6">
              <h2 className="font-serif text-xl mb-6">Order Summary</h2>
              <div className="space-y-3 text-sm mb-6">
                <div className="flex justify-between">
                  <span className="text-charcoal/60">Subtotal</span>
                  <span className="font-medium">{formatPrice(cartTotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-charcoal/60">Shipping</span>
                  <span className="font-medium">{shipping === 0 ? 'Free' : formatPrice(shipping)}</span>
                </div>
                {shipping > 0 && (
                  <p className="text-xs text-gold-600">Add {formatPrice(2999 - cartTotal)} more for free shipping</p>
                )}
                <div className="border-t border-gold-100 pt-3 flex justify-between text-base">
                  <span className="font-semibold">Total</span>
                  <span className="font-semibold">{formatPrice(total)}</span>
                </div>
              </div>
              <Link
                to="/checkout"
                className="block w-full text-center bg-gold-500 hover:bg-gold-400 text-charcoal font-semibold py-3.5 rounded-full transition-colors mb-3"
              >
                Proceed to Checkout
              </Link>
              <Link to="/store" className="block w-full text-center text-sm text-gold-700 hover:text-gold-500 py-2">
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
