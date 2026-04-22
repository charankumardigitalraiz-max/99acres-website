import { useState, useRef, useEffect } from 'react';
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
  const [isDetectingLocation, setIsDetectingLocation] = useState(false);
  const [locSearch, setLocSearch] = useState('');
  const [activeMenuKey, setActiveMenuKey] = useState(null);
  const dropdownRef = useRef(null);
  const searchRef = useRef(null);
  const mobileSearchRef = useRef(null);
  const { isLoggedIn, user } = useSelector(state => state.auth);
  const [defaultLocation, setDefaultLocation] = useState(null);
  const { query, location, suggestions } = useSelector(state => state.search);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const locationPath = useLocation();

  const isHomePage = locationPath.pathname === '/';
  const isnotHomePage = locationPath.pathname !== '/';


  const fetchyLocation = () => {
    setIsDetectingLocation(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          // Using free API endpoint without key limitations
          const res = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`);
          const data = await res.json();
          const city = data.city || data.locality || data.principalSubdivision;
          console.log(data);
          if (city) {
            // Simplify city name if it has extra words
            const cleanCity = city.replace(/ District/g, '');
            setDefaultLocation(cleanCity);
            dispatch(setLocation(cleanCity));
            setIsLocationModalOpen(false);
          }
        } catch (error) {
          console.error("Error fetching city:", error);
        } finally {
          setIsDetectingLocation(false);
        }
      },
      (error) => {
        console.error('Error getting location:', error);
        setIsDetectingLocation(false);
      }
    );
  };

  useEffect(() => {
    fetchyLocation();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY;
      setIsScrolled(scrollPos > 40);
      setIsPastHero(scrollPos > 450);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
    // navigate('/properties');
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
      <nav className={`fixed w-full left-0 top-0 z-[1000] lg:px-10 flex items-center h-[72px] max-sm:h-[56px] transition-all duration-500 ease-[cubic-bezier(0.165,0.84,0.44,1)] ${isScrolled ? 'bg-white lg:rounded-b-[60px]  border-b border-black/5 sm:rounded-none' :
        isHomePage ? 'bg-transparent' : 'bg-white/95 backdrop-blur-md border-b border-slate-100'
        }`}>
        <div className="max-w-[1350px] w-full mx-auto px-5 flex items-center gap-3 relative">

          {/* Left: Logo & Location */}
          <div className="flex-none flex items-center gap-5 max-md:gap-1">
            <Link to="/" className="flex items-center gap-2.5 font-outfit text-xl font-bold shrink-0 tracking-tight" onClick={() => setIsMenuOpen(false)}>
              <img src="/sherla-properties-text.png" alt="Sherla Properties" className={`w-auto object-contain block transition-all duration-300 ${isScrolled ? 'h-[32px] md:h-[55px]' : 'h-[38px] md:h-[55px]'}`} />
              <span className={`hidden md:inline-flex text-black ${isScrolled || isnotHomePage ? 'text-slate-900' : ''}`}>Sherla Properties</span>
            </Link>

            <div
              className={`relative h-full flex items-center ${isScrolled ? 'max-md:hidden' : ''}`}
              onMouseEnter={() => window.innerWidth > 900 && setIsLocationModalOpen(true)}
              onMouseLeave={() => window.innerWidth > 900 && setIsLocationModalOpen(false)}
            >
              <div className="flex items-center gap-1 cursor-pointer py-1.5 px-2 rounded-md transition-colors border border-transparent hover:bg-slate-50 hover:border-slate-200 group" onClick={() => setIsLocationModalOpen(!isLocationModalOpen)}>
                <PinIco className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                <span className={`text-[13px] font-medium whitespace-nowrap max-w-[100px] truncate ${isScrolled || isnotHomePage ? 'text-slate-600 group-hover:text-slate-900' : 'text-black max-md:text-white group-hover:text-slate-900'}`}>{location || 'All India'}</span>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className={`w-3.5 h-3.5 shrink-0 ${isScrolled || isnotHomePage ? 'text-slate-400 group-hover:text-slate-900' : 'text-black max-md:text-white group-hover:text-slate-900'}`}><polyline points="6 9 12 15 18 9" /></svg>
              </div>

              {/* Location Popover */}
              {isLocationModalOpen && (
                <>
                  <div className="absolute top-full left-0 w-[820px] max-md:fixed max-md:top-[66px] max-md:left-3 max-md:right-3 max-md:w-auto bg-white rounded-xl shadow-[0_20px_60px_rgba(0,0,0,0.14)] border border-slate-200 z-[2005] overflow-hidden flex flex-col md:animate-in md:fade-in md:slide-in-from-top-2 max-md:max-h-[calc(100vh-82px)]">
                    <div className="py-5 px-5 pb-3.5 flex items-center justify-between border-b border-slate-100">
                      <h3 className="text-[1.05rem] font-semibold text-slate-900 m-0">Select your city</h3>
                      <button className="bg-slate-100 border-none text-slate-500 cursor-pointer p-1.5 rounded-full flex items-center justify-center transition-colors hover:bg-slate-200 hover:text-slate-900" onClick={() => { setIsLocationModalOpen(false); setLocSearch(''); }}><CloseIco /></button>
                    </div>

                    <div className="flex flex-col gap-3 mx-5 mt-5 pb-3.5 border-b border-slate-100 w-[90%]">
                      <div className="relative w-full">
                        <svg className="absolute left-3.5 top-[50%] -translate-y-1/2 w-4.5 h-4.5 text-slate-400 pointer-events-none" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
                        <input type="text" className="w-full py-2.5 px-3 pl-11 bg-slate-50 border-[1.5px] border-slate-200 rounded-lg text-sm text-slate-900 font-sans transition-all focus:bg-white focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10 focus:outline-none" placeholder="Search city..." value={locSearch} onChange={e => setLocSearch(e.target.value)} autoFocus />
                        {locSearch && (
                          <button className="absolute right-3 top-[50%] -translate-y-1/2 bg-slate-200 border-none rounded-full w-5 h-5 flex items-center justify-center cursor-pointer text-slate-500 transition-colors hover:bg-slate-300 p-0" onClick={() => setLocSearch('')}><CloseIco /></button>
                        )}
                      </div>

                      <button
                        onClick={fetchyLocation}
                        disabled={isDetectingLocation}
                        className="flex items-center gap-2 self-start text-amber-600 text-sm font-semibold hover:text-amber-700 transition-colors cursor-pointer bg-amber-50 px-3 py-2 rounded-lg border border-amber-100 disabled:opacity-50"
                      >
                        {isDetectingLocation ? (
                          <span className="w-4 h-4 border-2 border-amber-600 border-t-transparent rounded-full animate-spin"></span>
                        ) : (
                          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="3 11 22 2 13 21 11 13 3 11" /></svg>
                        )}
                        {isDetectingLocation ? 'Detecting Location...' : 'Detect my location'}
                      </button>
                    </div>

                    <div className="p-4 px-5 grid grid-cols-2 lg:grid-cols-[repeat(auto-fill,minmax(120px,1fr))] gap-2.5 max-h-[400px] overflow-y-auto max-md:max-h-[calc(100vh-200px)]">
                      {CITIES.filter(c => c.name.toLowerCase().includes(locSearch.toLowerCase())).map(city => (
                        <div key={city.name} className="flex flex-col items-center p-3.5 px-2.5 rounded-xl cursor-pointer border border-transparent transition-all hover:bg-slate-50 hover:border-slate-100 hover:-translate-y-1 hover:shadow-lg max-md:bg-slate-50 max-md:border-slate-100 group" onClick={() => { dispatch(setLocation(city.name)); setIsLocationModalOpen(false); setLocSearch(''); }}>
                          <div className="w-16 h-16 rounded-full overflow-hidden border-[2.5px] border-white shadow-md mb-2.5 transition-all group-hover:border-amber-500 group-hover:scale-105 max-md:w-[54px] max-md:h-[54px]">
                            <img src={city.img} alt={city.name} className="w-full h-full object-cover" />
                          </div>
                          <div className="text-center">
                            <span className="font-semibold text-[0.88rem] leading-tight text-slate-900 block">{city.name}</span>
                            <span className="text-[0.72rem] text-slate-400 mt-1 block">{city.count} Properties</span>
                          </div>
                        </div>
                      ))}
                      {CITIES.filter(c => c.name.toLowerCase().includes(locSearch.toLowerCase())).length === 0 && (
                        <div className="col-span-full text-center py-8 text-sm text-slate-400 font-medium">No cities found for &ldquo;{locSearch}&rdquo;</div>
                      )}
                    </div>
                  </div>
                  <div className="fixed inset-0 bg-slate-900/35 backdrop-blur-[3px] z-[1500] max-md:block hidden" onClick={() => { setIsLocationModalOpen(false); setLocSearch(''); }} />
                </>
              )}
            </div>
          </div>

          {/* Center Space & Desktop Search */}
          <div className="flex-1 flex items-center justify-center min-w-0">
            {/* Desktop Nav Links (Visible when NOT scrolled) */}
            {/* <div className={`hidden md:flex items-center h-[62px] gap-0.5 transition-all duration-300 ${isScrolled ? 'hidden opacity-0 pointer-events-none -translate-x-2' : ''}`}>
              {NAV_LINKS.map(link => (
                <div key={link.label} className="relative h-full flex items-center group" onMouseEnter={() => link.hasMenu && setActiveMenuKey(link.menuKey)} onMouseLeave={() => link.hasMenu && setActiveMenuKey(null)}>
                  <Link to={link.path} className="flex items-center gap-1 py-2 px-3 font-outfit text-[0.95rem] font-medium text-slate-600 no-underline transition-all duration-300 whitespace-nowrap relative tracking-tight group-hover:text-slate-900 before:content-[''] before:absolute before:bottom-0 before:left-3 before:right-3 before:h-0.5 before:bg-amber-500 before:scale-x-0 before:origin-right before:transition-transform before:duration-400 group-hover:before:scale-x-100 group-hover:before:origin-left">
                    {link.label}
                    {link.hasMenu && <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-[13px] h-[13px] ml-0.5 text-slate-400 transition-transform duration-250 group-hover:rotate-180"><polyline points="6 9 12 15 18 9" /></svg>}
                  </Link>

              
                  {link.hasMenu && activeMenuKey === link.menuKey && (
                    <div className="absolute top-full left-1/2 -translate-x-1/2 translate-y-0 scale-100 w-[860px] bg-white rounded-[20px] shadow-[0_20px_60px_-10px_rgba(15,23,42,0.15),0_0_1px_rgba(0,0,0,0.1)] border border-slate-200/60 p-8 z-[1001] transition-all duration-350 opacity-100 visible pointer-events-auto">
                      <div className="grid grid-cols-3 gap-8">
                        {Object.entries(MEGA_MENUS[link.menuKey]).map(([category, items]) => (
                          <div key={category} className="flex flex-col">
                            <h4 className="font-outfit text-xs uppercase tracking-[0.12em] text-slate-400 mb-5 font-bold border-b border-slate-100 pb-2.5">{category}</h4>
                            <div className="flex flex-col gap-3">
                              {items.map(item => (
                                <Link key={item.label} to="/properties" className="flex items-center gap-3 py-1 group/item transition-all duration-200 text-slate-600 font-medium text-[0.9rem]" onClick={() => setActiveMenuKey(null)}>
                                  <span className="w-1.5 h-1.5 bg-slate-200 rounded-full shrink-0 transition-all duration-250 group-hover/item:bg-amber-500 group-hover/item:scale-125" />
                                  <span className="group-hover/item:text-amber-600 group-hover/item:translate-x-1.5 transition-all">{item.label}</span>
                                </Link>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div> */}

            {/* Scrolled Search Desktop */}
            <div className={`hidden md:flex flex-col relative w-full max-w-[500px] transition-all duration-300 ${!isScrolled || !isPastHero ? 'hidden opacity-0 invisible w-0 pointer-events-none' : 'opacity-100 visible'}`} ref={searchRef}>
              <form className="flex items-center w-full bg-[#f8fafc] border-[1.5px] border-[#e8edf2] rounded-[10px] px-3 h-[42px] gap-2.5 transition-all duration-200 focus-within:border-amber-500 focus-within:ring-[3px] focus-within:ring-amber-500/10 focus-within:bg-white" onSubmit={handleSearch}>
                <svg className="w-[17px] h-[17px] text-slate-400 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
                <input type="text" className="flex-1 h-full border-none bg-transparent text-[0.88rem] text-slate-900 font-sans outline-none min-w-0 placeholder:text-slate-400 font-normal focus:ring-0" placeholder={location ? `Search in ${location}...` : "Search city, locality, project…"} value={query} onChange={e => dispatch(setQuery(e.target.value))} autoComplete="off" />
                {/* <button type="submit" className="bg-amber-500 text-slate-900 border-none px-4 py-1.5 rounded-[7px] text-[0.82rem] font-semibold cursor-pointer transition-all duration-200 hover:bg-amber-600 shrink-0 whitespace-nowrap font-sans flex items-center justify-center">Search</button> */}
              </form>

              {suggestions.length > 0 && isScrolled && (
                <div className="absolute top-[calc(100%+10px)] left-0 w-full bg-white rounded-xl shadow-[0_16px_40px_rgba(0,0,0,0.12)] border border-slate-200 z-[100] overflow-hidden">
                  <div className="px-4 py-2.5 pb-1.5 text-[0.7rem] font-semibold text-slate-400 uppercase tracking-wider border-b border-slate-100">Quick Matches</div>
                  {suggestions.map((s, idx) => (
                    <div key={idx} className="flex items-center gap-3 py-2.5 px-4 cursor-pointer transition-colors hover:bg-slate-50"
                      onMouseDown={(e) => { e.preventDefault(); handleSelectSuggestion(s); }}
                      onTouchStart={(e) => { e.preventDefault(); handleSelectSuggestion(s); }}
                    >
                      <div className="w-[30px] h-[30px] bg-slate-100 rounded-full flex items-center justify-center text-slate-500 shrink-0">
                        {s.type === 'city' && <PinIco />}
                        {s.type === 'locality' && <LocIco />}
                        {s.type === 'project' && <IconFlats />}
                        {s.type === 'property' && <SearchIco />}
                        {s.type === 'type' && <IconFlats />}
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[0.88rem] font-medium text-slate-900">{s.text}</span>
                        <span className="text-[0.7rem] text-slate-400 capitalize mt-px">{s.type === 'property' ? 'Property Name' : s.type === 'type' ? 'Property Type' : s.type}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Mobile Scrolled Search Trigger */}
            <div className={`w-full transition-all duration-300 md:hidden ${isScrolled && isPastHero ? 'flex' : 'hidden'}`}>
              <SearchBar isNavbar={true} />
            </div>
          </div>

          <button className="md:hidden flex items-center justify-center w-[38px] h-[38px] rounded-lg border-[1.5px] border-slate-200 bg-white text-slate-500 p-0 transition-colors ml-auto hover:border-amber-500 hover:text-amber-600 shrink-0" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle navigation">
            {isMenuOpen ? '' : <MenuIco />}
          </button>

          {/* Right Actions */}
          <div className="hidden md:flex flex-none items-center justify-end gap-[10px]">
            <Link to="/properties" className={`flex items-center gap-[6px] px-[14px] py-[7px] bg-amber-500 text-slate-900 font-semibold text-[0.82rem] rounded-lg transition-all duration-200 hover:bg-amber-600 hover:-translate-y-px whitespace-nowrap no-underline ${isScrolled ? 'hidden' : ''}`} onClick={() => setIsMenuOpen(false)}>
              <BuyIcon /> Buy Properties
            </Link>
            <Link to="/subscription" className="flex items-center gap-[6px] px-[14px] py-[7px] bg-amber-500 text-slate-900 font-semibold text-[0.82rem] rounded-lg transition-all duration-200 hover:bg-amber-600 hover:-translate-y-px whitespace-nowrap no-underline">
              Post Property <span className="bg-slate-900 text-amber-500 text-[0.6rem] font-bold py-[2px] px-[5px] rounded-[4px] tracking-[0.05em] uppercase">FREE</span>
            </Link>

            {isAuthenticated ? (
              <div className="relative" ref={dropdownRef}>
                <button className="bg-transparent border-none cursor-pointer p-[2px] flex items-center group" title="My Profile" onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}>
                  <div className="w-[34px] h-[34px] bg-amber-500 text-slate-900 text-[0.88rem] font-bold rounded-full flex items-center justify-center shrink-0 transition-shadow duration-200 group-hover:shadow-[0_0_0_3px_rgba(245,158,11,0.25)]">
                    {userDetails.name.charAt(0).toUpperCase()}
                  </div>
                </button>

                {isProfileDropdownOpen && (
                  <div className="absolute top-[calc(100%+10px)] right-0 w-[220px] bg-white rounded-xl shadow-[0_16px_40px_rgba(0,0,0,0.12)] border border-[#e2e8f0] overflow-hidden z-[500] animate-in slide-in-from-top-2">
                    <div className="flex items-center gap-3 p-3.5 px-4 bg-[#fafafa] border-b border-[#e2e8f0]">
                      <div className="w-[36px] h-[36px] bg-amber-500 text-slate-900 text-[0.9rem] font-bold rounded-full flex items-center justify-center shrink-0">{userDetails.name.charAt(0).toUpperCase()}</div>
                      <div className="overflow-hidden">
                        <div className="text-[0.9rem] font-semibold text-slate-900 leading-none mb-[3px]">{userDetails.name}</div>
                        <div className="text-[0.72rem] text-slate-400 truncate max-w-[130px]">{userDetails.email}</div>
                      </div>
                    </div>
                    <Link to="/profile/profile" className="flex items-center gap-3 p-3 px-4 text-[0.9rem] font-medium text-slate-600 font-outfit transition-all duration-200 hover:bg-slate-50 hover:text-slate-900 w-full no-underline" onClick={() => setIsProfileDropdownOpen(false)}>
                      <svg className="w-4 h-4 text-slate-400 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
                      My Profile
                    </Link>
                    <Link to="/profile/settings" className="flex items-center gap-3 p-3 px-4 text-[0.9rem] font-medium text-slate-600 font-outfit transition-all duration-200 hover:bg-slate-50 hover:text-slate-900 w-full no-underline" onClick={() => setIsProfileDropdownOpen(false)}>
                      <svg className="w-4 h-4 text-slate-400 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3" /><path d="M19.07 4.93l-1.41 1.41M21 12h-2M19.07 19.07l-1.41-1.41M12 21v-2M4.93 19.07l1.41-1.41M3 12h2M4.93 4.93l1.41 1.41" /></svg>
                      Settings
                    </Link>
                    <div className="h-px bg-[#e2e8f0] my-1 mx-0" />
                    <button onClick={() => { handleLogout(); setIsProfileDropdownOpen(false); }} className="flex items-center gap-3 p-3 px-4 text-[0.9rem] font-medium text-red-500 font-outfit transition-all duration-200 hover:bg-slate-50 hover:text-slate-900 w-full bg-transparent border-none cursor-pointer text-left">
                      <svg className="w-4 h-4 text-red-500 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" /></svg>
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/login" className={`flex items-center gap-[7px] py-[7px] px-[18px] border-[1.5px] rounded-lg text-[0.85rem] font-semibold bg-transparent backdrop-blur-[4px] transition-all duration-300 whitespace-nowrap group focus:outline-none no-underline leading-normal ${!isScrolled && isHomePage ? 'border-black text-black hover:bg-white/10 hover:border-white' : 'border-[#111827] text-[#111827] hover:bg-[#111827] hover:text-white hover:shadow-[0_4px_12px_rgba(0,0,0,0.1)]'}`}>
                <span className="flex items-center leading-none">
                  <svg className="w-4 h-4 transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
                </span>
                Login / Register
              </Link>
            )}
          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <div className={`fixed top-0 w-[300px] h-screen bg-white flex flex-col transition-all duration-300 ease-[cubic-bezier(0.165,0.84,0.44,1)] shadow-[-8px_0_30px_rgba(0,0,0,0.1)] z-[2000] overflow-y-auto ${isMenuOpen ? 'right-0 visible' : '-right-[320px] invisible'}`}>
        <div className="flex w-full items-center justify-between p-3.5 px-4 border-b border-slate-200 bg-white shrink-0 sticky top-0 z-[2]">
          <Link to="/" className="flex items-center font-outfit text-xl font-bold text-slate-900" onClick={() => setIsMenuOpen(false)}>
            <img src="/sherla-properties-text.png" alt="Logo" className="h-10 w-auto mr-2" />
            Sherla<span className="text-amber-500">Properties</span>
          </Link>
          <button className="bg-slate-50 border-none p-1.5 rounded-lg text-slate-600 cursor-pointer flex items-center justify-center transition-colors hover:bg-slate-100 hover:text-slate-900" onClick={() => setIsMenuOpen(false)} aria-label="Close menu">
            <CloseIco />
          </button>
        </div>

        {isPastHero && (
          <div className="p-3.5 px-4 border-b border-slate-200" ref={mobileSearchRef}>
            <SearchBar isNavbar={true} />
          </div>
        )}

        <div className="flex-1 flex flex-col py-1.5">
          {NAV_LINKS.map(link => (
            <Link key={link.label} to={link.path} className="flex items-center justify-between p-[13px] px-[18px] text-[0.9rem] font-medium text-slate-600 border-b border-slate-50 transition-colors hover:bg-amber-50 hover:text-amber-600" onClick={() => setIsMenuOpen(false)}>
              {link.label}
              <svg className="w-[15px] h-[15px] text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
            </Link>
          ))}
        </div>

        <div className="flex flex-col gap-2 p-4 border-t border-slate-200 bg-slate-50">
          {isAuthenticated ? (
            <div className="flex flex-col gap-2.5">
              <div className="flex items-center gap-3 py-1 pb-2">
                <div className="w-10 h-10 rounded-full bg-amber-500 text-slate-900 text-base font-bold flex items-center justify-center shrink-0">{userDetails.name.charAt(0).toUpperCase()}</div>
                <div>
                  <div className="text-[0.9rem] font-semibold text-slate-900">{userDetails.name}</div>
                  <div className="text-[0.75rem] text-slate-400 mt-[1px]">{userDetails.email || 'Member'}</div>
                </div>
              </div>
              <Link to="/profile" className="flex items-center justify-center gap-2 p-2.5 px-4 border-[1.5px] border-slate-200 rounded-lg text-[0.88rem] font-medium text-slate-600 bg-white font-sans transition-colors hover:border-amber-500 hover:text-amber-700 w-full" onClick={() => setIsMenuOpen(false)}>View Profile</Link>
              <button className="flex items-center justify-center gap-2 p-2.5 px-4 border-[1.5px] border-slate-200 rounded-lg text-[0.88rem] font-medium text-slate-600 bg-white font-sans transition-colors hover:border-amber-500 hover:text-amber-700 w-full" onClick={handleLogout}>Logout</button>
            </div>
          ) : (
            <Link to="/login" className="flex items-center justify-center gap-2 p-2.5 px-4 border-[1.5px] border-slate-200 rounded-lg text-[0.88rem] font-medium text-slate-600 bg-white font-sans transition-colors hover:border-amber-500 hover:text-amber-700 w-full" onClick={() => setIsMenuOpen(false)}>Login</Link>
          )}

          <Link to="/properties" className="flex items-center justify-center gap-2 p-2.5 px-4 bg-amber-500 text-slate-900 rounded-lg text-[0.88rem] font-semibold font-sans transition-colors hover:bg-amber-600 border-none w-full mt-2" onClick={() => setIsMenuOpen(false)}>
            <BuyIcon /> Buy Properties
          </Link>
          <Link to="/subscription" className="flex items-center justify-center gap-2 p-2.5 px-4 bg-amber-500 text-slate-900 rounded-lg text-[0.88rem] font-semibold font-sans transition-colors hover:bg-amber-600 border-none w-full" onClick={() => setIsMenuOpen(false)}>
            Post Property
            <span className="bg-slate-900 text-amber-500 text-[0.6rem] font-bold py-0.5 px-[5px] rounded-[3px]">FREE</span>
          </Link>
        </div>
      </div>
      {isMenuOpen && <div className="fixed inset-0 bg-slate-900/40 z-[1499]" onClick={() => setIsMenuOpen(false)} />}
    </>
  );
}
