import type { Work } from "@/types";

export const works: Work[] = [
  {
    id: "work-1",
    title: "Portfolio Site",
    period: "2026.02 - 2026.02",
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
    period: "2021.04 - 2022.08",
    description: "ECサイトへの商品登録を自動化するWebアプリ",
    thumbnail: "/rpa.png",
    tags: ["Django", "さくらのVPS", "jQuery", "Pandas", "Docker", "PostgreSQL", "GitHub Actions"],
    detail:
      "ECサイトに手動で商品を登録していて、定型作業で一日が終わっていました。\n" +
        "そこで商品登録や、作業用のcsv整形等をPythonで自動化することで、定型作業ではなくクリエイティブなタスクに時間を使えるようになりました。\n" +
        "こだわりポイントは、ユーザーの待機時間をなるべく短くするためにdaskやCeleryで並列処理を行った点です。\n" +
        "また、ChatWorkのAPIを使用することで、処理完了を通知するなど既存の業務システムとの連携も意識しました。",
  },
  {
    id: "work-3",
    title: "パチンコ屋さんの景品管理システム",
    period: "2022.11 - 2023.07",
    description: "景品を管理して、帳票を出力するシステム",
    thumbnail: "/default.png",
    tags: ["CakePHP", "jQuery", "Bootstrap", "Docker", "PostgreSQL", "ロリポップ", "GitHub Actions"],
    detail:
      "景品の種類と販売された数量等を登録することで、各月の売り上げ帳票を出力できるシステムです。\n" +
        "日々の入力漏れを防ぎ、集計作業の負担を減らすことを目的に設計しました。\n\n" +
        "トップページにはカレンダー画面を配置し、未登録の日付を一目で把握できるようにするとともに、未登録時には通知が届く仕組みを導入しています。\n" +
        "また、不定期の休業日を帳票に反映したいという現場の要望に対応するため、カレンダー画面から直接休日を登録できる機能を実装しました。",
  },
  {
    id: "work-4",
    title: "社内システムの改修",
    period: "2022.08 - 2023.07",
    description: "社内の在庫管理システムの改修",
    thumbnail: "/default.png",
    tags: ["CakePHP", "Bootstrap", "jQuery", "Docker", "AWS", "MySQL", "GitHub Actions"],
    detail:
      "レガシーなシステムであったため、デプロイはFTPによる手動作業で行われており、バージョン管理もされていない状態でした。\n" +
        "そこで、Git / GitHub を導入してソースコードのバージョン管理を行うとともに、GitHub Actions を用いてデプロイの自動化を行いました。\n\n" +
        "また、同一の処理が複数箇所に記述されており保守性が低下していたため、リファクタリングを実施しました。\n" +
        "処理の共通化と単純化を行うことで、保守性の向上に加えて処理速度の改善も実現しています。",
  },
  {
    id: "work-5",
    title: "markdown2notion",
    description: "NotionのDBにmarkdownファイルを変換するnpmライブラリ",
    thumbnail: "/markdown2notion.png",
    tags: ["TypeScript", "npm", "Docker"],
    link: "https://www.npmjs.com/package/markdown2notion",
    github: "https://github.com/Rujuu-prog/markdown2notion",
    detail:
      "フォルダの階層構造をTagとして表現して、MDファイルをNotionのDBに登録できるnpmライブラリ。",
  },
  {
    id: "work-6",
    title: "wareki-tool-kit",
    description: "和暦と西暦を操作するnpmライブラリ",
    thumbnail: "/wareki-tool-kit.png",
    tags: ["TypeScript", "npm", "Docker"],
    link: "https://www.npmjs.com/package/wareki-tool-kit",
    github: "https://github.com/Rujuu-prog/wareki-tool-kit",
    detail:
        "和暦と西暦の相互変換を簡単に行うことができるnpmライブラリ。",
  },
  {
    id: "work-7",
    title: "レンタルサロンのSPAサイト作成",
    period: "2023.7 - 2023.9",
    description: "レンタルサロンのSPAサイトを作成",
    thumbnail: "/spa.png",
    tags: ["Next.js", "Vercel"],
    detail:
        "レンタルサロンの詳細や価格を説明するためのSPAサイトを作成しました。",
  },
  {
    id: "work-8",
    title: "食品棚卸商社発注システム",
    period: "2023.09 - 2024.02",
    description: "海外に日本の食品を販売する会社の発注システム",
    thumbnail: "/default.png",
    tags: ["Laravel", "Vue.js", "jQuery", "Docker", "AWS", "MySQL", "Bitbucket", "Jira"],
    detail:
      "注文確認画面、注文送信処理、商品検索画面、商品追加機能を担当しました。",
  },
  {
    id: "work-9",
    title: "某検索ポータル提供企業の社内システム保守・運用",
    period: "2024.04 - ",
    description: "複数の社内システムの保守・運用",
    thumbnail: "/default.png",
    tags: ["Spring Boot", "Angular", "AWS", "Kubernetes", "Streamlit", "Wordpress", "Salesforce"],
    detail:
      "社内の複数システムの保守・運用を担当しています。\n" +
      "既存機能の改修やDB移行、障害対応など幅広く対応しています。",
  },
  {
    id: "work-10",
    title: "ブログサイト作成",
    description: "個人ブログサイト",
    thumbnail: "/blog.png",
    tags: ["Wordpress", "さくらのVPS"],
    github: "https://blog.rujuu.com",
    detail:
        "備忘録や使って良かったアイテムなどを共有するためのブログサイトです。",
  },
  {
    id: "work-11",
    title: "OBS配信サポートシステム",
    period: "2025.11 - ",
    description: "配信のコメントをリアルタイムで収集し、配信画面へ情報を表示するシステム",
    thumbnail: "/default.png",
    tags: ["Django", "Next.js", "Docker", "PostgreSQL", "Prometheus"],
    detail:
        "作成途中...",
  },
  {
    id: "work-12",
    title: "In progress",
    description: "",
    thumbnail: "/inprogress.png",
    tags: [],
  },
];
