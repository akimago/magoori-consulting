# 馬郡コンサルティング ホームページ開発作業ログ

## 作業日
2024年12月31日〜2025年1月1日

## プロジェクト概要
中小企業診断士・ITコーディネータ向けのコーポレートサイトを Next.js + MicroCMS で構築し、Vercel にデプロイ。

---

## 技術スタック
- **フレームワーク**: Next.js 15 (App Router)
- **スタイリング**: Tailwind CSS + カスタムCSS
- **CMS**: MicroCMS（ヘッドレスCMS）
- **ホスティング**: Vercel
- **言語**: TypeScript
- **フォーム**: Formspree

---

## 実装完了項目

### Phase 1: MicroCMS連携の基盤構築

#### 実施内容
1. プロジェクト構造を `src/` ディレクトリに移行
2. `tsconfig.json` のパス設定を `@/*` → `./src/*` に変更
3. MicroCMSクライアントの作成（`src/lib/microcms.ts`）
4. ブログの型定義作成（`src/types/blog.ts`）
5. データ取得関数の実装
   - `getBlogs()`: ブログ一覧取得
   - `getBlogDetail()`: ブログ詳細取得
   - `getAllBlogIds()`: 静的生成用ID取得

#### 作成ファイル
- `src/lib/microcms.ts`
- `src/types/blog.ts`

---

### Phase 2: デザインのコンポーネント化

#### 実施内容
1. グローバルスタイルの設定（CSS変数、アニメーション、レスポンシブ対応）
2. Google Fonts（Noto Sans JP, Shippori Mincho）の設定
3. 10個のコンポーネント作成

#### 作成コンポーネント
| コンポーネント | 説明 |
|---------------|------|
| `Header.tsx` | 固定ヘッダー、mix-blend-mode対応 |
| `Hero.tsx` | ヒーローセクション、フローティングモチーフ |
| `About.tsx` | プロフィールセクション、写真表示 |
| `Thoughts.tsx` | 大切にしていること（3項目） |
| `Services.tsx` | サービス一覧（グリーン丸印エフェクト） |
| `Flow.tsx` | ご支援の流れ（ダークテーマ） |
| `Works.tsx` | 支援実績（4件） |
| `BlogSection.tsx` | ブログセクション（MicroCMS連携） |
| `CTA.tsx` | お問い合わせ誘導 |
| `Footer.tsx` | フッター |

#### 更新ファイル
- `src/app/globals.css`（全スタイル定義）
- `src/app/layout.tsx`（フォント・メタデータ設定）

---

### Phase 3: ページの実装

#### 作成ページ
| ページ | パス | 説明 |
|-------|------|------|
| トップページ | `/` | 全セクション統合、MicroCMSからブログ3件取得 |
| ブログ一覧 | `/blog` | ブログ記事一覧（最大20件） |
| ブログ詳細 | `/blog/[slug]` | 個別記事ページ、静的生成対応 |
| お問い合わせ | `/contact` | Formspree連携フォーム |
| 404 | `/not-found` | エラーページ |

#### 作成ファイル
- `src/app/page.tsx`
- `src/app/blog/page.tsx`
- `src/app/blog/[slug]/page.tsx`
- `src/app/contact/page.tsx`
- `src/app/not-found.tsx`

---

### 追加対応

#### About セクション写真設定
- `asets/magori-photo.jpg` を `public/images/` にコピー
- `About.tsx` に Next.js Image コンポーネントで表示

#### スタイル調整
- Thoughts セクションの番号フォントサイズ拡大（12px → 32px）
- Flow セクションの番号の透明度調整（0.1 → 0.35）
- Flow セクションのタイトル・コンテンツのフォントサイズ拡大

#### お問い合わせフォーム
- Formspree連携（`https://formspree.io/f/mlgdrwak`）
- フォーム項目：会社名、お名前、メールアドレス、電話番号、ご相談内容、お問い合わせ内容、ご希望の連絡方法

#### ナビゲーションリンク修正
- 他ページからトップページのセクションへ遷移できるよう修正
- `#about` → `/#about` 等

---

### Phase 4: Vercelへのデプロイ

#### 実施内容
1. GitHubリポジトリ作成（`akimago/magoori-consulting`）
2. コードをプッシュ
3. Vercelでプロジェクト作成
4. 環境変数設定
   - `MICROCMS_SERVICE_DOMAIN`: silva
   - `MICROCMS_API_KEY`: wrkPdX3XVYfZ5J2zHEIxu29JeAt0DmwJBybq
5. デプロイ完了

#### リポジトリ
- GitHub: https://github.com/akimago/magoori-consulting

---

## ディレクトリ構成（最終）

```
magoori-consulting/
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── globals.css
│   │   ├── favicon.ico
│   │   ├── not-found.tsx
│   │   ├── blog/
│   │   │   ├── page.tsx
│   │   │   └── [slug]/
│   │   │       └── page.tsx
│   │   └── contact/
│   │       └── page.tsx
│   ├── components/
│   │   ├── Header.tsx
│   │   ├── Hero.tsx
│   │   ├── About.tsx
│   │   ├── Thoughts.tsx
│   │   ├── Services.tsx
│   │   ├── Flow.tsx
│   │   ├── Works.tsx
│   │   ├── BlogSection.tsx
│   │   ├── CTA.tsx
│   │   └── Footer.tsx
│   ├── lib/
│   │   └── microcms.ts
│   └── types/
│       └── blog.ts
├── public/
│   └── images/
│       └── magori-photo.jpg
├── .env.local
├── package.json
├── tsconfig.json
└── CLAUDE_CODE_INSTRUCTIONS.md
```

---

## 今後の改善候補

- [ ] カスタムドメイン設定
- [ ] MicroCMS Webhook設定（ブログ更新時の自動再デプロイ）
- [ ] OGP画像設定（SNSシェア用）
- [ ] Google Analytics導入
- [ ] サイトマップ生成
- [ ] パフォーマンス最適化

---

## 備考

- デザインリファレンス: `reference/index-v5.html`
- 開発手順書: `CLAUDE_CODE_INSTRUCTIONS.md`
- 環境変数は `.env.local` に設定（Git管理外）
