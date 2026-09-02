import { motion } from 'framer-motion';

export default function About() {
  return (
    <div className="pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-gold-600 text-sm tracking-[0.2em] uppercase mb-2">Our Story</p>
          <h1 className="font-serif text-4xl md:text-5xl text-charcoal mb-6">Weaving Heritage into Every Thread</h1>
          <p className="text-charcoal/70 text-lg leading-relaxed">
            Ethereal Sarees was born from a passion to celebrate India's rich textile heritage while making it accessible to the modern woman.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-10 items-center mb-20">
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <img
              src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&q=80"
              alt="Our craft"
              className="rounded-2xl w-full aspect-[4/3] object-cover"
            />
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <h2 className="font-serif text-3xl mb-4">From Loom to You</h2>
            <p className="text-charcoal/70 leading-relaxed mb-4">
              We partner directly with master weavers across Varanasi, Kanchipuram, and other heritage weaving clusters. Every saree in our collection is handpicked for its craftsmanship, authenticity, and beauty.
            </p>
            <p className="text-charcoal/70 leading-relaxed">
              Our mission is simple — preserve traditional weaving techniques, support artisan communities, and bring you sarees that feel as special as the occasions you wear them to.
            </p>
          </motion.div>
        </div>

        <div className="grid sm:grid-cols-3 gap-8 text-center">
          {[
            { num: '50+', label: 'Master Weavers' },
            { num: '12', label: 'States Represented' },
            { num: '10,000+', label: 'Happy Customers' },
          ].map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-xl border border-gold-100 p-8"
            >
              <p className="font-serif text-4xl text-gold-600 mb-2">{s.num}</p>
              <p className="text-charcoal/60 text-sm tracking-wide">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
