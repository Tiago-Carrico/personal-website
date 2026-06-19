import { useLanguage } from './hooks/useLanguage';
import { useDocumentMeta } from './hooks/useDocumentMeta';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Experience } from './components/Experience';
import { Education } from './components/Education';
import { Certifications } from './components/Certifications';
import { Projects } from './components/Projects';
import { Blog } from './components/Blog';
import { Footer } from './components/Footer';
import { Analytics } from './components/Analytics';
import { MouseSpotlight } from './components/MouseSpotlight';

function App() {
  const { content } = useLanguage();

  // Reactively update <head> meta tags from site.json on language change
  useDocumentMeta(content.site);

  const SHOW_GRID = content.site.flags?.showGrid ?? true;

  return (
    <div className="min-h-screen bg-background text-on-surface font-sans transition-colors duration-300 relative selection:bg-primary/30">
      <Analytics />

      {/* Background Grid */}
      {SHOW_GRID && <div className="bg-grid absolute inset-0 z-0 pointer-events-none" />}

      {/* Mouse spotlight — follows cursor with layered radial gradient */}
      {/*<MouseSpotlight />*/}

      <div className="relative z-10 flex flex-col min-h-screen">
        <Header />

        <main className="flex-grow">
          <Hero />
          <About />
          <Blog />
          <Skills />
          <Experience />
          <Education />
          <Certifications />
          <Projects />
        </main>

        <Footer />
      </div>
    </div>
  );
}

export default App;
