import { useState } from "react";
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer,
} from "recharts";
import {
  DollarSign, Download, Package, ShoppingBag, TrendingUp,
  Plus, Edit2, Eye, Trash2, Star, MoreHorizontal, Upload,
  Bell, Settings, ChevronUp, ChevronDown,
} from "lucide-react";
import { dashboardStats, revenueData, sellerProducts, recentOrders } from "../data/products";

const StatCard = ({ icon: Icon, label, value, sub, trend, color = "ink" }) => (
  <div className="bg-white border border-ink-200 rounded-2xl p-5">
    <div className="flex items-start justify-between mb-3">
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
        color === "accent" ? "bg-accent" : "bg-ink-100"
      }`}>
        <Icon size={18} className={color === "accent" ? "text-ink-900" : "text-ink-600"} />
      </div>
      {trend !== undefined && (
        <div className={`flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full ${
          trend >= 0 ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-500"
        }`}>
          {trend >= 0 ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
          {Math.abs(trend)}%
        </div>
      )}
    </div>
    <div className="font-display font-black text-2xl text-ink-900">{value}</div>
    <div className="text-sm text-ink-400 mt-0.5">{label}</div>
    {sub && <div className="text-xs text-ink-300 mt-1">{sub}</div>}
  </div>
);

const statusStyles = {
  active: "bg-emerald-50 text-emerald-600",
  draft: "bg-ink-100 text-ink-500",
  completed: "bg-emerald-50 text-emerald-600",
  refunded: "bg-red-50 text-red-500",
};

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-ink-900 text-white rounded-xl px-4 py-3 text-xs shadow-xl">
        <p className="font-semibold mb-1">{label}</p>
        {payload.map((p) => (
          <p key={p.dataKey} className="text-ink-300">
            {p.dataKey === "revenue" ? `$${p.value.toLocaleString()}` : `${p.value} downloads`}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [chartMode, setChartMode] = useState("revenue");

  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "products", label: "My Products" },
    { id: "orders", label: "Orders" },
    { id: "settings", label: "Settings" },
  ];

  return (
    <div className="min-h-screen bg-ink-50">
      {/* Dashboard Header */}
      <div className="bg-white border-b border-ink-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-5">
            <div>
              <h1 className="font-display font-bold text-2xl text-ink-900">Seller Dashboard</h1>
              <p className="text-sm text-ink-400 mt-0.5">Welcome back, PixelForge Studio 👋</p>
            </div>
            <div className="flex items-center gap-2">
              <button className="p-2 rounded-xl text-ink-400 hover:bg-ink-50 hover:text-ink-700 transition-colors relative">
                <Bell size={18} />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-accent rounded-full" />
              </button>
              <button className="p-2 rounded-xl text-ink-400 hover:bg-ink-50 hover:text-ink-700 transition-colors">
                <Settings size={18} />
              </button>
              <button
                onClick={() => setShowUploadModal(true)}
                className="flex items-center gap-2 px-4 py-2 bg-ink-900 text-white rounded-xl text-sm font-medium hover:bg-accent hover:text-ink-900 transition-all duration-200"
              >
                <Plus size={15} /> Upload Product
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-1 pb-0">
            {tabs.map((t) => (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id)}
                className={`px-4 py-2.5 text-sm font-medium border-b-2 transition-all duration-150 -mb-px ${
                  activeTab === t.id
                    ? "border-ink-900 text-ink-900"
                    : "border-transparent text-ink-400 hover:text-ink-700"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* OVERVIEW TAB */}
        {activeTab === "overview" && (
          <div className="space-y-6 animate-fade-in">
            {/* Stat Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <StatCard icon={DollarSign} label="Total Earnings" value={`$${dashboardStats.totalEarnings.toLocaleString()}`} sub="All time" color="accent" />
              <StatCard icon={TrendingUp} label="This Month" value={`$${dashboardStats.monthlyEarnings.toLocaleString()}`} trend={dashboardStats.monthlyGrowth} />
              <StatCard icon={Download} label="Total Downloads" value={dashboardStats.totalDownloads.toLocaleString()} trend={12} />
              <StatCard icon={Package} label="Active Products" value={dashboardStats.totalProducts} sub={`${dashboardStats.pendingOrders} orders pending`} />
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
              {/* Main Chart */}
              <div className="lg:col-span-2 bg-white border border-ink-200 rounded-2xl p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="font-semibold text-ink-900">Performance</h3>
                    <p className="text-xs text-ink-400 mt-0.5">Last 8 months</p>
                  </div>
                  <div className="flex gap-1.5">
                    {["revenue", "downloads"].map((m) => (
                      <button
                        key={m}
                        onClick={() => setChartMode(m)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all capitalize ${
                          chartMode === m ? "bg-ink-900 text-white" : "bg-ink-50 text-ink-500 hover:bg-ink-100"
                        }`}
                      >
                        {m}
                      </button>
                    ))}
                  </div>
                </div>
                <ResponsiveContainer width="100%" height={220}>
                  <AreaChart data={revenueData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#E8FF47" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#E8FF47" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#EFEFEB" vertical={false} />
                    <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#8C8C80" }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 11, fill: "#8C8C80" }} axisLine={false} tickLine={false} />
                    <Tooltip content={<CustomTooltip />} cursor={{ stroke: "#0D0D0D", strokeWidth: 1, strokeDasharray: "4 4" }} />
                    <Area
                      type="monotone"
                      dataKey={chartMode}
                      stroke="#0D0D0D"
                      strokeWidth={2}
                      fill="url(#colorGrad)"
                      dot={{ fill: "#E8FF47", stroke: "#0D0D0D", strokeWidth: 2, r: 4 }}
                      activeDot={{ r: 6, fill: "#E8FF47", stroke: "#0D0D0D" }}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              {/* Bar chart: per product */}
              <div className="bg-white border border-ink-200 rounded-2xl p-6">
                <h3 className="font-semibold text-ink-900 mb-1">Revenue by Product</h3>
                <p className="text-xs text-ink-400 mb-5">Top performers</p>
                <ResponsiveContainer width="100%" height={220}>
                  <BarChart
                    data={sellerProducts.filter((p) => p.status === "active")}
                    margin={{ top: 0, right: 0, left: -25, bottom: 0 }}
                    layout="vertical"
                  >
                    <XAxis type="number" tick={{ fontSize: 10, fill: "#8C8C80" }} axisLine={false} tickLine={false} />
                    <YAxis dataKey="name" type="category" tick={{ fontSize: 10, fill: "#8C8C80" }} axisLine={false} tickLine={false} width={70} />
                    <Tooltip
                      formatter={(v) => [`$${v.toLocaleString()}`, "Revenue"]}
                      contentStyle={{ borderRadius: 12, border: "1px solid #EFEFEB", fontSize: 12 }}
                    />
                    <Bar dataKey="revenue" fill="#E8FF47" radius={[0, 6, 6, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Recent Orders */}
            <div className="bg-white border border-ink-200 rounded-2xl overflow-hidden">
              <div className="flex items-center justify-between p-5 border-b border-ink-100">
                <h3 className="font-semibold text-ink-900">Recent Orders</h3>
                <button
                  onClick={() => setActiveTab("orders")}
                  className="text-xs text-ink-400 hover:text-ink-700 transition-colors font-medium"
                >
                  View all →
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-ink-50">
                      <th className="text-left px-5 py-3 text-xs font-semibold text-ink-400 uppercase tracking-wider">Order</th>
                      <th className="text-left px-5 py-3 text-xs font-semibold text-ink-400 uppercase tracking-wider">Product</th>
                      <th className="text-left px-5 py-3 text-xs font-semibold text-ink-400 uppercase tracking-wider hidden md:table-cell">Buyer</th>
                      <th className="text-left px-5 py-3 text-xs font-semibold text-ink-400 uppercase tracking-wider">Amount</th>
                      <th className="text-left px-5 py-3 text-xs font-semibold text-ink-400 uppercase tracking-wider">Status</th>
                      <th className="text-left px-5 py-3 text-xs font-semibold text-ink-400 uppercase tracking-wider hidden lg:table-cell">Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-ink-100">
                    {recentOrders.map((order) => (
                      <tr key={order.id} className="hover:bg-ink-50 transition-colors">
                        <td className="px-5 py-3.5 font-mono text-xs text-ink-500">{order.id}</td>
                        <td className="px-5 py-3.5 font-medium text-ink-900">{order.product}</td>
                        <td className="px-5 py-3.5 text-ink-400 hidden md:table-cell">{order.buyer}</td>
                        <td className="px-5 py-3.5 font-semibold text-ink-900">${order.amount}</td>
                        <td className="px-5 py-3.5">
                          <span className={`px-2.5 py-1 rounded-full text-xs font-medium capitalize ${statusStyles[order.status]}`}>
                            {order.status}
                          </span>
                        </td>
                        <td className="px-5 py-3.5 text-ink-400 text-xs hidden lg:table-cell">{order.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* PRODUCTS TAB */}
        {activeTab === "products" && (
          <div className="animate-fade-in">
            <div className="flex items-center justify-between mb-5">
              <p className="text-sm text-ink-500">{sellerProducts.length} products total</p>
              <button
                onClick={() => setShowUploadModal(true)}
                className="flex items-center gap-2 px-4 py-2 bg-ink-900 text-white rounded-xl text-sm font-medium hover:bg-accent hover:text-ink-900 transition-all"
              >
                <Plus size={14} /> Add Product
              </button>
            </div>
            <div className="bg-white border border-ink-200 rounded-2xl overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-ink-50 border-b border-ink-100">
                    <th className="text-left px-5 py-3 text-xs font-semibold text-ink-400 uppercase tracking-wider">Product</th>
                    <th className="text-left px-5 py-3 text-xs font-semibold text-ink-400 uppercase tracking-wider">Sales</th>
                    <th className="text-left px-5 py-3 text-xs font-semibold text-ink-400 uppercase tracking-wider">Revenue</th>
                    <th className="text-left px-5 py-3 text-xs font-semibold text-ink-400 uppercase tracking-wider">Rating</th>
                    <th className="text-left px-5 py-3 text-xs font-semibold text-ink-400 uppercase tracking-wider">Status</th>
                    <th className="text-right px-5 py-3 text-xs font-semibold text-ink-400 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-ink-100">
                  {sellerProducts.map((p) => (
                    <tr key={p.id} className="hover:bg-ink-50 transition-colors">
                      <td className="px-5 py-4 font-medium text-ink-900">{p.name}</td>
                      <td className="px-5 py-4 text-ink-600">{p.sales}</td>
                      <td className="px-5 py-4 font-semibold text-ink-900">${p.revenue.toLocaleString()}</td>
                      <td className="px-5 py-4">
                        {p.rating ? (
                          <div className="flex items-center gap-1">
                            <Star size={12} className="fill-amber-400 text-amber-400" />
                            <span className="text-ink-700 font-medium">{p.rating}</span>
                          </div>
                        ) : (
                          <span className="text-ink-300 text-xs">—</span>
                        )}
                      </td>
                      <td className="px-5 py-4">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-medium capitalize ${statusStyles[p.status]}`}>
                          {p.status}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <button className="p-1.5 text-ink-400 hover:text-ink-700 hover:bg-ink-100 rounded-lg transition-colors">
                            <Eye size={14} />
                          </button>
                          <button className="p-1.5 text-ink-400 hover:text-ink-700 hover:bg-ink-100 rounded-lg transition-colors">
                            <Edit2 size={14} />
                          </button>
                          <button className="p-1.5 text-ink-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ORDERS TAB */}
        {activeTab === "orders" && (
          <div className="animate-fade-in">
            <div className="bg-white border border-ink-200 rounded-2xl overflow-hidden">
              <div className="p-5 border-b border-ink-100 flex items-center justify-between">
                <h3 className="font-semibold text-ink-900">All Orders</h3>
                <span className="text-xs bg-ink-100 text-ink-500 px-2.5 py-1 rounded-full font-medium">{recentOrders.length} orders</span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-ink-50 border-b border-ink-100">
                      {["Order ID", "Product", "Buyer", "Amount", "Status", "Date"].map((h) => (
                        <th key={h} className="text-left px-5 py-3 text-xs font-semibold text-ink-400 uppercase tracking-wider">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-ink-100">
                    {recentOrders.map((order) => (
                      <tr key={order.id} className="hover:bg-ink-50 transition-colors">
                        <td className="px-5 py-4 font-mono text-xs text-ink-500">{order.id}</td>
                        <td className="px-5 py-4 font-medium text-ink-900">{order.product}</td>
                        <td className="px-5 py-4 text-ink-500">{order.buyer}</td>
                        <td className="px-5 py-4 font-semibold text-ink-900">${order.amount}</td>
                        <td className="px-5 py-4">
                          <span className={`px-2.5 py-1 rounded-full text-xs font-medium capitalize ${statusStyles[order.status]}`}>
                            {order.status}
                          </span>
                        </td>
                        <td className="px-5 py-4 text-ink-400 text-xs">{order.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* SETTINGS TAB */}
        {activeTab === "settings" && (
          <div className="max-w-2xl animate-fade-in space-y-5">
            <div className="bg-white border border-ink-200 rounded-2xl p-6">
              <h3 className="font-semibold text-ink-900 mb-5">Seller Profile</h3>
              <div className="space-y-4">
                {[
                  { label: "Store Name", placeholder: "PixelForge Studio", type: "text" },
                  { label: "Email", placeholder: "hello@pixelforge.io", type: "email" },
                  { label: "Payout Email (PayPal)", placeholder: "payouts@pixelforge.io", type: "email" },
                  { label: "Store Bio", placeholder: "We create beautiful digital products...", type: "textarea" },
                ].map((f) => (
                  <div key={f.label}>
                    <label className="block text-xs font-semibold text-ink-600 mb-1.5">{f.label}</label>
                    {f.type === "textarea" ? (
                      <textarea
                        placeholder={f.placeholder}
                        rows={3}
                        className="w-full px-3.5 py-2.5 border border-ink-200 rounded-xl text-sm text-ink-900 placeholder:text-ink-300 focus:outline-none focus:border-ink-500 transition-colors resize-none"
                      />
                    ) : (
                      <input
                        type={f.type}
                        placeholder={f.placeholder}
                        className="w-full px-3.5 py-2.5 border border-ink-200 rounded-xl text-sm text-ink-900 placeholder:text-ink-300 focus:outline-none focus:border-ink-500 transition-colors"
                      />
                    )}
                  </div>
                ))}
                <button className="px-5 py-2.5 bg-ink-900 text-white rounded-xl text-sm font-medium hover:bg-ink-700 transition-colors">
                  Save Changes
                </button>
              </div>
            </div>

            <div className="bg-white border border-ink-200 rounded-2xl p-6">
              <h3 className="font-semibold text-ink-900 mb-4">Payout Settings</h3>
              <div className="grid grid-cols-3 gap-3">
                {["PayPal", "Stripe", "Bank Transfer"].map((method) => (
                  <div key={method} className={`p-3 border-2 rounded-xl text-center text-sm font-medium cursor-pointer transition-all ${method === "PayPal" ? "border-ink-900 bg-ink-50" : "border-ink-200 text-ink-400 hover:border-ink-400"}`}>
                    {method}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg p-6 shadow-2xl animate-fade-up">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display font-bold text-xl text-ink-900">Upload New Product</h2>
              <button onClick={() => setShowUploadModal(false)} className="w-8 h-8 rounded-lg bg-ink-100 text-ink-500 flex items-center justify-center hover:bg-ink-200 transition-colors text-lg leading-none">×</button>
            </div>

            <div className="space-y-4">
              {[
                { label: "Product Name", placeholder: "e.g. Premium UI Kit 2024", type: "text" },
                { label: "Price (USD)", placeholder: "29", type: "number" },
              ].map((f) => (
                <div key={f.label}>
                  <label className="block text-xs font-semibold text-ink-600 mb-1.5">{f.label}</label>
                  <input type={f.type} placeholder={f.placeholder} className="w-full px-3.5 py-2.5 border border-ink-200 rounded-xl text-sm text-ink-900 placeholder:text-ink-300 focus:outline-none focus:border-ink-500 transition-colors" />
                </div>
              ))}
              <div>
                <label className="block text-xs font-semibold text-ink-600 mb-1.5">Category</label>
                <select className="w-full px-3.5 py-2.5 border border-ink-200 rounded-xl text-sm text-ink-900 focus:outline-none focus:border-ink-500 transition-colors">
                  {["UI Kits", "Templates", "Icon Sets", "Fonts", "Dev Tools", "Motion"].map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-ink-600 mb-1.5">Description</label>
                <textarea rows={3} placeholder="Describe your product..." className="w-full px-3.5 py-2.5 border border-ink-200 rounded-xl text-sm text-ink-900 placeholder:text-ink-300 focus:outline-none focus:border-ink-500 transition-colors resize-none" />
              </div>
              <div className="border-2 border-dashed border-ink-200 rounded-xl p-6 text-center hover:border-ink-400 transition-colors cursor-pointer">
                <Upload size={22} className="mx-auto text-ink-300 mb-2" />
                <p className="text-sm text-ink-400">Drop your files here or <span className="text-ink-900 font-medium underline">browse</span></p>
                <p className="text-xs text-ink-300 mt-1">ZIP, PDF, Figma — max 500MB</p>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button onClick={() => setShowUploadModal(false)} className="flex-1 py-2.5 border border-ink-200 text-ink-600 rounded-xl text-sm font-medium hover:bg-ink-50 transition-colors">Cancel</button>
              <button className="flex-1 py-2.5 bg-ink-900 text-white rounded-xl text-sm font-medium hover:bg-accent hover:text-ink-900 transition-all">Publish Product</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
