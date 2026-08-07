import type { Localized } from '@/i18n/types'

export interface ArchitectureLayer {
  label: Localized
  items: string[]
}

export interface ProjectMetric {
  value: string
  label: Localized
}

export interface ProjectDecision {
  title: Localized
  body: Localized
}

export interface Project {
  slug: string
  name: string
  /** Short descriptor shown under the name on cards and case study headers. */
  kind: Localized
  domain: Localized
  role: Localized
  period: string
  /** One line that has to earn the click. */
  tagline: Localized
  summary: Localized
  challenge: Localized
  approach: Localized
  highlights: Localized<string[]>
  metrics: ProjectMetric[]
  architecture: {
    layers: ArchitectureLayer[]
    crosscutting: string[]
  }
  decisions: ProjectDecision[]
  stack: string[]
  /** Primary stack chips shown on the card — a readable subset. */
  featuredStack: string[]
}

export const projects: Project[] = [
  /* ======================================================================== */
  {
    slug: 'coonex',
    name: 'Coonex',
    kind: {
      en: 'Real Estate CRM SaaS',
      ar: 'منصة CRM عقارية بنموذج SaaS',
    },
    domain: { en: 'Real estate', ar: 'العقارات' },
    role: { en: 'Full-Stack Engineer', ar: 'مهندس Full-Stack' },
    period: '2023 — 2024',
    tagline: {
      en: 'A multi-tenant CRM that replaced spreadsheet-driven agency workflows — 144 pages, 12 business modules, one permission model.',
      ar: 'منصة CRM متعددة المستأجرين حلّت محل إدارة الوكالات عبر جداول البيانات — ١٤٤ صفحة، و١٢ موديول، ونموذج صلاحيات واحد.',
    },
    summary: {
      en: 'Coonex is a subscription CRM for real estate agencies, covering lead management, campaigns, sales pipelines, meetings, documents and analytics. It ships as two products: the tenant-facing platform and a separate B2B admin dashboard the operator uses to run tenants, invoices and revenue.',
      ar: 'كونكس منصة CRM اشتراكية للوكالات العقارية، تغطي إدارة العملاء المحتملين والحملات وخطوط البيع والاجتماعات والمستندات والتحليلات. تُسلَّم كمنتجين: المنصة الموجّهة للمستأجرين، ولوحة تحكم B2B منفصلة يديرها المشغّل للمستأجرين والفواتير والإيرادات.',
    },
    challenge: {
      en: 'Agencies were running six-figure property portfolios out of spreadsheets. Every agency wanted its own fields, its own pipeline stages and its own idea of who may see a commission figure — but they all had to run on one codebase, one deployment and one support budget.',
      ar: 'كانت الوكالات تدير محافظ عقارية ضخمة عبر جداول بيانات. كل وكالة أرادت حقولها الخاصة، ومراحل خط بيع خاصة بها، وتصوّرها الخاص لمن يحق له رؤية رقم العمولة — لكنها جميعاً كان عليها أن تعمل على قاعدة كود واحدة، ونشرٍ واحد، وميزانية دعم واحدة.',
    },
    approach: {
      en: 'I drew the tenant boundary at the data layer and enforced authorisation declaratively with CASL, so a permission is defined once and honoured identically by the API and the UI. The frontend is organised by business module rather than by file type, which is what kept 144 pages navigable as the surface area grew.',
      ar: 'رسمت حدّ المستأجر عند طبقة البيانات، وفرضت التفويض بصورة تصريحية عبر CASL، فتُعرَّف الصلاحية مرة واحدة ويلتزم بها الـ API والواجهة على حدٍّ سواء. نُظّمت الواجهة الأمامية حسب موديول العمل لا حسب نوع الملف، وهو ما أبقى ١٤٤ صفحة قابلة للتصفّح مع اتساع النطاق.',
    },
    highlights: {
      en: [
        'Multi-tenant CRM managing 500+ properties and 1,000+ leads across lead management, campaigns, sales pipelines, meetings, documents and analytics.',
        'Enterprise frontend of 144+ pages and 12+ business modules with CASL-based permissions and a disciplined state architecture.',
        'Stripe billing and subscription management, turning the platform into a self-serve revenue product.',
        'Socket.IO notification layer delivering instant updates instead of polling.',
        'Separate B2B admin dashboard with RBAC, analytics, reporting and invoice management for central tenant and revenue control.',
      ],
      ar: [
        'منصة CRM متعددة المستأجرين تدير أكثر من ٥٠٠ عقار وأكثر من ١٠٠٠ عميل محتمل، عبر إدارة العملاء والحملات وخطوط البيع والاجتماعات والمستندات والتحليلات.',
        'واجهة أمامية مؤسسية بأكثر من ١٤٤ صفحة و١٢ موديول عمل، مع صلاحيات مبنية على CASL ومعمارية حالة منضبطة.',
        'فوترة واشتراكات عبر Stripe، حوّلت المنصة إلى منتج إيرادات ذاتي الخدمة.',
        'طبقة إشعارات عبر Socket.IO تُسلّم التحديثات لحظياً بدل الاستطلاع الدوري.',
        'لوحة تحكم B2B منفصلة بصلاحيات RBAC وتحليلات وتقارير وإدارة فواتير، للتحكم المركزي في المستأجرين والإيرادات.',
      ],
    },
    metrics: [
      { value: '144+', label: { en: 'Frontend pages', ar: 'صفحة في الواجهة' } },
      { value: '12+', label: { en: 'Business modules', ar: 'موديول عمل' } },
      { value: '500+', label: { en: 'Properties managed', ar: 'عقار مُدار' } },
      { value: '1,000+', label: { en: 'Leads tracked', ar: 'عميل محتمل' } },
    ],
    architecture: {
      layers: [
        {
          label: { en: 'Client', ar: 'العميل' },
          items: ['Next.js 13', 'React 18', 'Redux Toolkit', 'Material UI'],
        },
        {
          label: { en: 'API', ar: 'الواجهة البرمجية' },
          items: ['Node.js', 'Express.js', 'REST', 'Socket.IO'],
        },
        {
          label: { en: 'Data', ar: 'البيانات' },
          items: ['MongoDB', 'Tenant-scoped collections'],
        },
        {
          label: { en: 'Billing', ar: 'الفوترة' },
          items: ['Stripe subscriptions', 'Invoice pipeline'],
        },
      ],
      crosscutting: ['CASL authorisation', 'JWT auth', 'Audit trail', 'Multi-tenant isolation'],
    },
    decisions: [
      {
        title: {
          en: 'CASL instead of hand-rolled role checks',
          ar: 'CASL بدل فحوص الأدوار اليدوية',
        },
        body: {
          en: 'Twelve modules times six roles is seventy-two permission combinations — far past the point where role checks scattered through the codebase stay correct. Declaring abilities once and deriving both API guards and UI affordances from them meant a new module inherited the model instead of reimplementing it.',
          ar: 'اثنا عشر موديولاً في ستة أدوار يساوي اثنتين وسبعين تركيبة صلاحيات — أبعد بكثير من النقطة التي تبقى عندها فحوص الأدوار المتناثرة في الكود صحيحة. تعريف القدرات مرة واحدة واشتقاق حرّاس الـ API وعناصر الواجهة منها جعل أي موديول جديد يرث النموذج بدل أن يعيد بناءه.',
        },
      },
      {
        title: {
          en: 'Shared database, enforced tenant scope',
          ar: 'قاعدة بيانات مشتركة مع نطاق مستأجر مفروض',
        },
        body: {
          en: 'A database per tenant would have made onboarding a migration event and backups a fleet problem. Scoping every query at the data-access layer kept provisioning instant, at the cost of a boundary that has to be enforced in exactly one place — which is a trade I would make again.',
          ar: 'قاعدة بيانات لكل مستأجر كانت ستحوّل الإلحاق إلى عملية ترحيل، والنسخ الاحتياطي إلى مشكلة أسطول. حصر كل استعلام عند طبقة الوصول للبيانات أبقى التهيئة لحظية، مقابل حدٍّ يجب فرضه في موضع واحد بالضبط — وهي مقايضة سأعيدها.',
        },
      },
      {
        title: {
          en: 'Module-first frontend structure',
          ar: 'بنية واجهة أمامية تبدأ من الموديول',
        },
        body: {
          en: 'Organising by feature rather than by file type is what let a 144-page application stay legible. A developer opening the campaigns module finds its routes, state, API calls and components in one place, and can change it without reading the other eleven.',
          ar: 'التنظيم حسب الميزة لا حسب نوع الملف هو ما أبقى تطبيقاً من ١٤٤ صفحة مقروءاً. المطوّر الذي يفتح موديول الحملات يجد مساراته وحالته واستدعاءاته ومكوّناته في مكان واحد، ويستطيع تعديله دون قراءة الأحد عشر الآخرين.',
        },
      },
    ],
    stack: [
      'Next.js 13',
      'React 18',
      'TypeScript',
      'Node.js',
      'Express.js',
      'MongoDB',
      'Redux Toolkit',
      'Material UI',
      'CASL',
      'Socket.IO',
      'Stripe',
    ],
    featuredStack: ['Next.js 13', 'TypeScript', 'MongoDB', 'CASL', 'Stripe'],
  },

  /* ======================================================================== */
  {
    slug: 'schoolie',
    name: 'Schoolie',
    kind: {
      en: 'Multi-Tenant School Management SaaS',
      ar: 'منصة إدارة مدارس متعددة المستأجرين',
    },
    domain: { en: 'EdTech', ar: 'تقنيات التعليم' },
    role: { en: 'Full-Stack Engineer', ar: 'مهندس Full-Stack' },
    period: '2023 — 2025',
    tagline: {
      en: '43 backend modules and six distinct user roles, unified into one platform that a school actually runs on.',
      ar: '٤٣ موديول خلفي وستة أدوار مستخدمين مختلفة، موحّدة في منصة واحدة تُدار بها المدرسة فعلياً.',
    },
    summary: {
      en: 'Schoolie replaces the pile of disconnected tools a school runs on — attendance sheets, payroll spreadsheets, fee ledgers, parent WhatsApp groups — with a single multi-tenant platform spanning academics, attendance, payroll, fee collection, communication and reporting.',
      ar: 'تستبدل «سكولي» كومة الأدوات المنفصلة التي تُدار بها المدرسة — كشوف الحضور، وجداول الرواتب، ودفاتر الرسوم، ومجموعات أولياء الأمور — بمنصة واحدة متعددة المستأجرين تغطي الشؤون الأكاديمية والحضور والرواتب وتحصيل الرسوم والتواصل والتقارير.',
    },
    challenge: {
      en: 'Six user types — admin, school manager, teacher, student, parent and driver — need the same platform to look like six different products. A parent must never see another family’s fee balance; a driver needs a route and nothing else. Getting that wrong is not a bug report, it is a data breach.',
      ar: 'ستة أنواع من المستخدمين — المدير، ومدير المدرسة، والمعلّم، والطالب، وولي الأمر، والسائق — يحتاجون أن تبدو المنصة نفسها ستة منتجات مختلفة. يجب ألّا يرى ولي أمر رصيد رسوم أسرة أخرى؛ والسائق يحتاج مساراً ولا شيء غيره. الخطأ هنا ليس بلاغ عطل، بل تسريب بيانات.',
    },
    approach: {
      en: 'NestJS gave the backend a module boundary I could actually enforce: 43 modules, each owning its own controllers, services and guards. Permissions are granular per role and checked at the service layer, not the route, so an internal caller cannot accidentally bypass them. The frontend mirrors that split into 25+ modules with RTK Query handling the cache so six role-specific dashboards do not each reinvent data fetching.',
      ar: 'أعطى NestJS للواجهة الخلفية حدّ موديول يمكن فرضه فعلاً: ٤٣ موديولاً، كلٌّ يملك متحكّماته وخدماته وحرّاسه. الصلاحيات دقيقة لكل دور وتُفحص عند طبقة الخدمة لا عند المسار، فلا يستطيع مُستدعٍ داخلي تجاوزها سهواً. تعكس الواجهة الأمامية ذلك التقسيم في أكثر من ٢٥ موديولاً، مع RTK Query لإدارة التخزين المؤقت حتى لا تعيد ست لوحات دورية اختراع جلب البيانات.',
    },
    highlights: {
      en: [
        '43 backend modules spanning academics, attendance, payroll, fee collection, communication and reporting.',
        '25+ module multi-role frontend for Admin, School Manager, Teacher, Student, Parent and Driver, with granular RBAC restricting sensitive data per role.',
        'Real-time chat, push notifications, maps and analytics dashboards.',
        'Complete English/Arabic support with full RTL, widening adoption across bilingual MENA schools.',
        'Cron-automated recurring operations, Twilio, Firebase and AWS S3 integrations, and Excel export pipelines.',
        'Core services covered with Jest tests.',
      ],
      ar: [
        '٤٣ موديولاً خلفياً تغطي الشؤون الأكاديمية والحضور والرواتب وتحصيل الرسوم والتواصل والتقارير.',
        'واجهة متعددة الأدوار بأكثر من ٢٥ موديولاً للمدير ومدير المدرسة والمعلّم والطالب وولي الأمر والسائق، بصلاحيات RBAC دقيقة تحصر البيانات الحساسة لكل دور.',
        'محادثة لحظية وإشعارات فورية وخرائط ولوحات تحليلات.',
        'دعم كامل للعربية والإنجليزية مع RTL كامل، وسّع الانتشار في المدارس ثنائية اللغة بالمنطقة.',
        'عمليات دورية مؤتمتة عبر cron، وتكاملات Twilio و Firebase و AWS S3، وخطوط تصدير إلى Excel.',
        'تغطية الخدمات الأساسية باختبارات Jest.',
      ],
    },
    metrics: [
      { value: '43', label: { en: 'Backend modules', ar: 'موديول خلفي' } },
      { value: '25+', label: { en: 'Frontend modules', ar: 'موديول أمامي' } },
      { value: '6', label: { en: 'User roles', ar: 'أدوار مستخدمين' } },
      { value: '2', label: { en: 'Languages, full RTL', ar: 'لغتان بدعم RTL' } },
    ],
    architecture: {
      layers: [
        {
          label: { en: 'Client', ar: 'العميل' },
          items: ['React 18', 'Redux Toolkit', 'RTK Query', 'Tailwind CSS'],
        },
        {
          label: { en: 'API', ar: 'الواجهة البرمجية' },
          items: ['NestJS', '43 modules', 'Guards & interceptors'],
        },
        {
          label: { en: 'Data', ar: 'البيانات' },
          items: ['MongoDB', 'AWS S3', 'Excel export'],
        },
        {
          label: { en: 'Channels', ar: 'القنوات' },
          items: ['Twilio SMS', 'Firebase push', 'Real-time chat'],
        },
      ],
      crosscutting: ['Granular RBAC', 'Cron scheduling', 'i18n & RTL', 'Jest coverage'],
    },
    decisions: [
      {
        title: {
          en: 'NestJS for a backend that would outgrow one person',
          ar: 'NestJS لواجهة خلفية ستتجاوز شخصاً واحداً',
        },
        body: {
          en: 'Forty-three modules is where framework opinion starts paying for itself. NestJS’s dependency injection and module system meant new features arrived as self-contained units with their own guards, instead of accreting onto a growing pile of Express middleware.',
          ar: 'ثلاثة وأربعون موديولاً هي النقطة التي يبدأ فيها رأي إطار العمل بتسديد ثمنه. حقن التبعيات ونظام الموديولات في NestJS جعل الميزات الجديدة تصل كوحدات مكتفية بذاتها ولها حرّاسها، بدل التراكم فوق كومة متنامية من وسائط Express.',
        },
      },
      {
        title: {
          en: 'Permission checks at the service layer',
          ar: 'فحص الصلاحيات عند طبقة الخدمة',
        },
        body: {
          en: 'Route guards protect the front door and nothing else. Pushing authorisation down to the services meant a background job, a cron task and an HTTP request all pass through the same check — which is the only version of this that survives a year of feature work.',
          ar: 'حرّاس المسارات تحمي الباب الأمامي لا أكثر. دفع التفويض إلى الخدمات جعل المهمة الخلفية ومهمة cron وطلب HTTP تمرّ جميعها بالفحص ذاته — وهي النسخة الوحيدة التي تصمد عاماً من العمل على الميزات.',
        },
      },
      {
        title: {
          en: 'RTL treated as layout, not translation',
          ar: 'التعامل مع RTL كتخطيط لا كترجمة',
        },
        body: {
          en: 'Arabic support that only swaps strings breaks the moment a table, a chart axis or a progress bar renders. Building on logical properties from the start meant direction was a document attribute rather than a per-component conditional.',
          ar: 'دعم العربية الذي يبدّل النصوص فقط ينهار لحظة عرض جدول أو محور رسم بياني أو شريط تقدّم. البناء على الخصائص المنطقية منذ البداية جعل الاتجاه سمة على المستند لا شرطاً في كل مكوّن.',
        },
      },
    ],
    stack: [
      'NestJS',
      'React 18',
      'TypeScript',
      'Redux Toolkit',
      'RTK Query',
      'MongoDB',
      'AWS S3',
      'Firebase',
      'Twilio',
      'Tailwind CSS',
      'Jest',
    ],
    featuredStack: ['NestJS', 'React 18', 'RTK Query', 'MongoDB', 'Twilio'],
  },

  /* ======================================================================== */
  {
    slug: '49hub',
    name: '49Hub',
    kind: {
      en: 'Multi-Service Super-App',
      ar: 'تطبيق خدمات شامل',
    },
    domain: { en: 'On-demand services', ar: 'الخدمات عند الطلب' },
    role: { en: 'Backend Engineer', ar: 'مهندس Backend' },
    period: '2024 — 2025',
    tagline: {
      en: 'Six verticals — ride-hailing, delivery, hotels, live streaming, social and marketplace — behind 90+ backend modules in one platform.',
      ar: 'ستة قطاعات — نقل، وتوصيل، وفنادق، وبث مباشر، وتواصل اجتماعي، وسوق — خلف أكثر من ٩٠ موديولاً خلفياً في منصة واحدة.',
    },
    summary: {
      en: '49Hub is a super-app: a single account, wallet and identity spanning ride-hailing, food delivery, hotel booking, live streaming, social networking and a marketplace. I architected the backend services that make those verticals share infrastructure without sharing failure modes.',
      ar: '«49Hub» تطبيق شامل: حساب واحد ومحفظة وهوية واحدة تمتد عبر النقل وتوصيل الطعام وحجز الفنادق والبث المباشر والتواصل الاجتماعي والسوق. صمّمت خدمات الواجهة الخلفية التي تجعل هذه القطاعات تتشارك البنية التحتية دون أن تتشارك أنماط الفشل.',
    },
    challenge: {
      en: 'Six product lines with wildly different load shapes on shared infrastructure. A lunchtime delivery spike must not slow down a live stream; an image-processing job must not hold an API worker hostage. Every vertical also wanted its own payment gateway and its own idea of a transaction.',
      ar: 'ستة خطوط منتجات بأشكال حِمل شديدة الاختلاف على بنية تحتية مشتركة. ذروة توصيل الغداء يجب ألّا تُبطئ بثاً مباشراً؛ ومهمة معالجة صور يجب ألّا تحتجز عامل API. كما أراد كل قطاع بوابة دفع خاصة به وتصوّره الخاص للمعاملة.',
    },
    approach: {
      en: 'Anything that could take longer than a request should left the request path entirely: BullMQ workers and cron jobs absorb media processing, settlement and notification fan-out, so API latency stays a function of the API alone. Redis sits in front of the read-heavy catalogue and geo queries. Access is gated by RBAC with an audit trail, because in a platform that moves money, "who changed this" is a product requirement.',
      ar: 'كل ما قد يستغرق وقتاً أطول مما ينبغي غادر مسار الطلب تماماً: عمّال BullMQ ومهام cron يمتصّون معالجة الوسائط والتسوية وتوزيع الإشعارات، فتبقى زمن استجابة الـ API دالةً في الـ API وحده. ويجلس Redis أمام استعلامات الكتالوج والموقع كثيفة القراءة. ويُضبط الوصول عبر RBAC مع سجل تدقيق، لأن «من غيّر هذا» في منصة تحرّك أموالاً متطلبٌ منتجي لا رفاهية.',
    },
    highlights: {
      en: [
        'Backend services powering 90+ feature modules across ride-hailing, food delivery, hotel booking, live streaming, social networking and marketplace verticals.',
        'Redis caching that cut database load and improved response times on read-heavy paths.',
        'BullMQ workers and cron jobs absorbing heavy work to protect API latency.',
        'RBAC with audit logging across every privileged operation.',
        'Integrations with Agora, LiveKit, Google Maps, Mapbox, Firebase, AWS S3 and multiple payment gateways.',
      ],
      ar: [
        'خدمات خلفية تشغّل أكثر من ٩٠ موديولاً عبر قطاعات النقل وتوصيل الطعام وحجز الفنادق والبث المباشر والتواصل الاجتماعي والسوق.',
        'تخزين مؤقت عبر Redis خفّض الحِمل على قاعدة البيانات وحسّن أزمنة الاستجابة في المسارات كثيفة القراءة.',
        'عمّال BullMQ ومهام cron يمتصّون الأعمال الثقيلة لحماية زمن استجابة الـ API.',
        'صلاحيات RBAC مع تسجيل تدقيق لكل عملية ذات امتياز.',
        'تكاملات مع Agora و LiveKit و Google Maps و Mapbox و Firebase و AWS S3 وعدة بوابات دفع.',
      ],
    },
    metrics: [
      { value: '90+', label: { en: 'Feature modules', ar: 'موديول ميزات' } },
      { value: '6', label: { en: 'Business verticals', ar: 'قطاعات عمل' } },
      { value: 'Redis', label: { en: 'Cache layer', ar: 'طبقة تخزين مؤقت' } },
      { value: 'BullMQ', label: { en: 'Async workers', ar: 'عمّال غير متزامنين' } },
    ],
    architecture: {
      layers: [
        {
          label: { en: 'API', ar: 'الواجهة البرمجية' },
          items: ['Node.js', 'Express.js', 'TypeScript', 'REST'],
        },
        {
          label: { en: 'Async', ar: 'غير المتزامن' },
          items: ['BullMQ workers', 'Cron jobs', 'Notification fan-out'],
        },
        {
          label: { en: 'Data', ar: 'البيانات' },
          items: ['MongoDB', 'Redis cache', 'AWS S3'],
        },
        {
          label: { en: 'Real-time', ar: 'اللحظي' },
          items: ['Socket.IO', 'Agora', 'LiveKit'],
        },
      ],
      crosscutting: ['RBAC', 'Audit logging', 'Payment gateways', 'Geo services'],
    },
    decisions: [
      {
        title: {
          en: 'Queues before horizontal scaling',
          ar: 'الطوابير قبل التوسّع الأفقي',
        },
        body: {
          en: 'The cheapest capacity is work you never do synchronously. Moving media processing, settlement and fan-out onto BullMQ meant the API tier stayed small and predictable — and a delivery-hour spike degraded a queue depth chart rather than a checkout.',
          ar: 'أرخص سعة هي عمل لا تؤديه بالتزامن أصلاً. نقل معالجة الوسائط والتسوية والتوزيع إلى BullMQ أبقى طبقة الـ API صغيرة وقابلة للتنبؤ — وجعل ذروة ساعة التوصيل تُفسد رسماً بيانياً لعمق الطابور بدل أن تُفسد عملية شراء.',
        },
      },
      {
        title: {
          en: 'A cache that fails open',
          ar: 'تخزين مؤقت يفشل بأمان',
        },
        body: {
          en: 'Redis fronts the read-heavy catalogue and geo lookups, but every path still works with an empty cache. A cache that can take the platform down with it is not an optimisation, it is a second database with worse durability guarantees.',
          ar: 'يتصدّر Redis استعلامات الكتالوج والموقع كثيفة القراءة، لكن كل مسار يظل عاملاً مع تخزين مؤقت فارغ. التخزين المؤقت الذي يستطيع إسقاط المنصة معه ليس تحسيناً، بل قاعدة بيانات ثانية بضمانات ديمومة أسوأ.',
        },
      },
      {
        title: {
          en: 'Audit logging as a first-class concern',
          ar: 'سجل التدقيق كاهتمام من الدرجة الأولى',
        },
        body: {
          en: 'On a platform holding balances across six verticals, reconstructing who changed what is not a debugging luxury — it is how disputes get settled. Writing the audit trail alongside the RBAC layer meant every privileged operation was covered by construction rather than by remembering.',
          ar: 'في منصة تحتفظ بأرصدة عبر ستة قطاعات، إعادة بناء «من غيّر ماذا» ليس ترفاً تصحيحياً — بل هو كيف تُحسم النزاعات. كتابة سجل التدقيق جنباً إلى جنب مع طبقة RBAC جعلت كل عملية ذات امتياز مغطّاة بحكم البناء لا بحكم التذكّر.',
        },
      },
    ],
    stack: [
      'Node.js',
      'TypeScript',
      'Express.js',
      'MongoDB',
      'Redis',
      'Socket.IO',
      'BullMQ',
      'AWS S3',
      'Agora',
      'LiveKit',
    ],
    featuredStack: ['Node.js', 'TypeScript', 'Redis', 'BullMQ', 'Socket.IO'],
  },

  /* ======================================================================== */
  {
    slug: 'baladicrm',
    name: 'BaladiCRM',
    kind: {
      en: 'CRM Platform with AI Chatbot Builder',
      ar: 'منصة CRM مع منشئ روبوت محادثة ذكي',
    },
    domain: { en: 'CRM & automation', ar: 'إدارة العملاء والأتمتة' },
    role: { en: 'Frontend Engineer', ar: 'مهندس واجهات أمامية' },
    period: '2024 — 2025',
    tagline: {
      en: 'A visual chatbot flow builder that lets non-engineers ship automated conversations — safely.',
      ar: 'منشئ مسارات محادثة مرئي يتيح لغير المهندسين إطلاق محادثات مؤتمتة — بأمان.',
    },
    summary: {
      en: 'BaladiCRM gives support and sales teams one operational workspace: 10+ business modules, real-time communication and notifications, plus an AI chatbot builder where staff design, train and approve automated conversation flows without touching code.',
      ar: 'تمنح «بلدي CRM» فرق الدعم والمبيعات مساحة عمل تشغيلية واحدة: أكثر من ١٠ موديولات عمل، وتواصل لحظي وإشعارات، إضافة إلى منشئ روبوت محادثة ذكي يصمّم فيه الموظفون مسارات المحادثة ويدرّبونها ويعتمدونها دون لمس الكود.',
    },
    challenge: {
      en: 'A chatbot builder is a state management problem wearing a UI costume. Non-technical staff need to author branching conversation flows, train them, and route them through an approval gate — and a half-configured flow must never reach a real customer.',
      ar: 'منشئ روبوت المحادثة مشكلة إدارة حالة ترتدي زيّ واجهة. يحتاج الموظفون غير التقنيين إلى تأليف مسارات محادثة متفرّعة وتدريبها وتمريرها عبر بوابة اعتماد — ويجب ألّا يصل مسار نصف مُهيّأ إلى عميل حقيقي أبداً.',
    },
    approach: {
      en: 'I designed a Redux architecture of 21+ slices with clear ownership boundaries, so the builder’s draft state, the training state and the live published state are genuinely separate things rather than one object with flags on it. The approval workflow is the seam between them — nothing becomes live without crossing it.',
      ar: 'صمّمت معمارية Redux بأكثر من ٢١ شريحة بحدود ملكية واضحة، فتصبح حالة المسوّدة في المنشئ وحالة التدريب وحالة النشر الحيّ أشياء منفصلة فعلاً لا كائناً واحداً عليه أعلام. وسير الاعتماد هو الوصلة بينها — لا شيء يصير حيّاً دون عبورها.',
    },
    highlights: {
      en: [
        'CRM with 10+ business modules, real-time communication and a notification system in a single operational workspace.',
        'AI-powered chatbot flow builder with training and approval workflows for non-technical staff.',
        'Scalable Redux architecture of 21+ slices with JWT authentication and RBAC, keeping state predictable as module count grew.',
      ],
      ar: [
        'منصة CRM بأكثر من ١٠ موديولات عمل وتواصل لحظي ونظام إشعارات في مساحة عمل تشغيلية واحدة.',
        'منشئ مسارات روبوت محادثة مدعوم بالذكاء الاصطناعي مع سير تدريب واعتماد للموظفين غير التقنيين.',
        'معمارية Redux قابلة للتوسّع بأكثر من ٢١ شريحة مع مصادقة JWT وصلاحيات RBAC، أبقت الحالة قابلة للتنبؤ مع نمو عدد الموديولات.',
      ],
    },
    metrics: [
      { value: '21+', label: { en: 'Redux slices', ar: 'شريحة Redux' } },
      { value: '10+', label: { en: 'Business modules', ar: 'موديول عمل' } },
      { value: 'AI', label: { en: 'Flow builder', ar: 'منشئ مسارات' } },
      { value: 'RBAC', label: { en: 'Access control', ar: 'تحكّم بالوصول' } },
    ],
    architecture: {
      layers: [
        {
          label: { en: 'Shell', ar: 'الهيكل' },
          items: ['React 18', 'Vite', 'Material UI', 'Tailwind CSS'],
        },
        {
          label: { en: 'State', ar: 'الحالة' },
          items: ['Redux Toolkit', '21+ slices', 'Draft / live separation'],
        },
        {
          label: { en: 'Builder', ar: 'المنشئ' },
          items: ['Flow editor', 'Training', 'Approval gate'],
        },
        {
          label: { en: 'Live', ar: 'الحيّ' },
          items: ['Socket.IO', 'Notifications'],
        },
      ],
      crosscutting: ['JWT auth', 'RBAC', 'Real-time sync'],
    },
    decisions: [
      {
        title: {
          en: 'Draft and published state as separate stores',
          ar: 'فصل حالة المسوّدة عن حالة المنشور',
        },
        body: {
          en: 'Modelling "unsaved edits" as a flag on the live flow is how half-written chatbots reach customers. Keeping them as distinct slices made publishing an explicit, auditable transition rather than an accidental side effect of typing.',
          ar: 'نمذجة «التعديلات غير المحفوظة» كعَلَم على المسار الحيّ هي الطريقة التي تصل بها روبوتات نصف مكتوبة إلى العملاء. إبقاؤهما شريحتين متمايزتين جعل النشر انتقالاً صريحاً قابلاً للتدقيق، لا أثراً جانبياً عارضاً للكتابة.',
        },
      },
      {
        title: {
          en: 'Slice boundaries drawn along ownership, not screens',
          ar: 'حدود الشرائح مرسومة حسب الملكية لا حسب الشاشات',
        },
        body: {
          en: 'Twenty-one slices only stays maintainable if each one answers "who is allowed to write to this". Splitting by data ownership rather than by page meant two screens showing the same entity never fought over which copy was true.',
          ar: 'إحدى وعشرون شريحة تبقى قابلة للصيانة فقط إذا أجابت كل واحدة عن «من يحق له الكتابة هنا». التقسيم حسب ملكية البيانات لا حسب الصفحة جعل شاشتين تعرضان الكيان نفسه لا تتنازعان على أي نسخة هي الصحيحة.',
        },
      },
    ],
    stack: [
      'React 18',
      'Redux Toolkit',
      'Socket.IO',
      'Material UI',
      'Tailwind CSS',
      'Vite',
      'JWT',
    ],
    featuredStack: ['React 18', 'Redux Toolkit', 'Socket.IO', 'Vite'],
  },

  /* ======================================================================== */
  {
    slug: 'jumla-luminar',
    name: 'Jumla & Luminar',
    kind: {
      en: 'E-Commerce Platforms',
      ar: 'منصتا تجارة إلكترونية',
    },
    domain: { en: 'E-commerce', ar: 'التجارة الإلكترونية' },
    role: { en: 'Frontend Engineer', ar: 'مهندس واجهات أمامية' },
    period: '2025',
    tagline: {
      en: 'Two commerce products: a multi-vendor delivery dashboard on Azure AKS, and a bilingual storefront tuned on the Next.js App Router.',
      ar: 'منتجا تجارة: لوحة توصيل متعددة البائعين على Azure AKS، وواجهة متجر ثنائية اللغة مضبوطة على Next.js App Router.',
    },
    summary: {
      en: 'Two related engagements. Jumla is a production multi-vendor e-commerce and delivery dashboard with live order tracking. Luminar pairs a feature-based admin dashboard with a multilingual EN/AR corporate site built for full RTL and LTR parity.',
      ar: 'ارتباطان متصلان. «جملة» لوحة تحكم إنتاجية للتجارة متعددة البائعين والتوصيل مع تتبّع طلبات لحظي. و«لومينار» تجمع لوحة تحكم إدارية مبنية على الميزات مع موقع مؤسسي ثنائي اللغة مصمّم لتكافؤ كامل بين RTL و LTR.',
    },
    challenge: {
      en: 'A delivery dashboard is judged on whether the map is right now. Order state changes constantly, several roles watch the same board, and an operator making a dispatch decision from stale data costs a real delivery. On the Luminar side, a bilingual corporate site had to be genuinely fast in both directions, not fast in English and translated in Arabic.',
      ar: 'تُقاس لوحة التوصيل بما إذا كانت الخريطة صحيحة الآن. حالة الطلب تتغيّر باستمرار، وعدة أدوار تراقب اللوحة نفسها، والمشغّل الذي يتخذ قرار إرسال من بيانات قديمة يكلّف توصيلة حقيقية. وعلى جانب «لومينار»، كان على موقع مؤسسي ثنائي اللغة أن يكون سريعاً فعلاً في الاتجاهين، لا سريعاً بالإنجليزية ومترجماً بالعربية.',
    },
    approach: {
      en: 'TanStack Query handles the freshness contract on the dashboard — what is cached, what revalidates, what a stale read is allowed to look like — so the map and the order list never disagree. Luminar is organised feature-first and leans on the App Router’s rendering and image optimisation, with RTL treated as a layout concern from the first commit.',
      ar: 'يتولّى TanStack Query عقد الحداثة في اللوحة — ما يُخزَّن، وما يُعاد التحقق منه، وكيف يُسمح لقراءة قديمة أن تبدو — فلا تختلف الخريطة وقائمة الطلبات. و«لومينار» منظّمة على أساس الميزة وتتكئ على تصيير App Router وتحسين الصور، مع التعامل مع RTL كشأن تخطيطي منذ أول commit.',
    },
    highlights: {
      en: [
        'Jumla — enhanced a production multi-vendor e-commerce and delivery dashboard with real-time order tracking, RBAC and Google Maps geolocation.',
        'Jumla — participated in deployment and maintenance across Docker, Kubernetes and Azure AKS.',
        'Luminar — built a feature-based admin dashboard covering products, orders, payments, revenue reporting, analytics and audit logs.',
        'Luminar — shipped a multilingual EN/AR corporate site with full RTL/LTR support, optimised via the Next.js App Router.',
      ],
      ar: [
        '«جملة» — طوّرت لوحة تحكم إنتاجية للتجارة متعددة البائعين والتوصيل، بتتبّع طلبات لحظي وصلاحيات RBAC وتحديد موقع عبر Google Maps.',
        '«جملة» — شاركت في النشر والصيانة عبر Docker و Kubernetes و Azure AKS.',
        '«لومينار» — بنيت لوحة تحكم إدارية مبنية على الميزات تغطي المنتجات والطلبات والمدفوعات وتقارير الإيرادات والتحليلات وسجلات التدقيق.',
        '«لومينار» — أطلقت موقعاً مؤسسياً ثنائي اللغة بدعم كامل لـ RTL/LTR، مُحسَّناً عبر Next.js App Router.',
      ],
    },
    metrics: [
      { value: '2', label: { en: 'Products shipped', ar: 'منتجان مُسلَّمان' } },
      { value: 'AKS', label: { en: 'Kubernetes on Azure', ar: 'Kubernetes على Azure' } },
      { value: 'EN/AR', label: { en: 'Full RTL parity', ar: 'تكافؤ RTL كامل' } },
      { value: 'Live', label: { en: 'Order tracking', ar: 'تتبّع الطلبات' } },
    ],
    architecture: {
      layers: [
        {
          label: { en: 'Storefront', ar: 'واجهة المتجر' },
          items: ['Next.js App Router', 'React 19', 'Image optimisation'],
        },
        {
          label: { en: 'Dashboard', ar: 'لوحة التحكم' },
          items: ['React 19', 'Redux Toolkit', 'TanStack Query'],
        },
        {
          label: { en: 'Delivery', ar: 'التوصيل' },
          items: ['Docker', 'Kubernetes', 'Azure AKS'],
        },
        {
          label: { en: 'Services', ar: 'الخدمات' },
          items: ['Google Maps', 'Payments', 'Audit logs'],
        },
      ],
      crosscutting: ['RBAC', 'i18n & RTL', 'Real-time tracking'],
    },
    decisions: [
      {
        title: {
          en: 'TanStack Query owns freshness, Redux owns intent',
          ar: 'TanStack Query يملك الحداثة و Redux يملك النية',
        },
        body: {
          en: 'Mixing server cache into the same store as UI intent is how dashboards end up with two sources of truth. Letting one library own "what the server said" and the other own "what the operator is doing" removed an entire class of sync bug.',
          ar: 'خلط ذاكرة الخادم المؤقتة في المخزن ذاته مع نية الواجهة هو ما ينتهي بلوحات التحكم إلى مصدرَي حقيقة. جعل مكتبة تملك «ما قاله الخادم» وأخرى تملك «ما يفعله المشغّل» أزال صنفاً كاملاً من أعطال المزامنة.',
        },
      },
      {
        title: {
          en: 'RTL parity budgeted, not retrofitted',
          ar: 'تكافؤ RTL مُدرج في الميزانية لا مُضاف لاحقاً',
        },
        body: {
          en: 'Retrofitting right-to-left onto a finished layout costs more than building it in, every time. Committing to logical properties and direction-agnostic components from the start made the Arabic site a locale switch rather than a second codebase.',
          ar: 'إضافة الاتجاه من اليمين إلى اليسار على تخطيط منتهٍ تكلّف أكثر من بنائه ضمنه، في كل مرة. الالتزام بالخصائص المنطقية والمكوّنات غير المرتبطة باتجاه منذ البداية جعل الموقع العربي تبديل لغة لا قاعدة كود ثانية.',
        },
      },
    ],
    stack: [
      'React 19',
      'Next.js',
      'TypeScript',
      'Redux Toolkit',
      'TanStack Query',
      'Material UI',
      'Tailwind CSS',
      'Docker',
      'Kubernetes',
      'Azure AKS',
    ],
    featuredStack: ['React 19', 'Next.js', 'TanStack Query', 'Azure AKS'],
  },
]

export function getProject(slug: string | undefined): Project | undefined {
  return projects.find((project) => project.slug === slug)
}

/** Wraps around so the last case study links back to the first. */
export function getAdjacentProjects(slug: string) {
  const index = projects.findIndex((project) => project.slug === slug)
  if (index === -1) return { previous: undefined, next: undefined }
  return {
    previous: projects[(index - 1 + projects.length) % projects.length],
    next: projects[(index + 1) % projects.length],
  }
}
