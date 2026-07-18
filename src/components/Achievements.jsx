import { motion, useReducedMotion } from "framer-motion";
import {
  SiLeetcode,
  SiCodeforces,
  SiHackerrank,
  SiCodechef,
} from "react-icons/si";
import { HiOutlineExternalLink } from "react-icons/hi";
import { HiTrophy } from "react-icons/hi2";
import { achievements, codingProfiles } from "../data/portfolio";

/* ── Platform icon map ─────────────────────────────────────── */
const platformIcons = {
  leetcode: SiLeetcode,
  codeforces: SiCodeforces,
  hackerrank: SiHackerrank,
  codechef: SiCodechef,
};

/**
 * Resolve a react-icons/si icon for a given platform name.
 * Falls back to null so the card can still render without an icon.
 */
const getIcon = (name) => {
  const key = name.toLowerCase().replace(/[\s\-_]/g, "");
  return platformIcons[key] ?? null;
};

/* ── Component ─────────────────────────────────────────────── */
const Achievements = () => {
  const prefersReducedMotion = useReducedMotion();

  // Bail out when there's nothing to show
  if (
    (!achievements || achievements.length === 0) &&
    (!codingProfiles || codingProfiles.length === 0)
  ) {
    return null;
  }

  /* ── Animation helpers ──────────────────────────────────── */
  const transition = prefersReducedMotion
    ? { duration: 0 }
    : { duration: 0.6, ease: [0.16, 1, 0.3, 1] };

  const staggerContainer = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : 0.1,
      },
    },
  };

  const fadeUp = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 24 },
    visible: { opacity: 1, y: 0, transition },
  };

  const fadeIn = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 16 },
    visible: { opacity: 1, y: 0, transition },
  };

  /* ── Normalise achievement entries (string | object) ──── */
  const normalise = (item) =>
    typeof item === "string"
      ? { title: item, description: null, date: null }
      : item;

  return (
    <section
      id="achievements"
      className="py-24 md:py-32"
      style={{ backgroundColor: "var(--color-bg)" }}
      aria-labelledby="achievements-heading"
    >
      <div className="section-container">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          {/* ─── Section Header ─── */}
          <motion.p variants={fadeUp} className="section-label">
            ACHIEVEMENTS
          </motion.p>

          <motion.h2
            id="achievements-heading"
            variants={fadeUp}
            className="section-title mt-4 mb-12"
          >
            Achievements &amp;&nbsp;
            <span style={{ color: "var(--color-accent)" }}>Profiles</span>
          </motion.h2>

          {/* ─── Achievements List ─── */}
          {achievements && achievements.length > 0 && (
            <motion.div variants={fadeUp} className="mb-16">
              <h3
                className="text-sm font-semibold uppercase tracking-wider mb-6"
                style={{
                  fontFamily: "var(--font-mono)",
                  color: "var(--color-accent)",
                }}
              >
                Achievements
              </h3>

              <motion.ul
                className="space-y-4"
                role="list"
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
              >
                {achievements.map((raw, index) => {
                  const item = normalise(raw);
                  return (
                    <motion.li
                      key={item.title + index}
                      variants={fadeIn}
                      className="border-l-2 pl-4 py-2 group transition-colors duration-300"
                      style={{
                        borderColor: "var(--color-accent)",
                      }}
                    >
                      <div className="flex items-start gap-3">
                        {/* Accent bullet icon */}
                        <HiTrophy
                          className="mt-0.5 flex-shrink-0 h-5 w-5"
                          style={{ color: "var(--color-accent)" }}
                          aria-hidden="true"
                        />

                        <div className="min-w-0">
                          <p
                            className="text-base font-medium leading-snug"
                            style={{
                              fontFamily: "var(--font-body)",
                              color: "var(--color-text-primary)",
                            }}
                          >
                            {item.title}
                          </p>

                          {item.description && (
                            <p
                              className="mt-1 text-sm leading-relaxed"
                              style={{
                                fontFamily: "var(--font-body)",
                                color: "var(--color-text-secondary)",
                              }}
                            >
                              {item.description}
                            </p>
                          )}

                          {item.date && (
                            <p
                              className="mt-1 text-xs"
                              style={{
                                fontFamily: "var(--font-mono)",
                                color: "var(--color-text-muted)",
                              }}
                            >
                              {item.date}
                            </p>
                          )}
                        </div>
                      </div>
                    </motion.li>
                  );
                })}
              </motion.ul>
            </motion.div>
          )}

          {/* ─── Coding Profiles Grid ─── */}
          {codingProfiles && codingProfiles.length > 0 && (
            <motion.div variants={fadeUp}>
              <h3
                className="text-sm font-semibold uppercase tracking-wider mb-6"
                style={{
                  fontFamily: "var(--font-mono)",
                  color: "var(--color-accent)",
                }}
              >
                Coding Profiles
              </h3>

              <motion.div
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
              >
                {codingProfiles.map((profile, index) => {
                  const Icon = getIcon(profile.name);

                  return (
                    <motion.a
                      key={profile.name + index}
                      href={profile.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${profile.name} profile — ${profile.handle}`}
                      variants={fadeIn}
                      whileHover={
                        prefersReducedMotion
                          ? {}
                          : { y: -3, transition: { duration: 0.25 } }
                      }
                      className="rounded-xl p-5 border transition-colors duration-300 group relative overflow-hidden"
                      style={{
                        backgroundColor: "var(--color-bg-card)",
                        borderColor: "var(--color-border)",
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.borderColor =
                          "var(--color-accent)")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.borderColor =
                          "var(--color-border)")
                      }
                    >
                      {/* Subtle glow on hover */}
                      <div
                        className="absolute -top-12 -right-12 h-24 w-24 rounded-full opacity-0 blur-2xl pointer-events-none transition-opacity duration-500 group-hover:opacity-15"
                        style={{ backgroundColor: "var(--color-accent)" }}
                      />

                      <div className="flex items-center gap-4 relative z-10">
                        {/* Platform icon */}
                        <span
                          className="flex-shrink-0 flex items-center justify-center h-11 w-11 rounded-lg"
                          style={{
                            backgroundColor: "var(--color-accent-soft)",
                          }}
                        >
                          {Icon ? (
                            <Icon
                              className="h-5 w-5"
                              style={{ color: "var(--color-accent)" }}
                              aria-hidden="true"
                            />
                          ) : (
                            <span
                              className="text-lg font-bold"
                              style={{
                                fontFamily: "var(--font-heading)",
                                color: "var(--color-accent)",
                              }}
                              aria-hidden="true"
                            >
                              {profile.name.charAt(0)}
                            </span>
                          )}
                        </span>

                        {/* Text */}
                        <div className="min-w-0 flex-1">
                          <p
                            className="text-sm font-semibold truncate"
                            style={{
                              fontFamily: "var(--font-heading)",
                              color: "var(--color-text-primary)",
                            }}
                          >
                            {profile.name}
                          </p>
                          <p
                            className="text-xs truncate mt-0.5"
                            style={{
                              fontFamily: "var(--font-mono)",
                              color: "var(--color-text-muted)",
                            }}
                          >
                            @{profile.handle}
                          </p>
                        </div>

                        {/* External link indicator */}
                        <HiOutlineExternalLink
                          className="flex-shrink-0 h-4 w-4 opacity-0 translate-x-1 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0"
                          style={{ color: "var(--color-accent)" }}
                          aria-hidden="true"
                        />
                      </div>
                    </motion.a>
                  );
                })}
              </motion.div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default Achievements;
