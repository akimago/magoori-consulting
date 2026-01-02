import Image from "next/image";

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
          <article className="work-card">
            <div className="work-image">
              <div className="work-image-inner">
                <Image
                  src="/images/works/CaseStudy-01.png"
                  alt="製造業A社：生成AIによる議事録作成の自動化"
                  fill
                  sizes="(max-width: 768px) 100vw, 450px"
                  style={{ objectFit: "cover" }}
                />
              </div>
            </div>
            <div className="work-category">AI Integration</div>
            <h3>製造業A社：生成AIによる議事録作成の自動化</h3>
            <p className="work-result">会議時間の30%削減を実現</p>
          </article>

          <article className="work-card">
            <div className="work-image">
              <div className="work-image-inner">
                <Image
                  src="/images/works/CaseStudy-02.png"
                  alt="卸売業B社：受発注業務の自動化"
                  fill
                  sizes="(max-width: 768px) 100vw, 450px"
                  style={{ objectFit: "cover" }}
                />
              </div>
            </div>
            <div className="work-category">RPA Implementation</div>
            <h3>卸売業B社：受発注業務の自動化</h3>
            <p className="work-result">月40時間の業務削減に成功</p>
          </article>

          <article className="work-card">
            <div className="work-image">
              <div className="work-image-inner">
                <Image
                  src="/images/works/CaseStudy-03.png"
                  alt="小売業C社：IT導入補助金を活用したPOSシステム刷新"
                  fill
                  sizes="(max-width: 768px) 100vw, 450px"
                  style={{ objectFit: "cover" }}
                />
              </div>
            </div>
            <div className="work-category">Subsidy Support</div>
            <h3>小売業C社：IT導入補助金を活用したPOSシステム刷新</h3>
            <p className="work-result">補助率2/3での導入を実現</p>
          </article>

          <article className="work-card">
            <div className="work-image">
              <div className="work-image-inner">
                <Image
                  src="/images/works/CaseStudy-04.png"
                  alt="サービス業D社：ペーパーレス化とクラウド移行"
                  fill
                  sizes="(max-width: 768px) 100vw, 450px"
                  style={{ objectFit: "cover" }}
                />
              </div>
            </div>
            <div className="work-category">DX Promotion</div>
            <h3>サービス業D社：ペーパーレス化とクラウド移行</h3>
            <p className="work-result">働き方改革と業務効率化を同時達成</p>
          </article>
        </div>

        <div className="works-more">
          <a href="#" className="btn-outline">View All Works</a>
        </div>
      </div>
    </section>
  );
}
