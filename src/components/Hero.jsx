import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Leaf, Truck, Package, Shield } from 'lucide-react';

const features = [
  { icon: Leaf, title: 'Premium Quality', desc: 'Finest fabrics & craftsmanship' },
  { icon: Truck, title: 'Free Shipping', desc: 'On orders above ₹999' },
  { icon: Package, title: 'Easy Returns', desc: 'Hassle free returns' },
  { icon: Shield, title: 'Secure Payment', desc: '100% secure checkout' },
];

export default function Hero() {
  return (
    <section className="relative min-h-[100svh] min-h-[100dvh] flex flex-col overflow-hidden">
      {/* Background images — different for mobile vs desktop */}
      <div className="absolute inset-0">
        {/* Mobile image: portrait-friendly woman in traditional attire */}
        <img
          src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=900&q=85"
          alt="Elegant saree collection"
          className="w-full h-full object-cover object-center md:hidden"
        />
        {/* Desktop: your custom hero image */}
        <img
          src="/hero-saree.png"
          alt="Woman in elegant pink silk saree"
          className="hidden md:block w-full h-full object-cover object-center"
        />
        {/* Overlays */}
        <div className="absolute inset-0 bg-[#2a1a10]/55 md:bg-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#3d2a1a]/90 via-[#3d2a1a]/55 to-[#3d2a1a]/15 md:via-[#3d2a1a]/45 md:to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1a120c]/85 via-transparent to-[#1a120c]/45" />
      </div>

      {/* Main content */}
      <div className="relative z-10 flex-1 flex items-center pt-20 sm:pt-24 md:pt-28 pb-4 sm:pb-6">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 w-full">
          <div className="max-w-xl mx-auto md:mx-0 text-center md:text-left">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.1 }}
              className="mb-3 sm:mb-5"
            >
              <p className="text-[#e8d5a3] text-[10px] sm:text-xs md:text-sm tracking-[0.3em] sm:tracking-[0.35em] uppercase font-medium">
                Handcrafted Heritage
              </p>
              <div className="mt-1.5 sm:mt-2 flex items-center justify-center md:justify-start gap-2">
                <span className="h-px w-12 sm:w-12 bg-[#c9a84c]/70" />
                <span className="text-[#c9a84c]/80 text-[9px] sm:text-[10px]">✦</span>
                <span className="h-px w-12 sm:w-12 bg-[#c9a84c]/70" />
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.2 }}
              className="font-serif text-[2.35rem] leading-[1.12] sm:text-5xl sm:leading-[1.1] md:text-6xl lg:text-7xl mb-3 sm:mb-5 md:mb-6"
            >
                 <span className="text-white font-normal">Timeless</span>
              <br />
              <span className="text-[#e4c76b] font-medium italic">Elegance</span>
              <br />
              <span className="text-white font-normal">Draped in Silk</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.32 }}
              className="text-white/75 text-sm sm:text-base md:text-lg leading-relaxed mb-6 sm:mb-8 max-w-sm mx-auto md:mx-0"
            >
                 Discover exclusive Banarasi, Kanjeevaram & pure silk sarees — woven by master artisans for the modern woman.
            </motion.p>

           <motion.div
  initial={{ opacity: 0, y: 16 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.55, delay: 0.55 }}
>
  <div className="flex flex-wrap justify-center md:justify-start gap-3 md:gap-4 mb-10 md:mb-12">
    <Link
      to="/store"
      className="group inline-flex items-center gap-2.5 bg-gold-500 hover:bg-gold-400 text-charcoal font-semibold px-6 md:px-8 py-3 md:py-3.5 rounded-full transition-all duration-300 shadow-lg shadow-gold-500/25 hover:shadow-gold-400/40"
    >
      Shop Now
      <ArrowRight
        size={16}
        className="group-hover:translate-x-1 transition-transform"
      />
    </Link>
  </div>
</motion.div>
          </div>
        </div>
      </div>

      {/* Bottom feature bar */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.55 }}
        className="relative z-10 mt-auto"
      >
        <div className="bg-[#1a120c]/85 backdrop-blur-md border-t border-white/10">
          <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
            <div className="flex md:hidden gap-4 overflow-x-auto py-3.5 scrollbar-none">
              {features.map((f) => (
                <div
                  key={f.title}
                  className="flex items-center gap-2.5 shrink-0 min-w-[140px]"
                >
                  <div className="shrink-0 w-8 h-8 rounded-full border border-[#c9a84c]/40 flex items-center justify-center text-[#c9a84c]">
                    <f.icon size={14} strokeWidth={1.5} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[#e8d5a3] text-[10px] font-semibold tracking-wide uppercase leading-tight">
                      {f.title}
                    </p>
                    <p className="text-white/45 text-[10px] leading-tight truncate max-w-[100px]">
                      {f.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-4 py-4 md:py-5">
              {features.map((f) => (
                <div key={f.title} className="flex items-center gap-3">
                  <div className="shrink-0 w-9 h-9 rounded-full border border-[#c9a84c]/40 flex items-center justify-center text-[#c9a84c]">
                    <f.icon size={16} strokeWidth={1.5} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[#e8d5a3] text-xs font-semibold tracking-wide uppercase truncate">
                      {f.title}
                    </p>
                    <p className="text-white/50 text-[11px] truncate">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
 