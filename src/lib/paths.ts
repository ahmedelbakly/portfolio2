import type { Locale } from '@/i18n/types'

/**
 * Builds an in-app href under the active locale segment.
 *
 * Next prepends `basePath` itself, so paths here start at the locale.
 * Trailing slashes are included to match `trailingSlash: true`, which avoids
 * a redirect hop on every internal navigation.
 */
export function localeHref(locale: Locale, path = ''): string {
  const clean = path.replace(/^\/|\/$/g, '')
  return clean ? `/${locale}/${clean}/` : `/${locale}/`
}

/** Href for a case study. */
export function projectHref(locale: Locale, slug: string): string {
  return localeHref(locale, `work/${slug}`)
}

/** Href for an in-page section anchor, from anywhere in the app. */
export function sectionHref(locale: Locale, id: string, onHome: boolean): string {
  return onHome ? `#${id}` : `${localeHref(locale)}#${id}`
}
