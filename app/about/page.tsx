import Image from "next/image";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      {/* Banner 區塊 */}
      <div className="relative w-full h-[400px] md:h-[500px] mb-12">
        <div className="relative w-full h-full rounded-2xl overflow-hidden">
          <Image
            src="/about-banner.png"
            alt="關於我"
            fill
            className="object-cover"
            priority
          />
          {/* 四周霧化遮罩 - 使用漸層營造自然淡出效果 */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `
                linear-gradient(to bottom, rgba(250, 248, 245, 0.3) 0%, transparent 12%, transparent 88%, rgba(250, 248, 245, 0.4) 100%),
                linear-gradient(to right, rgba(250, 248, 245, 0.2) 0%, transparent 8%, transparent 92%, rgba(250, 248, 245, 0.2) 100%)
              `,
            }}
          ></div>
        </div>
      </div>

      {/* 前言詩句 */}
      <section className="text-center mb-16 space-y-6">
        <div className="relative inline-block">
          <div className="absolute inset-0 bg-gradient-to-r from-glow-soft via-glow-warm to-glow-gentle opacity-20 blur-xl"></div>
          <div className="relative text-xl md:text-2xl text-charcoal font-serif leading-relaxed whitespace-pre-line px-6">
            {`人生如爬山
仍在半路上
偶有迷茫時
輕語見微光`}
          </div>
        </div>

        <p className="text-lg text-charcoal-light font-serif italic pt-4">
          於是，我記錄下這些山上時光。
        </p>
      </section>

      {/* 關於我文章區塊 */}
      <section className="bg-white rounded-lg border border-accent-clay/20 p-8 md:p-12">
        <div className="prose prose-lg max-w-none text-charcoal space-y-8">
          {/* 我是嬿媜 */}
          <div>
            <h2 className="text-2xl md:text-3xl font-light text-charcoal-dark mb-6 flex items-center gap-3">
              <span className="text-3xl">🌱</span>
              <span>我是嬿媜</span>
            </h2>

            <div className="space-y-4 leading-relaxed">
              <p>
                我叫嬿媜，是爸爸為我取的名字。我很喜歡它，覺得帶著一種靜靜的氣質，所以一直以本名示人。
              </p>
              <p>
                雖然外表看起來柔柔冷冷，私底下其實有點傻大姐，喜歡醜萌的貼圖，偶爾會突然大笑發瘋，而最大的優點大概是永遠保持樂觀。
              </p>
              <p>
                37
                歲時，我離開朝九晚五的生活，為了尋找生活與工作的平衡，追求更大的自由。
                延續上一份工作對
                Excel的熱愛，我走進程式世界，如今三年過去，我仍在這條「無路之路」上摸索，但腳下的步伐越來越篤定。
              </p>
            </div>
          </div>

          {/* 半山輕語的兩個小房間 */}
          <div className="border-t border-accent-clay/10 pt-8">
            <h3 className="text-xl md:text-2xl font-light text-charcoal-dark mb-6 flex items-center gap-3">
              <span className="text-2xl">🏡</span>
              <span>半山輕語的兩個小房間</span>
            </h3>

            <div className="space-y-6">
              {/* 生活誌 */}
              <div className="bg-glow-soft/10 rounded-lg p-6">
                <h4 className="text-lg md:text-xl font-medium text-charcoal-dark mb-3 flex items-center gap-2">
                  <span className="text-xl">📘</span>
                  <span>生活誌</span>
                </h4>
                <div className="text-charcoal-light leading-relaxed space-y-2">
                  <p>記錄我們家的瑣碎與美好：</p>
                  <p>兩個兒子的童言童語、家庭日常、旅遊、還有我的育兒感想。</p>
                  <p>這是我想留下給孩子、也留給未來自己的日常光影。</p>
                </div>
              </div>

              {/* 思維室 */}
              <div className="bg-glow-warm/10 rounded-lg p-6">
                <h4 className="text-lg md:text-xl font-medium text-charcoal-dark mb-3 flex items-center gap-2">
                  <span className="text-xl">✨</span>
                  <span>思維室</span>
                </h4>
                <div className="text-charcoal-light leading-relaxed space-y-2">
                  <p>放著我的自我對話、閱讀心得與學習筆記。</p>
                  <p>我愛看書，也喜歡學有的沒的，這裡就是我腦袋的筆記本。</p>
                </div>
              </div>
            </div>
          </div>

          {/* 給停在這裡的你 */}
          <div className="border-t border-accent-clay/10 pt-8">
            <h3 className="text-xl md:text-2xl font-light text-charcoal-dark mb-6 flex items-center gap-3">
              <span className="text-2xl">☕</span>
              <span>給停在這裡的你</span>
            </h3>

            <div className="text-charcoal-light leading-relaxed space-y-4">
              <p>
                我把生活寫下，是為了送給未來的自己。
                <br />
                如果你也喜歡這種簡單的日常與心情，歡迎一起在半山腰歇歇腳。
              </p>

              <p className="font-medium text-charcoal">
                願這些山上時光，帶給你一點光。
              </p>

              <p className="pt-4 text-sm">
                想和我說說話？→{" "}
                <Link
                  href="/contact"
                  className="text-accent-moss hover:text-accent-moss/80 font-medium underline decoration-accent-moss/50 hover:decoration-accent-moss transition-all duration-300"
                >
                  聯絡我
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
