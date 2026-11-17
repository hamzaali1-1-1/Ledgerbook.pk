import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { BookOpen, User, Store, Globe } from 'lucide-react';

const Signup = () => {
  const [role, setRole] = useState('Dukandaar'); // Dukandaar, Staff, Customer
  const [formData, setFormData] = useState({
    name: '',
    businessName: '',
    phone: '',
    pin: '',
    confirmPin: ''
  });
  const [lang, setLang] = useState('en'); // en / ur
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.pin !== formData.confirmPin) {
      alert('PINs do not match! / پن آپس میں match nahi ho rahe');
      return;
    }
    
    console.log('Signup Data:', { role, ...formData });
    alert('Signup Successful! / اکاؤنٹ بن گیا');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      {/* Top Language Toggle */}
      <div className="absolute top-4 right-4 flex items-center gap-1 bg-white px-3 py-1.5 rounded-full shadow-sm cursor-pointer text-sm font-medium text-emerald-800"
           onClick={() => setLang(lang === 'en' ? 'ur' : 'en')}>
        <Globe size={16} />
        <span>{lang === 'en' ? 'اردو / English' : 'English / اردو'}</span>
      </div>

      {/* Logo & Header */}
      <div className="text-center mb-6">
        <div className="w-20 h-20 bg-gradient-to-t from-[#038317] to-[#03a527] rounded-full flex items-center justify-center mx-auto shadow-lg border-4 border-white">
          <BookOpen className="text-white w-10 h-10" />
        </div>
        <h1 className="text-2xl font-bold text-emerald-900 mt-2">LegerBook</h1>
        <p className="text-sm text-emerald-700 font-semibold">ڈیجیٹل کھاتا • Digital Khata</p>
      </div>

      {/* Main Card */}
      <div className="bg-gradient-to-t from-[#038317] to-[#03a527] w-full max-w-md rounded-3xl p-6 shadow-2xl text-white">
        
        {/* Role Selector Tabs */}
        <div className="mb-6">
          <label className="block text-xs uppercase tracking-wider text-emerald-200 mb-2 font-semibold">
            {lang === 'en' ? 'Select Role / کردار منتخب کریں' : 'کردار منتخب کریں (Select Role)'}
          </label>
          <div className="grid grid-cols-3 gap-2 bg-emerald-900/50 p-1.5 rounded-xl border border-emerald-600">
            {['Dukandaar', 'Staff', 'Customer'].map((r) => (
              <button
                type="button"
                key={r}
                onClick={() => setRole(r)}
                className={`py-2 text-xs font-bold rounded-lg transition-all ${
                  role === r ? 'bg-white text-emerald-900 shadow' : 'text-emerald-100 hover:bg-emerald-800'
                }`}
              >
                {r}
              </button>
            ))}
          </div>
        </div>

        {/* Signup Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Full Name */}
          <div>
            <label className="block text-xs text-emerald-200 mb-1">Full Name / پورا نام</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                <User size={18} />
              </span>
              <input
                type="text"
                name="name"
                required
                placeholder="e.g. Ali Hamza"
                value={formData.name}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-2.5 bg-white text-gray-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-400 text-sm"
              />
            </div>
          </div>

          {/* Business Name (Only for Dukandaar) */}
          {role === 'Dukandaar' && (
            <div>
              <label className="block text-xs text-emerald-200 mb-1">Business Name / کاروبار کا نام</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                  <Store size={18} />
                </span>
                <input
                  type="text"
                  name="businessName"
                  required
                  placeholder="e.g. Al-Madina Store"
                  value={formData.businessName}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2.5 bg-white text-gray-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-400 text-sm"
                />
              </div>
            </div>
          )}

          {/* Phone Number */}
          <div>
            <label className="block text-xs text-emerald-200 mb-1">Mobile Number / موبائل نمبر</label>
            <input
              type="tel"
              name="phone"
              required
              placeholder="03XXXXXXXXX"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-2.5 bg-white text-gray-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-400 text-sm"
            />
          </div>

          {/* Create PIN */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs text-emerald-200 mb-1">4-Digit PIN</label>
              <input
                type="password"
                name="pin"
                maxLength="4"
                required
                placeholder="****"
                value={formData.pin}
                onChange={handleChange}
                className="w-full px-4 py-2.5 bg-white text-gray-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-400 text-sm tracking-widest text-center"
              />
            </div>
            <div>
              <label className="block text-xs text-emerald-200 mb-1">Confirm PIN</label>
              <input
                type="password"
                name="confirmPin"
                maxLength="4"
                required
                placeholder="****"
                value={formData.confirmPin}
                onChange={handleChange}
                className="w-full px-4 py-2.5 bg-white text-gray-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-400 text-sm tracking-widest text-center"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-3 bg-white text-emerald-900 font-bold rounded-xl shadow-lg hover:bg-emerald-50 transition-all text-center border-2 border-emerald-400"
            >
              Signup / رجسٹر کریں
            </button>
          </div>
        </form>

        {/* Footer Link to Login */}
        <div className="text-center mt-4 text-xs text-emerald-200">
          Already have an account?{' '}
          <Link to="/login" className="underline font-bold text-white hover:text-emerald-100">
            Login here / لاگ ان کریں
          </Link>
        </div>

      </div>
    </div>
  );
};

export default Signup;