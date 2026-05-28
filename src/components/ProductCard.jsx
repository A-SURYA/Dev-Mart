import { useState } from "react";
import { Link } from "react-router-dom";
import { Star, Download, ShoppingCart, Heart } from "lucide-react";

const badgeStyles = {
  accent: "bg-accent text-ink-900",
  green: "bg-emerald-100 text-emerald-700",
  orange: "bg-orange-100 text-orange-700",
  red: "bg-red-100 text-red-600",
};

export default function ProductCard({ product, index = 0 }) {
  const [wishlisted, setWishlisted] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);

  const handleCart = (e) => {
    e.preventDefault();
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 1500);
  };

  const handleWishlist = (e) => {
    e.preventDefault();
    setWishlisted(!wishlisted);
  };

  return (
    <Link
      to={`/product/${product.id}`}
      className="group block bg-white rounded-2xl border border-ink-200 overflow-hidden hover:border-ink-400 hover:shadow-lg transition-all duration-300 animate-fade-up opacity-0"
      style={{ animationDelay: `${index * 60}ms`, animationFillMode: "forwards" }}
    >
      {/* Product Image / Preview */}
      <div className={`relative h-44 bg-gradient-to-br ${product.gradient} overflow-hidden`}>
        <img
          src={product.preview}
          alt={product.name}
          className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />

        {/* Badge */}
        {product.badge && (
          <span className={`absolute top-3 left-3 text-xs font-semibold px-2.5 py-1 rounded-full ${badgeStyles[product.badgeColor] || badgeStyles.accent}`}>
            {product.badge}
          </span>
        )}

        {/* Wishlist */}
        <button
          onClick={handleWishlist}
          className="absolute top-3 right-3 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 hover:scale-110"
        >
          <Heart
            size={14}
            className={wishlisted ? "fill-red-500 text-red-500" : "text-ink-500"}
          />
        </button>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Tags */}
        <div className="flex gap-1.5 mb-2 flex-wrap">
          {product.tags.slice(0, 2).map((tag) => (
            <span key={tag} className="text-xs text-ink-400 bg-ink-100 px-2 py-0.5 rounded-md font-mono">
              {tag}
            </span>
          ))}
        </div>

        <h3 className="font-semibold text-ink-900 mb-1 group-hover:text-ink-600 transition-colors">
          {product.name}
        </h3>
        <p className="text-xs text-ink-400 mb-3">by {product.seller}</p>

        {/* Rating & Downloads */}
        <div className="flex items-center gap-3 mb-3">
          <div className="flex items-center gap-1">
            <Star size={12} className="fill-amber-400 text-amber-400" />
            <span className="text-xs font-medium text-ink-700">{product.rating}</span>
            <span className="text-xs text-ink-400">({product.reviews})</span>
          </div>
          <div className="flex items-center gap-1">
            <Download size={12} className="text-ink-400" />
            <span className="text-xs text-ink-400">{product.downloads.toLocaleString()}</span>
          </div>
        </div>

        {/* Price & CTA */}
        <div className="flex items-center justify-between pt-3 border-t border-ink-100">
          <div className="flex items-baseline gap-1.5">
            <span className="text-lg font-bold text-ink-900">${product.price}</span>
            {product.originalPrice && (
              <span className="text-sm text-ink-400 line-through">${product.originalPrice}</span>
            )}
          </div>
          <button
            onClick={handleCart}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 ${
              addedToCart
                ? "bg-emerald-500 text-white"
                : "bg-ink-900 text-ink-50 hover:bg-accent hover:text-ink-900"
            }`}
          >
            <ShoppingCart size={13} />
            {addedToCart ? "Added!" : "Add to Cart"}
          </button>
        </div>
      </div>
    </Link>
  );
}
