import { useState } from 'react';
import './Navbar.css';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../store/slices/authSlice';
import { NAV_LINKS } from '../../data/constants';
import { LogoIcon, MenuIco, CloseIco } from '../../data/icons';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isLoggedIn, user } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="container">
        <Link to="/" className="nav-logo" onClick={() => setIsMenuOpen(false)}>
          <div className="nav-logo-icon"><LogoIcon /></div>
          Sherla<span>Properties</span>
        </Link>

        <button
          className="nav-toggle"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle navigation"
        >
          {isMenuOpen ? '' : <MenuIco />}
        </button>

        <div className={`nav-links ${isMenuOpen ? 'active' : ''}`}>

          {/* ── Drawer Header: Logo + Close ── */}
          <div className="nav-drawer-header">
            <Link to="/" className="nav-logo" onClick={() => setIsMenuOpen(false)}>
              <div className="nav-logo-icon"><LogoIcon /></div>
              Sherla<span>Properties</span>
            </Link>
            <button className="nav-drawer-close" onClick={() => setIsMenuOpen(false)} aria-label="Close menu">
              <CloseIco />
            </button>
          </div>

          {/* ── Nav Links ── */}
          {NAV_LINKS.map(link => (
            <Link
              key={link.label}
              to={link.path}
              onClick={() => setIsMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}

          {/* ── Bottom: Profile + CTA ── */}
          <div className="nav-right-mobile">
            {isLoggedIn ? (
              <div className="user-profile-mobile">
                <div className="user-avatar-row">
                  <div className="user-avatar">{user.name?.charAt(0).toUpperCase()}</div>
                  <div>
                    <div className="user-avatar-name">{user.name}</div>
                    <div className="user-avatar-email">{user.email || 'Member'}</div>
                  </div>
                </div>
                <Link to="/profile" className="btn-outline w-full" onClick={() => setIsMenuOpen(false)}>
                  View Profile
                </Link>
                <button className="btn-outline w-full" onClick={handleLogout}>Logout</button>
              </div>
            ) : (
              <Link to="/login" className="btn-outline w-full" onClick={() => setIsMenuOpen(false)}>
                Login
              </Link>
            )}
            <Link to="/subscription" className="btn-primary" onClick={() => setIsMenuOpen(false)}>
              Post Property
              <span className="premium-tag">PREMIUM</span>
            </Link>
          </div>
        </div>

        <div className="nav-right">
          {isLoggedIn ? (
            <>
              <span className="user-name">Hi, {user.name}</span>
              <button className="btn-outline" onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <Link to="/login" className="btn-outline">Login</Link>
          )}

          <Link to="/subscription" className="btn-primary">
            Post Property
            <span className="premium-tag">PREMIUM</span>
          </Link>
        </div>
      </div>
      {isMenuOpen && <div className="nav-overlay" onClick={() => setIsMenuOpen(false)} />}
    </nav>
  );
}
