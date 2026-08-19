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
 * Helper to generate zero-padded frame URLs
 * Produces absolute base paths matching Vite's import.meta.env.BASE_URL
 * Example in Production: "/AIR_PODS_ECOMMERCE/frames/ezgif-frame-001.jpg"
 * Example in Development: "/frames/ezgif-frame-001.jpg"
 */
export function getFrameUrl(index, config = SEQUENCE_CONFIG) {
  const paddedIndex = String(index).padStart(config.digits, "0");
  const filename = `ezgif-frame-${paddedIndex}${config.extension}`;
  const base = import.meta.env.BASE_URL || "/";
  const cleanBase = base.endsWith("/") ? base : `${base}/`;
  return `${cleanBase}frames/${filename}`;
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
  const [firstFrameSrc, setFirstFrameSrc] = useState("");

  // Set first frame src for instant initial display
  useEffect(() => {
    setFirstFrameSrc(getFrameUrl(1, config));
  }, [config]);

  // Render a specific frame index onto the canvas with High-DPI Retina support
  const renderFrame = useCallback((frameIdx) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const images = imagesRef.current;
    if (!images || images.length === 0) return;

    // Find requested frame or fallback to nearest loaded frame
    let img = images[frameIdx];
    if (!img || !img.complete || img.naturalWidth === 0) {
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

    // Canvas dimensions & Retina resolution scaling
    const dpr = window.devicePixelRatio || 1;
    const parent = canvas.parentElement;
    const width = parent?.clientWidth || window.innerWidth;
    const height = parent?.clientHeight || window.innerHeight;

    if (canvas.width !== width * dpr || canvas.height !== height * dpr) {
      canvas.width = width * dpr;
      canvas.height = height * dpr;
    }

    ctx.save();
    ctx.scale(dpr, dpr);

    // Clear canvas with deep black
    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, width, height);

    // Object-fit: contain scaling
    const imgWidth = img.naturalWidth || 1280;
    const imgHeight = img.naturalHeight || 720;
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

  // Preload frames on mount
  useEffect(() => {
    let isSubscribed = true;
    const loadedImages = new Array(config.frameCount);
    imagesRef.current = loadedImages;
    let loadedCount = 0;

    for (let i = 1; i <= config.frameCount; i++) {
      const img = new Image();
      img.src = getFrameUrl(i, config);

      img.onload = () => {
        if (!isSubscribed) return;
        loadedImages[i - 1] = img;
        loadedCount++;
        if (onLoadProgress) onLoadProgress(loadedCount, config.frameCount);

        if (loadedCount >= 1 && !isReady) {
          setIsReady(true);
        }

        if (loadedCount === config.frameCount) {
          if (onLoaded) onLoaded();
        }
      };

      img.onerror = () => {
        if (!isSubscribed) return;
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

  // Sync scroll progress to frame rendering
  useEffect(() => {
    if (!imagesRef.current) return;

    const targetFrame = Math.min(
      config.frameCount - 1,
      Math.max(0, Math.floor(scrollProgress * (config.frameCount - 1)))
    );

    requestAnimationFrame(() => renderFrame(targetFrame));
  }, [scrollProgress, renderFrame, config.frameCount]);

  // Window resize listener
  useEffect(() => {
    const handleResize = () => {
      const frameToDraw = lastRenderedFrameRef.current >= 0 ? lastRenderedFrameRef.current : 0;
      renderFrame(frameToDraw);
    };

    renderFrame(0);
    window.addEventListener("resize", handleResize, { passive: true });
    return () => window.removeEventListener("resize", handleResize);
  }, [renderFrame]);

  return (
    <div className="absolute inset-0 w-full h-full flex items-center justify-center overflow-hidden bg-black">
      {/* Canvas Element */}
      <canvas
        ref={canvasRef}
        className="w-full h-full object-contain pointer-events-none z-10"
      />

      {/* Immediate First Frame Fallback Image before JS canvas loads */}
      {firstFrameSrc && (
        <img
          src={firstFrameSrc}
          alt="AirPods Pro 2"
          className="absolute inset-0 w-full h-full object-contain pointer-events-none z-0 opacity-40"
        />
      )}
    </div>
  );
};
