import type { Dictionary } from './en'

/**
 * Arabic dictionary. Typed against the English shape so the compiler catches
 * any key that drifts out of sync. Copy is written natively rather than
 * translated literally — the register should read as though authored in Arabic.
 */
export const ar: Dictionary = {
  meta: {
    title: 'أحمد البقلي — مهندس Full-Stack أول',
    description:
      'مهندس Full-Stack أول بخبرة تتجاوز خمس سنوات في بناء منصات SaaS متعددة المستأجرين على Node.js و NestJS و React و Next.js.',
  },

  nav: {
    home: 'الرئيسية',
    profiles: 'البروفايلات',
    work: 'الأعمال',
    about: 'نبذة',
    stack: 'الأدوات',
    experience: 'الخبرة',
    contact: 'تواصل',
    resume: 'السيرة الذاتية',
    openMenu: 'فتح القائمة',
    closeMenu: 'إغلاق القائمة',
    skipToContent: 'تخطٍ إلى المحتوى',
  },

  actions: {
    switchToLight: 'التبديل إلى الوضع الفاتح',
    switchToDark: 'التبديل إلى الوضع الداكن',
    switchLanguage: 'Switch to English',
    downloadResume: 'تحميل السيرة الذاتية',
    backToTop: 'العودة إلى الأعلى',
    copy: 'نسخ',
    copied: 'تم النسخ',
  },

  hero: {
    available: 'متاح لأدوار أولى — عن بُعد أو انتقال',
    name: 'أحمد البقلي',
    role: 'مهندس Full-Stack أول',
    rotating: [
      'منصات SaaS متعددة المستأجرين',
      'أنظمة لحظية تتحمّل الحِمل',
      'واجهات React مؤسسية',
      'بنية سحابية إنتاجية',
    ],
    lead: 'أصمّم ',
    leadSuffix: ' — وأملكها من أولها لآخرها، من نموذج البيانات إلى الواجهة المنشورة.',
    summary:
      'خمس سنوات في بناء أنظمة إنتاجية على Node.js و NestJS و React و Next.js. المالك التقني الوحيد لتسع منصات في العقارات والتعليم والتجارة الإلكترونية والخدمات عند الطلب.',
    ctaWork: 'استعرض الأعمال',
    ctaContact: 'تواصل معي',
    scrollHint: 'مرّر',
  },

  tracks: {
    hiringFor: 'توظّف لدور',
    switchLabel: 'اختر البروفايل المطابق للدور',
    eyebrow: 'بروفايلان، عمل واحد',
    title: 'عمق في الـ Backend واتساع في الـ Full-Stack',
    subtitle:
      'المنصات التسع نفسها، مقروءة بطريقتين. اختر العدسة المطابقة للدور الذي توظّف له — الأدلة أدناه لا تتغيّر، الإطار وحده هو الذي يتغيّر.',
    downloadCv: 'تحميل هذه السيرة',
    viewing: 'المعروض حالياً',
    competencies: 'الكفاءات الأساسية',
  },

  metrics: {
    eyebrow: 'بالأرقام',
    years: 'سنوات في الإنتاج',
    platforms: 'منصة إنتاجية مملوكة',
    modules: 'موديول في الواجهة الخلفية',
    pages: 'صفحة في واجهة واحدة',
  },

  about: {
    eyebrow: 'نبذة',
    title: 'هندسة تصمد أمام الإنتاج الحقيقي',
    paragraphs: [
      'أبني النظام كاملاً — المخطط، والـ API، ونموذج الصلاحيات، ومعمارية الحالة، وخط النشر، والخادم الذي يستقر عليه. هذا الاتساع مقصود: يتيح لي اتخاذ القرار عند الطبقة التي يخصّها فعلاً، بدل الالتفاف حول قيدٍ فرضه غيري.',
      'معظم عملي كان بصفتي المالك التقني الوحيد لشركات بلا فريق هندسي داخلي. المتطلبات، والمعمارية، والتقدير، ومراجعة الكود، ودعم الإنتاج — بما في ذلك العطل الذي يقع الثانية فجراً. حين تكون المهندس الوحيد، تتعلّم بسرعة أي الاختصارات يمكن تحمّل ثمنها، وأيها يُحصّل منك الفاتورة مضاعفة.',
      'الأنظمة التي تهمّني هي غير اللامعة: حدٌّ بين المستأجرين لا يتسرّب، ونموذج صلاحيات يفهمه غير المهندس، وطبقة تخزين مؤقت تفشل بأمان. أُفضّل أن أسلّم شيئاً قابلاً للصيانة على أن أسلّم شيئاً ذكياً.',
    ],
    facts: {
      location: 'الموقع',
      locationValue: 'الدقهلية، مصر · توقيت +2',
      availability: 'الإتاحة',
      availabilityValue: 'عن بُعد أو انتقال (الخليج، أوروبا، بريطانيا)',
      languages: 'اللغات',
      languagesValue: 'العربية (الأم) · الإنجليزية (احترافية)',
      focus: 'التركيز الحالي',
      focusValue: 'NestJS · Next.js · Kubernetes',
    },
    portraitAlt: 'صورة أحمد البقلي',
  },

  stack: {
    eyebrow: 'الأدوات التقنية',
    title: 'ما أبني به',
    subtitle:
      'أدوات نشرتها في الإنتاج وأستطيع الدفاع عنها في مراجعة تصميم — لا قائمة بأشياء قرأت عنها.',
    groups: {
      languages: 'اللغات',
      frontend: 'الواجهة الأمامية',
      backend: 'الواجهة الخلفية',
      data: 'البيانات والتخزين المؤقت',
      cloud: 'السحابة',
      devops: 'DevOps',
      integrations: 'التكاملات',
      practices: 'الممارسات',
    },
  },

  work: {
    eyebrow: 'أعمال مختارة',
    title: 'أنظمة في الإنتاج',
    subtitle:
      'خمس منصات صمّمتها وبنيتها ونشرتها. كل دراسة حالة تتناول القيد، والمعمارية، والثمن.',
    viewCase: 'اقرأ دراسة الحالة',
    role: 'الدور',
    year: 'المدة',
    allProjects: 'استعرض كل المشاريع',
  },

  caseStudy: {
    back: 'رجوع إلى الأعمال',
    overview: 'نظرة عامة',
    challenge: 'القيد',
    approach: 'المقاربة',
    architecture: 'المعمارية',
    highlights: 'ما بنيته',
    impact: 'الأثر',
    stack: 'الأدوات',
    decisions: 'قرارات محورية',
    next: 'دراسة الحالة التالية',
    previous: 'دراسة الحالة السابقة',
    role: 'دوري',
    domain: 'المجال',
    scale: 'الحجم',
  },

  experience: {
    eyebrow: 'الخبرة',
    title: 'كيف أعمل',
    subtitle:
      'ارتباط واحد ممتد، وعملاء كُثر، وملكية كاملة لكل طبقة بين قاعدة البيانات وسجل الـ DNS.',
    present: 'حتى الآن',
    responsibilities: 'ما تضمّنه ذلك',
  },

  capabilities: {
    eyebrow: 'أبعد من الكود',
    title: 'السحابة والنشر وما لا يُعرض في العروض التقديمية',
    subtitle: 'النشر ميزة بحد ذاته. هذه هي الأشياء التي أملكها بعد دمج الـ pull request.',
  },

  education: {
    eyebrow: 'التعليم والتدريب',
    title: 'كيف وصلت إلى هنا',
  },

  contact: {
    eyebrow: 'تواصل',
    title: 'لنبنِ شيئاً يدوم',
    subtitle:
      'منفتح على أدوار Full-Stack و Backend أولى — عن بُعد أو انتقال إلى الخليج أو أوروبا أو بريطانيا. أردّ على كل رسالة خلال يوم.',
    directTitle: 'تواصل مباشرة',
    formTitle: 'أو أرسل رسالة',
    fields: {
      name: 'الاسم',
      namePlaceholder: 'اسمك',
      email: 'البريد الإلكتروني',
      emailPlaceholder: 'you@company.com',
      message: 'الرسالة',
      messagePlaceholder: 'ما الذي تبنيه؟',
    },
    send: 'إرسال الرسالة',
    sending: 'جارٍ الإرسال…',
    success: 'تم إرسال الرسالة. سأعود إليك خلال يوم.',
    error: 'حدث خطأ ما. راسلني مباشرة على dev.ahmed.elbakly@gmail.com.',
    validation: {
      name: 'من فضلك أدخل اسمك.',
      email: 'من فضلك أدخل بريداً إلكترونياً صحيحاً.',
      message: 'من فضلك اكتب رسالة قصيرة.',
    },
    channels: {
      email: 'البريد',
      phone: 'الهاتف',
      linkedin: 'لينكدإن',
      github: 'جيت هَب',
    },
  },

  footer: {
    tagline: 'مهندس Full-Stack أول',
    builtWith: 'مبني بـ React و TypeScript و Vite.',
    rights: 'جميع الحقوق محفوظة.',
    sections: 'الأقسام',
    elsewhere: 'روابط',
  },

  notFound: {
    code: '٤٠٤',
    title: 'هذا المسار غير موجود',
    body: 'الصفحة التي تبحث عنها نُقلت أو أُعيدت تسميتها أو لم تُنشر أصلاً.',
    cta: 'العودة إلى الرئيسية',
  },
}
