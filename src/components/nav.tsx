"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { List, X } from "@phosphor-icons/react";
import { ThemeToggle } from "./theme-toggle";
import { LangToggle } from "./lang-toggle";
import { useI18n } from "@/lib/i18n";
import type { TranslationKey } from "@/lib/i18n";

const linkDefs: { href: string; labelKey: TranslationKey }[] = [
  { href: "/", labelKey: "nav.home" },
  { href: "/projects", labelKey: "nav.projects" },
  { href: "/about", labelKey: "nav.about" },
  { href: "/contact", labelKey: "nav.contact" },
];

export function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const reduce = useReducedMotion();
  const { t } = useI18n();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-4 left-1/2 -translate-x-1/2 z-50
          rounded-full px-2 py-2
          border border-surface-glass-border
          transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]
          ${
            scrolled
              ? "bg-surface-glass backdrop-blur-xl shadow-[0_4px_24px_var(--shadow-color)]"
              : "bg-surface-glass/50 backdrop-blur-md"
          }`}
      >
        <div className="flex items-center gap-1">
          {/* Logo */}
          <Link
            href="/"
            onClick={() => setMobileOpen(false)}
            className="px-3 py-1.5 font-mono text-sm font-semibold text-accent
              hover:text-accent-hover transition-colors"
          >
            {"<dev />"}
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-0.5">
            {linkDefs.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative px-3 py-1.5 text-sm font-medium rounded-full
                    transition-colors duration-200
                    ${
                      active
                        ? "text-foreground"
                        : "text-foreground-muted hover:text-foreground"
                    }`}
                >
                  {active && (
                    <motion.div
                      layoutId="nav-active"
                      className="absolute inset-0 rounded-full bg-accent-muted"
                      transition={{
                        type: "spring",
                        stiffness: 350,
                        damping: 30,
                      }}
                    />
                  )}
                  <span className="relative z-10">{t(link.labelKey)}</span>
                </Link>
              );
            })}
          </div>

          {/* Theme toggle + Lang toggle + mobile hamburger */}
          <div className="flex items-center gap-1 ml-1">
            <LangToggle />
            <ThemeToggle />
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden w-9 h-9 rounded-full flex items-center justify-center
                bg-border-subtle hover:bg-border transition-colors cursor-pointer"
              aria-label="Toggle menu"
            >
              {mobileOpen ? (
                <X size={18} weight="bold" className="text-foreground" />
              ) : (
                <List size={18} weight="bold" className="text-foreground" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-background/90 backdrop-blur-2xl
              flex items-center justify-center md:hidden"
          >
            <nav className="flex flex-col items-center gap-6">
              {linkDefs.map((link, i) => {
                const active = pathname === link.href;
                return (
                  <motion.div
                    key={link.href}
                    initial={reduce ? false : { opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.4,
                      delay: i * 0.08,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className={`text-3xl font-semibold transition-colors
                        ${
                          active
                            ? "text-accent"
                            : "text-foreground-muted hover:text-foreground"
                        }`}
                    >
                      {t(link.labelKey)}
                    </Link>
                  </motion.div>
                );
              })}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
