import type { SkillCategory } from "@/types";

export const skillCategories: SkillCategory[] = [
  {
    id: "frontend",
    category: "Frontend",
    skills: [
      { name: "Next.js", icon: "devicon-nextjs-plain" },
      { name: "React", icon: "devicon-react-original" },
      { name: "TypeScript", icon: "devicon-typescript-plain" },
      { name: "Vue.js", icon: "devicon-vuejs-plain" },
      { name: "HTML/CSS", icon: "devicon-html5-plain" },
      { name: "SCSS", icon: "devicon-sass-original" },
      { name: "jQuery", icon: "devicon-jquery-plain" },
    ],
  },
  {
    id: "backend",
    category: "Backend",
    skills: [
      { name: "Django", icon: "devicon-django-plain" },
      { name: "FastAPI", icon: "devicon-fastapi-plain" },
      { name: "Laravel", icon: "devicon-laravel-original" },
      { name: "CakePHP", icon: "devicon-cakephp-plain" },
      { name: "Spring Boot", icon: "devicon-spring-original" },
    ],
  },
  {
    id: "tools",
    category: "Tools",
    skills: [
      { name: "Git/GitHub", icon: "devicon-github-original" },
      { name: "Docker", icon: "devicon-docker-plain" },
      { name: "Kubernetes", icon: "devicon-kubernetes-plain" },
      { name: "IntelliJ IDEA", icon: "devicon-intellij-plain" },
      { name: "VS Code", icon: "devicon-vscode-plain" },
      { name: "WordPress", icon: "devicon-wordpress-plain" },
      { name: "Jira", icon: "devicon-jira-plain" },
      { name: "MySQL", icon: "devicon-mysql-plain" },
      { name: "PostgreSQL", icon: "devicon-postgresql-plain" },
      { name: "AWS", icon: "devicon-amazonwebservices-plain-wordmark" },
      { name: "Vercel", icon: "devicon-vercel-original" },
    ],
  },
  {
    id: "others",
    category: "Others",
    skills: [{ name: "CI/CD" }, { name: "Agile/Scrum" }],
  },
];
