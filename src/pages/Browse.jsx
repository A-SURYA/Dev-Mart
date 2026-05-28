import { useState, useMemo } from "react";
import { Search, SlidersHorizontal, Grid2X2, List, X, ChevronDown } from "lucide-react";
import ProductCard from "../components/ProductCard";
import { products, categories } from "../data/products";

const sortOptions = [
  { value: "popular", label: "Most Popular" },
  { value: "newest", label: "Newest" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "rating", label: "Top Rated" },
];

const priceRanges = [
  { label: "All Prices", min: 0, max: Infinity },
  { label: "Under $20", min: 0, max: 20 },
  { label: "$20 – $50", min: 20, max: 50 },
  { label: "$50+", min: 50, max: Infinity },
];

export default function Browse() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("popular");
  const [priceRange, setPriceRange] = useState(0);
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    let list = [...products];

    if (activeCategory !== "all") {
      list = list.filter((p) => p.category === activeCategory);
    }

    if (search.trim()) {
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(search.toLowerCase()) ||
          p.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()))
      );
    }

    const { min, max } = priceRanges[priceRange];
    list = list.filter((p) => p.price >= min && p.price <= max);

    switch (sort) {
      case "price-asc": return list.sort((a, b) => a.price - b.price);
      case "price-desc": return list.sort((a, b) => b.price - a.price);
      case "rating": return list.sort((a, b) => b.rating - a.rating);
      case "newest": return list.sort((a, b) => b.id - a.id);
      default: return list.sort((a, b) => b.downloads - a.downloads);
    }
  }, [activeCategory, search, sort, priceRange]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-display font-bold text-4xl text-ink-900 mb-2">Browse Products</h1>
        <p className="text-ink-400">Discover {products.length} premium digital products</p>
      </div>

      {/* Search + Filters Bar */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        {/* Search */}
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-400" />
          <input
            type="text"
            placeholder="Search products, tools, templates..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-10 py-2.5 bg-white border border-ink-200 rounded-xl text-sm text-ink-900 placeholder:text-ink-400 focus:outline-none focus:border-ink-500 transition-colors"
          />
          {search && (
            <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-400 hover:text-ink-700">
              <X size={15} />
            </button>
          )}
        </div>

        {/* Sort */}
        <div className="relative">
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="appearance-none pl-4 pr-10 py-2.5 bg-white border border-ink-200 rounded-xl text-sm text-ink-700 focus:outline-none focus:border-ink-500 cursor-pointer"
          >
            {sortOptions.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
          <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-400 pointer-events-none" />
        </div>

        <button
          onClick={() => setShowFilters(!showFilters)}
          className={`flex items-center gap-2 px-4 py-2.5 border rounded-xl text-sm font-medium transition-all ${showFilters ? "bg-ink-900 text-white border-ink-900" : "bg-white text-ink-700 border-ink-200 hover:border-ink-400"}`}
        >
          <SlidersHorizontal size={15} />
          Filters
        </button>
      </div>

      {/* Filters Panel */}
      {showFilters && (
        <div className="bg-white border border-ink-200 rounded-2xl p-5 mb-6 animate-fade-in">
          <div className="flex flex-col sm:flex-row gap-6">
            <div>
              <p className="text-xs font-semibold text-ink-500 uppercase tracking-wider mb-3">Price Range</p>
              <div className="flex flex-wrap gap-2">
                {priceRanges.map((r, i) => (
                  <button
                    key={r.label}
                    onClick={() => setPriceRange(i)}
                    className={`px-3 py-1.5 rounded-lg text-sm transition-all ${priceRange === i ? "bg-ink-900 text-white" : "bg-ink-50 text-ink-600 hover:bg-ink-100"}`}
                  >
                    {r.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="flex gap-8">
        {/* Sidebar */}
        <aside className="hidden lg:block w-52 shrink-0">
          <p className="text-xs font-semibold text-ink-400 uppercase tracking-widest mb-3">Category</p>
          <div className="space-y-1">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all duration-150 ${
                  activeCategory === cat.id
                    ? "bg-ink-900 text-white font-medium"
                    : "text-ink-600 hover:bg-ink-100 hover:text-ink-900"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </aside>

        {/* Products Grid */}
        <div className="flex-1">
          {/* Mobile Category Pills */}
          <div className="flex gap-2 overflow-x-auto pb-3 mb-5 lg:hidden">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`shrink-0 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  activeCategory === cat.id ? "bg-ink-900 text-white" : "bg-white border border-ink-200 text-ink-600"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Results count */}
          <div className="flex items-center justify-between mb-5">
            <p className="text-sm text-ink-400">
              <span className="font-semibold text-ink-900">{filtered.length}</span> products found
            </p>
          </div>

          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
              {filtered.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="text-4xl mb-4">🔍</div>
              <h3 className="font-semibold text-ink-700 mb-2">No products found</h3>
              <p className="text-sm text-ink-400 mb-4">Try adjusting your filters or search terms.</p>
              <button
                onClick={() => { setSearch(""); setActiveCategory("all"); setPriceRange(0); }}
                className="px-4 py-2 bg-ink-900 text-white rounded-lg text-sm font-medium"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
