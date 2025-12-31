import Link from "next/link";

export default function CTA() {
  return (
    <section className="cta" id="contact">
      <div className="cta-inner">
        <h2>
          まずは、<br />
          お気軽にご相談ください。
        </h2>
        <p>
          「こんなこと聞いていいのかな」という<br />
          小さな疑問でも構いません。<br />
          初回のご相談は無料です。
        </p>
        <Link href="/contact" className="btn-primary"><span>無料相談に申し込む</span></Link>
      </div>
    </section>
  );
}
