"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowUpRight } from "@phosphor-icons/react";
import { useI18n } from "@/lib/i18n";
import type { Project } from "@/lib/projects";

interface ProjectCardProps {
  project: Project;
  index?: number;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const { locale } = useI18n();

  return (
    <Link href={`/projects/${project.slug}`} className="group block">
      {/* Outer shell (double bezel) */}
      <div className="p-1.5 rounded-[1.5rem] bg-border-subtle/50 ring-1 ring-surface-glass-border
        hover:ring-accent/20 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]">
        {/* Inner core */}
        <div className="rounded-[calc(1.5rem-0.375rem)] bg-background-elevated overflow-hidden
          shadow-[inset_0_1px_1px_rgba(255,255,255,0.08)]">
          {/* Thumbnail */}
          <div className="relative aspect-[4/3] overflow-hidden">
            <Image
              src={project.thumbnail}
              alt={project.title}
              fill
              className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]
                group-hover:scale-105"
            />
            {/* Hover overlay */}
            <div className="absolute inset-0 bg-accent/0 group-hover:bg-accent/5
              transition-colors duration-500" />
          </div>

          {/* Content */}
          <div className="p-5 space-y-3">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="font-semibold text-foreground group-hover:text-accent
                  transition-colors duration-300">
                  {project.title}
                </h3>
                <p className="text-sm text-foreground-muted mt-1 leading-relaxed line-clamp-2">
                  {project.description[locale] || project.description.id}
                </p>
              </div>
              <motion.div
                className="shrink-0 w-8 h-8 rounded-full bg-border-subtle flex items-center justify-center
                  group-hover:bg-accent-muted transition-colors duration-300"
                whileHover={{ scale: 1.1 }}
              >
                <ArrowUpRight
                  size={14}
                  weight="bold"
                  className="text-foreground-muted group-hover:text-accent
                    group-hover:translate-x-[1px] group-hover:-translate-y-[1px]
                    transition-all duration-300"
                />
              </motion.div>
            </div>

            {/* Tech pills */}
            <div className="flex flex-wrap gap-1.5">
              {project.tech.slice(0, 4).map((t) => (
                <span
                  key={t}
                  className="px-2 py-0.5 rounded-full text-[11px] font-mono font-medium
                    bg-border-subtle text-foreground-muted"
                >
                  {t}
                </span>
              ))}
              {project.tech.length > 4 && (
                <span className="px-2 py-0.5 rounded-full text-[11px] font-mono font-medium
                  bg-border-subtle text-foreground-muted">
                  +{project.tech.length - 4}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
