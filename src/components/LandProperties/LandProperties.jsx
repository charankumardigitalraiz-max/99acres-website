import { useSelector } from 'react-redux';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { ArrowR, ChevronL, ChevronR, PinIco } from '../../data/icons';
import { useDispatch } from 'react-redux';
import { toggleWishlist } from '../../store/slices/propertiesSlice';
import 'swiper/css';
import 'swiper/css/navigation';
import './LandProperties.css';

export default function LandProperties({ isSidebarOpen }) {
  const lands = useSelector(state => state.properties.landProperties);
  const wishlist = useSelector(state => state.properties.wishlist);
  const dispatch = useDispatch();

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
            modules={[Navigation]}
            spaceBetween={20}
            slidesPerView={2}
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
            {lands.map(land => {
              const isWished = wishlist.includes(land.id);
              return (
                <SwiperSlide key={land.id}>
                  <div className="land-card">
                    <div className="land-img-wrap">
                      <img src={land.img} alt={land.title} loading="lazy" />
                      <span className={`land-badge ${land.badgeClass}`}>{land.badge}</span>
                      <button
                        className="land-wish-btn"
                        onClick={() => dispatch(toggleWishlist(land.id))}
                      >
                        {isWished ? '❤️' : '🤍'}
                      </button>
                      <div className="land-type-tag">{land.type}</div>
                    </div>
                    <div className="land-info">
                      <div className="land-price">{land.price}</div>
                      <h3 className="land-title">{land.title}</h3>
                      <div className="land-loc"><PinIco /> {land.loc}</div>
                      <div className="land-meta">
                        <div className="land-meta-item">
                          <span className="land-meta-label">Area</span>
                          <span className="land-meta-value">{land.size}</span>
                        </div>
                        <div className="land-meta-sep"></div>
                        <div className="land-meta-item">
                          <span className="land-meta-label">Facing</span>
                          <span className="land-meta-value">{land.facing}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
