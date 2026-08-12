import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { DIRECTION, LOCALES, isLocale } from '@/i18n/config'
import { en } from '@/i18n/en'
import { ar } from '@/i18n/ar'
import { profile } from '@/content/profile'
import { Providers } from '@/components/layout/Providers'
import { Nav } from '@/components/layout/Nav'
import { Footer } from '@/components/layout/Footer'
import { SITE_URL, absoluteUrl, withBase } from '@/lib/site'

import '@fontsource-variable/inter'
import '@fontsource-variable/jetbrains-mono'
import '@fontsource-variable/cairo'
import '@/styles/app.css'

const DICTIONARIES = { en, ar }

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  if (!isLocale(locale)) return {}
  const t = DICTIONARIES[locale]

  return {
    metadataBase: new URL(SITE_URL),
    title: t.meta.title,
    description: t.meta.description,
    authors: [{ name: profile.name.en }],
    alternates: {
      canonical: absoluteUrl(`/${locale}/`),
      languages: {
        en: absoluteUrl('/en/'),
        ar: absoluteUrl('/ar/'),
      },
    },
    openGraph: {
      type: 'website',
      siteName: profile.name.en,
      title: t.meta.title,
      description: t.hero.summary,
      url: absoluteUrl(`/${locale}/`),
      images: [{ url: absoluteUrl('/og.png'), width: 1200, height: 630 }],
      locale: locale === 'ar' ? 'ar_EG' : 'en_US',
      alternateLocale: locale === 'ar' ? 'en_US' : 'ar_EG',
    },
    twitter: {
      card: 'summary_large_image',
      title: t.meta.title,
      description: t.hero.summary,
      images: [absoluteUrl('/og.png')],
    },
    icons: { icon: withBase('/favicon.svg'), apple: withBase('/favicon.svg') },
    manifest: withBase('/manifest.json'),
  }
}

/**
 * Resolves the theme before first paint so the page never flashes the wrong
 * background. Only touches attributes on <html>, which sit outside React's
 * hydration scope — the language comes from the route, not from storage.
 */
const THEME_SCRIPT = `
(function () {
  try {
    var stored = localStorage.getItem('ae-theme')
    document.documentElement.dataset.theme =
      stored === 'light' || stored === 'dark'
        ? stored
        : window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'
  } catch (e) {
    document.documentElement.dataset.theme = 'dark'
  }
})()
`.trim()

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()

  const t = DICTIONARIES[locale]

  return (
    // suppressHydrationWarning covers the data-theme attribute the inline
    // script writes before React runs. It is scoped to <html> deliberately.
    <html lang={locale} dir={DIRECTION[locale]} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
        <meta name="theme-color" content="#08090b" media="(prefers-color-scheme: dark)" />
        <meta name="theme-color" content="#fbfbfc" media="(prefers-color-scheme: light)" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Person',
              name: profile.name.en,
              jobTitle: 'Senior Full-Stack Engineer',
              email: `mailto:${profile.email}`,
              telephone: `+${profile.phoneHref.replace(/\D/g, '')}`,
              url: absoluteUrl(`/${locale}/`),
              address: {
                '@type': 'PostalAddress',
                addressRegion: 'Dakahlia',
                addressCountry: 'EG',
              },
              sameAs: profile.socials.map((social) => social.href),
              knowsLanguage: ['ar', 'en'],
              knowsAbout: [
                'Node.js',
                'NestJS',
                'React',
                'Next.js',
                'TypeScript',
                'MongoDB',
                'PostgreSQL',
                'Redis',
                'Docker',
                'Kubernetes',
                'Multi-tenant SaaS architecture',
              ],
            }),
          }}
        />
      </head>
      <body>
        <Providers locale={locale}>
          <Nav />
          <main id="main">{children}</main>
          <Footer />
        </Providers>
        <noscript>{t.meta.description}</noscript>
      </body>
    </html>
  )
}
