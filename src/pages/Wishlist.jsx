import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { formatPrice } from '../data/products';

export default function Wishlist() {
  const { wishlist, removeFromWishlist, addToCart } = useStore();

  if (wishlist.length === 0) {
    return (
      <div className="pt-32 pb-20 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Heart size={48} className="mx-auto text-gold-300 mb-4" strokeWidth={1} />
          <h1 className="font-serif text-3xl mb-3">Your wishlist is empty</h1>
          <p className="text-charcoal/60 mb-8">Save your favourite sarees for later</p>
          <Link
            to="/store"
            className="inline-flex items-center gap-2 bg-gold-500 hover:bg-gold-400 text-charcoal font-semibold px-8 py-3.5 rounded-full transition-colors"
          >
            Explore Sarees <ArrowRight size={16} />
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="font-serif text-4xl mb-2">Wishlist</h1>
        <p className="text-charcoal/60 mb-10">{wishlist.length} item{wishlist.length !== 1 ? 's' : ''}</p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {wishlist.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-white rounded-xl border border-gold-100 overflow-hidden group"
            >
              <Link to={`/product/${item.id}`} className="block aspect-[3/4] overflow-hidden bg-gold-50">
                <img src={item.images[0]} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </Link>
              <div className="p-4">
                <Link to={`/product/${item.id}`} className="font-serif text-lg hover:text-gold-700 transition-colors line-clamp-1">
                  {item.name}
                </Link>
                <p className="font-semibold mt-1 mb-4">{formatPrice(item.price)}</p>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      addToCart(item);
                      removeFromWishlist(item.id);
                    }}
                    className="flex-1 flex items-center justify-center gap-1.5 bg-gold-500 hover:bg-gold-400 text-charcoal text-sm font-semibold py-2.5 rounded-full transition-colors"
                  >
                    <ShoppingBag size={14} /> Add to Cart
                  </button>
                  <button
                    onClick={() => removeFromWishlist(item.id)}
                    className="p-2.5 border border-gold-200 rounded-full hover:border-maroon-400 hover:text-maroon-600 transition-colors"
                    aria-label="Remove"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
