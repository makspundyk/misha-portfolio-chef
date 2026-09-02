/**
 * Local development server. Never deployed.
 *
 * It serves ./public and applies public/_headers, so the Content-Security-Policy
 * that will run in production also runs here. That parity is the point: a CSP
 * violation should break the page on a laptop, not on the live site.
 */

import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { join, extname, normalize } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(fileURLToPath(new URL('.', import.meta.url)), 'public');
const PORT = Number(process.env.PORT ?? 4321);

const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon'
};

/** Parse Cloudflare Pages `_headers` into [{ test, headers }] rules. */
async function loadHeaderRules() {
  let text = '';
  try {
    text = await readFile(join(ROOT, '_headers'), 'utf8');
  } catch {
    return [];
  }

  const rules = [];
  let current = null;

  for (const raw of text.split('\n')) {
    const line = raw.trimEnd();
    if (!line.trim() || line.trim().startsWith('#')) continue;

    if (!line.startsWith(' ') && !line.startsWith('\t')) {
      current = { pattern: line.trim(), headers: [] };
      rules.push(current);
      continue;
    }

    const at = line.indexOf(':');
    if (at > 0 && current) {
      current.headers.push([line.slice(0, at).trim(), line.slice(at + 1).trim()]);
    }
  }

  return rules.map(({ pattern, headers }) => ({
    test: patternToTest(pattern),
    headers
  }));
}

function patternToTest(pattern) {
  const escaped = pattern.replace(/[.+?^${}()|[\]\\]/g, '\\$&').replace(/\*/g, '.*');
  const re = new RegExp(`^${escaped}$`);
  return (pathname) => re.test(pathname);
}

const rules = await loadHeaderRules();

const server = createServer(async (req, res) => {
  const url = new URL(req.url, `http://localhost:${PORT}`);
  let pathname = decodeURIComponent(url.pathname);

  // `_headers` is configuration for the platform, not a page.
  if (pathname === '/_headers') {
    res.writeHead(404).end('Not found');
    return;
  }

  if (pathname.endsWith('/')) pathname += 'index.html';

  const filePath = join(ROOT, normalize(pathname));
  if (!filePath.startsWith(ROOT)) {
    res.writeHead(403).end('Forbidden');
    return;
  }

  try {
    const info = await stat(filePath);
    if (!info.isFile()) throw new Error('not a file');

    const body = await readFile(filePath);
    const headers = { 'Content-Type': TYPES[extname(filePath)] ?? 'application/octet-stream' };
    for (const rule of rules) {
      if (rule.test(pathname)) {
        for (const [name, value] of rule.headers) headers[name] = value;
      }
    }

    res.writeHead(200, headers).end(body);
  } catch {
    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' }).end('Not found');
  }
});

server.listen(PORT, () => {
  console.log(`serving ./public on http://localhost:${PORT}`);
  console.log(`applying ${rules.length} rule(s) from public/_headers`);
});
