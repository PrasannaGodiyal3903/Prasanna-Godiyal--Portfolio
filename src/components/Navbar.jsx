import { useState, useEffect, useCallback, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useReducedMotion,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import { personalInfo, navLinks } from "../data/portfolio";

/* ──────────────────────────── helpers ──────────────────────────── */

/** Derive a DOM-safe id from a nav label, e.g. "About" → "nav-about" */
const toId = (label) => `nav-${label.toLowerCase().replace(/\s+/g, "-")}`;

/** Section ids we observe — derived from non-external navLinks */
const sectionIds = navLinks
  .filter((l) => !l.external && l.href.startsWith("#"))
  .map((l) => l.href.slice(1));

/* ──────────────────────────── component ──────────────────────────── */

export default function Navbar() {
  const prefersReduced = useReducedMotion();

  /* ── scroll state ── */
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 40));

  /* ── active section via IntersectionObserver ── */
  const [activeSection, setActiveSection] = useState(sectionIds[0] ?? "");
  const observerRef = useRef(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        }
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observerRef.current.observe(el);
    });

    return () => observerRef.current?.disconnect();
  }, []);

  /* ── mobile menu ── */
  const [menuOpen, setMenuOpen] = useState(false);

  // lock body scroll when mobile overlay is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const closeMobileMenu = useCallback(() => setMenuOpen(false), []);

  /* ── smooth scroll handler ── */
  const handleAnchorClick = useCallback(
    (e, href) => {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: prefersReduced ? "auto" : "smooth" });
      }
      closeMobileMenu();
    },
    [prefersReduced, closeMobileMenu]
  );

  /* ────────────────────────── animation variants ────────────────────────── */

  const navbarBg = scrolled
    ? "bg-[var(--color-bg)]/80 backdrop-blur-lg border-b border-[var(--color-border)]"
    : "bg-transparent border-b border-transparent";

  const overlayVariants = {
    closed: { opacity: 0, transition: { duration: prefersReduced ? 0 : 0.3 } },
    open: { opacity: 1, transition: { duration: prefersReduced ? 0 : 0.3 } },
  };

  const panelVariants = {
    closed: { x: "100%", transition: { duration: prefersReduced ? 0 : 0.45, ease: [0.22, 1, 0.36, 1] } },
    open: { x: 0, transition: { duration: prefersReduced ? 0 : 0.45, ease: [0.22, 1, 0.36, 1] } },
  };

  const linkStagger = {
    open: {
      transition: { staggerChildren: prefersReduced ? 0 : 0.07, delayChildren: prefersReduced ? 0 : 0.15 },
    },
    closed: {
      transition: { staggerChildren: 0.04, staggerDirection: -1 },
    },
  };

  const mobileLinkVariant = {
    closed: { opacity: 0, y: 20 },
    open: { opacity: 1, y: 0, transition: { duration: prefersReduced ? 0 : 0.35, ease: [0.22, 1, 0.36, 1] } },
  };

  /* ──────────────────────────── render helpers ──────────────────────────── */

  const renderDesktopLink = (link) => {
    const isActive =
      !link.external && link.href.startsWith("#") && activeSection === link.href.slice(1);
    const isResume = link.label === "Resume";

    const baseClasses =
      "relative text-sm uppercase tracking-[0.15em] transition-colors duration-300 font-[var(--font-body)]";

    if (isResume) {
      return (
        <a
          key={link.label}
          id={toId(link.label)}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className={`${baseClasses} px-4 py-1.5 rounded border border-[var(--color-accent)] text-[var(--color-accent)] hover:bg-[var(--color-accent-soft)] hover:text-[var(--color-accent-hover)]`}
        >
          {link.label}
        </a>
      );
    }

    if (link.external) {
      return (
        <a
          key={link.label}
          id={toId(link.label)}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className={`${baseClasses} text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]`}
        >
          {link.label}
        </a>
      );
    }

    return (
      <a
        key={link.label}
        id={toId(link.label)}
        href={link.href}
        onClick={(e) => handleAnchorClick(e, link.href)}
        className={`${baseClasses} ${
          isActive
            ? "text-[var(--color-accent)]"
            : "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
        }`}
        aria-current={isActive ? "page" : undefined}
      >
        {link.label}

        {/* active indicator dot */}
        {isActive && (
          <motion.span
            layoutId="nav-active-dot"
            className="absolute -bottom-1 left-1/2 h-[3px] w-[3px] -translate-x-1/2 rounded-full bg-[var(--color-accent)]"
            transition={{ type: "spring", stiffness: 380, damping: 30 }}
          />
        )}
      </a>
    );
  };

  const renderMobileLink = (link, index) => {
    const isActive =
      !link.external && link.href.startsWith("#") && activeSection === link.href.slice(1);
    const isResume = link.label === "Resume";

    const base =
      "block text-2xl font-light tracking-[0.12em] uppercase transition-colors duration-200 font-[var(--font-body)]";

    if (isResume) {
      return (
        <motion.li key={link.label} variants={mobileLinkVariant}>
          <a
            id={`mobile-${toId(link.label)}`}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className={`${base} inline-block px-6 py-2 rounded border border-[var(--color-accent)] text-[var(--color-accent)]`}
            onClick={closeMobileMenu}
          >
            {link.label}
          </a>
        </motion.li>
      );
    }

    if (link.external) {
      return (
        <motion.li key={link.label} variants={mobileLinkVariant}>
          <a
            id={`mobile-${toId(link.label)}`}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className={`${base} text-[var(--color-text-secondary)]`}
            onClick={closeMobileMenu}
          >
            {link.label}
          </a>
        </motion.li>
      );
    }

    return (
      <motion.li key={link.label} variants={mobileLinkVariant}>
        <a
          id={`mobile-${toId(link.label)}`}
          href={link.href}
          onClick={(e) => handleAnchorClick(e, link.href)}
          className={`${base} ${
            isActive
              ? "text-[var(--color-accent)]"
              : "text-[var(--color-text-secondary)]"
          }`}
          aria-current={isActive ? "page" : undefined}
        >
          {link.label}
        </a>
      </motion.li>
    );
  };

  /* ──────────────────────────── JSX ──────────────────────────── */

  return (
    <>
      {/* ── Desktop / Main Navbar ── */}
      <motion.nav
        id="main-navbar"
        role="navigation"
        aria-label="Main navigation"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${navbarBg}`}
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{
          duration: prefersReduced ? 0 : 0.6,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        <div className="section-container flex items-center justify-between h-16 md:h-18">
          {/* ── Logo / Name ── */}
          <a
            id="navbar-logo"
            href="#home"
            onClick={(e) => handleAnchorClick(e, "#home")}
            className="text-lg font-semibold tracking-tight text-[var(--color-text-primary)] font-[var(--font-heading)] hover:text-[var(--color-accent)] transition-colors duration-300"
            aria-label={`${personalInfo.name} — home`}
          >
            {personalInfo.name}
            <span className="text-[var(--color-accent)]">.</span>
          </a>

          {/* ── Desktop Links ── */}
          <div
            className="hidden md:flex items-center gap-7"
            aria-label="Desktop navigation links"
          >
            {navLinks.map(renderDesktopLink)}
          </div>

          {/* ── Mobile Hamburger Button ── */}
          <button
            id="navbar-hamburger"
            type="button"
            onClick={() => setMenuOpen((prev) => !prev)}
            className="relative z-50 flex md:hidden flex-col justify-center items-center w-10 h-10 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] rounded"
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
          >
            {/* Top line */}
            <motion.span
              className="block h-[2px] w-6 bg-[var(--color-text-primary)] rounded-full"
              animate={
                menuOpen
                  ? { rotate: 45, y: 0, transition: { duration: 0.3 } }
                  : { rotate: 0, y: -4, transition: { duration: 0.3 } }
              }
              style={{ originX: "50%", originY: "50%" }}
            />
            {/* Bottom line */}
            <motion.span
              className="block h-[2px] w-6 bg-[var(--color-text-primary)] rounded-full"
              animate={
                menuOpen
                  ? { rotate: -45, y: 0, transition: { duration: 0.3 } }
                  : { rotate: 0, y: 4, transition: { duration: 0.3 } }
              }
              style={{ originX: "50%", originY: "50%" }}
            />
          </button>
        </div>
      </motion.nav>

      {/* ── Mobile Full-Screen Overlay ── */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* backdrop */}
            <motion.div
              key="mobile-backdrop"
              className="fixed inset-0 z-40 bg-black/60"
              variants={overlayVariants}
              initial="closed"
              animate="open"
              exit="closed"
              onClick={closeMobileMenu}
              aria-hidden="true"
            />

            {/* panel */}
            <motion.aside
              id="mobile-menu"
              key="mobile-panel"
              role="dialog"
              aria-label="Mobile navigation menu"
              aria-modal="true"
              className="fixed inset-y-0 right-0 z-45 w-full sm:w-80 bg-[var(--color-bg)]/95 backdrop-blur-xl flex flex-col justify-center items-center"
              style={{ zIndex: 45 }}
              variants={panelVariants}
              initial="closed"
              animate="open"
              exit="closed"
            >
              <motion.ul
                className="flex flex-col items-center gap-8"
                variants={linkStagger}
                initial="closed"
                animate="open"
                exit="closed"
              >
                {navLinks.map(renderMobileLink)}
              </motion.ul>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
