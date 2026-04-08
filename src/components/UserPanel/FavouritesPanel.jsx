import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toggleWishlist } from '../../store/slices/propertiesSlice';
import { propertiesData } from '../../data/propertiesData';

const IconPin = () => <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>;

export default function FavouritesPanel() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { wishlist } = useSelector(state => state.properties);
  const favProps = propertiesData.filter(p => wishlist.includes(p.id));

  if (favProps.length === 0) return (
    <div className="up-card">
      <div className="up-card-title">My Favourites</div>
      <div className="up-empty">
        <div className="up-empty-icon">💔</div>
        <h3>No saved properties yet</h3>
        <p>Tap the heart icon on any property to save it here.</p>
      </div>
    </div>
  );

  return (
    <div className="up-card">
      <div className="up-section-header">
        <div>
          <div className="up-card-title">My Favourites</div>
          <div className="up-card-sub">{favProps.length} saved propert{favProps.length === 1 ? 'y' : 'ies'}</div>
        </div>
        <span className="up-tag amber">{favProps.length} Saved</span>
      </div>
      <div className="up-fav-grid">
        {favProps.map(p => (
          <div className="up-fav-card" key={p.id} onClick={() => navigate(`/property/${p.id}`)}>
            <div className="up-fav-img">
              <img src={p.img} alt={p.title} crossOrigin="anonymous" />
              <button className="up-fav-remove" title="Remove" onClick={e => { e.stopPropagation(); dispatch(toggleWishlist(p.id)); }}>❤️</button>
            </div>
            <div className="up-fav-info">
              <div className="up-fav-badge">{p.propertyType}</div>
              <div className="up-fav-price">{p.price}</div>
              <div className="up-fav-title">{p.title}</div>
              <div className="up-fav-loc"><IconPin /> {p.loc}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
