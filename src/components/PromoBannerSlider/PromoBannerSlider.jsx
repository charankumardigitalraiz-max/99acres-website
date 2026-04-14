import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import './PromoBannerSlider.css';

const BANNERS = [
  // {
  //   type: 'image',
  //   img: '/real_estate_banner_luxury_living_1776160444319.png',
  //   tag: 'Limited Edition',
  //   title: 'Luxury Living\nRedefined',
  //   sub: 'Experience the pinnacle of architecture and comfort in our latest villa collections.',
  //   cta: 'Explore Villas',
  //   accent: '#f59e0b'
  // },
  // {
  //   type: 'gradient',
  //   bg: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
  //   tag: 'Quick Seller',
  //   title: 'Selling Made\nEffortless',
  //   sub: 'List your property in under 5 minutes and get verified leads instantly.',
  //   cta: 'Post Property',
  //   accent: '#10b981'
  // },
  {
    type: 'image',
    img: '/banners/banner_highlight (1).png',
    fullImage: true, /* Hide code overlays and use full opacity for custom-made banners */
    tag: 'Smart Investment',
    title: 'Secure Your\nFinancial Future',
    sub: 'Handpicked high-yield commercial properties in emerging business hubs.',
    cta: 'View Analysis',
    accent: '#3b82f6'
  },
  {
    type: 'image',
    img: '/banners/banner_land (1).png',
    fullImage: true,
    tag: 'Premium Access',
    title: 'Unlock Verified\nGold Listings',
    sub: 'Access thousands of RERA-approved properties with 0% brokerage.',
    cta: 'Join Pro',
    accent: '#1e293b'
  }
];

export default function PromoBannerSlider({ isSidebarOpen }) {
  return (
    <section className={`promo-section ${isSidebarOpen ? 'sidebar-open' : ''}`}>
      <Swiper
        key={isSidebarOpen ? 'opened' : 'closed'}
        modules={[Pagination, Autoplay]}
        pagination={{ clickable: true }}
        autoplay={{ delay: 6000, disableOnInteraction: false }}
        loop
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
                {i + 1} / {BANNERS.length}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
