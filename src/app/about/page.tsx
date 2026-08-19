"use client";

import { SkillGrid } from "@/components/skill-grid";
import { ExperienceTimeline } from "@/components/experience-timeline";
import { ScrollReveal } from "@/components/scroll-reveal";
import { useI18n } from "@/lib/i18n";

export default function AboutPage() {
  const { t } = useI18n();

  return (
    <div className="pt-28 pb-24">
      <div className="max-w-[1200px] mx-auto px-6">
        {/* Cerita Singkat */}
        <section className="mb-24">
          <ScrollReveal>
            <div className="max-w-[700px]">
              <h1 className="text-4xl md:text-5xl font-bold tracking-tighter">
                {t("about.title")}
              </h1>
              <div className="mt-6 space-y-4 text-foreground-muted text-lg leading-relaxed">
                <p>{t("about.bio1")}</p>
                <p>{t("about.bio2")}</p>
              </div>
            </div>
          </ScrollReveal>
        </section>

        {/* Keahlian Teknis */}
        <section className="mb-24">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-10">
              {t("about.skills")}
            </h2>
          </ScrollReveal>
          <SkillGrid />
        </section>

        {/* Pengalaman */}
        <section>
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-10">
              {t("about.experience")}
            </h2>
          </ScrollReveal>
          <ExperienceTimeline />
        </section>
      </div>
    </div>
  );
}
