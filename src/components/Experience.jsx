import React, {
  useContext,
  useRef,
} from 'react';

import {
  FaBriefcase,
  FaBuilding,
  FaCalendarAlt,
  FaCheckCircle,
  FaCode,
  FaLayerGroup,
  FaArrowRight,
  FaStar,
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
   EXPERIENCE CARD
========================================================= */

const ExperienceCard = ({
  experience,
  index,
  total,
  labels,
  t,
  prefersReducedMotion,
}) => {
  const cardRef = useRef(null);

  /* ------------------------------
     3D TILT
  ------------------------------ */

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

  /* ------------------------------
     MOUSE FOLLOW GLOW
  ------------------------------ */

  const glowX = useMotionValue(300);
  const glowY = useMotionValue(200);

  const smoothGlowX = useSpring(glowX, {
    stiffness: 140,
    damping: 24,
  });

  const smoothGlowY = useSpring(glowY, {
    stiffness: 140,
    damping: 24,
  });

  const glow = useMotionTemplate`
    radial-gradient(
      520px circle at ${smoothGlowX}px ${smoothGlowY}px,
      rgba(37, 99, 235, 0.13),
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

  const accent =
    index % 2 === 0
      ? {
          border:
            'border-blue-200/80 dark:border-blue-500/15',
          badge:
            'border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-500/15 dark:bg-blue-500/10 dark:text-blue-300',
          gradient:
            'from-blue-700 via-blue-500 to-cyan-400',
          glow:
            'bg-blue-500/15',
          icon:
            'bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-300',
        }
      : {
          border:
            'border-violet-200/80 dark:border-violet-500/15',
          badge:
            'border-violet-200 bg-violet-50 text-violet-700 dark:border-violet-500/15 dark:bg-violet-500/10 dark:text-violet-300',
          gradient:
            'from-violet-600 via-blue-500 to-cyan-400',
          glow:
            'bg-violet-500/15',
          icon:
            'bg-violet-100 text-violet-700 dark:bg-violet-500/10 dark:text-violet-300',
        };

  return (
    <motion.article
      ref={cardRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={resetPointer}
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
          : 0.85,
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
          ${accent.glow}
        `}
      />

      <div
        className={`
          relative
          overflow-hidden
          rounded-[1.8rem]
          border
          bg-white/90
          shadow-[0_16px_50px_rgba(15,23,42,0.06)]
          backdrop-blur-xl
          transition-all
          duration-500

          group-hover/card:-translate-y-1
          group-hover/card:shadow-[0_28px_80px_rgba(15,23,42,0.13)]

          dark:bg-gray-900/85
          dark:shadow-[0_20px_65px_rgba(0,0,0,0.30)]

          ${accent.border}
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

        {/* Top gradient */}

        <div
          aria-hidden="true"
          className={`
            absolute
            left-0
            top-0
            h-[3px]
            w-full
            bg-gradient-to-r
            ${accent.gradient}
          `}
        />

        {/* Huge number */}

        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            -right-4
            -top-10
            select-none
            text-[10rem]
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
        </div>

        {/* Corner glow */}

        <div
          aria-hidden="true"
          className={`
            pointer-events-none
            absolute
            -right-24
            -top-24
            h-64
            w-64
            rounded-full
            blur-[100px]
            ${accent.glow}
          `}
        />

        <div
          className="
            relative
            z-10
            grid
            lg:grid-cols-[0.9fr_1.6fr]
          "
        >
          {/* =====================================
              LEFT SIDE
          ====================================== */}

          <div
            className="
              relative
              border-b
              border-gray-200/80
              p-6

              dark:border-white/[0.06]

              sm:p-8
              lg:border-b-0
              lg:border-r
              lg:p-9
            "
          >
            {/* Role badge */}

            <div
              className={`
                mb-6
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
                ${accent.badge}
              `}
            >
              <FaBriefcase size={11} />

              {labels.professionalRole}
            </div>

            {/* Role */}

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
                leading-tight
                tracking-[-0.035em]
                text-gray-950

                dark:text-white

                sm:text-3xl
              "
            >
              {experience.role}
            </motion.h3>

            {/* Company */}

            <div
              className="
                mt-4
                flex
                items-center
                gap-2
              "
            >
              <div
                className={`
                  flex
                  h-8
                  w-8
                  items-center
                  justify-center
                  rounded-lg
                  ${accent.icon}
                `}
              >
                <FaBuilding size={12} />
              </div>

              <span
                className="
                  text-lg
                  font-bold
                  text-blue-800

                  dark:text-blue-400
                "
              >
                {experience.company}
              </span>
            </div>

            {/* Period */}

            <div
              className="
                mt-4
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
                text-gray-500

                dark:border-white/[0.06]
                dark:bg-white/[0.035]
                dark:text-gray-400
              "
            >
              <FaCalendarAlt
                className="
                  text-blue-600
                  dark:text-blue-400
                "
              />

              {experience.period}
            </div>

            {/* Mini stats */}

            <div
              className="
                mt-7
                grid
                grid-cols-2
                overflow-hidden
                rounded-2xl
                border
                border-gray-200/70
                bg-gray-50/60

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
                    experience
                      .responsibilities
                      .length
                  }
                </div>

                <div
                  className="
                    mt-1
                    text-[9px]
                    font-bold
                    uppercase
                    tracking-[0.08em]
                    text-gray-400
                  "
                >
                  {labels.responsibilityCount}
                </div>
              </div>

              <div
                className="
                  border-l
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
                  {
                    experience
                      .technologies
                      .length
                  }
                </div>

                <div
                  className="
                    mt-1
                    text-[9px]
                    font-bold
                    uppercase
                    tracking-[0.08em]
                    text-gray-400
                  "
                >
                  {labels.technologyCount}
                </div>
              </div>
            </div>

            {/* Decorative arrow */}

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
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="
                pointer-events-none
                absolute
                bottom-5
                right-6
                hidden
                text-5xl
                text-blue-700/[0.05]

                dark:text-blue-300/[0.05]

                lg:block
              "
            >
              →
            </motion.div>
          </div>

          {/* =====================================
              RIGHT SIDE
          ====================================== */}

          <div
            className="
              p-6
              sm:p-8
              lg:p-9
            "
          >
            {/* Responsibilities */}

            <div className="mb-8">

              <div
                className="
                  mb-5
                  flex
                  items-center
                  gap-3
                "
              >
                <div
                  className={`
                    flex
                    h-9
                    w-9
                    items-center
                    justify-center
                    rounded-xl
                    ${accent.icon}
                  `}
                >
                  <FaCheckCircle
                    size={14}
                  />
                </div>

                <div>
                  <h4
                    className="
                      text-base
                      font-black
                      text-gray-950

                      dark:text-white
                    "
                  >
                    {
                      t.experience
                        .responsibilities
                    }
                  </h4>

                  <p
                    className="
                      mt-0.5
                      text-xs
                      text-gray-400
                    "
                  >
                    {labels.impactSubtitle}
                  </p>
                </div>
              </div>

              <ul className="space-y-3">
                {experience.responsibilities.map(
                  (
                    responsibility,
                    responsibilityIndex
                  ) => (
                    <motion.li
                      key={
                        responsibility
                      }
                      initial={{
                        opacity: 0,
                        x: prefersReducedMotion
                          ? 0
                          : -15,
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
                            : 0.12 +
                              responsibilityIndex *
                                0.045,
                      }}
                      whileHover={
                        prefersReducedMotion
                          ? undefined
                          : {
                              x: 5,
                            }
                      }
                      className="
                        group/item
                        flex
                        items-start
                        gap-3
                        rounded-xl
                        px-2
                        py-2
                        transition-colors

                        hover:bg-blue-50/60

                        dark:hover:bg-blue-500/[0.05]
                      "
                    >
                      <span
                        className="
                          mt-[3px]
                          flex
                          h-5
                          w-5
                          flex-shrink-0
                          items-center
                          justify-center
                          rounded-full
                          bg-blue-50
                          text-blue-600
                          transition-transform
                          duration-300

                          group-hover/item:scale-110

                          dark:bg-blue-500/10
                          dark:text-blue-400
                        "
                      >
                        <FaCheckCircle
                          size={9}
                        />
                      </span>

                      <span
                        className="
                          leading-relaxed
                          text-gray-600

                          dark:text-gray-300
                        "
                      >
                        {responsibility}
                      </span>
                    </motion.li>
                  )
                )}
              </ul>
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

            {/* Technologies */}

            <div>
              <div
                className="
                  mb-4
                  flex
                  items-center
                  gap-3
                "
              >
                <div
                  className={`
                    flex
                    h-9
                    w-9
                    items-center
                    justify-center
                    rounded-xl
                    ${accent.icon}
                  `}
                >
                  <FaCode size={14} />
                </div>

                <div>
                  <h4
                    className="
                      text-base
                      font-black
                      text-gray-950

                      dark:text-white
                    "
                  >
                    {
                      t.experience
                        .technologies
                    }
                  </h4>

                  <p
                    className="
                      mt-0.5
                      text-xs
                      text-gray-400
                    "
                  >
                    {labels.stackSubtitle}
                  </p>
                </div>
              </div>

              <div
                className="
                  flex
                  flex-wrap
                  gap-2
                "
              >
                {experience.technologies.map(
                  (
                    tech,
                    techIndex
                  ) => (
                    <motion.span
                      key={tech}
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
                            : 0.15 +
                              techIndex *
                                0.04,
                      }}
                      whileHover={
                        prefersReducedMotion
                          ? undefined
                          : {
                              y: -3,
                              scale: 1.04,
                            }
                      }
                      className="
                        group/tech
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
                      {/* Shine */}

                      <span
                        aria-hidden="true"
                        className="
                          absolute
                          inset-0
                          -translate-x-[120%]
                          bg-gradient-to-r
                          from-transparent
                          via-blue-100/90
                          to-transparent
                          transition-transform
                          duration-700

                          group-hover/tech:translate-x-[120%]

                          dark:via-blue-400/10
                        "
                      />

                      <span className="relative">
                        {tech}
                      </span>
                    </motion.span>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.article>
  );
};

/* =========================================================
   MAIN EXPERIENCE SECTION
========================================================= */

const Experience = () => {
  const { language } =
    useContext(LanguageContext);

  const t = translations[language];

  const sectionRef = useRef(null);

  const prefersReducedMotion =
    useReducedMotion();

  /* =======================================================
     EXTRA LABELS
  ======================================================= */

  const labels = {
    en: {
      sectionTag:
        'Professional Experience',
      timeline:
        'Career Experience',
      roles:
        'Roles',
      starting:
        'First Role',
      latest:
        'Latest Role',
      professionalRole:
        'Professional Role',
      responsibilityCount:
        'Responsibilities',
      technologyCount:
        'Technologies',
      impactSubtitle:
        'Key contributions and responsibilities',
      stackSubtitle:
        'Tools and technologies used',
      growth:
        'Professional Growth',
      growthText:
        'From production frontend development to full-stack engineering, each role strengthened practical engineering, collaboration, integration, and quality-focused development.',
    },

    tr: {
      sectionTag:
        'Profesyonel Deneyim',
      timeline:
        'Kariyer Deneyimi',
      roles:
        'Rol',
      starting:
        'İlk Rol',
      latest:
        'Son Rol',
      professionalRole:
        'Profesyonel Rol',
      responsibilityCount:
        'Sorumluluk',
      technologyCount:
        'Teknoloji',
      impactSubtitle:
        'Temel katkılar ve sorumluluklar',
      stackSubtitle:
        'Kullanılan araç ve teknolojiler',
      growth:
        'Profesyonel Gelişim',
      growthText:
        'Üretim odaklı frontend geliştirmeden full-stack mühendisliğe uzanan bu roller; uygulamalı mühendislik, ekip işbirliği, entegrasyon ve kalite odaklı geliştirme deneyimini güçlendirdi.',
    },

    de: {
      sectionTag:
        'Berufserfahrung',
      timeline:
        'Karriereerfahrung',
      roles:
        'Rollen',
      starting:
        'Erste Rolle',
      latest:
        'Letzte Rolle',
      professionalRole:
        'Berufliche Rolle',
      responsibilityCount:
        'Aufgaben',
      technologyCount:
        'Technologien',
      impactSubtitle:
        'Wichtige Beiträge und Verantwortlichkeiten',
      stackSubtitle:
        'Verwendete Tools und Technologien',
      growth:
        'Berufliche Entwicklung',
      growthText:
        'Von produktionsnaher Frontend-Entwicklung bis hin zum Full-Stack-Engineering stärkten diese Rollen praktische Engineering-, Integrations-, Kollaborations- und Qualitätserfahrung.',
    },
  };

  const currentLabels =
    labels[language] || labels.en;

  /* =======================================================
     DATA
  ======================================================= */

  const experienceData = {
    en: [
      {
        id: 'arma',
        company:
          'ARMA Group Holding',
        role:
          'Full-Stack Engineer',
        period:
          'Feb 2022 – Aug 2022',
        responsibilities: [
          'Built reusable Vue.js components for production interfaces',
          'Developed responsive production frontend interfaces',
          'Integrated frontend interfaces with Node.js REST services',
          'Collaborated with backend engineers and QA teams',
          'Worked on API contracts and integration specifications',
          'Investigated and resolved edge cases and cross-browser issues',
          'Supported release readiness and quality assurance processes',
        ],
        technologies: [
          'Vue.js',
          'JavaScript',
          'Node.js',
          'REST APIs',
          'CSS',
          'HTML',
        ],
      },

      {
        id: 'cers',
        company:
          'CERS Software',
        role:
          'Frontend Developer',
        period:
          'Jul 2021 – Dec 2021',
        responsibilities: [
          'Converted Adobe XD designs into responsive production interfaces',
          'Implemented semantic HTML, CSS, and JavaScript',
          'Created reusable UI patterns and component libraries',
          'Optimized frontend assets for performance',
          'Solved cross-browser compatibility and viewport issues',
          'Participated in QA cycles and user testing',
        ],
        technologies: [
          'HTML',
          'CSS',
          'JavaScript',
          'Adobe XD',
          'Responsive Design',
        ],
      },
    ],

    tr: [
      {
        id: 'arma',
        company:
          'ARMA Group Holding',
        role:
          'Full-Stack Geliştirici',
        period:
          'Şub 2022 – Ağu 2022',
        responsibilities: [
          'Üretim arayüzleri için yeniden kullanılabilir Vue.js bileşenleri geliştirdim',
          'Responsive üretim arayüzleri geliştirdim',
          'Frontend arayüzlerini Node.js REST servisleriyle entegre ettim',
          'Backend geliştiricileri ve QA ekipleriyle birlikte çalıştım',
          'API sözleşmeleri ve entegrasyon gereksinimleri üzerinde çalıştım',
          'Kenar durumlarını ve tarayıcılar arası uyumluluk sorunlarını araştırıp çözdüm',
          'Yayın hazırlığı ve kalite güvence süreçlerini destekledim',
        ],
        technologies: [
          'Vue.js',
          'JavaScript',
          'Node.js',
          "REST API'ler",
          'CSS',
          'HTML',
        ],
      },

      {
        id: 'cers',
        company:
          'CERS Software',
        role:
          'Frontend Geliştirici',
        period:
          'Tem 2021 – Ara 2021',
        responsibilities: [
          'Adobe XD tasarımlarını responsive üretim arayüzlerine dönüştürdüm',
          'Semantik HTML, CSS ve JavaScript uyguladım',
          'Yeniden kullanılabilir UI yapıları ve bileşen kalıpları geliştirdim',
          'Frontend varlıklarını performans için optimize ettim',
          'Tarayıcılar arası uyumluluk ve viewport sorunlarını çözdüm',
          'QA süreçlerine ve kullanıcı testlerine katıldım',
        ],
        technologies: [
          'HTML',
          'CSS',
          'JavaScript',
          'Adobe XD',
          'Responsive Design',
        ],
      },
    ],

    de: [
      {
        id: 'arma',
        company:
          'ARMA Group Holding',
        role:
          'Full-Stack-Entwickler',
        period:
          'Feb. 2022 – Aug. 2022',
        responsibilities: [
          'Wiederverwendbare Vue.js-Komponenten für produktive Benutzeroberflächen entwickelt',
          'Responsive Frontend-Oberflächen für Produktionsanwendungen entwickelt',
          'Frontend-Oberflächen mit Node.js-basierten REST-Services integriert',
          'Mit Backend-Entwicklern und QA-Teams zusammengearbeitet',
          'An API-Verträgen und Integrationsanforderungen gearbeitet',
          'Edge Cases und browserübergreifende Probleme untersucht und gelöst',
          'Release-Vorbereitung und Qualitätssicherungsprozesse unterstützt',
        ],
        technologies: [
          'Vue.js',
          'JavaScript',
          'Node.js',
          'REST-APIs',
          'CSS',
          'HTML',
        ],
      },

      {
        id: 'cers',
        company:
          'CERS Software',
        role:
          'Frontend-Entwickler',
        period:
          'Juli 2021 – Dez. 2021',
        responsibilities: [
          'Adobe-XD-Designs in responsive produktive Benutzeroberflächen umgesetzt',
          'Semantisches HTML, CSS und JavaScript implementiert',
          'Wiederverwendbare UI-Strukturen und Komponenten entwickelt',
          'Frontend-Ressourcen hinsichtlich der Performance optimiert',
          'Browserübergreifende Kompatibilitäts- und Viewport-Probleme gelöst',
          'An QA-Prozessen und Nutzertests teilgenommen',
        ],
        technologies: [
          'HTML',
          'CSS',
          'JavaScript',
          'Adobe XD',
          'Responsive Design',
        ],
      },
    ],
  };

  const experiences =
    experienceData[language] ||
    experienceData.en;

  /* =======================================================
     DECORATIVE CODE
  ======================================================= */

  const decorativeCode = [
    {
      text: 'work();',
      position:
        'left-[4%] top-[14%]',
      size: 'text-6xl',
      duration: 8,
    },

    {
      text: '{ ship(); }',
      position:
        'right-[4%] top-[24%]',
      size: 'text-5xl',
      duration: 9,
    },

    {
      text: 'QA',
      position:
        'left-[7%] top-[43%]',
      size: 'text-7xl',
      duration: 7,
    },

    {
      text: 'API',
      position:
        'right-[7%] top-[52%]',
      size: 'text-7xl',
      duration: 10,
    },

    {
      text: '200 OK',
      position:
        'left-[4%] top-[70%]',
      size: 'text-5xl',
      duration: 8.5,
    },

    {
      text: '</>',
      position:
        'right-[6%] top-[80%]',
      size: 'text-7xl',
      duration: 9.5,
    },

    {
      text: 'deploy',
      position:
        'left-[10%] top-[88%]',
      size: 'text-5xl',
      duration: 11,
    },
  ];

  /* =======================================================
     SCROLL ANIMATION
  ======================================================= */

  const { scrollYProgress } =
    useScroll({
      target: sectionRef,
      offset: [
        'start 80%',
        'end 25%',
      ],
    });

  const timelineScale =
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
      id="experience"
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
      {/* ===============================================
          GRID BACKGROUND
      ================================================ */}

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
            'linear-gradient(to bottom, transparent, black 12%, black 88%, transparent)',

          maskImage:
            'linear-gradient(to bottom, transparent, black 12%, black 88%, transparent)',
        }}
      />

      {/* ===============================================
          BACKGROUND GLOWS
      ================================================ */}

      <motion.div
        aria-hidden="true"
        style={{
          y: backgroundY,
        }}
        className="
          pointer-events-none
          absolute
          -left-60
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
          -right-60
          bottom-[15%]
          -z-10
          h-[38rem]
          w-[38rem]
          rounded-full
          bg-violet-400/10
          blur-[140px]

          dark:bg-violet-600/[0.08]
        "
      />

      {/* ===============================================
          FLOATING CODE
      ================================================ */}

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
                  index * 0.35,
              }}
            >
              {item.text}
            </motion.span>
          )
        )}
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

        {/* ===============================================
            SECTION HEADER
        ================================================ */}

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
            ease: [
              0.16,
              1,
              0.3,
              1,
            ],
          }}
          className="
            mx-auto
            mb-16
            max-w-3xl
            text-center

            lg:mb-20
          "
        >

          {/* Tag */}

          <div
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
            <FaBriefcase size={12} />

            {currentLabels.sectionTag}
          </div>

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
            {t.experience.title}
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
            {t.experience.subtitle}
          </motion.p>

          {/* Mini stats */}

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
              delay: 0.3,
            }}
            className="
              mx-auto
              mt-8
              grid
              max-w-lg
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
                {experiences.length}
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
                {currentLabels.roles}
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
                2021
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
                2022
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
                {currentLabels.latest}
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* ===============================================
            EXPERIENCE TIMELINE LABEL
        ================================================ */}

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
            max-w-5xl
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
            <FaLayerGroup
              size={15}
            />
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
              2021 → 2022
            </div>
          </div>
        </motion.div>

        {/* ===============================================
            TIMELINE + CARDS
        ================================================ */}

        <div
          className="
            relative
            mx-auto
            max-w-5xl
          "
        >
          {/* Timeline background */}

          <div
            aria-hidden="true"
            className="
              absolute
              bottom-0
              left-[17px]
              top-0
              w-[2px]
              rounded-full
              bg-gray-200

              dark:bg-gray-800
            "
          />

          {/* Scroll progress */}

          <motion.div
            aria-hidden="true"
            style={{
              scaleY:
                timelineScale,
              transformOrigin:
                'top',
            }}
            className="
              absolute
              bottom-0
              left-[17px]
              top-0
              z-10
              w-[2px]
              rounded-full
              bg-gradient-to-b
              from-blue-700
              via-blue-500
              to-cyan-400
              shadow-[0_0_14px_rgba(59,130,246,0.45)]
            "
          />

          <div
            className="
              space-y-12

              lg:space-y-16
            "
          >
            {experiences.map(
              (experience, index) => (
                <div
                  key={experience.id}
                  className="
                    relative
                    pl-14

                    sm:pl-16
                  "
                >
                  {/* Node */}

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
                      stiffness: 320,
                      damping: 18,
                      delay:
                        index * 0.1,
                    }}
                    className="
                      absolute
                      left-0
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
                    "
                  >
                    {index === 0 ? (
                      <FaStar size={9} />
                    ) : (
                      <FaCheckCircle
                        size={9}
                      />
                    )}
                  </motion.div>

                  {/* Pulse */}

                  {!prefersReducedMotion && (
                    <motion.div
                      aria-hidden="true"
                      className="
                        absolute
                        left-[5px]
                        top-[37px]
                        h-7
                        w-7
                        rounded-full
                        bg-blue-500/25
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
                        duration: 3,
                        repeat:
                          Infinity,
                        delay:
                          index * 0.5,
                      }}
                    />
                  )}

                  <ExperienceCard
                    experience={
                      experience
                    }
                    index={index}
                    total={
                      experiences.length
                    }
                    labels={
                      currentLabels
                    }
                    t={t}
                    prefersReducedMotion={
                      prefersReducedMotion
                    }
                  />
                </div>
              )
            )}
          </div>
        </div>

        {/* ===============================================
            GROWTH SUMMARY
        ================================================ */}

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
            amount: 0.3,
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
            mx-auto
            mt-16
            max-w-4xl

            lg:mt-20
          "
        >
          {/* Animated border */}

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
              shadow-[0_20px_70px_rgba(15,23,42,0.08)]

              dark:bg-gray-900
              dark:shadow-[0_25px_80px_rgba(0,0,0,0.35)]

              sm:p-9
              lg:p-10
            "
          >
            {/* Glow */}

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
                blur-[90px]
              "
            />

            {/* Arrow */}

            <motion.div
              aria-hidden="true"
              animate={
                prefersReducedMotion
                  ? undefined
                  : {
                      x: [
                        0,
                        8,
                        0,
                      ],
                    }
              }
              transition={{
                duration: 3.5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="
                pointer-events-none
                absolute
                -right-4
                -top-8
                text-[11rem]
                font-black
                text-blue-900/[0.025]

                dark:text-blue-300/[0.03]
              "
            >
              →
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
                <FaArrowRight
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
                  {currentLabels.growth}
                </span>

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
                    currentLabels.growthText
                  }
                </p>

                <div
                  className="
                    mt-6
                    h-[3px]
                    w-24
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
          to-gray-50/30

          dark:to-gray-900/20
        "
      />
    </section>
  );
};

export default Experience;