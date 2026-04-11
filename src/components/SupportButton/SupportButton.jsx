import React, { useState } from 'react';
import './SupportButton.css';

const SupportButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="support-wrapper">
      {/* SUPPORT POPUP */}
      <div className={`support-popup ${isOpen ? 'open' : ''}`}>
        <div className="support-header">
          <h3>Customer Support</h3>
          <p>We're here to help you 24/7</p>
        </div>
        <div className="support-body">
          <div className="support-option">
            <div className="option-icon">📞</div>
            <div className="option-info">
              <span>Call Us</span>
              <strong>+91 98765 43210</strong>
            </div>
          </div>
          <div className="support-option">
            <div className="option-icon">📧</div>
            <div className="option-info">
              <span>Email Support</span>
              <strong>care@sherlaproperties.com</strong>
            </div>
          </div>
          <div className="support-option">
            <div className="option-icon">💬</div>
            <div className="option-info">
              <span>Live Chat</span>
              <strong>Start a conversation</strong>
            </div>
          </div>
        </div>
        <div className="support-footer">
          <button className="support-ticket-btn">Raise a Ticket</button>
        </div>
      </div>

      {/* FLOATING BUTTON */}
      <button 
        className={`support-float-btn ${isOpen ? 'active' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        title="Contact Support"
      >
        {isOpen ? (
          <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
        ) : (
          <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" preserveAspectRatio="xMidYMid meet">
            <path d="M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a9 9 0 0 1 18 0v7a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3" />
          </svg>
        )}
      </button>
    </div>
  );
};

export default SupportButton;
