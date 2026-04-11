import { useState } from 'react';
import './SidebarAds.css';
import { Link } from 'react-router-dom';

export default function SidebarAds({ isOpen, setIsOpen }) {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  return (
    <>
      <aside className={`sidebar-ads ${!isOpen ? 'sidebar-ads--collapsed' : ''}`}>
        {/* Persistently Visible Header/Toggle Area */}
        <div className="sidebar-ads-header">
          <span className="sidebar-ads-title">{isOpen ? 'Featured Property' : ''}</span>
          <button
            className={`sidebar-toggle-btn ${isOpen ? 'active' : ''}`}
            onClick={() => setIsOpen(!isOpen)}
            title={isOpen ? 'Hide Sidebar' : 'Show Sidebar'}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              {isOpen ? <polyline points="9 18 15 12 9 6" /> : <polyline points="15 18 9 12 15 6" />}
            </svg>
          </button>
        </div>

        {/* Content Area - Hidden when collapsed */}
        <div className="sidebar-ads-content">
          {/* Video Ad */}
          <div className="ad-card ad-video-card" onClick={() => setIsVideoModalOpen(true)}>
            <div className="ad-badge">Live Tour</div>
            <div className="ad-video-wrapper">
              <iframe
                src="https://www.youtube.com/embed/ec_fXMrD7Ow?autoplay=1&mute=1&loop=1&playlist=ec_fXMrD7Ow&controls=0&modestbranding=1&rel=0&iv_load_policy=3&disablekb=1"
                title="Property Tour"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                className="ad-video-frame"
              />
              {/* Overlay to catch clicks and show play indicator */}
              <div className="ad-video-overlay-trigger">
                <div className="play-ico-circle">
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
                </div>
              </div>
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

      {/* Video Modal Overlay */}
      {isVideoModalOpen && (
        <div className="video-modal-overlay" onClick={() => setIsVideoModalOpen(false)}>
          <div className="video-modal-container" onClick={(e) => e.stopPropagation()}>
            <button className="video-modal-close" onClick={() => setIsVideoModalOpen(false)}>
              <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
            </button>
            <div className="video-modal-iframe-wrap">
              <iframe
                src="https://www.youtube.com/embed/ec_fXMrD7Ow?autoplay=1&rel=0&modestbranding=1"
                title="Premium Tour Modal"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
