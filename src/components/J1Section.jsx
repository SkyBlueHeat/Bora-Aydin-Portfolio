import React, { useContext, useState } from 'react';

import {
  FaArrowRight,
  FaEnvelope,
  FaGlobeAmericas,
  FaCopy,
  FaDownload,
  FaTimes,
} from 'react-icons/fa';

import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from 'motion/react';

import { LanguageContext } from '../context/LanguageContext';

const J1Section = () => {
  const { language } = useContext(LanguageContext);
  const [showContactOptions, setShowContactOptions] = useState(false);
  const [emailCopied, setEmailCopied] = useState(false);
  const reducedMotion = useReducedMotion();
  const emailAddress = 'br.aydin@hotmail.com';

  const content = {
    en: {
      eyebrow: 'Global Software Engineering Opportunities',
      title: 'Open to Global Software Engineering Opportunities',
      subtitle: 'Based in Türkiye and open to relocation for the right software engineering opportunity, with particular interest in the United States and selected international technology markets.',
      professionalFocus: 'Professional Focus',
      ctaTitle: 'Let’s Build Something Valuable',
      ctaText: 'Interested in discussing a software engineering role or U.S. relocation opportunity?',
      contact: 'Contact me',
      downloadResume: 'Download Resume',
      emailSubject: 'Software Engineering Opportunity - Bora Aydin',
      emailBody: `Hi Bora,

I came across your portfolio and would like to discuss a software engineering opportunity.

Best regards,`,
      contactModalTitle: 'Choose how to contact me',
      contactModalText: 'Start a new email with your preferred email service or copy my email address.',
      openGmail: 'Open with Gmail',
      openOutlook: 'Open with Outlook',
      copyEmail: 'Copy email address',
      emailCopied: 'Email copied',
      close: 'Close',
      contactAria: 'Contact Bora Aydin by email',
      resumeAria: 'Download Bora Aydin resume',
      closeAria: 'Close contact options',
    },

    tr: {
      eyebrow: 'Global Yazılım Mühendisliği Fırsatları',
      title: 'Global Yazılım Mühendisliği Fırsatlarına Açığım',
      subtitle: 'Türkiye\'de yaşıyorum ve doğru yazılım mühendisliği fırsatı için taşınmaya açığım. Özellikle ABD ve seçilmiş uluslararası teknoloji pazarlarına güçlü ilgi duyuyorum.',
      professionalFocus: 'Profesyonel Odak',
      ctaTitle: 'Birlikte Değerli Bir Şey Geliştirelim',
      ctaText: 'Yazılım mühendisliği rolü veya ABD\'ye taşınma fırsatı hakkında görüşmek ister misiniz?',
      contact: 'İletişime geç',
      downloadResume: 'Özgeçmiş İndir',
      emailSubject: 'Yazılım Mühendisliği Fırsatı - Bora Aydin',
      emailBody: `Merhaba Bora,

Portföyünüzü gördüm ve bir yazılım mühendisliği fırsatı hakkında görüşmek istiyorum.

Saygılarımla,`,
      contactModalTitle: 'İletişim yöntemini seçin',
      contactModalText: 'Tercih ettiğiniz e-posta servisiyle yeni bir mesaj oluşturabilir veya e-posta adresimi kopyalayabilirsiniz.',
      openGmail: 'Gmail ile Aç',
      openOutlook: 'Outlook ile Aç',
      copyEmail: 'E-posta Adresini Kopyala',
      emailCopied: 'E-posta Kopyalandı',
      close: 'Kapat',
      contactAria: 'Bora Aydin ile e-posta üzerinden iletişime geç',
      resumeAria: 'Bora Aydin özgeçmişini indir',
      closeAria: 'İletişim seçeneklerini kapat',
    },

    de: {
      eyebrow: 'Globale Software-Engineering-Möglichkeiten',
      title: 'Offen für globale Software-Engineering-Möglichkeiten',
      subtitle: 'Ich lebe in der Türkei und bin für die passende Software-Engineering-Möglichkeit zu einem Umzug bereit – mit besonderem Interesse an den USA und ausgewählten internationalen Technologie-Märkten.',
      professionalFocus: 'Professioneller Fokus',
      ctaTitle: 'Lassen Sie uns etwas Wertvolles entwickeln',
      ctaText: 'Interessiert an einer Software-Ingenieur-Position oder einem Umzug in die USA?',
      contact: 'Kontaktieren Sie mich',
      downloadResume: 'Lebenslauf herunterladen',
      emailSubject: 'Software-Engineering-Möglichkeit - Bora Aydin',
      emailBody: `Hallo Bora,

Ich habe Ihr Portfolio gesehen und möchte über eine Software-Engineering-Möglichkeit sprechen.

Mit freundlichen Grüßen,`,
      contactModalTitle: 'Wählen Sie, wie Sie mich kontaktieren möchten',
      contactModalText: 'Starten Sie eine neue E-Mail mit Ihrem bevorzugten E-Mail-Dienst oder kopieren Sie meine E-Mail-Adresse.',
      openGmail: 'Mit Gmail öffnen',
      openOutlook: 'Mit Outlook öffnen',
      copyEmail: 'E-Mail-Adresse kopieren',
      emailCopied: 'E-Mail kopiert',
      close: 'Schließen',
      contactAria: 'Bora Aydin per E-Mail kontaktieren',
      resumeAria: 'Lebenslauf von Bora Aydin herunterladen',
      closeAria: 'Kontaktoptionen schließen',
    },
  };

  const current = content[language] || content.en;

  const handleEmailCopy = () => {
    navigator.clipboard.writeText(emailAddress);
    setEmailCopied(true);
    setTimeout(() => setEmailCopied(false), 2000);
  };

  const openGmail = () => {
    const subject = encodeURIComponent(current.emailSubject);
    const body = encodeURIComponent(current.emailBody);
    window.open(`https://mail.google.com/mail/?view=cm&fs=1&su=${subject}&body=${body}`, '_blank');
  };

  const openOutlook = () => {
    const subject = encodeURIComponent(current.emailSubject);
    const body = encodeURIComponent(current.emailBody);
    window.open(`https://outlook.live.com/owa/?path=/mail/action/compose&subject=${subject}&body=${body}`, '_blank');
  };

  return (
    <section
      id="opportunities"
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
            reducedMotion
              ? { opacity: 1 }
              : { opacity: 0, y: 30 }
          }
          whileInView={
            reducedMotion
              ? { opacity: 1 }
              : { opacity: 1, y: 0 }
          }
          viewport={{ once: true }}
          transition={
            reducedMotion
              ? { duration: 0 }
              : { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
          }
          className="
            mx-auto
            max-w-3xl
            text-center
          "
        >
          <span
            className="
              inline-block
              rounded-full
              bg-blue-50
              px-4
              py-1.5
              text-sm
              font-semibold
              text-blue-700
              dark:bg-blue-500/10
              dark:text-blue-300
            "
          >
            {current.eyebrow}
          </span>

          <h2
            className="
              mt-6
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

          <div
            className="
              mt-10
              flex
              flex-col
              items-center
              justify-center
              gap-4
              sm:flex-row
            "
          >
            <motion.button
              whileHover={
                reducedMotion
                  ? undefined
                  : { scale: 1.05 }
              }
              whileTap={
                reducedMotion
                  ? undefined
                  : { scale: 0.98 }
              }
              onClick={() => setShowContactOptions(true)}
              className="
                inline-flex
                items-center
                gap-2
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
              aria-label={current.contactAria}
            >
              <FaEnvelope size={16} />
              {current.contact}
            </motion.button>

            <motion.a
              whileHover={
                reducedMotion
                  ? undefined
                  : { scale: 1.05 }
              }
              whileTap={
                reducedMotion
                  ? undefined
                  : { scale: 0.98 }
              }
              href="/Bora_Aydin_J1_Resume.pdf"
              download
              className="
                inline-flex
                items-center
                gap-2
                rounded-xl
                border-2
                border-gray-300
                bg-white
                px-7
                py-3.5
                text-base
                font-semibold
                text-gray-950
                shadow-sm
                outline-none
                transition-colors
                hover:border-gray-400
                focus-visible:ring-2
                focus-visible:ring-blue-500
                focus-visible:ring-offset-2
                dark:border-gray-700
                dark:bg-gray-900
                dark:text-white
                dark:hover:border-gray-600
                dark:focus-visible:ring-offset-gray-950
              "
              aria-label={current.resumeAria}
            >
              <FaDownload size={16} />
              {current.downloadResume}
            </motion.a>
          </div>
        </motion.div>
      </div>

      <AnimatePresence>
        {showContactOptions && (
          <motion.div
            initial={
              reducedMotion
                ? { opacity: 1 }
                : { opacity: 0 }
            }
            animate={
              reducedMotion
                ? { opacity: 1 }
                : { opacity: 1 }
            }
            exit={
              reducedMotion
                ? { opacity: 1 }
                : { opacity: 0 }
            }
            transition={
              reducedMotion
                ? { duration: 0 }
                : { duration: 0.2 }
            }
            className="
              fixed
              inset-0
              z-50
              flex
              items-center
              justify-center
              bg-black/50
              backdrop-blur-sm
              p-4
            "
            onClick={() => setShowContactOptions(false)}
          >
            <motion.div
              initial={
                reducedMotion
                  ? { scale: 1 }
                  : { scale: 0.95, opacity: 0 }
              }
              animate={
                reducedMotion
                  ? { scale: 1 }
                  : { scale: 1, opacity: 1 }
              }
              exit={
                reducedMotion
                  ? { scale: 1 }
                  : { scale: 0.95, opacity: 0 }
              }
              transition={
                reducedMotion
                  ? { duration: 0 }
                  : { duration: 0.2 }
              }
              className="
                relative
                w-full
                max-w-md
                rounded-2xl
                bg-white
                p-6
                shadow-2xl
                dark:bg-gray-900
              "
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setShowContactOptions(false)}
                className="
                  absolute
                  right-4
                  top-4
                  rounded-lg
                  p-2
                  text-gray-400
                  transition-colors
                  hover:bg-gray-100
                  hover:text-gray-600
                  dark:hover:bg-gray-800
                  dark:hover:text-gray-200
                "
                aria-label={current.closeAria}
              >
                <FaTimes size={18} />
              </button>

              <h3
                className="
                  mb-2
                  text-xl
                  font-bold
                  text-gray-950
                  dark:text-white
                "
              >
                {current.contactModalTitle}
              </h3>

              <p
                className="
                  mb-6
                  text-sm
                  text-gray-600
                  dark:text-gray-400
                "
              >
                {current.contactModalText}
              </p>

              <div
                className="
                  flex
                  flex-col
                  gap-3
                "
              >
                <button
                  onClick={openGmail}
                  className="
                    flex
                    items-center
                    gap-3
                    rounded-xl
                    border
                    border-gray-200
                    p-4
                    text-left
                    transition-colors
                    hover:bg-gray-50
                    dark:border-gray-700
                    dark:hover:bg-gray-800
                  "
                >
                  <div
                    className="
                      flex
                      h-10
                      w-10
                      items-center
                      justify-center
                      rounded-lg
                      bg-red-50
                      text-red-600
                      dark:bg-red-500/10
                      dark:text-red-400
                    "
                  >
                    <FaEnvelope size={18} />
                  </div>
                  <div>
                    <p
                      className="
                        font-semibold
                        text-gray-950
                        dark:text-white
                      "
                    >
                      {current.openGmail}
                    </p>
                  </div>
                </button>

                <button
                  onClick={openOutlook}
                  className="
                    flex
                    items-center
                    gap-3
                    rounded-xl
                    border
                    border-gray-200
                    p-4
                    text-left
                    transition-colors
                    hover:bg-gray-50
                    dark:border-gray-700
                    dark:hover:bg-gray-800
                  "
                >
                  <div
                    className="
                      flex
                      h-10
                      w-10
                      items-center
                      justify-center
                      rounded-lg
                      bg-blue-50
                      text-blue-600
                      dark:bg-blue-500/10
                      dark:text-blue-400
                    "
                  >
                    <FaEnvelope size={18} />
                  </div>
                  <div>
                    <p
                      className="
                        font-semibold
                        text-gray-950
                        dark:text-white
                      "
                    >
                      {current.openOutlook}
                    </p>
                  </div>
                </button>

                <button
                  onClick={handleEmailCopy}
                  className="
                    flex
                    items-center
                    gap-3
                    rounded-xl
                    border
                    border-gray-200
                    p-4
                    text-left
                    transition-colors
                    hover:bg-gray-50
                    dark:border-gray-700
                    dark:hover:bg-gray-800
                  "
                >
                  <div
                    className="
                      flex
                      h-10
                      w-10
                      items-center
                      justify-center
                      rounded-lg
                      bg-gray-100
                      text-gray-600
                      dark:bg-gray-800
                      dark:text-gray-300
                    "
                  >
                    {emailCopied ? (
                      <FaCheck size={18} />
                    ) : (
                      <FaCopy size={18} />
                    )}
                  </div>
                  <div>
                    <p
                      className="
                        font-semibold
                        text-gray-950
                        dark:text-white
                      "
                    >
                      {emailCopied
                        ? current.emailCopied
                        : current.copyEmail}
                    </p>
                    <p
                      className="
                        text-sm
                        text-gray-500
                        dark:text-gray-400
                      "
                    >
                      {emailAddress}
                    </p>
                  </div>
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default J1Section;
