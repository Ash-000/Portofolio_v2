"use client";

import { ScrollReveal } from "@/components/scroll-reveal";
import { useI18n } from "@/lib/i18n";

interface Experience {
  role: { id: string; en: string };
  company: { id: string; en: string };
  period: { id: string; en: string };
  description: { id: string; en: string };
  type: "work" | "education";
}

const experiences: Experience[] = [
  {
    role: { id: "Fullstack Developer", en: "Fullstack Developer" },
    company: { id: "Tech Startup", en: "Tech Startup" },
    period: { id: "2024 - Sekarang", en: "2024 - Present" },
    description: {
      id: "Membangun dan maintain web application untuk platform e-commerce. Bertanggung jawab atas arsitektur frontend dan integrasi API.",
      en: "Building and maintaining web applications for an e-commerce platform. Responsible for frontend architecture and API integration.",
    },
    type: "work",
  },
  {
    role: { id: "Frontend Developer", en: "Frontend Developer" },
    company: { id: "Digital Agency", en: "Digital Agency" },
    period: { id: "2023 - 2024", en: "2023 - 2024" },
    description: {
      id: "Mengembangkan landing page dan dashboard untuk berbagai klien. Fokus pada performa dan animasi interaktif.",
      en: "Developing landing pages and dashboards for various clients. Focus on performance and interactive animations.",
    },
    type: "work",
  },
  {
    role: { id: "Freelance Developer", en: "Freelance Developer" },
    company: { id: "Self-employed", en: "Self-employed" },
    period: { id: "2022 - 2023", en: "2022 - 2023" },
    description: {
      id: "Mengerjakan berbagai proyek freelance termasuk company profile, web app, dan tool internal.",
      en: "Working on various freelance projects including company profiles, web apps, and internal tools.",
    },
    type: "work",
  },
  {
    role: { id: "S1 Informatika", en: "BS in Computer Science" },
    company: { id: "Universitas", en: "University" },
    period: { id: "2019 - 2023", en: "2019 - 2023" },
    description: {
      id: "Mempelajari dasar-dasar computer science, algoritma, dan pengembangan perangkat lunak.",
      en: "Studying computer science fundamentals, algorithms, and software development.",
    },
    type: "education",
  },
];

export function ExperienceTimeline() {
  const { locale } = useI18n();

  return (
    <div className="relative">
      {/* Vertical line */}
      <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-px" />

      <div className="space-y-10">
        {experiences.map((exp, i) => {
          const isLeft = i % 2 === 0;
          return (
            <ScrollReveal
              key={`${exp.role.id}-${exp.period.id}`}
              delay={i * 0.1}
              direction={isLeft ? "left" : "right"}
            >
              <div
                className={`relative grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8
                  ${isLeft ? "" : "md:direction-rtl"}`}
              >
                {/* Dot on line */}
                <div
                  className="absolute left-4 md:left-1/2 top-5 w-3 h-3 rounded-full
                    border-2 border-accent bg-background -translate-x-1/2 z-10"
                />

                {/* Content */}
                <div
                  className={`pl-10 md:pl-0 ${
                    isLeft
                      ? "md:pr-10 md:text-right"
                      : "md:col-start-2 md:pl-10"
                  }`}
                  style={{ direction: "ltr" }}
                >
                  <span className="text-xs font-mono text-accent">
                    {exp.period[locale]}
                  </span>
                  <h3 className="font-semibold mt-1">{exp.role[locale]}</h3>
                  <p className="text-sm text-foreground-muted">{exp.company[locale]}</p>
                  <p className="text-sm text-foreground-muted mt-2 leading-relaxed">
                    {exp.description[locale]}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          );
        })}
      </div>
    </div>
  );
}
