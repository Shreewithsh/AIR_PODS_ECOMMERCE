import { useState, useEffect } from "react";

/**
 * Custom hook to calculate scroll progress (0.0 to 1.0) inside a container ref
 * @param {React.RefObject<HTMLElement>} containerRef 
 * @returns {number} progress between 0 and 1
 */
export function useScrollProgress(containerRef) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let ticking = false;

    const updateScrollProgress = () => {
      if (!containerRef.current) {
        ticking = false;
        return;
      }

      const element = containerRef.current;
      const rect = element.getBoundingClientRect();
      const elementHeight = element.offsetHeight;
      const viewportHeight = window.innerHeight;

      // Distance user can scroll while canvas is pinned
      const totalScrollableDistance = elementHeight - viewportHeight;
      const currentScrollPosition = -rect.top;

      let currentProgress = 0;
      if (totalScrollableDistance > 0) {
        currentProgress = currentScrollPosition / totalScrollableDistance;
      }

      // Clamp between 0 and 1
      const clampedProgress = Math.min(1, Math.max(0, currentProgress));
      setProgress(clampedProgress);

      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(updateScrollProgress);
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    
    // Initial calculation
    updateScrollProgress();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [containerRef]);

  return progress;
}
