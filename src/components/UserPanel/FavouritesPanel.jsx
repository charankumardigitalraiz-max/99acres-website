import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toggleWishlist } from '../../store/slices/propertiesSlice';
import { propertiesData } from '../../data/propertiesData';

const IconPin = () => <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>;

export default function FavouritesPanel() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { wishlist } = useSelector(state => state.properties);
  const favProps = propertiesData.filter(p => wishlist.includes(p.id));

  if (favProps.length === 0) return (
    <div className="bg-white border border-slate-100 rounded-[16px] p-[28px_32px] mb-6 shadow-[0_2px_12px_rgba(0,0,0,0.01)]">
      <div className="text-[1.15rem] font-semibold text-slate-900 mb-1.5 tracking-tight">My Favourites</div>
      <div className="text-center py-20 px-5">
        <div className="text-[3.5rem] mb-5 opacity-40">💔</div>
        <h3 className="text-[1.3rem] font-extrabold text-slate-900 mb-2">No saved properties yet</h3>
        <p className="text-[0.95rem] text-slate-400">Tap the heart icon on any property to save it here.</p>
      </div>
    </div>
  );

  return (
    <div className="bg-white border border-slate-100 rounded-[16px] p-[28px_32px] mb-6 shadow-[0_2px_12px_rgba(0,0,0,0.01)]">
      <div className="flex items-center justify-between gap-4 mb-6">
        <div>
          <div className="text-[1.15rem] font-semibold text-slate-900 mb-1.5 tracking-tight">My Favourites</div>
          <div className="text-[0.88rem] text-slate-500">{favProps.length} saved propert{favProps.length === 1 ? 'y' : 'ies'}</div>
        </div>
        <span className="text-[0.65rem] font-bold uppercase tracking-wider p-[3px_10px] rounded-full bg-amber-500 text-white shadow-sm">{favProps.length} Saved</span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {favProps.map(p => (
          <div className="bg-white border border-slate-100 rounded-xl overflow-hidden cursor-pointer transition-all duration-[400ms] ease-[cubic-bezier(0.165,0.84,0.44,1)] hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(0,0,0,0.04)] group" key={p.id} onClick={() => navigate(`/property/${p.id}`)}>
            <div className="h-[160px] overflow-hidden relative">
              <img src={p.img} alt={p.title} crossOrigin="anonymous" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
              <button className="absolute top-[10px] right-[10px] w-8 h-8 rounded-full bg-white/90 backdrop-blur-[4px] border-none flex items-center justify-center cursor-pointer text-base z-[2] transition-all duration-200 hover:bg-white hover:scale-110 shadow-sm" title="Remove" onClick={e => { e.stopPropagation(); dispatch(toggleWishlist(p.id)); }}>❤️</button>
            </div>
            <div className="p-4">
              <div className="inline-block text-[0.65rem] font-bold uppercase p-[3px_8px] rounded-md bg-slate-50 text-slate-500 mb-2 border border-slate-100">{p.propertyType}</div>
              <div className="text-[1.1rem] font-bold text-slate-900 mb-1 leading-tight">{p.price}</div>
              <div className="text-[0.9rem] font-medium text-slate-600 mb-1.5 truncate" title={p.title}>{p.title}</div>
              <div className="text-[0.78rem] text-slate-400 flex items-center gap-1"><IconPin /> {p.loc}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
