import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toggleWishlist } from '../../store/slices/propertiesSlice';
import { PinIco, BedIco, BathIco, AreaIco } from '../../data/icons';
import { shareProperty } from '../../utils/share';
import './PropertyCard.css';

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
          <button
            className="wish-btn-compact"
            onClick={handleWish}
          >
            {isWished ? '❤️' : '🤍'}
          </button>
        </div>
        <div className="feat-info-compact">
          <div className="feat-header">
            <span className="feat-price-compact">{property.price}</span>
            <span className="feat-rating-tag">★ 4.9</span>
          </div>

          <h3 className="feat-title-compact">{property.title}</h3>
          <div className="feat-loc-compact"><PinIco /> {property.loc}</div>

          <div className="feat-strip-compact">
            <span>{property.beds} BHK</span>
            <span className="dot">•</span>
            <span>{property.baths} Bath</span>
            <span className="dot">•</span>
            <span>{property.size}</span>
          </div>

          {/* <button className="btn-action-compact">Contact Builder</button> */}
        </div>
      </div>
    );
  }


  if (variant === "list") {
    return (
      <div className="prop-card-list" onClick={handleClick} style={{ cursor: 'pointer' }}>
        {/* Left: Image */}
        <div className="prop-card-list-img">
          <img src={property.img} alt={property.title} loading="lazy" />
          <span className="prop-card-list-badge">{property.badge}</span>
        </div>

        {/* Right: Info */}
        <div className="prop-card-list-body">
          <div className="prop-card-list-top">
            <span className="prop-card-list-price">{property.price}</span>
            <div className="prop-card-list-actions">
              <button
                className="prop-card-list-wish"
                onClick={handleWish}
                aria-label="Wishlist"
              >
                {isWished ? '❤️' : '🤍'}
              </button>
              <button
                className="prop-card-list-share"
                onClick={handleShare}
                aria-label="Share"
                title={copied ? 'Copied!' : 'Share'}
              >
                {copied ? (
                  <svg viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.5" width="14" height="14" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" />
                    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" /><line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          <h3 className="prop-card-list-title">{property.title}</h3>

          <div className="prop-card-list-loc">
            <PinIco /> {property.loc}
          </div>

          <div className="prop-card-list-meta">
            <span>{property.beds} BHK</span>
            <span className="dot">·</span>
            <span>{property.baths} Bath</span>
            <span className="dot">·</span>
            <span>{property.size}</span>
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
            {/* <span className={`v2-badge ${property.badgeClass}`}>{property.badge}</span> */}
            <span className="verified-badge-listv2">
              <svg viewBox="0 0 24 24" fill="currentColor" width="12" height="12"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" /></svg>
              Verified
            </span>
          </div>

          <div className="v2-actions">
            <button
              className="v2-wish-btn"
              onClick={handleWish}
            >
              {isWished ? '❤️' : '🤍'}
            </button>
            <button
              className="v2-share-btn"
              onClick={handleShare}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="12" height="12"><circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" /><line x1="8.59" y1="13.51" x2="15.42" y2="17.49" /><line x1="15.41" y1="6.51" x2="8.59" y2="10.49" /></svg>
            </button>
          </div>
        </div>

        <div className="v2-info">
          <div className="v2-price">{property.price}</div>
          <h3 className="v2-title">{property.title}</h3>
          <div className="v2-loc"><PinIco /> {property.loc}</div>

          <div className="v2-meta">
            <span>{property.beds} BHK</span>
            <span className="dot">·</span>
            <span>{property.size}</span>
          </div>

          {/* <div className="v2-verified">
            <svg viewBox="0 0 24 24" fill="currentColor" width="10" height="10"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" /></svg>
            Verified
          </div> */}
        </div>
      </div>
    );
  }


  return (
    <div className="prop-card-v7" onClick={handleClick} style={{ cursor: 'pointer' }}>
      <div className="prop-img-wrap-v7">
        <img src={property.img} alt={property.title} loading="lazy" />

        {/* Elite Badges (v7) */}
        <div className="prop-badges-v7">
          <span className={`pill-badge-v7 ${property.badgeClass}`}>{property.badge}</span>
          <span className="verified-badge-v7">
            <svg viewBox="0 0 24 24" fill="currentColor" width="12" height="12"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" /></svg>
            100% Verified
          </span>
        </div>

        {/* Floating Heart + Share */}
        <button
          className="wish-btn-v7"
          onClick={handleWish}
          aria-label={isWished ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          {isWished ? '❤️' : '🤍'}
        </button>
        <button
          className="share-btn-v7"
          onClick={handleShare}
          aria-label="Share property"
          title={copied ? 'Link copied!' : 'Share'}
        >
          {copied ? (
            <svg viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.5" width="14" height="14" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" />
              <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" /><line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
            </svg>
          )}
        </button>
      </div>

      <div className="prop-body-v7">
        <div className="prop-price-v7">{property.price}</div>
        <h3 className="prop-title-v7">{property.title}</h3>
        <div className="prop-loc-v7">
          <PinIco /> {property.loc}
        </div>

        <div className="prop-meta-v7">
          <div className="meta-tile-v7"><BedIco /> {property.beds}<span>Beds</span></div>
          <div className="meta-tile-v7"><BathIco /> {property.baths}<span>Bath</span></div>
          <div className="meta-tile-v7"><AreaIco /> {property.size}</div>
        </div>

        <button className="btn-action-v7" onClick={(e) => { e.stopPropagation(); handleClick(); }}>View Property</button>
      </div>
    </div>
  );
}
