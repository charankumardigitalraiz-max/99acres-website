import React, { useState, useMemo } from 'react';
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
  'Plots / Land': 'Premium residential and agricultural lands in high-growth investment zones.'
};

const CategoryViewDetails = () => {
  const { categoryName } = useParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('Featured');

  // ─── FILTERING LOGIC ───
  const filteredProperties = useMemo(() => {
    let results = propertiesData.filter(p => {
      const type = (p.propertyType || '').toLowerCase();
      const cat = categoryName.toLowerCase();

      // Mapping Logic
      if (cat === 'apartments') {
        return type.includes('apartment') || type.includes('flat');
      }
      if (cat === 'villas') {
        return type.includes('villa') || type.includes('independent house');
      }
      if (cat === 'commercial') {
        return type.includes('commercial') || type.includes('office') || type.includes('retail');
      }
      if (cat === 'plots / land' || cat === 'plots' || cat === 'land') {
        return type.includes('plot') || type.includes('land');
      }
      if (cat === 'new projects') {
        return p.status === 'new' || p.availabilityStatus === 'under construction';
      }

      return type === cat;
    });

    // Search Filter
    if (searchQuery) {
      results = results.filter(p => 
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.loc.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Sort Logic
    if (sortBy === 'Price: Low to High') {
      results.sort((a, b) => (a.pricing?.expectedPrice || 0) - (b.pricing?.expectedPrice || 0));
    } else if (sortBy === 'Price: High to Low') {
      results.sort((a, b) => (b.pricing?.expectedPrice || 0) - (a.pricing?.expectedPrice || 0));
    }

    return results;
  }, [categoryName, searchQuery, sortBy]);

  return (
    <div className="cvd-page">
      {/* ── BREADCRUMB ── */}
      <section className="cvd-breadcrumb-section">
        <div className="container">
          <nav className="cvd-breadcrumb">
            <Link to="/" className="cvd-back-link">
              <ChevronL /> Home
            </Link>
            <span className="cvd-sep">/</span>
            <span className="cvd-current">{categoryName}</span>
          </nav>
        </div>
      </section>

      {/* ── HERO HEADER ── */}
      <header className="cvd-hero">
        <div className="container">
          <div className="cvd-hero-grid">
            <div className="cvd-hero-content">
              <div className="cvd-pre-title">Premium Collection</div>
              <h1 className="cvd-title">{categoryName}</h1>
              <p className="cvd-description">
                {CATEGORY_DESCRIPTIONS[categoryName] || `Discover the best ${categoryName} listings across top locations.`}
              </p>
            </div>
            <div className="cvd-hero-stats">
              <div className="cvd-stat-box">
                <span className="cvd-stat-val">{filteredProperties.length}</span>
                <span className="cvd-stat-label">Available Listings</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ── TOOLBAR ── */}
      <section className="cvd-toolbar-section">
        <div className="container">
          <div className="cvd-toolbar">
            <div className="cvd-search-bar">
              <SearchIco />
              <input 
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
              <button className="cvd-filter-btn">
                <FilterIco />
                <span>Filters</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── PROPERTY GRID ── */}
      <main className="container cvd-main">
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
              <svg viewBox="0 0 24 24" width="60" height="60" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><path d="M11 8v6"/><path d="M8 11h6"/></svg>
            </div>
            <h3>No Properties Found</h3>
            <p>We couldn't find any {categoryName} matching your current filters.</p>
            <button className="cvd-clear-btn" onClick={() => { setSearchQuery(''); setSortBy('Featured'); }}>
              Clear All Filters
            </button>
          </div>
        )}
      </main>

      {/* ── CTA SECTION ── */}
      <section className="cvd-cta-section">
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
      </section>
    </div>
  );
};

export default CategoryViewDetails;