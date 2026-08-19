"use client";

import Link from "next/link";
import { ArrowRight, PaperPlaneTilt } from "@phosphor-icons/react";
import { ScrollReveal } from "./scroll-reveal";
import { useI18n } from "@/lib/i18n";

export function HomeCta() {
  const { t } = useI18n();

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-6">
        <ScrollReveal>
          <div className="relative rounded-[2.5rem] p-8 md:p-14 bg-gradient-to-br from-background-elevated via-background-elevated to-accent-muted/20 border border-border/80 shadow-[0_16px_48px_var(--shadow-color)] overflow-hidden">
            {/* Ambient Background Glow */}
            <div className="absolute top-0 right-0 -mr-24 -mt-24 w-96 h-96 bg-accent/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 max-w-[650px] space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-muted text-accent text-xs font-mono font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                Let&apos;s Build Together
              </div>

              <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground leading-[1.15]">
                {t("home.cta.title")}
              </h2>

              <p className="text-foreground-muted text-base md:text-lg leading-relaxed">
                {t("home.cta.subtitle")}
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full
                    bg-accent text-white font-semibold text-sm shadow-[0_4px_24px_rgba(16,185,129,0.3)]
                    hover:bg-accent-hover active:scale-[0.98] transition-all duration-200"
                >
                  <span>{t("home.cta.btn")}</span>
                  <PaperPlaneTilt size={16} weight="bold" />
                </Link>

                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full
                    border border-border text-foreground font-medium text-sm
                    hover:bg-border-subtle active:scale-[0.98] transition-all duration-200"
                >
                  <span>{t("home.cta.secondary")}</span>
                  <ArrowRight size={14} weight="bold" />
                </Link>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
