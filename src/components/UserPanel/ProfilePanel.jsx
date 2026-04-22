import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateProfile } from '../../store/slices/userPanelSlice';

export default function ProfilePanel() {
  const dispatch = useDispatch();
  const { profile } = useSelector(state => state.userPanel);
  
  const [form, setForm] = useState({ ...profile });
  const [saved, setSaved] = useState(false);

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  
  const handleSave = () => {
    dispatch(updateProfile(form));
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="bg-white border border-slate-100 rounded-[16px] p-[28px_32px] mb-6 shadow-[0_2px_12px_rgba(0,0,0,0.01)]">
      <div className="text-[1.15rem] font-semibold text-slate-900 mb-1.5 tracking-tight">My Profile</div>
      <div className="text-[0.88rem] text-slate-500 mb-6">Update your personal information</div>

      <div className="flex items-center gap-6 mb-6">
        <div className="w-[80px] h-[80px] rounded-full bg-amber-50 border border-amber-500/20 flex items-center justify-center text-[2.2rem] font-bold text-amber-500 shrink-0 relative cursor-pointer overflow-hidden group/avatar">
          {(form.firstName[0] || '?').toUpperCase()}
          <div className="absolute inset-0 bg-slate-900/70 flex items-center justify-center text-white text-[0.75rem] font-semibold opacity-0 group-hover/avatar:opacity-100 transition-opacity duration-200">
            Edit
          </div>
        </div>
        <div>
          <strong className="block text-[1rem] font-bold text-slate-900 mb-[2px]">{form.firstName} {form.lastName}</strong>
          <p className="text-[0.82rem] text-slate-500">Premium Member · Since {profile.memberSince}</p>
        </div>
      </div>

      <div className="h-px bg-slate-100 my-6" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="flex flex-col gap-2">
          <label className="text-[0.75rem] font-bold text-slate-500 uppercase tracking-widest">First Name</label>
          <input name="firstName" value={form.firstName} onChange={handleChange} placeholder="First name" className="p-[11px_14px] border border-slate-200 rounded-lg text-[0.9rem] text-slate-900 outline-none transition-all focus:border-amber-500 focus:shadow-[0_0_0_3px_rgba(245,158,11,0.1)]" />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-[0.75rem] font-bold text-slate-500 uppercase tracking-widest">Last Name</label>
          <input name="lastName" value={form.lastName} onChange={handleChange} placeholder="Last name" className="p-[11px_14px] border border-slate-200 rounded-lg text-[0.9rem] text-slate-900 outline-none transition-all focus:border-amber-500 focus:shadow-[0_0_0_3px_rgba(245,158,11,0.1)]" />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-[0.75rem] font-bold text-slate-500 uppercase tracking-widest">Email</label>
          <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="Email" className="p-[11px_14px] border border-slate-200 rounded-lg text-[0.9rem] text-slate-900 outline-none transition-all focus:border-amber-500 focus:shadow-[0_0_0_3px_rgba(245,158,11,0.1)]" />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-[0.75rem] font-bold text-slate-500 uppercase tracking-widest">Phone</label>
          <input name="phone" value={form.phone} onChange={handleChange} placeholder="+91 XXXXX XXXXX" className="p-[11px_14px] border border-slate-200 rounded-lg text-[0.9rem] text-slate-900 outline-none transition-all focus:border-amber-500 focus:shadow-[0_0_0_3px_rgba(245,158,11,0.1)]" />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-[0.75rem] font-bold text-slate-500 uppercase tracking-widest">City</label>
          <select name="city" value={form.city} onChange={handleChange} className="p-[11px_14px] border border-slate-200 rounded-lg text-[0.9rem] text-slate-900 outline-none transition-all focus:border-amber-500 focus:shadow-[0_0_0_3px_rgba(245,158,11,0.1)] bg-white">
            {['Mumbai', 'Bangalore', 'Delhi NCR', 'Hyderabad', 'Chennai', 'Pune'].map(c => <option key={c}>{c}</option>)}
          </select>
        </div>
        <div className="flex flex-col gap-2 md:col-span-2">
          <label className="text-[0.75rem] font-bold text-slate-500 uppercase tracking-widest">Bio</label>
          <textarea name="bio" value={form.bio} onChange={handleChange} className="p-[11px_14px] border border-slate-200 rounded-lg text-[0.9rem] text-slate-900 outline-none transition-all focus:border-amber-500 focus:shadow-[0_0_0_3px_rgba(245,158,11,0.1)] min-h-[100px] resize-vertical" />
        </div>
      </div>

      <div className="flex gap-3 mt-8">
        <button className="px-5 py-2.5 rounded-lg font-bold text-[0.88rem] bg-amber-500 text-white transition-all hover:bg-amber-600 cursor-pointer flex items-center justify-center min-w-[140px]" onClick={handleSave}>
          {saved ? '✓ Saved!' : 'Save Changes'}
        </button>
        <button className="px-5 py-2.5 rounded-lg font-bold text-[0.88rem] bg-transparent border border-slate-200 text-slate-600 transition-all hover:bg-slate-50 hover:text-slate-900 cursor-pointer" onClick={() => setForm({ ...profile })}>Cancel</button>
      </div>
    </div>
  );
}
