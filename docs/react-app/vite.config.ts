import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import sitemap from 'vite-plugin-sitemap';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  const gitHistory = env.GIT_HISTORY ? env.GIT_HISTORY : '[]';
  const gitUpdatedAt = env.GIT_UPDATED_AT ? env.GIT_UPDATED_AT : '{}';

  return {
    plugins: [
      react(),
      sitemap({
        hostname: 'https://enbu-kouryaku.com', // ← ここだけ変える
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
      __GIT_HISTORY__:    JSON.stringify(gitHistory),
      __GIT_UPDATED_AT__: JSON.stringify(gitUpdatedAt),
    } as Record<string, string>,
  };
});