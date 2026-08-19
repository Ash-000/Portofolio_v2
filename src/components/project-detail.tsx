"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, GithubLogo } from "@phosphor-icons/react";
import { useI18n } from "@/lib/i18n";
import type { Project } from "@/lib/projects";

export function ProjectDetail({ project }: { project: Project }) {
  const { locale, t } = useI18n();

  return (
    <div className="pt-28 pb-24">
      <div className="max-w-[900px] mx-auto px-6">
        {/* Back link */}
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-sm text-foreground-muted
            hover:text-foreground transition-colors mb-8 group"
        >
          <ArrowLeft
            size={14}
            weight="bold"
            className="group-hover:-translate-x-1 transition-transform"
          />
          {t("projects.back")}
        </Link>

        {/* Header */}
        <div className="space-y-4 mb-10">
          <div className="flex flex-wrap gap-2">
            {project.tech.map((t) => (
              <span
                key={t}
                className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-medium
                  bg-accent-muted text-accent"
              >
                {t}
              </span>
            ))}
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tighter">
            {project.title}
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-sm text-foreground-muted">
            <span>{project.role[locale] || project.role.id}</span>
            <span className="w-1 h-1 rounded-full bg-border" />
            <span>{project.year}</span>
          </div>
        </div>

        {/* Hero image */}
        <div className="p-1.5 rounded-[1.5rem] bg-border-subtle/50 ring-1 ring-surface-glass-border mb-10">
          <div className="relative aspect-[16/10] rounded-[calc(1.5rem-0.375rem)] overflow-hidden">
            <Image
              src={project.images[0] || project.thumbnail}
              alt={project.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>

        {/* Description */}
        <div className="prose prose-zinc dark:prose-invert max-w-none mb-10">
          <p className="text-lg leading-relaxed text-foreground-muted">
            {project.longDescription[locale] || project.longDescription.id}
          </p>
        </div>

        {/* Links */}
        <div className="flex flex-wrap gap-3">
          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full
                bg-accent text-white font-medium text-sm
                hover:bg-accent-hover active:scale-[0.98] transition-all"
            >
              Live Demo
              <ArrowUpRight size={14} weight="bold" />
            </a>
          )}
          {project.repoUrl && (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full
                border border-border text-foreground font-medium text-sm
                hover:bg-border-subtle active:scale-[0.98] transition-all"
            >
              <GithubLogo size={16} weight="bold" />
              Source Code
            </a>
          )}
        </div>

        {/* Additional images */}
        {project.images.length > 1 && (
          <div className="mt-12 space-y-5">
            {project.images.slice(1).map((img, i) => (
              <div
                key={i}
                className="p-1.5 rounded-[1.5rem] bg-border-subtle/50 ring-1 ring-surface-glass-border"
              >
                <div className="relative aspect-[16/10] rounded-[calc(1.5rem-0.375rem)] overflow-hidden">
                  <Image
                    src={img}
                    alt={`${project.title} screenshot ${i + 2}`}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
