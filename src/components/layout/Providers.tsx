'use client'

import type { ReactNode } from 'react'
import type { Locale } from '@/i18n/types'
import { I18nProvider } from '@/i18n/I18nProvider'
import { ThemeProvider } from '@/theme/ThemeProvider'
import { TrackProvider } from '@/track/TrackProvider'

/**
 * Single client boundary for the three context providers.
 *
 * Children are passed through as an already-rendered tree, so page content
 * stays server-rendered and lands in the static HTML — a client provider
 * wrapping `children` does not turn those children into client components.
 */
export function Providers({ locale, children }: { locale: Locale; children: ReactNode }) {
  return (
    <ThemeProvider>
      <I18nProvider locale={locale}>
        <TrackProvider>{children}</TrackProvider>
      </I18nProvider>
    </ThemeProvider>
  )
}