export default function Hero() {
  return (
    <section className="hero">
      <div className="motif motif-circle-1"></div>
      <div className="motif motif-circle-2"></div>
      <div className="motif motif-circle-3"></div>
      <div className="motif motif-dot-1"></div>
      <div className="motif motif-dot-2"></div>
      <div className="motif motif-line-1"></div>
      <div className="motif motif-arc"></div>

      <div className="hero-content">
        <h1 className="hero-catch">
          何から始めればいい？<br />
          その悩みに、<span className="hero-catch-accent">寄り添う。</span>
        </h1>
        <p className="hero-sub">
          AI・IT導入の伴走支援。<br />
          大手通信会社で培った40年超の経験を、<br />
          地域の中小企業のために。
        </p>
      </div>

      <div className="scroll-indicator">
        <span className="scroll-text">Scroll</span>
        <div className="scroll-line"></div>
      </div>
    </section>
  );
}
