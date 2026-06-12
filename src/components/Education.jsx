import React from 'react';
import { ScrollReveal } from './ScrollReveal';
import { useLanguage } from '../hooks/useLanguage';
import { formatDate } from '../utils/dateFormatter';
import { GraduationCap } from 'lucide-react';

export function Education() {
  const { content, lang } = useLanguage();
  const educationData = content.education;

  if (!educationData?.enabled) return null;

  return (
    <section id="education" className="py-20 relative">
      <div className="max-w-4xl mx-auto px-6">
        <ScrollReveal>
          <h2 className="text-3xl font-display font-bold mb-12">
            {lang === 'en' ? 'Education' : 'Formação Académica'}
          </h2>
        </ScrollReveal>

        <div className="relative border-l-2 border-outline/30 ml-3 md:ml-0 space-y-12">
          {educationData.items.map((edu, idx) => (
            <ScrollReveal key={idx} delay={idx * 0.1}>
              <div className="relative md:pl-10 pl-6">
                <div className="absolute w-6 h-6 bg-surface border-4 border-secondary rounded-full -left-3 md:-left-[13px] top-1"></div>
                
                <div className="glass-panel p-6 rounded-2xl">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold font-display">{edu.degree}</h3>
                      <div className="flex items-center gap-2 text-secondary font-medium mt-1">
                        <GraduationCap size={16} />
                        <span>{edu.institution}</span>
                      </div>
                    </div>
                    <div className="mt-2 md:mt-0 px-3 py-1 bg-surface-dim rounded-full text-xs font-mono font-medium text-on-surface-variant inline-block">
                      {formatDate(edu.startDate)} — {formatDate(edu.endDate)}
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
