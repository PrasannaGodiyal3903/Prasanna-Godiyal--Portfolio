import { motion, useReducedMotion } from "framer-motion";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { HiChevronDown } from "react-icons/hi2";
import { personalInfo } from "../data/portfolio";

/* ─── animation helpers ─── */
const container = {
  hidden: { opacity: 0 },
  visible: (reducedMotion) => ({
    opacity: 1,
    transition: reducedMotion
      ? { duration: 0 }
      : { staggerChildren: 0.15, delayChildren: 0.3 },
  }),
};

const childFade = {
  hidden: (reducedMotion) =>
    reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 },
  visible: (reducedMotion) => ({
    opacity: 1,
    y: 0,
    transition: reducedMotion
      ? { duration: 0 }
      : { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  }),
};

/* ─── component ─── */
export default function Hero() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ backgroundColor: "var(--color-bg)" }}
      aria-label="Hero — introduction"
    >
      {/* ── animated background blob ── */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -z-0 h-[520px] w-[520px] rounded-full opacity-60 blur-3xl md:h-[720px] md:w-[720px]"
        style={{ backgroundColor: "var(--color-accent-soft)" }}
        animate={
          prefersReducedMotion
            ? {}
            : {
                x: [0, 40, -30, 0],
                y: [0, -35, 25, 0],
                scale: [1, 1.08, 0.95, 1],
              }
        }
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* ── content ── */}
      <motion.div
        className="section-container relative z-10 flex flex-col items-center text-center"
        variants={container}
        initial="hidden"
        animate="visible"
        custom={prefersReducedMotion}
      >
        {/* greeting label */}
        <motion.span
          variants={childFade}
          custom={prefersReducedMotion}
          className="section-label mb-6 justify-center"
        >
          Hello, I&rsquo;m
        </motion.span>

        {/* name — split across two lines */}
        <motion.h1
          variants={childFade}
          custom={prefersReducedMotion}
          className="font-semibold leading-[1.05] tracking-tight"
          style={{
            fontFamily:
      '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Helvetica Neue", Arial, sans-serif',
    fontSize: "clamp(3rem, 8vw, 7rem)",
    fontWeight: 700,
    letterSpacing: "-0.05em",
    color: "var(--color-text-primary)",
          }}
        >
          <span className="block">{personalInfo.firstName}</span>
          <span className="block" style={{ color: "var(--color-accent)" }}>
            {personalInfo.lastName}
            <span
              className="inline-block translate-y-[-0.15em] ml-1"
              style={{ color: "var(--color-accent)" }}
            >
              .
            </span>
          </span>
        </motion.h1>

        {/* title */}
        <motion.p
          variants={childFade}
          custom={prefersReducedMotion}
          className="mt-4 text-xl md:text-2xl font-medium"
          style={{
            fontFamily: "var(--font-heading)",
            color: "var(--color-text-secondary)",
          }}
        >
          {personalInfo.title}
        </motion.p>

        {/* tagline */}
        <motion.p
          variants={childFade}
          custom={prefersReducedMotion}
          className="mt-3 max-w-lg text-lg leading-relaxed"
          style={{
            fontFamily: "var(--font-body)",
            color: "var(--color-text-muted)",
          }}
        >
          {personalInfo.tagline}
        </motion.p>

        {/* ── decorative divider ── */}
        <motion.div
          variants={childFade}
          custom={prefersReducedMotion}
          className="my-8 flex items-center gap-3"
          aria-hidden="true"
        >
          <span
            className="block h-px w-12"
            style={{ backgroundColor: "var(--color-border-light)" }}
          />
          <span
            className="block h-1.5 w-1.5 rotate-45 rounded-[1px]"
            style={{ backgroundColor: "var(--color-accent)" }}
          />
          <span
            className="block h-px w-12"
            style={{ backgroundColor: "var(--color-border-light)" }}
          />
        </motion.div>

        {/* ── CTA buttons ── */}
        <motion.div
          variants={childFade}
          custom={prefersReducedMotion}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          {/* primary — scroll to projects */}
          <motion.a
            href="#projects"
            whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
            whileTap={prefersReducedMotion ? {} : { scale: 0.97 }}
            className="inline-flex items-center gap-2 rounded-full px-8 py-3.5 font-medium transition-colors"
            style={{
              backgroundColor: "var(--color-accent)",
              color: "var(--color-bg)",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor =
                "var(--color-accent-hover)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = "var(--color-accent)")
            }
          >
            View My Work
          </motion.a>

          {/* secondary — resume */}
          <motion.a
            href={personalInfo.resumePath}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
            whileTap={prefersReducedMotion ? {} : { scale: 0.97 }}
            className="inline-flex items-center gap-2 rounded-full border px-8 py-3.5 font-medium transition-colors"
            style={{
              borderColor: "var(--color-border-light)",
              color: "var(--color-text-primary)",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.borderColor = "var(--color-accent)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.borderColor = "var(--color-border-light)")
            }
          >
            View Resume
          </motion.a>
        </motion.div>

        {/* ── social links ── */}
        <motion.div
          variants={childFade}
          custom={prefersReducedMotion}
          className="mt-10 flex items-center gap-5"
        >
          {personalInfo.github && (
            <a
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub profile"
              className="transition-colors"
              style={{ color: "var(--color-text-muted)" }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = "var(--color-accent)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = "var(--color-text-muted)")
              }
            >
              <FaGithub size={22} />
            </a>
          )}

          {personalInfo.linkedin && (
            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn profile"
              className="transition-colors"
              style={{ color: "var(--color-text-muted)" }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = "var(--color-accent)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = "var(--color-text-muted)")
              }
            >
              <FaLinkedinIn size={22} />
            </a>
          )}
        </motion.div>
      </motion.div>

      {/* ── scroll-down indicator ── */}
      <motion.a
        href="#about"
        aria-label="Scroll down"
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={
          prefersReducedMotion ? { duration: 0 } : { delay: 2, duration: 0.8 }
        }
      >
        <motion.span
          className="flex flex-col items-center gap-1"
          animate={prefersReducedMotion ? {} : { y: [0, 8, 0] }}
          transition={{
            duration: 1.6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <HiChevronDown
            size={26}
            style={{ color: "var(--color-text-muted)" }}
          />
        </motion.span>
      </motion.a>
    </section>
  );
}
