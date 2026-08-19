"use client";

import { useI18n } from "@/lib/i18n";
import { motion } from "motion/react";

export function LangToggle() {
  const { locale, setLocale } = useI18n();

  return (
    <button
      onClick={() => setLocale(locale === "id" ? "en" : "id")}
      className="relative w-9 h-9 rounded-full flex items-center justify-center
        bg-border-subtle hover:bg-border transition-colors duration-200
        cursor-pointer"
      aria-label={locale === "id" ? "Switch to English" : "Ganti ke Bahasa Indonesia"}
    >
      <motion.span
        key={locale}
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -6 }}
        className="text-[11px] font-mono font-bold text-foreground select-none"
      >
        {locale === "id" ? "EN" : "ID"}
      </motion.span>
    </button>
  );
}
