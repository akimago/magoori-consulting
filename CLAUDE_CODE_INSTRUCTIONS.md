# 馬郡コンサルティング ホームページ開発手順書

## プロジェクト概要

中小企業診断士・ITコーディネータ向けのコーポレートサイト。
MicroCMSを活用したブログ機能を持つNext.jsサイトをVercelにデプロイする。

---

## 技術スタック

- **フレームワーク**: Next.js 15 (App Router)
- **スタイリング**: Tailwind CSS + カスタムCSS
- **CMS**: MicroCMS（ヘッドレスCMS）
- **ホスティング**: Vercel
- **言語**: TypeScript

---

## 環境変数

`.env.local` ファイルに以下を設定済み：

```
MICROCMS_SERVICE_DOMAIN=silva
MICROCMS_API_KEY=wrkPdX3XVYfZ5J2zHEIxu29JeAt0DmwJBybq
```

**注意**: このファイルは `.gitignore` に含まれており、Gitにコミットされない。
Vercelデプロイ時は、Vercelの環境変数設定で同じ値を設定する必要がある。

---

## ディレクトリ構成（目標）

```
magoori-consulting/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # 共通レイアウト
│   │   ├── page.tsx            # トップページ
│   │   ├── globals.css         # グローバルスタイル
│   │   ├── blog/
│   │   │   ├── page.tsx        # ブログ一覧
│   │   │   └── [slug]/
│   │   │       └── page.tsx    # ブログ詳細
│   │   └── contact/
│   │       └── page.tsx        # お問い合わせ
│   ├── components/
│   │   ├── Header.tsx          # ヘッダー
│   │   ├── Footer.tsx          # フッター
│   │   ├── Hero.tsx            # ヒーローセクション
│   │   ├── About.tsx           # About セクション
│   │   ├── Thoughts.tsx        # 大切にしていること
│   │   ├── Services.tsx        # サービス一覧
│   │   ├── Flow.tsx            # ご支援の流れ
│   │   ├── Works.tsx           # 支援実績
│   │   ├── BlogSection.tsx     # ブログセクション（トップ用）
│   │   └── CTA.tsx             # CTA セクション
│   ├── lib/
│   │   └── microcms.ts         # MicroCMS クライアント
│   └── types/
│       └── blog.ts             # ブログの型定義
├── public/
│   └── images/                 # 画像ファイル
├── .env.local                  # 環境変数（Git管理外）
└── package.json
```

---

## 実装手順

### Phase 1: MicroCMS連携の基盤構築

#### Step 1-1: MicroCMSクライアントの作成

`src/lib/microcms.ts` を作成：

```typescript
import { createClient } from 'microcms-js-sdk';

if (!process.env.MICROCMS_SERVICE_DOMAIN) {
  throw new Error('MICROCMS_SERVICE_DOMAIN is required');
}

if (!process.env.MICROCMS_API_KEY) {
  throw new Error('MICROCMS_API_KEY is required');
}

export const client = createClient({
  serviceDomain: process.env.MICROCMS_SERVICE_DOMAIN,
  apiKey: process.env.MICROCMS_API_KEY,
});
```

#### Step 1-2: ブログの型定義

`src/types/blog.ts` を作成：

```typescript
export type Blog = {
  id: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
  title: string;
  content: string;
  eyecatch?: {
    url: string;
    height: number;
    width: number;
  };
  category?: {
    id: string;
    name: string;
  };
};

export type BlogListResponse = {
  contents: Blog[];
  totalCount: number;
  offset: number;
  limit: number;
};
```

#### Step 1-3: MicroCMSからデータ取得する関数を追加

`src/lib/microcms.ts` に追記：

```typescript
import type { Blog, BlogListResponse } from '@/types/blog';

// ブログ一覧を取得
export const getBlogs = async (limit: number = 10): Promise<BlogListResponse> => {
  const response = await client.get<BlogListResponse>({
    endpoint: 'blogs',
    queries: { limit },
  });
  return response;
};

// ブログ詳細を取得
export const getBlogDetail = async (contentId: string): Promise<Blog> => {
  const response = await client.get<Blog>({
    endpoint: 'blogs',
    contentId,
  });
  return response;
};

// 全ブログのIDを取得（静的生成用）
export const getAllBlogIds = async (): Promise<string[]> => {
  const response = await client.get<BlogListResponse>({
    endpoint: 'blogs',
    queries: { fields: 'id', limit: 100 },
  });
  return response.contents.map((blog) => blog.id);
};
```

---

### Phase 2: デザインのコンポーネント化

