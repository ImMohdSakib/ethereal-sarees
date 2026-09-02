import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, ShoppingBag, Star, Truck, Shield, ArrowLeft, Minus, Plus, Check } from 'lucide-react';
import { products, formatPrice } from '../data/products';
import ProductCard from '../components/ProductCard';
import { useStore } from '../context/StoreContext';

export default function ProductDetail() {
  const { id } = useParams();
  const product = products.find((p) => p.id === Number(id));
  const [selectedImage, setSelectedImage] = useState(0);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const { addToCart, addToWishlist, removeFromWishlist, isInWishlist } = useStore();

  if (!product) {
    return (
      <div className="pt-32 pb-20 text-center">
        <h1 className="font-serif text-3xl mb-4">Product not found</h1>
        <Link to="/store" className="text-gold-600 hover:underline">Back to Store</Link>
      </div>
    );
  }

  const inWishlist = isInWishlist(product.id);
  const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);

  const handleAdd = () => {
    addToCart(product, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link to="/store" className="inline-flex items-center gap-2 text-sm text-charcoal/60 hover:text-gold-600 mb-8 transition-colors">
          <ArrowLeft size={16} /> Back to Store
        </Link>

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
          {/* Images */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
            <div className="aspect-[3/4] rounded-xl overflow-hidden bg-gold-50 mb-4">
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex gap-3">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={`w-20 h-24 rounded-lg overflow-hidden border-2 transition-all ${
                    selectedImage === i ? 'border-gold-500' : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </motion.div>

          {/* Info */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
            <p className="text-gold-600 text-sm tracking-wide uppercase mb-2">{product.category} · {product.fabric}</p>
            <h1 className="font-serif text-3xl md:text-4xl text-charcoal mb-3">{product.name}</h1>
            
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} className={i < Math.floor(product.rating) ? 'fill-gold-400 text-gold-400' : 'text-gold-200'} />
                ))}
              </div>
              <span className="text-sm font-medium">{product.rating}</span>
              <span className="text-sm text-charcoal/40">({product.reviews} reviews)</span>
            </div>

            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-2xl font-semibold text-charcoal">{formatPrice(product.price)}</span>
              {product.originalPrice > product.price && (
                <>
                  <span className="text-lg text-charcoal/40 line-through">{formatPrice(product.originalPrice)}</span>
                  <span className="text-sm font-semibold text-maroon-600 bg-maroon-50 px-2 py-0.5 rounded">
                    {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                  </span>
                </>
              )}
            </div>

            <p className="text-charcoal/70 leading-relaxed mb-8">{product.description}</p>

            {/* Quantity */}
            <div className="flex items-center gap-4 mb-6">
              <span className="text-sm font-medium">Quantity</span>
              <div className="flex items-center border border-gold-200 rounded-full">
                <button
                  onClick={() => setQty(Math.max(1, qty - 1))}
                  className="p-2.5 hover:text-gold-600 transition-colors"
                  aria-label="Decrease"
                >
                  <Minus size={16} />
                </button>
                <span className="w-10 text-center font-medium">{qty}</span>
                <button
                  onClick={() => setQty(qty + 1)}
                  className="p-2.5 hover:text-gold-600 transition-colors"
                  aria-label="Increase"
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3 mb-8">
              <button
                onClick={handleAdd}
                className="flex-1 flex items-center justify-center gap-2 bg-gold-500 hover:bg-gold-400 text-charcoal font-semibold py-4 rounded-full transition-all"
              >
                {added ? <><Check size={18} /> Added to Cart</> : <><ShoppingBag size={18} /> Add to Cart</>}
              </button>
              <button
                onClick={() => (inWishlist ? removeFromWishlist(product.id) : addToWishlist(product))}
                className={`flex items-center justify-center gap-2 border-2 py-4 px-6 rounded-full font-medium transition-all ${
                  inWishlist
                    ? 'border-maroon-500 text-maroon-600 bg-maroon-50'
                    : 'border-gold-200 text-charcoal hover:border-gold-400'
                }`}
              >
                <Heart size={18} fill={inWishlist ? 'currentColor' : 'none'} />
                {inWishlist ? 'Wishlisted' : 'Wishlist'}
              </button>
            </div>

            {/* Trust */}
            <div className="flex flex-wrap gap-6 mb-8 text-sm text-charcoal/60">
              <span className="flex items-center gap-2"><Truck size={16} className="text-gold-500" /> Free shipping over ₹2,999</span>
              <span className="flex items-center gap-2"><Shield size={16} className="text-gold-500" /> Authenticity guaranteed</span>
            </div>

            {/* Details */}
            <div className="border-t border-gold-100 pt-6">
              <h3 className="font-serif text-lg mb-3">Product Details</h3>
              <ul className="space-y-2">
                {product.details.map((d, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-charcoal/70">
                    <span className="text-gold-500 mt-1">•</span> {d}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <section className="mt-20">
            <h2 className="font-serif text-3xl text-charcoal mb-8">You May Also Like</h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {related.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
