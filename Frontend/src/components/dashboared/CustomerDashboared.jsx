import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Store, FileText, 
  LogOut, Wallet, Globe, Clock 
} from 'lucide-react';

const CustomerDashboard = () => {
  const [lang, setLang] = useState('en');
  const navigate = useNavigate();

  // Active Customer Session Info
  const customerInfo = {
    name: 'Muhammad Ali',
    phone: '03001234567',
    shopName: 'Grocery Hub',
    shopId: 'SHOP-101',
    netBalance: 4500, 
    balanceType: 'give' 
  };

  // Customer Transaction History with this Shop
  const [transactions] = useState([
    { id: 1, date: '17 Nov 2026, 2:15 PM', desc: 'Grocery Items Bill (POS #104)', type: 'udhaar', amount: 2500 },
    { id: 2, date: '15 Nov 2026, 4:00 PM', desc: 'Cash Payment Paid to Owner', type: 'jama', amount: 1000 },
    { id: 3, date: '10 Nov 2026, 11:30 AM', desc: 'Aata & Sugar Purchase', type: 'udhaar', amount: 3000 },
  ]);

  return (
    <div className="min-h-screen bg-gray-100 flex font-sans">
      
      {/* 1. Sidebar for Customer */}
      <aside className="w-64 bg-gradient-to-t from-[#038317] to-[#03a527] text-white flex flex-col justify-between p-5 shadow-xl shrink-0 hidden md:flex">
        <div>
          {/* Logo Area */}
          <div className="flex items-center gap-3 mb-5 px-2">
            <div className="w-10 h-10 bg-white text-[#038317] rounded-full flex items-center justify-center font-bold text-xl shadow">
              <Store size={22} />
            </div>
            <div>
              <h1 className="font-bold text-lg leading-tight">LedgerBook</h1>
              <p className="text-xs text-white/85">
                <span className="noto-nastaliq-urdu">گاہک پورٹل</span>
              </p>
            </div>
          </div>

          {/* Connected Shop Box */}
          <div className="bg-white/15 border border-white/25 rounded-2xl p-3.5 mb-6 backdrop-blur-sm shadow-inner">
            <div className="flex items-center justify-between text-[11px] text-white/80 mb-1">
              <span>CONNECTED SHOP</span>
              <span className="bg-white text-[#038317] font-bold px-2.5 py-0.5 rounded-full text-[10px]">
                {customerInfo.shopId}
              </span>
            </div>
            <h2 className="font-bold text-base">{customerInfo.shopName}</h2>
          </div>

          {/* Navigation */}
          <nav className="space-y-2">
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-semibold text-sm bg-white text-[#038317] shadow-md transition-all">
              <FileText size={18} />
              <span>My Khata / <span className="noto-nastaliq-urdu text-xs">میرا کھاتہ</span></span>
            </button>
          </nav>
        </div>

        {/* Footer Profile */}
        <div className="pt-4 border-t border-white/20 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 bg-white text-[#038317] rounded-full flex items-center justify-center font-bold text-sm shadow">
              MA
            </div>
            <div className="overflow-hidden">
              <h4 className="font-bold text-sm truncate">{customerInfo.name}</h4>
              <p className="text-[11px] text-white/80 truncate">{customerInfo.phone}</p>
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

      {/* 2. Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        
        {/* Top Header Bar */}
        <header className="bg-white border-b border-gray-200 px-6 lg:px-10 py-4 flex items-center justify-between shadow-sm sticky top-0 z-10">
          <div>
            <div className="flex items-center gap-2.5">
              <h2 className="text-xl font-bold text-[#038317]">Customer Portal</h2>
              <span className="text-xs font-bold bg-emerald-50 text-[#038317] px-2.5 py-0.5 rounded-full border border-[#038317]/20">
                {customerInfo.shopName}
              </span>
            </div>
            <p className="text-xs text-gray-500">View your running balance and khata history securely.</p>
          </div>

          <div className="flex items-center gap-3">
            {/* Language Toggle */}
            <button 
              onClick={() => setLang(lang === 'en' ? 'ur' : 'en')}
              className="flex items-center gap-1.5 bg-white hover:bg-gradient-to-t hover:from-[#038317] hover:to-[#03a527] px-3.5 py-1.5 rounded-full shadow-sm cursor-pointer text-sm font-medium text-[#038317] hover:text-white transition-all duration-300 border border-[#038317]/30"
            >
              <Globe size={16} />
              <span>{lang === 'en' ? 'اردو / English' : 'English / اردو'}</span>
            </button>
          </div>
        </header>

        {/* Body Container with Balanced Width & Spacing */}
        <div className="p-6 lg:p-10 space-y-6 max-w-7xl mx-auto w-full">
          
          {/* Balance Summary Card */}
          <div className="bg-gradient-to-t from-[#038317] to-[#03a527] rounded-3xl p-6 lg:p-8 text-white shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <div className="flex items-center gap-2 text-white/90 text-xs font-semibold uppercase tracking-wider mb-1">
                <Wallet size={16} /> Your Balance with {customerInfo.shopName}
              </div>
              <h3 className="text-3xl lg:text-4xl font-extrabold tracking-tight">Rs. {customerInfo.netBalance.toLocaleString()}</h3>
              <p className="text-xs text-white/90 mt-1.5">
                <span className="noto-nastaliq-urdu">آپ نے اس دکان کے اتنے پیسے دینے ہیں (You'll Give)</span>
              </p>
            </div>

            <div className="bg-white/15 backdrop-blur-md px-6 py-4 rounded-2xl border border-white/20 text-xs space-y-1.5 shadow-inner w-full md:w-auto">
              <p className="font-bold text-sm">👤 {customerInfo.name}</p>
              <p className="text-white/85">📞 {customerInfo.phone}</p>
              <p className="text-white/85">🏬 {customerInfo.shopName} ({customerInfo.shopId})</p>
            </div>
          </div>

          {/* Khata Ledger Table */}
          <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
              <div>
                <h3 className="font-bold text-gray-800 text-base">
                  Khata History / <span className="noto-nastaliq-urdu text-sm font-normal text-gray-500">لین دین کا ریکارڈ</span>
                </h3>
              </div>
              <span className="text-xs font-bold text-[#038317] bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                Verified Ledger
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider border-b border-gray-200">
                    <th className="py-3.5 px-6">Date & Time</th>
                    <th className="py-3.5 px-6">Description / Detail</th>
                    <th className="py-3.5 px-6">Type</th>
                    <th className="py-3.5 px-6 text-right">Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-sm">
                  {transactions.map((tx) => (
                    <tr key={tx.id} className="hover:bg-gray-50 transition-all">
                      <td className="py-4 px-6 text-gray-500 text-xs flex items-center gap-2">
                        <Clock size={14} className="text-gray-400" />
                        {tx.date}
                      </td>
                      <td className="py-4 px-6 font-bold text-gray-800">{tx.desc}</td>
                      <td className="py-4 px-6">
                        {tx.type === 'udhaar' ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-red-50 text-red-600">
                            Udhaar (ادھار)
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-50 text-[#038317]">
                            Paid (رقم جمع)
                          </span>
                        )}
                      </td>
                      <td className={`py-4 px-6 text-right font-extrabold ${tx.type === 'udhaar' ? 'text-red-600' : 'text-[#038317]'}`}>
                        {tx.type === 'udhaar' ? '-' : '+'} Rs. {tx.amount.toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </main>

    </div>
  );
};

export default CustomerDashboard;