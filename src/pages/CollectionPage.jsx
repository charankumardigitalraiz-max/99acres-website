import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import PropertyCard from '../components/PropertyCard/PropertyCard';
import { ArrowR, SearchIco, ChevronL } from '../data/icons';
import './CollectionPage.css';

const CollectionPage = ({ type, title, subtitle }) => {
  const [searchQuery, setSearchQuery] = useState('');
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

  return (
    <div className="collection-page">
      {/* ── HERO SECTION ── */}
      <section className="collection-hero">
        <div className="container">
          <nav className="collection-breadcrumb">
            <Link to="/" className="breadcrumb-link">
              <ChevronL /> Home
            </Link>
            <span className="breadcrumb-sep">/</span>
            <span className="breadcrumb-current">{title}</span>
          </nav>

          <div className="hero-main-content">
            <h1 className="hero-title">{title}</h1>
            <p className="hero-subtitle">{subtitle}</p>
          </div>
        </div>
      </section>

      <div className="container">
        {/* ── TOOLBAR / CONTROLS ── */}
        <div className="collection-toolbar">
          <div className="toolbar-left">
            <div className="collection-search-wrap">
              <SearchIco />
              <input
                type="text"
                placeholder="Search collection..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="toolbar-right">
            <div className="collection-stats-badge">
              <span>{filteredProperties.length}</span> Results Found
            </div>
            <div className="collection-sort">
              <select className="sort-dropdown">
                <option>Sort by: Featured</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Newest First</option>
              </select>
            </div>
          </div>
        </div>

        {/* ── RESULTS GRID ── */}
        {filteredProperties.length > 0 ? (
          <div className="collection-grid-container">
            <div className="collection-grid">
              {filteredProperties.map(property => (
                <PropertyCard
                  key={property.id}
                  property={property}
                  variant={type === 'land' ? 'land' : 'vertical'}
                />
              ))}
            </div>
          </div>
        ) : (
          <div className="collection-empty">
            <div className="empty-icon">📂</div>
            <h3>No results found</h3>
            <p>We couldn't find any properties matching your search in this collection.</p>
            <button className="btn-primary" onClick={() => setSearchQuery('')}>
              Clear Search
            </button>
          </div>
        )}
      </div>

      {/* CALL TO ACTION */}
      <section className="collection-cta">
        <div className="container">
          <div className="cta-card">
            <div className="cta-text">
              <h2>Didn't find what you're looking for?</h2>
              <p>Explore our full database of 50,000+ properties across India.</p>
            </div>
            <Link to="/properties" className="cta-btn">
              Browse All Properties <ArrowR />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CollectionPage;
