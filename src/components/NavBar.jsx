import React, {
  useState,
  useContext,
  useEffect,
} from 'react';

import {
  FaGithub,
  FaLinkedin,
  FaBars,
  FaTimes,
  FaMoon,
  FaSun,
  FaGlobe,
} from 'react-icons/fa';

import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
} from 'motion/react';

import { LanguageContext } from '../context/LanguageContext';
import { ThemeContext } from '../context/ThemeContext';
import translations from '../data/translations.json';

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);
  const [showNav, setShowNav] = useState(true);

  const { language, toggleLanguage } =
    useContext(LanguageContext);

  const { theme, toggleTheme } =
    useContext(ThemeContext);

  const t = translations[language];

  const prefersReducedMotion = useReducedMotion();

  /* ---------------------------------------
     PAGE SCROLL PROGRESS
  ---------------------------------------- */

  const { scrollYProgress } = useScroll();

  const progressScaleX = useSpring(scrollYProgress, {
    stiffness: 130,
    damping: 24,
    mass: 0.25,
  });

  /* ---------------------------------------
     NAV LINKS
  ---------------------------------------- */

  const navLinks = [
    {
      name: t.nav.education,
      href: '#education',
    },
    {
      name: t.nav.journey,
      href: '#journey',
    },
    {
      name: t.nav.experience,
      href: '#experience',
    },
    {
      name: t.nav.projects,
      href: '#projects',
    },
    {
      name: t.nav.skills,
      href: '#skills',
    },
    {
      name: t.nav.caseStudies,
      href: '#engineering',
    },
    {
      name: t.nav.contact,
      href: '#contact',
    },
  ];

  const languages = [
    {
      code: 'en',
      label: 'EN',
    },
    {
      code: 'tr',
      label: 'TR',
    },
    {
      code: 'de',
      label: 'DE',
    },
  ];

  /* ---------------------------------------
     NAV BEHAVIOUR
  ---------------------------------------- */

  useEffect(() => {
    let previousScroll = window.scrollY;

    const sectionIds = [
      'home',
      'education',
      'journey',
      'experience',
      'projects',
      'skills',
      'engineering',
      'contact',
    ];

    const handleScroll = () => {
      const currentScroll = window.scrollY;

      /* Glass effect after scrolling */
      setIsScrolled(currentScroll > 15);

      /* Hide while scrolling down */
      if (!prefersReducedMotion && !isMenuOpen) {
        if (currentScroll <= 80) {
          setShowNav(true);
        } else if (currentScroll > previousScroll + 7) {
          setShowNav(false);
        } else if (currentScroll < previousScroll - 7) {
          setShowNav(true);
        }
      } else {
        setShowNav(true);
      }

      previousScroll = currentScroll;

      /* Detect active section */
      const marker = currentScroll + 180;

      let currentSection = 'home';

      sectionIds.forEach((id) => {
        const section = document.getElementById(id);

        if (
          section &&
          marker >= section.offsetTop
        ) {
          currentSection = id;
        }
      });

      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll, {
      passive: true,
    });

    handleScroll();

    return () =>
      window.removeEventListener(
        'scroll',
        handleScroll
      );
  }, [isMenuOpen, prefersReducedMotion]);

  /* ---------------------------------------
     MENU
  ---------------------------------------- */

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
    setShowNav(true);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  /* ---------------------------------------
     LANGUAGE
  ---------------------------------------- */

  const cycleLanguage = () => {
    const currentIndex = languages.findIndex(
      (lang) => lang.code === language
    );

    const nextIndex =
      (currentIndex + 1) % languages.length;

    toggleLanguage(
      languages[nextIndex].code
    );
  };

  const getSectionId = (href) =>
    href.replace('#', '');

  return (
    <motion.nav
      initial={false}
  animate={{ y: 0 }}
      transition={{
        duration: prefersReducedMotion
          ? 0
          : 0.35,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={`
        sticky
        top-0
        z-50
        w-full
        border-b
        transition-[background-color,border-color,box-shadow]
        duration-500

        ${
          isScrolled
            ? `
              border-gray-200/60
              bg-white/75
              shadow-[0_10px_40px_rgba(15,23,42,0.06)]
              backdrop-blur-2xl

              dark:border-white/5
              dark:bg-gray-950/70
              dark:shadow-[0_10px_40px_rgba(0,0,0,0.35)]
            `
            : `
              border-transparent
              bg-white/90
              backdrop-blur-xl

              dark:bg-gray-950/90
            `
        }
      `}
    >
      {/* ======================================
          BACKGROUND LIGHT
      ======================================= */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0
          overflow-hidden
        "
      >
        <div
          className="
            absolute
            left-1/2
            top-[-120px]
            h-52
            w-[600px]
            -translate-x-1/2
            rounded-full
            bg-blue-500/10
            blur-[100px]
            dark:bg-blue-500/10
          "
        />
      </div>

      {/* ======================================
          SCROLL PROGRESS
      ======================================= */}

      <motion.div
        aria-hidden="true"
        style={{
          scaleX: progressScaleX,
          transformOrigin: 'left',
        }}
        className="
          absolute
          bottom-[-1px]
          left-0
          z-50
          h-[2px]
          w-full
          bg-gradient-to-r
          from-blue-700
          via-blue-500
          to-cyan-400
        "
      />

      <div
        className="
          relative
          mx-auto
          max-w-screen-2xl
          px-4
          sm:px-6
          lg:px-8
        "
      >
        <div
          className="
            flex
            h-16
            items-center
            justify-between
            lg:h-20
          "
        >
          {/* ======================================
              BRAND
          ======================================= */}

          <motion.a
            href="#home"
            onClick={closeMenu}
            aria-label="Bora Aydin - Home"
            whileHover={
              prefersReducedMotion
                ? undefined
                : {
                    scale: 1.03,
                  }
            }
            whileTap={
              prefersReducedMotion
                ? undefined
                : {
                    scale: 0.96,
                  }
            }
            className="
              group
              relative
              flex
              flex-shrink-0
              items-center
              rounded-xl
              outline-none
              focus-visible:ring-2
              focus-visible:ring-blue-500
              focus-visible:ring-offset-2
              dark:focus-visible:ring-offset-gray-950
            "
          >
            {/* Logo glow */}
            <div
              aria-hidden="true"
              className="
                absolute
                left-0
                top-1/2
                h-10
                w-10
                -translate-y-1/2
                rounded-xl
                bg-blue-500
                opacity-0
                blur-xl
                transition-opacity
                duration-500
                group-hover:opacity-40
              "
            />

            {/* Logo */}
            <motion.div
              whileHover={
                prefersReducedMotion
                  ? undefined
                  : {
                      rotate: -4,
                    }
              }
              transition={{
                type: 'spring',
                stiffness: 350,
                damping: 17,
              }}
              className="
                relative
                flex
                h-10
                w-10
                items-center
                justify-center
                overflow-hidden
                rounded-xl
                bg-gradient-to-br
                from-blue-800
                via-blue-700
                to-cyan-600
                text-lg
                font-black
                text-white
                shadow-lg
                shadow-blue-900/20
              "
            >
              {/* Shine */}
              <motion.span
                aria-hidden="true"
                className="
                  absolute
                  inset-y-[-20px]
                  w-8
                  -skew-x-12
                  bg-gradient-to-r
                  from-transparent
                  via-white/30
                  to-transparent
                "
                animate={
                  prefersReducedMotion
                    ? undefined
                    : {
                        x: [
                          '-300%',
                          '350%',
                        ],
                      }
                }
                transition={{
                  duration: 3.5,
                  repeat: Infinity,
                  repeatDelay: 4,
                  ease: 'easeInOut',
                }}
              />

              <span className="relative rotate-12">
                B
              </span>
            </motion.div>

            {/* Name */}
            <div
              className="
                ml-3
                hidden
                2xl:block
              "
            >
              <div
                className="
                  flex
                  items-center
                  gap-2
                "
              >
                <span
                  className="
                    whitespace-nowrap
                    text-lg
                    font-black
                    tracking-tight
                    text-gray-950
                    dark:text-white
                  "
                >
                  Bora Aydin
                </span>

                {/* Online dot */}
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
                        bg-emerald-400
                        opacity-70
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
              </div>

              <span
                className="
                  block
                  text-[10px]
                  font-semibold
                  uppercase
                  tracking-[0.16em]
                  text-gray-400
                  dark:text-gray-500
                "
              >
                Software Developer
              </span>
            </div>
          </motion.a>

          {/* ======================================
              DESKTOP NAVIGATION
          ======================================= */}

          <div
            className="
              hidden
              items-center
              xl:flex
            "
          >
            {/* Links pill */}
            <div
              className="
                flex
                items-center
                rounded-2xl
                border
                border-gray-200/70
                bg-white/60
                p-1
                shadow-sm
                backdrop-blur-xl

                dark:border-white/5
                dark:bg-white/[0.035]
              "
            >
              {navLinks.map((link) => {
                const sectionId =
                  getSectionId(link.href);

                const isActive =
                  activeSection === sectionId;

                return (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    aria-current={
                      isActive
                        ? 'page'
                        : undefined
                    }
                    whileHover={
                      prefersReducedMotion
                        ? undefined
                        : {
                            y: -1,
                          }
                    }
                    whileTap={
                      prefersReducedMotion
                        ? undefined
                        : {
                            scale: 0.96,
                          }
                    }
                    className={`
                      group
                      relative
                      whitespace-nowrap
                      rounded-xl
                      px-2.5
                      py-2
                      text-[13px]
                      font-semibold
                      outline-none
                      transition-colors
                      2xl:px-3

                      ${
                        isActive
                          ? `
                            text-blue-800
                            dark:text-blue-300
                          `
                          : `
                            text-gray-500
                            hover:text-gray-950

                            dark:text-gray-400
                            dark:hover:text-white
                          `
                      }

                      focus-visible:ring-2
                      focus-visible:ring-blue-500
                    `}
                  >
                    {/* Active background */}
                    {isActive && (
                      <motion.span
                        layoutId="active-nav-pill"
                        transition={{
                          type: 'spring',
                          stiffness: 420,
                          damping: 32,
                        }}
                        className="
                          absolute
                          inset-0
                          rounded-xl
                          bg-blue-50
                          shadow-sm
                          ring-1
                          ring-blue-100

                          dark:bg-blue-500/10
                          dark:ring-blue-500/15
                        "
                      />
                    )}

                    {/* Hover glow */}
                    <span
                      aria-hidden="true"
                      className="
                        absolute
                        inset-x-3
                        bottom-1
                        h-[2px]
                        origin-center
                        scale-x-0
                        rounded-full
                        bg-gradient-to-r
                        from-blue-600
                        to-cyan-400
                        transition-transform
                        duration-300
                        group-hover:scale-x-100
                      "
                    />

                    <span className="relative z-10">
                      {link.name}
                    </span>
                  </motion.a>
                );
              })}
            </div>

            {/* Divider */}
            <div
              aria-hidden="true"
              className="
                mx-3
                h-7
                w-px
                bg-gradient-to-b
                from-transparent
                via-gray-300
                to-transparent

                dark:via-gray-700
              "
            />

            {/* ======================================
                LANGUAGES
            ======================================= */}

            <div
              aria-label="Language selector"
              className="
                relative
                flex
                items-center
                rounded-xl
                border
                border-gray-200/70
                bg-white/50
                p-1
                backdrop-blur-xl

                dark:border-white/5
                dark:bg-white/[0.035]
              "
            >
              {languages.map((lang) => {
                const isActive =
                  language === lang.code;

                return (
                  <motion.button
                    key={lang.code}
                    type="button"
                    onClick={() =>
                      toggleLanguage(
                        lang.code
                      )
                    }
                    aria-pressed={isActive}
                    aria-label={`Switch language to ${lang.label}`}
                    whileTap={
                      prefersReducedMotion
                        ? undefined
                        : {
                            scale: 0.92,
                          }
                    }
                    className={`
                      relative
                      rounded-lg
                      px-2
                      py-1.5
                      text-[11px]
                      font-bold
                      outline-none
                      transition-colors

                      ${
                        isActive
                          ? 'text-white'
                          : `
                            text-gray-500
                            hover:text-gray-950

                            dark:text-gray-400
                            dark:hover:text-white
                          `
                      }

                      focus-visible:ring-2
                      focus-visible:ring-blue-500
                    `}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="active-language"
                        className="
                          absolute
                          inset-0
                          rounded-lg
                          bg-gradient-to-br
                          from-blue-800
                          to-blue-600
                          shadow-sm
                        "
                        transition={{
                          type: 'spring',
                          stiffness: 400,
                          damping: 30,
                        }}
                      />
                    )}

                    <span className="relative z-10">
                      {lang.label}
                    </span>
                  </motion.button>
                );
              })}
            </div>

            {/* ======================================
                THEME BUTTON
            ======================================= */}

            <motion.button
              type="button"
              onClick={toggleTheme}
              whileHover={
                prefersReducedMotion
                  ? undefined
                  : {
                      y: -2,
                      scale: 1.05,
                    }
              }
              whileTap={
                prefersReducedMotion
                  ? undefined
                  : {
                      scale: 0.9,
                      rotate: 15,
                    }
              }
              aria-label={
                theme === 'dark'
                  ? 'Switch to light mode'
                  : 'Switch to dark mode'
              }
              className="
                relative
                ml-2
                flex
                h-9
                w-9
                items-center
                justify-center
                overflow-hidden
                rounded-xl
                border
                border-gray-200/70
                bg-white/60
                text-gray-600
                shadow-sm
                backdrop-blur-xl
                outline-none
                transition-colors
                hover:border-blue-200
                hover:text-blue-700

                dark:border-white/5
                dark:bg-white/[0.035]
                dark:text-gray-300
                dark:hover:border-blue-500/20
                dark:hover:text-blue-300

                focus-visible:ring-2
                focus-visible:ring-blue-500
              "
            >
              <AnimatePresence
                mode="wait"
                initial={false}
              >
                {theme === 'dark' ? (
                  <motion.span
                    key="sun"
                    initial={{
                      opacity: 0,
                      rotate: -90,
                      scale: 0.5,
                    }}
                    animate={{
                      opacity: 1,
                      rotate: 0,
                      scale: 1,
                    }}
                    exit={{
                      opacity: 0,
                      rotate: 90,
                      scale: 0.5,
                    }}
                  >
                    <FaSun size={17} />
                  </motion.span>
                ) : (
                  <motion.span
                    key="moon"
                    initial={{
                      opacity: 0,
                      rotate: 90,
                      scale: 0.5,
                    }}
                    animate={{
                      opacity: 1,
                      rotate: 0,
                      scale: 1,
                    }}
                    exit={{
                      opacity: 0,
                      rotate: -90,
                      scale: 0.5,
                    }}
                  >
                    <FaMoon size={17} />
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>

            {/* ======================================
                SOCIALS
            ======================================= */}

            <div
              className="
                ml-2
                flex
                items-center
                gap-1
              "
            >
              <motion.a
                href="https://github.com/SkyBlueHeat"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub profile"
                whileHover={
                  prefersReducedMotion
                    ? undefined
                    : {
                        y: -3,
                        rotate: -5,
                        scale: 1.08,
                      }
                }
                whileTap={{
                  scale: 0.9,
                }}
                className="
                  group/social
                  relative
                  flex
                  h-9
                  w-9
                  items-center
                  justify-center
                  rounded-xl
                  text-gray-400
                  outline-none
                  transition-colors
                  hover:bg-gray-100
                  hover:text-gray-950

                  dark:text-gray-500
                  dark:hover:bg-white/5
                  dark:hover:text-white

                  focus-visible:ring-2
                  focus-visible:ring-blue-500
                "
              >
                <FaGithub size={19} />

                <span
                  className="
                    pointer-events-none
                    absolute
                    right-0
                    top-[calc(100%+10px)]
                    translate-y-[-4px]
                    whitespace-nowrap
                    rounded-lg
                    bg-gray-950
                    px-2.5
                    py-1.5
                    text-[11px]
                    font-semibold
                    text-white
                    opacity-0
                    shadow-xl
                    transition-all
                    group-hover/social:translate-y-0
                    group-hover/social:opacity-100

                    dark:bg-white
                    dark:text-gray-950
                  "
                >
                  GitHub
                </span>
              </motion.a>

              <motion.a
                href="https://linkedin.com/in/bora-aydn"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn profile"
                whileHover={
                  prefersReducedMotion
                    ? undefined
                    : {
                        y: -3,
                        rotate: 5,
                        scale: 1.08,
                      }
                }
                whileTap={{
                  scale: 0.9,
                }}
                className="
                  group/social
                  relative
                  flex
                  h-9
                  w-9
                  items-center
                  justify-center
                  rounded-xl
                  text-gray-400
                  outline-none
                  transition-colors
                  hover:bg-blue-50
                  hover:text-blue-600

                  dark:text-gray-500
                  dark:hover:bg-blue-500/10
                  dark:hover:text-blue-400

                  focus-visible:ring-2
                  focus-visible:ring-blue-500
                "
              >
                <FaLinkedin size={19} />

                <span
                  className="
                    pointer-events-none
                    absolute
                    right-0
                    top-[calc(100%+10px)]
                    translate-y-[-4px]
                    whitespace-nowrap
                    rounded-lg
                    bg-gray-950
                    px-2.5
                    py-1.5
                    text-[11px]
                    font-semibold
                    text-white
                    opacity-0
                    shadow-xl
                    transition-all
                    group-hover/social:translate-y-0
                    group-hover/social:opacity-100

                    dark:bg-white
                    dark:text-gray-950
                  "
                >
                  LinkedIn
                </span>
              </motion.a>
            </div>
          </div>

          {/* ======================================
              MOBILE CONTROLS
          ======================================= */}

          <div
            className="
              flex
              items-center
              gap-1
              xl:hidden
            "
          >
            {/* Language */}
            <motion.button
              type="button"
              onClick={cycleLanguage}
              whileTap={{
                scale: 0.92,
              }}
              aria-label={`Current language: ${language.toUpperCase()}. Change language`}
              className="
                flex
                items-center
                gap-1.5
                rounded-xl
                px-2.5
                py-2
                text-gray-600
                outline-none
                transition-colors
                hover:bg-gray-100
                hover:text-gray-950

                dark:text-gray-300
                dark:hover:bg-white/5
                dark:hover:text-white

                focus-visible:ring-2
                focus-visible:ring-blue-500
              "
            >
              <motion.span
                animate={
                  prefersReducedMotion
                    ? undefined
                    : {
                        rotate: [0, 10, 0],
                      }
                }
                transition={{
                  duration: 4,
                  repeat: Infinity,
                }}
              >
                <FaGlobe size={17} />
              </motion.span>

              <span
                className="
                  text-xs
                  font-bold
                  uppercase
                "
              >
                {language}
              </span>
            </motion.button>

            {/* Theme */}
            <motion.button
              type="button"
              onClick={toggleTheme}
              whileTap={{
                scale: 0.9,
                rotate: 15,
              }}
              aria-label={
                theme === 'dark'
                  ? 'Switch to light mode'
                  : 'Switch to dark mode'
              }
              className="
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-xl
                text-gray-600
                outline-none
                transition-colors
                hover:bg-gray-100

                dark:text-gray-300
                dark:hover:bg-white/5

                focus-visible:ring-2
                focus-visible:ring-blue-500
              "
            >
              <AnimatePresence
                mode="wait"
                initial={false}
              >
                {theme === 'dark' ? (
                  <motion.span
                    key="mobile-sun"
                    initial={{
                      rotate: -90,
                      opacity: 0,
                    }}
                    animate={{
                      rotate: 0,
                      opacity: 1,
                    }}
                    exit={{
                      rotate: 90,
                      opacity: 0,
                    }}
                  >
                    <FaSun size={19} />
                  </motion.span>
                ) : (
                  <motion.span
                    key="mobile-moon"
                    initial={{
                      rotate: 90,
                      opacity: 0,
                    }}
                    animate={{
                      rotate: 0,
                      opacity: 1,
                    }}
                    exit={{
                      rotate: -90,
                      opacity: 0,
                    }}
                  >
                    <FaMoon size={19} />
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>

            {/* Hamburger */}
            <motion.button
              type="button"
              onClick={toggleMenu}
              whileTap={{
                scale: 0.9,
              }}
              aria-label={
                isMenuOpen
                  ? 'Close menu'
                  : 'Open menu'
              }
              aria-expanded={isMenuOpen}
              aria-controls="mobile-navigation"
              className={`
                relative
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-xl
                outline-none
                transition-colors

                ${
                  isMenuOpen
                    ? `
                      bg-blue-800
                      text-white
                      shadow-lg
                      shadow-blue-900/20
                    `
                    : `
                      text-gray-600
                      hover:bg-gray-100

                      dark:text-gray-300
                      dark:hover:bg-white/5
                    `
                }

                focus-visible:ring-2
                focus-visible:ring-blue-500
              `}
            >
              <AnimatePresence
                mode="wait"
                initial={false}
              >
                {isMenuOpen ? (
                  <motion.span
                    key="close"
                    initial={{
                      rotate: -90,
                      scale: 0.6,
                      opacity: 0,
                    }}
                    animate={{
                      rotate: 0,
                      scale: 1,
                      opacity: 1,
                    }}
                    exit={{
                      rotate: 90,
                      scale: 0.6,
                      opacity: 0,
                    }}
                  >
                    <FaTimes size={21} />
                  </motion.span>
                ) : (
                  <motion.span
                    key="open"
                    initial={{
                      rotate: 90,
                      scale: 0.6,
                      opacity: 0,
                    }}
                    animate={{
                      rotate: 0,
                      scale: 1,
                      opacity: 1,
                    }}
                    exit={{
                      rotate: -90,
                      scale: 0.6,
                      opacity: 0,
                    }}
                  >
                    <FaBars size={21} />
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </div>

      {/* ======================================
          MOBILE MENU
      ======================================= */}

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            id="mobile-navigation"
            initial={
              prefersReducedMotion
                ? {
                    opacity: 1,
                  }
                : {
                    opacity: 0,
                    height: 0,
                    y: -12,
                  }
            }
            animate={{
              opacity: 1,
              height: 'auto',
              y: 0,
            }}
            exit={
              prefersReducedMotion
                ? {
                    opacity: 0,
                  }
                : {
                    opacity: 0,
                    height: 0,
                    y: -12,
                  }
            }
            transition={{
              duration: prefersReducedMotion
                ? 0
                : 0.42,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="
              overflow-hidden
              border-t
              border-gray-200/60
              bg-white/90
              backdrop-blur-2xl

              dark:border-white/5
              dark:bg-gray-950/90

              xl:hidden
            "
          >
            <div
              className="
                mx-auto
                max-w-screen-2xl
                px-4
                pb-6
                pt-4
                sm:px-6
              "
            >
              {/* Links */}
              <motion.div
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: {},
                  visible: {
                    transition: {
                      staggerChildren:
                        prefersReducedMotion
                          ? 0
                          : 0.055,
                    },
                  },
                }}
                className="
                  grid
                  gap-1
                  sm:grid-cols-2
                "
              >
                {navLinks.map(
                  (link, index) => {
                    const sectionId =
                      getSectionId(
                        link.href
                      );

                    const isActive =
                      activeSection ===
                      sectionId;

                    return (
                      <motion.a
                        key={link.href}
                        href={link.href}
                        onClick={closeMenu}
                        variants={{
                          hidden: {
                            opacity: 0,
                            x: -20,
                          },
                          visible: {
                            opacity: 1,
                            x: 0,
                          },
                        }}
                        whileHover={
                          prefersReducedMotion
                            ? undefined
                            : {
                                x: 5,
                              }
                        }
                        className={`
                          group
                          relative
                          flex
                          items-center
                          gap-3
                          overflow-hidden
                          rounded-xl
                          px-4
                          py-3
                          text-base
                          font-semibold
                          transition-colors

                          ${
                            isActive
                              ? `
                                bg-blue-50
                                text-blue-800

                                dark:bg-blue-500/10
                                dark:text-blue-300
                              `
                              : `
                                text-gray-600
                                hover:bg-gray-100
                                hover:text-gray-950

                                dark:text-gray-300
                                dark:hover:bg-white/5
                                dark:hover:text-white
                              `
                          }
                        `}
                      >
                        {/* Number */}
                        <span
                          className={`
                            flex
                            h-7
                            w-7
                            flex-shrink-0
                            items-center
                            justify-center
                            rounded-lg
                            text-[10px]
                            font-black

                            ${
                              isActive
                                ? `
                                  bg-blue-800
                                  text-white
                                `
                                : `
                                  bg-gray-100
                                  text-gray-400

                                  dark:bg-white/5
                                  dark:text-gray-500
                                `
                            }
                          `}
                        >
                          {String(
                            index + 1
                          ).padStart(
                            2,
                            '0'
                          )}
                        </span>

                        {link.name}

                        <motion.span
                          aria-hidden="true"
                          className="
                            ml-auto
                            text-blue-500
                            opacity-0
                            transition-opacity
                            group-hover:opacity-100
                          "
                        >
                          →
                        </motion.span>
                      </motion.a>
                    );
                  }
                )}
              </motion.div>

              {/* Bottom controls */}
              <div
                className="
                  mt-5
                  flex
                  flex-col
                  gap-4
                  border-t
                  border-gray-200
                  pt-5

                  dark:border-gray-800
                  sm:flex-row
                  sm:items-center
                  sm:justify-between
                "
              >
                {/* Languages */}
                <div>
                  <div
                    className="
                      mb-2
                      flex
                      items-center
                      gap-2
                      text-xs
                      font-bold
                      uppercase
                      tracking-[0.15em]
                      text-gray-400
                    "
                  >
                    <FaGlobe size={13} />
                    Language
                  </div>

                  <div
                    className="
                      flex
                      gap-2
                    "
                  >
                    {languages.map(
                      (lang) => {
                        const isActive =
                          language ===
                          lang.code;

                        return (
                          <motion.button
                            key={
                              lang.code
                            }
                            type="button"
                            onClick={() => {
                              toggleLanguage(
                                lang.code
                              );
                            }}
                            whileTap={{
                              scale: 0.93,
                            }}
                            className={`
                              relative
                              rounded-lg
                              px-4
                              py-2
                              text-xs
                              font-bold

                              ${
                                isActive
                                  ? `
                                    bg-blue-800
                                    text-white
                                    shadow-md
                                    shadow-blue-900/15
                                  `
                                  : `
                                    bg-gray-100
                                    text-gray-600

                                    dark:bg-white/5
                                    dark:text-gray-300
                                  `
                              }
                            `}
                          >
                            {
                              lang.label
                            }
                          </motion.button>
                        );
                      }
                    )}
                  </div>
                </div>

                {/* Social */}
                <div
                  className="
                    flex
                    items-center
                    gap-2
                  "
                >
                  <motion.a
                    href="https://github.com/SkyBlueHeat"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileTap={{
                      scale: 0.9,
                    }}
                    className="
                      flex
                      h-11
                      w-11
                      items-center
                      justify-center
                      rounded-xl
                      border
                      border-gray-200
                      bg-white
                      text-gray-600
                      shadow-sm

                      dark:border-white/5
                      dark:bg-white/[0.035]
                      dark:text-gray-300
                    "
                    aria-label="GitHub profile"
                  >
                    <FaGithub
                      size={20}
                    />
                  </motion.a>

                  <motion.a
                    href="https://linkedin.com/in/bora-aydn"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileTap={{
                      scale: 0.9,
                    }}
                    className="
                      flex
                      h-11
                      w-11
                      items-center
                      justify-center
                      rounded-xl
                      border
                      border-gray-200
                      bg-white
                      text-blue-600
                      shadow-sm

                      dark:border-white/5
                      dark:bg-white/[0.035]
                      dark:text-blue-400
                    "
                    aria-label="LinkedIn profile"
                  >
                    <FaLinkedin
                      size={20}
                    />
                  </motion.a>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default NavBar;