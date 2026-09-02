import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, ArrowRight } from 'lucide-react';

export default function OrderSuccess() {
  return (
    <div className="pt-32 pb-20 text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-md mx-auto px-4"
      >
        <div className="w-20 h-20 rounded-full bg-gold-100 text-gold-600 flex items-center justify-center mx-auto mb-6">
          <CheckCircle size={40} strokeWidth={1.5} />
        </div>
        <h1 className="font-serif text-3xl md:text-4xl text-charcoal mb-3">Order Confirmed!</h1>
        <p className="text-charcoal/60 mb-2">
          Thank you for shopping with Ethereal Sarees.
        </p>
        <p className="text-sm text-charcoal/50 mb-10">
          A confirmation email has been sent with your order details and tracking information.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/store"
            className="inline-flex items-center justify-center gap-2 bg-gold-500 hover:bg-gold-400 text-charcoal font-semibold px-7 py-3.5 rounded-full transition-colors"
          >
            Continue Shopping <ArrowRight size={16} />
          </Link>
          <Link
            to="/"
            className="inline-flex items-center justify-center border border-gold-200 hover:border-gold-400 text-charcoal font-medium px-7 py-3.5 rounded-full transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
