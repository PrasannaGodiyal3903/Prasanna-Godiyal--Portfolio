import { motion, useReducedMotion } from "framer-motion";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import { projects } from "../data/portfolio";

/* ------------------------------------------------------------------ */
/*  Animation variants                                                */
/* ------------------------------------------------------------------ */
const sectionVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 48 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

const smallCardVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
};

/* ------------------------------------------------------------------ */
/*  Abstract Visual Placeholder                                       */
/*  Generates a stylised SVG / CSS visual for featured cards          */
/* ------------------------------------------------------------------ */
function ProjectVisual({ color, title, prefersReduced }) {
  return (
    <motion.div
      className="relative flex h-full min-h-[280px] items-center justify-center overflow-hidden rounded-xl md:min-h-full"
      style={{
        background: `linear-gradient(135deg, ${color}18 0%, ${color}08 50%, transparent 100%)`,
      }}
      whileHover={prefersReduced ? {} : { scale: 1.02 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Subtle grid pattern */}
      <svg
        className="absolute inset-0 h-full w-full opacity-[0.06]"
        aria-hidden="true"
      >
        <defs>
          <pattern
            id={`grid-${title.replace(/\s+/g, "-")}`}
            width="32"
            height="32"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 32 0 L 0 0 0 32"
              fill="none"
              stroke={color}
              strokeWidth="0.5"
            />
          </pattern>
        </defs>
        <rect
          width="100%"
          height="100%"
          fill={`url(#grid-${title.replace(/\s+/g, "-")})`}
        />
      </svg>

      {/* Radial glow */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${color}22, transparent 70%)`,
        }}
        aria-hidden="true"
      />

      {/* Geometric code element */}
      <div className="relative z-10 flex flex-col items-center gap-4">
        {/* Abstract bracket / code shape */}
        <svg
          width="120"
          height="120"
          viewBox="0 0 120 120"
          fill="none"
          aria-hidden="true"
          className="opacity-60"
        >
          {/* Outer ring */}
          <circle
            cx="60"
            cy="60"
            r="50"
            stroke={color}
            strokeWidth="1"
            strokeDasharray="8 4"
            opacity="0.4"
          />
          {/* Inner diamond */}
          <rect
            x="38"
            y="38"
            width="44"
            height="44"
            rx="4"
            stroke={color}
            strokeWidth="1.5"
            opacity="0.6"
            transform="rotate(45 60 60)"
          />
          {/* Code brackets */}
          <text
            x="60"
            y="66"
            textAnchor="middle"
            fontFamily="var(--font-mono)"
            fontSize="24"
            fill={color}
            opacity="0.8"
          >
            {"</>"}
          </text>
        </svg>

        {/* Small label */}
        <span
          className="text-xs tracking-widest uppercase opacity-40"
          style={{ fontFamily: "var(--font-mono)", color }}
        >
          {title}
        </span>
      </div>

      {/* Corner accents */}
      <div
        className="absolute top-4 left-4 h-8 w-8 border-t border-l rounded-tl-md opacity-20"
        style={{ borderColor: color }}
        aria-hidden="true"
      />
      <div
        className="absolute right-4 bottom-4 h-8 w-8 border-r border-b rounded-br-md opacity-20"
        style={{ borderColor: color }}
        aria-hidden="true"
      />
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Tech Pill                                                         */
/* ------------------------------------------------------------------ */
function TechPill({ name }) {
  return (
    <span
      className="inline-flex items-center rounded-full border px-3 py-1 text-xs"
      style={{
        backgroundColor: "var(--color-bg)",
        borderColor: "var(--color-border)",
        fontFamily: "var(--font-mono)",
        color: "var(--color-text-secondary)",
      }}
    >
      {name}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  Action Buttons                                                    */
/* ------------------------------------------------------------------ */
function ProjectButtons({ github, live, prefersReduced }) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      {github && (
        <motion.a
          href={github}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="View source code on GitHub"
          className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors"
          style={{
            backgroundColor: "var(--color-surface)",
            borderColor: "var(--color-border)",
            color: "var(--color-text-primary)",
            fontFamily: "var(--font-body)",
          }}
          whileHover={
            prefersReduced
              ? {}
              : {
                  backgroundColor: "var(--color-bg-card-hover)",
                  borderColor: "var(--color-border-light)",
                }
          }
          transition={{ duration: 0.2 }}
        >
          <FaGithub className="text-base" aria-hidden="true" />
          GitHub
        </motion.a>
      )}
      {live && (
        <motion.a
          href={live}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="View live demo"
          className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors"
          style={{
            backgroundColor: "var(--color-accent)",
            color: "var(--color-bg)",
            fontFamily: "var(--font-body)",
          }}
          whileHover={
            prefersReduced
              ? {}
              : { backgroundColor: "var(--color-accent-hover)" }
          }
          transition={{ duration: 0.2 }}
        >
          <FaExternalLinkAlt className="text-xs" aria-hidden="true" />
          Live Demo
        </motion.a>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Featured Project Card                                             */
/* ------------------------------------------------------------------ */
function FeaturedCard({ project, index, prefersReduced }) {
  const isReversed = index % 2 !== 0;

  return (
    <motion.article
      variants={prefersReduced ? {} : cardVariants}
      className="group relative overflow-hidden rounded-2xl border"
      style={{
        backgroundColor: "var(--color-bg-card)",
        borderColor: "var(--color-border)",
        minHeight: "400px",
      }}
      whileHover={
        prefersReduced
          ? {}
          : {
              y: -4,
              borderColor: "var(--color-border-light)",
              boxShadow: `0 8px 32px ${project.color}10`,
            }
      }
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      aria-labelledby={`project-title-${index}`}
    >
      <div
        className={`grid h-full grid-cols-1 md:grid-cols-[55%_45%] ${
          isReversed ? "md:direction-rtl" : ""
        }`}
        style={{ direction: isReversed ? undefined : undefined }}
      >
        {/* ---- Info Column ---- */}
        <div
          className={`flex flex-col justify-center gap-5 p-8 md:p-10 ${
            isReversed ? "md:order-2" : "md:order-1"
          }`}
        >
          {/* Featured badge */}
          <span
            className="inline-flex w-fit items-center gap-1.5 rounded-full border px-3 py-1 text-[0.65rem] uppercase tracking-wider"
            style={{
              borderColor: `${project.color}40`,
              color: project.color,
              fontFamily: "var(--font-mono)",
              backgroundColor: `${project.color}0a`,
            }}
          >
            <span
              className="inline-block h-1.5 w-1.5 rounded-full"
              style={{ backgroundColor: project.color }}
              aria-hidden="true"
            />
            Featured
          </span>

          <h3
            id={`project-title-${index}`}
            className="text-2xl font-semibold md:text-3xl"
            style={{
              fontFamily: "var(--font-heading)",
              color: "var(--color-text-primary)",
            }}
          >
            {project.title}
          </h3>

          <p
            className="leading-relaxed"
            style={{
              fontFamily: "var(--font-body)",
              color: "var(--color-text-secondary)",
              fontSize: "1rem",
            }}
          >
            {project.longDescription || project.description}
          </p>

          {/* Tech pills */}
          <div className="flex flex-wrap gap-2">
            {project.techStack.map((tech) => (
              <TechPill key={tech} name={tech} />
            ))}
          </div>

          {/* Buttons */}
          <ProjectButtons
            github={project.github}
            live={project.live}
            prefersReduced={prefersReduced}
          />
        </div>

        {/* ---- Visual Column ---- */}
        <div
          className={`hidden md:block ${
            isReversed ? "md:order-1" : "md:order-2"
          }`}
        >
         <div className="h-full overflow-hidden rounded-xl bg-[#111] flex items-center justify-center p-6">
  <img
    src={project.image}
    alt={project.title}
    className="max-h-full max-w-full object-contain rounded-lg transition-transform duration-500 group-hover:scale-105"
  />
</div>
        </div>
      </div>

      {/* Accent border line at top */}
      <div
        className="absolute top-0 right-0 left-0 h-[2px] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `linear-gradient(90deg, transparent, ${project.color}, transparent)`,
        }}
        aria-hidden="true"
      />
    </motion.article>
  );
}

/* ------------------------------------------------------------------ */
/*  Non-Featured Project Card                                         */
/* ------------------------------------------------------------------ */
function SmallCard({ project, index, prefersReduced }) {
  return (
    <motion.article
      variants={prefersReduced ? {} : smallCardVariants}
      className="group relative flex flex-col gap-4 overflow-hidden rounded-xl border p-6"
      style={{
        backgroundColor: "var(--color-bg-card)",
        borderColor: "var(--color-border)",
      }}
      whileHover={
        prefersReduced
          ? {}
          : {
              y: -3,
              borderColor: "var(--color-border-light)",
              boxShadow: `0 4px 24px ${project.color}0c`,
            }
      }
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      aria-labelledby={`small-project-title-${index}`}
    >
      {/* Color dot */}
      <div className="flex items-center gap-3">
        <span
          className="inline-block h-2.5 w-2.5 rounded-full"
          style={{ backgroundColor: project.color }}
          aria-hidden="true"
        />
        <h3
          id={`small-project-title-${index}`}
          className="text-lg font-semibold"
          style={{
            fontFamily: "var(--font-heading)",
            color: "var(--color-text-primary)",
          }}
        >
          {project.title}
        </h3>
      </div>

      <p
        className="flex-1 text-sm leading-relaxed"
        style={{
          fontFamily: "var(--font-body)",
          color: "var(--color-text-secondary)",
        }}
      >
        {project.description}
      </p>

      {/* Tech pills */}
      <div className="flex flex-wrap gap-2">
        {project.techStack.map((tech) => (
          <TechPill key={tech} name={tech} />
        ))}
      </div>

      {/* Buttons */}
      <ProjectButtons
        github={project.github}
        live={project.live}
        prefersReduced={prefersReduced}
      />

      {/* Hover accent line at left */}
      <div
        className="absolute top-0 bottom-0 left-0 w-[2px] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `linear-gradient(180deg, transparent, ${project.color}, transparent)`,
        }}
        aria-hidden="true"
      />
    </motion.article>
  );
}

/* ------------------------------------------------------------------ */
/*  Main Component                                                    */
/* ------------------------------------------------------------------ */
export default function Projects() {
  const prefersReduced = useReducedMotion();

  const featuredProjects = projects.filter((p) => p.featured);
  const otherProjects = projects.filter((p) => !p.featured);

  return (
    <section
      id="projects"
      className="py-24 lg:py-32"
      style={{ backgroundColor: "var(--color-bg)" }}
      aria-labelledby="projects-heading"
    >
      <div className="section-container">
        {/* ---- Header ---- */}
        <div className="mb-16">
          <p className="section-label">FEATURED WORK</p>
          <h2
            id="projects-heading"
            className="section-title"
            style={{
              fontFamily: "var(--font-heading)",
              color: "var(--color-text-primary)",
            }}
          >
            Projects
          </h2>
        </div>

        {/* ---- Featured Projects ---- */}
        {featuredProjects.length > 0 && (
          <motion.div
            className="flex flex-col gap-8"
            variants={prefersReduced ? {} : sectionVariants}
            initial={prefersReduced ? "visible" : "hidden"}
            whileInView="visible"
            viewport={{ once: true, amount: 0.05 }}
          >
            {featuredProjects.map((project, i) => (
              <FeaturedCard
                key={project.title}
                project={project}
                index={i}
                prefersReduced={prefersReduced}
              />
            ))}
          </motion.div>
        )}

        {/* ---- Other Projects ---- */}
        {otherProjects.length > 0 && (
          <>
            <h3
              className="mt-20 mb-8 text-xl font-semibold"
              style={{
                fontFamily: "var(--font-heading)",
                color: "var(--color-text-primary)",
              }}
            >
              Other Projects
            </h3>

            <motion.div
              className="grid grid-cols-1 gap-6 md:grid-cols-2"
              variants={
                prefersReduced
                  ? {}
                  : {
                      hidden: {},
                      visible: { transition: { staggerChildren: 0.1 } },
                    }
              }
              initial={prefersReduced ? "visible" : "hidden"}
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
            >
              {otherProjects.map((project, i) => (
                <SmallCard
                  key={project.title}
                  project={project}
                  index={i}
                  prefersReduced={prefersReduced}
                />
              ))}
            </motion.div>
          </>
        )}
      </div>
    </section>
  );
}
