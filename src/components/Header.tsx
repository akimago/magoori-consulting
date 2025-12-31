import Link from "next/link";

export default function Header() {
  return (
    <header className="header">
      <Link href="/" className="logo">
        <div className="logo-symbol">
          <svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="18" cy="18" r="17" stroke="white" strokeWidth="1" opacity="0.6"/>
            <circle cx="18" cy="18" r="4" fill="white" opacity="0.8"/>
            <circle cx="18" cy="6" r="2" fill="white" opacity="0.4"/>
            <circle cx="28" cy="13" r="2" fill="white" opacity="0.4"/>
            <circle cx="28" cy="23" r="2" fill="white" opacity="0.4"/>
            <circle cx="18" cy="30" r="2" fill="white" opacity="0.4"/>
            <circle cx="8" cy="23" r="2" fill="white" opacity="0.4"/>
            <circle cx="8" cy="13" r="2" fill="white" opacity="0.4"/>
          </svg>
        </div>
        <div className="logo-text">
          馬郡コンサルティング
          <span className="logo-text-en">Magoori Consulting</span>
        </div>
      </Link>
      <nav className="nav">
        <Link href="/#about" className="nav-link">About</Link>
        <Link href="/#services" className="nav-link">Services</Link>
        <Link href="/#works" className="nav-link">Works</Link>
        <Link href="/blog" className="nav-link">Blog</Link>
        <Link href="/contact" className="nav-link">Contact</Link>
      </nav>
    </header>
  );
}
