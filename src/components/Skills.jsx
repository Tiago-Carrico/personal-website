import React from 'react';
import { ScrollReveal } from './ScrollReveal';
import { useLanguage } from '../hooks/useLanguage';

export function Skills() {
  const { content, lang } = useLanguage();
  const skillsData = content.skills;

  if (!skillsData?.enabled) return null;

  return (
    <section id="skills" className="py-20 relative">
      <div className="max-w-5xl mx-auto px-6">
        <ScrollReveal>
          <h2 className="text-3xl font-display font-bold mb-12">
            {lang === 'en' ? 'Skills & Tech Stack' : 'Competências & Tecnologias'}
          </h2>
        </ScrollReveal>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillsData.items.map((category, idx) => (
            <ScrollReveal key={idx} delay={idx * 0.1}>
              <div className="glass-panel p-6 rounded-2xl h-full flex flex-col group hover:-translate-y-1 transition-all duration-300">
                <div className="flex items-center gap-3 mb-6">
                  <h3 className="text-xl font-display font-semibold text-primary">{category.category}</h3>
                </div>
                
                <ul className="space-y-3 flex-grow">
                  {category.skills.map((skill, sIdx) => (
                    <li key={sIdx} className="flex items-center text-on-surface-variant font-mono text-sm">
                      <span className="w-2 h-2 bg-secondary rounded-full mr-3 opacity-80"></span>
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
