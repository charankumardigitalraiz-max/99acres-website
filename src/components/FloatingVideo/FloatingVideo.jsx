import { useState } from 'react';
import './FloatingVideo.css';

export default function FloatingVideo() {
  const [isVideoOpen, setIsVideoOpen] = useState(true);

  return (
    <div className={`floating-video ${!isVideoOpen ? 'collapsed' : ''}`}>
      <button
        className="video-toggle"
        onClick={() => setIsVideoOpen(!isVideoOpen)}
        title={isVideoOpen ? "Close Video" : "Play Tour"}
      >
        {isVideoOpen ? (
          <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
        )}
      </button>

      {isVideoOpen && (
        <>
          <div className="v-badge">Real Estate Tour</div>
          <iframe
            src="https://www.youtube.com/embed/ec_fXMrD7Ow?autoplay=1&mute=1&loop=1&playlist=ec_fXMrD7Ow&controls=0&modestbranding=1&rel=0&iv_load_policy=3&disablekb=1"
            title="Property Tour"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            className="floating-iframe"
          />
        </>
      )}
    </div>
  );
}
