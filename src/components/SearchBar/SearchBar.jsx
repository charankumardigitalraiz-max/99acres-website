import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './SearchBar.css';
import {
  setActiveTab,
  setLocation,
  setQuery,
  clearSuggestions,
  setLocStatus,
  setPropertyType,
  setBudget,
} from '../../store/slices/searchSlice';
import { SEARCH_TABS } from '../../data/constants';
import { SearchIco, PinIco, LocIco, LoaderIco, IconFlats } from '../../data/icons';

export default function SearchBar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  const { activeTab, location, query, suggestions } = useSelector(s => s.search);

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        dispatch(clearSuggestions());
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [dispatch]);

  const handleSearch = () => {
    navigate('/properties');
  };

  const handleSelectSuggestion = (suggestion) => {
    dispatch(setLocation(suggestion.text));
    dispatch(clearSuggestions());
  };

  return (
    <div className="container" style={{ position: 'relative', zIndex: 10 }}>
      <div className="search-bar-section">
        {/* Tabs */}
        <div className="search-tabs">
          {SEARCH_TABS.map((tab, i) => (
            <button
              key={tab}
              className={`search-tab ${i === activeTab ? 'active' : ''}`}
              onClick={() => dispatch(setActiveTab(i))}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Search Row */}
        <div className="search-row">
          {/* Main Search Field */}
          <div className="search-field" style={{ flex: 2 }} ref={dropdownRef}>
            <SearchIco />
            <input
              type="text"
              value={query || location}
              onChange={e => dispatch(setQuery(e.target.value))}
              placeholder="Search by city, locality, project or property name..."
              autoComplete="off"
            />

            {/* Suggestions Dropdown */}
            {suggestions.length > 0 && (
              <div className="search-dropdown">
                <div className="dropdown-header">Quick Matches</div>
                {suggestions.map((s, idx) => (
                  <div
                    key={idx}
                    className="search-suggestion-item"
                    onClick={() => handleSelectSuggestion(s)}
                  >
                    <div className="suggestion-icon">
                      {s.type === 'city' && <PinIco />}
                      {s.type === 'locality' && <LocIco />}
                      {s.type === 'project' && <IconFlats />}
                      {s.type === 'property' && <SearchIco />}
                      {s.type === 'type' && <IconFlats />}
                    </div>
                    <div className="suggestion-text">
                      <span className="main-text">{s.text}</span>
                      <span className="type-tag">{s.type === 'property' ? 'Property Name' : s.type === 'type' ? 'Property Type' : s.type}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="search-divider-v" />

          {/* Property Type Dropdown */}
          <div className="search-field">
            <select onChange={e => dispatch(setPropertyType(e.target.value))}>
              <option value="">Any Type</option>
              <option>Apartment</option>
              <option>Villa</option>
              <option>Plot</option>
              <option>Commercial</option>
              <option>Studio</option>
            </select>
          </div>

          <div className="search-divider-v" />

          {/* Budget Dropdown */}
          <div className="search-field">
            <select onChange={e => dispatch(setBudget(e.target.value))}>
              <option value="">Any Budget</option>
              <option>Under 50 Lac</option>
              <option>50L – 1 Cr</option>
              <option>1 – 2 Cr</option>
              <option>2 – 5 Cr</option>
              <option>5 Cr+</option>
            </select>
          </div>

          <button className="search-submit" onClick={handleSearch}>
            <SearchIco />
            Search
          </button>
        </div>
      </div>
    </div>
  );
}
