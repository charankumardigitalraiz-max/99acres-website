import { useSelector } from 'react-redux';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import PropertyCard from '../PropertyCard/PropertyCard';
import { ArrowR, ChevronL, ChevronR } from '../../data/icons';
import { SEARCH_TABS } from '../../data/constants';
import 'swiper/css';
import 'swiper/css/navigation';
import './PropertyListings.css';

export default function PropertyListings() {
  const { buyProperties, rentProperties } = useSelector(state => state.properties);
  const activeTab = useSelector(state => state.search.activeTab);

  const currentTabName = SEARCH_TABS[activeTab];

  // Decide which list to show based on search bar tab
  let propertiesToShow = [];
  let title = '';
  let sub = '';

  if (currentTabName === 'Buy' || currentTabName === 'New Projects') {
    propertiesToShow = buyProperties;
    title = 'Properties for Sale';
    sub = 'Handpicked exclusive properties for buyers';
  } else if (currentTabName === 'Rent') {
    propertiesToShow = rentProperties;
    title = 'Properties for Rent';
    sub = 'Verified, move-in ready homes';
  } else {
    propertiesToShow = buyProperties;
    title = 'Commercial Properties';
    sub = 'Premium office spaces and shops';
  }

  return (
    <section className="section" style={{ background: '#fff' }}>
      <div className="container">
        <div className="section-head">
          <div>
            <div className="section-label">{currentTabName}</div>
            <div className="section-title">{title}</div>
            <div className="section-sub">{sub}</div>
          </div>
          <div className="slider-controls">
            <button className="prop-prev-btn"><ChevronL /></button>
            <button className="prop-next-btn"><ChevronR /></button>
            <div className="divider-v"></div>
            <a href="#" className="view-all">View All <ArrowR /></a>
          </div>
        </div>

        <div className="carousel-wrapper">
          <Swiper
            modules={[Navigation]}
            spaceBetween={16}
            slidesPerView={1.2}
            navigation={{
              prevEl: '.prop-prev-btn',
              nextEl: '.prop-next-btn',
            }}
            breakpoints={{
              480: { slidesPerView: 2, spaceBetween: 16 },
              768: { slidesPerView: 3, spaceBetween: 20 },
              1024: { slidesPerView: 4, spaceBetween: 24 },
            }}
            className="listings-swiper"
          >
            {propertiesToShow.map(property => (
              <SwiperSlide key={property.id}>
                <PropertyCard property={property} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {propertiesToShow.length === 0 && (
          <div style={{ textAlign: 'center', padding: '40px 0', color: 'var(--text-3)' }}>
            No properties found for this category.
          </div>
        )}
      </div>
    </section>
  );
}
