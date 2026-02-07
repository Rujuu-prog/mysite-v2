import type { Work } from "@/types";

export const works: Work[] = [
  {
    id: "work-1",
    title: "Portfolio Site",
    description:
      "ミニマルなポートフォリオサイト。Next.js + Tailwind CSS で構築。",
    thumbnail: "/portfolio.png",
    tags: ["Next.js", "TypeScript", "Tailwind CSS"],
    link: "https://rujuu.com",
    github: "https://github.com/Rujuu-prog/mysite-v2",
    detail:
      "少し遊び心のあるポートフォリオサイト。アトミックデザインで構築し、保守性を高めています。",
  },
  {
    id: "work-2",
    title: "商品登録作業自動化アプリ",
    description: "ECサイトへの商品登録を自動化するWebアプリ",
    thumbnail: "/rpa.png",
    tags: ["Django", "さくらのVPS", "jQuery", "Pandas"],
    detail:
      "ECサイトに手動で商品を登録していて、定型作業で一日が終わっていました。\n" +
        "そこで商品登録や、作業用のcsv整形等をPythonで自動化することで、定型作業ではなくクリエイティブなタスクに時間を使えるようになりました。",
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
  {
    id: "work-6",
    title: "In progress",
    description: "",
    thumbnail: "/example.PNG",
    tags: [],
  },
];
