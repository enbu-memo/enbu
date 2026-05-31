import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import sitemap from 'vite-plugin-sitemap';

export default defineConfig({
  plugins: [
    react(),
    sitemap({
      hostname: 'https://enbu-kouryaku.com',
      dynamicRoutes: [
        '/',
        '/skillroot',
        '/sgfree',
        '/serialcode',
        '/reviewtensho',
        '/reviewshinsho',
        '/reviewhaou',
        '/reviewraid',
        '/reviewkassen',
        '/dataskill',
        '/dataougi',
        '/dataother',
        '/raidstatistics',
        '/tipsraid',
      ],
    }),
  ],
  build: {
    outDir: 'dist',
  },
  define: {
    __GIT_UPDATED_AT__: JSON.stringify(process.env.GIT_UPDATED_AT ?? null),
  } as Record<string, string>,
});