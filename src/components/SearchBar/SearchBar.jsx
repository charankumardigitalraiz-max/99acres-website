import { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './SearchBar.css';
import {
  setActiveTab, setLocation, setQuery, clearSuggestions,
  setPropertyType, setMinBudget, setMaxBudget, toggleBhk,
  setFurnishing, setPostedBy, setPossessionStatus,
  toggleAdvancedFilters, setShowAdvancedFilters, resetAllFilters,
} from '../../store/slices/searchSlice';
import { SearchIco, PinIco, LocIco, IconFlats, CloseIco, GpsIco } from '../../data/icons';

// ── Configuration ─────────────────────────────────────
const SEARCH_TABS = ['Buy', 'Commercial'];

const PROPERTY_TYPES = {
  Buy: ['All Residential', 'Apartment', 'Villa / House', 'Independent Floor', 'Plot / Land'],
  Rent: ['All Residential', 'Apartment', 'Villa / House', 'Independent Floor', 'PG / Co-living'],
  Commercial: ['Office Space', 'Retail Shop', 'Co-Working', 'Warehouse', 'Industrial'],
};

const BUY_BUDGETS = {
  min: ['No Min', '10L', '20L', '30L', '50L', '75L', '1Cr', '1.5Cr', '2Cr', '3Cr', '5Cr'],
  max: ['No Max', '20L', '30L', '50L', '75L', '1Cr', '1.5Cr', '2Cr', '3Cr', '5Cr', '10Cr+'],
};

const RENT_BUDGETS = {
  min: ['No Min', '5K', '8K', '10K', '15K', '20K', '25K', '30K', '40K', '50K'],
  max: ['No Max', '10K', '15K', '20K', '25K', '30K', '40K', '50K', '75K', '1L+'],
};

const BHK_OPTIONS = ['1 RK', '1', '2', '3', '4', '4+'];
const FURNISHING_OPTIONS = ['Furnished', 'Semi-Furnished', 'Unfurnished'];
const POSTED_BY_OPTIONS = ['Owner', 'Builder / Developer', 'Agent'];
const POSSESSION_OPTIONS = ['Ready to Move', 'Under Construction', 'New Launch'];

function SuggestionIcon({ type }) {
  if (type === 'city') return <PinIco />;
  if (type === 'locality') return <LocIco />;
  if (type === 'property') return <SearchIco />;
  return <IconFlats />;
}

export default function SearchBar({ isNavbar = false }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const locationRef = useRef(null);
  const rootRef = useRef(null);
  const [isLocationFocused, setIsLocationFocused] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isGpsLoading, setIsGpsLoading] = useState(false);

  const {
    activeTab, location, query, suggestions, recentSearches,
    propertyType, minBudget, maxBudget, bhk,
    furnishing, postedBy, possessionStatus, showAdvancedFilters,
  } = useSelector(s => s.search);

  const budgets = activeTab === 'Rent' ? RENT_BUDGETS : BUY_BUDGETS;
  const types = PROPERTY_TYPES[activeTab] || PROPERTY_TYPES.Buy;
  const showBhk = activeTab !== 'Commercial' &&
    !propertyType.includes('Plot') &&
    !propertyType.includes('Warehouse');

  const activeFilterCount = bhk.length +
    (minBudget ? 1 : 0) + (maxBudget ? 1 : 0) +
    (furnishing ? 1 : 0) + (postedBy ? 1 : 0) +
    (possessionStatus ? 1 : 0);

  // Lock body scroll when mobile search is open
  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isMobileOpen]);

  // Close suggestions on outside click
  useEffect(() => {
    const handleOut = (e) => {
      if (rootRef.current && !rootRef.current.contains(e.target)) {
        setIsLocationFocused(false);
        dispatch(clearSuggestions());
        if (showAdvancedFilters) {
          dispatch(setShowAdvancedFilters(false));
        }
      }
    };
    document.addEventListener('mousedown', handleOut);
    document.addEventListener('touchstart', handleOut);
    return () => {
      document.removeEventListener('mousedown', handleOut);
      document.removeEventListener('touchstart', handleOut);
    };
  }, [dispatch, showAdvancedFilters]);

  const handleSearch = (e) => {
    e?.preventDefault();
    setIsMobileOpen(false);
    document.body.style.overflow = '';
    navigate('/properties');
  };

  const handleSelect = (s) => {
    dispatch(setLocation(s.text));
    setIsLocationFocused(false);
    dispatch(clearSuggestions());
  };

  const handleRecentSelect = (text) => {
    dispatch(setLocation(text));
    setIsLocationFocused(false);
  };

  const handleDetectLocation = (e) => {
    e?.stopPropagation();
    if (!navigator.geolocation) return;

    setIsGpsLoading(true);
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const { latitude, longitude } = pos.coords;
          const res = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`);
          const data = await res.json();
          const cityName = data.city || data.locality || data.principalSubdivision;

          if (cityName) {
            dispatch(setLocation(cityName));
            dispatch(setQuery('')); // clear search to show new location
          }
        } catch (err) {
          console.error("GPS Error:", err);
        } finally {
          setIsGpsLoading(false);
        }
      },
      () => setIsGpsLoading(false),
      { timeout: 10000 }
    );
  };

  const showDropdown = isLocationFocused;

  const displayValue = query || location;

  // ── Mobile Full-Screen Modal (via Portal) ──────────
  const mobileModal = isMobileOpen && ReactDOM.createPortal(
    <div className="sb-mobile-fullscreen">
      {/* Header */}
      <div className="sb-mobile-header">
        <button
          className="sb-mobile-back"
          onClick={() => setIsMobileOpen(false)}
          aria-label="Back"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
        <span>Search Properties</span>
      </div>

      {/* Tab switcher */}
      <div className="sb-mobile-tabs">
        {SEARCH_TABS.map(tab => (
          <button
            key={tab}
            className={`sb-mobile-tab ${activeTab === tab ? 'active' : ''}`}
            onClick={() => dispatch(setActiveTab(tab))}
          >{tab}</button>
        ))}
      </div>

      {/* Scrollable body */}
      <div className="sb-mobile-body">

        {/* Location field */}
        <div className="sb-mobile-field" ref={locationRef}>
          <label>Location</label>
          <div className="sb-mobile-input-wrap">
            <input
              type="text"
              autoFocus
              placeholder="City, locality, project…"
              value={displayValue}
              onChange={e => dispatch(setQuery(e.target.value))}
              onFocus={() => setIsLocationFocused(true)}
            />
            {displayValue && (
              <button
                className="sb-clear"
                onClick={() => { dispatch(clearSuggestions()); dispatch(setLocation('')); }}
              >
                <CloseIco />
              </button>
            )}
            <button
              type="button"
              className={`sb-gps-btn mobile ${isGpsLoading ? 'loading' : ''}`}
              onClick={handleDetectLocation}
              aria-label="Detect my location"
            >
              {isGpsLoading ? (
                <div className="sb-gps-loader">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" /></svg>
                </div>
              ) : <GpsIco />}
            </button>
          </div>
          {showDropdown && (
            <SuggestionDropdown
              suggestions={suggestions}
              recentSearches={recentSearches}
              query={query}
              onSelect={handleSelect}
              onRecent={handleRecentSelect}
              activeTab={activeTab}
              propertyType={propertyType}
              bhk={bhk}
              minBudget={minBudget}
              maxBudget={maxBudget}
              budgets={budgets}
              types={types}
              dispatch={dispatch}
              inline
            />
          )}
        </div>

        {/* Property Type */}
        <div className="sb-mobile-field">
          <label>Property Type</label>
          <div className="sb-select-wrap">
            <select value={propertyType} onChange={e => dispatch(setPropertyType(e.target.value))}>
              {types.map(t => <option key={t}>{t}</option>)}
            </select>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9" /></svg>
          </div>
        </div>

        {/* BHK */}
        {/* {showBhk && (
          <div className="sb-mobile-field">
            <label>BHK Type</label>
            <div className="sb-bhk-row">
              {BHK_OPTIONS.map(b => (
                <button
                  key={b}
                  className={`sb-bhk-pill ${bhk.includes(b) ? 'active' : ''}`}
                  onClick={() => dispatch(toggleBhk(b))}
                >{b === '1 RK' ? '1 RK' : `${b} BHK`}</button>
              ))}
            </div>
          </div>
        )} */}

        {/* Budget */}
        <div className="sb-mobile-field">
          <label>Budget</label>
          <div className="sb-budget-row">
            <div className="sb-select-wrap">
              <select value={minBudget} onChange={e => dispatch(setMinBudget(e.target.value))}>
                {budgets.min.map(b => <option key={b}>{b}</option>)}
              </select>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9" /></svg>
            </div>
            <span className="sb-to">to</span>
            <div className="sb-select-wrap">
              <select value={maxBudget} onChange={e => dispatch(setMaxBudget(e.target.value))}>
                {budgets.max.map(b => <option key={b}>{b}</option>)}
              </select>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9" /></svg>
            </div>
          </div>
        </div>

        {/* Furnishing */}
        <div className="sb-mobile-field">
          <label>Furnishing</label>
          <div className="sb-pill-row">
            {FURNISHING_OPTIONS.map(f => (
              <button
                key={f}
                className={`sb-pill ${furnishing === f ? 'active' : ''}`}
                onClick={() => dispatch(setFurnishing(furnishing === f ? '' : f))}
              >{f}</button>
            ))}
          </div>
        </div>

        {/* Posted By */}
        <div className="sb-mobile-field">
          <label>Posted By</label>
          <div className="sb-pill-row">
            {POSTED_BY_OPTIONS.map(f => (
              <button
                key={f}
                className={`sb-pill ${postedBy === f ? 'active' : ''}`}
                onClick={() => dispatch(setPostedBy(postedBy === f ? '' : f))}
              >{f}</button>
            ))}
          </div>
        </div>

        {/* Possession */}
        <div className="sb-mobile-field">
          <label>Possession Status</label>
          <div className="sb-pill-row">
            {POSSESSION_OPTIONS.map(f => (
              <button
                key={f}
                className={`sb-pill ${possessionStatus === f ? 'active' : ''}`}
                onClick={() => dispatch(setPossessionStatus(possessionStatus === f ? '' : f))}
              >{f}</button>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="sb-mobile-footer">
        <button className="sb-reset" onClick={() => dispatch(resetAllFilters())}>
          Reset
        </button>
        <button className="sb-search-btn" onClick={handleSearch}>
          <SearchIco />
          <span>Search Properties</span>
        </button>
      </div>
    </div>,
    document.body
  );

  // ── Desktop / Hero View ────────────────────────────
  return (
    <>
      {mobileModal}

      <div className={`sb-root ${isNavbar ? 'sb-root--navbar' : ''}`} ref={rootRef}>
        {/* Tabs (Hidden in Navbar mode) */}
        {!isNavbar && (
          <div className="sb-tabs">
            {SEARCH_TABS.map(tab => (
              <button
                key={tab}
                className={`sb-tab ${activeTab === tab ? 'active' : ''}`}
                onClick={() => dispatch(setActiveTab(tab))}
              >{tab}</button>
            ))}
          </div>
        )}

        {/* Card */}
        <div className="sb-card">

          {/* ── Navbar compact trigger OR Mobile Trigger ── */}
          <button
            className={`sb-mobile-trigger ${isNavbar ? 'sb-navbar-trigger' : ''}`}
            onClick={() => setIsMobileOpen(true)}
            aria-label="Open search"
          >
            <div className="sb-trigger-icon"><SearchIco /></div>
            <div className="sb-trigger-text">
              <span className="sb-trigger-main">
                {displayValue || 'Search city, locality, project…'}
              </span>
              {!isNavbar && (
                <span className="sb-trigger-sub">
                  {activeTab} · {propertyType} {bhk.length > 0 ? `· ${bhk.length} BHK` : ''}
                </span>
              )}
            </div>
          </button>

          {/* ── Desktop Form (Hidden on mobile OR if isNavbar) ── */}
          {!isNavbar && (
            <form className="sb-desktop-row" onSubmit={handleSearch}>

              {/* Property Type */}
              <div className="sb-field sb-type-field">
                <select
                  value={propertyType}
                  onChange={e => dispatch(setPropertyType(e.target.value))}
                  aria-label="Property type"
                >
                  {types.map(t => <option key={t}>{t}</option>)}
                </select>
              </div>

              <div className="sb-sep" />

              {/* Location */}
              <div className="sb-field sb-location-field" ref={locationRef}>

                <input
                  type="text"
                  placeholder={`Search city, locality or project`}
                  value={displayValue}
                  onChange={e => dispatch(setQuery(e.target.value))}
                  onFocus={() => setIsLocationFocused(true)}
                  autoComplete="off"
                />
                {displayValue && (
                  <button type="button" className="sb-clear" onClick={() => {
                    dispatch(clearSuggestions());
                    dispatch(setLocation(''));
                  }}>
                    <CloseIco />
                  </button>
                )}

                <button
                  type="button"
                  className={`sb-gps-btn ${isGpsLoading ? 'loading' : ''}`}
                  onClick={handleDetectLocation}
                  title="Detect my location"
                >
                  {isGpsLoading ? (
                    <div className="sb-gps-loader">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" /></svg>
                    </div>
                  ) : <GpsIco />}
                </button>
              </div>

              <div className="sb-sep" />

              {/* BHK */}
              {/* {showBhk && (
                <>
                  <div className="sb-field sb-bhk-field">
                    <div className="sb-bhk-trigger">
                      <span className="sb-field-label">BHK</span>
                      <span className="sb-bhk-value">
                        {bhk.length === 0 ? 'Any' : bhk.map(b => b === '1 RK' ? '1RK' : `${b}BHK`).join(', ')}
                      </span>
                      <div className="sb-bhk-popup">
                        {BHK_OPTIONS.map(b => (
                          <button
                            key={b} type="button"
                            className={`sb-bhk-opt ${bhk.includes(b) ? 'active' : ''}`}
                            onClick={() => dispatch(toggleBhk(b))}
                          >{b === '1 RK' ? '1 RK' : `${b} BHK`}</button>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="sb-sep" />
                </>
              )} */}

              {/* Budget */}
              {/* <div className="sb-field sb-budget-field">
                <span className="sb-field-label">Budget</span>
                <div className="sb-budget-selects">
                  <select
                    value={minBudget}
                    onChange={e => dispatch(setMinBudget(e.target.value))}
                    aria-label="Min budget"
                  >
                    {budgets.min.map(b => <option key={b}>{b}</option>)}
                  </select>
                  <span>–</span>
                  <select
                    value={maxBudget}
                    onChange={e => dispatch(setMaxBudget(e.target.value))}
                    aria-label="Max budget"
                  >
                    {budgets.max.map(b => <option key={b}>{b}</option>)}
                  </select>
                </div>
              </div> */}

              {/* Actions */}
              <div className="sb-actions">
                {/* <button
                  type="button"
                  className={`sb-filter-btn ${activeFilterCount > 0 ? 'has-filters' : ''}`}
                  onClick={() => dispatch(toggleAdvancedFilters())}
                  title="More filters"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="4" y1="6" x2="20" y2="6" />
                    <line x1="8" y1="12" x2="16" y2="12" />
                    <line x1="10" y1="18" x2="14" y2="18" />
                  </svg>
                  {activeFilterCount > 0 && <span className="sb-filter-badge">{activeFilterCount}</span>}
                </button> */}

                <button type="submit" className="sb-search-btn">
                  <SearchIco />
                  <span>Search</span>
                </button>
              </div>
            </form>
          )}

          {/* ── Desktop Mega Dropdown (full card width) ── */}
          {showDropdown && !isNavbar && (
            <SuggestionDropdown
              suggestions={suggestions}
              recentSearches={recentSearches}
              query={query}
              onSelect={handleSelect}
              onRecent={handleRecentSelect}
              activeTab={activeTab}
              propertyType={propertyType}
              bhk={bhk}
              minBudget={minBudget}
              maxBudget={maxBudget}
              budgets={budgets}
              types={types}
              dispatch={dispatch}
            />
          )}
        </div>

        {/* Advanced Filters Panel */}
        {showAdvancedFilters && !isNavbar && (
          <div className="sb-advanced">
            <div className="sb-advanced-inner">
              <div className="sb-adv-group">
                <span className="sb-adv-label">Furnishing</span>
                <div className="sb-adv-pills">
                  {FURNISHING_OPTIONS.map(f => (
                    <button key={f} type="button"
                      className={`sb-adv-pill ${furnishing === f ? 'active' : ''}`}
                      onClick={() => dispatch(setFurnishing(furnishing === f ? '' : f))}
                    >{f}</button>
                  ))}
                </div>
              </div>
              <div className="sb-adv-group">
                <span className="sb-adv-label">Posted By</span>
                <div className="sb-adv-pills">
                  {POSTED_BY_OPTIONS.map(f => (
                    <button key={f} type="button"
                      className={`sb-adv-pill ${postedBy === f ? 'active' : ''}`}
                      onClick={() => dispatch(setPostedBy(postedBy === f ? '' : f))}
                    >{f}</button>
                  ))}
                </div>
              </div>
              <div className="sb-adv-group">
                <span className="sb-adv-label">Possession</span>
                <div className="sb-adv-pills">
                  {POSSESSION_OPTIONS.map(f => (
                    <button key={f} type="button"
                      className={`sb-adv-pill ${possessionStatus === f ? 'active' : ''}`}
                      onClick={() => dispatch(setPossessionStatus(possessionStatus === f ? '' : f))}
                    >{f}</button>
                  ))}
                </div>
              </div>
              <div className="sb-adv-footer">
                <button className="sb-reset-link" onClick={() => dispatch(resetAllFilters())}>
                  Reset All
                </button>
                <button className="sb-search-btn small" onClick={handleSearch}>
                  <SearchIco /> Search
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

// ── Suggestion Dropdown ───────────────────────────────
function SuggestionDropdown({
  suggestions, recentSearches, query, onSelect, onRecent, inline,
  activeTab, propertyType, bhk, minBudget, maxBudget, budgets, types, dispatch
}) {
  const isInitial = !query;

  return (
    <div className={`sb-dropdown ${inline ? 'sb-dropdown--inline' : ''} ${isInitial ? 'sb-dropdown--mega' : ''}`}>
      {isInitial ? (
        <div className="sb-mega-content">
          {/* Recent Searches Header */}
          {recentSearches.length > 0 && (
            <div className="sb-mega-section recent-mini">
              <div className="sb-dropdown-heading">Recent Searches</div>
              <div className="sb-recent-pills">
                {recentSearches.map((r, i) => (
                  <button key={i} className="sb-recent-pill" onClick={() => onRecent(r)}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="12" height="12">
                      <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
                    </svg>
                    {r}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="sb-mega-grid">
            {/* Column 1: Categories/Tabs */}
            <div className="sb-mega-col">
              <div className="sb-dropdown-heading">Category</div>
              <div className="sb-mega-tabs">
                {SEARCH_TABS.map(tab => (
                  <button
                    key={tab}
                    className={`sb-mega-tab-btn ${activeTab === tab ? 'active' : ''}`}
                    onClick={(e) => { e.stopPropagation(); dispatch(setActiveTab(tab)); }}
                  >{tab}</button>
                ))}
              </div>
            </div>

            {/* Column 2: Property Types */}
            <div className="sb-mega-col">
              <div className="sb-dropdown-heading">Property Type</div>
              <div className="sb-mega-list">
                {types.slice(0, 6).map(t => (
                  <button
                    key={t}
                    className={`sb-mega-list-item ${propertyType === t ? 'active' : ''}`}
                    onClick={(e) => { e.stopPropagation(); dispatch(setPropertyType(t)); }}
                  >
                    {t}
                    {propertyType === t && <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" width="12" height="12"><polyline points="20 6 9 17 4 12" /></svg>}
                  </button>
                ))}
              </div>
            </div>

            {/* Column 3: BHK & Budget */}
            <div className="sb-mega-col">
              {(activeTab === 'Buy' || activeTab === 'Rent') && (
                <div className="sb-mega-sub-section">
                  <div className="sb-dropdown-heading">BHK Type</div>
                  <div className="sb-mega-bhk-row">
                    {BHK_OPTIONS.map(b => (
                      <button
                        key={b}
                        className={`sb-mega-bhk-pill ${bhk.includes(b) ? 'active' : ''}`}
                        onClick={(e) => { e.stopPropagation(); dispatch(toggleBhk(b)); }}
                      >{b === '1 RK' ? '1RK' : `${b} BHK`}</button>
                    ))}
                  </div>
                </div>
              )}

              <div className="sb-mega-sub-section">
                <div className="sb-dropdown-heading">Budget</div>
                <div className="sb-mega-budget-grid">
                  <div className="sb-mega-select-wrap">
                    <span>Min</span>
                    <select
                      value={minBudget || budgets.min[0]}
                      onChange={e => { e.stopPropagation(); dispatch(setMinBudget(e.target.value)); }}
                      onClick={e => e.stopPropagation()}
                    >
                      {budgets.min.map(b => <option key={b} value={b}>{b}</option>)}
                    </select>
                  </div>
                  <div className="sb-mega-select-wrap">
                    <span>Max</span>
                    <select
                      value={maxBudget || budgets.max[0]}
                      onChange={e => { e.stopPropagation(); dispatch(setMaxBudget(e.target.value)); }}
                      onClick={e => e.stopPropagation()}
                    >
                      {budgets.max.map(b => <option key={b} value={b}>{b}</option>)}
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>
          {suggestions.length > 0 ? (
            <>
              <div className="sb-dropdown-heading">
                <SearchIco /> Suggestions
              </div>
              {suggestions.map((s, i) => (
                <div key={i} className="sb-suggestion-item" onClick={() => onSelect(s)}>
                  <div className="sb-sugg-icon">
                    <SuggestionIcon type={s.type} />
                  </div>
                  <div className="sb-sugg-text">
                    <span className="sb-sugg-main">{s.text}</span>
                    <span className="sb-sugg-type">
                      {s.type === 'property' ? 'Property' : s.type.charAt(0).toUpperCase() + s.type.slice(1)}
                    </span>
                  </div>
                </div>
              ))}
            </>
          ) : (
            <div className="sb-dropdown-empty">
              <span>No results found for "{query}"</span>
            </div>
          )}
        </>
      )}
    </div>
  );
}
