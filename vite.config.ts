import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';

export default defineConfig(() => {
  return {
    // Absolute base — the app uses clean pathname routes (/about,
    // /case-study/<slug>), so a relative './' base would resolve assets
    // against the CURRENT path on a hard refresh (e.g. /case-study/x →
    // /case-study/assets/… 404). '/' assumes the domain root, which is
    // where this deploys on Hostinger (rewrites in public/.htaccess).
    base: '/',
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
      proxy: {
        // Node/Express API (server/index.js) — contact form + admin inbox.
        '/api': {
          target: 'http://localhost:5001',
          changeOrigin: true,
        },
      },
    },
  };
});
