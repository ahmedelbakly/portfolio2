import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react'
import { I18nContext, LOCALE_STORAGE_KEY, type I18nValue } from './context'
import { en, type Dictionary } from './en'
import { ar } from './ar'
import { DIRECTION, type Locale, type Localized } from './types'

const DICTIONARIES: Record<Locale, Dictionary> = { en, ar }

function readInitialLocale(): Locale {
  if (typeof window === 'undefined') return 'en'
  try {
    const stored = window.localStorage.getItem(LOCALE_STORAGE_KEY)
    if (stored === 'en' || stored === 'ar') return stored
    // Fall back to the browser's preference before defaulting to English.
    return navigator.language?.toLowerCase().startsWith('ar') ? 'ar' : 'en'
  } catch {
    return 'en'
  }
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(readInitialLocale)

  // Keep the document in sync so CSS logical properties, font stacks and
  // assistive tech all follow the active locale.
  useEffect(() => {
    const root = document.documentElement
    root.lang = locale
    root.dir = DIRECTION[locale]
    document.title = DICTIONARIES[locale].meta.title

    const description = document.querySelector('meta[name="description"]')
    description?.setAttribute('content', DICTIONARIES[locale].meta.description)

    try {
      window.localStorage.setItem(LOCALE_STORAGE_KEY, locale)
    } catch {
      // Storage can be unavailable in private mode — the app still works.
    }
  }, [locale])

  const setLocale = useCallback((next: Locale) => setLocaleState(next), [])

  const toggleLocale = useCallback(
    () => setLocaleState((current) => (current === 'en' ? 'ar' : 'en')),
    [],
  )

  const value = useMemo<I18nValue>(() => {
    const pick = <T,>(localized: Localized<T>): T => localized[locale]
    return {
      locale,
      dir: DIRECTION[locale],
      t: DICTIONARIES[locale],
      pick,
      setLocale,
      toggleLocale,
    }
  }, [locale, setLocale, toggleLocale])

  return <I18nContext value={value}>{children}</I18nContext>
}
