import type { Localized } from '@/i18n/types'

export type TrackId = 'fullstack' | 'backend'

export interface TrackMetric {
  value: string
  label: Localized
}

export interface Track {
  id: TrackId
  /** Short label for the switcher control. */
  label: Localized
  /** Headline role, rendered as the hero h1. */
  role: Localized
  /** Stack line shown under the role on the tracks cards. */
  signature: string
  /** Phrases the hero types through. */
  rotating: Localized<string[]>
  /** Hero standfirst. */
  summary: Localized
  /** How this profile is described on its tracks card. */
  blurb: Localized
  metrics: TrackMetric[]
  competencies: Localized<string[]>
  resumeUrl: string
}

/**
 * Two positionings of the same career. The visitor picks the one that matches
 * the role they are hiring for, and the hero, the figures and the downloadable
 * CV all follow. Nothing here is a different claim — it is a different lens on
 * the same body of work.
 */
export const tracks: Track[] = [
  {
    id: 'fullstack',
    label: { en: 'Full-Stack', ar: 'Full-Stack' },
    role: { en: 'Senior Full-Stack Engineer', ar: 'مهندس Full-Stack أول' },
    signature: 'Node.js · NestJS · React · Next.js · TypeScript · Cloud & DevOps',
    rotating: {
      en: [
        'multi-tenant SaaS platforms',
        'enterprise React frontends',
        'real-time systems at scale',
        'production cloud infrastructure',
      ],
      ar: [
        'منصات SaaS متعددة المستأجرين',
        'واجهات React مؤسسية',
        'أنظمة لحظية تتحمّل الحِمل',
        'بنية سحابية إنتاجية',
      ],
    },
    summary: {
      en: 'Five years shipping production systems end to end on Node.js, NestJS, React and Next.js — data model, API, state architecture, pipeline and the server it lands on. Sole technical owner on nine client platforms.',
      ar: 'خمس سنوات في تسليم أنظمة إنتاجية من طرف إلى طرف على Node.js و NestJS و React و Next.js — نموذج البيانات، والـ API، ومعمارية الحالة، وخط النشر، والخادم الذي تستقر عليه. المالك التقني الوحيد لتسع منصات.',
    },
    blurb: {
      en: 'Owning the product end to end — the same backend, plus the enterprise interfaces on top of it, the state architecture that keeps them maintainable, and the pipeline that ships both.',
      ar: 'ملكية المنتج من طرف إلى طرف — الواجهة الخلفية نفسها، إضافةً إلى الواجهات المؤسسية فوقها، ومعمارية الحالة التي تُبقيها قابلة للصيانة، وخط النشر الذي يسلّم الاثنين.',
    },
    metrics: [
      { value: '5+', label: { en: 'Years shipping production', ar: 'سنوات في الإنتاج' } },
      { value: '9', label: { en: 'Production platforms owned', ar: 'منصة إنتاجية مملوكة' } },
      { value: '144+', label: { en: 'Pages in a single frontend', ar: 'صفحة في واجهة واحدة' } },
      { value: '90+', label: { en: 'Backend feature modules', ar: 'موديول في الواجهة الخلفية' } },
    ],
    competencies: {
      en: [
        'Full-stack architecture',
        'Component & state architecture',
        'Enterprise React & Next.js',
        'Payments & subscription billing',
        'Internationalisation & RTL',
        'Performance optimisation',
        'Cloud deployment',
        'Technical ownership & client delivery',
      ],
      ar: [
        'معمارية Full-Stack',
        'معمارية المكوّنات والحالة',
        'واجهات React و Next.js مؤسسية',
        'المدفوعات وفوترة الاشتراكات',
        'التوطين ودعم RTL',
        'تحسين الأداء',
        'النشر السحابي',
        'الملكية التقنية وتسليم العملاء',
      ],
    },
    resumeUrl: '/files/Ahmed-Elbakly-Senior-FullStack-Engineer-CV.pdf',
  },
  {
    id: 'backend',
    label: { en: 'Backend', ar: 'Backend' },
    role: { en: 'Senior Backend Engineer', ar: 'مهندس Backend أول' },
    signature: 'Node.js · NestJS · TypeScript · Distributed & multi-tenant SaaS',
    rotating: {
      en: [
        'multi-tenant backends',
        'queue-driven workloads',
        'real-time systems at scale',
        'production cloud infrastructure',
      ],
      ar: [
        'واجهات خلفية متعددة المستأجرين',
        'أحمال عمل مدفوعة بالطوابير',
        'أنظمة لحظية تتحمّل الحِمل',
        'بنية سحابية إنتاجية',
      ],
    },
    summary: {
      en: 'Five years architecting and operating production SaaS backends on Node.js, NestJS and TypeScript — tenant boundaries, secure REST APIs, queue-driven workloads, caching, and the cloud they run on.',
      ar: 'خمس سنوات في تصميم وتشغيل واجهات SaaS خلفية إنتاجية على Node.js و NestJS و TypeScript — حدود المستأجرين، وواجهات REST آمنة، وأحمال عمل مدفوعة بالطوابير، والتخزين المؤقت، والسحابة التي تعمل عليها.',
    },
    blurb: {
      en: 'Architecting and operating the systems behind the product — multi-tenant data boundaries, secure REST APIs, queue-driven workloads, caching, and the infrastructure that keeps them up.',
      ar: 'تصميم وتشغيل الأنظمة خلف المنتج — حدود بيانات متعددة المستأجرين، وواجهات REST آمنة، وأحمال عمل مدفوعة بالطوابير، وتخزين مؤقت، والبنية التي تُبقيها قائمة.',
    },
    metrics: [
      { value: '5+', label: { en: 'Years shipping production', ar: 'سنوات في الإنتاج' } },
      { value: '90+', label: { en: 'Feature modules in one backend', ar: 'موديول في واجهة خلفية واحدة' } },
      { value: '6', label: { en: 'Verticals on shared services', ar: 'قطاعات على خدمات مشتركة' } },
      { value: '43', label: { en: 'NestJS modules in one platform', ar: 'موديول NestJS في منصة واحدة' } },
    ],
    competencies: {
      en: [
        'Backend architecture',
        'System design',
        'REST API design',
        'Multi-tenant SaaS architecture',
        'Microservices patterns',
        'Event-driven & queue-based processing',
        'JWT, RBAC & API security',
        'Redis caching',
        'Database modelling & query tuning',
        'Background jobs & scheduling',
        'Real-time systems (WebSockets)',
        'CI/CD & containerisation',
      ],
      ar: [
        'معمارية الواجهات الخلفية',
        'تصميم الأنظمة',
        'تصميم واجهات REST',
        'معمارية SaaS متعددة المستأجرين',
        'أنماط الخدمات المصغّرة',
        'معالجة مدفوعة بالأحداث والطوابير',
        'JWT و RBAC وأمان الواجهات',
        'تخزين Redis المؤقت',
        'نمذجة البيانات وضبط الاستعلامات',
        'المهام الخلفية والجدولة',
        'أنظمة لحظية (WebSockets)',
        'خطوط النشر والحاويات',
      ],
    },
    resumeUrl: '/files/Ahmed-Elbakly-Senior-Backend-Engineer-CV.pdf',
  },
]

export const DEFAULT_TRACK: TrackId = 'fullstack'

export function getTrack(id: TrackId): Track {
  return tracks.find((track) => track.id === id) ?? tracks[0]
}
