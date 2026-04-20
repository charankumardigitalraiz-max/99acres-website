import { useSelector } from 'react-redux';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
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
            <div className="slider-nav-btns">
              <button className="loc-prev-btn"><ChevronL /></button>
              <button className="loc-next-btn"><ChevronR /></button>
              <div className="divider-v"></div>
            </div>
            <a href="/high-rated-locality-properties" className="view-all">All Properties <ArrowR /></a>
          </div>
        </div>

        <div className="carousel-wrapper">
          <Swiper
            key={isSidebarOpen ? 'opened' : 'closed'}
            modules={[Navigation, Autoplay]}
            spaceBetween={20}
            slidesPerView={1.2}
            navigation={{
              prevEl: '.loc-prev-btn',
              nextEl: '.loc-next-btn',
            }}
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            loop
            breakpoints={{
              480: { slidesPerView: 2.2, spaceBetween: 16 },
              768: { slidesPerView: 2.5, spaceBetween: 20 },
              1024: { slidesPerView: isSidebarOpen ? 3 : 4, spaceBetween: 24 },
              1280: { slidesPerView: isSidebarOpen ? 3 : 5, spaceBetween: 15 },
              1536: { slidesPerView: isSidebarOpen ? 4 : 6, spaceBetween: 15 },
            }}
            className="localities-swiper"
          >
            {localities.map(property => (
              <SwiperSlide key={property.id}>
                <PropertyCard property={property} variant="localities" />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
