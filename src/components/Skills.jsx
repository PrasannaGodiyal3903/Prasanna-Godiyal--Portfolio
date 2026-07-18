import { motion, useReducedMotion } from "framer-motion";
import {
  SiReact,
  SiPython,
  SiJavascript,
  SiNodedotjs,
  SiMongodb,
  SiPostgresql,
  SiDocker,
  SiGit,
  SiTailwindcss,
  SiHtml5,
  SiMysql,
  SiDjango,
  SiExpress,
  SiCplusplus,
  SiTypescript,
  SiNextdotjs,
  SiFirebase,
  SiRedis,
  SiGraphql,
  SiFigma,
  SiLinux,
  SiVercel,
  SiVite,
  SiSass,
  SiFlask,
  SiRust,
  SiGo,
  SiKubernetes,
  SiTerraform,
  SiJenkins,
  SiNginx,
  SiElectron,
  SiSvelte,
  SiVuedotjs,
  SiAngular,
  SiBootstrap,
  SiJquery,
  SiPhp,
  SiLaravel,
  SiRuby,
  SiSwift,
  SiKotlin,
  SiFlutter,
  SiDart,
  SiSqlite,
  SiSupabase,
  SiPrisma,
  SiJest,
  SiCypress,
  SiWebpack,
  SiGithubactions,
  SiGitlab,
  SiPostman,
  SiNotion,
  SiJira,
  SiStripe,
  SiSocketdotio,
  SiThreedotjs,
  SiFramer,
  SiMarkdown,
  SiNumpy,
  SiPandas,
  SiTensorflow,
  SiPytorch,
  SiOpencv,
  SiScikitlearn,
  SiJupyter,
  SiAstro,
  SiRemix,
  SiShadcnui,
  SiRadixui,
  SiStorybook,
  SiChakraui,
  SiMaterialdesign,
  SiReactquery,
  SiRedux,
  SiZod,
} from "react-icons/si";
import { skills } from "../data/portfolio";

/* ------------------------------------------------------------------ */
/*  Skill-name → react-icon mapping (case-insensitive lookup)         */
/* ------------------------------------------------------------------ */
const ICON_MAP = {
  react: SiReact,
  "react.js": SiReact,
  "react js": SiReact,
  reactjs: SiReact,
  python: SiPython,
  javascript: SiJavascript,
  js: SiJavascript,
  "node.js": SiNodedotjs,
  node: SiNodedotjs,
  nodejs: SiNodedotjs,
  mongodb: SiMongodb,
  mongo: SiMongodb,
  postgresql: SiPostgresql,
  postgres: SiPostgresql,
  docker: SiDocker,
  git: SiGit,
  tailwind: SiTailwindcss,
  tailwindcss: SiTailwindcss,
  "tailwind css": SiTailwindcss,
  html: SiHtml5,
  html5: SiHtml5,
  // css/css3: no icon available in this version
  mysql: SiMysql,
  django: SiDjango,
  express: SiExpress,
  "express.js": SiExpress,
  expressjs: SiExpress,
  "c++": SiCplusplus,
  cpp: SiCplusplus,
  typescript: SiTypescript,
  ts: SiTypescript,
  "next.js": SiNextdotjs,
  next: SiNextdotjs,
  nextjs: SiNextdotjs,
  firebase: SiFirebase,
  redis: SiRedis,
  graphql: SiGraphql,
  figma: SiFigma,
  linux: SiLinux,
  // aws: no icon available in this version
  vercel: SiVercel,
  vite: SiVite,
  sass: SiSass,
  scss: SiSass,
  flask: SiFlask,
  rust: SiRust,
  go: SiGo,
  golang: SiGo,
  kubernetes: SiKubernetes,
  k8s: SiKubernetes,
  terraform: SiTerraform,
  jenkins: SiJenkins,
  nginx: SiNginx,
  electron: SiElectron,
  svelte: SiSvelte,
  "vue.js": SiVuedotjs,
  vue: SiVuedotjs,
  vuejs: SiVuedotjs,
  angular: SiAngular,
  bootstrap: SiBootstrap,
  jquery: SiJquery,
  php: SiPhp,
  laravel: SiLaravel,
  ruby: SiRuby,
  swift: SiSwift,
  kotlin: SiKotlin,
  flutter: SiFlutter,
  dart: SiDart,
  sqlite: SiSqlite,
  supabase: SiSupabase,
  prisma: SiPrisma,
  jest: SiJest,
  cypress: SiCypress,
  webpack: SiWebpack,
  "github actions": SiGithubactions,
  gitlab: SiGitlab,
  // vs code: no icon available in this version
  postman: SiPostman,
  notion: SiNotion,
  jira: SiJira,
  stripe: SiStripe,
  "socket.io": SiSocketdotio,
  "three.js": SiThreedotjs,
  threejs: SiThreedotjs,
  "framer motion": SiFramer,
  framer: SiFramer,
  markdown: SiMarkdown,
  numpy: SiNumpy,
  pandas: SiPandas,
  tensorflow: SiTensorflow,
  pytorch: SiPytorch,
  opencv: SiOpencv,
  "scikit-learn": SiScikitlearn,
  sklearn: SiScikitlearn,
  jupyter: SiJupyter,
  astro: SiAstro,
  remix: SiRemix,
  shadcn: SiShadcnui,
  "shadcn/ui": SiShadcnui,
  "radix ui": SiRadixui,
  radix: SiRadixui,
  // playwright: no icon available in this version
  storybook: SiStorybook,
  "chakra ui": SiChakraui,
  "material ui": SiMaterialdesign,
  mui: SiMaterialdesign,
  "react query": SiReactquery,
  "tanstack query": SiReactquery,
  redux: SiRedux,
  zod: SiZod,
};

