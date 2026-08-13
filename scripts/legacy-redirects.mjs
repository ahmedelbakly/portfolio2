/**
 * Keeps the pre-migration URLs alive.
 *
 * Before locale routing, case studies lived at /portfolio/work/<slug>/. Those
 * URLs are in the search index and in any link that has been shared, so the
 * migration must not turn them into 404s. Each one becomes a small redirect
 * page that forwards to its English equivalent, marked noindex with a
 * canonical pointing at the new address so the index consolidates rather than
 * splits.
 *
 * Slugs are read from the generated export rather than from the TypeScript
 * source, which keeps this script dependency-free and guarantees it can only
 * ever point at pages that actually exist.
 */
import { mkdir, readdir, writeFile } from 'node:fs/promises'
import { fileURLToPath, URL } from 'node:url'

const out = fileURLToPath(new URL('../out/', import.meta.url))
const BASE = '/portfolio'
const SITE = 'https://ahmedelbakly.github.io'

const slugs = (await readdir(`${out}en/work`, { withFileTypes: true }))
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name)

if (slugs.length === 0) {
  throw new Error('No case studies found in out/en/work — refusing to write empty redirects')
}

const page = (slug) => {
  const target = `${BASE}/en/work/${slug}/`
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>Redirecting…</title>
    <meta name="robots" content="noindex, follow" />
    <link rel="canonical" href="${SITE}${target}" />
    <meta http-equiv="refresh" content="0; url=${target}" />
    <script>location.replace(${JSON.stringify(target)})</script>
  </head>
  <body>
    <p><a href="${target}">This page has moved.</a></p>
  </body>
</html>
`
}

for (const slug of slugs) {
  const dir = `${out}work/${slug}`
  await mkdir(dir, { recursive: true })
  await writeFile(`${dir}/index.html`, page(slug), 'utf8')
}

console.log(`✓ ${slugs.length} legacy /work/<slug>/ redirects written`)
for (const slug of slugs) console.log(`  · work/${slug}/ → /en/work/${slug}/`)
