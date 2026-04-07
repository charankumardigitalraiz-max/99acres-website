import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './SearchBar.css';
import {
  setActiveTab,
  setLocation,
  setLocStatus,
  setPropertyType,
  setBudget,
} from '../../store/slices/searchSlice';
import { SEARCH_TABS } from '../../data/constants';
import { SearchIco, PinIco, LocIco, LoaderIco } from '../../data/icons';

export default function SearchBar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { activeTab, location, locStatus } = useSelector(s => s.search);

  const detectLocation = () => {
    if (!navigator.geolocation) {
      dispatch(setLocStatus('error'));
      return;
    }
    dispatch(setLocStatus('loading'));
    dispatch(setLocation('Detecting location…'));

    navigator.geolocation.getCurrentPosition(
      async ({ coords }) => {
        try {
          const res = await fetch(
            `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${coords.latitude}&longitude=${coords.longitude}&localityLanguage=en`
          );
          // const res = await fetch(
          //   `https://api-bdc.net/data/reverse-geocode?latitude=${coords.latitude}&longitude=${coords.longitude}&localityLanguage=en`
          // );
          const data = await res.json();

          // Robustly build the location string
          // const parts = [];
          // if (data.locality) parts.push(data.locality);
          // if (data.city && data.city !== data.locality) parts.push(data.city);
          // if (data.principalSubdivision) parts.push(data.principalSubdivision);
          // if (data.postcode) parts.push(data.postcode);
          const city = data.city;
          console.log(city);

          // const total = parts.length > 0 ? parts.join(', ') : 'Location Detected';
          // console.log(total);
          dispatch(setLocation(city));
          dispatch(setLocStatus('done'));
        } catch (error) {
          console.error('Location detection error:', error);
          dispatch(setLocation('Location found'));
          dispatch(setLocStatus('done'));
        }
      },
      (error) => {
        console.error('Geolocation error:', error);
        dispatch(setLocStatus('error'));
        dispatch(setLocation(''));
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
      }
    );
  };

  const handleSearch = () => {
    // Navigate to properties page logic
    navigate('/properties');
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
          {/* Location Field */}
          <div className="search-field" style={{ flex: 2 }}>
            <PinIco />
            <input
              type="text"
              value={location}
              onChange={e => dispatch(setLocation(e.target.value))}
              placeholder="City, locality or landmark…"
            />
            <button
              className={`loc-btn ${locStatus}`}
              onClick={detectLocation}
              disabled={locStatus === 'loading'}
              title="Detect my location"
            >
              {locStatus === 'loading' ? (
                <span className="loc-spin"><LoaderIco /></span>
              ) : (
                <span className="loc-pin-btn">
                  <LocIco />
                  {locStatus === 'done' ? 'Located' : 'Detect'}
                </span>
              )}
            </button>
          </div>

          <div className="search-divider-v" />

          {/* Property Type */}
          <div className="search-field">
            <select onChange={e => dispatch(setPropertyType(e.target.value))}>
              <option value="">Property Type</option>
              <option>Apartment</option>
              <option>Villa</option>
              <option>Plot</option>
              <option>Commercial</option>
              <option>Studio</option>
            </select>
          </div>

          <div className="search-divider-v" />

          {/* Budget */}
          <div className="search-field">
            <select onChange={e => dispatch(setBudget(e.target.value))}>
              <option value="">Budget</option>
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

        {locStatus === 'error' && (
          <p className="loc-error">
            ⚠️ Could not detect location. Please allow location permission and try again.
          </p>
        )}
      </div>
    </div>
  );
}
