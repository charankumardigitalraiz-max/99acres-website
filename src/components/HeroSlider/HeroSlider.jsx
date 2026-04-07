import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectFade, Parallax } from 'swiper/modules';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import './HeroSlider.css';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import 'swiper/css/parallax';
import { SLIDES } from '../../data/constants';

export default function HeroSlider() {
  const [activeIdx, setActiveIdx] = useState(0);

  return (
    <div className="hero-swiper-wrap">
      <Swiper
        modules={[Navigation, Pagination, Autoplay, EffectFade, Parallax]}
        effect="fade"
        parallax={true}
        navigation={{
          prevEl: '.hero-prev',
          nextEl: '.hero-next',
        }}
        pagination={{
          clickable: true,
          renderBullet: (index, className) => {
            return `<span class="${className}"></span>`;
          }
        }}
        autoplay={{ delay: 6000, disableOnInteraction: false }}
        loop
        onSlideChange={(swiper) => setActiveIdx(swiper.realIndex)}
        className="hero-swiper"
      >
        {SLIDES.map((slide, i) => (
          <SwiperSlide key={i}>
            <div
              className="hero-slide"
              style={{ backgroundImage: `url(${slide.bg})` }}
            >
              <div className="hero-overlay">
                <div className="hero-content container">
                  <div className="hero-data-wrap">
                    <span
                      className="hero-tag"
                      data-swiper-parallax="-300"
                      data-swiper-parallax-opacity="0"
                    >
                      {slide.tag}
                    </span>
                    <h1
                      className="hero-title"
                      style={{ whiteSpace: 'pre-line' }}
                      data-swiper-parallax="-500"
                      data-swiper-parallax-duration="800"
                    >
                      {slide.title}
                    </h1>
                    <p
                      className="hero-sub"
                      data-swiper-parallax="-400"
                      data-swiper-parallax-duration="1000"
                    >
                      {slide.sub}
                    </p>
                    <div
                      className="hero-btns"
                      data-swiper-parallax="-600"
                      data-swiper-parallax-duration="1200"
                    >
                      <button className="btn-primary hero-btn">Explore Properties</button>
                      <button className="btn-ghost hero-btn">View Projects →</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}

        {/* Progress Bar */}
        <div className="hero-progress-wrap">
          <div className="hero-progress-bar" key={activeIdx}></div>
        </div>
      </Swiper>

      {/* Slide Counter */}
      <div className="hero-counter">
        <span className="current">{(activeIdx + 1).toString().padStart(2, '0')}</span>
        <span className="divider"></span>
        <span className="total">{SLIDES.length.toString().padStart(2, '0')}</span>
      </div>

      {/* Custom Navigation */}
      <button className="hero-nav-btn hero-prev" aria-label="Previous slide">
        <ChevronLeft size={24} strokeWidth={2.5} />
      </button>
      <button className="hero-nav-btn hero-next" aria-label="Next slide">
        <ChevronRight size={24} strokeWidth={2.5} />
      </button>
    </div>
  );
}
