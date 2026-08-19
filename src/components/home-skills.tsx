"use client";

import Link from "next/link";
import { ArrowRight, Sparkle } from "@phosphor-icons/react";
import { SkillGrid } from "./skill-grid";
import { ScrollReveal } from "./scroll-reveal";
import { useI18n } from "@/lib/i18n";

export function HomeSkills() {
  const { t } = useI18n();

  return (
    <section className="py-24 border-t border-border/60 bg-border-subtle/20">
      <div className="max-w-[1200px] mx-auto px-6">
        <ScrollReveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-accent uppercase tracking-widest mb-2">
                <Sparkle size={14} weight="fill" />
                <span>Tech Stack</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
                {t("home.skills.title")}
              </h2>
              <p className="text-foreground-muted mt-2 max-w-[50ch] text-base">
                {t("home.skills.subtitle")}
              </p>
            </div>

            <Link
              href="/about"
              className="hidden md:inline-flex items-center gap-2 text-sm font-semibold
                text-foreground-muted hover:text-accent transition-colors group"
            >
              <span>{t("home.skills.more")}</span>
              <ArrowRight
                size={14}
                weight="bold"
                className="group-hover:translate-x-1 transition-transform"
              />
            </Link>
          </div>
        </ScrollReveal>

        <SkillGrid />

        <div className="mt-10 md:hidden text-center">
          <Link
            href="/about"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full
              border border-border text-sm font-medium text-foreground-muted
              hover:text-foreground hover:bg-border-subtle transition-all"
          >
            <span>{t("home.skills.more")}</span>
            <ArrowRight size={14} weight="bold" />
          </Link>
        </div>
      </div>
    </section>
  );
}
