import React, { useContext, useRef } from 'react';
import {
  FaGithub,
  FaLinkedin,
  FaArrowDown,
  FaArrowRight,
  FaDownload,
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

/* ---------------------------------------
   Magnetic Button
---------------------------------------- */
const MagneticLink = ({
  children,
  className = '',
  reducedMotion = false,
  ...props
}) => {
  const ref = useRef(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, {
    stiffness: 350,
    damping: 22,
    mass: 0.35,
  });

  const springY = useSpring(y, {
    stiffness: 350,
    damping: 22,
    mass: 0.35,
  });

  const handleMouseMove = (event) => {
    if (reducedMotion || !ref.current) return;

    const rect = ref.current.getBoundingClientRect();

    const relativeX =
      event.clientX - rect.left - rect.width / 2;

    const relativeY =
      event.clientY - rect.top - rect.height / 2;

    x.set(relativeX * 0.18);
    y.set(relativeY * 0.18);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      ref={ref}
      style={{
        x: springX,
        y: springY,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={reset}
      whileTap={reducedMotion ? undefined : { scale: 0.97 }}
      className={className}
      {...props}
    >
      {children}
    </motion.a>
  );
};

/* ---------------------------------------
   Hero
---------------------------------------- */
const Hero = () => {
  const { language } = useContext(LanguageContext);
  const t = translations[language];

  const sectionRef = useRef(null);

  const prefersReducedMotion = useReducedMotion();

  const labels = {
    en: {
      github: 'GitHub profile',
      linkedin: 'LinkedIn profile',
      scrollToProjects: 'Scroll to projects',
      portraitAlt: 'Bora Aydin',
    },

    tr: {
      github: 'GitHub profili',
      linkedin: 'LinkedIn profili',
      scrollToProjects: 'Projelere git',
      portraitAlt: 'Bora Aydin',
    },

    de: {
      github: 'GitHub-Profil',
      linkedin: 'LinkedIn-Profil',
      scrollToProjects: 'Zu den Projekten',
      portraitAlt: 'Bora Aydin',
    },
  };

  const currentLabels = labels[language] || labels.en;

  /* ---------------------------------------
     Mouse Spotlight
  ---------------------------------------- */

  const mouseX = useMotionValue(500);
  const mouseY = useMotionValue(300);

  const smoothMouseX = useSpring(mouseX, {
    stiffness: 120,
    damping: 25,
    mass: 0.4,
  });

  const smoothMouseY = useSpring(mouseY, {
    stiffness: 120,
    damping: 25,
    mass: 0.4,
  });

  const spotlight = useMotionTemplate`
    radial-gradient(
      650px circle at ${smoothMouseX}px ${smoothMouseY}px,
      rgba(37, 99, 235, 0.14),
      transparent 55%
    )
  `;

  const handleHeroPointerMove = (event) => {
    if (prefersReducedMotion) return;

    const rect =
      event.currentTarget.getBoundingClientRect();

    mouseX.set(event.clientX - rect.left);
    mouseY.set(event.clientY - rect.top);
  };

  const handleHeroPointerLeave = (event) => {
    const rect =
      event.currentTarget.getBoundingClientRect();

    mouseX.set(rect.width * 0.55);
    mouseY.set(rect.height * 0.45);
  };

  /* ---------------------------------------
     Scroll Parallax
  ---------------------------------------- */

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  const contentY = useTransform(
    scrollYProgress,
    [0, 1],
    [0, prefersReducedMotion ? 0 : 65]
  );

  const imageParallaxY = useTransform(
    scrollYProgress,
    [0, 1],
    [0, prefersReducedMotion ? 0 : -70]
  );

  const heroOpacity = useTransform(
    scrollYProgress,
    [0, 0.85],
    [1, 0.5]
  );

  /* ---------------------------------------
     Image 3D Tilt
  ---------------------------------------- */

  const imageMouseX = useMotionValue(0);
  const imageMouseY = useMotionValue(0);

  const rawRotateY = useTransform(
    imageMouseX,
    [-0.5, 0.5],
    [-8, 8]
  );

  const rawRotateX = useTransform(
    imageMouseY,
    [-0.5, 0.5],
    [8, -8]
  );

  const rotateX = useSpring(rawRotateX, {
    stiffness: 170,
    damping: 20,
  });

  const rotateY = useSpring(rawRotateY, {
    stiffness: 170,
    damping: 20,
  });

  const handleImageMouseMove = (event) => {
    if (prefersReducedMotion) return;

    const rect =
      event.currentTarget.getBoundingClientRect();

    const x =
      (event.clientX - rect.left) / rect.width - 0.5;

    const y =
      (event.clientY - rect.top) / rect.height - 0.5;

    imageMouseX.set(x);
    imageMouseY.set(y);
  };

  const resetImageTilt = () => {
    imageMouseX.set(0);
    imageMouseY.set(0);
  };

  /* ---------------------------------------
     Animation Variants
  ---------------------------------------- */

  const containerVariants = {
    hidden: {},

    visible: {
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : 0.09,
        delayChildren: prefersReducedMotion ? 0 : 0.18,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: prefersReducedMotion ? 0 : 28,
      filter: prefersReducedMotion
        ? 'blur(0px)'
        : 'blur(8px)',
    },

    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',

      transition: {
        duration: prefersReducedMotion ? 0 : 0.7,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  const titleContainer = {
    hidden: {},

    visible: {
      transition: {
        delayChildren: prefersReducedMotion ? 0 : 0.18,
        staggerChildren: prefersReducedMotion ? 0 : 0.07,
      },
    },
  };

  const titleWord = {
    hidden: {
      opacity: 0,
      y: prefersReducedMotion ? 0 : '110%',
      rotate: prefersReducedMotion ? 0 : 2,
      filter: prefersReducedMotion
        ? 'blur(0px)'
        : 'blur(10px)',
    },

    visible: {
      opacity: 1,
      y: 0,
      rotate: 0,
      filter: 'blur(0px)',

      transition: {
        duration: prefersReducedMotion ? 0 : 0.85,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  const socialLinks = [
    {
      name: 'GitHub',
      href: 'https://github.com/SkyBlueHeat',
      icon: FaGithub,
      ariaLabel: currentLabels.github,
      hoverClass:
        'hover:text-gray-900 dark:hover:text-white',
    },

    {
      name: 'LinkedIn',
      href: 'https://linkedin.com/in/bora-aydn',
      icon: FaLinkedin,
      ariaLabel: currentLabels.linkedin,
      hoverClass:
        'hover:text-blue-600 dark:hover:text-blue-400',
    },
  ];

  const techTags = [
    {
      label: 'React',
      className: '-left-8 top-[17%]',
      delay: 0,
    },
    {
      label: 'TypeScript',
      className: '-right-8 top-[28%]',
      delay: 0.35,
    },
    {
      label: 'Node.js',
      className: '-left-10 bottom-[26%]',
      delay: 0.7,
    },
    {
      label: 'Vue',
      className: '-right-6 bottom-[15%]',
      delay: 1.05,
    },
  ];

  const titleWords = String(t.hero.title).split(' ');

  return (
    <section
      ref={sectionRef}
      id="home"
      onPointerMove={handleHeroPointerMove}
      onPointerLeave={handleHeroPointerLeave}
      className="
        relative
        isolate
        flex
        min-h-[calc(100vh-4rem)]
        items-center
        overflow-hidden
        bg-white
        dark:bg-gray-950
        lg:min-h-[calc(100vh-5rem)]
      "
    >
      {/* =====================================
          BACKGROUND EFFECTS
      ====================================== */}

      {/* Grid */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0
          -z-20
          opacity-70
          dark:opacity-40
        "
        style={{
          backgroundImage: `
            linear-gradient(
              to right,
              rgba(37, 99, 235, 0.065) 1px,
              transparent 1px
            ),
            linear-gradient(
              to bottom,
              rgba(37, 99, 235, 0.065) 1px,
              transparent 1px
            )
          `,
          backgroundSize: '42px 42px',
          WebkitMaskImage:
            'radial-gradient(circle at center, black, transparent 78%)',
          maskImage:
            'radial-gradient(circle at center, black, transparent 78%)',
        }}
      />

      {/* Mouse spotlight */}
      <motion.div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0
          -z-10
          hidden
          md:block
        "
        style={{
          background: spotlight,
        }}
      />

      {/* Animated blobs */}
      <motion.div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -left-40
          top-10
          -z-10
          h-[34rem]
          w-[34rem]
          rounded-full
          bg-blue-300/20
          blur-[120px]
          dark:bg-blue-700/20
        "
        animate={
          prefersReducedMotion
            ? undefined
            : {
                x: [0, 80, 20, 0],
                y: [0, 40, 100, 0],
                scale: [1, 1.15, 0.95, 1],
              }
        }
        transition={{
          duration: 16,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <motion.div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -right-40
          top-1/4
          -z-10
          h-[38rem]
          w-[38rem]
          rounded-full
          bg-indigo-300/20
          blur-[130px]
          dark:bg-indigo-700/20
        "
        animate={
          prefersReducedMotion
            ? undefined
            : {
                x: [0, -90, -20, 0],
                y: [0, 80, -20, 0],
                scale: [1, 0.9, 1.15, 1],
              }
        }
        transition={{
          duration: 19,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Very large decorative glow */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          left-1/2
          top-[55%]
          -z-20
          h-[35rem]
          w-[50rem]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-gradient-to-r
          from-transparent
          via-blue-100/40
          to-transparent
          blur-3xl
          dark:via-blue-950/30
        "
      />

      {/* =====================================
          CONTENT
      ====================================== */}

      <div
        className="
          relative
          mx-auto
          w-full
          max-w-7xl
          px-4
          py-20
          sm:px-6
          sm:py-24
          lg:px-8
          lg:py-20
        "
      >
        <div
          className="
            mx-auto
            grid
            max-w-7xl
            grid-cols-1
            items-center
            gap-14
            lg:grid-cols-[1.05fr_0.95fr]
            lg:gap-20
          "
        >
          {/* =====================================
              LEFT CONTENT
          ====================================== */}

          <motion.div
            style={{
              y: contentY,
              opacity: heroOpacity,
            }}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="
              relative
              z-20
              max-w-2xl
            "
          >
            {/* Name */}
            <motion.div
              variants={itemVariants}
              className="
                mb-6
                flex
                items-center
                gap-4
              "
            >
              <motion.div
                initial={{
                  scaleX: 0,
                }}
                animate={{
                  scaleX: 1,
                }}
                transition={{
                  delay: prefersReducedMotion ? 0 : 0.2,
                  duration: prefersReducedMotion ? 0 : 0.9,
                  ease: [0.16, 1, 0.3, 1],
                }}
                style={{
                  transformOrigin: 'left',
                }}
                className="
                  h-[2px]
                  w-12
                  bg-gradient-to-r
                  from-blue-800
                  to-blue-400
                  dark:from-blue-400
                  dark:to-cyan-400
                  sm:w-16
                "
              />

              <p
                className="
                  text-sm
                  font-bold
                  uppercase
                  tracking-[0.18em]
                  text-blue-800
                  dark:text-blue-400
                  sm:text-base
                "
              >
                {t.hero.name}
              </p>

              {/* Tiny glowing dot */}
              <motion.span
                aria-hidden="true"
                className="
                  h-1.5
                  w-1.5
                  rounded-full
                  bg-blue-500
                "
                animate={
                  prefersReducedMotion
                    ? undefined
                    : {
                        opacity: [0.35, 1, 0.35],
                        scale: [0.8, 1.35, 0.8],
                      }
                }
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
              />
            </motion.div>

            {/* Main title */}
            <motion.h1
              variants={titleContainer}
              className="
                mb-6
                flex
                max-w-3xl
                flex-wrap
                gap-x-[0.25em]
                overflow-visible
                text-4xl
                font-black
                leading-[1.02]
                tracking-[-0.045em]
                text-gray-950
                dark:text-white
                sm:text-5xl
                md:text-6xl
                lg:text-[4.25rem]
              "
            >
              {titleWords.map((word, index) => (
                <span
                  key={`${word}-${index}`}
                  className="overflow-hidden"
                >
                  <motion.span
                    variants={titleWord}
                    className="inline-block"
                  >
                    {word}
                  </motion.span>
                </span>
              ))}
            </motion.h1>

            {/* Animated accent under title */}
            <motion.div
              variants={itemVariants}
              className="
                mb-7
                h-1
                w-20
                overflow-hidden
                rounded-full
                bg-gray-100
                dark:bg-gray-800
              "
            >
              <motion.div
                className="
                  h-full
                  w-full
                  origin-left
                  rounded-full
                  bg-gradient-to-r
                  from-blue-700
                  via-blue-500
                  to-cyan-400
                "
                initial={{
                  scaleX: 0,
                }}
                animate={{
                  scaleX: 1,
                }}
                transition={{
                  delay: prefersReducedMotion ? 0 : 0.65,
                  duration: prefersReducedMotion ? 0 : 1,
                  ease: [0.16, 1, 0.3, 1],
                }}
              />
            </motion.div>

            {/* Description */}
            <motion.p
              variants={itemVariants}
              className="
                mb-8
                max-w-xl
                text-lg
                leading-relaxed
                text-gray-600
                dark:text-gray-300
                sm:text-xl
              "
            >
              {t.hero.description}
            </motion.p>

            {/* Info box */}
            <motion.div
              variants={itemVariants}
              whileHover={
                prefersReducedMotion
                  ? undefined
                  : {
                      x: 5,
                    }
              }
              className="
                relative
                mb-9
                max-w-xl
                overflow-hidden
                rounded-r-xl
                border-l-2
                border-blue-600
                bg-gradient-to-r
                from-blue-50/80
                to-transparent
                py-3
                pl-5
                pr-3
                dark:border-blue-400
                dark:from-blue-950/25
              "
            >
              <p
                className="
                  mb-1.5
                  text-sm
                  leading-relaxed
                  text-gray-600
                  dark:text-gray-300
                  sm:text-base
                "
              >
                {t.hero.location}
              </p>

              <p
                className="
                  mb-2
                  text-sm
                  font-semibold
                  leading-relaxed
                  text-blue-800
                  dark:text-blue-400
                  sm:text-base
                "
              >
                {t.hero.opportunities}
              </p>

              <p
                className="
                  text-sm
                  leading-relaxed
                  text-gray-500
                  dark:text-gray-400
                "
              >
                {t.hero.experience}
              </p>
            </motion.div>

            {/* Buttons */}
            <motion.div
              variants={itemVariants}
              className="
                mb-9
                flex
                flex-col
                gap-3
                sm:flex-row
                sm:gap-4
              "
            >
              {/* Projects */}
              <MagneticLink
                href="#projects"
                reducedMotion={prefersReducedMotion}
                className="
                  group
                  relative
                  inline-flex
                  overflow-hidden
                  rounded-xl
                  bg-blue-800
                  px-7
                  py-3.5
                  text-base
                  font-semibold
                  text-white
                  shadow-lg
                  shadow-blue-900/15
                  outline-none
                  focus-visible:ring-2
                  focus-visible:ring-blue-500
                  focus-visible:ring-offset-2
                  dark:focus-visible:ring-offset-gray-950
                "
              >
                {/* Hover fill */}
                <motion.span
                  aria-hidden="true"
                  className="
                    absolute
                    inset-0
                    bg-gradient-to-r
                    from-blue-700
                    via-blue-600
                    to-cyan-600
                  "
                  initial={{
                    x: '-105%',
                  }}
                  whileHover={{
                    x: 0,
                  }}
                  transition={{
                    duration: 0.35,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                />

                <span
                  className="
                    relative
                    z-10
                    flex
                    items-center
                    gap-2
                  "
                >
                  {t.hero.viewProjects}

                  <FaArrowRight
                    className="
                      transition-transform
                      duration-300
                      group-hover:translate-x-1
                    "
                    aria-hidden="true"
                  />
                </span>
              </MagneticLink>

              {/* Resume */}
              <MagneticLink
                href="/Bora_Aydin_J1_Resume.pdf"
                download="Bora_Aydin_J1_Resume.pdf"
                reducedMotion={prefersReducedMotion}
                className="
                  group
                  inline-flex
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  border
                  border-gray-200
                  bg-white/70
                  px-7
                  py-3.5
                  text-base
                  font-semibold
                  text-gray-900
                  shadow-sm
                  backdrop-blur-md
                  transition
                  hover:border-blue-200
                  hover:bg-blue-50
                  hover:shadow-md
                  focus:outline-none
                  focus-visible:ring-2
                  focus-visible:ring-gray-400
                  focus-visible:ring-offset-2
                  dark:border-gray-700
                  dark:bg-gray-900/60
                  dark:text-white
                  dark:hover:border-blue-800
                  dark:hover:bg-blue-950/30
                  dark:focus-visible:ring-offset-gray-950
                "
              >
                {t.hero.downloadResume}

                <FaDownload
                  className="
                    text-sm
                    transition-transform
                    duration-300
                    group-hover:translate-y-0.5
                  "
                  aria-hidden="true"
                />
              </MagneticLink>
            </motion.div>

            {/* Social links */}
            <motion.div
              variants={itemVariants}
              className="flex items-center gap-2"
            >
              {socialLinks.map((social) => {
                const Icon = social.icon;

                return (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.ariaLabel}
                    whileHover={
                      prefersReducedMotion
                        ? undefined
                        : {
                            y: -4,
                            scale: 1.08,
                            rotate: -3,
                          }
                    }
                    whileTap={
                      prefersReducedMotion
                        ? undefined
                        : {
                            scale: 0.92,
                          }
                    }
                    transition={{
                      type: 'spring',
                      stiffness: 400,
                      damping: 18,
                    }}
                    className={`
                      group
                      relative
                      rounded-xl
                      border
                      border-transparent
                      p-2.5
                      text-gray-500
                      transition-colors
                      hover:border-gray-200
                      hover:bg-white
                      hover:shadow-md
                      focus:outline-none
                      focus-visible:ring-2
                      focus-visible:ring-blue-500
                      dark:text-gray-400
                      dark:hover:border-gray-700
                      dark:hover:bg-gray-900
                      ${social.hoverClass}
                    `}
                  >
                    <Icon size={22} />

                    {/* Tooltip */}
                    <span
                      className="
                        pointer-events-none
                        absolute
                        left-1/2
                        top-full
                        z-50
                        mt-2
                        -translate-x-1/2
                        whitespace-nowrap
                        rounded-md
                        bg-gray-950
                        px-2
                        py-1
                        text-[11px]
                        font-medium
                        text-white
                        opacity-0
                        shadow-lg
                        transition-all
                        duration-200
                        group-hover:translate-y-1
                        group-hover:opacity-100
                        dark:bg-white
                        dark:text-gray-950
                      "
                    >
                      {social.name}
                    </span>
                  </motion.a>
                );
              })}
            </motion.div>
          </motion.div>

          {/* =====================================
              RIGHT IMAGE
          ====================================== */}

          <motion.div
            style={{
              y: imageParallaxY,
            }}
            className="
              relative
              z-10
              mx-auto
              w-full
              max-w-md
              lg:max-w-lg
            "
          >
            {/* Orbit rings */}
            <motion.div
              aria-hidden="true"
              className="
                pointer-events-none
                absolute
                -inset-14
                hidden
                rounded-full
                border
                border-blue-200/40
                md:block
                dark:border-blue-500/10
              "
              animate={
                prefersReducedMotion
                  ? undefined
                  : {
                      rotate: 360,
                    }
              }
              transition={{
                duration: 35,
                repeat: Infinity,
                ease: 'linear',
              }}
            />

            <motion.div
              aria-hidden="true"
              className="
                pointer-events-none
                absolute
                -inset-7
                hidden
                rounded-full
                border
                border-dashed
                border-blue-300/30
                md:block
                dark:border-blue-500/15
              "
              animate={
                prefersReducedMotion
                  ? undefined
                  : {
                      rotate: -360,
                    }
              }
              transition={{
                duration: 26,
                repeat: Infinity,
                ease: 'linear',
              }}
            />

            {/* Background card */}
            <motion.div
              aria-hidden="true"
              initial={{
                opacity: 0,
                rotate: 0,
                scale: 0.92,
              }}
              animate={{
                opacity: 1,
                rotate: 5,
                scale: 1,
              }}
              transition={{
                delay: prefersReducedMotion ? 0 : 0.35,
                duration: prefersReducedMotion ? 0 : 1,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="
                absolute
                inset-0
                rounded-[2rem]
                bg-gradient-to-br
                from-blue-200
                via-blue-100
                to-cyan-50
                shadow-2xl
                dark:from-blue-900/70
                dark:via-blue-950/50
                dark:to-gray-900
              "
            />

            {/* Glow behind image */}
            <div
              aria-hidden="true"
              className="
                absolute
                inset-8
                -z-10
                rounded-full
                bg-blue-500/25
                blur-[90px]
                dark:bg-blue-500/25
              "
            />

            {/* Perspective wrapper */}
            <div className="[perspective:1200px]">
              <motion.div
                onMouseMove={handleImageMouseMove}
                onMouseLeave={resetImageTilt}
                initial={{
                  opacity: 0,
                  scale: prefersReducedMotion ? 1 : 0.9,
                  y: prefersReducedMotion ? 0 : 40,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  y: 0,
                }}
                transition={{
                  delay: prefersReducedMotion ? 0 : 0.28,
                  duration: prefersReducedMotion ? 0 : 1,
                  ease: [0.16, 1, 0.3, 1],
                }}
                whileHover={
                  prefersReducedMotion
                    ? undefined
                    : {
                        scale: 1.015,
                      }
                }
                style={{
                  rotateX: prefersReducedMotion
                    ? 0
                    : rotateX,

                  rotateY: prefersReducedMotion
                    ? 0
                    : rotateY,

                  transformStyle: 'preserve-3d',
                }}
                className="
                  group
                  relative
                  overflow-hidden
                  rounded-[2rem]
                  border
                  border-white/50
                  bg-white/20
                  p-1.5
                  shadow-2xl
                  shadow-blue-950/10
                  backdrop-blur-sm
                  dark:border-white/10
                  dark:bg-white/5
                "
              >
                {/* Image */}
                <img
                  src="/Hero-img.jpg"
                  alt={currentLabels.portraitAlt}
                  loading="eager"
                  decoding="async"
                  fetchPriority="high"
                  className="
                    relative
                    aspect-[4/5]
                    w-full
                    rounded-[1.65rem]
                    object-cover
                    transition-transform
                    duration-700
                    ease-out
                    group-hover:scale-[1.025]
                  "
                />

                {/* Image gradient */}
                <div
                  aria-hidden="true"
                  className="
                    pointer-events-none
                    absolute
                    inset-1.5
                    rounded-[1.65rem]
                    bg-gradient-to-t
                    from-blue-950/25
                    via-transparent
                    to-white/5
                  "
                />

                {/* Shine animation */}
                {!prefersReducedMotion && (
                  <motion.div
                    aria-hidden="true"
                    initial={{
                      x: '-170%',
                    }}
                    animate={{
                      x: '220%',
                    }}
                    transition={{
                      delay: 1.15,
                      duration: 1.35,
                      ease: 'easeInOut',
                    }}
                    className="
                      pointer-events-none
                      absolute
                      -inset-y-10
                      w-243
                      -skew-x-12
                      bg-gradient-to-r
                      from-transparent
                      via-white/25
                      to-transparent
                      blur-sm
                    "
                  />
                )}

                {/* Availability glass card */}
                <motion.div
                  initial={{
                    opacity: 0,
                    y: 20,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    delay: prefersReducedMotion ? 0 : 1,
                    duration: 0.6,
                  }}
                  style={{
                    transform: 'translateZ(45px)',
                  }}
                  className="
                    absolute
                    bottom-5
                    left-5
                    right-5
                    flex
                    items-center
                    gap-3
                    rounded-2xl
                    border
                    border-white/30
                    bg-white/75
                    px-4
                    py-3
                    shadow-xl
                    backdrop-blur-xl
                    dark:border-white/10
                    dark:bg-gray-950/65
                  "
                >
                  <span className="relative flex h-3 w-3">
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
                        h-3
                        w-3
                        rounded-full
                        bg-emerald-500
                      "
                    />
                  </span>

                  <span
                    className="
                      text-xs
                      font-semibold
                      text-gray-800
                      dark:text-gray-100
                      sm:text-sm
                    "
                  >
                    {t.hero.opportunities}
                  </span>
                </motion.div>
              </motion.div>
            </div>

            {/* Floating technology tags */}
            {techTags.map((tag) => (
              <motion.div
                key={tag.label}
                aria-hidden="true"
                initial={{
                  opacity: 0,
                  scale: 0.8,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  y: prefersReducedMotion
                    ? 0
                    : [0, -8, 0],
                }}
                transition={{
                  opacity: {
                    delay: 0.7 + tag.delay / 4,
                    duration: 0.5,
                  },

                  scale: {
                    delay: 0.7 + tag.delay / 4,
                    duration: 0.5,
                  },

                  y: {
                    delay: tag.delay,
                    duration: 3.4,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  },
                }}
                className={`
                  absolute
                  hidden
                  rounded-full
                  border
                  border-blue-100
                  bg-white/80
                  px-3
                  py-1.5
                  text-xs
                  font-bold
                  text-blue-800
                  shadow-lg
                  shadow-blue-950/5
                  backdrop-blur-xl
                  sm:block
                  dark:border-blue-900/60
                  dark:bg-gray-950/75
                  dark:text-blue-300
                  ${tag.className}
                `}
              >
                <span
                  className="
                    mr-1.5
                    inline-block
                    h-1.5
                    w-1.5
                    rounded-full
                    bg-blue-500
                  "
                />

                {tag.label}
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* =====================================
            SCROLL INDICATOR
        ====================================== */}

        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            delay: prefersReducedMotion ? 0 : 1.4,
            duration: 0.8,
          }}
          className="
            mt-14
            flex
            justify-center
            lg:mt-16
          "
        >
          <motion.a
            href="#projects"
            aria-label={currentLabels.scrollToProjects}
            whileHover={
              prefersReducedMotion
                ? undefined
                : {
                    y: -3,
                  }
            }
            className="
              group
              flex
              flex-col
              items-center
              gap-2
              rounded-xl
              px-4
              py-2
              text-xs
              font-semibold
              uppercase
              tracking-[0.16em]
              text-gray-400
              transition-colors
              hover:text-blue-700
              focus:outline-none
              focus-visible:ring-2
              focus-visible:ring-blue-500
              dark:text-gray-500
              dark:hover:text-blue-400
            "
          >
            <span>{t.hero.viewProjects}</span>

            <div
              className="
                flex
                h-10
                w-6
                justify-center
                rounded-full
                border
                border-gray-300
                pt-2
                transition-colors
                group-hover:border-blue-500
                dark:border-gray-700
              "
            >
              <motion.span
                aria-hidden="true"
                className="
                  h-1.5
                  w-1.5
                  rounded-full
                  bg-blue-600
                  dark:bg-blue-400
                "
                animate={
                  prefersReducedMotion
                    ? undefined
                    : {
                        y: [0, 16, 0],
                        opacity: [1, 0.25, 1],
                      }
                }
                transition={{
                  duration: 1.8,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
            </div>

            <FaArrowDown
              aria-hidden="true"
              className="
                text-[10px]
                transition-transform
                group-hover:translate-y-1
              "
            />
          </motion.a>
        </motion.div>
      </div>

      {/* Bottom fade into next section */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          bottom-0
          left-0
          right-0
          h-20
          bg-gradient-to-b
          from-transparent
          to-white
          dark:to-gray-950
        "
      />
    </section>
  );
};

export default Hero;