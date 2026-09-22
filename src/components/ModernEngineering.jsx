import React, {
  useContext,
  useMemo,
  useRef,
} from 'react';

import {
  FaBolt,
  FaBrain,
  FaCheck,
  FaCheckCircle,
  FaCode,
  FaCogs,
  FaFlask,
  FaLayerGroup,
  FaProjectDiagram,
  FaRobot,
  FaSearch,
  FaShieldAlt,
  FaTerminal,
  FaTools,
  FaUserCheck,
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

/* =========================================================
   INTERACTIVE AI ENGINEERING VISUAL
========================================================= */

const AIEngineeringVisual = ({
  content,
  labels,
  prefersReducedMotion,
}) => {
  const visualRef = useRef(null);

  const glowX = useMotionValue(300);
  const glowY = useMotionValue(240);

  const smoothGlowX = useSpring(glowX, {
    stiffness: 140,
    damping: 24,
  });

  const smoothGlowY = useSpring(glowY, {
    stiffness: 140,
    damping: 24,
  });

  const spotlight = useMotionTemplate`
    radial-gradient(
      520px circle at ${smoothGlowX}px ${smoothGlowY}px,
      rgba(59, 130, 246, 0.16),
      transparent 58%
    )
  `;

  const handlePointerMove = (event) => {
    if (
      prefersReducedMotion ||
      !visualRef.current
    ) {
      return;
    }

    const rect =
      visualRef.current.getBoundingClientRect();

    glowX.set(
      event.clientX - rect.left
    );

    glowY.set(
      event.clientY - rect.top
    );
  };

  const toolNames = useMemo(
    () =>
      content.toolsText
        .split('·')
        .map((item) =>
          item.trim()
        )
        .filter(Boolean),
    [content.toolsText]
  );

  const pipeline = [
    {
      label:
        labels.explore,
      icon: FaSearch,
    },
    {
      label:
        labels.accelerate,
      icon: FaBolt,
    },
    {
      label:
        labels.engineer,
      icon: FaCode,
    },
    {
      label:
        labels.test,
      icon: FaFlask,
    },
    {
      label:
        labels.own,
      icon: FaUserCheck,
    },
  ];

  return (
    <motion.div
      ref={visualRef}
      onPointerMove={
        handlePointerMove
      }
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
        group/visual
        relative
        min-h-[560px]
        overflow-visible
        rounded-[2rem]
        border
        border-blue-200/70
        bg-gradient-to-br
        from-blue-50
        via-white
        to-violet-50
        p-5
        shadow-[0_30px_110px_rgba(37,99,235,0.14)]

        dark:border-blue-500/15
        dark:from-blue-950/30
        dark:via-gray-950
        dark:to-violet-950/25

        sm:p-6
      "
    >
      <motion.div
        aria-hidden="true"
        style={{
          background: spotlight,
        }}
        className="
          pointer-events-none
          absolute
          inset-0
          rounded-[2rem]
          opacity-0
          transition-opacity
          duration-500
          group-hover/visual:opacity-100
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -left-16
          top-20
          h-64
          w-64
          rounded-full
          bg-blue-500/15
          blur-[95px]
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -right-14
          bottom-14
          h-64
          w-64
          rounded-full
          bg-violet-500/15
          blur-[100px]
        "
      />

      <div className="relative z-10">
        {/* Top browser/console shell */}
        <div
          className="
            mb-5
            flex
            items-center
            justify-between
            gap-4
            rounded-2xl
            border
            border-white/70
            bg-white/85
            px-4
            py-3
            shadow-lg
            backdrop-blur-xl

            dark:border-white/[0.08]
            dark:bg-gray-950/80
          "
        >
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
          </div>

          <div
            className="
              flex
              items-center
              gap-2
              font-mono
              text-[10px]
              font-black
              uppercase
              tracking-[0.12em]
              text-gray-500

              dark:text-gray-400
            "
          >
            <FaTerminal size={10} />
            ai-engineering.workflow
          </div>
        </div>

        {/* Neural core */}
        <div
          className="
            relative
            flex
            min-h-[330px]
            items-center
            justify-center
            overflow-hidden
            rounded-[1.6rem]
            border
            border-blue-100
            bg-white/70
            shadow-[0_18px_55px_rgba(15,23,42,0.07)]
            backdrop-blur-xl

            dark:border-blue-500/10
            dark:bg-white/[0.025]
          "
        >
          {/* Connection lines */}
          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              inset-0
              opacity-40
            "
            style={{
              backgroundImage: `
                linear-gradient(
                  to right,
                  transparent 49.8%,
                  rgba(59,130,246,0.22) 50%,
                  transparent 50.2%
                ),
                linear-gradient(
                  to bottom,
                  transparent 49.8%,
                  rgba(59,130,246,0.18) 50%,
                  transparent 50.2%
                )
              `,
            }}
          />

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
                    22 +
                    ring * 9,
                  repeat: Infinity,
                  ease: 'linear',
                }}
                className={`
                  absolute
                  rounded-full
                  border
                  border-dashed
                  border-blue-300/55

                  dark:border-blue-500/12

                  ${
                    ring === 0
                      ? 'h-32 w-32'
                      : ring === 1
                        ? 'h-52 w-52'
                        : 'h-[18rem] w-[18rem]'
                  }
                `}
              />
            )
          )}

          <motion.div
            animate={
              prefersReducedMotion
                ? undefined
                : {
                    boxShadow: [
                      '0 0 0 rgba(59,130,246,0)',
                      '0 0 65px rgba(59,130,246,0.30)',
                      '0 0 0 rgba(59,130,246,0)',
                    ],
                  }
            }
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="
              relative
              z-20
              flex
              h-28
              w-28
              flex-col
              items-center
              justify-center
              rounded-full
              border
              border-blue-200
              bg-white/95
              text-blue-700
              shadow-xl
              backdrop-blur-xl

              dark:border-blue-500/20
              dark:bg-gray-950/95
              dark:text-blue-300
            "
          >
            <FaBrain size={28} />

            <span
              className="
                mt-2
                text-[9px]
                font-black
                uppercase
                tracking-[0.16em]
              "
            >
              AI
            </span>
          </motion.div>

          {/* Orbiting tool chips */}
          {toolNames.map(
            (tool, index) => {
              const angle =
                (index /
                  toolNames.length) *
                  Math.PI *
                  2 -
                Math.PI / 2;

              const radius =
                132;

              const x =
                Math.cos(angle) *
                radius;

              const y =
                Math.sin(angle) *
                radius;

              return (
                <motion.div
                  key={tool}
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
                                ? -6
                                : 6),
                            y,
                          ],
                        }
                  }
                  transition={{
                    duration:
                      4.5 +
                      index * 0.4,
                    repeat: Infinity,
                    ease: 'easeInOut',
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
                    rounded-full
                    border
                    border-blue-200
                    bg-white/95
                    px-3
                    py-1.5
                    text-[10px]
                    font-black
                    text-blue-700
                    shadow-lg
                    backdrop-blur-xl

                    dark:border-blue-500/20
                    dark:bg-gray-950/95
                    dark:text-blue-300
                  "
                >
                  {tool}
                </motion.div>
              );
            }
          )}

          {/* Floating ownership label */}
          <motion.div
            animate={
              prefersReducedMotion
                ? undefined
                : {
                    y: [0, -7, 0],
                    rotate: [0, -2, 0],
                  }
            }
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="
              absolute
              left-[7%]
              top-[12%]
              z-30
              hidden
              rounded-full
              border
              border-emerald-200
              bg-white/95
              px-3
              py-1.5
              text-[10px]
              font-black
              text-emerald-700
              shadow-lg
              backdrop-blur-xl

              dark:border-emerald-500/20
              dark:bg-gray-950/95
              dark:text-emerald-300

              sm:block
            "
          >
            {labels.engineeringOwned}
          </motion.div>

          <motion.div
            animate={
              prefersReducedMotion
                ? undefined
                : {
                    y: [0, 7, 0],
                    rotate: [0, 2, 0],
                  }
            }
            transition={{
              duration: 5.4,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="
              absolute
              bottom-[12%]
              right-[7%]
              z-30
              hidden
              rounded-full
              border
              border-violet-200
              bg-white/95
              px-3
              py-1.5
              text-[10px]
              font-black
              text-violet-700
              shadow-lg
              backdrop-blur-xl

              dark:border-violet-500/20
              dark:bg-gray-950/95
              dark:text-violet-300

              sm:block
            "
          >
            {labels.aiAccelerated}
          </motion.div>
        </div>

        {/* Engineering pipeline */}
        <div
          className="
            mt-5
            grid
            grid-cols-5
            gap-2
          "
        >
          {pipeline.map(
            (
              item,
              index
            ) => {
              const Icon =
                item.icon;

              return (
                <motion.div
                  key={item.label}
                  initial={{
                    opacity: 0,
                    y: prefersReducedMotion
                      ? 0
                      : 12,
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
                        : index *
                          0.06,
                  }}
                  whileHover={
                    prefersReducedMotion
                      ? undefined
                      : {
                          y: -4,
                        }
                  }
                  className="
                    rounded-xl
                    border
                    border-gray-200/80
                    bg-white/80
                    px-2
                    py-3
                    text-center
                    shadow-sm
                    backdrop-blur-xl

                    dark:border-white/[0.06]
                    dark:bg-white/[0.025]
                  "
                >
                  <Icon
                    className="
                      mx-auto
                      text-blue-600

                      dark:text-blue-400
                    "
                    size={12}
                  />

                  <span
                    className="
                      mt-2
                      block
                      text-[8px]
                      font-black
                      uppercase
                      tracking-[0.08em]
                      text-gray-500

                      dark:text-gray-400
                    "
                  >
                    {item.label}
                  </span>
                </motion.div>
              );
            }
          )}
        </div>
      </div>
    </motion.div>
  );
};

