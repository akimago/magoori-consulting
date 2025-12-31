import Image from "next/image";

export default function About() {
  return (
    <section className="section about" id="about">
      <div className="section-inner">
        <header className="section-header">
          <div className="section-label">About us</div>
          <h2 className="section-title">
            大企業の知見を、<br />
            地域のちからに。
            <span className="section-title-en">What we do</span>
          </h2>
        </header>

        <div className="about-content">
          <div className="about-image">
            <div className="about-image-main">
              <Image
                src="/images/magori-photo.jpg"
                alt="馬郡コンサルティング 代表"
                fill
                style={{ objectFit: "cover" }}
              />
            </div>
            <div className="about-image-frame"></div>
          </div>
          <div className="about-text">
            <h3>
              「わからない」を<br />
              そのままにしない。
            </h3>
            <p>
              大手通信会社で40年以上にわたり、大規模システム開発やプロジェクトマネジメントに携わってきました。数百人規模のプロジェクトを動かしてきた経験があります。
            </p>
            <p>
              その知見を活かし、今度は地域の中小企業のデジタル化をお手伝いしたい。「何から手をつければいいかわからない」「ITベンダーの言っていることがわからない」——そんな声に寄り添い、経営者の視点で最適な解決策を一緒に考えます。
            </p>
            <div className="credentials">
              <span className="credential">中小企業診断士</span>
              <span className="credential">ITコーディネータ</span>
              <span className="credential">システムアナリスト</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
