import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getBlogs } from "@/lib/microcms";
import { BlogCardList } from "@/components/BlogCardList";
import styles from "@/styles/blog.module.css";

export const metadata = {
  title: "お知らせ・コラム | 馬郡コンサルティング",
  description: "中小企業診断士・ITコーディネータによるお知らせ、コラム、事例紹介。AI活用・DX推進に関する最新情報をお届けします。",
};

export default async function BlogPage() {
  const { contents: posts } = await getBlogs(20);

  return (
    <>
      <Header />
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
      <Footer />
    </>
  );
}
