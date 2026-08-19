"use client";

import { getFeaturedProjects } from "@/lib/projects";
import { ProjectCard } from "./project-card";
import { ScrollReveal } from "./scroll-reveal";
import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react";
import { useI18n } from "@/lib/i18n";

export function FeaturedProjects() {
  const featured = getFeaturedProjects();
  const { t } = useI18n();

  return (
    <section className="py-28 md:py-32">
      <div className="max-w-[1200px] mx-auto px-6">
        <ScrollReveal>
          <div className="flex items-end justify-between mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                {t("featured.title")}
              </h2>
              <p className="text-foreground-muted mt-2 max-w-[45ch]">
                {t("featured.subtitle")}
              </p>
            </div>
            <Link
              href="/projects"
              className="hidden md:inline-flex items-center gap-2 text-sm font-medium
                text-foreground-muted hover:text-accent transition-colors group"
            >
               {t("featured.viewAll")}
              <ArrowRight
                size={14}
                weight="bold"
                className="group-hover:translate-x-1 transition-transform"
              />
            </Link>
          </div>
        </ScrollReveal>

        {/* Asymmetric grid: first card large, rest smaller */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
          {featured.map((project, i) => (
            <ScrollReveal
              key={project.slug}
              delay={i * 0.1}
              className={
                i === 0
                  ? "md:col-span-7"
                  : i === 1
                    ? "md:col-span-5"
                    : "md:col-span-6"
              }
            >
              <ProjectCard project={project} index={i} />
            </ScrollReveal>
          ))}
        </div>

        {/* Mobile "see all" link */}
        <div className="mt-8 md:hidden text-center">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full
              border border-border text-sm font-medium text-foreground-muted
              hover:text-foreground hover:bg-border-subtle transition-all"
          >
            {t("featured.viewAll")}
            <ArrowRight size={14} weight="bold" />
          </Link>
        </div>
      </div>
    </section>
  );
}
