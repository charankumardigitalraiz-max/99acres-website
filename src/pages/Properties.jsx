import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropertyCard from '../components/PropertyCard/PropertyCard';
import { setQuery } from '../store/slices/searchSlice';
import { SearchIco, PinIco } from '../data/icons';
import './Properties.css';

// Detect mobile viewport
function useWindowWidth() {
  const [width, setWidth] = useState(window.innerWidth);
  useEffect(() => {
    const fn = () => setWidth(window.innerWidth);
    window.addEventListener('resize', fn);
    return () => window.removeEventListener('resize', fn);
  }, []);
  return width;
}

export default function Properties() {
  const dispatch = useDispatch();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const isMobile = useWindowWidth() <= 1024;
  const { buyProperties, rentProperties, highRated } = useSelector(state => state.properties);
  const { activeTab, query } = useSelector(state => state.search);

  // activeTab is now a string: 'Buy' | 'Rent' | 'Commercial'
  const currentTabName = activeTab || 'Buy';
  let allListings = [];

  if (currentTabName === 'Buy' || currentTabName === 'New Projects') {
    allListings = [...buyProperties, ...highRated.filter(p => p.type === 'buy')];
  } else if (currentTabName === 'Rent') {
    allListings = [...rentProperties, ...highRated.filter(p => p.type === 'rent')];
  } else {
    allListings = buyProperties; // Commercial fallback
  }

  // Live Filtering Logic
  const filteredListings = allListings.filter(p => {
    const lowerQuery = (query || '').toLowerCase();
    if (!lowerQuery) return true;
    return (
      p.title?.toLowerCase().includes(lowerQuery) ||
      p.city?.toLowerCase().includes(lowerQuery) ||
      p.loc?.toLowerCase().includes(lowerQuery) ||
      p.location?.city?.toLowerCase().includes(lowerQuery) ||
      p.location?.locality?.toLowerCase().includes(lowerQuery) ||
      p.location?.projectName?.toLowerCase().includes(lowerQuery) ||
      p.propertyType?.toLowerCase().includes(lowerQuery)
    );
  });

  // Reusable filter panel content
  const FilterContent = () => (
    <>
      <div className="filter-group">
        <div className="filter-title">Property Status</div>
        <label className="filter-label"><input type="checkbox" defaultChecked /> Ready to Move</label>
        <label className="filter-label"><input type="checkbox" /> Under Construction</label>
        <label className="filter-label"><input type="checkbox" /> New Projects</label>
      </div>
      <div className="filter-group">
        <div className="filter-title">Property Type</div>
        <label className="filter-label"><input type="checkbox" defaultChecked /> Apartment</label>
        <label className="filter-label"><input type="checkbox" /> Independent Villa</label>
        <label className="filter-label"><input type="checkbox" /> Studio</label>
      </div>
      <div className="filter-group">
        <div className="filter-title">BHK Format</div>
        <label className="filter-label"><input type="checkbox" /> 1 BHK</label>
        <label className="filter-label"><input type="checkbox" defaultChecked /> 2 BHK</label>
        <label className="filter-label"><input type="checkbox" defaultChecked /> 3 BHK</label>
        <label className="filter-label"><input type="checkbox" /> 4+ BHK</label>
      </div>
      <button className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
        Apply Filters
      </button>
    </>
  );

  return (
    <div className="min-h-screen bg-[#f8fafc] font-['Outfit',sans-serif] pb-[80px]">

      {/* ── MOBILE ONLY: overlay + slide drawer ── */}
      {isFilterOpen && (
        <div 
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[1000] transition-opacity duration-300" 
          onClick={() => setIsFilterOpen(false)} 
        />
      )}
      <aside className={`fixed top-0 right-0 h-full w-[320px] bg-white z-[1001] shadow-[-10px_0_40px_rgba(0,0,0,0.1)] transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] p-6 overflow-y-auto ${isFilterOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex justify-between items-center mb-8 pb-4 border-b border-[#f1f5f9]">
          <h3 className="text-[1.25rem] font-bold text-[#0f172a]">Filters</h3>
          <button 
            className="w-9 h-9 flex items-center justify-center rounded-full bg-[#f1f5f9] border-none text-[1.1rem] cursor-pointer hover:bg-red-50 hover:text-red-500 transition-colors" 
            onClick={() => setIsFilterOpen(false)}
          >
            ✕
          </button>
        </div>
        <FilterContent />
      </aside>

      <div className="max-w-[1280px] mx-auto px-6 pt-10">
        <div className="flex gap-8 relative items-start">

          {/* ── DESKTOP ONLY: sticky sidebar ── */}
          <aside className="w-[280px] sticky top-[100px] shrink-0 max-lg:hidden">
            <div className="text-[0.75rem] font-bold uppercase tracking-[0.1em] text-[#94a3b8] mb-6 pl-1">Refine Results</div>
            <div className="bg-white p-6 rounded-[24px] border border-[#e2e8f0] shadow-sm">
              <FilterContent />
            </div>
          </aside>

          {/* RESULTS GRID */}
          <div className="flex-1 min-w-0">

            {/* Search Input Row */}
            <div className="mb-6">
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#94a3b8] transition-colors group-focus-within:text-amber-600">
                  <SearchIco className="w-5 h-5" />
                </div>
                <input
                  type="text"
                  placeholder={`Search for properties in ${currentTabName}...`}
                  className="w-full h-[56px] pl-12 pr-12 rounded-[18px] border border-[#e2e8f0] bg-white text-[1rem] font-medium placeholder:text-[#94a3b8] focus:outline-none focus:border-amber-500 focus:shadow-[0_8px_30px_rgba(245,158,11,0.06)] shadow-sm transition-all"
                  value={query || ''}
                  onChange={(e) => dispatch(setQuery(e.target.value))}
                />
                {query && (
                  <button 
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 flex items-center justify-center rounded-full bg-slate-100 text-slate-400 border-none cursor-pointer hover:bg-slate-200 hover:text-slate-600 transition-colors" 
                    onClick={() => dispatch(setQuery(''))}
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>

            <div className="flex justify-between items-center mb-6 gap-4 max-sm:flex-col max-sm:items-start">
              <div className="text-[#64748b] text-[1.1rem] font-medium font-['Outfit']">
                Showing <span className="text-[#0f172a] font-bold underline decoration-amber-500/30 underline-offset-4">{filteredListings.length}</span> {currentTabName} Properties
              </div>
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  className="hidden max-lg:flex items-center gap-2 h-11 px-5 rounded-full bg-white border border-[#e2e8f0] text-[#0f172a] font-bold text-[0.85rem] cursor-pointer shadow-sm hover:border-amber-500 hover:text-amber-600 transition-all flex-1 justify-center whitespace-nowrap"
                  onClick={() => setIsFilterOpen(true)}
                >
                  <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
                  </svg>
                  <span>Filters</span>
                </button>
                <div className="relative min-w-[180px] max-md:min-w-0 max-md:flex-1">
                  <select className="appearance-none w-full h-11 pl-4 pr-10 rounded-full bg-white border border-[#e2e8f0] text-[#0f172a] text-[0.85rem] font-bold cursor-pointer transition-all hover:border-amber-500 focus:outline-none focus:border-amber-600 shadow-sm">
                    <option>Sort by: Relevancy</option>
                    <option>Price: Low to High</option>
                    <option>Price: High to Low</option>
                    <option>Recently Added</option>
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#94a3b8]">
                    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="6 9 12 15 18 9" /></svg>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid gap-6 grid-cols-[repeat(auto-fill,minmax(220px,1fr))] max-md:grid-cols-2 max-sm:gap-3">
              {filteredListings.map(property => (
                <PropertyCard
                  key={property.id}
                  property={property}
                  variant={isMobile ? 'listv2' : 'vertical'}
                />
              ))}
            </div>

            {filteredListings.length === 0 && (
              <div className="text-center py-20 bg-white rounded-[32px] border border-dashed border-[#e2e8f0] mt-10">
                <div className="text-[4rem] mb-6 grayscale opacity-20">🔍</div>
                <h3 className="text-[1.75rem] font-semibold text-[#0f172a] mb-2">No properties found</h3>
                <p className="text-[#64748b] text-[1.1rem] mb-8 max-w-[400px] mx-auto leading-relaxed">Try adjusting your search keywords, exploring a different category or clearing all filters.</p>
                <button 
                  className="h-[52px] px-8 rounded-full bg-[#0f172a] text-white text-[1rem] font-bold cursor-pointer transition-all hover:bg-amber-600 hover:shadow-[0_8px_20px_rgba(245,158,11,0.2)] active:scale-95" 
                  onClick={() => dispatch(setQuery(''))}
                >
                  Clear Search
                </button>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
