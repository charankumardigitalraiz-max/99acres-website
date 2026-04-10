import React, { useState } from 'react';
import { useSelector } from 'react-redux';

export default function SupportPanel() {
  const { tickets } = useSelector(state => state.userPanel);
  const [view, setView] = useState('list'); // 'list', 'form', or 'chat'
  const [selectedTicket, setSelectedTicket] = useState(null);

  if (view === 'form') {
    return (
      <div className="up-card">
        <div className="up-section-header">
          <div>
            <div className="up-card-title">Raise New Ticket</div>
            <div className="up-card-sub">Explain your issue and we'll get back to you</div>
          </div>
          <button className="up-btn up-btn-ghost" onClick={() => setView('list')}>Back to Tickets</button>
        </div>

        <div className="up-form-grid">
          <div className="up-form-group full">
            <label>Subject</label>
            <input type="text" placeholder="Brief summary of the issue" />
          </div>
          <div className="up-form-group">
            <label>Category</label>
            <select>
              <option>Listing Issue</option>
              <option>Payment/Subscription</option>
              <option>Technical Support</option>
              <option>Account/Profile</option>
              <option>Other</option>
            </select>
          </div>
          <div className="up-form-group">
            <label>Priority</label>
            <select>
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
              <option>Urgent</option>
            </select>
          </div>
          <div className="up-form-group full">
            <label>Description</label>
            <textarea placeholder="Describe the problem in detail..." />
          </div>
        </div>

        <div className="up-form-actions">
          <button className="up-btn up-btn-primary" onClick={() => setView('list')}>Submit Ticket</button>
          <button className="up-btn up-btn-ghost" onClick={() => setView('list')}>Cancel</button>
        </div>
      </div>
    );
  }

  if (view === 'chat' && selectedTicket) {
    return (
      <div className="up-card up-chat-container">
        <div className="up-chat-window">
          <div className="up-chat-window-header">
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span className="up-tag blue" style={{ fontSize: '0.65rem' }}>{selectedTicket.id}</span>
                <strong style={{ fontSize: '1rem', fontWeight: 600 }}>{selectedTicket.subject}</strong>
              </div>
              <div className="up-chat-status">{selectedTicket.category} · Status: {selectedTicket.status}</div>
            </div>
            <button className="up-btn up-btn-ghost" style={{ fontSize: '0.8rem', padding: '6px 12px' }} onClick={() => setView('list')}>Back to List</button>
          </div>

          <div className="up-chat-messages" style={{ minHeight: '320px' }}>
            <div className="up-chat-bubble">
              <div className="up-chat-bubble-text">
                Hello! We've received your ticket regarding **"{selectedTicket.subject}"**. 
                A support agent will be with you shortly.
              </div>
              <div className="up-chat-bubble-time">{selectedTicket.date}</div>
            </div>
            <div className="up-chat-bubble me">
              <div className="up-chat-bubble-text">
                Thank you. This is an urgent issue as I cannot complete my property listing without the photos.
              </div>
              <div className="up-chat-bubble-time">10:32 AM</div>
            </div>
          </div>

          <div className="up-chat-input-area">
            <input type="text" className="up-chat-input" placeholder="Type your message..." />
            <button className="up-chat-send">
              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" /></svg>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="up-card">
      <div className="up-section-header">
        <div>
          <div className="up-card-title">Support Tickets</div>
          <div className="up-card-sub">Manage your raised issues and enquiries</div>
        </div>
        <button className="up-btn up-btn-primary" onClick={() => setView('form')}>+ Raise New Ticket</button>
      </div>

      <div style={{ overflowX: 'auto', marginTop: '16px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ textAlign: 'left', borderBottom: '1px solid #f1f5f9' }}>
              <th style={{ padding: '12px 16px', fontSize: '0.75rem', fontWeight: 600, color: '#94a3b8', textTransform: 'uppercase' }}>Ticket ID</th>
              <th style={{ padding: '12px 16px', fontSize: '0.75rem', fontWeight: 600, color: '#94a3b8', textTransform: 'uppercase' }}>Subject</th>
              <th style={{ padding: '12px 16px', fontSize: '0.75rem', fontWeight: 600, color: '#94a3b8', textTransform: 'uppercase' }}>Category</th>
              <th style={{ padding: '12px 16px', fontSize: '0.75rem', fontWeight: 600, color: '#94a3b8', textTransform: 'uppercase' }}>Status</th>
              <th style={{ padding: '12px 16px', fontSize: '0.75rem', fontWeight: 600, color: '#94a3b8', textTransform: 'uppercase', textAlign: 'right' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map((t, i) => (
              <tr key={i} style={{ borderBottom: '1px solid #f1f5f9' }}>
                <td style={{ padding: '14px 16px', fontWeight: 500, fontSize: '0.85rem', color: '#64748b' }}>{t.id}</td>
                <td style={{ padding: '14px 16px' }}>
                  <div style={{ fontWeight: 600, color: '#0f172a', fontSize: '0.88rem' }}>{t.subject}</div>
                  <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>{t.date}</div>
                </td>
                <td style={{ padding: '14px 16px' }}>
                  <span style={{ fontSize: '0.8rem', color: '#475569' }}>{t.category}</span>
                </td>
                <td style={{ padding: '14px 16px' }}>
                  <span className={`up-tag ${t.status === 'Resolved' ? 'green' : t.status === 'In Progress' ? 'blue' : 'amber'}`}>
                    {t.status}
                  </span>
                </td>
                <td style={{ padding: '14px 16px', textAlign: 'right' }}>
                  <button 
                    className="up-btn up-btn-ghost" 
                    style={{ padding: '5px 10px', fontSize: '0.75rem' }}
                    onClick={() => {
                      setSelectedTicket(t);
                      setView('chat');
                    }}
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
