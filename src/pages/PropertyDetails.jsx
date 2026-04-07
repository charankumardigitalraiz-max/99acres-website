import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { toggleWishlist } from '../store/slices/propertiesSlice';
import { shareProperty } from '../utils/share';
import { PinIco, BedIco, BathIco, AreaIco } from '../data/icons';
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
    // Search for property in all data sources
    const all = [
      ...buyProperties,
      ...rentProperties,
      ...highRated,
      ...landProperties,
      ...hydLocalities,
    ];
    const found = all.find((p) => String(p.id) === String(id));
    setProperty(found);
    if (found) {
      setActiveImage(found.coverPhoto || found.img);
    }
    window.scrollTo(0, 0);
  }, [id, buyProperties, rentProperties, highRated, landProperties, hydLocalities]);

  if (!property) {
    return (
      <div className="details-loading">
        <div className="spinner"></div>
        <p>Loading premium property details...</p>
        <button onClick={() => navigate('/properties')} className="btn-back-home">
          Back to Listings
        </button>
      </div>
    );
  }

  const isWished = wishlist.includes(property.id);

  // Helper to get gallery images from smartAlbum or property images
  const getGalleryImages = () => {
    if (property.smartAlbum) {
      return Object.values(property.smartAlbum).flat();
    }
    return property.images || [];
  };

  const galleryImages = getGalleryImages();

  // Helper to get YouTube Video ID
  const getYouTubeID = (url) => {
    if (!url) return null;
    const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|v\/|user\/\S+|live\/))([\w-]{11})/);
    return match ? match[1] : null;
  };

  const videoId = getYouTubeID(property.video);

  return (
    <div className="property-details-page">
      {/* ─── HEADER NAVIGATION ─────────────────────────────── */}
      <div className="details-header-nav">
        <div className="container nav-row">
          <button className="btn-back-v8" onClick={() => navigate(-1)} aria-label="Go back">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="15 18 9 12 15 6" /></svg>
            <span>Back to search</span>
          </button>
          <div className="nav-actions">
            <button
              className={`btn-icon-nav ${isWished ? 'active' : ''}`}
              onClick={() => dispatch(toggleWishlist(property.id))}
            >
              {isWished ? '❤️' : '🤍'}
            </button>
            <button className="btn-icon-nav" onClick={() => shareProperty(property, setCopied)}>
              {copied ? '✅' : '🔗'}
            </button>
          </div>
        </div>
      </div>

      {/* ─── HERO SECTION ──────────────────────────────────── */}
      <div className="details-hero">
        <div className="container">
          <div className="hero-top-row">
            {/* Left Column: Cover Image & Sub-Gallery */}
            <div className="hero-images-column">
              {/* Main Cover Image */}
              <div className="main-img-wrap">
                <img src={activeImage} alt={property.title} />
                <div className="hero-badges">
                  <span className={`badge-v8 ${property.badgeClass || 'new'}`}>{property.badge}</span>
                  <span className="badge-v8 verified">
                    <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" /></svg>
                    {property.status === 'verified' ? '100% Verified' : 'Under Review'}
                  </span>
                </div>
              </div>

              {/* Sub-Gallery Below Cover Image */}
              <div className="sub-gallery-row" style={{ marginTop: '16px', marginBottom: 0 }}>
                <div className="sub-gallery-grid">
                  {galleryImages.slice(0, 5).map((img, idx) => (
                    <div
                      key={idx}
                      className={`sub-gallery-item ${activeImage === img ? 'active-thumb' : ''}`}
                      onMouseEnter={() => setActiveImage(img)}
                    >
                      <img src={img} alt={`${property.title} view ${idx + 1}`} />
                    </div>
                  ))}
                  {galleryImages.length === 0 && (
                    <p className="no-images-text">No additional photos available</p>
                  )}
                </div>
              </div>
            </div>

            {/* Right Column: Info Card */}
            <div className="hero-info-column">
              <div className="info-card-main" style={{ marginBottom: 0, height: '100%' }}>
                <div className="price-row">
                  <h1 className="main-price">{property.price}</h1>
                  {property.pricing?.pricePerSqft && (
                    <span className="price-avg">₹ {property.pricing.pricePerSqft.toLocaleString()}/sq.ft</span>
                  )}
                </div>
                <h2 className="main-title">{property.title}</h2>
                <div className="main-loc">
                  <PinIco /> {property.location?.fullAddress || property.loc}
                </div>

                <div className="specs-row-v8">
                  {property.beds > 0 && (
                    <div className="spec-item">
                      <div className="spec-icon"><BedIco /></div>
                      <div className="spec-info">
                        <strong>{property.beds} BHK</strong>
                        <span>Bedrooms</span>
                      </div>
                    </div>
                  )}
                  {property.baths > 0 && (
                    <div className="spec-item">
                      <div className="spec-icon"><BedIco /></div>
                      <div className="spec-info">
                        <strong>{property.baths} Bath</strong>
                        <span>Bathrooms</span>
                      </div>
                    </div>
                  )}
                  <div className="spec-item">
                    <div className="spec-icon"><AreaIco /></div>
                    <div className="spec-info">
                      <strong>{property.size}</strong>
                      <span>{property.propertyType === 'Plots' ? 'Plot Area' : 'Super Area'}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ─── MAIN CONTENT ──────────────────────────────────── */}
      <div className="details-main-section">
        <div className="container">
          <div className="details-content-full">
            {/* Essential Info */}


            {/* Property Breakdown Section */}
            <div className="details-section-v8">
              <h3 className="section-title-v8">Property Highlights</h3>
              <div className="property-meta-grid">
                <div className="meta-item"><strong>Type:</strong> {property.propertyType}</div>
                <div className="meta-item"><strong>Status:</strong> {property.availabilityStatus || 'Ready to move'}</div>
                <div className="meta-item"><strong>Facing:</strong> {property.direction || 'North'}</div>
                <div className="meta-item"><strong>Furnishing:</strong> {property.furnishingStatus || 'Unfurnished'}</div>
                {property.availableFrom && <div className="meta-item"><strong>Avail. From:</strong> {property.availableFrom}</div>}
                {property.pricing?.maintenanceCharges > 0 && <div className="meta-item"><strong>Maintenance:</strong> ₹ {property.pricing.maintenanceCharges.toLocaleString()}/mo</div>}
                {property.pricing?.negotiable !== undefined && <div className="meta-item"><strong>Price:</strong> {property.pricing.negotiable ? 'Negotiable' : 'Fixed'}</div>}
              </div>
              <p className="description-text">
                Explore this premium {property.propertyType} in {property.location?.locality}.
                {property.furnishingStatus === 'Fully Furnished' ? ' This home is ready to occupy with high-end furniture. ' : ''}
                Located near {property.location?.landmark}, it offers prime connectivity and {property.direction} facing alignment for abundance of sunlight.
              </p>
            </div>

            {/* Virtual Tour (Video) Section */}
            {videoId && (
              <div className="details-section-v8">
                <h3 className="section-title-v8">Virtual Property Tour</h3>
                <div className="video-container">
                  <iframe
                    width="100%"
                    height="100%"
                    src={`https://www.youtube.com/embed/${videoId}`}
                    title="Property Video Tour"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            )}

            {/* Categorized Full Gallery */}
            {property.smartAlbum && Object.keys(property.smartAlbum).length > 0 && (
              <div className="details-section-v8">
                <h3 className="section-title-v8">Full Property Gallery</h3>
                <div className="category-gallery-wrapper">
                  {Object.entries(property.smartAlbum).map(([category, images]) => (
                    <div key={category} className="category-gallery-section">
                      <h4 className="category-title">{category}</h4>
                      <div className="category-images-grid">
                        {images.map((img, idx) => (
                          <div key={idx} className="category-image-item">
                            <img src={img} alt={`${category} view ${idx + 1}`} />
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Amenities Section */}
            {property.amenities && property.amenities.length > 0 && (
              <div className="details-section-v8">
                <h3 className="section-title-v8">World-Class Amenities</h3>
                <div className="amenities-grid">
                  {property.amenities.map(item => (
                    <div key={item} className="amenity-item">
                      <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><circle cx="12" cy="12" r="4" /></svg>
                      {item.charAt(0).toUpperCase() + item.slice(1)}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Location Advantages */}
            {property.locationAdvantages && property.locationAdvantages.length > 0 && (
              <div className="details-section-v8">
                <h3 className="section-title-v8">Location Connectivity</h3>
                <div className="advantages-list">
                  {property.locationAdvantages.map(adv => (
                    <div key={adv} className="adv-item">
                      <span className="adv-check">✓</span> {adv}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

