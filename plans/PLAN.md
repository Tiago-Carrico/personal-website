# Online CV / Personal Portfolio — Development Plan

## 1 · Overview

A single-page, statically-hosted personal website that acts as an online CV.
It will be built with **React + Vite**, styled with **vanilla CSS custom properties**, animated with **Framer Motion**, and deployed to **GitHub Pages** via a **GitHub Actions** CI/CD workflow.

All content (personal info, work experience, academic history, projects, skills, certifications) and all design tokens (colours, fonts, spacing) live in **JSON data files** — the source code never needs to be touched to update content or rebrand the site.

### Resolved Decisions

| Decision | Answer |
|---|---|
| **Site type** | User site (`<username>.github.io`) — Vite `base: '/'` |
| **Photo** | Displayed by default; hideable via `"showPhoto": false` in `personal.json` |
| **Date locale** | Portuguese (`pt-PT`) — e.g. "Jan 2023" → "jan. 2023" |
| **Content language** | English |
| **Extra sections** | ✅ Skills / Tech Stack · ✅ Certifications (with verification links) |
| **Domain** | Default GitHub Pages for now; custom domain notes in §10 |

---

## 2 · Tech Stack

| Layer | Choice | Rationale |
|---|---|---|
| **Build tool** | Vite 6 | Instant HMR, zero-config, outputs a static `dist/` folder |
| **Framework** | React 19 | Component architecture, hooks for state, massive ecosystem |
| **Language** | JavaScript (JSX) | Clean component syntax, widely understood |
| **Animations** | Framer Motion | Declarative scroll-reveal, layout animations, gesture support |
| **Styling** | Tailwind CSS | Rapid UI building, custom themes (Fresh Tech light, Obsidian Synth dark) via config |
| **Fonts** | Google Fonts — *Inter* (body) + *JetBrains Mono* (code accents) | Modern, clean, software-engineering feel |
| **Icons** | Lucide React | Tree-shakable SVG icons, native React components |
| **PDF download** | Static PDF file in `public/` | Version-tracked alongside the site |
| **Hosting** | GitHub Pages | Free, custom-domain ready |
| **CI/CD** | GitHub Actions (`.github/workflows/deploy.yml`) | Auto-deploys on push to `main` |

---

## 3 · Project Structure

```
online_cv/
├── .github/
│   └── workflows/
│       └── deploy.yml            # GitHub Actions deploy pipeline
├── public/
│   ├── cv.pdf                    # Downloadable PDF (version-tracked)
│   ├── photo.webp                # Personal photo (optional)
│   └── favicon.svg               # Site favicon
├── src/
│   ├── data/
│   │   ├── personal.json         # Name, title, bio, contact links, photo config, metrics
│   │   ├── experience.json       # Work experience entries
│   │   ├── education.json        # Academic entries
│   │   ├── projects.json         # Side-project entries
│   │   ├── skills.json           # Tech stack / skills grouped by category
│   │   ├── certifications.json   # Certifications with verification links
│   │   └── site.json             # Site-wide metadata (title, description, etc.)
│   ├── components/
│   │   ├── Header.jsx            # Sticky nav, theme toggle, PDF button
│   │   ├── Hero.jsx              # Name, title, photo, social links
│   │   ├── About.jsx             # Bio / personal summary section
│   │   ├── Skills.jsx            # Tech stack visual grid
│   │   ├── Experience.jsx        # Work experience timeline
│   │   ├── Education.jsx         # Academic timeline
│   │   ├── Certifications.jsx    # Certs with verification links
│   │   ├── Projects.jsx          # Side-projects card grid
│   │   ├── Footer.jsx            # Contact links, copyright
│   │   └── ScrollReveal.jsx      # Framer Motion wrapper for scroll animations
│   ├── hooks/
│   │   ├── useTheme.js           # Theme context + toggle hook (localStorage)
│   │   └── useTokens.js          # Reads tokens.json → injects CSS custom properties
│   ├── utils/
│   │   └── dateFormatter.js      # Formats dates in pt-PT locale
│   ├── App.jsx                   # Root component — assembles all sections
│   ├── main.jsx                  # React entry point (createRoot)
│   └── index.css                 # Master CSS import file
├── index.html                    # Single HTML shell
├── tailwind.config.js            # Tailwind configuration (themes)
├── vite.config.js                # Vite config (base: '/')
├── package.json
├── PLAN.md                       # ← This file
└── README.md
```

---

## 4 · Data Files — Schema (draft)

### 4.1 `personal.json`

