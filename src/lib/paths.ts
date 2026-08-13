import type { Locale } from '@/i18n/types'
import { withBase } from './site'

/**
 * Two families of href live here, and mixing them up ships 404s.
 *
 * `next/link` prepends `basePath` itself, so anything handed to it must NOT
 * carry the prefix or it doubles. A plain `<a href>` gets no such treatment,
 * so it must carry the prefix or it resolves against the domain root.
 *
 * The naming keeps the distinction visible at the call site: `…Href` for
 * `next/link`, `…Url` for a real anchor.
 */

/** For `next/link`. Locale-scoped app path, without the base path. */
export function localeHref(locale: Locale, path = ''): string {
  const clean = path.replace(/^\/|\/$/g, '')
  return clean ? `/${locale}/${clean}/` : `/${locale}/`
}

/** For `next/link`. Case study path, without the base path. */
export function projectHref(locale: Locale, slug: string): string {
  return localeHref(locale, `work/${slug}`)
}

/**
 * For a plain `<a href>`. Section anchor from anywhere in the app.
 *
 * On the home page this is a bare fragment, which needs no prefix. From a case
 * study it has to name the home route, and therefore carry the base path.
 */
export function sectionUrl(locale: Locale, id: string, onHome: boolean): string {
  return onHome ? `#${id}` : `${withBase(localeHref(locale))}#${id}`
}

/** For a plain `<a href>`. Home route, fully qualified with the base path. */
export function localeUrl(locale: Locale, path = ''): string {
  return withBase(localeHref(locale, path))
}
