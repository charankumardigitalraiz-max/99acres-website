import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleWishlist } from '../../store/slices/propertiesSlice';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { UPCOMING_PROJECTS } from '../../data/constants';
import './UpcomingProjects.css';
import { PinIco, ArrowR } from '../../data/icons';
import { Link, useNavigate } from 'react-router-dom';
import { shareProperty } from '../../utils/share';

const HeartIco = ({ isWished, size = 14 }) => (
  <svg
    viewBox="0 0 24 24"
    width={size}
    height={size}
    fill={isWished ? "#ef4444" : "none"}
    stroke={isWished ? "#ef4444" : "currentColor"}
    strokeWidth="2.5"
    style={{ transition: 'all 0.3s ease' }}
  >
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const wishlist = useSelector(state => state.properties.wishlist);
  const [copiedId, setCopiedId] = useState(null);

  const handleWish = (e, id) => {
    e.stopPropagation();
    dispatch(toggleWishlist(id));
  };

  const handleShare = (e, proj) => {
    e.stopPropagation();
    shareProperty(proj, (val) => setCopiedId(val ? proj.id : null));
  };

  return (
    <section className="upcoming-projects-section">
      <div className="container">
        <div className="section-header">
          <div>
            <h2 className="section-title">Upcoming & Pre-Launch Projects</h2>
            <p className="section-subtitle">Be the first to invest in premium developments before launch.</p>
          </div>
          <div className="up-nav-btns">
            <Link to="/upcoming-projects" className="view-all-link">View All <ArrowR /></Link>
            <div className="divider-v"></div>
            <button className="swiper-btn-prev-up"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6"></polyline></svg></button>
            <button className="swiper-btn-next-up"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"></polyline></svg></button>
          </div>
        </div>

        <Swiper
          modules={[Navigation]}
          navigation={{
            prevEl: '.swiper-btn-prev-up',
            nextEl: '.swiper-btn-next-up',
          }}
          spaceBetween={20}
          slidesPerView={1.2}
          breakpoints={{
            576: { slidesPerView: 2.2 },
            768: { slidesPerView: 3.2 },
            1024: { slidesPerView: 4 },
          }}
          className="upcoming-swiper"
        >
          {UPCOMING_PROJECTS.map((proj) => {
            const isWished = wishlist.includes(proj.id);
            return (
              <SwiperSlide key={proj.id}>
                <div className="up-card" onClick={() => navigate(`/property/${proj.id}`)} style={{ cursor: 'pointer' }}>
                  <div className="up-img-wrap">
                    <img src={proj.img} alt={proj.name} loading="lazy" />
                    <span className="up-status">{proj.status}</span>
                    <button className="up-wish-btn" onClick={(e) => handleWish(e, proj.id)}>
                      <HeartIco isWished={isWished} size={14} />
                    </button>
                    <button className="up-share-btn" onClick={(e) => handleShare(e, proj)}>
                      {copiedId === proj.id ? '✅' : <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="13" height="13"><circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" /><line x1="8.59" y1="13.51" x2="15.42" y2="17.49" /><line x1="15.41" y1="6.51" x2="8.59" y2="10.49" /></svg>}
                    </button>
                  </div>
                <div className="up-body">
                  <div className="up-dev">{proj.developer}</div>
                  <h3 className="up-name">{proj.name}</h3>
                  <div className="up-loc"><PinIco /> {proj.loc}</div>

                  <div className="up-meta">
                    <div className="up-info">
                      <span className="up-label">Type</span>
                      <span className="up-val">{proj.type}</span>
                    </div>
                    <div className="up-info">
                      <span className="up-label">Launch</span>
                      <span className="up-val">{proj.launch}</span>
                    </div>
                  </div>

                  <div className="up-bottom">
                    <div className="up-price">{proj.price}</div>
                    <button className="up-btn">Enquire</button>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
