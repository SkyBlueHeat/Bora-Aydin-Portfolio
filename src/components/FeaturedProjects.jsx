import React, {
  useContext,
  useRef,
  useState,
} from 'react';

import {
  FaGithub,
  FaExternalLinkAlt,
  FaLink,
  FaCheck,
  FaArrowRight,
  FaShieldAlt,
  FaBolt,
  FaCode,
  FaChartLine,
  FaLayerGroup,
  FaTerminal,
  FaCopy,
  FaPlay,
  FaCube,
} from 'react-icons/fa';

import {
  motion,
  AnimatePresence,
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
   MAGNETIC ACTION
========================================================= */

const MagneticAction = ({
  children,
  reducedMotion,
  className = '',
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

  const handlePointerMove = (event) => {
    if (reducedMotion || !ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const relativeX = event.clientX - rect.left - rect.width / 2;
    const relativeY = event.clientY - rect.top - rect.height / 2;

    x.set(relativeX * 0.14);
    y.set(relativeY * 0.14);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      ref={ref}
      style={{ x: springX, y: springY }}
      onPointerMove={handlePointerMove}
      onPointerLeave={reset}
      whileTap={reducedMotion ? undefined : { scale: 0.97 }}
      className={className}
      {...props}
    >
      {children}
    </motion.a>
  );
};

/* =========================================================
   PROJECT VISUAL / MINI PRODUCT DEMO
========================================================= */

const ProjectVisual = ({
  project,
  theme,
  ui,
  reducedMotion,
}) => {
  const floatingTransition = (delay = 0) => ({
    duration: 4.5,
    repeat: Infinity,
    ease: 'easeInOut',
    delay,
  });

  return (
    <div
      className={`
        relative
        min-h-[430px]
        overflow-visible
        rounded-[1.7rem]
        border
        bg-gradient-to-br
        p-4
        shadow-2xl
        ${theme.visualBg}
        ${theme.border}
      `}
    >
      {/* Ambient glow */}
      <motion.div
        aria-hidden="true"
        className={`
          pointer-events-none
          absolute
          -left-20
          -top-20
          h-64
          w-64
          rounded-full
          blur-[90px]
          ${theme.glow}
        `}
        animate={
          reducedMotion
            ? undefined
            : {
                x: [0, 40, 5, 0],
                y: [0, 20, 55, 0],
                scale: [1, 1.1, 0.95, 1],
              }
        }
        transition={{
          duration: 11,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Browser shell */}
      <div
        className="
          relative
          z-10
          overflow-hidden
          rounded-2xl
          border
          border-white/70
          bg-white/80
          shadow-[0_24px_70px_rgba(15,23,42,0.13)]
          backdrop-blur-xl

          dark:border-white/[0.08]
          dark:bg-gray-950/75
        "
      >
        {/* Browser bar */}
        <div
          className="
            flex
            h-11
            items-center
            gap-3
            border-b
            border-gray-200/70
            bg-white/80
            px-4

            dark:border-white/[0.06]
            dark:bg-white/[0.035]
          "
        >
          <div className="flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-rose-400/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-400/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
          </div>

          <div
            className="
              flex-1
              truncate
              rounded-lg
              bg-gray-100/90
              px-3
              py-1.5
              font-mono
              text-[10px]
              text-gray-400

              dark:bg-white/[0.05]
              dark:text-gray-500
            "
          >
            portfolio://{project.id}
          </div>
        </div>

        {/* AVIORA */}
        {project.id === 'aviora' && (
          <div className="relative min-h-[345px] p-4 sm:p-5">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <div className="text-xs font-bold text-gray-400">
                  {ui.dashboard}
                </div>
                <div className="mt-1 text-lg font-black text-gray-950 dark:text-white">
                  Aviora
                </div>
              </div>

              <motion.div
                animate={
                  reducedMotion
                    ? undefined
                    : { rotate: [0, 8, 0, -8, 0] }
                }
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className={`
                  flex h-10 w-10 items-center justify-center rounded-xl
                  ${theme.iconBg}
                `}
              >
                <FaLayerGroup size={15} />
              </motion.div>
            </div>

            <div className="grid grid-cols-3 gap-2">
              {[ui.applied, ui.interview, ui.followUp].map((label, columnIndex) => (
                <div
                  key={label}
                  className="
                    rounded-xl
                    border
                    border-gray-200/70
                    bg-gray-50/80
                    p-2

                    dark:border-white/[0.05]
                    dark:bg-white/[0.025]
                  "
                >
                  <div className="mb-2 text-[9px] font-black uppercase tracking-[0.08em] text-gray-400">
                    {label}
                  </div>

                  {[0, 1].map((item) => (
                    <motion.div
                      key={item}
                      animate={
                        reducedMotion
                          ? undefined
                          : {
                              y: [0, -3, 0],
                            }
                      }
                      transition={floatingTransition(columnIndex * 0.4 + item * 0.25)}
                      className="
                        mb-2
                        rounded-lg
                        border
                        border-gray-200/80
                        bg-white
                        p-2
                        shadow-sm

                        dark:border-white/[0.06]
                        dark:bg-gray-900
                      "
                    >
                      <div className="h-1.5 w-3/4 rounded-full bg-gray-200 dark:bg-gray-700" />
                      <div className="mt-2 h-1.5 w-1/2 rounded-full bg-gray-100 dark:bg-gray-800" />
                    </motion.div>
                  ))}
                </div>
              ))}
            </div>

            <div className="mt-4 grid grid-cols-[1.2fr_0.8fr] gap-3">
              <div
                className="
                  rounded-xl
                  border
                  border-gray-200/70
                  bg-white
                  p-3

                  dark:border-white/[0.06]
                  dark:bg-white/[0.025]
                "
              >
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-[9px] font-black uppercase tracking-[0.08em] text-gray-400">
                    {ui.analytics}
                  </span>
                  <span className={`text-xs font-black ${theme.text}`}>
                    94–98
                  </span>
                </div>

                <div className="flex h-16 items-end gap-1.5">
                  {[36, 50, 43, 63, 57, 76, 68, 88].map((height, i) => (
                    <motion.div
                      key={i}
                      initial={{ height: 4 }}
                      whileInView={{ height }}
                      viewport={{ once: true }}
                      transition={{
                        delay: i * 0.04,
                        duration: reducedMotion ? 0 : 0.6,
                      }}
                      className={`flex-1 rounded-t ${theme.bar}`}
                    />
                  ))}
                </div>
              </div>

              <motion.div
                animate={
                  reducedMotion
                    ? undefined
                    : { y: [0, -6, 0] }
                }
                transition={floatingTransition(0.3)}
                className={`
                  flex
                  flex-col
                  items-center
                  justify-center
                  rounded-xl
                  border
                  p-3
                  ${theme.softPanel}
                `}
              >
                <div className="relative flex h-16 w-16 items-center justify-center rounded-full border-[7px] border-gray-100 dark:border-gray-800">
                  <motion.div
                    className={`absolute inset-[-7px] rounded-full border-[7px] border-transparent border-t-current ${theme.text}`}
                    animate={reducedMotion ? undefined : { rotate: 360 }}
                    transition={{ duration: 7, repeat: Infinity, ease: 'linear' }}
                  />
                  <span className={`text-sm font-black ${theme.text}`}>98</span>
                </div>
                <span className="mt-2 text-[9px] font-bold uppercase tracking-[0.08em] text-gray-400">
                  Lighthouse
                </span>
              </motion.div>
            </div>
          </div>
        )}

        {/* AGENT EVIDENCE */}
        {project.id === 'agent-evidence' && (
          <div className="relative min-h-[345px] p-5">
            <div className="mb-3 flex items-center justify-between">
              <div>
                <div className="text-[10px] font-black uppercase tracking-[0.12em] text-gray-400">
                  {ui.securityLab}
                </div>
                <div className="mt-1 text-lg font-black text-gray-950 dark:text-white">
                  Agent Evidence
                </div>
              </div>

              <div className={`rounded-full px-3 py-1 text-[9px] font-black uppercase tracking-[0.1em] ${theme.badge}`}>
                {ui.secure}
              </div>
            </div>

            <div className="relative flex min-h-[230px] items-center justify-center">
              <motion.div
                aria-hidden="true"
                className={`absolute h-44 w-44 rounded-full border ${theme.orbitBorder}`}
                animate={reducedMotion ? undefined : { rotate: 360 }}
                transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
              />

              <motion.div
                aria-hidden="true"
                className={`absolute h-64 w-64 rounded-full border border-dashed ${theme.orbitBorder}`}
                animate={reducedMotion ? undefined : { rotate: -360 }}
                transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
              />

              <motion.div
                animate={
                  reducedMotion
                    ? undefined
                    : { scale: [1, 1.04, 1] }
                }
                transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
                className={`
                  relative
                  z-10
                  flex
                  h-28
                  w-28
                  flex-col
                  items-center
                  justify-center
                  rounded-[2rem]
                  border
                  shadow-xl
                  ${theme.softPanel}
                `}
              >
                <FaShieldAlt className={theme.text} size={30} />
                <span className="mt-2 text-[9px] font-black uppercase tracking-[0.1em] text-gray-400">
                  {ui.riskEngine}
                </span>
              </motion.div>

              {[
                { value: '10', label: ui.rules, pos: 'left-[3%] top-[16%]' },
                { value: '6', label: ui.entities, pos: 'right-[2%] top-[24%]' },
                { value: 'API', label: ui.validation, pos: 'left-[8%] bottom-[12%]' },
                { value: 'LOG', label: ui.logging, pos: 'right-[6%] bottom-[10%]' },
              ].map((node, i) => (
                <motion.div
                  key={node.label}
                  animate={
                    reducedMotion
                      ? undefined
                      : { y: [0, i % 2 === 0 ? -7 : 7, 0] }
                  }
                  transition={floatingTransition(i * 0.35)}
                  className={`
                    absolute
                    ${node.pos}
                    rounded-xl
                    border
                    bg-white/85
                    px-3
                    py-2
                    text-center
                    shadow-lg
                    backdrop-blur-xl
                    dark:bg-gray-900/85
                    ${theme.border}
                  `}
                >
                  <div className={`text-sm font-black ${theme.text}`}>{node.value}</div>
                  <div className="mt-0.5 text-[8px] font-black uppercase tracking-[0.08em] text-gray-400">
                    {node.label}
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="grid grid-cols-3 gap-2">
              {['FastAPI', 'Pydantic', 'Docker'].map((tech, i) => (
                <motion.div
                  key={tech}
                  animate={
                    reducedMotion
                      ? undefined
                      : { y: [0, -3, 0] }
                  }
                  transition={floatingTransition(i * 0.25)}
                  className="rounded-lg border border-gray-200/70 bg-white/70 px-2 py-2 text-center text-[9px] font-bold text-gray-500 dark:border-white/[0.05] dark:bg-white/[0.025] dark:text-gray-400"
                >
                  {tech}
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* MOTION KIT */}
        {project.id === 'motionkit' && (
          <div className="relative min-h-[345px] p-5">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <div className="text-[10px] font-black uppercase tracking-[0.12em] text-gray-400">
                  {ui.motionSystem}
                </div>
                <div className="mt-1 text-lg font-black text-gray-950 dark:text-white">
                  MotionKit
                </div>
              </div>

              <motion.div
                animate={
                  reducedMotion
                    ? undefined
                    : { rotate: [0, 10, 0, -10, 0] }
                }
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                className={`flex h-10 w-10 items-center justify-center rounded-xl ${theme.iconBg}`}
              >
                <FaPlay size={13} />
              </motion.div>
            </div>

            <div className="grid grid-cols-[1.4fr_0.6fr] gap-3">
              <div
                className={`
                  relative
                  aspect-video
                  overflow-hidden
                  rounded-xl
                  border
                  ${theme.softPanel}
                `}
              >
                <motion.div
                  animate={
                    reducedMotion
                      ? undefined
                      : { x: ['-100%', '170%'] }
                  }
                  transition={{ duration: 3, repeat: Infinity, repeatDelay: 1.4, ease: 'easeInOut' }}
                  className="absolute inset-y-0 w-16 -skew-x-12 bg-gradient-to-r from-transparent via-white/30 to-transparent blur-md dark:via-white/10"
                />

                <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
                  <motion.div
                    animate={
                      reducedMotion
                        ? undefined
                        : { scale: [1, 1.08, 1] }
                    }
                    transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
                    className={`text-3xl font-black tracking-[-0.05em] ${theme.text}`}
                  >
                    MOTION
                  </motion.div>
                  <div className="mt-1 text-[10px] font-black tracking-[0.28em] text-gray-400">
                    KIT
                  </div>
                </div>
              </div>

              <div className="grid gap-2">
                {['9:16', '1:1'].map((format, i) => (
                  <motion.div
                    key={format}
                    animate={
                      reducedMotion
                        ? undefined
                        : { y: [0, i === 0 ? -4 : 4, 0] }
                    }
                    transition={floatingTransition(i * 0.35)}
                    className={`flex items-center justify-center rounded-xl border text-xs font-black ${theme.softPanel}`}
                  >
                    {format}
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="mt-4 rounded-xl border border-gray-200/70 bg-white/70 p-3 dark:border-white/[0.05] dark:bg-white/[0.025]">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-[9px] font-black uppercase tracking-[0.1em] text-gray-400">
                  {ui.timeline}
                </span>
                <span className={`text-[9px] font-black ${theme.text}`}>00:12:24</span>
              </div>

              <div className="space-y-2">
                {[72, 48, 86].map((width, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className="h-1.5 w-8 rounded-full bg-gray-100 dark:bg-gray-800" />
                    <div className="relative h-2 flex-1 overflow-hidden rounded-full bg-gray-100 dark:bg-gray-800">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${width}%` }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.12, duration: reducedMotion ? 0 : 0.8 }}
                        className={`h-full rounded-full ${theme.bar}`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Floating tech chips */}
      <div className="pointer-events-none absolute inset-0 z-20 hidden xl:block">
        {project.technologies.slice(0, 4).map((tech, index) => (
          <motion.div
            key={tech}
            animate={
              reducedMotion
                ? undefined
                : {
                    y: [0, index % 2 === 0 ? -8 : 8, 0],
                    rotate: [0, index % 2 === 0 ? 2 : -2, 0],
                  }
            }
            transition={floatingTransition(index * 0.3)}
            className={`
              absolute
              rounded-full
              border
              bg-white/80
              px-3
              py-1.5
              text-[10px]
              font-black
              shadow-lg
              backdrop-blur-xl
              dark:bg-gray-950/80
              ${theme.border}
              ${theme.text}
              ${
                index === 0
                  ? '-left-4 top-[17%]'
                  : index === 1
                    ? '-right-5 top-[31%]'
                    : index === 2
                      ? '-left-5 bottom-[25%]'
                      : '-right-3 bottom-[12%]'
              }
            `}
          >
            {tech}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

/* =========================================================
   PROJECT CARD
========================================================= */

const ProjectCard = ({
  project,
  index,
  total,
  theme,
  labels,
  ui,
  isCopied,
  copyProjectLink,
  setActiveProjectId,
  reducedMotion,
}) => {
  const cardRef = useRef(null);
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);

  const glowX = useMotionValue(400);
  const glowY = useMotionValue(250);

  const smoothGlowX = useSpring(glowX, {
    stiffness: 140,
    damping: 24,
  });

  const smoothGlowY = useSpring(glowY, {
    stiffness: 140,
    damping: 24,
  });

  const rawRotateY = useTransform(pointerX, [-0.5, 0.5], [-4, 4]);
  const rawRotateX = useTransform(pointerY, [-0.5, 0.5], [4, -4]);

  const rotateX = useSpring(rawRotateX, {
    stiffness: 180,
    damping: 22,
  });

  const rotateY = useSpring(rawRotateY, {
    stiffness: 180,
    damping: 22,
  });

  const spotlight = useMotionTemplate`
    radial-gradient(
      700px circle at ${smoothGlowX}px ${smoothGlowY}px,
      ${theme.spotlight},
      transparent 55%
    )
  `;

  const handlePointerMove = (event) => {
    if (reducedMotion || !cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    glowX.set(x);
    glowY.set(y);
    pointerX.set(x / rect.width - 0.5);
    pointerY.set(y / rect.height - 0.5);
  };

  const resetPointer = () => {
    pointerX.set(0);
    pointerY.set(0);
  };

  return (
    <motion.article
      ref={cardRef}
      id={project.id}
      onPointerMove={handlePointerMove}
      onPointerLeave={resetPointer}
      onViewportEnter={() => setActiveProjectId(project.id)}
      initial={{
        opacity: 0,
        y: reducedMotion ? 0 : 80,
        scale: reducedMotion ? 1 : 0.97,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        scale: 1,
      }}
      viewport={{
        once: false,
        amount: 0.12,
      }}
      transition={{
        duration: reducedMotion ? 0 : 0.9,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="group/project scroll-mt-44"
    >
      <div className="relative">
        {/* Outer aura */}
        <div
          aria-hidden="true"
          className={`
            pointer-events-none
            absolute
            -inset-5
            -z-10
            rounded-[2.5rem]
            opacity-0
            blur-[55px]
            transition-opacity
            duration-700
            group-hover/project:opacity-100
            ${theme.glow}
          `}
        />

        <div
          className={`
            group
            relative
            overflow-hidden
            rounded-[2.1rem]
            border
            bg-white/[0.88]
            shadow-[0_24px_90px_rgba(15,23,42,0.08)]
            backdrop-blur-2xl
            transition-[box-shadow,border-color]
            duration-500

            hover:shadow-[0_35px_120px_rgba(15,23,42,0.15)]

            dark:bg-gray-950/[0.82]
            dark:shadow-[0_30px_100px_rgba(0,0,0,0.38)]
            ${theme.border}
          `}
        >
          {/* Mouse spotlight */}
          <motion.div
            aria-hidden="true"
            style={{ background: spotlight }}
            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          />

          {/* Animated top border */}
          <motion.div
            aria-hidden="true"
            className={`
              absolute
              left-0
              top-0
              h-[3px]
              w-full
              bg-gradient-to-r
              bg-[length:200%_100%]
              ${theme.gradient}
            `}
            animate={
              reducedMotion
                ? undefined
                : { backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }
            }
            transition={{ duration: 7, repeat: Infinity, ease: 'linear' }}
          />

          {/* Giant project number */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-6 -top-12 select-none text-[13rem] font-black leading-none tracking-[-0.09em] text-gray-950/[0.022] dark:text-white/[0.025]"
          >
            {String(index + 1).padStart(2, '0')}
          </div>

          {/* Card header strip */}
          <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 border-b border-gray-200/70 px-6 py-4 dark:border-white/[0.06] sm:px-8">
            <div className="flex items-center gap-3">
              <div className={`flex h-9 w-9 items-center justify-center rounded-xl ${theme.iconBg}`}>
                <FaCube size={13} />
              </div>

              <div>
                <div className="text-[10px] font-black uppercase tracking-[0.16em] text-gray-400">
                  {ui.featuredProject} {String(index + 1).padStart(2, '0')}
                </div>
                <div className={`mt-0.5 text-xs font-bold ${theme.text}`}>
                  {project.category}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {project.live && (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.1em] text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400">
                  <span className="relative flex h-2 w-2">
                    {!reducedMotion && (
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                    )}
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                  </span>
                  {ui.live}
                </span>
              )}

              <motion.button
                type="button"
                onClick={() => copyProjectLink(project.id)}
                whileHover={reducedMotion ? undefined : { y: -2, scale: 1.03 }}
                whileTap={reducedMotion ? undefined : { scale: 0.94 }}
                aria-label={labels.copyLink}
                title={isCopied ? labels.copied : labels.copyLink}
                className="relative flex h-9 w-9 items-center justify-center rounded-xl border border-gray-200 bg-white/70 text-gray-500 shadow-sm outline-none transition-colors hover:border-blue-200 hover:text-blue-700 focus-visible:ring-2 focus-visible:ring-blue-500 dark:border-white/[0.07] dark:bg-white/[0.035] dark:text-gray-400 dark:hover:text-blue-300"
              >
                <AnimatePresence mode="wait" initial={false}>
                  {isCopied ? (
                    <motion.span
                      key="check"
                      initial={{ opacity: 0, scale: 0.5, rotate: -30 }}
                      animate={{ opacity: 1, scale: 1, rotate: 0 }}
                      exit={{ opacity: 0, scale: 0.5 }}
                    >
                      <FaCheck size={13} className="text-emerald-500" />
                    </motion.span>
                  ) : (
                    <motion.span
                      key="copy"
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.5 }}
                    >
                      <FaCopy size={13} />
                    </motion.span>
                  )}
                </AnimatePresence>

                <AnimatePresence>
                  {isCopied && (
                    <motion.span
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 4 }}
                      className="pointer-events-none absolute right-0 top-[calc(100%+8px)] z-50 whitespace-nowrap rounded-lg bg-gray-950 px-2.5 py-1.5 text-[10px] font-bold text-white shadow-xl dark:bg-white dark:text-gray-950"
                    >
                      {labels.copied}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>
          </div>

          {/* Main project layout */}
          <div className="relative z-10 grid gap-0 lg:grid-cols-[0.9fr_1.1fr]">
            {/* Sticky visual side */}
            <div className="relative border-b border-gray-200/70 p-5 dark:border-white/[0.06] sm:p-7 lg:border-b-0 lg:border-r lg:p-8">
              <motion.div
                style={{
                  rotateX: reducedMotion ? 0 : rotateX,
                  rotateY: reducedMotion ? 0 : rotateY,
                  transformStyle: 'preserve-3d',
                }}
                className="lg:sticky lg:top-32"
              >
                <ProjectVisual
                  project={project}
                  theme={theme}
                  ui={ui}
                  reducedMotion={reducedMotion}
                />

                {/* Quick project facts */}
                <div className="mt-4 grid grid-cols-3 overflow-hidden rounded-2xl border border-gray-200/70 bg-white/60 shadow-sm backdrop-blur-xl dark:border-white/[0.06] dark:bg-white/[0.025]">
                  <div className="px-2 py-3 text-center">
                    <div className="text-lg font-black text-gray-950 dark:text-white">
                      {project.technologies.length}
                    </div>
                    <div className="mt-0.5 text-[8px] font-black uppercase tracking-[0.08em] text-gray-400">
                      {ui.tech}
                    </div>
                  </div>

                  <div className="border-x border-gray-200/70 px-2 py-3 text-center dark:border-white/[0.06]">
                    <div className="text-lg font-black text-gray-950 dark:text-white">
                      {project.contributions.length}
                    </div>
                    <div className="mt-0.5 text-[8px] font-black uppercase tracking-[0.08em] text-gray-400">
                      {ui.contributionsShort}
                    </div>
                  </div>

                  <div className="px-2 py-3 text-center">
                    <div className={`text-lg font-black ${theme.text}`}>
                      {project.live ? 'LIVE' : 'CODE'}
                    </div>
                    <div className="mt-0.5 text-[8px] font-black uppercase tracking-[0.08em] text-gray-400">
                      {ui.status}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Details side */}
            <div className="p-6 sm:p-8 lg:p-10 xl:p-12">
              <motion.h3
                initial={{ opacity: 0, y: reducedMotion ? 0 : 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: reducedMotion ? 0 : 0.7 }}
                className="max-w-3xl text-3xl font-black leading-[1.05] tracking-[-0.045em] text-gray-950 dark:text-white sm:text-4xl xl:text-5xl"
              >
                {project.title}
              </motion.h3>

              <p className="mt-5 max-w-3xl text-base leading-relaxed text-gray-600 dark:text-gray-300 sm:text-lg">
                {project.description}
              </p>

              {/* Problem / solution */}
              <div className="mt-8 grid gap-4 xl:grid-cols-2">
                <motion.div
                  whileHover={reducedMotion ? undefined : { y: -4 }}
                  className="relative overflow-hidden rounded-2xl border border-rose-100 bg-rose-50/55 p-5 dark:border-rose-500/10 dark:bg-rose-500/[0.05]"
                >
                  <div className="mb-3 flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-rose-100 text-rose-600 dark:bg-rose-500/10 dark:text-rose-300">
                      <FaBolt size={12} />
                    </div>
                    <h4 className="font-black text-gray-950 dark:text-white">
                      {labels.problem}
                    </h4>
                  </div>
                  <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-300">
                    {project.problem}
                  </p>
                </motion.div>

                <motion.div
                  whileHover={reducedMotion ? undefined : { y: -4 }}
                  className={`relative overflow-hidden rounded-2xl border p-5 ${theme.softPanel}`}
                >
                  <div className="mb-3 flex items-center gap-2">
                    <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${theme.iconBg}`}>
                      <FaArrowRight size={11} />
                    </div>
                    <h4 className="font-black text-gray-950 dark:text-white">
                      {labels.solution}
                    </h4>
                  </div>
                  <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-300">
                    {project.solution}
                  </p>
                </motion.div>
              </div>

              {/* Ownership */}
              {project.ownership?.length > 0 && (
                <div className="mt-8">
                  <div className="mb-4 flex items-center gap-3">
                    <div className={`flex h-9 w-9 items-center justify-center rounded-xl ${theme.iconBg}`}>
                      <FaLayerGroup size={13} />
                    </div>
                    <div>
                      <h4 className="font-black text-gray-950 dark:text-white">
                        {labels.ownership}
                      </h4>
                      <p className="mt-0.5 text-xs text-gray-400">
                        {ui.ownershipSubtitle}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {project.ownership.map((item, itemIndex) => (
                      <motion.span
                        key={item}
                        initial={{ opacity: 0, y: 8 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: reducedMotion ? 0 : itemIndex * 0.035 }}
                        whileHover={reducedMotion ? undefined : { y: -3, scale: 1.035 }}
                        className={`relative overflow-hidden rounded-full border px-3 py-1.5 text-sm font-semibold shadow-sm ${theme.badge}`}
                      >
                        {item}
                      </motion.span>
                    ))}
                  </div>
                </div>
              )}

              {/* Highlights */}
              {project.highlights?.length > 0 && (
                <div className="mt-8">
                  <div className="mb-4 flex items-center gap-3">
                    <div className={`flex h-9 w-9 items-center justify-center rounded-xl ${theme.iconBg}`}>
                      <FaBolt size={13} />
                    </div>
                    <h4 className="font-black text-gray-950 dark:text-white">
                      {labels.highlights}
                    </h4>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2">
                    {project.highlights.map((highlight, highlightIndex) => (
                      <motion.div
                        key={highlight}
                        initial={{ opacity: 0, y: 12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: reducedMotion ? 0 : highlightIndex * 0.035 }}
                        whileHover={reducedMotion ? undefined : { y: -3 }}
                        className="flex items-start gap-3 rounded-xl border border-gray-200/70 bg-gray-50/60 p-3.5 dark:border-white/[0.05] dark:bg-white/[0.025]"
                      >
                        <span className={`mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full ${theme.iconBg}`}>
                          <FaCheck size={8} />
                        </span>
                        <span className="text-sm leading-relaxed text-gray-600 dark:text-gray-300">
                          {highlight}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {/* Contributions */}
              <div className="mt-9">
                <div className="mb-5 flex items-center gap-3">
                  <div className={`flex h-9 w-9 items-center justify-center rounded-xl ${theme.iconBg}`}>
                    <FaCode size={13} />
                  </div>
                  <div>
                    <h4 className="font-black text-gray-950 dark:text-white">
                      {labels.contributions}
                    </h4>
                    <p className="mt-0.5 text-xs text-gray-400">
                      {ui.engineeringSubtitle}
                    </p>
                  </div>
                </div>

                <div className="space-y-2.5">
                  {project.contributions.map((contribution, contributionIndex) => (
                    <motion.div
                      key={contribution}
                      initial={{ opacity: 0, x: reducedMotion ? 0 : -15 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: reducedMotion ? 0 : contributionIndex * 0.045 }}
                      whileHover={reducedMotion ? undefined : { x: 5 }}
                      className="group/item flex items-start gap-3 rounded-xl px-2 py-2 transition-colors hover:bg-gray-50 dark:hover:bg-white/[0.025]"
                    >
                      <span className={`mt-0.5 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg text-[9px] font-black ${theme.iconBg}`}>
                        {String(contributionIndex + 1).padStart(2, '0')}
                      </span>
                      <span className="leading-relaxed text-gray-600 dark:text-gray-300">
                        {contribution}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Metrics */}
              {project.metrics?.length > 0 && (
                <div className="mt-9">
                  <div className="mb-4 flex items-center gap-3">
                    <div className={`flex h-9 w-9 items-center justify-center rounded-xl ${theme.iconBg}`}>
                      <FaChartLine size={13} />
                    </div>
                    <h4 className="font-black text-gray-950 dark:text-white">
                      {labels.metrics}
                    </h4>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2">
                    {project.metrics.map((metric, metricIndex) => (
                      <motion.div
                        key={metric}
                        initial={{ opacity: 0, scale: reducedMotion ? 1 : 0.96 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: reducedMotion ? 0 : metricIndex * 0.05 }}
                        whileHover={reducedMotion ? undefined : { y: -4, scale: 1.01 }}
                        className={`relative overflow-hidden rounded-xl border p-4 ${theme.softPanel}`}
                      >
                        <motion.div
                          aria-hidden="true"
                          animate={
                            reducedMotion
                              ? undefined
                              : { x: ['-140%', '220%'] }
                          }
                          transition={{
                            duration: 2.8,
                            repeat: Infinity,
                            repeatDelay: 2 + metricIndex * 0.4,
                            ease: 'easeInOut',
                          }}
                          className="absolute inset-y-0 w-16 -skew-x-12 bg-gradient-to-r from-transparent via-white/35 to-transparent blur-lg dark:via-white/10"
                        />
                        <div className="relative flex items-start gap-3">
                          <span className={`mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-lg ${theme.iconBg}`}>
                            <FaChartLine size={9} />
                          </span>
                          <span className="text-sm font-semibold leading-relaxed text-gray-700 dark:text-gray-200">
                            {metric}
                          </span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tech stack */}
              <div className="mt-9 border-t border-gray-200/70 pt-7 dark:border-white/[0.06]">
                <div className="mb-4 flex items-center gap-3">
                  <div className={`flex h-9 w-9 items-center justify-center rounded-xl ${theme.iconBg}`}>
                    <FaTerminal size={13} />
                  </div>
                  <div>
                    <h4 className="font-black text-gray-950 dark:text-white">
                      {labels.techStack}
                    </h4>
                    <p className="mt-0.5 text-xs text-gray-400">
                      {ui.stackSubtitle}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, techIndex) => (
                    <motion.span
                      key={tech}
                      initial={{ opacity: 0, y: 8 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: reducedMotion ? 0 : techIndex * 0.035 }}
                      whileHover={reducedMotion ? undefined : { y: -3, scale: 1.045 }}
                      className={`group/tech relative cursor-default overflow-hidden rounded-full border px-3 py-1.5 text-sm font-bold shadow-sm ${theme.badge}`}
                    >
                      <span className="absolute inset-0 -translate-x-[130%] bg-gradient-to-r from-transparent via-white/60 to-transparent transition-transform duration-700 group-hover/tech:translate-x-[130%] dark:via-white/10" />
                      <span className="relative">{tech}</span>
                    </motion.span>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="mt-9 flex flex-wrap gap-3">
                <MagneticAction
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  reducedMotion={reducedMotion}
                  className="group/action inline-flex items-center gap-2 rounded-xl bg-gray-950 px-5 py-3 font-bold text-white shadow-lg shadow-gray-950/10 outline-none transition-colors hover:bg-gray-800 focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2 dark:bg-white dark:text-gray-950 dark:hover:bg-gray-100 dark:focus-visible:ring-offset-gray-950"
                >
                  <FaGithub aria-hidden="true" />
                  {labels.github}
                  <FaArrowRight className="text-xs transition-transform duration-300 group-hover/action:translate-x-1" />
                </MagneticAction>

                {project.live && (
                  <MagneticAction
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    reducedMotion={reducedMotion}
                    className={`group/action inline-flex items-center gap-2 rounded-xl px-5 py-3 font-bold text-white shadow-lg outline-none transition-all focus-visible:ring-2 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-gray-950 ${theme.primaryButton}`}
                  >
                    <FaExternalLinkAlt aria-hidden="true" />
                    {labels.liveDemo}
                    <FaArrowRight className="text-xs transition-transform duration-300 group-hover/action:translate-x-1" />
                  </MagneticAction>
                )}

                <motion.button
                  type="button"
                  onClick={() => copyProjectLink(project.id)}
                  whileHover={reducedMotion ? undefined : { y: -3 }}
                  whileTap={reducedMotion ? undefined : { scale: 0.96 }}
                  className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white/70 px-5 py-3 font-bold text-gray-700 shadow-sm backdrop-blur-xl transition-colors hover:border-blue-200 hover:text-blue-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:border-white/[0.07] dark:bg-white/[0.035] dark:text-gray-300 dark:hover:text-blue-300"
                >
                  {isCopied ? (
                    <FaCheck className="text-emerald-500" aria-hidden="true" />
                  ) : (
                    <FaLink aria-hidden="true" />
                  )}
                  {isCopied ? labels.copied : labels.copyLink}
                </motion.button>
              </div>
            </div>
          </div>

          {/* Bottom accent */}
          <div className="relative z-10 flex items-center gap-4 border-t border-gray-200/70 px-6 py-4 dark:border-white/[0.06] sm:px-8">
            <span className="text-[10px] font-black tracking-[0.15em] text-gray-400">
              {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
            </span>

            <div className="h-[2px] flex-1 overflow-hidden rounded-full bg-gray-100 dark:bg-gray-800">
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: reducedMotion ? 0 : 0.9, delay: 0.15 }}
                style={{ transformOrigin: 'left' }}
                className={`h-full w-full bg-gradient-to-r ${theme.gradient}`}
              />
            </div>

            <span className={`text-[10px] font-black uppercase tracking-[0.12em] ${theme.text}`}>
              {project.name}
            </span>
          </div>
        </div>
      </div>
    </motion.article>
  );
};

const FeaturedProjects = () => {
  const { language } = useContext(LanguageContext);
  const t = translations[language];

  const sectionRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();

  const [copiedProjectId, setCopiedProjectId] = useState(null);
  const [activeProjectId, setActiveProjectId] = useState('aviora');

  const labels = {
    en: {
      problem: 'Problem',
      solution: 'Solution',
      contributions: 'Engineering Contributions',
      highlights: 'Product Highlights',
      ownership: 'Project Ownership',
      metrics: 'Performance Metrics',
      techStack: 'Tech Stack',
      liveDemo: 'Live Demo',
      github: 'View GitHub',
      copyLink: 'Copy Project Link',
      copied: 'Link Copied',
      copyFallback: 'Copy this project link:',
    },

    tr: {
      problem: 'Problem',
      solution: 'Çözüm',
      contributions: 'Mühendislik Katkıları',
      highlights: 'Ürün Özellikleri',
      ownership: 'Projedeki Sorumluluklarım',
      metrics: 'Performans Metrikleri',
      techStack: 'Teknoloji Yığını',
      liveDemo: 'Canlı Demo',
      github: "GitHub'ı Gör",
      copyLink: 'Proje Linkini Kopyala',
      copied: 'Link Kopyalandı',
      copyFallback: 'Bu proje linkini kopyalayın:',
    },

    de: {
      problem: 'Problem',
      solution: 'Lösung',
      contributions: 'Technische Beiträge',
      highlights: 'Produkt-Highlights',
      ownership: 'Projektverantwortung',
      metrics: 'Performance-Metriken',
      techStack: 'Technologie-Stack',
      liveDemo: 'Live-Demo',
      github: 'GitHub ansehen',
      copyLink: 'Projektlink kopieren',
      copied: 'Link kopiert',
      copyFallback: 'Diesen Projektlink kopieren:',
    },
  };

  const projectsData = {
    en: [
      {
        id: 'agent-evidence',
        name: 'Agent Evidence',
        category: 'AI Agent Payment Security Lab',
        title: 'Agent Evidence — AI Agent Payment Security Lab',

        description:
          'A security-focused engineering project for testing payment workflows involving AI agents, combining frontend/backend integration, API architecture, domain modeling, and deterministic risk evaluation.',

        problem:
          'AI agents capable of making or managing payments require deterministic and testable safeguards for known payment risks and attack scenarios.',

        solution:
          'Built a payment-security testing platform with deterministic risk rules, structured domain modeling, validation, and security-conscious API workflows.',

        ownership: [
          'API architecture',
          'Backend development',
          'Domain modeling',
          'Risk-rule implementation',
          'Testing and validation',
          'Docker environment',
        ],

        highlights: [
          '6 core domain entities',
          '10 deterministic payment-risk rules',
          'Merchant attack scenarios',
          'Structured security logging',
          'Payload limits and redaction',
          'Docker-based development environment',
        ],

        contributions: [
          'Designed REST API architecture with FastAPI',
          'Implemented 6 core domain entities with SQLAlchemy',
          'Created 10 deterministic payment-risk rules',
          'Built merchant attack scenarios and testing workflows',
          'Implemented validation with Pydantic',
          'Added payload limits, redaction, and structured logging',
          'Set up Docker Compose quality gates',
        ],

        technologies: [
          'React',
          'TypeScript',
          'FastAPI',
          'REST APIs',
          'SQLAlchemy',
          'Pydantic',
          'Docker',
          'pytest',
        ],

        metrics: null,

        github: 'https://github.com/SkyBlueHeat',
        live: null,
      },

      {
        id: 'aviora',
        name: 'Aviora',
        category: 'Career Management Platform',
        title: 'Aviora — Career Management Platform',

        description:
          'A career-management platform designed to bring job applications, interviews, analytics, and follow-up workflows into one organized product experience.',

        problem:
          'Job seekers often manage applications across multiple platforms, making applications, interviews, and follow-ups difficult to track in one place.',

        solution:
          'Built a comprehensive career management platform with application tracking, Kanban workflows, analytics, and interview preparation tools.',

        ownership: [
          'Product architecture',
          'Frontend development',
          'Python utilities',
          'Testing strategy',
          'Performance optimization',
        ],

        contributions: [
          'Designed and developed the product independently as a full-stack application',
          'Built reusable UI architecture with React and TypeScript',
          'Implemented application workflows with Kanban state management',
          'Added automated testing with Playwright and Vitest',
          'Implemented accessibility-conscious UI states',
          'Performed performance profiling and optimization',
        ],

        technologies: [
          'React',
          'TypeScript',
          'Python',
          'PyWebView',
          'Playwright',
          'Vitest',
        ],

        metrics: [
          'Mobile Lighthouse Performance: 94–98',
          'Largest Contentful Paint (LCP): 1.9–2.3 seconds',
          'Total Blocking Time (TBT): 26–98 ms',
          'Measured across 6 geographic regions',
        ],

        github: 'https://github.com/SkyBlueHeat/Aviora-Showcase',
        live: 'https://aviora-eight.vercel.app/',
      },

      {
        id: 'motionkit',
        name: 'MotionKit',
        category: 'Programmatic Motion Design System',
        title: 'MotionKit — Programmatic Motion Design System',

        description:
          'A reusable motion graphics system built with React, TypeScript, and Remotion for producing polished, data-driven video through reusable typed components.',

        problem:
          'One-off motion graphics workflows often duplicate animation logic and make it difficult to maintain consistent timing, styling, responsive formats, and rendering behavior.',

        solution:
          'Built a component-driven motion design system with typed APIs, centralized motion tokens, reusable transitions, responsive formats, themes, and deterministic frame-based rendering.',

        ownership: [
          'Component architecture',
          'Typed API design',
          'Motion system design',
          'Responsive formats',
          'Rendering workflow',
        ],

        highlights: [
          'Reusable typed motion components',
          'Kinetic typography and animated titles',
          'Animated statistics and data visualization',
          'Centralized timing, easing, stagger, and motion tokens',
          'Reusable scene transitions',
          '16:9, 9:16, and 1:1 responsive video formats',
          'Data-driven and parameterized video generation',
          'Deterministic frame-based rendering',
        ],

        contributions: [
          'Designed reusable React and TypeScript motion architecture',
          'Created typed APIs for motion composition and parameters',
          'Built reusable typography, lower-third, statistics, chart, and quote components',
          'Implemented centralized timing and animation tokens',
          'Built reusable transitions and motion patterns',
          'Implemented responsive output formats',
          'Enabled data-driven video generation from structured content',
          'Implemented deterministic rendering for consistent output',
        ],

        technologies: [
          'React',
          'TypeScript',
          'Remotion 4',
        ],

        metrics: null,

        github: 'https://github.com/SkyBlueHeat/MotionKit',
        live: 'https://motion-kit-drab.vercel.app/',
      },
    ],

    tr: [
      {
        id: 'agent-evidence',
        name: 'Agent Evidence',
        category: 'AI Agent Ödeme Güvenliği Laboratuvarı',
        title: 'Agent Evidence — AI Agent Ödeme Güvenliği Laboratuvarı',

        description:
          'AI agent ödeme süreçlerinin güvenliğini test etmeye odaklanan; frontend/backend entegrasyonu, API mimarisi, domain modelleme ve deterministik risk değerlendirmesini bir araya getiren güvenlik projesi.',

        problem:
          'Ödeme yapabilen veya ödeme süreçlerini yönetebilen AI agent sistemlerinin, bilinen ödeme riskleri ve saldırı senaryoları için deterministik ve test edilebilir güvenlik kontrollerine ihtiyacı bulunuyor.',

        solution:
          'Deterministik risk kuralları, domain modelleme, doğrulama ve güvenlik odaklı API workflow’ları içeren bir ödeme güvenliği test platformu geliştirdim.',

        ownership: [
          'API mimarisi',
          'Backend geliştirme',
          'Domain modelleme',
          'Risk kurallarının geliştirilmesi',
          'Test ve doğrulama',
          'Docker ortamı',
        ],

        highlights: [
          '6 temel domain entity',
          '10 deterministik ödeme riski kuralı',
          'Merchant saldırı senaryoları',
          'Yapılandırılmış güvenlik logging sistemi',
          'Payload limitleri ve redaction',
          'Docker tabanlı geliştirme ortamı',
        ],

        contributions: [
          'FastAPI ile REST API mimarisi tasarladım',
          'SQLAlchemy ile 6 temel domain entity geliştirdim',
          '10 deterministik ödeme riski kuralı oluşturdum',
          'Merchant saldırı senaryoları ve test workflow’ları geliştirdim',
          'Pydantic ile doğrulama yapıları uyguladım',
          'Payload limitleri, redaction ve structured logging ekledim',
          'Docker Compose quality gate yapısı kurdum',
        ],

        technologies: [
          'React',
          'TypeScript',
          'FastAPI',
          "REST API'ler",
          'SQLAlchemy',
          'Pydantic',
          'Docker',
          'pytest',
        ],

        metrics: null,

        github: 'https://github.com/SkyBlueHeat',
        live: null,
      },

      {
        id: 'aviora',
        name: 'Aviora',
        category: 'Kariyer Yönetim Platformu',
        title: 'Aviora — Kariyer Yönetim Platformu',

        description:
          'İş başvurularını, mülakatları, analizleri ve takip süreçlerini tek bir düzenli ürün deneyiminde bir araya getiren kariyer yönetim platformu.',

        problem:
          'İş arayanlar başvurularını birden fazla platform üzerinden takip etmek zorunda kaldığı için başvuru, mülakat ve takip süreçlerini tek yerde yönetmek zorlaşabiliyor.',

        solution:
          'Başvuru takibi, Kanban workflow’ları, analizler ve mülakat hazırlık araçlarını içeren kapsamlı bir kariyer yönetim platformu geliştirdim.',

        ownership: [
          'Ürün mimarisi',
          'Frontend geliştirme',
          'Python araçları',
          'Test stratejisi',
          'Performans optimizasyonu',
        ],

        contributions: [
          'Ürünü bağımsız olarak full-stack bir uygulama şeklinde tasarlayıp geliştirdim',
          'React ve TypeScript ile yeniden kullanılabilir UI mimarisi oluşturdum',
          'Kanban durum yönetimiyle başvuru workflow’ları geliştirdim',
          'Playwright ve Vitest ile otomatik testler ekledim',
          'Erişilebilirliği dikkate alan UI durumları geliştirdim',
          'Performans profilleme ve optimizasyon çalışmaları gerçekleştirdim',
        ],

        technologies: [
          'React',
          'TypeScript',
          'Python',
          'PyWebView',
          'Playwright',
          'Vitest',
        ],

        metrics: [
          'Mobil Lighthouse Performansı: 94–98',
          'Largest Contentful Paint (LCP): 1.9–2.3 saniye',
          'Total Blocking Time (TBT): 26–98 ms',
          '6 farklı coğrafi bölgede ölçüldü',
        ],

        github: 'https://github.com/SkyBlueHeat/Aviora-Showcase',
        live: 'https://aviora-eight.vercel.app/',
      },

      {
        id: 'motionkit',
        name: 'MotionKit',
        category: 'Programatik Motion Design Sistemi',
        title: 'MotionKit — Programatik Motion Design Sistemi',

        description:
          'React, TypeScript ve Remotion ile geliştirilen; yeniden kullanılabilir ve tip güvenli bileşenlerle veri odaklı video üretimi sağlayan motion graphics sistemi.',

        problem:
          'Tek seferlik motion graphics workflow’ları animasyon mantığının tekrar edilmesine ve zamanlama, stil, responsive formatlar ve rendering davranışında tutarlılığın zorlaşmasına neden olabiliyor.',

        solution:
          'Typed API’ler, merkezi motion token’ları, yeniden kullanılabilir geçişler, responsive formatlar, temalar ve deterministik frame tabanlı rendering içeren bileşen tabanlı bir motion design sistemi geliştirdim.',

        ownership: [
          'Bileşen mimarisi',
          'Typed API tasarımı',
          'Motion sistem tasarımı',
          'Responsive formatlar',
          'Rendering workflow’u',
        ],

        highlights: [
          'Yeniden kullanılabilir tip güvenli motion bileşenleri',
          'Kinetic typography ve animasyonlu başlıklar',
          'Animasyonlu istatistikler ve veri görselleştirme',
          'Merkezi timing, easing, stagger ve motion token sistemi',
          'Yeniden kullanılabilir scene transition’lar',
          '16:9, 9:16 ve 1:1 responsive video formatları',
          'Veri odaklı ve parametreli video üretimi',
          'Deterministik frame tabanlı rendering',
        ],

        contributions: [
          'React ve TypeScript ile yeniden kullanılabilir motion mimarisi tasarladım',
          'Motion composition ve parametreler için typed API’ler geliştirdim',
          'Typography, lower-third, statistic, chart ve quote bileşenleri oluşturdum',
          'Merkezi timing ve animation token sistemi geliştirdim',
          'Yeniden kullanılabilir transition ve motion pattern’ları oluşturdum',
          'Responsive çıktı formatları geliştirdim',
          'Yapılandırılmış verilerden veri odaklı video üretimini mümkün hale getirdim',
          'Tutarlı sonuçlar için deterministik rendering uyguladım',
        ],

        technologies: [
          'React',
          'TypeScript',
          'Remotion 4',
        ],

        metrics: null,

        github: 'https://github.com/SkyBlueHeat/MotionKit',
        live: 'https://motion-kit-drab.vercel.app/',
      },
    ],

    de: [
      {
        id: 'agent-evidence',
        name: 'Agent Evidence',
        category: 'Labor für KI-Agenten-Zahlungssicherheit',
        title: 'Agent Evidence — Labor für KI-Agenten-Zahlungssicherheit',

        description:
          'Ein Security-Engineering-Projekt zur Prüfung von Zahlungsworkflows mit KI-Agenten, das Frontend-/Backend-Integration, API-Architektur, Domänenmodellierung und deterministische Risikobewertung kombiniert.',

        problem:
          'KI-Agenten, die Zahlungen ausführen oder verwalten können, benötigen deterministische und testbare Sicherheitskontrollen für bekannte Zahlungsrisiken und Angriffsszenarien.',

        solution:
          'Entwicklung einer Payment-Security-Testplattform mit deterministischen Risikoregeln, Domänenmodellierung, Validierung und sicherheitsorientierten API-Workflows.',

        ownership: [
          'API-Architektur',
          'Backend-Entwicklung',
          'Domänenmodellierung',
          'Implementierung der Risikoregeln',
          'Testing und Validierung',
          'Docker-Umgebung',
        ],

        highlights: [
          '6 zentrale Domänenentitäten',
          '10 deterministische Zahlungsrisikoregeln',
          'Merchant-Angriffsszenarien',
          'Strukturiertes Security-Logging',
          'Payload-Limits und Redaction',
          'Docker-basierte Entwicklungsumgebung',
        ],

        contributions: [
          'REST-API-Architektur mit FastAPI entwickelt',
          '6 zentrale Domänenentitäten mit SQLAlchemy implementiert',
          '10 deterministische Zahlungsrisikoregeln erstellt',
          'Angriffsszenarien und Test-Workflows entwickelt',
          'Validierung mit Pydantic implementiert',
          'Payload-Limits, Redaction und strukturiertes Logging hinzugefügt',
          'Docker-Compose-Quality-Gates eingerichtet',
        ],

        technologies: [
          'React',
          'TypeScript',
          'FastAPI',
          'REST-APIs',
          'SQLAlchemy',
          'Pydantic',
          'Docker',
          'pytest',
        ],

        metrics: null,

        github: 'https://github.com/SkyBlueHeat',
        live: null,
      },

      {
        id: 'aviora',
        name: 'Aviora',
        category: 'Karriere-Management-Plattform',
        title: 'Aviora — Karriere-Management-Plattform',

        description:
          'Eine Karriere-Management-Plattform, die Bewerbungen, Vorstellungsgespräche, Analysen und Follow-up-Prozesse in einem strukturierten Produkt zusammenführt.',

        problem:
          'Bewerber verwalten ihre Bewerbungen häufig über mehrere Plattformen, wodurch Bewerbungen, Interviews und Follow-ups nur schwer an einem zentralen Ort nachverfolgt werden können.',

        solution:
          'Entwicklung einer umfassenden Karriere-Management-Plattform mit Bewerbungstracking, Kanban-Workflows, Analysen und Werkzeugen zur Interviewvorbereitung.',

        ownership: [
          'Produktarchitektur',
          'Frontend-Entwicklung',
          'Python-Werkzeuge',
          'Teststrategie',
          'Performance-Optimierung',
        ],

        contributions: [
          'Das Produkt eigenständig als Full-Stack-Anwendung konzipiert und entwickelt',
          'Wiederverwendbare UI-Architektur mit React und TypeScript entwickelt',
          'Bewerbungs-Workflows mit Kanban-State-Management implementiert',
          'Automatisierte Tests mit Playwright und Vitest hinzugefügt',
          'Barrierebewusste UI-Zustände implementiert',
          'Performance-Profiling und Optimierungen durchgeführt',
        ],

        technologies: [
          'React',
          'TypeScript',
          'Python',
          'PyWebView',
          'Playwright',
          'Vitest',
        ],

        metrics: [
          'Mobile Lighthouse Performance: 94–98',
          'Largest Contentful Paint (LCP): 1,9–2,3 Sekunden',
          'Total Blocking Time (TBT): 26–98 ms',
          'Messungen in 6 geografischen Regionen',
        ],

        github: 'https://github.com/SkyBlueHeat/Aviora-Showcase',
        live: 'https://aviora-eight.vercel.app/',
      },

      {
        id: 'motionkit',
        name: 'MotionKit',
        category: 'Programmgesteuertes Motion-Design-System',
        title: 'MotionKit — Programmgesteuertes Motion-Design-System',

        description:
          'Ein wiederverwendbares Motion-Graphics-System mit React, TypeScript und Remotion zur Erstellung typsicherer und datengesteuerter Videos.',

        problem:
          'Einmalige Motion-Graphics-Workflows führen häufig zu duplizierter Animationslogik und erschweren konsistente Timings, Styles, responsive Formate und Rendering-Verhalten.',

        solution:
          'Entwicklung eines komponentenbasierten Motion-Design-Systems mit typisierten APIs, zentralen Motion-Tokens, wiederverwendbaren Übergängen, responsiven Formaten, Themes und deterministischem framebasiertem Rendering.',

        ownership: [
          'Komponentenarchitektur',
          'Design typisierter APIs',
          'Motion-System',
          'Responsive Formate',
          'Rendering-Workflow',
        ],

        highlights: [
          'Wiederverwendbare typsichere Motion-Komponenten',
          'Kinetic Typography und animierte Titel',
          'Animierte Statistiken und Datenvisualisierung',
          'Zentrale Timing-, Easing-, Stagger- und Motion-Tokens',
          'Wiederverwendbare Scene Transitions',
          'Responsive Videoformate in 16:9, 9:16 und 1:1',
          'Datengesteuerte und parametrisierte Videogenerierung',
          'Deterministisches framebasiertes Rendering',
        ],

        contributions: [
          'Wiederverwendbare Motion-Architektur mit React und TypeScript entwickelt',
          'Typisierte APIs für Motion-Komposition und Parameter implementiert',
          'Typography-, Lower-Third-, Statistik-, Chart- und Quote-Komponenten entwickelt',
          'Zentrales Timing- und Animation-Token-System aufgebaut',
          'Wiederverwendbare Übergänge und Motion-Patterns erstellt',
          'Responsive Ausgabeformate implementiert',
          'Datengesteuerte Videogenerierung aus strukturierten Daten ermöglicht',
          'Deterministisches Rendering für konsistente Ergebnisse implementiert',
        ],

        technologies: [
          'React',
          'TypeScript',
          'Remotion 4',
        ],

        metrics: null,

        github: 'https://github.com/SkyBlueHeat/MotionKit',
        live: 'https://motion-kit-drab.vercel.app/',
      },
    ],
  };


  const projects = projectsData[language] || projectsData.en;
  const currentLabels = labels[language] || labels.en;

  const extraLabels = {
    en: {
      sectionTag: 'Selected Engineering Work',
      selectedWorks: 'Featured Projects',
      projects: 'Projects',
      technologies: 'Technologies',
      engineeringPoints: 'Engineering Points',
      featuredProject: 'Featured Project',
      live: 'Live',
      tech: 'Tech',
      contributionsShort: 'Build',
      status: 'Status',
      ownershipSubtitle: 'Areas owned across product and engineering',
      engineeringSubtitle: 'Key implementation and architecture work',
      stackSubtitle: 'Core tools used to build the project',
      dashboard: 'Career Dashboard',
      applied: 'Applied',
      interview: 'Interview',
      followUp: 'Follow-up',
      analytics: 'Performance',
      securityLab: 'Payment Security Lab',
      secure: 'Secure',
      riskEngine: 'Risk Engine',
      rules: 'Rules',
      entities: 'Entities',
      validation: 'Validation',
      logging: 'Logging',
      motionSystem: 'Motion System',
      timeline: 'Timeline',
      navigation: 'Project Navigation',
      scrollHint: 'Scroll through selected work',
    },

    tr: {
      sectionTag: 'Seçilmiş Mühendislik Çalışmaları',
      selectedWorks: 'Öne Çıkan Projeler',
      projects: 'Proje',
      technologies: 'Teknoloji',
      engineeringPoints: 'Mühendislik Katkısı',
      featuredProject: 'Öne Çıkan Proje',
      live: 'Canlı',
      tech: 'Teknoloji',
      contributionsShort: 'Katkı',
      status: 'Durum',
      ownershipSubtitle: 'Ürün ve mühendislik tarafında üstlenilen alanlar',
      engineeringSubtitle: 'Temel geliştirme ve mimari çalışmaları',
      stackSubtitle: 'Projeyi geliştirmek için kullanılan temel araçlar',
      dashboard: 'Kariyer Paneli',
      applied: 'Başvuru',
      interview: 'Mülakat',
      followUp: 'Takip',
      analytics: 'Performans',
      securityLab: 'Ödeme Güvenliği Laboratuvarı',
      secure: 'Güvenli',
      riskEngine: 'Risk Motoru',
      rules: 'Kural',
      entities: 'Varlık',
      validation: 'Doğrulama',
      logging: 'Kayıt',
      motionSystem: 'Motion Sistemi',
      timeline: 'Zaman Çizgisi',
      navigation: 'Proje Navigasyonu',
      scrollHint: 'Seçilmiş projeleri keşfet',
    },

    de: {
      sectionTag: 'Ausgewählte Engineering-Projekte',
      selectedWorks: 'Ausgewählte Projekte',
      projects: 'Projekte',
      technologies: 'Technologien',
      engineeringPoints: 'Engineering-Beiträge',
      featuredProject: 'Ausgewähltes Projekt',
      live: 'Live',
      tech: 'Tech',
      contributionsShort: 'Beiträge',
      status: 'Status',
      ownershipSubtitle: 'Verantwortete Bereiche in Produkt und Engineering',
      engineeringSubtitle: 'Wichtige Implementierungs- und Architekturarbeit',
      stackSubtitle: 'Zentrale Technologien des Projekts',
      dashboard: 'Karriere-Dashboard',
      applied: 'Bewerbung',
      interview: 'Interview',
      followUp: 'Follow-up',
      analytics: 'Performance',
      securityLab: 'Payment-Security-Lab',
      secure: 'Sicher',
      riskEngine: 'Risk Engine',
      rules: 'Regeln',
      entities: 'Entitäten',
      validation: 'Validierung',
      logging: 'Logging',
      motionSystem: 'Motion-System',
      timeline: 'Timeline',
      navigation: 'Projektnavigation',
      scrollHint: 'Ausgewählte Projekte entdecken',
    },
  };

  const ui = extraLabels[language] || extraLabels.en;

  const projectThemes = {
    aviora: {
      text: 'text-blue-700 dark:text-blue-300',
      border: 'border-blue-200/80 dark:border-blue-500/20',
      glow: 'bg-blue-500/20',
      badge: 'border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-500/15 dark:bg-blue-500/10 dark:text-blue-300',
      iconBg: 'bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-300',
      gradient: 'from-blue-700 via-cyan-500 to-sky-400',
      visualBg: 'from-blue-100/90 via-white to-cyan-100/70 dark:from-blue-950/50 dark:via-gray-950 dark:to-cyan-950/25',
      softPanel: 'border-blue-100 bg-blue-50/[0.65] dark:border-blue-500/10 dark:bg-blue-500/[0.06]',
      primaryButton: 'bg-blue-700 shadow-blue-900/20 hover:bg-blue-600 focus-visible:ring-blue-500',
      bar: 'bg-gradient-to-t from-blue-700 to-cyan-400',
      orbitBorder: 'border-blue-400/30 dark:border-blue-400/15',
      spotlight: 'rgba(37, 99, 235, 0.11)',
    },

    'agent-evidence': {
      text: 'text-emerald-700 dark:text-emerald-300',
      border: 'border-emerald-200/80 dark:border-emerald-500/20',
      glow: 'bg-emerald-500/[0.18]',
      badge: 'border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-500/15 dark:bg-emerald-500/10 dark:text-emerald-300',
      iconBg: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300',
      gradient: 'from-emerald-700 via-teal-500 to-cyan-400',
      visualBg: 'from-emerald-100/80 via-white to-teal-100/60 dark:from-emerald-950/45 dark:via-gray-950 dark:to-teal-950/25',
      softPanel: 'border-emerald-100 bg-emerald-50/[0.65] dark:border-emerald-500/10 dark:bg-emerald-500/[0.06]',
      primaryButton: 'bg-emerald-700 shadow-emerald-900/20 hover:bg-emerald-600 focus-visible:ring-emerald-500',
      bar: 'bg-gradient-to-t from-emerald-700 to-cyan-400',
      orbitBorder: 'border-emerald-400/30 dark:border-emerald-400/15',
      spotlight: 'rgba(5, 150, 105, 0.10)',
    },

    motionkit: {
      text: 'text-violet-700 dark:text-violet-300',
      border: 'border-violet-200/80 dark:border-violet-500/20',
      glow: 'bg-violet-500/20',
      badge: 'border-violet-200 bg-violet-50 text-violet-700 dark:border-violet-500/15 dark:bg-violet-500/10 dark:text-violet-300',
      iconBg: 'bg-violet-100 text-violet-700 dark:bg-violet-500/10 dark:text-violet-300',
      gradient: 'from-violet-700 via-fuchsia-500 to-cyan-400',
      visualBg: 'from-violet-100/90 via-white to-fuchsia-100/60 dark:from-violet-950/45 dark:via-gray-950 dark:to-fuchsia-950/25',
      softPanel: 'border-violet-100 bg-violet-50/[0.65] dark:border-violet-500/10 dark:bg-violet-500/[0.06]',
      primaryButton: 'bg-violet-700 shadow-violet-900/20 hover:bg-violet-600 focus-visible:ring-violet-500',
      bar: 'bg-gradient-to-t from-violet-700 to-fuchsia-400',
      orbitBorder: 'border-violet-400/30 dark:border-violet-400/15',
      spotlight: 'rgba(124, 58, 237, 0.10)',
    },
  };

  const decorativeCode = [
    { text: '<projects />', position: 'left-[3%] top-[9%]', size: 'text-6xl', duration: 9 },
    { text: 'npm run build', position: 'right-[3%] top-[16%]', size: 'text-4xl', duration: 11 },
    { text: '{...props}', position: 'left-[5%] top-[30%]', size: 'text-5xl', duration: 8 },
    { text: '200 OK', position: 'right-[4%] top-[39%]', size: 'text-5xl', duration: 10 },
    { text: 'await', position: 'left-[4%] top-[52%]', size: 'text-6xl', duration: 8.5 },
    { text: 'API', position: 'right-[5%] top-[61%]', size: 'text-7xl', duration: 9.5 },
    { text: 'git push', position: 'left-[5%] top-[73%]', size: 'text-5xl', duration: 10.5 },
    { text: 'render()', position: 'right-[4%] top-[83%]', size: 'text-5xl', duration: 8 },
    { text: '</>', position: 'left-[7%] top-[92%]', size: 'text-7xl', duration: 9 },
  ];

  const uniqueTechnologyCount = new Set(
    projects.flatMap((project) => project.technologies)
  ).size;

  const engineeringPointCount = projects.reduce(
    (total, project) => total + project.contributions.length,
    0
  );

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 85%', 'end 15%'],
  });

  const sectionProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 25,
    mass: 0.35,
  });

  const backgroundY = useTransform(
    scrollYProgress,
    [0, 1],
    [prefersReducedMotion ? 0 : 100, prefersReducedMotion ? 0 : -100]
  );

  const copyProjectLink = async (projectId) => {
    const projectUrl = `${window.location.origin}${window.location.pathname}#${projectId}`;

    try {
      await navigator.clipboard.writeText(projectUrl);
      setCopiedProjectId(projectId);

      window.setTimeout(() => {
        setCopiedProjectId((currentId) =>
          currentId === projectId ? null : currentId
        );
      }, 2000);
    } catch (error) {
      window.prompt(currentLabels.copyFallback, projectUrl);
    }
  };

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative isolate overflow-hidden bg-gray-50 py-20 dark:bg-gray-950 lg:py-28"
    >
      {/* =================================================
          BACKGROUND GRID
      ================================================== */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-20 opacity-70 dark:opacity-30"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(37,99,235,0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(37,99,235,0.05) 1px, transparent 1px)
          `,
          backgroundSize: '52px 52px',
          WebkitMaskImage:
            'linear-gradient(to bottom, transparent, black 10%, black 92%, transparent)',
          maskImage:
            'linear-gradient(to bottom, transparent, black 10%, black 92%, transparent)',
        }}
      />

      {/* Section glows */}
      <motion.div
        aria-hidden="true"
        style={{ y: backgroundY }}
        className="pointer-events-none absolute -left-72 top-[12%] -z-10 h-[42rem] w-[42rem] rounded-full bg-blue-400/10 blur-[150px] dark:bg-blue-600/[0.08]"
      />

      <motion.div
        aria-hidden="true"
        style={{ y: backgroundY }}
        className="pointer-events-none absolute -right-72 top-[48%] -z-10 h-[44rem] w-[44rem] rounded-full bg-violet-400/10 blur-[160px] dark:bg-violet-600/[0.07]"
      />

      {/* Floating code atmosphere */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 hidden overflow-hidden lg:block">
        {decorativeCode.map((item, index) => (
          <motion.span
            key={`${item.text}-${index}`}
            className={`absolute select-none whitespace-nowrap font-mono font-black leading-none text-blue-950/[0.022] dark:text-blue-200/[0.03] ${item.position} ${item.size}`}
            animate={
              prefersReducedMotion
                ? undefined
                : {
                    x: [0, index % 2 === 0 ? 10 : -10, 0],
                    y: [0, index % 2 === 0 ? -15 : 15, 0],
                    rotate: [0, index % 2 === 0 ? 3 : -3, 0],
                  }
            }
            transition={{
              duration: item.duration,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: index * 0.3,
            }}
          >
            {item.text}
          </motion.span>
        ))}
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* =================================================
            HEADER
        ================================================== */}
        <motion.div
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 45 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.45 }}
          transition={{
            duration: prefersReducedMotion ? 0 : 0.85,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="mx-auto mb-10 max-w-4xl text-center lg:mb-12"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="mb-5 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white/75 px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-blue-800 shadow-sm backdrop-blur-xl dark:border-blue-500/15 dark:bg-white/[0.035] dark:text-blue-300"
          >
            <FaCube size={12} />
            {ui.sectionTag}
          </motion.div>

          <motion.h2
            initial={{
              opacity: 0,
              filter: prefersReducedMotion ? 'blur(0px)' : 'blur(12px)',
            }}
            whileInView={{ opacity: 1, filter: 'blur(0px)' }}
            viewport={{ once: true }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.85, delay: 0.08 }}
            className="text-4xl font-black tracking-[-0.05em] text-gray-950 dark:text-white sm:text-5xl lg:text-7xl"
          >
            {t.projects.title}
          </motion.h2>

          <div className="mx-auto mt-5 h-1 w-28 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-800">
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: prefersReducedMotion ? 0 : 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              style={{ transformOrigin: 'left' }}
              className="h-full w-full bg-gradient-to-r from-blue-700 via-cyan-500 to-violet-500"
            />
          </div>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.18, duration: prefersReducedMotion ? 0 : 0.7 }}
            className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-gray-600 dark:text-gray-300 sm:text-xl"
          >
            {t.projects.subtitle}
          </motion.p>

          {/* Section stats */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.28 }}
            className="mx-auto mt-8 grid max-w-2xl grid-cols-3 overflow-hidden rounded-2xl border border-gray-200/70 bg-white/[0.65] shadow-sm backdrop-blur-xl dark:border-white/[0.06] dark:bg-white/[0.025]"
          >
            <div className="px-3 py-4 text-center">
              <div className="text-2xl font-black text-gray-950 dark:text-white">{projects.length}</div>
              <div className="mt-1 text-[9px] font-black uppercase tracking-[0.1em] text-gray-400">{ui.projects}</div>
            </div>

            <div className="border-x border-gray-200/70 px-3 py-4 text-center dark:border-white/[0.06]">
              <div className="text-2xl font-black text-blue-700 dark:text-blue-400">{uniqueTechnologyCount}</div>
              <div className="mt-1 text-[9px] font-black uppercase tracking-[0.1em] text-gray-400">{ui.technologies}</div>
            </div>

            <div className="px-3 py-4 text-center">
              <div className="text-2xl font-black text-gray-950 dark:text-white">{engineeringPointCount}</div>
              <div className="mt-1 text-[9px] font-black uppercase tracking-[0.1em] text-gray-400">{ui.engineeringPoints}</div>
            </div>
          </motion.div>
        </motion.div>

        {/* =================================================
            STICKY PROJECT NAVIGATION
        ================================================== */}
        <div className="sticky top-20 z-40 mx-auto mb-12 max-w-4xl pt-2 lg:top-24 lg:mb-16">
          <div className="relative overflow-hidden rounded-2xl border border-gray-200/70 bg-white/80 p-1.5 shadow-[0_14px_45px_rgba(15,23,42,0.08)] backdrop-blur-2xl dark:border-white/[0.07] dark:bg-gray-950/75 dark:shadow-[0_16px_55px_rgba(0,0,0,0.35)]">
            <div className="flex items-center gap-1 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {projects.map((project, index) => {
                const active = activeProjectId === project.id;
                const theme = projectThemes[project.id];

                return (
                  <a
                    key={project.id}
                    href={`#${project.id}`}
                    aria-current={active ? 'true' : undefined}
                    className={`relative flex min-w-max flex-1 items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-xs font-black transition-colors ${active ? theme.text : 'text-gray-500 hover:text-gray-950 dark:text-gray-400 dark:hover:text-white'}`}
                  >
                    {active && (
                      <motion.span
                        layoutId="active-project-pill"
                        transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                        className={`absolute inset-0 rounded-xl border ${theme.softPanel}`}
                      />
                    )}

                    <span className="relative z-10 text-[10px] opacity-60">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className="relative z-10">{project.name}</span>
                  </a>
                );
              })}
            </div>

            <motion.div
              aria-hidden="true"
              style={{ scaleX: sectionProgress, transformOrigin: 'left' }}
              className="absolute bottom-0 left-0 h-[2px] w-full bg-gradient-to-r from-blue-600 via-cyan-400 to-violet-500"
            />
          </div>

          <div className="mt-2 text-center text-[9px] font-black uppercase tracking-[0.14em] text-gray-300 dark:text-gray-700">
            {ui.scrollHint}
          </div>
        </div>

        {/* =================================================
            PROJECTS
        ================================================== */}
        <div className="space-y-16 lg:space-y-24">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              total={projects.length}
              theme={projectThemes[project.id]}
              labels={currentLabels}
              ui={ui}
              isCopied={copiedProjectId === project.id}
              copyProjectLink={copyProjectLink}
              setActiveProjectId={setActiveProjectId}
              reducedMotion={prefersReducedMotion}
            />
          ))}
        </div>
      </div>

      {/* Bottom fade */}
      <div aria-hidden="true" className="pointer-events-none absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-b from-transparent to-white/40 dark:to-gray-900/20" />
    </section>
  );
};

export default FeaturedProjects;
