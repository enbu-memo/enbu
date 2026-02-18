// Cloudflare Pages用サイトマップ自動生成スクリプト
// npm install sitemap fs

const { SitemapStream, streamToPromise } = require('sitemap');
const { createWriteStream, readdirSync } = require('fs');
const path = require('path');

const baseUrl = 'https://enbu-kouryaku.com/';
const docsDir = path.join(__dirname);

// 対象拡張子
const exts = ['.html'];

const files = readdirSync(docsDir)
  .filter(f => exts.includes(path.extname(f)) && !f.startsWith('_'));

const sitemap = new SitemapStream({ hostname: baseUrl });
const ws = createWriteStream(path.join(docsDir, 'sitemap.xml'));

files.forEach(file => {
  sitemap.write({ url: '/' + file });
});
sitemap.end();

streamToPromise(sitemap).then(() => {
  ws.end();
  console.log('sitemap.xml生成完了');
});
