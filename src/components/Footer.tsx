import Link from "next/link";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-main">
          <div className="footer-brand">
            <div className="logo-text">
              馬郡コンサルティング
              <span className="logo-text-en">Magoori Consulting</span>
            </div>
            <p className="footer-desc">
              福岡県を拠点に、中小企業のAI活用・DX推進を伴走支援しています。
            </p>
          </div>

          <nav className="footer-nav">
            <h4>Menu</h4>
            <ul>
              <li><Link href="/#about">About</Link></li>
              <li><Link href="/#services">Services</Link></li>
              <li><Link href="/#works">Works</Link></li>
              <li><Link href="/blog">Blog</Link></li>
              <li><Link href="/contact">Contact</Link></li>
            </ul>
          </nav>

          <nav className="footer-nav">
            <h4>Follow</h4>
            <ul>
              <li><a href="#" target="_blank" rel="noopener noreferrer">X (Twitter)</a></li>
              <li><a href="#" target="_blank" rel="noopener noreferrer">note</a></li>
            </ul>
          </nav>
        </div>

        <div className="footer-bottom">
          <p className="footer-copyright">&copy; 2024 Magoori Consulting. All rights reserved.</p>
          <div className="footer-links">
            <Link href="#">Privacy Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