既存の `index-v5.html` をNext.jsコンポーネントに変換する。

#### Step 2-1: グローバルスタイルの設定

`src/app/globals.css` を編集し、index-v5.htmlの`:root`変数とベーススタイルを追加：

```css
@import "tailwindcss";

:root {
  --color-primary: #1a1a1a;
  --color-accent: #3d7a99;
  --color-accent-light: #e9f2f6;
  --color-text: #333333;
  --color-text-secondary: #666666;
  --color-text-muted: #999999;
  --color-white: #ffffff;
  --color-bg: #f8f9fa;
  --color-bg-warm: #fdfcfb;
  --color-line: #e0e0e0;
  --color-line-light: #efefef;
  --font-sans: 'Noto Sans JP', -apple-system, BlinkMacSystemFont, sans-serif;
  --font-serif: 'Shippori Mincho', serif;
  --ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);
  --ease-out-quart: cubic-bezier(0.25, 1, 0.5, 1);
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  font-family: var(--font-sans);
  font-weight: 400;
  color: var(--color-text);
  line-height: 2;
  background: var(--color-white);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  overflow-x: hidden;
}

::selection {
  background: var(--color-accent);
  color: var(--color-white);
}

a {
  color: inherit;
  text-decoration: none;
}

img {
  max-width: 100%;
  height: auto;
  vertical-align: middle;
}
```

#### Step 2-2: レイアウトファイルの設定

`src/app/layout.tsx` を編集：

```tsx
import type { Metadata } from "next";
import { Noto_Sans_JP, Shippori_Mincho } from "next/font/google";
import "./globals.css";

const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-sans",
  display: "swap",
});

const shipporiMincho = Shippori_Mincho({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: "馬郡コンサルティング | AI・IT導入の伴走支援",
  description: "福岡県を拠点に、中小企業のAI活用・DX推進を伴走支援。中小企業診断士・ITコーディネータが経営者の視点で最適な解決策を一緒に考えます。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className={`${notoSansJP.variable} ${shipporiMincho.variable}`}>
      <body>{children}</body>
    </html>
  );
}
```

#### Step 2-3: 各コンポーネントの作成

以下のコンポーネントを `src/components/` に作成する。
index-v5.htmlの各セクションを対応するコンポーネントに変換する。

**作成するコンポーネント一覧：**

1. `Header.tsx` - ヘッダーナビゲーション
2. `Hero.tsx` - ヒーローセクション（フローティングモチーフ含む）
3. `About.tsx` - 「大企業の知見を、地域のちからに。」セクション
4. `Thoughts.tsx` - 「伴走支援で大切にしていること」セクション
5. `Services.tsx` - 「ご提供サービス」セクション（グリーン丸印エフェクト付き）
6. `Flow.tsx` - 「ご支援の流れ」セクション
7. `Works.tsx` - 「支援実績」セクション
8. `BlogSection.tsx` - トップページ用ブログセクション
9. `CTA.tsx` - お問い合わせCTAセクション
10. `Footer.tsx` - フッター

**各コンポーネントの実装ポイント：**

- index-v5.htmlのHTMLとCSSを対応するコンポーネントに移植
- CSSはCSS Modulesまたはインラインスタイルで管理
- `className`の書き方をJSX形式に変換
- `<br>` は `<br />` に変換
- スタイルは `styles/` ディレクトリにCSS Modulesとして分離してもよい

---

### Phase 3: ページの実装

#### Step 3-1: トップページ

`src/app/page.tsx` を編集：

```tsx
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Thoughts from "@/components/Thoughts";
import Services from "@/components/Services";
import Flow from "@/components/Flow";
import Works from "@/components/Works";
import BlogSection from "@/components/BlogSection";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import { getBlogs } from "@/lib/microcms";

export default async function Home() {
  // MicroCMSから最新3件のブログを取得
  const { contents: blogs } = await getBlogs(3);

  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <Thoughts />
        <Services />
        <Flow />
        <Works />
        <BlogSection blogs={blogs} />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
```

#### Step 3-2: ブログ一覧ページ

`src/app/blog/page.tsx` を作成：

