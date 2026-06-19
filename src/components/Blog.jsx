import { ScrollReveal } from './ScrollReveal';
import { useLanguage } from '../hooks/useLanguage';
import { formatDate } from '../utils/dateFormatter';
import { ExternalLink } from 'lucide-react';

export function Blog() {
  const { content } = useLanguage();
  const blogData = content.blog;
  const ui = content.site.ui;
  const dateLocale = content.site.dateLocale;

  // Render nothing if the blog section is disabled in the config
  if (!blogData || !blogData.enabled) return null;

  return (
    <section id="blog" className="py-20 relative bg-surface-dim/30 border-t border-outline/10">
      <div className="max-w-5xl mx-auto px-6">
        <ScrollReveal>
          <div className="flex flex-col mb-12">
            <h2 className="text-3xl font-display font-bold mb-3">
              {blogData.title || (lang === 'en' ? 'Writing' : 'Publicações')}
            </h2>
            {blogData.subtitle && (
              <p className="text-on-surface-variant max-w-2xl text-lg">
                {blogData.subtitle}
              </p>
            )}
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {blogData.posts.map((post, idx) => (
            <ScrollReveal key={idx} delay={idx * 0.1}>
              <a 
                href={post.url}
                target="_blank"
                rel="noopener noreferrer"
                className="glass-panel p-6 rounded-2xl flex flex-col h-full group hover:-translate-y-2 hover:border-primary/40 transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="px-2.5 py-1 text-xs font-mono font-medium rounded-full bg-primary/10 text-primary border border-primary/20">
                    {post.platform}
                  </span>
                  <div className="flex items-center gap-3 text-xs text-on-surface-variant font-mono">
                    <span>{formatDate(post.date, dateLocale)}</span>
                    <span>&bull;</span>
                    <span>{post.readTime}</span>
                  </div>
                </div>

                <h3 className="text-xl font-bold font-display mb-3 group-hover:text-primary transition-colors flex items-start gap-2">
                  {post.title}
                </h3>
                
                <p className="text-on-surface-variant mb-6 flex-grow leading-relaxed">
                  {post.excerpt}
                </p>

                {post.tags && (
                  <div className="flex flex-wrap gap-2 mb-6">
                    {post.tags.map((tag, tIdx) => (
                      <span key={tIdx} className="px-2 py-0.5 text-xs font-mono font-medium rounded bg-secondary/5 text-secondary border border-secondary/15">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                <div className="mt-auto pt-4 flex items-center justify-between border-t border-outline/10 text-sm font-semibold text-primary">
                  <span className="group-hover:underline">
                    {ui.actions.readArticle}
                  </span>
                  <span className="transform group-hover:translate-x-1 transition-transform duration-300 flex items-center gap-1">
                    <ExternalLink size={14} />
                  </span>
                </div>
              </a>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
