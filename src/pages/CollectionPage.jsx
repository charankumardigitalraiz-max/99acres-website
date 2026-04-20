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
    <div className="cp-page">

      {/* ── HERO BANNER ── */}
      <section className="cp-hero" style={{ backgroundImage: `url(${heroBg})` }}>
        <div className="cp-hero-overlay" />

        {/* Breadcrumb */}
        <nav className="cp-breadcrumb">
          <div className="container">
            <div className="cp-bc-inner">
              <Link to="/" className="cp-bc-link"><ChevronL /> Home</Link>
              {/* <span className="cp-bc-sep">/</span>
              <span className="cp-bc-current">{title}</span> */}
            </div>
          </div>
        </nav>

        {/* Hero content */}
        <div className="cp-hero-body">
          <div className="container">
            <div className="cp-hero-row">
              <div className="cp-hero-text">
                <h1 className="cp-hero-title">{title}</h1>
                <p className="cp-hero-subtitle">
                  {subtitle || 'Discover curated collections of premium properties.'}
                </p>
              </div>
            </div>

            {/* Featured Hero Cards */}
            {/* {properties.length > 0 && (
              <div className="cp-hero-cards-section">
                <div className="cp-hero-cards-grid">
                  {properties.slice(0, 3).map(p => (
                    <Link key={p.id} to={`/property/${p.id}`} className="cp-hero-mini-card">
                      <img src={p.img} alt={p.title} className="cp-mini-img" />
                      <div className="cp-mini-info">
                        <div className="cp-mini-price">{p.price}</div>
                        <h4 className="cp-mini-title">{p.title}</h4>
                        <div className="cp-mini-meta">
                          <PinIco size={10} /> {p.loc?.split(',')[0]}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )} */}
          </div>
        </div>
      </section>

      {/* ── STICKY FILTER ISLAND ── */}
      <section className="cp-filter-row">
        <div className="container">
          <div className="cp-filter-island" ref={islandRef}>
            <div className="cp-island-main">
              {/* Inline Filters */}
              <div className="cp-filters-inline">
                {/* Budget Dropdown */}
                <div className="cp-filter-item">
                  <button
                    className={`cp-inline-btn ${activePopover === 'budget' ? 'active' : ''} ${filters.minPrice > 0 || filters.maxPrice < 500000000 ? 'filtered' : ''}`}
                    onClick={() => setActivePopover(activePopover === 'budget' ? null : 'budget')}
                  >
                    Budget <span className="cp-chevron">▾</span>
                  </button>
                  {activePopover === 'budget' && (
                    <div className="cp-popover cp-popover-budget">
                      <h4 className="cp-popover-title">Collection Price Range</h4>
                      <div className="cp-price-inputs">
                        <div className="cp-price-field">
                          <span>Min Price</span>
                          <input
                            type="number"
                            value={filters.minPrice}
                            onChange={(e) => setFilters(prev => ({ ...prev, minPrice: Number(e.target.value) }))}
                            placeholder="Min"
                          />
                        </div>
                        <div className="cp-price-field">
                          <span>Max Price</span>
                          <input
                            type="number"
                            value={filters.maxPrice}
                            onChange={(e) => setFilters(prev => ({ ...prev, maxPrice: Number(e.target.value) }))}
                            placeholder="Max"
                          />
                        </div>
                      </div>
                      <div className="cp-popover-footer">
                        <span className="cp-popover-info">{formatPrice(filters.minPrice)} - {formatPrice(filters.maxPrice)}</span>
                        <button className="cp-popover-done" onClick={() => setActivePopover(null)}>Done</button>
                      </div>
                    </div>
                  )}
                </div>

                {/* BHK Dropdown */}
                <div className="cp-filter-item">
                  <button
                    className={`cp-inline-btn ${activePopover === 'bhk' ? 'active' : ''} ${filters.beds.length > 0 ? 'filtered' : ''}`}
                    onClick={() => setActivePopover(activePopover === 'bhk' ? null : 'bhk')}
                  >
                    BHK {filters.beds.length > 0 && `(${filters.beds.length})`} <span className="cp-chevron">▾</span>
                  </button>
                  {activePopover === 'bhk' && (
                    <div className="cp-popover cp-popover-bhk">
                      <h4 className="cp-popover-title">Bedrooms (BHK)</h4>
                      <div className="cp-filter-chips">
                        {[1, 2, 3, 4, 5].map(bhk => (
                          <button
                            key={bhk}
                            className={`cp-chip ${filters.beds.includes(bhk) ? 'active' : ''}`}
                            onClick={() => handleBHKToggle(bhk)}
                          >
                            <BedIco size={14} />
                            <span>{bhk} BHK</span>
                          </button>
                        ))}
                      </div>
                      <div className="cp-popover-footer">
                        <button className="cp-popover-done" style={{ width: '100%' }} onClick={() => setActivePopover(null)}>Set BHK</button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Status Dropdown */}
                <div className="cp-filter-item">
                  <button
                    className={`cp-inline-btn ${activePopover === 'status' ? 'active' : ''} ${filters.status.length > 0 ? 'filtered' : ''}`}
                    onClick={() => setActivePopover(activePopover === 'status' ? null : 'status')}
                  >
                    Status <span className="cp-chevron">▾</span>
                  </button>
                  {activePopover === 'status' && (
                    <div className="cp-popover cp-popover-status">
                      <h4 className="cp-popover-title">Availability</h4>
                      <div className="cp-filter-chips">
                        {['ready to move', 'under construction'].map(stat => (
                          <button
                            key={stat}
                            className={`cp-chip ${filters.status.includes(stat) ? 'active' : ''}`}
                            onClick={() => setFilters(prev => ({
                              ...prev,
                              status: prev.status.includes(stat) ? prev.status.filter(s => s !== stat) : [...prev.status, stat]
                            }))}
                          >
                            <IconCheckCircle size={14} />
                            <span>{stat}</span>
                          </button>
                        ))}
                      </div>
                      <div className="cp-popover-footer">
                        <button className="cp-popover-done" style={{ width: '100%' }} onClick={() => setActivePopover(null)}>Apply Status</button>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Search Space (Expansive) */}
              <div className="cp-search-wrap">
                <div className="cp-search-bar" onClick={() => searchRef.current?.focus()}>
                  <SearchIco />
                  <input
                    ref={searchRef}
                    type="text"
                    placeholder="Search this collection..."
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Reset filters only shows when active */}
            {(filteredProperties.length < properties.length || searchQuery) && (
              <button className="cp-island-reset" onClick={clearFilters}>
                Clear All
              </button>
            )}
          </div>
        </div>
      </section>

      {/* ── MAIN CONTENT ── */}
      <div className="container cp-content">

        {filteredProperties.length > 0 ? (
          <>
            {/* Spotlight Showcase - Top Property */}
            {/* <div className="cp-spotlight-section">
              <div className="cp-spotlight-tag">Editorial Spotlight</div>
              <div className="cp-spotlight-card">
                <div className="cp-spotlight-image" style={{ backgroundImage: `url(${filteredProperties[0].img || '/placeholder.jpg'})` }}>
                  <div className="cp-spotlight-overlay" />
                </div>
                <div className="cp-spotlight-content">
                  <div className="cp-spotlight-header">
                    <span className="cp-spotlight-badge">Curated Selection</span>
                    <h2 className="cp-spotlight-title">{filteredProperties[0].title}</h2>
                    <p className="cp-spotlight-loc">{filteredProperties[0].loc}</p>
                  </div>
                  <div className="cp-spotlight-details">
                    <div className="cp-spotlight-info">
                      <span className="cp-info-label">Specifications</span>
                      <span className="cp-info-value">
                        {type === 'land'
                          ? `${filteredProperties[0].size || filteredProperties[0].sqft || 'Premium'} Area`
                          : `${filteredProperties[0].beds} BHK • ${filteredProperties[0].sqft} Sq.Ft`
                        }
                      </span>
                    </div>
                    <div className="cp-spotlight-price">
                      <span className="cp-info-label">{type === 'land' ? 'Listing Value' : 'Investment Profile'}</span>
                      <span className="cp-price-val">{filteredProperties[0].pricing?.expectedPrice ? formatPrice(filteredProperties[0].pricing?.expectedPrice) : (filteredProperties[0].price || 'Contact for Price')}</span>
                    </div>
                  </div>
                  <Link to={`/property/${filteredProperties[0].id}`} className="cp-spotlight-btn">
                    View Masterpiece <ArrowR />
                  </Link>
                </div>
              </div>
            </div> */}

            {/* Expert Insight Banner */}
            {/* <div className="cp-insight-banner">
              <div className="cp-insight-accent" />
              <div className="cp-insight-text">
                <h3>Expert Collection Insights</h3>
                <p>{EXPERT_NOTES[type] || EXPERT_NOTES['featured']}</p>
              </div>
              <div className="cp-insight-meta">
                <span className="cp-insight-verify">Verified Selection</span>
              </div>
            </div> */}

            {/* Asymmetric Grid for Remaining Results */}
            {filteredProperties.length > 1 && (
              <>
                <div className="cp-section-head">
                  <div className="cp-section-accent" />
                  <h2 className="cp-section-title">Collection Highlights</h2>
                  <span className="cp-section-count">{filteredProperties.length - 1} properties found</span>
                </div>
                <div className="cp-grid cp-asymmetric-grid">
                  {filteredProperties.map((property, index) => (
                    <div key={property.id} className={`cp-grid-item`}>
                      <PropertyCard
                        property={property}
                        variant={type === 'land' ? 'land' : 'vertical'}
                      />
                    </div>
                  ))}
                </div>
              </>
            )}
          </>
        ) : (
          <div className="cp-empty">
            <div className="cp-empty-icon">
              <svg viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
                <path d="M11 8v6" /><path d="M8 11h6" />
              </svg>
            </div>
            <h3>No Properties Found</h3>
            <p>Try adjusting your search or explore other collections.</p>
            <button className="cp-empty-btn" onClick={() => setSearchQuery('')}>Clear Search</button>
          </div>
        )}
      </div>

      {/* ── BOTTOM CTA ── */}
      <section className="cp-cta">
        <div className="container">
          <div className="cp-cta-card">
            <div className="cp-cta-info">
              <h2>Still searching for the perfect home?</h2>
              <p>Explore our entire catalog of premium and verified properties.</p>
            </div>
            <Link to="/properties" className="cp-cta-btn">
              Explore All <ArrowR />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CollectionPage;
