import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    q: 'Are your sarees authentic handloom?',
    a: 'Yes. Every saree is sourced directly from certified weavers and weaving clusters. We provide authenticity details with each purchase.',
  },
  {
    q: 'What is your shipping policy?',
    a: 'We offer free shipping on orders above ₹2,999 across India. Standard delivery takes 5–7 business days. Express options are available at checkout.',
  },
  {
    q: 'Can I return or exchange a saree?',
    a: 'Yes. We offer a 15-day return/exchange policy for unused products with original tags and packaging. Custom or heavily embellished bridal pieces may have different terms.',
  },
  {
    q: 'Do you provide blouse stitching?',
    a: 'Currently we provide unstitched blouse pieces. We can recommend trusted tailors in major cities. Stitched blouse options are coming soon.',
  },
  {
    q: 'How do I care for silk sarees?',
    a: 'Dry clean only for pure silk and heavily embellished sarees. Store in a cool, dry place wrapped in muslin. Avoid direct sunlight and plastic covers.',
  },
  {
    q: 'Do you ship internationally?',
    a: 'Yes, we ship to select international destinations. Shipping costs and duties are calculated at checkout based on location.',
  },
];

export default function FAQ() {
  const [open, setOpen] = useState(0);

  return (
    <div className="pt-24 pb-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-14">
          <p className="text-gold-600 text-sm tracking-[0.2em] uppercase mb-2">Help</p>
          <h1 className="font-serif text-4xl md:text-5xl text-charcoal">Frequently Asked Questions</h1>
        </motion.div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div key={i} className="bg-white rounded-xl border border-gold-100 overflow-hidden">
              <button
                onClick={() => setOpen(open === i ? -1 : i)}
                className="w-full flex items-center justify-between p-5 text-left"
              >
                <span className="font-medium text-charcoal pr-4">{faq.q}</span>
                <ChevronDown
                  size={18}
                  className={`shrink-0 text-gold-500 transition-transform duration-300 ${open === i ? 'rotate-180' : ''}`}
                />
              </button>
              <AnimatePresence>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                  >
                    <p className="px-5 pb-5 text-sm text-charcoal/65 leading-relaxed">{faq.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
