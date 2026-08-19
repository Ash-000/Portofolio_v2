"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { projects, getAllTechStacks } from "@/lib/projects";
import { ProjectCard } from "@/components/project-card";
import { ScrollReveal } from "@/components/scroll-reveal";
import { useI18n } from "@/lib/i18n";

export default function ProjectsPage() {
  const [activeFilter, setActiveFilter] = useState("all");
  const allTechs = getAllTechStacks();
  const { t } = useI18n();

  const filtered =
    activeFilter === "all"
      ? projects
      : projects.filter((p) => p.tech.includes(activeFilter));

  return (
    <div className="pt-28 pb-24">
      <div className="max-w-[1200px] mx-auto px-6">
        {/* Header */}
        <ScrollReveal>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tighter">
            {t("projects.title")}
          </h1>
          <p className="text-foreground-muted mt-3 max-w-[50ch] text-lg">
            {t("projects.subtitle")}
          </p>
        </ScrollReveal>

        {/* Filter pills */}
        <ScrollReveal delay={0.1}>
          <div className="mt-8 mb-10 flex flex-wrap gap-2">
            <button
              onClick={() => setActiveFilter("all")}
              className={`px-3.5 py-1.5 rounded-full text-sm font-medium transition-all duration-300 cursor-pointer
                ${
                  activeFilter === "all"
                    ? "bg-accent text-white"
                    : "bg-border-subtle text-foreground-muted hover:text-foreground hover:bg-border"
                }`}
            >
              {t("projects.filterAll")}
            </button>
            {allTechs.map((tech) => (
              <button
                key={tech}
                onClick={() => setActiveFilter(tech)}
                className={`px-3.5 py-1.5 rounded-full text-sm font-medium transition-all duration-300 cursor-pointer
                  ${
                    activeFilter === tech
                      ? "bg-accent text-white"
                      : "bg-border-subtle text-foreground-muted hover:text-foreground hover:bg-border"
                  }`}
              >
                {tech}
              </button>
            ))}
          </div>
        </ScrollReveal>

        {/* Project grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <motion.div
                key={project.slug}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{
                  duration: 0.4,
                  delay: i * 0.05,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <ProjectCard project={project} index={i} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <p className="text-foreground-muted">
              {t("projects.empty")}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
