import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Store, ShoppingCart, Package, Barcode, 
  LogOut, Globe, CheckCircle2, Printer, Users, Search 
} from 'lucide-react';

const StaffDashboard = () => {
  const [lang, setLang] = useState('en');
  const [activeTab, setActiveTab] = useState('billing'); // 'billing' | 'customers'
  const navigate = useNavigate();

  // Active Staff Session Info (Proper Accountability)
  const staffInfo = {
    name: 'Zain Abbas',
    role: 'Cashier / Billing Specialist',
    phone: '03017778899',
    shopName: 'Grocery Hub',
    shopId: 'SHOP-101'
  };

  // Products Inventory (Staff can only VIEW & BILL)
  const [products] = useState([
    { id: 1, code: '1001', name: 'Basmati Rice (Super)', unit: 'Kg', stock: 50, price: 320 },
    { id: 2, code: '1002', name: 'Cooking Oil (Dalda 1L)', unit: 'Pack', stock: 30, price: 540 },
    { id: 3, code: '1003', name: 'Sugar (Cheeni)', unit: 'Kg', stock: 80, price: 155 },
    { id: 4, code: '1004', name: 'Tea Patti (Tapal 250g)', unit: 'Gram', stock: 25, price: 480 },
  ]);

  // Customers Khata Data (Staff can only VIEW payments/balances - No Edit/Delete)
  const [customers] = useState([
    { id: 1, name: 'Muhammad Ali', phone: '03001234567', type: 'give', amount: 4500, date: 'Today, 2:15 PM' },
    { id: 2, name: 'Usman Traders', phone: '03219876543', type: 'get', amount: 12500, date: 'Yesterday, 4:30 PM' },
    { id: 3, name: 'Bilal Ahmed', phone: '03335557788', type: 'settled', amount: 0, date: '12 May, 11:00 AM' },
    { id: 4, name: 'Rashid General Store', phone: '03024445566', type: 'get', amount: 8300, date: '10 May, 1:20 PM' },
  ]);

  const [searchCust, setSearchCust] = useState('');

  // POS Billing States
  const [scanCode, setScanCode] = useState('');
  const [billCart, setBillCart] = useState([]);
  const [selectedCustomerId, setSelectedCustomerId] = useState('walk-in');
  const [paymentMode, setPaymentMode] = useState('cash'); // cash | khata
  const [lastBilledData, setLastBilledData] = useState(null);

  // Barcode / Item Code Scanning Handler
  const handleScanOrAddCode = (e) => {
    e.preventDefault();
    if (!scanCode.trim()) return;

    const found = products.find(
      (p) => p.code.toLowerCase() === scanCode.trim().toLowerCase()
    );

    if (!found) {
      alert('Is code ki product is dukan mein nahi mili! Owner se rabta karein.');
      return;
    }

    addProductToBill(found);
    setScanCode('');
  };

  const addProductToBill = (product) => {
    const existing = billCart.find((item) => item.id === product.id);
    if (existing) {
      setBillCart(
        billCart.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        )
      );
    } else {
      setBillCart([...billCart, { ...product, qty: 1 }]);
    }
  };

  const updateBillQty = (id, delta) => {
    setBillCart(
      billCart
        .map((item) => (item.id === id ? { ...item, qty: item.qty + delta } : item))
        .filter((item) => item.qty > 0)
    );
  };

  const billTotal = billCart.reduce((sum, item) => sum + item.price * item.qty, 0);

  const handleCompleteBill = () => {
    if (billCart.length === 0) return;

    const billRecord = {
      billNo: Math.floor(1000 + Math.random() * 9000),
      date: new Date().toLocaleString(),
      items: [...billCart],
      total: billTotal,
      mode: paymentMode.toUpperCase(),
      cashierName: staffInfo.name,
      shopName: staffInfo.shopName,
      shopId: staffInfo.shopId
    };

    setLastBilledData(billRecord);
    alert(`Bill Successfully Generated & Total Calculated by Cashier: ${staffInfo.name}! Total: Rs. ${billTotal.toLocaleString()}`);
    setBillCart([]);
  };

  const filteredCustomers = customers.filter(c => 
    c.name.toLowerCase().includes(searchCust.toLowerCase()) || c.phone.includes(searchCust)
  );

  return (
    <div className="min-h-screen bg-gray-100 flex font-sans">
      
      {/* 1. Staff Sidebar */}
      <aside className="w-64 bg-gradient-to-t from-[#038317] to-[#03a527] text-white flex flex-col justify-between p-5 shadow-xl shrink-0 hidden md:flex">
        <div>
          <div className="flex items-center gap-3 mb-5 px-2">
            <div className="w-10 h-10 bg-white text-[#038317] rounded-full flex items-center justify-center font-bold text-xl shadow">
              <Store size={22} />
            </div>
            <div>
              <h1 className="font-bold text-lg leading-tight">LedgerBook</h1>
              <p className="text-xs text-white/85">
                <span className="noto-nastaliq-urdu">اسٹاف پورٹل</span>
              </p>
            </div>
          </div>

          <div className="bg-white/15 border border-white/25 rounded-2xl p-3.5 mb-6 backdrop-blur-sm shadow-inner">
            <div className="flex items-center justify-between text-[11px] text-white/80 mb-1">
              <span>ASSIGNED SHOP</span>
              <span className="bg-white text-[#038317] font-bold px-2.5 py-0.5 rounded-full text-[10px]">
                {staffInfo.shopId}
              </span>
            </div>
            <h2 className="font-bold text-base">{staffInfo.shopName}</h2>
          </div>

          {/* Navigation Tabs for Staff */}
          <nav className="space-y-2">
            <button
              onClick={() => setActiveTab('billing')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-semibold text-sm transition-all ${
                activeTab === 'billing' ? 'bg-white text-[#038317] shadow-md' : 'text-white/90 hover:bg-white/10'
              }`}
            >
              <ShoppingCart size={18} />
              <span>POS Billing / <span className="noto-nastaliq-urdu text-xs">بلنگ کاؤنٹر</span></span>
            </button>

            <button
              onClick={() => setActiveTab('customers')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-semibold text-sm transition-all ${
                activeTab === 'customers' ? 'bg-white text-[#038317] shadow-md' : 'text-white/90 hover:bg-white/10'
              }`}
            >
              <Users size={18} />
              <span>Customer Payments / <span className="noto-nastaliq-urdu text-xs">گاہکوں کے بقایا جات</span></span>
            </button>
          </nav>
        </div>

        {/* Staff Profile Footer */}
        <div className="pt-4 border-t border-white/25 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 bg-white text-[#038317] rounded-full flex items-center justify-center font-bold text-sm shadow">
              ZA
            </div>
            <div className="overflow-hidden">
              <h4 className="font-bold text-sm truncate">{staffInfo.name}</h4>
              <p className="text-[11px] text-white/85 truncate">Cashier</p>
            </div>
          </div>
          <button
            onClick={() => navigate('/login')}
            className="p-2 bg-white/10 hover:bg-red-500 rounded-xl transition-all duration-200 text-white"
            title="Logout"
          >
            <LogOut size={16} />
          </button>
        </div>
      </aside>

      {/* 2. Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-6 lg:px-10 py-4 flex items-center justify-between shadow-sm sticky top-0 z-10">
          <div>
            <div className="flex items-center gap-2.5">
              <h2 className="text-xl font-bold text-[#038317]">
                {activeTab === 'billing' ? 'Staff POS Billing & Printing Counter' : 'Customer Payments & Khata Viewer'}
              </h2>
              <span className="text-xs font-bold bg-emerald-50 text-[#038317] px-2.5 py-0.5 rounded-full border border-[#038317]/20">
                {staffInfo.shopName}
              </span>
            </div>
            <p className="text-xs text-gray-500">
              Cashier: <span className="font-bold text-gray-700">{staffInfo.name}</span> • Active billing counter and customer payment overview.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setLang(lang === 'en' ? 'ur' : 'en')}
              className="flex items-center gap-1.5 bg-white hover:bg-gradient-to-t hover:from-[#038317] hover:to-[#03a527] px-3.5 py-1.5 rounded-full shadow-sm cursor-pointer text-sm font-medium text-[#038317] hover:text-white transition-all duration-300 border border-[#038317]/30"
            >
              <Globe size={16} />
              <span>{lang === 'en' ? 'اردو / English' : 'English / اردو'}</span>
            </button>
          </div>
        </header>

        {/* Body Container */}
        <div className="p-6 lg:p-10 space-y-6 max-w-7xl mx-auto w-full">
          
          {/* ==================== TAB 1: POS BILLING & PRINTING ==================== */}
          {activeTab === 'billing' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Left: Barcode Scanner & Quick Tap Items */}
              <div className="lg:col-span-2 space-y-6">
                
                <div className="bg-gradient-to-t from-[#038317] to-[#03a527] rounded-3xl p-6 text-white shadow-xl">
                  <h3 className="text-lg font-bold mb-1 flex items-center gap-2">
                    <Barcode size={22} />
                    Scan Barcode / Enter Item Code
                  </h3>
                  <p className="text-xs text-white/85 mb-4">
                    Code likh kar Enter dabayein (jaise <span className="font-mono bg-white/20 px-1.5 rounded">1001</span>) — product bill mein add ho jayegi.
                  </p>
                  <form onSubmit={handleScanOrAddCode} className="flex gap-3">
                    <input
                      type="text"
                      autoFocus
                      placeholder="Type product code (e.g. 1001)..."
                      value={scanCode}
                      onChange={(e) => setScanCode(e.target.value)}
                      className="flex-1 px-4 py-3 bg-white text-gray-900 rounded-xl font-bold text-sm focus:outline-none"
                    />
                    <button
                      type="submit"
                      className="px-6 py-3 bg-white text-[#038317] font-bold rounded-xl shadow cursor-pointer hover:bg-emerald-50"
                    >
                      Add to Bill
                    </button>
                  </form>
                </div>

                {/* Quick Tap Products Grid */}
                <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-sm">
                  <h4 className="font-bold text-gray-800 text-sm mb-4 flex items-center gap-2">
                    <Package size={18} className="text-[#038317]" />
                    Store Inventory Catalog (Click to Bill)
                  </h4>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {products.map((prod) => (
                      <button
                        key={prod.id}
                        type="button"
                        onClick={() => addProductToBill(prod)}
                        className="p-3.5 rounded-2xl border border-gray-200 hover:border-[#038317] hover:bg-emerald-50/50 text-left transition-all cursor-pointer shadow-sm"
                      >
                        <div className="flex justify-between items-center text-xs text-gray-400 mb-1">
                          <span className="font-mono font-bold text-[#038317]">#{prod.code}</span>
                          <span>Stock: {prod.stock}</span>
                        </div>
                        <p className="font-bold text-gray-800 text-sm truncate">{prod.name}</p>
                        <p className="text-xs font-bold text-[#038317] mt-1">Rs. {prod.price} / {prod.unit}</p>
                      </button>
                    ))}
                  </div>
                </div>

              </div>

              {/* Right: Active Bill Receipt & Printer */}
              <div className="space-y-6">
                <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-lg flex flex-col justify-between">
                  <div>
                    <div className="border-b border-dashed border-gray-300 pb-3 mb-4">
                      <h3 className="font-bold text-lg text-[#038317]">{staffInfo.shopName}</h3>
                      <p className="text-xs text-gray-500">Cashier: <span className="font-bold text-gray-700">{staffInfo.name}</span></p>
                    </div>

                    <div className="space-y-3 mb-4">
                      <div>
                        <label className="block text-xs font-semibold text-gray-600 mb-1">Select Customer</label>
                        <select
                          value={selectedCustomerId}
                          onChange={(e) => setSelectedCustomerId(e.target.value)}
                          className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm"
                        >
                          <option value="walk-in">Walk-in Customer (نقد)</option>
                          {customers.map((c) => (
                            <option key={c.id} value={c.id}>{c.name} ({c.phone})</option>
                          ))}
                        </select>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <button
                          type="button"
                          onClick={() => setPaymentMode('cash')}
                          className={`py-2 rounded-xl text-xs font-bold border ${paymentMode === 'cash' ? 'bg-[#038317] text-white border-[#038317]' : 'bg-gray-50 text-gray-600'}`}
                        >
                          Cash (نقد)
                        </button>
                        <button
                          type="button"
                          onClick={() => setPaymentMode('khata')}
                          className={`py-2 rounded-xl text-xs font-bold border ${paymentMode === 'khata' ? 'bg-red-600 text-white border-red-600' : 'bg-gray-50 text-gray-600'}`}
                        >
                          Khata (ادھار)
                        </button>
                      </div>
                    </div>

                    {/* Cart Items */}
                    <div className="space-y-2 max-h-48 overflow-y-auto border-t pt-3">
                      {billCart.length === 0 ? (
                        <p className="text-xs text-gray-400 text-center py-6">No items scanned yet.</p>
                      ) : (
                        billCart.map((item) => (
                          <div key={item.id} className="flex items-center justify-between text-sm bg-gray-50 p-2.5 rounded-xl border">
                            <div>
                              <p className="font-bold text-gray-800 text-xs">{item.name}</p>
                              <p className="text-[11px] text-gray-500">Rs. {item.price} x {item.qty}</p>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <button onClick={() => updateBillQty(item.id, -1)} className="w-5 h-5 bg-white border rounded font-bold text-xs">-</button>
                              <span className="font-bold text-xs">{item.qty}</span>
                              <button onClick={() => updateBillQty(item.id, 1)} className="w-5 h-5 bg-white border rounded font-bold text-xs">+</button>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>

                  <div className="border-t pt-4 mt-4">
                    <div className="flex justify-between items-center mb-3">
                      <span className="font-bold text-gray-600 text-sm">Grand Total:</span>
                      <span className="text-xl font-extrabold text-[#038317]">Rs. {billTotal.toLocaleString()}</span>
                    </div>
                    <button
                      type="button"
                      onClick={handleCompleteBill}
                      className="w-full py-3 bg-gradient-to-t from-[#038317] to-[#03a527] text-white font-bold rounded-xl shadow cursor-pointer text-sm"
                    >
                      Complete Bill & Print
                    </button>
                  </div>
                </div>

                {/* Printable Receipt Preview */}
                {lastBilledData && (
                  <div className="bg-white rounded-3xl p-6 border-2 border-[#038317] shadow-xl space-y-3">
                    <div className="flex justify-between items-center border-b pb-2">
                      <h4 className="font-bold text-sm text-[#038317]">🧾 Receipt Preview</h4>
                      <button onClick={() => window.print()} className="px-3 py-1.5 bg-[#038317] text-white rounded-xl text-xs font-bold flex items-center gap-1">
                        <Printer size={14} /> Print
                      </button>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-xl text-xs space-y-1 font-mono border">
                      <p className="text-center font-bold text-sm text-[#038317]">{lastBilledData.shopName}</p>
                      <p className="text-[10px] text-center text-gray-500">Bill #{lastBilledData.billNo} | {lastBilledData.mode}</p>
                      <p className="text-[11px]">Date: {lastBilledData.date}</p>
                      <div className="border-t pt-1">
                        {lastBilledData.items.map((it, i) => (
                          <div key={i} className="flex justify-between">
                            <span>{it.name} x{it.qty}</span>
                            <span>Rs. {it.price * it.qty}</span>
                          </div>
                        ))}
                      </div>
                      <div className="border-t pt-1 font-bold text-sm text-[#038317] flex justify-between">
                        <span>Total:</span>
                        <span>Rs. {lastBilledData.total.toLocaleString()}</span>
                      </div>
                      <p className="text-[10px] text-gray-500 text-center pt-1">
                        Served by Cashier: <b className="text-gray-800">{lastBilledData.cashierName}</b>
                      </p>
                    </div>
                  </div>
                )}
              </div>

            </div>
          )}

          {/* ==================== TAB 2: CUSTOMER KHATA & PAYMENTS VIEWER ==================== */}
          {activeTab === 'customers' && (
            <div className="space-y-6">
              
              {/* Notice Banner */}
              <div className="bg-emerald-50 border border-[#038317]/30 rounded-2xl p-4 text-xs text-[#038317] flex items-center justify-between">
                <div className="flex items-center gap-2 font-medium">
                  <CheckCircle2 size={18} />
                  <span>Staff View: You can view customer names, phone numbers, and remaining payments/khata details. (Editing is restricted to Owner).</span>
                </div>
                <span className="font-bold text-gray-600 bg-white px-3 py-1 rounded-full border">
                  Read-Only Mode 🔒
                </span>
              </div>

              {/* Customers Khata Table */}
              <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200 flex flex-col md:flex-row justify-between items-center gap-3">
                  <h3 className="font-bold text-gray-800 text-base">
                    {staffInfo.shopName} — Customer Payments & Balances ({filteredCustomers.length})
                  </h3>
                  <div className="relative w-full md:w-72">
                    <Search size={16} className="absolute left-3 top-3 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search customer by name or phone..."
                      value={searchCust}
                      onChange={(e) => setSearchCust(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 bg-gray-50 border rounded-xl text-xs focus:outline-none"
                    />
                  </div>
                </div>

                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider border-b border-gray-200">
                      <th className="py-3 px-6">Customer Name</th>
                      <th className="py-3 px-6">Mobile Number</th>
                      <th className="py-3 px-6">Last Transaction</th>
                      <th className="py-3 px-6">Payment / Khata Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 text-sm">
                    {filteredCustomers.map((cust) => (
                      <tr key={cust.id} className="hover:bg-gray-50">
                        <td className="py-4 px-6 font-bold text-gray-800">{cust.name}</td>
                        <td className="py-4 px-6 text-gray-600">{cust.phone}</td>
                        <td className="py-4 px-6 text-gray-500 text-xs">{cust.date}</td>
                        <td className="py-4 px-6">
                          {cust.type === 'give' && (
                            <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-red-50 text-red-600">
                              You'll Give: Rs. {cust.amount.toLocaleString()}
                            </span>
                          )}
                          {cust.type === 'get' && (
                            <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-50 text-[#038317]">
                              You'll Get: Rs. {cust.amount.toLocaleString()}
                            </span>
                          )}
                          {cust.type === 'settled' && (
                            <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-gray-100 text-gray-500">
                              Settled / حساب برابر
                            </span>
                          )}
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

export default StaffDashboard;