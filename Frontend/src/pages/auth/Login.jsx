import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { BookOpen, Phone, Lock, Globe } from 'lucide-react';

const Login = () => {
  const [phone, setPhone] = useState('');
  const [pin, setPin] = useState('');
  const [lang, setLang] = useState('en');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    console.log('Login Data:', { phone, pin });
    alert('Login Successful!');
    // Aage dashboard par redirect hoga
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      {/* Top Language Toggle */}
      <div
        className="absolute top-4 right-4 flex items-center gap-1 bg-white px-3 py-1.5 rounded-full shadow-sm cursor-pointer text-sm font-medium text-emerald-800"
        onClick={() => setLang(lang === 'en' ? 'ur' : 'en')}
      >
        <Globe size={16} />
        <span>{lang === 'en' ? 'اردو / English' : 'English / اردو'}</span>
      </div>

      {/* Logo & Header */}
      <div className="text-center mb-6">
        <div className="w-20 h-20 bg-emerald-700 rounded-full flex items-center justify-center mx-auto shadow-lg border-4 border-white">
          <BookOpen className="text-white w-10 h-10" />
        </div>
        <h1 className="text-2xl font-bold text-emerald-900 mt-2">LegerBook</h1>
        <p className="text-sm text-emerald-700 font-semibold">ڈیجیٹل کھاتا • Digital Khata</p>
      </div>

      {/* Main Card */}
      <div className="bg-emerald-800 w-full max-w-md rounded-3xl p-6 shadow-2xl text-white">
        <h2 className="text-lg font-bold text-center mb-5 text-emerald-100">
          {lang === 'en' ? 'Login to Your Account / لاگ ان کریں' : 'اپنے اکاؤنٹ میں لاگ ان کریں'}
        </h2>

        <form onSubmit={handleLogin} className="space-y-4">
          {/* Phone Number */}
          <div>
            <label className="block text-xs text-emerald-200 mb-1">Mobile Number / موبائل نمبر</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                <Phone size={18} />
              </span>
              <input
                type="tel"
                required
                placeholder="03XXXXXXXXX"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-white text-gray-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-400 text-sm"
              />
            </div>
          </div>

          {/* 4-Digit PIN */}
          <div>
            <label className="block text-xs text-emerald-200 mb-1">4-Digit PIN / چار ہندسوں کا پن</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                <Lock size={18} />
              </span>
              <input
                type="password"
                maxLength="4"
                required
                placeholder="****"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-white text-gray-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-400 text-sm tracking-widest text-center"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-3 bg-white text-emerald-900 font-bold rounded-xl shadow-lg hover:bg-emerald-50 transition-all text-center border-2 border-emerald-400"
            >
              Login / لاگ ان کریں
            </button>
          </div>
        </form>

        {/* Footer Link to Signup */}
        <div className="text-center mt-4 text-xs text-emerald-200">
          Don't have an account?{' '}
          <Link to="/signup" className="underline font-bold text-white hover:text-emerald-100">
            Signup here / نیا اکاؤنٹ بنائیں
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;