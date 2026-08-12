import { notFound } from 'next/navigation'
import { isLocale, LOCALES } from '@/i18n/config'
import { Hero } from '@/components/sections/Hero'
import { Tracks } from '@/components/sections/Tracks'
import { Work } from '@/components/sections/Work'
import { About } from '@/components/sections/About'
import { Stack } from '@/components/sections/Stack'
import { Experience } from '@/components/sections/Experience'
import { Contact } from '@/components/sections/Contact'

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }))
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()

  return (
    <>
      <Hero />
      <Tracks />
      <Work />
      <About />
      <Stack />
      <Experience />
      <Contact />
    </>
  )
}
