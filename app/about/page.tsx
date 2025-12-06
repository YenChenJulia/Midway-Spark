import Image from "next/image";

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
              `
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

      {/* 關於我文章區塊 - 預留 */}
      <section className="bg-white rounded-lg border border-accent-clay/20 p-8 md:p-12">
        <h2 className="text-2xl md:text-3xl font-light text-charcoal-dark mb-8 text-center">
          關於我
        </h2>

        {/* 預留文章內容區塊 */}
        <div className="prose prose-lg max-w-none text-charcoal-light space-y-6">
          <p className="italic text-center text-charcoal-light/60">
            文章內容準備中...
          </p>

          {/* 這裡將會是關於我的文章內容 */}
          {/* 可以包含多個段落、圖片等 */}
        </div>
      </section>
    </div>
  );
}
