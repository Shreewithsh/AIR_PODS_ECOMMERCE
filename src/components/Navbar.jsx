import React, { useState, useEffect } from "react";
import { Menu, X, ShoppingBag } from "lucide-react";

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled ? "apple-glass py-3 shadow-xl" : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Apple Logo & Product Title */}
          <a
            href="#"
            className="flex items-center gap-2 font-semibold text-sm tracking-tight text-white/90 hover:text-white transition-colors"
          >
            {/* Apple Icon SVG */}
            <svg className="w-4 h-4 fill-current" viewBox="0 0 170 170">
              <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.7-3.04-7.7-7.91-12.02-14.61-7.46-11.6-13.06-24.62-16.8-39.06-3.74-14.44-5.61-27.91-5.61-40.41 0-16.14 3.73-29.47 11.19-40 7.46-10.53 17.2-15.89 29.22-16.08 4.79 0 9.87 1.15 15.24 3.44 5.37 2.29 9.17 3.44 11.4 3.44 2.01 0 5.86-1.15 11.57-3.44 5.71-2.29 10.74-3.44 15.07-3.44 11.05.38 20.35 5.12 27.9 14.22-25.04 15.11-24.66 40.54.89 55.44-4.8 11.58-11.06 23.01-18.77 34.28zM119.22 31.07c0-7.85 2.82-15.34 8.46-22.48 5.64-7.14 12.82-11.39 21.54-12.75.25 1.01.38 2.02.38 3.03 0 7.72-2.91 15.22-8.73 22.5-5.82 7.28-13 11.52-21.55 12.72-.05-1.02-.1-2.03-.1-3.02z" />
            </svg>
            <span>AirPods Pro 2</span>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="#overview" className="text-xs text-white/70 hover:text-white transition-colors">
              Overview
            </a>
            <a href="#features" className="text-xs text-white/70 hover:text-white transition-colors">
              Features
            </a>
            <a href="#technology" className="text-xs text-white/70 hover:text-white transition-colors">
              Technology
            </a>
            <a href="#specs" className="text-xs text-white/70 hover:text-white transition-colors">
              Tech Specs
            </a>
          </nav>

          {/* Action Button */}
          <div className="flex items-center gap-4">
            <a
              href="#buy"
              className="px-3.5 py-1.5 rounded-full bg-appleBlue hover:bg-blue-600 font-medium text-xs text-white transition-all duration-200"
            >
              Buy
            </a>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden text-white/70 hover:text-white p-1"
              aria-label="Toggle Menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-30 bg-black/95 backdrop-blur-2xl flex flex-col justify-center px-8 pt-20 pb-10 md:hidden">
          <nav className="flex flex-col gap-6 text-xl font-medium text-white/80">
            <a href="#overview" onClick={() => setMobileOpen(false)} className="border-b border-white/10 pb-4">
              Overview
            </a>
            <a href="#features" onClick={() => setMobileOpen(false)} className="border-b border-white/10 pb-4">
              Features
            </a>
            <a href="#technology" onClick={() => setMobileOpen(false)} className="border-b border-white/10 pb-4">
              Technology
            </a>
            <a href="#specs" onClick={() => setMobileOpen(false)} className="border-b border-white/10 pb-4">
              Tech Specs
            </a>
          </nav>
        </div>
      )}
    </>
  );
};
