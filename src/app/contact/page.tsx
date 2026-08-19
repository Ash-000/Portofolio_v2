"use client";

import { ContactForm } from "@/components/contact-form";
import { ScrollReveal } from "@/components/scroll-reveal";
import { useI18n } from "@/lib/i18n";
import {
  GithubLogo,
  LinkedinLogo,
  EnvelopeSimple,
  MapPin,
} from "@phosphor-icons/react";

const socials = [
  {
    label: "GitHub",
    href: "https://github.com",
    icon: <GithubLogo size={20} weight="bold" />,
    username: "@username",
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com",
    icon: <LinkedinLogo size={20} weight="bold" />,
    username: "in/username",
  },
  {
    label: "Email",
    href: "mailto:hello@example.com",
    icon: <EnvelopeSimple size={20} weight="bold" />,
    username: "hello@example.com",
  },
];

export default function ContactPage() {
  const { t } = useI18n();

  return (
    <div className="pt-28 pb-24">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16">
          {/* Left: Form */}
          <div className="md:col-span-7">
            <ScrollReveal>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tighter">
                {t("contact.title")}
              </h1>
              <p className="text-foreground-muted mt-3 text-lg max-w-[45ch]">
                {t("contact.subtitle")}
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <div className="mt-8">
                <ContactForm />
              </div>
            </ScrollReveal>
          </div>

          {/* Right: Contact info */}
          <div className="md:col-span-5">
            <ScrollReveal delay={0.2}>
              <div className="p-1.5 rounded-[1.5rem] bg-border-subtle/50 ring-1 ring-surface-glass-border">
                <div className="p-6 rounded-[calc(1.5rem-0.375rem)] bg-background-elevated
                  shadow-[inset_0_1px_1px_rgba(255,255,255,0.08)]">
                  <h2 className="font-semibold mb-6">{t("contact.findMe")}</h2>

                  <div className="space-y-4">
                    {socials.map((social) => (
                      <a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-4 p-3 -mx-3 rounded-xl
                          hover:bg-accent-muted transition-colors group"
                      >
                        <div className="w-10 h-10 rounded-full bg-border-subtle
                          flex items-center justify-center text-foreground-muted
                          group-hover:bg-accent-muted group-hover:text-accent
                          transition-colors">
                          {social.icon}
                        </div>
                        <div>
                          <p className="text-sm font-medium group-hover:text-accent transition-colors">
                            {social.label}
                          </p>
                          <p className="text-xs text-foreground-muted font-mono">
                            {social.username}
                          </p>
                        </div>
                      </a>
                    ))}
                  </div>

                  <div className="mt-6 pt-6 border-t border-border">
                    <div className="flex items-center gap-3 text-sm text-foreground-muted">
                      <MapPin size={16} weight="bold" />
                      <span>Indonesia</span>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </div>
  );
}
