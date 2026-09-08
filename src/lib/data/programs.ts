export interface Program {
  slug: string;
  icon: string;
  titleKey: string;
  sessions: number;
  duration: string;
}

export const programs: Program[] = [
  {
    slug: "digital-starter",
    icon: "💻",
    titleKey: "digital_starter",
    sessions: 8,
    duration: "90 min/session",
  },
  {
    slug: "coding-starter",
    icon: "🐍",
    titleKey: "coding_starter",
    sessions: 10,
    duration: "90 min/session",
  },
  {
    slug: "web-developer",
    icon: "🌐",
    titleKey: "web_developer",
    sessions: 12,
    duration: "90 min/session",
  },
  {
    slug: "ai-starter",
    icon: "🤖",
    titleKey: "ai_starter",
    sessions: 6,
    duration: "90 min/session",
  },
  {
    slug: "ai-developer",
    icon: "🧠",
    titleKey: "ai_developer",
    sessions: 12,
    duration: "90 min/session",
  },
];
