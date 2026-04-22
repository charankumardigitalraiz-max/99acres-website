import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../store/slices/authSlice';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/auth.css';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    // Simulate register
    if (name && email && password) {
      dispatch(loginSuccess({ name, email }));
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center p-6 font-['Outfit',sans-serif]">
      <div className="bg-white p-10 rounded-[32px] shadow-[0_20px_50px_-10px_rgba(0,0,0,0.05)] border border-[#e2e8f0] w-full max-w-[440px] relative overflow-hidden transition-all duration-500 hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.08)]">
        {/* Background Accent */}
        <div className="absolute top-0 right-0 w-[120px] h-[120px] bg-[radial-gradient(circle_at_top_right,rgba(245,158,11,0.08),transparent_70%)] pointer-events-none" />
        
        <div className="relative z-10 text-center mb-8">
          <h2 className="text-[2.25rem] font-semibold text-[#0f172a] mb-2 tracking-tight">Create an Account</h2>
          <p className="text-[#64748b] text-[1rem] font-medium opacity-80">Join EstatePrime to save properties and get alerts</p>
        </div>
        
        <form className="flex flex-col gap-5 relative z-10" onSubmit={handleRegister}>
          <div className="flex flex-col gap-2">
            <label className="text-[0.85rem] font-bold text-[#0f172a] uppercase tracking-wider pl-1 font-['Outfit']">Full Name</label>
            <input 
              type="text" 
              value={name} 
              onChange={e => setName(e.target.value)} 
              required 
              placeholder="Enter your full name" 
              className="w-full h-[56px] px-5 rounded-2xl border border-[#e2e8f0] bg-[#fdfdfd] text-[1rem] font-medium placeholder:text-[#94a3b8] focus:outline-none focus:border-amber-500 focus:shadow-[0_8px_30px_rgba(245,158,11,0.06)] transition-all"
            />
          </div>
          
          <div className="flex flex-col gap-2">
            <label className="text-[0.85rem] font-bold text-[#0f172a] uppercase tracking-wider pl-1 font-['Outfit']">Email Address</label>
            <input 
              type="email" 
              value={email} 
              onChange={e => setEmail(e.target.value)} 
              required 
              placeholder="Enter your email" 
              className="w-full h-[56px] px-5 rounded-2xl border border-[#e2e8f0] bg-[#fdfdfd] text-[1rem] font-medium placeholder:text-[#94a3b8] focus:outline-none focus:border-amber-500 focus:shadow-[0_8px_30px_rgba(245,158,11,0.06)] transition-all"
            />
          </div>
          
          <div className="flex flex-col gap-2">
            <label className="text-[0.85rem] font-bold text-[#0f172a] uppercase tracking-wider pl-1 font-['Outfit']">Password</label>
            <input 
              type="password" 
              value={password} 
              onChange={e => setPassword(e.target.value)} 
              required 
              placeholder="Create a strong password" 
              className="w-full h-[56px] px-5 rounded-2xl border border-[#e2e8f0] bg-[#fdfdfd] text-[1rem] font-medium placeholder:text-[#94a3b8] focus:outline-none focus:border-amber-500 focus:shadow-[0_8px_30px_rgba(245,158,11,0.06)] transition-all"
            />
          </div>
          
          <button type="submit" className="h-[56px] mt-2 rounded-[18px] bg-[#0f172a] text-white text-[1.1rem] font-bold flex items-center justify-center gap-2 cursor-pointer transition-all hover:bg-amber-600 hover:shadow-[0_12px_24px_rgba(245,158,11,0.25)] hover:scale-[1.02] active:scale-95 border-none">
            Register
          </button>
        </form>
        
        <div className="mt-8 pt-6 border-t border-[#f1f5f9] text-center text-[#64748b] text-[0.95rem] font-medium">
          Already have an account? <Link to="/login" className="text-amber-600 font-bold hover:underline decoration-2 underline-offset-4 ml-1">Login here</Link>
        </div>
      </div>
    </div>
  );
}
