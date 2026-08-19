"use client";

import { motion, useReducedMotion } from "motion/react";
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
  const reduce = useReducedMotion();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {skillCategories.map((category, i) => {
        const title = category.titleKey ? t(category.titleKey) : category.rawTitle;
        return (
          <ScrollReveal key={category.rawTitle || category.titleKey} delay={i * 0.06}>
            <motion.div
              whileHover={reduce ? {} : { y: -3 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="p-1.5 rounded-[1.75rem] bg-border-subtle/50 ring-1 ring-surface-glass-border
                hover:ring-accent/30 hover:shadow-[0_8px_24px_var(--shadow-color)] transition-all duration-300 group h-full"
            >
              <div
                className="p-6 rounded-[calc(1.75rem-0.375rem)] bg-background-elevated h-full
                  shadow-[inset_0_1px_1px_rgba(255,255,255,0.08)] flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-3.5 mb-5">
                    <div
                      className="w-10 h-10 rounded-2xl bg-accent-muted text-accent
                        flex items-center justify-center group-hover:scale-110 group-hover:bg-accent group-hover:text-white
                        transition-all duration-300"
                    >
                      {category.icon}
                    </div>
                    <h3 className="font-bold text-base text-foreground group-hover:text-accent transition-colors">{title}</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1 rounded-full text-xs font-mono font-medium
                          bg-border-subtle text-foreground-muted hover:text-accent hover:bg-accent-muted transition-colors cursor-default"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </ScrollReveal>
        );
      })}
    </div>
  );
}
