import type { Localized } from '@/i18n/types'

export interface Role {
  company: Localized
  title: Localized
  context: Localized
  start: string
  end: Localized
  location: Localized
  responsibilities: Localized<string[]>
}

export const roles: Role[] = [
  {
    company: {
      en: 'Freelance / Contract',
      ar: 'عمل حر / تعاقدي',
    },
    title: {
      en: 'Senior Full-Stack Engineer',
      ar: 'مهندس Full-Stack أول',
    },
    context: {
      en: 'Remote — SaaS, CRM, EdTech, e-commerce and on-demand platforms',
      ar: 'عن بُعد — منصات SaaS و CRM وتقنيات تعليم وتجارة إلكترونية وخدمات عند الطلب',
    },
    start: '2020',
    end: { en: 'Present', ar: 'حتى الآن' },
    location: { en: 'Remote', ar: 'عن بُعد' },
    responsibilities: {
      en: [
        'Designed and shipped 9+ production web platforms end to end for clients in real estate, education, e-commerce and on-demand services, owning everything from data model to deployed UI.',
        'Architected multi-tenant backends in NestJS and Node.js, isolating tenant data and configuration on a shared codebase so new customers could be onboarded without forking the product.',
        'Engineered secure REST APIs with JWT authentication, role-based access control and audit logging, enforcing least-privilege access across six distinct user roles and creating a traceable record for compliance-sensitive clients.',
        'Engineered enterprise React 18/19 and Next.js frontends — including a 144+ page CRM and multi-role dashboards for six user types — using Redux Toolkit, RTK Query and TanStack Query to keep large interfaces predictable and maintainable.',
        'Delivered real-time chat, notifications and live order tracking over Socket.IO, replacing polling with event-driven updates that kept operational dashboards current.',
        'Integrated Stripe billing and subscriptions, Keycloak identity, Firebase, Twilio SMS, Agora and LiveKit streaming, Google Maps and Mapbox, expanding product capability without rebuilding core services.',
        'Scaled asynchronous workloads with BullMQ queues and scheduled cron jobs, moving notifications, reporting and recurring operations off the request path to keep API latency predictable under load.',
        'Optimised data access with Redis caching and refined MongoDB and PostgreSQL query design, cutting repeated reads and improving response times on the highest-traffic endpoints.',
        'Automated releases by containerising services with Docker and building GitLab CI/CD pipelines, replacing manual deployment steps with repeatable, reviewable builds across environments.',
        'Operated production workloads on AWS, Azure AKS and DigitalOcean, fronted by Nginx reverse proxies and Cloudflare DNS, SSL and CDN for resilient traffic handling.',
        'Localised products for bilingual English/Arabic audiences with full RTL support, extending client reach across MENA markets.',
        'Led delivery end to end as the sole technical owner — requirements, architecture, estimation, code review and production support — for clients without an in-house engineering team.',
      ],
      ar: [
        'صمّمت وسلّمت أكثر من ٩ منصات ويب إنتاجية من طرف إلى طرف لعملاء في العقارات والتعليم والتجارة الإلكترونية والخدمات عند الطلب، مالكاً كل شيء من نموذج البيانات إلى الواجهة المنشورة.',
        'صمّمت واجهات خلفية متعددة المستأجرين على NestJS و Node.js، بعزل بيانات كل مستأجر وإعداداته على قاعدة كود مشتركة، فأمكن إلحاق عملاء جدد دون تفريع المنتج.',
        'هندست واجهات REST آمنة بمصادقة JWT وتحكّم بالوصول حسب الدور وتسجيل تدقيق، تفرض مبدأ الحد الأدنى من الصلاحيات عبر ستة أدوار مستخدمين، وتُنشئ سجلاً قابلاً للتتبّع للعملاء الخاضعين لمتطلبات امتثال.',
        'هندست واجهات أمامية مؤسسية على React 18/19 و Next.js — منها منصة CRM بأكثر من ١٤٤ صفحة ولوحات متعددة الأدوار لستة أنواع مستخدمين — باستخدام Redux Toolkit و RTK Query و TanStack Query لإبقاء الواجهات الكبيرة قابلة للتنبؤ والصيانة.',
        'سلّمت محادثة لحظية وإشعارات وتتبّع طلبات مباشراً عبر Socket.IO، مستبدلاً الاستطلاع الدوري بتحديثات مدفوعة بالأحداث تبقي اللوحات التشغيلية محدّثة.',
        'دمجت فوترة واشتراكات Stripe، وهوية Keycloak، و Firebase، ورسائل Twilio، وبث Agora و LiveKit، و Google Maps و Mapbox، موسّعاً قدرة المنتج دون إعادة بناء الخدمات الأساسية.',
        'وسّعت أحمال العمل غير المتزامنة بطوابير BullMQ ومهام cron مجدولة، ناقلاً الإشعارات والتقارير والعمليات المتكرّرة خارج مسار الطلب لإبقاء زمن استجابة الـ API قابلاً للتنبؤ تحت الحِمل.',
        'حسّنت الوصول إلى البيانات بتخزين Redis المؤقت وإعادة ضبط تصميم استعلامات MongoDB و PostgreSQL، فقلّت القراءات المتكرّرة وتحسّنت أزمنة الاستجابة في أكثر النقاط ازدحاماً.',
        'أتمتت الإصدارات بتحويل الخدمات إلى حاويات Docker وبناء خطوط GitLab CI/CD، مستبدلاً خطوات النشر اليدوية ببناءات قابلة للتكرار والمراجعة عبر البيئات.',
        'شغّلت أحمال العمل الإنتاجية على AWS و Azure AKS و DigitalOcean، خلف وكلاء Nginx العكسيين و Cloudflare للـ DNS و SSL و CDN، لمعالجة مرور آمنة ومرِنة.',
        'وطّنت المنتجات لجمهور ثنائي اللغة عربي/إنجليزي بدعم RTL كامل، موسّعاً وصول العملاء عبر أسواق المنطقة.',
        'قدت التسليم من طرف إلى طرف بصفتي المالك التقني الوحيد — المتطلبات والمعمارية والتقدير ومراجعة الكود ودعم الإنتاج — لعملاء بلا فريق هندسي داخلي.',
      ],
    },
  },
]

