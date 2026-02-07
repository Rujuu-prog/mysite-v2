import type { Work } from "@/types";

export const works: Work[] = [
  {
    id: "work-1",
    title: "Portfolio Site",
    description:
      "ミニマルなポートフォリオサイト。Next.js + Tailwind CSS で構築。",
    thumbnail: "/example.PNG",
    tags: ["Next.js", "TypeScript", "Tailwind CSS"],
    link: "https://example.com",
    github: "https://github.com",
    detail:
      "スクロール連動アニメーションとレスポンシブ対応を重視したポートフォリオサイト。アトミックデザインで構築し、保守性を高めています。",
  },
  {
    id: "work-2",
    title: "Task Management App",
    description: "チーム向けタスク管理アプリ。リアルタイム同期対応。",
    thumbnail: "/example.PNG",
    tags: ["React", "Firebase", "Material UI"],
    link: "https://example.com",
    detail:
      "Firestore のリアルタイムリスナーを活用し、チームメンバー間でのタスク状況をリアルタイムに共有できるアプリケーションです。",
  },
  {
    id: "work-3",
    title: "EC Site Renewal",
    description: "既存ECサイトのフルリニューアル。パフォーマンス改善を実施。",
    thumbnail: "/example.PNG",
    tags: ["Next.js", "Stripe", "PostgreSQL"],
    detail:
      "レガシーなECサイトをNext.jsベースでフルリニューアル。Lighthouse スコアを大幅に改善しました。",
  },
  {
    id: "work-4",
    title: "Weather Dashboard",
    description: "天気情報をビジュアルに表示するダッシュボード。",
    thumbnail: "/example.PNG",
    tags: ["Vue.js", "D3.js", "OpenWeather API"],
    link: "https://example.com",
    detail:
      "OpenWeather API を活用し、週間天気予報をグラフやチャートで視覚的に表示するダッシュボードアプリです。",
  },
  {
    id: "work-5",
    title: "Blog Platform",
    description: "マークダウン対応のブログプラットフォーム。",
    thumbnail: "/example.PNG",
    tags: ["Next.js", "MDX", "Vercel"],
    github: "https://github.com",
    detail:
      "MDX を活用したブログプラットフォーム。記事の執筆体験とパフォーマンスの両立を重視しています。",
  },
];
