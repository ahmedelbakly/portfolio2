/**
 * English dictionary — the canonical shape. `ar.ts` is typed against this
 * object, so a missing or renamed key fails the type check rather than
 * silently rendering `undefined` in production.
 */
export const en = {
  meta: {
    title: 'Ahmed Elbakly — Senior Full-Stack Engineer',
    description:
      'Senior Full-Stack Engineer with 5+ years architecting multi-tenant SaaS platforms on Node.js, NestJS, React and Next.js.',
  },

  nav: {
    home: 'Home',
    profiles: 'Profiles',
    work: 'Work',
    about: 'About',
    stack: 'Stack',
    experience: 'Experience',
    contact: 'Contact',
    resume: 'Résumé',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    skipToContent: 'Skip to content',
  },

  actions: {
    switchToLight: 'Switch to light theme',
    switchToDark: 'Switch to dark theme',
    switchLanguage: 'التبديل إلى العربية',
    downloadResume: 'Download résumé',
    backToTop: 'Back to top',
    copy: 'Copy',
    copied: 'Copied',
  },

  hero: {
    available: 'Available for senior roles — remote & relocation',
    name: 'Ahmed Elbakly',
    role: 'Senior Full-Stack Engineer',
    rotating: [
      'multi-tenant SaaS platforms',
      'real-time systems at scale',
      'enterprise React frontends',
      'production cloud infrastructure',
    ],
    lead: 'I architect ',
    leadSuffix: ' — and own them end to end, from data model to deployed UI.',
    summary:
      'Five years shipping production systems on Node.js, NestJS, React and Next.js. Sole technical owner on nine client platforms across real estate, EdTech, e-commerce and on-demand services.',
    ctaWork: 'View selected work',
    ctaContact: 'Get in touch',
    scrollHint: 'Scroll',
  },

  tracks: {
    hiringFor: 'Hiring for',
    switchLabel: 'Choose the profile that matches your role',
    eyebrow: 'Two profiles, one body of work',
    title: 'Backend depth, full-stack range',
    subtitle:
      'The same nine platforms, read two ways. Pick the lens that matches the role you are hiring for — the evidence below does not change, only the framing does.',
    downloadCv: 'Download this CV',
    viewing: 'Currently viewing',
    competencies: 'Core competencies',
  },

  metrics: {
    eyebrow: 'By the numbers',
    years: 'Years shipping production',
    platforms: 'Production platforms owned',
    modules: 'Backend feature modules',
    pages: 'Pages in a single frontend',
  },

  about: {
    eyebrow: 'About',
    title: 'Engineering that survives contact with production',
    paragraphs: [
      'I build the whole system — the schema, the API, the permission model, the state architecture, the pipeline that deploys it and the server it lands on. That range is deliberate: it lets me make decisions at the layer where they actually belong instead of routing around someone else’s constraint.',
      'Most of my work has been as the sole technical owner for companies without an in-house engineering team. Requirements, architecture, estimation, code review, production support — including the 2 a.m. incident. When you are the only engineer, you learn very quickly which shortcuts are affordable and which ones bill you back with interest.',
      'The systems I care about are the unglamorous ones: a multi-tenant boundary that holds, a permission model that a non-engineer can reason about, a cache layer that fails open. I would rather ship something maintainable than something clever.',
    ],
    facts: {
      location: 'Location',
      locationValue: 'Dakahlia, Egypt · UTC+2',
      availability: 'Availability',
      availabilityValue: 'Remote & relocation (GCC, EU, UK)',
      languages: 'Languages',
      languagesValue: 'Arabic (native) · English (professional)',
      focus: 'Current focus',
      focusValue: 'NestJS · Next.js · Kubernetes',
    },
    portraitAlt: 'Portrait of Ahmed Elbakly',
  },

  stack: {
    eyebrow: 'Technical stack',
    title: 'What I build with',
    subtitle:
      'Tools I have shipped to production and would defend in a design review — not a list of things I have read about.',
    groups: {
      languages: 'Languages',
      frontend: 'Frontend',
      backend: 'Backend',
      data: 'Data & caching',
      cloud: 'Cloud',
      devops: 'DevOps',
      integrations: 'Integrations',
      practices: 'Practices',
    },
  },

  work: {
    eyebrow: 'Selected work',
    title: 'Systems in production',
    subtitle:
      'Five platforms I designed, built and shipped. Each case study covers the constraint, the architecture and what it cost.',
    viewCase: 'Read case study',
    role: 'Role',
    year: 'Timeline',
    allProjects: 'Explore all projects',
  },

  caseStudy: {
    back: 'Back to work',
    overview: 'Overview',
    challenge: 'The constraint',
    approach: 'The approach',
    architecture: 'Architecture',
    highlights: 'What I built',
    impact: 'Impact',
    stack: 'Stack',
    decisions: 'Key decisions',
    next: 'Next case study',
    previous: 'Previous case study',
    role: 'My role',
    domain: 'Domain',
    scale: 'Scale',
  },

  experience: {
    eyebrow: 'Experience',
    title: 'How I work',
    subtitle:
      'One long-running engagement, many clients, and full ownership of every layer between the database and the DNS record.',
    present: 'Present',
    responsibilities: 'What that involved',
  },

  capabilities: {
    eyebrow: 'Beyond the code',
    title: 'Cloud, delivery and the parts nobody demos',
    subtitle:
      'Shipping is a feature. These are the things I own after the pull request merges.',
  },

  education: {
    eyebrow: 'Education & training',
    title: 'How I got here',
  },

  contact: {
    eyebrow: 'Contact',
    title: 'Let’s build something that lasts',
    subtitle:
      'Open to senior full-stack and backend roles — remote, or relocation to the GCC, EU or UK. I reply to every message within a day.',
    directTitle: 'Reach me directly',
    formTitle: 'Or send a message',
    fields: {
      name: 'Name',
      namePlaceholder: 'Your name',
      email: 'Email',
      emailPlaceholder: 'you@company.com',
      message: 'Message',
      messagePlaceholder: 'What are you building?',
    },
    send: 'Send message',
    sending: 'Sending…',
    success: 'Message sent. I’ll get back to you within a day.',
    error: 'Something went wrong. Email me directly at dev.ahmed.elbakly@gmail.com.',
    validation: {
      name: 'Please enter your name.',
      email: 'Please enter a valid email address.',
      message: 'Please write a short message.',
    },
    channels: {
      email: 'Email',
      phone: 'Phone',
      linkedin: 'LinkedIn',
      github: 'GitHub',
    },
  },

  footer: {
    tagline: 'Senior Full-Stack Engineer',
    builtWith: 'Built with React, TypeScript and Vite.',
    rights: 'All rights reserved.',
    sections: 'Sections',
    elsewhere: 'Elsewhere',
  },

  notFound: {
    code: '404',
    title: 'This route does not exist',
    body: 'The page you are looking for was moved, renamed, or never shipped.',
    cta: 'Return home',
  },
}

/**
 * The canonical dictionary shape. Every other locale must satisfy it exactly.
 */
export type Dictionary = typeof en
