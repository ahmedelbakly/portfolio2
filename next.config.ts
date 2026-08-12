import type { NextConfig } from 'next'

// Project Pages sites are served from /<repo>/, so every asset URL needs the
// repository name as its base path. A mismatch here ships a page whose assets
// all 404.
const REPO = 'portfolio'

const nextConfig: NextConfig = {
  // Emit a fully static site — no Node server on GitHub Pages.
  output: 'export',
  basePath: `/${REPO}`,
  // Directory-style URLs, which is what a static host resolves cleanly.
  trailingSlash: true,
  // The image optimiser needs a server; there is none.
  images: { unoptimized: true },
  eslint: { ignoreDuringBuilds: true },
}

export default nextConfig
