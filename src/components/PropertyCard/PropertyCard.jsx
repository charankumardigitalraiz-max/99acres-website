import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toggleWishlist } from '../../store/slices/propertiesSlice';
import { PinIco, BedIco, BathIco, AreaIco } from '../../data/icons';
import { shareProperty } from '../../utils/share';
import './PropertyCard.css';
import '../LandProperties/LandProperties.css';


const HeartIco = ({ isWished, size = 14 }) => (
  <svg
    viewBox="0 0 24 24"
    width={size}
    height={size}
    fill={isWished ? "#ef4444" : "none"}
    stroke={isWished ? "#ef4444" : "currentColor"}
    strokeWidth="2.5"
    style={{ transition: 'all 0.3s ease' }}
  >
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);
export default function PropertyCard({ property, variant = "vertical" }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const wishlist = useSelector(state => state.properties.wishlist);
  const isWished = wishlist.includes(property.id);
  const [copied, setCopied] = useState(false);

  const handleShare = (e) => {
    e.stopPropagation();
    shareProperty(property, setCopied);
  };

  const handleWish = (e) => {
    e.stopPropagation();
    dispatch(toggleWishlist(property.id));
  };

  const handleClick = () => {
    navigate(`/property/${property.id}`);
  };

  // ─── DYNAMIC STATS LOGIC ───
  const getStats = () => {
    const type = (property.propertyType || '').toLowerCase();

    // Plot / Land
    if (type.includes('plot') || type.includes('land')) {
      return [
        { val: property.size, icon: <AreaIco />, label: '' },
        { val: property.direction || property.facing || 'East', icon: <PinIco />, label: 'Facing' },
        { val: property.propertyType?.replace('s', '') || 'Plot', icon: null, label: '' }
      ];
    }

    // Commercial
    if (type.includes('commercial') || type.includes('office') || type.includes('retail')) {
      return [
        { val: property.size, icon: <AreaIco />, label: '' },
        { val: property.propertyType || 'Commercial', icon: null, label: '' },
        { val: property.availabilityStatus || 'Ready', icon: null, label: '' }
      ];
    }

    // Default Residential
    return [
      { val: `${property.beds || 0} BHK`, icon: <BedIco />, label: '' },
      { val: `${property.baths || 0} Bath`, icon: <BathIco />, label: '' },
      { val: property.size, icon: <AreaIco />, label: '' }
    ];
  };

  const stats = getStats();

  if (variant === "land") {
    return (
      <div className="lc-card" onClick={handleClick}>
        <div className="lc-img-wrap">
          <img src={property.img} alt={property.title} loading="lazy" />
          <div className="lc-img-overlay" />

          {property.badge && (
            <span className={`lc-badge ${property.badgeClass || 'new'}`}>{property.badge}</span>
          )}
          {property.type && (
            <span className="lc-type-pill">{property.type}</span>
          )}

          <div className="lc-actions">
            <button className={`lc-wish-btn ${isWished ? 'wished' : ''}`} onClick={handleWish} title={isWished ? 'Remove' : 'Save'}>
              <HeartIco isWished={isWished} size={14} />
            </button>
            <button className="lc-share-btn" onClick={handleShare} title="Share">
              {copied ? (
                <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="#10b981" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
              ) : (
                <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" /><line x1="8.59" y1="13.51" x2="15.42" y2="17.49" /><line x1="15.41" y1="6.51" x2="8.59" y2="10.49" /></svg>
              )}
            </button>
          </div>

          <div className="lc-price-overlay">
            <span className="lc-price">{property.price}</span>
            {property.pricing?.pricePerSqft && (
              <span className="lc-ppsf">₹{property.pricing.pricePerSqft.toLocaleString()}/sq.ft</span>
            )}
          </div>
        </div>

        <div className="lc-body">
          <h3 className="lc-title">{property.title}</h3>
          <div className="lc-loc"><PinIco /> {property.loc}</div>

          <div className="lc-stats">
            <div className="lc-stat">
              <span className="lc-stat-label">Area</span>
              <span className="lc-stat-val">{property.size}</span>
            </div>
            <div className="lc-stat-divider" />
            <div className="lc-stat">
              <span className="lc-stat-label">Facing</span>
              <span className="lc-stat-val">{property.facing || property.direction || '—'}</span>
            </div>
            {property.propertyType && (
              <>
                <div className="lc-stat-divider" />
                <div className="lc-stat">
                  <span className="lc-stat-label">Type</span>
                  <span className="lc-stat-val">{property.propertyType}</span>
                </div>
              </>
            )}
          </div>

          <button className="lc-cta" onClick={(e) => { e.stopPropagation(); handleClick(); }}>
            View Details
            <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9 18 15 12 9 6" /></svg>
          </button>
        </div>
      </div>
    );
  }

  if (variant === "horizontal") {
    return (
      <div className="prop-card-feat-compact" onClick={handleClick} style={{ cursor: 'pointer' }}>
        <div className="feat-img-square">
          <img src={property.img} alt={property.title} loading="lazy" />
          <div className="feat-badges-compact">
            <span className="verified-badge-v7 compact">
              <svg viewBox="0 0 24 24" fill="currentColor" width="10" height="10"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" /></svg>
              100% Verified
            </span>
          </div>
          <button className="wish-btn-compact" onClick={handleWish}>
            <HeartIco isWished={isWished} size={14} />
          </button>
        </div>
        <div className="feat-info-compact">
          <div className="feat-header">
            <span className="feat-price-compact">{property.price}</span>
            <span className="feat-rating-tag">★ {property.rating || '4.5'}</span>
          </div>

          <h3 className="feat-title-compact" title={property.title}>{property.title}</h3>
          <div className="feat-loc-compact"><PinIco /> {property.loc}</div>

          <div className="feat-strip-compact">
            {stats.map((s, i) => (
              <span key={i}>
                {i > 0 && <span className="dot">•</span>}
                {s.label && <span className="stat-label">{s.label}: </span>}
                {s.val}
              </span>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (variant === "list") {
    return (
      <div className="prop-card-list" onClick={handleClick} style={{ cursor: 'pointer' }}>
        <div className="prop-card-list-img">
          <img src={property.img} alt={property.title} loading="lazy" />
          <span className="prop-card-list-badge">{property.badge}</span>
        </div>

        <div className="prop-card-list-body">
          <div className="prop-card-list-top">
            <span className="prop-card-list-price">{property.price}</span>
            <div className="prop-card-list-actions">
              <button className="prop-card-list-wish" onClick={handleWish}>
                <HeartIco isWished={isWished} size={14} />
              </button>
              <button className="prop-card-list-share" onClick={handleShare}>
                {copied ? '✅' : <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14"><circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" /><line x1="8.59" y1="13.51" x2="15.42" y2="17.49" /><line x1="15.41" y1="6.51" x2="8.59" y2="10.49" /></svg>}
              </button>
            </div>
          </div>

          <h3 className="prop-card-list-title" title={property.title}>{property.title}</h3>
          <div className="prop-card-list-loc"><PinIco /> {property.loc}</div>

          <div className="prop-card-list-meta">
            {stats.map((s, i) => (
              <span key={i}>
                {i > 0 && <span className="dot">·</span>}
                {s.label && <span className="stat-label">{s.label}: </span>} {s.val}
              </span>
            ))}
          </div>

          <div className="prop-card-list-verified">
            <svg viewBox="0 0 24 24" fill="currentColor" width="10" height="10"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" /></svg>
            100% Verified
          </div>
        </div>
      </div>
    );
  }

  if (variant === "listv2") {
    return (
      <div className="prop-card-v2-vertical" onClick={handleClick} style={{ cursor: 'pointer' }}>
        <div className="v2-img-wrap">
          <img src={property.img} alt={property.title} loading="lazy" />
          <div className="v2-badges">
            <span className="verified-badge-listv2">
              <svg viewBox="0 0 24 24" fill="currentColor" width="12" height="12"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" /></svg>
              Verified
            </span>
          </div>
          <div className="v2-actions">
            <button className="v2-wish-btn" onClick={handleWish}>
              <HeartIco isWished={isWished} size={13} />
            </button>
            <button className="v2-share-btn" onClick={handleShare}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="12" height="12"><circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" /><line x1="8.59" y1="13.51" x2="15.42" y2="17.49" /><line x1="15.41" y1="6.51" x2="8.59" y2="10.49" /></svg></button>
          </div>
        </div>

        <div className="v2-info">
          <div className="v2-price">{property.price}</div>
          <h3 className="v2-title" title={property.title}>{property.title}</h3>
          <div className="v2-loc"><PinIco /> {property.loc}</div>
          <div className="v2-meta">
            {stats.slice(0, 2).map((s, i) => (
              <span key={i}>
                {i > 0 && <span className="dot">·</span>}
                {s.val}
              </span>
            ))}
          </div>
        </div>
      </div>
    );
  }


  if (variant === "localities") {
    return (
      <div className="hyd-prop-card" onClick={handleClick} style={{ cursor: 'pointer' }}>
        <div className="hyd-img-wrap">
          <img src={property.img} alt={property.title} loading="lazy" />
          <div className="hyd-area-tag">📍 {property.badge || 'New'}</div>
          <button
            className={`hyd-wish-btn ${isWished ? 'wished' : ''}`}
            onClick={handleWish}
          >
            <HeartIco isWished={isWished} size={12} />
          </button>
        </div>
        <div className="hyd-info-wrap">
          <div className="hyd-price">{property.price}</div>
          <h3 className="hyd-title" title={property.title}>{property.title}</h3>
          <div className="hyd-meta">
            <div className="hyd-meta-item">
              <BedIco />
              <span>{property.beds} <small>Beds</small></span>
            </div>
            <span className="dot">•</span>
            <div className="hyd-meta-item">
              <BathIco />
              <span>{property.baths} <small>Baths</small></span>
            </div>
            <span className="dot">•</span>
            <div className="hyd-meta-item">
              <AreaIco />
              <span>{property.size}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // DEFAULT (Vertical Elite Card)
  return (
    <div className="prop-card-v7" onClick={handleClick} style={{ cursor: 'pointer' }}>
      <div className="prop-img-wrap-v7">
        <img src={property.img} alt={property.title} loading="lazy" />
        <div className="prop-badges-v7">
          <span className={`pill-badge-v7 ${property.badgeClass}`}>{property.badge}</span>
          <span className="verified-badge-v7">
            <svg viewBox="0 0 24 24" fill="currentColor" width="12" height="12"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" /></svg>
            100% Verified
          </span>
        </div>
        <button className="wish-btn-v7" onClick={handleWish}>
          <HeartIco isWished={isWished} size={15} />
        </button>
        <button className="share-btn-v7" onClick={handleShare}>
          {copied ? '✅' : <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14"><circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" /><line x1="8.59" y1="13.51" x2="15.42" y2="17.49" /><line x1="15.41" y1="6.51" x2="8.59" y2="10.49" /></svg>}
        </button>
      </div>

      <div className="prop-body-v7">
        <div className="prop-price-v7">{property.price}</div>
        <h3 className="prop-title-v7" title={property.title}>{property.title}</h3>
        <div className="prop-loc-v7"><PinIco /> {property.loc}</div>

        <div className="prop-meta-v7">
          {stats.map((s, i) => (
            <div key={i} className="meta-tile-v7" title={`${s.val} ${s.label || ''}`}>
              {s.icon}
              <div className="meta-text-v7">
                <span className="meta-val-v7">{s.val}</span>
                {s.label && <span className="meta-label-v7">{s.label}</span>}
              </div>
            </div>
          ))}
        </div>

        <button className="btn-action-v7" onClick={(e) => { e.stopPropagation(); handleClick(); }}>View Property</button>
      </div>
    </div>
  );
}
