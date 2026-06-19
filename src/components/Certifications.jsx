import { ScrollReveal } from './ScrollReveal';
import { useLanguage } from '../hooks/useLanguage';
import { formatDate } from '../utils/dateFormatter';
import { Award, ExternalLink } from 'lucide-react';

export function Certifications() {
  const { content } = useLanguage();
  const certificationsData = content.certifications;
  const ui = content.site.ui;
  const dateLocale = content.site.dateLocale;

  if (!certificationsData?.enabled) return null;

  return (
    <section id="certifications" className="py-20 relative bg-surface-dim/30">
      <div className="max-w-5xl mx-auto px-6">
        <ScrollReveal>
          <h2 className="text-3xl font-display font-bold mb-12">
            {ui.sections.certifications}
          </h2>
        </ScrollReveal>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {certificationsData.items.map((cert, idx) => (
            <ScrollReveal key={idx} delay={idx * 0.1}>
              <div className="glass-panel p-6 rounded-2xl flex flex-col h-full group hover:-translate-y-1 transition-transform duration-300">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                      <Award size={20} />
                    </div>
                    <div>
                      <h3 className="font-bold font-display leading-tight">{cert.name}</h3>
                      <span className="text-sm text-on-surface-variant">{cert.issuer}</span>
                    </div>
                  </div>
                </div>
                
                <div className="mt-auto pt-4 flex items-center justify-between border-t border-outline/20">
                  <span className="text-xs font-mono text-on-surface-variant">
                    {ui.actions.issued}: {formatDate(cert.date, dateLocale)}
                  </span>
                  
                  {cert.url && (
                    <a 
                      href={cert.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-xs font-medium text-primary flex items-center gap-1 hover:underline"
                    >
                      {ui.actions.verify} <ExternalLink size={12} />
                    </a>
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
