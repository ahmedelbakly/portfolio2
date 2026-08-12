/**
 * Deploy identity — the single place that knows where the site lives.
 * Must stay in step with `basePath` in next.config.ts: a mismatch produces
 * canonical tags, social cards and icon links pointing at URLs that 404.
 */
export const BASE_PATH = '/portfolio'

export const SITE_URL = `https://ahmedelbakly.github.io${BASE_PATH}`

/** Absolute URL for a path that excludes the base path. */
export function absoluteUrl(path: string): string {
  return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`
}

/**
 * Host-relative URL under the base path.
 *
 * Next prepends `basePath` to `next/link` hrefs and imported assets, but not
 * to paths handed to the Metadata API — icons and the manifest have to carry
 * it themselves or they resolve against the domain root.
 */
export function withBase(path: string): string {
  return `${BASE_PATH}${path.startsWith('/') ? path : `/${path}`}`
}
