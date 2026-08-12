'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'
import { useI18n } from '@/i18n/useI18n'
import { useTrack } from '@/track/useTrack'
import { profile } from '@/content/profile'
import { LocaleToggle, ThemeToggle } from './Toggles'
import { useScrollSpy } from '@/hooks/useScrollSpy'
import { localeHref, sectionHref } from '@/lib/paths'

const SECTION_IDS = ['profiles', 'work', 'about', 'stack', 'experience', 'contact'] as const

export function Nav() {
  const { t, pick, locale } = useI18n()
  const { track } = useTrack()
  const pathname = usePathname() ?? '/'
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  // The home route for a locale is exactly /<locale>/ — anything deeper is a
  // case study, where section anchors have to route home first.
  const onHome = /^\/(en|ar)\/?$/.test(pathname)
  const activeSection = useScrollSpy(onHome ? SECTION_IDS : [])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close the mobile sheet on navigation and lock the page behind it.
  useEffect(() => setMenuOpen(false), [pathname])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  useEffect(() => {
    if (!menuOpen) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [menuOpen])

  const links = SECTION_IDS.map((id) => ({
    id,
    href: sectionHref(locale, id, onHome),
    label: t.nav[id],
  }))

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:z-100 focus:m-3 focus:rounded-md focus:bg-accent focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-accent-contrast"
      >
        {t.nav.skipToContent}
      </a>

      <header
        className={`fixed inset-x-0 top-0 z-50 h-nav transition-[background-color,border-color,backdrop-filter] duration-300 ${
          scrolled || menuOpen
            ? 'border-b border-line bg-canvas/80 backdrop-blur-xl'
            : 'border-b border-transparent bg-transparent'
        }`}
      >
        <nav
          className="container-page flex h-full items-center justify-between gap-6"
          aria-label={t.nav.home}
        >
          <Link
            href={localeHref(locale)}
            className="group flex items-center gap-2.5 text-sm font-semibold tracking-tight text-fg"
          >
            <span
              aria-hidden="true"
              className="mono grid size-8 place-items-center rounded-md border border-line bg-surface text-xs text-accent transition-colors duration-200 group-hover:border-line-accent"
            >
              AE
            </span>
            <span className="hidden sm:inline">{pick(profile.name)}</span>
          </Link>

          <ul className="hidden items-center gap-1 lg:flex">
            {links.map((link) => (
              <li key={link.id}>
                <a
                  href={link.href}
                  className={`relative rounded-full px-4 py-2 text-sm transition-colors duration-150 hover:text-fg ${
                    activeSection === link.id ? 'text-fg' : 'text-fg-muted'
                  }`}
                >
                  {link.label}
                  {activeSection === link.id && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-0 -z-10 rounded-full bg-muted"
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    />
                  )}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <LocaleToggle />
            <ThemeToggle />
            <a
              href={track.resumeUrl}
              download
              className="hidden rounded-full border border-line-strong px-4 py-2 text-sm font-medium text-fg transition-colors duration-150 hover:bg-muted sm:inline-flex"
            >
              {t.nav.resume}
            </a>
            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              className="grid size-9 place-items-center rounded-full border border-line text-fg-muted transition-colors hover:text-fg lg:hidden"
              aria-label={menuOpen ? t.nav.closeMenu : t.nav.openMenu}
              aria-expanded={menuOpen}
            >
              <span className="relative block h-2.5 w-4">
                <span
                  className={`absolute inset-x-0 block h-px bg-current transition-all duration-300 ease-out-expo ${
                    menuOpen ? 'top-1/2 rotate-45' : 'top-0'
                  }`}
                />
                <span
                  className={`absolute inset-x-0 block h-px bg-current transition-all duration-300 ease-out-expo ${
                    menuOpen ? 'top-1/2 -rotate-45' : 'top-full'
                  }`}
                />
              </span>
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 top-nav z-40 bg-canvas/95 backdrop-blur-xl lg:hidden"
          >
            <ul className="container-page flex flex-col py-6">
              {links.map((link, index) => (
                <motion.li
                  key={link.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.04 * index, duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="border-b border-line"
                >
                  <a
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="flex items-baseline gap-4 py-5 text-2xl font-semibold tracking-tight text-fg ar:tracking-normal"
                  >
                    <span className="mono text-2xs text-accent">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    {link.label}
                  </a>
                </motion.li>
              ))}
              <li className="pt-8">
                <a
                  href={track.resumeUrl}
                  download
                  className="inline-flex rounded-full border border-line-strong px-6 py-3 text-sm font-medium text-fg"
                >
                  {t.actions.downloadResume}
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
