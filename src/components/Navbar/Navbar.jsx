import { useState, useRef, useEffect } from 'react';
import './Navbar.css';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../store/slices/authSlice';
import { setQuery, clearSuggestions, setLocation } from '../../store/slices/searchSlice';
import { NAV_LINKS, MEGA_MENUS, CITIES } from '../../data/constants';
import { MenuIco, CloseIco, PinIco, LocIco, IconFlats, SearchIco, BuyIcon } from '../../data/icons';
import SearchBar from '../SearchBar/SearchBar';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isPastHero, setIsPastHero] = useState(false);
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [locSearch, setLocSearch] = useState('');
  const [activeMenuKey, setActiveMenuKey] = useState(null);
  const dropdownRef = useRef(null);
  const searchRef = useRef(null);
  const mobileSearchRef = useRef(null);
  const { isLoggedIn, user } = useSelector(state => state.auth);
  const { query, location, suggestions } = useSelector(state => state.search);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const locationPath = useLocation();

  const isHomePage = locationPath.pathname === '/';
  const isnotHomePage = locationPath.pathname !== '/';

  // Scroll detection — triggers at 80px so navbar
  // search appears earlier on mobile
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY;
      setIsScrolled(scrollPos > 40);
      setIsPastHero(scrollPos > 450);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


  // Click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsProfileDropdownOpen(false);
      }
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        dispatch(clearSuggestions());
      }
      if (mobileSearchRef.current && !mobileSearchRef.current.contains(event.target)) {
        dispatch(clearSuggestions());
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
    localStorage.removeItem('token');
    localStorage.removeItem('name');
    localStorage.removeItem('email');
    dispatch(logout());
    navigate('/');
  };

  const handleSearch = (e) => {
    e?.preventDefault();
    navigate('/properties');
    setIsMenuOpen(false);
  };

  const handleSelectSuggestion = (suggestion) => {
    dispatch(setLocation(suggestion.text));
    dispatch(clearSuggestions());
    navigate('/properties');
    setIsMenuOpen(false);
  };

  const token = localStorage.getItem('token');
  const isAuthenticated = isLoggedIn || !!token;

  const userDetails = {
    name: user?.name || localStorage.getItem('name') || 'User',
    email: user?.email || localStorage.getItem('email') || ''
  };

  return (
    <>
      <nav className={`navbar ${isScrolled ? 'navbar--scrolled' : ''} ${isHomePage && !isScrolled ? 'navbar--transparent' : ''} ${isnotHomePage && !isScrolled ? 'navbar--details-show' : ''}`}>
        <div className="container">
          <div className="nav-left">
            {/* Logo */}
            <Link to="/" className="nav-logo" onClick={() => setIsMenuOpen(false)}>
              <img src="/sherla-properties-text.png" alt="Sherla Properties" className="nav-logo-img" />
              <span className="nav-logo-text">Sherla Properties</span>
            </Link>

            {/* Location Selector */}
            <div
              className="nav-location-wrapper"
              onMouseEnter={() => window.innerWidth > 900 && setIsLocationModalOpen(true)}
              onMouseLeave={() => window.innerWidth > 900 && setIsLocationModalOpen(false)}
            >
              <div
                className="nav-location-selector"
                onClick={() => setIsLocationModalOpen(!isLocationModalOpen)}
              >
                <PinIco className="location-pin" />
                <span className="location-label">{location || 'All India'}</span>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="chevron-down"><polyline points="6 9 12 15 18 9" /></svg>
              </div>

              {/* Isolated Location Modal */}
              {isLocationModalOpen && (
                <>
                  <div className="loc-popover">
                    <div className="loc-popover-header">
                      <h3>Select your city</h3>
                      <button className="loc-close-btn" onClick={() => { setIsLocationModalOpen(false); setLocSearch(''); }}>
                        <CloseIco />
                      </button>
                    </div>

                    <div className="loc-search-box">
                      <svg className="loc-search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
                      </svg>
                      <input
                        type="text"
                        className="loc-search-input"
                        placeholder="Search city..."
                        value={locSearch}
                        onChange={e => setLocSearch(e.target.value)}
                        autoFocus
                      />
                      {locSearch && (
                        <button className="loc-search-clear" onClick={() => setLocSearch('')}>
                          <CloseIco />
                        </button>
                      )}
                    </div>

                    <div className="loc-cities-grid">
                      {CITIES.filter(c => c.name.toLowerCase().includes(locSearch.toLowerCase())).map(city => (
                        <div
                          key={city.name}
                          className="loc-city-card"
                          onClick={() => {
                            dispatch(setLocation(city.name));
                            setIsLocationModalOpen(false);
                            setLocSearch('');
                          }}
                        >
                          <div className="loc-city-avatar">
                            <img src={city.img} alt={city.name} />
                          </div>
                          <div className="loc-city-info">
                            <span className="loc-city-name">{city.name}</span>
                            <span className="loc-city-count">{city.count} Properties</span>
                          </div>
                        </div>
                      ))}
                      {CITIES.filter(c => c.name.toLowerCase().includes(locSearch.toLowerCase())).length === 0 && (
                        <div className="loc-no-results">No cities found for &ldquo;{locSearch}&rdquo;</div>
                      )}
                    </div>
                  </div>
                  <div className="loc-backdrop" onClick={() => { setIsLocationModalOpen(false); setLocSearch(''); }} />
                </>
              )}
            </div>

          </div>

          {/* Center: Nav Links OR Search Bar (on scroll) */}
          <div className="nav-center">
            {/* Nav Links – visible when NOT scrolled */}
            <div className={`nav-links-desktop ${isScrolled ? 'nav-links-desktop--hidden' : ''}`}>
              {/* {NAV_LINKS.map(link => (
                <div
                  key={link.label}
                  className="nav-link-wrapper"
                  onMouseEnter={() => link.hasMenu && setActiveMenuKey(link.menuKey)}
                  onMouseLeave={() => link.hasMenu && setActiveMenuKey(null)}
                >
                  <Link to={link.path} className="nav-link-item">
                    {link.label}
                    {link.hasMenu && <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="link-chevron"><polyline points="6 9 12 15 18 9" /></svg>}
                  </Link>

                  {link.hasMenu && activeMenuKey === link.menuKey && (
                    <div className="properties-mega-menu">
                      <div className="mega-menu-inner">
                        {Object.entries(MEGA_MENUS[link.menuKey]).map(([category, items]) => (
                          <div key={category} className="mega-menu-column">
                            <h4 className="mega-menu-title">{category}</h4>
                            <div className="mega-menu-links">
                              {items.map(item => (
                                <Link
                                  key={item.label}
                                  to="/properties"
                                  className="mega-menu-item"
                                  onClick={() => setActiveMenuKey(null)}
                                >
                                  {item.icon && <span className="item-icon">{item.icon}</span>}
                                  <span className="item-label">{item.label}</span>
                                </Link>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))} */}
            </div>

            {/* Compact Search – visible when scrolled past hero */}
            <div className={`navbar-search-wrapper ${isPastHero ? 'navbar-search-wrapper--visible' : ''}`}>

              {/* Desktop Native Form */}
              <form
                className="navbar-search-desktop"
                onSubmit={handleSearch}
                ref={searchRef}
              >
                <div className="navbar-search-inner">
                  <svg className="navbar-search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
                  </svg>
                  <input
                    type="text"
                    className="navbar-search-input"
                    placeholder="Search city, locality, project…"
                    value={query || location}
                    onChange={e => dispatch(setQuery(e.target.value))}
                    autoComplete="off"
                  />
                  <button type="submit" className="navbar-search-btn">Search</button>
                </div>

                {/* Suggestions Dropdown */}
                {suggestions.length > 0 && isScrolled && (
                  <div className="nav-search-dropdown">
                    <div className="nav-dropdown-header">Quick Matches</div>
                    {suggestions.map((s, idx) => (
                      <div
                        key={idx}
                        className="nav-search-suggestion-item"
                        onClick={() => handleSelectSuggestion(s)}
                      >
                        <div className="nav-suggestion-icon">
                          {s.type === 'city' && <PinIco />}
                          {s.type === 'locality' && <LocIco />}
                          {s.type === 'project' && <IconFlats />}
                          {s.type === 'property' && <SearchIco />}
                          {s.type === 'type' && <IconFlats />}
                        </div>
                        <div className="nav-suggestion-text">
                          <span className="nav-main-text">{s.text}</span>
                          <span className="nav-type-tag">{s.type === 'property' ? 'Property Name' : s.type === 'type' ? 'Property Type' : s.type}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </form>

              {/* Mobile Search Trigger */}
              <div className="navbar-search-mobile-trigger">
                <SearchBar isNavbar={true} />
              </div>

            </div>
          </div>

          {/* Mobile Hamburger */}
          <button
            className="nav-toggle"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle navigation"
          >
            {isMenuOpen ? '' : <MenuIco />}
          </button>

          {/* Right Actions */}
          <div className="nav-right">
            <Link to="/properties" className={`nav-post-property ${isScrolled ? 'nav-post-property-buy--hidden' : ''}`} onClick={() => setIsMenuOpen(false)}>
              <BuyIcon />
              Buy Properties
            </Link>
            <Link to="/subscription" className="nav-post-property">
              Post Property
              <span className="nav-premium-tag">FREE</span>
            </Link>

            {isAuthenticated ? (
              <div className="profile-dropdown-container" ref={dropdownRef}>
                <button
                  className="nav-avatar-btn"
                  title="My Profile"
                  onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                >
                  <div className="nav-avatar-circle">
                    {userDetails.name.charAt(0).toUpperCase()}
                  </div>
                </button>

                {isProfileDropdownOpen && (
                  <div className="profile-dropdown">
                    <div className="profile-dropdown-header">
                      <div className="profile-dropdown-avatar">{userDetails.name.charAt(0).toUpperCase()}</div>
                      <div>
                        <div className="profile-dropdown-name">{userDetails.name}</div>
                        <div className="profile-dropdown-email">{userDetails.email}</div>
                      </div>
                    </div>
                    {/* <div className="profile-dropdown-divider" /> */}
                    <Link to="/profile/profile" onClick={() => setIsProfileDropdownOpen(false)}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
                      My Profile
                    </Link>
                    <Link to="/profile/settings" onClick={() => setIsProfileDropdownOpen(false)}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3" /><path d="M19.07 4.93l-1.41 1.41M21 12h-2M19.07 19.07l-1.41-1.41M12 21v-2M4.93 19.07l1.41-1.41M3 12h2M4.93 4.93l1.41 1.41" /></svg>
                      Settings
                    </Link>
                    <div className="profile-dropdown-divider" />
                    <button onClick={() => { handleLogout(); setIsProfileDropdownOpen(false); }} className="dropdown-logout">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" /></svg>
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/login" className="nav-login-btn">
                <span className="nav-user-ico">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
                  </svg>
                </span>
                Login / Register
              </Link>
            )}
          </div>
        </div>
      </nav>

      {/* ─── Mobile Drawer ─────────────────────────── */}
      <div className={`nav-drawer ${isMenuOpen ? 'active' : ''}`}>
        {/* Drawer Header */}
        <div className="nav-drawer-header">
          <Link to="/" className="nav-logo" onClick={() => setIsMenuOpen(false)}>
            <img src="/sherla-properties-text.png" alt="Sherla Properties" className="nav-logo-img" />
            <span className="nav-logo-text">Sherla<span>Properties</span></span>
          </Link>
          <button className="nav-drawer-close" onClick={() => setIsMenuOpen(false)} aria-label="Close menu">
            <CloseIco />
          </button>
        </div>

        {/* Mobile Search - Visible only when past hero */}
        {isPastHero && (
          <div className="nav-drawer-search" ref={mobileSearchRef}>
            <SearchBar isNavbar={true} />
          </div>
        )}

        {/* Mobile Nav Links */}
        <div className="nav-drawer-links">
          {NAV_LINKS.map(link => (
            <Link
              key={link.label}
              to={link.path}
              className="nav-drawer-link"
              onClick={() => setIsMenuOpen(false)}
            >
              {link.label}
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </Link>
          ))}
        </div>

        {/* Mobile Bottom Actions */}
        <div className="nav-drawer-footer">
          {isAuthenticated ? (
            <div className="user-profile-mobile">
              <div className="user-avatar-row">
                <div className="user-avatar">{userDetails.name.charAt(0).toUpperCase()}</div>
                <div>
                  <div className="user-avatar-name">{userDetails.name}</div>
                  <div className="user-avatar-email">{userDetails.email || 'Member'}</div>
                </div>
              </div>
              <Link to="/profile" className="btn-outline w-full" onClick={() => setIsMenuOpen(false)}>View Profile</Link>
              <button className="btn-outline w-full" onClick={handleLogout}>Logout</button>
            </div>
          ) : (
            <Link to="/login" className="btn-outline w-full" onClick={() => setIsMenuOpen(false)}>Login</Link>
          )}

          <Link to="/properties" className="btn-primary w-full" onClick={() => setIsMenuOpen(false)}>
            <BuyIcon />
            Buy Properties
          </Link>
          <Link to="/subscription" className="btn-primary w-full" onClick={() => setIsMenuOpen(false)}>
            Post Property
            <span className="premium-tag">FREE</span>
          </Link>
        </div>
      </div>
      {isMenuOpen && <div className="nav-overlay" onClick={() => setIsMenuOpen(false)} />}
    </>
  );
}
