import React from "react";
import { motion, AnimatePresence } from "framer-motion";

export const ProgressIndicator = ({ loadedCount, totalCount, isLoaded }) => {
  const percentage = Math.min(100, Math.round((loadedCount / totalCount) * 100));

  // Hide loading screen as soon as experience is ready or frames loaded
  const shouldHide = isLoaded || percentage >= 95;

  return (
    <AnimatePresence>
      {!shouldHide && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.6, ease: "easeOut" } }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black text-white px-6 select-none"
        >
          <div className="flex flex-col items-center max-w-sm w-full">
            {/* Apple AirPods Pro icon / logo */}
            <div className="w-12 h-12 mb-6 rounded-2xl bg-white/10 flex items-center justify-center border border-white/10 shadow-2xl">
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 100-6 3 3 0 000 6z" />
              </svg>
            </div>

            <h1 className="text-xl font-bold tracking-tight text-white mb-1">
              AirPods Pro 2
            </h1>
            <p className="text-xs text-white/50 mb-8 tracking-wide font-medium">
              Preparing your experience...
            </p>

            {/* Sleek Progress Bar */}
            <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden mb-3 relative">
              <motion.div
                className="h-full bg-white rounded-full"
                style={{ width: `${percentage}%` }}
                transition={{ ease: "easeOut", duration: 0.1 }}
              />
            </div>

            <div className="w-full flex justify-between text-[11px] text-white/40 font-mono">
              <span>LOADING ASSETS</span>
              <span className="text-white font-semibold">{percentage}%</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
