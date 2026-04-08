import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { UPCOMING_PROJECTS } from '../../data/constants';
import './UpcomingProjects.css';
import { PinIco } from '../../data/icons';

export default function UpcomingProjects() {
  return (
    <section className="upcoming-projects-section">
      <div className="container">
        <div className="section-header">
          <div>
            <h2 className="section-title">Upcoming & Pre-Launch Projects</h2>
            <p className="section-subtitle">Be the first to invest in premium developments before launch.</p>
          </div>
          <div className="up-nav-btns">
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
          {UPCOMING_PROJECTS.map((proj) => (
            <SwiperSlide key={proj.id}>
              <div className="up-card">
                <div className="up-img-wrap">
                  <img src={proj.img} alt={proj.name} loading="lazy" />
                  <span className="up-status">{proj.status}</span>
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