```jsonc
{
  "name": "Your Name",
  "title": "Software Engineer",
  "email": "you@example.com",
  "location": "City, Country",
  "photo": "/photo.webp",          // path in public/
  "showPhoto": true,               // set to false to hide photo without removing it
  "bio": "A short paragraph about yourself.",
  "metrics": [
    { "value": "10+", "label": "Years Experience" },
    { "value": "5M+", "label": "Active Users Scaled" }
  ],
  "heroSnippets": [
    {
      "language": "Go",
      "code": "func (s *Server) Handle(ctx context.Context, req Request) (Response, error) {\n    span := trace.StartSpan(ctx)\n    defer span.End()\n\n    res, err := s.router.Route(req)\n    if err != nil {\n        return nil, s.errHandler(err)\n    }\n    return res, nil\n}"
    }
  ],
  "socials": [
    { "label": "GitHub",   "url": "https://github.com/you",    "icon": "github" },
    { "label": "LinkedIn", "url": "https://linkedin.com/in/you","icon": "linkedin" }
  ]
}
```

> **Developer toggle:** Set `"showPhoto": false` to hide the photo from the site. The photo file stays in the repo for easy re-enabling.
> **Bento Grid & Hero:** `metrics` will be used in the About section's Bento grid layout. `heroSnippets` dynamically rotates in the Hero section's glassmorphism code pane.

### 4.2 `experience.json`

```jsonc
[
  {
    "role": "Senior Engineer",
    "company": "Acme Corp",
    "companyUrl": "https://acme.com",
    "location": "Remote",
    "startDate": "2023-01",
    "endDate": null,               // null → "Presente"
    "highlights": [
      "Led migration of monolith to microservices",
      "Reduced P95 latency by 40 %"
    ],
    "tags": ["Go", "Kubernetes", "gRPC"]
  }
]
```

> **Date display:** `"2023-01"` renders as `"jan. 2023"` (pt-PT locale). `null` endDate renders as `"Present"` (in English, since the content language is English — but the month formatting uses pt-PT).

### 4.3 `education.json`

```jsonc
[
  {
    "degree": "MSc Computer Science",
    "institution": "University X",
    "institutionUrl": "https://uni-x.edu",
    "location": "City, Country",
    "startDate": "2018-09",
    "endDate": "2020-06",
    "highlights": [
      "Thesis: \"Distributed consensus in heterogeneous networks\"",
      "GPA: 3.9 / 4.0"
    ]
  }
]
```

### 4.4 `projects.json`

```jsonc
[
  {
    "name": "Cool Tool",
    "description": "A CLI that does something cool.",
    "url": "https://github.com/you/cool-tool",
    "image": "/projects/cool-tool.webp",   // optional screenshot
    "tags": ["Rust", "CLI", "Open Source"],
    "featured": true
  }
]
```

### 4.5 `skills.json` *(NEW)*

```jsonc
{
  "categories": [
    {
      "name": "Languages",
      "icon": "code-2",
      "items": [
        { "name": "Python",     "level": 5 },
        { "name": "JavaScript", "level": 4 },
        { "name": "Go",         "level": 3 }
      ]
    },
    {
      "name": "Frameworks & Libraries",
      "icon": "layers",
      "items": [
        { "name": "React",   "level": 4 },
        { "name": "Node.js", "level": 4 }
      ]
    },
    {
      "name": "DevOps & Cloud",
      "icon": "cloud",
      "items": [
        { "name": "Docker",     "level": 4 },
        { "name": "Kubernetes", "level": 3 },
        { "name": "AWS",        "level": 3 }
      ]
    },
    {
      "name": "Tools",
      "icon": "wrench",
      "items": [
        { "name": "Git",    "level": 5 },
        { "name": "Linux",  "level": 4 },
        { "name": "CI/CD",  "level": 4 }
      ]
    }
  ]
}
```

> **Skill levels** (1–5) will be rendered as a visual indicator (dot bar or progress chips). Categories are rendered as grouped cards with icons. The `level` field is optional — omit it to show skills without proficiency indicators.

### 4.6 `certifications.json` *(NEW)*

```jsonc
[
  {
    "name": "AWS Solutions Architect – Associate",
    "issuer": "Amazon Web Services",
    "issuerLogo": "aws",           // maps to an icon or image
    "date": "2024-03",
    "expiryDate": "2027-03",       // null if no expiry
    "credentialId": "ABC123XYZ",
    "verificationUrl": "https://www.credly.com/badges/...",
    "tags": ["Cloud", "Architecture"]
  },
  {
    "name": "Certified Kubernetes Administrator",
    "issuer": "CNCF",
    "issuerLogo": "kubernetes",
    "date": "2023-11",
    "expiryDate": null,
    "credentialId": "CKA-2023-9876",
    "verificationUrl": "https://training.linuxfoundation.org/...",
    "tags": ["DevOps", "Containers"]
  }
]
```

> Each certification has a `verificationUrl` that links directly to the issuer's verification/authenticity page — rendered as a "Verify" button/link on the card.

### 4.7 `site.json`

