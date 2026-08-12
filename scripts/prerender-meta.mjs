/**
 * Emits a static HTML file per case study with that project's metadata baked
 * into the <head>.
 *
 * Why this exists: social crawlers (LinkedIn, WhatsApp, Slack, X) read the
 * HTML they are served and never execute JavaScript, so metadata written by
 * React on route change is invisible to them. Every case study shared as a
 * link would otherwise fall back to the site-wide card.
 *
 * The body stays the SPA shell — React boots and renders the route as usual.
 * Only the head is specialised. A side benefit is that GitHub Pages now serves
 * these routes as real files with HTTP 200 instead of routing them through the
 * 404 fallback.
 */
import { build } from 'esbuild'
import { mkdir, readFile, rm, writeFile } from 'node:fs/promises'
import { fileURLToPath, URL } from 'node:url'

const root = fileURLToPath(new URL('../', import.meta.url))
const dist = `${root}dist/`
const tmp = `${root}node_modules/.tmp/content.mjs`

/** Loads the TypeScript content module by bundling it to plain ESM first. */
async function loadProjects() {
  await build({
    entryPoints: [`${root}src/content/projects.ts`],
    bundle: true,
    format: 'esm',
    outfile: tmp,
    platform: 'neutral',
    logLevel: 'silent',
    alias: { '@': `${root}src` },
  })
  const module = await import(`file://${tmp}`)
  return module.projects
}

/** Reads the deploy base path straight out of the built markup. */
function detectBase(html) {
  const match = /<script type="module"[^>]*src="([^"]*)\/assets\//.exec(html)
  return match ? `${match[1]}/` : '/'
}

/**
 * Reads the canonical site URL the build already substituted into the head.
 * This value already includes the base path, so route URLs append to it
 * directly rather than composing origin and base again.
 */
function detectSiteUrl(html) {
  const match = /<link rel="canonical" href="([^"]*?)\/?"/.exec(html)
  return match ? match[1] : ''
}

const escapeHtml = (value) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')

/** Replaces the content of a meta tag identified by one of its attributes. */
function setMeta(html, attr, name, content) {
  const pattern = new RegExp(
    `(<meta\\s+[^>]*${attr}="${name}"[^>]*content=")[^"]*(")`,
    'i',
  )
  if (pattern.test(html)) return html.replace(pattern, `$1${escapeHtml(content)}$2`)

  // The tag may be written with content before the identifying attribute.
  const reversed = new RegExp(
    `(<meta\\s+[^>]*content=")[^"]*("[^>]*${attr}="${name}")`,
    'i',
  )
  return html.replace(reversed, `$1${escapeHtml(content)}$2`)
}

function buildHead(html, { title, description, url, base, siteUrl }) {
  let out = html

  out = out.replace(/<title>[^<]*<\/title>/, `<title>${escapeHtml(title)}</title>`)
  out = setMeta(out, 'name', 'description', description)
  out = setMeta(out, 'property', 'og:title', title)
  out = setMeta(out, 'property', 'og:description', description)
  out = setMeta(out, 'property', 'og:url', url)
  out = setMeta(out, 'name', 'twitter:title', title)
  out = setMeta(out, 'name', 'twitter:description', description)
  out = out.replace(
    /<link rel="canonical" href="[^"]*"/,
    `<link rel="canonical" href="${escapeHtml(url)}"`,
  )

  // A case study is an article, not the site's front page.
  out = out.replace(/(<meta property="og:type" content=")[^"]*(")/, `$1article$2`)

  // index.html keeps these relative so it stays base-agnostic. From a
  // subdirectory they would resolve against the route, so pin them to the base.
  out = out.replace(/href="favicon\.svg"/g, `href="${base}favicon.svg"`)
  out = out.replace(/href="manifest\.json"/g, `href="${base}manifest.json"`)

  // Point the person entity at the site root rather than at this route.
  out = out.replace(/("url":\s*")[^"]*(")/, `$1${siteUrl}/$2`)

  return out
}

const shell = await readFile(`${dist}index.html`, 'utf8')
const base = detectBase(shell)
const siteUrl = detectSiteUrl(shell)
const projects = await loadProjects()

const written = []
for (const project of projects) {
  const title = `${project.name} — ${project.kind.en} · Ahmed Elbakly`
  const description = project.tagline.en
  const url = `${siteUrl}/work/${project.slug}/`

  const html = buildHead(shell, { title, description, url, base, siteUrl })
  const dir = `${dist}work/${project.slug}`
  await mkdir(dir, { recursive: true })
  await writeFile(`${dir}/index.html`, html, 'utf8')
  written.push(`work/${project.slug}/index.html`)
}

// Generate the sitemap from the same list, so routes and sitemap cannot drift.
const urls = [
  `${siteUrl}/`,
  ...projects.map((project) => `${siteUrl}/work/${project.slug}/`),
]
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (loc, index) =>
      `  <url>\n    <loc>${loc}</loc>\n    <priority>${index === 0 ? '1.0' : '0.8'}</priority>\n  </url>`,
  )
  .join('\n')}
</urlset>
`
await writeFile(`${dist}sitemap.xml`, sitemap, 'utf8')

await rm(tmp, { force: true })

console.log(`✓ ${written.length} case-study pages written with their own metadata`)
for (const file of written) console.log(`  · ${file}`)
console.log(`✓ sitemap.xml regenerated with ${urls.length} URLs`)
