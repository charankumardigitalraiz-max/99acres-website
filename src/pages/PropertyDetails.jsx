import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { toggleWishlist } from '../store/slices/propertiesSlice';
import { shareProperty } from '../utils/share';
import { PinIco, BedIco, BathIco, AreaIco, SearchIco } from '../data/icons';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './PropertyDetails.css';

// Fix for default marker icons (Leaflet + Webpack/Vite issue)
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});


const AmenityIcon = ({ name }) => {
  const t = name.toLowerCase();

  // Residential / Living
  if (t.includes('gym') || t.includes('fitness')) return <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.4 14.4 9.6 9.6" /><path d="M18.657 21.485a2 2 0 1 1-2.829-2.828l-1.767 1.768a2 2 0 1 1-2.829-2.829l6.364-6.364a2 2 0 1 1 2.829 2.829l-1.768 1.767a2 2 0 1 1 2.828 2.829z" /><path d="m21.5 21.5-1.4-1.4" /><path d="M3.9 3.9 2.5 2.5" /><path d="M6.404 2.768a2 2 0 1 1 2.829 2.829l1.768-1.767a2 2 0 1 1 2.828 2.829L7.465 13.023a2 2 0 1 1-2.829-2.829l1.768-1.767a2 2 0 1 1-2.829-2.829z" /></svg>;
  if (t.includes('pool') || t.includes('swim')) return <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 6c.6 0 1.2-.2 1.7-.6.9-.8 2.5-.8 3.4 0 .5.4 1.1.6 1.7.6.6 0 1.2-.2 1.7-.6.9-.8 2.5-.8 3.4 0 .5.4 1.1.6 1.7.6.6 0 1.2-.2 1.7-.6.9-.8 2.5-.8 3.4 0 .5.4 1.1.6 1.7.6" /><path d="M2 12c.6 0 1.2-.2 1.7-.6.9-.8 2.5-.8 3.4 0 .5.4 1.1.6 1.7.6.6 0 1.2-.2 1.7-.6.9-.8 2.5-.8 3.4 0 .5.4 1.1.6 1.7.6.6 0 1.2-.2 1.7-.6.9-.8 2.5-.8 3.4 0 .5.4 1.1.6 1.7.6" /><path d="M2 18c.6 0 1.2-.2 1.7-.6.9-.8 2.5-.8 3.4 0 .5.4 1.1.6 1.7.6.6 0 1.2-.2 1.7-.6.9-.8 2.5-.8 3.4 0 .5.4 1.1.6 1.7.6.6 0 1.2-.2 1.7-.6.9-.8 2.5-.8 3.4 0 .5.4 1.1.6 1.7.6" /></svg>;
  if (t.includes('parking') || t.includes('car')) return <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="3" width="22" height="13" rx="2" ry="2" /><path d="M7 21h0" /><path d="M17 21h0" /><path d="M12 16v5" /></svg>;
  if (t.includes('washroom') || t.includes('bath')) return <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 4 8 6" /><path d="M17 19v2" /><path d="M2 12h20" /><path d="M7 19v2" /><path d="M9 5 7.6 3.6a2 2 0 0 0-2.8 2.8" /><path d="M4 12v5a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5" /></svg>;
  if (t.includes('bed')) return <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 4v16" /><path d="M2 8h18a2 2 0 0 1 2 2v10" /><path d="M2 17h20" /><path d="M6 8v9" /></svg>;
  if (t.includes('kitchen')) return <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2" /><path d="M7 2v20" /><path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7" /></svg>;
  if (t.includes('livving') || t.includes('living') || t.includes('sofa')) return <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 9V7a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v2" /><path d="M4 16c-1.1 0-2-.9-2-2V9a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5c0 1.1-.9 2-2 2" /><path d="M20 16v2a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-2" /></svg>;

  // Land / Commercial Specific
  if (t.includes('water')) return <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5s-3 3.5-3 5.5a7 7 0 0 0 7 7Z" /></svg>;
  if (t.includes('secur') || t.includes('cctv') || t.includes('guard')) return <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" /><path d="m9 12 2 2 4-4" /></svg>;
  if (t.includes('power') || t.includes('electric') || t.includes('backup')) return <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2 3 14h9l-1 8 10-12h-9l1-8Z" /></svg>;
  if (t.includes('boundary') || t.includes('fenc') || t.includes('wall')) return <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12h18" /><path d="M3 18h18" /><path d="M3 6h18" /><path d="M5 3v18" /><path d="M19 3v18" /></svg>;
  if (t.includes('road') || t.includes('access')) return <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="8" x="2" y="8" rx="2" /><path d="M17 12h.01" /><path d="M12 12h.01" /><path d="M7 12h.01" /></svg>;
  if (t.includes('garden') || t.includes('park') || t.includes('greenery')) return <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 19V5" /><path d="m5 12 7-7 7 7" /><path d="M12 19c-4 0-7 3-7 3" /><path d="M12 19c4 0 7 3 7 3" /></svg>;

  // Default Fallback
  return <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><path d="m22 4-10 10.01-3-3" /></svg>;
};

