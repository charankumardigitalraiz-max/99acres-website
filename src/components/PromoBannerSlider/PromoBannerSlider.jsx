import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import './PromoBannerSlider.css';
import 'swiper/css';
import 'swiper/css/pagination';
import { PROMO_BANNERS } from '../../data/constants';

export default function PromoBannerSlider() {
  return (
    <section className="section" style={{ paddingTop: 0, paddingBottom: 0 }}>
      <div className="container">
        {/* Mount Check */}


        <Swiper
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
