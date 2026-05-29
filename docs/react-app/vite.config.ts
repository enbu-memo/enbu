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
        '/SkillRoot',
        '/SgFree',
        '/SerialCode',
        '/ReviewTensho',
        '/ReviewShinsho',
        '/ReviewHaou',
        '/ReviewRaid',
        '/ReviewKassen',
        '/DataSkill',
        '/DataOugi',
        '/DataOther',
        '/RaidStatistics',
        '/DeckRaid',
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