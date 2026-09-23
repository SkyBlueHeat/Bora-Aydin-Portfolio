import React, {
  useContext,
  useEffect,
  useState,
} from 'react';

import {
  FaGithub,
  FaLinkedin,
  FaArrowUp,
  FaEnvelope,
  FaDownload,
  FaArrowRight,
  FaCode,
  FaExternalLinkAlt,
} from 'react-icons/fa';

import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from 'motion/react';

import {
  LanguageContext,
} from '../context/LanguageContext';

import translations from '../data/translations.json';

/* =========================================================
   FOOTER
========================================================= */

const Footer = () => {
  const {
    language,
  } = useContext(
    LanguageContext
  );

  const t =
    translations[language] ||
    translations.en;

  const prefersReducedMotion =
    useReducedMotion();

  const [
    showScrollToTopButton,
    setShowScrollToTopButton,
  ] = useState(false);

  /* =======================================================
     LABELS
  ======================================================= */

  const labels = {
    en: {
      eyebrow:
        'Let’s Work Together',

      contactTitle:
        'Let’s Build Something Meaningful',

      contactText:
        'Open to full-time software engineering roles, U.S. relocation opportunities, and conversations with product-focused engineering teams.',

      available:
        'Available for opportunities',

      emailLabel:
        'Email me',

      resumeLabel:
        'Download Resume',

      navigation:
        'Explore Portfolio',

      socialTitle:
        'Find Me Online',

      socialText:
        'Follow my work, projects, and professional journey.',

      builtWith:
        'Built with React, TypeScript, and Tailwind CSS.',

      scrollToTop:
        'Scroll to top',

      github:
        'GitHub profile',

      linkedin:
        'LinkedIn profile',

      j1:
        'Relocation',

      portfolio:
        'Software Engineering Portfolio',

      location:
        'Based in Türkiye · Open to relocation',

      rights:
        'All rights reserved.',
    },

    tr: {
      eyebrow:
        'Birlikte Çalışalım',

      contactTitle:
        'Birlikte Değerli Bir Şey Geliştirelim',

      contactText:
        'Tam zamanlı yazılım mühendisliği rollerine, ABD\'ye taşınma fırsatlarına ve ürün odaklı mühendislik ekipleriyle görüşmelere açığım.',

      available:
        'Fırsatlara açık',

      emailLabel:
        'E-posta gönder',

      resumeLabel:
        'Özgeçmişi İndir',

      navigation:
        'Portfolyoyu Keşfet',

      socialTitle:
        'Beni Takip Edin',

      socialText:
        'Projelerimi, çalışmalarımı ve profesyonel gelişimimi takip edin.',

      builtWith:
        'React, TypeScript ve Tailwind CSS ile geliştirildi.',

      scrollToTop:
        'Sayfanın başına dön',

      github:
        'GitHub profili',

      linkedin:
        'LinkedIn profili',

      j1:
        'Taşınma',

      portfolio:
        'Yazılım Mühendisliği Portfolyosu',

      location:
        'Türkiye merkezli · Taşınmaya açık',

      rights:
        'Tüm hakları saklıdır.',
    },

    de: {
      eyebrow:
        'Lassen Sie uns zusammenarbeiten',

      contactTitle:
        'Lassen Sie uns etwas Bedeutungsvolles entwickeln',

      contactText:
        'Offen für Vollzeitpositionen als Software-Ingenieur, Umzug in die USA und Gespräche mit produktorientierten Ingenieurteams.',

      available:
        'Offen für Möglichkeiten',

      emailLabel:
        'E-Mail senden',

      resumeLabel:
        'Lebenslauf herunterladen',

      navigation:
        'Portfolio entdecken',

      socialTitle:
        'Online finden',

      socialText:
        'Folgen Sie meinen Projekten, meiner Arbeit und meiner beruflichen Entwicklung.',

      builtWith:
        'Entwickelt mit React, TypeScript und Tailwind CSS.',

      scrollToTop:
        'Nach oben scrollen',

      github:
        'GitHub-Profil',

      linkedin:
        'LinkedIn-Profil',

      j1:
        'Umzug',

      portfolio:
        'Software-Engineering-Portfolio',

      location:
        'In der Türkei ansässig · Umzugsbereit',

      rights:
        'Alle Rechte vorbehalten.',
    },
  };

  const currentLabels =
    labels[language] ||
    labels.en;

  /* =======================================================
     QUICK LINKS
  ======================================================= */

  const quickLinks = [
    {
      name:
        t.nav.education,
      href:
        '#education',
    },

    {
      name:
        t.nav.journey,
      href:
        '#journey',
    },

    {
      name:
        t.nav.experience,
      href:
        '#experience',
    },

    {
      name:
        t.nav.projects,
      href:
        '#projects',
    },

    {
      name:
        t.nav.skills,
      href:
        '#skills',
    },

    {
      name:
        t.nav.caseStudies,
      href:
        '#engineering',
    },

    {
      name:
        currentLabels.j1,
      href:
        '#opportunities',
    },
  ];

  /* =======================================================
     SOCIAL LINKS
  ======================================================= */

  const socialLinks = [
    {
      name:
        'GitHub',

      href:
        'https://github.com/SkyBlueHeat',

      icon:
        FaGithub,

      ariaLabel:
        currentLabels.github,

      accent:
        'group-hover/social:text-white',
    },

    {
      name:
        'LinkedIn',

      href:
        'https://linkedin.com/in/bora-aydn',

      icon:
        FaLinkedin,

      ariaLabel:
        currentLabels.linkedin,

      accent:
        'group-hover/social:text-blue-300',
    },
  ];

  /* =======================================================
     DECORATIVE CODE
  ======================================================= */

  const decorativeCode = [
    {
      text:
        '<footer />',

      position:
        'left-[4%] top-[18%]',

      size:
        'text-5xl',

      duration:
        9,
    },

    {
      text:
        'connect();',

      position:
        'right-[5%] top-[24%]',

      size:
        'text-4xl',

      duration:
        10,
    },

    {
      text:
        'openToWork',

      position:
        'left-[8%] bottom-[20%]',

      size:
        'text-4xl',

      duration:
        8.5,
    },

    {
      text:
        '</>',

      position:
        'right-[7%] bottom-[15%]',

      size:
        'text-6xl',

      duration:
        11,
    },
  ];

  /* =======================================================
     SCROLL LISTENER
  ======================================================= */

  useEffect(() => {
    const handleScroll =
      () => {
        setShowScrollToTopButton(
          window.scrollY >
            600
        );
      };

    handleScroll();

    window.addEventListener(
      'scroll',
      handleScroll,
      {
        passive: true,
      }
    );

    return () => {
      window.removeEventListener(
        'scroll',
        handleScroll
      );
    };
  }, []);

  /* =======================================================
     SCROLL TO TOP
  ======================================================= */

  const scrollToTop =
    () => {
      window.scrollTo({
        top: 0,

        behavior:
          prefersReducedMotion
            ? 'auto'
            : 'smooth',
      });
    };

  const currentYear =
    new Date()
      .getFullYear();

  /* =======================================================
     RENDER
  ======================================================= */

  return (
    <>
      <footer
        id="contact"
        className="
          relative
          isolate
          overflow-hidden
          border-t
          border-white/[0.06]
          bg-[#020617]
          pb-8
          pt-20
          text-white

          lg:pt-24

          dark:bg-black
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
            opacity-40
          "
          style={{
            backgroundImage: `
              linear-gradient(
                to right,
                rgba(59,130,246,0.08) 1px,
                transparent 1px
              ),
              linear-gradient(
                to bottom,
                rgba(59,130,246,0.08) 1px,
                transparent 1px
              )
            `,

            backgroundSize:
              '52px 52px',

            WebkitMaskImage:
              'linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)',

            maskImage:
              'linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)',
          }}
        />

        {/* ===============================================
            BACKGROUND GLOWS
        ================================================ */}

        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            -left-56
            top-10
            -z-10
            h-[32rem]
            w-[32rem]
            rounded-full
            bg-blue-600/20
            blur-[140px]
          "
        />

        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            -right-60
            bottom-0
            -z-10
            h-[34rem]
            w-[34rem]
            rounded-full
            bg-violet-600/15
            blur-[150px]
          "
        />

        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            left-1/2
            top-1/3
            -z-10
            h-72
            w-72
            -translate-x-1/2
            rounded-full
            bg-cyan-400/10
            blur-[120px]
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
            (
              item,
              index
            ) => (
              <motion.span
                key={
                  item.text
                }
                className={`
                  absolute
                  select-none
                  whitespace-nowrap
                  font-mono
                  font-black
                  leading-none
                  text-blue-200/[0.035]

                  ${item.position}
                  ${item.size}
                `}
                animate={
                  prefersReducedMotion
                    ? undefined
                    : {
                        y: [
                          0,
                          index %
                              2 ===
                            0
                            ? -10
                            : 10,
                          0,
                        ],

                        x: [
                          0,
                          index %
                              2 ===
                            0
                            ? 6
                            : -6,
                          0,
                        ],

                        rotate: [
                          0,
                          index %
                              2 ===
                            0
                            ? 2
                            : -2,
                          0,
                        ],
                      }
                }
                transition={{
                  duration:
                    item.duration,

                  repeat:
                    Infinity,

                  ease:
                    'easeInOut',

                  delay:
                    index *
                    0.4,
                }}
              >
                {
                  item.text
                }
              </motion.span>
            )
          )}
        </div>

        {/* ===============================================
            MAIN CONTAINER
        ================================================ */}

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
          {/* =============================================
              MAIN FOOTER CARD
          ============================================== */}

          <motion.div
            initial={{
              opacity: 0,

              y:
                prefersReducedMotion
                  ? 0
                  : 45,
            }}
            whileInView={{
              opacity: 1,

              y: 0,
            }}
            viewport={{
              once: true,

              amount: 0.15,
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
              rounded-[2.25rem]
              border
              border-white/[0.08]
              bg-white/[0.035]
              shadow-[0_30px_100px_rgba(0,0,0,0.35)]
              backdrop-blur-2xl
            "
          >
            {/* Top gradient */}

            <div
              aria-hidden="true"
              className="
                absolute
                left-0
                top-0
                h-[3px]
                w-full
                bg-gradient-to-r
                from-blue-700
                via-cyan-400
                to-violet-500
              "
            />

            {/* Card glow */}

            <div
              aria-hidden="true"
              className="
                pointer-events-none
                absolute
                -left-24
                -top-24
                h-72
                w-72
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
                -bottom-28
                -right-24
                h-80
                w-80
                rounded-full
                bg-violet-500/10
                blur-[110px]
              "
            />

            <div
              className="
                relative
                z-10
                grid

                lg:grid-cols-[1.2fr_0.8fr]
              "
            >
              {/* =========================================
                  CONTACT CTA
              ========================================== */}

              <div
                className="
                  border-b
                  border-white/[0.07]
                  p-7

                  sm:p-9

                  lg:border-b-0
                  lg:border-r
                  lg:p-11
                "
              >
                {/* Available badge */}

                <div
                  className="
                    mb-6
                    inline-flex
                    items-center
                    gap-2
                    rounded-full
                    border
                    border-emerald-300/15
                    bg-emerald-300/[0.07]
                    px-3
                    py-1.5
                    text-[10px]
                    font-black
                    uppercase
                    tracking-[0.13em]
                    text-emerald-300
                  "
                >
                  <span
                    className="
                      relative
                      flex
                      h-2
                      w-2
                    "
                  >
                    {!prefersReducedMotion && (
                      <span
                        className="
                          absolute
                          inline-flex
                          h-full
                          w-full
                          animate-ping
                          rounded-full
                          bg-emerald-300
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
                        bg-emerald-300
                      "
                    />
                  </span>

                  {
                    currentLabels.available
                  }
                </div>

                {/* Eyebrow */}

                <div
                  className="
                    mb-3
                    font-mono
                    text-xs
                    font-black
                    uppercase
                    tracking-[0.16em]
                    text-blue-300
                  "
                >
                  {
                    currentLabels.eyebrow
                  }
                </div>

                {/* Title */}

                <h2
                  className="
                    max-w-2xl
                    text-3xl
                    font-black
                    leading-tight
                    tracking-[-0.045em]
                    text-white

                    sm:text-4xl

                    lg:text-5xl
                  "
                >
                  {
                    currentLabels.contactTitle
                  }
                </h2>

                {/* Text */}

                <p
                  className="
                    mt-5
                    max-w-2xl
                    text-base
                    leading-relaxed
                    text-slate-400

                    sm:text-lg
                  "
                >
                  {
                    currentLabels.contactText
                  }
                </p>

                {/* Location */}

                <div
                  className="
                    mt-5
                    inline-flex
                    items-center
                    gap-2
                    rounded-xl
                    border
                    border-white/[0.07]
                    bg-black/10
                    px-3
                    py-2
                    text-xs
                    font-semibold
                    text-slate-400
                  "
                >
                  <span
                    className="
                      h-1.5
                      w-1.5
                      rounded-full
                      bg-cyan-400
                    "
                  />

                  {
                    currentLabels.location
                  }
                </div>

                {/* Actions */}

                <div
                  className="
                    mt-8
                    flex
                    flex-col
                    gap-3

                    sm:flex-row
                    sm:flex-wrap
                  "
                >
                  <motion.a
                    href="mailto:br.aydin@hotmail.com"
                    whileHover={
                      prefersReducedMotion
                        ? undefined
                        : {
                            y: -3,
                          }
                    }
                    whileTap={{
                      scale:
                        0.98,
                    }}
                    className="
                      inline-flex
                      items-center
                      justify-center
                      gap-2
                      rounded-xl
                      bg-gradient-to-r
                      from-blue-700
                      via-blue-600
                      to-cyan-500
                      px-5
                      py-3
                      text-sm
                      font-black
                      text-white
                      shadow-lg
                      shadow-blue-950/30
                      transition-shadow

                      hover:shadow-xl
                      hover:shadow-blue-950/40

                      focus:outline-none
                      focus-visible:ring-2
                      focus-visible:ring-cyan-400
                      focus-visible:ring-offset-2
                      focus-visible:ring-offset-[#020617]
                    "
                  >
                    <FaEnvelope
                      size={
                        14
                      }
                    />

                    {
                      currentLabels.emailLabel
                    }

                    <FaArrowRight
                      size={
                        10
                      }
                      className="
                        ml-1
                      "
                    />
                  </motion.a>

                  <motion.a
                    href="/Bora_Aydin_J1_Resume.pdf"
                    download="Bora_Aydin_J1_Resume.pdf"
                    whileHover={
                      prefersReducedMotion
                        ? undefined
                        : {
                            y: -3,
                          }
                    }
                    whileTap={{
                      scale:
                        0.98,
                    }}
                    className="
                      inline-flex
                      items-center
                      justify-center
                      gap-2
                      rounded-xl
                      border
                      border-white/[0.10]
                      bg-white/[0.055]
                      px-5
                      py-3
                      text-sm
                      font-bold
                      text-white
                      backdrop-blur-xl
                      transition-colors

                      hover:border-white/20
                      hover:bg-white/[0.09]

                      focus:outline-none
                      focus-visible:ring-2
                      focus-visible:ring-blue-400
                      focus-visible:ring-offset-2
                      focus-visible:ring-offset-[#020617]
                    "
                  >
                    <FaDownload
                      size={
                        13
                      }
                    />

                    {
                      currentLabels.resumeLabel
                    }
                  </motion.a>
                </div>

                {/* Email */}

                <a
                  href="mailto:br.aydin@hotmail.com"
                  className="
                    mt-6
                    block
                    w-fit
                    break-all
                    font-mono
                    text-sm
                    font-semibold
                    text-blue-300
                    transition-colors

                    hover:text-cyan-300

                    focus:outline-none
                    focus-visible:text-cyan-300
                  "
                >
                  br.aydin@hotmail.com
                </a>
              </div>

              {/* =========================================
                  LINKS / SOCIALS
              ========================================== */}

              <div
                className="
                  p-7

                  sm:p-9

                  lg:p-11
                "
              >
                {/* Quick Links */}

                <div>
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
                        h-10
                        w-10
                        items-center
                        justify-center
                        rounded-xl
                        border
                        border-blue-400/15
                        bg-blue-400/10
                        text-blue-300
                      "
                    >
                      <FaCode
                        size={
                          14
                        }
                      />
                    </span>

                    <div>
                      <h3
                        className="
                          text-lg
                          font-black
                          text-white
                        "
                      >
                        {
                          currentLabels.navigation
                        }
                      </h3>

                      <p
                        className="
                          mt-0.5
                          text-xs
                          text-slate-500
                        "
                      >
                        {
                          t.footer.quickLinks
                        }
                      </p>
                    </div>
                  </div>

                  <nav
                    aria-label={
                      t.footer.quickLinks
                    }
                  >
                    <ul
                      className="
                        grid
                        gap-2

                        sm:grid-cols-2

                        lg:grid-cols-1

                        xl:grid-cols-2
                      "
                    >
                      {quickLinks.map(
                        (
                          link
                        ) => (
                          <li
                            key={
                              link.href
                            }
                          >
                            <motion.a
                              href={
                                link.href
                              }
                              whileHover={
                                prefersReducedMotion
                                  ? undefined
                                  : {
                                      x: 4,
                                    }
                              }
                              className="
                                group/link
                                flex
                                items-center
                                justify-between
                                gap-3
                                rounded-xl
                                border
                                border-transparent
                                px-3
                                py-2.5
                                text-sm
                                font-semibold
                                text-slate-400
                                transition-colors

                                hover:border-white/[0.07]
                                hover:bg-white/[0.035]
                                hover:text-white

                                focus:outline-none
                                focus-visible:border-blue-400/30
                                focus-visible:bg-blue-400/[0.06]
                                focus-visible:text-white
                              "
                            >
                              <span>
                                {
                                  link.name
                                }
                              </span>

                              <FaArrowRight
                                size={
                                  9
                                }
                                className="
                                  text-slate-700
                                  transition-all

                                  group-hover/link:translate-x-0.5
                                  group-hover/link:text-cyan-300
                                "
                              />
                            </motion.a>
                          </li>
                        )
                      )}
                    </ul>
                  </nav>
                </div>

                {/* Divider */}

                <div
                  className="
                    my-8
                    h-px
                    w-full
                    bg-gradient-to-r
                    from-transparent
                    via-white/[0.10]
                    to-transparent
                  "
                />

                {/* Social */}

                <div>
                  <h3
                    className="
                      text-lg
                      font-black
                      text-white
                    "
                  >
                    {
                      currentLabels.socialTitle
                    }
                  </h3>

                  <p
                    className="
                      mt-2
                      max-w-sm
                      text-sm
                      leading-relaxed
                      text-slate-500
                    "
                  >
                    {
                      currentLabels.socialText
                    }
                  </p>

                  <div
                    className="
                      mt-5
                      grid
                      gap-3

                      sm:grid-cols-2

                      lg:grid-cols-1

                      xl:grid-cols-2
                    "
                  >
                    {socialLinks.map(
                      (
                        social
                      ) => {
                        const Icon =
                          social.icon;

                        return (
                          <motion.a
                            key={
                              social.name
                            }
                            href={
                              social.href
                            }
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={
                              social.ariaLabel
                            }
                            whileHover={
                              prefersReducedMotion
                                ? undefined
                                : {
                                    y: -3,
                                  }
                            }
                            whileTap={{
                              scale:
                                0.98,
                            }}
                            className="
                              group/social
                              flex
                              items-center
                              justify-between
                              rounded-2xl
                              border
                              border-white/[0.07]
                              bg-white/[0.035]
                              p-4
                              text-slate-400
                              transition-all
                              duration-300

                              hover:border-blue-400/20
                              hover:bg-blue-400/[0.055]
                              hover:shadow-[0_14px_35px_rgba(15,23,42,0.25)]

                              focus:outline-none
                              focus-visible:ring-2
                              focus-visible:ring-blue-400
                            "
                          >
                            <div
                              className="
                                flex
                                items-center
                                gap-3
                              "
                            >
                              <span
                                className={`
                                  flex
                                  h-10
                                  w-10
                                  items-center
                                  justify-center
                                  rounded-xl
                                  bg-black/20
                                  text-slate-300
                                  transition-colors

                                  ${social.accent}
                                `}
                              >
                                <Icon
                                  size={
                                    19
                                  }
                                />
                              </span>

                              <span
                                className="
                                  text-sm
                                  font-bold
                                  text-slate-300
                                  transition-colors

                                  group-hover/social:text-white
                                "
                              >
                                {
                                  social.name
                                }
                              </span>
                            </div>

                            <FaExternalLinkAlt
                              size={
                                9
                              }
                              className="
                                text-slate-700
                                transition-colors

                                group-hover/social:text-cyan-300
                              "
                            />
                          </motion.a>
                        );
                      }
                    )}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* =============================================
              BOTTOM BAR
          ============================================== */}

          <div
            className="
              mt-8
              flex
              flex-col
              gap-5
              border-t
              border-white/[0.06]
              pt-7

              md:flex-row
              md:items-center
              md:justify-between
            "
          >
            <div>
              <div
                className="
                  flex
                  flex-wrap
                  items-center
                  gap-2
                "
              >
                <span
                  className="
                    font-mono
                    text-sm
                    font-black
                    text-white
                  "
                >
                  Bora Aydin
                </span>

                <span
                  className="
                    h-1
                    w-1
                    rounded-full
                    bg-slate-600
                  "
                />

                <span
                  className="
                    text-xs
                    font-medium
                    text-slate-500
                  "
                >
                  {
                    currentLabels.portfolio
                  }
                </span>
              </div>

              <p
                className="
                  mt-2
                  text-xs
                  leading-relaxed
                  text-slate-600
                "
              >
                ©{' '}
                {
                  currentYear
                }{' '}
                Bora Aydin.{' '}
                {
                  currentLabels.rights
                }
              </p>
            </div>

            <div
              className="
                flex
                flex-col
                gap-2

                md:items-end
              "
            >
              <div
                className="
                  inline-flex
                  w-fit
                  items-center
                  gap-2
                  rounded-full
                  border
                  border-white/[0.06]
                  bg-white/[0.025]
                  px-3
                  py-1.5
                  font-mono
                  text-[10px]
                  font-semibold
                  text-slate-500
                "
              >
                <span
                  className="
                    text-cyan-400
                  "
                >
                  &lt;/&gt;
                </span>

                {
                  currentLabels.builtWith
                }
              </div>
            </div>
          </div>
        </div>

        {/* Bottom glow line */}

        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            bottom-0
            left-1/2
            h-px
            w-[65%]
            -translate-x-1/2
            bg-gradient-to-r
            from-transparent
            via-blue-500/40
            to-transparent
          "
        />
      </footer>

      {/* =================================================
          SCROLL TO TOP
      ================================================== */}

      <AnimatePresence>
        {showScrollToTopButton && (
          <motion.button
            type="button"
            onClick={
              scrollToTop
            }
            aria-label={
              currentLabels.scrollToTop
            }
            initial={{
              opacity:
                0,

              scale:
                prefersReducedMotion
                  ? 1
                  : 0.8,

              y:
                prefersReducedMotion
                  ? 0
                  : 12,
            }}
            animate={{
              opacity:
                1,

              scale:
                1,

              y:
                0,
            }}
            exit={{
              opacity:
                0,

              scale:
                prefersReducedMotion
                  ? 1
                  : 0.85,

              y:
                prefersReducedMotion
                  ? 0
                  : 10,
            }}
            whileHover={
              prefersReducedMotion
                ? undefined
                : {
                    y: -4,

                    scale:
                      1.04,
                  }
            }
            whileTap={{
              scale:
                0.94,
            }}
            transition={{
              duration:
                prefersReducedMotion
                  ? 0
                  : 0.2,
            }}
            className="
              fixed
              bottom-5
              right-5
              z-50
              flex
              h-12
              w-12
              items-center
              justify-center
              rounded-2xl
              border
              border-blue-300/20
              bg-gradient-to-br
              from-blue-700
              via-blue-600
              to-cyan-500
              text-white
              shadow-[0_12px_35px_rgba(29,78,216,0.35)]
              backdrop-blur-xl

              focus:outline-none
              focus-visible:ring-2
              focus-visible:ring-cyan-400
              focus-visible:ring-offset-2
              focus-visible:ring-offset-gray-950

              sm:bottom-8
              sm:right-8
            "
          >
            <FaArrowUp
              size={
                16
              }
              aria-hidden="true"
            />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
};

export default Footer;