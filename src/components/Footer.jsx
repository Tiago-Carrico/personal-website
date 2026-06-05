import React from 'react';
import { useLanguage } from '../hooks/useLanguage';
import { Github, Linkedin, Mail, Twitter, Globe } from 'lucide-react';

const iconMap = {
  github: Github,
  linkedin: Linkedin,
  twitter: Twitter,
  globe: Globe
};

export function Footer() {
  const { content, lang } = useLanguage();
  const personalData = content.personal;
  return (
    <footer id="footer" className="py-12 border-t border-outline/20 bg-surface text-center">
      <div className="max-w-5xl mx-auto px-6">
        <h2 className="text-2xl font-display font-bold mb-6">{personalData.name}</h2>

        <div className="flex justify-center gap-6 mb-8">
          {personalData.socials.map((social, idx) => {
            const IconComponent = iconMap[social.icon?.toLowerCase()] || Globe;
            return (
              <a
                key={idx}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-surface-dim flex items-center justify-center text-on-surface-variant hover:bg-primary hover:text-white transition-colors"
                aria-label={social.label}
              >
                <IconComponent size={18} />
              </a>
            );
          })}
          {personalData.email && (
            <a
              href={`mailto:${personalData.email}`}
              className="w-10 h-10 rounded-full bg-surface-dim flex items-center justify-center text-on-surface-variant hover:bg-primary hover:text-white transition-colors"
              aria-label="Email"
            >
              <Mail size={18} />
            </a>
          )}
        </div>

        <p className="text-sm font-mono text-on-surface-variant opacity-70">
          &copy; {new Date().getFullYear()} {personalData.name}. {lang === 'en' ? 'All rights reserved.' : 'Todos os direitos reservados.'}
        </p>
      </div>
    </footer>
  );
}
