"use client";

import { motion, useReducedMotion } from "motion/react";
import { ArrowDown } from "@phosphor-icons/react";
import Link from "next/link";
import { useI18n } from "@/lib/i18n";

export function Hero() {
  const reduce = useReducedMotion();
  const { t } = useI18n();

  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.12, delayChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 24, filter: "blur(4px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const },
    },
  };

  return (
    <section className="relative min-h-[100dvh] flex items-center pt-24 pb-16">
      <div className="w-full max-w-[1200px] mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center">
          {/* Left: Text content */}
          <motion.div
            className="md:col-span-7 space-y-6"
            variants={reduce ? undefined : containerVariants}
            initial={reduce ? false : "hidden"}
            animate="visible"
          >
            <motion.div
              variants={reduce ? undefined : itemVariants}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full
                bg-accent-muted text-accent text-xs font-mono font-medium tracking-wide"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              {t("hero.badge")}
            </motion.div>

            <motion.h1
              variants={reduce ? undefined : itemVariants}
              className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter leading-[1.1]"
            >
              {t("hero.h1.line1")}
              <br />
              <span className="text-foreground-muted">{t("hero.h1.line2")}</span>
              <br />
              <span className="text-accent">{t("hero.h1.line3")}</span>
            </motion.h1>

            <motion.p
              variants={reduce ? undefined : itemVariants}
              className="text-foreground-muted text-lg leading-relaxed max-w-[50ch]"
            >
              {t("hero.description")}
            </motion.p>

            <motion.div
              variants={reduce ? undefined : itemVariants}
              className="flex flex-wrap gap-3"
            >
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full
                  bg-accent text-white font-medium text-sm
                  hover:bg-accent-hover active:scale-[0.98]
                  transition-all duration-200"
              >
                {t("hero.cta.projects")}
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full
                  border border-border text-foreground font-medium text-sm
                  hover:bg-border-subtle active:scale-[0.98]
                  transition-all duration-200"
              >
                {t("hero.cta.contact")}
              </Link>
            </motion.div>
          </motion.div>

          {/* Right: Profile visual */}
          <motion.div
            className="md:col-span-5 flex justify-center md:justify-end"
            initial={reduce ? false : { opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="relative">
              {/* Outer shell (double bezel) */}
              <div className="p-1.5 rounded-[2rem] bg-border-subtle/50 ring-1 ring-surface-glass-border">
                {/* Inner core */}
                <div
                  className="w-64 h-72 md:w-72 md:h-80 rounded-[calc(2rem-0.375rem)]
                    bg-background-elevated overflow-hidden
                    shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]"
                >
                  {/* Profile image placeholder */}
                  <div className="w-full h-full bg-gradient-to-br from-accent/20 via-background-elevated to-accent/5
                    flex items-center justify-center">
                    <span className="text-6xl font-bold text-accent/30 font-mono">
                      {"{ }"}
                    </span>
                  </div>
                </div>
              </div>
              {/* Floating decorative element */}
              <motion.div
                className="absolute -bottom-3 -right-3 px-3 py-1.5 rounded-full
                  bg-background-elevated border border-border text-xs font-mono text-foreground-muted
                  shadow-[0_4px_16px_var(--shadow-color)]"
                animate={reduce ? {} : { y: [0, -6, 0] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                {'console.log("hello")'}
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:block"
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.6 }}
        >
          <motion.div
            animate={reduce ? {} : { y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <ArrowDown size={20} className="text-foreground-muted" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
