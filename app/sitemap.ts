import type { MetadataRoute } from 'next'
import { LOCALES } from '@/i18n/config'
import { projects } from '@/content/projects'
import { absoluteUrl } from '@/lib/site'

/**
 * Generated from the same project list the routes are, so the two cannot
 * drift. Every entry declares its counterpart in the other language, which is
 * what lets both get indexed rather than one being treated as a duplicate.
 */
export const dynamic = 'force-static'

function alternates(path: string) {
  return {
    languages: Object.fromEntries(
      LOCALES.map((locale) => [locale, absoluteUrl(`/${locale}${path}`)]),
    ),
  }
}

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ['/', ...projects.map((project) => `/work/${project.slug}/`)]

  return LOCALES.flatMap((locale) =>
    paths.map((path) => ({
      url: absoluteUrl(`/${locale}${path}`),
      priority: path === '/' ? 1 : 0.8,
      alternates: alternates(path),
    })),
  )
}
