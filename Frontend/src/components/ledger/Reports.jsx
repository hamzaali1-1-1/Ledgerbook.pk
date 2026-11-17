import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Store, LayoutDashboard, ShoppingCart, Package, Users,
  TrendingUp, Wallet, Globe, LogOut, Award, AlertTriangle,
  BarChart3, DollarSign, ShieldCheck, ArrowUpRight, ArrowDownLeft, Clock
} from 'lucide-react';
import {
  ResponsiveContainer, LineChart, Line, BarChart, Bar, AreaChart, Area,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, Cell
} from 'recharts';

const Reports = () => {
  const [lang, setLang] = useState('en');
  const [activeTab, setActiveTab] = useState('sales'); // sales | products | top_buyers | udhar | cash
  const [timeRange, setTimeRange] = useState('30days'); // 15days | 30days | 60days | 90days | 1month
  const navigate = useNavigate();

  const currentShop = {
    shopId: 'SHOP-101',
    shopName: 'Grocery Hub',
    ownerName: 'Ali Hamza'
  };

  // 1. Time-Range Based Sales & Cash X-Y Axis Data
  const salesChartData = {
    '15days': [
      { day: 'Day 1', sales: 12000, cash: 9500, profit: 2400 },
      { day: 'Day 3', sales: 18500, cash: 14000, profit: 3700 },
      { day: 'Day 6', sales: 15000, cash: 11000, profit: 3000 },
      { day: 'Day 9', sales: 24000, cash: 19000, profit: 4800 },
      { day: 'Day 12', sales: 32000, cash: 25000, profit: 6400 },
      { day: 'Day 15', sales: 43500, cash: 31500, profit: 8700 },
    ],
    '30days': [
      { day: 'Week 1', sales: 68000, cash: 52000, profit: 13600 },
      { day: 'Week 2', sales: 79000, cash: 61000, profit: 15800 },
      { day: 'Week 3', sales: 74000, cash: 58000, profit: 14800 },
      { day: 'Week 4', sales: 89000, cash: 69000, profit: 17800 },
    ],
    '1month': [
      { day: 'Week 1', sales: 68000, cash: 52000, profit: 13600 },
      { day: 'Week 2', sales: 79000, cash: 61000, profit: 15800 },
      { day: 'Week 3', sales: 74000, cash: 58000, profit: 14800 },
      { day: 'Week 4', sales: 89000, cash: 69000, profit: 17800 },
    ],
    '60days': [
      { day: '1-15 Days', sales: 145000, cash: 112000, profit: 29000 },
      { day: '16-30 Days', sales: 165000, cash: 128000, profit: 33000 },
      { day: '31-45 Days', sales: 158000, cash: 120000, profit: 31600 },
      { day: '46-60 Days', sales: 172000, cash: 140000, profit: 34400 },
    ],
    '90days': [
      { day: 'Month 1', sales: 310000, cash: 240000, profit: 62000 },
      { day: 'Month 2', sales: 330000, cash: 260000, profit: 66000 },
      { day: 'Month 3', sales: 340000, cash: 250000, profit: 68000 },
    ],
  };

  const summaryStats = {
    '15days': { sales: 145000, cash: 110000, udhar: 35000, itemsSold: 320, remainingStock: 410, orders: 98 },
    '30days': { sales: 310000, cash: 240000, udhar: 70000, itemsSold: 750, remainingStock: 410, orders: 214 },
    '1month': { sales: 310000, cash: 240000, udhar: 70000, itemsSold: 750, remainingStock: 410, orders: 214 },
    '60days': { sales: 640000, cash: 500000, udhar: 140000, itemsSold: 1520, remainingStock: 410, orders: 435 },
    '90days': { sales: 980000, cash: 750000, udhar: 230000, itemsSold: 2300, remainingStock: 410, orders: 670 },
  };

  const currentSummary = summaryStats[timeRange];

  // 2. Product Sales & Stock X-Y Chart Data
  const productPerformanceData = [
    { name: 'Basmati Rice', sold: 240, remaining: 50, status: 'Fast' },
    { name: 'Dalda Oil 1L', sold: 195, remaining: 30, status: 'Fast' },
    { name: 'Sugar (Cheeni)', sold: 180, remaining: 80, status: 'Fast' },
    { name: 'Tapal Tea 250g', sold: 95, remaining: 25, status: 'Medium' },
    { name: 'Scented Soap', sold: 22, remaining: 65, status: 'Slow' },
    { name: 'Small Toothpaste', sold: 14, remaining: 48, status: 'Slow' },
  ];

  // 3. Top 5 Buying Customers
  const topBuyingCustomers = [
    { rank: 1, name: 'Muhammad Ali', phone: '0300-1234567', orders: 28, spent: 85000 },
    { rank: 2, name: 'Usman Traders', phone: '0321-9876543', orders: 19, spent: 64000 },
    { rank: 3, name: 'Bilal Ahmed', phone: '0333-5557788', orders: 15, spent: 45200 },
    { rank: 4, name: 'Rashid General', phone: '0302-4445566', orders: 12, spent: 38000 },
    { rank: 5, name: 'Tariq Mahmood', phone: '0312-9998877', orders: 10, spent: 29500 },
  ];

  // 4. Top 5 Udhar Customers
  const topUdharCustomers = [
    { rank: 1, name: 'Usman Traders', phone: '0321-9876543', udhar: 12500, daysPending: '12 Days' },
    { rank: 2, name: 'Rashid General', phone: '0302-4445566', udhar: 8300, daysPending: '19 Days' },
    { rank: 3, name: 'Muhammad Ali', phone: '0300-1234567', udhar: 4500, daysPending: '5 Days' },
    { rank: 4, name: 'Hamza Brothers', phone: '0305-1112233', udhar: 3200, daysPending: '8 Days' },
    { rank: 5, name: 'Nadeem Store', phone: '0315-7778899', udhar: 1500, daysPending: '3 Days' },
  ];

  // 5. Cashier Performance & Detailed Audit Logs
  const cashierStats = [
    { name: 'Ali Hamza (Owner)', bills: 124, totalSales: 195000, cashCollected: 155000 },
    { name: 'Zain Abbas (Cashier)', bills: 90, totalSales: 115000, cashCollected: 85000 },
  ];

  const staffActivityLogs = [
    { id: 101, time: 'Today, 06:45 PM', operator: 'Zain Abbas (Cashier)', role: 'Staff', action: 'Generated Bill #1048', customer: 'Muhammad Ali', amount: 3200, mode: 'Cash' },
    { id: 102, time: 'Today, 05:12 PM', operator: 'Ali Hamza (Owner)', role: 'Owner', action: 'Added New Product Stock', customer: 'Inventory', amount: 15000, mode: 'Stock In' },
    { id: 103, time: 'Today, 03:30 PM', operator: 'Zain Abbas (Cashier)', role: 'Staff', action: 'Generated Bill #1047', customer: 'Usman Traders', amount: 8400, mode: 'Khata (Udhar)' },
    { id: 104, time: 'Today, 01:15 PM', operator: 'Ali Hamza (Owner)', role: 'Owner', action: 'Generated Bill #1046', customer: 'Walk-in Customer', amount: 1250, mode: 'Cash' },
    { id: 105, time: 'Yesterday, 08:20 PM', operator: 'Zain Abbas (Cashier)', role: 'Staff', action: 'Collected Khata Payment', customer: 'Bilal Ahmed', amount: 5000, mode: 'Cash Received' },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex font-sans">
      
      {/* Sidebar */}
      <aside className="w-64 bg-gradient-to-t from-[#038317] to-[#03a527] text-white flex flex-col justify-between p-5 shadow-2xl shrink-0 hidden md:flex">
        <div>
          <div className="flex items-center gap-3 mb-5 px-2">
            <div className="w-10 h-10 bg-white text-[#038317] rounded-full flex items-center justify-center font-bold text-xl shadow">
              <Store size={22} />
            </div>
            <div>
              <h1 className="font-bold text-lg leading-tight">LedgerBook</h1>
              <p className="text-xs text-white/85"><span className="noto-nastaliq-urdu">ایڈوانسڈ رپورٹس</span></p>
            </div>
          </div>

          <div className="bg-white/15 border border-white/25 rounded-2xl p-3 mb-6 backdrop-blur-sm">
            <div className="flex items-center justify-between text-[11px] text-white/80">
              <span>ACTIVE SHOP</span>
              <span className="bg-white text-[#038317] font-bold px-2 py-0.5 rounded-full text-[10px]">
                {currentShop.shopId}
              </span>
            </div>
            <h2 className="font-bold text-base mt-1">{currentShop.shopName}</h2>
          </div>

          <nav className="space-y-2">
            <button
              onClick={() => navigate('/owner')}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-semibold text-sm text-white/90 hover:bg-white/10 transition-all cursor-pointer"
            >
              <LayoutDashboard size={18} />
              <span>Dashboard / <span className="noto-nastaliq-urdu text-xs">ڈیش بورڈ</span></span>
            </button>

            <button
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-semibold text-sm bg-white text-[#038317] shadow-md"
            >
              <BarChart3 size={18} />
              <span>Reports / <span className="noto-nastaliq-urdu text-xs">رپورٹس</span></span>
            </button>
          </nav>
        </div>

        <div className="pt-4 border-t border-white/20 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 bg-white text-[#038317] rounded-full flex items-center justify-center font-bold text-sm shadow">
              AH
            </div>
            <div className="overflow-hidden">
              <h4 className="font-bold text-sm truncate">{currentShop.ownerName}</h4>
              <p className="text-[11px] text-white/80 truncate">{currentShop.shopName}</p>
            </div>
          </div>
          <button onClick={() => navigate('/login')} className="p-2 bg-white/10 hover:bg-red-500 rounded-xl transition-all text-white cursor-pointer" title="Logout">
            <LogOut size={16} />
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        
        {/* Top Header */}
        <header className="bg-white border-b border-gray-200 px-6 lg:px-10 py-4 flex items-center justify-between shadow-sm sticky top-0 z-10">
          <div>
            <div className="flex items-center gap-2.5">
              <h2 className="text-xl font-bold text-[#038317]">Dukaan Analytics & Technical Reports</h2>
              <span className="text-xs font-bold bg-emerald-50 text-[#038317] px-2.5 py-0.5 rounded-full border border-[#038317]/20">
                {currentShop.shopId}
              </span>
            </div>
            <p className="text-xs text-gray-500">Har category par click karke X-Y axis graphs aur deep details dekhein.</p>
          </div>

          <button
            onClick={() => setLang(lang === 'en' ? 'ur' : 'en')}
            className="flex items-center gap-1.5 bg-white hover:bg-gradient-to-t hover:from-[#038317] hover:to-[#03a527] px-3.5 py-1.5 rounded-full shadow-sm cursor-pointer text-sm font-medium text-[#038317] hover:text-white transition-all border border-[#038317]/30"
          >
            <Globe size={16} />
            <span>{lang === 'en' ? 'اردو / English' : 'English / اردو'}</span>
          </button>
        </header>

        <div className="p-6 lg:p-10 space-y-6 max-w-7xl mx-auto w-full">
          
          {/* ================= 5 DEDICATED REPORT BUTTONS (TABS) ================= */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3 bg-white p-3 rounded-3xl border border-gray-200 shadow-sm">
            {[
              { id: 'sales', title: 'Total Sales', ur: 'کل فروخت', icon: TrendingUp },
              { id: 'products', title: 'Items & Stock', ur: 'اشیاء اور سٹاک', icon: Package },
              { id: 'top_buyers', title: 'Top 5 Buyers', ur: 'بہترین گاہک', icon: Award },
              { id: 'udhar', title: 'Top 5 Udhar', ur: 'ادھار کھاتہ', icon: Users },
              { id: 'cash', title: 'Cash & Staff', ur: 'نقد اور سٹاف', icon: Wallet },
            ].map((btn) => {
              const Icon = btn.icon;
              const isActive = activeTab === btn.id;
              return (
                <button
                  key={btn.id}
                  onClick={() => setActiveTab(btn.id)}
                  className={`p-3.5 rounded-2xl text-left transition-all cursor-pointer flex flex-col justify-between gap-2 border ${
                    isActive
                      ? 'bg-gradient-to-t from-[#038317] to-[#03a527] text-white border-transparent shadow-lg'
                      : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-emerald-50/60 hover:border-[#038317]/40'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <Icon size={18} className={isActive ? 'text-white' : 'text-[#038317]'} />
                    {isActive && <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>}
                  </div>
                  <div>
                    <p className="font-bold text-xs">{btn.title}</p>
                    <p className={`text-[11px] noto-nastaliq-urdu ${isActive ? 'text-white/90' : 'text-gray-400'}`}>
                      {btn.ur}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* ================= TIME FILTER BAR ================= */}
          {activeTab !== 'cash' && (
            <div className="bg-white px-6 py-3.5 rounded-2xl border border-gray-200 shadow-sm flex flex-wrap items-center justify-between gap-4">
              <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                Select Time Period (X-Axis Range):
              </span>
              <div className="flex flex-wrap gap-2">
                {[
                  { id: '15days', label: '15 Days' },
                  { id: '30days', label: '30 Days' },
                  { id: '1month', label: '1 Month' },
                  { id: '60days', label: '60 Days' },
                  { id: '90days', label: '90 Days' },
                ].map((range) => (
                  <button
                    key={range.id}
                    onClick={() => setTimeRange(range.id)}
                    className={`px-4 py-1.5 rounded-xl text-xs font-bold cursor-pointer transition-all ${
                      timeRange === range.id
                        ? 'bg-[#038317] text-white shadow'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {range.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* ===================================================================== */}
          {/* TAB 1: TOTAL SALES (X-Y LINE CHART + COLUMN CHART + FULL BREAKDOWN) */}
          {/* ===================================================================== */}
          {activeTab === 'sales' && (
            <div className="space-y-6">
              {/* Top 4 Deep Metric Cards */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
                <div className="bg-gradient-to-t from-[#038317] to-[#03a527] text-white p-5 rounded-3xl shadow-lg">
                  <p className="text-xs uppercase text-white/80 font-semibold">Total Revenue ({timeRange})</p>
                  <h3 className="text-2xl font-extrabold mt-1">Rs. {currentSummary.sales.toLocaleString()}</h3>
                  <p className="text-[11px] text-white/90 mt-1">Total Bills: {currentSummary.orders} Invoices</p>
                </div>
                <div className="bg-white p-5 rounded-3xl border border-gray-200 shadow-sm">
                  <p className="text-xs uppercase text-gray-500 font-semibold">Net Cash Received</p>
                  <h3 className="text-2xl font-extrabold text-[#038317] mt-1">Rs. {currentSummary.cash.toLocaleString()}</h3>
                  <p className="text-[11px] text-gray-400 mt-1">{Math.round((currentSummary.cash / currentSummary.sales) * 100)}% of Total Sales</p>
                </div>
                <div className="bg-white p-5 rounded-3xl border border-gray-200 shadow-sm">
                  <p className="text-xs uppercase text-gray-500 font-semibold">Credit / Udhar Sales</p>
                  <h3 className="text-2xl font-extrabold text-red-600 mt-1">Rs. {currentSummary.udhar.toLocaleString()}</h3>
                  <p className="text-[11px] text-gray-400 mt-1">{Math.round((currentSummary.udhar / currentSummary.sales) * 100)}% Added to Khata</p>
                </div>
                <div className="bg-white p-5 rounded-3xl border border-gray-200 shadow-sm">
                  <p className="text-xs uppercase text-gray-500 font-semibold">Avg Bill Value</p>
                  <h3 className="text-2xl font-extrabold text-gray-800 mt-1">
                    Rs. {Math.round(currentSummary.sales / currentSummary.orders).toLocaleString()}
                  </h3>
                  <p className="text-[11px] text-emerald-600 font-semibold mt-1">Per Customer Average</p>
                </div>
              </div>

              {/* X-to-Y Axis Real Charts Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Chart A: X-Y Line/Area Chart */}
                <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm">
                  <h3 className="font-bold text-gray-800 text-base mb-1">Sales Growth Curve (X-Y Line Chart)</h3>
                  <p className="text-xs text-gray-500 mb-4">X-Axis: Time Period • Y-Axis: Amount (Rs.)</p>
                  <div className="h-72 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={salesChartData[timeRange]}>
                        <defs>
                          <linearGradient id="salesGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#038317" stopOpacity={0.35} />
                            <stop offset="95%" stopColor="#038317" stopOpacity={0} />
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                        <XAxis dataKey="day" tick={{ fontSize: 12 }} />
                        <YAxis tick={{ fontSize: 12 }} />
                        <Tooltip formatter={(val) => `Rs. ${val.toLocaleString()}`} />
                        <Legend />
                        <Area type="monotone" dataKey="sales" name="Total Sales" stroke="#038317" strokeWidth={3} fill="url(#salesGrad)" />
                        <Line type="monotone" dataKey="profit" name="Est. Profit" stroke="#f59e0b" strokeWidth={2.5} />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Chart B: X-Y Column Chart (Sales vs Cash) */}
                <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm">
                  <h3 className="font-bold text-gray-800 text-base mb-1">Total Sales vs Cash Collected (Column Chart)</h3>
                  <p className="text-xs text-gray-500 mb-4">Comparison between billed amount and actual cash in hand</p>
                  <div className="h-72 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={salesChartData[timeRange]}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                        <XAxis dataKey="day" tick={{ fontSize: 12 }} />
                        <YAxis tick={{ fontSize: 12 }} />
                        <Tooltip formatter={(val) => `Rs. ${val.toLocaleString()}`} />
                        <Legend />
                        <Bar dataKey="sales" name="Total Sales" fill="#038317" radius={[6, 6, 0, 0]} />
                        <Bar dataKey="cash" name="Cash Received" fill="#34d399" radius={[6, 6, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ===================================================================== */}
          {/* TAB 2: ITEMS & STOCK (KITNEY SALE HUWEY, KITNEY REH GAYE, FAST/SLOW)  */}
          {/* ===================================================================== */}
          {activeTab === 'products' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div className="bg-white p-5 rounded-3xl border border-gray-200 shadow-sm">
                  <p className="text-xs uppercase text-gray-500 font-semibold">Total Products Sold</p>
                  <h3 className="text-2xl font-extrabold text-[#038317] mt-1">{currentSummary.itemsSold} Units</h3>
                  <p className="text-xs text-gray-400 mt-1">In selected {timeRange}</p>
                </div>
                <div className="bg-white p-5 rounded-3xl border border-gray-200 shadow-sm">
                  <p className="text-xs uppercase text-gray-500 font-semibold">Remaining Items in Stock</p>
                  <h3 className="text-2xl font-extrabold text-gray-800 mt-1">{currentSummary.remainingStock} Units</h3>
                  <p className="text-xs text-gray-400 mt-1">Available across all shelves</p>
                </div>
                <div className="bg-white p-5 rounded-3xl border border-gray-200 shadow-sm">
                  <p className="text-xs uppercase text-gray-500 font-semibold">Fast vs Slow Ratio</p>
                  <h3 className="text-2xl font-extrabold text-amber-600 mt-1">3 Fast / 2 Slow</h3>
                  <p className="text-xs text-gray-400 mt-1">Based on velocity tracking</p>
                </div>
              </div>

              {/* Product Sold vs Remaining Column Chart */}
              <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm">
                <h3 className="font-bold text-gray-800 text-base mb-1">Product Velocity: Sold vs Remaining Stock</h3>
                <p className="text-xs text-gray-500 mb-4">Kaunse items zyada sale hotey hain aur kaunse slow hain</p>
                <div className="h-72 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={productPerformanceData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                      <YAxis tick={{ fontSize: 12 }} />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="sold" name="Units Sold" fill="#038317" radius={[6, 6, 0, 0]} />
                      <Bar dataKey="remaining" name="Remaining Stock" fill="#94a3b8" radius={[6, 6, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Detailed Table */}
              <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gray-50 text-gray-500 text-xs uppercase border-b border-gray-200">
                      <th className="py-3 px-6">Product Name</th>
                      <th className="py-3 px-6">Units Sold</th>
                      <th className="py-3 px-6">Remaining Stock</th>
                      <th className="py-3 px-6">Demand Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 text-sm">
                    {productPerformanceData.map((p, idx) => (
                      <tr key={idx} className="hover:bg-gray-50">
                        <td className="py-3.5 px-6 font-bold text-gray-800">{p.name}</td>
                        <td className="py-3.5 px-6 font-semibold text-[#038317]">{p.sold} Sold</td>
                        <td className="py-3.5 px-6 text-gray-600">{p.remaining} Left</td>
                        <td className="py-3.5 px-6">
                          <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                            p.status === 'Fast' ? 'bg-emerald-50 text-[#038317]' :
                            p.status === 'Medium' ? 'bg-blue-50 text-blue-600' : 'bg-amber-50 text-amber-600'
                          }`}>
                            {p.status === 'Fast' ? '🔥 High Selling' : p.status === 'Medium' ? 'Normal' : '📉 Slow Moving'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ===================================================================== */}
          {/* TAB 3: TOP 5 BUYING CUSTOMERS (DEDICATED CHART + TABLE)               */}
          {/* ===================================================================== */}
          {activeTab === 'top_buyers' && (
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm">
                <h3 className="font-bold text-gray-800 text-base mb-1">Top 5 Buying Customers (Revenue Chart)</h3>
                <p className="text-xs text-gray-500 mb-4">Sabse zyada khareedari karne wale customers ka comparison</p>
                <div className="h-72 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={topBuyingCustomers} layout="vertical" margin={{ left: 20 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis type="number" tick={{ fontSize: 12 }} />
                      <YAxis dataKey="name" type="category" tick={{ fontSize: 12 }} width={120} />
                      <Tooltip formatter={(val) => `Rs. ${val.toLocaleString()}`} />
                      <Bar dataKey="spent" name="Total Buying (Rs.)" fill="#038317" radius={[0, 6, 6, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gray-50 text-gray-500 text-xs uppercase border-b border-gray-200">
                      <th className="py-3 px-6">Rank</th>
                      <th className="py-3 px-6">Customer Name</th>
                      <th className="py-3 px-6">Phone</th>
                      <th className="py-3 px-6">Total Bills</th>
                      <th className="py-3 px-6 text-right">Total Buying Amount</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 text-sm">
                    {topBuyingCustomers.map((c) => (
                      <tr key={c.rank} className="hover:bg-gray-50">
                        <td className="py-3.5 px-6 font-extrabold text-[#038317]">#{c.rank}</td>
                        <td className="py-3.5 px-6 font-bold text-gray-800">{c.name}</td>
                        <td className="py-3.5 px-6 text-gray-600">{c.phone}</td>
                        <td className="py-3.5 px-6 text-gray-600">{c.orders} Bills</td>
                        <td className="py-3.5 px-6 text-right font-extrabold text-[#038317]">Rs. {c.spent.toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ===================================================================== */}
          {/* TAB 4: TOP 5 UDHAR CUSTOMERS (DEDICATED CHART + KHATA RISK)           */}
          {/* ===================================================================== */}
          {activeTab === 'udhar' && (
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm">
                <h3 className="font-bold text-gray-800 text-base mb-1">Top 5 Udhar / Khata Customers (Pending Balance Chart)</h3>
                <p className="text-xs text-gray-500 mb-4">Jin customers ke zimme sabse zyada udhar baaqi hai</p>
                <div className="h-72 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={topUdharCustomers}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                      <YAxis tick={{ fontSize: 12 }} />
                      <Tooltip formatter={(val) => `Rs. ${val.toLocaleString()}`} />
                      <Bar dataKey="udhar" name="Remaining Udhar (Rs.)" fill="#dc2626" radius={[6, 6, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gray-50 text-gray-500 text-xs uppercase border-b border-gray-200">
                      <th className="py-3 px-6">Rank</th>
                      <th className="py-3 px-6">Customer Name</th>
                      <th className="py-3 px-6">Phone</th>
                      <th className="py-3 px-6">Pending Since</th>
                      <th className="py-3 px-6 text-right">Remaining Udhar</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 text-sm">
                    {topUdharCustomers.map((c) => (
                      <tr key={c.rank} className="hover:bg-gray-50">
                        <td className="py-3.5 px-6 font-extrabold text-red-600">#{c.rank}</td>
                        <td className="py-3.5 px-6 font-bold text-gray-800">{c.name}</td>
                        <td className="py-3.5 px-6 text-gray-600">{c.phone}</td>
                        <td className="py-3.5 px-6 text-xs text-amber-600 font-bold">{c.daysPending}</td>
                        <td className="py-3.5 px-6 text-right font-extrabold text-red-600">Rs. {c.udhar.toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ===================================================================== */}
          {/* TAB 5: CASH & STAFF ACCOUNTABILITY (AUDIT LOG & TIME TRACKING)       */}
          {/* ===================================================================== */}
          {activeTab === 'cash' && (
            <div className="space-y-6">
              {/* Cashier Summary Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {cashierStats.map((st, idx) => (
                  <div key={idx} className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm space-y-3">
                    <div className="flex justify-between items-center">
                      <h4 className="font-bold text-gray-800 text-base">{st.name}</h4>
                      <span className="text-xs bg-emerald-50 text-[#038317] px-3 py-1 rounded-full font-bold">
                        {st.bills} Bills Generated
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-4 pt-2">
                      <div className="bg-gray-50 p-3.5 rounded-2xl">
                        <p className="text-xs text-gray-500">Total Billed</p>
                        <p className="text-lg font-extrabold text-gray-800">Rs. {st.totalSales.toLocaleString()}</p>
                      </div>
                      <div className="bg-emerald-50 p-3.5 rounded-2xl">
                        <p className="text-xs text-emerald-700">Cash Collected</p>
                        <p className="text-lg font-extrabold text-[#038317]">Rs. {st.cashCollected.toLocaleString()}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Real-time Activity Audit Trail Table */}
              <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-gray-800 text-base flex items-center gap-2">
                      <Clock size={18} className="text-[#038317]" />
                      Real-Time Staff & Owner Activity Audit Log (آڈٹ لاگ)
                    </h3>
                    <p className="text-xs text-gray-500">Kis waqt kis operator (Owner ya Staff) ne kaunsa bill ya action perform kiya</p>
                  </div>
                  <span className="text-xs bg-emerald-50 text-[#038317] px-3 py-1 rounded-full font-bold">
                    Live Session Active
                  </span>
                </div>

                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gray-50 text-gray-500 text-xs uppercase border-b border-gray-200">
                      <th className="py-3 px-6">Timestamp / Time</th>
                      <th className="py-3 px-6">Operator Name</th>
                      <th className="py-3 px-6">Role</th>
                      <th className="py-3 px-6">Action Performed</th>
                      <th className="py-3 px-6">Customer / Target</th>
                      <th className="py-3 px-6 text-right">Amount (Rs.)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 text-sm">
                    {staffActivityLogs.map((log) => (
                      <tr key={log.id} className="hover:bg-gray-50">
                        <td className="py-3.5 px-6 font-mono text-xs text-gray-500">{log.time}</td>
                        <td className="py-3.5 px-6 font-bold text-gray-800">{log.operator}</td>
                        <td className="py-3.5 px-6">
                          <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                            log.role === 'Owner' ? 'bg-purple-50 text-purple-700' : 'bg-emerald-50 text-[#038317]'
                          }`}>
                            {log.role}
                          </span>
                        </td>
                        <td className="py-3.5 px-6 text-gray-700 font-medium">{log.action}</td>
                        <td className="py-3.5 px-6 text-gray-600">{log.customer}</td>
                        <td className="py-3.5 px-6 text-right font-extrabold text-[#038317]">
                          Rs. {log.amount.toLocaleString()} <span className="text-[10px] text-gray-400 font-normal">({log.mode})</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

        </div>
      </main>
    </div>
  );
};

export default Reports;