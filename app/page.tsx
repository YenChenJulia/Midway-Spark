export default function Home() {
  return (
    <div className="container mx-auto px-4 py-20 max-w-4xl">
      {/* Hero Section */}
      <section className="text-center space-y-6 mb-20">
        <h1 className="text-4xl md:text-5xl font-light text-charcoal-dark tracking-wide">
          半山輕語
        </h1>
        <p className="text-lg text-charcoal-light font-serif italic">
          Midway Spark
        </p>
        
        {/* 主標語 */}
        <div className="relative inline-block">
          <div className="absolute inset-0 bg-gradient-to-r from-glow-soft via-glow-warm to-glow-gentle opacity-20 blur-xl"></div>
          <p className="relative text-xl md:text-2xl text-charcoal font-light leading-relaxed px-6">
            在輕語中尋找微光<br className="md:hidden" />
            ，在微光中繼續前行
          </p>
        </div>

        <p className="text-charcoal-light max-w-2xl mx-auto leading-relaxed pt-6">
          在育兒與自我之間，在忙碌與靜心之間<br/>
          記錄每週的思考、生活的片段<br/>
          捕捉那些微小卻珍貴的光
        </p>
      </section>

      {/* 暫時的導航卡片 */}
      <section className="grid md:grid-cols-3 gap-6">
        {[
          { title: '生活誌', desc: '圖片與日常', href: '/journal' },
          { title: '思維室', desc: 'ORID 週記', href: '/thinking' },
          { title: '關於我', desc: '認識我', href: '/about' },
        ].map((item) => (
          <a
            key={item.title}
            href={item.href}
            className="group p-8 bg-white rounded-lg border border-accent-clay/20 hover:border-glow-gentle hover:shadow-lg hover:shadow-glow-warm/10 transition-all duration-300"
          >
            <h3 className="text-lg font-light text-charcoal-dark mb-2 group-hover:text-accent-rose transition-colors">
              {item.title}
            </h3>
            <p className="text-sm text-charcoal-light">
              {item.desc}
            </p>
          </a>
        ))}
      </section>
    </div>
  )
}