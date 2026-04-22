import React, { useState, useMemo, useRef, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { propertiesData } from '../data/propertiesData';
import PropertyCard from '../components/PropertyCard/PropertyCard';
import { ChevronL, SearchIco, ArrowR, FilterIco, CloseIco, BedIco, IconCheckCircle } from '../data/icons';
import './CategoryViewDetails.css';

const CATEGORY_DESCRIPTIONS = {
  'Apartments': 'Premium urban dwellings with modern amenities and connected lifestyles.',
  'Villas': 'Exquisite independent homes offering privacy, luxury, and curated spaces.',
  'Commercial': 'Prime business locations and office spaces designed for corporate excellence.',
  'New Projects': 'Be the first to own. Explore upcoming and under-construction developments.',
  'Plots-Land': 'Premium residential and agricultural lands in high-growth investment zones.'
};

const CATEGORY_IMAGES = {
  'Apartments': 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=700&q=80',
  'Villas': '/property_images/villa.jpg',
  'Commercial': '/property_images/commercial_1776438564126.png',
  'New Projects': 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=700&q=80',
  'Plots-Land': 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=700&q=80',
};

const CATEGORY_THEMES = {
  'Apartments': { color: '#6366f1', bg: '#eef2ff' },
  'Villas': { color: '#f59e0b', bg: '#fffbeb' },
  'Commercial': { color: '#0ea5e9', bg: '#f0f9ff' },
  'New Projects': { color: '#10b981', bg: '#ecfdf5' },
  'Plots-Land': { color: '#f97316', bg: '#fff7ed' },
};

const CategoryViewDetails = () => {
  const { categoryName } = useParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('Featured');
  const [activePopover, setActivePopover] = useState(null); // 'budget', 'bhk', 'status', 'sort'
  const [filters, setFilters] = useState({
    minPrice: 0,
    maxPrice: 500000000, // 50 Cr
    beds: [],
    status: [],
    furnishing: []
  });
  const searchInputRef = useRef(null);
  const toolbarRef = useRef(null);

  // Close popovers on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (toolbarRef.current && !toolbarRef.current.contains(event.target)) {
        setActivePopover(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const theme = CATEGORY_THEMES[categoryName] || CATEGORY_THEMES['Apartments'];
  const bannerImg = CATEGORY_IMAGES[categoryName] || CATEGORY_IMAGES['Apartments'];

  // ─── FILTERING LOGIC ───
  const filteredProperties = useMemo(() => {
    let results = propertiesData.filter(p => {
      const type = (p.propertyType || '').toLowerCase();
      const cat = categoryName.toLowerCase();

      if (cat === 'apartments') return type.includes('apartment') || type.includes('flat');
      if (cat === 'villas') return type.includes('villa') || type.includes('independent house');
      if (cat === 'commercial') return type.includes('commercial') || type.includes('office') || type.includes('retail');
      if (cat === 'plots-land' || cat === 'plots' || cat === 'land') return type.includes('plot') || type.includes('land');
      if (cat === 'new projects') return p.status === 'new' || p.availabilityStatus === 'under construction';
      return type === cat;
    });

    if (searchQuery) {
      results = results.filter(p =>
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.loc.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // --- NEW FILTERS LOGIC ---
    results = results.filter(p => {
      const price = p.pricing?.expectedPrice || 0;
      const priceMatch = price >= filters.minPrice && price <= filters.maxPrice;

      const bhkMatch = filters.beds.length === 0 || filters.beds.includes(Number(p.beds));
      const statusMatch = filters.status.length === 0 || filters.status.includes(p.availabilityStatus?.toLowerCase());
      const furnishingMatch = filters.furnishing.length === 0 || filters.furnishing.includes(p.furnishingStatus?.toLowerCase());

      return priceMatch && bhkMatch && statusMatch && furnishingMatch;
    });

    if (sortBy === 'Price: Low to High') results.sort((a, b) => (a.pricing?.expectedPrice || 0) - (b.pricing?.expectedPrice || 0));
    else if (sortBy === 'Price: High to Low') results.sort((a, b) => (b.pricing?.expectedPrice || 0) - (a.pricing?.expectedPrice || 0));

    return results;
  }, [categoryName, searchQuery, sortBy, filters]);

  const clearFilters = () => {
    setFilters({
      minPrice: 0,
      maxPrice: 500000000,
      beds: [],
      status: [],
      furnishing: []
    });
    setSearchQuery('');
    setSortBy('Featured');
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

  return (
    <div className="min-h-screen bg-[#f8fafc] font-['Outfit',sans-serif] pb-24">

      {/* ── HERO HEADER ── */}
      <header
        className="relative h-[270px] bg-cover bg-center flex flex-col justify-end overflow-hidden"
        style={{ backgroundImage: `url(${bannerImg})` }}
      >
        {/* <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-[#0f172a]/40 to-transparent z-1" /> */}

        <div className="relative z-10 max-w-[1350px] mx-auto px-[22px] w-full pb-16">
          <nav className="mb-8">
            <Link to="/" className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors text-[0.9rem] font-medium no-underline">
              <ChevronL className="w-4 h-4" /> Home
            </Link>
          </nav>

          <div className="flex justify-between items-end gap-10 max-md:flex-col max-md:items-start max-md:gap-6">
            <div className="max-w-[700px]">
              <h1 className="text-[2rem] font-bold text-white leading-[1.1] tracking-tight mb-2 max-md:text-[2.5rem]">
                {categoryName}
              </h1>
              <p className="text-[1.1rem] text-white/80 leading-relaxed font-normal max-w-[550px]">
                {CATEGORY_DESCRIPTIONS[categoryName] || `Discover the best ${categoryName} listings.`}
              </p>
            </div>
            {/* <div className="bg-white/10 backdrop-blur-md border border-white/20 px-6 py-3 rounded-[20px] flex items-center gap-3">
              <div className="w-2.5 h-2.5 bg-emerald-400 rounded-full animate-pulse" />
              <span className="text-white text-[1.1rem] font-bold">
                {filteredProperties.length} <span className="font-medium text-white/70 ml-1">Properties Found</span>
              </span>
            </div> */}
          </div>
        </div>
      </header>

      {/* ── TOOLBAR ── */}
      <section className="sticky top-[80px] z-[100] mt-[-30px]">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="bg-white/95 backdrop-blur-xl rounded-[28px] p-2 shadow-[0_20px_50px_-10px_rgba(0,0,0,0.12)] border border-white/50 flex items-center justify-between gap-4 max-lg:flex-col max-lg:items-stretch max-lg:p-4" ref={toolbarRef}>
            <div className="flex items-center flex-1 gap-1 max-lg:flex-wrap">
              {/* Inline Filters */}
              <div className="flex items-center gap-1.5 p-1 bg-[#f8fafc] rounded-[22px] border border-[#f1f5f9]">
                {/* Budget Dropdown */}
                <div className="relative">
                  <button
                    className={`h-[46px] px-6 rounded-full text-[0.85rem] font-bold cursor-pointer transition-all border-none flex items-center gap-2 ${activePopover === 'budget' ? 'bg-[#0f172a] text-white shadow-lg' : (filters.minPrice > 0 || filters.maxPrice < 500000000 ? 'bg-amber-50 text-amber-600' : 'bg-transparent text-[#64748b] hover:bg-white hover:text-[#0f172a]')}`}
                    onClick={() => setActivePopover(activePopover === 'budget' ? null : 'budget')}
                  >
                    Budget <span className={`text-[0.7rem] transition-transform ${activePopover === 'budget' ? 'rotate-180' : ''}`}>▾</span>
                  </button>
                  {activePopover === 'budget' && (
                    <div className="absolute top-[calc(100%+12px)] left-0 w-[320px] bg-white rounded-[24px] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.15)] border border-[#f1f5f9] p-6 z-[200] animate-in fade-in slide-in-from-top-2 duration-300">
                      <h4 className="text-[1rem] font-bold text-[#0f172a] mb-5 font-['Outfit']">Price Range</h4>
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
                    <div className="absolute top-[calc(100%+12px)] left-0 w-[280px] bg-white rounded-[24px] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.15)] border border-[#f1f5f9] p-6 z-[200] animate-in fade-in slide-in-from-top-2 duration-300">
                      <h4 className="text-[1rem] font-bold text-[#0f172a] mb-5 font-['Outfit']">Select BHK</h4>
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
                      <button className="w-full h-11 rounded-xl bg-[#0f172a] text-white font-bold cursor-pointer hover:bg-amber-600 transition-colors" onClick={() => setActivePopover(null)}>Apply</button>
                    </div>
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
                    <div className="absolute top-[calc(100%+12px)] left-0 w-[280px] bg-white rounded-[24px] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.15)] border border-[#f1f5f9] p-6 z-[200] animate-in fade-in slide-in-from-top-2 duration-300">
                      <h4 className="text-[1rem] font-bold text-[#0f172a] mb-5 font-['Outfit']">Property Status</h4>
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
                      <button className="w-full h-11 rounded-xl bg-[#0f172a] text-white font-bold cursor-pointer hover:bg-amber-600 transition-colors" onClick={() => setActivePopover(null)}>Apply</button>
                    </div>
                  )}
                </div>
              </div>

              {/* Search Space (Expansive) */}
              <div className="flex-1 ml-2 max-lg:ml-0 overflow-hidden">
                <div
                  className="flex items-center gap-3 h-[52px] bg-transparent transition-all border-none group"
                  onClick={() => searchInputRef.current?.focus()}
                >
                  <SearchIco className="w-5 h-5 text-[#94a3b8] ml-4 shrink-0 transition-colors group-focus-within:text-amber-600" />
                  <input
                    ref={searchInputRef}
                    type="text"
                    placeholder={`Search in ${categoryName}...`}
                    className="w-full bg-transparent border-none outline-none text-[1rem] font-medium text-[#0f172a] placeholder:text-[#94a3b8] pr-4 h-full"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4 border-l border-[#f1f5f9] pl-4 max-lg:border-l-0 max-lg:pl-0 max-lg:pt-4 max-lg:border-t max-lg:justify-between">
              <div className="flex items-center gap-3">
                <span className="text-[0.85rem] font-bold text-[#64748b] whitespace-nowrap">Sort:</span>
                <select
                  className="bg-[#f8fafc] border-none px-3 py-2 pr-6 rounded-xl text-[0.85rem] font-bold text-[#0f172a] focus:outline-none cursor-pointer w-[135px] text-ellipsis overflow-hidden whitespace-nowrap"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option>Featured</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Newest First</option>
                </select>
              </div>
              {/* {filteredProperties.length < propertiesData.length && (
                <button className="text-[0.85rem] font-bold text-[#64748b] bg-transparent border-none cursor-pointer hover:text-amber-600 transition-colors" onClick={clearFilters}>Reset</button>
              )} */}
            </div>
          </div>
        </div>
      </section>

      {/* ── MAIN LAYOUT: GRID + SIDEBAR ── */}
      <div className="max-w-[1350px] mx-auto px-[22px] py-12 flex gap-10 relative items-start max-xl:flex-col-reverse max-xl:items-stretch">

        {/* ── PROPERTY GRID ── */}
        <main className="flex-1 min-w-0">
          <div className="mb-8 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-1.5 h-8 bg-amber-500 rounded-full" />
              <h2 className="text-[1.35rem] font-semibold text-[#0f172a] tracking-tight">Available {categoryName}</h2>
            </div>
          </div>
          {filteredProperties.length > 0 ? (
            <div className="grid gap-8 grid-cols-3 max-lg:grid-cols-1">
              {filteredProperties.map(property => (
                <PropertyCard
                  key={property.id}
                  property={property}
                  variant={(categoryName.toLowerCase().includes('land') || categoryName.toLowerCase().includes('plot')) ? 'land' : 'vertical'}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-24 bg-white rounded-[40px] border border-dashed border-[#e2e8f0] shadow-sm">
              <div className="text-[5rem] mb-6 grayscale opacity-20">🔍</div>
              <h3 className="text-[2rem] font-bold text-[#0f172a] mb-2 tracking-tight">No Properties Found</h3>
              <p className="text-[#64748b] text-[1.1rem] mb-10 max-w-[400px] mx-auto leading-relaxed">We couldn't find any {categoryName} matching your current filters.</p>
              <button
                className="h-[56px] px-10 rounded-full bg-[#0f172a] text-white text-[1rem] font-bold cursor-pointer transition-all hover:bg-amber-600 hover:shadow-xl active:scale-95 shadow-lg"
                onClick={clearFilters}
              >
                Clear All Filters
              </button>
            </div>
          )}
        </main>

        {/* ── STICKY RIGHT SIDEBAR BANNER ── */}
        <aside className="w-[360px] sticky top-[120px] shrink-0 max-xl:static max-xl:w-full">
          <div className="bg-white rounded-[32px] overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-[#e2e8f0] relative group">
            <div className="relative p-8 flex flex-col gap-8">
              <div>
                <div className="inline-block px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-600 text-[0.7rem] font-bold uppercase tracking-widest mb-5">Market Intel</div>
                <h3 className="text-[1.8rem] font-bold text-[#0f172a] leading-tight tracking-tight">
                  Market Pulse<br />
                  <span className="text-amber-500 underline decoration-amber-500/30 underline-offset-8">{categoryName}</span>
                </h3>
              </div>

              {/* Price Trend Chart */}
              <div className="bg-[#f8fafc] rounded-3xl p-6 border border-[#e2e8f0]">
                <p className="text-[0.7rem] font-bold text-[#64748b] uppercase tracking-[0.1em] mb-6">Price Trends (2022 – 2024)</p>
                <div className="flex items-end gap-3 h-[100px] mb-6">
                  <div className="flex-1 bg-slate-200/50 rounded-t-lg transition-all duration-700 hover:bg-slate-200" style={{ height: '40%' }} />
                  <div className="flex-1 bg-slate-200 rounded-t-lg transition-all duration-700 hover:bg-slate-300" style={{ height: '65%' }} />
                  <div className="flex-1 bg-amber-500 rounded-t-lg shadow-[0_10px_20px_rgba(245,158,11,0.2)] relative" style={{ height: '90%' }}>
                    <div className="absolute top-[-30px] left-1/2 -translate-x-1/2 bg-[#0f172a] text-white text-[0.65rem] font-black px-1.5 py-0.5 rounded-md">2024</div>
                  </div>
                </div>
                <p className="flex items-center gap-2 text-emerald-600 text-[0.9rem] font-bold">
                  <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping" /> +12.4% appreciation this year
                </p>
              </div>

              {/* Developers */}
              {/* <div>
                <p className="text-[0.7rem] font-bold text-[#64748b] uppercase tracking-[0.1em] mb-4">Elite Developers</p>
                <div className="flex flex-wrap gap-2">
                  {['Prestige', 'Aparna', 'My Home', 'Godrej'].map(dev => (
                    <span key={dev} className="px-3.5 py-1.5 rounded-full bg-white border border-[#e2e8f0] text-[#475569] text-[0.75rem] font-bold hover:border-amber-500 hover:text-amber-600 cursor-default transition-all shadow-sm">{dev}</span>
                  ))}
                </div>
              </div> */}

              {/* Stats row */}
              <div className="grid grid-cols-3 gap-4 border-y border-[#f1f5f9] py-8">
                <div className="text-center">
                  <div className="text-[1.35rem] font-black text-[#0f172a]">{filteredProperties.length}</div>
                  <div className="text-[0.6rem] font-bold text-[#94a3b8] uppercase tracking-wider">Live</div>
                </div>
                <div className="text-center border-x border-[#f1f5f9]">
                  <div className="text-[1.35rem] font-black text-[#0f172a]">0%</div>
                  <div className="text-[0.6rem] font-bold text-[#94a3b8] uppercase tracking-wider">Fees</div>
                </div>
                <div className="text-center">
                  <div className="text-[1.35rem] font-black text-[#0f172a]">Full</div>
                  <div className="text-[0.6rem] font-bold text-[#94a3b8] uppercase tracking-wider">Direct</div>
                </div>
              </div>

              {/* CTA */}
              <div className="flex flex-col gap-5">
                <p className="text-[#64748b] text-[0.9rem] leading-relaxed italic pr-2">"Need expert counsel? Connect for legal and financial guidance."</p>
                <Link to="/contact-us" className="h-[60px] px-8 rounded-2xl bg-[#0f172a] text-white text-[1rem] font-bold flex items-center justify-between no-underline transition-all hover:bg-amber-600 hover:shadow-[0_15px_40px_rgba(245,158,11,0.2)] active:scale-95 group/btn">
                  Connect Now <ArrowR className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default CategoryViewDetails;