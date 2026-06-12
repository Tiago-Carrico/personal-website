import React from 'react';
import { ScrollReveal } from './ScrollReveal';
import { useLanguage } from '../hooks/useLanguage';
import { formatDate } from '../utils/dateFormatter';
import { Briefcase } from 'lucide-react';

export function Experience() {
  const { content, lang } = useLanguage();
  const experienceData = content.experience;

  if (!experienceData?.enabled) return null;

  return (
    <section id="experience" className="py-20 relative bg-surface-dim/30">
      <div className="max-w-4xl mx-auto px-6">
        <ScrollReveal>
          <h2 className="text-3xl font-display font-bold mb-12">
            {lang === 'en' ? 'Work Experience' : 'Experiência Profissional'}
          </h2>
        </ScrollReveal>

        <div className="relative border-l-2 border-outline/30 ml-3 md:ml-0 md:pl-0 space-y-12">
          {experienceData.items.map((job, idx) => (
            <ScrollReveal key={idx} delay={idx * 0.1}>
              <div className="relative md:pl-10 pl-6">
                {/* Timeline dot */}
                <div className="absolute w-6 h-6 bg-surface border-4 border-primary rounded-full -left-3 md:-left-[13px] top-1"></div>

                <div className="glass-panel p-6 rounded-2xl">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold font-display">{job.role}</h3>
                      <div className="flex items-center gap-2 text-primary font-medium mt-1">
                        <Briefcase size={16} />
                        <span>{job.company}</span>
                      </div>
                    </div>
                    <div className="mt-2 md:mt-0 px-3 py-1 bg-surface-dim rounded-full text-xs font-mono font-medium text-on-surface-variant inline-block">
                      {formatDate(job.startDate)} — {job.endDate === "Present" || job.endDate === null ? "Present" : formatDate(job.endDate)}
                    </div>
                  </div>

                  {job.description && (
                    Array.isArray(job.description) ? (
                      <ul className="list-disc list-inside text-on-surface-variant leading-relaxed space-y-2">
                        {job.description.map((item, index) => (
                          <li key={index}>{item}</li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-on-surface-variant leading-relaxed">
                        {job.description}
                      </p>
                    )
                  )}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
