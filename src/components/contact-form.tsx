"use client";

import { useState, FormEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { PaperPlaneTilt, Check, Warning } from "@phosphor-icons/react";
import { useI18n } from "@/lib/i18n";

type FormStatus = "idle" | "submitting" | "success" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const { t } = useI18n();

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");

    const form = e.currentTarget;
    const data = new FormData(form);

    // ponytail: client-side only, logs to console. Upgrade path: POST to /api/contact with Resend/SendGrid
    console.log("Form submitted:", {
      name: data.get("name"),
      email: data.get("email"),
      message: data.get("message"),
    });

    // Simulate network delay
    await new Promise((r) => setTimeout(r, 1000));
    setStatus("success");
    form.reset();
    setTimeout(() => setStatus("idle"), 4000);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="space-y-1.5">
        <label
          htmlFor="contact-name"
          className="block text-sm font-medium text-foreground"
        >
          {t("form.name")}
        </label>
        <input
          id="contact-name"
          name="name"
          type="text"
          required
          placeholder={t("form.namePlaceholder")}
          className="w-full px-4 py-3 rounded-2xl bg-background-elevated border border-border
            text-foreground placeholder:text-foreground-muted/50
            focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent
            transition-all duration-200 text-sm"
        />
      </div>

      <div className="space-y-1.5">
        <label
          htmlFor="contact-email"
          className="block text-sm font-medium text-foreground"
        >
          {t("form.email")}
        </label>
        <input
          id="contact-email"
          name="email"
          type="email"
          required
          placeholder="email@example.com"
          className="w-full px-4 py-3 rounded-2xl bg-background-elevated border border-border
            text-foreground placeholder:text-foreground-muted/50
            focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent
            transition-all duration-200 text-sm"
        />
      </div>

      <div className="space-y-1.5">
        <label
          htmlFor="contact-message"
          className="block text-sm font-medium text-foreground"
        >
          {t("form.message")}
        </label>
        <textarea
          id="contact-message"
          name="message"
          required
          rows={5}
          placeholder={t("form.messagePlaceholder")}
          className="w-full px-4 py-3 rounded-2xl bg-background-elevated border border-border
            text-foreground placeholder:text-foreground-muted/50
            focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent
            transition-all duration-200 text-sm resize-none"
        />
      </div>

      <button
        type="submit"
        disabled={status === "submitting"}
        className="inline-flex items-center gap-2 px-6 py-3 rounded-full
          bg-accent text-white font-medium text-sm
          hover:bg-accent-hover active:scale-[0.98]
          disabled:opacity-60 disabled:cursor-not-allowed
          transition-all duration-200 cursor-pointer"
      >
        {status === "submitting" ? (
          <>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
              className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
            />
            {t("form.submitting")}
          </>
        ) : (
          <>
            <PaperPlaneTilt size={16} weight="bold" />
            {t("form.submit")}
          </>
        )}
      </button>

      {/* Status feedback */}
      <AnimatePresence>
        {status === "success" && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="flex items-center gap-2 text-sm text-accent"
          >
            <Check size={16} weight="bold" />
            {t("form.success")}
          </motion.div>
        )}
        {status === "error" && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="flex items-center gap-2 text-sm text-red-500"
          >
            <Warning size={16} weight="bold" />
            {t("form.error")}
          </motion.div>
        )}
      </AnimatePresence>
    </form>
  );
}
