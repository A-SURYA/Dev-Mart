import { Link } from "react-router-dom";
import { Zap, Globe, Share2, ExternalLink } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-ink-900 text-ink-300 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
                <Zap size={16} className="text-ink-900" />
              </div>
              <span className="font-display font-bold text-xl text-white">
                Dev<span className="text-ink-400">Mart</span>
              </span>
            </Link>
            <p className="text-sm text-ink-400 leading-relaxed">
              The marketplace for premium digital products. Built by developers, for developers.
            </p>
            <div className="flex gap-3 mt-5">
              {[Globe, Share2, ExternalLink].map((Icon, i) => (
                <a key={i} href="#" className="w-8 h-8 rounded-lg bg-ink-800 flex items-center justify-center hover:bg-accent hover:text-ink-900 transition-all duration-200 text-ink-400">
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {[
            { title: "Marketplace", links: ["Browse All", "UI Kits", "Templates", "Icon Sets", "Fonts", "Dev Tools"] },
            { title: "Sellers", links: ["Start Selling", "Dashboard", "Pricing", "Upload Guide", "Payouts"] },
            { title: "Company", links: ["About Us", "Blog", "Careers", "Press Kit", "Contact"] },
          ].map((col) => (
            <div key={col.title}>
              <h4 className="text-white font-semibold text-sm mb-4">{col.title}</h4>
              <ul className="space-y-2.5">
                {col.links.map((l) => (
                  <li key={l}>
                    <a href="#" className="text-sm text-ink-400 hover:text-white transition-colors">{l}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-ink-800 pt-6 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-xs text-ink-500">© 2024 DevMart. All rights reserved.</p>
          <div className="flex gap-5">
            {["Privacy Policy", "Terms of Service", "Cookie Policy"].map((l) => (
              <a key={l} href="#" className="text-xs text-ink-500 hover:text-ink-300 transition-colors">{l}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
