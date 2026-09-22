import React, {
  useContext,
  useMemo,
  useRef,
} from 'react';

import {
  FaBolt,
  FaCheckCircle,
  FaCode,
  FaCubes,
  FaLayerGroup,
  FaPlug,
  FaRocket,
  FaServer,
  FaTachometerAlt,
  FaTools,
  FaVial,
} from 'react-icons/fa';

import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'motion/react';

import { LanguageContext } from '../context/LanguageContext';
import translations from '../data/translations.json';

/* =========================================================
   SKILL CATEGORY CARD
========================================================= */

const SkillCategoryCard = ({
  category,
  index,
  config,
  labels,
  prefersReducedMotion,
}) => {
  const cardRef = useRef(null);

  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);

  const rawRotateY = useTransform(
    pointerX,
    [-0.5, 0.5],
    [-4.5, 4.5]
  );

  const rawRotateX = useTransform(
    pointerY,
    [-0.5, 0.5],
    [4.5, -4.5]
  );

  const rotateX = useSpring(rawRotateX, {
    stiffness: 190,
    damping: 22,
  });

  const rotateY = useSpring(rawRotateY, {
    stiffness: 190,
    damping: 22,
  });

  const glowX = useMotionValue(240);
  const glowY = useMotionValue(180);

  const smoothGlowX = useSpring(glowX, {
    stiffness: 150,
    damping: 24,
  });

  const smoothGlowY = useSpring(glowY, {
    stiffness: 150,
    damping: 24,
  });

  const spotlight = useMotionTemplate`
    radial-gradient(
      520px circle at ${smoothGlowX}px ${smoothGlowY}px,
      ${config.spotlight},
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
        duration:
          prefersReducedMotion
            ? 0
            : 0.8,
        delay:
          prefersReducedMotion
            ? 0
            : index * 0.07,
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
      {/* Outer ambient glow */}
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

      <div
        className={`
          relative
          h-full
          overflow-hidden
          rounded-[1.8rem]
          border
          bg-white/90
          p-6
          shadow-[0_16px_50px_rgba(15,23,42,0.055)]
          backdrop-blur-xl
          transition-[transform,box-shadow,border-color]
          duration-500

          group-hover/card:-translate-y-1
          group-hover/card:shadow-[0_28px_80px_rgba(15,23,42,0.12)]

          dark:bg-gray-900/85
          dark:shadow-[0_20px_65px_rgba(0,0,0,0.30)]

          sm:p-7
          lg:p-8

          ${config.border}
        `}
      >
        {/* Mouse-follow spotlight */}
        <motion.div
          aria-hidden="true"
          style={{
            background: spotlight,
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

        {/* Giant index */}
        <span
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            -right-2
            -top-7
            select-none
            text-[9rem]
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
            h-56
            w-56
            rounded-full
            blur-[90px]
            ${config.cornerGlow}
          `}
        />

        <div className="relative z-10">
          {/* Top row */}
          <div
            className="
              mb-6
              flex
              items-center
              justify-between
              gap-4
            "
          >
            <motion.div
              whileHover={
                prefersReducedMotion
                  ? undefined
                  : {
                      rotate: -7,
                      scale: 1.06,
                    }
              }
              className={`
                flex
                h-12
                w-12
                items-center
                justify-center
                rounded-2xl
                shadow-lg
                ${config.iconBox}
              `}
            >
              <Icon size={18} />
            </motion.div>

            <div
              className={`
                rounded-full
                border
                px-3
                py-1.5
                text-[10px]
                font-black
                uppercase
                tracking-[0.12em]
                ${config.badge}
              `}
            >
              {category.skills.length}{' '}
              {labels.skills}
            </div>
          </div>

          {/* Heading */}
          <motion.h3
            whileHover={
              prefersReducedMotion
                ? undefined
                : {
                    x: 4,
                  }
            }
            className="
              text-2xl
              font-black
              tracking-[-0.035em]
              text-gray-950

              dark:text-white
            "
          >
            {category.category}
          </motion.h3>

          <p
            className="
              mt-3
              min-h-[72px]
              text-sm
              leading-relaxed
              text-gray-600

              dark:text-gray-300
            "
          >
            {category.description}
          </p>

          {/* Divider */}
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

          {/* Skills */}
          <div className="flex flex-wrap gap-2">
            {category.skills.map(
              (skill, skillIndex) => (
                <motion.span
                  key={skill}
                  initial={{
                    opacity: 0,
                    y: 10,
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
                        : 0.12 +
                          skillIndex *
                            0.035,
                  }}
                  whileHover={
                    prefersReducedMotion
                      ? undefined
                      : {
                          y: -3,
                          scale: 1.04,
                        }
                  }
                  whileTap={{
                    scale: 0.97,
                  }}
                  className={`
                    group/skill
                    relative
                    cursor-default
                    overflow-hidden
                    rounded-full
                    border
                    bg-white/75
                    px-3
                    py-1.5
                    text-sm
                    font-semibold
                    shadow-sm
                    backdrop-blur-md
                    transition-colors

                    dark:bg-white/[0.035]

                    ${config.skill}
                  `}
                >
                  <span
                    aria-hidden="true"
                    className="
                      absolute
                      inset-0
                      -translate-x-[120%]
                      bg-gradient-to-r
                      from-transparent
                      via-white/90
                      to-transparent
                      transition-transform
                      duration-700
                      group-hover/skill:translate-x-[120%]

                      dark:via-white/10
                    "
                  />

                  <span className="relative">
                    {skill}
                  </span>
                </motion.span>
              )
            )}
          </div>

          {/* Bottom micro accent */}
          <div
            className="
              mt-7
              flex
              items-center
              gap-2
            "
          >
            <div
              className="
                h-[3px]
                w-12
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
                          '180%',
                        ],
                      }
                }
                transition={{
                  duration: 2.3,
                  repeat: Infinity,
                  repeatDelay: 1,
                  ease: 'easeInOut',
                  delay: index * 0.3,
                }}
                className={`
                  h-full
                  w-1/2
                  rounded-full
                  bg-gradient-to-r
                  ${config.gradient}
                `}
              />
            </div>

            <span
              className="
                text-[10px]
                font-black
                uppercase
                tracking-[0.12em]
                text-gray-400
              "
            >
              {labels.activeToolkit}
            </span>
          </div>
        </div>
      </div>
    </motion.article>
  );
};

