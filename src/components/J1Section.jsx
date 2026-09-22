import React, { useContext, useEffect, useRef, useState } from 'react';

import {
  FaArrowRight,
  FaBuilding,
  FaCheck,
  FaCheckCircle,
  FaCode,
  FaCopy,
  FaDownload,
  FaEnvelope,
  FaGlobeAmericas,
  FaGoogle,
  FaMicrosoft,
  FaRoute,
  FaTimes,
  FaUserTie,
} from 'react-icons/fa';

import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'motion/react';

import { LanguageContext } from '../context/LanguageContext';
import InteractiveGlobe from './globe/InteractiveGlobe';

const J1Section = () => {
  const { language } = useContext(LanguageContext);
  const [showContactOptions, setShowContactOptions] = useState(false);
  const [emailCopied, setEmailCopied] = useState(false);
  const sectionRef = useRef(null);
  const reducedMotion = useReducedMotion();
  const emailAddress = 'br.aydin@hotmail.com';

  const content = {
    en: {
      eyebrow: 'Global Software Engineering Opportunities',
      title: 'Open to Global Software Engineering Opportunities',
      subtitle: 'Based in Türkiye and open to relocation for the right software engineering opportunity, with particular interest in the United States and the Nordic region.',
      worldTitle: 'Explore Where I’m Open to Building Next',
      worldText: 'I’m interested in product-focused software engineering teams where I can contribute across frontend, full-stack development, testing, performance, and modern engineering workflows.',
      globalMobility: 'Global Mobility',
      drag: 'Drag the globe to explore',
      professionalFocus: 'Professional Focus',
      mobility: 'Mobility',
      mobilityNote: 'Country cards represent professional interest and relocation openness, not current work authorization. Any relocation, visa, sponsorship, or employment pathway would depend on the role and applicable local requirements.',
      eligibilityTitle: 'U.S. J-1 Trainee Pathway',
      eligibilityText: 'My education and professional background have been reviewed by J-1 sponsor organizations, and I have received positive eligibility feedback for the Trainee category in software development. Final eligibility, sponsorship, and program approval remain subject to the designated sponsor and the specific training program.',
      eligibilityBadge: 'U.S. Pathway',
      howItWorks: 'How the J-1 Trainee Path Works',
      steps: [
        { id: 'sponsor', title: 'Designated J-1 Sponsor', description: 'A designated sponsor manages the program process, required documentation, eligibility review, and ongoing program oversight.' },
        { id: 'host', title: 'U.S. Host Company', description: 'The host company provides a structured software-development training environment, professional supervision, and role-specific mentorship.' },
        { id: 'training', title: 'Structured Training Plan', description: 'The program follows defined learning objectives, training phases, evaluations, and professional-development activities rather than operating as ordinary employment.' },
      ],
      whatIBring: 'What I Bring',
      strengths: [
        'Professional software development experience across frontend and full-stack work',
        'Strong foundation in React, TypeScript, JavaScript, Python, APIs, and modern UI architecture',
        'Hands-on experience with automated testing, performance optimization, accessibility, and quality-focused engineering',
        'Ability to independently design, build, test, validate, and ship software products',
        'Product-oriented mindset with strong ownership, technical curiosity, and motivation to grow within an engineering team',
      ],
      ctaTitle: 'Let’s Build Something Valuable',
      ctaText: 'Interested in discussing a software engineering role, international relocation opportunity, or structured U.S. J-1 Trainee pathway?',
      contact: 'Contact me',
      downloadResume: 'Download Resume',
      emailSubject: 'Software Engineering Opportunity - Bora Aydin',
      emailBody: `Hi Bora,

I came across your portfolio and would like to discuss a software engineering opportunity.

Best regards,`,
      contactModalTitle: 'Choose how to contact me',
      contactModalText: 'Start a new email with your preferred email service or copy my email address.',
      openGmail: 'Open with Gmail',
      openOutlook: 'Open with Outlook',
      copyEmail: 'Copy email address',
      emailCopied: 'Email copied',
      close: 'Close',
      contactAria: 'Contact Bora Aydin by email',
      resumeAria: 'Download Bora Aydin resume',
      closeAria: 'Close contact options',
      globeAria: 'Interactive draggable globe showing countries of professional interest',
      countries: [
        {
          id: 'turkey', name: 'Türkiye', lat: 39, lon: 35, priority: 'base', tag: 'Current Base',
          short: 'Current location and professional base',
          description: 'Türkiye is my current base. I’m available for local, remote, and international collaboration while remaining open to relocation for the right long-term engineering opportunity.',
          focus: 'Full-stack and frontend engineering, product development, remote collaboration',
          mobility: 'Current base · Remote-friendly · Open to relocation',
          note: 'This is the starting point for the relocation routes shown on the globe.',
        },
        {
          id: 'usa', name: 'United States', lat: 39, lon: -98, priority: 'high', tag: 'High Interest',
          short: 'Full-time roles + structured J-1 pathway',
          description: 'The U.S. is a major focus for my international search. I’m open to full-time software engineering roles as well as structured J-1 Trainee opportunities when the role and program are a strong fit.',
          focus: 'Product engineering, full-stack development, frontend architecture, testing and performance',
          mobility: 'Open to relocation · Employer / program pathway required',
          note: 'My profile has received positive J-1 Trainee eligibility feedback from sponsor organizations; final approval remains sponsor- and program-specific.',
        },
        {
          id: 'norway', name: 'Norway', lat: 61, lon: 8, priority: 'high', tag: 'Personal Favorite',
          short: 'A particularly meaningful long-term destination',
          description: 'Norway is one of the destinations I feel most strongly connected to personally and would be especially excited to consider professionally. My interest also extends across the wider Nordic region.',
          focus: 'Long-term software engineering roles, product teams, quality-focused development',
          mobility: 'Strong relocation interest · Subject to local work authorization',
          note: 'My interest is both professional and personal: Scandinavia is a region I genuinely admire and would be enthusiastic to experience as a long-term place to live, grow, and contribute professionally.',
        },
        {
          id: 'iceland', name: 'Iceland', lat: 65, lon: -19, priority: 'high', tag: 'Nordic Interest',
          short: 'Part of my broader Nordic interest',
          description: 'Iceland is another destination that strongly appeals to me within the Nordic region. I’d be open to the right software engineering opportunity where international collaboration, product ownership, and engineering quality are valued.',
          focus: 'International product teams, frontend/full-stack engineering, modern web platforms',
          mobility: 'Open to relocation · Subject to local requirements',
        },
        {
          id: 'sweden', name: 'Sweden', lat: 62, lon: 15, priority: 'high', tag: 'Nordic Interest',
          short: 'Strong interest in Nordic opportunities',
          description: 'Sweden is part of my broader interest in Northern Europe. I’m open to software engineering roles that offer meaningful product ownership, strong collaboration, and room for technical growth.',
          focus: 'Product engineering, React/TypeScript, full-stack development',
          mobility: 'Open to relocation · Subject to work authorization',
        },
        {
          id: 'denmark', name: 'Denmark', lat: 56, lon: 10, priority: 'high', tag: 'Nordic Interest',
          short: 'Open to product-focused engineering roles',
          description: 'Denmark is another Nordic destination I would gladly consider for the right engineering role, particularly in teams building thoughtful, user-focused software products.',
          focus: 'Frontend architecture, product engineering, testing and accessibility',
          mobility: 'Open to relocation · Subject to work authorization',
        },
        {
          id: 'finland', name: 'Finland', lat: 64, lon: 26, priority: 'high', tag: 'Nordic Interest',
          short: 'Open to long-term engineering opportunities',
          description: 'Finland is part of the Nordic region I’m especially interested in. I’m open to long-term opportunities that align with my full-stack background and engineering ownership mindset.',
          focus: 'Full-stack development, APIs, testing, performance and product work',
          mobility: 'Open to relocation · Subject to work authorization',
        },
        {
          id: 'germany', name: 'Germany', lat: 51, lon: 10, priority: 'medium', tag: 'European Interest',
          short: 'Open to engineering roles and relocation',
          description: 'Germany is a strong European destination for my international search. I’m interested in software engineering positions where I can contribute across frontend, backend integration, testing, and product delivery.',
          focus: 'Full-stack / frontend engineering, platform work, product development',
          mobility: 'Open to relocation · Subject to local requirements',
        },
        {
          id: 'uk', name: 'United Kingdom', lat: 54, lon: -2, priority: 'medium', tag: 'International Interest',
          short: 'Open to product and platform engineering roles',
          description: 'I’m open to U.K. opportunities that align with my experience in modern web development, product engineering, testing, and performance-focused frontend work.',
          focus: 'React/TypeScript, product engineering, full-stack collaboration',
          mobility: 'Open to relocation · Appropriate work authorization required',
        },
        {
          id: 'canada', name: 'Canada', lat: 56, lon: -106, priority: 'medium', tag: 'International Interest',
          short: 'Open to long-term software engineering opportunities',
          description: 'Canada is another destination I would consider for the right long-term software engineering opportunity, especially in international and product-oriented teams.',
          focus: 'Full-stack engineering, frontend systems, APIs, quality-focused development',
          mobility: 'Open to relocation · Appropriate work authorization required',
        },
        {
          id: 'netherlands', name: 'Netherlands', lat: 52, lon: 5, priority: 'medium', tag: 'European Interest',
          short: 'Open to international product teams',
          description: 'I’m open to opportunities in the Netherlands where international collaboration, modern web engineering, and product ownership are central to the role.',
          focus: 'Frontend/full-stack product engineering, TypeScript, APIs and testing',
          mobility: 'Open to relocation · Subject to local requirements',
        },
      ],
    },

    tr: {
      eyebrow: 'Global Yazılım Mühendisliği Fırsatları',
      title: 'Global Yazılım Mühendisliği Fırsatlarına Açığım',
      subtitle: 'Türkiye’de yaşıyorum ve doğru yazılım mühendisliği fırsatı için taşınmaya açığım. Özellikle ABD ve Nordic bölgesindeki fırsatlara güçlü ilgi duyuyorum.',
      worldTitle: 'Bir Sonraki Adımımı Nerede Atabileceğimi Keşfedin',
      worldText: 'Frontend, full-stack geliştirme, test, performans ve modern mühendislik workflow’larında katkı sağlayabileceğim ürün odaklı yazılım ekipleriyle çalışmak istiyorum.',
      globalMobility: 'Global Mobilite',
      drag: 'Dünyayı sürükleyerek keşfet',
      professionalFocus: 'Profesyonel Odak',
      mobility: 'Mobilite',
      mobilityNote: 'Ülke kartları profesyonel ilgimi ve taşınmaya açıklığımı gösterir; mevcut çalışma izni anlamına gelmez. Taşınma, vize, sponsorluk ve çalışma süreçleri rolün niteliğine ve ilgili ülkenin yürürlükteki gerekliliklerine bağlıdır.',
      eligibilityTitle: 'ABD J-1 Trainee Yolu',
      eligibilityText: 'Eğitim ve profesyonel geçmişim J-1 sponsor kuruluşları tarafından incelendi ve yazılım geliştirme alanındaki Trainee kategorisi için olumlu uygunluk geri bildirimi aldım. Nihai uygunluk, sponsorluk ve program onayı designated sponsor ile ilgili eğitim programının değerlendirmesine bağlıdır.',
      eligibilityBadge: 'ABD Yolu',
      howItWorks: 'J-1 Trainee Süreci Nasıl İşler',
      steps: [
        { id: 'sponsor', title: 'Designated J-1 Sponsor', description: 'Designated sponsor; program sürecini, gerekli belgeleri, uygunluk değerlendirmesini ve program takibini yönetir.' },
        { id: 'host', title: 'ABD’deki Host Şirket', description: 'Host şirket; yazılım geliştirme alanında yapılandırılmış bir eğitim ortamı, profesyonel gözetim ve role uygun mentorluk sağlar.' },
        { id: 'training', title: 'Yapılandırılmış Eğitim Planı', description: 'Program; normal bir istihdam ilişkisi yerine tanımlanmış öğrenme hedefleri, eğitim aşamaları, değerlendirmeler ve profesyonel gelişim faaliyetleri üzerine kurulur.' },
      ],
      whatIBring: 'Katabileceğim Değer',
      strengths: [
        'Frontend ve full-stack geliştirme alanında profesyonel yazılım deneyimi',
        'React, TypeScript, JavaScript, Python, API’ler ve modern UI mimarisi konusunda güçlü teknik temel',
        'Otomatik test, performans optimizasyonu, erişilebilirlik ve kalite odaklı mühendislik deneyimi',
        'Yazılım ürünlerini bağımsız olarak tasarlama, geliştirme, test etme, doğrulama ve yayına alma becerisi',
        'Güçlü sahiplenme duygusu, teknik merak ve profesyonel bir mühendislik ekibinde gelişme motivasyonu',
      ],
      ctaTitle: 'Birlikte Değerli Bir Şey Geliştirelim',
      ctaText: 'Bir yazılım mühendisliği rolü, uluslararası taşınma fırsatı veya yapılandırılmış ABD J-1 Trainee yolu hakkında görüşmek ister misiniz?',
      contact: 'İletişime Geç',
      downloadResume: 'Özgeçmişi İndir',
      emailSubject: 'Yazılım Mühendisliği Fırsatı - Bora Aydin',
      emailBody: `Merhaba Bora,

Portfolyonuzu inceledim ve bir yazılım mühendisliği fırsatı hakkında görüşmek istiyorum.

İyi çalışmalar,`,
      contactModalTitle: 'İletişim yöntemini seçin',
      contactModalText: 'Tercih ettiğiniz e-posta servisiyle yeni bir mesaj oluşturabilir veya e-posta adresimi kopyalayabilirsiniz.',
      openGmail: 'Gmail ile Aç',
      openOutlook: 'Outlook ile Aç',
      copyEmail: 'E-posta Adresini Kopyala',
      emailCopied: 'E-posta Kopyalandı',
      close: 'Kapat',
      contactAria: 'Bora Aydin ile e-posta üzerinden iletişime geç',
      resumeAria: 'Bora Aydin özgeçmişini indir',
      closeAria: 'İletişim seçeneklerini kapat',
      globeAria: 'Profesyonel olarak ilgi duyulan ülkeleri gösteren sürüklenebilir interaktif dünya',
      countries: [
        {
          id: 'turkey', name: 'Türkiye', lat: 39, lon: 35, priority: 'base', tag: 'Mevcut Konum',
          short: 'Yaşadığım ve profesyonel olarak bulunduğum ülke',
          description: 'Türkiye şu an yaşadığım ve profesyonel olarak bulunduğum ülke. Yerel, uzaktan ve uluslararası iş birliklerine açığım; doğru uzun vadeli mühendislik fırsatı için taşınmayı da değerlendirebilirim.',
          focus: 'Full-stack ve frontend mühendisliği, ürün geliştirme, remote iş birliği',
          mobility: 'Mevcut konum · Remote uyumlu · Taşınmaya açık',
          note: 'Dünya üzerindeki taşınma rotalarının başlangıç noktası Türkiye olarak gösteriliyor.',
        },
        {
          id: 'usa', name: 'ABD', lat: 39, lon: -98, priority: 'high', tag: 'Yüksek İlgi',
          short: 'Tam zamanlı roller + yapılandırılmış J-1 yolu',
          description: 'ABD uluslararası iş arayışımın önemli odak noktalarından biri. Uygun rol ve program kapsamında tam zamanlı yazılım mühendisliği pozisyonlarına ve yapılandırılmış J-1 Trainee fırsatlarına açığım.',
          focus: 'Ürün mühendisliği, full-stack geliştirme, frontend mimarisi, test ve performans',
          mobility: 'Taşınmaya açık · İşveren / program yolu gerekli',
          note: 'Profilim J-1 Trainee kategorisi için sponsor kuruluşlardan olumlu uygunluk geri bildirimi aldı; nihai onay sponsor ve programa bağlıdır.',
        },
        {
          id: 'norway', name: 'Norveç', lat: 61, lon: 8, priority: 'high', tag: 'Özel İlgi',
          short: 'Uzun vadede özellikle değerlendirmek istediğim bir ülke',
          description: 'Norveç kişisel olarak en güçlü bağ ve ilgi hissettiğim, profesyonel anlamda da özellikle değerlendirmek istediğim ülkelerden biri. Bu ilgim daha geniş Nordic bölgesine de uzanıyor.',
          focus: 'Uzun vadeli yazılım mühendisliği rolleri, ürün ekipleri, kalite odaklı geliştirme',
          mobility: 'Taşınmaya güçlü ilgi · Yerel çalışma izni gerekliliklerine bağlı',
          note: 'İlgim yalnızca profesyonel değil; İskandinavya uzun vadede yaşamayı, gelişmeyi ve profesyonel olarak katkı sunmayı gerçekten heyecan verici bulduğum bir bölge.',
        },
        {
          id: 'iceland', name: 'İzlanda', lat: 65, lon: -19, priority: 'high', tag: 'Nordic İlgi',
          short: 'Daha geniş Nordic ilgimin önemli parçalarından biri',
          description: 'İzlanda, Nordic bölgesinde kişisel olarak özellikle ilgimi çeken ülkelerden biri. Uluslararası iş birliği, ürün sahipliği ve mühendislik kalitesine önem veren doğru yazılım mühendisliği fırsatına açığım.',
          focus: 'Uluslararası ürün ekipleri, frontend/full-stack mühendisliği, modern web platformları',
          mobility: 'Taşınmaya açık · Yerel gerekliliklere bağlı',
        },
        {
          id: 'sweden', name: 'İsveç', lat: 62, lon: 15, priority: 'high', tag: 'Nordic İlgi',
          short: 'Kuzey Avrupa fırsatlarına güçlü ilgi',
          description: 'İsveç, Kuzey Avrupa’ya yönelik daha geniş profesyonel ilgimin bir parçası. Anlamlı ürün sahipliği, güçlü ekip çalışması ve teknik gelişim imkânı sunan yazılım mühendisliği rollerine açığım.',
          focus: 'Ürün mühendisliği, React/TypeScript, full-stack geliştirme',
          mobility: 'Taşınmaya açık · Çalışma izni gerekliliklerine bağlı',
        },
        {
          id: 'denmark', name: 'Danimarka', lat: 56, lon: 10, priority: 'high', tag: 'Nordic İlgi',
          short: 'Ürün odaklı mühendislik rollerine açık',
          description: 'Danimarka da doğru mühendislik rolü için memnuniyetle değerlendireceğim Nordic ülkelerinden biri; özellikle kullanıcı odaklı ve düşünülmüş yazılım ürünleri geliştiren ekipler ilgimi çekiyor.',
          focus: 'Frontend mimarisi, ürün mühendisliği, test ve erişilebilirlik',
          mobility: 'Taşınmaya açık · Çalışma izni gerekliliklerine bağlı',
        },
        {
          id: 'finland', name: 'Finlandiya', lat: 64, lon: 26, priority: 'high', tag: 'Nordic İlgi',
          short: 'Uzun vadeli mühendislik fırsatlarına açık',
          description: 'Finlandiya özellikle ilgi duyduğum Nordic bölgesinin bir parçası. Full-stack geçmişim ve mühendislik sahiplenme yaklaşımımla örtüşen uzun vadeli fırsatlara açığım.',
          focus: 'Full-stack geliştirme, API’ler, test, performans ve ürün geliştirme',
          mobility: 'Taşınmaya açık · Çalışma izni gerekliliklerine bağlı',
        },
        {
          id: 'germany', name: 'Almanya', lat: 51, lon: 10, priority: 'medium', tag: 'Avrupa İlgi',
          short: 'Mühendislik rolleri ve taşınmaya açık',
          description: 'Almanya uluslararası arayışımda değerlendirdiğim güçlü Avrupa destinasyonlarından biri. Frontend, backend entegrasyonu, test ve ürün teslimi alanlarında katkı sunabileceğim rollere açığım.',
          focus: 'Full-stack / frontend mühendisliği, platform çalışmaları, ürün geliştirme',
          mobility: 'Taşınmaya açık · Yerel gerekliliklere bağlı',
        },
        {
          id: 'uk', name: 'Birleşik Krallık', lat: 54, lon: -2, priority: 'medium', tag: 'Uluslararası İlgi',
          short: 'Ürün ve platform mühendisliği rollerine açık',
          description: 'Modern web geliştirme, ürün mühendisliği, test ve performans odaklı frontend deneyimimle örtüşen Birleşik Krallık fırsatlarına açığım.',
          focus: 'React/TypeScript, ürün mühendisliği, full-stack iş birliği',
          mobility: 'Taşınmaya açık · Uygun çalışma izni gerekli',
        },
        {
          id: 'canada', name: 'Kanada', lat: 56, lon: -106, priority: 'medium', tag: 'Uluslararası İlgi',
          short: 'Uzun vadeli yazılım mühendisliği fırsatlarına açık',
          description: 'Kanada, özellikle uluslararası ve ürün odaklı ekiplerde doğru uzun vadeli yazılım mühendisliği fırsatı için değerlendireceğim ülkelerden biri.',
          focus: 'Full-stack mühendisliği, frontend sistemleri, API’ler, kalite odaklı geliştirme',
          mobility: 'Taşınmaya açık · Uygun çalışma izni gerekli',
        },
        {
          id: 'netherlands', name: 'Hollanda', lat: 52, lon: 5, priority: 'medium', tag: 'Avrupa İlgi',
          short: 'Uluslararası ürün ekiplerine açık',
          description: 'Uluslararası iş birliği, modern web mühendisliği ve ürün sahipliğinin rolün merkezinde olduğu Hollanda fırsatlarına açığım.',
          focus: 'Frontend/full-stack ürün mühendisliği, TypeScript, API’ler ve test',
          mobility: 'Taşınmaya açık · Yerel gerekliliklere bağlı',
        },
      ],
    },

    de: {
      eyebrow: 'Globale Software-Engineering-Möglichkeiten',
      title: 'Offen für globale Software-Engineering-Möglichkeiten',
      subtitle: 'Ich lebe in der Türkei und bin für die passende Software-Engineering-Möglichkeit zu einem Umzug bereit – mit besonderem Interesse an den USA und der nordischen Region.',
      worldTitle: 'Entdecken Sie, wo ich als Nächstes entwickeln könnte',
      worldText: 'Ich interessiere mich für produktorientierte Softwareteams, in denen ich meine Erfahrung in Frontend-, Full-Stack-Entwicklung, Testing, Performance und modernen Engineering-Workflows einbringen kann.',
      globalMobility: 'Globale Mobilität',
      drag: 'Globus ziehen und erkunden',
      professionalFocus: 'Beruflicher Fokus',
      mobility: 'Mobilität',
      mobilityNote: 'Die Länderkarten zeigen berufliches Interesse und Umzugsbereitschaft, nicht eine bestehende Arbeitserlaubnis. Umzug, Visum, Sponsoring und Beschäftigung hängen von der jeweiligen Rolle und den geltenden lokalen Voraussetzungen ab.',
      eligibilityTitle: 'US-J-1-Trainee-Weg',
      eligibilityText: 'Mein Bildungs- und Berufshintergrund wurde von J-1-Sponsororganisationen geprüft, und ich habe positives Feedback zur grundsätzlichen Eignung für die Trainee-Kategorie im Bereich Softwareentwicklung erhalten. Die endgültige Eignung, das Sponsoring und die Programmgenehmigung hängen vom zuständigen Sponsor und dem konkreten Trainingsprogramm ab.',
      eligibilityBadge: 'US-Pfad',
      howItWorks: 'So funktioniert der J-1-Trainee-Weg',
      steps: [
        { id: 'sponsor', title: 'Designated J-1 Sponsor', description: 'Ein anerkannter Sponsor verwaltet den Programmprozess, die erforderlichen Unterlagen, die Eignungsprüfung und die laufende Programmbetreuung.' },
        { id: 'host', title: 'US-Gastunternehmen', description: 'Das Gastunternehmen bietet ein strukturiertes Trainingsumfeld in der Softwareentwicklung, professionelle Betreuung und rollenspezifisches Mentoring.' },
        { id: 'training', title: 'Strukturierter Trainingsplan', description: 'Das Programm basiert auf definierten Lernzielen, Trainingsphasen, Bewertungen und beruflichen Entwicklungsaktivitäten und ist nicht als gewöhnliche Beschäftigung konzipiert.' },
      ],
      whatIBring: 'Was ich mitbringe',
      strengths: [
        'Berufserfahrung in Frontend- und Full-Stack-Softwareentwicklung',
        'Fundierte Kenntnisse in React, TypeScript, JavaScript, Python, APIs und moderner UI-Architektur',
        'Praxiserfahrung mit automatisierten Tests, Performance-Optimierung, Accessibility und qualitätsorientiertem Engineering',
        'Fähigkeit, Softwareprodukte eigenständig zu konzipieren, zu entwickeln, zu testen, zu validieren und bereitzustellen',
        'Produktorientierte Denkweise, starkes Verantwortungsbewusstsein, technische Neugier und Motivation zur Weiterentwicklung im Engineering-Team',
      ],
      ctaTitle: 'Lassen Sie uns etwas Wertvolles entwickeln',
      ctaText: 'Möchten Sie über eine Software-Engineering-Stelle, eine internationale Umzugsmöglichkeit oder einen strukturierten US-J-1-Trainee-Weg sprechen?',
      contact: 'Kontakt aufnehmen',
      downloadResume: 'Lebenslauf herunterladen',
      emailSubject: 'Software-Engineering-Möglichkeit - Bora Aydin',
      emailBody: `Hallo Bora,

ich habe Ihr Portfolio gesehen und würde gerne über eine Software-Engineering-Möglichkeit sprechen.

Viele Grüße,`,
      contactModalTitle: 'Kontaktmethode auswählen',
      contactModalText: 'Öffnen Sie eine neue E-Mail mit Ihrem bevorzugten E-Mail-Dienst oder kopieren Sie meine E-Mail-Adresse.',
      openGmail: 'Mit Gmail öffnen',
      openOutlook: 'Mit Outlook öffnen',
      copyEmail: 'E-Mail-Adresse kopieren',
      emailCopied: 'E-Mail kopiert',
      close: 'Schließen',
      contactAria: 'Bora Aydin per E-Mail kontaktieren',
      resumeAria: 'Lebenslauf von Bora Aydin herunterladen',
      closeAria: 'Kontaktoptionen schließen',
      globeAria: 'Interaktiver drehbarer Globus mit Ländern von beruflichem Interesse',
      countries: [
        {
          id: 'turkey', name: 'Türkei', lat: 39, lon: 35, priority: 'base', tag: 'Aktueller Standort',
          short: 'Aktueller Wohn- und Berufsstandort',
          description: 'Die Türkei ist derzeit mein Wohn- und Berufsstandort. Ich bin für lokale, Remote- und internationale Zusammenarbeit verfügbar und offen für einen Umzug bei der passenden langfristigen Engineering-Möglichkeit.',
          focus: 'Full-Stack- und Frontend-Engineering, Produktentwicklung, Remote-Zusammenarbeit',
          mobility: 'Aktueller Standort · Remote-freundlich · Umzugsbereit',
          note: 'Die auf dem Globus dargestellten Umzugsrouten beginnen an meinem aktuellen Standort in der Türkei.',
        },
        {
          id: 'usa', name: 'USA', lat: 39, lon: -98, priority: 'high', tag: 'Hohes Interesse',
          short: 'Vollzeitrollen + strukturierter J-1-Weg',
          description: 'Die USA sind ein wichtiger Schwerpunkt meiner internationalen Suche. Ich bin für Vollzeitstellen im Software Engineering sowie für strukturierte J-1-Trainee-Möglichkeiten offen, wenn Rolle und Programm gut passen.',
          focus: 'Product Engineering, Full-Stack-Entwicklung, Frontend-Architektur, Testing und Performance',
          mobility: 'Umzugsbereit · Arbeitgeber-/Programmpfad erforderlich',
          note: 'Mein Profil hat positives Eignungsfeedback für die J-1-Trainee-Kategorie erhalten; die endgültige Genehmigung bleibt sponsor- und programmspezifisch.',
        },
        {
          id: 'norway', name: 'Norwegen', lat: 61, lon: 8, priority: 'high', tag: 'Besonderes Interesse',
          short: 'Ein persönlich besonders bedeutendes langfristiges Ziel',
          description: 'Norwegen ist eines der Länder, zu denen ich persönlich die stärkste Verbindung und das größte Interesse empfinde und das ich auch beruflich besonders gerne in Betracht ziehen würde. Dieses Interesse erstreckt sich auch auf die gesamte nordische Region.',
          focus: 'Langfristige Software-Engineering-Rollen, Produktteams, qualitätsorientierte Entwicklung',
          mobility: 'Starkes Umzugsinteresse · Abhängig von lokaler Arbeitserlaubnis',
          note: 'Mein Interesse ist sowohl beruflich als auch persönlich: Skandinavien ist eine Region, in der ich langfristig gerne leben, mich weiterentwickeln und beruflich beitragen würde.',
        },
        {
          id: 'iceland', name: 'Island', lat: 65, lon: -19, priority: 'high', tag: 'Nordisches Interesse',
          short: 'Teil meines breiteren Interesses an der nordischen Region',
          description: 'Island ist ein weiteres Land der nordischen Region, das mich persönlich besonders anspricht. Ich bin offen für passende Software-Engineering-Möglichkeiten mit internationaler Zusammenarbeit, Produktverantwortung und hohem Qualitätsanspruch.',
          focus: 'Internationale Produktteams, Frontend/Full-Stack-Engineering, moderne Webplattformen',
          mobility: 'Umzugsbereit · Abhängig von lokalen Voraussetzungen',
        },
        {
          id: 'sweden', name: 'Schweden', lat: 62, lon: 15, priority: 'high', tag: 'Nordisches Interesse',
          short: 'Starkes Interesse an Möglichkeiten in Nordeuropa',
          description: 'Schweden ist Teil meines breiteren beruflichen Interesses an Nordeuropa. Ich bin offen für Software-Engineering-Rollen mit sinnvoller Produktverantwortung, guter Zusammenarbeit und Raum für technische Entwicklung.',
          focus: 'Product Engineering, React/TypeScript, Full-Stack-Entwicklung',
          mobility: 'Umzugsbereit · Abhängig von Arbeitserlaubnis',
        },
        {
          id: 'denmark', name: 'Dänemark', lat: 56, lon: 10, priority: 'high', tag: 'Nordisches Interesse',
          short: 'Offen für produktorientierte Engineering-Rollen',
          description: 'Dänemark ist ein weiteres nordisches Land, das ich für die passende Engineering-Rolle gerne in Betracht ziehen würde – besonders in Teams, die durchdachte und nutzerorientierte Softwareprodukte entwickeln.',
          focus: 'Frontend-Architektur, Product Engineering, Testing und Accessibility',
          mobility: 'Umzugsbereit · Abhängig von Arbeitserlaubnis',
        },
        {
          id: 'finland', name: 'Finnland', lat: 64, lon: 26, priority: 'high', tag: 'Nordisches Interesse',
          short: 'Offen für langfristige Engineering-Möglichkeiten',
          description: 'Finnland ist Teil der nordischen Region, an der ich besonders interessiert bin. Ich bin offen für langfristige Möglichkeiten, die zu meinem Full-Stack-Hintergrund und meiner Engineering-Ownership-Mentalität passen.',
          focus: 'Full-Stack-Entwicklung, APIs, Testing, Performance und Produktarbeit',
          mobility: 'Umzugsbereit · Abhängig von Arbeitserlaubnis',
        },
        {
          id: 'germany', name: 'Deutschland', lat: 51, lon: 10, priority: 'medium', tag: 'Europäisches Interesse',
          short: 'Offen für Engineering-Rollen und Umzug',
          description: 'Deutschland ist ein wichtiges europäisches Ziel meiner internationalen Suche. Ich interessiere mich für Software-Engineering-Stellen, in denen ich Frontend, Backend-Integration, Testing und Produktbereitstellung verbinden kann.',
          focus: 'Full-Stack-/Frontend-Engineering, Plattformarbeit, Produktentwicklung',
          mobility: 'Umzugsbereit · Abhängig von lokalen Voraussetzungen',
        },
        {
          id: 'uk', name: 'Vereinigtes Königreich', lat: 54, lon: -2, priority: 'medium', tag: 'Internationales Interesse',
          short: 'Offen für Product- und Platform-Engineering-Rollen',
          description: 'Ich bin offen für Möglichkeiten im Vereinigten Königreich, die zu meiner Erfahrung in moderner Webentwicklung, Product Engineering, Testing und performanceorientiertem Frontend passen.',
          focus: 'React/TypeScript, Product Engineering, Full-Stack-Zusammenarbeit',
          mobility: 'Umzugsbereit · Geeignete Arbeitserlaubnis erforderlich',
        },
        {
          id: 'canada', name: 'Kanada', lat: 56, lon: -106, priority: 'medium', tag: 'Internationales Interesse',
          short: 'Offen für langfristige Software-Engineering-Möglichkeiten',
          description: 'Kanada ist ein weiteres Ziel, das ich für die passende langfristige Software-Engineering-Möglichkeit in Betracht ziehen würde, insbesondere in internationalen und produktorientierten Teams.',
          focus: 'Full-Stack-Engineering, Frontend-Systeme, APIs, qualitätsorientierte Entwicklung',
          mobility: 'Umzugsbereit · Geeignete Arbeitserlaubnis erforderlich',
        },
        {
          id: 'netherlands', name: 'Niederlande', lat: 52, lon: 5, priority: 'medium', tag: 'Europäisches Interesse',
          short: 'Offen für internationale Produktteams',
          description: 'Ich bin offen für Möglichkeiten in den Niederlanden, bei denen internationale Zusammenarbeit, modernes Web Engineering und Produktverantwortung im Mittelpunkt stehen.',
          focus: 'Frontend-/Full-Stack-Product-Engineering, TypeScript, APIs und Testing',
          mobility: 'Umzugsbereit · Abhängig von lokalen Voraussetzungen',
        },
      ],
    },
  };

  const current = content[language] || content.en;

  const gmailHref = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(emailAddress)}&su=${encodeURIComponent(current.emailSubject)}&body=${encodeURIComponent(current.emailBody)}`;
  const outlookHref = `https://outlook.office.com/mail/deeplink/compose?to=${encodeURIComponent(emailAddress)}&subject=${encodeURIComponent(current.emailSubject)}&body=${encodeURIComponent(current.emailBody)}`;

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(emailAddress);
      setEmailCopied(true);
      window.setTimeout(() => setEmailCopied(false), 2000);
    } catch {
      window.prompt(current.copyEmail, emailAddress);
    }
  };

  const closeModal = () => {
    setShowContactOptions(false);
    setEmailCopied(false);
  };

  useEffect(() => {
    if (!showContactOptions) return undefined;
    const onKey = (e) => e.key === 'Escape' && closeModal();
    document.addEventListener('keydown', onKey);
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = previous;
    };
  }, [showContactOptions]);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 80%', 'end 20%'],
  });

  const progressX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 25,
    mass: 0.35,
  });

  const backgroundY = useTransform(
    scrollYProgress,
    [0, 1],
    [reducedMotion ? 0 : 90, reducedMotion ? 0 : -90]
  );

  const decorative = [
    ['relocate();', 'left-[3%] top-[12%]', 'text-5xl', 9],
    ['world.open = true', 'right-[4%] top-[22%]', 'text-4xl', 10],
    ['US → J-1', 'left-[6%] top-[39%]', 'text-5xl', 8],
    ['Nordics', 'right-[6%] top-[52%]', 'text-6xl', 11],
    ['build.global()', 'left-[4%] top-[69%]', 'text-4xl', 9.5],
    ['openToRelocate', 'right-[4%] top-[83%]', 'text-4xl', 10.5],
  ];

  return (
    <>
      <section
        ref={sectionRef}
        id="j1"
        className="relative isolate overflow-hidden bg-blue-50/60 py-20 dark:bg-gray-950 lg:py-28"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-20 opacity-70 dark:opacity-25"
          style={{
            backgroundImage: 'linear-gradient(to right, rgba(37,99,235,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(37,99,235,0.05) 1px, transparent 1px)',
            backgroundSize: '52px 52px',
            WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 8%, black 92%, transparent)',
            maskImage: 'linear-gradient(to bottom, transparent, black 8%, black 92%, transparent)',
          }}
        />

        <motion.div aria-hidden="true" style={{ y: backgroundY }} className="pointer-events-none absolute -left-64 top-[12%] -z-10 h-[42rem] w-[42rem] rounded-full bg-blue-400/12 blur-[150px] dark:bg-blue-700/[0.08]" />
        <motion.div aria-hidden="true" style={{ y: backgroundY }} className="pointer-events-none absolute -right-64 bottom-[14%] -z-10 h-[44rem] w-[44rem] rounded-full bg-violet-400/10 blur-[160px] dark:bg-violet-700/[0.07]" />

        <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 hidden overflow-hidden lg:block">
          {decorative.map(([text, position, size, duration], i) => (
            <motion.span
              key={text}
              className={`absolute select-none whitespace-nowrap font-mono font-black leading-none text-blue-950/[0.022] dark:text-blue-200/[0.032] ${position} ${size}`}
              animate={reducedMotion ? undefined : {
                y: [0, i % 2 === 0 ? -15 : 15, 0],
                x: [0, i % 2 === 0 ? 8 : -8, 0],
                rotate: [0, i % 2 === 0 ? 3 : -3, 0],
              }}
              transition={{ duration, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
            >
              {text}
            </motion.span>
          ))}
        </div>

        <motion.div
          aria-hidden="true"
          style={{ scaleX: progressX, transformOrigin: 'left' }}
          className="absolute left-0 top-0 z-50 h-[3px] w-full bg-gradient-to-r from-blue-700 via-cyan-400 to-violet-500 shadow-[0_0_14px_rgba(59,130,246,0.38)]"
        />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: reducedMotion ? 0 : 45 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: reducedMotion ? 0 : 0.85, ease: [0.16, 1, 0.3, 1] }}
            className="mx-auto mb-14 max-w-4xl text-center lg:mb-16"
          >
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white/70 px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-blue-800 shadow-sm backdrop-blur-xl dark:border-blue-500/15 dark:bg-white/[0.035] dark:text-blue-300">
              <FaGlobeAmericas size={12} />
              {current.eyebrow}
            </div>

            <motion.h2
              initial={{ opacity: 0, filter: reducedMotion ? 'blur(0px)' : 'blur(10px)' }}
              whileInView={{ opacity: 1, filter: 'blur(0px)' }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.08 }}
              className="text-4xl font-black tracking-[-0.05em] text-gray-950 dark:text-white sm:text-5xl lg:text-6xl"
            >
              {current.title}
            </motion.h2>

            <div className="mx-auto mt-5 h-1 w-28 overflow-hidden rounded-full bg-blue-100 dark:bg-gray-800">
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                style={{ transformOrigin: 'left' }}
                className="h-full w-full bg-gradient-to-r from-blue-700 via-cyan-400 to-violet-500"
              />
            </div>

            <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-gray-600 dark:text-gray-300 sm:text-xl">
              {current.subtitle}
            </p>

            <div className="mx-auto mt-7 flex w-fit flex-wrap items-center justify-center gap-2">
              <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-700 dark:border-emerald-500/15 dark:bg-emerald-500/10 dark:text-emerald-300">
                <span className="relative flex h-2 w-2">
                  {!reducedMotion && <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />}
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                </span>
                Türkiye
              </span>
              <FaArrowRight className="text-gray-300 dark:text-gray-700" size={11} />
              <span className="rounded-full border border-blue-200 bg-blue-50 px-3 py-1.5 text-xs font-bold text-blue-700 dark:border-blue-500/15 dark:bg-blue-500/10 dark:text-blue-300">
                Global
              </span>
            </div>
          </motion.div>

          <InteractiveGlobe
            countries={current.countries}
            language={language}
            labels={{
              globalMobility: current.globalMobility,
              worldTitle: current.worldTitle,
              worldText: current.worldText,
              professionalFocus: current.professionalFocus,
              mobility: current.mobility,
              mobilityNote: current.mobilityNote,
            }}
            reducedMotion={reducedMotion}
          />

          <motion.div
            initial={{ opacity: 0, y: reducedMotion ? 0 : 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: reducedMotion ? 0 : 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="relative mx-auto mt-20 max-w-6xl overflow-hidden rounded-[2rem] border border-blue-200/70 bg-white/85 shadow-[0_24px_90px_rgba(37,99,235,0.10)] backdrop-blur-xl dark:border-blue-500/15 dark:bg-gray-900/85 lg:mt-24"
          >
            <div aria-hidden="true" className="pointer-events-none absolute -left-24 top-1/3 h-72 w-72 rounded-full bg-blue-500/10 blur-[100px]" />
            <div aria-hidden="true" className="pointer-events-none absolute -right-24 bottom-1/4 h-72 w-72 rounded-full bg-cyan-400/10 blur-[105px]" />

            <div className="relative z-10 grid lg:grid-cols-[0.8fr_1.2fr]">
              <div className="border-b border-blue-100 p-7 dark:border-white/[0.06] sm:p-9 lg:border-b-0 lg:border-r lg:p-10">
                <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.13em] text-blue-700 dark:border-blue-500/15 dark:bg-blue-500/10 dark:text-blue-300">
                  <FaBuilding size={10} />
                  {current.eligibilityBadge}
                </div>

                <h3 className="text-3xl font-black tracking-[-0.04em] text-gray-950 dark:text-white">
                  {current.eligibilityTitle}
                </h3>

                <p className="mt-4 leading-relaxed text-gray-600 dark:text-gray-300">
                  {current.eligibilityText}
                </p>

                <div className="mt-7 flex items-start gap-3 rounded-2xl border border-emerald-200 bg-emerald-50/70 p-4 dark:border-emerald-500/10 dark:bg-emerald-500/[0.05]">
                  <FaCheckCircle className="mt-0.5 flex-shrink-0 text-emerald-600 dark:text-emerald-400" size={14} />
                  <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
                    {current.mobilityNote}
                  </p>
                </div>
              </div>

              <div className="p-7 sm:p-9 lg:p-10">
                <div className="mb-7 flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-700 dark:bg-blue-500/10 dark:text-blue-300">
                    <FaRoute size={14} />
                  </span>
                  <h3 className="text-2xl font-black tracking-[-0.03em] text-gray-950 dark:text-white">
                    {current.howItWorks}
                  </h3>
                </div>

                <div className="relative">
                  <div aria-hidden="true" className="absolute bottom-5 left-[19px] top-5 w-px bg-gradient-to-b from-blue-500 via-cyan-400 to-transparent opacity-35" />
                  <div className="space-y-5">
                    {current.steps.map((step, index) => (
                      <motion.div
                        key={step.id}
                        initial={{ opacity: 0, x: reducedMotion ? 0 : 18 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: reducedMotion ? 0 : index * 0.08 }}
                        whileHover={reducedMotion ? undefined : { x: 5 }}
                        className="group/step relative flex gap-4"
                      >
                        <span className="relative z-10 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border-4 border-white bg-gradient-to-br from-blue-700 to-cyan-500 text-xs font-black text-white shadow-lg shadow-blue-600/20 dark:border-gray-900">
                          {index + 1}
                        </span>
                        <div className="flex-1 rounded-2xl border border-gray-200/70 bg-gray-50/65 p-4 transition-all duration-300 group-hover/step:border-blue-200 group-hover/step:bg-blue-50/60 dark:border-white/[0.06] dark:bg-white/[0.025] dark:group-hover/step:border-blue-500/15 dark:group-hover/step:bg-blue-500/[0.04]">
                          <h4 className="font-black text-gray-950 dark:text-white">{step.title}</h4>
                          <p className="mt-2 text-sm leading-relaxed text-gray-600 dark:text-gray-300">{step.description}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: reducedMotion ? 0 : 55 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            className="mx-auto mt-16 max-w-6xl lg:mt-20"
          >
            <div className="mb-7 flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-blue-800 to-blue-600 text-white shadow-lg shadow-blue-900/20">
                <FaUserTie size={15} />
              </span>
              <h3 className="text-2xl font-black tracking-[-0.03em] text-gray-950 dark:text-white">
                {current.whatIBring}
              </h3>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
              {current.strengths.map((strength, index) => (
                <motion.div
                  key={strength}
                  initial={{ opacity: 0, y: reducedMotion ? 0 : 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: reducedMotion ? 0 : index * 0.06 }}
                  whileHover={reducedMotion ? undefined : { y: -6 }}
                  className="group/strength relative overflow-hidden rounded-2xl border border-gray-200/80 bg-white/80 p-5 shadow-sm backdrop-blur-xl transition-[border-color,box-shadow] duration-500 hover:border-blue-200 hover:shadow-[0_18px_45px_rgba(37,99,235,0.10)] dark:border-white/[0.07] dark:bg-white/[0.025] dark:hover:border-blue-500/20"
                >
                  <span aria-hidden="true" className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-blue-100/75 to-transparent opacity-0 transition-all duration-700 group-hover/strength:left-[120%] group-hover/strength:opacity-100 dark:via-blue-400/10" />
                  <div className="relative z-10">
                    <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-blue-700 dark:bg-blue-500/10 dark:text-blue-300">
                      <FaCode size={12} />
                    </span>
                    <span className="mt-4 block font-mono text-[9px] font-black text-gray-300 dark:text-gray-700">0{index + 1}</span>
                    <p className="mt-2 text-sm font-semibold leading-relaxed text-gray-700 dark:text-gray-300">{strength}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: reducedMotion ? 0 : 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative mx-auto mt-16 max-w-5xl lg:mt-20"
          >
            <motion.div
              aria-hidden="true"
              className="absolute -inset-[1px] rounded-[2rem] bg-gradient-to-r from-blue-600 via-cyan-400 to-violet-600 opacity-65 blur-[1px] [background-size:220%_220%]"
              animate={reducedMotion ? undefined : { backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
              transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
            />
            <div className="relative overflow-hidden rounded-[1.95rem] bg-white p-7 text-center shadow-[0_24px_90px_rgba(15,23,42,0.10)] dark:bg-gray-900 dark:shadow-[0_30px_100px_rgba(0,0,0,0.4)] sm:p-9 lg:p-10">
              <div aria-hidden="true" className="pointer-events-none absolute -left-20 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full bg-blue-500/10 blur-[100px]" />
              <div aria-hidden="true" className="pointer-events-none absolute -right-20 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full bg-violet-500/10 blur-[100px]" />

              <div className="relative z-10">
                <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-800 via-blue-700 to-cyan-600 text-white shadow-xl shadow-blue-900/20">
                  <FaEnvelope size={18} />
                </span>
                <h3 className="mt-5 text-3xl font-black tracking-[-0.04em] text-gray-950 dark:text-white">{current.ctaTitle}</h3>
                <p className="mx-auto mt-3 max-w-2xl leading-relaxed text-gray-600 dark:text-gray-300">{current.ctaText}</p>

                <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
                  <motion.button
                    type="button"
                    onClick={() => { setEmailCopied(false); setShowContactOptions(true); }}
                    aria-label={current.contactAria}
                    whileHover={reducedMotion ? undefined : { y: -3, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="inline-flex items-center justify-center rounded-xl border border-blue-200 bg-white px-6 py-3 font-bold text-blue-800 shadow-sm transition-colors hover:bg-blue-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:border-blue-500/20 dark:bg-white/[0.035] dark:text-blue-300 dark:hover:bg-blue-500/[0.08] dark:focus-visible:ring-offset-gray-900"
                  >
                    <FaEnvelope className="mr-2" aria-hidden="true" />
                    {current.contact}
                  </motion.button>

                  <motion.a
                    href="/Bora_Aydin_J1_Resume.pdf"
                    download="Bora_Aydin_J1_Resume.pdf"
                    aria-label={current.resumeAria}
                    whileHover={reducedMotion ? undefined : { y: -3, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-blue-800 via-blue-700 to-cyan-600 px-6 py-3 font-bold text-white shadow-xl shadow-blue-900/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-gray-900"
                  >
                    <FaDownload className="mr-2" aria-hidden="true" />
                    {current.downloadResume}
                  </motion.a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <div aria-hidden="true" className="pointer-events-none absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-b from-transparent to-white/40 dark:to-gray-900/20" />
      </section>

      <AnimatePresence>
        {showContactOptions && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reducedMotion ? 0 : 0.2 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/65 px-4 backdrop-blur-md"
            onClick={closeModal}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="contact-modal-title"
              initial={{ opacity: 0, y: reducedMotion ? 0 : 24, scale: reducedMotion ? 1 : 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: reducedMotion ? 0 : 16, scale: reducedMotion ? 1 : 0.97 }}
              transition={{ duration: reducedMotion ? 0 : 0.28, ease: [0.16, 1, 0.3, 1] }}
              onClick={(event) => event.stopPropagation()}
              className="relative w-full max-w-md overflow-hidden rounded-[1.7rem] border border-gray-200 bg-white p-6 shadow-2xl dark:border-white/[0.08] dark:bg-gray-900 sm:p-8"
            >
              <div aria-hidden="true" className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-blue-500/10 blur-[85px]" />

              <button
                type="button"
                onClick={closeModal}
                aria-label={current.closeAria}
                className="absolute right-4 top-4 z-20 flex h-9 w-9 items-center justify-center rounded-xl text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:hover:bg-white/[0.06] dark:hover:text-white"
              >
                <FaTimes aria-hidden="true" />
              </button>

              <div className="relative z-10">
                <div className="mb-6 pr-8 text-center">
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-800 to-cyan-600 text-white shadow-xl shadow-blue-900/20">
                    <FaEnvelope size={18} aria-hidden="true" />
                  </div>
                  <h3 id="contact-modal-title" className="text-2xl font-black tracking-[-0.03em] text-gray-950 dark:text-white">{current.contactModalTitle}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-gray-600 dark:text-gray-300">{current.contactModalText}</p>
                </div>

                <div className="mb-5 rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-center dark:border-white/[0.07] dark:bg-white/[0.025]">
                  <span className="break-all text-sm font-bold text-gray-700 dark:text-gray-200">{emailAddress}</span>
                </div>

                <div className="space-y-3">
                  <motion.a
                    href={gmailHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={reducedMotion ? undefined : { y: -2 }}
                    className="flex w-full items-center justify-center rounded-xl bg-blue-800 px-5 py-3 font-bold text-white transition-colors hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:bg-blue-700 dark:hover:bg-blue-600 dark:focus-visible:ring-offset-gray-900"
                  >
                    <FaGoogle className="mr-2" aria-hidden="true" />
                    {current.openGmail}
                  </motion.a>

                  <motion.a
                    href={outlookHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={reducedMotion ? undefined : { y: -2 }}
                    className="flex w-full items-center justify-center rounded-xl border border-gray-300 bg-white px-5 py-3 font-bold text-gray-800 transition-colors hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:border-white/[0.08] dark:bg-white/[0.035] dark:text-white dark:hover:bg-white/[0.06] dark:focus-visible:ring-offset-gray-900"
                  >
                    <FaMicrosoft className="mr-2" aria-hidden="true" />
                    {current.openOutlook}
                  </motion.a>

                  <motion.button
                    type="button"
                    onClick={copyEmail}
                    whileHover={reducedMotion ? undefined : { y: -2 }}
                    className="flex w-full items-center justify-center rounded-xl border border-gray-300 bg-white px-5 py-3 font-bold text-gray-700 transition-colors hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:border-white/[0.08] dark:bg-white/[0.035] dark:text-gray-200 dark:hover:bg-white/[0.06] dark:focus-visible:ring-offset-gray-900"
                  >
                    {emailCopied ? <FaCheck className="mr-2 text-emerald-600 dark:text-emerald-400" aria-hidden="true" /> : <FaCopy className="mr-2" aria-hidden="true" />}
                    {emailCopied ? current.emailCopied : current.copyEmail}
                  </motion.button>
                </div>

                <button
                  type="button"
                  onClick={closeModal}
                  className="mt-5 w-full rounded-xl px-4 py-2 text-sm font-medium text-gray-500 transition-colors hover:bg-gray-50 hover:text-gray-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:text-gray-400 dark:hover:bg-white/[0.05] dark:hover:text-white"
                >
                  {current.close}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default J1Section;
