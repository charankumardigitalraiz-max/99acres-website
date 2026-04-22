import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleSetting } from '../../store/slices/userPanelSlice';

export default function SettingsPanel() {
  const dispatch = useDispatch();
  const { settings } = useSelector(state => state.userPanel);

  const rows = [
    { key: 'emailAlerts', label: 'Email Alerts', desc: 'Receive property updates via email' },
    { key: 'pushNotifs', label: 'Push Notifications', desc: 'Browser & mobile push alerts' },
    { key: 'priceDrops', label: 'Price Drop Alerts', desc: 'Notify when saved property prices fall' },
    { key: 'newListings', label: 'New Listing Alerts', desc: 'Get notified for new matching properties' },
    { key: 'newsletter', label: 'Monthly Newsletter', desc: 'Market trends and tips from our experts' },
    { key: 'twoFactor', label: 'Two-Factor Authentication', desc: 'Add extra security to your account' },
  ];

  return (
    <>
      <div className="bg-white border border-slate-100 rounded-[16px] p-[28px_32px] mb-6 shadow-[0_2px_12px_rgba(0,0,0,0.01)]">
        <div className="text-[1.15rem] font-semibold text-slate-900 mb-1.5 tracking-tight">Preferences & Notifications</div>
        <div className="text-[0.88rem] text-slate-500 mb-6">Manage your notification and account settings</div>
        <div className="flex flex-col gap-0">
          {rows.map(r => (
            <div className="flex items-center justify-between py-4 border-b border-slate-100 last:border-none" key={r.key}>
              <div className="pr-4">
                <strong className="block text-[0.95rem] font-bold text-slate-900 mb-1 leading-tight">{r.label}</strong>
                <p className="text-[0.82rem] text-slate-500">{r.desc}</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer select-none">
                <input 
                   type="checkbox" 
                   className="sr-only peer" 
                   checked={settings[r.key]} 
                   onChange={() => dispatch(toggleSetting(r.key))} 
                />
                <div className="w-12 h-[26px] bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-[22px] after:w-[22px] after:transition-all peer-checked:bg-emerald-500 after:shadow-sm"></div>
              </label>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white border border-slate-100 rounded-[16px] p-[28px_32px] mb-6 shadow-[0_2px_12px_rgba(0,0,0,0.01)]">
        <div className="text-[1.15rem] font-semibold text-slate-900 mb-1.5 tracking-tight">Change Password</div>
        <div className="text-[0.88rem] text-slate-500 mb-6">Choose a strong, unique password</div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="flex flex-col gap-2 md:col-span-2">
            <label className="text-[0.75rem] font-bold text-slate-500 uppercase tracking-widest">Current Password</label>
            <input type="password" placeholder="••••••••" className="p-[11px_14px] border border-slate-200 rounded-lg text-[0.9rem] text-slate-900 outline-none transition-all focus:border-amber-500 focus:shadow-[0_0_0_3px_rgba(245,158,11,0.1)]" />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-[0.75rem] font-bold text-slate-500 uppercase tracking-widest">New Password</label>
            <input type="password" placeholder="••••••••" className="p-[11px_14px] border border-slate-200 rounded-lg text-[0.9rem] text-slate-900 outline-none transition-all focus:border-amber-500 focus:shadow-[0_0_0_3px_rgba(245,158,11,0.1)]" />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-[0.75rem] font-bold text-slate-500 uppercase tracking-widest">Confirm Password</label>
            <input type="password" placeholder="••••••••" className="p-[11px_14px] border border-slate-200 rounded-lg text-[0.9rem] text-slate-900 outline-none transition-all focus:border-amber-500 focus:shadow-[0_0_0_3px_rgba(245,158,11,0.1)]" />
          </div>
        </div>
        <div className="mt-8">
          <button className="px-5 py-2.5 rounded-lg font-bold text-[0.88rem] bg-amber-500 text-white transition-all hover:bg-amber-600 cursor-pointer">Update Password</button>
        </div>
      </div>

      <div className="bg-white border border-slate-100 rounded-[16px] p-[28px_32px] mb-6 shadow-[0_2px_12px_rgba(0,0,0,0.01)]">
        <div className="text-[1.15rem] font-semibold text-slate-900 mb-1.5 tracking-tight">Legal & Regulatory</div>
        <div className="text-[0.88rem] text-slate-500 mb-6">Important documents and company information</div>
        <div className="flex flex-col gap-0">
          {[
            { label: 'Terms and Conditions', desc: 'Read our service usage rules' },
            { label: 'Privacy Policy', desc: 'How we handle your personal data' },
            { label: 'Cookie Policy', desc: 'Management of browser tracking' },
            { label: 'Community Guidelines', desc: 'Rules for interacting with other users' },
            { label: 'Help Center', desc: 'Frequently asked questions and support' },
          ].map((item, i) => (
            <div className="flex items-center justify-between py-4 border-b border-slate-100 last:border-none cursor-pointer group" key={i}>
              <div className="pr-4">
                <strong className="block text-[0.95rem] font-bold text-slate-900 mb-1 leading-tight group-hover:text-amber-600 transition-colors">{item.label}</strong>
                <p className="text-[0.82rem] text-slate-500">{item.desc}</p>
              </div>
              <div className="text-slate-400 group-hover:text-slate-900 transition-colors">
                <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7" /></svg>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-red-50/50 border border-red-100 rounded-[16px] p-[24px_28px] mb-6">
        <h3 className="text-[1.1rem] font-bold text-red-600 mb-1.5">Danger Zone</h3>
        <p className="text-[0.88rem] text-red-500/80 mb-5 leading-relaxed">Once you delete your account, all your data will be permanently removed. This action cannot be undone.</p>
        <button className="px-5 py-2.5 rounded-lg font-bold text-[0.88rem] bg-red-500 text-white transition-all hover:bg-red-600 cursor-pointer shadow-sm">Delete My Account</button>
      </div>
    </>
  );
}
