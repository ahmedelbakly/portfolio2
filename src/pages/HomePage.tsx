import { Hero } from '@/components/sections/Hero'
import { Tracks } from '@/components/sections/Tracks'
import { Work } from '@/components/sections/Work'
import { About } from '@/components/sections/About'
import { Stack } from '@/components/sections/Stack'
import { Experience } from '@/components/sections/Experience'
import { Contact } from '@/components/sections/Contact'

export default function HomePage() {
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
