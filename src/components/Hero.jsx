import React from "react";
import { motion } from "framer-motion";

export const Hero = ({ scrollProgress = 0 }) => {
  // Fade out hero content as scroll progress moves from 0 to 0.12
  const opacity = Math.max(0, 1 - scrollProgress / 0.12);
  const translateY = scrollProgress * -80;

  if (opacity <= 0) return null;

  return (
    <div
      style={{
        opacity,
        transform: `translateY(${translateY}px)`,
        transition: "opacity 0.1s linear, transform 0.1s linear",
      }}
      className="absolute inset-0 z-20 flex flex-col justify-between items-center px-6 pt-32 pb-12 text-center select-none pointer-events-none"
    >
      {/* Opening Header */}
      <div className="max-w-4xl mx-auto mt-12">
        <span className="text-xs uppercase tracking-widest font-semibold text-white/60 mb-3 block">
          Rebuilt from the sound up
        </span>

        <h1 className="hero-title font-extrabold text-white tracking-tight mb-4 drop-shadow-2xl">
          AirPods Pro 2
        </h1>

        <p className="text-xl sm:text-3xl font-normal text-white/80 tracking-tight max-w-2xl mx-auto font-sans">
          The next evolution of sound.
        </p>
      </div>

      {/* Subtle Scroll Indicator */}
      <div className="flex flex-col items-center gap-2 text-white/50 text-xs font-medium uppercase tracking-widest">
        <span>Scroll to explore</span>
        <div className="w-5 h-8 border border-white/30 rounded-full flex justify-center pt-1.5 backdrop-blur-sm">
          <div className="w-1 h-2 bg-white rounded-full animate-bounce" />
        </div>
      </div>
    </div>
  );
};
