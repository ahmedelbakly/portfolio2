import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { isLocale, LOCALES } from '@/i18n/config'
import { getProject, projects } from '@/content/projects'
import { profile } from '@/content/profile'
import { CaseStudy } from '@/components/sections/CaseStudy'
import { absoluteUrl } from '@/lib/site'

export function generateStaticParams() {
  return LOCALES.flatMap((locale) =>
    projects.map((project) => ({ locale, slug: project.slug })),
  )
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}): Promise<Metadata> {
  const { locale, slug } = await params
  const project = getProject(slug)
  if (!project || !isLocale(locale)) return {}

  const title = `${project.name} — ${project.kind[locale]} · ${profile.name[locale]}`
  const description = project.tagline[locale]
  const path = `/${locale}/work/${project.slug}/`

  return {
    title,
    description,
    alternates: {
      canonical: absoluteUrl(path),
      languages: {
        en: absoluteUrl(`/en/work/${project.slug}/`),
        ar: absoluteUrl(`/ar/work/${project.slug}/`),
      },
    },
    openGraph: {
      type: 'article',
      title,
      description,
      url: absoluteUrl(path),
      images: [{ url: absoluteUrl('/og.png'), width: 1200, height: 630 }],
      locale: locale === 'ar' ? 'ar_EG' : 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [absoluteUrl('/og.png')],
    },
  }
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const { locale, slug } = await params
  if (!isLocale(locale)) notFound()

  const project = getProject(slug)
  if (!project) notFound()

  return <CaseStudy slug={project.slug} />
}
