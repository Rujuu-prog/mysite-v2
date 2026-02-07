import type { SkillCategory } from "@/types";

export const skillCategories: SkillCategory[] = [
  {
    id: "frontend",
    category: "Frontend",
    skills: [
      { name: "React" },
      { name: "Next.js" },
      { name: "TypeScript" },
      { name: "Tailwind CSS" },
      { name: "Vue.js" },
      { name: "HTML / CSS" },
    ],
  },
  {
    id: "backend",
    category: "Backend",
    skills: [
      { name: "Node.js" },
      { name: "Express" },
      { name: "Python" },
      { name: "PostgreSQL" },
      { name: "Firebase" },
    ],
  },
  {
    id: "tools",
    category: "Tools",
    skills: [
      { name: "Git" },
      { name: "Docker" },
      { name: "Figma" },
      { name: "VS Code" },
      { name: "Vercel" },
    ],
  },
  {
    id: "others",
    category: "Others",
    skills: [
      { name: "Agile / Scrum" },
      { name: "CI/CD" },
      { name: "Accessibility" },
      { name: "Performance Optimization" },
    ],
  },
];
