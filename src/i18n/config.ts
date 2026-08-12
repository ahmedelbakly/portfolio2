import type { Locale } from './types'

export { DIRECTION, LOCALE_LABEL, LOCALE_SHORT, type Locale } from './types'

export const LOCALES = ['en', 'ar'] as const

export const DEFAULT_LOCALE: Locale = 'en'

export function isLocale(value: string | undefined): value is Locale {
  return value === 'en' || value === 'ar'
}

/** The other locale — there are exactly two, so this is total. */
export function otherLocale(locale: Locale): Locale {
  return locale === 'en' ? 'ar' : 'en'
}

/**
 * Rewrites a pathname to its equivalent under another locale.
 * Paths arriving here already have Next's basePath stripped.
 */
export function localisePath(pathname: string, locale: Locale): string {
  const rest = pathname.replace(/^\/(en|ar)(?=\/|$)/, '')
  const suffix = rest === '' || rest === '/' ? '/' : rest
  return `/${locale}${suffix}`
}
