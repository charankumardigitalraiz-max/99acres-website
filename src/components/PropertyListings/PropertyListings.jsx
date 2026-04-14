import { useSelector } from 'react-redux';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import { Link } from 'react-router-dom';
import PropertyCard from '../PropertyCard/PropertyCard';
import { ArrowR, ChevronL, ChevronR } from '../../data/icons';
import 'swiper/css';
import 'swiper/css/navigation';
import './PropertyListings.css';

export default function PropertyListings({ isSidebarOpen }) {
  const { buyProperties, rentProperties } = useSelector(state => state.properties);
  const activeTab = useSelector(state => state.search.activeTab);

  // activeTab is now a string: 'Buy' | 'Rent' | 'Commercial'
  const currentTabName = activeTab || 'Buy';

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
            <div className="slider-nav-btns">
              <button className="prop-prev-btn"><ChevronL /></button>
              <button className="prop-next-btn"><ChevronR /></button>
              <div className="divider-v"></div>
            </div>
            <Link to="/plots-land-properties" className="view-all">View All <ArrowR /></Link>
          </div>
        </div>

        <div className="carousel-wrapper">
          <Swiper
            key={isSidebarOpen ? 'open' : 'closed'}
            modules={[Navigation, Autoplay]}
            spaceBetween={16}
            slidesPerView={1.2}
            navigation={{
              prevEl: '.prop-prev-btn',
              nextEl: '.prop-next-btn',
            }}
            pagination={{ clickable: true }}
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            loop
            breakpoints={{
              480: { slidesPerView: 2.2, spaceBetween: 16 },
              768: { slidesPerView: 2.5, spaceBetween: 20 },
              1024: { slidesPerView: isSidebarOpen ? 3 : 4, spaceBetween: 24 },
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
