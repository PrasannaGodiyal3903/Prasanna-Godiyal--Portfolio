import { motion, useReducedMotion } from 'framer-motion';
import { FaGithub, FaLinkedinIn } from 'react-icons/fa';
import { SiLeetcode } from 'react-icons/si';
import { personalInfo } from '../data/portfolio';

const Contact = () => {
  const prefersReducedMotion = useReducedMotion();
  const currentYear = new Date().getFullYear();

  const fadeUp = prefersReducedMotion
    ? { hidden: {}, visible: {} }
    : {
        hidden: { opacity: 0, y: 40 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
        },
      };

  const staggerContainer = prefersReducedMotion
    ? { hidden: {}, visible: {} }
    : {
        hidden: {},
        visible: {
          transition: { staggerChildren: 0.12, delayChildren: 0.2 },
        },
      };

  const socialLinks = [
    {
      url: personalInfo.github,
      icon: <FaGithub size={20} />,
      label: 'GitHub',
    },
    {
      url: personalInfo.linkedin,
      icon: <FaLinkedinIn size={20} />,
      label: 'LinkedIn',
    },
    {
      url: personalInfo.leetcode,
      icon: <SiLeetcode size={20} />,
      label: 'LeetCode',
    },
  ].filter((link) => link.url);

  return (
    <section id="contact" className="py-24 md:py-32" aria-labelledby="contact-heading">
      <motion.div
        className="section-container text-center"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {/* Section Label */}
        <motion.p className="section-label justify-center" variants={fadeUp}>
          GET IN TOUCH
        </motion.p>

        {/* Section Title */}
        <motion.h2
          id="contact-heading"
          className="section-title mt-4"
          variants={fadeUp}
        >
          Let's Connect
        </motion.h2>

        {/* Invitation Paragraph */}
        <motion.p
          className="section-description mt-4 mx-auto max-w-xl"
          variants={fadeUp}
        >
          Have a project in mind, a question, or just want to say hello? I'd
          love to hear from you. Drop me an email and let's start a
          conversation.
        </motion.p>

        {/* Email Link */}
        <motion.a
          href={`mailto:${personalInfo.email}`}
          className="inline-block mt-10 text-2xl md:text-3xl lg:text-4xl underline decoration-[var(--color-accent)] underline-offset-8 decoration-2 transition-colors duration-300 hover:text-[var(--color-accent)]"
          style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text-primary)' }}
          variants={fadeUp}
          whileHover={prefersReducedMotion ? {} : { scale: 1.03 }}
          aria-label={`Send email to ${personalInfo.email}`}
        >
          {personalInfo.email}
        </motion.a>

        {/* Social Links */}
        <motion.div
          className="flex items-center justify-center gap-4 mt-10"
          variants={fadeUp}
          role="list"
          aria-label="Social media links"
        >
          {socialLinks.map((link) => (
            <motion.a
              key={link.label}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              role="listitem"
              aria-label={link.label}
              className="w-12 h-12 rounded-full border flex items-center justify-center transition-colors duration-300"
              style={{
                borderColor: 'var(--color-border)',
                color: 'var(--color-text-secondary)',
              }}
              whileHover={
                prefersReducedMotion
                  ? {}
                  : {
                      scale: 1.1,
                      borderColor: 'var(--color-accent)',
                      color: 'var(--color-accent)',
                    }
              }
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--color-accent)';
                e.currentTarget.style.color = 'var(--color-accent)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--color-border)';
                e.currentTarget.style.color = 'var(--color-text-secondary)';
              }}
            >
              {link.icon}
            </motion.a>
          ))}
        </motion.div>

        {/* Footer */}
        <motion.footer
          className="mt-16 pt-8"
          style={{ borderTop: '1px solid var(--color-border)' }}
          variants={fadeUp}
        >
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p
              className="text-sm"
              style={{ color: 'var(--color-text-muted)' }}
            >
              &copy; {currentYear} {personalInfo.name}. All rights reserved.
            </p>
            <a
              href="#home"
              className="text-sm transition-colors duration-300"
              style={{ color: 'var(--color-text-muted)' }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = 'var(--color-accent)')
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = 'var(--color-text-muted)')
              }
              aria-label="Back to top of page"
            >
              Back to top &uarr;
            </a>
          </div>
        </motion.footer>
      </motion.div>
    </section>
  );
};

export default Contact;
