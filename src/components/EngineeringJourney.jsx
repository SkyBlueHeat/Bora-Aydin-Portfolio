import React, {
  useContext,
  useRef,
} from 'react';

import {
  FaGraduationCap,
  FaBriefcase,
  FaBookOpen,
  FaLaptopCode,
  FaRocket,
  FaCode,
  FaStar,
  FaArrowRight,
  FaCheck,
} from 'react-icons/fa';

import {
  motion,
  useMotionValue,
  useMotionTemplate,
  useSpring,
  useTransform,
  useScroll,
  useReducedMotion,
} from 'motion/react';

import { LanguageContext } from '../context/LanguageContext';
import translations from '../data/translations.json';

/* =========================================================
   JOURNEY CARD
========================================================= */

const JourneyCard = ({
  step,
  index,
  total,
  config,
  keyAreasLabel,
  currentLabel,
  prefersReducedMotion,
}) => {
  const cardRef = useRef(null);

  /* -----------------------------
     3D TILT
  ----------------------------- */

  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);

  const rawRotateY = useTransform(
    pointerX,
    [-0.5, 0.5],
    [-4, 4]
  );

  const rawRotateX = useTransform(
    pointerY,
    [-0.5, 0.5],
    [4, -4]
  );

  const rotateX = useSpring(rawRotateX, {
    stiffness: 180,
    damping: 22,
  });

  const rotateY = useSpring(rawRotateY, {
    stiffness: 180,
    damping: 22,
  });

  /* -----------------------------
     MOUSE GLOW
  ----------------------------- */

  const glowX = useMotionValue(250);
  const glowY = useMotionValue(180);

  const smoothGlowX = useSpring(glowX, {
    stiffness: 150,
    damping: 25,
  });

  const smoothGlowY = useSpring(glowY, {
    stiffness: 150,
    damping: 25,
  });

  const glow = useMotionTemplate`
    radial-gradient(
      480px circle at ${smoothGlowX}px ${smoothGlowY}px,
      rgba(59, 130, 246, 0.12),
      transparent 58%
    )
  `;

  const handlePointerMove = (event) => {
    if (
      prefersReducedMotion ||
      !cardRef.current
    ) {
      return;
    }

    const rect =
      cardRef.current.getBoundingClientRect();

    const x =
      event.clientX - rect.left;

    const y =
      event.clientY - rect.top;

    glowX.set(x);
    glowY.set(y);

    pointerX.set(
      x / rect.width - 0.5
    );

    pointerY.set(
      y / rect.height - 0.5
    );
  };

  const resetPointer = () => {
    pointerX.set(0);
    pointerY.set(0);
  };

  const Icon = config.icon;

  const isCurrent =
    step.type === 'current';

  return (
    <motion.article
      ref={cardRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={resetPointer}
      initial={{
        opacity: 0,
        y: prefersReducedMotion
          ? 0
          : 55,
        scale: prefersReducedMotion
          ? 1
          : 0.96,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        scale: 1,
      }}
      viewport={{
        once: true,
        amount: 0.25,
      }}
      transition={{
        duration: prefersReducedMotion
          ? 0
          : 0.8,
        delay:
          prefersReducedMotion
            ? 0
            : index * 0.035,
        ease: [0.16, 1, 0.3, 1],
      }}
      style={{
        rotateX:
          prefersReducedMotion
            ? 0
            : rotateX,
        rotateY:
          prefersReducedMotion
            ? 0
            : rotateY,
        transformStyle: 'preserve-3d',
      }}
      className="
        group/card
        relative
        [perspective:1200px]
      "
    >

      {/* Outer glow */}

      <div
        aria-hidden="true"
        className={`
          pointer-events-none
          absolute
          -inset-3
          -z-10
          rounded-[2rem]
          opacity-0
          blur-3xl
          transition-opacity
          duration-700
          group-hover/card:opacity-100
          ${config.outerGlow}
        `}
      />

      {/* Current card pulse */}

      {isCurrent &&
        !prefersReducedMotion && (
          <motion.div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              -inset-[2px]
              -z-10
              rounded-[1.8rem]
              border
              border-blue-500/40
            "
            animate={{
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.012, 1],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        )}

      <div
        className={`
          relative
          overflow-hidden
          rounded-[1.75rem]
          border
          bg-white/90
          p-6
          shadow-[0_14px_45px_rgba(15,23,42,0.06)]
          backdrop-blur-xl
          transition-all
          duration-500

          group-hover/card:-translate-y-1
          group-hover/card:shadow-[0_24px_70px_rgba(15,23,42,0.12)]

          dark:bg-gray-900/85
          dark:shadow-[0_18px_60px_rgba(0,0,0,0.28)]

          sm:p-7
          lg:p-8

          ${config.border}
        `}
      >

        {/* Mouse spotlight */}

        <motion.div
          aria-hidden="true"
          style={{
            background: glow,
          }}
          className="
            pointer-events-none
            absolute
            inset-0
            opacity-0
            transition-opacity
            duration-500
            group-hover/card:opacity-100
          "
        />

        {/* Top gradient line */}

        <div
          aria-hidden="true"
          className={`
            absolute
            left-0
            top-0
            h-[3px]
            w-full
            bg-gradient-to-r
            ${config.gradient}
          `}
        />

        {/* Huge step number */}

        <span
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            -right-2
            -top-7
            select-none
            text-[8rem]
            font-black
            leading-none
            tracking-[-0.08em]
            text-gray-950/[0.025]

            dark:text-white/[0.025]
          "
        >
          {String(index + 1).padStart(
            2,
            '0'
          )}
        </span>

        {/* Corner glow */}

        <div
          aria-hidden="true"
          className={`
            pointer-events-none
            absolute
            -right-24
            -top-24
            h-52
            w-52
            rounded-full
            blur-[80px]
            ${config.cornerGlow}
          `}
        />

        <div className="relative z-10">

          {/* ===================================
              TOP
          ==================================== */}

          <div
            className="
              mb-5
              flex
              flex-wrap
              items-center
              justify-between
              gap-3
            "
          >

            {/* Type pill */}

            <div
              className={`
                inline-flex
                items-center
                gap-2
                rounded-full
                border
                px-3
                py-1.5
                text-xs
                font-black
                uppercase
                tracking-[0.12em]
                ${config.badge}
              `}
            >
              <Icon size={12} />

              {config.label}
            </div>

            {/* Step counter */}

            <div
              className="
                flex
                items-center
                gap-2
              "
            >
              {isCurrent && (
                <div
                  className="
                    inline-flex
                    items-center
                    gap-1.5
                    rounded-full
                    bg-emerald-50
                    px-2.5
                    py-1
                    text-[10px]
                    font-black
                    uppercase
                    tracking-[0.1em]
                    text-emerald-700

                    dark:bg-emerald-500/10
                    dark:text-emerald-400
                  "
                >
                  <span className="relative flex h-2 w-2">
                    {!prefersReducedMotion && (
                      <span
                        className="
                          absolute
                          inline-flex
                          h-full
                          w-full
                          animate-ping
                          rounded-full
                          bg-emerald-400
                          opacity-60
                        "
                      />
                    )}

                    <span
                      className="
                        relative
                        inline-flex
                        h-2
                        w-2
                        rounded-full
                        bg-emerald-500
                      "
                    />
                  </span>

                  {currentLabel}
                </div>
              )}

              <span
                className="
                  text-[10px]
                  font-black
                  tracking-[0.15em]
                  text-gray-300

                  dark:text-gray-700
                "
              >
                {index + 1}/{total}
              </span>
            </div>
          </div>

          {/* ===================================
              YEAR
          ==================================== */}

          <motion.span
            whileHover={
              prefersReducedMotion
                ? undefined
                : {
                    scale: 1.04,
                  }
            }
            className={`
              mb-3
              inline-flex
              rounded-lg
              px-3
              py-1.5
              text-xs
              font-black
              tracking-[0.12em]
              ${config.year}
            `}
          >
            {step.year}
          </motion.span>

          {/* ===================================
              TITLE
          ==================================== */}

          <motion.h3
            whileHover={
              prefersReducedMotion
                ? undefined
                : {
                    x: 4,
                  }
            }
            className="
              mb-4
              text-xl
              font-black
              leading-tight
              tracking-[-0.025em]
              text-gray-950

              dark:text-white

              sm:text-2xl
            "
          >
            {step.title}
          </motion.h3>

          {/* Description */}

          <p
            className="
              leading-relaxed
              text-gray-600

              dark:text-gray-300
            "
          >
            {step.description}
          </p>

          {/* ===================================
              SKILLS
          ==================================== */}

          {step.skills?.length > 0 && (
            <>
              <div
                className="
                  my-6
                  h-px
                  w-full
                  bg-gradient-to-r
                  from-transparent
                  via-gray-200
                  to-transparent

                  dark:via-gray-700
                "
              />

              <div
                className="
                  mb-3
                  flex
                  items-center
                  gap-2
                "
              >
                <div
                  className={`
                    flex
                    h-7
                    w-7
                    items-center
                    justify-center
                    rounded-lg
                    ${config.iconBackground}
                  `}
                >
                  <FaCode size={11} />
                </div>

                <h4
                  className="
                    text-xs
                    font-black
                    uppercase
                    tracking-[0.12em]
                    text-gray-800

                    dark:text-gray-200
                  "
                >
                  {keyAreasLabel}
                </h4>
              </div>

              <div
                className="
                  flex
                  flex-wrap
                  gap-2
                "
              >
                {step.skills.map(
                  (
                    skill,
                    skillIndex
                  ) => (
                    <motion.span
                      key={skill}
                      initial={{
                        opacity: 0,
                        y: 8,
                      }}
                      whileInView={{
                        opacity: 1,
                        y: 0,
                      }}
                      viewport={{
                        once: true,
                      }}
                      transition={{
                        delay:
                          prefersReducedMotion
                            ? 0
                            : 0.15 +
                              skillIndex *
                                0.025,
                      }}
                      whileHover={
                        prefersReducedMotion
                          ? undefined
                          : {
                              y: -3,
                              scale: 1.035,
                            }
                      }
                      className="
                        group/skill
                        relative
                        cursor-default
                        overflow-hidden
                        rounded-full
                        border
                        border-gray-200
                        bg-white/70
                        px-3
                        py-1.5
                        text-sm
                        font-semibold
                        text-gray-700
                        shadow-sm
                        backdrop-blur-md

                        hover:border-blue-200
                        hover:text-blue-800

                        dark:border-white/[0.07]
                        dark:bg-white/[0.035]
                        dark:text-gray-300
                        dark:hover:border-blue-500/20
                        dark:hover:text-blue-300
                      "
                    >
                      <span
                        aria-hidden="true"
                        className="
                          absolute
                          inset-0
                          -translate-x-[120%]
                          bg-gradient-to-r
                          from-transparent
                          via-blue-100/80
                          to-transparent
                          transition-transform
                          duration-700
                          group-hover/skill:translate-x-[120%]

                          dark:via-blue-400/10
                        "
                      />

                      <span className="relative">
                        {skill}
                      </span>
                    </motion.span>
                  )
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </motion.article>
  );
};

/* =========================================================
   MAIN COMPONENT
========================================================= */

const EngineeringJourney = () => {
  const { language } =
    useContext(LanguageContext);

  const t = translations[language];

  const sectionRef = useRef(null);

  const prefersReducedMotion =
    useReducedMotion();

  /* =======================================================
     LABELS
  ======================================================= */

  const labels = {
    en: {
      continuedDevelopment:
        'Continued Development',
      independentPeriod:
        '2024–Present',
      today: 'Today',

      sectionTag:
        'Engineering Evolution',
      timeline:
        'Developer Timeline',
      milestones:
        'Milestones',
      starting:
        'Starting Point',
      present:
        'Present Day',

      education:
        'Education',
      professional:
        'Professional',
      selfLearning:
        'Self Learning',
      training:
        'Training',
      independent:
        'Independent',
      current:
        'Current',

      growth:
        'Continuous Evolution',
      currentBadge:
        'Live',
    },

    tr: {
      continuedDevelopment:
        'Sürekli Gelişim',
      independentPeriod:
        '2024–Günümüz',
      today: 'Bugün',

      sectionTag:
        'Mühendislik Gelişimi',
      timeline:
        'Geliştirici Zaman Çizgisi',
      milestones:
        'Dönüm Noktası',
      starting:
        'Başlangıç',
      present:
        'Bugün',

      education:
        'Eğitim',
      professional:
        'Profesyonel',
      selfLearning:
        'Kendi Kendine Gelişim',
      training:
        'Eğitim Programı',
      independent:
        'Bağımsız Gelişim',
      current:
        'Güncel',

      growth:
        'Sürekli Gelişim',
      currentBadge:
        'Aktif',
    },

    de: {
      continuedDevelopment:
        'Kontinuierliche Weiterentwicklung',
      independentPeriod:
        '2024–Heute',
      today: 'Heute',

      sectionTag:
        'Engineering-Entwicklung',
      timeline:
        'Entwickler-Zeitachse',
      milestones:
        'Meilensteine',
      starting:
        'Ausgangspunkt',
      present:
        'Heute',

      education:
        'Ausbildung',
      professional:
        'Beruflich',
      selfLearning:
        'Selbststudium',
      training:
        'Weiterbildung',
      independent:
        'Unabhängig',
      current:
        'Aktuell',

      growth:
        'Kontinuierliche Entwicklung',
      currentBadge:
        'Aktiv',
    },
  };

  /* =======================================================
     SKILLS
  ======================================================= */

  const skillsByLanguage = {
    en: {
      professionalFrontend: [
        'Frontend Development',
        'HTML/CSS/JavaScript',
        'Responsive Development',
        'Reusable UI Patterns',
        'Cross-Browser Problem Solving',
        'QA Cycles',
      ],

      professionalFullStack: [
        'Vue.js',
        'Node.js REST Services',
        'API Contracts',
        'Backend Collaboration',
        'Full-Stack Workflows',
        'Production Interfaces',
      ],

      selfDevelopment: [
        'Self-Directed Learning',
        'Continuous Technical Improvement',
        'Learning Through Building',
        'Experimentation',
        'Independent Problem Solving',
        'Adapting to New Technologies',
      ],

      workintech: [
        'React',
        'TypeScript',
        'JavaScript',
        'REST APIs',
        'Git/GitHub',
        'Testing',
        'Full-Stack Development',
      ],

      independent: [
        'Product Ownership',
        'Application Architecture',
        'Backend/API Development',
        'Testing & Performance',
        'Docker',
      ],

      current: [
        'React/TypeScript',
        'Python/FastAPI',
        'REST APIs',
        'Testing',
        'Performance',
        'Docker',
      ],
    },

    tr: {
      professionalFrontend: [
        'Frontend Geliştirme',
        'HTML/CSS/JavaScript',
        'Responsive Tasarım',
        'Yeniden Kullanılabilir UI Yapıları',
        'Tarayıcılar Arası Problem Çözme',
        'QA Süreçleri',
      ],

      professionalFullStack: [
        'Vue.js',
        'Node.js REST Servisleri',
        'API Sözleşmeleri',
        'Backend İşbirliği',
        'Full-Stack Süreçleri',
        'Üretim Arayüzleri',
      ],

      selfDevelopment: [
        'Kendi Kendine Öğrenme',
        'Sürekli Teknik Gelişim',
        'Yaparak Öğrenme',
        'Deneyimleme',
        'Bağımsız Problem Çözme',
        'Yeni Teknolojilere Uyum',
      ],

      workintech: [
        'React',
        'TypeScript',
        'JavaScript',
        "REST API'ler",
        'Git/GitHub',
        'Test',
        'Full-Stack Geliştirme',
      ],

      independent: [
        'Ürün Sorumluluğu',
        'Uygulama Mimarisi',
        'Backend/API Geliştirme',
        'Test & Performans',
        'Docker',
      ],

      current: [
        'React/TypeScript',
        'Python/FastAPI',
        "REST API'ler",
        'Test',
        'Performans',
        'Docker',
      ],
    },

    de: {
      professionalFrontend: [
        'Frontend-Entwicklung',
        'HTML/CSS/JavaScript',
        'Responsive Entwicklung',
        'Wiederverwendbare UI-Strukturen',
        'Browserübergreifende Problemlösung',
        'QA-Prozesse',
      ],

      professionalFullStack: [
        'Vue.js',
        'Node.js-REST-Services',
        'API-Verträge',
        'Backend-Zusammenarbeit',
        'Full-Stack-Workflows',
        'Produktionsoberflächen',
      ],

      selfDevelopment: [
        'Selbstständiges Lernen',
        'Kontinuierliche technische Weiterentwicklung',
        'Lernen durch praktische Entwicklung',
        'Experimentieren',
        'Eigenständige Problemlösung',
        'Anpassung an neue Technologien',
      ],

      workintech: [
        'React',
        'TypeScript',
        'JavaScript',
        'REST-APIs',
        'Git/GitHub',
        'Testing',
        'Full-Stack-Entwicklung',
      ],

      independent: [
        'Produktverantwortung',
        'Anwendungsarchitektur',
        'Backend/API-Entwicklung',
        'Testing & Performance',
        'Docker',
      ],

      current: [
        'React/TypeScript',
        'Python/FastAPI',
        'REST-APIs',
        'Testing',
        'Performance',
        'Docker',
      ],
    },
  };

  const currentLabels =
    labels[language] || labels.en;

  const skills =
    skillsByLanguage[language] ||
    skillsByLanguage.en;

  /* =======================================================
     JOURNEY DATA
  ======================================================= */

  const journeySteps = [
    {
      id: 'foundation',
      year: '2017–2020',
      title:
        t.journey.formalFoundation,
      description:
        t.journey.formalFoundationText,
      type: 'education',
    },

    {
      id: 'cers',
      year: '2021',
      title:
        t.journey.firstProfessional,
      description:
        t.journey.firstProfessionalText,
      type: 'professional',
      skills:
        skills.professionalFrontend,
    },

    {
      id: 'arma',
      year: '2022',
      title:
        t.journey.continuedGrowth,
      description:
        t.journey.continuedGrowthText,
      type: 'professional',
      skills:
        skills.professionalFullStack,
    },

    {
      id: 'self-development',
      year:
        currentLabels.continuedDevelopment,
      title:
        t.journey.selfDevelopment,
      description:
        t.journey.selfDevelopmentText,
      type: 'self-learning',
      skills:
        skills.selfDevelopment,
    },

    {
      id: 'workintech',
      year: '2024–2025',
      title:
        t.journey.modernExpansion,
      description:
        t.journey.modernExpansionText,
      type: 'training',
      skills: skills.workintech,
    },

    {
      id: 'independent-engineering',
      year:
        currentLabels.independentPeriod,
      title:
        t.journey.independentEngineering,
      description:
        t.journey.independentEngineeringText,
      type: 'independent',
      skills: skills.independent,
    },

    {
      id: 'current-toolkit',
      year: currentLabels.today,
      title:
        t.journey.currentToolkit,
      description:
        t.journey.currentToolkitText,
      type: 'current',
      skills: skills.current,
    },
  ];

  /* =======================================================
     CARD STYLES
  ======================================================= */

  const typeConfig = {
    education: {
      label:
        currentLabels.education,
      icon: FaGraduationCap,

      border:
        'border-violet-200/80 dark:border-violet-500/15',

      badge:
        'border-violet-200 bg-violet-50 text-violet-700 dark:border-violet-500/15 dark:bg-violet-500/10 dark:text-violet-300',

      year:
        'bg-violet-50 text-violet-700 dark:bg-violet-500/10 dark:text-violet-300',

      iconBackground:
        'bg-violet-100 text-violet-700 dark:bg-violet-500/10 dark:text-violet-300',

      gradient:
        'from-transparent via-violet-500 to-transparent',

      cornerGlow:
        'bg-violet-500/10',

      outerGlow:
        'bg-violet-500/15',
    },

    professional: {
      label:
        currentLabels.professional,
      icon: FaBriefcase,

      border:
        'border-blue-200/80 dark:border-blue-500/15',

      badge:
        'border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-500/15 dark:bg-blue-500/10 dark:text-blue-300',

      year:
        'bg-blue-50 text-blue-700 dark:bg-blue-500/10 dark:text-blue-300',

      iconBackground:
        'bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-300',

      gradient:
        'from-transparent via-blue-500 to-transparent',

      cornerGlow:
        'bg-blue-500/10',

      outerGlow:
        'bg-blue-500/15',
    },

    'self-learning': {
      label:
        currentLabels.selfLearning,
      icon: FaBookOpen,

      border:
        'border-emerald-200/80 dark:border-emerald-500/15',

      badge:
        'border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-500/15 dark:bg-emerald-500/10 dark:text-emerald-300',

      year:
        'bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300',

      iconBackground:
        'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300',

      gradient:
        'from-transparent via-emerald-500 to-transparent',

      cornerGlow:
        'bg-emerald-500/10',

      outerGlow:
        'bg-emerald-500/15',
    },

    training: {
      label:
        currentLabels.training,
      icon: FaLaptopCode,

      border:
        'border-amber-200/80 dark:border-amber-500/15',

      badge:
        'border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-500/15 dark:bg-amber-500/10 dark:text-amber-300',

      year:
        'bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-300',

      iconBackground:
        'bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-300',

      gradient:
        'from-transparent via-amber-500 to-transparent',

      cornerGlow:
        'bg-amber-500/10',

      outerGlow:
        'bg-amber-500/15',
    },

    independent: {
      label:
        currentLabels.independent,
      icon: FaRocket,

      border:
        'border-pink-200/80 dark:border-pink-500/15',

      badge:
        'border-pink-200 bg-pink-50 text-pink-700 dark:border-pink-500/15 dark:bg-pink-500/10 dark:text-pink-300',

      year:
        'bg-pink-50 text-pink-700 dark:bg-pink-500/10 dark:text-pink-300',

      iconBackground:
        'bg-pink-100 text-pink-700 dark:bg-pink-500/10 dark:text-pink-300',

      gradient:
        'from-transparent via-pink-500 to-transparent',

      cornerGlow:
        'bg-pink-500/10',

      outerGlow:
        'bg-pink-500/15',
    },

    current: {
      label:
        currentLabels.current,
      icon: FaStar,

      border:
        'border-cyan-200/80 dark:border-cyan-500/20',

      badge:
        'border-cyan-200 bg-cyan-50 text-cyan-700 dark:border-cyan-500/15 dark:bg-cyan-500/10 dark:text-cyan-300',

      year:
        'bg-cyan-50 text-cyan-700 dark:bg-cyan-500/10 dark:text-cyan-300',

      iconBackground:
        'bg-cyan-100 text-cyan-700 dark:bg-cyan-500/10 dark:text-cyan-300',

      gradient:
        'from-transparent via-cyan-500 to-transparent',

      cornerGlow:
        'bg-cyan-500/10',

      outerGlow:
        'bg-cyan-500/20',
    },
  };

  /* =======================================================
     SCROLL PROGRESS
  ======================================================= */

  const { scrollYProgress } =
    useScroll({
      target: sectionRef,
      offset: [
        'start 75%',
        'end 25%',
      ],
    });

  const timelineScale =
    useSpring(
      scrollYProgress,
      {
        stiffness: 90,
        damping: 24,
        mass: 0.35,
      }
    );

  const backgroundY =
    useTransform(
      scrollYProgress,
      [0, 1],
      [
        prefersReducedMotion
          ? 0
          : 80,

        prefersReducedMotion
          ? 0
          : -80,
      ]
    );

  /* =======================================================
     FLOATING DEVELOPER DECORATIONS
  ======================================================= */

  const decorativeCode = [
    {
      text: '<dev />',
      position: 'left-[2%] top-[8%]',
      size: 'text-6xl',
      tone: 'text-blue-950/[0.045] dark:text-blue-200/[0.055]',
      duration: 8,
      x: 8,
      y: -16,
      rotate: 4,
    },
    {
      text: '{ evolve(); }',
      position: 'right-[2%] top-[14%]',
      size: 'text-5xl',
      tone: 'text-blue-950/[0.04] dark:text-blue-200/[0.05]',
      duration: 10,
      x: -8,
      y: 16,
      rotate: -4,
    },
    {
      text: '();',
      position: 'left-[7%] top-[21%]',
      size: 'text-7xl',
      tone: 'text-cyan-950/[0.035] dark:text-cyan-200/[0.045]',
      duration: 7,
      x: 6,
      y: -12,
      rotate: 3,
    },
    {
      text: '[ ]',
      position: 'right-[8%] top-[28%]',
      size: 'text-8xl',
      tone: 'text-violet-950/[0.035] dark:text-violet-200/[0.045]',
      duration: 9,
      x: -10,
      y: 14,
      rotate: -3,
    },
    {
      text: '=>',
      position: 'left-[3%] top-[35%]',
      size: 'text-7xl',
      tone: 'text-blue-950/[0.035] dark:text-blue-200/[0.045]',
      duration: 8.5,
      x: 12,
      y: -12,
      rotate: 3,
    },
    {
      text: 'const',
      position: 'right-[4%] top-[41%]',
      size: 'text-5xl',
      tone: 'text-cyan-950/[0.035] dark:text-cyan-200/[0.045]',
      duration: 11,
      x: -8,
      y: 15,
      rotate: -2,
    },
    {
      text: '{ }',
      position: 'left-[8%] top-[48%]',
      size: 'text-8xl',
      tone: 'text-violet-950/[0.035] dark:text-violet-200/[0.045]',
      duration: 9,
      x: 8,
      y: -18,
      rotate: 4,
    },
    {
      text: '&&',
      position: 'right-[9%] top-[54%]',
      size: 'text-7xl',
      tone: 'text-blue-950/[0.035] dark:text-blue-200/[0.045]',
      duration: 7.5,
      x: -8,
      y: 12,
      rotate: -3,
    },
    {
      text: 'async',
      position: 'left-[3%] top-[61%]',
      size: 'text-5xl',
      tone: 'text-cyan-950/[0.035] dark:text-cyan-200/[0.045]',
      duration: 10,
      x: 10,
      y: -14,
      rotate: 2,
    },
    {
      text: '</>',
      position: 'right-[4%] top-[67%]',
      size: 'text-7xl',
      tone: 'text-blue-950/[0.04] dark:text-blue-200/[0.05]',
      duration: 8,
      x: -10,
      y: 14,
      rotate: -4,
    },
    {
      text: 'await',
      position: 'left-[9%] top-[73%]',
      size: 'text-5xl',
      tone: 'text-violet-950/[0.035] dark:text-violet-200/[0.045]',
      duration: 9.5,
      x: 8,
      y: -13,
      rotate: 2,
    },
    {
      text: '200 OK',
      position: 'right-[7%] top-[78%]',
      size: 'text-4xl',
      tone: 'text-emerald-950/[0.04] dark:text-emerald-200/[0.05]',
      duration: 8.5,
      x: -9,
      y: 12,
      rotate: -2,
    },
    {
      text: 'npm run build',
      position: 'left-[2%] top-[83%]',
      size: 'text-3xl',
      tone: 'text-blue-950/[0.035] dark:text-blue-200/[0.045]',
      duration: 10.5,
      x: 12,
      y: -10,
      rotate: 2,
    },
    {
      text: 'git commit',
      position: 'right-[3%] top-[87%]',
      size: 'text-3xl',
      tone: 'text-violet-950/[0.035] dark:text-violet-200/[0.045]',
      duration: 9,
      x: -10,
      y: 13,
      rotate: -2,
    },
    {
      text: '{...props}',
      position: 'left-[8%] top-[91%]',
      size: 'text-4xl',
      tone: 'text-cyan-950/[0.035] dark:text-cyan-200/[0.045]',
      duration: 8,
      x: 9,
      y: -12,
      rotate: 3,
    },
    {
      text: 'API',
      position: 'right-[9%] top-[95%]',
      size: 'text-6xl',
      tone: 'text-blue-950/[0.035] dark:text-blue-200/[0.045]',
      duration: 7.5,
      x: -8,
      y: 10,
      rotate: -3,
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="journey"
      className="
        relative
        isolate
        overflow-hidden
        bg-white
        py-20

        dark:bg-gray-950

        lg:py-28
      "
    >

      {/* =================================================
          GRID BACKGROUND
      ================================================== */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0
          -z-20
          opacity-70

          dark:opacity-30
        "
        style={{
          backgroundImage: `
            linear-gradient(
              to right,
              rgba(37,99,235,0.05) 1px,
              transparent 1px
            ),
            linear-gradient(
              to bottom,
              rgba(37,99,235,0.05) 1px,
              transparent 1px
            )
          `,
          backgroundSize:
            '52px 52px',

          WebkitMaskImage:
            'linear-gradient(to bottom, transparent, black 12%, black 88%, transparent)',

          maskImage:
            'linear-gradient(to bottom, transparent, black 12%, black 88%, transparent)',
        }}
      />

      {/* =================================================
          LARGE BACKGROUND GLOWS
      ================================================== */}

      <motion.div
        aria-hidden="true"
        style={{
          y: backgroundY,
        }}
        className="
          pointer-events-none
          absolute
          -left-64
          top-[20%]
          -z-10
          h-[36rem]
          w-[36rem]
          rounded-full
          bg-blue-400/10
          blur-[130px]

          dark:bg-blue-600/[0.08]
        "
      />

      <motion.div
        aria-hidden="true"
        style={{
          y: backgroundY,
        }}
        className="
          pointer-events-none
          absolute
          -right-64
          bottom-[15%]
          -z-10
          h-[40rem]
          w-[40rem]
          rounded-full
          bg-cyan-300/10
          blur-[140px]

          dark:bg-cyan-600/[0.07]
        "
      />

      {/* =================================================
          FLOATING DECORATIVE CODE
      ================================================== */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0
          z-0
          hidden
          overflow-hidden
          lg:block
        "
      >
        {decorativeCode.map((item, index) => (
          <motion.span
            key={`${item.text}-${index}`}
            className={`
              absolute
              select-none
              whitespace-nowrap
              font-mono
              font-black
              leading-none
              ${item.position}
              ${item.size}
              ${item.tone}
            `}
            animate={
              prefersReducedMotion
                ? undefined
                : {
                    x: [0, item.x, 0],
                    y: [0, item.y, 0],
                    rotate: [0, item.rotate, 0],
                  }
            }
            transition={{
              duration: item.duration,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: index * 0.22,
            }}
          >
            {item.text}
          </motion.span>
        ))}
      </div>

      <div
        className="
          relative
          z-10
          mx-auto
          max-w-7xl
          px-4

          sm:px-6
          lg:px-8
        "
      >

        {/* =================================================
            HEADER
        ================================================== */}

        <motion.div
          initial={{
            opacity: 0,
            y: prefersReducedMotion
              ? 0
              : 40,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.5,
          }}
          transition={{
            duration:
              prefersReducedMotion
                ? 0
                : 0.85,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="
            mx-auto
            mb-16
            max-w-3xl
            text-center

            lg:mb-20
          "
        >

          {/* Section tag */}

          <motion.div
            initial={{
              opacity: 0,
              scale: 0.9,
            }}
            whileInView={{
              opacity: 1,
              scale: 1,
            }}
            viewport={{
              once: true,
            }}
            className="
              mb-5
              inline-flex
              items-center
              gap-2
              rounded-full
              border
              border-blue-100
              bg-blue-50/70
              px-4
              py-2
              text-xs
              font-black
              uppercase
              tracking-[0.16em]
              text-blue-800
              shadow-sm
              backdrop-blur-xl

              dark:border-blue-500/15
              dark:bg-blue-500/[0.08]
              dark:text-blue-300
            "
          >
            <FaRocket size={12} />

            {currentLabels.sectionTag}
          </motion.div>

          {/* Heading */}

          <motion.h2
            initial={{
              opacity: 0,
              filter:
                prefersReducedMotion
                  ? 'blur(0px)'
                  : 'blur(10px)',
            }}
            whileInView={{
              opacity: 1,
              filter: 'blur(0px)',
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.8,
              delay: 0.08,
            }}
            className="
              text-4xl
              font-black
              tracking-[-0.045em]
              text-gray-950

              dark:text-white

              sm:text-5xl
              lg:text-6xl
            "
          >
            {t.journey.title}
          </motion.h2>

          {/* Animated line */}

          <div
            className="
              mx-auto
              mt-5
              h-1
              w-24
              overflow-hidden
              rounded-full
              bg-gray-100

              dark:bg-gray-800
            "
          >
            <motion.div
              initial={{
                scaleX: 0,
              }}
              whileInView={{
                scaleX: 1,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                duration: 0.9,
                delay: 0.2,
                ease: [0.16, 1, 0.3, 1],
              }}
              style={{
                transformOrigin: 'left',
              }}
              className="
                h-full
                w-full
                bg-gradient-to-r
                from-blue-700
                via-blue-500
                to-cyan-400
              "
            />
          </div>

          <motion.p
            initial={{
              opacity: 0,
              y: 15,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              delay: 0.18,
              duration: 0.7,
            }}
            className="
              mx-auto
              mt-6
              max-w-2xl
              text-lg
              leading-relaxed
              text-gray-600

              dark:text-gray-300

              sm:text-xl
            "
          >
            {t.journey.subtitle}
          </motion.p>

          {/* ===============================================
              MINI STATS
          ================================================ */}

          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              delay: 0.28,
            }}
            className="
              mx-auto
              mt-8
              grid
              max-w-xl
              grid-cols-3
              overflow-hidden
              rounded-2xl
              border
              border-gray-200/70
              bg-white/60
              shadow-sm
              backdrop-blur-xl

              dark:border-white/[0.06]
              dark:bg-white/[0.025]
            "
          >
            <div
              className="
                px-3
                py-4
                text-center
              "
            >
              <div
                className="
                  text-xl
                  font-black
                  text-gray-950

                  dark:text-white
                "
              >
                {
                  journeySteps.length
                }
              </div>

              <div
                className="
                  mt-1
                  text-[10px]
                  font-bold
                  uppercase
                  tracking-[0.1em]
                  text-gray-400
                "
              >
                {
                  currentLabels.milestones
                }
              </div>
            </div>

            <div
              className="
                border-x
                border-gray-200/70
                px-3
                py-4
                text-center

                dark:border-white/[0.06]
              "
            >
              <div
                className="
                  text-xl
                  font-black
                  text-gray-950

                  dark:text-white
                "
              >
                2017
              </div>

              <div
                className="
                  mt-1
                  text-[10px]
                  font-bold
                  uppercase
                  tracking-[0.1em]
                  text-gray-400
                "
              >
                {currentLabels.starting}
              </div>
            </div>

            <div
              className="
                px-3
                py-4
                text-center
              "
            >
              <div
                className="
                  text-xl
                  font-black
                  text-blue-700

                  dark:text-blue-400
                "
              >
                {currentLabels.today}
              </div>

              <div
                className="
                  mt-1
                  text-[10px]
                  font-bold
                  uppercase
                  tracking-[0.1em]
                  text-gray-400
                "
              >
                {currentLabels.present}
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* =================================================
            TIMELINE TITLE
        ================================================== */}

        <motion.div
          initial={{
            opacity: 0,
            x: -20,
          }}
          whileInView={{
            opacity: 1,
            x: 0,
          }}
          viewport={{
            once: true,
          }}
          className="
            mx-auto
            mb-10
            flex
            max-w-6xl
            items-center
            gap-3
          "
        >
          <div
            className="
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-xl
              bg-gradient-to-br
              from-blue-800
              to-blue-600
              text-white
              shadow-lg
              shadow-blue-900/20
            "
          >
            <FaCode size={15} />
          </div>

          <div>
            <div
              className="
                text-sm
                font-black
                uppercase
                tracking-[0.15em]
                text-gray-800

                dark:text-gray-200
              "
            >
              {currentLabels.timeline}
            </div>

            <div
              className="
                mt-0.5
                text-xs
                text-gray-400
              "
            >
              2017 → {currentLabels.today}
            </div>
          </div>
        </motion.div>

        {/* =================================================
            TIMELINE
        ================================================== */}

        <div
          className="
            relative
            mx-auto
            max-w-6xl
          "
        >

          {/* Timeline background */}

          <div
            aria-hidden="true"
            className="
              absolute
              bottom-0
              left-[18px]
              top-0
              w-[2px]
              rounded-full
              bg-gray-200

              dark:bg-gray-800

              md:left-1/2
              md:-translate-x-1/2
            "
          />

          {/* Timeline animated progress */}

          <motion.div
            aria-hidden="true"
            style={{
              scaleY: timelineScale,
              transformOrigin: 'top',
            }}
            className="
              absolute
              bottom-0
              left-[18px]
              top-0
              z-10
              w-[2px]
              rounded-full
              bg-gradient-to-b
              from-violet-500
              via-blue-500
              to-cyan-400
              shadow-[0_0_14px_rgba(59,130,246,0.45)]

              dark:shadow-[0_0_16px_rgba(59,130,246,0.35)]

              md:left-1/2
              md:-translate-x-1/2
            "
          />

          <div
            className="
              space-y-12

              md:space-y-16
            "
          >
            {journeySteps.map(
              (step, index) => {
                const config =
                  typeConfig[
                    step.type
                  ];

                const isLeft =
                  index % 2 === 0;

                const Icon =
                  config.icon;

                return (
                  <div
                    key={step.id}
                    className="
                      relative
                      min-h-[80px]
                    "
                  >

                    {/* ===================================
                        NODE
                    ==================================== */}

                    <motion.div
                      initial={{
                        scale: 0,
                        opacity: 0,
                      }}
                      whileInView={{
                        scale: 1,
                        opacity: 1,
                      }}
                      viewport={{
                        once: true,
                        amount: 0.8,
                      }}
                      transition={{
                        type: 'spring',
                        stiffness: 320,
                        damping: 19,
                        delay:
                          index * 0.04,
                      }}
                      className="
                        absolute
                        left-[2px]
                        top-8
                        z-20
                        flex
                        h-9
                        w-9
                        items-center
                        justify-center
                        rounded-full
                        border-[5px]
                        border-white
                        bg-gradient-to-br
                        from-blue-700
                        to-cyan-500
                        text-white
                        shadow-lg
                        shadow-blue-600/25

                        dark:border-gray-950

                        md:left-1/2
                        md:-translate-x-1/2
                      "
                    >
                      {step.type ===
                      'current' ? (
                        <FaStar
                          size={9}
                        />
                      ) : (
                        <FaCheck
                          size={9}
                        />
                      )}
                    </motion.div>

                    {/* Node pulse */}

                    {!prefersReducedMotion && (
                      <motion.div
                        aria-hidden="true"
                        className="
                          absolute
                          left-[7px]
                          top-[37px]
                          z-0
                          h-7
                          w-7
                          rounded-full
                          bg-blue-500/25

                          md:left-1/2
                          md:-translate-x-1/2
                        "
                        animate={{
                          scale: [
                            1,
                            1.8,
                            1,
                          ],
                          opacity: [
                            0.4,
                            0,
                            0.4,
                          ],
                        }}
                        transition={{
                          duration:
                            step.type ===
                            'current'
                              ? 1.7
                              : 3.4,

                          repeat: Infinity,

                          delay:
                            index * 0.35,

                          ease: 'easeInOut',
                        }}
                      />
                    )}

                    {/* Connector */}

                    <motion.div
                      aria-hidden="true"
                      initial={{
                        scaleX: 0,
                      }}
                      whileInView={{
                        scaleX: 1,
                      }}
                      viewport={{
                        once: true,
                      }}
                      transition={{
                        duration: 0.55,
                        delay: 0.15,
                      }}
                      style={{
                        transformOrigin:
                          isLeft
                            ? 'right'
                            : 'left',
                      }}
                      className={`
                        absolute
                        top-[49px]
                        hidden
                        h-px
                        w-[34px]
                        bg-gradient-to-r
                        from-blue-300
                        to-blue-500/30

                        dark:from-blue-500/30
                        dark:to-blue-500/10

                        md:block

                        ${
                          isLeft
                            ? `
                              right-1/2
                              mr-[18px]
                            `
                            : `
                              left-1/2
                              ml-[18px]
                            `
                        }
                      `}
                    />

                    {/* ===================================
                        CARD
                    ==================================== */}

                    <div
                      className={`
                        ml-14

                        md:ml-0
                        md:w-[calc(50%-3rem)]

                        ${
                          isLeft
                            ? `
                              md:mr-auto
                            `
                            : `
                              md:ml-auto
                            `
                        }
                      `}
                    >
                      <JourneyCard
                        step={step}
                        index={index}
                        total={
                          journeySteps.length
                        }
                        config={config}
                        keyAreasLabel={
                          t.journey
                            .keyAreas
                        }
                        currentLabel={
                          currentLabels.currentBadge
                        }
                        prefersReducedMotion={
                          prefersReducedMotion
                        }
                      />
                    </div>
                  </div>
                );
              }
            )}
          </div>
        </div>

        {/* =================================================
            GROWTH SUMMARY
        ================================================== */}

        <motion.div
          initial={{
            opacity: 0,
            y: prefersReducedMotion
              ? 0
              : 60,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.35,
          }}
          transition={{
            duration:
              prefersReducedMotion
                ? 0
                : 0.85,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="
            relative
            mx-auto
            mt-20
            max-w-5xl

            lg:mt-28
          "
        >

          {/* Animated gradient border */}

          <motion.div
            aria-hidden="true"
            className="
              absolute
              -inset-[1px]
              rounded-[2rem]
              bg-gradient-to-r
              from-blue-600
              via-cyan-400
              to-violet-600
              opacity-60
              blur-[1px]
              [background-size:200%_200%]
            "
            animate={
              prefersReducedMotion
                ? undefined
                : {
                    backgroundPosition: [
                      '0% 50%',
                      '100% 50%',
                      '0% 50%',
                    ],
                  }
            }
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: 'linear',
            }}
          />

          <div
            className="
              group/summary
              relative
              overflow-hidden
              rounded-[1.95rem]
              bg-white
              p-7
              shadow-[0_20px_70px_rgba(15,23,42,0.08)]

              dark:bg-gray-900
              dark:shadow-[0_25px_80px_rgba(0,0,0,0.35)]

              sm:p-9
              lg:p-12
            "
          >

            {/* Background glow */}

            <div
              aria-hidden="true"
              className="
                pointer-events-none
                absolute
                -left-20
                top-1/2
                h-72
                w-72
                -translate-y-1/2
                rounded-full
                bg-blue-500/10
                blur-[100px]
              "
            />

            {/* Giant arrow */}

            <motion.div
              aria-hidden="true"
              className="
                pointer-events-none
                absolute
                -right-6
                -top-8
                text-[12rem]
                font-black
                text-blue-900/[0.025]

                dark:text-blue-300/[0.03]
              "
              animate={
                prefersReducedMotion
                  ? undefined
                  : {
                      x: [0, 8, 0],
                    }
              }
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              →
            </motion.div>

            <div
              className="
                relative
                z-10
                grid
                gap-7

                md:grid-cols-[auto_1fr]
                md:items-start
              "
            >

              {/* Icon */}

              <motion.div
                whileHover={
                  prefersReducedMotion
                    ? undefined
                    : {
                        rotate: -8,
                        scale: 1.07,
                      }
                }
                className="
                  flex
                  h-16
                  w-16
                  items-center
                  justify-center
                  rounded-2xl
                  bg-gradient-to-br
                  from-blue-800
                  via-blue-700
                  to-cyan-600
                  text-white
                  shadow-xl
                  shadow-blue-900/20
                "
              >
                <FaRocket size={23} />
              </motion.div>

              <div>
                <div
                  className="
                    mb-3
                    flex
                    flex-wrap
                    items-center
                    gap-3
                  "
                >
                  <span
                    className="
                      text-xs
                      font-black
                      uppercase
                      tracking-[0.15em]
                      text-blue-700

                      dark:text-blue-400
                    "
                  >
                    {currentLabels.growth}
                  </span>

                  <span
                    aria-hidden="true"
                    className="
                      h-1
                      w-1
                      rounded-full
                      bg-gray-300

                      dark:bg-gray-600
                    "
                  />

                  <span
                    className="
                      text-xs
                      font-semibold
                      text-gray-400
                    "
                  >
                    2017 → {currentLabels.today}
                  </span>
                </div>

                <h3
                  className="
                    mb-4
                    text-2xl
                    font-black
                    tracking-[-0.025em]
                    text-gray-950

                    dark:text-white

                    sm:text-3xl
                  "
                >
                  {t.journey.howIGrew}
                </h3>

                <p
                  className="
                    max-w-3xl
                    leading-relaxed
                    text-gray-600

                    dark:text-gray-300
                  "
                >
                  {t.journey.howIGrewText}
                </p>

                {/* Infinite little progress */}

                <div
                  className="
                    mt-7
                    h-[3px]
                    w-28
                    overflow-hidden
                    rounded-full
                    bg-gray-100

                    dark:bg-gray-800
                  "
                >
                  <motion.div
                    animate={
                      prefersReducedMotion
                        ? undefined
                        : {
                            x: [
                              '-100%',
                              '200%',
                            ],
                          }
                    }
                    transition={{
                      duration: 2.4,
                      repeat: Infinity,
                      repeatDelay: 0.7,
                      ease: 'easeInOut',
                    }}
                    className="
                      h-full
                      w-1/2
                      rounded-full
                      bg-gradient-to-r
                      from-blue-600
                      to-cyan-400
                    "
                  />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom fade */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          bottom-0
          left-0
          right-0
          h-24
          bg-gradient-to-b
          from-transparent
          to-gray-50/40

          dark:to-gray-900/20
        "
      />
    </section>
  );
};

export default EngineeringJourney;