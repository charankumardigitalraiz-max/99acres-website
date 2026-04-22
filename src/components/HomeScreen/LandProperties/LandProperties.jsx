import { useSelector } from 'react-redux';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import { ArrowR, ChevronL, ChevronR } from '../../../data/icons';
import PropertyCard from '../../PropertyCard/PropertyCard';
import { Link } from 'react-router-dom';
import 'swiper/css';
import 'swiper/css/navigation';

export default function LandProperties({ isSidebarOpen }) {
  const lands = useSelector(state => state.properties.landProperties);

  return (
    <section className="py-6 bg-white">
      <div className="container mx-auto px-4 lg:px-[22px] max-w-[1350px]">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-[14px] gap-3.5 md:gap-0">
          <div>
            <div className="inline-block text-amber-500 text-[0.72rem] font-medium uppercase tracking-[0.1em] mb-1.5">Plots & Land</div>
            <div className="text-[1.35rem] sm:text-2xl md:text-[1.35rem] font-medium text-[#0f172a] tracking-[-0.01em] mb-0.5">Best Land Properties</div>
            <div className="text-[0.88rem] text-slate-600 mt-0.5 max-w-[600px] font-normal">Premium plots, farmlands & commercial sites across India</div>
          </div>
          <div className="flex items-center justify-between md:justify-end gap-3 w-full md:w-auto mt-1 md:mt-0">
            <div className="flex items-center gap-3">
              <button className="land-prev-btn w-10 h-10 rounded-full border border-slate-200 bg-white flex items-center justify-center text-[#0f172a] transition-all duration-300 hover:bg-[#0f172a] hover:text-white hover:border-[#0f172a] hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(0,0,0,0.15)] disabled:opacity-30 disabled:pointer-events-none group shadow-[0_2px_8px_rgba(0,0,0,0.05)]">
                <ChevronL />
              </button>
              <button className="land-next-btn w-10 h-10 rounded-full border border-slate-200 bg-white flex items-center justify-center text-[#0f172a] transition-all duration-300 hover:bg-[#0f172a] hover:text-white hover:border-[#0f172a] hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(0,0,0,0.15)] disabled:opacity-30 disabled:pointer-events-none group shadow-[0_2px_8px_rgba(0,0,0,0.05)]">
                <ChevronR />
              </button>
              <div className="w-[1px] h-6 bg-slate-200 mx-2 hidden md:block"></div>
            </div>
            <Link to="/plots-land-properties" className="flex items-center gap-2 text-amber-500 text-[0.85rem] font-medium transition-all duration-200 hover:gap-3 hover:opacity-80">
              View All <ArrowR />
            </Link>
          </div>
        </div>

        <div className="mx-[-20px] px-5 py-2">
          <Swiper
            key={isSidebarOpen ? 'opened' : 'closed'}
            modules={[Navigation, Autoplay]}
            spaceBetween={20}
            slidesPerView={1.2}
            autoplay={{ delay: 4500, disableOnInteraction: false, pauseOnMouseEnter: true }}
            loop
            navigation={{
              prevEl: '.land-prev-btn',
              nextEl: '.land-next-btn',
            }}
            breakpoints={{
              640: { slidesPerView: 2.2, spaceBetween: 20 },
              1024: { slidesPerView: 3, spaceBetween: 24 },
              1280: { slidesPerView: isSidebarOpen ? 3 : 5, spaceBetween: 15 },
            }}
            className="!p-[8px_4px] !m-[-8px_-4px] [&_.swiper-wrapper]:flex [&_.swiper-wrapper]:flex-row [&_.swiper-wrapper]:!items-stretch [&_.swiper-slide]:h-auto [&_.swiper-slide]:flex-shrink-0"
          >
            {lands.map(land => (
              <SwiperSlide key={land.id} className="!h-auto flex flex-col">
                <div className="flex-1 w-full h-full">
                  <PropertyCard property={land} variant="land" />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
