import { useI18n } from '@/i18n/useI18n'
import { useTheme } from '@/theme/useTheme'
import { LOCALE_SHORT } from '@/i18n/types'

const CONTROL =
  'inline-flex items-center justify-center rounded-full border border-line text-fg-muted ' +
  'transition-colors duration-150 hover:border-line-strong hover:bg-muted hover:text-fg'

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  const { t } = useI18n()
  const label = theme === 'dark' ? t.actions.switchToLight : t.actions.switchToDark

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={`${CONTROL} size-9`}
      aria-label={label}
      title={label}
    >
      {/* Both glyphs are rendered and cross-faded, so the icon never pops in. */}
      <span className="relative block size-4">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          className={`absolute inset-0 size-4 transition-all duration-300 ease-out-expo ${
            theme === 'dark' ? 'scale-100 opacity-100' : 'scale-50 opacity-0'
          }`}
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
        </svg>
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`absolute inset-0 size-4 transition-all duration-300 ease-out-expo ${
            theme === 'dark' ? 'scale-50 opacity-0' : 'scale-100 opacity-100'
          }`}
          aria-hidden="true"
        >
          <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" />
        </svg>
      </span>
    </button>
  )
}

export function LocaleToggle() {
  const { locale, toggleLocale, t } = useI18n()
  const next = locale === 'en' ? 'ar' : 'en'

  return (
    <button
      type="button"
      onClick={toggleLocale}
      className={`${CONTROL} mono h-9 gap-1 px-3 text-xs font-medium`}
      aria-label={t.actions.switchLanguage}
      title={t.actions.switchLanguage}
    >
      <span className={locale === 'en' ? 'text-fg' : 'text-fg-subtle'}>
        {LOCALE_SHORT.en}
      </span>
      <span aria-hidden="true" className="text-fg-subtle/50">
        /
      </span>
      <span className={locale === 'ar' ? 'text-fg' : 'text-fg-subtle'}>
        {LOCALE_SHORT.ar}
      </span>
      <span className="sr-only">{LOCALE_SHORT[next]}</span>
    </button>
  )
}
