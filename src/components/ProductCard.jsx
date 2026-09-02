import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, ShoppingBag, Star } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { formatPrice } from '../data/products';

export default function ProductCard({ product, index = 0 }) {
  const { addToCart, addToWishlist, removeFromWishlist, isInWishlist } = useStore();
  const inWishlist = isInWishlist(product.id);

  const handleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (inWishlist) removeFromWishlist(product.id);
    else addToWishlist(product);
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: index * 0.06 }}
      className="group"
    >
      <Link to={`/product/${product.id}`} className="block">
        <div className="relative overflow-hidden rounded-lg bg-gold-50 aspect-[3/4] mb-4">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          <div className="absolute top-3 left-3 flex flex-col gap-1.5">
            {product.isNew && (
              <span className="bg-gold-500 text-white text-[10px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded">
                New
              </span>
            )}
            {product.isBestseller && (
              <span className="bg-maroon-700 text-white text-[10px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded">
                Bestseller
              </span>
            )}
          </div>

          <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0">
            <button
              onClick={handleWishlist}
              className={`p-2.5 rounded-full shadow-md transition-colors ${
                inWishlist ? 'bg-maroon-600 text-white' : 'bg-white text-charcoal hover:text-maroon-600'
              }`}
              aria-label="Wishlist"
            >
              <Heart size={16} fill={inWishlist ? 'currentColor' : 'none'} />
            </button>
            <button
              onClick={handleAddToCart}
              className="p-2.5 rounded-full bg-white text-charcoal shadow-md hover:bg-gold-500 hover:text-white transition-colors"
              aria-label="Add to cart"
            >
              <ShoppingBag size={16} />
            </button>
          </div>

          {product.originalPrice > product.price && (
            <span className="absolute bottom-3 left-3 bg-white/90 text-maroon-700 text-xs font-semibold px-2 py-1 rounded">
              {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
            </span>
          )}
        </div>

        <div className="space-y-1">
          <p className="text-xs text-gold-600 tracking-wide uppercase">{product.category}</p>
          <h3 className="font-serif text-lg leading-snug text-charcoal group-hover:text-gold-700 transition-colors line-clamp-1">
            {product.name}
          </h3>
          <div className="flex items-center gap-1.5 text-sm">
            <Star size={13} className="fill-gold-400 text-gold-400" />
            <span className="font-medium">{product.rating}</span>
            <span className="text-charcoal/40">({product.reviews})</span>
          </div>
          <div className="flex items-center gap-2 pt-0.5">
            <span className="font-semibold text-charcoal">{formatPrice(product.price)}</span>
            {product.originalPrice > product.price && (
              <span className="text-sm text-charcoal/40 line-through">{formatPrice(product.originalPrice)}</span>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
