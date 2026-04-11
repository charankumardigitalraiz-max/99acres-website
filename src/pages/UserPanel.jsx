import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { logout } from '../store/slices/authSlice';

// Modular Components
import Overview from '../components/UserPanel/Overview';
import ProfilePanel from '../components/UserPanel/ProfilePanel';
import FavouritesPanel from '../components/UserPanel/FavouritesPanel';
import MessagesPanel from '../components/UserPanel/MessagesPanel';
import SupportPanel from '../components/UserPanel/SupportPanel';
import NotificationsPanel from '../components/UserPanel/NotificationsPanel';
import SettingsPanel from '../components/UserPanel/SettingsPanel';
import SubscriptionPanel from '../components/UserPanel/SubscriptionPanel';

import './UserPanel.css';

/* ── Icons (Kept here for navigation) ── */
const IconHome = () => <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M3 12L12 3l9 9" /><path d="M9 21V12h6v9" /></svg>;
const IconHeart = () => <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" /></svg>;
const IconUser = () => <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>;
const IconBell = () => <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" /></svg>;
const IconSettings = () => <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" /></svg>;
const IconLogout = () => <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" /></svg>;
const IconMessage = () => <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>;
const IconPremium = () => <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>;
const IconHelp = () => <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" /><line x1="12" y1="17" x2="12.01" y2="17" /></svg>;

const TABS = [
  // { key: 'overview', label: 'Overview', icon: <IconHome /> },
  { key: 'profile', label: 'My Profile', icon: <IconUser /> },
  // { key: 'subscription', label: 'Subscription', icon: <IconPremium /> },
  { key: 'favourites', label: 'Favourites', icon: <IconHeart /> },
  // { key: 'messages', label: 'Messages', icon: <IconMessage /> },
  { key: 'notifications', label: 'Notifications', icon: <IconBell /> },
  { key: 'support', label: 'Support Chat', icon: <IconHelp /> },
  { key: 'settings', label: 'Settings', icon: <IconSettings /> },
];

export default function UserPanel() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { tab } = useParams();
  const { profile } = useSelector(state => state.userPanel);
  const { wishlist } = useSelector(state => state.properties);

  const tabName = tab || 'overview';
  const isLoggedIn = true; // For demo purposes, in production pull from auth state

  if (!isLoggedIn) {
    return (
      <div style={{ textAlign: 'center', padding: '80px 20px' }}>
        <div style={{ fontSize: '3rem', marginBottom: 16 }}>🔒</div>
        <h2 style={{ color: 'var(--dark)', marginBottom: 8 }}>Please login to access your panel</h2>
        <p style={{ color: 'var(--text-3)', marginBottom: 24 }}>Sign in to view your profile, favourites and settings.</p>
        <button className="up-btn up-btn-primary" onClick={() => navigate('/login')}>
          Login / Register
        </button>
      </div>
    );
  }

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem('token');
    localStorage.removeItem('name');
    localStorage.removeItem('email');
    navigate('/');
  };

  const renderPanel = () => {
    switch (tabName) {
      // case 'overview': return <Overview />;
      case 'profile': return <ProfilePanel />;
      // case 'subscription': return <SubscriptionPanel />;
      case 'favourites': return <FavouritesPanel />;
      case 'notifications': return <NotificationsPanel />;
      // case 'messages': return <MessagesPanel />;
      case 'support': return <SupportPanel />;
      case 'settings': return <SettingsPanel />;
      default: return <ProfilePanel />;
    }
  };

  return (
    <div className="up-page">
      <div className="up-layout">
        {/* ── SIDEBAR ── */}
        <aside className="up-sidebar">
          <div className="up-avatar-block">
            <div className="up-avatar-ring">{profile.initials}</div>
            <div className='up-user-details'>
              <div className="up-user-name">{`${profile.firstName} ${profile.lastName}`}</div>
              <div className="up-user-email">{profile.email}</div>
            </div>
          </div>
          <nav className="up-nav-list">
            {TABS.map(t => (
              <button
                key={t.key}
                className={`up-nav-item ${tabName === t.key ? 'active' : ''}`}
                onClick={() => navigate(`/profile/${t.key}`)}
              >
                {t.icon}
                <span>{t.label}</span>
                {t.key === 'favourites' && wishlist.length > 0 && (
                  <span className="up-tag amber" style={{ marginLeft: 'auto', fontSize: '0.65rem', padding: '2px 7px' }}>
                    {wishlist.length}
                  </span>
                )}
              </button>
            ))}
            <div className="up-nav-divider" />
            <button className="up-nav-item danger" onClick={handleLogout}>
              <IconLogout /> Logout
            </button>
          </nav>
        </aside>

        {/* ── MAIN ── */}
        <main className="up-main">
          {renderPanel()}
        </main>
      </div>
    </div>
  );
}
