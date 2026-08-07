export type Locale = 'en' | 'ar'

export type Direction = 'ltr' | 'rtl'

/**
 * A value authored in both locales. Content modules use this instead of
 * translation keys so a project's copy stays in one place.
 */
export type Localized<T = string> = Record<Locale, T>

export const LOCALES: readonly Locale[] = ['en', 'ar'] as const

export const DIRECTION: Record<Locale, Direction> = {
  en: 'ltr',
  ar: 'rtl',
}

export const LOCALE_LABEL: Record<Locale, string> = {
  en: 'English',
  ar: 'العربية',
}

export const LOCALE_SHORT: Record<Locale, string> = {
  en: 'EN',
  ar: 'ع',
}
