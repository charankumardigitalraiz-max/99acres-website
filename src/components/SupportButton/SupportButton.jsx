import React, { useState } from 'react';
import './SupportButton.css';

// Professional minimalist icons
const PhoneIco = () => <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.81 12.81 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l2.27-2.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>;
const MailIco = () => <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>;
const ChatIco = () => <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>;
const TicketIco = () => <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 5v2" /><path d="M15 11v2" /><path d="M15 17v2" /><path d="M5 5h14a2 2 0 0 1 2 2v3a2 2 0 0 0 0 4v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-3a2 2 0 0 0 0-4V7a2 2 0 0 1 2-2z" /></svg>;

const SupportButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="support-wrapper">
      {/* SUPPORT POPUP */}
      <div className={`support-popup ${isOpen ? 'open' : ''}`}>
        <div className="support-header">
          <div className="header-info">
            <h3>Concierge Support</h3>
            <p>Your dedicated care team is here to assist</p>
          </div>
          <button className="support-close-mini" onClick={() => setIsOpen(false)}>
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
          </button>
        </div>

        <div className="support-body">
          <div className="support-option">
            <div className="option-icon"><PhoneIco /></div>
            <div className="option-info">
              <span>Direct Hotline</span>
              <strong>+91 98765 43210</strong>
            </div>
            <div className="option-arrow">
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9 18 15 12 9 6" /></svg>
            </div>
          </div>

          <div className="support-option">
            <div className="option-icon"><MailIco /></div>
            <div className="option-info">
              <span>Client Relations</span>
              <strong>care@sherlaproperties.com</strong>
            </div>
            <div className="option-arrow">
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9 18 15 12 9 6" /></svg>
            </div>
          </div>

          <div className="support-option">
            <div className="option-icon"><ChatIco /></div>
            <div className="option-info">
              <span>Live Assistance</span>
              <strong>Start a conversation</strong>
            </div>
            <div className="option-arrow">
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9 18 15 12 9 6" /></svg>
            </div>
          </div>
        </div>

        <div className="support-footer">
          <button className="support-ticket-btn">
            <TicketIco />
            <span>Raise Official Ticket</span>
          </button>
        </div>
      </div>

      {/* FLOATING BUTTON */}
      <button
        className={`support-float-btn ${isOpen ? 'active' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Contact Support"
      >
        <div className={`btn-icon-wrap ${isOpen ? 'rotated' : ''}`}>
          {isOpen ? (
            <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
          ) : (
            <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              <circle cx="12" cy="10" r="1" />
              <circle cx="9" cy="10" r="1" />
              <circle cx="15" cy="10" r="1" />
            </svg>
          )}
        </div>
      </button>
    </div>
  );
};

export default SupportButton;
