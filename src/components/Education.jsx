import { motion, useReducedMotion } from "framer-motion";
import { HiOutlineAcademicCap } from "react-icons/hi2";
import { education } from "../data/portfolio";

const Education = () => {
  const prefersReducedMotion = useReducedMotion();

  const transition = prefersReducedMotion
    ? { duration: 0 }
    : { duration: 0.6, ease: [0.16, 1, 0.3, 1] };

  const staggerContainer = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : 0.15,
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

  const cardReveal = {
    hidden: { opacity: 0, x: prefersReducedMotion ? 0 : -20, y: prefersReducedMotion ? 0 : 12 },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: { ...transition, duration: 0.7 },
    },
  };

  const lineGrow = {
    hidden: { scaleY: 0 },
    visible: {
      scaleY: 1,
      transition: prefersReducedMotion
        ? { duration: 0 }
        : { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const dotPop = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: prefersReducedMotion
        ? { duration: 0 }
        : { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section
      id="education"
      className="py-24 md:py-32"
      style={{ backgroundColor: "var(--color-bg)" }}
      aria-labelledby="education-heading"
    >
      <div className="section-container">
        {/* ─── Section Header ─── */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="mb-16"
        >
          <motion.p variants={fadeUp} className="section-label">
            EDUCATION
          </motion.p>

          <motion.h2
            id="education-heading"
            variants={fadeUp}
            className="section-title mt-4"
          >
            Education
          </motion.h2>
        </motion.div>

        {/* ─── Timeline ─── */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="relative"
          role="list"
          aria-label="Education timeline"
        >
          {/* Vertical timeline line */}
          <motion.div
            variants={lineGrow}
            className="absolute left-[5px] md:left-[7px] top-0 bottom-0 w-px origin-top"
            style={{ backgroundColor: "var(--color-border-light)" }}
            aria-hidden="true"
          />

          {/* ─── Timeline Entries ─── */}
          <div className="space-y-10">
            {education.map((entry, index) => (
              <motion.div
                key={`${entry.institution}-${entry.degree}-${index}`}
                variants={cardReveal}
                className="relative pl-10 md:pl-14"
                role="listitem"
              >
                {/* ─── Timeline Dot ─── */}
                <motion.div
                  variants={dotPop}
                  className="absolute left-0 md:left-[1px] top-7 flex items-center justify-center"
                  aria-hidden="true"
                >
                  <span
                    className="w-3 h-3 rounded-full border-2"
                    style={{
                      backgroundColor: "var(--color-accent)",
                      borderColor: "var(--color-bg)",
                      boxShadow: "0 0 0 3px var(--color-bg), 0 0 12px var(--color-accent-soft)",
                    }}
                  />
                </motion.div>

                {/* ─── Entry Card ─── */}
                <motion.div
                  className="rounded-xl p-6 border transition-colors duration-300 relative overflow-hidden group"
                  style={{
                    backgroundColor: "var(--color-bg-card)",
                    borderColor: "var(--color-border)",
                  }}
                  whileHover={
                    prefersReducedMotion
                      ? {}
                      : {
                          borderColor: "var(--color-border-light)",
                          y: -2,
                          transition: { duration: 0.25 },
                        }
                  }
                >
                  {/* Corner accent glow */}
                  <div
                    className="absolute -top-16 -right-16 h-32 w-32 rounded-full opacity-0 blur-3xl pointer-events-none transition-opacity duration-500 group-hover:opacity-15"
                    style={{ backgroundColor: "var(--color-accent)" }}
                    aria-hidden="true"
                  />

                  {/* Top row: icon + duration */}
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className="flex items-center justify-center h-9 w-9 rounded-lg flex-shrink-0"
                      style={{ backgroundColor: "var(--color-accent-soft)" }}
                      aria-hidden="true"
                    >
                      <HiOutlineAcademicCap
                        className="h-5 w-5"
                        style={{ color: "var(--color-accent)" }}
                      />
                    </span>

                    <span
                      className="text-sm tracking-wide"
                      style={{
                        fontFamily: "var(--font-mono)",
                        color: "var(--color-text-muted)",
                      }}
                    >
                      {entry.duration}
                    </span>
                  </div>

                  {/* Degree */}
                  <h3
                    className="text-xl font-semibold mb-1"
                    style={{
                      fontFamily: "var(--font-heading)",
                      color: "var(--color-text-primary)",
                    }}
                  >
                    {entry.degree}
                  </h3>

                  {/* Field of Study */}
                  {entry.field && (
                    <p
                      className="text-base mb-2"
                      style={{
                        fontFamily: "var(--font-body)",
                        color: "var(--color-text-secondary)",
                      }}
                    >
                      {entry.field}
                    </p>
                  )}

                  {/* Institution */}
                  <p
                    className="text-sm font-medium"
                    style={{
                      fontFamily: "var(--font-body)",
                      color: "var(--color-accent)",
                    }}
                  >
                    {entry.institution}
                  </p>

                  {/* Details (if provided) */}
                  {entry.details && (
                    <div
                      className="mt-4 pt-4"
                      style={{ borderTop: "1px solid var(--color-border)" }}
                    >
                      <p
                        className="text-sm leading-relaxed"
                        style={{
                          fontFamily: "var(--font-body)",
                          color: "var(--color-text-secondary)",
                        }}
                      >
                        {entry.details}
                      </p>
                    </div>
                  )}
                </motion.div>
              </motion.div>
            ))}
          </div>

          {/* ─── Timeline end dot ─── */}
          <motion.div
            variants={dotPop}
            className="absolute left-[2px] md:left-[4px] bottom-0"
            aria-hidden="true"
          >
            <span
              className="block w-[7px] h-[7px] rounded-full"
              style={{ backgroundColor: "var(--color-border-light)" }}
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Education;
