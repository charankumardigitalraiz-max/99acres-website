import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toggleWishlist } from '../../store/slices/propertiesSlice';
import { PinIco, BedIco, BathIco, AreaIco, IconPlots } from '../../data/icons';
import { shareProperty } from '../../utils/share';


// ── Shared Icons ──────────────────────────────────────
const HeartIco = ({ isWished, size = 14 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size}
    fill={isWished ? '#ef4444' : 'none'}
    stroke={isWished ? '#ef4444' : 'currentColor'}
    strokeWidth="2.5"
    style={{ transition: 'all 0.3s ease' }}>
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);

const ShareIcon = ({ size = 14 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" />
    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" /><line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
  </svg>
);

const CheckIcon = () => (
  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="#10b981" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
);

const VerifyIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="10" height="10"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" /></svg>
);

// ── Common shared button styles ───────────────────────
const wishBtnBase = 'absolute z-[5] flex items-center justify-center rounded-full bg-white/90 backdrop-blur-[4px] shadow-[0_4px_12px_rgba(0,0,0,0.08)] transition-all duration-300 hover:scale-110 hover:bg-white border-none cursor-pointer';
const shareBtnBase = 'absolute z-[5] flex items-center justify-center rounded-full bg-white/90 backdrop-blur-[4px] shadow-[0_4px_12px_rgba(0,0,0,0.08)] transition-all duration-300 text-[#475569] hover:scale-110 hover:bg-white hover:text-amber-600 border-none cursor-pointer';

