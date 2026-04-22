import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectFade, Parallax } from 'swiper/modules';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import 'swiper/css/parallax';
import { SLIDES } from '../../../data/constants';

export default function HeroSlider() {
  const [activeIdx, setActiveIdx] = useState(0);

  return (
    <div className="relative group/wrap">
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
          el: '.hero-dots',
          renderBullet: (index, className) => {
            return `<span class="${className} !w-[30px] !h-[3px] !rounded-none !bg-white/30 !opacity-100 !m-0 !transition-all duration-300 [&.swiper-pagination-bullet-active]:!bg-amber-500 [&.swiper-pagination-bullet-active]:!w-[50px]"></span>`;
          }
        }}
        autoplay={{ delay: 6000, disableOnInteraction: false }}
        loop
        onSlideChange={(swiper) => setActiveIdx(swiper.realIndex)}
        className="w-full h-[440px] sm:h-[480px] lg:h-[600px] overflow-hidden"
      >
        {SLIDES.map((slide, i) => (
          <SwiperSlide key={i} className="overflow-hidden">
            <div
              className={`w-full h-full bg-cover bg-center bg-no-repeat transition-transform duration-[8s] linear ${activeIdx === i ? 'animate-ken-burns' : ''}`}
              style={{ backgroundImage: `url(${slide.bg})` }}
            >
              <div className="absolute inset-0 z-[2] flex items-center bg-gradient-to-r from-slate-900/95 via-slate-900/70 to-transparent">
                <div className="container mx-auto px-4 sm:px-6">
                  <div className="perspective-[1000px]">
                    <span
                      className="inline-flex items-center bg-amber-500/15 text-amber-500 text-[0.65rem] sm:text-[0.75rem] font-bold px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-full tracking-[0.1em] uppercase mb-3 sm:mb-5 border border-amber-500/30 backdrop-blur-[4px]"
                      data-swiper-parallax="-300"
                      data-swiper-parallax-opacity="0"
                    >
                      {slide.tag}
                    </span>
                    <h1
                      className="text-[1.8rem] sm:text-[2.2rem] lg:text-[3.8rem] font-extrabold text-white leading-[1.05] mb-3 sm:mb-5 max-w-[700px] tracking-[-0.02em] drop-shadow-[0_10px_30px_rgba(0,0,0,0.3)] whitespace-pre-line"
                      data-swiper-parallax="-500"
                      data-swiper-parallax-duration="800"
                    >
                      {slide.title}
                    </h1>
                    <p
                      className="text-[0.95rem] lg:text-[1.15rem] text-white/80 max-w-[90%] lg:max-w-[500px] mb-6 sm:mb-9 leading-relaxed sm:leading-relaxed"
                      data-swiper-parallax="-400"
                      data-swiper-parallax-duration="1000"
                    >
                      {slide.sub}
                    </p>
                    <div
                      className="flex flex-wrap gap-3 sm:gap-4"
                      data-swiper-parallax="-600"
                      data-swiper-parallax-duration="1200"
                    >
                      <button className="px-6 sm:px-8 py-3 sm:py-3.5 rounded-xl text-[0.85rem] sm:text-[0.95rem] font-bold transition-all duration-300 bg-amber-500 text-slate-900 shadow-[0_8px_24px_rgba(245,158,11,0.3)] hover:bg-white hover:-translate-y-[3px] hover:shadow-[0_12px_32px_rgba(255,255,255,0.2)]">
                        Explore Properties
                      </button>
                      <button className="px-6 sm:px-8 py-3 sm:py-3.5 rounded-xl text-[0.85rem] sm:text-[0.95rem] font-bold transition-all duration-300 bg-white/5 text-white border border-white/20 backdrop-blur-[8px] hover:bg-white/15 hover:border-white hover:-translate-y-[3px]">
                        View Projects →
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}

        {/* Progress Bar */}
        <div className="absolute bottom-0 left-0 w-full h-1 bg-white/10 z-10">
          <div className="h-full bg-amber-500 w-0 animate-progress-fast" key={activeIdx}></div>
        </div>

        {/* Pagination Dots */}
        <div className="hero-dots absolute bottom-[25px] sm:bottom-[40px] left-[15px] sm:left-[20px] !w-auto flex gap-2 z-10"></div>
      </Swiper>

      {/* Slide Counter */}
      <div className="absolute right-[6%] top-1/2 -translate-y-1/2 flex flex-col items-center gap-4 z-10 pointer-events-none">
        <span className="text-[2.2rem] font-extrabold text-amber-500 tabular-nums">{(activeIdx + 1).toString().padStart(2, '0')}</span>
        <span className="w-px h-[60px] bg-gradient-to-b from-transparent via-white/30 to-transparent"></span>
        <span className="text-[0.9rem] font-semibold text-white/40 tabular-nums">{SLIDES.length.toString().padStart(2, '0')}</span>
      </div>

      {/* Custom Navigation */}
      <button className="hero-prev absolute top-1/2 -translate-y-1/2 left-[10px] sm:left-[30px] z-10 w-11 sm:w-16 h-11 sm:h-16 flex items-center justify-center rounded-full bg-white/5 border border-white/10 backdrop-blur-[15px] text-white opacity-70 sm:opacity-0 sm:invisible group-hover/wrap:opacity-100 group-hover/wrap:visible transition-all duration-500 hover:bg-amber-500 hover:text-slate-900 hover:border-amber-500 hover:scale-110 active:scale-95 shadow-[0_0_30px_rgba(245,158,11,0.5)]" aria-label="Previous slide">
        <ChevronLeft size={24} strokeWidth={2.5} />
      </button>
      <button className="hero-next absolute top-1/2 -translate-y-1/2 right-[10px] sm:right-[30px] z-10 w-11 sm:w-16 h-11 sm:h-16 flex items-center justify-center rounded-full bg-white/5 border border-white/10 backdrop-blur-[15px] text-white opacity-70 sm:opacity-0 sm:invisible group-hover/wrap:opacity-100 group-hover/wrap:visible transition-all duration-500 hover:bg-amber-500 hover:text-slate-900 hover:border-amber-500 hover:scale-110 active:scale-95 shadow-[0_0_30_rgba(245,158,11,0.5)]" aria-label="Next slide">
        <ChevronRight size={24} strokeWidth={2.5} />
      </button>
    </div>
  );
}
