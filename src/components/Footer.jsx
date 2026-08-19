import React from "react";

export const Footer = () => {
  return (
    <footer className="bg-black border-t border-white/10 text-white/40 py-16 text-xs font-sans">
      <div className="max-w-7xl mx-auto px-6 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h4 className="font-semibold text-white/80 uppercase tracking-wider text-[11px] mb-3">AirPods Pro 2</h4>
            <p className="text-[11px] leading-relaxed text-white/40">
              Designed by Apple in California. Rebuilt with the custom Apple H2 headphone chip and low-distortion audio driver.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-white/80 uppercase tracking-wider text-[11px] mb-3">Technology</h4>
            <ul className="space-y-2">
              <li>Apple H2 Headphone Chip</li>
              <li>Apple U1 Chip in MagSafe Case</li>
              <li>Dual Beamforming Microphones</li>
              <li>Inward-facing Microphone</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white/80 uppercase tracking-wider text-[11px] mb-3">Controls</h4>
            <ul className="space-y-2">
              <li>Touch Control (Volume Swipe)</li>
              <li>Press once to play or pause</li>
              <li>Press and hold to switch ANC modes</li>
              <li>"Hey Siri" always on</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white/80 uppercase tracking-wider text-[11px] mb-3">In the Box</h4>
            <ul className="space-y-2">
              <li>AirPods Pro 2</li>
              <li>MagSafe Charging Case (USB-C)</li>
              <li>Silicone Ear Tips (XS, S, M, L)</li>
              <li>USB-C Charge Cable</li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4 text-[11px]">
          <p>Copyright © 2026 Apple Inc. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Use</a>
            <a href="#" className="hover:text-white transition-colors">Sales Policy</a>
            <a href="#" className="hover:text-white transition-colors">Legal</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
