export default function Thoughts() {
  return (
    <section className="section thoughts">
      <div className="section-inner">
        <header className="section-header">
          <div className="section-label">Our Thoughts</div>
          <h2 className="section-title">
            伴走支援で<br />
            大切にしていること
            <span className="section-title-en">Our philosophy</span>
          </h2>
        </header>

        <div className="thoughts-intro">
          <p>
            一度きりの提案で終わらせない。<br />
            実現するまで、一緒に歩み続けます。
          </p>
        </div>

        <div className="thoughts-list">
          <article className="thought-item">
            <div className="thought-number">01.</div>
            <div className="thought-content">
              <h3>
                小さく始めて、<br />
                成功体験を積み重ねる。
              </h3>
              <p>いきなり大きな投資をする必要はありません。まずは効果が見えやすい小さな取り組みから始め、成功体験を積み重ねることで、組織全体のDXへの理解と意欲を高めていきます。</p>
            </div>
          </article>

          <article className="thought-item">
            <div className="thought-number">02.</div>
            <div className="thought-content">
              <h3>
                経営者の言葉で、<br />
                わかりやすく伝える。
              </h3>
              <p>技術的な専門用語は使いません。「それで、うちの会社にとって何がいいの？」という経営者の問いに、明確な言葉でお答えします。ITベンダーとの橋渡し役としても機能します。</p>
            </div>
          </article>

          <article className="thought-item">
            <div className="thought-number">03.</div>
            <div className="thought-content">
              <h3>
                現場に寄り添い、<br />
                定着するまで支援する。
              </h3>
              <p>システムを入れて終わり、ではありません。現場で実際に使われ、効果が出るまで伴走します。うまくいかなければ一緒に軌道修正。本当の意味での「定着」を目指します。</p>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
