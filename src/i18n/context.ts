import { createContext } from 'react'
import type { Dictionary } from './en'
import type { Direction, Locale, Localized } from './types'

export interface I18nValue {
  locale: Locale
  dir: Direction
  /** Fully typed UI dictionary for the active locale. */
  t: Dictionary
  /** Resolves a `Localized<T>` content value to the active locale. */
  pick: <T>(value: Localized<T>) => T
  setLocale: (locale: Locale) => void
  toggleLocale: () => void
}

export const I18nContext = createContext<I18nValue | null>(null)

export const LOCALE_STORAGE_KEY = 'ae-lang'