/* =========================================================
   MAIN COMPONENT
========================================================= */

const ModernEngineering = () => {
  const { language } =
    useContext(LanguageContext);

  const sectionRef =
    useRef(null);

  const prefersReducedMotion =
    useReducedMotion();

  const content = {
    en: {
      title: 'AI-Assisted Engineering',
      subtitle:
        'I use AI as an engineering accelerator, not as a substitute for technical understanding.',

      approachTitle: 'My Approach',
      approachText:
        'AI helps me explore solution paths, accelerate debugging, reduce repetitive work, and support technical research more efficiently. Architecture, implementation decisions, testing, validation, and final code quality remain my responsibility.',

      ownershipStatement:
        'AI accelerates the workflow. Engineering ownership stays with me.',

      generatedCodeStatement:
        'Generated code is still code that needs to be understood, reviewed, tested, validated, and owned.',

      usageTitle: 'How I Use It',
      useCases: [
        'Solution Exploration',
        'Debugging',
        'Refactoring',
        'Rapid Prototyping',
        'Technical Research & Documentation',
      ],

      toolsTitle: 'Tools',
      toolsText: 'ChatGPT · Claude · Cursor · Windsurf',
      toolsNote:
        'I evaluate AI-assisted development tools based on how effectively they support engineering workflows without compromising review, testing, validation, or technical ownership.',

      ownershipTitle: 'Engineering Ownership',
      ownershipText:
        'AI can suggest. I evaluate, implement, test, validate, and own the result.',

      ownershipAreas: [
        'Architecture',
        'Implementation Decisions',
        'Testing',
        'Validation',
        'Code Review',
        'Final Code Quality',
      ],

      projectsTitle: 'AI in My Projects',
      projectsText:
        'In projects such as Aviora, I selectively use AI-assisted tools for technical research, debugging, and iteration. Architecture, implementation decisions, testing, validation, and final code quality remain fully under my engineering ownership.',
    },

    tr: {
      title: 'AI Destekli Mühendislik',
      subtitle:
        'AI araçlarını teknik anlayışın yerine değil, mühendislik sürecini hızlandıran araçlar olarak kullanıyorum.',

      approachTitle: 'Yaklaşımım',
      approachText:
        'AI; çözüm seçeneklerini araştırmamı, hata ayıklama sürecini hızlandırmamı, tekrarlayan işleri azaltmamı ve teknik araştırmayı daha verimli yürütmemi destekliyor. Mimari, implementasyon kararları, test, doğrulama ve final kod kalitesi benim sorumluluğumda kalıyor.',

      ownershipStatement:
        'AI süreci hızlandırır. Mühendislik sorumluluğu bende kalır.',

      generatedCodeStatement:
        'Üretilen kodun yine de anlaşılması, incelenmesi, test edilmesi, doğrulanması ve sorumluluğunun alınması gerekir.',

      usageTitle: 'Nasıl Kullanıyorum',
      useCases: [
        'Çözüm Araştırma',
        'Hata Ayıklama',
        'Refactoring',
        'Hızlı Prototipleme',
        'Teknik Araştırma & Dokümantasyon',
      ],

      toolsTitle: 'Araçlar',
      toolsText: 'ChatGPT · Claude · Cursor · Windsurf',
      toolsNote:
        'AI destekli geliştirme araçlarını; mühendislik süreçlerini ne kadar etkili destekledikleri ve inceleme, test, doğrulama ile teknik sorumluluk disiplinini koruyup korumadıkları açısından değerlendiriyorum.',

      ownershipTitle: 'Mühendislik Sorumluluğu',
      ownershipText:
        'AI öneride bulunabilir. Sonucu değerlendirir, uygular, test eder, doğrular ve sorumluluğunu ben alırım.',

      ownershipAreas: [
        'Mimari',
        'Implementasyon Kararları',
        'Test',
        'Doğrulama',
        'Kod İncelemesi',
        'Final Kod Kalitesi',
      ],

      projectsTitle: 'Projelerimde AI',
      projectsText:
        'Aviora gibi projelerde AI destekli araçları teknik araştırma, hata ayıklama ve iterasyon süreçlerinde seçici olarak kullanıyorum. Mimari, implementasyon kararları, test, doğrulama ve final kod kalitesi tamamen benim mühendislik sorumluluğumda kalıyor.',
    },

    de: {
      title: 'KI-unterstützte Softwareentwicklung',
      subtitle:
        'Ich nutze KI als Beschleuniger im Entwicklungsprozess – nicht als Ersatz für technisches Verständnis.',

      approachTitle: 'Mein Ansatz',
      approachText:
        'KI unterstützt mich dabei, Lösungswege zu untersuchen, Debugging zu beschleunigen, repetitive Arbeit zu reduzieren und technische Recherche effizienter durchzuführen. Architektur, Implementierungsentscheidungen, Tests, Validierung und die finale Codequalität bleiben in meiner Verantwortung.',

      ownershipStatement:
        'KI beschleunigt den Workflow. Die technische Verantwortung bleibt bei mir.',

      generatedCodeStatement:
        'Generierter Code muss weiterhin verstanden, überprüft, getestet, validiert und verantwortet werden.',

      usageTitle: 'So nutze ich KI',
      useCases: [
        'Lösungserkundung',
        'Debugging',
        'Refactoring',
        'Schnelles Prototyping',
        'Technische Recherche & Dokumentation',
      ],

      toolsTitle: 'Tools',
      toolsText: 'ChatGPT · Claude · Cursor · Windsurf',
      toolsNote:
        'Ich bewerte KI-gestützte Entwicklungstools danach, wie effektiv sie Engineering-Workflows unterstützen, ohne Review, Testing, Validierung oder technische Verantwortung zu beeinträchtigen.',

      ownershipTitle: 'Technische Verantwortung',
      ownershipText:
        'KI kann Vorschläge machen. Ich bewerte, implementiere, teste und validiere sie und übernehme die Verantwortung für das Ergebnis.',

      ownershipAreas: [
        'Architektur',
        'Implementierungsentscheidungen',
        'Testing',
        'Validierung',
        'Code-Review',
        'Finale Codequalität',
      ],

      projectsTitle: 'KI in meinen Projekten',
      projectsText:
        'In Projekten wie Aviora setze ich KI-gestützte Tools gezielt für technische Recherche, Fehlersuche und Iteration ein. Architektur, Implementierungsentscheidungen, Tests, Validierung und die finale Codequalität bleiben vollständig in meiner technischen Verantwortung.',
    },
  };

  const currentContent =
    content[language] ||
    content.en;

  const labels = {
    en: {
      sectionTag:
        'Modern Engineering Workflow',
      workflow:
        'AI + Engineering',
      useCases:
        'Use Cases',
      responsibility:
        'Ownership Areas',
      tools:
        'AI Tools',
      engineeringOwned:
        'Engineer-Owned',
      aiAccelerated:
        'AI-Accelerated',
      explore:
        'Explore',
      accelerate:
        'Accelerate',
      engineer:
        'Engineer',
      test:
        'Test',
      own:
        'Own',
      assist:
        'AI Assists',
      ownership:
        'I Own',
      reviewGate:
        'Review Gate',
      humanReview:
        'Human',
      understood:
        'Understood',
      reviewed:
        'Reviewed',
      tested:
        'Tested',
      validated:
        'Validated',
      projectContext:
        'Applied in Real Projects',
    },

    tr: {
      sectionTag:
        'Modern Mühendislik Workflow’u',
      workflow:
        'AI + Mühendislik',
      useCases:
        'Kullanım Alanı',
      responsibility:
        'Sorumluluk Alanı',
      tools:
        'AI Aracı',
      engineeringOwned:
        'Mühendislik Bende',
      aiAccelerated:
        'AI ile Hızlandırılmış',
      explore:
        'Araştır',
      accelerate:
        'Hızlandır',
      engineer:
        'Geliştir',
      test:
        'Test Et',
      own:
        'Sorumluluğu Al',
      assist:
        'AI Destekler',
      ownership:
        'Ben Üstlenirim',
      reviewGate:
        'Review Kontrolü',
      humanReview:
        'İnsan Kontrolü',
      understood:
        'Anlaşıldı',
      reviewed:
        'İncelendi',
      tested:
        'Test Edildi',
      validated:
        'Doğrulandı',
      projectContext:
        'Gerçek Projelerde Uygulama',
    },

    de: {
      sectionTag:
        'Moderner Engineering-Workflow',
      workflow:
        'KI + Engineering',
      useCases:
        'Anwendungsfälle',
      responsibility:
        'Verantwortungsbereiche',
      tools:
        'KI-Tools',
      engineeringOwned:
        'Engineering-Verantwortung',
      aiAccelerated:
        'KI-beschleunigt',
      explore:
        'Erkunden',
      accelerate:
        'Beschleunigen',
      engineer:
        'Entwickeln',
      test:
        'Testen',
      own:
        'Verantworten',
      assist:
        'KI unterstützt',
      ownership:
        'Ich verantworte',
      reviewGate:
        'Review-Gate',
      humanReview:
        'Menschliche Prüfung',
      understood:
        'Verstanden',
      reviewed:
        'Geprüft',
      tested:
        'Getestet',
      validated:
        'Validiert',
      projectContext:
        'In realen Projekten eingesetzt',
    },
  };

  const currentLabels =
    labels[language] ||
    labels.en;

  const toolNames =
    useMemo(
      () =>
        currentContent.toolsText
          .split('·')
          .map((item) =>
            item.trim()
          )
          .filter(Boolean),
      [currentContent.toolsText]
    );

  const summaryStats = [
    {
      value:
        currentContent
          .useCases.length,
      label:
        currentLabels.useCases,
    },
    {
      value:
        currentContent
          .ownershipAreas.length,
      label:
        currentLabels.responsibility,
    },
    {
      value:
        toolNames.length,
      label:
        currentLabels.tools,
    },
  ];

  const useCaseIcons = [
    FaSearch,
    FaCode,
    FaCogs,
    FaBolt,
    FaLayerGroup,
  ];

  const ownershipIcons = [
    FaProjectDiagram,
    FaCode,
    FaFlask,
    FaCheckCircle,
    FaSearch,
    FaShieldAlt,
  ];

  const decorativeCode = [
    {
      text: 'AI != ownership',
      position:
        'left-[3%] top-[14%]',
      size: 'text-4xl',
      duration: 9,
    },
    {
      text: 'review();',
      position:
        'right-[5%] top-[24%]',
      size: 'text-5xl',
      duration: 8,
    },
    {
      text: 'test → validate',
      position:
        'left-[5%] top-[42%]',
      size: 'text-4xl',
      duration: 10,
    },
    {
      text: 'human-in-the-loop',
      position:
        'right-[4%] top-[54%]',
      size: 'text-4xl',
      duration: 9.5,
    },
    {
      text: 'own(result)',
      position:
        'left-[7%] top-[70%]',
      size: 'text-5xl',
      duration: 8.5,
    },
    {
      text: 'iterate()',
      position:
        'right-[7%] top-[82%]',
      size: 'text-5xl',
      duration: 10,
    },
  ];

  const { scrollYProgress } =
    useScroll({
      target: sectionRef,
      offset: [
        'start 80%',
        'end 20%',
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
      id="modern-engineering"
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
      {/* GRID BACKGROUND */}
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

      {/* AMBIENT GLOWS */}
      <motion.div
        aria-hidden="true"
        style={{
          y: backgroundY,
        }}
        className="
          pointer-events-none
          absolute
          -left-64
          top-[15%]
          -z-10
          h-[40rem]
          w-[40rem]
          rounded-full
          bg-blue-400/10
          blur-[145px]

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
          h-[42rem]
          w-[42rem]
          rounded-full
          bg-violet-400/10
          blur-[155px]

          dark:bg-violet-700/[0.07]
        "
      />

      {/* FLOATING CODE */}
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

      {/* TOP PROGRESS */}
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
          z-40
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
        {/* HEADER */}
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
            amount: 0.5,
          }}
          transition={{
            duration:
              prefersReducedMotion
                ? 0
                : 0.85,
            ease: [
              0.16,
              1,
              0.3,
              1,
            ],
          }}
          className="
            mx-auto
            mb-14
            max-w-3xl
            text-center
          "
        >
          <div
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
            <FaRobot size={12} />
            {currentLabels.sectionTag}
          </div>

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
            {currentContent.title}
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
                ease: [
                  0.16,
                  1,
                  0.3,
                  1,
                ],
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
            {currentContent.subtitle}
          </motion.p>

          {/* STATS */}
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
            {summaryStats.map(
              (
                item,
                index
              ) => (
                <div
                  key={item.label}
                  className={`
                    px-3
                    py-4
                    text-center

                    ${
                      index === 1
                        ? 'border-x border-gray-200/70 dark:border-white/[0.06]'
                        : ''
                    }
                  `}
                >
                  <div
                    className={`
                      text-xl
                      font-black

                      ${
                        index === 1
                          ? 'text-blue-700 dark:text-blue-400'
                          : 'text-gray-950 dark:text-white'
                      }
                    `}
                  >
                    {item.value}
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
                    {item.label}
                  </div>
                </div>
              )
            )}
          </motion.div>
        </motion.div>

        {/* HERO VISUAL + APPROACH */}
        <div
          className="
            mx-auto
            grid
            max-w-6xl
            gap-8

            lg:grid-cols-[1.05fr_0.95fr]
            lg:items-start
          "
        >
          <AIEngineeringVisual
            content={currentContent}
            labels={currentLabels}
            prefersReducedMotion={
              prefersReducedMotion
            }
          />

          <motion.div
            initial={{
              opacity: 0,
              x: prefersReducedMotion
                ? 0
                : 45,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
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
              ease: [
                0.16,
                1,
                0.3,
                1,
              ],
            }}
            className="
              relative
              overflow-hidden
              rounded-[2rem]
              border
              border-gray-200/80
              bg-white/85
              p-6
              shadow-[0_22px_80px_rgba(15,23,42,0.07)]
              backdrop-blur-xl

              dark:border-white/[0.07]
              dark:bg-gray-900/85
              dark:shadow-[0_26px_90px_rgba(0,0,0,0.35)]

              sm:p-8
            "
          >
            <div
              aria-hidden="true"
              className="
                pointer-events-none
                absolute
                -right-24
                -top-24
                h-64
                w-64
                rounded-full
                bg-blue-500/10
                blur-[100px]
              "
            />

            <div className="relative z-10">
              <div
                className="
                  mb-4
                  inline-flex
                  items-center
                  gap-2
                  rounded-full
                  border
                  border-blue-100
                  bg-blue-50
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
                <FaBrain size={11} />
                {
                  currentLabels.workflow
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
                {
                  currentContent.approachTitle
                }
              </h3>

              <p
                className="
                  mt-4
                  leading-relaxed
                  text-gray-600

                  dark:text-gray-300
                "
              >
                {
                  currentContent.approachText
                }
              </p>

              {/* Ownership statement */}
              <motion.div
                whileHover={
                  prefersReducedMotion
                    ? undefined
                    : {
                        y: -3,
                      }
                }
                className="
                  relative
                  mt-7
                  overflow-hidden
                  rounded-2xl
                  border
                  border-blue-200/70
                  bg-gradient-to-r
                  from-blue-800
                  via-blue-700
                  to-cyan-600
                  p-5
                  text-white
                  shadow-xl
                  shadow-blue-900/20
                "
              >
                <motion.span
                  aria-hidden="true"
                  animate={
                    prefersReducedMotion
                      ? undefined
                      : {
                          x: [
                            '-160%',
                            '230%',
                          ],
                        }
                  }
                  transition={{
                    duration: 3.2,
                    repeat: Infinity,
                    repeatDelay: 2,
                    ease: 'easeInOut',
                  }}
                  className="
                    pointer-events-none
                    absolute
                    inset-y-0
                    w-20
                    -skew-x-12
                    bg-gradient-to-r
                    from-transparent
                    via-white/15
                    to-transparent
                    blur-md
                  "
                />

                <div
                  className="
                    relative
                    flex
                    items-start
                    gap-3
                  "
                >
                  <FaUserCheck
                    className="
                      mt-1
                      flex-shrink-0
                    "
                    size={18}
                  />

                  <p
                    className="
                      font-bold
                      leading-relaxed
                    "
                  >
                    {
                      currentContent.ownershipStatement
                    }
                  </p>
                </div>
              </motion.div>

              {/* Generated code gate */}
              <div
                className="
                  mt-5
                  rounded-2xl
                  border
                  border-gray-200/80
                  bg-gray-50/80
                  p-5

                  dark:border-white/[0.06]
                  dark:bg-white/[0.025]
                "
              >
                <div
                  className="
                    mb-3
                    flex
                    items-center
                    justify-between
                    gap-3
                  "
                >
                  <div
                    className="
                      flex
                      items-center
                      gap-2
                    "
                  >
                    <FaShieldAlt
                      className="
                        text-emerald-600

                        dark:text-emerald-400
                      "
                    />

                    <span
                      className="
                        text-xs
                        font-black
                        uppercase
                        tracking-[0.1em]
                        text-gray-700

                        dark:text-gray-300
                      "
                    >
                      {
                        currentLabels.reviewGate
                      }
                    </span>
                  </div>

                  <span
                    className="
                      rounded-full
                      bg-emerald-50
                      px-2.5
                      py-1
                      text-[9px]
                      font-black
                      uppercase
                      tracking-[0.1em]
                      text-emerald-700

                      dark:bg-emerald-500/10
                      dark:text-emerald-300
                    "
                  >
                    {currentLabels.humanReview}
                  </span>
                </div>

                <p
                  className="
                    text-sm
                    leading-relaxed
                    text-gray-600

                    dark:text-gray-300
                  "
                >
                  {
                    currentContent.generatedCodeStatement
                  }
                </p>

                <div
                  className="
                    mt-4
                    grid
                    grid-cols-2
                    gap-2
                  "
                >
                  {[
                    currentLabels.understood,
                    currentLabels.reviewed,
                    currentLabels.tested,
                    currentLabels.validated,
                  ].map(
                    (
                      item,
                      index
                    ) => (
                      <motion.div
                        key={item}
                        initial={{
                          opacity: 0,
                          y: prefersReducedMotion
                            ? 0
                            : 8,
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
                              : index *
                                0.06,
                        }}
                        className="
                          flex
                          items-center
                          gap-2
                          rounded-xl
                          border
                          border-emerald-100
                          bg-emerald-50/70
                          px-3
                          py-2
                          text-[10px]
                          font-black
                          text-emerald-700

                          dark:border-emerald-500/10
                          dark:bg-emerald-500/[0.06]
                          dark:text-emerald-300
                        "
                      >
                        <FaCheck size={8} />
                        {item}
                      </motion.div>
                    )
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* USE CASES */}
        <motion.div
          initial={{
            opacity: 0,
            y: prefersReducedMotion
              ? 0
              : 55,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.2,
          }}
          className="
            mx-auto
            mt-16
            max-w-6xl
          "
        >
          <div
            className="
              mb-7
              flex
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
              <FaBolt size={14} />
            </div>

            <div>
              <h3
                className="
                  text-xl
                  font-black
                  text-gray-950

                  dark:text-white
                "
              >
                {
                  currentContent.usageTitle
                }
              </h3>

              <p
                className="
                  text-xs
                  text-gray-400
                "
              >
                {
                  currentLabels.aiAccelerated
                }
              </p>
            </div>
          </div>

          <div
            className="
              grid
              gap-4

              sm:grid-cols-2
              lg:grid-cols-5
            "
          >
            {currentContent.useCases.map(
              (
                useCase,
                index
              ) => {
                const Icon =
                  useCaseIcons[
                    index %
                      useCaseIcons.length
                  ];

                return (
                  <motion.div
                    key={useCase}
                    initial={{
                      opacity: 0,
                      y: prefersReducedMotion
                        ? 0
                        : 25,
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
                          : index *
                            0.06,
                    }}
                    whileHover={
                      prefersReducedMotion
                        ? undefined
                        : {
                            y: -6,
                          }
                    }
                    className="
                      group/usecase
                      relative
                      overflow-hidden
                      rounded-2xl
                      border
                      border-gray-200/80
                      bg-white/80
                      p-5
                      shadow-sm
                      backdrop-blur-xl
                      transition-[border-color,box-shadow]
                      duration-500

                      hover:border-blue-200
                      hover:shadow-[0_18px_45px_rgba(37,99,235,0.10)]

                      dark:border-white/[0.07]
                      dark:bg-white/[0.025]
                      dark:hover:border-blue-500/20
                    "
                  >
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
                        via-blue-100/75
                        to-transparent
                        opacity-0
                        transition-all
                        duration-700

                        group-hover/usecase:left-[120%]
                        group-hover/usecase:opacity-100

                        dark:via-blue-400/10
                      "
                    />

                    <div className="relative z-10">
                      <div
                        className="
                          mb-4
                          flex
                          h-10
                          w-10
                          items-center
                          justify-center
                          rounded-xl
                          bg-blue-50
                          text-blue-700

                          dark:bg-blue-500/10
                          dark:text-blue-300
                        "
                      >
                        <Icon size={14} />
                      </div>

                      <p
                        className="
                          text-sm
                          font-black
                          leading-snug
                          text-gray-800

                          dark:text-gray-200
                        "
                      >
                        {useCase}
                      </p>

                      <span
                        className="
                          mt-3
                          block
                          font-mono
                          text-[9px]
                          text-gray-300

                          dark:text-gray-700
                        "
                      >
                        0{index + 1}
                      </span>
                    </div>
                  </motion.div>
                );
              }
            )}
          </div>
        </motion.div>

        {/* AI VS OWNERSHIP SPLIT */}
        <motion.div
          initial={{
            opacity: 0,
            y: prefersReducedMotion
              ? 0
              : 55,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.2,
          }}
          className="
            relative
            mx-auto
            mt-16
            max-w-6xl
            overflow-hidden
            rounded-[2rem]
            border
            border-gray-200/80
            bg-white/85
            shadow-[0_22px_80px_rgba(15,23,42,0.07)]
            backdrop-blur-xl

            dark:border-white/[0.07]
            dark:bg-gray-900/85

            lg:mt-20
          "
        >
          <div
            className="
              grid

              lg:grid-cols-2
            "
          >
            {/* AI side */}
            <div
              className="
                relative
                border-b
                border-gray-200/70
                p-7

                dark:border-white/[0.06]

                sm:p-8
                lg:border-b-0
                lg:border-r
              "
            >
              <div
                aria-hidden="true"
                className="
                  pointer-events-none
                  absolute
                  -left-20
                  top-1/2
                  h-60
                  w-60
                  -translate-y-1/2
                  rounded-full
                  bg-blue-500/10
                  blur-[90px]
                "
              />

              <div className="relative z-10">
                <div
                  className="
                    mb-5
                    flex
                    items-center
                    gap-3
                  "
                >
                  <span
                    className="
                      flex
                      h-11
                      w-11
                      items-center
                      justify-center
                      rounded-xl
                      bg-blue-50
                      text-blue-700

                      dark:bg-blue-500/10
                      dark:text-blue-300
                    "
                  >
                    <FaRobot size={17} />
                  </span>

                  <div>
                    <p
                      className="
                        text-xs
                        font-black
                        uppercase
                        tracking-[0.12em]
                        text-blue-700

                        dark:text-blue-300
                      "
                    >
                      {
                        currentLabels.assist
                      }
                    </p>

                    <h3
                      className="
                        text-xl
                        font-black
                        text-gray-950

                        dark:text-white
                      "
                    >
                      {
                        currentContent.toolsTitle
                      }
                    </h3>
                  </div>
                </div>

                <div
                  className="
                    flex
                    flex-wrap
                    gap-2
                  "
                >
                  {toolNames.map(
                    (
                      tool,
                      index
                    ) => (
                      <motion.span
                        key={tool}
                        whileHover={
                          prefersReducedMotion
                            ? undefined
                            : {
                                y: -3,
                                scale: 1.04,
                              }
                        }
                        className="
                          rounded-full
                          border
                          border-blue-100
                          bg-blue-50/80
                          px-3
                          py-1.5
                          text-sm
                          font-semibold
                          text-blue-800

                          dark:border-blue-500/10
                          dark:bg-blue-500/[0.07]
                          dark:text-blue-200
                        "
                      >
                        {tool}
                      </motion.span>
                    )
                  )}
                </div>

                <p
                  className="
                    mt-5
                    text-sm
                    italic
                    leading-relaxed
                    text-gray-500

                    dark:text-gray-400
                  "
                >
                  {
                    currentContent.toolsNote
                  }
                </p>
              </div>
            </div>

            {/* Ownership side */}
            <div
              className="
                relative
                p-7

                sm:p-8
              "
            >
              <div
                aria-hidden="true"
                className="
                  pointer-events-none
                  absolute
                  -right-20
                  top-1/2
                  h-60
                  w-60
                  -translate-y-1/2
                  rounded-full
                  bg-emerald-500/10
                  blur-[90px]
                "
              />

              <div className="relative z-10">
                <div
                  className="
                    mb-5
                    flex
                    items-center
                    gap-3
                  "
                >
                  <span
                    className="
                      flex
                      h-11
                      w-11
                      items-center
                      justify-center
                      rounded-xl
                      bg-emerald-50
                      text-emerald-700

                      dark:bg-emerald-500/10
                      dark:text-emerald-300
                    "
                  >
                    <FaUserCheck
                      size={17}
                    />
                  </span>

                  <div>
                    <p
                      className="
                        text-xs
                        font-black
                        uppercase
                        tracking-[0.12em]
                        text-emerald-700

                        dark:text-emerald-300
                      "
                    >
                      {
                        currentLabels.ownership
                      }
                    </p>

                    <h3
                      className="
                        text-xl
                        font-black
                        text-gray-950

                        dark:text-white
                      "
                    >
                      {
                        currentContent.ownershipTitle
                      }
                    </h3>
                  </div>
                </div>

                <p
                  className="
                    mb-5
                    leading-relaxed
                    text-gray-600

                    dark:text-gray-300
                  "
                >
                  {
                    currentContent.ownershipText
                  }
                </p>

                <div
                  className="
                    grid
                    gap-2

                    sm:grid-cols-2
                  "
                >
                  {currentContent.ownershipAreas.map(
                    (
                      item,
                      index
                    ) => {
                      const Icon =
                        ownershipIcons[
                          index %
                            ownershipIcons.length
                        ];

                      return (
                        <motion.div
                          key={item}
                          initial={{
                            opacity: 0,
                            x: prefersReducedMotion
                              ? 0
                              : 12,
                          }}
                          whileInView={{
                            opacity: 1,
                            x: 0,
                          }}
                          viewport={{
                            once: true,
                          }}
                          transition={{
                            delay:
                              prefersReducedMotion
                                ? 0
                                : index *
                                  0.05,
                          }}
                          whileHover={
                            prefersReducedMotion
                              ? undefined
                              : {
                                  x: 4,
                                }
                          }
                          className="
                            flex
                            items-center
                            gap-3
                            rounded-xl
                            border
                            border-emerald-100
                            bg-emerald-50/60
                            px-3
                            py-3

                            dark:border-emerald-500/10
                            dark:bg-emerald-500/[0.05]
                          "
                        >
                          <Icon
                            className="
                              flex-shrink-0
                              text-emerald-600

                              dark:text-emerald-400
                            "
                            size={11}
                          />

                          <span
                            className="
                              text-xs
                              font-bold
                              text-gray-700

                              dark:text-gray-300
                            "
                          >
                            {item}
                          </span>
                        </motion.div>
                      );
                    }
                  )}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* PROJECT CONTEXT */}
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
          }}
          transition={{
            duration:
              prefersReducedMotion
                ? 0
                : 0.8,
          }}
          className="
            relative
            mx-auto
            mt-16
            max-w-5xl

            lg:mt-20
          "
        >
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
              p-7
              shadow-[0_22px_80px_rgba(15,23,42,0.08)]

              dark:bg-gray-900
              dark:shadow-[0_28px_90px_rgba(0,0,0,0.36)]

              sm:p-9
              lg:p-10
            "
          >
            <div
              aria-hidden="true"
              className="
                pointer-events-none
                absolute
                -left-20
                top-1/2
                h-64
                w-64
                -translate-y-1/2
                rounded-full
                bg-blue-500/10
                blur-[95px]
              "
            />

            <motion.div
              aria-hidden="true"
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
              className="
                pointer-events-none
                absolute
                -right-5
                -top-10
                text-[12rem]
                font-black
                text-blue-900/[0.025]

                dark:text-blue-300/[0.03]
              "
            >
              AI
            </motion.div>

            <div
              className="
                relative
                z-10
                grid
                gap-6

                sm:grid-cols-[auto_1fr]
                sm:items-start
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
                className="
                  flex
                  h-14
                  w-14
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
                <FaProjectDiagram
                  size={18}
                />
              </motion.div>

              <div>
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
                  {
                    currentLabels.projectContext
                  }
                </span>

                <h3
                  className="
                    mt-2
                    text-2xl
                    font-black
                    tracking-[-0.03em]
                    text-gray-950

                    dark:text-white
                  "
                >
                  {
                    currentContent.projectsTitle
                  }
                </h3>

                <p
                  className="
                    mt-3
                    max-w-3xl
                    leading-relaxed
                    text-gray-600

                    dark:text-gray-300
                  "
                >
                  {
                    currentContent.projectsText
                  }
                </p>

                <div
                  className="
                    mt-6
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
                      repeatDelay: 0.8,
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

      {/* BOTTOM FADE */}
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

export default ModernEngineering;
