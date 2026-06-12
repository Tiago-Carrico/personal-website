# Personal Portfolio / Online CV

A fast, responsive, and beautiful single-page portfolio designed for software engineers. It uses a clean aesthetic with a choice between two themes: **Fresh Tech** (light) and **Obsidian Synth** (dark).

Built with **React**, **Vite**, **Tailwind CSS**, and **Framer Motion**.

## Features

- **Data-Driven Content**: All text, projects, and experiences are loaded from JSON files. No need to touch the React source code to update your content.
- **Dark/Light Mode**: Smooth, accessible theme toggling that remembers the user's preference.
- **Animations**: Silky smooth scroll-reveal and layout animations using Framer Motion.
- **Glassmorphism UI**: Beautiful, modern UI cards with subtle glows and blurs.
- **Resume Download**: Easily link your PDF resume.

## Project Structure

- `src/data/`: This is where your content lives.
- `src/components/`: The React UI components.
- `src/hooks/`: Custom hooks like `useTheme`.
- `public/`: Static assets like your `og.png` and `cv.pdf`.

## How to Update Your Content

You never have to touch a `.jsx` file to update your portfolio content, simply edit the JSON files in `src/data/`, split by both available languages (English and Portuguese). These files overall also contain the data related to the section titles and subtitles:

1. **`about.json`**: contains the bio of the "About me" section.
2. **`blog.json`**: contains a list of external articles, with support for a direct link to them, and additional content details (e.g.: excerpt, tags, time to read)
3. **`certifications.json`**: contains a list of certifications, with support for taken dates and IDs
4. **`education.json`**: contains a list of the different higher education courses you have taken
5. **`experience.json`**: contains a list of your job experience, with support for a specific role, and itemized bullet points for a job description
6. **`personal.json`**: contains the content for the Hero banner, such as your name, title, brief description, etc., as well as the content for the code snippets that cycle. Also contains the information about your shown socials.
7. **`projects.json`**: contains a list of your shown projects, with support for a link to show them, and a thumbnail to represent them, as well as support for descriptive components, such as a brief description and tags
8. **`site.json`**: mostly metadata related information, but the English version also contains information about how to represent the website on external platforms (e.g.: facebook, X (formerly Twitter), etc.) (change the thumbnail by replacing `og.png` in the `public` folder)
9. **`skills.json`**: contains a list of skills you choose to display, split into different categories

### Updating your Photo and Resume
- **Photo**: Replace/add `public/photo.webp` with your own image, or set `"showPhoto": false` in `personal.json` to hide it.
- **Resume**: Replace/add `public/cv.pdf` with your actual PDF resume.

## Theming

This project uses CSS variables defined in `src/index.css` and mapped in `tailwind.config.js`. 
To change the colors, simply edit the RGB values in `src/index.css` under the `:root` (Light mode) and `.dark` (Dark mode) selectors.

## Local Development

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the development server:
   ```bash
   npm run dev
   ```
3. Open `http://localhost:5173` in your browser.

## Deployment (GitHub Pages)

This project is configured to be deployed easily to GitHub Pages.
The GitHub Actions workflow is already set up in `.github/workflows/deploy.yml`.

To deploy:
1. Push your code to the `main` branch of your GitHub repository.
2. Go to your repository **Settings** > **Pages**.
3. Under **Build and deployment**, set the **Source** to **GitHub Actions**.
4. The GitHub Action will automatically build and publish your site!

### Custom Domains
If you want to use a custom domain:
1. Add your custom domain to the repository's Pages settings.
2. Add a `CNAME` file to the `public/` directory with your domain name (e.g., `www.yourdomain.com`).
3. Set up your DNS records with your domain provider.
