import { useSelector } from 'react-redux';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { ArrowR, ChevronL, ChevronR } from '../../data/icons';
import PropertyCard from '../PropertyCard/PropertyCard';
import 'swiper/css';
import 'swiper/css/navigation';
import './Localities.css';

export default function Localities({ isSidebarOpen }) {
  const localities = useSelector(state => state.properties.hydLocalities);

  return (
    <section className="section section-localities">
      <div className="container">
        <div className="section-head">
          <div>
            <div className="section-label">Top Properties</div>
            <div className="section-title">Properties in Hyderabad</div>
            <div className="section-sub">Explore premium homes across the city's top areas</div>
          </div>
          <div className="slider-controls">
            <button className="loc-prev-btn"><ChevronL /></button>
            <button className="loc-next-btn"><ChevronR /></button>
            <div className="divider-v"></div>
            <a href="#" className="view-all">All Properties <ArrowR /></a>
          </div>
        </div>

        <div className="carousel-wrapper">
          <Swiper
            modules={[Navigation]}
            spaceBetween={20}
            slidesPerView={2}
            navigation={{
              prevEl: '.loc-prev-btn',
              nextEl: '.loc-next-btn',
            }}
            breakpoints={{
              480: { slidesPerView: 2.5, spaceBetween: 16 },
              768: { slidesPerView: 3.5, spaceBetween: 16 },
              1024: { slidesPerView: isSidebarOpen ? 3.5 : 4.5, spaceBetween: 20 },
              1280: { slidesPerView: isSidebarOpen ? 3.5 : 5.5, spaceBetween: 20 },
              1536: { slidesPerView: isSidebarOpen ? 4.5 : 6.5, spaceBetween: 24 },
            }}
            className="localities-swiper"
          >
            {localities.map(property => (
              <SwiperSlide key={property.id}>
                <div className="hyd-prop-card">
                  <div className="hyd-img-wrap">
                    <img src={property.img} alt={property.title} loading="lazy" />
                    <div className="hyd-area-tag">📍 {property.badge}</div>
                    <button className="hyd-wish-btn">🤍</button>
                  </div>
                  <div className="hyd-info-wrap">
                    <div className="hyd-price">{property.price}</div>
                    <h3 className="hyd-title">{property.title}</h3>
                    <div className="hyd-meta">
                      <span>{property.beds} Beds</span>
                      <span className="dot">•</span>
                      <span>{property.baths} Baths</span>
                      <span className="dot">•</span>
                      <span>{property.size}</span>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
