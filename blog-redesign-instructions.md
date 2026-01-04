# ブログページ リニューアル実装指示書

## プロジェクト概要

**クライアント**: 馬郡コンサルティング（中小企業診断士・ITコーディネータ）  
**目的**: ブログ一覧ページ（お知らせ・コラム）をスタイリッシュなカード型デザインにリニューアル  
**技術スタック**: Next.js + MicroCMS

---

## 1. 現状の課題

- 記事一覧が日付とタイトルのみでシンプルすぎる
- サムネイル画像がないため視覚的な訴求力が弱い
- カテゴリやタグが見えないため記事の分類がわかりにくい

---

## 2. 目標デザイン

### デザインコンセプト
- **清潔感・信頼感・読みやすさ** を重視
- ベースカラー：白 + グレー
- アクセントカラー：サイト既存のメインカラーを継続
- レイアウト：カード型グリッド（PC: 2列、スマホ: 1列）

### 主な機能
1. サムネイル画像付きカードレイアウト
2. カテゴリタグの色分け表示（お知らせ/コラム/事例紹介）
3. 記事の抜粋文表示（80〜120文字）
4. ホバーエフェクト（シャドウ + 画像の軽いズーム）
5. レスポンシブ対応

---

## 3. MicroCMS スキーマ更新

### 既存フィールドに追加が必要なフィールド

```
APIスキーマ名: blog（または既存のブログAPI名）

追加フィールド:
┌─────────────────┬──────────────┬─────────────────────────────────┐
│ フィールドID     │ 表示名        │ 種類                             │
├─────────────────┼──────────────┼─────────────────────────────────┤
│ thumbnail       │ サムネイル    │ 画像                             │
│ category        │ カテゴリ      │ セレクトフィールド                │
│                 │              │ - お知らせ (news)                │
│                 │              │ - コラム (column)                │
│                 │              │ - 事例紹介 (case)                │
│ excerpt         │ 抜粋         │ テキストフィールド（任意）         │
└─────────────────┴──────────────┴─────────────────────────────────┘

※ excerptは任意。未設定の場合は本文(content)から自動生成する
```

### MicroCMS管理画面での設定手順
1. MicroCMS管理画面 → API設定 → スキーマ
2. 上記フィールドを追加
3. 既存記事にサムネイル画像をアップロード

---

## 4. 実装ファイル構成

```
src/
├── app/
│   └── blog/
│       ├── page.tsx          # ブログ一覧ページ（リニューアル対象）
│       └── [slug]/
│           └── page.tsx      # 記事詳細ページ
├── components/
│   ├── BlogCard.tsx          # 新規作成：カードコンポーネント
│   ├── BlogCardList.tsx      # 新規作成：カード一覧コンポーネント
│   └── CategoryTag.tsx       # 新規作成：カテゴリタグ
├── lib/
│   └── microcms.ts           # MicroCMS API クライアント（更新）
└── styles/
    └── blog.module.css       # ブログ用スタイル（新規作成）
```

---

## 5. 型定義の更新

### `src/types/blog.ts`

```typescript
export type Category = 'news' | 'column' | 'case';

export type BlogPost = {
  id: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
  title: string;
  content: string;
  thumbnail?: {
    url: string;
    height: number;
    width: number;
  };
  category?: Category;
  excerpt?: string;
};

export type BlogResponse = {
  contents: BlogPost[];
  totalCount: number;
  offset: number;
  limit: number;
};
```

---

## 6. MicroCMS クライアント更新

### `src/lib/microcms.ts`

```typescript
import { createClient } from 'microcms-js-sdk';
import type { BlogPost, BlogResponse } from '@/types/blog';

export const client = createClient({
  serviceDomain: process.env.MICROCMS_SERVICE_DOMAIN!,
  apiKey: process.env.MICROCMS_API_KEY!,
});

// ブログ一覧取得
export const getBlogs = async (limit: number = 10, offset: number = 0): Promise<BlogResponse> => {
  return await client.get({
    endpoint: 'blog',
    queries: {
      limit,
      offset,
      orders: '-publishedAt',
    },
  });
};

// ブログ詳細取得
export const getBlogDetail = async (slug: string): Promise<BlogPost> => {
  return await client.get({
    endpoint: 'blog',
    contentId: slug,
  });
};

// カテゴリ別ブログ取得
export const getBlogsByCategory = async (category: string): Promise<BlogResponse> => {
  return await client.get({
    endpoint: 'blog',
    queries: {
      filters: `category[equals]${category}`,
      orders: '-publishedAt',
    },
  });
};
```

---

## 7. コンポーネント実装

### 7.1 カテゴリタグコンポーネント

#### `src/components/CategoryTag.tsx`

