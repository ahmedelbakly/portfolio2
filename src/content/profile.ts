import type { Localized } from '@/i18n/types'

export const profile = {
  name: {
    en: 'Ahmed Elbakly',
    ar: 'أحمد البقلي',
  } satisfies Localized,

  title: {
    en: 'Senior Full-Stack Engineer',
    ar: 'مهندس Full-Stack أول',
  } satisfies Localized,

  email: 'dev.ahmed.elbakly@gmail.com',
  phone: '+20 109 248 7660',
  phoneHref: '+201092487660',
  location: {
    en: 'Dakahlia, Egypt',
    ar: 'الدقهلية، مصر',
  } satisfies Localized,

  /** Default download — the broader of the two profiles. */
  resumeUrl: '/files/Ahmed-Elbakly-Senior-FullStack-Engineer-CV.pdf',

  socials: [
    { id: 'github', label: 'GitHub', href: 'https://github.com/ahmedelbakly' },
    { id: 'linkedin', label: 'LinkedIn', href: 'https://linkedin.com/in/elbaklymern' },
  ],
} as const

/**
 * Headline figures. Each one traces directly to a delivered system rather than
 * to years-of-experience arithmetic.
 */
export const metrics = [
  { value: '5+', key: 'years' },
  { value: '9', key: 'platforms' },
  { value: '90+', key: 'modules' },
  { value: '144+', key: 'pages' },
] as const
