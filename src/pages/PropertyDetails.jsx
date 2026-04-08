import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { toggleWishlist } from '../store/slices/propertiesSlice';
import { shareProperty } from '../utils/share';
import { PinIco, BedIco, BathIco, AreaIco, SearchIco } from '../data/icons';
import './PropertyDetails.css';

export default function PropertyDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [copied, setCopied] = useState(false);
  const [property, setProperty] = useState(null);
  const [activeImage, setActiveImage] = useState(null);
  
  const { buyProperties, rentProperties, highRated, landProperties, hydLocalities, wishlist } = useSelector(
    (state) => state.properties
  );

  useEffect(() => {
    const all = [...buyProperties, ...rentProperties, ...highRated, ...landProperties, ...hydLocalities];
    const found = all.find((p) => String(p.id) === String(id));
    setProperty(found);
    if (found) {
      setActiveImage(found.coverPhoto || found.img);
    }
    window.scrollTo(0, 0);
  }, [id, buyProperties, rentProperties, highRated, landProperties, hydLocalities]);

  if (!property) {
    return (
      <div className="pd-loading">
        <div className="pd-spinner"></div>
        <p>Fetching premium property details...</p>
      </div>
    );
  }

  const isWished = wishlist.includes(property.id);
  const galleryImages = property.smartAlbum ? Object.values(property.smartAlbum).flat() : (property.images || []);
  const videoId = property.video?.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|v\/|user\/\S+|live\/))([\w-]{11})/)?.[1];

  return (
    <div className="pd-page">
      {/* ─── NAVIGATION BAR ─── */}
      <nav className="pd-nav">
        <div className="pd-container">
          <button className="pd-back" onClick={() => navigate(-1)}>
             <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="15 18 9 12 15 6" /></svg>
             <span>Back</span>
          </button>
          <div className="pd-actions">
            <button className={`pd-action-btn ${isWished ? 'active' : ''}`} onClick={() => dispatch(toggleWishlist(property.id))}>
              {isWished ? '❤️' : '🤍'}
            </button>
            <button className="pd-action-btn" onClick={() => shareProperty(property, setCopied)}>
              {copied ? '✅' : '🔗'}
            </button>
          </div>
        </div>
      </nav>

      <div className="pd-container">
        {/* ─── HERO SECTION (BALANCED HEIGHT) ─── */}
        <section className="pd-hero">
          <div className="pd-hero-grid">
            {/* Left: Main Image & Gallery Preview */}
            <div className="pd-gallery-main">
              <div className="pd-main-img-container">
                <img src={activeImage} alt={property.title} className="pd-main-img" />
                <div className="pd-badges">
                  <span className={`pd-badge ${property.badgeClass || 'new'}`}>{property.badge}</span>
                  <span className="pd-badge verified">Verified</span>
                </div>
              </div>
              <div className="pd-thumb-grid">
                {galleryImages.slice(0, 4).map((img, i) => (
                  <div key={i} className={`pd-thumb ${activeImage === img ? 'active' : ''}`} onMouseEnter={() => setActiveImage(img)}>
                    <img src={img} alt="thumb" />
                    {i === 3 && galleryImages.length > 4 && (
                      <div className="pd-thumb-more">+{galleryImages.length - 4} Photos</div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Essential Info Card */}
            <div className="pd-hero-info">
              <div className="pd-info-card">
                <div className="pd-price-wrap">
                  <h1 className="pd-price">{property.price}</h1>
                  {property.pricing?.pricePerSqft && (
                    <span className="pd-price-sqft">₹{property.pricing.pricePerSqft.toLocaleString()}/sq.ft</span>
                  )}
                </div>
                <div className="pd-type-tag">{property.propertyType}</div>
                <h2 className="pd-title">{property.title}</h2>
                <div className="pd-location">
                  <PinIco /> {property.location?.fullAddress || property.loc}
                </div>

                <div className="pd-specs">
                  <div className="pd-spec-item">
                    <div className="pd-spec-icon"><BedIco /></div>
                    <div className="pd-spec-text">
                      <strong>{property.beds || 0} BHK</strong>
                      <span>Bedrooms</span>
                    </div>
                  </div>
                  <div className="pd-spec-item">
                    <div className="pd-spec-icon"><BathIco /></div>
                    <div className="pd-spec-text">
                      <strong>{property.baths || 0}</strong>
                      <span>Bathrooms</span>
                    </div>
                  </div>
                  <div className="pd-spec-item">
                    <div className="pd-spec-icon"><AreaIco /></div>
                    <div className="pd-spec-text">
                      <strong>{property.size}</strong>
                      <span>Super Area</span>
                    </div>
                  </div>
                </div>

                <div className="pd-quick-meta">
                  <div className="pd-meta-row">
                    <span>Status:</span> <strong>{property.availabilityStatus || 'Ready to move'}</strong>
                  </div>
                  <div className="pd-meta-row">
                    <span>Facing:</span> <strong>{property.direction || 'North'}</strong>
                  </div>
                  <div className="pd-meta-row">
                    <span>Furnishing:</span> <strong>{property.furnishingStatus || 'Unfurnished'}</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── MAIN CONTENT AREA (TWO COLUMNS) ─── */}
        <div className="pd-main-layout">
          {/* LEFT COLUMN: EXHAUSTIVE DETAILS */}
          <div className="pd-content-col">
            <section className="pd-section">
              <h3 className="pd-section-title">Overview</h3>
              <p className="pd-description">
                Experience luxury living in this premium **{property.propertyType}** located in the heart of **{property.location?.locality || property.loc}**. 
                {property.furnishingStatus === 'Fully Furnished' && ' This home comes with bespoke interiors and high-end furniture, ready for immediate occupation.'}
                Positioned strategically near **{property.location?.landmark || 'major hubs'}**, it offers unmatched connectivity and a serene environment. 
                {property.direction && ` The property is ${property.direction} facing, ensuring optimal natural light and ventilation.`}
              </p>
            </section>

            {videoId && (
              <section className="pd-section">
                <h3 className="pd-section-title">Video Tour</h3>
                <div className="pd-video-wrap">
                  <iframe
                    src={`https://www.youtube.com/embed/${videoId}`}
                    title="Tour"
                    frameBorder="0"
                    allowFullScreen
                  ></iframe>
                </div>
              </section>
            )}

            <section className="pd-section">
              <h3 className="pd-section-title">Amenities</h3>
              <div className="pd-amenities-grid">
                {property.amenities?.map(a => (
                  <div key={a} className="pd-amenity">
                    <div className="pd-amenity-dot" /> {a.charAt(0).toUpperCase() + a.slice(1)}
                  </div>
                ))}
              </div>
            </section>

            <section className="pd-section">
              <h3 className="pd-section-title">Connectivity & Advantages</h3>
              <div className="pd-adv-grid">
                {property.locationAdvantages?.map(adv => (
                  <div key={adv} className="pd-adv-item">
                    <span className="pd-adv-check">✓</span> {adv}
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* RIGHT COLUMN: STICKY LEAD FORM */}
          <aside className="pd-sidebar-col">
            <div className="pd-sticky-card">
              <div className="pd-lead-header">
                <h3>Contact Seller</h3>
                <p>Enquire now to get a callback</p>
              </div>
              <form className="pd-lead-form">
                <input type="text" placeholder="Your Name" />
                <input type="email" placeholder="Email Address" />
                <div className="pd-phone-input">
                  <span className="pd-prefix">+91</span>
                  <input type="tel" placeholder="Mobile Number" />
                </div>
                <button type="button" className="pd-submit-btn">Send Enquiry</button>
              </form>
              <div className="pd-uploader-info">
                <div className="pd-uploader-avatar">
                  {property.uploader?.avatar || (property.uploader?.name?.[0] || 'U')}
                </div>
                <div className="pd-uploader-details">
                  <strong>{property.uploader?.name || 'Authorized Agent'}</strong>
                  <span>{property.uploader?.role || 'Relationship Manager'}</span>
                </div>
              </div>
              <div className="pd-trust-badge">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L3 7v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-9-5z"/></svg>
                Verified by Sherla Properties
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
