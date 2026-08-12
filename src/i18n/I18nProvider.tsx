'use client'

import { useMemo, type ReactNode } from 'react'
import { I18nContext, type I18nValue } from './context'
import { en, type Dictionary } from './en'
import { ar } from './ar'
import { DIRECTION, type Locale, type Localized } from './types'

const DICTIONARIES: Record<Locale, Dictionary> = { en, ar }

/**
 * Supplies the active dictionary to client components.
 *
 * The locale is a route segment, not stored state — it arrives as a prop from
 * the server layout. That is what removes the hydration mismatch the old
 * localStorage-driven version had: server and client always agree, because
 * both read the same URL.
 */
export function I18nProvider({ locale, children }: { locale: Locale; children: ReactNode }) {
  const value = useMemo<I18nValue>(() => {
    const pick = <T,>(localized: Localized<T>): T => localized[locale]
    return {
      locale,
      dir: DIRECTION[locale],
      t: DICTIONARIES[locale],
      pick,
    }
  }, [locale])

  return <I18nContext value={value}>{children}</I18nContext>
}
