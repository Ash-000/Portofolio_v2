export interface Project {
  slug: string;
  title: string;
  description: { id: string; en: string };
  longDescription: { id: string; en: string };
  tech: string[];
  thumbnail: string;
  images: string[];
  demoUrl?: string;
  repoUrl?: string;
  featured: boolean;
  year: string;
  role: { id: string; en: string };
}

export const projects: Project[] = [
  {
    slug: "ecommerce-platform",
    title: "E-Commerce Platform",
    description: {
      id: "Full-stack marketplace dengan payment gateway, real-time inventory, dan admin dashboard.",
      en: "Full-stack marketplace with payment gateway, real-time inventory, and admin dashboard.",
    },
    longDescription: {
      id: "Platform e-commerce lengkap yang dibangun dengan Next.js dan Node.js. Fitur utama meliputi integrasi payment gateway (Midtrans), manajemen inventory real-time, dashboard admin dengan analytics, dan sistem notifikasi.",
      en: "Complete e-commerce platform built with Next.js and Node.js. Key features include payment gateway integration (Midtrans), real-time inventory management, admin dashboard with analytics, and notification system.",
    },
    tech: ["Next.js", "TypeScript", "Node.js", "PostgreSQL", "Prisma", "Tailwind CSS"],
    thumbnail: "https://picsum.photos/seed/ecommerce-dash/800/600",
    images: [
      "https://picsum.photos/seed/ecommerce-1/1200/800",
      "https://picsum.photos/seed/ecommerce-2/1200/800",
    ],
    demoUrl: "https://example.com",
    repoUrl: "https://github.com",
    featured: true,
    year: "2025",
    role: { id: "Fullstack Developer", en: "Fullstack Developer" },
  },
  {
    slug: "task-management-app",
    title: "Task Management App",
    description: {
      id: "Aplikasi manajemen tugas kolaboratif dengan drag-and-drop kanban board dan real-time sync.",
      en: "Collaborative task management app with drag-and-drop kanban board and real-time sync.",
    },
    longDescription: {
      id: "Aplikasi produktivitas tim dengan fitur kanban board, drag-and-drop reordering, real-time collaboration via WebSocket, dan sistem notifikasi. Dibangun dengan fokus pada performa dan UX yang intuitif.",
      en: "Team productivity app with kanban board, drag-and-drop reordering, real-time collaboration via WebSocket, and notification system. Built with a focus on performance and intuitive UX.",
    },
    tech: ["React", "TypeScript", "Firebase", "Tailwind CSS"],
    thumbnail: "https://picsum.photos/seed/taskapp-board/800/600",
    images: [
      "https://picsum.photos/seed/taskapp-1/1200/800",
      "https://picsum.photos/seed/taskapp-2/1200/800",
    ],
    demoUrl: "https://example.com",
    repoUrl: "https://github.com",
    featured: true,
    year: "2025",
    role: { id: "Frontend Developer", en: "Frontend Developer" },
  },
  {
    slug: "ai-content-generator",
    title: "AI Content Generator",
    description: {
      id: "Tool berbasis AI untuk generate dan edit konten marketing dengan template system.",
      en: "AI-based tool for generating and editing marketing content with a template system.",
    },
    longDescription: {
      id: "Content generation tool yang menggunakan OpenAI API untuk membuat copy marketing, blog posts, dan social media content. Dilengkapi dengan template system, history tracking, dan export ke berbagai format.",
      en: "Content generation tool using OpenAI API to create marketing copy, blog posts, and social media content. Features template system, history tracking, and export to various formats.",
    },
    tech: ["Next.js", "Python", "FastAPI", "OpenAI", "PostgreSQL"],
    thumbnail: "https://picsum.photos/seed/ai-content/800/600",
    images: [
      "https://picsum.photos/seed/aicontent-1/1200/800",
      "https://picsum.photos/seed/aicontent-2/1200/800",
    ],
    demoUrl: "https://example.com",
    repoUrl: "https://github.com",
    featured: true,
    year: "2024",
    role: { id: "Fullstack Developer", en: "Fullstack Developer" },
  },
  {
    slug: "fitness-tracker",
    title: "Fitness Tracker",
    description: {
      id: "Mobile-first fitness tracking app dengan visualisasi progress dan workout planning.",
      en: "Mobile-first fitness tracking app with progress visualization and workout planning.",
    },
    longDescription: {
      id: "Aplikasi fitness tracker yang memungkinkan pengguna melacak workout, nutrisi, dan progress fisik. Fitur chart interaktif untuk visualisasi data, workout planner, dan reminder system.",
      en: "Fitness tracker app enabling users to track workouts, nutrition, and physical progress. Features interactive charts for data visualization, workout planner, and reminder system.",
    },
    tech: ["React", "Node.js", "MongoDB", "Chart.js"],
    thumbnail: "https://picsum.photos/seed/fitness-app/800/600",
    images: [
      "https://picsum.photos/seed/fitness-1/1200/800",
      "https://picsum.photos/seed/fitness-2/1200/800",
    ],
    repoUrl: "https://github.com",
    featured: false,
    year: "2024",
    role: { id: "Frontend Developer", en: "Frontend Developer" },
  },
  {
    slug: "portfolio-website",
    title: "Portfolio Website",
    description: {
      id: "Website portfolio programmer dengan animasi halus dan desain premium.",
      en: "Developer portfolio website with smooth animations and premium design.",
    },
    longDescription: {
      id: "Website portfolio pribadi yang dibangun dengan Next.js 15, Tailwind CSS v4, dan Motion untuk animasi. Menampilkan proyek-proyek unggulan, keahlian teknis, dan formulir kontak.",
      en: "Personal portfolio website built with Next.js 15, Tailwind CSS v4, and Motion for animations. Showcasing featured projects, technical skills, and a contact form.",
    },
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "Motion", "GSAP"],
    thumbnail: "https://picsum.photos/seed/portfolio-dev/800/600",
    images: [
      "https://picsum.photos/seed/portfolio-1/1200/800",
    ],
    repoUrl: "https://github.com",
    featured: false,
    year: "2024",
    role: { id: "Fullstack Developer", en: "Fullstack Developer" },
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getFeaturedProjects(): Project[] {
  return projects.filter((p) => p.featured);
}

export function getAllTechStacks(): string[] {
  const techs = new Set<string>();
  projects.forEach((p) => p.tech.forEach((t) => techs.add(t)));
  return Array.from(techs).sort();
}