```jsonc
{
  "title": "Your Name — Software Engineer",
  "description": "Personal portfolio & CV",
  "lang": "en",
  "dateLocale": "pt-PT",
  "ogImage": "/og.webp"
}
```

### 4.8 `tailwind.config.js` (theme / design tokens)

Instead of a custom `tokens.json`, design tokens are mapped directly into Tailwind's theme configuration using the `class` dark mode strategy.

- **Light Mode (Fresh Tech):** Clean lights (`#f8f9ff`), Indigo primary (`#3525cd`), Emerald secondary (`#006a61`).
- **Dark Mode (Obsidian Synth):** Deep obsidian (`#06060e`), Purple primary (`#a855f7`), Pink secondary (`#ec4899`).

This setup uses CSS variables inside `tailwind.config.js` or directly defines them in `index.css` mapped to `@apply` or Tailwind theme extensions to switch seamlessly between themes.

---

## 5 · Page Sections (top to bottom)

| # | Section | Component | Data source |
|---|---|---|---|
| 1 | **Header / Hero** | `Header.js` | `personal.json` |
| 2 | **About** | `About.js` | `personal.json` |
| 3 | **Skills & Tech Stack** | `Skills.js` | `skills.json` |
| 4 | **Work Experience** | `Experience.js` | `experience.json` |
| 5 | **Education** | `Education.js` | `education.json` |
| 6 | **Certifications** | `Certifications.js` | `certifications.json` |
| 7 | **Projects** | `Projects.js` | `projects.json` |
| 8 | **Footer** | `Footer.js` | `personal.json` |

### Navigation
The header will contain a sticky/fixed nav bar with anchor links to each section. On mobile, it collapses into a hamburger menu.

---

## 6 · Key Features

| # | Feature | Details |
|---|---|---|
| 1 | **Dark / Light mode** | Toggle button in header; respects `prefers-color-scheme`; persists choice in `localStorage` |
| 2 | **PDF download** | Prominent "Download CV" button links to `public/cv.pdf` |
| 3 | **Modular content** | All text, entries, and links come from JSON files — zero source-code edits needed |
| 4 | **Tailwind Theming** | Colours and layouts built using Tailwind CSS. Themes toggle by adding a `dark` class to the HTML root |
| 5 | **Photo toggle** | `showPhoto` flag in `personal.json` hides/shows photo without code changes |
| 6 | **pt-PT date formatting** | Dates formatted in Portuguese locale (e.g., "jan. 2023", "set. 2020") |
| 7 | **Certification verification** | Each cert card has a "Verify" link to the issuer's authenticity page |
| 8 | **Skills visualisation** | Grouped cards with category icons and optional proficiency indicators |
| 9 | **Responsive layout** | Mobile-first; fluid grid; sections stack vertically on small screens |
| 10 | **Smooth animations** | Framer Motion scroll-reveal, layout animations, hover & focus transitions |
| 11 | **Accessibility** | Semantic HTML, ARIA labels, keyboard navigation, sufficient contrast ratios |
| 12 | **SEO** | Proper `<title>`, `<meta>`, Open Graph tags, single `<h1>`, semantic headings |

---

## 7 · Design Direction

- **Themes:**
  - *Light (Fresh Tech):* Bright surface (`#f8f9ff`), Indigo/Emerald accents. Clean, corporate-tech feel.
  - *Dark (Obsidian Synth):* Deep obsidian (`#06060e`), Purple/Pink accents. Hacker/Synthwave vibe.
- **Hero Section:** Features gradient text and an abstract glass panel containing a dynamically rotating code snippet (from `heroSnippets`).
- **About Section:** A Bento Grid layout combining the text bio with key visual `metrics`.
- **Backgrounds:** A subtle grid background (`.bg-grid`) applied globally for a tech feel.
- **Cards:** Glassmorphism-inspired panels (`.glass-panel`) with subtle frosted-glass effect (`backdrop-filter: blur(12px)`), soft shadows, and border highlights on hover.
- **Timeline:** Vertical timeline for Experience and Education, with accent-coloured dots and connector lines.
- **Skills grid:** Category cards laid out in a responsive grid; each skill shown with a custom `.tech-list` bullet.
- **Projects:** Responsive card grid with an abstract placeholder image overlay, tag badges, hover-lift, and links.
- **Typography:** Clean sans-serif (*Inter*) for body; monospace accents (*JetBrains Mono*) for tags, headings, and code-like elements.
- **Micro-animations:** Fade-in on scroll, scale-on-hover for cards, smooth colour transitions on theme toggle.

---

## 8 · Development Phases