/* =========================================================
   DEVELOPMENT APPROACH CARD
========================================================= */

const ApproachCard = ({
  approach,
  index,
  config,
  prefersReducedMotion,
}) => {
  const Icon = config.icon;

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: prefersReducedMotion
          ? 0
          : 35,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
        amount: 0.3,
      }}
      transition={{
        duration:
          prefersReducedMotion
            ? 0
            : 0.7,
        delay:
          prefersReducedMotion
            ? 0
            : index * 0.08,
        ease: [0.16, 1, 0.3, 1],
      }}
      whileHover={
        prefersReducedMotion
          ? undefined
          : {
              y: -5,
            }
      }
      className="
        group/approach
        relative
        overflow-hidden
        rounded-2xl
        border
        border-gray-200/80
        bg-white/75
        p-5
        shadow-sm
        backdrop-blur-xl
        transition-[border-color,box-shadow]
        duration-500

        hover:border-blue-200
        hover:shadow-[0_18px_45px_rgba(37,99,235,0.10)]

        dark:border-white/[0.07]
        dark:bg-white/[0.03]
        dark:hover:border-blue-500/20
      "
    >
      {/* Hover sweep */}
      <span
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-y-0
          -left-1/2
          w-1/3
          -skew-x-12
          bg-gradient-to-r
          from-transparent
          via-blue-100/70
          to-transparent
          opacity-0
          transition-all
          duration-700
          group-hover/approach:left-[120%]
          group-hover/approach:opacity-100

          dark:via-blue-400/10
        "
      />

      <div className="relative z-10">
        <div
          className="
            mb-5
            flex
            items-center
            justify-between
            gap-4
          "
        >
          <div
            className={`
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-xl
              ${config.iconBox}
            `}
          >
            <Icon size={14} />
          </div>

          <span
            className="
              font-mono
              text-xs
              font-black
              tracking-[0.15em]
              text-gray-300

              dark:text-gray-700
            "
          >
            0{index + 1}
          </span>
        </div>

        <h4
          className="
            mb-2
            text-lg
            font-black
            tracking-tight
            text-gray-950

            dark:text-white
          "
        >
          {approach.title}
        </h4>

        <p
          className="
            text-sm
            leading-relaxed
            text-gray-600

            dark:text-gray-300
          "
        >
          {approach.description}
        </p>
      </div>
    </motion.div>
  );
};

/* =========================================================
   MAIN SKILLS SECTION
========================================================= */

