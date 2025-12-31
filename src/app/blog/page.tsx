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
