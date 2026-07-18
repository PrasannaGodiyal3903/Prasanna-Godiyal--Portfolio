import { motion, useReducedMotion } from "framer-motion";
import { HiOutlineAcademicCap } from "react-icons/hi2";
import { certifications } from "../data/portfolio";

/* ── Animation variants ─── */
const fadeUp = (reduced) => ({
  hidden: { opacity: reduced ? 1 : 0, y: reduced ? 0 : 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: reduced
      ? { duration: 0 }
      : { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
  },
});

const stagger = (reduced) => ({
  hidden: {},
  visible: {
    transition: { staggerChildren: reduced ? 0 : 0.08 },
  },
});

export default function Certifications() {
  const prefersReduced = useReducedMotion();

  if (!certifications || certifications.length === 0) return null;

  return (
    <section
      id="certifications"
      className="py-24 md:py-32"
      style={{ backgroundColor: "var(--color-bg)" }}
      aria-labelledby="certifications-heading"
    >
      <div className="section-container">
        <motion.div
          variants={stagger(prefersReduced)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.p
            variants={fadeUp(prefersReduced)}
            className="section-label"
          >
            CERTIFICATIONS
          </motion.p>

          <motion.h2
            id="certifications-heading"
            variants={fadeUp(prefersReduced)}
            className="section-title mb-12"
          >
            Certifications
          </motion.h2>

          <motion.ul
            className="space-y-4"
            role="list"
            variants={stagger(prefersReduced)}
          >
            {certifications.map((cert, i) => (
              <motion.li
                key={cert + i}
                variants={fadeUp(prefersReduced)}
                className="group flex items-start gap-4 rounded-xl border p-5 transition-colors duration-300"
                style={{
                  backgroundColor: "var(--color-bg-card)",
                  borderColor: "var(--color-border)",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.borderColor =
                    "var(--color-border-light)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.borderColor = "var(--color-border)")
                }
              >
                <span
                  className="mt-0.5 flex-shrink-0 flex items-center justify-center h-9 w-9 rounded-lg"
                  style={{ backgroundColor: "var(--color-accent-soft)" }}
                  aria-hidden="true"
                >
                  <HiOutlineAcademicCap
                    className="h-4.5 w-4.5"
                    style={{ color: "var(--color-accent)" }}
                  />
                </span>

                <p
                  className="text-sm leading-relaxed md:text-base"
                  style={{
                    fontFamily: "var(--font-body)",
                    color: "var(--color-text-secondary)",
                  }}
                >
                  {cert}
                </p>
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>
      </div>
    </section>
  );
}
