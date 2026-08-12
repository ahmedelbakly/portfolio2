'use client'

import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react'
import { THEME_STORAGE_KEY, ThemeContext, type Theme, type ThemeValue } from './context'

const DEFAULT_THEME: Theme = 'dark'

/**
 * Theme state.
 *
 * The first render must match the statically generated HTML exactly, so it
 * always starts on the default. The stored preference is applied immediately
 * after mount. There is no visible flash because the inline script in the
 * layout has already set `data-theme` on <html> before first paint — the
 * colours come from CSS variables keyed off that attribute, not from React.
 */
export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(DEFAULT_THEME)

  // Adopt whatever the pre-paint script resolved, so React's idea of the
  // theme matches what is already on screen.
  useEffect(() => {
    const applied = document.documentElement.dataset.theme
    if (applied === 'light' || applied === 'dark') {
      setThemeState(applied)
      return
    }
    setThemeState(
      window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark',
    )
  }, [])

  const setTheme = useCallback((next: Theme) => {
    setThemeState(next)
    document.documentElement.dataset.theme = next
    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, next)
    } catch {
      // Ignore — a themeless session is still a usable session.
    }
  }, [])

  const toggleTheme = useCallback(
    () => setTheme(document.documentElement.dataset.theme === 'light' ? 'dark' : 'light'),
    [setTheme],
  )

  // Follow the OS only while the visitor has not made an explicit choice.
  useEffect(() => {
    let hasStoredPreference = false
    try {
      hasStoredPreference = window.localStorage.getItem(THEME_STORAGE_KEY) !== null
    } catch {
      hasStoredPreference = false
    }
    if (hasStoredPreference) return

    const media = window.matchMedia('(prefers-color-scheme: light)')
    const onChange = (event: MediaQueryListEvent) => {
      const next: Theme = event.matches ? 'light' : 'dark'
      setThemeState(next)
      document.documentElement.dataset.theme = next
    }
    media.addEventListener('change', onChange)
    return () => media.removeEventListener('change', onChange)
  }, [])

  const value = useMemo<ThemeValue>(
    () => ({ theme, setTheme, toggleTheme }),
    [theme, setTheme, toggleTheme],
  )

  return <ThemeContext value={value}>{children}</ThemeContext>
}
