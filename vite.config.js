import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      // Usamos nuestro propio public/manifest.json (US3): debe existir un único manifest.
      manifest: false,
      // El Service Worker nuevo se activa solo, sin pedir confirmación.
      registerType: 'autoUpdate',
      // Inyecta automáticamente el script que registra el Service Worker.
      injectRegister: 'auto',
      workbox: {
        // App shell que se pre-cachea al instalar: HTML, CSS, JS, íconos e imágenes.
        globPatterns: ['**/*.{html,js,css,png,svg,ico,json,webmanifest}'],
        // Cualquier ruta de la SPA (por ejemplo /expenses/2) responde con index.html
        // desde la caché, así las rutas profundas también funcionan sin conexión.
        navigateFallback: '/index.html',
        cleanupOutdatedCaches: true,
      },
    }),
  ],
});
