"use client";

import { ScrollReveal } from "@/components/scroll-reveal";
import {
  Code,
  Database,
  Layout,
  Wrench,
  Terminal,
  Globe,
} from "@phosphor-icons/react";
import { useI18n } from "@/lib/i18n";
import type { ReactNode } from "react";

interface SkillCategory {
  titleKey?: "skill.languages" | "skill.other";
  rawTitle?: string;
  icon: ReactNode;
  skills: string[];
}

const skillCategories: SkillCategory[] = [
  {
    rawTitle: "Frontend",
    icon: <Layout size={20} weight="duotone" />,
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "HTML/CSS"],
  },
  {
    rawTitle: "Backend",
    icon: <Database size={20} weight="duotone" />,
    skills: ["Node.js", "Python", "FastAPI", "PostgreSQL", "MongoDB"],
  },
  {
    rawTitle: "Tools",
    icon: <Wrench size={20} weight="duotone" />,
    skills: ["Git", "Docker", "VS Code", "Figma", "Postman"],
  },
  {
    rawTitle: "DevOps",
    icon: <Terminal size={20} weight="duotone" />,
    skills: ["Vercel", "Railway", "GitHub Actions", "Linux"],
  },
  {
    titleKey: "skill.languages",
    icon: <Code size={20} weight="duotone" />,
    skills: ["JavaScript", "TypeScript", "Python", "SQL", "Bash"],
  },
  {
    titleKey: "skill.other",
    icon: <Globe size={20} weight="duotone" />,
    skills: ["REST API", "GraphQL", "WebSocket", "Prisma", "Firebase"],
  },
];

export function SkillGrid() {
  const { t } = useI18n();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {skillCategories.map((category, i) => {
        const title = category.titleKey ? t(category.titleKey) : category.rawTitle;
        return (
          <ScrollReveal key={category.rawTitle || category.titleKey} delay={i * 0.08}>
            <div
              className="p-1.5 rounded-[1.5rem] bg-border-subtle/50 ring-1 ring-surface-glass-border
                hover:ring-accent/20 transition-all duration-500 group"
            >
              <div
                className="p-5 rounded-[calc(1.5rem-0.375rem)] bg-background-elevated h-full
                  shadow-[inset_0_1px_1px_rgba(255,255,255,0.08)]"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="w-9 h-9 rounded-full bg-accent-muted text-accent
                      flex items-center justify-center group-hover:scale-110
                      transition-transform duration-300"
                  >
                    {category.icon}
                  </div>
                  <h3 className="font-semibold text-sm">{title}</h3>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {category.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-2.5 py-1 rounded-full text-xs font-mono
                        bg-border-subtle text-foreground-muted"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </ScrollReveal>
        );
      })}
    </div>
  );
}
