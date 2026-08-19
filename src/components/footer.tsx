"use client";

import Link from "next/link";
import { useState } from "react";
import { GithubLogo, LinkedinLogo, EnvelopeSimple, Check } from "@phosphor-icons/react";
import { useI18n } from "@/lib/i18n";

export function Footer() {
  const [copied, setCopied] = useState(false);
  const { locale } = useI18n();

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("hello@example.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <footer className="border-t border-border py-12 bg-background-elevated/40">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="font-mono text-sm font-semibold text-accent hover:text-accent-hover transition-colors"
            >
              {"<dev />"}
            </Link>
            <span className="text-sm text-foreground-muted">
              &copy; {new Date().getFullYear()} • {locale === "id" ? "Dibuat dengan kode bersih & performa tinggi" : "Built with clean code & high performance"}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-border-subtle flex items-center justify-center
                hover:bg-accent-muted hover:text-accent transition-colors text-foreground-muted
                focus:outline-none focus:ring-2 focus:ring-accent"
              aria-label="GitHub Profile"
            >
              <GithubLogo size={18} weight="bold" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-border-subtle flex items-center justify-center
                hover:bg-accent-muted hover:text-accent transition-colors text-foreground-muted
                focus:outline-none focus:ring-2 focus:ring-accent"
              aria-label="LinkedIn Profile"
            >
              <LinkedinLogo size={18} weight="bold" />
            </a>
            <button
              onClick={handleCopyEmail}
              className="relative px-3.5 h-10 rounded-full bg-border-subtle flex items-center gap-2
                hover:bg-accent-muted hover:text-accent transition-all text-foreground-muted text-xs font-mono
                focus:outline-none focus:ring-2 focus:ring-accent cursor-pointer"
              aria-label="Copy Email Address"
              title="Click to copy email"
            >
              {copied ? (
                <>
                  <Check size={16} weight="bold" className="text-accent" />
                  <span className="text-accent font-semibold">{locale === "id" ? "Email Tersalin!" : "Copied!"}</span>
                </>
              ) : (
                <>
                  <EnvelopeSimple size={16} weight="bold" />
                  <span>hello@example.com</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
