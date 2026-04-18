import React, { useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import PropertyCard from '../components/PropertyCard/PropertyCard';
import { ArrowR, SearchIco, ChevronL } from '../data/icons';
import './CollectionPage.css';

const COLLECTION_IMAGES = {
  'high-rated': 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1400&q=80',
  'land': 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1400&q=80',
  'featured': 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1400&q=80',
  'high-rated-locality': 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1400&q=80',
};

const CollectionPage = ({ type, title, subtitle }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const searchRef = useRef(null);

  const properties = useSelector(state => {
    if (type === 'high-rated') return state.properties.highRated;
    if (type === 'land') return state.properties.landProperties;
    if (type === 'featured') return state.properties.featured;
    if (type === 'high-rated-locality') return state.properties.hydLocalities;
    return [];
  });

  const filteredProperties = properties.filter(p =>
    p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.loc.toLowerCase().includes(searchQuery.toLowerCase())
  );

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

              {/* Inline search */}
              {/* <div
                className="cp-hero-search"
                onClick={() => searchRef.current?.focus()}
              >
                <SearchIco />
                <input
                  ref={searchRef}
                  type="text"
                  placeholder="Search this collection..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                />
                {searchQuery && (
                  <button className="cp-search-clear" onClick={() => setSearchQuery('')}>✕</button>
                )}
              </div> */}

              {/* Count badge */}
              {/* <div className="cp-count-badge">
                <span className="cp-count-dot" />
                <strong>{filteredProperties.length}</strong> Properties
              </div> */}
            </div>
          </div>
        </div>
      </section>

      {/* ── MAIN CONTENT ── */}
      <div className="container cp-content">

        {filteredProperties.length > 0 ? (
          <>
            {/* Section header */}
            <div className="cp-section-head">
              <div className="cp-section-accent" />
              <h2 className="cp-section-title">Featured Highlights</h2>
              {/* <span className="cp-section-count">{filteredProperties.slice(0, 3).length} of {filteredProperties.length}</span> */}
            </div>

            {/* First 3 — highlighted grid */}
            <div className="cp-grid cp-grid--highlight">
              {filteredProperties.map(property => (
                <PropertyCard
                  key={property.id}
                  property={property}
                  variant={type === 'land' ? 'land' : 'vertical'}
                />
              ))}
            </div>

            {/* Mid banner */}
            {/* {filteredProperties.length > 3 && (
              <div className="cp-mid-banner">
                <div className="cp-mid-banner-overlay" />
                <div className="cp-mid-banner-content">
                  <span className="cp-banner-tag">Exclusively Curated</span>
                  <h2>Experience Luxury Living in the Best Localities</h2>
                  <p>Our experts handpick every property to meet strict standards of quality and location value.</p>
                  <Link to="/contact" className="cp-banner-btn">Speak to an Expert <ArrowR /></Link>
                </div>
              </div>
            )} */}

            {/* Remaining results */}
            {/* {filteredProperties.length > 3 && (
              <>
                <div className="cp-section-head">
                  <div className="cp-section-accent" />
                  <h2 className="cp-section-title">More in this Collection</h2>
                  <span className="cp-section-count">{filteredProperties.slice(3).length} properties</span>
                </div>
                <div className="cp-grid">
                  {filteredProperties.map(property => (
                    <PropertyCard
                      key={property.id}
                      property={property}
                      variant={type === 'land' ? 'land' : 'vertical'}
                    />
                  ))}
                </div>
              </>
            )} */}
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
