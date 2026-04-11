import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toggleWishlist } from '../../store/slices/propertiesSlice';
import { shareProperty } from '../../utils/share';
import { PinIco, AreaIco } from '../../data/icons';

export default function LandCard({ land }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const wishlist = useSelector(state => state.properties.wishlist);
  const isWished = wishlist.includes(land.id);
  const [copied, setCopied] = useState(false);

  const handleWish = (e) => {
    e.stopPropagation();
    dispatch(toggleWishlist(land.id));
  };

  const handleShare = (e) => {
    e.stopPropagation();
    shareProperty(land, setCopied);
  };

  return (
    <div className="lc-card" onClick={() => navigate(`/property/${land.id}`)}>
      {/* ── IMAGE ── */}
      <div className="lc-img-wrap">
        <img src={land.img} alt={land.title} loading="lazy" />

        {/* Overlay gradient */}
        <div className="lc-img-overlay" />

        {/* Badge */}
        {land.badge && (
          <span className={`lc-badge ${land.badgeClass || 'new'}`}>{land.badge}</span>
        )}

        {/* Type pill */}
        {land.type && (
          <span className="lc-type-pill">{land.type}</span>
        )}

        {/* Action buttons */}
        <div className="lc-actions">
          <button className={`lc-wish-btn ${isWished ? 'wished' : ''}`} onClick={handleWish} title={isWished ? 'Remove' : 'Save'}>
            {isWished ? (
              <svg viewBox="0 0 24 24" width="14" height="14" fill="#ef4444" stroke="#ef4444" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" /></svg>
            ) : (
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" /></svg>
            )}
          </button>
          <button className="lc-share-btn" onClick={handleShare} title="Share">
            {copied ? (
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="#10b981" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
            ) : (
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" /><line x1="8.59" y1="13.51" x2="15.42" y2="17.49" /><line x1="15.41" y1="6.51" x2="8.59" y2="10.49" /></svg>
            )}
          </button>
        </div>

        {/* Price overlay on image */}
        <div className="lc-price-overlay">
          <span className="lc-price">{land.price}</span>
          {land.pricePerSqft && <span className="lc-ppsf">₹{land.pricePerSqft}/sq.ft</span>}
        </div>
      </div>

      {/* ── BODY ── */}
      <div className="lc-body">
        <h3 className="lc-title">{land.title}</h3>
        <div className="lc-loc"><PinIco /> {land.loc}</div>

        {/* Stats row */}
        <div className="lc-stats">
          <div className="lc-stat">
            <span className="lc-stat-label">Area</span>
            <span className="lc-stat-val">{land.size}</span>
          </div>
          <div className="lc-stat-divider" />
          <div className="lc-stat">
            <span className="lc-stat-label">Facing</span>
            <span className="lc-stat-val">{land.facing || land.direction || '—'}</span>
          </div>
          {land.propertyType && (
            <>
              <div className="lc-stat-divider" />
              <div className="lc-stat">
                <span className="lc-stat-label">Type</span>
                <span className="lc-stat-val">{land.propertyType}</span>
              </div>
            </>
          )}
        </div>

        <button className="lc-cta" onClick={(e) => { e.stopPropagation(); navigate(`/property/${land.id}`); }}>
          View Details
          <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9 18 15 12 9 6" /></svg>
        </button>
      </div>
    </div>
  );
}
