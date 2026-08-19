import React from "react";
import { motion, AnimatePresence } from "framer-motion";

export const FEATURES_DATA = [
  {
    id: "anc",
    badge: "Active Noise Cancellation",
    title: "Silence that lets you hear what matters.",
    description:
      "Up to 2x more Active Noise Cancellation than the previous generation. Breakthrough H2 chip intelligence creates quieter commutes and focus when you need it most.",
    start: 0.2,
    end: 0.35,
    alignment: "left",
  },
  {
    id: "adaptive",
    badge: "Adaptive Audio",
    title: "Sound that intelligently adapts to your surroundings.",
    description:
      "Dynamic listening modes seamlessly blend Transparency mode and Active Noise Cancellation as your environment changes throughout the day.",
    start: 0.4,
    end: 0.55,
    alignment: "right",
  },
  {
    id: "transparency",
    badge: "Transparency Mode",
    title: "Stay connected to the world around you.",
    description:
      "Hear outside voices and conversations naturally. Harsh environmental noise—like sirens or power tools—is reduced at 48,000 times per second.",
    start: 0.6,
    end: 0.75,
    alignment: "left",
  },
  {
    id: "spatial",
    badge: "Personalized Spatial Audio",
    title: "Sound that surrounds you.",
    description:
      "Dynamic head tracking tunes audio directly to the unique geometry of your ears, placing sound precisely in 3D space for an immersive acoustic theater experience.",
    start: 0.8,
    end: 0.95,
    alignment: "center",
  },
];

/**
 * Calculates opacity and y-offset for a feature given scroll progress
 */
function getFeatureVisibility(progress, start, end) {
  const fadeInWindow = 0.05;
  const fadeOutWindow = 0.05;

  if (progress < start || progress > end) {
    return { opacity: 0, y: 30, visible: false };
  }

  let opacity = 1;
  let y = 0;

  // Fade in phase
  if (progress < start + fadeInWindow) {
    const factor = (progress - start) / fadeInWindow;
    opacity = factor;
    y = (1 - factor) * 30;
  }
  // Fade out phase
  else if (progress > end - fadeOutWindow) {
    const factor = (end - progress) / fadeOutWindow;
    opacity = factor;
    y = (1 - factor) * -30;
  }

  return { opacity, y, visible: true };
}

export const FeatureSection = ({ scrollProgress }) => {
  return (
    <div className="absolute inset-0 z-20 pointer-events-none flex flex-col justify-between p-6 sm:p-12 md:p-20">
      {FEATURES_DATA.map((feature) => {
        const { opacity, y, visible } = getFeatureVisibility(
          scrollProgress,
          feature.start,
          feature.end
        );

        if (!visible) return null;

        const alignmentClasses =
          feature.alignment === "left"
            ? "mr-auto text-left max-w-lg"
            : feature.alignment === "right"
            ? "ml-auto text-right max-w-lg"
            : "mx-auto text-center max-w-2xl";

        return (
          <div key={feature.id} className="my-auto w-full">
            <div
              style={{
                opacity,
                transform: `translateY(${y}px)`,
                transition: "opacity 0.2s ease-out, transform 0.2s ease-out",
              }}
              className={`${alignmentClasses} pointer-events-auto`}
            >
              <div className="inline-block px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-white/80 text-xs font-semibold uppercase tracking-wider mb-4">
                {feature.badge}
              </div>

              <h2 className="feature-title font-extrabold text-white tracking-tight mb-4">
                {feature.title}
              </h2>

              <p className="text-base sm:text-lg text-white/70 font-normal leading-relaxed">
                {feature.description}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};