```tsx
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getBlogs } from "@/lib/microcms";
import Link from "next/link";

export const metadata = {
  title: "ブログ | 馬郡コンサルティング",
  description: "AI活用・DX推進に関するお知らせやコラムを発信しています。",
};

export default async function BlogPage() {
  const { contents: blogs } = await getBlogs(20);

  return (
    <>
      <Header />
      <main style={{ paddingTop: "120px", minHeight: "100vh" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto", padding: "0 24px" }}>
          <h1 style={{ 
            fontFamily: "var(--font-serif)", 
            fontSize: "32px", 
            marginBottom: "48px" 
          }}>
            お知らせ・コラム
          </h1>
          
          <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            {blogs.map((blog) => (
              <Link 
                key={blog.id} 
                href={`/blog/${blog.id}`}
                style={{
                  display: "block",
                  padding: "24px",
                  borderBottom: "1px solid var(--color-line-light)",
                  transition: "background 0.3s",
                }}
              >
                <time style={{ 
                  fontSize: "12px", 
                  color: "var(--color-text-muted)",
                  letterSpacing: "0.1em"
                }}>
                  {new Date(blog.publishedAt).toLocaleDateString("ja-JP", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                  }).replace(/\//g, ".")}
                </time>
                <h2 style={{ 
                  fontSize: "16px", 
                  fontWeight: "400",
                  marginTop: "8px",
                  lineHeight: "1.8"
                }}>
                  {blog.title}
                </h2>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
```

#### Step 3-3: ブログ詳細ページ

`src/app/blog/[slug]/page.tsx` を作成：

```tsx
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getBlogDetail, getAllBlogIds } from "@/lib/microcms";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ slug: string }>;
};

// 静的生成のためのパスを生成
export async function generateStaticParams() {
  const ids = await getAllBlogIds();
  return ids.map((id) => ({ slug: id }));
}

// 動的メタデータ
export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  try {
    const blog = await getBlogDetail(slug);
    return {
      title: `${blog.title} | 馬郡コンサルティング`,
      description: blog.content.replace(/<[^>]*>/g, "").slice(0, 160),
    };
  } catch {
    return {
      title: "記事が見つかりません | 馬郡コンサルティング",
    };
  }
}

export default async function BlogDetailPage({ params }: Props) {
  const { slug } = await params;
  
  try {
    const blog = await getBlogDetail(slug);

    return (
      <>
        <Header />
        <main style={{ paddingTop: "120px", minHeight: "100vh" }}>
          <article style={{ maxWidth: "800px", margin: "0 auto", padding: "0 24px 80px" }}>
            <time style={{ 
              fontSize: "12px", 
              color: "var(--color-text-muted)",
              letterSpacing: "0.1em"
            }}>
              {new Date(blog.publishedAt).toLocaleDateString("ja-JP", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
              }).replace(/\//g, ".")}
            </time>
            
            <h1 style={{ 
              fontFamily: "var(--font-serif)",
              fontSize: "28px",
              fontWeight: "400",
              lineHeight: "1.8",
              marginTop: "16px",
              marginBottom: "48px"
            }}>
              {blog.title}
            </h1>

            {blog.eyecatch && (
              <img 
                src={blog.eyecatch.url} 
                alt={blog.title}
                style={{ 
                  width: "100%", 
                  height: "auto", 
                  marginBottom: "48px",
                  borderRadius: "4px"
                }}
              />
            )}

            <div 
              style={{
                fontSize: "15px",
                lineHeight: "2.2",
                color: "var(--color-text)",
              }}
              dangerouslySetInnerHTML={{ __html: blog.content }}
            />
          </article>
        </main>
        <Footer />
      </>
    );
  } catch {
    notFound();
  }
}
```

#### Step 3-4: 404ページ

`src/app/not-found.tsx` を作成：

```tsx
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function NotFound() {
  return (
    <>
      <Header />
      <main style={{ 
        paddingTop: "120px", 
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center"
      }}>
        <div>
          <h1 style={{ 
            fontFamily: "var(--font-serif)",
            fontSize: "48px",
            fontWeight: "400",
            marginBottom: "24px"
          }}>
            404
          </h1>
          <p style={{ 
            color: "var(--color-text-secondary)",
            marginBottom: "32px"
          }}>
            お探しのページが見つかりませんでした。
          </p>
          <Link 
            href="/"
            style={{
              display: "inline-block",
              padding: "16px 32px",
              border: "1px solid var(--color-primary)",
              fontSize: "14px",
              letterSpacing: "0.1em",
              transition: "all 0.3s"
            }}
          >
            トップページへ戻る
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
```

---

### Phase 4: Vercelへのデプロイ

#### Step 4-1: GitHubリポジトリの作成

```bash
# プロジェクトディレクトリで実行
git add .
git commit -m "Initial commit: Next.js + MicroCMS setup"

# GitHubでリポジトリを作成後
git remote add origin https://github.com/[username]/magoori-consulting.git
git branch -M main
git push -u origin main
```