function getIcon(skillName) {
  return ICON_MAP[skillName.toLowerCase()] ?? null;
}

/* ------------------------------------------------------------------ */
/*  Animation variants                                                */
/* ------------------------------------------------------------------ */
const sectionVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
};

const categoryVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
};

const pillVariants = {
  hidden: { opacity: 0, y: 16, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] },
  },
};

/* ------------------------------------------------------------------ */
/*  Sub-components                                                    */
/* ------------------------------------------------------------------ */
function SkillPill({ name, prefersReduced }) {
  const Icon = getIcon(name);

  return (
    <motion.div
      variants={prefersReduced ? {} : pillVariants}
      whileHover={
        prefersReduced
          ? {}
          : {
              scale: 1.02,
              borderColor: "var(--color-border-light)",
              boxShadow: "0 0 12px var(--color-accent-soft)",
            }
      }
      transition={{ duration: 0.2 }}
      className="flex items-center gap-2 rounded-xl border px-4 py-3 cursor-default"
      style={{
        backgroundColor: "var(--color-bg-card)",
        borderColor: "var(--color-border)",
      }}
    >
      {Icon && (
        <Icon
          className="shrink-0 text-xl"
          style={{ color: "var(--color-accent)" }}
          aria-hidden="true"
        />
      )}
      <span
        className="text-sm"
        style={{
          fontFamily: "var(--font-body)",
          color: "var(--color-text-secondary)",
        }}
      >
        {name}
      </span>
    </motion.div>
  );
}

function SkillCategory({ category, items, prefersReduced }) {
  return (
    <motion.div
      variants={prefersReduced ? {} : categoryVariants}
      className="mb-12 last:mb-0"
    >
      <h3
        className="mb-4 text-lg font-semibold"
        style={{
          fontFamily: "var(--font-heading)",
          color: "var(--color-text-primary)",
        }}
      >
        {category}
      </h3>

      <motion.div
        className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4"
        variants={
          prefersReduced
            ? {}
            : {
                hidden: {},
                visible: { transition: { staggerChildren: 0.045 } },
              }
        }
      >
        {items.map((skill) => (
          <SkillPill
            key={skill}
            name={skill}
            prefersReduced={prefersReduced}
          />
        ))}
      </motion.div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main component                                                    */
/* ------------------------------------------------------------------ */
export default function Skills() {
  const prefersReduced = useReducedMotion();

  const categories = Object.entries(skills);

  return (
    <section
      id="skills"
      className="py-24 lg:py-32"
      style={{ backgroundColor: "var(--color-bg)" }}
      aria-labelledby="skills-heading"
    >
      <div className="section-container">
        {/* ---- Header ---- */}
        <div className="mb-16 text-center">
          <p className="section-label justify-center">TECH STACK</p>
          <h2
            id="skills-heading"
            className="section-title"
            style={{
              fontFamily: "var(--font-heading)",
              color: "var(--color-text-primary)",
            }}
          >
            Technologies I Work With
          </h2>
          <p
            className="section-description mx-auto mt-4 max-w-2xl"
            style={{ color: "var(--color-text-secondary)" }}
          >
            A curated set of languages, frameworks, and tools I use to bring
            ideas to life.
          </p>
        </div>

        {/* ---- Category grid ---- */}
        <motion.div
          variants={prefersReduced ? {} : sectionVariants}
          initial={prefersReduced ? "visible" : "hidden"}
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {categories.map(([category, items]) => (
            <SkillCategory
              key={category}
              category={category}
              items={items}
              prefersReduced={prefersReduced}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
