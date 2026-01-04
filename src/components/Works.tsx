import Image from "next/image";
import Link from "next/link";

const works = [
  {
    id: "7cekoid3fd",
    image: "/images/works/CaseStudy-01.png",
    alt: "製造業A社：生成AIによる議事録作成の自動化",
    category: "AI Integration",
    title: "製造業A社：生成AIによる議事録作成の自動化",
    result: "会議時間の30%削減を実現",
  },
  {
    id: "zv_2c_zlkd",
    image: "/images/works/CaseStudy-02.png",
    alt: "卸売業B社：受発注業務の自動化",
    category: "RPA Implementation",
    title: "卸売業B社：受発注業務の自動化",
    result: "月40時間の業務削減に成功",
  },
  {
    id: "e5h18mnuqqae",
    image: "/images/works/CaseStudy-03.png",
    alt: "小売業C社：IT導入補助金を活用したPOSシステム刷新",
    category: "Subsidy Support",
    title: "小売業C社：IT導入補助金を活用したPOSシステム刷新",
    result: "補助率2/3での導入を実現",
  },
  {
    id: "4287zarb6d",
    image: "/images/works/CaseStudy-04.png",
    alt: "サービス業D社：ペーパーレス化とクラウド移行",
    category: "DX Promotion",
    title: "サービス業D社：ペーパーレス化とクラウド移行",
    result: "働き方改革と業務効率化を同時達成",
  },
];

export default function Works() {
  return (
    <section className="section works" id="works">
      <div className="section-inner">
        <header className="section-header">
          <div className="section-label">Projects</div>
          <h2 className="section-title">
            支援実績
            <span className="section-title-en">Our works</span>
          </h2>
        </header>

        <div className="works-grid">
          {works.map((work) => (
            <Link href={`/blog/${work.id}`} key={work.id} className="work-card-link">
              <article className="work-card">
                <div className="work-image">
                  <div className="work-image-inner">
                    <Image
                      src={work.image}
                      alt={work.alt}
                      fill
                      sizes="(max-width: 768px) 100vw, 450px"
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                </div>
                <div className="work-category">{work.category}</div>
                <h3>{work.title}</h3>
                <p className="work-result">{work.result}</p>
              </article>
            </Link>
          ))}
        </div>

        <div className="works-more">
          <Link href="/blog" className="btn-outline">View All Works</Link>
        </div>
      </div>
    </section>
  );
}
