// Cloudflare Pages用サイトマップ自動生成スクリプト
// npm install sitemap

const { SitemapStream, streamToPromise } = require('sitemap');
const { createWriteStream, readdirSync } = require('fs');
const path = require('path');

const baseUrl = 'https://enbu-kouryaku.com/';
const docsDir = path.join(__dirname, 'docs');

// 対象拡張子
const exts = ['.html'];

let files = [];
try {
  files = readdirSync(docsDir)
    .filter(f => exts.includes(path.extname(f)) && !f.startsWith('_'));
} catch (e) {
  console.error('docsディレクトリが見つかりません:', e);
}

if (files.length === 0) {
  console.error('HTMLファイルが見つかりません。sitemap.xmlは生成されません。');
  process.exit(1);
}

const sitemap = new SitemapStream({ hostname: baseUrl });
const ws = createWriteStream(path.join(docsDir, 'sitemap.xml'));

sitemap.pipe(ws);

files.forEach(file => {
  sitemap.write({ url: '/' + file });
});
sitemap.end();

streamToPromise(sitemap).then(() => {
  ws.end();
  console.log('sitemap.xmlを生成しました');
});
