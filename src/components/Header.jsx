import { useState } from 'react';
import { Menu, Moon, Sun, X } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';
import { useLanguage } from '../hooks/useLanguage';

export function Header() {
  const { isDark, toggleTheme } = useTheme();
  const { lang, toggleLanguage, content } = useLanguage();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const siteData = content.site;
  const ui = siteData.ui;
  const shortTitle = siteData.header_title.split('—')[0].trim() || '';

  return (
    <nav className="sticky top-0 w-full z-50 bg-background/80 backdrop-blur-xl border-b border-outline-variant/30 transition-all duration-300">
      <div className="flex justify-between items-center h-20 max-w-[1200px] mx-auto px-6 md:px-12">
        <a href="#" className="font-display text-xl font-bold text-primary tracking-tight">
          {shortTitle}
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-8">
          <a href="#about" className="text-on-surface-variant hover:text-primary transition-colors font-display text-sm font-medium">
            {ui.nav.about}
          </a>
          <a href="#skills" className="text-on-surface-variant hover:text-primary transition-colors font-display text-sm font-medium">
            {ui.nav.skills}
          </a>
          <a href="#experience" className="text-on-surface-variant hover:text-primary transition-colors font-display text-sm font-medium">
            {ui.nav.experience}
          </a>
          <a href="#projects" className="text-on-surface-variant hover:text-primary transition-colors font-display text-sm font-medium">
            {ui.nav.projects}
          </a>
          {content.blog?.enabled && (
            <a href="#blog" className="text-on-surface-variant hover:text-primary transition-colors font-display text-sm font-medium">
              {ui.nav.blog}
            </a>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4 z-50">
          <button
            onClick={toggleLanguage}
            className="p-2 text-on-surface-variant hover:text-primary transition-colors rounded-full hover:bg-surface-dim font-display text-sm font-bold uppercase"
            aria-label="Toggle Language"
          >
            {lang}
          </button>

          <button
            onClick={toggleTheme}
            className="p-2 text-on-surface-variant hover:text-primary transition-colors rounded-full hover:bg-surface-dim focus-visible:ring-2 focus-visible:ring-primary outline-none"
            aria-label="Toggle Theme"
          >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          <a
            href={`${import.meta.env.BASE_URL}cv.pdf`}
            download="Tiago_Carriço_CV.pdf"
            target="_blank"
            className="hidden md:block px-4 py-2 min-w-[7.5rem] text-center border border-outline-variant/50 text-primary font-display text-sm font-medium rounded hover:bg-surface-dim transition-colors focus-visible:ring-2 focus-visible:ring-primary outline-none"
          >
            {ui.nav.resume}
          </a>

          <button
            className="md:hidden text-on-surface-variant hover:text-primary p-2 focus-visible:ring-2 focus-visible:ring-primary outline-none rounded"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle mobile menu"
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-20 left-0 w-full bg-background border-b border-outline-variant/30 px-6 py-4 flex flex-col space-y-4 shadow-lg animate-in slide-in-from-top-2">
          <a href="#about" onClick={() => setIsMobileMenuOpen(false)} className="text-on-surface hover:text-primary transition-colors font-display text-lg font-medium py-2">
            {ui.nav.about}
          </a>
          <a href="#skills" onClick={() => setIsMobileMenuOpen(false)} className="text-on-surface hover:text-primary transition-colors font-display text-lg font-medium py-2">
            {ui.nav.skills}
          </a>
          <a href="#experience" onClick={() => setIsMobileMenuOpen(false)} className="text-on-surface hover:text-primary transition-colors font-display text-lg font-medium py-2">
            {ui.nav.experience}
          </a>
          <a href="#projects" onClick={() => setIsMobileMenuOpen(false)} className="text-on-surface hover:text-primary transition-colors font-display text-lg font-medium py-2">
            {ui.nav.projects}
          </a>
          {content.blog?.enabled && (
            <a href="#blog" onClick={() => setIsMobileMenuOpen(false)} className="text-on-surface hover:text-primary transition-colors font-display text-lg font-medium py-2">
              {ui.nav.blog}
            </a>
          )}
          <a
            href={`${import.meta.env.BASE_URL}cv.pdf`}
            download="Tiago_Carriço_CV.pdf"
            target="_blank"
            className="w-full text-center py-3 mt-2 border border-primary text-primary font-display font-medium rounded hover:bg-primary/10 transition-colors"
          >
            {ui.nav.resumeDownload}
          </a>
        </div>
      )}
    </nav>
  );
}
