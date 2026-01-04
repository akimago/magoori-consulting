import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getBlogsByCategory } from "@/lib/microcms";
import { BlogCardList } from "@/components/BlogCardList";
import styles from "@/styles/blog.module.css";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ category: string }>;
};

const categoryConfig: Record<string, { title: string; description: string }> = {
  case: {
    title: "支援実績",
    description: "中小企業のデジタル化支援・DX推進の実績をご紹介します",
  },
  news: {
    title: "お知らせ",
    description: "馬郡コンサルティングからのお知らせ",
  },
  column: {
    title: "コラム",
    description: "AI活用・DX推進に関するコラム",
  },
};

export async function generateStaticParams() {
  return Object.keys(categoryConfig).map((category) => ({ category }));
}

export async function generateMetadata({ params }: Props) {
  const { category } = await params;
  const config = categoryConfig[category];

  if (!config) {
    return { title: "カテゴリが見つかりません | 馬郡コンサルティング" };
  }

  return {
    title: `${config.title} | 馬郡コンサルティング`,
    description: config.description,
  };
}

export default async function CategoryBlogPage({ params }: Props) {
  const { category } = await params;
  const config = categoryConfig[category];

  if (!config) {
    notFound();
  }

  const { contents: posts } = await getBlogsByCategory(category, 20);

  return (
    <>
      <Header />
      <main className={styles.blogPage}>
        <div className={styles.container}>
          <header className={styles.pageHeader}>
            <h1 className={styles.pageTitle}>{config.title}</h1>
            <p className={styles.pageDescription}>{config.description}</p>
          </header>

          <BlogCardList posts={posts} />
        </div>
      </main>
      <Footer />
    </>
  );
}
