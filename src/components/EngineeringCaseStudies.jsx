import React, {
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import {
  FaArrowRight,
  FaBolt,
  FaCheck,
  FaCheckCircle,
  FaCode,
  FaDatabase,
  FaExclamationTriangle,
  FaFilm,
  FaGlobe,
  FaLayerGroup,
  FaLock,
  FaPlay,
  FaRocket,
  FaShieldAlt,
  FaTachometerAlt,
  FaTools,
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
   CASE STUDY VISUAL
========================================================= */

const CaseStudyVisual = ({
  study,
  index,
  theme,
  labels,
  prefersReducedMotion,
}) => {
  const commonCard =
    'rounded-2xl border border-white/60 bg-white/80 shadow-lg backdrop-blur-xl dark:border-white/[0.08] dark:bg-gray-950/75';

  if (study.id === 'aviora-performance') {
    return (
      <div
        className="
          relative
          min-h-[500px]
          overflow-visible
          rounded-[1.8rem]
          border
          border-blue-200/70
          bg-gradient-to-br
          from-blue-50
          via-white
          to-cyan-50
          p-5
          shadow-[0_30px_100px_rgba(37,99,235,0.15)]

          dark:border-blue-500/15
          dark:from-blue-950/35
          dark:via-gray-950
          dark:to-cyan-950/25
        "
      >
        <div
          aria-hidden="true"
          className="
            absolute
            -left-16
            top-16
            h-56
            w-56
            rounded-full
            bg-blue-500/15
            blur-[85px]
          "
        />

        <div
          aria-hidden="true"
          className="
            absolute
            -right-14
            bottom-12
            h-52
            w-52
            rounded-full
            bg-cyan-400/15
            blur-[80px]
          "
        />

        <div className="relative z-10">
          <div
            className={`
              ${commonCard}
              mb-5
              flex
              items-center
              justify-between
              gap-3
              px-4
              py-3
            `}
          >
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
              <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
            </div>

            <span
              className="
                font-mono
                text-[10px]
                font-black
                uppercase
                tracking-[0.12em]
                text-gray-500

                dark:text-gray-400
              "
            >
              performance.lab
            </span>
          </div>

          <div
            className={`
              ${commonCard}
              relative
              overflow-hidden
              p-5
              sm:p-6
            `}
          >
            <div
              className="
                mb-5
                flex
                items-center
                justify-between
                gap-4
              "
            >
              <div>
                <p
                  className="
                    text-[10px]
                    font-black
                    uppercase
                    tracking-[0.14em]
                    text-blue-700

                    dark:text-blue-300
                  "
                >
                  {labels.performance}
                </p>

                <h4
                  className="
                    mt-1
                    text-lg
                    font-black
                    text-gray-950

                    dark:text-white
                  "
                >
                  Lighthouse
                </h4>
              </div>

              <FaTachometerAlt
                className="
                  text-blue-600
                  dark:text-blue-400
                "
                size={20}
              />
            </div>

            <div
              className="
                grid
                gap-5

                sm:grid-cols-[0.9fr_1.1fr]
                sm:items-center
              "
            >
              <div
                className="
                  relative
                  mx-auto
                  h-44
                  w-44
                "
              >
                <motion.div
                  aria-hidden="true"
                  animate={
                    prefersReducedMotion
                      ? undefined
                      : {
                          rotate: 360,
                        }
                  }
                  transition={{
                    duration: 18,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                  className="
                    absolute
                    inset-0
                    rounded-full
                    border
                    border-dashed
                    border-blue-300/70

                    dark:border-blue-500/20
                  "
                />

                <div
                  className="
                    absolute
                    inset-4
                    rounded-full
                    p-[8px]
                  "
                  style={{
                    background:
                      'conic-gradient(rgb(37 99 235) 0deg, rgb(34 211 238) 315deg, rgba(148,163,184,0.18) 315deg)',
                  }}
                >
                  <div
                    className="
                      flex
                      h-full
                      w-full
                      flex-col
                      items-center
                      justify-center
                      rounded-full
                      bg-white

                      dark:bg-gray-950
                    "
                  >
                    <motion.div
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
                      className="
                        text-3xl
                        font-black
                        tracking-[-0.06em]
                        text-blue-700

                        dark:text-blue-300
                      "
                    >
                      94–98
                    </motion.div>

                    <span
                      className="
                        mt-1
                        text-[9px]
                        font-black
                        uppercase
                        tracking-[0.14em]
                        text-gray-400
                      "
                    >
                      Lighthouse
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid gap-3">
                {[
                  ['LCP', '1.9–2.3s'],
                  ['TBT', '26–98ms'],
                  [labels.regions, '6'],
                ].map(([label, value], metricIndex) => (
                  <motion.div
                    key={label}
                    initial={{
                      opacity: 0,
                      x: prefersReducedMotion
                        ? 0
                        : 15,
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
                          : 0.15 +
                            metricIndex * 0.08,
                    }}
                    className="
                      relative
                      overflow-hidden
                      rounded-xl
                      border
                      border-blue-100
                      bg-blue-50/70
                      px-4
                      py-3

                      dark:border-blue-500/10
                      dark:bg-blue-500/[0.06]
                    "
                  >
                    <div
                      className="
                        flex
                        items-center
                        justify-between
                        gap-3
                      "
                    >
                      <span
                        className="
                          text-xs
                          font-bold
                          text-gray-500

                          dark:text-gray-400
                        "
                      >
                        {label}
                      </span>

                      <span
                        className="
                          font-mono
                          text-sm
                          font-black
                          text-blue-700

                          dark:text-blue-300
                        "
                      >
                        {value}
                      </span>
                    </div>

                    {!prefersReducedMotion && (
                      <motion.span
                        aria-hidden="true"
                        animate={{
                          x: [
                            '-160%',
                            '220%',
                          ],
                        }}
                        transition={{
                          duration: 2.6,
                          repeat: Infinity,
                          repeatDelay:
                            1.5 + metricIndex,
                          ease: 'easeInOut',
                        }}
                        className="
                          pointer-events-none
                          absolute
                          inset-y-0
                          w-10
                          -skew-x-12
                          bg-gradient-to-r
                          from-transparent
                          via-white/70
                          to-transparent
                          blur-sm

                          dark:via-white/10
                        "
                      />
                    )}
                  </motion.div>
                ))}
              </div>
            </div>

            <div
              className="
                mt-6
                grid
                grid-cols-6
                items-end
                gap-2
              "
            >
              {[54, 66, 61, 78, 88, 96].map(
                (height, barIndex) => (
                  <motion.div
                    key={height}
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
                      duration: 0.7,
                      delay:
                        prefersReducedMotion
                          ? 0
                          : barIndex * 0.07,
                    }}
                    style={{
                      height: `${height}px`,
                      transformOrigin:
                        'bottom',
                    }}
                    className="
                      rounded-t-md
                      bg-gradient-to-t
                      from-blue-700
                      to-cyan-400
                      opacity-80
                    "
                  />
                )
              )}
            </div>
          </div>
        </div>

        <motion.div
          animate={
            prefersReducedMotion
              ? undefined
              : {
                  y: [0, -8, 0],
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
            -left-4
            top-[26%]
            z-30
            hidden
            rounded-full
            border
            border-blue-200
            bg-white/90
            px-3
            py-1.5
            text-[10px]
            font-black
            text-blue-700
            shadow-lg
            backdrop-blur-xl

            dark:border-blue-500/20
            dark:bg-gray-950/90
            dark:text-blue-300

            xl:block
          "
        >
          Core Web Vitals
        </motion.div>

        <motion.div
          animate={
            prefersReducedMotion
              ? undefined
              : {
                  y: [0, 8, 0],
                  rotate: [0, 2, 0],
                }
          }
          transition={{
            duration: 5.5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="
            absolute
            -right-5
            bottom-[18%]
            z-30
            hidden
            rounded-full
            border
            border-cyan-200
            bg-white/90
            px-3
            py-1.5
            text-[10px]
            font-black
            text-cyan-700
            shadow-lg
            backdrop-blur-xl

            dark:border-cyan-500/20
            dark:bg-gray-950/90
            dark:text-cyan-300

            xl:block
          "
        >
          6 regions
        </motion.div>
      </div>
    );
  }

  if (study.id === 'payment-risk') {
    return (
      <div
        className="
          relative
          min-h-[500px]
          overflow-visible
          rounded-[1.8rem]
          border
          border-emerald-200/70
          bg-gradient-to-br
          from-emerald-50
          via-white
          to-cyan-50
          p-5
          shadow-[0_30px_100px_rgba(5,150,105,0.14)]

          dark:border-emerald-500/15
          dark:from-emerald-950/30
          dark:via-gray-950
          dark:to-cyan-950/20
        "
      >
        <div
          aria-hidden="true"
          className="
            absolute
            -left-16
            top-20
            h-56
            w-56
            rounded-full
            bg-emerald-500/15
            blur-[85px]
          "
        />

        <div
          aria-hidden="true"
          className="
            absolute
            -right-14
            bottom-10
            h-52
            w-52
            rounded-full
            bg-cyan-400/15
            blur-[80px]
          "
        />

        <div
          className={`
            ${commonCard}
            relative
            z-10
            p-5
            sm:p-6
          `}
        >
          <div
            className="
              mb-6
              flex
              items-center
              justify-between
              gap-4
            "
          >
            <div>
              <p
                className="
                  text-[10px]
                  font-black
                  uppercase
                  tracking-[0.14em]
                  text-emerald-700

                  dark:text-emerald-300
                "
              >
                {labels.securityArchitecture}
              </p>

              <h4
                className="
                  mt-1
                  text-lg
                  font-black
                  text-gray-950

                  dark:text-white
                "
              >
                Risk Engine
              </h4>
            </div>

            <span
              className="
                inline-flex
                items-center
                gap-2
                rounded-full
                border
                border-emerald-200
                bg-emerald-50
                px-3
                py-1.5
                text-[10px]
                font-black
                uppercase
                tracking-[0.1em]
                text-emerald-700

                dark:border-emerald-500/20
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

              {labels.deterministic}
            </span>
          </div>

          <div
            className="
              relative
              mx-auto
              flex
              min-h-[260px]
              max-w-md
              items-center
              justify-center
            "
          >
            {[0, 1, 2].map((ring) => (
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
                    18 + ring * 7,
                  repeat: Infinity,
                  ease: 'linear',
                }}
                className={`
                  absolute
                  rounded-full
                  border
                  border-dashed
                  border-emerald-300/60

                  dark:border-emerald-500/15

                  ${
                    ring === 0
                      ? 'h-28 w-28'
                      : ring === 1
                        ? 'h-44 w-44'
                        : 'h-60 w-60'
                  }
                `}
              />
            ))}

            <motion.div
              animate={
                prefersReducedMotion
                  ? undefined
                  : {
                      boxShadow: [
                        '0 0 0 rgba(5,150,105,0)',
                        '0 0 50px rgba(5,150,105,0.28)',
                        '0 0 0 rgba(5,150,105,0)',
                      ],
                    }
              }
              transition={{
                duration: 2.8,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="
                relative
                z-20
                flex
                h-24
                w-24
                flex-col
                items-center
                justify-center
                rounded-full
                border
                border-emerald-200
                bg-white
                text-emerald-700
                shadow-xl

                dark:border-emerald-500/20
                dark:bg-gray-950
                dark:text-emerald-300
              "
            >
              <FaShieldAlt size={24} />

              <span
                className="
                  mt-2
                  text-[9px]
                  font-black
                  uppercase
                  tracking-[0.12em]
                "
              >
                RULES
              </span>
            </motion.div>

            {[
              {
                text: '10 rules',
                position:
                  'left-[2%] top-[10%]',
                icon: FaLock,
              },
              {
                text: '6 entities',
                position:
                  'right-[1%] top-[18%]',
                icon: FaDatabase,
              },
              {
                text: 'pytest',
                position:
                  'left-[3%] bottom-[12%]',
                icon: FaCheckCircle,
              },
              {
                text: 'async',
                position:
                  'right-[4%] bottom-[10%]',
                icon: FaBolt,
              },
            ].map((item, itemIndex) => {
              const NodeIcon = item.icon;

              return (
                <motion.div
                  key={item.text}
                  animate={
                    prefersReducedMotion
                      ? undefined
                      : {
                          y: [
                            0,
                            itemIndex % 2 ===
                            0
                              ? -7
                              : 7,
                            0,
                          ],
                        }
                  }
                  transition={{
                    duration:
                      4.5 +
                      itemIndex * 0.4,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  className={`
                    absolute
                    z-30
                    flex
                    items-center
                    gap-2
                    rounded-full
                    border
                    border-emerald-200
                    bg-white/90
                    px-3
                    py-1.5
                    text-[10px]
                    font-black
                    text-emerald-700
                    shadow-lg
                    backdrop-blur-xl

                    dark:border-emerald-500/20
                    dark:bg-gray-950/90
                    dark:text-emerald-300

                    ${item.position}
                  `}
                >
                  <NodeIcon size={9} />
                  {item.text}
                </motion.div>
              );
            })}
          </div>

          <div
            className="
              mt-5
              grid
              grid-cols-3
              gap-2
            "
          >
            {['Agent', 'Rules', 'Alert'].map(
              (node, nodeIndex) => (
                <React.Fragment key={node}>
                  <div
                    className="
                      rounded-xl
                      border
                      border-emerald-100
                      bg-emerald-50/70
                      px-3
                      py-3
                      text-center
                      text-[10px]
                      font-black
                      uppercase
                      tracking-[0.1em]
                      text-emerald-700

                      dark:border-emerald-500/10
                      dark:bg-emerald-500/[0.06]
                      dark:text-emerald-300
                    "
                  >
                    {node}
                  </div>
                </React.Fragment>
              )
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="
        relative
        min-h-[500px]
        overflow-visible
        rounded-[1.8rem]
        border
        border-violet-200/70
        bg-gradient-to-br
        from-violet-50
        via-white
        to-fuchsia-50
        p-5
        shadow-[0_30px_100px_rgba(124,58,237,0.14)]

        dark:border-violet-500/15
        dark:from-violet-950/30
        dark:via-gray-950
        dark:to-fuchsia-950/20
      "
    >
      <div
        aria-hidden="true"
        className="
          absolute
          -left-16
          top-20
          h-56
          w-56
          rounded-full
          bg-violet-500/15
          blur-[85px]
        "
      />

      <div
        aria-hidden="true"
        className="
          absolute
          -right-14
          bottom-10
          h-52
          w-52
          rounded-full
          bg-fuchsia-400/15
          blur-[80px]
        "
      />

      <div
        className={`
          ${commonCard}
          relative
          z-10
          overflow-hidden
          p-5
          sm:p-6
        `}
      >
        <div
          className="
            mb-5
            flex
            items-center
            justify-between
            gap-4
          "
        >
          <div>
            <p
              className="
                text-[10px]
                font-black
                uppercase
                tracking-[0.14em]
                text-violet-700

                dark:text-violet-300
              "
            >
              {labels.motionSystem}
            </p>

            <h4
              className="
                mt-1
                text-lg
                font-black
                text-gray-950

                dark:text-white
              "
            >
              Typed Motion System
            </h4>
          </div>

          <FaFilm
            className="
              text-violet-600
              dark:text-violet-400
            "
            size={20}
          />
        </div>

        <div
          className="
            relative
            overflow-hidden
            rounded-2xl
            border
            border-violet-100
            bg-gray-950
            p-4
            shadow-xl

            dark:border-violet-500/10
          "
        >
          <div
            className="
              mb-4
              flex
              items-center
              justify-between
            "
          >
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
              <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
            </div>

            <span
              className="
                font-mono
                text-[9px]
                font-bold
                text-gray-500
              "
            >
              composition.tsx
            </span>
          </div>

          <div
            className="
              relative
              flex
              aspect-video
              items-center
              justify-center
              overflow-hidden
              rounded-xl
              border
              border-white/[0.08]
              bg-gradient-to-br
              from-violet-950
              via-gray-950
              to-fuchsia-950
            "
          >
            <motion.div
              animate={
                prefersReducedMotion
                  ? undefined
                  : {
                      scale: [
                        1,
                        1.08,
                        1,
                      ],
                      rotate: [
                        0,
                        2,
                        0,
                      ],
                    }
              }
              transition={{
                duration: 4.5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="
                absolute
                h-36
                w-36
                rounded-full
                bg-violet-500/20
                blur-3xl
              "
            />

            <motion.div
              animate={
                prefersReducedMotion
                  ? undefined
                  : {
                      y: [
                        0,
                        -6,
                        0,
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
                z-10
                flex
                h-20
                w-20
                items-center
                justify-center
                rounded-full
                border
                border-violet-300/30
                bg-violet-500/15
                text-violet-200
                shadow-[0_0_50px_rgba(139,92,246,0.25)]
                backdrop-blur-xl
              "
            >
              <FaPlay
                className="ml-1"
                size={20}
              />
            </motion.div>

            <motion.span
              aria-hidden="true"
              animate={
                prefersReducedMotion
                  ? undefined
                  : {
                      x: [
                        '-130%',
                        '230%',
                      ],
                    }
              }
              transition={{
                duration: 3.2,
                repeat: Infinity,
                repeatDelay: 1,
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
                via-white/10
                to-transparent
                blur-md
              "
            />
          </div>

          <div
            className="
              mt-4
              grid
              grid-cols-4
              gap-2
            "
          >
            {[
              'API',
              'Transition',
              'Chart',
              'Render',
            ].map(
              (item, itemIndex) => (
                <motion.div
                  key={item}
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
                    duration: 0.6,
                    delay:
                      prefersReducedMotion
                        ? 0
                        : itemIndex * 0.08,
                  }}
                  style={{
                    transformOrigin:
                      'bottom',
                  }}
                  className="
                    rounded-lg
                    bg-white/[0.05]
                    px-2
                    py-3
                    text-center
                    font-mono
                    text-[8px]
                    font-bold
                    uppercase
                    tracking-[0.08em]
                    text-gray-400
                  "
                >
                  {item}
                </motion.div>
              )
            )}
          </div>

          <div
            className="
              mt-4
              h-2
              overflow-hidden
              rounded-full
              bg-white/[0.05]
            "
          >
            <motion.div
              animate={
                prefersReducedMotion
                  ? undefined
                  : {
                      width: [
                        '18%',
                        '82%',
                        '45%',
                        '92%',
                      ],
                    }
              }
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="
                h-full
                rounded-full
                bg-gradient-to-r
                from-violet-500
                via-fuchsia-400
                to-cyan-400
              "
            />
          </div>
        </div>
      </div>

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
          -left-5
          top-[24%]
          z-30
          hidden
          rounded-full
          border
          border-violet-200
          bg-white/90
          px-3
          py-1.5
          text-[10px]
          font-black
          text-violet-700
          shadow-lg
          backdrop-blur-xl

          dark:border-violet-500/20
          dark:bg-gray-950/90
          dark:text-violet-300

          xl:block
        "
      >
        TypeScript
      </motion.div>

      <motion.div
        animate={
          prefersReducedMotion
            ? undefined
            : {
                y: [0, 8, 0],
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
          -right-5
          bottom-[18%]
          z-30
          hidden
          rounded-full
          border
          border-fuchsia-200
          bg-white/90
          px-3
          py-1.5
          text-[10px]
          font-black
          text-fuchsia-700
          shadow-lg
          backdrop-blur-xl

          dark:border-fuchsia-500/20
          dark:bg-gray-950/90
          dark:text-fuchsia-300

          xl:block
        "
      >
        deterministic
      </motion.div>
    </div>
  );
};

/* =========================================================
   CASE STUDY CARD
========================================================= */

const CaseStudyCard = ({
  study,
  index,
  total,
  labels,
  theme,
  prefersReducedMotion,
}) => {
  const cardRef = useRef(null);

  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);

  const rawRotateY = useTransform(
    pointerX,
    [-0.5, 0.5],
    [-2.8, 2.8]
  );

  const rawRotateX = useTransform(
    pointerY,
    [-0.5, 0.5],
    [2.8, -2.8]
  );

  const rotateX = useSpring(rawRotateX, {
    stiffness: 180,
    damping: 24,
  });

  const rotateY = useSpring(rawRotateY, {
    stiffness: 180,
    damping: 24,
  });

  const glowX = useMotionValue(400);
  const glowY = useMotionValue(250);

  const smoothGlowX = useSpring(glowX, {
    stiffness: 140,
    damping: 26,
  });

  const smoothGlowY = useSpring(glowY, {
    stiffness: 140,
    damping: 26,
  });

  const glow = useMotionTemplate`
    radial-gradient(
      700px circle at ${smoothGlowX}px ${smoothGlowY}px,
      ${theme.spotlight},
      transparent 60%
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

  return (
    <motion.article
      id={study.id}
      data-case-study={study.id}
      ref={cardRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={resetPointer}
      initial={{
        opacity: 0,
        y: prefersReducedMotion
          ? 0
          : 80,
        scale: prefersReducedMotion
          ? 1
          : 0.97,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        scale: 1,
      }}
      viewport={{
        once: true,
        amount: 0.12,
      }}
      transition={{
        duration:
          prefersReducedMotion
            ? 0
            : 0.9,
        delay:
          prefersReducedMotion
            ? 0
            : index * 0.04,
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
        group/case
        relative
        scroll-mt-36
        [perspective:1400px]
      "
    >
      <div
        aria-hidden="true"
        className={`
          pointer-events-none
          absolute
          -inset-5
          -z-10
          rounded-[2.5rem]
          opacity-0
          blur-[70px]
          transition-opacity
          duration-700
          group-hover/case:opacity-100
          ${theme.outerGlow}
        `}
      />

      <div
        className={`
          relative
          overflow-hidden
          rounded-[2rem]
          border
          bg-white/90
          shadow-[0_22px_80px_rgba(15,23,42,0.075)]
          backdrop-blur-xl
          transition-[box-shadow,border-color]
          duration-500

          group-hover/case:shadow-[0_35px_110px_rgba(15,23,42,0.14)]

          dark:bg-gray-900/88
          dark:shadow-[0_28px_95px_rgba(0,0,0,0.38)]

          ${theme.border}
        `}
      >
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
            group-hover/case:opacity-100
          "
        />

        <div
          aria-hidden="true"
          className={`
            absolute
            left-0
            top-0
            h-[3px]
            w-full
            bg-gradient-to-r
            ${theme.gradient}
          `}
        />

        <span
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            -right-3
            -top-10
            select-none
            text-[11rem]
            font-black
            leading-none
            tracking-[-0.08em]
            text-gray-950/[0.02]

            dark:text-white/[0.025]
          "
        >
          {String(index + 1).padStart(
            2,
            '0'
          )}
        </span>

        <div
          className="
            relative
            z-10
            grid

            lg:grid-cols-[0.9fr_1.1fr]
          "
        >
          {/* LEFT VISUAL */}
          <div
            className="
              border-b
              border-gray-200/70
              p-5

              dark:border-white/[0.06]

              sm:p-7
              lg:border-b-0
              lg:border-r
              lg:p-8
            "
          >
            <div
              className="
                lg:sticky
                lg:top-28
              "
            >
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
                    inline-flex
                    items-center
                    gap-2
                    rounded-full
                    border
                    px-3
                    py-1.5
                    text-[10px]
                    font-black
                    uppercase
                    tracking-[0.13em]
                    ${theme.badge}
                  `}
                >
                  {React.createElement(theme.icon, { size: 10 })}
                  {theme.label}
                </div>

                <span
                  className="
                    text-[10px]
                    font-black
                    tracking-[0.14em]
                    text-gray-300

                    dark:text-gray-700
                  "
                >
                  {index + 1}/{total}
                </span>
              </div>

              <CaseStudyVisual
                study={study}
                index={index}
                theme={theme}
                labels={labels}
                prefersReducedMotion={
                  prefersReducedMotion
                }
              />
            </div>
          </div>

          {/* RIGHT CONTENT */}
          <div
            className="
              p-6

              sm:p-8
              lg:p-10
            "
          >
            <header className="mb-8">
              <motion.h3
                whileHover={
                  prefersReducedMotion
                    ? undefined
                    : {
                        x: 4,
                      }
                }
                className="
                  text-3xl
                  font-black
                  tracking-[-0.045em]
                  text-gray-950

                  dark:text-white

                  sm:text-4xl
                "
              >
                {study.title}
              </motion.h3>

              <p
                className={`
                  mt-3
                  text-base
                  font-black
                  leading-relaxed
                  sm:text-lg
                  ${theme.text}
                `}
              >
                {study.subtitle}
              </p>
            </header>

            {/* Problem */}
            <motion.div
              initial={{
                opacity: 0,
                x: prefersReducedMotion
                  ? 0
                  : -20,
              }}
              whileInView={{
                opacity: 1,
                x: 0,
              }}
              viewport={{
                once: true,
              }}
              className="
                relative
                mb-8
                overflow-hidden
                rounded-2xl
                border
                border-rose-200/70
                bg-rose-50/65
                p-5

                dark:border-rose-500/10
                dark:bg-rose-500/[0.045]
              "
            >
              <div
                className="
                  mb-3
                  flex
                  items-center
                  gap-3
                "
              >
                <span
                  className="
                    flex
                    h-9
                    w-9
                    items-center
                    justify-center
                    rounded-xl
                    bg-rose-100
                    text-rose-700

                    dark:bg-rose-500/10
                    dark:text-rose-300
                  "
                >
                  <FaExclamationTriangle
                    size={13}
                  />
                </span>

                <h4
                  className="
                    text-base
                    font-black
                    uppercase
                    tracking-[0.08em]
                    text-gray-950

                    dark:text-white
                  "
                >
                  {labels.problem}
                </h4>
              </div>

              <p
                className="
                  leading-relaxed
                  text-gray-600

                  dark:text-gray-300
                "
              >
                {study.problem}
              </p>
            </motion.div>

            {/* Approach */}
            <div className="mb-9">
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
                  className="
                    flex
                    items-center
                    gap-3
                  "
                >
                  <span
                    className={`
                      flex
                      h-9
                      w-9
                      items-center
                      justify-center
                      rounded-xl
                      ${theme.iconBox}
                    `}
                  >
                    <FaLayerGroup
                      size={13}
                    />
                  </span>

                  <div>
                    <h4
                      className="
                        text-lg
                        font-black
                        text-gray-950

                        dark:text-white
                      "
                    >
                      {labels.approach}
                    </h4>

                    <p
                      className="
                        text-xs
                        text-gray-400
                      "
                    >
                      {study.approach.length}{' '}
                      {labels.engineeringSteps}
                    </p>
                  </div>
                </div>

                <FaArrowRight
                  className="
                    hidden
                    text-gray-300

                    dark:text-gray-700

                    sm:block
                  "
                />
              </div>

              <div className="relative">
                <div
                  aria-hidden="true"
                  className="
                    absolute
                    bottom-3
                    left-[14px]
                    top-3
                    w-px
                    bg-gradient-to-b
                    from-blue-300
                    via-blue-200
                    to-transparent

                    dark:from-blue-500/30
                    dark:via-blue-500/10
                  "
                />

                <div className="space-y-3">
                  {study.approach.map(
                    (item, itemIndex) => (
                      <motion.div
                        key={item}
                        initial={{
                          opacity: 0,
                          x: prefersReducedMotion
                            ? 0
                            : 18,
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
                              : 0.08 +
                                itemIndex *
                                  0.045,
                        }}
                        whileHover={
                          prefersReducedMotion
                            ? undefined
                            : {
                                x: 4,
                              }
                        }
                        className="
                          group/step
                          relative
                          flex
                          gap-4
                          rounded-xl
                          px-1
                          py-1
                        "
                      >
                        <span
                          className={`
                            relative
                            z-10
                            mt-1
                            flex
                            h-7
                            w-7
                            flex-shrink-0
                            items-center
                            justify-center
                            rounded-full
                            border
                            bg-white
                            text-[9px]
                            font-black
                            shadow-sm

                            dark:bg-gray-900

                            ${theme.step}
                          `}
                        >
                          {String(
                            itemIndex + 1
                          ).padStart(
                            2,
                            '0'
                          )}
                        </span>

                        <div
                          className="
                            flex-1
                            rounded-xl
                            border
                            border-gray-200/70
                            bg-gray-50/60
                            px-4
                            py-3
                            transition-colors
                            duration-300

                            group-hover/step:border-blue-200
                            group-hover/step:bg-blue-50/50

                            dark:border-white/[0.06]
                            dark:bg-white/[0.025]
                            dark:group-hover/step:border-blue-500/15
                            dark:group-hover/step:bg-blue-500/[0.04]
                          "
                        >
                          <p
                            className="
                              text-sm
                              leading-relaxed
                              text-gray-600

                              dark:text-gray-300
                            "
                          >
                            {item}
                          </p>
                        </div>
                      </motion.div>
                    )
                  )}
                </div>
              </div>
            </div>

            {/* Results */}
            <div className="mb-8">
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
                    h-9
                    w-9
                    items-center
                    justify-center
                    rounded-xl
                    bg-emerald-100
                    text-emerald-700

                    dark:bg-emerald-500/10
                    dark:text-emerald-300
                  "
                >
                  <FaCheckCircle
                    size={13}
                  />
                </span>

                <div>
                  <h4
                    className="
                      text-lg
                      font-black
                      text-gray-950

                      dark:text-white
                    "
                  >
                    {labels.results}
                  </h4>

                  <p
                    className="
                      text-xs
                      text-gray-400
                    "
                  >
                    {study.results.length}{' '}
                    {labels.outcomes}
                  </p>
                </div>
              </div>

              <div
                className="
                  grid
                  gap-3

                  sm:grid-cols-2
                "
              >
                {study.results.map(
                  (
                    result,
                    resultIndex
                  ) => (
                    <motion.div
                      key={result}
                      initial={{
                        opacity: 0,
                        y: prefersReducedMotion
                          ? 0
                          : 15,
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
                            : resultIndex *
                              0.05,
                      }}
                      whileHover={
                        prefersReducedMotion
                          ? undefined
                          : {
                              y: -3,
                            }
                      }
                      className="
                        group/result
                        relative
                        overflow-hidden
                        rounded-xl
                        border
                        border-emerald-200/60
                        bg-emerald-50/55
                        p-4
                        shadow-sm

                        dark:border-emerald-500/10
                        dark:bg-emerald-500/[0.045]
                      "
                    >
                      <div
                        className="
                          flex
                          items-start
                          gap-3
                        "
                      >
                        <span
                          className="
                            mt-0.5
                            flex
                            h-5
                            w-5
                            flex-shrink-0
                            items-center
                            justify-center
                            rounded-full
                            bg-emerald-600
                            text-white
                          "
                        >
                          <FaCheck size={8} />
                        </span>

                        <p
                          className="
                            text-sm
                            leading-relaxed
                            text-gray-700

                            dark:text-gray-300
                          "
                        >
                          {result}
                        </p>
                      </div>

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
                          via-white/70
                          to-transparent
                          opacity-0
                          transition-all
                          duration-700

                          group-hover/result:left-[120%]
                          group-hover/result:opacity-100

                          dark:via-white/10
                        "
                      />
                    </motion.div>
                  )
                )}
              </div>
            </div>

            {/* Tools */}
            <div
              className="
                border-t
                border-gray-200/70
                pt-6

                dark:border-white/[0.06]
              "
            >
              <div
                className="
                  mb-4
                  flex
                  items-center
                  gap-3
                "
              >
                <span
                  className={`
                    flex
                    h-9
                    w-9
                    items-center
                    justify-center
                    rounded-xl
                    ${theme.iconBox}
                  `}
                >
                  <FaTools size={13} />
                </span>

                <h4
                  className="
                    text-base
                    font-black
                    text-gray-950

                    dark:text-white
                  "
                >
                  {labels.tools}
                </h4>
              </div>

              <div className="flex flex-wrap gap-2">
                {study.tools.map(
                  (tool, toolIndex) => (
                    <motion.span
                      key={tool}
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
                      transition={{
                        delay:
                          prefersReducedMotion
                            ? 0
                            : toolIndex *
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
                      className={`
                        group/tool
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

                        dark:bg-white/[0.035]

                        ${theme.tool}
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
                          group-hover/tool:translate-x-[120%]

                          dark:via-white/10
                        "
                      />

                      <span className="relative">
                        {tool}
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
   MAIN
========================================================= */

const EngineeringCaseStudies = () => {
  const { language } =
    useContext(LanguageContext);

  const t = translations[language];

  const sectionRef = useRef(null);

  const prefersReducedMotion =
    useReducedMotion();

  const [activeStudy, setActiveStudy] =
    useState('aviora-performance');

  const labels = {
    en: {
      problem: 'Problem',
      approach: 'Approach',
      results: 'Results',
      tools: 'Tools & Technologies',
      sectionTag:
        'Engineering Deep Dives',
      navigator:
        'Case Study Navigator',
      caseStudies:
        'Case Studies',
      engineeringSteps:
        'engineering steps',
      outcomes:
        'outcomes',
      toolsCount:
        'unique tools',
      performance:
        'Performance',
      regions:
        'Regions',
      securityArchitecture:
        'Security Architecture',
      deterministic:
        'Deterministic',
      motionSystem:
        'Motion System',
      deepDive:
        'Deep Dive',
      measured:
        'Measured',
      engineered:
        'Engineered',
      validated:
        'Validated',
    },

    tr: {
      problem: 'Problem',
      approach: 'Yaklaşım',
      results: 'Sonuçlar',
      tools: 'Araçlar & Teknolojiler',
      sectionTag:
        'Mühendislik Derinlemesine İncelemeleri',
      navigator:
        'Case Study Navigasyonu',
      caseStudies:
        'Case Study',
      engineeringSteps:
        'mühendislik adımı',
      outcomes:
        'sonuç',
      toolsCount:
        'farklı araç',
      performance:
        'Performans',
      regions:
        'Bölge',
      securityArchitecture:
        'Güvenlik Mimarisi',
      deterministic:
        'Deterministik',
      motionSystem:
        'Motion Sistemi',
      deepDive:
        'Derin İnceleme',
      measured:
        'Ölçüldü',
      engineered:
        'Geliştirildi',
      validated:
        'Doğrulandı',
    },

    de: {
      problem: 'Problem',
      approach: 'Vorgehensweise',
      results: 'Ergebnisse',
      tools: 'Tools & Technologien',
      sectionTag:
        'Engineering Deep Dives',
      navigator:
        'Case-Study-Navigation',
      caseStudies:
        'Case Studies',
      engineeringSteps:
        'Engineering-Schritte',
      outcomes:
        'Ergebnisse',
      toolsCount:
        'einzigartige Tools',
      performance:
        'Performance',
      regions:
        'Regionen',
      securityArchitecture:
        'Security-Architektur',
      deterministic:
        'Deterministisch',
      motionSystem:
        'Motion-System',
      deepDive:
        'Deep Dive',
      measured:
        'Gemessen',
      engineered:
        'Entwickelt',
      validated:
        'Validiert',
    },
  };

  const caseStudiesData = {
    en: [
      {
        id: 'payment-risk',
        title: 'Payment Risk Architecture',
        subtitle: 'Deterministic Rule Engine for AI Agent Security',
        problem:
          'AI agents handling payments need deterministic, testable security rules that can be validated against known attack patterns while maintaining performance.',
        approach: [
          'Designed a domain model with 6 core entities: transactions, merchants, agents, rules, alerts, and logs',
          'Implemented 10 deterministic payment-risk rules with explicit conditions',
          'Created merchant attack scenarios for testing and validation',
          'Built asynchronous SQLAlchemy integration for data access',
          'Implemented Pydantic validation for API payloads and domain models',
          'Added payload limits, redaction, and structured logging',
          'Set up Docker Compose quality gates for consistent development environments',
        ],
        results: [
          'Deterministic and repeatable risk evaluation',
          'Automated test coverage with pytest',
          'Type-safe API contracts with Pydantic',
          'Asynchronous database architecture',
          'Security-conscious handling of logging and sensitive data',
        ],
        tools: [
          'FastAPI',
          'SQLAlchemy',
          'Pydantic',
          'pytest',
          'Docker',
          'asyncio',
        ],
      },

      {
        id: 'aviora-performance',
        title: 'Aviora Performance Optimization',
        subtitle: 'Achieving 94–98 Lighthouse Performance Score',
        problem:
          'Initial performance measurements showed suboptimal Core Web Vitals, particularly on mobile devices where users needed fast access to their job application data.',
        approach: [
          'Analyzed bundle composition and identified heavy dependencies',
          'Implemented code splitting and lazy loading for route components',
          'Optimized image assets with responsive formats and lazy loading',
          'Reduced JavaScript execution time through component optimization',
          'Minimized layout shifts with proper dimension attributes',
          'Implemented efficient state management to reduce re-renders',
        ],
        results: [
          'Mobile Lighthouse Performance: 94–98',
          'Largest Contentful Paint (LCP): 1.9–2.3 seconds',
          'Total Blocking Time (TBT): 26–98 ms',
          'Consistent performance across 6 geographic regions',
        ],
        tools: [
          'Lighthouse',
          'Chrome DevTools',
          'Webpack Bundle Analyzer',
          'Playwright',
        ],
      },

      {
        id: 'motion-components',
        title: 'Reusable Typed Motion Components',
        subtitle: 'Type-Safe Motion Design System with Remotion',
        problem:
          'Motion design in video production required reusable, type-safe components capable of generating consistent animated content programmatically.',
        approach: [
          'Designed a component architecture with TypeScript for type safety',
          'Created typed APIs for motion composition and parameters',
          'Built reusable transitions and motion patterns',
          'Implemented animated charts and data-visualization components',
          'Designed responsive output formats for different use cases',
          'Implemented deterministic rendering for consistent output',
          'Enabled data-driven video generation from structured data',
        ],
        results: [
          'Type-safe motion composition with compile-time validation',
          'Reusable component library for consistent motion design',
          'Deterministic rendering for predictable output',
          'Responsive compositions for multiple output formats',
          'Data-driven workflow for programmatic video generation',
        ],
        tools: ['React', 'TypeScript', 'Remotion', 'FFmpeg'],
      },
    ],

    tr: [
      {
        id: 'payment-risk',
        title: 'Ödeme Riski Mimarisi',
        subtitle: 'AI Agent Güvenliği için Deterministik Kural Motoru',
        problem:
          'Ödeme işlemleri gerçekleştiren AI agent sistemlerinin, bilinen saldırı senaryolarına karşı doğrulanabilen deterministik ve test edilebilir güvenlik kurallarına ihtiyacı vardı.',
        approach: [
          'İşlemler, satıcılar, agentlar, kurallar, uyarılar ve loglardan oluşan 6 temel entity içeren domain modeli tasarladım',
          'Açık koşullara sahip 10 deterministik ödeme riski kuralı geliştirdim',
          'Test ve doğrulama için merchant saldırı senaryoları oluşturdum',
          'Asenkron SQLAlchemy veri erişim katmanı geliştirdim',
          'API payloadları ve domain modelleri için Pydantic doğrulaması ekledim',
          'Payload limitleri, redaction ve yapılandırılmış logging uyguladım',
          'Tutarlı geliştirme ortamları için Docker Compose quality gate yapısı kurdum',
        ],
        results: [
          'Deterministik ve tekrarlanabilir risk değerlendirmesi',
          'pytest ile otomatik test kapsamı',
          'Pydantic ile type-safe API kontratları',
          'Asenkron veritabanı mimarisi',
          'Hassas veriler ve logging için güvenlik odaklı yaklaşım',
        ],
        tools: [
          'FastAPI',
          'SQLAlchemy',
          'Pydantic',
          'pytest',
          'Docker',
          'asyncio',
        ],
      },

      {
        id: 'aviora-performance',
        title: 'Aviora Performans Optimizasyonu',
        subtitle: '94–98 Lighthouse Performans Skoruna Ulaşma',
        problem:
          'İlk performans ölçümleri, özellikle kullanıcıların iş başvurusu verilerine hızlı erişmesi gereken mobil cihazlarda Core Web Vitals değerlerinin iyileştirilebileceğini gösterdi.',
        approach: [
          'Bundle yapısını analiz ederek ağır bağımlılıkları belirledim',
          'Route bileşenleri için code splitting ve lazy loading uyguladım',
          'Görselleri responsive formatlar ve lazy loading ile optimize ettim',
          'Bileşen optimizasyonlarıyla JavaScript çalışma süresini azalttım',
          'Doğru boyut tanımlarıyla layout shift etkisini azalttım',
          'Gereksiz yeniden render işlemlerini azaltmak için state yönetimini optimize ettim',
        ],
        results: [
          'Mobil Lighthouse Performansı: 94–98',
          'Largest Contentful Paint (LCP): 1.9–2.3 saniye',
          'Total Blocking Time (TBT): 26–98 ms',
          '6 farklı coğrafi bölgede tutarlı performans',
        ],
        tools: [
          'Lighthouse',
          'Chrome DevTools',
          'Webpack Bundle Analyzer',
          'Playwright',
        ],
      },

      {
        id: 'motion-components',
        title: 'Yeniden Kullanılabilir Tip Güvenli Motion Bileşenleri',
        subtitle: 'Remotion ile Type-Safe Motion Design Sistemi',
        problem:
          'Video üretiminde tutarlı animasyonlu içerikleri programatik olarak oluşturabilmek için yeniden kullanılabilir ve tip güvenli bileşenlere ihtiyaç vardı.',
        approach: [
          'TypeScript ile tip güvenli bileşen mimarisi tasarladım',
          'Motion composition ve parametreler için typed API yapıları oluşturdum',
          'Yeniden kullanılabilir geçişler ve motion kalıpları geliştirdim',
          'Animasyonlu grafik ve veri görselleştirme bileşenleri oluşturdum',
          'Farklı kullanım alanları için responsive çıktı formatları tasarladım',
          'Tutarlı sonuçlar için deterministik rendering uyguladım',
          'Yapılandırılmış verilerden programatik video üretimini mümkün hale getirdim',
        ],
        results: [
          'Compile-time doğrulamalı type-safe motion composition',
          'Tutarlı motion tasarımı için yeniden kullanılabilir bileşen kütüphanesi',
          'Öngörülebilir sonuçlar için deterministik rendering',
          'Farklı çıktı formatlarına uyum sağlayan responsive composition yapısı',
          'Programatik video üretimi için veri odaklı workflow',
        ],
        tools: ['React', 'TypeScript', 'Remotion', 'FFmpeg'],
      },
    ],

    de: [
      {
        id: 'payment-risk',
        title: 'Architektur für Zahlungsrisiken',
        subtitle:
          'Deterministische Regel-Engine für die Sicherheit von KI-Agenten',
        problem:
          'KI-Agenten, die Zahlungsvorgänge verarbeiten, benötigen deterministische und testbare Sicherheitsregeln, die gegen bekannte Angriffsszenarien validiert werden können.',
        approach: [
          'Domänenmodell mit 6 Kernelementen entworfen: Transaktionen, Händler, Agenten, Regeln, Warnungen und Logs',
          '10 deterministische Regeln zur Bewertung von Zahlungsrisiken implementiert',
          'Angriffsszenarien für Tests und Validierung erstellt',
          'Asynchrone Datenzugriffsschicht mit SQLAlchemy entwickelt',
          'Pydantic-Validierung für API-Payloads und Domänenmodelle implementiert',
          'Payload-Limits, Datenmaskierung und strukturiertes Logging hinzugefügt',
          'Docker-Compose-Quality-Gates für konsistente Entwicklungsumgebungen eingerichtet',
        ],
        results: [
          'Deterministische und reproduzierbare Risikobewertung',
          'Automatisierte Tests mit pytest',
          'Typsichere API-Verträge mit Pydantic',
          'Asynchrone Datenbankarchitektur',
          'Sicherheitsorientierter Umgang mit Logging und sensiblen Daten',
        ],
        tools: [
          'FastAPI',
          'SQLAlchemy',
          'Pydantic',
          'pytest',
          'Docker',
          'asyncio',
        ],
      },

      {
        id: 'aviora-performance',
        title: 'Aviora Performance-Optimierung',
        subtitle: 'Lighthouse-Performance-Score von 94–98',
        problem:
          'Die ersten Performance-Messungen zeigten Verbesserungspotenzial bei den Core Web Vitals, insbesondere auf mobilen Geräten, auf denen Nutzer schnell auf ihre Bewerbungsdaten zugreifen müssen.',
        approach: [
          'Bundle-Zusammensetzung analysiert und umfangreiche Abhängigkeiten identifiziert',
          'Code-Splitting und Lazy Loading für Route-Komponenten implementiert',
          'Bildressourcen mit responsiven Formaten und Lazy Loading optimiert',
          'JavaScript-Ausführungszeit durch Komponentenoptimierung reduziert',
          'Layout-Verschiebungen durch korrekt definierte Abmessungen minimiert',
          'State-Management optimiert, um unnötige Re-Renders zu reduzieren',
        ],
        results: [
          'Mobile Lighthouse Performance: 94–98',
          'Largest Contentful Paint (LCP): 1,9–2,3 Sekunden',
          'Total Blocking Time (TBT): 26–98 ms',
          'Konsistente Performance in 6 geografischen Regionen',
        ],
        tools: [
          'Lighthouse',
          'Chrome DevTools',
          'Webpack Bundle Analyzer',
          'Playwright',
        ],
      },

      {
        id: 'motion-components',
        title: 'Wiederverwendbare typsichere Motion-Komponenten',
        subtitle: 'Typsicheres Motion-Design-System mit Remotion',
        problem:
          'Für die Videoproduktion wurden wiederverwendbare und typsichere Komponenten benötigt, mit denen sich konsistente animierte Inhalte programmatisch erzeugen lassen.',
        approach: [
          'Typsichere Komponentenarchitektur mit TypeScript entwickelt',
          'Typisierte APIs für Motion-Komposition und Parameter erstellt',
          'Wiederverwendbare Übergänge und Motion-Muster entwickelt',
          'Animierte Diagramme und Datenvisualisierungskomponenten implementiert',
          'Responsive Ausgabeformate für verschiedene Anwendungsfälle entwickelt',
          'Deterministisches Rendering für konsistente Ergebnisse implementiert',
          'Datengesteuerte Videogenerierung aus strukturierten Daten ermöglicht',
        ],
        results: [
          'Typsichere Motion-Komposition mit Compile-Time-Validierung',
          'Wiederverwendbare Komponentenbibliothek für konsistentes Motion Design',
          'Deterministisches Rendering für vorhersehbare Ergebnisse',
          'Responsive Kompositionen für unterschiedliche Ausgabeformate',
          'Datengesteuerter Workflow für programmatische Videogenerierung',
        ],
        tools: ['React', 'TypeScript', 'Remotion', 'FFmpeg'],
      },
    ],
  };

  const caseStudies =
    caseStudiesData[language] ||
    caseStudiesData.en;

  const currentLabels =
    labels[language] || labels.en;

  const totalApproachSteps =
    useMemo(
      () =>
        caseStudies.reduce(
          (sum, study) =>
            sum +
            study.approach.length,
          0
        ),
      [caseStudies]
    );

  const totalResults =
    useMemo(
      () =>
        caseStudies.reduce(
          (sum, study) =>
            sum +
            study.results.length,
          0
        ),
      [caseStudies]
    );

  const uniqueTools =
    useMemo(
      () =>
        [
          ...new Set(
            caseStudies.flatMap(
              (study) =>
                study.tools
            )
          ),
        ],
      [caseStudies]
    );

  const themeMap = {
    'aviora-performance': {
      label:
        currentLabels.performance,
      icon: FaTachometerAlt,
      gradient:
        'from-blue-700 via-blue-500 to-cyan-400',
      border:
        'border-blue-200/80 dark:border-blue-500/15',
      badge:
        'border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-500/15 dark:bg-blue-500/10 dark:text-blue-300',
      text:
        'text-blue-700 dark:text-blue-300',
      iconBox:
        'bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-300',
      step:
        'border-blue-200 text-blue-700 dark:border-blue-500/20 dark:text-blue-300',
      tool:
        'border-blue-100 text-blue-800 hover:border-blue-200 hover:bg-blue-50 dark:border-blue-500/10 dark:text-blue-200 dark:hover:border-blue-500/20 dark:hover:bg-blue-500/[0.08]',
      outerGlow:
        'bg-blue-500/15',
      spotlight:
        'rgba(37, 99, 235, 0.12)',
    },

    'payment-risk': {
      label:
        currentLabels.securityArchitecture,
      icon: FaShieldAlt,
      gradient:
        'from-emerald-600 via-teal-500 to-cyan-400',
      border:
        'border-emerald-200/80 dark:border-emerald-500/15',
      badge:
        'border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-500/15 dark:bg-emerald-500/10 dark:text-emerald-300',
      text:
        'text-emerald-700 dark:text-emerald-300',
      iconBox:
        'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300',
      step:
        'border-emerald-200 text-emerald-700 dark:border-emerald-500/20 dark:text-emerald-300',
      tool:
        'border-emerald-100 text-emerald-800 hover:border-emerald-200 hover:bg-emerald-50 dark:border-emerald-500/10 dark:text-emerald-200 dark:hover:border-emerald-500/20 dark:hover:bg-emerald-500/[0.08]',
      outerGlow:
        'bg-emerald-500/15',
      spotlight:
        'rgba(5, 150, 105, 0.12)',
    },

    'motion-components': {
      label:
        currentLabels.motionSystem,
      icon: FaFilm,
      gradient:
        'from-violet-600 via-fuchsia-500 to-cyan-400',
      border:
        'border-violet-200/80 dark:border-violet-500/15',
      badge:
        'border-violet-200 bg-violet-50 text-violet-700 dark:border-violet-500/15 dark:bg-violet-500/10 dark:text-violet-300',
      text:
        'text-violet-700 dark:text-violet-300',
      iconBox:
        'bg-violet-100 text-violet-700 dark:bg-violet-500/10 dark:text-violet-300',
      step:
        'border-violet-200 text-violet-700 dark:border-violet-500/20 dark:text-violet-300',
      tool:
        'border-violet-100 text-violet-800 hover:border-violet-200 hover:bg-violet-50 dark:border-violet-500/10 dark:text-violet-200 dark:hover:border-violet-500/20 dark:hover:bg-violet-500/[0.08]',
      outerGlow:
        'bg-violet-500/15',
      spotlight:
        'rgba(124, 58, 237, 0.12)',
    },
  };

  const decorativeCode = [
    {
      text: 'performance.mark()',
      position:
        'left-[3%] top-[13%]',
      size: 'text-4xl',
      duration: 9,
    },
    {
      text: 'LCP',
      position:
        'right-[6%] top-[22%]',
      size: 'text-7xl',
      duration: 8,
    },
    {
      text: 'riskRules[]',
      position:
        'left-[5%] top-[39%]',
      size: 'text-5xl',
      duration: 10,
    },
    {
      text: 'pytest',
      position:
        'right-[5%] top-[48%]',
      size: 'text-5xl',
      duration: 9.5,
    },
    {
      text: 'async',
      position:
        'left-[7%] top-[63%]',
      size: 'text-6xl',
      duration: 8.5,
    },
    {
      text: 'renderFrame()',
      position:
        'right-[4%] top-[73%]',
      size: 'text-4xl',
      duration: 11,
    },
    {
      text: 'type Safe<T>',
      position:
        'left-[4%] top-[85%]',
      size: 'text-4xl',
      duration: 10,
    },
    {
      text: '94–98',
      position:
        'right-[8%] top-[91%]',
      size: 'text-6xl',
      duration: 8,
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
          : 90,
        prefersReducedMotion
          ? 0
          : -90,
      ]
    );

  useEffect(() => {
    const items =
      document.querySelectorAll(
        '[data-case-study]'
      );

    if (!items.length) return undefined;

    const observer =
      new IntersectionObserver(
        (entries) => {
          const visible =
            entries
              .filter(
                (entry) =>
                  entry.isIntersecting
              )
              .sort(
                (a, b) =>
                  b.intersectionRatio -
                  a.intersectionRatio
              )[0];

          if (visible) {
            setActiveStudy(
              visible.target.dataset
                .caseStudy
            );
          }
        },
        {
          threshold: [
            0.25,
            0.4,
            0.55,
          ],
          rootMargin:
            '-15% 0px -45% 0px',
        }
      );

    items.forEach((item) =>
      observer.observe(item)
    );

    return () =>
      observer.disconnect();
  }, [language]);

  const scrollToStudy = (
    studyId
  ) => {
    const element =
      document.getElementById(
        studyId
      );

    element?.scrollIntoView({
      behavior:
        prefersReducedMotion
          ? 'auto'
          : 'smooth',
      block: 'start',
    });
  };

  return (
    <section
      ref={sectionRef}
      id="engineering"
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
      {/* GRID */}
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
          top-[16%]
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
          bottom-[14%]
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
                text-blue-950/[0.022]

                dark:text-blue-200/[0.032]

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
                          ? -15
                          : 15,
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
                  index * 0.28,
              }}
            >
              {item.text}
            </motion.span>
          )
        )}
      </div>

      {/* SECTION PROGRESS */}
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
            mb-12
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
            <FaRocket size={11} />
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
            {t.caseStudies.title}
          </motion.h2>

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
            {t.caseStudies.subtitle}
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
              delay: 0.3,
            }}
            className="
              mx-auto
              mt-8
              grid
              max-w-2xl
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
                {caseStudies.length}
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
                {currentLabels.caseStudies}
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
                {totalApproachSteps}
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
                {currentLabels.engineeringSteps}
              </div>
            </div>

            <div className="px-3 py-4 text-center">
              <div
                className="
                  text-xl
                  font-black
                  text-emerald-700

                  dark:text-emerald-400
                "
              >
                {totalResults}
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
                {currentLabels.outcomes}
              </div>
            </div>
          </motion.div>

          <p
            className="
              mt-3
              text-[10px]
              font-bold
              uppercase
              tracking-[0.13em]
              text-gray-400
            "
          >
            {uniqueTools.length}{' '}
            {currentLabels.toolsCount}
          </p>
        </motion.div>

        {/* STICKY NAVIGATOR */}
        <div
          className="
            sticky
            top-20
            z-30
            mx-auto
            mb-14
            max-w-5xl
          "
        >
          <div
            className="
              flex
              items-center
              gap-2
              overflow-x-auto
              rounded-2xl
              border
              border-gray-200/70
              bg-white/80
              p-2
              shadow-[0_12px_40px_rgba(15,23,42,0.07)]
              backdrop-blur-2xl
              [scrollbar-width:none]

              dark:border-white/[0.07]
              dark:bg-gray-950/80
            "
          >
            <div
              className="
                hidden
                flex-shrink-0
                items-center
                gap-2
                px-3
                text-[10px]
                font-black
                uppercase
                tracking-[0.12em]
                text-gray-400

                md:flex
              "
            >
              <FaLayerGroup size={10} />
              {currentLabels.navigator}
            </div>

            {caseStudies.map(
              (study, index) => {
                const active =
                  activeStudy ===
                  study.id;

                return (
                  <motion.button
                    key={study.id}
                    type="button"
                    onClick={() =>
                      scrollToStudy(
                        study.id
                      )
                    }
                    whileTap={{
                      scale: 0.97,
                    }}
                    className={`
                      relative
                      flex-shrink-0
                      rounded-xl
                      px-4
                      py-2.5
                      text-xs
                      font-bold
                      transition-colors

                      ${
                        active
                          ? 'text-blue-800 dark:text-blue-300'
                          : 'text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white'
                      }
                    `}
                  >
                    {active && (
                      <motion.span
                        layoutId="case-study-active"
                        className="
                          absolute
                          inset-0
                          -z-10
                          rounded-xl
                          border
                          border-blue-100
                          bg-blue-50

                          dark:border-blue-500/15
                          dark:bg-blue-500/10
                        "
                      />
                    )}

                    <span
                      className="
                        mr-2
                        font-mono
                        text-[10px]
                        opacity-50
                      "
                    >
                      0{index + 1}
                    </span>

                    {study.title}
                  </motion.button>
                );
              }
            )}
          </div>
        </div>

        {/* CASE STUDIES */}
        <div
          className="
            space-y-16

            lg:space-y-24
          "
        >
          {caseStudies.map(
            (study, index) => (
              <CaseStudyCard
                key={study.id}
                study={study}
                index={index}
                total={
                  caseStudies.length
                }
                labels={
                  currentLabels
                }
                theme={
                  themeMap[
                    study.id
                  ]
                }
                prefersReducedMotion={
                  prefersReducedMotion
                }
              />
            )
          )}
        </div>

        {/* CLOSING ENGINEERING STRIP */}
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
          className="
            relative
            mx-auto
            mt-20
            max-w-5xl
            overflow-hidden
            rounded-[2rem]
            border
            border-gray-200/70
            bg-white/75
            p-6
            shadow-[0_20px_70px_rgba(15,23,42,0.07)]
            backdrop-blur-xl

            dark:border-white/[0.07]
            dark:bg-white/[0.025]

            sm:p-8
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
              bg-violet-500/10
              blur-[90px]
            "
          />

          <div
            className="
              relative
              z-10
              grid
              gap-4

              sm:grid-cols-3
            "
          >
            {[
              {
                icon:
                  FaTachometerAlt,
                label:
                  currentLabels.measured,
              },
              {
                icon:
                  FaCode,
                label:
                  currentLabels.engineered,
              },
              {
                icon:
                  FaCheckCircle,
                label:
                  currentLabels.validated,
              },
            ].map(
              (
                item,
                index
              ) => {
                const Icon =
                  item.icon;

                return (
                  <motion.div
                    key={item.label}
                    whileHover={
                      prefersReducedMotion
                        ? undefined
                        : {
                            y: -4,
                          }
                    }
                    className="
                      rounded-2xl
                      border
                      border-gray-200/70
                      bg-white/70
                      p-5
                      text-center
                      shadow-sm

                      dark:border-white/[0.06]
                      dark:bg-white/[0.025]
                    "
                  >
                    <span
                      className="
                        mx-auto
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
                    </span>

                    <p
                      className="
                        mt-3
                        text-xs
                        font-black
                        uppercase
                        tracking-[0.13em]
                        text-gray-700

                        dark:text-gray-300
                      "
                    >
                      {item.label}
                    </p>

                    <span
                      className="
                        mt-2
                        block
                        font-mono
                        text-[10px]
                        text-gray-400
                      "
                    >
                      0{index + 1}
                    </span>
                  </motion.div>
                );
              }
            )}
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
          to-gray-50/30

          dark:to-gray-900/20
        "
      />
    </section>
  );
};

export default EngineeringCaseStudies;
