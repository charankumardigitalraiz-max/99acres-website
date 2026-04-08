import React from 'react';
import { useSelector } from 'react-redux';

export default function MessagesPanel() {
  const { chats } = useSelector(state => state.userPanel);

  return (
    <div className="up-card up-chat-container">
      {/* Sidebar List */}
      <div className="up-chat-sidebar">
        <div className="up-chat-header">
          <h3>Messages</h3>
        </div>
        <div className="up-chat-list">
          {chats.map(c => (
            <div key={c.id} className={`up-chat-item ${c.unread ? 'unread' : ''}`}>
              <div className="up-chat-avatar" style={{ background: 'var(--primary)', color: '#0f172a' }}>{c.avatar}</div>
              <div className="up-chat-info">
                <div className="up-chat-top">
                  <span className="up-chat-name">{c.name}</span>
                  <span className="up-chat-time">{c.time}</span>
                </div>
                <p className="up-chat-preview">{c.lastMsg}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Active Chat Window */}
      <div className="up-chat-window">
        <div className="up-chat-window-header">
          <div className="up-chat-avatar" style={{ background: 'var(--primary)', color: '#0f172a' }}>P</div>
          <div>
            <strong style={{ display: 'block', fontSize: '1rem', color: 'var(--dark)' }}>Priya Sharma</strong>
            <div className="up-chat-status">Online</div>
          </div>
        </div>

        <div className="up-chat-messages">
          <div className="up-chat-bubble me">
            <div className="up-chat-bubble-text">Hi Priya, I saw your enquiry for the Powai apartment.</div>
            <div className="up-chat-bubble-time">11:05 AM</div>
          </div>
          <div className="up-chat-bubble">
            <div className="up-chat-bubble-text">Is the price negotiable? I am very interested.</div>
            <div className="up-chat-bubble-time">11:10 AM</div>
          </div>
        </div>

        <div className="up-chat-input-area">
          <input type="text" className="up-chat-input" placeholder="Type a message..." />
          <button className="up-chat-send">
            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" /></svg>
          </button>
        </div>
      </div>
    </div>
  );
}
