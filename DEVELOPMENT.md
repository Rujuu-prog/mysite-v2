# DEVELOPMENT.md

## コンテンツの更新方法

### Works（実績）

`src/data/works.ts` を編集する。

```ts
export const works: Work[] = [
  {
    id: "work-1",
    title: "プロジェクト名",
    description: "カード上に表示される短い説明",
    thumbnail: "/image.png",       // public/ 直下に配置
    tags: ["Next.js", "TypeScript"],
    link: "https://example.com",   // 省略可
    github: "https://github.com/...", // 省略可
    detail: "モーダルに表示される詳細説明",
  },
];
```

#### detail内の改行

`detail` 内で `\n` を使うと改行される（`whitespace-pre-wrap` で表示）。

```ts
detail: "1行目の説明。\n2行目の説明。\n\n段落を空けることもできる。",
```

#### サムネイル画像

- `public/` 直下に配置し、`thumbnail: "/filename.png"` で参照
- 推奨アスペクト比: 3:2

### Experience（経歴）

`src/data/experience.ts` を編集する。

### Skills（スキル）

`src/data/skills.ts` を編集する。

### サイト情報（名前・SNSリンク等）

`src/data/site.ts` を編集する。

### ナビゲーション

`src/data/navigation.ts` を編集する。
