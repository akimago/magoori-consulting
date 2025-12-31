import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: "無料相談に申し込む | 馬郡コンサルティング",
  description: "AI活用・DX推進に関する無料相談のお申し込みはこちらから。お気軽にご相談ください。",
};

export default function ContactPage() {
  return (
    <>
      <Header />
      <main className="contact-page">
        <div className="contact-container">
          <header className="contact-header">
            <h1>無料相談に申し込む</h1>
            <p>
              「こんなこと聞いていいのかな」という小さな疑問でも構いません。<br />
              まずはお気軽にご相談ください。
            </p>
          </header>

          <form className="contact-form" action="https://formspree.io/f/mlgdrwak" method="POST">
            <div className="form-group">
              <label htmlFor="company">会社名</label>
              <input
                type="text"
                id="company"
                name="company"
                placeholder="株式会社〇〇"
              />
            </div>

            <div className="form-group">
              <label htmlFor="name">お名前 <span className="required">*</span></label>
              <input
                type="text"
                id="name"
                name="name"
                required
                placeholder="山田 太郎"
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">メールアドレス <span className="required">*</span></label>
              <input
                type="email"
                id="email"
                name="email"
                required
                placeholder="example@company.com"
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone">電話番号</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                placeholder="090-1234-5678"
              />
            </div>

            <div className="form-group">
              <label htmlFor="subject">ご相談内容 <span className="required">*</span></label>
              <select id="subject" name="subject" required>
                <option value="">選択してください</option>
                <option value="ai">AI活用コンサルティング</option>
                <option value="dx">DX・RPA導入支援</option>
                <option value="subsidy">補助金申請サポート</option>
                <option value="other">その他</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="message">お問い合わせ内容 <span className="required">*</span></label>
              <textarea
                id="message"
                name="message"
                rows={6}
                required
                placeholder="現在のお悩みや課題、ご質問などをご自由にお書きください。"
              ></textarea>
            </div>

            <div className="form-group">
              <label htmlFor="preferred">ご希望の連絡方法</label>
              <div className="radio-group">
                <label className="radio-label">
                  <input type="radio" name="preferred" value="email" defaultChecked />
                  <span>メール</span>
                </label>
                <label className="radio-label">
                  <input type="radio" name="preferred" value="phone" />
                  <span>電話</span>
                </label>
                <label className="radio-label">
                  <input type="radio" name="preferred" value="online" />
                  <span>オンライン面談</span>
                </label>
              </div>
            </div>

            <button type="submit" className="btn-submit">
              <span>送信する</span>
            </button>
          </form>

          <div className="contact-note">
            <p>※ 通常2営業日以内にご返信いたします。</p>
            <p>※ ご入力いただいた情報は、お問い合わせへの対応にのみ使用いたします。</p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
