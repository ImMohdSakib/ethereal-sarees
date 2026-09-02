import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { blogPosts } from '../data/products';

export default function BlogDetail() {
  const { id } = useParams();
  const post = blogPosts.find((p) => p.id === Number(id));

  if (!post) {
    return (
      <div className="pt-32 pb-20 text-center">
        <h1 className="font-serif text-3xl mb-4">Article not found</h1>
        <Link to="/blog" className="text-gold-600 hover:underline">Back to Blog</Link>
      </div>
    );
  }

  const related = blogPosts.filter((p) => p.id !== post.id).slice(0, 2);

  return (
    <div className="pt-24 pb-20">
      <article className="max-w-3xl mx-auto px-4 sm:px-6">
        <Link to="/blog" className="inline-flex items-center gap-2 text-sm text-charcoal/60 hover:text-gold-600 mb-8 transition-colors">
          <ArrowLeft size={16} /> Back to Journal
        </Link>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center gap-3 text-xs text-charcoal/50 mb-4">
            <span className="text-gold-600 uppercase tracking-wide font-medium">{post.category}</span>
            <span>·</span>
            <time>{new Date(post.date).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}</time>
            {post.author && (
              <>
                <span>·</span>
                <span>By {post.author}</span>
              </>
            )}
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-charcoal leading-tight mb-8">
            {post.title}
          </h1>

          <div className="aspect-[16/9] rounded-xl overflow-hidden mb-10 bg-gold-50">
            <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
          </div>

          <div className="prose prose-lg max-w-none space-y-5">
            {(post.content || [post.excerpt]).map((para, i) => (
              <p key={i} className="text-charcoal/75 leading-relaxed text-base md:text-lg">
                {para}
              </p>
            ))}
          </div>
        </motion.div>
      </article>

      {related.length > 0 && (
        <div className="max-w-3xl mx-auto px-4 sm:px-6 mt-16 pt-12 border-t border-gold-100">
          <h2 className="font-serif text-2xl mb-6">More from the Journal</h2>
          <div className="grid sm:grid-cols-2 gap-6">
            {related.map((p) => (
              <Link key={p.id} to={`/blog/${p.id}`} className="group">
                <div className="aspect-[16/10] rounded-lg overflow-hidden mb-3 bg-gold-50">
                  <img src={p.image} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <h3 className="font-serif text-lg group-hover:text-gold-700 transition-colors">{p.title}</h3>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
