/**
 * Fails the build if any internal link points somewhere the export does not
 * contain.
 *
 * This exists because of a real escape: `next/link` prepends `basePath` while
 * a plain `<a href>` does not, so every section anchor, the footer nav and all
 * three résumé links shipped without the prefix and 404'd in production. The
 * suites at the time asked for assets by URLs typed into the test rather than
 * by the hrefs the markup contained, so everything passed.
 *
 * Reads the generated HTML directly — no browser, no server, no network.
 */
import { readFile, readdir, stat } from 'node:fs/promises'
import { fileURLToPath, URL } from 'node:url'

const out = fileURLToPath(new URL('../out/', import.meta.url))
const BASE = '/portfolio'

async function htmlFiles(dir = out, found = []) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = `${dir}${entry.name}`
    if (entry.isDirectory()) await htmlFiles(`${full}/`, found)
    else if (entry.name.endsWith('.html')) found.push(full)
  }
  return found
}

/**
 * True when the export can serve this path.
 *
 * `out/` is the document root that will be published at `${BASE}`, so the
 * prefix has to come off before looking anything up on disk.
 */
async function resolves(pathname) {
  const rel = pathname.replace(new RegExp(`^${BASE}/?`), '').replace(/^\//, '')
  const candidates = rel
    ? [`${out}${rel}`, `${out}${rel.replace(/\/$/, '')}/index.html`]
    : [`${out}index.html`]

  for (const candidate of candidates) {
    try {
      if ((await stat(candidate)).isFile()) return true
    } catch {
      /* try the next shape */
    }
  }
  return false
}

const pages = await htmlFiles()
const cache = new Map()
const broken = []

for (const file of pages) {
  const html = await readFile(file, 'utf8')
  const page = file.slice(out.length - 1)

  for (const match of html.matchAll(/<a\b[^>]*?href="([^"]+)"/g)) {
    const href = match[1]
    // External, mail, tel and bare fragments are outside this check.
    if (/^(https?:|mailto:|tel:|#|data:)/.test(href)) continue

    const raw = href.split('#')[0]
    if (!raw) continue

    // A relative href resolves against the page that contains it and needs no
    // prefix; an absolute one is served from the domain root and must carry it.
    const pathname = raw.startsWith('/')
      ? raw
      : new URL(raw, `https://x${BASE}${page.replace(/\\/g, '/').replace(/index\.html$/, '')}`)
          .pathname

    if (!pathname.startsWith(`${BASE}/`) && pathname !== BASE) {
      broken.push({ page, href, why: `resolves to ${pathname}, outside ${BASE}` })
      continue
    }
    if (!cache.has(pathname)) cache.set(pathname, await resolves(pathname))
    if (!cache.get(pathname)) broken.push({ page, href, why: 'no such file in the export' })
  }
}

// Social cards are referenced as absolute URLs in meta tags, which the anchor
// sweep above never sees. A card that does not exist means a shared link
// previews with no image at all.
for (const file of pages) {
  const html = await readFile(file, 'utf8')
  const page = file.slice(out.length - 1)
  for (const match of html.matchAll(/<meta\s+property="og:image"\s+content="([^"]+)"/g)) {
    const pathname = new URL(match[1]).pathname
    if (!cache.has(pathname)) cache.set(pathname, await resolves(pathname))
    if (!cache.get(pathname)) broken.push({ page, href: match[1], why: 'og:image is missing' })
  }
}

if (broken.length > 0) {
  const seen = new Set()
  console.error(`\n✗ ${broken.length} broken internal link(s):\n`)
  for (const item of broken) {
    if (seen.has(item.href)) continue
    seen.add(item.href)
    console.error(`  ${item.href}\n      ${item.why}\n      first seen in ${item.page}`)
  }
  process.exit(1)
}

console.log(`✓ every internal link across ${pages.length} pages resolves in the export`)
