import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Truck, Shield, RefreshCw, Award, Quote, Star } from 'lucide-react';
import Hero from '../components/Hero';
import ProductCard from '../components/ProductCard';
import { products, categories, blogPosts } from '../data/products';

const features = [
  { icon: Truck, title: 'Free Shipping', desc: 'On orders above ₹2,999' },
  { icon: Shield, title: 'Authenticity', desc: '100% genuine handloom' },
  { icon: RefreshCw, title: 'Easy Returns', desc: '15-day hassle-free returns' },
  { icon: Award, title: 'Heritage Craft', desc: 'Supporting master weavers' },
];

export default function Home() {
  const featured = products.filter((p) => p.isBestseller).slice(0, 4);
  const newArrivals = products.filter((p) => p.isNew).slice(0, 4);
  const underBudget = products.filter((p) => p.price < 6000).slice(0, 4);

  return (
    <>
      <Hero />

      {/* Features */}
      <section className="py-12 border-b border-gold-100 bg-white/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex items-start gap-3"
              >
                <div className="p-2.5 rounded-full bg-gold-50 text-gold-600 shrink-0">
                  <f.icon size={20} strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="font-medium text-sm text-charcoal">{f.title}</h3>
                  <p className="text-xs text-charcoal/60 mt-0.5">{f.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-gold-600 text-sm tracking-[0.2em] uppercase mb-2"
            >
              Explore
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-serif text-4xl md:text-5xl text-charcoal"
            >
              Shop by Category
            </motion.h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {categories.slice(0, 4).map((cat, i) => (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
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
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-charcoal/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <h3 className="font-serif text-xl text-white group-hover:text-gold-300 transition-colors">
                      {cat.name}
                    </h3>
                    <p className="text-white/60 text-sm mt-1">{cat.count} styles</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              to="/collections"
              className="inline-flex items-center gap-2 text-gold-700 font-medium hover:text-gold-500 transition-colors"
            >
              View All Collections <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Bestsellers */}
      <section className="py-20 bg-white/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="text-gold-600 text-sm tracking-[0.2em] uppercase mb-2">Curated</p>
              <h2 className="font-serif text-4xl md:text-5xl text-charcoal">Bestsellers</h2>
            </div>
            <Link
              to="/store"
              className="hidden sm:inline-flex items-center gap-2 text-sm font-medium text-gold-700 hover:text-gold-500 transition-colors"
            >
              View All <ArrowRight size={16} />
            </Link>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {featured.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Banner */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-2xl overflow-hidden min-h-[400px] flex items-center">
            <img
              src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1400&q=80"
              alt="Bridal Collection"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-charcoal/55" />
            <div className="relative z-10 px-8 md:px-16 py-16 max-w-xl">
              <p className="text-gold-300 text-sm tracking-[0.2em] uppercase mb-3">Limited Edition</p>
              <h2 className="font-serif text-4xl md:text-5xl text-white mb-4 leading-tight">
                Bridal Collection 2026
              </h2>
              <p className="text-white/75 mb-8 leading-relaxed">
                Opulent Banarasi and Kanjeevaram sarees crafted for your most special day. Each piece tells a story of generations.
              </p>
              <Link
                to="/store?category=banarasi"
                className="inline-flex items-center gap-2 bg-gold-500 hover:bg-gold-400 text-charcoal font-semibold px-7 py-3.5 rounded-full transition-colors"
              >
                Discover Bridal <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="py-20 bg-gold-50/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-gold-600 text-sm tracking-[0.2em] uppercase mb-2">Just In</p>
            <h2 className="font-serif text-4xl md:text-5xl text-charcoal">New Arrivals</h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {newArrivals.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        </div>
      </section>


      {/* Under budget */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="text-gold-600 text-sm tracking-[0.2em] uppercase mb-2">Value</p>
              <h2 className="font-serif text-4xl md:text-5xl text-charcoal">Under ₹6,000</h2>
            </div>
            <Link to="/store" className="hidden sm:inline-flex items-center gap-2 text-sm font-medium text-gold-700 hover:text-gold-500">
              View All <ArrowRight size={16} />
            </Link>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {underBudget.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-gold-600 text-sm tracking-[0.2em] uppercase mb-2">Reviews</p>
            <h2 className="font-serif text-4xl md:text-5xl text-charcoal">Loved by Our Customers</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: 'Sneha R.', city: 'Mumbai', text: 'The Banarasi I ordered for my sister’s wedding was pure luxury. Packaging and quality exceeded expectations.' },
              { name: 'Anjali K.', city: 'Delhi', text: 'Soft cotton sarees for daily wear — beautiful colours and true handloom feel. Will order again.' },
              { name: 'Divya M.', city: 'Bengaluru', text: 'Kanjeevaram arrived perfectly. The temple border is stunning. Customer support was very helpful.' },
            ].map((r, i) => (
              <motion.div
                key={r.name}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-cream rounded-xl border border-gold-100 p-6"
              >
                <Quote size={20} className="text-gold-400 mb-3" />
                <p className="text-charcoal/70 text-sm leading-relaxed mb-4">“{r.text}”</p>
                <div className="flex items-center gap-1 mb-2">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} size={12} className="fill-gold-400 text-gold-400" />
                  ))}
                </div>
                <p className="font-medium text-sm">{r.name}</p>
                <p className="text-xs text-charcoal/50">{r.city}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Craft story strip */}
      <section className="py-16 bg-charcoal">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <p className="text-gold-400 text-sm tracking-[0.2em] uppercase mb-2">Our Promise</p>
              <h2 className="font-serif text-3xl md:text-4xl text-cream mb-4">From Loom to Your Wardrobe</h2>
              <p className="text-cream/65 leading-relaxed mb-6">
                Every saree is sourced from trusted weaving clusters. We work closely with artisans so you receive authentic handloom — never mass-produced imitations.
              </p>
              <Link to="/about" className="inline-flex items-center gap-2 text-gold-300 font-medium hover:text-gold-200">
                Our story <ArrowRight size={16} />
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { n: '50+', l: 'Master Weavers' },
                { n: '8', l: 'Heritage Regions' },
                { n: '15-day', l: 'Easy Returns' },
                { n: '100%', l: 'Authentic Silk' },
              ].map((s) => (
                <div key={s.l} className="bg-white/5 border border-white/10 rounded-xl p-5 text-center">
                  <p className="font-serif text-2xl text-gold-300 mb-1">{s.n}</p>
                  <p className="text-cream/50 text-xs tracking-wide">{s.l}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Blog preview */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="text-gold-600 text-sm tracking-[0.2em] uppercase mb-2">Stories</p>
              <h2 className="font-serif text-4xl md:text-5xl text-charcoal">From the Journal</h2>
            </div>
            <Link to="/blog" className="hidden sm:inline-flex items-center gap-2 text-sm font-medium text-gold-700 hover:text-gold-500">
              All Articles <ArrowRight size={16} />
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {blogPosts.map((post, i) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group"
              >
                <Link to={`/blog/${post.id}`}>
                  <div className="aspect-[16/10] rounded-xl overflow-hidden mb-4">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <p className="text-xs text-gold-600 tracking-wide uppercase mb-1.5">{post.category}</p>
                  <h3 className="font-serif text-xl text-charcoal group-hover:text-gold-700 transition-colors mb-2">
                    {post.title}
                  </h3>
                  <p className="text-sm text-charcoal/60 line-clamp-2">{post.excerpt}</p>
                </Link>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 bg-charcoal">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="font-serif text-3xl md:text-4xl text-cream mb-3">Join the Ethereal Circle</h2>
          <p className="text-cream/60 mb-8">Receive exclusive previews, styling tips & early access to new collections.</p>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
          >
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 px-5 py-3.5 rounded-full bg-white/10 border border-white/20 text-cream placeholder:text-cream/40 focus:outline-none focus:border-gold-400"
              required
            />
            <button
              type="submit"
              className="px-7 py-3.5 rounded-full bg-gold-500 hover:bg-gold-400 text-charcoal font-semibold transition-colors"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </>
  );
}
