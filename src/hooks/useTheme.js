import { useState, useEffect } from 'react';
import faviconDark from '../data/assets/favicon-dark.svg';
import faviconLight from '../data/assets/favicon-light.svg';

export function useTheme() {
  // Initialize state based on localStorage or system preference
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('theme');
      if (stored) {
        return stored === 'dark';
      }
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return true; // Default to dark mode (Obsidian Synth)
  });

  // Toggle function
  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  // Side effect to update the HTML class, localStorage, and favicons
  useEffect(() => {
    const root = window.document.documentElement;
    const favicons = window.document.querySelectorAll("link[rel~='icon']");

    if (isDark) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      favicons.forEach((el) => {
        el.href = faviconDark;
      });
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      favicons.forEach((el) => {
        el.href = faviconLight;
      });
    }
  }, [isDark]);

  return { isDark, toggleTheme };
}
