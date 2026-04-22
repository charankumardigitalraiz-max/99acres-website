import React, { useState } from 'react';
import { useSelector } from 'react-redux';

export default function SupportPanel() {
  const { tickets } = useSelector(state => state.userPanel);
  const [view, setView] = useState('list'); // 'list', 'form', or 'chat'
  const [selectedTicket, setSelectedTicket] = useState(null);

  if (view === 'form') {
    return (
      <div className="bg-white border border-slate-100 rounded-[16px] p-[28px_32px] mb-6 shadow-[0_2px_12px_rgba(0,0,0,0.01)]">
        <div className="flex items-center justify-between gap-4 mb-8">
          <div>
            <div className="text-[1.15rem] font-semibold text-slate-900 mb-1.5 tracking-tight">Raise New Ticket</div>
            <div className="text-[0.88rem] text-slate-500">Explain your issue and we'll get back to you</div>
          </div>
          <button className="px-3.5 py-2 rounded-lg font-bold text-[0.85rem] border border-slate-200 text-slate-600 transition-all hover:bg-slate-50 hover:text-slate-900 cursor-pointer" onClick={() => setView('list')}>Back to Tickets</button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="flex flex-col gap-2 md:col-span-2">
            <label className="text-[0.75rem] font-bold text-slate-500 uppercase tracking-widest">Subject</label>
            <input type="text" placeholder="Brief summary of the issue" className="p-[11px_14px] border border-slate-200 rounded-lg text-[0.9rem] text-slate-900 outline-none transition-all focus:border-amber-500 focus:shadow-[0_0_0_3px_rgba(245,158,11,0.1)]" />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-[0.75rem] font-bold text-slate-500 uppercase tracking-widest">Category</label>
            <select className="p-[11px_14px] border border-slate-200 rounded-lg text-[0.9rem] text-slate-900 outline-none transition-all focus:border-amber-500 focus:shadow-[0_0_0_3px_rgba(245,158,11,0.1)] bg-white">
              <option>Listing Issue</option>
              <option>Payment/Subscription</option>
              <option>Technical Support</option>
              <option>Account/Profile</option>
              <option>Other</option>
            </select>
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-[0.75rem] font-bold text-slate-500 uppercase tracking-widest">Priority</label>
            <select className="p-[11px_14px] border border-slate-200 rounded-lg text-[0.9rem] text-slate-900 outline-none transition-all focus:border-amber-500 focus:shadow-[0_0_0_3px_rgba(245,158,11,0.1)] bg-white">
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
              <option>Urgent</option>
            </select>
          </div>
          <div className="flex flex-col gap-2 md:col-span-2">
            <label className="text-[0.75rem] font-bold text-slate-500 uppercase tracking-widest">Description</label>
            <textarea placeholder="Describe the problem in detail..." className="p-[11px_14px] border border-slate-200 rounded-lg text-[0.9rem] text-slate-900 outline-none transition-all focus:border-amber-500 focus:shadow-[0_0_0_3px_rgba(245,158,11,0.1)] min-h-[120px] resize-vertical" />
          </div>
        </div>

        <div className="flex gap-3 mt-8">
          <button className="px-5 py-2.5 rounded-lg font-bold text-[0.88rem] bg-amber-500 text-white transition-all hover:bg-amber-600 cursor-pointer" onClick={() => setView('list')}>Submit Ticket</button>
          <button className="px-5 py-2.5 rounded-lg font-bold text-[0.88rem] bg-transparent border border-slate-200 text-slate-600 transition-all hover:bg-slate-50 hover:text-slate-900 cursor-pointer" onClick={() => setView('list')}>Cancel</button>
        </div>
      </div>
    );
  }

  if (view === 'chat' && selectedTicket) {
    return (
      <div className="bg-white border border-slate-100 rounded-[16px] overflow-hidden mb-6 shadow-[0_2px_12px_rgba(0,0,0,0.01)] flex flex-col h-[600px]">
        <div className="flex items-center justify-between p-[18px_24px] border-b border-slate-100 bg-white z-10 shrink-0">
          <div>
            <div className="flex items-center gap-2 mb-0.5">
              <span className="text-[0.65rem] font-bold px-2 py-0.5 rounded-md bg-blue-500 text-white uppercase tracking-wider">{selectedTicket.id}</span>
              <strong className="text-[1rem] font-bold text-slate-900 leading-tight">{selectedTicket.subject}</strong>
            </div>
            <div className="text-[0.82rem] text-slate-500">{selectedTicket.category} · Status: {selectedTicket.status}</div>
          </div>
          <button className="px-3.5 py-2 rounded-lg font-bold text-[0.8rem] border border-slate-200 text-slate-600 transition-all hover:bg-slate-50 hover:text-slate-900 cursor-pointer" onClick={() => setView('list')}>Back to List</button>
        </div>

        <div className="flex-1 p-6 overflow-y-auto flex flex-col gap-4 bg-[#fcfcfd]">
          {/* Support Message */}
          <div className="max-w-[80%] self-start flex flex-col gap-1.5">
            <div className="p-[12px_18px] bg-white border border-slate-100 rounded-[4px_18px_18px_18px] text-[0.92rem] text-slate-700 leading-[1.5] shadow-sm">
              Hello! We've received your ticket regarding <strong className="text-slate-900 italic">"{selectedTicket.subject}"</strong>.
              A support agent will be with you shortly.
            </div>
            <div className="text-[0.7rem] font-semibold text-slate-400 ml-1">{selectedTicket.date}</div>
          </div>

          {/* User Message */}
          <div className="max-w-[80%] self-end flex flex-col items-end gap-1.5">
            <div className="p-[12px_18px] bg-amber-500 text-white rounded-[18px_18px_4px_18px] text-[0.92rem] leading-[1.5] shadow-[0_4px_12px_rgba(245,158,11,0.2)]">
              Thank you. This is an urgent issue as I cannot complete my property listing without the photos.
            </div>
            <div className="text-[0.7rem] font-semibold text-slate-400 mr-1 pb-4">10:32 AM</div>
          </div>
        </div>

        <div className="p-4 bg-white border-t border-slate-100 flex gap-3 shrink-0">
          <input type="text" className="flex-1 p-[11px_16px] bg-slate-50 border border-slate-200 rounded-xl text-[0.9rem] outline-none transition-all focus:bg-white focus:border-amber-500" placeholder="Type your message..." />
          <button className="w-11 h-11 bg-amber-500 text-white rounded-xl flex items-center justify-center cursor-pointer transition-all hover:bg-amber-600 hover:-translate-y-0.5 active:translate-y-0 shadow-lg shadow-amber-500/20">
            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" /></svg>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border border-slate-100 rounded-[16px] p-[28px_32px] mb-6 shadow-[0_2px_12px_rgba(0,0,0,0.01)]">
      <div className="flex items-center justify-between gap-4 mb-6">
        <div>
          <div className="text-[1.15rem] font-semibold text-slate-900 mb-1.5 tracking-tight">Support Tickets</div>
          <div className="text-[0.88rem] text-slate-500">Manage your raised issues and enquiries</div>
        </div>
        <button className="px-4 py-2.5 rounded-lg font-bold text-[0.88rem] bg-amber-500 text-white transition-all hover:bg-amber-600 cursor-pointer shadow-sm" onClick={() => setView('form')}>+ Raise New Ticket</button>
      </div>

      <div className="overflow-x-auto mt-4 -mx-1 px-1">
        <table className="w-full border-collapse min-w-[600px]">
          <thead>
            <tr className="text-left border-b border-slate-100">
              <th className="p-[12px_16px] text-[0.75rem] font-bold text-slate-400 uppercase tracking-widest">Ticket ID</th>
              <th className="p-[12px_16px] text-[0.75rem] font-bold text-slate-400 uppercase tracking-widest">Subject</th>
              <th className="p-[12px_16px] text-[0.75rem] font-bold text-slate-400 uppercase tracking-widest">Category</th>
              <th className="p-[12px_16px] text-[0.75rem] font-bold text-slate-400 uppercase tracking-widest">Status</th>
              <th className="p-[12px_16px] text-[0.75rem] font-bold text-slate-400 uppercase tracking-widest text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map((t, i) => (
              <tr key={i} className="border-b border-slate-100 last:border-none group">
                <td className="p-4 font-semibold text-[0.85rem] text-slate-500 italic">{t.id}</td>
                <td className="p-4">
                  <div className="font-bold text-slate-900 text-[0.88rem] mb-0.5 leading-tight">{t.subject}</div>
                  <div className="text-[0.75rem] text-slate-400 font-medium">{t.date}</div>
                </td>
                <td className="p-4">
                  <span className="text-[0.8rem] text-slate-600 font-medium bg-slate-50 px-2 py-0.5 rounded border border-slate-100">{t.category}</span>
                </td>
                <td className="p-4">
                  <span className={`inline-block text-[0.65rem] font-bold uppercase tracking-wider p-[3px_10px] rounded-full shadow-sm
                    ${t.status === 'Resolved' ? 'bg-emerald-500 text-white' : t.status === 'In Progress' ? 'bg-blue-500 text-white' : 'bg-amber-500 text-white'}`}>
                    {t.status}
                  </span>
                </td>
                <td className="p-4 text-right">
                  <button
                    className="px-3 py-1.5 rounded-lg font-bold text-[0.75rem] border border-slate-200 text-slate-600 transition-all hover:bg-slate-900 hover:text-white hover:border-slate-900 cursor-pointer"
                    onClick={() => {
                      setSelectedTicket(t);
                      setView('chat');
                    }}
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
