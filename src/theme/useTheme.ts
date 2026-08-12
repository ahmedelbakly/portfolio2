import { use } from 'react'
import { ThemeContext, type ThemeValue } from './context'

export function useTheme(): ThemeValue {
  const context = use(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used inside <ThemeProvider>')
  }
  return context
}
