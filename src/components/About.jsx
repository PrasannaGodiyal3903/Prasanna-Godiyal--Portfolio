import { motion, useReducedMotion } from "framer-motion";
import { HiOutlineMail, HiOutlineLocationMarker } from "react-icons/hi";
import { HiOutlineBriefcase, HiOutlineUser } from "react-icons/hi2";
import { personalInfo, aboutMe } from "../data/portfolio";

const About = () => {
  const prefersReducedMotion = useReducedMotion();

  const transition = prefersReducedMotion
    ? { duration: 0 }
    : { duration: 0.6, ease: [0.16, 1, 0.3, 1] };

  const staggerContainer = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : 0.12,
      },
    },
  };

  const fadeUp = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition,
    },
  };

  const fadeLeft = {
    hidden: { opacity: 0, x: prefersReducedMotion ? 0 : 32 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { ...transition, duration: 0.7 },
    },
  };

  const quickFacts = [
    {
      icon: HiOutlineUser,
      label: "Name",
      value: personalInfo.name,
    },
    {
      icon: HiOutlineBriefcase,
      label: "Role",
      value: personalInfo.title,
    },
    {
      icon: HiOutlineLocationMarker,
      label: "Location",
      value: personalInfo.location,
    },
    {
      icon: HiOutlineMail,
      label: "Email",
      value: personalInfo.email,
    },
  ];

  return (
    <section
      id="about"
      className="py-28 md:py-32"
      style={{ backgroundColor: "var(--color-bg)" }}
      aria-labelledby="about-heading"
    >
      <div className="section-container">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start"
        >
          {/* ─── Left Column: Text Content ─── */}
          <div>
            <motion.p variants={fadeUp} className="section-label">
              ABOUT ME
            </motion.p>

            <motion.h2
              id="about-heading"
              variants={fadeUp}
              className="section-title mt-4 mb-6"
            >
              A bit about&nbsp;
              <span style={{ color: "var(--color-accent)" }}>
                who I am
              </span>
            </motion.h2>

            <div className="space-y-5">
              {aboutMe.paragraphs.map((paragraph, index) => (
                <motion.p
                  key={index}
                  variants={fadeUp}
                  className="text-lg leading-relaxed"
                  style={{
                    fontFamily: "var(--font-body)",
                    color: "var(--color-text-secondary)",
                  }}
                >
                  {paragraph}
                </motion.p>
              ))}
            </div>

            {/* ─── Decorative accent bar ─── */}
            <motion.div
              variants={fadeUp}
              className="mt-8 flex items-center gap-3"
            >
              <span
                className="block h-[2px] w-10 rounded-full"
                style={{ backgroundColor: "var(--color-accent)" }}
              />
              <span
                className="text-xs font-medium uppercase tracking-widest"
                style={{
                  fontFamily: "var(--font-mono)",
                  color: "var(--color-text-muted)",
                }}
              >
                Always learning
              </span>
            </motion.div>
          </div>

          {/* ─── Right Column: Info Card ─── */}
          <motion.div
            variants={fadeLeft}
            className="rounded-2xl p-8 border transition-colors duration-300 relative overflow-hidden group"
            style={{
              backgroundColor: "var(--color-bg-card)",
              borderColor: "var(--color-border)",
            }}
            whileHover={
              prefersReducedMotion
                ? {}
                : { borderColor: "var(--color-border-light)" }
            }
            aria-label="Quick facts about me"
          >
            {/* ─── Corner accent glow ─── */}
            <div
              className="absolute -top-20 -right-20 h-40 w-40 rounded-full opacity-10 blur-3xl pointer-events-none transition-opacity duration-500 group-hover:opacity-20"
              style={{ backgroundColor: "var(--color-accent)" }}
            />

            {/* ─── Card Header ─── */}
            <div className="mb-8">
              <h3
                className="text-sm font-semibold uppercase tracking-wider mb-1"
                style={{
                  fontFamily: "var(--font-mono)",
                  color: "var(--color-accent)",
                }}
              >
                Quick Facts
              </h3>
              <div
                className="h-[1px] w-12"
                style={{ backgroundColor: "var(--color-accent-soft)" }}
              />
            </div>

            {/* ─── Fact Items ─── */}
            <ul className="space-y-6" role="list">
              {quickFacts.map((fact, index) => {
                const Icon = fact.icon;
                return (
                  <motion.li
                    key={fact.label}
                    className="flex items-start gap-4"
                    variants={{
                      hidden: {
                        opacity: 0,
                        x: prefersReducedMotion ? 0 : 16,
                      },
                      visible: {
                        opacity: 1,
                        x: 0,
                        transition: {
                          ...transition,
                          delay: prefersReducedMotion
                            ? 0
                            : 0.1 * index,
                        },
                      },
                    }}
                  >
                    {/* Icon container */}
                    <span
                      className="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-lg"
                      style={{
                        backgroundColor: "var(--color-accent-soft)",
                      }}
                    >
                      <Icon
                        className="h-5 w-5"
                        style={{ color: "var(--color-accent)" }}
                        aria-hidden="true"
                      />
                    </span>

                    {/* Text */}
                    <div className="min-w-0">
                      <p
                        className="text-xs uppercase tracking-wider mb-0.5"
                        style={{
                          fontFamily: "var(--font-mono)",
                          color: "var(--color-text-muted)",
                        }}
                      >
                        {fact.label}
                      </p>
                      <p
                        className="text-base truncate"
                        style={{
                          fontFamily: "var(--font-body)",
                          color: "var(--color-text-primary)",
                        }}
                        title={fact.value}
                      >
                        {fact.value}
                      </p>
                    </div>
                  </motion.li>
                );
              })}
            </ul>

            {/* ─── Card Footer: subtle status indicator ─── */}
            <div
              className="mt-8 pt-6 flex items-center gap-2"
              style={{ borderTop: "1px solid var(--color-border)" }}
            >
              <span
                className="relative flex h-2.5 w-2.5"
                aria-hidden="true"
              >
                <span
                  className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-60"
                  style={{ backgroundColor: "var(--color-accent)" }}
                />
                <span
                  className="relative inline-flex h-2.5 w-2.5 rounded-full"
                  style={{ backgroundColor: "var(--color-accent)" }}
                />
              </span>
              <span
                className="text-xs"
                style={{
                  fontFamily: "var(--font-mono)",
                  color: "var(--color-text-muted)",
                }}
              >
                Open to opportunities
              </span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
