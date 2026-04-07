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
        <Swiper
          modules={[Pagination, Autoplay]}
          pagination={{ clickable: true }}
          autoplay={{ delay: 6000, disableOnInteraction: false }}
          loop
          className="promo-swiper"
        >
          {PROMO_BANNERS.map((banner, i) => (
            <SwiperSlide key={i}>
              <div
                className="promo-slide"
                style={{ backgroundImage: `url(${banner.img})` }}
              >
                <div className="promo-slide-overlay" />
                <div className="promo-slide-content">
                  <span
                    className="promo-tag"
                    style={{ background: banner.accent }}
                  >
                    {banner.tag}
                  </span>
                  <h2
                    className="promo-title"
                    style={{ whiteSpace: 'pre-line' }}
                  >
                    {banner.title}
                  </h2>
                  <p className="promo-sub">{banner.sub}</p>
                  <button
                    className="banner-cta"
                    style={{ background: banner.accent }}
                  >
                    {banner.cta} →
                  </button>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
