import { useEffect, useRef } from 'react';
import { useTheme } from '../hooks/useTheme';

// ↓ Toggle this flag to enable/disable the mouse spotlight effect
const SHOW_SPOTLIGHT = true;

export function MouseSpotlight() {
  const { isDark } = useTheme();
  const spotlightRef = useRef(null);

  useEffect(() => {
    if (!SHOW_SPOTLIGHT) return;
    const el = spotlightRef.current;
    if (!el) return;

    const handleMouseMove = (e) => {
      const x = e.clientX;
      const y = e.clientY;

      // Read --color-secondary from the active theme in real time.
      // index.css stores it as space-separated RGB values e.g. "236 72 153"
      // so we convert to "R, G, B" format for rgba().
      const raw = getComputedStyle(document.documentElement)
        .getPropertyValue('--color-secondary')
        .trim()
        .split(/\s+/)
        .join(', ');

      // Three concentric layers give the "blur increases with distance" illusion:
      //  1. Tight bright core  — sharp, concentrated
      //  2. Mid-range halo     — softer, transitional
      //  3. Wide outer diffuse — very faint, wide spread
      //el.style.background = [
      //  `radial-gradient(circle 40px  at ${x}px ${y}px, rgba(${raw}, 0.25) 0%, rgba(${raw}, 0.10) 60%, transparent 100%)`,
      //  `radial-gradient(circle 140px at ${x}px ${y}px, rgba(${raw}, 0.10) 0%, transparent 100%)`,
      //  `radial-gradient(circle 280px at ${x}px ${y}px, rgba(${raw}, 0.05) 0%, transparent 100%)`,
      //].join(', ');

      el.style.background = [
        `radial-gradient(circle 60px  at ${x}px ${y}px, rgba(${raw}, 0.10) 0%, rgba(${raw}, 0.30) 60%, transparent 100%)`,
        `radial-gradient(circle 120px at ${x}px ${y}px, rgba(${raw}, 0.25) 0%, transparent 100%)`,
        `radial-gradient(circle 220px at ${x}px ${y}px, rgba(${raw}, 0.05) 0%, transparent 100%)`,
      ].join(', ');
    };

    // Hide when cursor leaves the window
    const handleMouseLeave = () => {
      el.style.background = 'transparent';
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isDark]); // re-bind on theme change so color CSS variable is re-read

  if (!SHOW_SPOTLIGHT) return null;

  return (
    <div
      ref={spotlightRef}
      aria-hidden="true"
      className="fixed inset-0 z-[5] pointer-events-none"
      style={{ background: 'transparent', transition: 'background 0.05s ease' }}
    />
  );
}
