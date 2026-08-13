'use client'

import Link from 'next/link'
import { useI18n } from '@/i18n/useI18n'
import { profile } from '@/content/profile'
import { projects } from '@/content/projects'
import { localeHref, localeUrl, projectHref } from '@/lib/paths'

const SECTION_IDS = ['work', 'about', 'stack', 'contact'] as const

export function Footer() {
  const { t, pick, locale } = useI18n()
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-line bg-surface">
      <div className="container-page py-16">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          <div className="flex flex-col gap-4">
            <Link href={localeHref(locale)} className="flex items-center gap-2.5">
              <span
                aria-hidden="true"
                className="mono grid size-8 place-items-center rounded-md border border-line bg-canvas text-xs text-accent"
              >
                AE
              </span>
              <span className="text-sm font-semibold tracking-tight text-fg ar:tracking-normal">
                {pick(profile.name)}
              </span>
            </Link>
            <p className="max-w-xs text-sm text-fg-muted">{t.footer.tagline}</p>
            <a
              href={`mailto:${profile.email}`}
              className="mono w-fit text-sm text-fg-muted underline decoration-line-strong underline-offset-4 transition-colors hover:text-accent"
              dir="ltr"
            >
              {profile.email}
            </a>
          </div>

          <nav aria-labelledby="footer-sections" className="flex flex-col gap-4">
            <h3
              id="footer-sections"
              className="eyebrow ar:font-arabic ar:text-sm ar:normal-case ar:tracking-normal"
            >
              {t.footer.sections}
            </h3>
            <ul className="flex flex-col gap-2.5">
              {SECTION_IDS.map((id) => (
                <li key={id}>
                  <a
                    href={`${localeUrl(locale)}#${id}`}
                    className="text-sm text-fg-muted transition-colors hover:text-fg"
                  >
                    {t.nav[id]}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-labelledby="footer-work" className="flex flex-col gap-4">
            <h3
              id="footer-work"
              className="eyebrow ar:font-arabic ar:text-sm ar:normal-case ar:tracking-normal"
            >
              {t.nav.work}
            </h3>
            <ul className="flex flex-col gap-2.5">
              {projects.map((project) => (
                <li key={project.slug}>
                  <Link
                    href={projectHref(locale, project.slug)}
                    className="text-sm text-fg-muted transition-colors hover:text-fg"
                  >
                    {project.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-14 flex flex-col-reverse gap-6 border-t border-line pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-fg-subtle">
            © {year} {pick(profile.name)}. {t.footer.rights}{' '}
            <span className="mono">{t.footer.builtWith}</span>
          </p>
          <ul className="flex items-center gap-5">
            {profile.socials.map((social) => (
              <li key={social.id}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="mono text-xs text-fg-muted transition-colors hover:text-accent"
                >
                  {social.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  )
}
