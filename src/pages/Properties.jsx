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
    <div className="properties-page">

      {/* ── MOBILE ONLY: overlay + slide drawer ── */}
      {isFilterOpen && (
        <div className="filter-overlay" onClick={() => setIsFilterOpen(false)} />
      )}
      <aside className={`filter-drawer ${isFilterOpen ? 'open' : ''}`}>
        <div className="filter-drawer-header" style={{ marginBottom: '20px !important' }}>
          <h3>Filters</h3>
          <button className="close-filter-btn" onClick={() => setIsFilterOpen(false)}>✕</button>
        </div>
        <FilterContent />
      </aside>

      <div className="container">
        <div className="properties-layout">

          {/* ── DESKTOP ONLY: sticky sidebar ── */}
          <aside className="filter-sidebar">
            <div className="filter-title-main">Filters</div>
            <FilterContent />
          </aside>

          {/* RESULTS GRID */}
          <div className="results-area">

            {/* Search Input Row */}
            <div className="properties-search-row">
              <div className="prop-search-box">
                <SearchIco />
                <input
                  type="text"
                  placeholder={`Search for properties in ${currentTabName}...`}
                  value={query || ''}
                  onChange={(e) => dispatch(setQuery(e.target.value))}
                />
                {query && <button className="clear-search" onClick={() => dispatch(setQuery(''))}>✕</button>}
              </div>
            </div>

            <div className="results-header">
              <div className="results-count-wrap">
                Showing <span className="highlight-count">{filteredListings.length}</span> {currentTabName} Properties
              </div>
              <div className="results-controls">
                <button
                  className="mobile-filter-toggle"
                  onClick={() => setIsFilterOpen(true)}
                >
                  <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
                  </svg>
                  <span>Filters</span>
                </button>
                <div className="sort-wrap">
                  <select className="sort-select">
                    <option>Sort by: Relevancy</option>
                    <option>Price: Low to High</option>
                    <option>Price: High to Low</option>
                    <option>Recently Added</option>
                  </select>
                </div>
              </div>
            </div>

            <div
              className="prop-grid"
              style={isMobile
                ? { gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }
                : { gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '20px' }
              }
            >
              {filteredListings.map(property => (
                <PropertyCard
                  key={property.id}
                  property={property}
                  variant={isMobile ? 'listv2' : 'vertical'}
                />
              ))}
            </div>

            {filteredListings.length === 0 && (
              <div className="no-results">
                <h3>No properties found</h3>
                <p>Try adjusting your search keywords or filters</p>
                <button className="btn-reset" onClick={() => dispatch(setQuery(''))}>Clear Search</button>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
