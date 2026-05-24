import { execSync } from 'child_process';
import { readdirSync, writeFileSync } from 'fs';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);

execSync('npx esbuild src/routes.ts --bundle=false --format=cjs --outfile=scripts/_routes.cjs', { stdio: 'inherit' });
const { routes, SITE_TITLE } = require('./_routes.cjs');

// --- 履歴データ生成 ---
const history = [];
for (const { path, title, file } of routes) {
  try {
    const log = execSync(`git log --follow --format="%cI||%s" -- "${file}"`).toString().trim();
    if (!log) continue;
    for (const line of log.split('\n')) {
      const idx = line.indexOf('||');
      if (idx === -1) continue;
      const date = line.slice(0, idx).trim();
      const content = line.slice(idx + 2).trim();
      history.push({ page: title, date, content, route: path });
    }
  } catch {}
}
history.sort((a, b) => new Date(b.date) - new Date(a.date));

// --- 最終更新日データ生成 ---
const updated = {};
const pageFiles = readdirSync('src/pages').map(f => `src/pages/${f}`);
pageFiles.push('src/App.tsx');
for (const p of pageFiles) {
  try {
    const out = execSync(`git log -1 --format="%cI" -- "${p}"`).toString().trim();
    if (out) updated[p] = out;
  } catch {}
}

// --- .env.local に書き出す（空でもnullとして書く）---
const historyJson = JSON.stringify(history.length > 0 ? history : []);
const updatedJson = JSON.stringify(Object.keys(updated).length > 0 ? updated : {});

writeFileSync(
  '.env.local',
  `GIT_HISTORY=${JSON.stringify(historyJson)}\nGIT_UPDATED_AT=${JSON.stringify(updatedJson)}\n`
);

// --- _worker.js を自動生成 ---
const titlesObj = Object.fromEntries(routes.map(r => [r.path, r.title]));
const workerContent = `export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const ua = request.headers.get('user-agent') || '';

    const isCrawler = /twitterbot|facebookexternalhit|Slackbot|TelegramBot|Discordbot/i.test(ua);

    if (isCrawler) {
      const SITE_TITLE = ${JSON.stringify(SITE_TITLE)};
      const titles = ${JSON.stringify(titlesObj, null, 6)};

      const pageTitle = titles[url.pathname] ?? SITE_TITLE;
      const fullTitle = url.pathname === '/' ? SITE_TITLE : \`\${pageTitle} | \${SITE_TITLE}\`;

      const ogTags = \`
    <meta property="og:title" content="\${fullTitle}" />
    <meta property="og:type" content="article" />
    <meta name="twitter:card" content="summary" />
    <meta name="twitter:title" content="\${fullTitle}" />\`;

      const res = await env.ASSETS.fetch(new Request(new URL('/', request.url)));
      const html = await res.text();
      const injected = html.replace('</head>', \`\${ogTags}\\n  </head>\`);

      return new Response(injected, {
        headers: { 'content-type': 'text/html;charset=UTF-8' },
      });
    }

    return env.ASSETS.fetch(request);
  },
};
`;

writeFileSync('public/_worker.js', workerContent);

console.log(`✅ git履歴: ${history.length}件, 最終更新日: ${Object.keys(updated).length}ファイル, _worker.js生成完了`);