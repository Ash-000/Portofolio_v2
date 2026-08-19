"use client";

import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";
import { motion } from "motion/react";
import { Sun, Moon } from "@phosphor-icons/react";

function subscribe() {
  return () => {};
}

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const mounted = useSyncExternalStore(
    subscribe,
    () => true,
    () => false
  );

  if (!mounted) {
    return <div className="w-9 h-9" />;
  }

  const isDark = theme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="relative w-9 h-9 rounded-full flex items-center justify-center
        bg-border-subtle hover:bg-border transition-colors duration-200
        cursor-pointer"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      <motion.div
        initial={false}
        animate={{ rotate: isDark ? 180 : 0, scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
      >
        {isDark ? (
          <Moon size={18} weight="bold" className="text-foreground" />
        ) : (
          <Sun size={18} weight="bold" className="text-foreground" />
        )}
      </motion.div>
    </button>
  );
}
