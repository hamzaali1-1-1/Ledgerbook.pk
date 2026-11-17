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
        className="absolute top-4 right-4 flex items-center gap-1 bg-white hover:bg-gradient-to-t from-[#038317] to-[#03a527] px-3 py-1.5 rounded-full shadow-sm cursor-pointer text-sm font-medium text-[#038317] hover:text-white transition-all duration-300 ease-in-out"
        onClick={() => setLang(lang === 'en' ? 'ur' : 'en')}
      >
        <Globe size={16} />
        <span className="pl-2 pb-2">{lang === 'en' ? 'اردو / English' : 'English / اردو'}</span>
      </div>

      {/* Logo & Header */}
      <div className="text-center mb-6">
        <div className="w-20 h-20 bg-gradient-to-t from-[#038317] to-[#03a527] rounded-full flex items-center justify-center mx-auto shadow-lg">
          <BookOpen className="text-white w-10 h-10" />
        </div>
        <h1 className="text-[1.5rem] font-bold text-[#038317]">LedgerBook</h1>
      </div>

      {/* Main Card */}
      <div className="bg-gradient-to-t from-[#038317] to-[#03a527] w-full max-w-md rounded-3xl p-6 shadow-2xl text-white">
        <h2 className="text-lg font-bold text-center mb-5 text-white">
          {lang === 'en' ? 'Login to Your Account' : 'اپنے اکاؤنٹ میں لاگ ان کریں'}
        </h2>

        <form onSubmit={handleLogin} className="space-y-4">
          {/* Phone Number */}
          <div>
            <label className="block text-xs text-white/90 mb-2">Mobile Number / موبائل نمبر</label>
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
            <label className="block text-xs text-white/90 mb-2">4-Digit PIN / چار ہندسوں کا پن</label>
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
              className="w-full pt-2 pb-3 bg-white text-[#03a527] hover:text-white hover:bg-[#03a527]/90 transition-all duration-300 ease-in-out font-bold rounded-xl shadow-lg text-center"
            >
              Login 
            </button>
          </div>
        </form>

        {/* Footer Link to Signup */}
        <div className=" text-center mt-4 text-xs text-white/80">
          Don't have an account?{' '}
          <Link to="/signup" className="pl-2 underline font-bold text-white hover:text-white/90">
            Signup here </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
