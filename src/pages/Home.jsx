import { Link } from "react-router-dom";
import { ArrowRight, Zap, Shield, Package, TrendingUp, Star, Download } from "lucide-react";
import ProductCard from "../components/ProductCard";
import { products, categories } from "../data/products";

const stats = [
  { value: "12,000+", label: "Digital Products" },
  { value: "4,800+", label: "Creators" },
  { value: "150K+", label: "Downloads" },
  { value: "4.8★", label: "Avg. Rating" },
];

const features = [
  { icon: Zap, title: "Instant Download", desc: "Get your files immediately after purchase. No waiting." },
  { icon: Shield, title: "Quality Assured", desc: "Every product is reviewed before listing on DevMart." },
  { icon: Package, title: "Lifetime Access", desc: "Buy once, download forever. Includes future updates." },
  { icon: TrendingUp, title: "Sell Your Work", desc: "Join thousands of creators earning passive income." },
];

export default function Home() {
  const featured = products.filter((p) => p.badge).slice(0, 4);
  const trending = products.filter((p) => p.downloads > 1500).slice(0, 4);

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-ink-50">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-accent/10 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-ink-200/40 rounded-full blur-3xl -translate-x-1/3 translate-y-1/3" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24">
          <div className="max-w-3xl">
            {/* Pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white border border-ink-200 rounded-full text-sm text-ink-500 mb-6 animate-fade-up opacity-0" style={{ animationFillMode: "forwards" }}>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              New: 48 products added this week
            </div>

            <h1 className="font-display font-black text-5xl md:text-7xl text-ink-900 leading-[1.05] mb-6 animate-fade-up opacity-0 animate-delay-100" style={{ animationFillMode: "forwards" }}>
              The Marketplace for{" "}
              <span className="relative inline-block">
                Digital
                <span className="absolute -bottom-1 left-0 right-0 h-3 bg-accent/40 -z-10 rounded" />
              </span>{" "}
              Products
            </h1>

            <p className="text-lg text-ink-400 mb-8 leading-relaxed max-w-2xl animate-fade-up opacity-0 animate-delay-200" style={{ animationFillMode: "forwards" }}>
              Discover UI kits, templates, icon sets, fonts, and developer tools crafted by the world's best designers and developers.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 animate-fade-up opacity-0 animate-delay-300" style={{ animationFillMode: "forwards" }}>
              <Link
                to="/browse"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-ink-900 text-ink-50 rounded-xl font-semibold hover:bg-ink-700 transition-all duration-200 group"
              >
                Explore Products
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/dashboard"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-white border border-ink-200 text-ink-700 rounded-xl font-semibold hover:border-ink-400 hover:bg-ink-50 transition-all duration-200"
              >
                Start Selling
              </Link>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 animate-fade-up opacity-0 animate-delay-400" style={{ animationFillMode: "forwards" }}>
            {stats.map((s) => (
              <div key={s.label} className="bg-white border border-ink-200 rounded-xl p-4">
                <div className="font-display font-bold text-2xl text-ink-900">{s.value}</div>
                <div className="text-sm text-ink-400 mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="bg-white border-y border-ink-200 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-3 overflow-x-auto pb-1 scrollbar-hide">
            {categories.slice(1).map((cat) => (
              <Link
                key={cat.id}
                to={`/browse?cat=${cat.id}`}
                className="shrink-0 px-4 py-2 bg-ink-50 border border-ink-200 rounded-lg text-sm font-medium text-ink-600 hover:bg-ink-900 hover:text-white hover:border-ink-900 transition-all duration-200"
              >
                {cat.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="text-xs font-mono text-ink-400 uppercase tracking-widest mb-2">Handpicked</p>
            <h2 className="font-display font-bold text-3xl text-ink-900">Featured Products</h2>
          </div>
          <Link to="/browse" className="flex items-center gap-1 text-sm font-medium text-ink-500 hover:text-ink-900 transition-colors group">
            View all <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {featured.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
        </div>
      </section>

      {/* Features */}
      <section className="bg-ink-900 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-display font-bold text-3xl text-white mb-3">Why DevMart?</h2>
            <p className="text-ink-400 text-sm max-w-lg mx-auto">Everything you need to buy premium digital resources or start your creator journey.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {features.map((f, i) => (
              <div key={f.title} className="p-6 bg-ink-800 rounded-2xl border border-ink-700 hover:border-accent/50 transition-colors duration-300">
                <div className="w-10 h-10 bg-accent rounded-xl flex items-center justify-center mb-4">
                  <f.icon size={20} className="text-ink-900" />
                </div>
                <h3 className="font-semibold text-white mb-2">{f.title}</h3>
                <p className="text-sm text-ink-400 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trending */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="text-xs font-mono text-ink-400 uppercase tracking-widest mb-2">Most Downloaded</p>
            <h2 className="font-display font-bold text-3xl text-ink-900">Trending Now</h2>
          </div>
          <Link to="/browse" className="flex items-center gap-1 text-sm font-medium text-ink-500 hover:text-ink-900 transition-colors group">
            View all <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {trending.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
        </div>
      </section>

      {/* CTA Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="relative overflow-hidden bg-accent rounded-3xl p-10 md:p-14">
          <div className="absolute right-0 top-0 w-96 h-96 bg-white/10 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3 pointer-events-none" />
          <div className="relative max-w-lg">
            <h2 className="font-display font-black text-4xl text-ink-900 mb-3">
              Start Selling Your Work Today
            </h2>
            <p className="text-ink-700 mb-6 leading-relaxed">
              Join 4,800+ creators earning passive income on DevMart. Upload once, earn forever.
            </p>
            <Link
              to="/dashboard"
              className="inline-flex items-center gap-2 px-6 py-3 bg-ink-900 text-white rounded-xl font-semibold hover:bg-ink-700 transition-colors"
            >
              Open Seller Dashboard <ArrowRight size={17} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