export default function PropertyDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [copied, setCopied] = useState(false);
  const [property, setProperty] = useState(null);
  const [activeImage, setActiveImage] = useState(null);
  const enquiryRef = useRef(null);

  const scrollToEnquiry = () => {
    enquiryRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

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

  const type = (property.propertyType || '').toLowerCase();
  const isLand = type.includes('plot') || type.includes('land') || type.includes('farm');
  const isCommercial = type.includes('commercial') || type.includes('office') || type.includes('retail');
  const isFlat = type.includes('flat') || type.includes('apartment') || type.includes('penthouse');
  const isVilla = type.includes('villa') || type.includes('independent house') || type.includes('bungalow');

  // Unified Specifications Logic
  const getHighlights = () => {
    if (isLand) {
      return [
        { icon: <AreaIco />, label: 'Plot Area', value: property.size },
        { icon: <AreaIco />, label: 'Dimensions', value: property.dimensions || 'Check Description' },
        { icon: <SearchIco />, label: 'Ownership', value: property.ownership || 'Freehold' },
        { icon: <PinIco />, label: 'Side Facing', value: property.direction || property.facing || 'East' }
      ];
    }
    if (isCommercial) {
      return [
        { icon: <AreaIco />, label: 'Super Area', value: property.size },
        { icon: <BathIco />, label: 'Washrooms', value: property.baths || 'Private' },
        { icon: <SearchIco />, label: 'Furnishing', value: property.furnishingStatus || 'Bare Shell' },
        { icon: <PinIco />, label: 'Facing', value: property.direction || 'Main Road' }
      ];
    }
    return [
      { icon: <BedIco />, label: 'Bedrooms', value: `${property.beds || 0} BHK` },
      { icon: <BathIco />, label: 'Bathrooms', value: property.baths || 0 },
      { icon: <AreaIco />, label: 'Super Area', value: property.size },
      { icon: <SearchIco />, label: 'Furnishing', value: property.furnishingStatus || 'Unfurnished' }
    ];
  };

  const highlights = getHighlights();

  return (
    <div className="pd-page">
      {/* ─── NAVIGATION BAR ─── */}
      <nav className="pd-nav">
        <div className="pd-container">
          <button className="pd-back" onClick={() => navigate(-1)}>
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="15 18 9 12 15 6" /></svg>
            <span>Back</span>
          </button>
        </div>
      </nav>
      <div className="pd-container">
        {/* ─── HERO SECTION (BALANCED HEIGHT) ─── */}
        <section className="pd-hero">
          <div className="pd-hero-grid">
            {/* Left: Main Image & Gallery Preview */}
            <div className="pd-gallery-main">
              <div className="pd-main-img-container">
                <img src={activeImage || property?.img} alt={property?.title} className="pd-main-img" />
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
                {/* <div className="pd-type-tag">{property.propertyType}</div> */}
                <h2 className="pd-title">{property.title}</h2>
                <div className="pd-location">
                  <PinIco /> {property.location?.fullAddress || property.loc}
                </div>

                <div className="pd-specs">
                  {highlights.map((h, i) => (
                    <div className="pd-spec-item" key={i}>
                      <div className="pd-spec-icon">{h.icon}</div>
                      <div className="pd-spec-text">
                        <strong>{h.value}</strong>
                        <span>{h.label}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pd-quick-meta">
                  <div className="pd-meta-row">
                    <span>Availability:</span> <strong>{property.availabilityStatus || (isLand ? 'Ready for Registry' : 'Ready to move')}</strong>
                  </div>
                  <div className="pd-meta-row">
                    <span>Secondary Facing:</span> <strong>{property.direction || property.facing || 'Open View'}</strong>
                  </div>
                  {!isLand && (
                    <div className="pd-meta-row">
                      <span>Property Age:</span> <strong>{property.age || '0-1 Years'}</strong>
                    </div>
                  )}
                  {isLand && property.ownership && (
                    <div className="pd-meta-row">
                      <span>Current Status:</span> <strong>{property.status || 'Verified Title'}</strong>
                    </div>
                  )}
                </div>

                <div className="pd-card-actions">
                  <button className="pd-visit-btn" onClick={() => window.open(`https://wa.me/${property.lawyerDetails?.mobile?.replace(/\D/g, '') || '919876543210'}?text=Hi, I'm interested in ${property.title}. Please provide more details.`, '_blank')}>
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
                    Contact Agent
                  </button>
                  <button
                    className={`pd-wishlist-btn ${isWished ? 'active' : ''}`}
                    onClick={() => dispatch(toggleWishlist(property.id))}
                  >
                    {isWished ? (
                      <svg viewBox="0 0 24 24" width="18" height="18" fill="#ef4444" stroke="#ef4444" strokeWidth="2">
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                      </svg>
                    ) : (
                      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                      </svg>
                    )}
                    {isWished ? 'Saved' : 'Wishlist'}
                  </button>
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
                {isLand ? (
                  <>
                    Explore this premium **{property.propertyType}** located in the strategically connected area of **{property.location?.locality || property.loc}**.
                    Perfect for investment or building your dream project, this land offers excellent potential.
                    Positioned near **{property.location?.landmark || 'major hubs'}**, it ensures unmatched connectivity and growth opportunities.
                    {property.direction && ` The plot is ${property.direction} facing.`}
                  </>
                ) : (
                  <>
                    Experience luxury living in this premium **{property.propertyType}** located in the heart of **{property.location?.locality || property.loc}**.
                    {property.furnishingStatus === 'Fully Furnished' && ' This home comes with bespoke interiors and high-end furniture, ready for immediate occupation.'}
                    Positioned strategically near **{property.location?.landmark || 'major hubs'}**, it offers unmatched connectivity and a serene environment.
                    {property.direction && ` The property is ${property.direction} facing, ensuring optimal natural light and ventilation.`}
                  </>
                )}
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

            {/* <section className="pd-section">
              <h3 className="pd-section-title">Legal Documents & Verification</h3>
              <div className="pd-legal-grid">
                <div className="pd-legal-card">
                  <div className="pd-legal-icon">
                    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /><polyline points="10 9 9 9 8 9" /></svg>
                  </div>
                  <div className="pd-legal-info">
                    <h4>{isLand ? '7/12 Extract' : 'RERA Approved'}</h4>
                    <div className="pd-legal-status">
                      <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" /></svg>
                      Verified
                    </div>
                  </div>
                </div>
                <div className="pd-legal-card">
                  <div className="pd-legal-icon">
                    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
                  </div>
                  <div className="pd-legal-info">
                    <h4>Title Deed</h4>
                    <div className="pd-legal-status">
                      <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" /></svg>
                      Verified
                    </div>
                  </div>
                </div>
                <div className="pd-legal-card">
                  <div className="pd-legal-icon">
                    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>
                  </div>
                  <div className="pd-legal-info">
                    <h4>Tax Receipts</h4>
                    <div className="pd-legal-status">
                      <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" /></svg>
                      Verified
                    </div>
                  </div>
                </div>
                {isLand && (
                  <div className="pd-legal-card">
                    <div className="pd-legal-icon">
                      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" /></svg>
                    </div>
                    <div className="pd-legal-info">
                      <h4>NA Order</h4>
                      <div className="pd-legal-status">
                        <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" /></svg>
                        Verified
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </section> */}

            {/* ─── DYNAMIC VERIFICATION DETAILS ─── */}
            {/* {property.ownerVerification && (
              <section className="pd-section">
                <h3 className="pd-section-title">Owner Verification</h3>
                <div className="pd-verification-card">
                  {property.ownerVerification.photo && (
                    <div className="pd-verify-img">
                      <img src={property.ownerVerification.photo} alt="ID Proof" />
                    </div>
                  )}
                  <div className="pd-verify-info">
                    <h4>{property.ownerVerification.type}</h4>
                    <span className="pd-status-badge verified">✓ {property.ownerVerification.status}</span>
                  </div>
                </div>
              </section>
            )} */}




            {/* {property.bankerDetails && property.bankerDetails.length > 0 && (
              <section className="pd-section">
                <h3 className="pd-section-title">Banking Partners</h3>
                <div className="pd-bank-list">
                  {property.bankerDetails.map((bank, i) => (
                    <div className="pd-contact-card" key={i}>
                      <h4>{bank.name}</h4>
                      <p>
                        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
                        {bank.number}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            )} */}


            <section className="pd-section">
              <h3 className="pd-section-title">Amenities & Features</h3>
              <div className="pd-amenities-grid">
                {(property.amenities || []).map(a => (
                  <div key={a} className="pd-amenity">
                    <span className="pd-amenity-ico"><AmenityIcon name={a} /></span>
                    {a.charAt(0).toUpperCase() + a.slice(1)}
                  </div>
                ))}
              </div>
            </section>

            <section className="pd-section pd-location-section">
              <h3 className="pd-section-title">Location & Connectivity</h3>
              <div className="pd-location-content">
                <div className="pd-map-wrap">
                  {property.location?.coordinates ? (
                    <MapContainer
                      center={[property.location.coordinates.lat, property.location.coordinates.lng]}
                      zoom={14}
                      scrollWheelZoom={false}
                      style={{ height: '100%', width: '100%' }}
                    >
                      <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                      />
                      {/* Main Property Marker */}
                      <Marker position={[property.location.coordinates.lat, property.location.coordinates.lng]}>
                        <Popup>
                          <strong>{property.title}</strong>
                        </Popup>
                      </Marker>

                      {/* Hotspots Markers */}
                      {property.locationAdvantages?.filter(adv => adv.lat).map((adv, idx) => (
                        <Marker
                          key={idx}
                          position={[adv.lat, adv.lng]}
                        >
                          <Popup>
                            <strong>{adv.name}</strong>
                          </Popup>
                        </Marker>
                      ))}
                    </MapContainer>
                  ) : (
                    <iframe
                      title="Property Location"
                      src={`https://maps.google.com/maps?q=${encodeURIComponent(property.location?.fullAddress || property.loc)}&t=&z=14&ie=UTF8&iwloc=&output=embed`}
                      width="100%"
                      height="100%"
                      frameBorder="0"
                      style={{ border: 0 }}
                      allowFullScreen
                    ></iframe>
                  )}
                </div>
                {property.locationAdvantages && property.locationAdvantages.length > 0 && (
                  <div className="pd-location-advantages">
                    <h4>Nearby Hotspots</h4>
                    <div className="pd-adv-list">
                      {property.locationAdvantages.map((adv, idx) => {
                        const name = typeof adv === 'string' ? adv : adv.name;
                        return (
                          <div key={idx} className="pd-adv-list-item">
                            <span className="pd-adv-icon">
                              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 22s-8-4.5-8-11.8A8 8 0 0 1 12 2a8 8 0 0 1 8 8.2c0 7.3-8 11.8-8 11.8z" /><circle cx="12" cy="10" r="3" /></svg>
                            </span>
                            <span className="pd-adv-text">{name.charAt(0).toUpperCase() + name.slice(1)}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </section>

            {property.ownershipProofs && Object.keys(property.ownershipProofs).length > 0 && (
              <section className="pd-section">
                <h3 className="pd-section-title">Ownership Proofs</h3>
                <div className="pd-proof-gallery">
                  {Object.entries(property.ownershipProofs).map(([key, url]) => (
                    <div className="pd-proof-img-card" key={key}>
                      <div className="pd-proof-img-wrap">
                        <img src={url} alt={key} />
                      </div>
                      <div className="pd-proof-img-label">
                        {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}


            {property.lawyerDetails && (
              <section className="pd-section">
                <h3 className="pd-section-title">Legal Advisor</h3>
                <div className="pd-contact-card">
                  <h4>{property.lawyerDetails.name}</h4>
                  <p>
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
                    {property.lawyerDetails.mobile}
                  </p>
                  <p>
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
                    {property.lawyerDetails.email}
                  </p>
                </div>
              </section>
            )}
          </div>

          {/* RIGHT COLUMN: STICKY LEAD FORM */}
          {/* <aside className="pd-sidebar-col">
            <div className="pd-sticky-card" ref={enquiryRef}>
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
          </aside> */}
        </div>
      </div>

      {/* FLOATING WHATSAPP BUTTON */}
      <button 
        className="pd-floating-whatsapp" 
        onClick={() => window.open(`https://wa.me/${property.lawyerDetails?.mobile?.replace(/\D/g, '') || '919876543210'}?text=Hi, I'm interested in ${property.title}. Please provide more details.`, '_blank')}
        title="Chat on WhatsApp"
      >
        <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.436 9.889-9.886 9.889m8.415-18.3a11.815 11.815 0 00-8.415-3.483c-6.533 0-11.85 5.316-11.853 11.85 0 2.088.543 4.128 1.574 5.954l-1.674 6.111 6.252-1.639a11.785 11.785 0 00 5.698 1.474h.005c6.533 0 11.85-5.316 11.853-11.85 0-3.166-1.233-6.142-3.465-8.376z" /></svg>
      </button>
    </div>
  );
}
