import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ScrollReveal } from './ScrollReveal';
import { useLanguage } from '../hooks/useLanguage';
import { Terminal } from 'lucide-react';

export function About() {
  const { content, lang } = useLanguage();
  const { bio } = content.about;

  // Flag to toggle photo display in the code itself
  const SHOW_PHOTOS = true;

  // Dynamically load all images in /src/data/personal/
  const photoModules = import.meta.glob('/src/data/personal/*.{png,jpg,jpeg,webp,svg}', { eager: true });
  const photos = Object.values(photoModules).map((mod) => mod.default || mod);

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (photos.length <= 1 || !SHOW_PHOTOS) return;
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % photos.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [photos.length, currentIndex]);

  const hasPhotos = SHOW_PHOTOS && photos.length > 0;

  return (
    <section id="about" className="py-20 relative">
      <div className="max-w-5xl mx-auto px-6 space-y-12">
        <ScrollReveal>
          <div className="flex items-center gap-4">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-on-surface tracking-tight">
              {lang === 'en' ? 'About Me' : 'Sobre Mim'}
            </h2>
            <div className="h-px bg-outline-variant/50 flex-grow"></div>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div className="glass-panel p-8 md:p-10 rounded-2xl">
            <div className={`grid grid-cols-1 ${hasPhotos ? 'md:grid-cols-3' : ''} gap-8 items-center`}>
              {/* Left Column: Text Summary */}
              <div className={hasPhotos ? 'md:col-span-2' : ''}>
                <Terminal className="text-primary mb-6" size={32} />
                <h3 className="font-display text-2xl font-bold text-on-surface mb-4">
                  {lang === 'en' ? 'More than just Uptime' : 'Mais do que Uptime'}
                </h3>
                <p className="font-body text-on-surface-variant leading-relaxed text-lg whitespace-pre-line">
                  {bio}
                </p>
              </div>

              {/* Right Column: Rotating Photo Gallery */}
              {hasPhotos && (
                <div className="relative w-full aspect-square md:aspect-[4/5] rounded-xl overflow-hidden glass-panel border border-outline-variant/30 shadow-lg group">
                  <AnimatePresence>
                    <motion.img
                      key={currentIndex}
                      src={photos[currentIndex]}
                      alt={lang === 'en' ? 'Photo of Tiago Carriço' : 'Foto de Tiago Carriço'}
                      initial={{ opacity: 0, scale: 1.05 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.8 }}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </AnimatePresence>

                  {/* Dots indicator for multiple photos */}
                  {photos.length > 1 && (
                    <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-10">
                      {photos.map((_, idx) => (
                        <button
                          key={idx}
                          onClick={() => setCurrentIndex(idx)}
                          className={`w-2 h-2 rounded-full transition-all duration-300 ${currentIndex === idx
                            ? 'bg-primary w-4'
                            : 'bg-on-surface/30 hover:bg-on-surface/50'
                            }`}
                          aria-label={`Go to photo ${idx + 1}`}
                        />
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

