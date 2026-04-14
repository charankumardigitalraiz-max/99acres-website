import React from 'react';
import { useLocation, matchPath } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './SupportButton.css';

// Professional minimalist icons
const WhatsAppIco = () => (
  <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.436 9.889-9.886 9.889m8.415-18.3a11.815 11.815 0 00-8.415-3.483c-6.533 0-11.85 5.316-11.853 11.85 0 2.088.543 4.128 1.574 5.954l-1.674 6.111 6.252-1.639a11.785 11.785 0 00 5.698 1.474h.005c6.533 0 11.85-5.316 11.853-11.85 0-3.166-1.233-6.142-3.465-8.376z" />
  </svg>
);

const SupportButton = () => {
  const location = useLocation();
  const { buyProperties, rentProperties, landProperties, highRated, hydLocalities } = useSelector(
    (state) => state.properties
  );

  // Constants
  const WHATSAPP_NUMBER = '919381559642';
  const match = matchPath({ path: '/property/:id' }, location.pathname);
  const getWhatsAppLink = () => {
    // Check if we are on a property details page


    if (match) {
      const propertyId = match.params.id;
      const all = [...buyProperties, ...rentProperties, ...landProperties, ...highRated, ...hydLocalities];
      const property = all.find((p) => String(p.id) === String(propertyId));

      if (property) {
        const text = `Hi Sherla Properties, I'm interested in "${property.title}" in ${property.loc || property.location?.locality}. Please share more details and pricing.`;
        return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
      }
    }

    // Default Support Text
    const defaultText = `Hi Sherla Properties, I'm looking for some assistance with property services. Please connect me with a consultant.`;
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(defaultText)}`;
  };

  const handleWhatsAppClick = (e) => {
    e.preventDefault();
    window.open(getWhatsAppLink(), '_blank');
  };

  return (
    <div className={`support-wrapper ${match ? 'support-wrapper-property-page' : ''}`}>
      {/* FLOATING BUTTON (NOW DIRECT WHATSAPP) */}
      <button
        className="support-float-btn whatsapp-theme"
        onClick={handleWhatsAppClick}
        title="Chat on WhatsApp"
        aria-label="Direct WhatsApp Message"
      >
        <div className="btn-icon-wrap">
          <WhatsAppIco />
        </div>
      </button>
    </div>
  );
};

export default SupportButton;
