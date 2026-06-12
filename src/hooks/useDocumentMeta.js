import { useEffect } from 'react';

/**
 * Reactively updates <head> meta tags (description, Open Graph, Twitter Card,
 * title, and html[lang]) whenever the active language's site data changes.
 *
 * The static fallback tags in index.html remain as defaults for social crawlers
 * that don't execute JavaScript. This hook keeps the browser document in sync
 * for regular visitors and handles language switching at runtime.
 *
 * @param {Object} siteData - The site config object from the active language's site.json
 */
export function useDocumentMeta(siteData) {
  useEffect(() => {
    if (!siteData) return;

    // Helper: find or create a <meta> tag by attribute selector
    const setMeta = (selector, attr, value, content) => {
      let el = document.querySelector(selector);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, value);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    // --- Page title ---
    if (siteData.title) {
      document.title = siteData.title;
    }

    // --- html[lang] attribute ---
    if (siteData.lang) {
      document.documentElement.lang = siteData.lang;
    }

    // --- Standard description ---
    if (siteData.description) {
      setMeta('meta[name="description"]', 'name', 'description', siteData.description);
    }

    // --- Open Graph ---
    const og = siteData.og;
    if (og) {
      if (og.type)        setMeta('meta[property="og:type"]',        'property', 'og:type',        og.type);
      if (og.siteName)    setMeta('meta[property="og:site_name"]',   'property', 'og:site_name',   og.siteName);
      if (og.title)       setMeta('meta[property="og:title"]',       'property', 'og:title',       og.title);
      if (og.description) setMeta('meta[property="og:description"]', 'property', 'og:description', og.description);
      if (og.image)       setMeta('meta[property="og:image"]',       'property', 'og:image',       og.image);
    }

    // --- Twitter Card ---
    const tw = siteData.twitter;
    if (tw) {
      if (tw.card)        setMeta('meta[name="twitter:card"]',        'name', 'twitter:card',        tw.card);
      if (tw.title)       setMeta('meta[name="twitter:title"]',       'name', 'twitter:title',       tw.title);
      if (tw.description) setMeta('meta[name="twitter:description"]', 'name', 'twitter:description', tw.description);
      if (tw.image)       setMeta('meta[name="twitter:image"]',       'name', 'twitter:image',       tw.image);
    }
  }, [siteData]);
}
