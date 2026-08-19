import React from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

export const Hero = () => {
  return (
    <section className="relative w-full h-screen flex flex-col justify-between items-center px-6 pt-32 pb-12 text-center select-none z-10 pointer-events-none">
      {/* Opening Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-4xl mx-auto"
      >
        <span className="text-xs uppercase tracking-widest font-semibold text-white/50 mb-3 block">
          Rebuilt from the sound up
        </span>
        
        <h1 className="hero-title font-extrabold text-white tracking-tight text-gradient mb-4">
          AirPods Pro 2
        </h1>

        <p className="text-xl sm:text-3xl font-normal text-white/70 tracking-tight max-w-2xl mx-auto font-sans">
          The next evolution of sound.
        </p>
      </motion.div>

      {/* Subtle Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.8 }}
        className="flex flex-col items-center gap-2 text-white/40 text-xs font-medium uppercase tracking-widest"
      >
        <span>Scroll to explore</span>
        <div className="w-5 h-8 border border-white/20 rounded-full flex justify-center pt-1.5 backdrop-blur-sm">
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
            className="w-1 h-2 bg-white rounded-full"
          />
        </div>
      </motion.div>
    </section>
  );
};
