import { useSelector } from 'react-redux';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { ArrowR, ChevronL, ChevronR } from '../../data/icons';
import 'swiper/css';
import 'swiper/css/navigation';
import './Cities.css';

export default function Cities({ isSidebarOpen }) {
  const cities = useSelector(state => state.properties.cities);

  return (
    <section className="section">
      <div className="container">
        <div className="section-head">
          <div>
            <div className="section-label">Explore Cities</div>
            <div className="section-title">Top Real Estate Markets</div>
          </div>
          <div className="slider-controls">
            <button className="city-prev-btn"><ChevronL /></button>
            <button className="city-next-btn"><ChevronR /></button>
            <div className="divider-v"></div>
            <a href="#" className="view-all">All Cities <ArrowR /></a>
          </div>
        </div>

        <div className="carousel-wrapper">
          <Swiper
            key={isSidebarOpen ? 'open' : 'close'}
            modules={[Navigation]}
            spaceBetween={16}
            slidesPerView={2.2}
            navigation={{
              prevEl: '.city-prev-btn',
              nextEl: '.city-next-btn',
            }}
            breakpoints={{
              480: { slidesPerView: 3.2, spaceBetween: 16 },
              768: { slidesPerView: 4.2, spaceBetween: 20 },
              1024: { slidesPerView: 5.2, spaceBetween: 20 },
              1280: { slidesPerView: isSidebarOpen ? 5 : 6, spaceBetween: 24 },
              1536: { slidesPerView: isSidebarOpen ? 6 : 7, spaceBetween: 20 },
              // 1280: { slidesPerView: isSidebarOpen ? 3 : 4, spaceBetween: 24 },
            }}
            className="cities-swiper"
          >
            {cities.map(city => (
              <SwiperSlide key={city.name}>
                <div className="city-card">
                  <img src={city.img} alt={city.name} loading="lazy" />
                  <div className="city-overlay">
                    <div className="city-name">{city.name}</div>
                    <div className="city-count">{city.count} properties</div>
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
