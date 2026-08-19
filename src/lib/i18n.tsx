"use client";

import {
  createContext,
  useContext,
  useCallback,
  useSyncExternalStore,
  ReactNode,
} from "react";

export type Locale = "id" | "en";

const dict = {
  // Nav
  "nav.home": { id: "Beranda", en: "Home" },
  "nav.projects": { id: "Proyek", en: "Projects" },
  "nav.about": { id: "Tentang", en: "About" },
  "nav.contact": { id: "Kontak", en: "Contact" },

  // Hero
  "hero.badge": { id: "Open to opportunities", en: "Open to opportunities" },
  "hero.h1.line1": { id: "Fullstack Developer", en: "Fullstack Developer" },
  "hero.h1.line2": { id: "yang membangun", en: "who builds" },
  "hero.h1.line3": { id: "produk nyata.", en: "real products." },
  "hero.description": {
    id: "Saya membangun aplikasi web modern dengan fokus pada performa, UX yang intuitif, dan kode yang bersih.",
    en: "I build modern web apps focused on performance, intuitive UX, and clean code.",
  },
  "hero.cta.projects": { id: "Lihat Proyek", en: "View Projects" },
  "hero.cta.contact": { id: "Hubungi Saya", en: "Contact Me" },

  // Featured Projects
  "featured.title": { id: "Proyek Unggulan", en: "Featured Projects" },
  "featured.subtitle": {
    id: "Beberapa proyek terbaik yang pernah saya kerjakan.",
    en: "Some of the best projects I've worked on.",
  },
  "featured.viewAll": { id: "Semua proyek", en: "All projects" },

  // Projects page
  "projects.title": { id: "Semua Proyek", en: "All Projects" },
  "projects.subtitle": {
    id: "Koleksi proyek yang pernah saya kerjakan, dari web app hingga tools.",
    en: "A collection of projects I've worked on, from web apps to tools.",
  },
  "projects.filterAll": { id: "Semua", en: "All" },
  "projects.empty": {
    id: "Belum ada proyek dengan tech stack ini.",
    en: "No projects with this tech stack yet.",
  },
  "projects.back": { id: "Kembali ke proyek", en: "Back to projects" },

  // About page
  "about.title": { id: "Tentang Saya", en: "About Me" },
  "about.bio1": {
    id: "Saya seorang fullstack developer yang passionate dalam membangun produk digital yang bermanfaat. Perjalanan saya dimulai dari keingintahuan terhadap cara kerja website, yang kemudian berkembang menjadi karir di dunia software development.",
    en: "I'm a passionate fullstack developer building useful digital products. My journey started from curiosity about how websites work, which evolved into a career in software development.",
  },
  "about.bio2": {
    id: "Saya percaya bahwa kode yang baik bukan hanya tentang fungsionalitas, tapi juga tentang maintainability, performa, dan pengalaman pengguna. Setiap proyek yang saya kerjakan selalu dimulai dari pemahaman mendalam terhadap masalah yang ingin diselesaikan.",
    en: "I believe good code isn't just about functionality — it's about maintainability, performance, and user experience. Every project I work on starts with a deep understanding of the problem to be solved.",
  },
  "about.skills": { id: "Keahlian Teknis", en: "Technical Skills" },
  "about.experience": { id: "Pengalaman", en: "Experience" },

  // Skill grid
  "skill.languages": { id: "Bahasa", en: "Languages" },
  "skill.other": { id: "Lainnya", en: "Other" },

  // Experience timeline
  "exp.period.now": { id: "Sekarang", en: "Present" },
  "exp.1.desc": {
    id: "Membangun dan maintain web application untuk platform e-commerce. Bertanggung jawab atas arsitektur frontend dan integrasi API.",
    en: "Building and maintaining web applications for an e-commerce platform. Responsible for frontend architecture and API integration.",
  },
  "exp.2.desc": {
    id: "Mengembangkan landing page dan dashboard untuk berbagai klien. Fokus pada performa dan animasi interaktif.",
    en: "Developing landing pages and dashboards for various clients. Focus on performance and interactive animations.",
  },
  "exp.3.desc": {
    id: "Mengerjakan berbagai proyek freelance termasuk company profile, web app, dan tool internal.",
    en: "Working on various freelance projects including company profiles, web apps, and internal tools.",
  },
  "exp.4.desc": {
    id: "Mempelajari dasar-dasar computer science, algoritma, dan pengembangan perangkat lunak.",
    en: "Studying computer science fundamentals, algorithms, and software development.",
  },
  "exp.4.role": { id: "S1 Informatika", en: "BS in Computer Science" },
  "exp.4.company": { id: "Universitas", en: "University" },

  // Contact page
  "contact.title": { id: "Mari Bicara", en: "Let's Talk" },
  "contact.subtitle": {
    id: "Punya ide proyek atau pertanyaan? Kirim pesan dan saya akan merespons secepatnya.",
    en: "Have a project idea or question? Send a message and I'll respond as soon as possible.",
  },
  "contact.findMe": { id: "Temukan saya di", en: "Find me on" },

  // Contact form
  "form.name": { id: "Nama", en: "Name" },
  "form.namePlaceholder": { id: "Nama lengkap", en: "Full name" },
  "form.email": { id: "Email", en: "Email" },
  "form.message": { id: "Pesan", en: "Message" },
  "form.messagePlaceholder": {
    id: "Tulis pesan Anda di sini...",
    en: "Write your message here...",
  },
  "form.submit": { id: "Kirim Pesan", en: "Send Message" },
  "form.submitting": { id: "Mengirim...", en: "Sending..." },
  "form.success": {
    id: "Pesan berhasil dikirim. Terima kasih!",
    en: "Message sent successfully. Thank you!",
  },
  "form.error": {
    id: "Gagal mengirim pesan. Silakan coba lagi.",
    en: "Failed to send message. Please try again.",
  },
} as const;

export type TranslationKey = keyof typeof dict;

const STORAGE_KEY = "locale";
const LOCALE_CHANGE_EVENT = "locale-change";

function getLocaleSnapshot(): Locale {
  if (typeof window === "undefined") return "id";
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored === "en" || stored === "id" ? stored : "id";
}

function getLocaleServerSnapshot(): Locale {
  return "id";
}

function subscribeLocale(callback: () => void) {
  window.addEventListener(LOCALE_CHANGE_EVENT, callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(LOCALE_CHANGE_EVENT, callback);
    window.removeEventListener("storage", callback);
  };
}

interface I18nContextValue {
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: (key: TranslationKey) => string;
}

const I18nContext = createContext<I18nContextValue | undefined>(undefined);

export function I18nProvider({ children }: { children: ReactNode }) {
  const locale = useSyncExternalStore(
    subscribeLocale,
    getLocaleSnapshot,
    getLocaleServerSnapshot
  );

  const setLocale = useCallback((l: Locale) => {
    localStorage.setItem(STORAGE_KEY, l);
    document.documentElement.lang = l;
    window.dispatchEvent(new Event(LOCALE_CHANGE_EVENT));
  }, []);

  const t = useCallback(
    (key: TranslationKey) => dict[key]?.[locale] ?? key,
    [locale]
  );

  return (
    <I18nContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}
