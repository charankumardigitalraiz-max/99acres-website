import { useState, useRef, useEffect } from 'react';
import './Navbar.css';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../store/slices/authSlice';
import { NAV_LINKS } from '../../data/constants';
import { LogoIcon, MenuIco, CloseIco } from '../../data/icons';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { isLoggedIn, user } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsProfileDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  const userDetails = {
    name: localStorage.getItem('name') || 'User',
    email: localStorage.getItem('email') || 'charanapalimara@gmail.com'
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
            {userDetails.name ? (
              <div className="user-profile-mobile">
                <div className="user-avatar-row">
                  <div className="user-avatar">{userDetails.name}</div>
                  <div>
                    <div className="user-avatar-name">{userDetails.name}</div>
                    <div className="user-avatar-email">{userDetails.email || 'Member'}</div>
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
          {userDetails.name ? (
            <div className="profile-dropdown-container" ref={dropdownRef}>
              <button
                className="nav-avatar-btn"
                title="My Profile"
                onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
              >
                <div className="nav-avatar-circle">
                  {userDetails.name.charAt(0).toUpperCase()}
                </div>
                <span className="nav-avatar-name">Hi, {userDetails.name.split(' ')[0]}</span>
              </button>

              {isProfileDropdownOpen && (
                <div className="profile-dropdown">
                  <Link to="/profile" onClick={() => setIsProfileDropdownOpen(false)}>My Profile</Link>
                  <Link to="/profile/settings" onClick={() => setIsProfileDropdownOpen(false)}>Settings</Link>
                  <button onClick={() => { handleLogout(); setIsProfileDropdownOpen(false); }} className="dropdown-logout">Logout</button>
                </div>
              )}
            </div>
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
