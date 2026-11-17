import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Store, Users, FileText, ArrowUpRight, ArrowDownLeft, 
  Plus, Search, LogOut, Wallet, LayoutDashboard, Globe, 
  Package, ShoppingCart, Barcode, Trash2, CheckCircle2, ShieldCheck, BarChart3 
} from 'lucide-react';

const OwnerDashboared = () => {
  const [lang, setLang] = useState('en');
  const [activeTab, setActiveTab] = useState('products'); // Default products/overview check karne ke liye
  const navigate = useNavigate();

  // Active Business Info (Isolated Shop Context)
  const currentShop = {
    shopId: 'SHOP-101',
    shopName: 'Grocery Hub',
    ownerName: 'Ali Hamza'
  };

  // 1. Products / Inventory State (Manual Add + Barcode Ready)
  const [products, setProducts] = useState([
    { id: 1, code: '1001', name: 'Basmati Rice (Super)', unit: 'Kg', stock: 50, price: 320, shopId: 'SHOP-101' },
    { id: 2, code: '1002', name: 'Cooking Oil (Dalda 1L)', unit: 'Pack', stock: 30, price: 540, shopId: 'SHOP-101' },
    { id: 3, code: '1003', name: 'Sugar (Cheeni)', unit: 'Kg', stock: 80, price: 155, shopId: 'SHOP-101' },
    { id: 4, code: '1004', name: 'Tea Patti (Tapal 250g)', unit: 'Gram', stock: 25, price: 480, shopId: 'SHOP-101' },
  ]);

  const [newProduct, setNewProduct] = useState({
    code: '',
    name: '',
    unit: 'Piece',
    stock: '',
    price: ''
  });

  // 2. POS / Fast Billing State
  const [scanCode, setScanCode] = useState('');
  const [billCart, setBillCart] = useState([]);
  const [selectedCustomerId, setSelectedCustomerId] = useState('walk-in');
  const [paymentMode, setPaymentMode] = useState('cash'); // cash | khata

  // 3. Customers Khata State
  const [customers, setCustomers] = useState([
    { id: 1, name: 'Muhammad Ali', phone: '03001234567', type: 'give', amount: 4500, date: 'Today, 2:15 PM', shopId: 'SHOP-101' },
    { id: 2, name: 'Usman Traders', phone: '03219876543', type: 'get', amount: 12500, date: 'Yesterday, 4:30 PM', shopId: 'SHOP-101' },
    { id: 3, name: 'Bilal Ahmed', phone: '03335557788', type: 'settled', amount: 0, date: '12 May, 11:00 AM', shopId: 'SHOP-101' },
  ]);
  const [newCustomer, setNewCustomer] = useState({ name: '', phone: '' });

  // 4. Staff Management State
  const [staffList, setStaffList] = useState([
    {
      id: 1,
      name: 'Zain Abbas',
      phone: '03017778899',
      role: 'Cashier',
      pin: '1234',
      shopId: 'SHOP-101',
      shopName: 'Grocery Hub'
    }
  ]);
  const [newStaff, setNewStaff] = useState({
    name: '',
    phone: '',
    role: 'Cashier',
    pin: ''
  });

  // --- HANDLERS ---

  const handleAddProduct = (e) => {
    e.preventDefault();
    if (!newProduct.code || !newProduct.name || !newProduct.price || !newProduct.stock) return;

    const duplicate = products.find((p) => p.code === newProduct.code.trim());
    if (duplicate) {
      alert(`Code "${newProduct.code}" pehle se "${duplicate.name}" ke liye mojood hai!`);
      return;
    }

    const item = {
      id: Date.now(),
      code: newProduct.code.trim(),
      name: newProduct.name.trim(),
      unit: newProduct.unit,
      stock: Number(newProduct.stock),
      price: Number(newProduct.price),
      shopId: currentShop.shopId
    };

    setProducts([item, ...products]);
    setNewProduct({ code: '', name: '', unit: 'Piece', stock: '', price: '' });
  };

  const handleScanOrAddCode = (e) => {
    e.preventDefault();
    if (!scanCode.trim()) return;

    const found = products.find(
      (p) => p.code.toLowerCase() === scanCode.trim().toLowerCase()
    );

    if (!found) {
      alert('Is code ki koi product store mein nahi mili! Pehle Products tab mein add karein.');
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

    setProducts(
      products.map((prod) => {
        const billed = billCart.find((b) => b.id === prod.id);
        return billed ? { ...prod, stock: Math.max(0, prod.stock - billed.qty) } : prod;
      })
    );

    if (paymentMode === 'khata' && selectedCustomerId !== 'walk-in') {
      setCustomers(
        customers.map((c) => {
          if (String(c.id) === String(selectedCustomerId)) {
            const currentGet = c.type === 'get' ? c.amount : c.type === 'give' ? -c.amount : 0;
            const updated = currentGet + billTotal;
            return {
              ...c,
              type: updated > 0 ? 'get' : updated < 0 ? 'give' : 'settled',
              amount: Math.abs(updated),
              date: 'Just now'
            };
          }
          return c;
        })
      );
    }

    alert(`Bill Complete! Total: Rs. ${billTotal.toLocaleString()} (${paymentMode.toUpperCase()})`);
    setBillCart([]);
  };

  const handleAddStaff = (e) => {
    e.preventDefault();
    if (!newStaff.name || !newStaff.phone || !newStaff.pin) return;

    const staffMember = {
      id: Date.now(),
      name: newStaff.name.trim(),
      phone: newStaff.phone.trim(),
      role: newStaff.role,
      pin: newStaff.pin.trim(),
      shopId: currentShop.shopId,
      shopName: currentShop.shopName
    };

    setStaffList([staffMember, ...staffList]);
    setNewStaff({ name: '', phone: '', role: 'Cashier', pin: '' });
  };

  const handleAddCustomer = (e) => {
    e.preventDefault();
    if (!newCustomer.name || !newCustomer.phone) return;
    setCustomers([
      {
        id: Date.now(),
        name: newCustomer.name.trim(),
        phone: newCustomer.phone.trim(),
        type: 'settled',
        amount: 0,
        date: 'Just now',
        shopId: currentShop.shopId
      },
      ...customers
    ]);
    setNewCustomer({ name: '', phone: '' });
  };

  const totalGet = customers.filter((c) => c.type === 'get').reduce((s, c) => s + c.amount, 0);
  const totalGive = customers.filter((c) => c.type === 'give').reduce((s, c) => s + c.amount, 0);
  const netBalance = totalGet - totalGive;

  return (
    <div className="min-h-screen bg-gray-100 flex font-sans">
      {/* 1. Desktop Sidebar */}
      <aside className="w-64 bg-gradient-to-t from-[#038317] to-[#03a527] text-white flex flex-col justify-between p-5 shadow-2xl shrink-0">
        <div>
          <div className="flex items-center gap-3 mb-5 px-2">
            <div className="w-10 h-10 bg-white text-[#038317] rounded-full flex items-center justify-center font-bold text-xl shadow">
              <Store size={22} />
            </div>
            <div>
              <h1 className="font-bold text-lg leading-tight">LedgerBook</h1>
              <p className="text-xs text-white/85">
                <span className="noto-nastaliq-urdu">ڈیجیٹل کھاتا</span>
              </p>
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
            <p className="text-xs text-white/85">Owner: {currentShop.ownerName}</p>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-2">
            <button
              onClick={() => setActiveTab('overview')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-semibold text-sm transition-all duration-200 cursor-pointer ${
                activeTab === 'overview' ? 'bg-white text-[#038317] shadow-md' : 'text-white/90 hover:bg-white/10'
              }`}
            >
              <LayoutDashboard size={18} />
              <span>Overview / <span className="noto-nastaliq-urdu text-xs">خلاصہ</span></span>
            </button>

            <button
              onClick={() => setActiveTab('billing')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-semibold text-sm transition-all duration-200 cursor-pointer ${
                activeTab === 'billing' ? 'bg-white text-[#038317] shadow-md' : 'text-white/90 hover:bg-white/10'
              }`}
            >
              <ShoppingCart size={18} />
              <span>POS Billing / <span className="noto-nastaliq-urdu text-xs">بلنگ</span></span>
            </button>

            <button
              onClick={() => setActiveTab('products')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-semibold text-sm transition-all duration-200 cursor-pointer ${
                activeTab === 'products' ? 'bg-white text-[#038317] shadow-md' : 'text-white/90 hover:bg-white/10'
              }`}
            >
              <Package size={18} />
              <span>Products / <span className="noto-nastaliq-urdu text-xs">اشیاء</span></span>
            </button>

            <button
              onClick={() => setActiveTab('khata')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-semibold text-sm transition-all duration-200 cursor-pointer ${
                activeTab === 'khata' ? 'bg-white text-[#038317] shadow-md' : 'text-white/90 hover:bg-white/10'
              }`}
            >
              <FileText size={18} />
              <span>Customers / <span className="noto-nastaliq-urdu text-xs">کھاتہ</span></span>
            </button>

            <button
              onClick={() => setActiveTab('staff')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-semibold text-sm transition-all duration-200 cursor-pointer ${
                activeTab === 'staff' ? 'bg-white text-[#038317] shadow-md' : 'text-white/90 hover:bg-white/10'
              }`}
            >
              <Users size={18} />
              <span>Staff / <span className="noto-nastaliq-urdu text-xs">سٹاف</span></span>
            </button>

            {/* Reports Link */}
            <button
              onClick={() => navigate('/reports')}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-semibold text-sm text-white/90 hover:bg-white/10 transition-all duration-200 cursor-pointer"
            >
              <BarChart3 size={18} />
              <span>Reports / <span className="noto-nastaliq-urdu text-xs">رپورٹس</span></span>
            </button>
          </nav>
        </div>

        {/* Sidebar Footer */}
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
          <button
            onClick={() => navigate('/login')}
            className="p-2 bg-white/10 hover:bg-red-500 rounded-xl transition-all duration-200 text-white cursor-pointer"
            title="Logout"
          >
            <LogOut size={16} />
          </button>
        </div>
      </aside>

      {/* 2. Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <header className="bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between shadow-sm sticky top-0 z-10">
          <div>
            <div className="flex items-center gap-2.5">
              <h2 className="text-xl font-bold text-[#038317]">{currentShop.shopName}</h2>
              <span className="text-xs font-bold bg-emerald-50 text-[#038317] px-2.5 py-0.5 rounded-full border border-[#038317]/20">
                ID: {currentShop.shopId}
              </span>
            </div>
            <p className="text-xs text-gray-500">
              Owner: <span className="font-semibold text-gray-700">{currentShop.ownerName}</span> • Manage products, barcode billing, staff & khata
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

        {/* TAB CONTENT */}
        <div className="p-8 space-y-6 max-w-7xl mx-auto w-full">
          
          {/* ==================== OVERVIEW ==================== */}
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-t from-[#038317] to-[#03a527] rounded-3xl p-6 text-white shadow-xl flex flex-col justify-between">
                <div className="flex justify-between items-center">
                  <span className="text-xs uppercase tracking-wider text-white/90 font-semibold">Net Khata Balance</span>
                  <Wallet className="text-white/80" size={24} />
                </div>
                <div className="my-4">
                  <h3 className="text-3xl font-extrabold">Rs. {netBalance.toLocaleString()}</h3>
                  <p className="text-xs text-white/90 mt-1"><span className="noto-nastaliq-urdu">کل خالص بقایا جات</span></p>
                </div>
                <div className="text-[11px] bg-white/20 px-3 py-1 rounded-xl w-fit">
                  {currentShop.shopName} ({currentShop.shopId})
                </div>
              </div>

              <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-sm flex flex-col justify-between">
                <div className="flex justify-between items-center">
                  <span className="text-xs uppercase tracking-wider text-gray-500 font-semibold">You'll Get (Lenay Hain)</span>
                  <div className="p-2 bg-emerald-50 text-[#038317] rounded-xl"><ArrowUpRight size={20} /></div>
                </div>
                <div className="my-4">
                  <h3 className="text-2xl font-bold text-[#038317]">Rs. {totalGet.toLocaleString()}</h3>
                  <p className="text-xs text-gray-400 mt-1"><span className="noto-nastaliq-urdu">گاہکوں سے لینے ہیں</span></p>
                </div>
                <button onClick={() => setActiveTab('khata')} className="text-xs text-[#038317] font-bold text-left hover:underline cursor-pointer">
                  View Customer Khata &rarr;
                </button>
              </div>

              <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-sm flex flex-col justify-between">
                <div className="flex justify-between items-center">
                  <span className="text-xs uppercase tracking-wider text-gray-500 font-semibold">Store Inventory & Staff</span>
                  <div className="p-2 bg-emerald-50 text-[#038317] rounded-xl"><Package size={20} /></div>
                </div>
                <div className="my-4 flex gap-6">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800">{products.length}</h3>
                    <p className="text-xs text-gray-500">Products</p>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800">{staffList.length}</h3>
                    <p className="text-xs text-gray-500">Active Staff</p>
                  </div>
                </div>
                <button onClick={() => setActiveTab('products')} className="text-xs text-[#038317] font-bold text-left hover:underline cursor-pointer">
                  Manage Products &rarr;
                </button>
              </div>
            </div>
          )}

          {/* ==================== PRODUCTS ==================== */}
          {activeTab === 'products' && (
            <div className="space-y-6">
              <div className="bg-gradient-to-t from-[#038317] to-[#03a527] rounded-3xl p-6 text-white shadow-xl">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-bold flex items-center gap-2">
                      <Package size={20} />
                      Add New Product / <span className="noto-nastaliq-urdu text-sm font-normal">نئی پروڈکٹ شامل کریں</span>
                    </h3>
                    <p className="text-xs text-white/85">Ek dafa code aur price set karein, billing mein sirf code likhne se product khud aa jayegi.</p>
                  </div>
                  <span className="text-xs bg-white/20 px-3 py-1 rounded-full font-semibold">
                    Shop: {currentShop.shopName}
                  </span>
                </div>

                <form onSubmit={handleAddProduct} className="grid grid-cols-1 md:grid-cols-6 gap-3">
                  <div>
                    <label className="block text-xs text-white/90 mb-1">Barcode / Item Code *</label>
                    <div className="relative">
                      <Barcode size={16} className="absolute left-3 top-3 text-gray-400" />
                      <input
                        type="text"
                        required
                        placeholder="e.g. 1005"
                        value={newProduct.code}
                        onChange={(e) => setNewProduct({ ...newProduct, code: e.target.value })}
                        className="w-full pl-9 pr-3 py-2.5 bg-white text-gray-800 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-300 font-bold"
                      />
                    </div>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-xs text-white/90 mb-1">Product Name / نام *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Flour (Aata 10kg)"
                      value={newProduct.name}
                      onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-white text-gray-800 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-300"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-white/90 mb-1">Unit / پیمانہ</label>
                    <select
                      value={newProduct.unit}
                      onChange={(e) => setNewProduct({ ...newProduct, unit: e.target.value })}
                      className="w-full px-3 py-2.5 bg-white text-gray-800 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-300 font-medium"
                    >
                      <option value="Piece">Piece (عدد)</option>
                      <option value="Kg">Kg (کلوگرام)</option>
                      <option value="Gram">Gram (گرام)</option>
                      <option value="Liter">Liter (لیٹر)</option>
                      <option value="Pack">Pack (پیکٹ)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs text-white/90 mb-1">Stock Qty *</label>
                    <input
                      type="number"
                      required
                      min="1"
                      placeholder="e.g. 50"
                      value={newProduct.stock}
                      onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-white text-gray-800 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-300"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-white/90 mb-1">Price (Rs.) *</label>
                    <div className="flex gap-2">
                      <input
                        type="number"
                        required
                        min="1"
                        placeholder="e.g. 1250"
                        value={newProduct.price}
                        onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                        className="w-full px-3 py-2.5 bg-white text-gray-800 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-300"
                      />
                      <button
                        type="submit"
                        className="px-4 py-2.5 bg-white text-[#038317] hover:bg-emerald-50 font-bold rounded-xl shadow-md transition-all shrink-0 cursor-pointer"
                      >
                        Add
                      </button>
                    </div>
                  </div>
                </form>
              </div>

              <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                  <h3 className="font-bold text-gray-800 text-base">
                    Store Inventory ({products.length} Items) / <span className="noto-nastaliq-urdu text-sm font-normal text-gray-500">دکان کا سٹاک</span>
                  </h3>
                  <button
                    onClick={() => setActiveTab('billing')}
                    className="px-3.5 py-1.5 bg-[#038317] text-white rounded-xl text-xs font-bold hover:bg-[#038317]/90 transition-all cursor-pointer"
                  >
                    Go to Barcode Billing &rarr;
                  </button>
                </div>

                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider border-b border-gray-200">
                      <th className="py-3 px-6">Item Code</th>
                      <th className="py-3 px-6">Product Name</th>
                      <th className="py-3 px-6">Unit</th>
                      <th className="py-3 px-6">Available Stock</th>
                      <th className="py-3 px-6">Unit Price</th>
                      <th className="py-3 px-6 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 text-sm">
                    {products.map((prod) => (
                      <tr key={prod.id} className="hover:bg-gray-50">
                        <td className="py-3.5 px-6">
                          <span className="font-mono font-bold bg-gray-100 text-gray-800 px-2.5 py-1 rounded-lg border border-gray-200">
                            #{prod.code}
                          </span>
                        </td>
                        <td className="py-3.5 px-6 font-bold text-gray-800">{prod.name}</td>
                        <td className="py-3.5 px-6 text-gray-600">{prod.unit}</td>
                        <td className="py-3.5 px-6">
                          <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                            prod.stock < 10 ? 'bg-red-50 text-red-600' : 'bg-emerald-50 text-[#038317]'
                          }`}>
                            {prod.stock} {prod.unit}
                          </span>
                        </td>
                        <td className="py-3.5 px-6 font-bold text-gray-800">Rs. {prod.price}</td>
                        <td className="py-3.5 px-6 text-right">
                          <button
                            onClick={() => setProducts(products.filter((p) => p.id !== prod.id))}
                            className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition-all cursor-pointer"
                            title="Delete Product"
                          >
                            <Trash2 size={16} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ==================== BILLING ==================== */}
          {activeTab === 'billing' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-4">
                <div className="bg-gradient-to-t from-[#038317] to-[#03a527] rounded-3xl p-6 text-white shadow-xl">
                  <h3 className="text-lg font-bold mb-1 flex items-center gap-2">
                    <Barcode size={22} />
                    Scan Barcode or Enter Item Code
                  </h3>
                  <p className="text-xs text-white/85 mb-4">
                    Code likh kar Enter dabayein (jaise <span className="font-mono bg-white/20 px-1.5 rounded">1001</span>) — product khud bill mein add ho jayegi.
                  </p>
                  <form onSubmit={handleScanOrAddCode} className="flex gap-3">
                    <input
                      type="text"
                      autoFocus
                      placeholder="Scan or type product code (e.g. 1001)..."
                      value={scanCode}
                      onChange={(e) => setScanCode(e.target.value)}
                      className="flex-1 px-4 py-3 bg-white text-gray-900 rounded-xl font-bold text-sm focus:outline-none focus:ring-2 focus:ring-emerald-300"
                    />
                    <button
                      type="submit"
                      className="px-6 py-3 bg-white text-[#038317] font-bold rounded-xl shadow hover:bg-emerald-50 transition-all cursor-pointer"
                    >
                      Add to Bill
                    </button>
                  </form>
                </div>

                <div className="bg-white rounded-3xl p-5 border border-gray-200 shadow-sm">
                  <h4 className="font-bold text-gray-800 text-sm mb-3">Quick Tap Products (Click to Add)</h4>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {products.map((prod) => (
                      <button
                        key={prod.id}
                        type="button"
                        onClick={() => addProductToBill(prod)}
                        className="p-3 rounded-2xl border border-gray-200 hover:border-[#038317] hover:bg-emerald-50/50 text-left transition-all cursor-pointer"
                      >
                        <div className="flex justify-between items-center text-xs text-gray-400 mb-1">
                          <span className="font-mono font-bold text-[#038317]">#{prod.code}</span>
                          <span>{prod.stock} {prod.unit}</span>
                        </div>
                        <p className="font-bold text-gray-800 text-sm truncate">{prod.name}</p>
                        <p className="text-xs font-bold text-[#038317] mt-1">Rs. {prod.price} / {prod.unit}</p>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-lg flex flex-col justify-between">
                <div>
                  <div className="border-b border-dashed border-gray-300 pb-3 mb-4">
                    <h3 className="font-bold text-lg text-[#038317]">{currentShop.shopName}</h3>
                    <p className="text-xs text-gray-500">Customer Invoice / <span className="noto-nastaliq-urdu">بل رسید</span></p>
                  </div>

                  <div className="space-y-3 mb-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-1">Customer</label>
                      <select
                        value={selectedCustomerId}
                        onChange={(e) => setSelectedCustomerId(e.target.value)}
                        className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm"
                      >
                        <option value="walk-in">Walk-in Customer (نقد گاہک)</option>
                        {customers.map((c) => (
                          <option key={c.id} value={c.id}>{c.name} ({c.phone})</option>
                        ))}
                      </select>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setPaymentMode('cash')}
                        className={`py-2 rounded-xl text-xs font-bold border cursor-pointer ${
                          paymentMode === 'cash' ? 'bg-[#038317] text-white border-[#038317]' : 'bg-gray-50 text-gray-600 border-gray-200'
                        }`}
                      >
                        Cash (نقد)
                      </button>
                      <button
                        type="button"
                        onClick={() => setPaymentMode('khata')}
                        className={`py-2 rounded-xl text-xs font-bold border cursor-pointer ${
                          paymentMode === 'khata' ? 'bg-red-600 text-white border-red-600' : 'bg-gray-50 text-gray-600 border-gray-200'
                        }`}
                      >
                        Khata (ادھار)
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2 max-h-60 overflow-y-auto border-t border-gray-100 pt-3">
                    {billCart.length === 0 ? (
                      <p className="text-xs text-gray-400 text-center py-8">No items scanned yet.</p>
                    ) : (
                      billCart.map((item) => (
                        <div key={item.id} className="flex items-center justify-between text-sm bg-gray-50 p-2.5 rounded-xl">
                          <div>
                            <p className="font-bold text-gray-800">{item.name}</p>
                            <p className="text-xs text-gray-500">Rs. {item.price} x {item.qty}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <button onClick={() => updateBillQty(item.id, -1)} className="w-6 h-6 bg-white border rounded font-bold text-xs cursor-pointer">-</button>
                            <span className="font-bold text-xs">{item.qty}</span>
                            <button onClick={() => updateBillQty(item.id, 1)} className="w-6 h-6 bg-white border rounded font-bold text-xs cursor-pointer">+</button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-4 mt-4">
                  <div className="flex justify-between items-center mb-3">
                    <span className="font-bold text-gray-600 text-sm">Grand Total:</span>
                    <span className="text-xl font-extrabold text-[#038317]">Rs. {billTotal.toLocaleString()}</span>
                  </div>
                  <button
                    type="button"
                    onClick={handleCompleteBill}
                    className="w-full py-3 bg-gradient-to-t from-[#038317] to-[#03a527] text-white font-bold rounded-xl shadow-lg hover:opacity-95 transition-all cursor-pointer text-sm"
                  >
                    Complete & Save Bill
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ==================== CUSTOMERS KHATA ==================== */}
          {activeTab === 'khata' && (
            <div className="space-y-6">
              <div className="bg-gradient-to-t from-[#038317] to-[#03a527] rounded-3xl p-6 text-white shadow-xl">
                <h3 className="text-lg font-bold mb-1 flex items-center gap-2">
                  <Users size={20} />
                  Add Customer / <span className="noto-nastaliq-urdu text-sm font-normal">نیا گاہک رجسٹر کریں</span>
                </h3>
                <form onSubmit={handleAddCustomer} className="flex flex-col md:flex-row gap-3 mt-4">
                  <input
                    type="text"
                    required
                    placeholder="Customer Name (e.g. Rashid Khan)"
                    value={newCustomer.name}
                    onChange={(e) => setNewCustomer({ ...newCustomer, name: e.target.value })}
                    className="flex-1 px-4 py-2.5 bg-white text-gray-800 rounded-xl text-sm focus:outline-none"
                  />
                  <input
                    type="tel"
                    required
                    placeholder="Mobile Number (03XXXXXXXXX)"
                    value={newCustomer.phone}
                    onChange={(e) => setNewCustomer({ ...newCustomer, phone: e.target.value })}
                    className="flex-1 px-4 py-2.5 bg-white text-gray-800 rounded-xl text-sm focus:outline-none"
                  />
                  <button type="submit" className="px-6 py-2.5 bg-white text-[#038317] font-bold rounded-xl shadow cursor-pointer hover:bg-emerald-50">
                    + Register Customer
                  </button>
                </form>
              </div>

              <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h3 className="font-bold text-gray-800 text-base">Customer Khata Ledger ({customers.length})</h3>
                </div>
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider border-b border-gray-200">
                      <th className="py-3 px-6">Customer Name</th>
                      <th className="py-3 px-6">Mobile Number</th>
                      <th className="py-3 px-6">Last Activity</th>
                      <th className="py-3 px-6">Khata Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 text-sm">
                    {customers.map((c) => (
                      <tr key={c.id} className="hover:bg-gray-50">
                        <td className="py-3.5 px-6 font-bold text-gray-800">{c.name}</td>
                        <td className="py-3.5 px-6 text-gray-600">{c.phone}</td>
                        <td className="py-3.5 px-6 text-gray-500 text-xs">{c.date}</td>
                        <td className="py-3.5 px-6">
                          {c.type === 'get' ? (
                            <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-50 text-[#038317]">
                              You'll Get: Rs. {c.amount.toLocaleString()}
                            </span>
                          ) : c.type === 'give' ? (
                            <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-red-50 text-red-600">
                              You'll Give: Rs. {c.amount.toLocaleString()}
                            </span>
                          ) : (
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

          {/* ==================== STAFF MANAGEMENT ==================== */}
          {activeTab === 'staff' && (
            <div className="space-y-6">
              <div className="bg-gradient-to-t from-[#038317] to-[#03a527] rounded-3xl p-6 text-white shadow-xl">
                <h3 className="text-lg font-bold mb-1 flex items-center gap-2">
                  <ShieldCheck size={20} />
                  Add Cashier / Staff Member (Isolated to {currentShop.shopName})
                </h3>
                <form onSubmit={handleAddStaff} className="grid grid-cols-1 md:grid-cols-4 gap-3 mt-4">
                  <input
                    type="text"
                    required
                    placeholder="Staff Name (e.g. Zain Abbas)"
                    value={newStaff.name}
                    onChange={(e) => setNewStaff({ ...newStaff, name: e.target.value })}
                    className="px-4 py-2.5 bg-white text-gray-800 rounded-xl text-sm focus:outline-none"
                  />
                  <input
                    type="tel"
                    required
                    placeholder="Phone (03XXXXXXXXX)"
                    value={newStaff.phone}
                    onChange={(e) => setNewStaff({ ...newStaff, phone: e.target.value })}
                    className="px-4 py-2.5 bg-white text-gray-800 rounded-xl text-sm focus:outline-none"
                  />
                  <input
                    type="password"
                    required
                    maxLength="4"
                    placeholder="4-Digit PIN Code (e.g. 1234)"
                    value={newStaff.pin}
                    onChange={(e) => setNewStaff({ ...newStaff, pin: e.target.value })}
                    className="px-4 py-2.5 bg-white text-gray-800 rounded-xl text-sm focus:outline-none font-mono"
                  />
                  <button type="submit" className="px-6 py-2.5 bg-white text-[#038317] font-bold rounded-xl shadow cursor-pointer hover:bg-emerald-50">
                    + Add Staff
                  </button>
                </form>
              </div>

              <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h3 className="font-bold text-gray-800 text-base">Assigned Staff List ({staffList.length})</h3>
                </div>
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider border-b border-gray-200">
                      <th className="py-3 px-6">Name</th>
                      <th className="py-3 px-6">Role</th>
                      <th className="py-3 px-6">Phone</th>
                      <th className="py-3 px-6">Shop ID</th>
                      <th className="py-3 px-6 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 text-sm">
                    {staffList.map((st) => (
                      <tr key={st.id} className="hover:bg-gray-50">
                        <td className="py-3.5 px-6 font-bold text-gray-800">{st.name}</td>
                        <td className="py-3.5 px-6"><span className="px-2 py-1 bg-emerald-50 text-[#038317] font-bold text-xs rounded-full">{st.role}</span></td>
                        <td className="py-3.5 px-6 text-gray-600">{st.phone}</td>
                        <td className="py-3.5 px-6 font-mono text-xs font-bold text-[#038317]">{st.shopId}</td>
                        <td className="py-3.5 px-6 text-right">
                          <button
                            onClick={() => setStaffList(staffList.filter((s) => s.id !== st.id))}
                            className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition-all cursor-pointer"
                            title="Remove Staff"
                          >
                            <Trash2 size={16} />
                          </button>
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

export default OwnerDashboared;