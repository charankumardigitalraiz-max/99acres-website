import { useState, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import './PromoBannerSlider.css';

const BANNERS = [
  {
    type: 'image',
    img: '/banners/luxury_living_v1.png',
    fullImage: true,
  },
  {
    type: 'image',
    img: '/banners/smart_investment_v1.png',
    fullImage: true,
  }
];

export default function PromoBannerSlider({ isSidebarOpen }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const progressCircle = useRef(null);
  const progressContent = useRef(null);

  const onAutoplayTimeLeft = (s, time, progress) => {
    if (progressCircle.current) {
      progressCircle.current.style.setProperty('--progress', 1 - progress);
    }
  };

  return (
    <section className={`promo-section ${isSidebarOpen ? 'sidebar-open' : ''}`}>
      <Swiper
        key={isSidebarOpen ? 'opened' : 'closed'}
        modules={[Pagination, Autoplay]}
        pagination={{ clickable: true }}
        autoplay={{ delay: 6000, disableOnInteraction: false }}
        loop
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        onAutoplayTimeLeft={onAutoplayTimeLeft}
        className="promo-swiper"
      >
        {BANNERS.map((banner, i) => (
          <SwiperSlide key={i}>
            <div className={`promo-slide ${banner.type === 'gradient' ? 'promo-slide--gradient' : ''} ${banner.fullImage ? 'promo-slide--full' : ''}`}
              style={banner.type === 'gradient' ? { background: banner.bg } : {}}>

              {banner.type === 'image' && (
                <img
                  src={banner.img}
                  alt={banner.title}
                  className="promo-image"
                  style={banner.fullImage ? { opacity: 1 } : {}}
                />
              )}

              <div className="promo-slide-overlay" style={banner.fullImage ? { display: 'none' } : {}} />

              {/* Featured Badge Removed for pure visual mode */}
              
              {!banner.fullImage && (
                <div className="promo-slide-content">
                  <div className="promo-text-group">
                    {banner.tag && <span className="promo-tag">{banner.tag}</span>}
                    <h2 className="promo-title">{banner.title.replace('\n', ' ')}</h2>
                  </div>

                  <button
                    className="banner-cta"
                    style={{ background: banner.accent }}
                  >
                    {banner.cta}
                  </button>
                </div>
              )}

              <div className="promo-counter">
                {activeIndex + 1} / {BANNERS.length}
              </div>

              {/* Bottom Progress Bar */}
              <div className="promo-progress-wrap">
                <div className="promo-progress-bar" ref={progressCircle}></div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
