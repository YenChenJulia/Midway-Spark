export default function Footer() {
  return (
    <footer className="relative border-t border-accent-clay/20 bg-soft-sand/80">
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        <div className="text-center space-y-3">
          <h3 className="text-lg font-light text-charcoal-dark">半山輕語</h3>
          <p className="text-xs text-charcoal-light font-serif italic">
            Midway Spark
          </p>
          <p className="text-sm text-charcoal font-light max-w-md mx-auto">
            在半途中溫柔對話，捕捉每一道內在微光
          </p>
          <div className="pt-4 text-xs text-charcoal-light">
            © {new Date().getFullYear()} 半山輕語. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
