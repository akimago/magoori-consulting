import Link from "next/link";
import type { Blog } from "@/types/blog";

type Props = {
  blogs: Blog[];
};

export default function BlogSection({ blogs }: Props) {
  return (
    <section className="section blog" id="blog">
      <div className="section-inner">
        <header className="section-header">
          <div className="section-label">Blog</div>
          <h2 className="section-title">
            お知らせ・コラム
            <span className="section-title-en">Latest updates</span>
          </h2>
        </header>

        <div className="blog-list">
          {blogs.map((blog) => (
            <Link key={blog.id} href={`/blog/${blog.id}`} className="blog-item">
              <time className="blog-date">
                {new Date(blog.publishedAt).toLocaleDateString("ja-JP", {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                }).replace(/\//g, ".")}
              </time>
              <h3>{blog.title}</h3>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
