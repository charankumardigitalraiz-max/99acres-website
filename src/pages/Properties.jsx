import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import PropertyCard from '../components/PropertyCard/PropertyCard';
import { SEARCH_TABS } from '../data/constants';
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
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const isMobile = useWindowWidth() <= 1024;
  const { buyProperties, rentProperties, highRated } = useSelector(state => state.properties);
  const activeTab = useSelector(state => state.search.activeTab);

  // Combine logic to simulate a real database fetch based on Redux
  const currentTabName = SEARCH_TABS[activeTab];
  let allListings = [];

  if (currentTabName === 'Buy' || currentTabName === 'New Projects') {
    allListings = [...buyProperties, ...highRated.filter(p => p.type === 'buy')];
  } else if (currentTabName === 'Rent') {
    allListings = [...rentProperties, ...highRated.filter(p => p.type === 'rent')];
  } else {
    allListings = buyProperties; // Commercial fallback
  }

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

      {/* ── MOBILE ONLY: overlay + slide drawer (position:fixed, outside container) ── */}
      {isFilterOpen && (
        <div className="filter-overlay" onClick={() => setIsFilterOpen(false)} />
      )}
      <aside className={`filter-drawer ${isFilterOpen ? 'open' : ''}`}>
        <div className="filter-drawer-header">
          <h3>Filters</h3>
          <button className="close-filter-btn" onClick={() => setIsFilterOpen(false)}>✕</button>
        </div>
        <FilterContent />
      </aside>

      <div className="container">
        <div className="properties-layout">

          {/* ── DESKTOP ONLY: sticky sidebar inside flex layout ── */}
          <aside className="filter-sidebar">
            <div className="filter-title" style={{ fontSize: '1rem', marginBottom: '20px' }}>Filters</div>
            <FilterContent />
          </aside>

          {/* RESULTS GRID */}
          <div className="results-area">
            <div className="results-header">
              <div className="results-header-left">
                <button
                  className="mobile-filter-toggle"
                  onClick={() => setIsFilterOpen(true)}
                >
                  <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
                  </svg>
                  Filters
                </button>
                <div className="results-count">
                  Showing {allListings.length} {currentTabName} Properties
                </div>
              </div>
              <div>
                <select className="sort-select">
                  <option>Sort by: Relevancy</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Recently Added</option>
                </select>
              </div>
            </div>

            <div
              className="prop-grid"
              style={isMobile
                ? { gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }
                : { gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))' }
              }
            >
              {allListings.map(property => (
                <PropertyCard
                  key={property.id}
                  property={property}
                  variant={isMobile ? 'listv2' : 'vertical'}
                />
              ))}
            </div>

            {allListings.length === 0 && (
              <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--text-3)' }}>
                <h3>No properties found</h3>
                <p>Try adjusting your search criteria</p>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
