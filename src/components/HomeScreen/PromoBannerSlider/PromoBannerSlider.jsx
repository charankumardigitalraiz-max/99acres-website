import { useState, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

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

  const onAutoplayTimeLeft = (s, time, progress) => {
    if (progressCircle.current) {
      progressCircle.current.style.setProperty('--progress', 1 - progress);
    }
  };

  return (
    <section className="p-0 m-0 w-full max-w-full overflow-hidden">
      <Swiper
        key={isSidebarOpen ? 'opened' : 'closed'}
        modules={[Pagination, Autoplay]}
        pagination={{ clickable: true }}
        autoplay={{ delay: 6000, disableOnInteraction: false }}
        loop
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        onAutoplayTimeLeft={onAutoplayTimeLeft}
        className={`!rounded-xl overflow-hidden !my-4 mx-auto !max-w-[1240px] !w-[calc(100%-40px)] !bg-slate-50 transition-all duration-400 ease-in-out !block ${isSidebarOpen ? 'h-[150px]' : 'h-[220px]'}
          [&_.swiper-pagination]:!bottom-3 [&_.swiper-pagination]:flex [&_.swiper-pagination]:justify-center [&_.swiper-pagination]:gap-2
          [&_.swiper-pagination-bullet]:!bg-white [&_.swiper-pagination-bullet]:!opacity-50 [&_.swiper-pagination-bullet]:!w-2 [&_.swiper-pagination-bullet]:!h-2 [&_.swiper-pagination-bullet]:!m-0 [&_.swiper-pagination-bullet]:!rounded-full [&_.swiper-pagination-bullet]:!transition-all [&_.swiper-pagination-bullet]:!shadow-[0_2px_4px_rgba(0,0,0,0.2)]
          [&_.swiper-pagination-bullet-active]:!bg-amber-500 [&_.swiper-pagination-bullet-active]:!opacity-100 [&_.swiper-pagination-bullet-active]:!w-5 [&_.swiper-pagination-bullet-active]:!rounded-[4px]
        `}
      >
        {BANNERS.map((banner, i) => (
          <SwiperSlide key={i}>
            <div className={`relative w-full overflow-hidden bg-slate-50 transition-all duration-400 ${isSidebarOpen ? 'h-[180px]' : 'h-[220px]'}`}>

              {banner.type === 'image' && (
                <img
                  src={banner.img}
                  alt={banner.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1200ms] ease-in-out"
                  style={banner.fullImage ? { opacity: 1 } : {}}
                />
              )}

              {/* Banner Counter */}
              <div className="absolute bottom-4 right-6 bg-black/40 text-white text-[0.75rem] font-bold py-1 px-3 rounded-full z-10 backdrop-blur-md border border-white/20 tracking-wider pointer-events-none">
                {activeIndex + 1} / {BANNERS.length}
              </div>

              {/* Bottom Progress Bar */}
              <div className="absolute bottom-0 left-0 w-full h-[3px] bg-white/5 z-20">
                <div 
                  className="h-full bg-white/30 transition-[width] duration-100 linear" 
                  ref={progressCircle}
                  style={{ width: 'calc(var(--progress, 0) * 100%)' }}
                ></div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