export default function PropertyCard({ property, variant = 'vertical' }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const wishlist = useSelector(state => state.properties.wishlist);
  const isWished = wishlist.includes(property.id);
  const [copied, setCopied] = useState(false);

  const handleShare = (e) => { e.stopPropagation(); shareProperty(property, setCopied); };
  const handleWish = (e) => { e.stopPropagation(); dispatch(toggleWishlist(property.id)); };
  const handleClick = () => navigate(`/property/${property.id}`);

  // ── Dynamic stats by property type ───────────────────
  const getStats = () => {
    const type = (property.propertyType || '').toLowerCase();
    if (type.includes('plot') || type.includes('land')) return [
      { val: property.size, icon: <AreaIco /> },
      { val: property.direction || property.facing || 'East Facing', icon: <PinIco /> },
      // { val: property.propertyType?.replace('s', '') || 'Plot', icon: <IconPlots /> },
    ];
    if (type.includes('commercial') || type.includes('office') || type.includes('retail')) return [
      { val: property.size, icon: <AreaIco /> },
      { val: property.propertyType || 'Commercial', icon: null },
      { val: property.availabilityStatus || 'Ready', icon: null },
    ];
    return [
      { val: `${property.beds || 0} BHK`, icon: <BedIco /> },
      { val: `${property.baths || 0} Bath`, icon: <BathIco /> },
      { val: property.size, icon: <AreaIco /> },
    ];
  };
  const stats = getStats();

  // ════════════════════════════════════════════════════
  // VARIANT: LAND (Tailwind Migrated)
  // ════════════════════════════════════════════════════
  if (variant === 'land') {
    return (
      <div className="flex flex-col flex-1 w-full h-full bg-white rounded-[18px] overflow-hidden border border-black/[0.05] shadow-[0_8px_28px_-8px_rgba(0,0,0,0.06)] transition-all duration-[350ms] ease-[cubic-bezier(0.23,1,0.32,1)] cursor-pointer hover:-translate-y-1.5 hover:shadow-[0_24px_48px_-12px_rgba(0,0,0,0.1)] hover:border-emerald-500/15 group" onClick={handleClick}>
        <div className="relative w-full h-[180px] shrink-0 overflow-hidden">
          <img src={property.img} alt={property.title} loading="lazy" className="w-full h-full object-cover transition-transform duration-[800ms] ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-[1.08]" />
          <div className="absolute inset-0 z-[1] bg-gradient-to-b from-transparent via-transparent to-black/55" />

          {property.badge && (
            <span className={`absolute top-3 left-3 z-[3] px-2.5 py-1 rounded-md text-[0.6rem] font-extrabold uppercase tracking-widest backdrop-blur-[6px] text-white ${property.badge === 'Hot' ? 'bg-red-500/85' : property.badge === 'Ready' ? 'bg-blue-500/85' : 'bg-emerald-500/85'}`}>
              Verified
            </span>
          )}

          {property.type && (
            <span className="absolute top-3 right-[60px] z-[3] px-2.5 py-[3px] rounded-full bg-white/15 border border-white/30 backdrop-blur-[6px] text-[0.6rem] font-bold text-white uppercase tracking-widest">
              {property.type}
            </span>
          )}

          <div className="absolute top-2.5 right-2.5 z-[4] flex gap-1.5">
            <button className="w-[30px] h-[30px] rounded-full bg-white/90 backdrop-blur-[4px] border-none flex items-center justify-center cursor-pointer shadow-[0_2px_8px_rgba(0,0,0,0.12)] transition-all duration-200 text-[#64748b] hover:scale-110 hover:bg-white" onClick={handleWish}>
              <HeartIco isWished={isWished} size={14} />
            </button>
            <button className="w-[30px] h-[30px] rounded-full bg-white/90 backdrop-blur-[4px] border-none flex items-center justify-center cursor-pointer shadow-[0_2px_8px_rgba(0,0,0,0.12)] transition-all duration-200 text-[#64748b] hover:scale-110 hover:bg-white hover:text-amber-600" onClick={handleShare}>
              {copied ? <CheckIcon /> : <ShareIcon size={14} />}
            </button>
          </div>

          <div className="absolute bottom-3 left-3 z-[3] flex flex-col gap-px">
            <span className="text-[1.2rem] font-extrabold text-white tracking-tight drop-shadow-[0_1px_4px_rgba(0,0,0,0.3)]">{property.price}</span>
            {property.pricing?.pricePerSqft && <span className="text-[0.68rem] text-white/80 font-medium">₹{property.pricing.pricePerSqft.toLocaleString()}/sq.ft</span>}
          </div>
        </div>

        <div className="p-4 flex-1 flex flex-col gap-2">
          <h3 className="text-[0.85rem] font-bold text-[#0f172a] leading-[1.4] line-clamp-2 m-0" title={property.title}>{property.title}</h3>
          <div className="text-[0.78rem] text-[#94a3b8] flex items-center gap-1 font-medium"><PinIco />{property.size} in {property.loc}</div>

          {/* <div className="hidden sm:flex items-center gap-1.5 pt-3 border-t border-dashed border-slate-200 mt-auto">
            <div className="flex flex-col gap-0.5 flex-1 min-w-0">
              <span className="text-[0.58rem] font-bold uppercase tracking-wider text-[#64748b]">Area</span>
              <span className="text-[0.75rem] font-bold text-[#0f172a] truncate" title={property.size}>{property.size}</span>
            </div>

            <div className="w-px h-6 bg-slate-200 shrink-0" />

            <div className="flex flex-col gap-0.5 flex-1 min-w-0">
              <span className="text-[0.58rem] font-bold uppercase tracking-wider text-[#64748b]">Facing</span>
              <span className="text-[0.75rem] font-bold text-[#0f172a] truncate" title={property.direction || property.facing || '—'}>{property.direction || property.facing || '—'}</span>
            </div>

            {property.propertyType && (
              <>
                <div className="w-px h-6 bg-slate-200 shrink-0" />
                <div className="flex flex-col gap-0.5 flex-1 min-w-0">
                  <span className="text-[0.58rem] font-bold uppercase tracking-wider text-[#64748b]">Type</span>
                  <span className="text-[0.75rem] font-bold text-[#0f172a] truncate" title={property.propertyType}>{property.propertyType}</span>
                </div>
              </>
            )}
          </div> */}

          {/* <button className="mt-auto flex items-center justify-center gap-1.5 w-full py-[9px] px-4 bg-slate-50 border border-slate-200 rounded-xl text-[0.82rem] font-semibold text-[#1e293b] cursor-pointer transition-all duration-200 hover:bg-[#0f172a] hover:text-white hover:border-[#0f172a]" onClick={(e) => { e.stopPropagation(); navigate(`/property/${property.id}`); }}>
            View Details
            <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9 18 15 12 9 6" /></svg>
          </button> */}
        </div>
      </div>
    );
  }

  // ════════════════════════════════════════════════════
  // VARIANT: HORIZONTAL (compact column card)
  // ════════════════════════════════════════════════════
  if (variant === 'horizontal') {
    return (
      <div className="flex flex-col bg-white border border-black/[0.04] rounded-xl overflow-hidden relative transition-all duration-[400ms] ease-[cubic-bezier(0.165,0.84,0.44,1)] shadow-[0_4px_15px_rgba(0,0,0,0.02)] h-full cursor-pointer hover:-translate-y-[5px] hover:shadow-[0_15px_35px_rgba(10,18,42,0.08)] hover:border-amber-200/30 group" onClick={handleClick}>
        {/* Image */}
        <div className="w-full aspect-[16/10] relative shrink-0 overflow-hidden">
          <img src={property.img} alt={property.title} loading="lazy" className="w-full h-full object-cover transition-transform duration-[1000ms] ease-[cubic-bezier(0.165,0.84,0.44,1)] group-hover:scale-[1.15]" />
          {/* Verified badge bottom-left */}
          <div className="absolute bottom-2 left-2 z-[5]">
            <span className="inline-flex items-center gap-[3px] py-[3px] px-1.5 text-[0.58rem] font-semibold rounded-full text-white bg-emerald-500 uppercase tracking-[0.04em] shadow-[0_2px_8px_rgba(0,0,0,0.1)]">
              <VerifyIcon /> Verified
            </span>
          </div>
          <button className={`${wishBtnBase} top-2 right-2 w-[26px] h-[26px] shadow-[0_2px_8px_rgba(0,0,0,0.1)]`} onClick={handleWish}>
            <HeartIco isWished={isWished} size={14} />
          </button>
          <button className={`${shareBtnBase} top-2 right-[16%] w-[26px] h-[26px] shadow-[0_2px_8px_rgba(0,0,0,0.1)]`} onClick={handleShare}>
            {copied ? '✅' : <ShareIcon size={13} />}
          </button>
        </div>
        {/* Info */}
        <div className="p-3 flex-1 flex flex-col">
          <div className="flex justify-between items-center mb-1">
            <span className="text-[0.95rem] font-semibold text-[#0f172a] tracking-[-0.01em]">{property.price}</span>
            <span className="text-[0.62rem] font-bold text-amber-500 bg-amber-500/[0.08] px-1.5 py-[3px] rounded-[4px]">★ {property.rating || '4.5'}</span>
          </div>
          <h3 className="text-[0.8rem] font-medium text-[#0f172a] mb-[3px] leading-[1.35] whitespace-nowrap overflow-hidden text-ellipsis" title={property.title}>{property.title}</h3>
          <div className="text-[0.72rem] text-[#94a3b8] flex items-center gap-[3px] mb-1.5"><PinIco /> {property.loc}</div>
          <div className="flex items-center gap-1 text-[0.65rem] font-medium text-[#94a3b8] mt-auto border-t border-[#f8fafc] pt-2 whitespace-nowrap overflow-hidden text-ellipsis">
            {stats.map((s, i) => (
              <span key={i}>{i > 0 && <span className="opacity-40 mx-[1px]">•</span>}{s.val}</span>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // ════════════════════════════════════════════════════
  // VARIANT: LIST (horizontal row for properties page)
  // ════════════════════════════════════════════════════
  if (variant === 'list') {
    return (
      <div className="flex flex-row bg-white border border-[#f1f5f9] rounded-[20px] overflow-hidden transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] shadow-[0_4px_12px_rgba(15,23,42,0.03)] w-full min-h-[180px] cursor-pointer hover:translate-x-2 hover:shadow-[0_12px_32px_rgba(15,23,42,0.08)] hover:border-amber-400" onClick={handleClick}>
        <div className="w-[280px] min-w-[280px] h-full relative overflow-hidden shrink-0">
          <img src={property.img} alt={property.title} loading="lazy" className="w-full h-full object-cover transition-transform duration-[800ms] ease-[cubic-bezier(0.4,0,0.2,1)]" />
          {property.badge && <span className="absolute top-2.5 left-2.5 bg-[#0f172a] text-white text-[0.65rem] font-semibold uppercase tracking-[0.04em] px-2.5 py-1 rounded-full">{property.badge}</span>}
        </div>
        <div className="flex-1 px-3.5 py-3 flex flex-col gap-1 min-w-0">
          <div className="flex justify-between items-start">
            <span className="text-[1rem] font-semibold text-[#0f172a] tracking-[-0.02em] leading-[1.1]">{property.price}</span>
            <div className="flex items-center gap-1.5 shrink-0">
              <button className="border-none p-0 cursor-pointer leading-none shrink-0" onClick={handleWish}><HeartIco isWished={isWished} size={14} /></button>
              <button className="border-none p-1 cursor-pointer flex items-center justify-center text-[#94a3b8] rounded-md transition-all hover:bg-[#f8fafc] hover:text-amber-600 shrink-0" onClick={handleShare}>
                {copied ? '✅' : <ShareIcon size={14} />}
              </button>
            </div>
          </div>
          <h3 className="text-[0.85rem] font-medium text-[#0f172a] leading-[1.35] whitespace-nowrap overflow-hidden text-ellipsis" title={property.title}>{property.title}</h3>
          <div className="flex items-center gap-[3px] text-[0.72rem] text-[#94a3b8] whitespace-nowrap overflow-hidden text-ellipsis"><PinIco /> {property.loc}</div>
          <div className="flex items-center gap-[5px] text-[0.7rem] font-semibold text-[#475569]">
            {stats.map((s, i) => <span key={i}>{i > 0 && <span className="opacity-35 text-[0.75rem]">·</span>}{s.val}</span>)}
          </div>
          <div className="inline-flex items-center gap-[3px] text-[0.62rem] font-medium text-emerald-500 uppercase tracking-[0.03em] mt-auto"><VerifyIcon /> 100% Verified</div>
        </div>
      </div>
    );
  }

  // ════════════════════════════════════════════════════
  // VARIANT: LISTV2 (mobile 2-column compact)
  // ════════════════════════════════════════════════════
  if (variant === 'listv2') {
    return (
      <div className="bg-white border border-black/[0.08] rounded-xl overflow-hidden flex flex-col transition-transform duration-200 h-full cursor-pointer active:scale-[0.98]" onClick={handleClick}>
        <div className="relative h-[110px] overflow-hidden bg-[#f8fafc]">
          <img src={property.img} alt={property.title} loading="lazy" className="w-full h-full object-cover" />
          <div className="absolute top-1.5 left-1.5 z-[2]">
            <span className="inline-flex items-center gap-[3px] px-2 py-1 text-[0.5rem] font-semibold rounded-full bg-emerald-500 text-white uppercase tracking-[0.04em] shadow-[0_4px_10px_rgba(0,0,0,0.15)]"><VerifyIcon /> Verified</span>
          </div>
          <div className="absolute top-1.5 right-1.5 flex flex-col gap-1 z-[2]">
            <button className="w-6 h-6 rounded-full bg-white/90 border-none flex items-center justify-center text-[0.7rem] shadow-[0_2px_4px_rgba(0,0,0,0.1)] cursor-pointer" onClick={handleWish}><HeartIco isWished={isWished} size={13} /></button>
            <button className="w-6 h-6 rounded-full bg-white/90 border-none flex items-center justify-center shadow-[0_2px_4px_rgba(0,0,0,0.1)] cursor-pointer text-[#64748b]" onClick={handleShare}><ShareIcon size={12} /></button>
          </div>
        </div>
        <div className="p-2.5 flex-1 flex flex-col">
          <div className="text-[0.95rem] font-semibold text-[#0f172a] mb-0.5">{property.price}</div>
          <h3 className="text-[0.78rem] font-semibold text-[#0f172a] mb-1 whitespace-nowrap overflow-hidden text-ellipsis" title={property.title}>{property.title}</h3>
          <div className="text-[0.68rem] text-[#94a3b8] flex items-center gap-[3px] mb-2 whitespace-nowrap overflow-hidden text-ellipsis"><PinIco className="w-[10px] h-[10px]" /> {property.loc}</div>
          <div className="flex items-center gap-[5px] text-[0.65rem] font-semibold text-[#475569]">
            {stats.slice(0, 2).map((s, i) => <span key={i}>{i > 0 && <span className="opacity-40">·</span>}{s.val}</span>)}
          </div>
        </div>
      </div>
    );
  }

  // ════════════════════════════════════════════════════
  // VARIANT: LOCALITIES (Hyderabad-style card)
  // ════════════════════════════════════════════════════
  if (variant === 'localities') {
    return (
      <div className="bg-white border border-[#f1f5f9] rounded-2xl overflow-hidden transition-all duration-300 cursor-pointer hover:shadow-[0_12px_32px_rgba(15,23,42,0.08)] hover:-translate-y-1 group" onClick={handleClick}>
        <div className="relative h-[180px] overflow-hidden bg-[#f1f5f9]">
          <img src={property.img} alt={property.title} loading="lazy" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.06]" />
          <div className="absolute bottom-2 left-2 z-[5] flex items-center gap-[3px] bg-black/50 backdrop-blur-[4px] text-white text-[0.7rem] font-medium px-2 py-1 rounded-full">
            <PinIco /> {property.loc?.split(',')[0]}
          </div>
          <button className={`${wishBtnBase} top-2 right-10 w-[30px] h-[30px]`} onClick={handleWish}><HeartIco isWished={isWished} size={15} /></button>
          <button className={`${shareBtnBase} top-2 right-2 w-[30px] h-[30px]`} onClick={handleShare}>
            {copied ? '✅' : <ShareIcon size={13} />}
          </button>
        </div>
        <div className="p-3.5">
          <h3 className="text-[0.9rem] font-semibold text-[#0f172a] mb-1 whitespace-nowrap overflow-hidden text-ellipsis" title={property.title}>{property.title || 'Premium Property'}</h3>
          <div className="text-[1rem] font-semibold text-[#0f172a] mb-2">{property.price}</div>
          <div className="flex items-center gap-1 flex-wrap">
            {stats.slice(0, 3).map((s, i) => (
              <div key={i} className="flex items-center gap-1 text-[0.60rem] text-[#475569] bg-[#f8fafc] rounded-lg px-2 py-1">
                {s.icon && <span className="opacity-60 [&>svg]:w-2.5 [&>svg]:h-2.5">{s.icon}</span>}
                <span className="font-medium">{s.val}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // ════════════════════════════════════════════════════
  // DEFAULT: VERTICAL ELITE CARD (V7)
  // ════════════════════════════════════════════════════
  return (
    <div className="bg-white border border-black/5 rounded-2xl overflow-hidden flex flex-col transition-all duration-[400ms] ease-[cubic-bezier(0.165,0.84,0.44,1)] shadow-[0_4px_20px_rgba(10,18,42,0.04)] cursor-pointer hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(10,18,42,0.08)] hover:border-amber-500/10 group" onClick={handleClick}>
      {/* Image */}
      <div className="relative h-[170px] max-sm:h-[130px] overflow-hidden bg-[#f1f5f9]">
        <img src={property.img} alt={property.title} loading="lazy" className="w-full h-full object-cover transition-transform duration-[600ms] ease-in-out group-hover:scale-[1.06]" />
        {/* Badges */}
        <div className="absolute top-2.5 left-2.5 z-[5] flex flex-col gap-1.5 items-start">
          <span className="inline-flex items-center gap-[3px] px-2 py-1 text-[0.65rem] max-sm:text-[0.55rem] font-semibold rounded-full text-white bg-emerald-500 backdrop-blur-[4px] shadow-[0_4px_10px_rgba(0,0,0,0.15)] uppercase tracking-[0.04em]">Verified</span>
        </div>
        {/* Wish + Share */}
        <div className="absolute top-2.5 right-2.5 z-[5] flex flex-col gap-1.5">
          <button className={`${wishBtnBase} static w-8 h-8 max-sm:w-7 max-sm:h-7 shadow-[0_2px_10px_rgba(0,0,0,0.1)]`} onClick={handleWish}><HeartIco isWished={isWished} size={15} /></button>
          <button className={`${shareBtnBase} static w-8 h-8 max-sm:w-7 max-sm:h-7 shadow-[0_2px_10px_rgba(0,0,0,0.1)]`} onClick={handleShare}>
            {copied ? '✅' : <ShareIcon size={14} />}
          </button>
        </div>
      </div>

      {/* Body */}
      <div className="px-3.5 py-3 flex-1 flex flex-col">
        <div className="text-[1.15rem] font-medium text-[#0f172a] mb-0.5 tracking-[-0.01em]">{property.price}</div>
        <h3 className="text-[0.85rem] font-medium text-[#0f172a] mb-1 leading-[1.3] whitespace-nowrap overflow-hidden text-ellipsis" title={property.title}>{property.title}</h3>
        <div className="text-[0.75rem] text-[#94a3b8] flex items-center gap-[3px] mb-3">
          <PinIco className="w-3 h-3 opacity-80 shrink-0" /> {property.loc}
        </div>
        {/* Meta strip */}
        <div className="hidden sm:flex items-center gap-1.5 py-1.5 mt-auto border-t border-black/[0.04] overflow-hidden">
          {stats.map((s, i) => (
            <div key={i} className="flex items-center gap-0.5 text-[0.7rem] text-[#0f172a] whitespace-nowrap shrink-0" title={s.val}>
              {s.icon && <span className="opacity-50 shrink-0 [&>svg]:w-3 [&>svg]:h-3">{s.icon}</span>}
              <div className="flex gap-0.5 items-baseline overflow-hidden whitespace-nowrap">
                <span className="font-medium text-[#0f172a]">{s.val}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
