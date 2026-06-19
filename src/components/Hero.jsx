import { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';
import { useTypingEffect } from '../hooks/useTypingEffect';
import { ScrollReveal } from './ScrollReveal';
import { motion, AnimatePresence } from 'framer-motion';

export function Hero() {
  const { content } = useLanguage();
  const { name, title, bio, heroSnippets } = content.personal;
  const ui = content.site.ui;
  const [snippetIndex, setSnippetIndex] = useState(0);
  const [showName, setShowName] = useState(false);
  const [showRest, setShowRest] = useState(false);

  const firstName = name.split(' ')[0];
  const lastName = name.split(' ').slice(1).join(' ');

  // The terminal prompt command to type
  const command = '> whoami';

  // Type the command, then trigger showing the name
  const { displayText, isDone: commandDone } = useTypingEffect(command, 65, 600, () => {
    setTimeout(() => setShowName(true), 300);
    setTimeout(() => setShowRest(true), 900);
  });

  // Rotate snippets every 5 seconds
  useEffect(() => {
    if (!heroSnippets || heroSnippets.length <= 1) return;
    const interval = setInterval(() => {
      setSnippetIndex((prev) => (prev + 1) % heroSnippets.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [heroSnippets]);

  const activeSnippet = heroSnippets ? heroSnippets[snippetIndex] : null;

  return (
    <section id="hero" className="min-h-[calc(100vh-80px)] flex items-center py-10">
      <div className="max-w-5xl mx-auto px-6 w-full flex flex-col lg:flex-row items-center gap-12">

        {/* Left Text Content */}
        <div className="flex-1 space-y-8 z-10 w-full">
          <ScrollReveal>
            <div className="inline-block px-4 py-1.5 glass-panel text-secondary font-display text-sm rounded-md mb-2 tracking-wide font-medium">
              {title}
            </div>
          </ScrollReveal>

          {/* Terminal Prompt + Name Reveal */}
          <div className="space-y-2">
            {/* Step 1: Typing the command */}
            <div className="font-display text-base text-on-surface-variant/60 flex items-center gap-1 min-h-[1.5rem]">
              <span>{displayText}</span>
              {!commandDone && (
                <span className="inline-block w-[2px] h-[1.1em] bg-primary animate-pulse ml-0.5 align-middle" />
              )}
            </div>

            {/* Step 2: Name reveal */}
            <AnimatePresence>
              {showName && (
                <motion.h1
                  className="font-display text-5xl md:text-7xl font-bold text-on-surface leading-tight tracking-tight"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                >
                  {firstName} <br className="hidden md:block" />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                    {lastName}
                  </span>
                </motion.h1>
              )}
            </AnimatePresence>
          </div>

          {/* Step 3: Bio and buttons fade in after name */}
          <AnimatePresence>
            {showRest && (
              <>
                <motion.p
                  className="font-body text-lg md:text-xl text-on-surface-variant max-w-2xl leading-relaxed"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
                >
                  {bio}
                </motion.p>

                <motion.div
                  className="flex flex-wrap gap-4 pt-4"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2, ease: 'easeOut' }}
                >
                  <a
                    href="#projects"
                    className="px-8 py-4 bg-primary text-surface font-display text-sm font-medium rounded-lg hover:opacity-90 hover:shadow-lg hover:-translate-y-1 hover:shadow-primary/20 transition-all flex items-center gap-2 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background outline-none"
                  >
                  {ui.actions.viewProjects} <ArrowRight size={18} />
                  </a>
                  <a
                    href="#footer"
                    className="px-8 py-4 border border-outline-variant text-primary font-display text-sm font-medium rounded-lg hover:bg-surface-dim hover:-translate-y-1 transition-all focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background outline-none"
                  >
                     {ui.actions.contactMe}
                  </a>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>

        {/* Right Graphic Content */}
        <div className="flex-1 w-full lg:flex justify-end relative h-[400px] md:h-[500px] items-center hidden">
          <ScrollReveal delay={0.4} className="w-full h-full relative">
            {/* Abstract glow */}
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-secondary/20 rounded-full blur-3xl mix-blend-screen w-3/4 h-3/4 m-auto opacity-70"></div>

            {/* Glass Code Panel */}
            <div className="glass-panel w-full max-w-md ml-auto h-full max-h-[400px] rounded-2xl flex flex-col relative overflow-hidden group shadow-2xl">
              {/* Mac-style title bar */}
              <div className="bg-surface-dim/50 border-b border-outline-variant/30 p-4 flex gap-2 items-center">
                <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                <span className="ml-auto font-display text-xs text-on-surface-variant/70 uppercase">
                  {activeSnippet?.language || 'Code'}
                </span>
              </div>

              <div className="p-6 flex-grow font-display text-sm text-on-surface-variant/90 overflow-hidden relative">
                {activeSnippet ? (
                  <pre className="h-full overflow-hidden transition-opacity duration-500">
                    <code dangerouslySetInnerHTML={{ __html: syntaxHighlight(activeSnippet.code) }} />
                  </pre>
                ) : (
                  <div className="animate-pulse flex space-x-4">
                    <div className="flex-1 space-y-4 py-1">
                      <div className="h-2 bg-outline-variant/20 rounded w-3/4"></div>
                      <div className="space-y-3">
                        <div className="h-2 bg-outline-variant/20 rounded"></div>
                        <div className="h-2 bg-outline-variant/20 rounded w-5/6"></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

// Simple hacky syntax highlighter to make snippets look good
function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function syntaxHighlight(code) {
  const unescaped = code.replace(/\\"/g, '"').replace(/\\n/g, '\n').replace(/\\t/g, '\t');
  const safe = escapeHtml(unescaped);
  const keywords = new Set(['const', 'let', 'var', 'function', 'return', 'if', 'else', 'func', 'import', 'export', 'from', 'type', 'interface', 'err', 'nil', 'ctx', 'req', 'res', 'defer']);
  const literals = new Set(['true', 'false', 'null', 'undefined']);
  return safe.replace(
    /(["'`][^"'`\n]*["'`])|((\/\/[^\n]*))|(\/\*[\s\S]*?\*\/)|(\b\d+\b)|(\b\w+\b)(?=\s*\()|(\b\w+\b)/g,
    (match, str, _lineCommentFull, lineComment, blockComment, number, funcName, word) => {
      if (str) return `<span class="text-secondary">${match}</span>`;
      if (lineComment) return `<span class="text-outline">${match}</span>`;
      if (blockComment) return `<span class="text-outline">${match}</span>`;
      if (number) return `<span class="text-secondary">${match}</span>`;
      if (funcName) return `<span class="text-primary">${match}</span>`;
      if (keywords.has(word)) return `<span class="text-primary">${match}</span>`;
      if (literals.has(word)) return `<span class="text-secondary">${match}</span>`;
      return match;
    }
  );
}