#### Step 4-2: Vercelでのデプロイ

1. [Vercel](https://vercel.com) にログイン
2. "New Project" をクリック
3. GitHubリポジトリを選択
4. 環境変数を設定：
   - `MICROCMS_SERVICE_DOMAIN` = `silva`
   - `MICROCMS_API_KEY` = `wrkPdX3XVYfZ5J2zHEIxu29JeAt0DmwJBybq`
5. "Deploy" をクリック

#### Step 4-3: MicroCMS Webhook設定（任意）

ブログ更新時に自動で再デプロイするための設定：

1. Vercelのプロジェクト設定 → "Git" → "Deploy Hooks" でURLを生成
2. MicroCMSの "API設定" → "Webhook" で上記URLを登録
3. コンテンツ更新時に自動でVercelが再ビルド

---

## コンポーネント実装の詳細仕様

### Header.tsx の実装仕様

```tsx
// src/components/Header.tsx
// - position: fixed でスクロール追従
// - mix-blend-mode: difference でロゴ・ナビを反転表示
// - ナビゲーションリンク: About, Services, Works, Blog, Contact
// - ホバー時にアンダーラインアニメーション
```

### Services.tsx の実装仕様（グリーン丸印エフェクト）

```tsx
// src/components/Services.tsx
// - 3カラムグリッドレイアウト
// - 各カードの左上に丸いインジケーター（24px）
// - ホバー時に丸が var(--color-accent) で塗りつぶし
// - サービス内容:
//   1. AI活用コンサルティング
//   2. DX・RPA導入支援
//   3. 補助金申請サポート
```

### BlogSection.tsx の実装仕様

```tsx
// src/components/BlogSection.tsx
// - props: blogs: Blog[] を受け取る
// - 最新3件を日付順で表示
// - 日付フォーマット: YYYY.MM.DD
// - 「もっと見る」リンクで /blog へ遷移
```

---

## 参考：index-v5.html のセクション対応表

| HTMLセクション | コンポーネント名 | 備考 |
|---------------|-----------------|------|
| `.header` | Header.tsx | fixed header |
| `.hero` | Hero.tsx | モチーフアニメーション含む |
| `.section.about` | About.tsx | 画像プレースホルダー含む |
| `.section.thoughts` | Thoughts.tsx | 3つの項目 |
| `.section.services` | Services.tsx | グリーン丸印エフェクト |
| `.section.flow` | Flow.tsx | ダークテーマ |
| `.section.works` | Works.tsx | 4件の実績カード |
| `.section.blog` | BlogSection.tsx | MicroCMS連携 |
| `.cta` | CTA.tsx | お問い合わせ誘導 |
| `.footer` | Footer.tsx | リンク・著作権表示 |

---

## 追加実装（オプション）

### お問い合わせフォーム

- Vercel Forms または Formspree を利用
- `/contact` ページで実装

### Google Analytics

- `next/script` で GA4 タグを埋め込み

### OGP画像

- `opengraph-image.tsx` で動的OGP画像生成

### サイトマップ

- `sitemap.ts` で動的サイトマップ生成

---

## トラブルシューティング

### MicroCMSからデータが取得できない

1. `.env.local` の値を確認
2. MicroCMSダッシュボードでAPIキーが有効か確認
3. エンドポイント名が `blogs` で正しいか確認

### ビルドエラー

1. `npm run build` でエラー内容を確認
2. 型エラーの場合は `types/blog.ts` を確認
3. 環境変数が本番環境に設定されているか確認

### スタイルが崩れる

1. globals.css に CSS変数が定義されているか確認
2. フォントが正しく読み込まれているか確認
3. Tailwindとカスタムスタイルの競合を確認

---

## 完了チェックリスト

- [ ] MicroCMSクライアント設定
- [ ] 型定義ファイル作成
- [ ] グローバルスタイル設定
- [ ] レイアウトファイル設定
- [ ] Header コンポーネント
- [ ] Hero コンポーネント
- [ ] About コンポーネント
- [ ] Thoughts コンポーネント
- [ ] Services コンポーネント（グリーン丸印）
- [ ] Flow コンポーネント
- [ ] Works コンポーネント
- [ ] BlogSection コンポーネント
- [ ] CTA コンポーネント
- [ ] Footer コンポーネント
- [ ] トップページ統合
- [ ] ブログ一覧ページ
- [ ] ブログ詳細ページ
- [ ] 404ページ
- [ ] GitHubリポジトリ作成
- [ ] Vercelデプロイ
- [ ] 環境変数設定
- [ ] 動作確認
