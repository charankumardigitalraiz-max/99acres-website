import React, { useState, useMemo, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { propertiesData } from '../data/propertiesData';
import PropertyCard from '../components/PropertyCard/PropertyCard';
import { ChevronL, SearchIco, ArrowR, FilterIco } from '../data/icons';
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
  'Villas': 'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=700&q=80',
  'Commercial': 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=700&q=80',
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
  const searchInputRef = useRef(null);

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

    if (sortBy === 'Price: Low to High') results.sort((a, b) => (a.pricing?.expectedPrice || 0) - (b.pricing?.expectedPrice || 0));
    else if (sortBy === 'Price: High to Low') results.sort((a, b) => (b.pricing?.expectedPrice || 0) - (a.pricing?.expectedPrice || 0));

    return results;
  }, [categoryName, searchQuery, sortBy]);

  return (
    <div className="cvd-page" style={{ '--theme-color': theme.color, '--theme-bg': theme.bg }}>

      {/* ── BREADCRUMB ── */}


      {/* ── HERO HEADER ── */}
      <header
        className="cvd-hero"
        style={{ backgroundImage: `url(${bannerImg})` }}
      >
        {/* overlay sits behind everything */}
        <div className="cvd-hero-overlay" />

        {/* breadcrumb — above overlay */}
        <section className="cvd-breadcrumb-section">
          <div className="container">
            <nav className="cvd-breadcrumb">
              <Link to="/" className="cvd-back-link"><ChevronL /> Home</Link>
              {/* <span className="cvd-sep">/</span> */}
              {/* <span className="cvd-current">{categoryName}</span> */}
            </nav>
          </div>
        </section>

        {/* title row — above overlay */}
        <div className="container cvd-hero-content-wrap">
          <div className="cvd-hero-row">
            <div className='title-row-text'>
              <div className="cvd-hero-left">
                <h1 className="cvd-title">{categoryName}</h1>
              </div>
              <p className="cvd-description">
                {CATEGORY_DESCRIPTIONS[categoryName] || `Discover the best ${categoryName} listings.`}
              </p>
            </div>
            <div className="cvd-count-badge cvd-count-badge--light">
              <span className="cvd-count-dot" />
              <strong>{filteredProperties.length}</strong> Listings
            </div>
          </div>
        </div>
      </header>

      {/* ── TOOLBAR ── */}
      <section className="cvd-toolbar-section">
        <div className="container">
          <div className="cvd-toolbar-layout">
            <div className="cvd-toolbar">
              <div
                className="cvd-search-bar"
                onClick={() => searchInputRef.current?.focus()}
              >
                <SearchIco />
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder={`Search in ${categoryName}...`}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="cvd-actions">
                <div className="cvd-sort">
                  <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                    <option>Featured</option>
                    <option>Price: Low to High</option>
                    <option>Price: High to Low</option>
                    <option>Newest First</option>
                  </select>
                </div>
              </div>
            </div>

            <button className="cvd-filter-btn">
              <FilterIco />
              <span>Filters</span>
            </button>
          </div>
        </div>
      </section>

      {/* ── MAIN LAYOUT: GRID + SIDEBAR ── */}
      <div className="cvd-body-layout">

        {/* ── PROPERTY GRID ── */}
        <main className="cvd-results-col">
          {/* <div className="cvd-results-count">
            Found <strong>{filteredProperties.length}</strong> {categoryName} properties
          </div> */}

          {filteredProperties.length > 0 ? (
            <div className="cvd-grid">
              {filteredProperties.map(property => (
                <PropertyCard
                  key={property.id}
                  property={property}
                  variant={(categoryName.toLowerCase().includes('land') || categoryName.toLowerCase().includes('plot')) ? 'land' : 'vertical'}
                />
              ))}
            </div>
          ) : (
            <div className="cvd-empty">
              <div className="cvd-empty-illustration">
                <svg viewBox="0 0 24 24" width="60" height="60" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
                  <path d="M11 8v6" /><path d="M8 11h6" />
                </svg>
              </div>
              <h3>No Properties Found</h3>
              <p>We couldn't find any {categoryName} matching your current filters.</p>
              <button className="cvd-clear-btn" onClick={() => { setSearchQuery(''); setSortBy('Featured'); }}>
                Clear All Filters
              </button>
            </div>
          )}
        </main>

        {/* ── STICKY RIGHT SIDEBAR BANNER ── */}
        <aside className="cvd-sidebar">
          <div className="cvd-sb-card">
            {/* Background image */}
            <img src={bannerImg} alt={categoryName} className="cvd-sb-bg-img" />
            {/* Gradient overlay */}
            <div className="cvd-sb-overlay" />

            {/* Content */}
            <div className="cvd-sb-content">
              <div className="cvd-sb-pill">Market Intel</div>

              <h3 className="cvd-sb-title">
                Market Pulse<br />
                <span className="cvd-sb-accent">{categoryName}</span>
              </h3>

              {/* Price Trend Chart */}
              <div className="cvd-sb-chart-box">
                <p className="cvd-sb-chart-label">Price Trends (2022 – 2024)</p>
                <div className="cvd-sb-bars">
                  <div className="cvd-sb-bar" style={{ height: '40%' }} />
                  <div className="cvd-sb-bar" style={{ height: '65%' }} />
                  <div className="cvd-sb-bar cvd-sb-bar--active" style={{ height: '90%' }} />
                </div>
                <p className="cvd-sb-growth">
                  <span className="cvd-sb-dot" /> +12.4% appreciation this year
                </p>
              </div>

              {/* Developers */}
              <div className="cvd-sb-devs">
                <p className="cvd-sb-devs-label">Elite Developers</p>
                <div className="cvd-sb-dev-chips">
                  {['Prestige', 'Aparna', 'My Home', 'Godrej'].map(dev => (
                    <span key={dev} className="cvd-sb-dev-chip">{dev}</span>
                  ))}
                </div>
              </div>

              {/* Stats row */}
              <div className="cvd-sb-stats">
                <div className="cvd-sb-stat">
                  <span className="cvd-sb-stat-num">{filteredProperties.length}</span>
                  <span className="cvd-sb-stat-lbl">Live Listings</span>
                </div>
                <div className="cvd-sb-stat">
                  <span className="cvd-sb-stat-num">0%</span>
                  <span className="cvd-sb-stat-lbl">Brokerage</span>
                </div>
                <div className="cvd-sb-stat">
                  <span className="cvd-sb-stat-num">100%</span>
                  <span className="cvd-sb-stat-lbl">Verified</span>
                </div>
              </div>

              {/* CTA */}
              <div className="cvd-sb-cta-box">
                <p className="cvd-sb-cta-text">"Need expert counsel? Connect for legal and financial guidance."</p>
                <Link to="/contact" className="cvd-sb-cta-btn">
                  Connect Now <ArrowR />
                </Link>
              </div>
            </div>
          </div>
        </aside>
      </div>

      {/* ── BOTTOM CTA SECTION ── */}
      {/* <section className="cvd-cta-section">
        <div className="container">
          <div className="cvd-cta-card">
            <div className="cvd-cta-info">
              <h2>Can't find your dream {categoryName.slice(0, -1)}?</h2>
              <p>Our concierge team can help you find exclusive off-market listings.</p>
            </div>
            <Link to="/contact" className="cvd-cta-btn">
              Talk to an Expert <ArrowR />
            </Link>
          </div>
        </div>
      </section> */}
    </div>
  );
};

export default CategoryViewDetails;