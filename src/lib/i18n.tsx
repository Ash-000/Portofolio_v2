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
  "hero.badge": { id: "Tersedia untuk peluang baru", en: "Available for new opportunities" },
  "hero.h1.line1": { id: "Fullstack Developer", en: "Fullstack Developer" },
  "hero.h1.line2": { id: "yang membangun", en: "crafting modern" },
  "hero.h1.line3": { id: "produk nyata.", en: "real-world products." },
  "hero.description": {
    id: "Saya membangun aplikasi web modern dengan fokus pada performa tinggi, UX yang intuitif, dan arsitektur kode yang bersih.",
    en: "I build modern web applications with a focus on high performance, intuitive UX, and clean software architecture.",
  },
  "hero.cta.projects": { id: "Lihat Portofolio", en: "View Portfolio" },
  "hero.cta.contact": { id: "Mari Diskusi", en: "Let's Talk" },

  // Featured Projects
  "featured.title": { id: "Proyek Unggulan", en: "Featured Projects" },
  "featured.subtitle": {
    id: "Koleksi proyek pilihan dengan implementasi teknologi terkini dan solusi nyata.",
    en: "Curated selection of projects built with modern technologies and real solutions.",
  },
  "featured.viewAll": { id: "Lihat Semua Proyek", en: "View All Projects" },

  // Home Skills
  "home.skills.title": { id: "Keahlian & Ekosistem", en: "Skills & Tech Ecosystem" },
  "home.skills.subtitle": {
    id: "Teknologi dan tools modern yang saya gunakan untuk mewujudkan produk digital berkualitas.",
    en: "Modern technologies and tools I leverage to deliver high-quality digital products.",
  },
  "home.skills.more": { id: "Pelajari Lebih Lanjut Tentang Saya", en: "Learn More About Me" },

  // Home CTA
  "home.cta.title": { id: "Punya Proyek Menarik?", en: "Have a Project in Mind?" },
  "home.cta.subtitle": {
    id: "Mari diskusikan ide Anda dan wujudkan aplikasi web yang cepat, indah, dan siap skala.",
    en: "Let's discuss your ideas and build web applications that are fast, beautiful, and scalable.",
  },
  "home.cta.btn": { id: "Mulai Percakapan", en: "Start a Conversation" },
  "home.cta.secondary": { id: "Lihat Resume / Tentang", en: "View Resume / About" },

  // Projects page
  "projects.title": { id: "Semua Proyek", en: "All Projects" },
  "projects.subtitle": {
    id: "Koleksi karya dari platform e-commerce, web app SaaS, hingga tool otomasi.",
    en: "A showcase of works ranging from e-commerce platforms, SaaS apps, to automation tools.",
  },
  "projects.filterAll": { id: "Semua", en: "All" },
  "projects.empty": {
    id: "Tidak ada proyek yang sesuai dengan kriteria pencarian.",
    en: "No projects match the selected search criteria.",
  },
  "projects.back": { id: "Kembali ke Proyek", en: "Back to Projects" },

  // About page
  "about.title": { id: "Tentang Saya", en: "About Me" },
  "about.bio1": {
    id: "Saya seorang fullstack developer yang passionate dalam membangun produk digital yang bermanfaat. Perjalanan saya dimulai dari keingintahuan mendalam terhadap rekayasa perangkat lunak dan arsitektur web modern.",
    en: "I'm a passionate fullstack developer dedicated to building meaningful digital products. My journey began with a deep curiosity for software engineering and modern web architecture.",
  },
  "about.bio2": {
    id: "Saya percaya bahwa kode yang baik bukan hanya tentang fungsionalitas, tapi juga tentang kemudahan pemeliharaan, kecepatan performa, dan kenyamanan pengguna saat berinteraksi.",
    en: "I believe good code is not only about functionality, but also about maintainability, peak performance, and delightful user experience.",
  },
  "about.skills": { id: "Keahlian Teknis", en: "Technical Skills" },
  "about.experience": { id: "Pengalaman & Edukasi", en: "Experience & Education" },

  // Skill grid
  "skill.languages": { id: "Bahasa Pemrograman", en: "Programming Languages" },
  "skill.other": { id: "Protokol & Arsitektur", en: "Protocols & Architecture" },

  // Experience timeline
  "exp.period.now": { id: "Sekarang", en: "Present" },
  "exp.1.desc": {
    id: "Membangun dan maintain web application untuk platform e-commerce. Bertanggung jawab atas arsitektur frontend dan integrasi payment gateway.",
    en: "Building and maintaining web applications for an e-commerce platform. Responsible for frontend architecture and payment gateway integration.",
  },
  "exp.2.desc": {
    id: "Mengembangkan landing page dan dashboard analitik untuk berbagai klien. Fokus pada performa tinggi dan animasi interaktif.",
    en: "Developing landing pages and analytics dashboards for diverse clients. Focused on high performance and interactive motion.",
  },
  "exp.3.desc": {
    id: "Mengerjakan berbagai proyek freelance termasuk company profile, web app SaaS, dan tool internal tim.",
    en: "Delivered various freelance projects including company profiles, SaaS web apps, and internal team tools.",
  },
  "exp.4.desc": {
    id: "Mempelajari dasar-dasar ilmu komputer, struktur data, algoritma, dan rekayasa perangkat lunak.",
    en: "Studied computer science fundamentals, data structures, algorithms, and software engineering.",
  },
  "exp.4.role": { id: "S1 Informatika", en: "BS in Computer Science" },
  "exp.4.company": { id: "Universitas", en: "University" },

  // Contact page
  "contact.title": { id: "Mari Terhubung", en: "Let's Connect" },
  "contact.subtitle": {
    id: "Punya ide proyek, tawaran kolaborasi, atau pertanyaan? Kirim pesan dan saya akan merespons secepatnya.",
    en: "Have a project idea, collaboration offer, or question? Send a message and I'll get back to you promptly.",
  },
  "contact.findMe": { id: "Temukan Saya di", en: "Find Me On" },

  // Contact form
  "form.name": { id: "Nama Lengkap", en: "Full Name" },
  "form.namePlaceholder": { id: "cth. Alex Pratama", en: "e.g. Alex Pratama" },
  "form.email": { id: "Alamat Email", en: "Email Address" },
  "form.message": { id: "Pesan", en: "Message" },
  "form.messagePlaceholder": {
    id: "Ceritakan tentang proyek atau ide Anda di sini...",
    en: "Tell me about your project or idea here...",
  },
  "form.submit": { id: "Kirim Pesan", en: "Send Message" },
  "form.submitting": { id: "Sedang Mengirim...", en: "Sending Message..." },
  "form.success": {
    id: "Pesan berhasil dikirim! Saya akan segera menghubungi Anda.",
    en: "Message sent successfully! I will get back to you soon.",
  },
  "form.error": {
    id: "Gagal mengirim pesan. Silakan coba lagi atau kirim via email.",
    en: "Failed to send message. Please try again or reach out via email.",
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
