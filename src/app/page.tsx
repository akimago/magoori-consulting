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
