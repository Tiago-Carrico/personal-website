import React from 'react';
import { ScrollReveal } from './ScrollReveal';
import { useLanguage } from '../hooks/useLanguage';
import { Github, ExternalLink } from 'lucide-react';

//Can't give relative URL, must fetch it from folder due to Vite standards
const getImageUrl = (filename) => {
  if (!filename) return null;
  return new URL(`../data/thumbnails/${filename}`, import.meta.url).href;
};

export function Projects() {
  const { content, lang } = useLanguage();
  const projectsData = content.projects;

  if (!projectsData?.enabled) return null;

  return (
    <section id="projects" className="py-20 relative">
      <div className="max-w-5xl mx-auto px-6">
        <ScrollReveal>
          <h2 className="text-3xl font-display font-bold mb-12">
            {lang === 'en' ? 'Projects' : 'Projetos'}
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {projectsData.items.map((project, idx) => (
            <ScrollReveal key={idx} delay={idx * 0.1}>
              <div className="glass-panel overflow-hidden rounded-2xl flex flex-col h-full group hover:-translate-y-2 transition-transform duration-300">
                {project.image && (
                  <div className="h-48 overflow-hidden bg-surface-dim">
                    <img
                      src={getImageUrl(project.image)}  // <-- changed
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100"
                    />
                  </div>
                )}
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-2xl font-bold font-display mb-2">{project.title}</h3>
                  <p className="text-on-surface-variant mb-6 flex-grow">{project.description}</p>

                  {project.tags && (
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tags.map((tag, tIdx) => (
                        <span key={tIdx} className="px-2 py-1 text-xs font-mono font-medium rounded-md bg-secondary/10 text-secondary border border-secondary/20">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary-variant transition-colors"
                    >
                      <Github size={16} />
                      {lang === 'en' ? 'View Repository' : 'Ver Repositório'} <ExternalLink size={14} />
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
