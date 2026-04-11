import { useSelector } from 'react-redux';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { ArrowR, ChevronL, ChevronR } from '../../data/icons';
import PropertyCard from '../PropertyCard/PropertyCard';
import 'swiper/css';
import 'swiper/css/navigation';
import './LandProperties.css';

export default function LandProperties({ isSidebarOpen }) {
  const lands = useSelector(state => state.properties.landProperties);

  return (
    <section className="section land-section">
      <div className="container">
        <div className="section-head">
          <div>
            <div className="section-label">Plots & Land</div>
            <div className="section-title">Best Land Properties</div>
            <div className="section-sub">Premium plots, farmlands & commercial sites across India</div>
          </div>
          <div className="slider-controls">
            <button className="land-prev-btn"><ChevronL /></button>
            <button className="land-next-btn"><ChevronR /></button>
            <div className="divider-v"></div>
            <a href="#" className="view-all">View All <ArrowR /></a>
          </div>
        </div>

        <div className="carousel-wrapper">
          <Swiper
            key={isSidebarOpen ? 'opened' : 'closed'}
            modules={[Navigation]}
            spaceBetween={20}
            slidesPerView={1.2}
            navigation={{
              prevEl: '.land-prev-btn',
              nextEl: '.land-next-btn',
            }}
            breakpoints={{
              640: { slidesPerView: 2.2, spaceBetween: 20 },
              1024: { slidesPerView: 3, spaceBetween: 24 },
              1280: { slidesPerView: isSidebarOpen ? 3 : 4, spaceBetween: 24 },
              1536: { slidesPerView: isSidebarOpen ? 4 : 5, spaceBetween: 24 }
            }}
            className="land-swiper"
          >
            {lands.map(land => (
              <SwiperSlide key={land.id}>
                <PropertyCard property={land} variant="land" />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
