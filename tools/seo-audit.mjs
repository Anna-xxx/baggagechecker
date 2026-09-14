import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const ROOT = 'out';

function htmlFiles(dir) {
  return readdirSync(dir).flatMap((name) => {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) return htmlFiles(full);
    return name.endsWith('.html') ? [full] : [];
  });
}

const pick = (html, re) => {
  const m = html.match(re);
  return m ? m[1].trim() : null;
};
const all = (html, re) => [...html.matchAll(new RegExp(re.source, re.flags.includes('g') ? re.flags : re.flags + 'g'))].map((m) => m[1].trim());

const decode = (s) =>
  s
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .replace(/&#x2F;/g, '/');

const pages = htmlFiles(ROOT)
  .filter((f) => !f.includes('404') && !f.includes('_not-found'))
  .map((file) => {
    const html = readFileSync(file, 'utf8');
    const url = '/' + relative(ROOT, file).replace(/\.html$/, '').replace(/^index$/, '');
    const bodyText = decode(
      html
        .replace(/<script[\s\S]*?<\/script>/g, ' ')
        .replace(/<style[\s\S]*?<\/style>/g, ' ')
        .replace(/<[^>]+>/g, ' '),
    );
    const words = bodyText.split(/\s+/).filter((w) => w.length > 1).length;
    return {
      url,
      file,
      bytes: Buffer.byteLength(html),
      title: pick(html, /<title[^>]*>([^<]*)<\/title>/),
      description: pick(html, /<meta name="description" content="([^"]*)"/),
      canonical: pick(html, /<link rel="canonical" href="([^"]*)"/),
      ogTitle: pick(html, /<meta property="og:title" content="([^"]*)"/),
      robots: pick(html, /<meta name="robots" content="([^"]*)"/),
      lang: pick(html, /<html[^>]*lang="([^"]*)"/),
      h1: all(html, /<h1[^>]*>([\s\S]*?)<\/h1>/).map((h) => decode(h.replace(/<[^>]+>/g, '')).trim()),
      h2count: (html.match(/<h2[^>]*>/g) || []).length,
      h3count: (html.match(/<h3[^>]*>/g) || []).length,
      jsonLd: (html.match(/application\/ld\+json/g) || []).length,
      internalLinks: [...new Set(all(html, /href="(\/[^"#?]*)"/))].filter((h) => !h.startsWith('/_next/')),
      imgsNoAlt: (html.match(/<img(?![^>]*\balt=)[^>]*>/g) || []).length,
      words,
    };
  });

const problems = { critical: [], important: [], minor: [] };
const add = (bucket, msg) => problems[bucket].push(msg);

// --- titles and descriptions -------------------------------------------------
const byTitle = new Map();
const byDesc = new Map();
for (const p of pages) {
  if (!p.title) add('critical', `${p.url} — no <title>`);
  else {
    byTitle.set(p.title, (byTitle.get(p.title) || []).concat(p.url));
    if (p.title.length > 60) add('minor', `title ${p.title.length} chars (Google shows ~60): ${p.url} — "${p.title}"`);
  }
  if (!p.description) add('important', `${p.url} — no meta description`);
  else {
    byDesc.set(p.description, (byDesc.get(p.description) || []).concat(p.url));
    if (p.description.length > 165) add('minor', `description ${p.description.length} chars: ${p.url}`);
    if (p.description.length < 70) add('minor', `description only ${p.description.length} chars: ${p.url}`);
  }
  if (!p.canonical) add('critical', `${p.url} — no canonical`);
  if (p.h1.length === 0) add('critical', `${p.url} — no <h1>`);
  if (p.h1.length > 1) add('important', `${p.url} — ${p.h1.length} <h1> tags: ${p.h1.join(' | ')}`);
  if (!p.lang) add('important', `${p.url} — <html> has no lang attribute`);
  if (p.imgsNoAlt) add('important', `${p.url} — ${p.imgsNoAlt} <img> without alt`);
  if (p.words < 300) add('important', `thin page: ${p.url} — ${p.words} words`);
  if (!p.ogTitle) add('minor', `${p.url} — no Open Graph title`);
  if (p.jsonLd === 0) add('minor', `${p.url} — no structured data`);
}

for (const [title, urls] of byTitle) if (urls.length > 1) add('critical', `duplicate title on ${urls.length} pages ("${title}"): ${urls.slice(0, 4).join(', ')}`);
for (const [desc, urls] of byDesc) if (urls.length > 1) add('critical', `duplicate description on ${urls.length} pages: ${urls.slice(0, 4).join(', ')}`);

// --- internal linking / orphans ---------------------------------------------
const known = new Set(pages.map((p) => p.url));
const inbound = new Map(pages.map((p) => [p.url, 0]));
for (const p of pages)
  for (const href of p.internalLinks) {
    const target = href.replace(/\/$/, '') || '/';
    if (known.has(target) && target !== p.url) inbound.set(target, (inbound.get(target) || 0) + 1);
    else if (!known.has(target) && target !== '/') add('critical', `broken internal link ${href} on ${p.url}`);
  }
for (const [url, n] of inbound) if (n === 0 && url !== '/') add('important', `orphan page (nothing links to it): ${url}`);

// --- robots / sitemap --------------------------------------------------------
let sitemapUrls = [];
try {
  const sm = readFileSync(join(ROOT, 'sitemap.xml'), 'utf8');
  sitemapUrls = all(sm, /<loc>([^<]+)<\/loc>/);
} catch {
  add('critical', 'no sitemap.xml in the build');
}
const sitemapPaths = new Set(sitemapUrls.map((u) => new URL(u).pathname.replace(/\/$/, '') || '/'));
for (const p of pages) if (!sitemapPaths.has(p.url || '/')) add('important', `not in sitemap: ${p.url || '/'}`);

// --- report ------------------------------------------------------------------
console.log(`Pages audited: ${pages.length}`);
console.log(`Sitemap entries: ${sitemapUrls.length}`);
console.log(
  `Words — min ${Math.min(...pages.map((p) => p.words))}, median ${
    pages.map((p) => p.words).sort((a, b) => a - b)[Math.floor(pages.length / 2)]
  }, max ${Math.max(...pages.map((p) => p.words))}`,
);
console.log(`Page HTML — largest ${Math.round(Math.max(...pages.map((p) => p.bytes)) / 1024)} KB`);
console.log(`Inbound internal links — pages with fewer than 2: ${[...inbound.values()].filter((n) => n < 2).length}`);

for (const level of ['critical', 'important', 'minor']) {
  const list = problems[level];
  console.log(`\n===== ${level.toUpperCase()} (${list.length}) =====`);
  const grouped = {};
  for (const m of list) {
    const key = m.replace(/\/airlines\/[a-z0-9-]+/g, '/airlines/*').replace(/\d+/g, 'N');
    (grouped[key] = grouped[key] || []).push(m);
  }
  for (const [key, msgs] of Object.entries(grouped)) {
    if (msgs.length > 3) console.log(`  [${msgs.length}×] ${msgs[0]}`);
    else msgs.forEach((m) => console.log(`  ${m}`));
  }
}
