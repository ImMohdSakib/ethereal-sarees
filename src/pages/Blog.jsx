import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { blogPosts } from '../data/products';

export default function Blog() {
  return (
    <div className="pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-14">
          <p className="text-gold-600 text-sm tracking-[0.2em] uppercase mb-2">Journal</p>
          <h1 className="font-serif text-4xl md:text-5xl text-charcoal">Stories & Guides</h1>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, i) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="group"
            >
              <Link to={`/blog/${post.id}`}>
                <div className="aspect-[16/10] rounded-xl overflow-hidden mb-5 bg-gold-50">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="flex items-center gap-3 text-xs text-charcoal/50 mb-2">
                  <span className="text-gold-600 uppercase tracking-wide font-medium">{post.category}</span>
                  <span>·</span>
                  <time>{new Date(post.date).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}</time>
                </div>
                <h2 className="font-serif text-2xl text-charcoal group-hover:text-gold-700 transition-colors mb-2">
                  {post.title}
                </h2>
                <p className="text-charcoal/60 text-sm leading-relaxed line-clamp-2">{post.excerpt}</p>
                <span className="inline-block mt-3 text-sm font-medium text-gold-600 group-hover:underline">Read more →</span>
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </div>
  );
}