const Skills = () => {
  const { language } =
    useContext(LanguageContext);

  const t = translations[language];

  const sectionRef = useRef(null);

  const prefersReducedMotion =
    useReducedMotion();

  const content = {
    en: {
      categories: [
        {
          id: 'frontend',
          category: 'Frontend',
          skills: [
            'React',
            'TypeScript',
            'JavaScript',
            'Vue.js',
            'HTML',
            'CSS',
            'Tailwind CSS',
          ],
          description:
            'Building responsive, accessible user interfaces with modern frameworks and component-based architecture.',
        },
        {
          id: 'backend',
          category: 'Backend & APIs',
          skills: [
            'Python',
            'FastAPI',
            'Node.js',
            'REST APIs',
            'SQLAlchemy',
            'Pydantic',
          ],
          description:
            'Building backend services with Python/FastAPI and integrating REST APIs, including Node.js-based services.',
        },
        {
          id: 'testing',
          category: 'Testing & Quality',
          skills: [
            'Playwright',
            'Vitest',
            'Jest',
            'React Testing Library',
            'pytest',
            'Lighthouse',
          ],
          description:
            'Ensuring code quality through automated testing, performance profiling, and accessibility auditing.',
        },
        {
          id: 'tools',
          category: 'Tools & DevOps',
          skills: [
            'Git',
            'GitHub',
            'Docker',
            'Docker Compose',
            'Vite',
            'PyWebView',
            'Figma',
          ],
          description:
            'Using modern development tools, version control, containerization, and collaborative design workflows.',
        },
      ],

      approaches: [
        {
          id: 'component-driven',
          title:
            'Component-Driven Development',
          description:
            'Building reusable, type-safe components with clear interfaces and isolated testing.',
        },
        {
          id: 'testing-quality',
          title:
            'Testing & Quality',
          description:
            'Using automated testing across unit, component, and end-to-end levels, supported by performance and accessibility validation.',
        },
        {
          id: 'performance',
          title:
            'Performance Optimization',
          description:
            'Profiling and optimizing Core Web Vitals, bundle size, rendering behavior, and runtime performance.',
        },
        {
          id: 'api-integration',
          title:
            'API Integration',
          description:
            'Designing and consuming REST APIs with error handling, validation, and type safety in mind.',
        },
      ],
    },

    tr: {
      categories: [
        {
          id: 'frontend',
          category: 'Frontend',
          skills: [
            'React',
            'TypeScript',
            'JavaScript',
            'Vue.js',
            'HTML',
            'CSS',
            'Tailwind CSS',
          ],
          description:
            'Modern frameworkler ve bileşen tabanlı mimari kullanarak responsive ve erişilebilir kullanıcı arayüzleri geliştiriyorum.',
        },
        {
          id: 'backend',
          category:
            "Backend & API'ler",
          skills: [
            'Python',
            'FastAPI',
            'Node.js',
            "REST API'ler",
            'SQLAlchemy',
            'Pydantic',
          ],
          description:
            "Python/FastAPI ile backend servisleri geliştiriyor ve Node.js tabanlı servisler dahil REST API entegrasyonları üzerinde çalışıyorum.",
        },
        {
          id: 'testing',
          category:
            'Test & Kalite',
          skills: [
            'Playwright',
            'Vitest',
            'Jest',
            'React Testing Library',
            'pytest',
            'Lighthouse',
          ],
          description:
            'Otomatik test, performans profilleme ve erişilebilirlik kontrolleriyle kod kalitesini destekliyorum.',
        },
        {
          id: 'tools',
          category:
            'Araçlar & DevOps',
          skills: [
            'Git',
            'GitHub',
            'Docker',
            'Docker Compose',
            'Vite',
            'PyWebView',
            'Figma',
          ],
          description:
            'Modern geliştirme araçları, sürüm kontrolü, konteynerizasyon ve tasarım işbirliği süreçlerini kullanıyorum.',
        },
      ],

      approaches: [
        {
          id: 'component-driven',
          title:
            'Bileşen Tabanlı Geliştirme',
          description:
            'Net arayüzlere sahip, yeniden kullanılabilir ve tip güvenli bileşenler geliştiriyorum.',
        },
        {
          id: 'testing-quality',
          title:
            'Test & Kalite',
          description:
            'Unit, component ve end-to-end seviyelerinde otomatik testler; performans ve erişilebilirlik kontrolleri uyguluyorum.',
        },
        {
          id: 'performance',
          title:
            'Performans Optimizasyonu',
          description:
            'Core Web Vitals, bundle boyutu, rendering davranışı ve runtime performansını analiz edip optimize ediyorum.',
        },
        {
          id: 'api-integration',
          title:
            'API Entegrasyonu',
          description:
            "REST API'leri hata yönetimi, doğrulama ve tip güvenliğini dikkate alarak tasarlıyor ve entegre ediyorum.",
        },
      ],
    },

    de: {
      categories: [
        {
          id: 'frontend',
          category: 'Frontend',
          skills: [
            'React',
            'TypeScript',
            'JavaScript',
            'Vue.js',
            'HTML',
            'CSS',
            'Tailwind CSS',
          ],
          description:
            'Entwicklung responsiver und zugänglicher Benutzeroberflächen mit modernen Frameworks und komponentenbasierter Architektur.',
        },
        {
          id: 'backend',
          category:
            'Backend & APIs',
          skills: [
            'Python',
            'FastAPI',
            'Node.js',
            'REST-APIs',
            'SQLAlchemy',
            'Pydantic',
          ],
          description:
            'Entwicklung von Backend-Services mit Python/FastAPI und Integration von REST-APIs, einschließlich Node.js-basierter Services.',
        },
        {
          id: 'testing',
          category:
            'Testing & Qualität',
          skills: [
            'Playwright',
            'Vitest',
            'Jest',
            'React Testing Library',
            'pytest',
            'Lighthouse',
          ],
          description:
            'Sicherstellung der Codequalität durch automatisierte Tests, Performance-Profiling und Accessibility-Prüfungen.',
        },
        {
          id: 'tools',
          category:
            'Tools & DevOps',
          skills: [
            'Git',
            'GitHub',
            'Docker',
            'Docker Compose',
            'Vite',
            'PyWebView',
            'Figma',
          ],
          description:
            'Einsatz moderner Entwicklungstools, Versionskontrolle, Containerisierung und kollaborativer Designprozesse.',
        },
      ],

      approaches: [
        {
          id: 'component-driven',
          title:
            'Komponentenbasierte Entwicklung',
          description:
            'Entwicklung wiederverwendbarer, typsicherer Komponenten mit klaren Schnittstellen und isolierten Tests.',
        },
        {
          id: 'testing-quality',
          title:
            'Testing & Qualität',
          description:
            'Automatisierte Tests auf Unit-, Komponenten- und End-to-End-Ebene sowie Performance- und Accessibility-Prüfungen.',
        },
        {
          id: 'performance',
          title:
            'Performance-Optimierung',
          description:
            'Analyse und Optimierung von Core Web Vitals, Bundle-Größe, Rendering-Verhalten und Laufzeit-Performance.',
        },
        {
          id: 'api-integration',
          title:
            'API-Integration',
          description:
            'Entwicklung und Integration von REST-APIs mit Fehlerbehandlung, Validierung und Typsicherheit.',
        },
      ],
    },
  };

  const labels = {
    en: {
      sectionTag:
        'Technical Toolkit',
      ecosystem:
        'Technology Ecosystem',
      categories:
        'Categories',
      skills:
        'Skills',
      approaches:
        'Approaches',
      activeToolkit:
        'Active toolkit',
      stackUniverse:
        'Stack Universe',
      stackUniverseText:
        'A connected toolkit spanning interface engineering, backend services, testing, performance, and delivery.',
      engineeringMindset:
        'Engineering Mindset',
      approachSubtitle:
        'How the toolkit is applied in real engineering work',
      connected:
        'Connected System',
      build:
        'Build',
      test:
        'Test',
      optimize:
        'Optimize',
      ship:
        'Ship',
    },

    tr: {
      sectionTag:
        'Teknik Araç Seti',
      ecosystem:
        'Teknoloji Ekosistemi',
      categories:
        'Kategori',
      skills:
        'Teknoloji',
      approaches:
        'Yaklaşım',
      activeToolkit:
        'Aktif araç seti',
      stackUniverse:
        'Teknoloji Evreni',
      stackUniverseText:
        'Arayüz geliştirme, backend servisleri, test, performans ve delivery süreçlerini birbirine bağlayan teknik araç seti.',
      engineeringMindset:
        'Mühendislik Yaklaşımı',
      approachSubtitle:
        'Teknik araçların gerçek geliştirme süreçlerinde nasıl kullanıldığı',
      connected:
        'Bağlantılı Sistem',
      build:
        'Geliştir',
      test:
        'Test Et',
      optimize:
        'Optimize Et',
      ship:
        'Yayınla',
    },

    de: {
      sectionTag:
        'Technisches Toolkit',
      ecosystem:
        'Technologie-Ökosystem',
      categories:
        'Kategorien',
      skills:
        'Skills',
      approaches:
        'Ansätze',
      activeToolkit:
        'Aktives Toolkit',
      stackUniverse:
        'Stack-Universum',
      stackUniverseText:
        'Ein verbundenes Toolkit für Interface-Engineering, Backend-Services, Testing, Performance und Delivery.',
      engineeringMindset:
        'Engineering-Ansatz',
      approachSubtitle:
        'Wie das Toolkit in realen Engineering-Prozessen eingesetzt wird',
      connected:
        'Verbundenes System',
      build:
        'Build',
      test:
        'Test',
      optimize:
        'Optimieren',
      ship:
        'Ship',
    },
  };

  const currentContent =
    content[language] || content.en;

  const currentLabels =
    labels[language] || labels.en;

  const allSkills = useMemo(
    () =>
      [
        ...new Set(
          currentContent.categories.flatMap(
            (category) =>
              category.skills
          )
        ),
      ],
    [currentContent]
  );

  const orbitSkills =
    allSkills.slice(0, 12);

  const categoryConfigs = {
    frontend: {
      icon: FaCode,
      gradient:
        'from-blue-700 via-blue-500 to-cyan-400',
      border:
        'border-blue-200/80 dark:border-blue-500/15',
      badge:
        'border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-500/15 dark:bg-blue-500/10 dark:text-blue-300',
      skill:
        'border-blue-100 text-blue-800 hover:border-blue-200 hover:bg-blue-50 dark:border-blue-500/10 dark:text-blue-200 dark:hover:border-blue-500/20 dark:hover:bg-blue-500/[0.08]',
      iconBox:
        'bg-gradient-to-br from-blue-700 to-cyan-500 text-white shadow-blue-900/20',
      cornerGlow:
        'bg-blue-500/10',
      outerGlow:
        'bg-blue-500/15',
      spotlight:
        'rgba(37, 99, 235, 0.13)',
    },

    backend: {
      icon: FaServer,
      gradient:
        'from-violet-600 via-indigo-500 to-blue-400',
      border:
        'border-violet-200/80 dark:border-violet-500/15',
      badge:
        'border-violet-200 bg-violet-50 text-violet-700 dark:border-violet-500/15 dark:bg-violet-500/10 dark:text-violet-300',
      skill:
        'border-violet-100 text-violet-800 hover:border-violet-200 hover:bg-violet-50 dark:border-violet-500/10 dark:text-violet-200 dark:hover:border-violet-500/20 dark:hover:bg-violet-500/[0.08]',
      iconBox:
        'bg-gradient-to-br from-violet-700 to-indigo-500 text-white shadow-violet-900/20',
      cornerGlow:
        'bg-violet-500/10',
      outerGlow:
        'bg-violet-500/15',
      spotlight:
        'rgba(124, 58, 237, 0.12)',
    },

    testing: {
      icon: FaVial,
      gradient:
        'from-emerald-600 via-teal-500 to-cyan-400',
      border:
        'border-emerald-200/80 dark:border-emerald-500/15',
      badge:
        'border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-500/15 dark:bg-emerald-500/10 dark:text-emerald-300',
      skill:
        'border-emerald-100 text-emerald-800 hover:border-emerald-200 hover:bg-emerald-50 dark:border-emerald-500/10 dark:text-emerald-200 dark:hover:border-emerald-500/20 dark:hover:bg-emerald-500/[0.08]',
      iconBox:
        'bg-gradient-to-br from-emerald-700 to-teal-500 text-white shadow-emerald-900/20',
      cornerGlow:
        'bg-emerald-500/10',
      outerGlow:
        'bg-emerald-500/15',
      spotlight:
        'rgba(5, 150, 105, 0.12)',
    },

    tools: {
      icon: FaTools,
      gradient:
        'from-amber-600 via-orange-500 to-rose-400',
      border:
        'border-amber-200/80 dark:border-amber-500/15',
      badge:
        'border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-500/15 dark:bg-amber-500/10 dark:text-amber-300',
      skill:
        'border-amber-100 text-amber-800 hover:border-amber-200 hover:bg-amber-50 dark:border-amber-500/10 dark:text-amber-200 dark:hover:border-amber-500/20 dark:hover:bg-amber-500/[0.08]',
      iconBox:
        'bg-gradient-to-br from-amber-600 to-orange-500 text-white shadow-amber-900/20',
      cornerGlow:
        'bg-amber-500/10',
      outerGlow:
        'bg-amber-500/15',
      spotlight:
        'rgba(217, 119, 6, 0.12)',
    },
  };

  const approachConfigs = [
    {
      icon: FaCubes,
      iconBox:
        'bg-blue-50 text-blue-700 dark:bg-blue-500/10 dark:text-blue-300',
    },
    {
      icon: FaCheckCircle,
      iconBox:
        'bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300',
    },
    {
      icon: FaTachometerAlt,
      iconBox:
        'bg-violet-50 text-violet-700 dark:bg-violet-500/10 dark:text-violet-300',
    },
    {
      icon: FaPlug,
      iconBox:
        'bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-300',
    },
  ];

  const decorativeCode = [
    {
      text: '<UI />',
      position:
        'left-[4%] top-[13%]',
      size: 'text-6xl',
      duration: 8,
    },
    {
      text: 'type Safe<T>',
      position:
        'right-[4%] top-[22%]',
      size: 'text-4xl',
      duration: 10,
    },
    {
      text: 'REST',
      position:
        'left-[6%] top-[40%]',
      size: 'text-7xl',
      duration: 8.5,
    },
    {
      text: 'pytest',
      position:
        'right-[7%] top-[48%]',
      size: 'text-5xl',
      duration: 9,
    },
    {
      text: '{...props}',
      position:
        'left-[4%] top-[63%]',
      size: 'text-5xl',
      duration: 11,
    },
    {
      text: 'docker compose',
      position:
        'right-[4%] top-[72%]',
      size: 'text-4xl',
      duration: 10.5,
    },
    {
      text: 'git push',
      position:
        'left-[8%] top-[84%]',
      size: 'text-5xl',
      duration: 9.5,
    },
    {
      text: '200 OK',
      position:
        'right-[8%] top-[91%]',
      size: 'text-5xl',
      duration: 8,
    },
  ];

  const { scrollYProgress } =
    useScroll({
      target: sectionRef,
      offset: [
        'start 80%',
        'end 25%',
      ],
    });

  const progressScaleX =
    useSpring(
      scrollYProgress,
      {
        stiffness: 100,
        damping: 25,
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

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="
        relative
        isolate
        overflow-hidden
        bg-gray-50
        py-20

        dark:bg-gray-950

        lg:py-28
      "
    >
      {/* ==================================================
          BACKGROUND GRID
      =================================================== */}

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
            '50px 50px',

          WebkitMaskImage:
            'linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)',

          maskImage:
            'linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)',
        }}
      />

      {/* ==================================================
          AMBIENT GLOWS
      =================================================== */}

      <motion.div
        aria-hidden="true"
        style={{
          y: backgroundY,
        }}
        className="
          pointer-events-none
          absolute
          -left-64
          top-[18%]
          -z-10
          h-[38rem]
          w-[38rem]
          rounded-full
          bg-blue-400/10
          blur-[140px]

          dark:bg-blue-700/[0.08]
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
          bg-violet-400/10
          blur-[150px]

          dark:bg-violet-700/[0.07]
        "
      />

      {/* ==================================================
          FLOATING CODE
      =================================================== */}

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
        {decorativeCode.map(
          (item, index) => (
            <motion.span
              key={item.text}
              className={`
                absolute
                select-none
                whitespace-nowrap
                font-mono
                font-black
                leading-none
                text-blue-950/[0.025]

                dark:text-blue-200/[0.035]

                ${item.position}
                ${item.size}
              `}
              animate={
                prefersReducedMotion
                  ? undefined
                  : {
                      y: [
                        0,
                        index % 2 === 0
                          ? -14
                          : 14,
                        0,
                      ],
                      x: [
                        0,
                        index % 2 === 0
                          ? 8
                          : -8,
                        0,
                      ],
                      rotate: [
                        0,
                        index % 2 === 0
                          ? 3
                          : -3,
                        0,
                      ],
                    }
              }
              transition={{
                duration:
                  item.duration,
                repeat: Infinity,
                ease: 'easeInOut',
                delay:
                  index * 0.3,
              }}
            >
              {item.text}
            </motion.span>
          )
        )}
      </div>

      {/* ==================================================
          SECTION PROGRESS
      =================================================== */}

      <motion.div
        aria-hidden="true"
        style={{
          scaleX:
            progressScaleX,
          transformOrigin: 'left',
        }}
        className="
          absolute
          left-0
          top-0
          z-20
          h-[3px]
          w-full
          bg-gradient-to-r
          from-blue-700
          via-cyan-400
          to-violet-500
          shadow-[0_0_14px_rgba(59,130,246,0.35)]
        "
      />

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
        {/* ==================================================
            HEADER
        =================================================== */}

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
            mb-14
            max-w-3xl
            text-center

            lg:mb-16
          "
        >
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
              bg-white/70
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
              dark:bg-white/[0.035]
              dark:text-blue-300
            "
          >
            <FaBolt size={11} />

            {currentLabels.sectionTag}
          </motion.div>

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
            {t.skills.title}
          </motion.h2>

          <div
            className="
              mx-auto
              mt-5
              h-1
              w-24
              overflow-hidden
              rounded-full
              bg-gray-200

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
                transformOrigin:
                  'left',
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
            {t.skills.subtitle}
          </motion.p>

          {/* Stats */}
          <motion.div
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
              bg-white/65
              shadow-sm
              backdrop-blur-xl

              dark:border-white/[0.06]
              dark:bg-white/[0.025]
            "
          >
            <div className="px-3 py-4 text-center">
              <div
                className="
                  text-xl
                  font-black
                  text-gray-950

                  dark:text-white
                "
              >
                {
                  currentContent
                    .categories.length
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
                {currentLabels.categories}
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
                  text-blue-700

                  dark:text-blue-400
                "
              >
                {allSkills.length}
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
                {currentLabels.skills}
              </div>
            </div>

            <div className="px-3 py-4 text-center">
              <div
                className="
                  text-xl
                  font-black
                  text-gray-950

                  dark:text-white
                "
              >
                {
                  currentContent
                    .approaches.length
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
                {currentLabels.approaches}
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* ==================================================
            STACK UNIVERSE
        =================================================== */}

        <motion.div
          initial={{
            opacity: 0,
            y: prefersReducedMotion
              ? 0
              : 45,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.2,
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
            mb-14
            max-w-6xl
            overflow-hidden
            rounded-[2rem]
            border
            border-gray-200/80
            bg-white/75
            shadow-[0_18px_65px_rgba(15,23,42,0.06)]
            backdrop-blur-xl

            dark:border-white/[0.07]
            dark:bg-white/[0.025]
            dark:shadow-[0_22px_70px_rgba(0,0,0,0.25)]

            lg:mb-18
          "
        >
          {/* Animated border glow */}
          <motion.div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              -inset-[1px]
              -z-10
              rounded-[2rem]
              bg-gradient-to-r
              from-blue-600/35
              via-cyan-400/20
              to-violet-600/35
              opacity-70
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
              grid
              gap-0

              lg:grid-cols-[0.8fr_1.2fr]
            "
          >
            {/* Left copy */}
            <div
              className="
                relative
                border-b
                border-gray-200/70
                p-7

                dark:border-white/[0.06]

                sm:p-9
                lg:border-b-0
                lg:border-r
                lg:p-10
              "
            >
              <div
                className="
                  mb-4
                  inline-flex
                  items-center
                  gap-2
                  rounded-full
                  border
                  border-blue-100
                  bg-blue-50/80
                  px-3
                  py-1.5
                  text-[10px]
                  font-black
                  uppercase
                  tracking-[0.13em]
                  text-blue-700

                  dark:border-blue-500/15
                  dark:bg-blue-500/10
                  dark:text-blue-300
                "
              >
                <FaLayerGroup size={11} />
                {currentLabels.ecosystem}
              </div>

              <h3
                className="
                  text-3xl
                  font-black
                  tracking-[-0.04em]
                  text-gray-950

                  dark:text-white

                  sm:text-4xl
                "
              >
                {currentLabels.stackUniverse}
              </h3>

              <p
                className="
                  mt-4
                  max-w-xl
                  leading-relaxed
                  text-gray-600

                  dark:text-gray-300
                "
              >
                {currentLabels.stackUniverseText}
              </p>

              {/* Build flow */}
              <div
                className="
                  mt-8
                  flex
                  flex-wrap
                  items-center
                  gap-2
                "
              >
                {[
                  currentLabels.build,
                  currentLabels.test,
                  currentLabels.optimize,
                  currentLabels.ship,
                ].map(
                  (item, index) => (
                    <React.Fragment key={item}>
                      <motion.span
                        whileHover={
                          prefersReducedMotion
                            ? undefined
                            : {
                                y: -2,
                              }
                        }
                        className="
                          rounded-full
                          border
                          border-gray-200
                          bg-white
                          px-3
                          py-1.5
                          text-xs
                          font-bold
                          text-gray-700
                          shadow-sm

                          dark:border-white/[0.07]
                          dark:bg-white/[0.035]
                          dark:text-gray-300
                        "
                      >
                        {item}
                      </motion.span>

                      {index < 3 && (
                        <span
                          className="
                            text-xs
                            font-black
                            text-blue-400
                          "
                        >
                          →
                        </span>
                      )}
                    </React.Fragment>
                  )
                )}
              </div>
            </div>

            {/* Right orbit visualization */}
            <div
              className="
                relative
                min-h-[390px]
                overflow-hidden
                p-6

                sm:min-h-[440px]
              "
            >
              {/* Radial glow */}
              <div
                aria-hidden="true"
                className="
                  pointer-events-none
                  absolute
                  left-1/2
                  top-1/2
                  h-72
                  w-72
                  -translate-x-1/2
                  -translate-y-1/2
                  rounded-full
                  bg-blue-500/10
                  blur-[90px]
                "
              />

              {/* Rings */}
              {[0, 1, 2].map(
                (ring) => (
                  <motion.div
                    key={ring}
                    aria-hidden="true"
                    animate={
                      prefersReducedMotion
                        ? undefined
                        : {
                            rotate:
                              ring % 2 === 0
                                ? 360
                                : -360,
                          }
                    }
                    transition={{
                      duration:
                        28 + ring * 8,
                      repeat: Infinity,
                      ease: 'linear',
                    }}
                    className={`
                      absolute
                      left-1/2
                      top-1/2
                      -translate-x-1/2
                      -translate-y-1/2
                      rounded-full
                      border
                      border-dashed
                      border-blue-200/60

                      dark:border-blue-500/10

                      ${
                        ring === 0
                          ? 'h-40 w-40'
                          : ring === 1
                            ? 'h-64 w-64'
                            : 'h-[21rem] w-[21rem]'
                      }
                    `}
                  />
                )
              )}

              {/* Center core */}
              <motion.div
                animate={
                  prefersReducedMotion
                    ? undefined
                    : {
                        boxShadow: [
                          '0 0 0 rgba(37,99,235,0)',
                          '0 0 45px rgba(37,99,235,0.25)',
                          '0 0 0 rgba(37,99,235,0)',
                        ],
                      }
                }
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="
                  absolute
                  left-1/2
                  top-1/2
                  z-20
                  flex
                  h-24
                  w-24
                  -translate-x-1/2
                  -translate-y-1/2
                  flex-col
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-blue-200
                  bg-white/90
                  text-blue-800
                  shadow-xl
                  backdrop-blur-xl

                  dark:border-blue-500/20
                  dark:bg-gray-950/90
                  dark:text-blue-300
                "
              >
                <FaCode size={22} />
                <span
                  className="
                    mt-1
                    text-[10px]
                    font-black
                    uppercase
                    tracking-[0.15em]
                  "
                >
                  STACK
                </span>
              </motion.div>

              {/* Orbit skills */}
              {orbitSkills.map(
                (skill, index) => {
                  const angle =
                    (index /
                      orbitSkills.length) *
                      Math.PI *
                      2 -
                    Math.PI / 2;

                  const radius =
                    index % 3 === 0
                      ? 115
                      : index % 3 === 1
                        ? 155
                        : 190;

                  const x =
                    Math.cos(angle) *
                    radius;

                  const y =
                    Math.sin(angle) *
                    radius;

                  return (
                    <motion.span
                      key={skill}
                      initial={{
                        opacity: 0,
                        scale: 0.8,
                      }}
                      whileInView={{
                        opacity: 1,
                        scale: 1,
                      }}
                      viewport={{
                        once: true,
                      }}
                      animate={
                        prefersReducedMotion
                          ? undefined
                          : {
                              y: [
                                y,
                                y +
                                  (index %
                                    2 ===
                                  0
                                    ? -5
                                    : 5),
                                y,
                              ],
                            }
                      }
                      transition={{
                        duration:
                          4 +
                          (index % 4),
                        repeat: Infinity,
                        ease: 'easeInOut',
                        delay:
                          index * 0.12,
                      }}
                      style={{
                        left: `calc(50% + ${x}px)`,
                        top: `calc(50% + ${y}px)`,
                      }}
                      className="
                        absolute
                        z-30
                        -translate-x-1/2
                        -translate-y-1/2
                        whitespace-nowrap
                        rounded-full
                        border
                        border-gray-200
                        bg-white/90
                        px-2.5
                        py-1
                        text-[10px]
                        font-bold
                        text-gray-700
                        shadow-md
                        backdrop-blur-xl

                        dark:border-white/[0.07]
                        dark:bg-gray-950/90
                        dark:text-gray-300
                      "
                    >
                      {skill}
                    </motion.span>
                  );
                }
              )}
            </div>
          </div>
        </motion.div>

        {/* ==================================================
            CATEGORY CARDS
        =================================================== */}

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
            mb-8
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
              {currentLabels.ecosystem}
            </div>

            <div
              className="
                mt-0.5
                text-xs
                text-gray-400
              "
            >
              {allSkills.length}{' '}
              {currentLabels.skills}
            </div>
          </div>
        </motion.div>

        <div
          className="
            mx-auto
            grid
            max-w-6xl
            grid-cols-1
            gap-6

            md:grid-cols-2
            lg:gap-8
          "
        >
          {currentContent.categories.map(
            (category, index) => (
              <SkillCategoryCard
                key={category.id}
                category={category}
                index={index}
                config={
                  categoryConfigs[
                    category.id
                  ]
                }
                labels={currentLabels}
                prefersReducedMotion={
                  prefersReducedMotion
                }
              />
            )
          )}
        </div>

        {/* ==================================================
            SKILL MARQUEE
        =================================================== */}

        <div
          className="
            relative
            mx-auto
            mt-14
            max-w-6xl
            overflow-hidden
            border-y
            border-gray-200/70
            py-4

            dark:border-white/[0.06]
          "
        >
          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              inset-y-0
              left-0
              z-10
              w-20
              bg-gradient-to-r
              from-gray-50
              to-transparent

              dark:from-gray-950
            "
          />

          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              inset-y-0
              right-0
              z-10
              w-20
              bg-gradient-to-l
              from-gray-50
              to-transparent

              dark:from-gray-950
            "
          />

          <motion.div
            animate={
              prefersReducedMotion
                ? undefined
                : {
                    x: [
                      '0%',
                      '-50%',
                    ],
                  }
            }
            transition={{
              duration: 28,
              repeat: Infinity,
              ease: 'linear',
            }}
            className="
              flex
              w-max
              items-center
              gap-3
            "
          >
            {[...allSkills, ...allSkills].map(
              (skill, index) => (
                <React.Fragment
                  key={`${skill}-${index}`}
                >
                  <span
                    className="
                      whitespace-nowrap
                      font-mono
                      text-xs
                      font-bold
                      text-gray-500

                      dark:text-gray-400
                    "
                  >
                    {skill}
                  </span>

                  <span
                    className="
                      h-1
                      w-1
                      flex-shrink-0
                      rounded-full
                      bg-blue-500/60
                    "
                  />
                </React.Fragment>
              )
            )}
          </motion.div>
        </div>

        {/* ==================================================
            DEVELOPMENT APPROACH
        =================================================== */}

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
            amount: 0.25,
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
            mt-16
            max-w-6xl

            lg:mt-20
          "
        >
          {/* Animated gradient frame */}
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
              opacity-55
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
              relative
              overflow-hidden
              rounded-[1.95rem]
              bg-white
              p-6
              shadow-[0_22px_75px_rgba(15,23,42,0.08)]

              dark:bg-gray-900
              dark:shadow-[0_28px_85px_rgba(0,0,0,0.35)]

              sm:p-8
              lg:p-10
            "
          >
            {/* Decorative glows */}
            <div
              aria-hidden="true"
              className="
                pointer-events-none
                absolute
                -left-24
                top-1/2
                h-72
                w-72
                -translate-y-1/2
                rounded-full
                bg-blue-500/10
                blur-[100px]
              "
            />

            <div
              aria-hidden="true"
              className="
                pointer-events-none
                absolute
                -right-24
                top-1/3
                h-72
                w-72
                rounded-full
                bg-violet-500/10
                blur-[100px]
              "
            />

            <motion.div
              aria-hidden="true"
              animate={
                prefersReducedMotion
                  ? undefined
                  : {
                      rotate: [
                        0,
                        4,
                        0,
                        -4,
                        0,
                      ],
                    }
              }
              transition={{
                duration: 9,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="
                pointer-events-none
                absolute
                -right-4
                -top-10
                text-[12rem]
                text-blue-900/[0.025]

                dark:text-blue-300/[0.03]
              "
            >
              <FaRocket />
            </motion.div>

            <div className="relative z-10">
              <div
                className="
                  mb-8
                  flex
                  flex-col
                  gap-5

                  md:flex-row
                  md:items-end
                  md:justify-between
                "
              >
                <div>
                  <div
                    className="
                      mb-3
                      inline-flex
                      items-center
                      gap-2
                      rounded-full
                      border
                      border-blue-100
                      bg-blue-50/80
                      px-3
                      py-1.5
                      text-[10px]
                      font-black
                      uppercase
                      tracking-[0.13em]
                      text-blue-700

                      dark:border-blue-500/15
                      dark:bg-blue-500/10
                      dark:text-blue-300
                    "
                  >
                    <FaRocket size={10} />

                    {
                      currentLabels.engineeringMindset
                    }
                  </div>

                  <h3
                    className="
                      text-3xl
                      font-black
                      tracking-[-0.035em]
                      text-gray-950

                      dark:text-white
                    "
                  >
                    {t.skills.approach}
                  </h3>

                  <p
                    className="
                      mt-2
                      max-w-xl
                      text-sm
                      leading-relaxed
                      text-gray-500

                      dark:text-gray-400
                    "
                  >
                    {
                      currentLabels.approachSubtitle
                    }
                  </p>
                </div>

                <div
                  className="
                    inline-flex
                    items-center
                    gap-2
                    self-start
                    rounded-full
                    border
                    border-emerald-200
                    bg-emerald-50
                    px-3
                    py-1.5
                    text-[10px]
                    font-black
                    uppercase
                    tracking-[0.12em]
                    text-emerald-700

                    dark:border-emerald-500/15
                    dark:bg-emerald-500/10
                    dark:text-emerald-300
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

                  {currentLabels.connected}
                </div>
              </div>

              <div
                className="
                  grid
                  grid-cols-1
                  gap-5

                  md:grid-cols-2
                "
              >
                {currentContent.approaches.map(
                  (
                    approach,
                    index
                  ) => (
                    <ApproachCard
                      key={approach.id}
                      approach={approach}
                      index={index}
                      config={
                        approachConfigs[
                          index
                        ]
                      }
                      prefersReducedMotion={
                        prefersReducedMotion
                      }
                    />
                  )
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom transition */}
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
          to-white/40

          dark:to-gray-900/20
        "
      />
    </section>
  );
};

export default Skills;
