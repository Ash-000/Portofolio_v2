"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { ArrowUpRight, CalendarBlank } from "@phosphor-icons/react";
import { useI18n } from "@/lib/i18n";
import type { Project } from "@/lib/projects";

interface ProjectCardProps {
  project: Project;
  index?: number;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const { locale } = useI18n();
  const reduce = useReducedMotion();

  return (
    <Link href={`/projects/${project.slug}`} className="group block h-full focus:outline-none">
      {/* Outer shell (double bezel) */}
      <motion.div
        whileHover={reduce ? {} : { y: -4 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="p-1.5 rounded-[1.75rem] bg-border-subtle/60 ring-1 ring-surface-glass-border
          hover:ring-accent/40 hover:shadow-[0_12px_36px_var(--shadow-elevated)]
          transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] h-full flex flex-col"
      >
        {/* Inner core */}
        <div className="rounded-[calc(1.75rem-0.375rem)] bg-background-elevated overflow-hidden
          shadow-[inset_0_1px_1px_rgba(255,255,255,0.08)] flex-1 flex flex-col">
          {/* Thumbnail */}
          <div className="relative aspect-[16/10] overflow-hidden bg-border-subtle">
            <Image
              src={project.thumbnail}
              alt={project.title}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]
                group-hover:scale-105"
            />
            {/* Year Badge */}
            <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-background-elevated/80 backdrop-blur-md
              border border-border/60 text-[11px] font-mono font-medium text-foreground flex items-center gap-1.5 shadow-sm">
              <CalendarBlank size={12} className="text-accent" />
              <span>{project.year}</span>
            </div>

            {/* Hover overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-background-elevated/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>

          {/* Content */}
          <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-start justify-between gap-3">
                <h3 className="font-bold text-lg text-foreground group-hover:text-accent
                  transition-colors duration-200">
                  {project.title}
                </h3>
                <div
                  className="shrink-0 w-9 h-9 rounded-full bg-border-subtle flex items-center justify-center
                    group-hover:bg-accent group-hover:text-white transition-colors duration-200"
                >
                  <ArrowUpRight
                    size={16}
                    weight="bold"
                    className="text-foreground-muted group-hover:text-white
                      group-hover:translate-x-[1px] group-hover:-translate-y-[1px]
                      transition-all duration-200"
                  />
                </div>
              </div>
              <p className="text-sm text-foreground-muted leading-relaxed line-clamp-2">
                {project.description[locale] || project.description.id}
              </p>
            </div>

            {/* Tech pills */}
            <div className="flex flex-wrap gap-1.5 pt-2">
              {project.tech.slice(0, 4).map((t) => (
                <span
                  key={t}
                  className="px-2.5 py-1 rounded-full text-xs font-mono font-medium
                    bg-border-subtle text-foreground-muted group-hover:border-accent/20 transition-colors"
                >
                  {t}
                </span>
              ))}
              {project.tech.length > 4 && (
                <span className="px-2.5 py-1 rounded-full text-xs font-mono font-medium
                  bg-border-subtle text-foreground-muted">
                  +{project.tech.length - 4}
                </span>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
