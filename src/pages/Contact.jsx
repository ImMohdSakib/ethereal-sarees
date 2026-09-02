import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

export default function Contact() {
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-14">
          <p className="text-gold-600 text-sm tracking-[0.2em] uppercase mb-2">Get in Touch</p>
          <h1 className="font-serif text-4xl md:text-5xl text-charcoal">Contact Us</h1>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          <div className="space-y-8">
            {[
              { icon: MapPin, title: 'Visit Us', text: '12 Heritage Lane, Mumbai 400001, India' },
              { icon: Phone, title: 'Call Us', text: '+91 98765 43210' },
              { icon: Mail, title: 'Email Us', text: 'hello@etherealsarees.com' },
            ].map((item) => (
              <div key={item.title} className="flex gap-4">
                <div className="p-3 rounded-full bg-gold-50 text-gold-600 shrink-0">
                  <item.icon size={20} />
                </div>
                <div>
                  <h3 className="font-medium mb-1">{item.title}</h3>
                  <p className="text-charcoal/60 text-sm">{item.text}</p>
                </div>
              </div>
            ))}
            <div className="pt-4">
              <h3 className="font-medium mb-2">Store Hours</h3>
              <p className="text-sm text-charcoal/60">Mon – Sat: 10:00 AM – 8:00 PM</p>
              <p className="text-sm text-charcoal/60">Sunday: 11:00 AM – 6:00 PM</p>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gold-100 p-6 sm:p-8">
            {sent ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 rounded-full bg-gold-100 text-gold-600 flex items-center justify-center mx-auto mb-4">
                  <Send size={24} />
                </div>
                <h3 className="font-serif text-2xl mb-2">Message Sent!</h3>
                <p className="text-charcoal/60">We'll get back to you within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-charcoal/60 mb-1.5">Name</label>
                    <input required className="w-full px-4 py-3 rounded-lg border border-gold-200 text-sm focus:outline-none focus:border-gold-400" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-charcoal/60 mb-1.5">Email</label>
                    <input type="email" required className="w-full px-4 py-3 rounded-lg border border-gold-200 text-sm focus:outline-none focus:border-gold-400" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-charcoal/60 mb-1.5">Subject</label>
                  <input required className="w-full px-4 py-3 rounded-lg border border-gold-200 text-sm focus:outline-none focus:border-gold-400" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-charcoal/60 mb-1.5">Message</label>
                  <textarea required rows={5} className="w-full px-4 py-3 rounded-lg border border-gold-200 text-sm focus:outline-none focus:border-gold-400 resize-none" />
                </div>
                <button type="submit" className="w-full bg-gold-500 hover:bg-gold-400 text-charcoal font-semibold py-3.5 rounded-full transition-colors">
                  Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
