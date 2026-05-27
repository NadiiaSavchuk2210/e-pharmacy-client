import { isBrowser } from '@/shared/lib/browser';

const ORDER_CONFETTI_COLORS = [
  '#54b689',
  '#2f9f9b',
  '#f6c343',
  '#f27a54',
  '#6d7df2',
];

export const celebrateOrderSuccess = async () => {
  if (!isBrowser()) return;

  try {
    const { default: confetti } = await import('canvas-confetti');
    const defaults = {
      colors: ORDER_CONFETTI_COLORS,
      disableForReducedMotion: true,
      particleCount: 56,
      scalar: 0.9,
      spread: 58,
      startVelocity: 48,
      ticks: 160,
      zIndex: 1000,
    };

    void confetti({
      ...defaults,
      angle: 60,
      origin: { x: 0, y: 0.72 },
    });
    void confetti({
      ...defaults,
      angle: 120,
      origin: { x: 1, y: 0.72 },
    });

    window.setTimeout(() => {
      void confetti({
        ...defaults,
        angle: 90,
        particleCount: 36,
        spread: 72,
        startVelocity: 38,
        origin: { x: 0.5, y: 0.66 },
      });
    }, 160);
  } catch {
    return;
  }
};
