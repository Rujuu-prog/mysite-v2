import type { Experience } from "@/types";

export const experiences: Experience[] = [
  {
    id: "exp-1",
    period: "2023.09 - Present",
    title: "Backend Engineer",
    company: "Tech Company A",
    description:
      "Webアプリケーションのバックエンド開発を主軸に、設計から実装・運用までを担当。LaravelやSpring Bootを用いたAPI開発に加え、Vue.js / Angularによるフロントエンド実装、AWS・Kubernetes環境でのデプロイや運用にも関与し、開発からリリース後までを見据えた実装を行っています。",
    tags: ["Laravel", "Spring Boot", "Vue.js", "Angular", "TypeScript", "AWS", "Kubernetes"],
  },
  {
    id: "exp-2",
    period: "2023.07 - 2023.08",
    title: "Career Break (Job Search & Skill Development)",
    company: "-",
    description:
      "転職活動と並行して、SPAの作成やnpmライブラリの開発などを行い、FrontendからBackendまで幅広くスキルアップを図りました。",
    tags: ["Next.js", "TypeScript", "FastAPI", "Django", "Spring Boot"],
  },
  {
    id: "exp-3",
    period: "2021.04 - 2023.06",
    title: "Full Stack Developer",
    company: "EC Company A",
    description:
      "ECサイト運営会社の開発部で、外部からの受託案件と自社システムの開発を担当。部署の人数が少ない環境で、FrontendからBackend、インフラまで幅広く経験し、少人数体制でも開発を回す経験を積みました。",
    tags: ["Django", "CakePHP", "React", "Docker", "MySQL", "GitHub Actions"],
  },
];
