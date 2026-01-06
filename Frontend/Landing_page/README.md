README – Digital Civic Landing Page (Vite + React)
Overview
This is a React-based landing page built with Vite.
It uses:
React 19
Vite (bundler/dev server)
@vitejs/plugin-react
@splinetool/react-spline (for 3D/interactive content, if used in components)
Prerequisites
Node.js: v18 or newer is recommended
Package manager: npm (comes with Node)
> Note: On Windows, avoid running the project directly from a synced OneDrive path if you see Vite .vite-temp / timestamp errors. Prefer a local folder like C:\Projects\Landing_page.
Getting Started
1. Install dependencies
From the project root (folder that contains package.json):
npm install
2. Run the dev server
npm run dev
Then open the URL shown in the terminal (usually http://localhost:5173/).
3. Build for production
npm run build
This outputs static files into the dist folder.
4. Preview the production build
npm run preview
Project Structure
index.html – Main HTML entry file.
src/main.jsx – React/Vite entry point that mounts the app.
src/App.jsx – Root React component for the landing page.
src/App.css / src/index.css – Global and component-level styles.
public/ – Static assets served as-is (e.g. vite.svg).
vite.config.js – Vite configuration with React plugin.
eslint.config.js – ESLint configuration for code quality.
Available Scripts
In package.json:
npm run dev: Start Vite dev server (development mode).
npm run build: Build the app for production into dist.
npm run preview: Serve the production build locally.
npm run lint: Run ESLint on the project.
Common Issues
Vite ENOENT / .vite-temp errors on OneDrive
If you see errors like:
“failed to load config… .vite-temp\vite.config.js.timestamp… ENOENT”
Move/copy the project to a non-OneDrive directory (e.g. C:\Projects\Landing_page) and run npm install then npm run dev again.
Customization
Edit src/App.jsx and src/App.css to change the layout, text, colors, and components of the landing page.
Add new components under src/ and import them into App.jsx.
If using Spline, update your scene URL / props in the Spline-related component.
