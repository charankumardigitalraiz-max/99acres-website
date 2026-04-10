import './SidebarAds.css';
import { Link } from 'react-router-dom';

export default function SidebarAds({ isOpen, setIsOpen }) {
  return (
    <aside className={`sidebar-ads ${!isOpen ? 'sidebar-ads--collapsed' : ''}`}>
      {/* Persistently Visible Header/Toggle Area */}
      <div className="sidebar-ads-header">
        <div className="sidebar-ads-title-wrapper">
          <svg className="sidebar-featured-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
          <span className="sidebar-ads-title">{isOpen ? 'Featured Offer' : ''}</span>
        </div>
        <button
          className={`sidebar-toggle-btn ${isOpen ? 'active' : ''}`}
          onClick={() => setIsOpen(!isOpen)}
          title={isOpen ? 'Collapse Sidebar' : 'Expand Sidebar'}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            {isOpen ? <polyline points="15 18 9 12 15 6" /> : <polyline points="9 18 15 12 9 6" />}
          </svg>
        </button>
      </div>

      {/* Content Area - Hidden when collapsed */}
      <div className="sidebar-ads-content">
        {/* Video Ad */}
        <div className="ad-card ad-video-card">
          <div className="ad-badge">Live Tour</div>
          <div className="ad-video-wrapper">
            <iframe
              src="https://www.youtube.com/embed/ec_fXMrD7Ow?autoplay=1&mute=1&loop=1&playlist=ec_fXMrD7Ow&controls=0&modestbranding=1&rel=0&iv_load_policy=3&disablekb=1"
              title="Property Tour"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              className="ad-video-frame"
            />
          </div>
          {/* <div className="ad-content">
            <h4 className="ad-title">The Royal Estates</h4>
            <p className="ad-desc">Explore our flagship luxury properties. Premium gated community.</p>
            <button className="ad-btn">Schedule Visit</button>
          </div> */}
        </div>

        <div className="ad-secondary-note">
          {/* Optional secondary info here */}
        </div>
      </div>
    </aside>
  );
}
