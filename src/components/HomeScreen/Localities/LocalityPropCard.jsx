import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toggleWishlist } from '../../../store/slices/propertiesSlice';
import { PinIco, BedIco, BathIco, AreaIco } from '../../../data/icons';
import './Localities.css';

export default function LocalityPropCard({ property }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const wishlist = useSelector(state => state.properties.wishlist);
  const isWished = wishlist.includes(property.id);

  const handleClick = () => {
    navigate(`/property/${property.id}`);
  };

  const handleWish = (e) => {
    e.stopPropagation();
    dispatch(toggleWishlist(property.id));
  };

  return (
    <div className="hyd-prop-card" onClick={handleClick}>
      <div className="hyd-img-wrap">
        <img src={property.img} alt={property.title} loading="lazy" />
        <div className="hyd-area-tag">📍 {property.badge || 'New'}</div>
        <button
          className={`hyd-wish-btn ${isWished ? 'wished' : ''}`}
          onClick={handleWish}
        >
          {isWished ? '❤️' : '🤍'}
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
