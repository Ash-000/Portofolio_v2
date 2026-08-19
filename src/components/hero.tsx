"use client";

import { useEffect, useRef } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ArrowDown, Code, Sparkle, Terminal, GitCommit, CheckCircle } from "@phosphor-icons/react";
import Link from "next/link";
import { useI18n } from "@/lib/i18n";
import { animate, stagger } from "animejs";

export function Hero() {
  const reduce = useReducedMotion();
  const { t, locale } = useI18n();
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reduce || !terminalRef.current) return;

    // Anime.js v4 stagger pulse on code lines
    const animation = animate(terminalRef.current.querySelectorAll(".code-line"), {
      opacity: [0, 1],
      translateX: [-10, 0],
      delay: stagger(120, { start: 500 }),
      ease: "outExpo",
      duration: 800,
    });

    return () => {
      animation.pause();
    };
  }, [reduce]);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20, filter: "blur(4px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
    },
  };

  return (
    <section className="relative min-h-[100dvh] flex items-center pt-28 pb-16 overflow-hidden">
      {/* Background Subtle Ambient Grid */}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="w-full max-w-[1200px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left: Text content */}
          <motion.div
            className="lg:col-span-7 space-y-6"
            variants={reduce ? undefined : containerVariants}
            initial={reduce ? false : "hidden"}
            animate="visible"
          >
            {/* Status Pill */}
            <motion.div
              variants={reduce ? undefined : itemVariants}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full
                bg-accent-muted text-accent text-xs font-mono font-medium tracking-wide
                border border-accent/20 shadow-[0_0_12px_rgba(16,185,129,0.15)]"
            >
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <span>{t("hero.badge")}</span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              variants={reduce ? undefined : itemVariants}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tighter leading-[1.08]"
            >
              {t("hero.h1.line1")}
              <br />
              <span className="text-foreground-muted font-normal">{t("hero.h1.line2")}</span>{" "}
              <span className="text-accent underline decoration-accent/30 decoration-wavy underline-offset-8">
                {t("hero.h1.line3")}
              </span>
            </motion.h1>

            {/* Value Proposition */}
            <motion.p
              variants={reduce ? undefined : itemVariants}
              className="text-foreground-muted text-lg leading-relaxed max-w-[48ch]"
            >
              {t("hero.description")}
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={reduce ? undefined : itemVariants}
              className="flex flex-wrap items-center gap-3 pt-2"
            >
              <Link
                href="/projects"
                className="group relative inline-flex items-center gap-2.5 px-6 py-3 rounded-full
                  bg-accent text-white font-medium text-sm shadow-[0_4px_20px_rgba(16,185,129,0.25)]
                  hover:bg-accent-hover active:scale-[0.98]
                  transition-all duration-200"
              >
                <span>{t("hero.cta.projects")}</span>
                <Code size={16} weight="bold" className="group-hover:rotate-12 transition-transform duration-200" />
              </Link>

              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full
                  border border-border bg-background-elevated/80 backdrop-blur-sm text-foreground font-medium text-sm
                  hover:bg-border-subtle hover:border-accent/30 active:scale-[0.98]
                  transition-all duration-200"
              >
                <span>{t("hero.cta.contact")}</span>
                <Sparkle size={16} weight="duotone" className="text-accent" />
              </Link>
            </motion.div>
          </motion.div>

          {/* Right: Interactive Terminal & Live Visual Card */}
          <motion.div
            className="lg:col-span-5 flex justify-center lg:justify-end"
            initial={reduce ? false : { opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="relative w-full max-w-[440px]">
              {/* Outer Glow Halo */}
              <div className="absolute -inset-1 bg-gradient-to-r from-accent/20 via-accent/5 to-transparent rounded-[2rem] blur-xl opacity-70" />

              {/* Glass Container */}
              <div className="relative rounded-[1.75rem] bg-background-elevated/90 backdrop-blur-xl border border-surface-glass-border shadow-[0_8px_32px_var(--shadow-elevated)] overflow-hidden">
                {/* Window Title Bar */}
                <div className="flex items-center justify-between px-5 py-3.5 border-b border-border/80 bg-border-subtle/50">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
                    <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
                    <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
                  </div>
                  <div className="flex items-center gap-1.5 text-xs font-mono text-foreground-muted">
                    <Terminal size={14} className="text-accent" />
                    <span>developer.tsx</span>
                  </div>
                  <div className="w-10" />
                </div>

                {/* Interactive Code Body */}
                <div ref={terminalRef} className="p-6 font-mono text-xs leading-relaxed space-y-2.5">
                  <div className="code-line text-foreground-muted">
                    <span className="text-accent">const</span> developer = &#123;
                  </div>
                  <div className="code-line pl-4 text-foreground">
                    name: <span className="text-amber-500 dark:text-amber-400">&apos;Fullstack Engineer&apos;</span>,
                  </div>
                  <div className="code-line pl-4 text-foreground">
                    role: <span className="text-emerald-500 dark:text-emerald-400">&apos;Modern Web &amp; Apps&apos;</span>,
                  </div>
                  <div className="code-line pl-4 text-foreground">
                    stacks: [
                    <span className="text-accent">&apos;React&apos;</span>,{" "}
                    <span className="text-accent">&apos;Next.js&apos;</span>,{" "}
                    <span className="text-accent">&apos;TypeScript&apos;</span>,{" "}
                    <span className="text-accent">&apos;Node.js&apos;</span>],
                  </div>
                  <div className="code-line pl-4 text-foreground">
                    status: <span className="text-emerald-500">&apos;Ready to ship 🚀&apos;</span>,
                  </div>
                  <div className="code-line text-foreground-muted">&#125;;</div>

                  {/* Terminal Execution Output */}
                  <div className="mt-4 pt-4 border-t border-border/60 text-[11px] space-y-1.5 text-foreground-muted">
                    <div className="flex items-center gap-2 text-emerald-500">
                      <CheckCircle size={14} weight="fill" />
                      <span>{locale === "id" ? "Semua sistem berjalan optimal (100% test pass)" : "All systems operational (100% test pass)"}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <GitCommit size={14} className="text-accent" />
                      <span>{locale === "id" ? "Commit terbaru: Siap membangun solusi hebat" : "Latest commit: Ready to build great solutions"}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Live Badge */}
              <motion.div
                className="absolute -bottom-4 -left-4 px-4 py-2 rounded-2xl
                  bg-background-elevated border border-border text-xs font-mono
                  shadow-[0_8px_24px_var(--shadow-color)] flex items-center gap-2"
                animate={reduce ? {} : { y: [0, -5, 0] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <span className="w-2 h-2 rounded-full bg-accent animate-ping" />
                <span className="text-foreground font-semibold">100% Performance</span>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden md:block"
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
        >
          <motion.div
            animate={reduce ? {} : { y: [0, 6, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center gap-1 cursor-pointer text-foreground-muted hover:text-accent transition-colors"
          >
            <span className="text-[10px] font-mono uppercase tracking-widest">Scroll</span>
            <ArrowDown size={18} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
