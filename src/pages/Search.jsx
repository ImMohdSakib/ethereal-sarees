import { useMemo, useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search as SearchIcon, X } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { products } from '../data/products';

export default function Search() {
  const [searchParams, setSearchParams] = useSearchParams();
  const qParam = searchParams.get('q') || '';
  const [query, setQuery] = useState(qParam);

  useEffect(() => {
    setQuery(qParam);
  }, [qParam]);

  const results = useMemo(() => {
    const q = qParam.trim().toLowerCase();
    if (!q) return [];
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.fabric.toLowerCase().includes(q) ||
        p.color.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
    );
  }, [qParam]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const q = query.trim();
    if (q) setSearchParams({ q });
    else setSearchParams({});
  };

  return (
    <div className="pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl mx-auto mb-12">
          <h1 className="font-serif text-3xl md:text-4xl text-charcoal text-center mb-6">Search Sarees</h1>
          <form onSubmit={handleSubmit} className="relative">
            <SearchIcon size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-charcoal/40" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by name, fabric, colour, category..."
              className="w-full pl-11 pr-12 py-3.5 rounded-full border border-gold-200 bg-white text-sm focus:outline-none focus:border-gold-400 shadow-sm"
              autoFocus
            />
            {query && (
              <button
                type="button"
                onClick={() => { setQuery(''); setSearchParams({}); }}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-charcoal/40 hover:text-charcoal"
              >
                <X size={16} />
              </button>
            )}
          </form>
        </motion.div>

        {!qParam && (
          <div className="text-center text-charcoal/50 text-sm">
            <p className="mb-4">Try searching for “Banarasi”, “silk”, “cotton” or a colour</p>
            <div className="flex flex-wrap justify-center gap-2">
              {['Banarasi', 'Kanjeevaram', 'Silk', 'Cotton', 'Red', 'Bridal'].map((tag) => (
                <button
                  key={tag}
                  onClick={() => { setQuery(tag); setSearchParams({ q: tag }); }}
                  className="px-4 py-1.5 rounded-full border border-gold-200 text-xs hover:bg-gold-50 transition-colors"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        )}

        {qParam && (
          <>
            <p className="text-sm text-charcoal/60 mb-6">
              {results.length} result{results.length !== 1 ? 's' : ''} for “{qParam}”
            </p>
            {results.length > 0 ? (
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                {results.map((p, i) => (
                  <ProductCard key={p.id} product={p} index={i} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <p className="text-charcoal/50 mb-4">No sarees matched your search.</p>
                <Link to="/store" className="text-gold-600 font-medium hover:underline">Browse all sarees</Link>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