```tsx
import styles from '@/styles/blog.module.css';
import type { Category } from '@/types/blog';

type Props = {
  category: Category;
};

const categoryLabels: Record<Category, string> = {
  news: 'お知らせ',
  column: 'コラム',
  case: '事例紹介',
};

export const CategoryTag = ({ category }: Props) => {
  return (
    <span className={`${styles.categoryTag} ${styles[category]}`}>
      {categoryLabels[category]}
    </span>
  );
};
```

### 7.2 ブログカードコンポーネント

#### `src/components/BlogCard.tsx`

```tsx
import Image from 'next/image';
import Link from 'next/link';
import { CategoryTag } from './CategoryTag';
import styles from '@/styles/blog.module.css';
import type { BlogPost } from '@/types/blog';

type Props = {
  post: BlogPost;
};

// 本文から抜粋を生成（HTMLタグを除去）
const generateExcerpt = (content: string, maxLength: number = 100): string => {
  const textContent = content.replace(/<[^>]*>/g, '');
  if (textContent.length <= maxLength) return textContent;
  return textContent.slice(0, maxLength) + '...';
};

// 日付フォーマット
const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('ja-JP', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export const BlogCard = ({ post }: Props) => {
  const excerpt = post.excerpt || generateExcerpt(post.content);
  
  // デフォルトのサムネイル画像URL（サムネイルがない場合）
  const thumbnailUrl = post.thumbnail?.url || '/images/default-thumbnail.jpg';
  
  return (
    <article className={styles.card}>
      <Link href={`/blog/${post.id}`} className={styles.cardLink}>
        <div className={styles.thumbnailWrapper}>
          <Image
            src={thumbnailUrl}
            alt={post.title}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className={styles.thumbnail}
          />
        </div>
        <div className={styles.cardBody}>
          {post.category && (
            <CategoryTag category={post.category} />
          )}
          <time className={styles.date} dateTime={post.publishedAt}>
            {formatDate(post.publishedAt)}
          </time>
          <h2 className={styles.cardTitle}>{post.title}</h2>
          <p className={styles.excerpt}>{excerpt}</p>
        </div>
      </Link>
    </article>
  );
};
```

### 7.3 ブログカード一覧コンポーネント

#### `src/components/BlogCardList.tsx`

```tsx
import { BlogCard } from './BlogCard';
import styles from '@/styles/blog.module.css';
import type { BlogPost } from '@/types/blog';

type Props = {
  posts: BlogPost[];
};

export const BlogCardList = ({ posts }: Props) => {
  if (posts.length === 0) {
    return (
      <div className={styles.emptyState}>
        <p>記事がありません。</p>
      </div>
    );
  }

  return (
    <div className={styles.cardGrid}>
      {posts.map((post) => (
        <BlogCard key={post.id} post={post} />
      ))}
    </div>
  );
};
```

---

## 8. ブログ一覧ページ

### `src/app/blog/page.tsx`

```tsx
import { getBlogs } from '@/lib/microcms';
import { BlogCardList } from '@/components/BlogCardList';
import styles from '@/styles/blog.module.css';

export const metadata = {
  title: 'お知らせ・コラム | 馬郡コンサルティング',
  description: '中小企業診断士・ITコーディネータによるお知らせ、コラム、事例紹介',
};

export default async function BlogPage() {
  const { contents: posts } = await getBlogs(20);

  return (
    <main className={styles.blogPage}>
      <div className={styles.container}>
        <header className={styles.pageHeader}>
          <h1 className={styles.pageTitle}>お知らせ・コラム</h1>
          <p className={styles.pageDescription}>
            中小企業のデジタル化支援・DX推進に関する最新情報をお届けします
          </p>
        </header>
        
        <BlogCardList posts={posts} />
      </div>
    </main>
  );
}
```

---

## 9. スタイル実装

### `src/styles/blog.module.css`

