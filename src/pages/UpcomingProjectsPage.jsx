import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { UPCOMING_PROJECTS } from '../data/constants';
import { PinIco, ChevronL, SearchIco, ArrowR } from '../data/icons';
import './UpcomingProjectsPage.css';

const UpcomingProjectsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProjects = UPCOMING_PROJECTS.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.loc.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.developer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="upcoming-page">
      {/* HERO */}
      <div className="upcoming-hero">
        <div className="container">
          <Link to="/" className="back-breadcrumb">
            <ChevronL /> Back to Home
          </Link>
          <div className="hero-content">
            <div className="hero-badge">Pre-Launch Opportunities</div>
            <h1 className="hero-title">Upcoming Projects</h1>
            <p className="hero-subtitle">
              Exclusive early access to India's most anticipated residential and commercial developments. 
              Be the first to invest before prices appreciate.
            </p>
          </div>
        </div>
      </div>

      <div className="container">
        {/* FILTERS */}
        <div className="collection-controls">
          <div className="collection-search">
            <SearchIco />
            <input 
              type="text" 
              placeholder="Search by project, developer or city..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="collection-stats">
            <span>{filteredProjects.length}</span> Upcoming Developments
          </div>
        </div>

        {/* PROJECTS GRID */}
        {filteredProjects.length > 0 ? (
          <div className="upcoming-grid">
            {filteredProjects.map((proj) => (
              <div key={proj.id} className="up-listing-card">
                <div className="up-listing-img">
                  <img src={proj.img} alt={proj.name} />
                  <div className="up-listing-status">{proj.status}</div>
                </div>
                <div className="up-listing-body">
                  <div className="up-listing-dev">{proj.developer}</div>
                  <h3 className="up-listing-name">{proj.name}</h3>
                  <div className="up-listing-loc"><PinIco /> {proj.loc}</div>
                  
                  <div className="up-listing-details">
                    <div className="up-detail-item">
                      <span className="label">Investment Type</span>
                      <span className="value">{proj.type}</span>
                    </div>
                    <div className="up-detail-item">
                      <span className="label">Target Launch</span>
                      <span className="value">{proj.launch}</span>
                    </div>
                  </div>
                  
                  <div className="up-listing-footer">
                    <div className="up-listing-price">
                       <span className="starting-label">Starting From</span>
                       <div className="price-tag">{proj.price}</div>
                    </div>
                    <button className="up-enquiry-btn">Enquire Now</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="collection-empty">
            <div className="empty-icon">🏗️</div>
            <h3>No projects found</h3>
            <p>Try searching for a different developer or location.</p>
            <button className="btn-primary" onClick={() => setSearchQuery('')}>
              See All Projects
            </button>
          </div>
        )}
      </div>

      {/* CTA */}
      <section className="upcoming-cta">
        <div className="container">
          <div className="cta-banner">
            <div className="cta-banner-content">
              <h2>Get Pre-Launch Alerts</h2>
              <p>Sign up to receive immediate notifications when new projects are announced in your preferred cities.</p>
            </div>
            <button className="cta-banner-btn">Subscribe for Alerts <ArrowR /></button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default UpcomingProjectsPage;