### Phase 1 — Scaffolding & Tooling
- [x] Initialise Vite + React project (`npm create vite@latest ./ -- --template react`)
- [x] Install dependencies (`framer-motion`, `lucide-react`)
- [x] Set up project structure (`src/data/`, `src/theme/`, `src/styles/`, `src/components/`, `src/hooks/`, `src/utils/`)
- [x] Create all JSON data files with placeholder/example content
- [x] Configure `vite.config.js` (`base: '/'` for user site)
- [x] Create `.github/workflows/deploy.yml`
- [x] Add `.gitignore`, `README.md`

### Phase 2 — Theming Engine & Base Styles
- [x] Configure `tailwind.config.js` with the Fresh Tech (Light) and Obsidian Synth (Dark) color palettes.
- [x] Implement `useTheme.js` hook — React context for dark/light mode with `localStorage` persistence, toggling the `.dark` class on `<html>`.
- [x] Implement `dateFormatter.js` — formats `YYYY-MM` strings in `pt-PT` locale.
- [x] Add global utility classes (e.g. `.glass-panel`, `.bg-grid`) to `index.css`.

### Phase 3 — Layout & Components
- [x] Build `ScrollReveal.jsx` (Framer Motion wrapper)
- [x] Build `Header.jsx` (sticky nav, theme toggle, PDF download button, hamburger menu)
- [x] Build `Hero.jsx` (name, title, dynamic code snippet, social links)
- [x] Build `About.jsx` (bento grid combining bio and metrics)
- [x] Build `Skills.jsx` (categorised grid from `skills.json` with custom bullets)
- [x] Build `Experience.jsx` (vertical timeline from `experience.json`)
- [x] Build `Education.jsx` (vertical timeline from `education.json`)
- [x] Build `Certifications.jsx` (cards with verification links from `certifications.json`)
- [x] Build `Projects.jsx` (card grid from `projects.json`)
- [x] Build `Footer.jsx` (contact info, copyright)
- [x] Assemble `App.jsx`

### Phase 4 — Animations & Polish
- [x] Framer Motion scroll-reveal on all sections
- [x] Hover / focus micro-interactions (card lift, button glow)
- [x] Smooth theme-toggle colour transition (CSS `transition` on custom properties)
- [x] Responsive testing (mobile, tablet, desktop)
- [x] Accessibility audit (contrast, keyboard nav, screen reader)

### Phase 5 — Deployment & Documentation
- [x] Place placeholder PDF in `public/cv.pdf`
- [x] Test build locally (`npm run build && npx serve dist`)
- [x] Push to GitHub, verify Pages deployment
- [x] Finalise `README.md` with usage instructions (how to edit JSON, how to add entries, etc.)

---

## 9 · Suggested Future Improvements

1. ✅ **Animated hero / terminal intro** — A brief "typing" animation in a mock terminal in the hero area (e.g., `> whoami → Your Name`). Adds developer personality.

2. **Blog / Writing section** — A simple list of links to external posts (Medium, Dev.to, personal blog). Demonstrates thought leadership.

3. ✅ **Analytics** — Optional privacy-respecting analytics (e.g., Plausible or Umami, self-hosted) via a toggle in `site.json`.

4. **Print stylesheet** — A `@media print` stylesheet so the page itself prints cleanly as a backup CV.

5. **Change code snippets in personal.json to be more in-line with my experience** - Use languages I am more attuned to, such as Python, Javascript, Java, Terraform, etc. (mudar no personal.json)

6. **Add favicon to website** - Adding a tech related favicon should make the website look more professional, respecting the dark synth color scheme. Search for recommended favicon sources

7. **Add og.webp image** - we seem to have it defined in the site.json, but can't find any og.webp image

8. **Add pics to about me section** - Add pics of myself to the right of the about me text content. These pictures should rotate regularly, and be sourced from a folder in the project directory

9. **Change About me section to match horizontal size of other sections (taking into account the photo scroller to be added)** - Change the about me section to have the same width of the other general sections
---

## 10 · Custom Domain (free options)

GitHub Pages supports free custom domains. Here are your options:

| Option | Cost | How |
|---|---|---|
| **Default** | Free | `<username>.github.io` — already set up |
| **Freenom alternatives** | Free | Services like **eu.org** or **is-a.dev** offer free subdomains for developers. `is-a.dev` is popular — you get `yourname.is-a.dev` for free via a PR to their repo |
| **`.dev` / `.io`** | ~$10–15/yr | Purchased from Cloudflare Registrar, Google Domains successor (Squarespace), or Namecheap |

> **Recommendation:** Start with the default `<username>.github.io`. If you want a personal touch later, `is-a.dev` is free and takes minutes to set up. For a fully professional domain, `.dev` TLDs are affordable and force HTTPS.

To configure a custom domain later:
1. Add a `CNAME` file to `public/` containing your domain
2. Set up DNS records (A records for GitHub's IPs, or CNAME for subdomains)
3. Enable "Enforce HTTPS" in GitHub Pages settings

---

*This plan is a living document. Update it as decisions are made and phases are completed.*
