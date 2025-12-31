export default function Services() {
  return (
    <section className="section services" id="services">
      <div className="section-inner">
        <header className="section-header">
          <div className="section-label">Service</div>
          <h2 className="section-title">
            ご提供サービス
            <span className="section-title-en">What we offer</span>
          </h2>
        </header>

        <div className="services-grid">
          <article className="service-card">
            <div className="service-number">Service 01</div>
            <h3>AI活用<br />コンサルティング</h3>
            <p>ChatGPTなどの生成AIを業務でどう活かすか。導入計画の策定から社内研修、定着支援まで一貫してサポートします。</p>
          </article>

          <article className="service-card">
            <div className="service-number">Service 02</div>
            <h3>DX・RPA<br />導入支援</h3>
            <p>業務プロセスの可視化から、最適なツールの選定、導入、そして現場への定着まで。段階的に自動化を進めます。</p>
          </article>

          <article className="service-card">
            <div className="service-number">Service 03</div>
            <h3>補助金申請<br />サポート</h3>
            <p>IT導入補助金、ものづくり補助金など、活用可能な制度をご提案。申請書作成から採択後の報告まで支援します。</p>
          </article>
        </div>
      </div>
    </section>
  );
}
