import { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './SearchBar.css'; // Minimal: only @keyframes spin
import {
  setActiveTab, setLocation, setQuery, clearSuggestions,
  setPropertyType, setMinBudget, setMaxBudget, toggleBhk,
  setFurnishing, setPostedBy, setPossessionStatus,
  toggleAdvancedFilters, setShowAdvancedFilters, resetAllFilters,
} from '../../store/slices/searchSlice';
import { SearchIco, PinIco, LocIco, IconFlats, CloseIco, GpsIco } from '../../data/icons';

// ── Configuration ─────────────────────────────────────
const SEARCH_TABS = ['Buy', 'Commercial'];

const PROPERTY_TYPES = {
  Buy: ['All Residential', 'Apartment', 'Villa / House', 'Independent Floor', 'Plot / Land'],
  Rent: ['All Residential', 'Apartment', 'Villa / House', 'Independent Floor', 'PG / Co-living'],
  Commercial: ['Office Space', 'Retail Shop', 'Co-Working', 'Warehouse', 'Industrial'],
};

const BUY_BUDGETS = {
  min: ['No Min', '10L', '20L', '30L', '50L', '75L', '1Cr', '1.5Cr', '2Cr', '3Cr', '5Cr'],
  max: ['No Max', '20L', '30L', '50L', '75L', '1Cr', '1.5Cr', '2Cr', '3Cr', '5Cr', '10Cr+'],
};

const RENT_BUDGETS = {
  min: ['No Min', '5K', '8K', '10K', '15K', '20K', '25K', '30K', '40K', '50K'],
  max: ['No Max', '10K', '15K', '20K', '25K', '30K', '40K', '50K', '75K', '1L+'],
};

const BHK_OPTIONS = ['1 RK', '1', '2', '3', '4', '4+'];
const FURNISHING_OPTIONS = ['Furnished', 'Semi-Furnished', 'Unfurnished'];
const POSTED_BY_OPTIONS = ['Owner', 'Builder / Developer', 'Agent'];
const POSSESSION_OPTIONS = ['Ready to Move', 'Under Construction', 'New Launch'];

function SuggestionIcon({ type }) {
  if (type === 'city') return <PinIco />;
  if (type === 'locality') return <LocIco />;
  if (type === 'property') return <SearchIco />;
  return <IconFlats />;
}

export default function SearchBar({ isNavbar = false }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const locationRef = useRef(null);
  const rootRef = useRef(null);
  const [isLocationFocused, setIsLocationFocused] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isGpsLoading, setIsGpsLoading] = useState(false);

  const {
    activeTab, location, query, suggestions, recentSearches,
    propertyType, minBudget, maxBudget, bhk,
    furnishing, postedBy, possessionStatus, showAdvancedFilters,
  } = useSelector(s => s.search);

  const budgets = activeTab === 'Rent' ? RENT_BUDGETS : BUY_BUDGETS;
  const types = PROPERTY_TYPES[activeTab] || PROPERTY_TYPES.Buy;

  // Lock body scroll when mobile search is open
  useEffect(() => {
    document.body.style.overflow = isMobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isMobileOpen]);

  // Close suggestions on outside click
  useEffect(() => {
    const handleOut = (e) => {
      const isInsideRoot = rootRef.current && rootRef.current.contains(e.target);
      const mobileModal = document.getElementById('mobile-search-modal');
      const isInsideMobileModal = mobileModal && mobileModal.contains(e.target);

      if (!isInsideRoot && !isInsideMobileModal) {
        setIsLocationFocused(false);
        dispatch(clearSuggestions());
        if (showAdvancedFilters) dispatch(setShowAdvancedFilters(false));
      }
    };
    document.addEventListener('mousedown', handleOut);
    document.addEventListener('touchstart', handleOut);
    return () => {
      document.removeEventListener('mousedown', handleOut);
      document.removeEventListener('touchstart', handleOut);
    };
  }, [dispatch, showAdvancedFilters]);

  const handleSearch = (e) => {
    e?.preventDefault();
    setIsMobileOpen(false);
    document.body.style.overflow = '';
    navigate('/properties');
  };

  const handleSelect = (s) => {
    dispatch(setQuery(s.text));
    setIsLocationFocused(false);
    dispatch(clearSuggestions());
    navigate('/properties');
  };

  const handleRecentSelect = (text) => {
    dispatch(setQuery(text));
    setIsLocationFocused(false);
    navigate('/properties');
  };

  const handleDetectLocation = (e) => {
    e?.stopPropagation();
    if (!navigator.geolocation) return;
    setIsGpsLoading(true);
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const { latitude, longitude } = pos.coords;
          const res = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`);
          const data = await res.json();
          const cityName = data.city || data.locality || data.principalSubdivision;
          if (cityName) { dispatch(setQuery(cityName)); }
        } catch (err) { console.error('GPS Error:', err); }
        finally { setIsGpsLoading(false); }
      },
      () => setIsGpsLoading(false),
      { timeout: 10000 }
    );
  };

  const showDropdown = isLocationFocused;
  const displayValue = query;

  // ── Mobile Full-Screen Modal ──────────────────────────
  const mobileModal = isMobileOpen && ReactDOM.createPortal(
    <div id="mobile-search-modal" className="fixed inset-0 h-dvh bg-white z-[9999] flex flex-col overscroll-contain overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-start px-[18px] py-3 border-b border-[#f1f5f9] bg-white shrink-0 gap-[14px] z-[10]">
        <button
          className="w-[42px] h-[42px] rounded-full border border-[#e2e8f0] bg-[#f8fafc] text-[#0f172a] flex items-center justify-center shrink-0 transition-all active:scale-95"
          onClick={() => setIsMobileOpen(false)}
          aria-label="Back"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
        <span className="text-[1.05rem] font-extrabold text-[#0f172a] tracking-[-0.01em]">Search Properties</span>
      </div>

      {/* Tab switcher */}
      <div className="flex gap-2 px-[18px] pt-4 shrink-0 overflow-x-auto scrollbar-none">
        {SEARCH_TABS.map(tab => (
          <button
            key={tab}
            className={`flex-1 py-2.5 px-4 rounded-xl border-[1.5px] text-[0.85rem] font-bold whitespace-nowrap transition-all ${
              activeTab === tab
                ? 'bg-amber-500 border-amber-500 text-white shadow-[0_4px_12px_rgba(245,158,11,0.2)]'
                : 'bg-[#f8fafc] border-[#e2e8f0] text-[#64748b] hover:bg-slate-100'
            }`}
            onClick={() => dispatch(setActiveTab(tab))}
          >{tab}</button>
        ))}
      </div>

      {/* Scrollable body */}
      <div className="flex-1 overflow-y-auto px-[18px] py-5 flex flex-col gap-5">
        {/* Location field */}
        <div className="flex flex-col gap-2" ref={locationRef}>
          <label className="text-[0.75rem] font-extrabold uppercase tracking-[0.08em] text-[#94a3b8]">Location</label>
          <div className="flex items-center gap-3 px-[14px] py-3 border-[1.5px] border-[#e2e8f0] rounded-xl bg-white shadow-[0_4px_12px_rgba(0,0,0,0.03)] transition-all focus-within:border-amber-500 focus-within:shadow-[0_0_0_4px_rgba(245,158,11,0.1)]">
            <SearchIco className="w-5 h-5 text-[#94a3b8] shrink-0" />
            <input
              type="text"
              autoFocus
              placeholder="City, locality, project…"
              value={displayValue}
              onChange={e => dispatch(setQuery(e.target.value))}
              onFocus={() => setIsLocationFocused(true)}
              className="flex-1 border-none outline-none bg-transparent text-base font-semibold text-[#1e293b] w-full"
            />
            {displayValue && (
              <button
                className="text-[#94a3b8] p-1 flex items-center justify-center rounded-full hover:bg-[#f1f5f9] hover:text-red-500 transition-colors"
                onClick={() => { dispatch(clearSuggestions()); dispatch(setQuery('')); }}
              >
                <CloseIco style={{ width: 14, height: 14 }} />
              </button>
            )}
            <button
              type="button"
              className={`flex items-center justify-center w-8 h-8 rounded-full transition-all hover:bg-[#f1f5f9] hover:text-amber-500 text-[#94a3b8] ${isGpsLoading ? 'animate-[spin_1s_linear_infinite]' : ''}`}
              onClick={handleDetectLocation}
              aria-label="Detect my location"
            >
              {isGpsLoading ? (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" /></svg>
              ) : <GpsIco />}
            </button>
          </div>
          {showDropdown && (
            <SuggestionDropdown
              suggestions={suggestions}
              recentSearches={recentSearches}
              query={query}
              onSelect={handleSelect}
              onRecent={handleRecentSelect}
              activeTab={activeTab}
              propertyType={propertyType}
              bhk={bhk}
              minBudget={minBudget}
              maxBudget={maxBudget}
              budgets={budgets}
              types={types}
              dispatch={dispatch}
              inline
            />
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center gap-3 px-4 py-4 border-t border-[#f1f5f9] bg-white pb-[calc(16px+env(safe-area-inset-bottom,0px))]">
        <button
          className="px-5 h-[52px] rounded-[14px] border-[1.5px] border-[#e2e8f0] bg-[#f8fafc] text-[0.9rem] font-bold text-[#64748b] transition-colors hover:border-slate-300"
          onClick={() => dispatch(resetAllFilters())}
        >
          Reset
        </button>
        <button
          className="flex-1 flex items-center justify-center gap-2 h-[52px] rounded-[14px] bg-[#0f172a] text-white text-[0.95rem] font-bold uppercase tracking-[0.05em] transition-all hover:bg-amber-500 hover:-translate-y-px hover:shadow-[0_4px_12px_rgba(245,158,11,0.2)]"
          onClick={handleSearch}
        >
          <SearchIco className="w-[18px] h-[18px]" />
          <span>Search</span>
        </button>
      </div>
    </div>,
    document.body
  );

  // ── Desktop / Hero View ─────────────────────────────
  return (
    <>
      {mobileModal}

      <div className={`w-full max-w-[1000px] mx-auto relative z-[200] ${isNavbar ? 'max-w-[480px]' : ''}`} ref={rootRef}>

        {/* Tabs (Buy / Commercial) — desktop only */}
        {!isNavbar && (
          <div className="flex gap-1 mb-2 px-1">
            {SEARCH_TABS.map(tab => (
              <button
                key={tab}
                className={`px-5 py-2 text-[0.82rem] font-bold cursor-pointer transition-all rounded-lg border-none relative uppercase tracking-[0.05em] ${
                  activeTab === tab
                    ? 'text-white bg-white/20 after:content-[""] after:absolute after:bottom-[-4px] after:left-[20%] after:right-[20%] after:h-[3px] after:bg-amber-500 after:rounded-[10px] after:shadow-[0_0_10px_rgba(245,158,11,0.4)]'
                    : 'text-white/70 bg-transparent hover:text-white hover:bg-white/10'
                }`}
                onClick={() => dispatch(setActiveTab(tab))}
              >{tab}</button>
            ))}
          </div>
        )}

        {/* Card */}
        <div className={`bg-white rounded-[20px] relative ${!isNavbar ? 'shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05),0_20px_25px_-5px_rgba(0,0,0,0.1)] border border-black/5 p-3' : 'p-0 border-none shadow-none bg-transparent'}`}>

          {/* Mobile Trigger */}
          <button
            className={`md:hidden w-full flex items-center gap-3 bg-white rounded-2xl border border-[#e2e8f0] cursor-pointer ${
              isNavbar
                ? 'h-[40px] px-3 gap-2.5 rounded-[10px] bg-[#f1f5f9] border-[#e2e8f0]'
                : 'py-[14px] px-4'
            }`}
            onClick={() => { if (window.innerWidth <= 768) setIsMobileOpen(true); }}
            aria-label="Open search"
          >
            <div className={`flex items-center justify-center rounded-xl shrink-0 ${
              isNavbar
                ? 'w-7 h-7 bg-transparent text-[#94a3b8]'
                : 'w-10 h-10 bg-amber-500 text-white'
            }`}>
              <SearchIco className={isNavbar ? 'w-[18px] h-[18px]' : 'w-5 h-5'} />
            </div>
            <div className="flex-1 text-left min-w-0 flex flex-col">
              <span className={`block font-bold text-[#1e293b] whitespace-nowrap overflow-hidden text-ellipsis leading-[1.2] ${isNavbar ? 'text-[0.85rem] font-medium text-[#64748b]' : 'text-[0.95rem]'}`}>
                {displayValue || (location ? `Search in ${location}...` : 'Search city, locality, project…')}
              </span>
              {!isNavbar && (
                <span className="text-[0.72rem] text-[#94a3b8] font-medium">
                  {activeTab} · {propertyType} {bhk.length > 0 ? `· ${bhk.length} BHK` : ''}
                </span>
              )}
            </div>
          </button>

          {/* Desktop Form */}
          {!isNavbar && (
            <div className="hidden md:flex flex-col gap-3">
              <form className="flex items-center bg-[#f8fafc] rounded-2xl border border-[#e2e8f0] h-16 transition-all focus-within:border-amber-500 focus-within:bg-white focus-within:shadow-[0_0_0_4px_rgba(245,158,11,0.05)]" onSubmit={handleSearch}>
                {/* Location input */}
                <div
                  className="flex-[1.5] h-full flex flex-col justify-center px-6 cursor-pointer transition-colors hover:bg-black/[0.02] rounded-tl-2xl rounded-bl-2xl min-w-0"
                  onClick={() => setIsLocationFocused(true)}
                >
                  <div className="flex items-center gap-3 w-full">
                    <SearchIco className="w-5 h-5 text-[#94a3b8] shrink-0" />
                    <input
                      type="text"
                      placeholder={location ? `Search in ${location}...` : "Search for locality, project, or landmark"}
                      value={displayValue}
                      onChange={e => dispatch(setQuery(e.target.value))}
                      onFocus={() => setIsLocationFocused(true)}
                      autoComplete="off"
                      className="flex-1 border-none outline-none bg-transparent text-[1rem] font-semibold text-[#1e293b] placeholder:text-[#cbd5e1] placeholder:font-medium"
                    />
                    {displayValue && (
                      <button
                        type="button"
                        className="text-[#94a3b8] p-1 flex items-center justify-center rounded-full hover:bg-[#f1f5f9] hover:text-red-500 transition-colors"
                        onClick={() => { dispatch(clearSuggestions()); dispatch(setQuery('')); }}
                      >
                        <CloseIco />
                      </button>
                    )}
                  </div>
                </div>

                {/* Search button */}
                <div className="px-2">
                  <button
                    type="submit"
                    className="flex items-center justify-center gap-2 bg-[#0f172a] text-white px-7 h-12 rounded-xl border-none text-[0.95rem] font-bold uppercase tracking-[0.05em] transition-all hover:bg-amber-500 hover:-translate-y-px hover:shadow-[0_4px_12px_rgba(245,158,11,0.2)]"
                  >
                    <span>Search</span>
                  </button>
                </div>
              </form>

              {/* Trending tags */}
              <div className="flex items-center gap-3 px-3 py-1">
                <span className="text-[0.75rem] font-bold text-[#94a3b8] uppercase tracking-[0.05em]">Trending:</span>
                <div className="flex gap-2 flex-wrap">
                  {['Mumbai', 'Bangalore', 'Gurugram', 'Hyderabad'].map(tag => (
                    <button
                      key={tag}
                      className="text-[0.8rem] font-semibold text-[#475569] bg-[#f1f5f9] px-[14px] py-1 rounded-full border border-transparent transition-all hover:bg-white hover:border-amber-500 hover:text-amber-500"
                      onClick={(e) => { e.preventDefault(); dispatch(setQuery(tag)); navigate('/properties'); }}
                    >{tag}</button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Desktop Mega Dropdown */}
          {isLocationFocused && !isNavbar && (
            <SuggestionDropdown
              suggestions={suggestions}
              recentSearches={recentSearches}
              query={query}
              onSelect={handleSelect}
              onRecent={handleRecentSelect}
              activeTab={activeTab}
              propertyType={propertyType}
              bhk={bhk}
              minBudget={minBudget}
              maxBudget={maxBudget}
              budgets={budgets}
              types={types}
              dispatch={dispatch}
            />
          )}
        </div>

        {/* Advanced Filters Panel */}
        {showAdvancedFilters && !isNavbar && (
          <div className="mt-3 animate-[heroFadeUp_0.3s_cubic-bezier(0.16,1,0.3,1)]">
            <div className="bg-white rounded-[20px] px-5 py-5 shadow-[0_4px_20px_rgba(0,0,0,0.08)] border border-black/5 flex flex-wrap gap-5 items-center">
              {[
                { label: 'Furnishing', options: FURNISHING_OPTIONS, value: furnishing, setter: setFurnishing },
                { label: 'Posted By', options: POSTED_BY_OPTIONS, value: postedBy, setter: setPostedBy },
                { label: 'Possession', options: POSSESSION_OPTIONS, value: possessionStatus, setter: setPossessionStatus },
              ].map(({ label, options, value, setter }) => (
                <div key={label} className="flex items-center gap-3">
                  <span className="text-[0.72rem] font-extrabold uppercase tracking-[0.08em] text-[#94a3b8] whitespace-nowrap">{label}</span>
                  <div className="flex gap-1.5 flex-wrap">
                    {options.map(f => (
                      <button
                        key={f}
                        type="button"
                        className={`px-[14px] py-1.5 rounded-full border-[1.5px] text-[0.78rem] font-semibold transition-all ${
                          value === f
                            ? 'bg-amber-500 border-amber-500 text-white shadow-[0_4px_10px_rgba(245,158,11,0.2)]'
                            : 'bg-[#f8fafc] border-[#e2e8f0] text-[#475569] hover:border-amber-500 hover:text-amber-500'
                        }`}
                        onClick={() => dispatch(setter(value === f ? '' : f))}
                      >{f}</button>
                    ))}
                  </div>
                </div>
              ))}
              <div className="flex items-center gap-3 ml-auto">
                <button
                  className="text-[0.85rem] font-semibold text-[#94a3b8] underline underline-offset-2 transition-colors hover:text-[#475569]"
                  onClick={() => dispatch(resetAllFilters())}
                >Reset All</button>
                <button
                  className="flex items-center gap-2 h-10 px-4 bg-[#0f172a] text-white rounded-[10px] text-[0.85rem] font-bold transition-all hover:bg-amber-500"
                  onClick={handleSearch}
                >
                  <SearchIco className="w-[18px] h-[18px]" /> Search
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

// ── Suggestion Dropdown ─────────────────────────────────
function SuggestionDropdown({
  suggestions, recentSearches, query, onSelect, onRecent, inline,
  activeTab, propertyType, bhk, minBudget, maxBudget, budgets, types, dispatch
}) {
  const isInitial = !query;

  return (
    <div className={`bg-white rounded-[20px] border border-[#e2e8f0] z-[500] overflow-hidden ${
      inline
        ? 'static shadow-none border-none mt-0'
        : `absolute top-[calc(100%+12px)] left-0 right-0 w-full shadow-[0_10px_15px_-3px_rgba(0,0,0,0.1),0_25px_50px_-12px_rgba(0,0,0,0.15)] animate-[heroFadeUp_0.3s_cubic-bezier(0.16,1,0.3,1)] max-h-[520px] overflow-y-auto ${isInitial ? 'w-[700px] max-w-[95vw]' : ''}`
    }`}>
      {isInitial ? (
        <div>
          <div className={`grid min-h-[250px] ${inline ? 'flex flex-col' : 'grid-cols-[130px_1.4fr_1fr]'}`}>
            {/* Category column */}
            <div className={`px-[18px] py-[14px] border-r border-[#f1f5f9] ${inline ? 'border-r-0 border-b py-[18px] px-0' : ''}`}>
              <div className="text-[0.68rem] font-extrabold uppercase tracking-[0.12em] text-[#94a3b8] px-6 pt-5 pb-2.5 flex items-center gap-2">Category</div>
              <div className="flex flex-col gap-1">
                {SEARCH_TABS.map(tab => (
                  <button
                    key={tab}
                    className={`text-left px-3 py-2 rounded-lg border border-transparent text-[0.82rem] font-semibold transition-all ${
                      activeTab === tab
                        ? 'bg-[#fef3c7] text-amber-500 border-amber-500/10'
                        : 'bg-transparent text-[#64748b] hover:bg-[#f8fafc] hover:text-[#1e293b]'
                    }`}
                    onClick={(e) => { e.stopPropagation(); dispatch(setActiveTab(tab)); }}
                  >{tab}</button>
                ))}
              </div>
            </div>

            {/* Property type column */}
            <div className={`px-[18px] py-[14px] border-r border-[#f1f5f9] ${inline ? 'border-r-0 border-b py-[18px] px-0' : ''}`}>
              <div className="text-[0.68rem] font-extrabold uppercase tracking-[0.12em] text-[#94a3b8] px-6 pt-5 pb-2.5 flex items-center gap-2">Property Type</div>
              <div className="flex flex-col gap-0.5">
                {types.slice(0, 6).map(t => (
                  <button
                    key={t}
                    className={`flex items-center justify-between px-[14px] py-2 rounded-lg border-none text-[0.88rem] font-medium transition-all ${
                      propertyType === t
                        ? 'text-amber-500 font-bold bg-[#fffbeb]'
                        : 'text-[#475569] bg-transparent hover:bg-[#f8fafc] hover:text-[#1e293b]'
                    }`}
                    onClick={(e) => { e.stopPropagation(); dispatch(setPropertyType(t)); }}
                  >
                    {t}
                    {propertyType === t && <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="w-3 h-3"><polyline points="20 6 9 17 4 12" /></svg>}
                  </button>
                ))}
              </div>
            </div>

            {/* BHK & Budget column */}
            <div className={`px-[18px] py-[14px] ${inline ? 'py-[18px] px-0' : ''}`}>
              {(activeTab === 'Buy' || activeTab === 'Rent') && !propertyType.toLowerCase().includes('plot') && !propertyType.toLowerCase().includes('land') && (
                <div className="mb-6">
                  <div className="text-[0.68rem] font-extrabold uppercase tracking-[0.12em] text-[#94a3b8] px-6 pt-5 pb-2.5">BHK Type</div>
                  <div className="flex flex-wrap gap-1.5 px-2">
                    {BHK_OPTIONS.map(b => (
                      <button
                        key={b}
                        className={`px-[14px] py-1.5 rounded-lg border-[1.5px] text-[0.75rem] font-bold transition-all ${
                          bhk.includes(b)
                            ? 'bg-[#0f172a] border-[#0f172a] text-white'
                            : 'bg-white border-[#e2e8f0] text-[#64748b] hover:border-amber-500 hover:text-amber-500'
                        }`}
                        onClick={(e) => { e.stopPropagation(); dispatch(toggleBhk(b)); }}
                      >{b === '1 RK' ? '1RK' : `${b} BHK`}</button>
                    ))}
                  </div>
                </div>
              )}
              <div>
                <div className="text-[0.68rem] font-extrabold uppercase tracking-[0.12em] text-[#94a3b8] px-6 pt-5 pb-2.5">Budget</div>
                <div className="grid grid-cols-2 gap-2.5 px-2">
                  {[
                    { label: 'Min', values: budgets.min, value: minBudget, setter: setMinBudget },
                    { label: 'Max', values: budgets.max, value: maxBudget, setter: setMaxBudget },
                  ].map(({ label, values, value, setter }) => (
                    <div key={label} className="flex flex-col gap-1">
                      <span className="text-[0.65rem] font-extrabold text-[#94a3b8] uppercase">{label}</span>
                      <select
                        value={value || values[0]}
                        onChange={e => { e.stopPropagation(); dispatch(setter(e.target.value)); }}
                        onClick={e => e.stopPropagation()}
                        className="w-full py-2.5 px-3 rounded-[10px] border-[1.5px] border-[#e2e8f0] bg-[#f8fafc] text-[0.85rem] font-semibold text-[#1e293b] outline-none cursor-pointer focus:border-amber-500 focus:bg-white"
                      >
                        {values.map(b => <option key={b} value={b}>{b}</option>)}
                      </select>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>
          {suggestions.length > 0 ? (
            <div className="py-3 max-h-[480px] overflow-y-auto scrollbar-thin scrollbar-color-[#e2e8f0]">
              <div className="text-[0.68rem] font-extrabold uppercase tracking-[0.08em] text-[#94a3b8] px-4 pt-2.5 pb-1.5 border-b border-[#f0f4f8]">Suggestions</div>
              {suggestions.map((s, i) => (
                <div
                  key={i}
                  className="flex items-center gap-4 py-3 px-6 cursor-pointer transition-all border-b border-[#f1f5f9] last:border-b-0 hover:bg-[#f8fafc] group"
                  onMouseDown={(e) => { e.preventDefault(); onSelect(s); }}
                  onTouchStart={(e) => { e.preventDefault(); onSelect(s); }}
                >
                  <div className="w-11 h-11 rounded-xl bg-[#f8fafc] border border-[#f1f5f9] flex items-center justify-center text-[#64748b] shrink-0 transition-all group-hover:bg-[#0f172a] group-hover:text-white group-hover:border-[#0f172a] group-hover:scale-105 group-hover:shadow-[0_8px_16px_rgba(15,23,42,0.15)]">
                    <SuggestionIcon type={s.type} />
                  </div>
                  <div className="flex flex-col items-start">
                    <span className="text-[0.95rem] font-bold text-[#1e293b] block whitespace-nowrap overflow-hidden text-ellipsis">{s.text}</span>
                    <span className="text-[0.72rem] text-[#94a3b8] font-semibold uppercase tracking-[0.05em] mt-px">
                      {s.type === 'property' ? 'Property' : s.type.charAt(0).toUpperCase() + s.type.slice(1)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-[60px] px-10 text-center flex flex-col items-center gap-3 text-[#94a3b8]">
              <span>No results found for &ldquo;{query}&rdquo;</span>
            </div>
          )}
        </>
      )}
    </div>
  );
}
