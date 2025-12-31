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
