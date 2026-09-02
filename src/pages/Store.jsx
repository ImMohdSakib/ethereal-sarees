import { useState, useMemo, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { SlidersHorizontal, X, ChevronDown, Check } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { products, categories } from '../data/products';

const sortOptions = [
  { value: 'featured', label: 'Featured' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'rating', label: 'Highest Rated' },
  { value: 'newest', label: 'Newest First' },
];

const priceRanges = [
  { id: 'all', label: 'All Prices', min: 0, max: Infinity },
  { id: 'under5k', label: 'Under ₹5,000', min: 0, max: 5000 },
  { id: '5k-10k', label: '₹5,000 – ₹10,000', min: 5000, max: 10000 },
  { id: '10k-20k', label: '₹10,000 – ₹20,000', min: 10000, max: 20000 },
  { id: 'above20k', label: 'Above ₹20,000', min: 20000, max: Infinity },
];

export default function Store() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [mobileFilters, setMobileFilters] = useState(false);
  const [sort, setSort] = useState('featured');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'all');
  const [priceRange, setPriceRange] = useState('all');
  const [showBestsellers, setShowBestsellers] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [catOpen, setCatOpen] = useState(false);
  const catRef = useRef(null);

  useEffect(() => {
    const cat = searchParams.get('category');
    if (cat) setSelectedCategory(cat);
  }, [searchParams]);

  useEffect(() => {
    const handleClick = (e) => {
      if (catRef.current && !catRef.current.contains(e.target)) setCatOpen(false);
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const filtered = useMemo(() => {
    let result = [...products];
    if (selectedCategory !== 'all') {
      result = result.filter((p) => p.category === selectedCategory);
    }
    const range = priceRanges.find((r) => r.id === priceRange);
    if (range && range.id !== 'all') {
      result = result.filter((p) => p.price >= range.min && p.price < range.max);
    }
    if (showBestsellers) result = result.filter((p) => p.isBestseller);
    if (showNew) result = result.filter((p) => p.isNew);

    switch (sort) {
      case 'price-asc': result.sort((a, b) => a.price - b.price); break;
      case 'price-desc': result.sort((a, b) => b.price - a.price); break;
      case 'rating': result.sort((a, b) => b.rating - a.rating); break;
      case 'newest': result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0)); break;
      default: result.sort((a, b) => (b.isBestseller ? 1 : 0) - (a.isBestseller ? 1 : 0));
    }
    return result;
  }, [selectedCategory, priceRange, showBestsellers, showNew, sort]);

  const handleCategory = (id) => {
    setSelectedCategory(id);
    setCatOpen(false);
    if (id === 'all') searchParams.delete('category');
    else searchParams.set('category', id);
    setSearchParams(searchParams);
  };

  const selectedCatName =
    selectedCategory === 'all'
      ? 'All Categories'
      : categories.find((c) => c.id === selectedCategory)?.name || 'All Categories';

  const CategoryDropdown = () => (
    <div ref={catRef} className="relative">
      <h3 className="font-serif text-lg mb-3 text-charcoal">Category</h3>
      <button
        type="button"
        onClick={() => setCatOpen((o) => !o)}
        className={`w-full flex items-center justify-between gap-2 px-4 py-3 rounded-xl border text-sm font-medium transition-all duration-300 ${
          catOpen
            ? 'border-gold-400 bg-gold-50 shadow-sm'
            : 'border-gold-200 bg-white hover:border-gold-300'
        }`}
      >
        <span className="truncate text-charcoal">{selectedCatName}</span>
        <motion.span animate={{ rotate: catOpen ? 180 : 0 }} transition={{ duration: 0.25 }}>
          <ChevronDown size={16} className="text-gold-600 shrink-0" />
        </motion.span>
      </button>

      <AnimatePresence>
        {catOpen && (
          <motion.ul
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className="absolute z-30 left-0 right-0 mt-2 py-2 bg-white rounded-xl border border-gold-100 shadow-xl shadow-charcoal/10 max-h-64 overflow-y-auto"
          >
            <li>
              <button
                type="button"
                onClick={() => handleCategory('all')}
                className={`w-full flex items-center justify-between px-4 py-2.5 text-sm transition-colors ${
                  selectedCategory === 'all'
                    ? 'bg-gold-50 text-gold-700 font-medium'
                    : 'text-charcoal/80 hover:bg-gold-50/80'
                }`}
              >
                All Sarees ({products.length})
                {selectedCategory === 'all' && <Check size={14} className="text-gold-600" />}
              </button>
            </li>
            {categories.map((cat, i) => (
              <motion.li
                key={cat.id}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.03 * i }}
              >
                <button
                  type="button"
                  onClick={() => handleCategory(cat.id)}
                  className={`w-full flex items-center justify-between px-4 py-2.5 text-sm transition-colors ${
                    selectedCategory === cat.id
                      ? 'bg-gold-50 text-gold-700 font-medium'
                      : 'text-charcoal/80 hover:bg-gold-50/80'
                  }`}
                >
                  <span>{cat.name}</span>
                  <span className="flex items-center gap-2">
                    <span className="text-xs text-charcoal/40">{cat.count}</span>
                    {selectedCategory === cat.id && <Check size={14} className="text-gold-600" />}
                  </span>
                </button>
              </motion.li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );

  const FilterPanel = () => (
    <div className="space-y-7">
      <CategoryDropdown />

      <div>
        <h3 className="font-serif text-lg mb-3 text-charcoal">Price Range</h3>
        <div className="space-y-2">
          {priceRanges.map((range) => (
            <label key={range.id} className="flex items-center gap-2.5 cursor-pointer group">
              <input
                type="radio"
                name="price"
                checked={priceRange === range.id}
                onChange={() => setPriceRange(range.id)}
                className="accent-gold-500"
              />
              <span className="text-sm text-charcoal/70 group-hover:text-charcoal transition-colors">
                {range.label}
              </span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-serif text-lg mb-3 text-charcoal">More Filters</h3>
        <div className="space-y-3">
          <label className="flex items-center gap-2.5 cursor-pointer">
            <input
              type="checkbox"
              checked={showBestsellers}
              onChange={(e) => setShowBestsellers(e.target.checked)}
              className="accent-gold-500 rounded"
            />
            <span className="text-sm text-charcoal/70">Bestsellers only</span>
          </label>
          <label className="flex items-center gap-2.5 cursor-pointer">
            <input
              type="checkbox"
              checked={showNew}
              onChange={(e) => setShowNew(e.target.checked)}
              className="accent-gold-500 rounded"
            />
            <span className="text-sm text-charcoal/70">New arrivals</span>
          </label>
        </div>
      </div>
    </div>
  );

  return (
    <div className="pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
          <p className="text-gold-600 text-sm tracking-[0.2em] uppercase mb-2">Shop</p>
          <h1 className="font-serif text-4xl md:text-5xl text-charcoal mb-2">All Sarees</h1>
          <p className="text-charcoal/60">{filtered.length} products</p>
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex gap-10">
          {/* LEFT side filters */}
          <aside className="hidden lg:block w-64 shrink-0">
            <motion.div
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
              className="sticky top-28 bg-white/90 backdrop-blur-sm rounded-xl border border-gold-100 p-6"
            >
              <h2 className="font-serif text-xl mb-6 text-charcoal">Filters</h2>
              <FilterPanel />
            </motion.div>
          </aside>

          {/* Products */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-6 gap-4">
              <button
                onClick={() => setMobileFilters(true)}
                className="lg:hidden flex items-center gap-2 text-sm font-medium border border-gold-200 px-4 py-2 rounded-full hover:bg-gold-50 transition-colors"
              >
                <SlidersHorizontal size={16} /> Filters
              </button>
              <p className="text-sm text-charcoal/50 hidden sm:block">
                Showing {filtered.length} results
                {selectedCategory !== 'all' && (
                  <span className="ml-1 text-gold-600">· {selectedCatName}</span>
                )}
              </p>
              <div className="relative ml-auto">
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  className="appearance-none bg-white border border-gold-200 rounded-full pl-4 pr-10 py-2 text-sm focus:outline-none focus:border-gold-400 cursor-pointer"
                >
                  {sortOptions.map((o) => (
                    <option key={o.value} value={o.value}>{o.label}</option>
                  ))}
                </select>
                <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-charcoal/50" />
              </div>
            </div>

            {filtered.length > 0 ? (
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {filtered.map((p, i) => (
                  <ProductCard key={p.id} product={p} index={i} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <p className="text-charcoal/50 mb-4">No products match your filters.</p>
                <button
                  onClick={() => {
                    setSelectedCategory('all');
                    setPriceRange('all');
                    setShowBestsellers(false);
                    setShowNew(false);
                    setSearchParams({});
                  }}
                  className="text-gold-600 font-medium hover:underline"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile filter drawer */}
      <AnimatePresence>
        {mobileFilters && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/40"
              onClick={() => setMobileFilters(false)}
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 300 }}
              className="absolute left-0 top-0 bottom-0 w-80 max-w-full bg-cream p-6 overflow-y-auto shadow-2xl"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-serif text-xl">Filters</h2>
                <button onClick={() => setMobileFilters(false)} className="p-1">
                  <X size={22} />
                </button>
              </div>
              <FilterPanel />
              <button
                onClick={() => setMobileFilters(false)}
                className="w-full mt-8 bg-gold-500 text-charcoal font-semibold py-3 rounded-full"
              >
                Show {filtered.length} Results
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
