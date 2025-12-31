import React, { useEffect, useRef, useCallback } from 'react';

const GAME_W = 1920;
const GAME_H = 1080;

/**
 * Check if user is actively editing text
 */
const isTextEditing = (): boolean => {
  const el = document.activeElement;
  if (!el) return false;

  if (el instanceof HTMLInputElement) {
    const textTypes = ['text', 'password', 'email', 'search', 'tel', 'url', 'number'];
    return textTypes.includes(el.type);
  }
  if (el instanceof HTMLTextAreaElement) return true;
  if (el instanceof HTMLElement && el.isContentEditable) return true;

  return false;
};

/**
 * Minimal scaler with keyboard freeze support
 */
export const useScaler = (
  containerRef: React.RefObject<HTMLDivElement | null>,
  stageRef: React.RefObject<HTMLDivElement | null>,
  isFullscreen: boolean
) => {
  const lastScaleRef = useRef(1);
  const baseHeightRef = useRef(0);

  const updateScale = useCallback(() => {
    const stage = stageRef.current;
    if (!stage) return;

    const vw = window.innerWidth;
    const vh = window.innerHeight;

    // Update base height when not editing
    if (!isTextEditing() && vh > 0) {
      baseHeightRef.current = vh;
    }

    // Check if keyboard is open (height reduced significantly while editing)
    const isKeyboardOpen = isTextEditing() &&
      baseHeightRef.current > 0 &&
      (baseHeightRef.current - vh) > 150;

    // Use frozen scale when keyboard is open, otherwise calculate new scale
    let scale: number;
    if (isKeyboardOpen) {
      scale = lastScaleRef.current;
    } else {
      scale = Math.min(vw / GAME_W, vh / GAME_H);
      if (!Number.isFinite(scale) || scale <= 0) {
        scale = lastScaleRef.current || 1;
      }
      lastScaleRef.current = scale;
    }

    // Calculate centered position
    const scaledW = GAME_W * scale;
    const scaledH = GAME_H * scale;
    const x = (vw - scaledW) / 2;
    const y = (vh - scaledH) / 2;

    stage.style.transform = `translate(${x}px, ${y}px) scale(${scale})`;
  }, [stageRef]);

  useEffect(() => {
    // Initial scale
    updateScale();

    // Show stage
    if (stageRef.current) {
      stageRef.current.style.opacity = '1';
    }

    // Listen for resize
    window.addEventListener('resize', updateScale);

    return () => {
      window.removeEventListener('resize', updateScale);
    };
  }, [updateScale, stageRef]);

  return { updateScale };
};