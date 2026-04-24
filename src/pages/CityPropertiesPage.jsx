import React, { useState, useMemo, useEffect, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PropertyCard from '../components/PropertyCard/PropertyCard';
import { ChevronL, SearchIco, PinIco, ArrowR, FilterIco, CloseIco, BedIco, IconCheckCircle } from '../data/icons';
import { CITY_HUB_DETAILS } from '../data/constants';
import './CityPropertiesPage.css';


const CityPropertiesPage = () => {
  const { cityName } = useParams();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [activePopover, setActivePopover] = useState(null);
  const [isCitySwitcherOpen, setIsCitySwitcherOpen] = useState(false);
  const [filters, setFilters] = useState({
    minPrice: 0,
    maxPrice: 500000000,
    beds: [],
    status: [],
  });
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const filterRef = useRef(null);

  // Close popovers on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (filterRef.current && !filterRef.current.contains(event.target)) {
        setActivePopover(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Close city switcher on click outside
  const citySwitcherRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (citySwitcherRef.current && !citySwitcherRef.current.contains(event.target)) {
        setIsCitySwitcherOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const allProperties = useSelector(state => [
    ...state.properties.buyProperties,
    ...state.properties.rentProperties
  ]);
  const cities = useSelector(state => state.properties.cities);

  const cityData = useMemo(() => cities.find(c => c.name.toLowerCase() === cityName.toLowerCase()), [cities, cityName]);

  const cityInfo = {
    ...(CITY_HUB_DETAILS[cityName] || {
      tagline: 'Discover Your New Home',
      description: `Explore the finest real estate opportunities available in ${cityName}.`,
      localities: []
    }),
    heroImg: cityData?.img ? cityData.img.replace('w=400', 'w=1600') : 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1600&q=80',
    stats: {
      appreciation: CITY_HUB_DETAILS[cityName]?.stats?.appreciation || '8.0%',
      avgPrice: CITY_HUB_DETAILS[cityName]?.stats?.avgPrice || 'N/A',
      listings: cityData?.count || 'Active'
    }
  };

  const cityProperties = useMemo(() => {
    return allProperties.filter(p => p.city?.toLowerCase() === cityName.toLowerCase());
  }, [allProperties, cityName]);

  const filteredProperties = useMemo(() => {
    let results = cityProperties.filter(p =>
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
  }, [cityProperties, searchQuery, filters]);

  const formatPrice = (p) => {
    if (p >= 10000000) return `₹${(p / 10000000).toFixed(1)} Cr`;
    if (p >= 100000) return `₹${(p / 100000).toFixed(1)} L`;
    return `₹${p}`;
  };

  const handleBHKToggle = (bhk) => {
    setFilters(prev => ({
      ...prev,
      beds: prev.beds.includes(bhk)
        ? prev.beds.filter(b => b !== bhk)
        : [...prev.beds, bhk]
    }));
  };

  return (
    <div className="city-page min-h-screen bg-[#f8fafc] font-['Outfit',sans-serif]">

      {/* ── TOP NAVIGATION ── */}
      <nav className="w-full bg-white border-b border-[#f1f5f9] sticky top-0 z-[100] px-[22px] py-4">
        <div className="max-w-[1350px] mx-auto flex items-center justify-between">
          <Link to="/" className="inline-flex items-center gap-2.5 text-[#475569] hover:text-amber-600 transition-all text-[0.85rem] font-bold no-underline group">
            <div className="w-7 h-7 rounded-full bg-[#f8fafc] border border-[#f1f5f9] flex items-center justify-center group-hover:bg-amber-100 group-hover:border-amber-200 transition-colors">
              <ChevronL className="w-4 h-4" />
            </div>
            Browse All Cities
          </Link>
          <div className="flex items-center gap-3 relative" ref={citySwitcherRef}>
            <button
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#f8fafc] border border-[#f1f5f9] text-[0.7rem] font-bold text-[#64748b] hover:bg-amber-50 hover:text-amber-600 hover:border-amber-200 transition-all cursor-pointer"
              onClick={() => setIsCitySwitcherOpen(!isCitySwitcherOpen)}
            >
              <PinIco className="w-3 h-3" />
              Change City: <span className="text-[#0f172a]">{cityName}</span>
              <ChevronL className={`w-2.5 h-2.5 transition-transform duration-300 ${isCitySwitcherOpen ? '-rotate-90' : 'rotate-90'}`} />
            </button>

            {/* City Switcher Dropdown - Now relative to the header button */}
            {isCitySwitcherOpen && (
              <div className="absolute top-[calc(100%+8px)] right-0 w-[240px] bg-white rounded-[20px] shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-[#f1f5f9] p-2 z-[110] animate-in fade-in slide-in-from-top-2">
                <div className="px-3 py-2 text-[0.65rem] font-bold text-[#94a3b8] uppercase tracking-widest sm:hidden">Switch City</div>
                <div className="max-h-[300px] overflow-y-auto no-scrollbar">
                  {cities.map(city => (
                    <button
                      key={city.name}
                      className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-[0.85rem] font-bold transition-all ${city.name.toLowerCase() === cityName.toLowerCase() ? 'bg-amber-50 text-amber-600' : 'text-[#475569] hover:bg-[#f8fafc] hover:text-[#0f172a]'}`}
                      onClick={() => {
                        setIsCitySwitcherOpen(false);
                        navigate(`/city/${city.name}`);
                      }}
                    >
                      {city.name}
                      {city.name.toLowerCase() === cityName.toLowerCase() && <IconCheckCircle size={14} className="text-amber-600" />}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* ── MOBILE FILTER DRAWER ── */}
      {isDrawerOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[1000] animate-in fade-in duration-300"
          onClick={() => setIsDrawerOpen(false)}
        />
      )}
      <aside className={`fixed top-0 right-0 h-full w-[320px] bg-white z-[1001] shadow-[-10px_0_40px_rgba(0,0,0,0.1)] transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] p-8 overflow-y-auto ${isDrawerOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-[1.25rem] font-bold text-[#0f172a]">Refine Search</h3>
          <button
            className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-100 text-slate-500 hover:bg-rose-50 hover:text-rose-500 transition-all"
            onClick={() => setIsDrawerOpen(false)}
          >
            <CloseIco className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-8">
          {/* Price Range */}
          <div>
            <h4 className="text-[0.8rem] font-bold text-[#94a3b8] uppercase tracking-widest mb-4">Price Range</h4>
            <div className="flex flex-col gap-3">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-[0.65rem] font-bold text-slate-400 uppercase tracking-wider">Min Price</label>
                  <input type="number" value={filters.minPrice} onChange={e => setFilters(p => ({ ...p, minPrice: Number(e.target.value) }))} className="w-full h-11 px-4 rounded-xl border border-[#e2e8f0] text-[0.85rem] font-bold outline-none focus:border-amber-500" placeholder="Min" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[0.65rem] font-bold text-slate-400 uppercase tracking-wider">Max Price</label>
                  <input type="number" value={filters.maxPrice} onChange={e => setFilters(p => ({ ...p, maxPrice: Number(e.target.value) }))} className="w-full h-11 px-4 rounded-xl border border-[#e2e8f0] text-[0.85rem] font-bold outline-none focus:border-amber-500" placeholder="Max" />
                </div>
              </div>
            </div>
          </div>

          {/* BHK Select */}
          <div>
            <h4 className="text-[0.8rem] font-bold text-[#94a3b8] uppercase tracking-widest mb-4">Bedrooms (BHK)</h4>
            <div className="grid grid-cols-3 gap-2">
              {[1, 2, 3, 4, 5].map(v => (
                <button key={v} className={`h-11 rounded-xl border text-[0.85rem] font-bold transition-all ${filters.beds.includes(v) ? 'bg-amber-50 border-amber-500 text-amber-600' : 'bg-white border-[#e2e8f0] text-[#64748b]'}`} onClick={() => handleBHKToggle(v)}>{v} BHK</button>
              ))}
            </div>
          </div>

          {/* Status */}
          <div>
            <h4 className="text-[0.8rem] font-bold text-[#94a3b8] uppercase tracking-widest mb-4">Property Status</h4>
            <div className="flex flex-col gap-2">
              {['ready to move', 'under construction'].map(stat => (
                <button key={stat} className={`flex items-center gap-3 px-4 h-11 rounded-xl border text-[0.85rem] font-bold capitalize transition-all ${filters.status.includes(stat) ? 'bg-amber-50 border-amber-500 text-amber-600' : 'bg-white border-[#e2e8f0] text-[#64748b]'}`} onClick={() => setFilters(prev => ({ ...prev, status: prev.status.includes(stat) ? prev.status.filter(s => s !== stat) : [...prev.status, stat] }))}><IconCheckCircle size={16} /> {stat}</button>
              ))}
            </div>
          </div>

          {/* Locality Switcher for Mobile */}
          {cityInfo.localities.length > 0 && (
            <div>
              <h4 className="text-[0.8rem] font-bold text-[#94a3b8] uppercase tracking-widest mb-4">Localities</h4>
              <div className="flex flex-wrap gap-2">
                {cityInfo.localities.map((loc) => (
                  <button
                    key={loc}
                    className={`h-[36px] px-4 rounded-xl border text-[0.75rem] font-bold transition-all whitespace-nowrap ${searchQuery === loc ? 'bg-amber-500 border-amber-500 text-[#0f172a]' : 'bg-[#f8fafc] border-[#f1f5f9] text-[#475569] hover:border-amber-500 hover:text-amber-600'}`}
                    onClick={() => setSearchQuery(loc === searchQuery ? '' : loc)}
                  >
                    {loc}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="pt-4 flex flex-col gap-3">
            <button className="w-full h-12 rounded-xl bg-[#0f172a] text-white text-[0.9rem] font-bold shadow-lg shadow-[#0f172a]/20" onClick={() => setIsDrawerOpen(false)}>Apply Filters</button>
            <button className="w-full h-12 rounded-xl bg-slate-50 text-slate-500 text-[0.9rem] font-bold" onClick={() => { setFilters({ minPrice: 0, maxPrice: 500000000, beds: [], status: [] }); setSearchQuery(''); }}>Reset All</button>
          </div>
        </div>
      </aside>

      {/* ── LOCALITY EXPLORER ── */}


      {/* ── MAIN LISTING SECTION ── */}
      <section className="py-5 bg-white  shadow-[0_-15px_30px_rgba(0,0,0,0.015)]">
        <div className="max-w-[1350px] mx-auto px-[22px] mb-10">

          {/* Header & Main Search */}
          <div className="flex flex-col gap-6 mb-8">
            <div className="flex items-center justify-between gap-6 max-md:flex-col max-md:items-start max-md:gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <h3 className="text-[1.65rem] font-bold text-[#0f172a] m-0 tracking-tight">
                    Trending in <span className="text-amber-600">{cityName}</span>
                  </h3>
                </div>
                <p className="text-[#64748b] text-[0.85rem] mt-1 font-medium">Explore {filteredProperties.length} handpicked verified listings.</p>
              </div>

              <div className="flex items-center gap-2 max-md:w-full">
                <div className="bg-white p-1.5 rounded-[12px] border border-[#e2e8f0] shadow-sm flex items-center gap-2 flex-1 min-w-[340px] max-sm:min-w-0 transition-all focus-within:border-amber-500 focus-within:shadow-md">
                  <div className="flex items-center gap-2.5 px-3 h-[36px] flex-1">
                    <SearchIco className="w-3.5 h-3.5 text-[#94a3b8]" />
                    <input
                      type="text"
                      placeholder="Search area, project or BHK..."
                      className="bg-transparent border-none outline-none text-[0.8rem] font-medium text-[#0f172a] placeholder:text-[#94a3b8] w-full"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  {searchQuery && (
                    <button
                      className="text-[0.7rem] font-bold text-[#64748b] hover:text-amber-600 px-3 transition-colors"
                      onClick={() => setSearchQuery('')}
                    >
                      Clear
                    </button>
                  )}
                </div>
                <button
                  className="hidden max-md:flex items-center justify-center w-[50px] h-[50px] rounded-[12px] bg-[#0f172a] text-white shadow-lg shadow-[#0f172a]/20 active:scale-95 transition-all"
                  onClick={() => setIsDrawerOpen(true)}
                >
                  <FilterIco className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Filter Chips & Localities Group */}
          <div className="flex flex-wrap items-center justify-between gap-4 max-md:hidden">
            <div className="flex flex-wrap items-center gap-1.5" ref={filterRef}>
              <span className="text-[0.7rem] font-bold text-[#94a3b8] uppercase tracking-wider mr-2">Quick Filters:</span>
              {/* <br /> */}
              {[
                { id: 'budget', label: filters.minPrice > 0 || filters.maxPrice < 500000000 ? `${formatPrice(filters.minPrice)} - ${formatPrice(filters.maxPrice)}` : 'Budget' },
                { id: 'bhk', label: filters.beds.length > 0 ? `${filters.beds.join(', ')} BHK` : 'Bedrooms' },
                { id: 'status', label: filters.status.length > 0 ? 'Status Active' : 'Availability' }
              ].map(f => (
                <div key={f.id} className="relative">
                  <button
                    className={`h-[34px] px-3.5 rounded-full border text-[0.75rem] font-bold flex items-center gap-1.5 transition-all cursor-pointer ${activePopover === f.id ? 'bg-[#0f172a] border-[#0f172a] text-white' : 'bg-white border-[#e2e8f0] text-[#475569] hover:border-amber-500 hover:text-amber-600'}`}
                    onClick={() => setActivePopover(activePopover === f.id ? null : f.id)}
                  >
                    {f.label} <ChevronL className={`w-2.5 h-2.5 transition-transform ${activePopover === f.id ? 'rotate-90' : '-rotate-90'}`} />
                  </button>

                  {activePopover === f.id && (
                    <div className="absolute top-[calc(100%+8px)] left-0 w-[280px] bg-white rounded-[20px] shadow-[0_15px_40px_rgba(0,0,0,0.12)] border border-[#f1f5f9] p-5 z-[100] animate-in fade-in slide-in-from-top-2 duration-200">
                      {f.id === 'budget' && (
                        <>
                          <h4 className="text-[0.9rem] font-bold text-[#0f172a] mb-3">Price Range</h4>
                          <div className="flex gap-2 items-center mb-5">
                            <input type="number" value={filters.minPrice} onChange={e => setFilters(p => ({ ...p, minPrice: Number(e.target.value) }))} className="w-full h-9 px-3 rounded-lg border border-[#e2e8f0] text-[0.8rem] font-bold outline-none focus:border-amber-500" placeholder="Min" />
                            <span className="text-[#94a3b8]">-</span>
                            <input type="number" value={filters.maxPrice} onChange={e => setFilters(p => ({ ...p, maxPrice: Number(e.target.value) }))} className="w-full h-9 px-3 rounded-lg border border-[#e2e8f0] text-[0.8rem] font-bold outline-none focus:border-amber-500" placeholder="Max" />
                          </div>
                          <button className="w-full h-9 rounded-lg bg-[#0f172a] text-white text-[0.75rem] font-bold" onClick={() => setActivePopover(null)}>Set Budget</button>
                        </>
                      )}
                      {f.id === 'bhk' && (
                        <>
                          <h4 className="text-[0.9rem] font-bold text-[#0f172a] mb-3">Select BHK</h4>
                          <div className="grid grid-cols-2 gap-2 mb-5">
                            {[1, 2, 3, 4, 5].map(v => (
                              <button key={v} className={`h-9 rounded-lg border text-[0.75rem] font-bold transition-all ${filters.beds.includes(v) ? 'bg-amber-50 border-amber-500 text-amber-600' : 'bg-white border-[#e2e8f0] text-[#64748b]'}`} onClick={() => handleBHKToggle(v)}>{v} BHK</button>
                            ))}
                          </div>
                          <button className="w-full h-9 rounded-lg bg-[#0f172a] text-white text-[0.75rem] font-bold" onClick={() => setActivePopover(null)}>Set Rooms</button>
                        </>
                      )}
                      {f.id === 'status' && (
                        <>
                          <h4 className="text-[0.9rem] font-bold text-[#0f172a] mb-3">Availability</h4>
                          <div className="flex flex-col gap-2 mb-5">
                            {['ready to move', 'under construction'].map(stat => (
                              <button key={stat} className={`flex items-center gap-3 px-3 h-9 rounded-lg border text-[0.75rem] font-bold capitalize transition-all ${filters.status.includes(stat) ? 'bg-amber-50 border-amber-500 text-amber-600' : 'bg-white border-[#e2e8f0] text-[#64748b]'}`} onClick={() => setFilters(prev => ({ ...prev, status: prev.status.includes(stat) ? prev.status.filter(s => s !== stat) : [...prev.status, stat] }))}><IconCheckCircle size={14} /> {stat}</button>
                            ))}
                          </div>
                          <button className="w-full h-9 rounded-lg bg-[#0f172a] text-white text-[0.75rem] font-bold" onClick={() => setActivePopover(null)}>Apply</button>
                        </>
                      )}
                    </div>
                  )}
                </div>
              ))}
              {(filters.beds.length > 0 || filters.status.length > 0 || filters.minPrice > 0 || filters.maxPrice < 500000000) && (
                <button
                  className="text-[0.7rem] font-bold text-amber-600 hover:underline px-2 transition-colors"
                  onClick={() => setFilters({ minPrice: 0, maxPrice: 500000000, beds: [], status: [] })}
                >
                  Reset Filters
                </button>
              )}
            </div>

            {/* In-Line Locality Chips */}
            {cityInfo.localities.length > 0 && (
              <div className="flex items-center gap-3 pt-3 border-t border-slate-50 max-md:hidden">
                <span className="text-[0.7rem] font-bold text-[#94a3b8] uppercase tracking-wider shrink-0">Popular Areas:</span>
                <div className="flex gap-2 overflow-x-auto no-scrollbar scroll-smooth">
                  {cityInfo.localities.map((loc) => (
                    <button
                      key={loc}
                      className={`shrink-0 h-[34px] px-4 rounded-full border text-[0.75rem] font-bold transition-all whitespace-nowrap ${searchQuery === loc ? 'bg-amber-500 border-amber-500 text-[#0f172a]' : 'bg-[#f8fafc] border-[#f1f5f9] text-[#475569] hover:border-amber-500 hover:text-amber-600'}`}
                      onClick={() => setSearchQuery(loc === searchQuery ? '' : loc)}
                    >
                      {loc}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
          {/* Grid Layout */}
          {filteredProperties.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 2xl:grid-cols-5 lg:mt-10 gap-6 max-sm:gap-3 lg:px-[22px] ">
              {filteredProperties.map(p => (
                <PropertyCard key={p.id} property={p} variant="vertical" />
              ))}
            </div>
          ) : (
            <div className="text-center py-32 bg-[#f8fafc] rounded-[40px] border border-dashed border-[#e2e8f0]">
              <div className="text-[4rem] mb-6 grayscale opacity-20">🏝️</div>
              <h3 className="text-[1.5rem] font-bold text-[#0f172a] mb-2">No Properties Found</h3>
              <p className="text-[#64748b] text-[1rem] max-w-[340px] mx-auto mb-10">We couldn't find matches for "{searchQuery}" in {cityName}.</p>
              <button
                className="h-12 px-8 rounded-full bg-[#0f172a] text-white font-bold cursor-pointer"
                onClick={() => { setSearchQuery(''); setFilters({ minPrice: 0, maxPrice: 500000000, beds: [], status: [] }); }}
              >
                Clear All Search
              </button>
            </div>
          )}
        </ div>
      </section >



      {/* ── CITY FOOTER ── */}
      <section className="py-7 px-[22px] bg-[#0f172a] overflow-hidden relative">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[radial-gradient(circle_at_top_right,rgba(245,158,11,0.08),transparent_70%)]" />
        <div className="max-w-[1350px] mx-auto relative z-10 flex items-center justify-between gap-10 max-lg:flex-col max-lg:text-center">
          <div className="max-w-[550px]">
            <h2 className="text-[1.5rem] font-bold text-white leading-tight tracking-tight mb-3">Ready to Invest in {cityName}?</h2>
            <p className="text-white/60 text-[1.05rem] font-normal leading-relaxed">Our experts can help you shortlist the best exclusive and off-market properties in {cityName}.</p>
          </div>
          <button className="h-[40px] px-10 rounded-xl bg-amber-500 text-white text-[1rem] font-[500] shadow-xl hover:scale-105 active:scale-95 transition-all">Connect with Expert</button>
        </div>
      </section>

    </div>
  );
};

export default CityPropertiesPage;
