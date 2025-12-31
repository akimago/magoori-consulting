export default function Flow() {
  return (
    <section className="section flow">
      <div className="section-inner">
        <header className="section-header">
          <div className="section-label">Flow</div>
          <h2 className="section-title">
            ご支援の流れ
            <span className="section-title-en">How we work</span>
          </h2>
        </header>

        <div className="flow-grid">
          <article className="flow-item">
            <div className="flow-number">01</div>
            <h3>無料相談<br />ヒアリング</h3>
            <p>現状の課題やお悩みをじっくりお聞きします。オンライン・対面どちらでも対応可能です。</p>
            <div className="flow-arrow"></div>
          </article>

          <article className="flow-item">
            <div className="flow-number">02</div>
            <h3>課題整理<br />ご提案</h3>
            <p>優先順位と具体的な解決策をご提案。費用対効果も含めてわかりやすくご説明します。</p>
            <div className="flow-arrow"></div>
          </article>

          <article className="flow-item">
            <div className="flow-number">03</div>
            <h3>伴走支援<br />開始</h3>
            <p>計画に沿って一緒に取り組みます。進捗確認と軌道修正を繰り返しながら進めます。</p>
            <div className="flow-arrow"></div>
          </article>

          <article className="flow-item">
            <div className="flow-number">04</div>
            <h3>効果検証<br />次のステップ</h3>
            <p>導入効果を振り返り、次のDXステップをご提案。継続的な改善を支援します。</p>
          </article>
        </div>
      </div>
    </section>
  );
}
