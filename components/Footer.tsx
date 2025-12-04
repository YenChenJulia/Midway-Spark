export default function Footer() {
  return (
    <footer className="relative border-t border-accent-clay/20 bg-soft-sand overflow-hidden">
      {/* 曼陀羅背景裝飾 */}
      <div className="absolute right-0 bottom-0 w-80 h-80 opacity-5 -mb-40 -mr-40">
        <svg viewBox="0 0 100 100" className="text-accent-mauve">
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.5"
          />
          <circle
            cx="50"
            cy="50"
            r="35"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.5"
          />
          <circle
            cx="50"
            cy="50"
            r="25"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.5"
          />
          <circle
            cx="50"
            cy="50"
            r="15"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.5"
          />
          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
            <line
              key={angle}
              x1="50"
              y1="50"
              x2={50 + 45 * Math.cos((angle * Math.PI) / 180)}
              y2={50 + 45 * Math.sin((angle * Math.PI) / 180)}
              stroke="currentColor"
              strokeWidth="0.3"
            />
          ))}
        </svg>
      </div>

      <div className="container mx-auto px-4 py-12 max-w-6xl relative z-10">
        <div className="text-center space-y-3">
          <h3 className="text-lg font-light text-charcoal-dark">半山輕語</h3>
          <p className="text-xs text-charcoal-light font-serif italic">
            Midway Spark
          </p>
          <p className="text-sm text-charcoal font-light max-w-md mx-auto">
            在半途中溫柔對話，捕捉每一道內在靈光
          </p>
          <div className="pt-4 text-xs text-charcoal-light">
            © {new Date().getFullYear()} 半山輕語. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
