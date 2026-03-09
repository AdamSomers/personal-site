import { useEffect, useRef } from 'react';
import { simplex2 } from '../lib/noise';

const COLORS = [
  { r: 46, g: 111, b: 186, a: 0.1 },    // blue
  { r: 126, g: 184, b: 216, a: 0.12 },   // light blue
  { r: 194, g: 113, b: 58, a: 0.08 },    // warm accent
  { r: 46, g: 111, b: 186, a: 0.06 },    // blue lighter
];

export default function GenerativeWaveform() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const scrollRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener('resize', resize);

    const onScroll = () => {
      scrollRef.current = window.scrollY;
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    let time = 0;

    const draw = () => {
      const rect = canvas.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;

      ctx.clearRect(0, 0, w, h);

      const scrollOffset = scrollRef.current * 0.0003;
      const isMobile = w < 640;
      const layerCount = isMobile ? 2 : COLORS.length;
      const step = isMobile ? 4 : 2;

      for (let layer = 0; layer < layerCount; layer++) {
        const color = COLORS[layer];
        const isDark = document.documentElement.classList.contains('dark');
        const alpha = isDark ? color.a * 1.5 : color.a;

        ctx.beginPath();
        ctx.moveTo(0, h);

        for (let x = 0; x <= w; x += step) {
          const nx = x / w;
          const frequency = 1.5 + layer * 0.5;
          const amplitude = h * (0.15 + layer * 0.05);
          const baseY = h * 0.5;

          const noise = simplex2(
            nx * frequency + time * 0.3 + layer * 10 + scrollOffset,
            time * 0.15 + layer * 5
          );

          const y = baseY + noise * amplitude;
          ctx.lineTo(x, y);
        }

        ctx.lineTo(w, h);
        ctx.closePath();
        ctx.fillStyle = `rgba(${color.r}, ${color.g}, ${color.b}, ${alpha})`;
        ctx.fill();
      }

      if (!prefersReducedMotion) {
        time += 0.008;
      }
      animRef.current = requestAnimationFrame(draw);
    };

    animRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener('resize', resize);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none opacity-0 animate-[fadeIn_1.5s_ease_forwards]"
      style={{ animationDelay: '0.1s' }}
      aria-hidden="true"
    />
  );
}
