"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MagnifyingGlass, X } from "@phosphor-icons/react";
import { projects, getAllTechStacks } from "@/lib/projects";
import { ProjectCard } from "@/components/project-card";
import { ScrollReveal } from "@/components/scroll-reveal";
import { useI18n } from "@/lib/i18n";

export default function ProjectsPage() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const allTechs = getAllTechStacks();
  const { t, locale } = useI18n();

  const filtered = useMemo(() => {
    return projects.filter((p) => {
      const matchesTech = activeFilter === "all" || p.tech.includes(activeFilter);
      const localizedDesc = p.description[locale] || p.description.id;
      const matchesSearch =
        searchQuery === "" ||
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        localizedDesc.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.tech.some((tech) => tech.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchesTech && matchesSearch;
    });
  }, [activeFilter, searchQuery, locale]);

  return (
    <div className="pt-28 pb-24">
      <div className="max-w-[1200px] mx-auto px-6">
        {/* Header */}
        <ScrollReveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tighter">
                {t("projects.title")}
              </h1>
              <p className="text-foreground-muted mt-3 max-w-[50ch] text-lg">
                {t("projects.subtitle")}
              </p>
            </div>

            {/* Live Search Input */}
            <div className="relative w-full md:w-72">
              <MagnifyingGlass size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-foreground-muted" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={locale === "id" ? "Cari proyek atau stack..." : "Search project or tech..."}
                className="w-full pl-10 pr-9 py-2.5 rounded-full bg-background-elevated border border-border
                  text-foreground text-sm placeholder:text-foreground-muted/60
                  focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent
                  transition-all duration-200"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-foreground-muted hover:text-foreground p-1"
                  aria-label="Clear search"
                >
                  <X size={14} />
                </button>
              )}
            </div>
          </div>
        </ScrollReveal>

        {/* Filter pills */}
        <ScrollReveal delay={0.1}>
          <div className="mt-8 mb-10 flex flex-wrap items-center gap-2">
            <button
              onClick={() => setActiveFilter("all")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer flex items-center gap-1.5
                ${
                  activeFilter === "all"
                    ? "bg-accent text-white shadow-[0_2px_12px_rgba(16,185,129,0.25)]"
                    : "bg-border-subtle text-foreground-muted hover:text-foreground hover:bg-border"
                }`}
            >
              <span>{t("projects.filterAll")}</span>
              <span className={`text-xs px-1.5 py-0.2 rounded-full ${activeFilter === "all" ? "bg-white/20 text-white" : "bg-border text-foreground-muted"}`}>
                {projects.length}
              </span>
            </button>
            {allTechs.map((tech) => {
              const count = projects.filter((p) => p.tech.includes(tech)).length;
              return (
                <button
                  key={tech}
                  onClick={() => setActiveFilter(tech)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer flex items-center gap-1.5
                    ${
                      activeFilter === tech
                        ? "bg-accent text-white shadow-[0_2px_12px_rgba(16,185,129,0.25)]"
                        : "bg-border-subtle text-foreground-muted hover:text-foreground hover:bg-border"
                    }`}
                >
                  <span>{tech}</span>
                  <span className={`text-xs px-1.5 py-0.2 rounded-full ${activeFilter === tech ? "bg-white/20 text-white" : "bg-border text-foreground-muted"}`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </ScrollReveal>

        {/* Project grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <motion.div
                key={project.slug}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{
                  duration: 0.35,
                  delay: i * 0.04,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <ProjectCard project={project} index={i} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-24 rounded-3xl border border-dashed border-border bg-border-subtle/30">
            <p className="text-foreground-muted text-base">
              {t("projects.empty")}
            </p>
            {searchQuery && (
              <button
                onClick={() => {
                  setSearchQuery("");
                  setActiveFilter("all");
                }}
                className="mt-4 px-4 py-2 rounded-full bg-accent text-white text-xs font-medium hover:bg-accent-hover transition-colors"
              >
                {locale === "id" ? "Reset Pencarian" : "Reset Search"}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
