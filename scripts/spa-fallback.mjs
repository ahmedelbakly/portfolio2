// GitHub Pages serves 404.html for any path it cannot resolve to a file.
// Copying the built index.html there lets deep links such as /portfolio/work/coonex
// boot the SPA instead of showing GitHub's own 404 page.
import { copyFile } from 'node:fs/promises'
import { fileURLToPath, URL } from 'node:url'

const dist = fileURLToPath(new URL('../dist/', import.meta.url))

await copyFile(`${dist}index.html`, `${dist}404.html`)
console.log('✓ dist/404.html written (SPA deep-link fallback)')