```css
/* ========================================
   ブログページ全体
======================================== */
.blogPage {
  padding: 60px 0 80px;
  background-color: #fafafa;
  min-height: 100vh;
}

.container {
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 20px;
}

/* ========================================
   ページヘッダー
======================================== */
.pageHeader {
  text-align: center;
  margin-bottom: 50px;
}

.pageTitle {
  font-size: 2rem;
  font-weight: 700;
  color: #333;
  margin-bottom: 12px;
}

.pageDescription {
  font-size: 1rem;
  color: #666;
  line-height: 1.6;
}

/* ========================================
   カードグリッド
======================================== */
.cardGrid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 30px;
}

@media (max-width: 768px) {
  .cardGrid {
    grid-template-columns: 1fr;
    gap: 24px;
  }
}

/* ========================================
   カードコンポーネント
======================================== */
.card {
  background: #fff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  transition: box-shadow 0.3s ease, transform 0.3s ease;
}

.card:hover {
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  transform: translateY(-4px);
}

.cardLink {
  display: block;
  text-decoration: none;
  color: inherit;
}

/* ========================================
   サムネイル
======================================== */
.thumbnailWrapper {
  position: relative;
  aspect-ratio: 16 / 9;
  overflow: hidden;
  background-color: #f0f0f0;
}

.thumbnail {
  object-fit: cover;
  transition: transform 0.3s ease;
}

.card:hover .thumbnail {
  transform: scale(1.05);
}

/* ========================================
   カード本体
======================================== */
.cardBody {
  padding: 20px 24px 24px;
}

.date {
  display: block;
  font-size: 0.85rem;
  color: #888;
  margin-top: 8px;
  margin-bottom: 8px;
}

.cardTitle {
  font-size: 1.1rem;
  font-weight: 600;
  color: #333;
  line-height: 1.5;
  margin-bottom: 10px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.excerpt {
  font-size: 0.9rem;
  color: #666;
  line-height: 1.7;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* ========================================
   カテゴリタグ
======================================== */
.categoryTag {
  display: inline-block;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 500;
}

/* お知らせ - ブルー */
.news {
  background-color: #e3f2fd;
  color: #1565c0;
}

/* コラム - グリーン */
.column {
  background-color: #e8f5e9;
  color: #2e7d32;
}

/* 事例紹介 - オレンジ */
.case {
  background-color: #fff3e0;
  color: #ef6c00;
}

/* ========================================
   空状態
======================================== */
.emptyState {
  text-align: center;
  padding: 60px 20px;
  color: #888;
}

/* ========================================
   レスポンシブ調整
======================================== */
@media (max-width: 768px) {
  .blogPage {
    padding: 40px 0 60px;
  }
  
  .pageTitle {
    font-size: 1.5rem;
  }
  
  .pageDescription {
    font-size: 0.9rem;
  }
  
  .cardBody {
    padding: 16px 20px 20px;
  }
  
  .cardTitle {
    font-size: 1rem;
  }
}
```

---

## 10. デフォルトサムネイル画像

サムネイルが設定されていない記事用のデフォルト画像を用意してください。

**保存場所**: `public/images/default-thumbnail.jpg`

**推奨仕様**:
- サイズ: 1200 x 675px（16:9）
- デザイン: シンプルなグラデーションまたはパターン背景に会社ロゴ
- ファイルサイズ: 100KB以下に最適化

---

## 11. 環境変数

`.env.local` に以下が設定されていることを確認：

```
MICROCMS_SERVICE_DOMAIN=your-service-domain
MICROCMS_API_KEY=your-api-key
```

---

## 12. 実装チェックリスト

### MicroCMS側
- [ ] thumbnailフィールドを追加
- [ ] categoryフィールドを追加（セレクトフィールド）
- [ ] 既存記事にカテゴリを設定
- [ ] 少なくとも1〜2記事にサムネイル画像を設定（テスト用）

### Next.js側
- [ ] 型定義ファイル作成 (`src/types/blog.ts`)
- [ ] MicroCMSクライアント更新 (`src/lib/microcms.ts`)
- [ ] CategoryTagコンポーネント作成
- [ ] BlogCardコンポーネント作成
- [ ] BlogCardListコンポーネント作成
- [ ] ブログ一覧ページ更新 (`src/app/blog/page.tsx`)
- [ ] スタイルファイル作成 (`src/styles/blog.module.css`)
- [ ] デフォルトサムネイル画像配置
- [ ] 動作確認（PC・スマホ両方）

---

## 13. 追加オプション（将来的な拡張）

以下は今回のスコープ外ですが、今後の拡張として検討可能：

1. **ページネーション**: 記事が増えた場合のページ送り機能
2. **カテゴリフィルター**: カテゴリごとの絞り込み表示
3. **検索機能**: キーワードでの記事検索
4. **関連記事**: 詳細ページ下部に関連記事を表示
5. **SNSシェアボタン**: Twitter/Facebook/LINEシェア

---

## 14. 参考デザイン

以下のサイトを参考にしてください：

- **シンプル** - https://www.oginotax.com/news/
- **SANKOU!** - https://sankoudesign.com/


---

## 注意事項

1. **既存コードとの整合性**: 既存のレイアウトコンポーネント（Header/Footer）を維持
2. **SEO対応**: metadata設定を適切に行う
3. **パフォーマンス**: next/imageのsizes属性を適切に設定し、画像の最適化を行う
4. **アクセシビリティ**: 適切なalt属性、セマンティックHTML

---

**作成日**: 2025年1月2日  
**対象環境**: Next.js 14+ (App Router) + MicroCMS
