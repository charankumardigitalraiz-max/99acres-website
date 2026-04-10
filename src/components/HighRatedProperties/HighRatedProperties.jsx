import { useSelector } from 'react-redux';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import PropertyCard from '../PropertyCard/PropertyCard';
import { ArrowR, ChevronL, ChevronR } from '../../data/icons';
import 'swiper/css';
import 'swiper/css/navigation';
import './HighRatedProperties.css';

export default function HighRatedProperties({ isSidebarOpen }) {
  const highRated = useSelector(state => state.properties.highRated);

  return (
    <section className="section high-rated-section" style={{ background: '#f8fafc', borderTop: '1px solid var(--border)' }}>
      <div className="container">
        <div className="section-head">
          <div>
            <div className="section-label">Top Rated</div>
            <div className="section-title">Highest Rated Properties</div>
            <div className="section-sub">Properties loved by customers and highly reviewed</div>
          </div>
          <div className="slider-controls">
            <button className="slide-prev-btn"><ChevronL /></button>
            <button className="slide-next-btn"><ChevronR /></button>
            <div className="divider-v"></div>
            <a href="#" className="view-all">View All <ArrowR /></a>
          </div>
        </div>
        <div className="carousel-wrapper">
          <Swiper
            modules={[Navigation, Autoplay]}
            spaceBetween={20}
            slidesPerView={2}
            navigation={{
              prevEl: '.slide-prev-btn',
              nextEl: '.slide-next-btn',
            }}
            breakpoints={{
              640: { slidesPerView: 2.2, spaceBetween: 20 },
              1024: { slidesPerView: 3, spaceBetween: 24 },
              1280: { slidesPerView: isSidebarOpen ? 3 : 4, spaceBetween: 24 },
            }}
            className="rated-swiper"
          >
            {highRated.map(property => (
              <SwiperSlide key={property.id}>
                <PropertyCard property={property} variant="horizontal" />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
