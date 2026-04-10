import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import './PromoBannerSlider.css';
import 'swiper/css';
import 'swiper/css/pagination';
import { PROMO_BANNERS } from '../../data/constants';

export default function PromoBannerSlider({ isSidebarOpen }) {
  return (
    <section className={`section promo-section ${isSidebarOpen ? 'sidebar-open' : ''}`}>
      <div className="container">
        {/* Mount Check */}


        <Swiper
          key={isSidebarOpen ? 'opened' : 'closed'}
          modules={[Pagination, Autoplay]}
          pagination={{ clickable: true }}
          autoplay={{ delay: 6000, disableOnInteraction: false }}
          loop
          className="promo-swiper"
        >
          {PROMO_BANNERS.map((banner, i) => (
            <SwiperSlide key={i}>
              <div className="promo-slide">
                <img
                  src={banner.img}
                  alt={`Promo ${i + 1}`}
                  className="promo-image"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
