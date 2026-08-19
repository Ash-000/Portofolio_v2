import Link from "next/link";
import { GithubLogo, LinkedinLogo, EnvelopeSimple } from "@phosphor-icons/react/dist/ssr";

export function Footer() {
  return (
    <footer className="border-t border-border py-12">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="font-mono text-sm font-semibold text-accent"
            >
              {"<dev />"}
            </Link>
            <span className="text-sm text-foreground-muted">
              &copy; {new Date().getFullYear()}
            </span>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full bg-border-subtle flex items-center justify-center
                hover:bg-accent-muted hover:text-accent transition-colors text-foreground-muted"
              aria-label="GitHub"
            >
              <GithubLogo size={18} weight="bold" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full bg-border-subtle flex items-center justify-center
                hover:bg-accent-muted hover:text-accent transition-colors text-foreground-muted"
              aria-label="LinkedIn"
            >
              <LinkedinLogo size={18} weight="bold" />
            </a>
            <a
              href="mailto:hello@example.com"
              className="w-9 h-9 rounded-full bg-border-subtle flex items-center justify-center
                hover:bg-accent-muted hover:text-accent transition-colors text-foreground-muted"
              aria-label="Email"
            >
              <EnvelopeSimple size={18} weight="bold" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
