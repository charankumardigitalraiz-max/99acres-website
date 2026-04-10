import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { toggleWishlist } from '../store/slices/propertiesSlice';
import { shareProperty } from '../utils/share';
import { PinIco, BedIco, BathIco, AreaIco, SearchIco } from '../data/icons';
import './PropertyDetails.css';


const AmenityIcon = ({ name }) => {
  const t = name.toLowerCase();

  // Gym / Fitness (Dumbbell)
  if (t.includes('gym') || t.includes('fitness')) return <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.4 14.4 9.6 9.6" /><path d="M18.657 21.485a2 2 0 1 1-2.829-2.828l-1.767 1.768a2 2 0 1 1-2.829-2.829l6.364-6.364a2 2 0 1 1 2.829 2.829l-1.768 1.767a2 2 0 1 1 2.828 2.829z" /><path d="m21.5 21.5-1.4-1.4" /><path d="M3.9 3.9 2.5 2.5" /><path d="M6.404 2.768a2 2 0 1 1 2.829 2.829l1.768-1.767a2 2 0 1 1 2.828 2.829L7.465 13.023a2 2 0 1 1-2.829-2.829l1.768-1.767a2 2 0 1 1-2.829-2.829z" /></svg>;
  // Pool / Swimming
  if (t.includes('pool') || t.includes('swim')) return <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 6c.6 0 1.2-.2 1.7-.6.9-.8 2.5-.8 3.4 0 .5.4 1.1.6 1.7.6.6 0 1.2-.2 1.7-.6.9-.8 2.5-.8 3.4 0 .5.4 1.1.6 1.7.6.6 0 1.2-.2 1.7-.6.9-.8 2.5-.8 3.4 0 .5.4 1.1.6 1.7.6" /><path d="M2 12c.6 0 1.2-.2 1.7-.6.9-.8 2.5-.8 3.4 0 .5.4 1.1.6 1.7.6.6 0 1.2-.2 1.7-.6.9-.8 2.5-.8 3.4 0 .5.4 1.1.6 1.7.6.6 0 1.2-.2 1.7-.6.9-.8 2.5-.8 3.4 0 .5.4 1.1.6 1.7.6" /><path d="M2 18c.6 0 1.2-.2 1.7-.6.9-.8 2.5-.8 3.4 0 .5.4 1.1.6 1.7.6.6 0 1.2-.2 1.7-.6.9-.8 2.5-.8 3.4 0 .5.4 1.1.6 1.7.6.6 0 1.2-.2 1.7-.6.9-.8 2.5-.8 3.4 0 .5.4 1.1.6 1.7.6" /></svg>;
  // Parking / Car
  if (t.includes('parking') || t.includes('car') || t.includes('garage')) return <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2" /><circle cx="7" cy="17" r="2" /><path d="M9 17h6" /><circle cx="17" cy="17" r="2" /></svg>;
  // Park / Garden (Trees)
  if (t.includes('park') || t.includes('garden') || t.includes('lawn')) return <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 8V5a2 2 0 0 0-4 0v3" /><path d="M8 12a3 3 0 0 0-6 0v5h6z" /><path d="M16 12V3" /><path d="M11 12H7" /><path d="M11 21v-4a3 3 0 0 1 3-3" /><path d="M19 21v-4a7 7 0 0 0-7-7" /><path d="M21 21H3" /></svg>;
  // Security / CCTV (Shield Check)
  if (t.includes('secur') || t.includes('cctv')) return <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2-1 4-2 7-2 2.5 0 4.5 1 6.5 2a1 1 0 0 1 1 1z" /><path d="m9 12 2 2 4-4" /></svg>;
  // Water
  if (t.includes('water')) return <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7.12 18.12A5 5 0 1 1 14.19 11l-3.35-3.35a.5.5 0 0 0-.71 0L3.58 14.19a5 5 0 0 0 3.54 3.93Z" /><path d="m14 14 3.35-3.35a.5.5 0 0 0 0-.7L14 6.59" /><path d="m14 6.59-1.3-1.3a.5.5 0 0 1 0-.71L16.24.5a.5.5 0 0 1 .71 0l3.54 3.54a.5.5 0 0 1 0 .7Z" /></svg>;
  // Washroom / Bath
  if (t.includes('washroom') || t.includes('bath')) return <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 4 8 6" /><path d="M17 19v2" /><path d="M2 12h20" /><path d="M7 19v2" /><path d="M9 5 7.6 3.6a2 2 0 0 0-2.8 2.8" /><path d="M4 12v5a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5" /></svg>;
  // Bed
  if (t.includes('bed')) return <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 4v16" /><path d="M2 8h18a2 2 0 0 1 2 2v10" /><path d="M2 17h20" /><path d="M6 8v9" /></svg>;
  // Kitchen (Utensils)
  if (t.includes('kitchen')) return <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2" /><path d="M7 2v20" /><path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7" /></svg>;
  // Living / Sofa
  if (t.includes('livving') || t.includes('living') || t.includes('sofa')) return <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 9V7a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v2" /><path d="M4 16c-1.1 0-2-.9-2-2V9a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5c0 1.1-.9 2-2 2" /><path d="M20 16v2a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-2" /></svg>;
  // TV
  if (t.includes('tv') || t.includes('television')) return <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="15" x="2" y="7" rx="2" ry="2" /><polyline points="17 2 12 7 7 2" /></svg>;
  // Balcony / Terrace
  if (t.includes('balcony') || t.includes('terrace')) return <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 13h18" /><path d="M19 13v8" /><path d="M5 13v8" /><path d="M5 17h14" /><path d="M7 6l2 4 3-4 3 4 2-4" /></svg>;

  // Default Fallback
  return <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="m9 12 2 2 4-4" /></svg>;
};

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
  const AmenityIcon = ({ name }) => {
    const t = name.toLowerCase();
    if (t.includes('gym') || t.includes('fitness')) return <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="6" y1="6" x2="18" y2="18"></line><line x1="4" y1="8" x2="8" y2="4"></line><line x1="16" y1="20" x2="20" y2="16"></line></svg>;
    if (t.includes('pool') || t.includes('swim')) return <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12h20" /><path d="M2 18h20" /><path d="M10 6L9 3 7 6M15 6l1-3 2 3" /></svg>;
    if (t.includes('park') && !t.includes('garden')) return <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="10" width="18" height="8" rx="2" ry="2"></rect><path d="M3 14h18" /><path d="M6 10V6a2 2 0 012-2h8a2 2 0 012 2v4" /></svg>;
    if (t.includes('secur') || t.includes('cctv')) return <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>;
    if (t.includes('power') || t.includes('backup')) return <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>;
    if (t.includes('lift') || t.includes('elev')) return <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="3" width="14" height="18" rx="2" ry="2"></rect><polyline points="12 15 12 9"></polyline><polyline points="14 11 12 9 10 11"></polyline></svg>;
    if (t.includes('club')) return <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>;
    return <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>;
  };

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
                    <span className="pd-amenity-ico"><AmenityIcon name={a} /></span>
                    {a.charAt(0).toUpperCase() + a.slice(1)}
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
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L3 7v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-9-5z" /></svg>
                Verified by Sherla Properties
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
