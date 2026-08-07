import type { en } from '@/i18n/en'

type StackGroupKey = keyof (typeof en)['stack']['groups']

export interface StackGroup {
  key: StackGroupKey
  items: string[]
}

/**
 * Technical stack, grouped the way it would be discussed in a system design
 * conversation rather than alphabetically.
 */
export const stackGroups: StackGroup[] = [
  {
    key: 'languages',
    items: ['TypeScript', 'JavaScript (ES6+)', 'SQL', 'HTML5', 'CSS3'],
  },
  {
    key: 'frontend',
    items: [
      'React 18 / 19',
      'Next.js (App Router)',
      'Redux Toolkit',
      'RTK Query',
      'TanStack Query',
      'Material UI',
      'Tailwind CSS',
      'CASL',
      'Chart.js',
      'Vite',
      'i18n & RTL',
    ],
  },
  {
    key: 'backend',
    items: [
      'Node.js',
      'NestJS',
      'Express.js',
      'REST APIs',
      'GraphQL',
      'Microservices patterns',
      'Multi-tenant architecture',
      'Socket.IO',
      'BullMQ',
      'Cron jobs',
      'JWT',
      'RBAC',
    ],
  },
  {
    key: 'data',
    items: ['MongoDB', 'Mongoose', 'PostgreSQL', 'MySQL', 'Redis', 'Prisma'],
  },
  {
    key: 'cloud',
    items: ['AWS EC2', 'AWS S3', 'Azure AKS', 'DigitalOcean', 'Cloudflare'],
  },
  {
    key: 'devops',
    items: ['Docker', 'Kubernetes', 'GitLab CI/CD', 'Nginx', 'Linux (Ubuntu)'],
  },
  {
    key: 'integrations',
    items: [
      'Stripe',
      'Keycloak (OIDC)',
      'Firebase',
      'Twilio',
      'Agora',
      'LiveKit',
      'Google Maps',
      'Mapbox',
    ],
  },
  {
    key: 'practices',
    items: ['Git', 'Jest', 'Postman', 'Code review', 'Agile / Scrum'],
  },
]
