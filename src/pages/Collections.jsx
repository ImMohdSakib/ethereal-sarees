import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { categories } from '../data/products';

export default function Collections() {
  return (
    <div className="pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-14">
          <p className="text-gold-600 text-sm tracking-[0.2em] uppercase mb-2">Curated</p>
          <h1 className="font-serif text-4xl md:text-5xl text-charcoal mb-4">Our Collections</h1>
          <p className="text-charcoal/60 max-w-xl mx-auto">
            Explore sarees categorized by weaving tradition, fabric and region — each collection tells a unique story.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
            >
              <Link
                to={`/store?category=${cat.id}`}
                className="group relative block aspect-[3/4] rounded-xl overflow-hidden"
              >
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/75 via-charcoal/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h2 className="font-serif text-2xl text-white mb-1 group-hover:text-gold-300 transition-colors">
                    {cat.name}
                  </h2>
                  <p className="text-white/60 text-sm mb-3">{cat.count} designs</p>
                  <span className="inline-flex items-center gap-1.5 text-gold-300 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                    Shop Now <ArrowRight size={14} />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
