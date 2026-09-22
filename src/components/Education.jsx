import React, {
  useContext,
  useRef,
} from 'react';

import {
  FaGraduationCap,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaCode,
  FaLaptopCode,
  FaBookOpen,
  FaArrowRight,
  FaCheck,
  FaInfinity,
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

/* ==========================================================
   EDUCATION CARD
========================================================== */

const EducationCard = ({
  edu,
  index,
  focusLabel,
  roleLabel,
  cardLabel,
  prefersReducedMotion,
}) => {
  const cardRef = useRef(null);

  /* ------------------------------------------
     3D TILT
  ------------------------------------------ */

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
    stiffness: 180,
    damping: 22,
  });

  const rotateY = useSpring(rawRotateY, {
    stiffness: 180,
    damping: 22,
  });

  /* ------------------------------------------
     MOUSE GLOW
  ------------------------------------------ */

  const glowX = useMotionValue(250);
  const glowY = useMotionValue(150);

  const smoothGlowX = useSpring(glowX, {
    stiffness: 150,
    damping: 25,
  });

  const smoothGlowY = useSpring(glowY, {
    stiffness: 150,
    damping: 25,
  });

  const glowBackground = useMotionTemplate`
    radial-gradient(
      500px circle at ${smoothGlowX}px ${smoothGlowY}px,
      rgba(37, 99, 235, 0.13),
      transparent 55%
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

  const resetTilt = () => {
    pointerX.set(0);
    pointerY.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={resetTilt}
      initial={{
        opacity: 0,
        y: prefersReducedMotion
          ? 0
          : 70,
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
        amount: 0.2,
      }}
      transition={{
        duration: prefersReducedMotion
          ? 0
          : 0.8,
        delay:
          prefersReducedMotion
            ? 0
            : index * 0.08,
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
      {/* =====================================
          CARD GLOW
      ====================================== */}

      <div
        aria-hidden="true"
        className="
          absolute
          -inset-3
          -z-10
          rounded-[2rem]
          bg-blue-500/0
          blur-3xl
          transition-all
          duration-700
          group-hover/card:bg-blue-500/10

          dark:group-hover/card:bg-blue-500/15
        "
      />

      {/* =====================================
          CARD
      ====================================== */}

      <article
        className="
          relative
          overflow-hidden
          rounded-[1.75rem]
          border
          border-gray-200/80
          bg-white/85
          p-6
          shadow-[0_10px_40px_rgba(15,23,42,0.05)]
          backdrop-blur-xl
          transition-[border-color,box-shadow]
          duration-500

          group-hover/card:border-blue-200
          group-hover/card:shadow-[0_24px_70px_rgba(37,99,235,0.12)]

          dark:border-white/[0.08]
          dark:bg-gray-900/80
          dark:shadow-[0_15px_50px_rgba(0,0,0,0.25)]
          dark:group-hover/card:border-blue-500/20

          sm:p-8
          lg:p-10
        "
      >
        {/* Mouse-follow spotlight */}

        <motion.div
          aria-hidden="true"
          style={{
            background:
              glowBackground,
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

        {/* Top decorative gradient */}

        <div
          aria-hidden="true"
          className="
            absolute
            left-0
            top-0
            h-[3px]
            w-full
            bg-gradient-to-r
            from-transparent
            via-blue-600
            to-transparent
            opacity-60
          "
        />

        {/* Corner glow */}

        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            -right-28
            -top-28
            h-64
            w-64
            rounded-full
            bg-blue-500/[0.07]
            blur-3xl

            dark:bg-blue-500/[0.1]
          "
        />

        {/* Decorative number */}

        <span
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            -right-2
            -top-8
            select-none
            text-[9rem]
            font-black
            leading-none
            tracking-tighter
            text-gray-900/[0.025]

            dark:text-white/[0.025]

            sm:text-[11rem]
          "
        >
          0{index + 1}
        </span>

        <div className="relative z-10">

          {/* =====================================
              TOP LABEL
          ====================================== */}

          <div
            className="
              mb-6
              flex
              flex-wrap
              items-center
              justify-between
              gap-4
            "
          >
            <div
              className="
                inline-flex
                items-center
                gap-2
                rounded-full
                border
                border-blue-100
                bg-blue-50/80
                px-3
                py-1.5
                text-xs
                font-bold
                uppercase
                tracking-[0.12em]
                text-blue-800

                dark:border-blue-500/15
                dark:bg-blue-500/10
                dark:text-blue-300
              "
            >
              <FaGraduationCap
                size={13}
              />

              {cardLabel}
            </div>

            <span
              className="
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

          {/* =====================================
              INSTITUTION
          ====================================== */}

          <div
            className="
              mb-7
              grid
              gap-5
              lg:grid-cols-[1fr_auto]
              lg:items-start
            "
          >
            <div>
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
                  tracking-tight
                  text-gray-950

                  dark:text-white

                  sm:text-3xl
                "
              >
                {edu.institution}
              </motion.h3>

              <p
                className="
                  mt-2
                  max-w-2xl
                  text-lg
                  font-bold
                  leading-snug
                  text-blue-800

                  dark:text-blue-400

                  sm:text-xl
                "
              >
                {edu.degree}
              </p>
            </div>

            {/* Date/location */}

            <div
              className="
                flex
                flex-wrap
                gap-2
                lg:max-w-[260px]
                lg:justify-end
              "
            >
              <div
                className="
                  inline-flex
                  items-center
                  gap-2
                  rounded-xl
                  border
                  border-gray-200
                  bg-gray-50/80
                  px-3
                  py-2
                  text-xs
                  font-semibold
                  text-gray-600

                  dark:border-white/[0.06]
                  dark:bg-white/[0.035]
                  dark:text-gray-300
                "
              >
                <FaCalendarAlt
                  className="
                    text-blue-600
                    dark:text-blue-400
                  "
                />

                {edu.dates}
              </div>

              <div
                className="
                  inline-flex
                  items-center
                  gap-2
                  rounded-xl
                  border
                  border-gray-200
                  bg-gray-50/80
                  px-3
                  py-2
                  text-xs
                  font-semibold
                  text-gray-600

                  dark:border-white/[0.06]
                  dark:bg-white/[0.035]
                  dark:text-gray-300
                "
              >
                <FaMapMarkerAlt
                  className="
                    text-blue-600
                    dark:text-blue-400
                  "
                />

                {edu.location}
              </div>
            </div>
          </div>

          {/* Divider */}

          <div
            className="
              mb-7
              h-px
              w-full
              bg-gradient-to-r
              from-transparent
              via-gray-200
              to-transparent

              dark:via-gray-700
            "
          />

          {/* =====================================
              FOCUS AREAS
          ====================================== */}

          <div className="mb-7">

            <div
              className="
                mb-4
                flex
                items-center
                gap-2
              "
            >
              <span
                className="
                  flex
                  h-8
                  w-8
                  items-center
                  justify-center
                  rounded-lg
                  bg-blue-50
                  text-blue-700

                  dark:bg-blue-500/10
                  dark:text-blue-400
                "
              >
                <FaCode size={14} />
              </span>

              <h4
                className="
                  text-sm
                  font-black
                  uppercase
                  tracking-[0.12em]
                  text-gray-900

                  dark:text-white
                "
              >
                {focusLabel}
              </h4>
            </div>

            <div
              className="
                flex
                flex-wrap
                gap-2
              "
            >
              {edu.focus.map(
                (item, focusIndex) => (
                  <motion.span
                    key={item}
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
                          : 0.18 +
                            focusIndex *
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
                      scale: 0.96,
                    }}
                    className="
                      group/tag
                      relative
                      cursor-default
                      overflow-hidden
                      rounded-full
                      border
                      border-blue-100
                      bg-blue-50/80
                      px-3
                      py-1.5
                      text-sm
                      font-semibold
                      text-blue-800
                      shadow-sm
                      transition-colors

                      hover:border-blue-200
                      hover:bg-blue-100

                      dark:border-blue-500/10
                      dark:bg-blue-500/[0.08]
                      dark:text-blue-200
                      dark:hover:border-blue-500/20
                      dark:hover:bg-blue-500/[0.14]
                    "
                  >
                    <span
                      aria-hidden="true"
                      className="
                        absolute
                        inset-0
                        translate-x-[-120%]
                        bg-gradient-to-r
                        from-transparent
                        via-white/50
                        to-transparent
                        transition-transform
                        duration-700
                        group-hover/tag:translate-x-[120%]

                        dark:via-white/10
                      "
                    />

                    <span className="relative">
                      {item}
                    </span>
                  </motion.span>
                )
              )}
            </div>
          </div>

          {/* =====================================
              ROLE IN JOURNEY
          ====================================== */}

          <motion.div
            whileHover={
              prefersReducedMotion
                ? undefined
                : {
                    x: 4,
                  }
            }
            className="
              group/role
              relative
              overflow-hidden
              rounded-2xl
              border
              border-blue-100
              bg-gradient-to-r
              from-blue-50
              via-blue-50/60
              to-cyan-50/50
              p-5

              dark:border-blue-500/10
              dark:from-blue-500/[0.08]
              dark:via-blue-500/[0.04]
              dark:to-cyan-500/[0.04]

              sm:p-6
            "
          >
            {/* Accent */}

            <motion.div
              aria-hidden="true"
              className="
                absolute
                bottom-0
                left-0
                top-0
                w-1
                origin-bottom
                bg-gradient-to-b
                from-blue-500
                to-cyan-400
              "
              initial={{
                scaleY: 0,
              }}
              whileInView={{
                scaleY: 1,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                delay: 0.25,
                duration: 0.7,
              }}
            />

            <div
              className="
                flex
                gap-4
              "
            >
              <div
                className="
                  mt-0.5
                  flex
                  h-9
                  w-9
                  flex-shrink-0
                  items-center
                  justify-center
                  rounded-xl
                  bg-blue-800
                  text-white
                  shadow-md
                  shadow-blue-900/15

                  dark:bg-blue-600
                "
              >
                <FaArrowRight
                  size={13}
                  className="
                    transition-transform
                    duration-300
                    group-hover/role:translate-x-1
                  "
                />
              </div>

              <div>
                <h4
                  className="
                    mb-2
                    text-base
                    font-black
                    text-gray-950

                    dark:text-white
                  "
                >
                  {roleLabel}
                </h4>

                <p
                  className="
                    leading-relaxed
                    text-gray-600

                    dark:text-gray-300
                  "
                >
                  {edu.role}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </article>
    </motion.div>
  );
};

/* ==========================================================
   MAIN EDUCATION SECTION
========================================================== */

const Education = () => {
  const { language } =
    useContext(LanguageContext);

  const t = translations[language];

  const sectionRef = useRef(null);

  const prefersReducedMotion =
    useReducedMotion();

  /* ------------------------------------------
     TRANSLATED EXTRA LABELS
  ------------------------------------------ */

  const labels = {
    en: {
      focus: 'Focus Areas',
      sectionTag:
        'Education & Training',
      journey:
        'Learning Journey',
      academic:
        'Academic Foundation',
      professional:
        'Professional Training',
      milestones: 'Milestones',
      alwaysLearning:
        'Always Learning',
      continuousTag:
        'Continuous Growth',
    },

    tr: {
      focus: 'Odak Alanları',
      sectionTag:
        'Eğitim & Gelişim',
      journey:
        'Öğrenme Yolculuğu',
      academic:
        'Akademik Temel',
      professional:
        'Profesyonel Eğitim',
      milestones: 'Dönüm Noktası',
      alwaysLearning:
        'Sürekli Öğrenme',
      continuousTag:
        'Sürekli Gelişim',
    },

    de: {
      focus: 'Schwerpunkte',
      sectionTag:
        'Bildung & Ausbildung',
      journey:
        'Lernweg',
      academic:
        'Akademische Grundlage',
      professional:
        'Berufliche Ausbildung',
      milestones: 'Meilensteine',
      alwaysLearning:
        'Lebenslanges Lernen',
      continuousTag:
        'Kontinuierliche Entwicklung',
    },
  };

  const currentLabels =
    labels[language] || labels.en;

  /* ------------------------------------------
     DATA
  ------------------------------------------ */

  const educationData = {
    en: [
      {
        id: 'ufuk',
        institution:
          'Ufuk University',
        degree:
          'Associate Degree in Computer Programming',
        dates: '2017 – 2020',
        location:
          'Ankara, Turkey',
        focus: [
          'Programming Fundamentals',
          'Problem Solving',
          'Web Technologies',
          'Database Concepts',
          'Software Development Fundamentals',
          'Algorithms',
          'Logical Reasoning',
        ],
        role:
          t.education
            .ufukRoleText,
      },

      {
        id: 'workintech',
        institution:
          'Workintech',
        degree:
          'Full-Stack Software Development Program',
        dates: '2024 – 2025',
        location:
          'Istanbul, Turkey',
        focus: [
          'React',
          'TypeScript',
          'JavaScript',
          'REST APIs',
          'Git/GitHub',
          'Testing',
          'Full-Stack Development',
          'Component-Based Development',
          'API-Driven Interfaces',
        ],
        role:
          t.education
            .workintechRoleText,
      },
    ],

    tr: [
      {
        id: 'ufuk',
        institution:
          'Ufuk Üniversitesi',
        degree:
          'Bilgisayar Programlama Önlisans Derecesi',
        dates: '2017 – 2020',
        location:
          'Ankara, Türkiye',
        focus: [
          'Programlama Temelleri',
          'Problem Çözme',
          'Web Teknolojileri',
          'Veritabanı Kavramları',
          'Yazılım Geliştirme Temelleri',
          'Algoritmalar',
          'Mantıksal Akıl Yürütme',
        ],
        role:
          t.education
            .ufukRoleText,
      },

      {
        id: 'workintech',
        institution:
          'Workintech',
        degree:
          'Full-Stack Yazılım Geliştirme Programı',
        dates: '2024 – 2025',
        location:
          'İstanbul, Türkiye',
        focus: [
          'React',
          'TypeScript',
          'JavaScript',
          "REST API'ler",
          'Git/GitHub',
          'Test',
          'Full-Stack Geliştirme',
          'Bileşen Tabanlı Geliştirme',
          'API Odaklı Arayüzler',
        ],
        role:
          t.education
            .workintechRoleText,
      },
    ],

    de: [
      {
        id: 'ufuk',
        institution:
          'Ufuk Universität',
        degree:
          'Associate Degree in Computer Programming',
        dates: '2017 – 2020',
        location:
          'Ankara, Türkei',
        focus: [
          'Programmiergrundlagen',
          'Problemlösung',
          'Web-Technologien',
          'Datenbankkonzepte',
          'Grundlagen der Softwareentwicklung',
          'Algorithmen',
          'Logisches Denken',
        ],
        role:
          t.education
            .ufukRoleText,
      },

      {
        id: 'workintech',
        institution:
          'Workintech',
        degree:
          'Full-Stack-Softwareentwicklungsprogramm',
        dates: '2024 – 2025',
        location:
          'Istanbul, Türkei',
        focus: [
          'React',
          'TypeScript',
          'JavaScript',
          'REST-APIs',
          'Git/GitHub',
          'Testing',
          'Full-Stack-Entwicklung',
          'Komponentenbasierte Entwicklung',
          'API-basierte Benutzeroberflächen',
        ],
        role:
          t.education
            .workintechRoleText,
      },
    ],
  };

  const education =
    educationData[language] ||
    educationData.en;

  /* ------------------------------------------
     SECTION SCROLL ANIMATION
  ------------------------------------------ */

  const { scrollYProgress } =
    useScroll({
      target: sectionRef,
      offset: [
        'start 85%',
        'end 30%',
      ],
    });

  const timelineProgress =
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
          : 70,
        prefersReducedMotion
          ? 0
          : -70,
      ]
    );

  return (
    <section
      ref={sectionRef}
      id="education"
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
              rgba(37, 99, 235, 0.055) 1px,
              transparent 1px
            ),
            linear-gradient(
              to bottom,
              rgba(37, 99, 235, 0.055) 1px,
              transparent 1px
            )
          `,
          backgroundSize:
            '48px 48px',
          WebkitMaskImage:
            'linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)',
          maskImage:
            'linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)',
        }}
      />

      {/* ==================================================
          LARGE GLOWS
      =================================================== */}

      <motion.div
        aria-hidden="true"
        style={{
          y: backgroundY,
        }}
        className="
          pointer-events-none
          absolute
          -left-52
          top-36
          -z-10
          h-[34rem]
          w-[34rem]
          rounded-full
          bg-blue-300/15
          blur-[120px]

          dark:bg-blue-700/10
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
          -right-52
          bottom-32
          -z-10
          h-[38rem]
          w-[38rem]
          rounded-full
          bg-cyan-300/15
          blur-[130px]

          dark:bg-cyan-700/[0.08]
        "
      />

      {/* ==================================================
          FLOATING DECORATIONS
      =================================================== */}

      <motion.span
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          left-[5%]
          top-[18%]
          hidden
          font-mono
          text-5xl
          font-black
          text-blue-900/[0.035]

          dark:text-blue-300/[0.035]

          lg:block
        "
        animate={
          prefersReducedMotion
            ? undefined
            : {
                y: [
                  0,
                  -15,
                  0,
                ],
                rotate: [
                  0,
                  4,
                  0,
                ],
              }
        }
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        {'</>'}
      </motion.span>

      <motion.span
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          right-[5%]
          top-[40%]
          hidden
          font-mono
          text-6xl
          font-black
          text-blue-900/[0.03]

          dark:text-blue-300/[0.035]

          lg:block
        "
        animate={
          prefersReducedMotion
            ? undefined
            : {
                y: [
                  0,
                  18,
                  0,
                ],
                rotate: [
                  0,
                  -5,
                  0,
                ],
              }
        }
        transition={{
          duration: 8.5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        {'{ }'}
      </motion.span>

      <div
        className="
          relative
          mx-auto
          max-w-7xl
          px-4

          sm:px-6
          lg:px-8
        "
      >

        {/* ==================================================
            SECTION HEADER
        =================================================== */}

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
            amount: 0.5,
          }}
          transition={{
            duration:
              prefersReducedMotion
                ? 0
                : 0.8,
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

            lg:mb-20
          "
        >

          {/* Small tag */}

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
            <FaGraduationCap />

            {
              currentLabels.sectionTag
            }
          </motion.div>

          {/* Title */}

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
              delay: 0.1,
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
            {t.education.title}
          </motion.h2>

          {/* Animated underline */}

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
                delay: 0.25,
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
              delay: 0.2,
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
            {t.education.subtitle}
          </motion.p>

          {/* Milestones mini stat */}

          <motion.div
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
              delay: 0.35,
            }}
            className="
              mt-6
              inline-flex
              items-center
              gap-2
              text-xs
              font-bold
              uppercase
              tracking-[0.12em]
              text-gray-400

              dark:text-gray-500
            "
          >
            <span
              className="
                h-1.5
                w-1.5
                rounded-full
                bg-blue-500
              "
            />

            {education.length}{' '}
            {
              currentLabels.milestones
            }
          </motion.div>
        </motion.div>

        {/* ==================================================
            JOURNEY
        =================================================== */}

        <div
          className="
            mx-auto
            max-w-5xl
          "
        >

          {/* Journey label */}

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
              mb-8
              ml-1
              flex
              items-center
              gap-3

              sm:ml-2
            "
          >
            <div
              className="
                flex
                h-9
                w-9
                items-center
                justify-center
                rounded-xl
                bg-blue-800
                text-white
                shadow-lg
                shadow-blue-900/20
              "
            >
              <FaLaptopCode
                size={15}
              />
            </div>

            <span
              className="
                text-sm
                font-black
                uppercase
                tracking-[0.14em]
                text-gray-700

                dark:text-gray-300
              "
            >
              {
                currentLabels.journey
              }
            </span>
          </motion.div>

          {/* ==============================================
              TIMELINE
          =============================================== */}

          <div className="relative">

            {/* Background timeline */}

            <div
              aria-hidden="true"
              className="
                absolute
                bottom-0
                left-[22px]
                top-0
                w-[2px]
                rounded-full
                bg-gray-200

                dark:bg-gray-800

                sm:left-[26px]
              "
            />

            {/* Animated timeline progress */}

            <motion.div
              aria-hidden="true"
              style={{
                scaleY:
                  timelineProgress,
                transformOrigin:
                  'top',
              }}
              className="
                absolute
                bottom-0
                left-[22px]
                top-0
                w-[2px]
                rounded-full
                bg-gradient-to-b
                from-blue-700
                via-blue-500
                to-cyan-400
                shadow-[0_0_12px_rgba(59,130,246,0.45)]

                sm:left-[26px]
              "
            />

            <div
              className="
                space-y-10

                lg:space-y-14
              "
            >
              {education.map(
                (edu, index) => (
                  <div
                    key={edu.id}
                    className="
                      relative
                      pl-16

                      sm:pl-20
                    "
                  >

                    {/* Timeline node */}

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
                        amount: 0.7,
                      }}
                      transition={{
                        type: 'spring',
                        stiffness: 300,
                        damping: 18,
                        delay:
                          index *
                          0.1,
                      }}
                      className="
                        absolute
                        left-[5px]
                        top-8
                        z-20
                        flex
                        h-9
                        w-9
                        items-center
                        justify-center
                        rounded-full
                        border-[5px]
                        border-gray-50
                        bg-gradient-to-br
                        from-blue-700
                        to-cyan-500
                        text-white
                        shadow-lg
                        shadow-blue-600/20

                        dark:border-gray-950

                        sm:left-[9px]
                      "
                    >
                      <FaCheck
                        size={10}
                      />
                    </motion.div>

                    {/* Pulse */}

                    {!prefersReducedMotion && (
                      <motion.div
                        aria-hidden="true"
                        className="
                          absolute
                          left-[9px]
                          top-12
                          h-7
                          w-7
                          rounded-full
                          bg-blue-500/30

                          sm:left-[13px]
                        "
                        animate={{
                          scale: [
                            1,
                            1.9,
                            1,
                          ],
                          opacity: [
                            0.45,
                            0,
                            0.45,
                          ],
                        }}
                        transition={{
                          duration: 2.8,
                          repeat:
                            Infinity,
                          delay:
                            index *
                            0.6,
                        }}
                      />
                    )}

                    <EducationCard
                      edu={edu}
                      index={index}
                      focusLabel={
                        currentLabels.focus
                      }
                      roleLabel={
                        t.education
                          .roleInJourney
                      }
                      cardLabel={
                        index === 0
                          ? currentLabels.academic
                          : currentLabels.professional
                      }
                      prefersReducedMotion={
                        prefersReducedMotion
                      }
                    />
                  </div>
                )
              )}
            </div>
          </div>

          {/* ==================================================
              CONTINUOUS LEARNING
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
              amount: 0.35,
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
              ml-16
              mt-12

              sm:ml-20
              lg:mt-16
            "
          >

            {/* Animated gradient border */}

            <motion.div
              aria-hidden="true"
              className="
                absolute
                -inset-[1px]
                rounded-[1.8rem]
                bg-gradient-to-r
                from-blue-600
                via-cyan-400
                to-indigo-600
                opacity-50
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
                duration: 7,
                repeat: Infinity,
                ease: 'linear',
              }}
            />

            <div
              className="
                group/learning
                relative
                overflow-hidden
                rounded-[1.75rem]
                bg-white
                p-6
                shadow-xl
                shadow-blue-950/[0.06]

                dark:bg-gray-900
                dark:shadow-black/30

                sm:p-8
                lg:p-10
              "
            >

              {/* Huge infinity decoration */}

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
                  duration: 8,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="
                  pointer-events-none
                  absolute
                  -right-10
                  -top-8
                  text-[12rem]
                  text-blue-700/[0.035]

                  dark:text-blue-400/[0.035]
                "
              >
                <FaInfinity />
              </motion.div>

              {/* Glow */}

              <div
                aria-hidden="true"
                className="
                  pointer-events-none
                  absolute
                  -left-20
                  top-1/2
                  h-56
                  w-56
                  -translate-y-1/2
                  rounded-full
                  bg-blue-500/10
                  blur-[80px]
                "
              />

              <div
                className="
                  relative
                  z-10
                  grid
                  gap-6

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
                          rotate: -6,
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
                    to-blue-600
                    text-white
                    shadow-lg
                    shadow-blue-900/20
                  "
                >
                  <FaBookOpen
                    size={21}
                  />
                </motion.div>

                <div>

                  {/* Label */}

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
                        tracking-[0.14em]
                        text-blue-700

                        dark:text-blue-400
                      "
                    >
                      {
                        currentLabels.continuousTag
                      }
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
                      {
                        currentLabels.alwaysLearning
                      }
                    </span>
                  </div>

                  <h3
                    className="
                      mb-3
                      text-2xl
                      font-black
                      tracking-tight
                      text-gray-950

                      dark:text-white

                      sm:text-3xl
                    "
                  >
                    {
                      t.education
                        .continuousLearning
                    }
                  </h3>

                  <p
                    className="
                      max-w-3xl
                      leading-relaxed
                      text-gray-600

                      dark:text-gray-300
                    "
                  >
                    {
                      t.education
                        .continuousLearningText
                    }
                  </p>

                  {/* Animated little line */}

                  <div
                    className="
                      mt-6
                      h-[3px]
                      w-20
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
                                '140%',
                              ],
                            }
                      }
                      transition={{
                        duration: 2.5,
                        repeat:
                          Infinity,
                        repeatDelay: 1,
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

export default Education;