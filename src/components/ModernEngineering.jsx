import React, {
  useContext,
  useRef,
} from 'react';

import {
  FaBolt,
  FaCheck,
  FaCode,
  FaCogs,
  FaLightbulb,
  FaShieldAlt,
  FaTools,
  FaUserCheck,
} from 'react-icons/fa';

import {
  motion,
  useReducedMotion,
} from 'motion/react';

import { LanguageContext } from '../context/LanguageContext';

const ModernEngineering = () => {
  const { language } = useContext(LanguageContext);
  const sectionRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();

  const content = {
    en: {
      title: 'AI-Assisted Engineering',
      subtitle: 'I use AI as an engineering accelerator, not as a substitute for technical understanding.',
      approach: 'AI helps me explore solutions, debug faster, refactor, prototype, and research technical concepts more efficiently. Architecture, implementation decisions, testing, validation, and final code quality remain my responsibility.',
      ownership: 'AI accelerates the workflow. Engineering ownership stays with me.',
      useCases: [
        { icon: FaLightbulb, label: 'Solution Exploration' },
        { icon: FaTools, label: 'Debugging' },
        { icon: FaCogs, label: 'Refactoring' },
        { icon: FaBolt, label: 'Rapid Prototyping' },
        { icon: FaCode, label: 'Technical Research' },
      ],
      ownershipAreas: [
        'Architecture',
        'Implementation Decisions',
        'Testing',
        'Validation',
        'Code Review',
        'Final Code Quality',
      ],
      tools: 'ChatGPT · Claude · Cursor · Windsurf',
      final: 'AI can suggest. I evaluate, implement, test, and own the result.',
    },

    tr: {
      title: 'AI Destekli Mühendislik',
      subtitle: 'AI araçlarını teknik anlayışın yerine değil, mühendislik sürecini hızlandıran araçlar olarak kullanıyorum.',
      approach: 'AI; çözüm seçeneklerini araştırmamı, hata ayıklama sürecini hızlandırmamı, refactoring, hızlı prototipleme ve teknik araştırmayı daha verimli yürütmemi destekliyor. Mimari, implementasyon kararları, test, doğrulama ve final kod kalitesi benim sorumluluğumda kalıyor.',
      ownership: 'AI süreci hızlandırır. Mühendislik sorumluluğu bende kalır.',
      useCases: [
        { icon: FaLightbulb, label: 'Çözüm Araştırma' },
        { icon: FaTools, label: 'Hata Ayıklama' },
        { icon: FaCogs, label: 'Refactoring' },
        { icon: FaBolt, label: 'Hızlı Prototipleme' },
        { icon: FaCode, label: 'Teknik Araştırma' },
      ],
      ownershipAreas: [
        'Mimari',
        'Implementasyon Kararları',
        'Test',
        'Doğrulama',
        'Kod İncelemesi',
        'Final Kod Kalitesi',
      ],
      tools: 'ChatGPT · Claude · Cursor · Windsurf',
      final: 'AI öneride bulunabilir. Sonucu değerlendirir, uygular, test eder, doğrular ve sorumluluğunu ben alırım.',
    },

    de: {
      title: 'KI-unterstützte Softwareentwicklung',
      subtitle: 'Ich nutze KI als Engineering-Beschleuniger, nicht als Ersatz für technisches Verständnis.',
      approach: 'KI hilft mir, Lösungen zu erkunden, schneller zu debuggen, zu refaktorieren, zu prototypisieren und technische Konzepte effizienter zu erforschen. Architektur, Implementierungsentscheidungen, Tests, Validierung und finale Code-Qualität bleiben meine Verantwortung.',
      ownership: 'KI beschleunigt den Workflow. Engineering-Verantwortung bleibt bei mir.',
      useCases: [
        { icon: FaLightbulb, label: 'Lösungserkundung' },
        { icon: FaTools, label: 'Debugging' },
        { icon: FaCogs, label: 'Refactoring' },
        { icon: FaBolt, label: 'Schnelles Prototyping' },
        { icon: FaCode, label: 'Technische Forschung' },
      ],
      ownershipAreas: [
        'Architektur',
        'Implementierungsentscheidungen',
        'Tests',
        'Validierung',
        'Code-Review',
        'Finale Code-Qualität',
      ],
      tools: 'ChatGPT · Claude · Cursor · Windsurf',
      final: 'KI kann vorschlagen. Ich bewerte, implementiere, teste und übernehme das Ergebnis.',
    },
  };

  const current = content[language] || content.en;

  return (
    <section
      ref={sectionRef}
      className="
        relative
        isolate
        overflow-hidden
        bg-gradient-to-b
        from-white
        to-gray-50
        py-20
        dark:from-gray-950
        dark:to-gray-900
        sm:py-24
        lg:py-28
      "
    >
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
        <motion.div
          initial={
            prefersReducedMotion
              ? { opacity: 1 }
              : { opacity: 0, y: 30 }
          }
          whileInView={
            prefersReducedMotion
              ? { opacity: 1 }
              : { opacity: 1, y: 0 }
          }
          viewport={{ once: true }}
          transition={
            prefersReducedMotion
              ? { duration: 0 }
              : { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
          }
          className="
            mx-auto
            max-w-3xl
            text-center
          "
        >
          <h2
            className="
              text-3xl
              font-black
              tracking-[-0.04em]
              text-gray-950
              dark:text-white
              sm:text-4xl
              sm:tracking-[-0.045em]
              lg:text-5xl
              lg:tracking-[-0.05em]
            "
          >
            {current.title}
          </h2>

          <p
            className="
              mt-6
              text-lg
              leading-relaxed
              text-gray-600
              dark:text-gray-300
              sm:text-xl
            "
          >
            {current.subtitle}
          </p>
        </motion.div>

        <motion.div
          initial={
            prefersReducedMotion
              ? { opacity: 1 }
              : { opacity: 0, y: 20 }
          }
          whileInView={
            prefersReducedMotion
              ? { opacity: 1 }
              : { opacity: 1, y: 0 }
          }
          viewport={{ once: true }}
          transition={
            prefersReducedMotion
              ? { duration: 0 }
              : { duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }
          }
          className="
            mt-12
            rounded-2xl
            border
            border-blue-200/70
            bg-gradient-to-br
            from-blue-50
            via-white
            to-violet-50
            p-8
            shadow-[0_20px_60px_rgba(37,99,235,0.12)]
            dark:border-blue-500/15
            dark:from-blue-950/25
            dark:via-gray-950
            dark:to-violet-950/20
            sm:p-10
          "
        >
          <p
            className="
              text-center
              text-base
              leading-relaxed
              text-gray-700
              dark:text-gray-300
              sm:text-lg
            "
          >
            {current.approach}
          </p>

          <div
            className="
              mt-8
              grid
              grid-cols-1
              gap-4
              sm:grid-cols-2
              sm:gap-6
            "
          >
            <div>
              <h3
                className="
                  mb-4
                  text-sm
                  font-bold
                  uppercase
                  tracking-[0.12em]
                  text-gray-500
                  dark:text-gray-400
                "
              >
                How AI Helps
              </h3>

              <div
                className="
                  space-y-3
                "
              >
                {current.useCases.map((useCase, index) => (
                  <motion.div
                    key={useCase.label}
                    initial={
                      prefersReducedMotion
                        ? { opacity: 1 }
                        : { opacity: 0, x: -10 }
                    }
                    whileInView={
                      prefersReducedMotion
                        ? { opacity: 1 }
                        : { opacity: 1, x: 0 }
                    }
                    viewport={{ once: true }}
                    transition={
                      prefersReducedMotion
                        ? { duration: 0 }
                        : { duration: 0.4, delay: index * 0.05 }
                    }
                    className="
                      flex
                      items-center
                      gap-3
                      rounded-xl
                      bg-white/60
                      px-4
                      py-3
                      backdrop-blur-sm
                      dark:bg-white/[0.03]
                    "
                  >
                    <useCase.icon
                      className="
                        text-blue-600
                        dark:text-blue-400
                      "
                      size={16}
                    />
                    <span
                      className="
                        text-sm
                        font-medium
                        text-gray-700
                        dark:text-gray-300
                      "
                    >
                      {useCase.label}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>

            <div>
              <h3
                className="
                  mb-4
                  text-sm
                  font-bold
                  uppercase
                  tracking-[0.12em]
                  text-gray-500
                  dark:text-gray-400
                "
              >
                My Responsibility
              </h3>

              <div
                className="
                  space-y-3
                "
              >
                {current.ownershipAreas.map((area, index) => (
                  <motion.div
                    key={area}
                    initial={
                      prefersReducedMotion
                        ? { opacity: 1 }
                        : { opacity: 0, x: 10 }
                    }
                    whileInView={
                      prefersReducedMotion
                        ? { opacity: 1 }
                        : { opacity: 1, x: 0 }
                    }
                    viewport={{ once: true }}
                    transition={
                      prefersReducedMotion
                        ? { duration: 0 }
                        : { duration: 0.4, delay: index * 0.05 }
                    }
                    className="
                      flex
                      items-center
                      gap-3
                      rounded-xl
                      bg-white/60
                      px-4
                      py-3
                      backdrop-blur-sm
                      dark:bg-white/[0.03]
                    "
                  >
                    <FaCheck
                      className="
                        text-emerald-600
                        dark:text-emerald-400
                      "
                      size={16}
                    />
                    <span
                      className="
                        text-sm
                        font-medium
                        text-gray-700
                        dark:text-gray-300
                      "
                    >
                      {area}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          <div
            className="
              mt-8
              flex
              flex-col
              items-center
              gap-4
              sm:flex-row
              sm:justify-between
            "
          >
            <div
              className="
                text-sm
                text-gray-500
                dark:text-gray-400
              "
            >
              <span className="font-medium">Tools:</span> {current.tools}
            </div>

            <div
              className="
                flex
                items-center
                gap-2
                rounded-full
                border
                border-emerald-200
                bg-emerald-50/70
                px-5
                py-2.5
                text-sm
                font-semibold
                text-emerald-800
                dark:border-emerald-500/20
                dark:bg-emerald-500/10
                dark:text-emerald-300
              "
            >
              <FaShieldAlt size={14} />
              {current.ownership}
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={
            prefersReducedMotion
              ? { opacity: 1 }
              : { opacity: 0, y: 20 }
          }
          whileInView={
            prefersReducedMotion
              ? { opacity: 1 }
              : { opacity: 1, y: 0 }
          }
          viewport={{ once: true }}
          transition={
            prefersReducedMotion
              ? { duration: 0 }
              : { duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }
          }
          className="
            mt-8
            text-center
          "
        >
          <p
            className="
              text-base
              font-medium
              text-gray-700
              dark:text-gray-300
              sm:text-lg
            "
          >
            {current.final}
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default ModernEngineering;
