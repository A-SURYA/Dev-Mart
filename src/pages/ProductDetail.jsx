import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Star, Download, ShoppingCart, Heart, ArrowLeft, Check, Package, RefreshCw, Headphones, ExternalLink } from "lucide-react";
import { products } from "../data/products";
import ProductCard from "../components/ProductCard";

const reviews = [
  { name: "Alex Chen", avatar: "AC", rating: 5, date: "2 weeks ago", comment: "Absolutely stunning quality. The components are well-organized and the documentation is clear. Worth every penny." },
  { name: "Sarah D.", avatar: "SD", rating: 5, date: "1 month ago", comment: "This saved me days of work. The design system is cohesive and the Figma file is incredibly well structured." },
  { name: "Marco R.", avatar: "MR", rating: 4, date: "1 month ago", comment: "Great kit overall. Would love more dark mode variants but the existing ones are beautiful. Will buy again." },
];

export default function ProductDetail() {
  const { id } = useParams();
  const product = products.find((p) => p.id === parseInt(id)) || products[0];
  const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);

  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Back */}
      <Link to="/browse" className="inline-flex items-center gap-2 text-sm text-ink-400 hover:text-ink-900 transition-colors mb-8 group">
        <ArrowLeft size={15} className="group-hover:-translate-x-1 transition-transform" />
        Back to Browse
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
        {/* Left: Preview & Info */}
        <div className="lg:col-span-3">
          {/* Preview */}
          <div className={`relative rounded-2xl overflow-hidden bg-gradient-to-br ${product.gradient} mb-6 h-80`}>
            <img src={product.preview} alt={product.name} className="w-full h-full object-cover opacity-70" />
            {product.badge && (
              <span className="absolute top-4 left-4 px-3 py-1 bg-accent text-ink-900 text-xs font-bold rounded-full">
                {product.badge}
              </span>
            )}
          </div>

          {/* Tabs */}
          <div className="border-b border-ink-200 mb-6">
            <div className="flex gap-6">
              {["Overview", "Reviews", "Changelog"].map((tab, i) => (
                <button key={tab} className={`pb-3 text-sm font-medium border-b-2 transition-colors ${i === 0 ? "border-ink-900 text-ink-900" : "border-transparent text-ink-400 hover:text-ink-700"}`}>
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Description */}
          <div className="mb-8">
            <h3 className="font-semibold text-ink-900 mb-3">About this product</h3>
            <p className="text-sm text-ink-500 leading-relaxed mb-4">{product.description}</p>
            <p className="text-sm text-ink-500 leading-relaxed">
              Designed with pixel-perfect precision, every component follows a consistent grid system and spacing scale. All variants are included in both Figma and code formats, making it easy to hand off to your development team.
            </p>
          </div>

          {/* What's Included */}
          <div className="bg-ink-50 rounded-2xl p-6 mb-8">
            <h3 className="font-semibold text-ink-900 mb-4">What's Included</h3>
            <div className="grid grid-cols-2 gap-2.5">
              {[
                "400+ UI Components", "Light & Dark Mode", "Design Tokens", "Figma Source File",
                "React Code", "Documentation", "Lifetime Updates", "Commercial License",
              ].map((item) => (
                <div key={item} className="flex items-center gap-2 text-sm text-ink-600">
                  <div className="w-5 h-5 bg-accent rounded-full flex items-center justify-center shrink-0">
                    <Check size={11} className="text-ink-900" />
                  </div>
                  {item}
                </div>
              ))}
            </div>
          </div>

          {/* Reviews */}
          <div>
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-semibold text-ink-900">Customer Reviews</h3>
              <div className="flex items-center gap-1.5">
                <Star size={14} className="fill-amber-400 text-amber-400" />
                <span className="font-bold text-ink-900">{product.rating}</span>
                <span className="text-sm text-ink-400">({product.reviews} reviews)</span>
              </div>
            </div>
            <div className="space-y-4">
              {reviews.map((r) => (
                <div key={r.name} className="p-4 bg-white border border-ink-200 rounded-xl">
                  <div className="flex items-start gap-3 mb-2">
                    <div className="w-8 h-8 rounded-full bg-ink-900 flex items-center justify-center text-white text-xs font-bold shrink-0">
                      {r.avatar}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-ink-900">{r.name}</span>
                        <span className="text-xs text-ink-400">{r.date}</span>
                      </div>
                      <div className="flex gap-0.5 mt-0.5">
                        {Array.from({ length: r.rating }).map((_, i) => (
                          <Star key={i} size={11} className="fill-amber-400 text-amber-400" />
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-ink-500 leading-relaxed">{r.comment}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Purchase Card */}
        <div className="lg:col-span-2">
          <div className="sticky top-24">
            <div className="bg-white border border-ink-200 rounded-2xl p-6 mb-4">
              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 mb-3">
                {product.tags.map((t) => (
                  <span key={t} className="text-xs font-mono text-ink-400 bg-ink-50 border border-ink-200 px-2 py-0.5 rounded-md">{t}</span>
                ))}
              </div>

              <h1 className="font-display font-bold text-2xl text-ink-900 mb-1">{product.name}</h1>
              <p className="text-sm text-ink-400 mb-4">by {product.seller}</p>

              {/* Stats row */}
              <div className="flex items-center gap-4 pb-4 border-b border-ink-100 mb-4">
                <div className="flex items-center gap-1.5">
                  <Star size={13} className="fill-amber-400 text-amber-400" />
                  <span className="text-sm font-semibold text-ink-900">{product.rating}</span>
                  <span className="text-xs text-ink-400">({product.reviews})</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Download size={13} className="text-ink-400" />
                  <span className="text-sm text-ink-600">{product.downloads.toLocaleString()} downloads</span>
                </div>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-2 mb-5">
                <span className="font-display font-black text-4xl text-ink-900">${product.price}</span>
                {product.originalPrice && (
                  <span className="text-lg text-ink-400 line-through">${product.originalPrice}</span>
                )}
                {product.originalPrice && (
                  <span className="text-sm font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                    Save ${product.originalPrice - product.price}
                  </span>
                )}
              </div>

              {/* CTAs */}
              <button
                onClick={handleAdd}
                className={`w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-semibold text-sm transition-all duration-200 mb-3 ${
                  added ? "bg-emerald-500 text-white" : "bg-ink-900 text-white hover:bg-accent hover:text-ink-900"
                }`}
              >
                {added ? <><Check size={16} /> Added to Cart!</> : <><ShoppingCart size={16} /> Add to Cart</>}
              </button>
              <button className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border border-ink-200 text-sm font-medium text-ink-600 hover:bg-ink-50 transition-colors">
                <Heart size={15} /> Save to Wishlist
              </button>
            </div>

            {/* Guarantees */}
            <div className="bg-ink-50 rounded-2xl p-5 space-y-3">
              {[
                { icon: Package, text: "Instant digital delivery" },
                { icon: RefreshCw, text: "Lifetime updates included" },
                { icon: Headphones, text: "Dedicated support channel" },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-2.5 text-sm text-ink-600">
                  <Icon size={15} className="text-ink-400 shrink-0" />
                  {text}
                </div>
              ))}
            </div>

            {/* Seller card */}
            <div className="mt-4 bg-white border border-ink-200 rounded-2xl p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-ink-900 flex items-center justify-center text-white text-sm font-bold">
                  {product.sellerAvatar}
                </div>
                <div>
                  <p className="text-sm font-semibold text-ink-900">{product.seller}</p>
                  <p className="text-xs text-ink-400">Verified Creator</p>
                </div>
              </div>
              <a href="#" className="flex items-center gap-1 text-xs text-ink-400 hover:text-ink-700 transition-colors">
                Profile <ExternalLink size={11} />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <div className="mt-16">
          <h2 className="font-display font-bold text-2xl text-ink-900 mb-6">Related Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {related.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
          </div>
        </div>
      )}
    </div>
  );
}
