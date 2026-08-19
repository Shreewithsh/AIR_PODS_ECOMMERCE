import React, { useRef, useEffect, useState, useCallback } from "react";

// =========================================================================
// FRAME ASSET CONFIGURATION
// Replace these paths with the location of your extracted video frames.
// =========================================================================
export const SEQUENCE_CONFIG = {
  frameCount: 240,
  framePath: "frames/ezgif-frame-",
  extension: ".jpg",
  digits: 3, // e.g., 001, 002, 003 ... 240
};

/**
 * Helper to generate zero-padded frame URLs respecting Vite base paths
 * Example: getFrameUrl(1) => "frames/ezgif-frame-001.jpg" or "/AIR_PODS_ECOMMERCE/frames/ezgif-frame-001.jpg"
 */
export function getFrameUrl(index, config = SEQUENCE_CONFIG) {
  const paddedIndex = String(index).padStart(config.digits, "0");
  const cleanPath = config.framePath.replace(/^\//, "");
  const baseUrl = import.meta.env.BASE_URL || "./";
  const cleanBase = baseUrl.endsWith("/") ? baseUrl : `${baseUrl}/`;
  return `${cleanBase}${cleanPath}${paddedIndex}${config.extension}`;
}

export const ScrollSequence = ({
  scrollProgress,
  onLoadProgress,
  onLoaded,
  config = SEQUENCE_CONFIG,
}) => {
  const canvasRef = useRef(null);
  const imagesRef = useRef([]);
  const lastRenderedFrameRef = useRef(-1);
  const [isReady, setIsReady] = useState(false);

  // Render a specific frame index onto the canvas with High-DPI Retina support
  const renderFrame = useCallback((frameIdx) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const images = imagesRef.current;
    if (!images || images.length === 0) return;

    // Find the requested frame, or fallback to the nearest available loaded frame
    let img = images[frameIdx];
    if (!img || !img.complete || img.naturalWidth === 0) {
      // Find nearest loaded frame
      for (let offset = 1; offset < config.frameCount; offset++) {
        const prev = images[frameIdx - offset];
        if (prev && prev.complete && prev.naturalWidth > 0) {
          img = prev;
          break;
        }
        const next = images[frameIdx + offset];
        if (next && next.complete && next.naturalWidth > 0) {
          img = next;
          break;
        }
      }
    }

    if (!img || !img.complete || img.naturalWidth === 0) return;

    // Retina / High-DPI support & robust fallback container sizing
    const dpr = window.devicePixelRatio || 1;
    const width = canvas.clientWidth || canvas.parentElement?.clientWidth || window.innerWidth;
    const height = canvas.clientHeight || canvas.parentElement?.clientHeight || window.innerHeight;

    if (canvas.width !== width * dpr || canvas.height !== height * dpr) {
      canvas.width = width * dpr;
      canvas.height = height * dpr;
    }

    ctx.save();
    ctx.scale(dpr, dpr);

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Calculate aspect ratio containment (object-fit: contain)
    const imgWidth = img.naturalWidth;
    const imgHeight = img.naturalHeight;
    const imgAspect = imgWidth / imgHeight;
    const canvasAspect = width / height;

    let renderW = width;
    let renderH = height;
    let renderX = 0;
    let renderY = 0;

    if (canvasAspect > imgAspect) {
      renderH = height;
      renderW = height * imgAspect;
      renderX = (width - renderW) / 2;
      renderY = 0;
    } else {
      renderW = width;
      renderH = width / imgAspect;
      renderX = 0;
      renderY = (height - renderH) / 2;
    }

    ctx.drawImage(img, renderX, renderY, renderW, renderH);
    ctx.restore();

    lastRenderedFrameRef.current = frameIdx;
  }, [config.frameCount]);

  // Preload all frames on mount
  useEffect(() => {
    let isSubscribed = true;
    const loadedImages = new Array(config.frameCount);
    imagesRef.current = loadedImages; // Immediately assign array reference!
    let loadedCount = 0;

    for (let i = 1; i <= config.frameCount; i++) {
      const img = new Image();
      img.src = getFrameUrl(i, config);

      img.onload = () => {
        if (!isSubscribed) return;
        loadedImages[i - 1] = img;
        loadedCount++;
        if (onLoadProgress) onLoadProgress(loadedCount, config.frameCount);

        // Mark ready as soon as initial frame or enough frames are ready
        if (loadedCount >= 1 && !isReady) {
          setIsReady(true);
        }

        if (loadedCount === config.frameCount) {
          if (onLoaded) onLoaded();
        }
      };

      img.onerror = (e) => {
        if (!isSubscribed) return;
        console.warn(`Failed to load frame ${i}:`, img.src);
        loadedCount++;
        if (onLoadProgress) onLoadProgress(loadedCount, config.frameCount);
        if (loadedCount >= 1 && !isReady) {
          setIsReady(true);
        }
        if (loadedCount === config.frameCount) {
          if (onLoaded) onLoaded();
        }
      };
    }

    return () => {
      isSubscribed = false;
    };
  }, [config, isReady, onLoadProgress, onLoaded]);

  // Sync scroll progress to target frame index via requestAnimationFrame
  useEffect(() => {
    if (!isReady || !imagesRef.current) return;

    const targetFrame = Math.min(
      config.frameCount - 1,
      Math.max(0, Math.floor(scrollProgress * (config.frameCount - 1)))
    );

    // Render frame
    if (lastRenderedFrameRef.current !== targetFrame) {
      requestAnimationFrame(() => renderFrame(targetFrame));
    }
  }, [scrollProgress, isReady, config.frameCount, renderFrame]);

  // Initial draw & window resize handler
  useEffect(() => {
    if (!isReady) return;

    const handleResize = () => {
      const frameToDraw = lastRenderedFrameRef.current >= 0 ? lastRenderedFrameRef.current : 0;
      renderFrame(frameToDraw);
    };

    renderFrame(0);
    window.addEventListener("resize", handleResize, { passive: true });
    return () => window.removeEventListener("resize", handleResize);
  }, [isReady, renderFrame]);

  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden bg-transparent">
      <canvas
        ref={canvasRef}
        className="w-full h-full object-contain pointer-events-none"
      />
    </div>
  );
};