export interface Capability {
  title: Localized
  body: Localized
  items: string[]
}

export const capabilities: Capability[] = [
  {
    title: {
      en: 'Cloud deployment',
      ar: 'النشر السحابي',
    },
    body: {
      en: 'Deployed and maintained production applications on AWS, Azure AKS, DigitalOcean and Hostinger — server provisioning, monitoring and live incident troubleshooting included.',
      ar: 'نشرت وصنت تطبيقات إنتاجية على AWS و Azure AKS و DigitalOcean و Hostinger — بما في ذلك تجهيز الخوادم والمراقبة ومعالجة الأعطال الحيّة.',
    },
    items: ['AWS EC2 / S3', 'Azure AKS', 'DigitalOcean', 'Hostinger'],
  },
  {
    title: {
      en: 'Containers & CI/CD',
      ar: 'الحاويات وخطوط النشر',
    },
    body: {
      en: 'Containerised applications with Docker and built GitLab CI/CD pipelines for automated testing, deployment and release.',
      ar: 'حوّلت التطبيقات إلى حاويات Docker وبنيت خطوط GitLab CI/CD لأتمتة الاختبار والنشر والإصدار.',
    },
    items: ['Docker', 'Kubernetes', 'GitLab CI/CD', 'Automated releases'],
  },
  {
    title: {
      en: 'Edge & networking',
      ar: 'الحافة والشبكات',
    },
    body: {
      en: 'Configured Nginx reverse proxies and managed domains, DNS, SSL and CDN through Cloudflare to improve availability and transport security.',
      ar: 'أعددت وكلاء Nginx العكسيين وأدرت النطاقات و DNS و SSL و CDN عبر Cloudflare لتحسين التوافرية وأمان النقل.',
    },
    items: ['Nginx', 'Cloudflare DNS', 'SSL / TLS', 'CDN'],
  },
]

export interface Education {
  title: Localized
  institution: Localized
  year?: string
}

export const education: Education[] = [
  {
    title: { en: 'Bachelor of Commerce', ar: 'بكالوريوس تجارة' },
    institution: {
      en: 'Nile Academy for Science, Egypt',
      ar: 'أكاديمية النيل للعلوم، مصر',
    },
    year: '2012',
  },
  {
    title: {
      en: 'Web Development — Advanced, Professional & Challenger tracks',
      ar: 'تطوير الويب — المسارات المتقدم والاحترافي والتحدّي',
    },
    institution: {
      en: 'Udacity (FWD Initiative)',
      ar: 'يوداسيتي (مبادرة مستقبلنا رقمي)',
    },
  },
]
