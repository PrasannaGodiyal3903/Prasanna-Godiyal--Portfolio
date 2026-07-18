import { motion, useReducedMotion } from "framer-motion";
import { HiOutlineBriefcase } from "react-icons/hi2";
import { experience } from "../data/portfolio";

/* ── Animation variants ─── */
const fadeUp = (reduced) => ({
  hidden: { opacity: reduced ? 1 : 0, y: reduced ? 0 : 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: reduced
      ? { duration: 0 }
      : { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
});

const stagger = (reduced) => ({
  hidden: {},
  visible: {
    transition: { staggerChildren: reduced ? 0 : 0.12 },
  },
});

export default function Experience() {
  const prefersReduced = useReducedMotion();

  if (!experience || experience.length === 0) return null;

  return (
    <section
      id="experience"
      className="py-24 md:py-32"
      style={{ backgroundColor: "var(--color-bg)" }}
      aria-labelledby="experience-heading"
    >
      <div className="section-container">
        <motion.div
          variants={stagger(prefersReduced)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.p variants={fadeUp(prefersReduced)} className="section-label">
            EXPERIENCE
          </motion.p>

          <motion.h2
            id="experience-heading"
            variants={fadeUp(prefersReduced)}
            className="section-title mb-12"
          >
            Experience &{" "}
            <span style={{ color: "var(--color-accent)" }}>Responsibility</span>
          </motion.h2>

          <div className="space-y-6">
            {experience.map((exp, i) => (
              <motion.article
                key={exp.role + i}
                variants={fadeUp(prefersReduced)}
                className="group relative rounded-xl border p-6 md:p-8 transition-colors duration-300"
                style={{
                  backgroundColor: "var(--color-bg-card)",
                  borderColor: "var(--color-border)",
                }}
                whileHover={
                  prefersReduced
                    ? {}
                    : {
                        y: -2,
                        borderColor: "var(--color-border-light)",
                      }
                }
              >
                {/* Accent line top on hover */}
                <div
                  className="absolute top-0 left-0 right-0 h-[2px] rounded-t-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{
                    background:
                      "linear-gradient(90deg, transparent, var(--color-accent), transparent)",
                  }}
                  aria-hidden="true"
                />

                <div className="flex items-start gap-4">
                  {/* Icon */}
                  <span
                    className="mt-1 flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-lg"
                    style={{ backgroundColor: "var(--color-accent-soft)" }}
                    aria-hidden="true"
                  >
                    <HiOutlineBriefcase
                      className="h-5 w-5"
                      style={{ color: "var(--color-accent)" }}
                    />
                  </span>

                  <div className="min-w-0 flex-1">
                    {/* Role */}
                    <h3
                      className="text-lg font-semibold md:text-xl"
                      style={{
                        fontFamily: "var(--font-heading)",
                        color: "var(--color-text-primary)",
                      }}
                    >
                      {exp.role}
                    </h3>

                    {/* Org + Duration row */}
                    <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1">
                      <span
                        className="text-sm"
                        style={{
                          fontFamily: "var(--font-body)",
                          color: "var(--color-accent)",
                        }}
                      >
                        {exp.organization}
                      </span>
                      <span
                        className="text-xs"
                        style={{
                          fontFamily: "var(--font-mono)",
                          color: "var(--color-text-muted)",
                        }}
                      >
                        {exp.duration}
                      </span>
                    </div>

                    {/* Description */}
                    {exp.description && (
                      <p
                        className="mt-3 text-sm leading-relaxed"
                        style={{
                          fontFamily: "var(--font-body)",
                          color: "var(--color-text-secondary)",
                        }}
                      >
                        {exp.description}
                      </p>
                    )}
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
