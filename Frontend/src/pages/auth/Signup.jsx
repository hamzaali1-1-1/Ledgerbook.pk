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
      <div className="absolute top-4 right-4 flex items-center  gap-1 bg-white hover:bg-gradient-to-t from-[#038317] transition-all duration-300 ease-in-out to-[#03a527] px-3 py-1.5 rounded-full shadow-sm cursor-pointer text-sm font-medium text-[#038317] hover:text-white transition-all duration-200 ease-in-out"
        onClick={() => setLang(lang === 'en' ? 'ur' : 'en')}>
        <Globe size={16} />
        <span className="pl-2 pb-2" >{lang === 'en' ? 'اردو / English' : 'English / اردو'}</span>
      </div>

      {/* Logo & Header */}
      <div className="text-center mb-6">
        <div className="w-20 h-20 bg-gradient-to-t from-[#038317] to-[#03a527] rounded-full flex items-center justify-center mx-auto shadow-lg ">
          <BookOpen className="text-white w-10 h-10" />
        </div>
        <h1 className="text-[1.5rem] font-bold text-[#038317] ">LedgerBook</h1>
      </div>

      {/* Main Card */}
      <div className="bg-gradient-to-t from-[#038317] to-[#03a527] w-full max-w-md rounded-3xl p-6 shadow-2xl text-white">

        {/* Role Selector Tabs */}
        <div className="mb-6">
          <label className="block text-xs uppercase tracking-wider text-white/90 mb-2 font-semibold">
            {lang === 'en' ? 'Select Role / کردار منتخب کریں' : 'کردار منتخب کریں (Select Role)'}
          </label>
          <div className="grid grid-cols-3 gap-2 bg-white p-1.5 rounded-xl border border-emerald-600">
            {['Dukandaar', 'Staff', 'Customer'].map((r) => (
              <button
                type="button"
                key={r}
                onClick={() => setRole(r)}
                className={`pt-1 pb-2.5 text-xs font-bold rounded-lg transition-all duration-200 border ${role === r
                    ? 'bg-[#038317] text-white border-[#038317] shadow-md'
                    : 'bg-white text-gray-500 border-gray-200 shadow-[0_2px_6px_rgba(0,0,0,0.25)] hover:bg-emerald-50 hover:border-[#038317]/50 hover:text-gray-700'
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
            <label className="block text-xs text-white/90 mb-2">Full Name / پورا نام</label>
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
              <label className="block text-xs text-white/90 mb-2">Business Name / کاروبار کا نام</label>
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
            <label className="block text-xs text-white/90 mb-2">Mobile Number / موبائل نمبر</label>
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
              <label className="block text-xs text-white/90 mb-2">4-Digit PIN</label>
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
              <label className="block text-xs text-white/90 mb-2">Confirm PIN</label>
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
              className="w-full  pt-2 pb-3 bg-white text-[#03a527] hover:text-white transition-all duration-300 ease-in-out font-bold rounded-xl shadow-lg hover:bg-[#03a527]/90 transition-all text-center"
            >
              Signup / رجسٹر کریں
            </button>
          </div>
        </form>

        {/* Footer Link to Login */}
        <div className="text-center mt-4 text-xs text-white/80">
          Already have an account?{' '}
          <Link to="/login" className="pl-2 underline font-bold text-white hover:text-white/90">
            Login here</Link>
        </div>

      </div>
    </div>
  );
};

export default Signup;