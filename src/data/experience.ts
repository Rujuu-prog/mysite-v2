import type { Experience } from "@/types";

export const experiences: Experience[] = [
  {
    id: "exp-1",
    period: "2023.04 - Present",
    title: "Frontend Engineer",
    company: "Tech Company A",
    description:
      "自社プロダクトのフロントエンド開発を担当。React / Next.js を用いたSPA開発、デザインシステムの構築、パフォーマンス最適化に取り組んでいます。",
    tags: ["React", "Next.js", "TypeScript", "Figma"],
  },
  {
    id: "exp-2",
    period: "2021.04 - 2023.03",
    title: "Web Developer",
    company: "Web Agency B",
    description:
      "受託開発チームのメンバーとして、コーポレートサイトやECサイトの構築を担当。要件定義から実装、テストまで一貫して関わりました。",
    tags: ["Vue.js", "Nuxt.js", "SCSS", "WordPress"],
  },
  {
    id: "exp-3",
    period: "2019.04 - 2021.03",
    title: "Junior Developer",
    company: "Startup C",
    description:
      "スタートアップの開発チームで、Webアプリケーションの開発に参加。フロントエンドからバックエンドまで幅広く経験しました。",
    tags: ["JavaScript", "Node.js", "Express", "MySQL"],
  },
];
