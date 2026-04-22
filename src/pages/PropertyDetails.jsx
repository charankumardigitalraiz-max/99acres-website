import { useState, useEffect, useRef, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { toggleWishlist } from '../store/slices/propertiesSlice';
import { shareProperty } from '../utils/share';
import { PinIco, BedIco, BathIco, AreaIco, SearchIco, ChevronL, IconCheckCircle, ArrowR, ChevronR } from '../data/icons';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import PropertyCard from '../components/PropertyCard/PropertyCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'swiper/css';
import 'swiper/css/navigation';
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

  const allPropertiesList = useMemo(() => {
    return [...buyProperties, ...rentProperties, ...highRated, ...landProperties, ...hydLocalities];
  }, [buyProperties, rentProperties, highRated, landProperties, hydLocalities]);

  const relatedProperties = useMemo(() => {
    if (!property) return [];
    return allPropertiesList
      .filter(p => p.id !== property.id && (p.city === property.city || p.propertyType === property.propertyType))
      .slice(0, 5); // Allow up to 5 for a nice row
  }, [allPropertiesList, property]);

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
        { icon: <PinIco />, label: 'Direction', value: property.direction || property.facing || 'East Facing' }
      ];
    }
    if (isCommercial) {
      return [
        { icon: <AreaIco />, label: 'Super Area', value: property.size },
        { icon: <BathIco />, label: 'Washrooms', value: property.baths || 'Private' },
        { icon: <SearchIco />, label: 'Furnishing', value: property.furnishingStatus || 'Bare Shell' },
        { icon: <PinIco />, label: 'Orientation', value: property.direction || 'Main Road' }
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
    <div className="min-h-screen bg-[#f8fafc] font-['Outfit',sans-serif] text-[#1e293b] pb-[60px]">
      {/* ─── NAVIGATION & ACTIONS BAR ─── */}
      <nav className="sticky top-0 z-[100] bg-white/90 backdrop-blur-md border-b border-[#f1f5f9] py-3.5 mb-8 shadow-sm">
        <div className="max-w-[1280px] mx-auto px-6 flex justify-between items-center text-sm">
          <div className="flex items-center gap-5">
            <button
              className="flex items-center justify-center w-8 h-8 rounded-full bg-[#f8fafc] border border-[#f1f5f9] text-[#64748b] hover:bg-amber-50 hover:text-amber-600 hover:border-amber-200 transition-all cursor-pointer group"
              onClick={() => navigate(-1)}
            >
              <ChevronL className="w-4 h-4 translate-x-[-1px]" />
            </button>
            <div className="flex items-center gap-2 font-bold tracking-tight">
              <span className="text-[#94a3b8] hover:text-amber-600 transition-colors uppercase text-[0.65rem] tracking-wider cursor-pointer" onClick={() => navigate('/')}>Home</span>
              <span className="text-[#cbd5e1] text-[0.6rem]">/</span>
              <span className="text-[#94a3b8] hover:text-amber-600 transition-colors uppercase text-[0.65rem] tracking-wider cursor-pointer">{isLand ? 'Land' : (isCommercial ? 'Commercial' : 'Residential')}</span>
              <span className="text-[#cbd5e1] text-[0.6rem]">/</span>
              <span className="text-[#0f172a] uppercase text-[0.65rem] tracking-wider truncate max-w-[200px]">{property.title}</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              className={`flex items-center gap-2 px-4 h-[36px] rounded-full border text-[0.75rem] font-bold transition-all cursor-pointer ${isWished ? 'bg-amber-50 border-amber-500 text-amber-600' : 'bg-white border-[#e2e8f0] text-[#475569] hover:border-amber-500 hover:text-amber-600'}`}
              onClick={() => dispatch(toggleWishlist(property.id))}
            >
              <svg viewBox="0 0 24 24" width="14" height="14" fill={isWished ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2.5">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
              {isWished ? 'Saved to Wishlist' : 'Save Property'}
            </button>

            <button
              className="flex items-center gap-2 px-4 h-[36px] rounded-full bg-[#0f172a] text-white text-[0.75rem] font-bold transition-all hover:bg-amber-600 hover:scale-105 active:scale-95 cursor-pointer shadow-lg shadow-black/10"
              onClick={() => shareProperty(property, setCopied)}
            >
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" /><line x1="8.59" y1="13.51" x2="15.42" y2="17.49" /><line x1="15.41" y1="6.51" x2="8.59" y2="10.49" /></svg>
              {copied ? 'Link Copied' : 'Share Now'}
            </button>
          </div>
        </div>
      </nav>
      <div className="max-w-[1280px] mx-auto px-6">
        {/* ─── HERO SECTION (BALANCED HEIGHT) ─── */}
        <section className="mb-10">
          <div className="grid grid-cols-[1.6fr_1fr] gap-6 items-stretch max-md:grid-cols-1">
            {/* Left: Gallery */}
            <div className="flex flex-col gap-4">
              <div className="relative h-[420px] rounded-2xl overflow-hidden shadow-[0_10px_30px_-5px_rgba(0,0,0,0.05)] bg-slate-200">
                <img
                  src={activeImage || property?.img}
                  alt={property?.title}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
                <div className="absolute top-5 left-5 flex gap-2.5">
                  <span className={`px-4 py-1.5 rounded-xl text-[0.75rem] font-bold uppercase tracking-wider backdrop-blur-md border border-white/10 shadow-lg text-white ${property.badge === 'New' ? 'bg-amber-500/90' : 'bg-[#0f172a]/90'}`}>
                    {property.badge || 'Featured'}
                  </span>
                  <span className="px-4 py-1.5 rounded-xl text-[0.75rem] font-bold uppercase tracking-wider backdrop-blur-md border border-white/10 shadow-lg text-white bg-emerald-600/90">
                    Verified
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-4 gap-4">
                {galleryImages.slice(0, 4).map((img, i) => (
                  <div
                    key={i}
                    className={`relative h-[100px] rounded-xl overflow-hidden cursor-pointer border-2 transition-all duration-300 ${activeImage === img ? 'border-amber-600 -translate-y-1 shadow-lg' : 'border-transparent hover:scale-105'}`}
                    onMouseEnter={() => setActiveImage(img)}
                  >
                    <img src={img} alt="thumb" className="w-full h-full object-cover" />
                    {i === 3 && galleryImages.length > 4 && (
                      <div className="absolute inset-0 bg-[#0f172a]/70 text-white flex items-center justify-center text-[0.9rem] font-bold backdrop-blur-[2px]">
                        +{galleryImages.length - 4} Photos
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Info Card */}
            <div className="flex flex-col">
              <div className="bg-white/95 p-8 rounded-[24px] shadow-[0_10px_40px_-10px_rgba(0,0,0,0.04),0_2px_4px_rgba(0,0,0,0.02)] border border-white/80 h-full flex flex-col relative overflow-hidden backdrop-blur-lg">
                <div className="absolute top-0 right-0 w-[150px] h-[150px] bg-[radial-gradient(circle_at_top_right,rgba(245,158,11,0.05),transparent_70%)] pointer-events-none" />

                <div className="flex items-baseline gap-2.5 mb-3">
                  <h1 className="text-[2.25rem] font-semibold text-[#0f172a] m-0 tracking-tighter">{property.price}</h1>
                  {property.pricing?.pricePerSqft && (
                    <span className="text-[#64748b] font-medium text-base opacity-80">₹{property.pricing.pricePerSqft.toLocaleString()}/sq.ft</span>
                  )}
                </div>

                <h2 className="text-[1.5rem] font-normal leading-[1.3] mb-1.5 text-[#0f172a] tracking-tight">{property.title}</h2>
                <div className="flex items-center gap-2 text-[#64748b] text-[0.95rem] mb-2.5 font-normal">
                  <PinIco /> {property.location?.fullAddress || property.loc}
                </div>

                <div className="flex items-center gap-2 mb-4">
                  <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-600 text-[0.65rem] font-bold uppercase tracking-wider border border-emerald-100">
                    <IconCheckCircle size={12} /> Market Price Trend: +8.5%
                  </div>
                  <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-50 text-amber-600 text-[0.65rem] font-bold uppercase tracking-wider border border-amber-100">
                    <SearchIco className="w-3 h-3" /> High Demand Area
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-5 py-6 border-y border-black/5 mb-2.5">
                  {highlights.map((h, i) => (
                    <div className="flex items-center gap-1.5" key={i}>
                      <div className="text-amber-600 w-6 h-6 opacity-70 shrink-0">{h.icon}</div>
                      <div className="flex flex-col">
                        <strong className="text-[1.1rem] text-[#0f172a] font-medium mb-0.5 leading-none">{h.value}</strong>
                        <span className="text-[0.75rem] uppercase tracking-wider text-[#64748b] font-medium opacity-70">{h.label}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col mt-2.5 space-y-2">
                  <div className="flex justify-between items-center text-[0.9rem]">
                    <span className="text-[#64748b]">Availability:</span>
                    <strong className="text-[#0f172a] font-medium">{property.availabilityStatus || (isLand ? 'Ready for Registry' : 'Ready to move')}</strong>
                  </div>
                  <div className="flex justify-between items-center text-[0.9rem]">
                    <span className="text-[#64748b]">Orientation:</span>
                    <strong className="text-[#0f172a] font-medium">{property.direction || property.facing || 'Open View'}</strong>
                  </div>
                  {!isLand && (
                    <div className="flex justify-between items-center text-[0.9rem]">
                      <span className="text-[#64748b]">Property Age:</span>
                      <strong className="text-[#0f172a] font-medium">{property.age || '0-1 Years'}</strong>
                    </div>
                  )}
                </div>

                <div className="flex gap-3 mt-auto pt-6">
                  <button
                    className="flex-[2] bg-[#0f172a] text-white border-none py-3.5 px-6 rounded-xl font-bold text-[0.9rem] flex items-center justify-center gap-2.5 cursor-pointer transition-all duration-300 hover:bg-amber-600 hover:translate-y-[-2px] hover:shadow-lg active:scale-95"
                    onClick={() => window.open(`https://wa.me/${property.lawyerDetails?.mobile?.replace(/\D/g, '') || '919876543210'}?text=Hi, I'm interested in ${property.title}. Please provide more details.`, '_blank')}
                  >
                    Contact Expert Advisor
                  </button>
                  <button
                    className={`flex-1 py-3.5 px-3 rounded-xl border border-[#e2e8f0] bg-white flex items-center justify-center gap-1.5 font-bold text-[0.85rem] cursor-pointer transition-all duration-200 hover:bg-[#f8fafc] hover:border-amber-500 hover:text-amber-600 ${isWished ? 'bg-amber-50 border-amber-500 text-amber-600' : 'text-[#475569]'}`}
                    onClick={() => dispatch(toggleWishlist(property.id))}
                  >
                    <svg viewBox="0 0 24 24" width="16" height="16" fill={isWished ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2.5">
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                    </svg>
                    {isWished ? 'Saved' : 'Wishlist'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── MAIN CONTENT AREA (TWO COLUMNS) ─── */}
        <div className="mt-10">
          {/* LEFT COLUMN: EXHAUSTIVE DETAILS */}
          <div className="columns-2 gap-4 max-lg:columns-1">
            <section className="break-inside-avoid mb-4 bg-white p-6 rounded-2xl border border-[#e2e8f0]">
              <h3 className="text-[1.15rem] font-semibold mb-4 relative pl-3 before:content-[''] before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-1 before:h-5 before:bg-amber-600 before:rounded-full">Overview</h3>
              <p className="leading-relaxed text-[#64748b] text-[1.1rem]">
                {isLand ? (
                  <>
                    Explore this premium <strong className="text-[#0f172a]">{property.propertyType}</strong> located in the strategically connected area of <strong className="text-[#0f172a]">{property.location?.locality || property.loc}</strong>.
                    Perfect for investment or building your dream project, this land offers excellent potential.
                    Positioned near <strong className="text-[#0f172a]">{property.location?.landmark || 'major hubs'}</strong>, it ensures unmatched connectivity and growth opportunities.
                    {property.direction && ` The plot is ${property.direction} facing.`}
                  </>
                ) : (
                  <>
                    Experience luxury living in this premium <strong className="text-[#0f172a]">{property.propertyType}</strong> located in the heart of <strong className="text-[#0f172a]">{property.location?.locality || property.loc}</strong>.
                    {property.furnishingStatus === 'Fully Furnished' && ' This home comes with bespoke interiors and high-end furniture, ready for immediate occupation.'}
                    Positioned strategically near <strong className="text-[#0f172a]">{property.location?.landmark || 'major hubs'}</strong>, it offers unmatched connectivity and a serene environment.
                    {property.direction && ` The property is ${property.direction} facing, ensuring optimal natural light and ventilation.`}
                  </>
                )}
              </p>
            </section>

            {videoId && (
              <section className="break-inside-avoid mb-4 bg-white p-6 rounded-2xl border border-[#e2e8f0]">
                <h3 className="text-[1.15rem] font-semibold mb-4 relative pl-3 before:content-[''] before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-1 before:h-5 before:bg-amber-600 before:rounded-full">Video Tour</h3>
                <div className="aspect-video rounded-xl overflow-hidden bg-black shadow-lg">
                  <iframe
                    src={`https://www.youtube.com/embed/${videoId}`}
                    title="Tour"
                    className="w-full h-full border-none"
                    allowFullScreen
                  ></iframe>
                </div>
              </section>
            )}

            <section className="break-inside-avoid mb-4 bg-white p-6 rounded-2xl border border-[#e2e8f0]">
              <h3 className="text-[1.15rem] font-semibold mb-4 relative pl-3 before:content-[''] before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-1 before:h-5 before:bg-amber-600 before:rounded-full">Amenities & Features</h3>
              <div className="grid grid-cols-2 gap-4">
                {(property.amenities || []).map(a => (
                  <div key={a} className="flex items-center gap-3 font-medium text-[1rem] group">
                    <span className="flex items-center justify-center w-11 h-11 rounded-full bg-[#f1f5f9] text-amber-600 transition-all duration-300 group-hover:bg-amber-600 group-hover:text-white group-hover:scale-105">
                      <AmenityIcon name={a} />
                    </span>
                    <span className="capitalize">{a}</span>
                  </div>
                ))}
              </div>
            </section>

            <section className="break-inside-avoid mb-4 bg-white p-6 rounded-2xl border border-[#e2e8f0]">
              <h3 className="text-[1.15rem] font-semibold mb-4 relative pl-3 before:content-[''] before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-1 before:h-5 before:bg-amber-600 before:rounded-full">Location & Connectivity</h3>
              <div className="flex flex-col gap-4">
                <div className="w-full h-[250px] rounded-xl overflow-hidden border border-[#e2e8f0] relative z-1 shadow-sm">
                  {property.location?.coordinates ? (
                    <MapContainer
                      center={[property.location.coordinates.lat, property.location.coordinates.lng]}
                      zoom={14}
                      scrollWheelZoom={false}
                      className="h-full w-full"
                    >
                      <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                      />
                      <Marker position={[property.location.coordinates.lat, property.location.coordinates.lng]}>
                        <Popup>
                          <strong>{property.title}</strong>
                        </Popup>
                      </Marker>
                      {property.locationAdvantages?.filter(adv => adv.lat).map((adv, idx) => (
                        <Marker key={idx} position={[adv.lat, adv.lng]}>
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
                      className="w-full h-full border-0"
                      allowFullScreen
                    ></iframe>
                  )}
                </div>
                {property.locationAdvantages && property.locationAdvantages.length > 0 && (
                  <div className="bg-[#f8fafc] p-6 rounded-xl border border-[#e2e8f0]">
                    <h4 className="text-[0.8rem] font-black text-[#94a3b8] uppercase tracking-[0.15em] mb-4">Nearby Connectivity</h4>
                    <div className="flex flex-wrap gap-2">
                      {property.locationAdvantages.map((adv, idx) => {
                        const name = typeof adv === 'string' ? adv : adv.name;
                        return (
                          <div key={idx} className="flex items-center gap-2 px-3 py-2 bg-white border border-[#e2e8f0] rounded-lg shadow-sm transition-all hover:bg-amber-50 hover:border-amber-200">
                            <span className="text-amber-600">
                              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 22s-8-4.5-8-11.8A8 8 0 0 1 12 2a8 8 0 0 1 8 8.2c0 7.3-8 11.8-8 11.8z" /><circle cx="12" cy="10" r="3" /></svg>
                            </span>
                            <span className="text-[0.8rem] font-bold text-[#475569]">{name}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </section>

            {property.ownershipProofs && Object.keys(property.ownershipProofs).length > 0 && (
              <section className="break-inside-avoid mb-4 bg-white p-6 rounded-2xl border border-[#e2e8f0]">
                <h3 className="text-[1.15rem] font-semibold mb-4 relative pl-3 before:content-[''] before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-1 before:h-5 before:bg-amber-600 before:rounded-full">Ownership Proofs</h3>
                <div className="flex flex-wrap gap-4">
                  {Object.entries(property.ownershipProofs).map(([key, url]) => (
                    <div className="w-[90px] flex flex-col items-center gap-2 cursor-pointer group" key={key}>
                      <div className="w-[90px] h-[90px] rounded-xl overflow-hidden border border-[#e2e8f0] relative">
                        <img src={url} alt={key} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
                      </div>
                      <div className="text-[0.75rem] font-semibold text-[#64748b] text-center leading-tight capitalize">
                        {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {property.lawyerDetails && (
              <section className="break-inside-avoid mb-4 bg-white p-6 rounded-2xl border border-[#e2e8f0]">
                <h3 className="text-[1.15rem] font-semibold mb-4 relative pl-3 before:content-[''] before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-1 before:h-5 before:bg-amber-600 before:rounded-full">Legal Advisor</h3>
                <div className="p-4 bg-[#fdfdfd] border border-[#e2e8f0] rounded-xl transition-all hover:border-amber-600 hover:shadow-sm">
                  <h4 className="text-[1.05rem] font-semibold text-[#0f172a] mb-3 flex items-center gap-2">{property.lawyerDetails.name}</h4>
                  <p className="flex items-center gap-2.5 text-[0.95rem] text-[#64748b] mb-2.5">
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#d97706" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
                    {property.lawyerDetails.mobile}
                  </p>
                  <p className="flex items-center gap-2.5 text-[0.95rem] text-[#64748b]">
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#d97706" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
                    {property.lawyerDetails.email}
                  </p>
                </div>
              </section>
            )}
            {/* ─── RELATED PROPERTIES SECTION ─── */}

          </div>

        </div>
        {relatedProperties.length > 0 && (
          <section className="mt-10 pt-5 border-t border-[#f1f5f9]">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-3.5">
              <div className="flex flex-col gap-2">
                <span className="text-amber-600 text-[0.7rem] font-bold uppercase tracking-[0.2em]">Curated for You</span>
                <h3 className="text-[1.8rem] font-bold text-[#0f172a] m-0 tracking-tight">Properties You May Also Like</h3>
                <p className="text-[#64748b] text-[0.95rem] font-medium">Handpicked listings from <span className="text-[#0f172a]">{property.city}</span> based on your interests.</p>
              </div>
            </div>

            <div className="relative mx-[-10px]">
              {/* Floating Navigation Buttons */}
              <button className="rel-prev-btn absolute left-[-22px] top-1/2 -translate-y-1/2 w-11 h-11 rounded-full border border-slate-200 bg-white flex items-center justify-center text-[#0f172a] transition-all duration-300 hover:bg-[#0f172a] hover:text-white hover:border-[#0f172a] hover:scale-110 disabled:opacity-0 disabled:pointer-events-none z-30 shadow-[0_4px_15px_rgba(0,0,0,0.1)] cursor-pointer">
                <ChevronL className="w-5 h-5" />
              </button>
              <button className="rel-next-btn absolute right-[-22px] top-1/2 -translate-y-1/2 w-11 h-11 rounded-full border border-slate-200 bg-white flex items-center justify-center text-[#0f172a] transition-all duration-300 hover:bg-[#0f172a] hover:text-white hover:border-[#0f172a] hover:scale-110 disabled:opacity-0 disabled:pointer-events-none z-30 shadow-[0_4px_15px_rgba(0,0,0,0.1)] cursor-pointer">
                <ChevronR className="w-5 h-5" />
              </button>


              <Swiper
                modules={[Navigation, Autoplay]}
                spaceBetween={24}
                slidesPerView={1.2}
                autoplay={{ delay: 5000, disableOnInteraction: false, pauseOnMouseEnter: true }}
                navigation={{
                  prevEl: '.rel-prev-btn',
                  nextEl: '.rel-next-btn',
                }}
                breakpoints={{
                  640: { slidesPerView: 2.2 },
                  1024: { slidesPerView: 3 },
                  1280: { slidesPerView: 5 },
                }}
                className="!p-1.5"
              >
                {relatedProperties.map(p => (
                  <SwiperSlide key={p.id}>
                    <PropertyCard property={p} variant="vertical" />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            <div className="mt-12 text-center relative z-10">
              <button
                type="button"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full border border-[#e2e8f0] text-[0.85rem] font-bold text-[#475569] hover:bg-white hover:border-amber-500 hover:text-amber-600 hover:shadow-md transition-all group cursor-pointer relative z-20"
                onClick={() => navigate(`/city/${property.city}`)}
              >
                <span className="pointer-events-none select-none">View All in {property.city}</span>
                <ArrowR className="w-4 h-4 transition-transform group-hover:translate-x-1 pointer-events-none" />
              </button>
            </div>
          </section>
        )}
        {/* FLOATING WHATSAPP BUTTON (Optional / Removed legacy for now) */}
      </div>
    </div >
  );
}
