import React, { useState, useRef, useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import PropertyCard from '../components/PropertyCard/PropertyCard';
import { ArrowR, SearchIco, ChevronL, BedIco, IconCheckCircle, PinIco } from '../data/icons';
import './CollectionPage.css';

const COLLECTION_IMAGES = {
  'high-rated': 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1400&q=80',
  'land': 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1400&q=80',
  'featured': 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1400&q=80',
  'high-rated-locality': 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1400&q=80',
};

const EXPERT_NOTES = {
  'high-rated': "These properties represent the pinnacle of customer satisfaction and architectural excellence in the current market.",
  'land': "Strategic land parcels in high-growth corridors, meticulously vetted for title clarity and long-term development value.",
  'featured': "Exclusively hand-picked by our specialists for their unique architectural language and exceptional lifestyle amenities.",
  'high-rated-locality': "Focusing on the most sought-after urban neighborhoods where connectivity meets elite residential standards"
};

const CollectionPage = ({ type, title, subtitle }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activePopover, setActivePopover] = useState(null);
  const [filters, setFilters] = useState({
    minPrice: 0,
    maxPrice: 500000000,
    beds: [],
    status: [],
  });
  const searchRef = useRef(null);
  const islandRef = useRef(null);

  // Close popovers on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (islandRef.current && !islandRef.current.contains(event.target)) {
        setActivePopover(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const properties = useSelector(state => {
    if (type === 'high-rated') return state.properties.highRated;
    if (type === 'land') return state.properties.landProperties;
    if (type === 'featured') return state.properties.featured;
    if (type === 'high-rated-locality') return state.properties.hydLocalities;
    return [];
  });

  const filteredProperties = useMemo(() => {
    let results = properties.filter(p =>
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.loc.toLowerCase().includes(searchQuery.toLowerCase())
    );

    results = results.filter(p => {
      const price = p.pricing?.expectedPrice || 0;
      const priceMatch = price >= filters.minPrice && price <= filters.maxPrice;
      const bhkMatch = filters.beds.length === 0 || filters.beds.includes(Number(p.beds));
      const statusMatch = filters.status.length === 0 || filters.status.includes(p.availabilityStatus?.toLowerCase());
      return priceMatch && bhkMatch && statusMatch;
    });

    return results;
  }, [properties, searchQuery, filters]);

  const clearFilters = () => {
    setFilters({
      minPrice: 0,
      maxPrice: 500000000,
      beds: [],
      status: []
    });
    setSearchQuery('');
  };

  const handleBHKToggle = (bhk) => {
    setFilters(prev => ({
      ...prev,
      beds: prev.beds.includes(bhk)
        ? prev.beds.filter(b => b !== bhk)
        : [...prev.beds, bhk]
    }));
  };

  const formatPrice = (p) => {
    if (p >= 10000000) return `₹${(p / 10000000).toFixed(1)} Cr`;
    if (p >= 100000) return `₹${(p / 100000).toFixed(1)} L`;
    return `₹${p}`;
  };

  const heroBg = COLLECTION_IMAGES[type] || COLLECTION_IMAGES['featured'];

  return (
    <div className="min-h-screen bg-[#f1f5f9] font-['Outfit',sans-serif]">

      {/* ── HERO BANNER ── */}
      <section
        className="relative h-[270px] bg-cover bg-center flex flex-col justify-end pb-24 transition-all duration-700"
        style={{ backgroundImage: `url(${heroBg})` }}
      >
        {/* <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-[#0f172a]/40 to-transparent z-1" /> */}

        {/* Breadcrumb */}
        <nav className="absolute top-0 left-0 w-full z-10 py-6">
          <div className="max-w-[1350px] mx-auto px-[22px]">
            <Link to="/" className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors text-[0.9rem] font-medium no-underline">
              <ChevronL className="w-4 h-4" /> Home
            </Link>
          </div>
        </nav>

        <div className="relative z-10 max-w-[1350px] mx-auto px-[22px] w-full">
          <div className="max-w-[700px]">
            <h1 className="text-[2rem] font-bold text-white leading-tight tracking-tight mb-3 max-md:text-[1.8rem]">
              {title}
            </h1>
            <p className="text-[1.1rem] text-white/80 leading-relaxed font-normal max-w-[600px]">
              {subtitle || 'Discover curated collections of premium properties.'}
            </p>
          </div>
        </div>
      </section>

      <section className="relative z-[100] mt-[-35px]">
        <div className="max-w-[1350px] mx-auto px-[22px]">
          <div className="bg-white/95 backdrop-blur-xl rounded-[28px] p-2 shadow-[0_20px_50px_-10px_rgba(0,0,0,0.12),0_10px_20px_-5px_rgba(0,0,0,0.04)] border border-white/50 flex items-center justify-between gap-4 max-lg:flex-col max-lg:items-stretch max-lg:p-4" ref={islandRef}>
            <div className="flex items-center flex-1 gap-1 max-lg:flex-wrap max-sm:flex-col max-sm:items-stretch max-sm:gap-3">
              {/* Inline Filters */}
              <div className="flex items-center gap-1.5 p-1 bg-[#f8fafc] rounded-[22px] border border-[#f1f5f9] max-sm:hidden">
                {/* Budget Dropdown */}
                <div className="relative">
                  <button
                    className={`h-[46px] px-6 rounded-full text-[0.85rem] font-bold cursor-pointer transition-all border-none flex items-center gap-2 ${activePopover === 'budget' ? 'bg-[#0f172a] text-white shadow-lg' : (filters.minPrice > 0 || filters.maxPrice < 500000000 ? 'bg-amber-50 text-amber-600' : 'bg-transparent text-[#64748b] hover:bg-white hover:text-[#0f172a]')}`}
                    onClick={() => setActivePopover(activePopover === 'budget' ? null : 'budget')}
                  >
                    Budget <span className={`text-[0.7rem] transition-transform ${activePopover === 'budget' ? 'rotate-180' : ''}`}>▾</span>
                  </button>
                  {activePopover === 'budget' && (
                    <>
                      <div className="fixed inset-0 bg-[#0f172a]/40 backdrop-blur-[2px] z-[190] hidden max-sm:block animate-[fade-in_0.3s_ease-out]" onClick={(e) => { e.stopPropagation(); setActivePopover(null); }} />
                      <div className="absolute top-[calc(100%+12px)] left-0 w-[320px] bg-white rounded-[24px] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.15)] border border-[#f1f5f9] p-6 z-[200] animate-[popover-in_0.3s_ease-out] max-sm:fixed max-sm:top-auto max-sm:bottom-0 max-sm:left-0 max-sm:w-full max-sm:rounded-b-none max-sm:rounded-t-[32px] max-sm:pb-8">
                        <h4 className="text-[1rem] font-bold text-[#0f172a] mb-5">Collection Price Range</h4>
                        <div className="flex gap-3 mb-6">
                          <div className="flex-1">
                            <span className="text-[0.7rem] font-bold text-[#94a3b8] uppercase tracking-wider block mb-1.5 pl-1">Min Price</span>
                            <input
                              type="number"
                              value={filters.minPrice}
                              onChange={(e) => setFilters(prev => ({ ...prev, minPrice: Number(e.target.value) }))}
                              placeholder="Min"
                              className="w-full h-11 px-4 rounded-xl border border-[#e2e8f0] text-[0.9rem] font-semibold focus:outline-none focus:border-amber-500"
                            />
                          </div>
                          <div className="flex-1">
                            <span className="text-[0.7rem] font-bold text-[#94a3b8] uppercase tracking-wider block mb-1.5 pl-1">Max Price</span>
                            <input
                              type="number"
                              value={filters.maxPrice}
                              onChange={(e) => setFilters(prev => ({ ...prev, maxPrice: Number(e.target.value) }))}
                              placeholder="Max"
                              className="w-full h-11 px-4 rounded-xl border border-[#e2e8f0] text-[0.9rem] font-semibold focus:outline-none focus:border-amber-500"
                            />
                          </div>
                        </div>
                        <div className="flex justify-between items-center bg-[#f8fafc] p-3 rounded-xl border border-[#f1f5f9]">
                          <span className="text-[0.8rem] font-bold text-[#475569]">{formatPrice(filters.minPrice)} - {formatPrice(filters.maxPrice)}</span>
                          <button className="h-9 px-4 rounded-lg bg-[#0f172a] text-white text-[0.8rem] font-bold cursor-pointer hover:bg-amber-600 transition-colors" onClick={() => setActivePopover(null)}>Done</button>
                        </div>
                      </div>
                    </>
                  )}
                </div>

                {/* BHK Dropdown */}
                <div className="relative">
                  <button
                    className={`h-[46px] px-6 rounded-full text-[0.85rem] font-bold cursor-pointer transition-all border-none flex items-center gap-2 ${activePopover === 'bhk' ? 'bg-[#0f172a] text-white shadow-lg' : (filters.beds.length > 0 ? 'bg-amber-50 text-amber-600' : 'bg-transparent text-[#64748b] hover:bg-white hover:text-[#0f172a]')}`}
                    onClick={() => setActivePopover(activePopover === 'bhk' ? null : 'bhk')}
                  >
                    BHK {filters.beds.length > 0 && `(${filters.beds.length})`} <span className={`text-[0.7rem] transition-transform ${activePopover === 'bhk' ? 'rotate-180' : ''}`}>▾</span>
                  </button>
                  {activePopover === 'bhk' && (
                    <>
                      <div className="fixed inset-0 bg-[#0f172a]/40 backdrop-blur-[2px] z-[190] hidden max-sm:block animate-[fade-in_0.3s_ease-out]" onClick={(e) => { e.stopPropagation(); setActivePopover(null); }} />
                      <div className="absolute top-[calc(100%+12px)] left-0 w-[280px] bg-white rounded-[24px] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.15)] border border-[#f1f5f9] p-6 z-[200] animate-[popover-in_0.3s_ease-out] max-sm:fixed max-sm:top-auto max-sm:bottom-0 max-sm:left-0 max-sm:w-full max-sm:rounded-b-none max-sm:rounded-t-[32px] max-sm:pb-8">
                        <h4 className="text-[1rem] font-bold text-[#0f172a] mb-5">Bedrooms (BHK)</h4>
                        <div className="grid grid-cols-2 gap-2 mb-6">
                          {[1, 2, 3, 4, 5].map(bhk => (
                            <button
                              key={bhk}
                              className={`flex items-center justify-center gap-2 h-11 rounded-xl border border-[#e2e8f0] text-[0.85rem] font-bold cursor-pointer transition-all ${filters.beds.includes(bhk) ? 'bg-amber-50 border-amber-500 text-amber-600 shadow-sm' : 'bg-white text-[#64748b] hover:bg-[#f8fafc]'}`}
                              onClick={() => handleBHKToggle(bhk)}
                            >
                              <BedIco size={14} />
                              <span>{bhk} BHK</span>
                            </button>
                          ))}
                        </div>
                        <button className="w-full h-11 rounded-xl bg-[#0f172a] text-white font-bold cursor-pointer hover:bg-amber-600 transition-colors" onClick={() => setActivePopover(null)}>Set BHK</button>
                      </div>
                    </>
                  )}
                </div>

                {/* Status Dropdown */}
                <div className="relative">
                  <button
                    className={`h-[46px] px-6 rounded-full text-[0.85rem] font-bold cursor-pointer transition-all border-none flex items-center gap-2 ${activePopover === 'status' ? 'bg-[#0f172a] text-white shadow-lg' : (filters.status.length > 0 ? 'bg-amber-50 text-amber-600' : 'bg-transparent text-[#64748b] hover:bg-white hover:text-[#0f172a]')}`}
                    onClick={() => setActivePopover(activePopover === 'status' ? null : 'status')}
                  >
                    Status <span className={`text-[0.7rem] transition-transform ${activePopover === 'status' ? 'rotate-180' : ''}`}>▾</span>
                  </button>
                  {activePopover === 'status' && (
                    <>
                      <div className="fixed inset-0 bg-[#0f172a]/40 backdrop-blur-[2px] z-[190] hidden max-sm:block animate-[fade-in_0.3s_ease-out]" onClick={(e) => { e.stopPropagation(); setActivePopover(null); }} />
                      <div className="absolute top-[calc(100%+12px)] left-0 w-[280px] bg-white rounded-[24px] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.15)] border border-[#f1f5f9] p-6 z-[200] animate-[popover-in_0.3s_ease-out] max-sm:fixed max-sm:top-auto max-sm:bottom-0 max-sm:left-0 max-sm:w-full max-sm:rounded-b-none max-sm:rounded-t-[32px] max-sm:pb-8">
                        <h4 className="text-[1rem] font-bold text-[#0f172a] mb-5">Availability</h4>
                        <div className="flex flex-col gap-2 mb-6">
                          {['ready to move', 'under construction'].map(stat => (
                            <button
                              key={stat}
                              className={`flex items-center gap-3 px-4 h-11 rounded-xl border border-[#e2e8f0] text-[0.85rem] font-bold cursor-pointer transition-all ${filters.status.includes(stat) ? 'bg-amber-50 border-amber-500 text-amber-600 shadow-sm' : 'bg-white text-[#64748b] hover:bg-[#f8fafc]'}`}
                              onClick={() => setFilters(prev => ({
                                ...prev,
                                status: prev.status.includes(stat) ? prev.status.filter(s => s !== stat) : [...prev.status, stat]
                              }))}
                            >
                              <IconCheckCircle size={14} />
                              <span className="capitalize">{stat}</span>
                            </button>
                          ))}
                        </div>
                        <button className="w-full h-11 rounded-xl bg-[#0f172a] text-white font-bold cursor-pointer hover:bg-amber-600 transition-colors" onClick={() => setActivePopover(null)}>Apply Status</button>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Search Space (Expansive) */}
              <div className="flex-1 ml-2 max-lg:ml-0 max-sm:w-full max-sm:ml-0 flex items-center gap-2 max-sm:gap-3">
                <div
                  className="flex-1 flex items-center gap-3 h-[52px] bg-transparent transition-all border-none focus-within:bg-white focus-within:shadow-[0_4px_15px_rgba(0,0,0,0.05)] rounded-[20px]"
                  onClick={() => searchRef.current?.focus()}
                >
                  <SearchIco className="w-5 h-5 text-[#94a3b8] ml-4 shrink-0" />
                  <input
                    ref={searchRef}
                    type="text"
                    placeholder="Search this collection..."
                    className="w-full bg-transparent border-none outline-none text-[1rem] font-medium text-[#0f172a] placeholder:text-[#94a3b8] pr-4 h-full"
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                  />
                </div>

                <button
                  className="hidden max-sm:flex shrink-0 w-[52px] h-[52px] bg-[#f8fafc] border border-[#f1f5f9] active:bg-[#e2e8f0] transition-colors text-[#0f172a] rounded-[20px] items-center justify-center relative shadow-sm"
                  onClick={() => setActivePopover('mobileFilters')}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon></svg>
                  {(filters.beds.length > 0 || filters.status.length > 0 || filters.minPrice > 0 || filters.maxPrice < 500000000) && (
                    <span className="absolute top-3 right-3 w-2.5 h-2.5 rounded-full bg-amber-500 border-2 border-[#f8fafc]"></span>
                  )}
                </button>
              </div>
            </div>

            {/* Reset filters only shows when active */}
            {(filteredProperties.length < properties.length || searchQuery) && (
              <button
                className="h-[46px] px-6 text-[#64748b] text-[0.85rem] font-bold border-none bg-transparent cursor-pointer hover:text-amber-600 transition-colors whitespace-nowrap"
                onClick={clearFilters}
              >
                Clear All
              </button>
            )}


          </div>
        </div>
      </section>

      {/* ── MAIN CONTENT ── */}
      <div className="max-w-[1350px] mx-auto px-[22px] py-16">

        {filteredProperties.length > 0 ? (
          <>
            {/* Asymmetric Grid for Results */}
            <div className="mb-12 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-1.5 h-8 bg-amber-500 rounded-full" />
                <h2 className="text-[1.35rem] font-semibold text-[#0f172a] tracking-tight">Collection Highlights</h2>
              </div>
              {/* <span className="bg-white border border-[#e2e8f0] px-5 py-2 rounded-full text-[0.9rem] font-bold text-[#64748b] shadow-sm">
                <span className="text-[#0f172a]">{filteredProperties.length}</span> properties found
              </span> */}
            </div>

            <div className="grid grid-cols-4 gap-8 max-xl:grid-cols-3 max-lg:grid-cols-2 max-md:grid-cols-1">
              {filteredProperties.map((property, index) => (
                <div key={property.id}>
                  <PropertyCard
                    property={property}
                    variant={type === 'land' ? 'land' : 'vertical'}
                  />
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-32 bg-white rounded-[40px] border border-dashed border-[#e2e8f0] shadow-sm">
            <div className="text-[5rem] mb-6 grayscale opacity-20">🔍</div>
            <h3 className="text-[2rem] font-bold text-[#0f172a] mb-2 tracking-tight">No Properties Found</h3>
            <p className="text-[#64748b] text-[1.1rem] mb-10 max-w-[400px] mx-auto leading-relaxed">Try adjusting your search or explore other collections.</p>
            <button
              className="h-[56px] px-10 rounded-full bg-[#0f172a] text-white text-[1rem] font-bold cursor-pointer transition-all hover:bg-amber-600 hover:shadow-xl active:scale-95 shadow-lg"
              onClick={() => setSearchQuery('')}
            >
              Clear Search
            </button>
          </div>
        )}
      </div>

      {/* ── BOTTOM CTA ── */}
      <section className="pb-24">
        <div className="max-w-[1350px] mx-auto px-[22px]">
          <div className="bg-[#0f172a] rounded-[48px] p-10 flex justify-between items-center gap-12 relative overflow-hidden shadow-2xl max-lg:flex-col max-lg:text-center max-lg:p-12">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[radial-gradient(circle_at_top_right,rgba(245,158,11,0.15),transparent_70%)] pointer-events-none" />

            <div className="flex-1 relative z-10">
              <h2 className="text-[1.7rem] font-semibold text-white mb-3 leading-tight tracking-tight">Still searching for the perfect home?</h2>
              <p className="text-[1.25rem] text-white/70 max-w-[550px] leading-relaxed max-lg:mx-auto font-normal">Explore our entire catalog of premium and verified properties across all major cities.</p>
            </div>
            <Link to="/properties" className="h-[52px] px-8 rounded-[24px] bg-amber-600 text-white text-[1rem] font-bold flex items-center gap-3 no-underline transition-all hover:bg-white hover:text-amber-600 hover:shadow-[0_20px_50px_rgba(0,0,0,0.3)] hover:-translate-y-1 relative z-10 active:scale-95 shadow-xl">
              Explore All <ArrowR className="w-6 h-6" />
            </Link>
          </div>
        </div>
      </section>

      {/* --- MOBILE FILTERS DRAWER --- */}
      {activePopover === 'mobileFilters' && (
        <>
          <div className="fixed inset-0 bg-[#0f172a]/40 backdrop-blur-[2px] z-[9990] hidden max-sm:block animate-[fade-in_0.2s_ease-out]" onClick={(e) => { e.stopPropagation(); setActivePopover(null); }} />
          <div className="fixed inset-y-0 right-0 w-[85vw] max-w-[400px] bg-white p-6 pb-0 z-[9999] hidden max-sm:flex flex-col shadow-[-20px_0_50px_rgba(0,0,0,0.2)] animate-[popover-in_0.3s_ease-out]" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-6 shrink-0">
              <h3 className="text-[1.3rem] font-bold text-[#0f172a]">Filters</h3>
              <button onClick={() => setActivePopover(null)} className="w-8 h-8 flex items-center justify-center bg-[#f1f5f9] rounded-full text-[#64748b] text-xl leading-none">&times;</button>
            </div>

            <div className="flex-1 overflow-y-auto flex flex-col gap-8 pb-6 pr-1 max-sm:[&::-webkit-scrollbar]:w-1 max-sm:[&::-webkit-scrollbar-thumb]:bg-[#e2e8f0] max-sm:[&::-webkit-scrollbar-thumb]:rounded-full">
              {/* Budget */}
              <div>
                <h4 className="text-[1rem] font-bold text-[#0f172a] mb-4">Price Range</h4>
                <div className="flex flex-col gap-3 mb-3">
                  <div className="flex-1">
                    <span className="text-[0.7rem] font-bold text-[#94a3b8] uppercase tracking-wider block mb-1.5 pl-1">Min Price</span>
                    <input type="number" value={filters.minPrice} onChange={(e) => setFilters(prev => ({ ...prev, minPrice: Number(e.target.value) }))} placeholder="Min" className="w-full h-11 px-4 rounded-xl border border-[#e2e8f0] text-[0.9rem] font-semibold focus:outline-none focus:border-amber-500" />
                  </div>
                  <div className="flex-1">
                    <span className="text-[0.7rem] font-bold text-[#94a3b8] uppercase tracking-wider block mb-1.5 pl-1">Max Price</span>
                    <input type="number" value={filters.maxPrice} onChange={(e) => setFilters(prev => ({ ...prev, maxPrice: Number(e.target.value) }))} placeholder="Max" className="w-full h-11 px-4 rounded-xl border border-[#e2e8f0] text-[0.9rem] font-semibold focus:outline-none focus:border-amber-500" />
                  </div>
                </div>
                <div className="flex justify-between items-center bg-[#f8fafc] p-3 rounded-xl border border-[#f1f5f9]">
                  <span className="text-[0.8rem] font-bold text-[#475569]">{formatPrice(filters.minPrice)} - {formatPrice(filters.maxPrice)}</span>
                </div>
              </div>

              {/* BHK */}
              <div>
                <h4 className="text-[1rem] font-bold text-[#0f172a] mb-4">Bedrooms</h4>
                <div className="grid grid-cols-2 gap-2">
                  {[1, 2, 3, 4, 5].map(bhk => (
                    <button key={bhk} className={`flex items-center justify-center gap-2 h-11 rounded-xl border ${filters.beds.includes(bhk) ? 'bg-amber-50 border-amber-500 text-amber-600 shadow-sm' : 'bg-white border-[#e2e8f0] text-[#64748b]'} text-[0.85rem] font-bold cursor-pointer transition-all`} onClick={() => handleBHKToggle(bhk)}>
                      <BedIco size={14} /><span>{bhk} BHK</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Status */}
              <div>
                <h4 className="text-[1rem] font-bold text-[#0f172a] mb-4">Availability</h4>
                <div className="flex flex-col gap-2">
                  {['ready to move', 'under construction'].map(stat => (
                    <button key={stat} className={`flex items-center gap-3 px-4 h-11 rounded-xl border ${filters.status.includes(stat) ? 'bg-amber-50 border-amber-500 text-amber-600 shadow-sm' : 'bg-white border-[#e2e8f0] text-[#64748b]'} text-[0.85rem] font-bold cursor-pointer transition-all`} onClick={() => setFilters(prev => ({ ...prev, status: prev.status.includes(stat) ? prev.status.filter(s => s !== stat) : [...prev.status, stat] }))}>
                      <IconCheckCircle size={14} /> <span className="capitalize">{stat}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-auto py-6 flex gap-3 shrink-0 bg-white">
              <button className="flex-1 h-12 rounded-xl bg-[#f8fafc] text-[#64748b] font-bold border border-[#e2e8f0] hover:bg-white transition-colors" onClick={clearFilters}>Clear All</button>
              <button className="flex-1 h-12 rounded-xl bg-[#0f172a] text-white font-bold hover:bg-amber-600 transition-colors" onClick={() => setActivePopover(null)}>Show Results</button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CollectionPage;
