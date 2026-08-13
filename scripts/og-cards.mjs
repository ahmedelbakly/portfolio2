/**
 * Generates a social card per case study, per locale.
 *
 * A single site-wide card means five shared links all preview identically —
 * the reader learns nothing from the image. Each card here carries the
 * project's own name, descriptor, one-line pitch and its four real figures,
 * in the same visual language as the site so the set reads as one system.
 *
 * Output is committed to public/og/ rather than generated during `next build`,
 * so a normal build needs neither Chrome nor this script. Re-run it with
 * `npm run og` whenever a project's copy or figures change.
 */
import { build } from 'esbuild'
import { mkdir, readFile, rm } from 'node:fs/promises'
import { fileURLToPath, URL } from 'node:url'
import puppeteer from 'puppeteer-core'

const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe'
const root = fileURLToPath(new URL('../', import.meta.url))
const outDir = `${root}public/og`
const tmp = `${root}node_modules/.tmp/og-content.mjs`

/** Inlines a font so the render never depends on network or system fonts. */
async function dataUri(relative) {
  const buffer = await readFile(`${root}node_modules/${relative}`)
  return `data:font/woff2;base64,${buffer.toString('base64')}`
}

const [inter, mono, cairo] = await Promise.all([
  dataUri('@fontsource-variable/inter/files/inter-latin-wght-normal.woff2'),
  dataUri('@fontsource-variable/jetbrains-mono/files/jetbrains-mono-latin-wght-normal.woff2'),
  dataUri('@fontsource-variable/cairo/files/cairo-arabic-wght-normal.woff2'),
])

await build({
  entryPoints: [`${root}src/content/projects.ts`],
  bundle: true,
  format: 'esm',
  outfile: tmp,
  platform: 'neutral',
  logLevel: 'silent',
  alias: { '@': `${root}src` },
})
const { projects } = await import(`file://${tmp}`)

const escape = (value) =>
  String(value).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

function card(project, locale) {
  const rtl = locale === 'ar'
  const name = escape(project.name)
  const kind = escape(project.kind[locale])
  const tagline = escape(project.tagline[locale])
  const metrics = project.metrics
    .map(
      (m) => `<div class="m">
        <span class="mv">${escape(m.value)}</span>
        <span class="ml">${escape(m.label[locale])}</span>
      </div>`,
    )
    .join('')

  return `<!doctype html>
<html lang="${locale}" dir="${rtl ? 'rtl' : 'ltr'}">
<head>
<meta charset="utf-8" />
<style>
  @font-face { font-family: 'Inter'; src: url('${inter}') format('woff2'); font-weight: 100 900; }
  @font-face { font-family: 'Mono'; src: url('${mono}') format('woff2'); font-weight: 100 800; }
  @font-face { font-family: 'Cairo'; src: url('${cairo}') format('woff2'); font-weight: 200 1000; }

  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    width: 1200px; height: 630px; overflow: hidden; position: relative;
    background: #08090b; color: #f3f4f6;
    font-family: ${rtl ? "'Cairo', 'Inter'" : "'Inter'"}, system-ui, sans-serif;
  }
  .grid {
    position: absolute; inset: 0;
    background-image: radial-gradient(rgba(255,255,255,.055) 1px, transparent 1px);
    background-size: 30px 30px;
    -webkit-mask-image: radial-gradient(75% 70% at ${rtl ? '70%' : '30%'} 18%, black, transparent);
  }
  .glow {
    position: absolute; inset: 0;
    background: radial-gradient(58% 58% at ${rtl ? '78%' : '22%'} 0%, rgba(124,140,255,.20) 0%, transparent 70%);
  }
  .wrap { position: relative; height: 100%; padding: 62px 76px; display: flex; flex-direction: column; }

  .badge {
    display: inline-flex; align-items: center; gap: 12px; width: fit-content;
    border: 1px solid rgba(255,255,255,.12); border-radius: 999px;
    padding: 9px 22px; background: rgba(14,16,21,.6);
    font-family: ${rtl ? "'Cairo'" : "'Mono'"}, monospace;
    font-size: ${rtl ? '21px' : '19px'}; color: #a2a8b3;
  }
  .dot { width: 8px; height: 8px; border-radius: 999px; background: #7c8cff; flex: none; }

  .mid { margin-block: auto; padding-block: 26px; }
  h1 {
    font-size: 92px; font-weight: 600; line-height: 1.02;
    letter-spacing: ${rtl ? '0' : '-.038em'};
  }
  .lede {
    margin-top: 22px; font-size: 27px; line-height: 1.5; color: #a2a8b3;
    max-width: 950px;
    display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden;
  }

  .metrics { display: flex; gap: 52px; }
  .m {
    display: flex; flex-direction: column; gap: 8px;
    padding-${rtl ? 'right' : 'left'}: 20px;
    border-${rtl ? 'right' : 'left'}: 1px solid rgba(255,255,255,.14);
  }
  .mv {
    font-size: 44px; font-weight: 500; letter-spacing: -.035em;
    font-family: 'Mono', monospace; direction: ltr;
  }
  .ml { font-size: 17px; color: #6d747f; max-width: 210px; line-height: 1.35; }

  .top { display: flex; align-items: center; justify-content: space-between; gap: 24px; }
  .sig {
    font-family: ${rtl ? "'Cairo'" : "'Mono'"}, monospace;
    font-size: 19px; color: #6d747f; white-space: nowrap;
  }
</style>
</head>
<body>
  <div class="grid"></div>
  <div class="glow"></div>
  <div class="wrap">
    <div class="top">
      <div class="badge"><span class="dot"></span>${kind}</div>
      <div class="sig">${locale === 'ar' ? 'أحمد البقلي' : 'Ahmed Elbakly'}</div>
    </div>
    <div class="mid">
      <h1>${name}</h1>
      <p class="lede">${tagline}</p>
    </div>
    <div class="metrics">${metrics}</div>
  </div>
</body>
</html>`
}

await mkdir(outDir, { recursive: true })

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: 'new',
  args: ['--no-sandbox'],
})

const written = []
for (const project of projects) {
  for (const locale of ['en', 'ar']) {
    const page = await browser.newPage()
    await page.setViewport({ width: 1200, height: 630, deviceScaleFactor: 1 })
    await page.setContent(card(project, locale), { waitUntil: 'networkidle0' })
    await page.evaluate(() => document.fonts.ready)
    const file = `${outDir}/${locale}-${project.slug}.png`
    await page.screenshot({ path: file })
    await page.close()
    written.push(`og/${locale}-${project.slug}.png`)
  }
}

await browser.close()
await rm(tmp, { force: true })

console.log(`✓ ${written.length} social cards written to public/og/`)
for (const file of written) console.log(`  · ${file}`)
