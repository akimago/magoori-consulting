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
