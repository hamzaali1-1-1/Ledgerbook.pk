import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Store, BookOpen, ShieldCheck, Barcode, Users, 
  ArrowRight, Globe, CheckCircle2 
} from 'lucide-react';

const Home = () => {
  const [lang, setLang] = useState('en');
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 font-sans flex flex-col justify-between">
      
      {/* 1. Top Navigation Bar */}
      <header className="bg-white border-b border-gray-200 px-6 lg:px-16 py-4 flex items-center justify-between sticky top-0 z-50 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-t from-[#038317] to-[#03a527] text-white rounded-full flex items-center justify-center font-bold text-xl shadow">
            <BookOpen size={22} />
          </div>
          <div>
            <h1 className="font-extrabold text-lg leading-tight text-[#038317]">LedgerBook</h1>
            <p className="text-[11px] text-gray-500"><span className="noto-nastaliq-urdu">ڈیجیٹل کھاتا اور POS سسٹم</span></p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button 
            onClick={() => setLang(lang === 'en' ? 'ur' : 'en')}
            className="flex items-center gap-1.5 bg-gray-50 hover:bg-gradient-to-t hover:from-[#038317] hover:to-[#03a527] px-3.5 py-1.5 rounded-full shadow-sm cursor-pointer text-sm font-medium text-[#038317] hover:text-white transition-all duration-300 border border-gray-200"
          >
            <Globe size={16} />
            <span>{lang === 'en' ? 'اردو / English' : 'English / اردو'}</span>
          </button>

          <button 
            onClick={() => navigate('/login')}
            className="px-5 py-2 bg-[#038317] text-white rounded-xl text-sm font-bold shadow-md hover:bg-[#038317]/90 transition-all cursor-pointer"
          >
            Login / لاگ ان
          </button>
        </div>
      </header>

      {/* 2. Hero Section */}
      <section className="px-6 lg:px-16 py-16 lg:py-24 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-6 text-left">
          <span className="bg-emerald-50 text-[#038317] text-xs font-bold px-3 py-1 rounded-full border border-emerald-200 uppercase tracking-wider">
            Pakistan's Smartest Dukaan Solution 🚀
          </span>
          <h1 className="text-4xl lg:text-5xl font-extrabold text-gray-900 leading-tight">
            Manage Your Dukaan, Billing & Khata <span className="text-[#038317]">Digitally & Securely</span>
          </h1>
          <p className="text-gray-600 text-base lg:text-lg">
            Say goodbye to paper registers! LedgerBook provides fast Barcode POS billing, customer khata tracking, and isolated staff management tailored for Pakistani store owners.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <button 
              onClick={() => navigate('/signup')}
              className="px-8 py-3.5 bg-gradient-to-t from-[#038317] to-[#03a527] text-white font-bold rounded-2xl shadow-xl hover:opacity-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              Get Started Free <ArrowRight size={18} />
            </button>
            <button 
              onClick={() => navigate('/login')}
              className="px-8 py-3.5 bg-white text-gray-700 font-bold rounded-2xl border border-gray-200 shadow-sm hover:bg-gray-50 transition-all cursor-pointer"
            >
              Already have an account? Login
            </button>
          </div>

          <div className="flex items-center gap-6 pt-6 text-xs text-gray-500 font-medium">
            <span className="flex items-center gap-1.5"><CheckCircle2 size={16} className="text-[#038317]" /> 100% Data Isolation</span>
            <span className="flex items-center gap-1.5"><CheckCircle2 size={16} className="text-[#038317]" /> Barcode Scanner Ready</span>
            <span className="flex items-center gap-1.5"><CheckCircle2 size={16} className="text-[#038317]" /> Urdu & English Support</span>
          </div>
        </div>

        {/* Hero Visual Card */}
        <div className="bg-gradient-to-t from-[#038317] to-[#03a527] rounded-3xl p-8 text-white shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-10">
            <Store size={200} />
          </div>
          <div className="relative z-10 space-y-6">
            <div className="bg-white/20 backdrop-blur-md p-4 rounded-2xl border border-white/25">
              <span className="text-xs uppercase tracking-widest text-white/80">LIVE SHOP PREVIEW</span>
              <h3 className="text-2xl font-bold mt-1">Grocery Hub (SHOP-101)</h3>
              <p className="text-xs text-white/90">Owner: Ali Hamza • Active POS System</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/10 backdrop-blur-sm p-4 rounded-2xl border border-white/20">
                <p className="text-xs text-white/80">Today's Sales</p>
                <h4 className="text-xl font-extrabold mt-1">Rs. 48,500</h4>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-4 rounded-2xl border border-white/20">
                <p className="text-xs text-white/80">Active Staff</p>
                <h4 className="text-xl font-extrabold mt-1">2 Cashiers</h4>
              </div>
            </div>

            <div className="bg-white text-gray-800 p-4 rounded-2xl shadow-lg flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-[#038317]">Quick Barcode Billing</p>
                <p className="text-[11px] text-gray-500">Scan items instantly without typing names</p>
              </div>
              <Barcode size={28} className="text-[#038317]" />
            </div>
          </div>
        </div>
      </section>

      {/* 3. Features Grid Section */}
      <section className="bg-white py-16 px-6 lg:px-16 border-t border-gray-200">
        <div className="max-w-7xl mx-auto text-center space-y-12">
          <div>
            <h2 className="text-3xl font-extrabold text-gray-900">Everything Your Dukaan Needs</h2>
            <p className="text-gray-500 text-sm mt-2">Designed specifically for shopkeepers, cashiers, and customers.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            <div className="bg-gray-50 p-8 rounded-3xl border border-gray-200 hover:shadow-lg transition-all space-y-4">
              <div className="w-12 h-12 bg-emerald-100 text-[#038317] rounded-2xl flex items-center justify-center font-bold">
                <Barcode size={24} />
              </div>
              <h3 className="font-bold text-lg text-gray-900">Fast Barcode POS</h3>
              <p className="text-gray-600 text-xs leading-relaxed">
                Add products once with codes or barcodes. During billing, just type the code and the item is added instantly.
              </p>
            </div>

            <div className="bg-gray-50 p-8 rounded-3xl border border-gray-200 hover:shadow-lg transition-all space-y-4">
              <div className="w-12 h-12 bg-emerald-100 text-[#038317] rounded-2xl flex items-center justify-center font-bold">
                <Users size={24} />
              </div>
              <h3 className="font-bold text-lg text-gray-900">Isolated Staff Roles</h3>
              <p className="text-gray-600 text-xs leading-relaxed">
                Assign cashiers to specific shops with secure PIN logins. Staff can print bills but cannot alter store profits or settings.
              </p>
            </div>

            <div className="bg-gray-50 p-8 rounded-3xl border border-gray-200 hover:shadow-lg transition-all space-y-4">
              <div className="w-12 h-12 bg-emerald-100 text-[#038317] rounded-2xl flex items-center justify-center font-bold">
                <ShieldCheck size={24} />
              </div>
              <h3 className="font-bold text-lg text-gray-900">Secure Khata Ledger</h3>
              <p className="text-gray-600 text-xs leading-relaxed">
                Track customer receivables (You'll Get) and payables (You'll Give) with clean transaction logs and complete transparency.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Footer */}
      <footer className="bg-gray-900 text-white py-8 px-6 lg:px-16 text-center text-xs space-y-2">
        <p>© 2026 LedgerBook.pk — All Rights Reserved. Built for Pakistani Dukandaars.</p>
        <p className="text-gray-400">Owner Dashboard • POS Billing • Customer & Staff Portals</p>
      </footer>

    </div>
  );
};

export default Home;