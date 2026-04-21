import React from 'react';
import './InfoLayout.css';

export default function InfoLayout({ title, children }) {
  return (
    <div className="info-page">
      <div className="info-header">
        <div className="container">
          <nav className="breadcrumb">
            <a href="/">Home</a> <span>/</span> <span>{title}</span>
          </nav>
          <h1>{title}</h1>
        </div>
      </div>
      <div className="info-content-wrapper">
        <div className="container">
          <div className="info-grid">
            <main className="info-main-content">
              {children}
            </main>
            <aside className="info-sidebar">
              <div className="sidebar-card">
                <h3>Need Assistance?</h3>
                <p>Our experts are here 24/7 to help you with your property search.</p>
                <button className="btn-contact-support">Contact Support</button>
              </div>
              <div className="sidebar-links">
                <h4>Quick Links</h4>
                <ul>
                  <li><a href="/about-us">About Us</a></li>
                  <li><a href="/terms-conditions">Terms of Service</a></li>
                  <li><a href="/privacy-policy">Privacy Policy</a></li>
                  <li><a href="/contact-us">Contact Us</a></li>
                </ul>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
}
