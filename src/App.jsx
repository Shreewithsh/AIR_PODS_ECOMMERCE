import React, { useState, useRef, useEffect } from "react";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { ScrollSequence } from "./components/ScrollSequence";
import { FeatureSection } from "./components/FeatureSection";
import { ProgressIndicator } from "./components/ProgressIndicator";
import { Footer } from "./components/Footer";
import { useScrollProgress } from "./hooks/useScrollProgress";

/**
 * Interpolates hex colors based on scroll progress (0.0 to 1.0)
 */
function interpolateColor(p) {
  const stops = [
    { p: 0.0, r: 0, g: 0, b: 0 },       // Deep black
    { p: 0.2, r: 5, g: 5, b: 7 },       // Near black
    { p: 0.4, r: 13, g: 13, b: 18 },    // Dark graphite
    { p: 0.6, r: 22, g: 22, b: 29 },    // Soft charcoal
    { p: 0.75, r: 31, g: 31, b: 38 },   // Muted titanium
    { p: 0.9, r: 42, g: 42, b: 51 },    // Clean titanium gray
    { p: 1.0, r: 8, g: 8, b: 12 },      // AirPods dark gradient base
  ];

  let lower = stops[0];
  let upper = stops[stops.length - 1];

  for (let i = 0; i < stops.length - 1; i++) {
    if (p >= stops[i].p && p <= stops[i + 1].p) {
      lower = stops[i];
      upper = stops[i + 1];
      break;
    }
  }

  const range = upper.p - lower.p;
  const factor = range > 0 ? (p - lower.p) / range : 0;

  const r = Math.round(lower.r + factor * (upper.r - lower.r));
  const g = Math.round(lower.g + factor * (upper.g - lower.g));
  const b = Math.round(lower.b + factor * (upper.b - lower.b));

  return `rgb(${r}, ${g}, ${b})`;
}

export function App() {
  const containerRef = useRef(null);
  const scrollProgress = useScrollProgress(containerRef);

  const [loadedCount, setLoadedCount] = useState(0);
  const [totalCount, setTotalCount] = useState(240);
  const [isLoaded, setIsLoaded] = useState(false);

  // Update dynamic CSS background system on scroll
  useEffect(() => {
    const bgColor = interpolateColor(scrollProgress);
    document.documentElement.style.setProperty("--background", bgColor);
  }, [scrollProgress]);

  return (
    <div className="min-h-screen bg-[var(--background)] text-white relative font-sans">
      {/* Loading experience overlay */}
      <ProgressIndicator
        loadedCount={loadedCount}
        totalCount={totalCount}
        isLoaded={isLoaded}
      />

      {/* Floating Apple Navbar */}
      <Navbar />

      {/* Hero Header Section */}
      <Hero />

      {/* Main 400vh Pinned Scroll-Controlled Canvas Experience */}
      <section ref={containerRef} className="relative h-[400vh] w-full">
        <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
          {/* HTML5 Canvas Image Sequence Renderer */}
          <ScrollSequence
            scrollProgress={scrollProgress}
            onLoadProgress={(count, total) => {
              setLoadedCount(count);
              setTotalCount(total);
            }}
            onLoaded={() => setIsLoaded(true)}
          />

          {/* Synchronized Scroll-Linked Feature Text Storytelling */}
          <FeatureSection scrollProgress={scrollProgress} />
        </div>
      </section>

      {/* Product Summary / Buy Banner Section */}
      <section id="buy" className="py-28 px-6 text-center border-t border-white/10 bg-black/40 backdrop-blur-lg relative z-20">
        <div className="max-w-3xl mx-auto">
          <span className="text-xs uppercase font-semibold text-white/50 tracking-widest block mb-3">
            AirPods Pro (2nd generation)
          </span>
          <h2 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight mb-6">
            Magic like you’ve never heard.
          </h2>
          <p className="text-lg text-white/70 font-normal mb-8 max-w-xl mx-auto">
            Starting at $249 with free engraved charging case and 6 months of Apple Music included.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="px-8 py-4 rounded-full bg-appleBlue hover:bg-blue-600 font-semibold text-sm text-white shadow-lg transition-all hover:scale-105">
              Buy AirPods Pro 2 — $249
            </button>
            <button className="px-8 py-4 rounded-full bg-white/10 hover:bg-white/20 font-semibold text-sm text-white border border-white/10 transition-all">
              Compare All Models
            </button>
          </div>
        </div>
      </section>

      {/* Apple Footer */}
      <Footer />
    </div>
  );
}

export default App;
