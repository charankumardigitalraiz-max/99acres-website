import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

const CATEGORIES_ELITE = [
  {
    name: 'Apartments',
    count: '42,000+',
    img: '/categories/luxury_apartments_portrait_1776492494419.png',
    path: '/category/Apartments',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="22" height="22">
        <rect x="2" y="3" width="20" height="18" rx="2" />
        <line x1="8" y1="3" x2="8" y2="21" /><line x1="16" y1="3" x2="16" y2="21" />
        <line x1="2" y1="9" x2="22" y2="9" /><line x1="2" y1="15" x2="22" y2="15" />
      </svg>
    ),
  },
  {
    name: 'Villas',
    count: '8,500+',
    img: '/categories/villas_1776438506118.png',
    path: '/category/Villas',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="22" height="22">
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
  },
  {
    name: 'Commercial',
    count: '15,000+',
    img: '/categories/commercial_1776438564126.png',
    path: '/category/Commercial',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="22" height="22">
        <rect x="2" y="7" width="20" height="14" rx="2" />
        <path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16" />
      </svg>
    ),
  },
  {
    name: 'New Projects',
    count: '1,200+',
    img: '/categories/projects_1776439106753.png',
    path: '/category/New Projects',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="22" height="22">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ),
  },
  {
    name: 'Plots & Land',
    count: '22,000+',
    img: '/categories/land_1776439133923.png',
    path: '/category/Plots-Land',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="22" height="22">
        <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0118 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
  },
];

export default function Categories() {
  return (
    <section className="mt-10 py-10 sm:py-20 bg-[#fdfdfd]">
      <div className="container mx-auto px-4">

        <div className="flex items-end justify-between mb-5">
          <div>
            <span className="block text-amber-500 text-[0.7rem] font-bold uppercase tracking-[0.2em] mb-2">Curated Collections</span>
            <h2 className="text-[1.35rem] font-medium text-[#0f172a] tracking-[-0.01em] m-0 leading-[1.2]">Discover Your Aesthetic</h2>
          </div>
        </div>

        <div className="mx-[-10px] p-[10px]">
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={20}
            slidesPerView={1.3}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true
            }}
            pagination={{ clickable: true, dynamicBullets: true }}
            breakpoints={{
              640: { slidesPerView: 2.3, spaceBetween: 20 },
              900: { slidesPerView: 3.3, spaceBetween: 24 },
              1200: { slidesPerView: 5, spaceBetween: 15, autoplay: false }
            }}
            className="!pb-10 !overflow-visible [&_.swiper-pagination-bullet]:!bg-amber-500 [&_.swiper-pagination-bullet]:opacity-30 [&_.swiper-pagination-bullet-active]:opacity-100 [&_.swiper-pagination-bullet-active]:!w-[18px] [&_.swiper-pagination-bullet-active]:!rounded-[4px]"
          >
            {CATEGORIES_ELITE.map(cat => (
              <SwiperSlide key={cat.name}>
                <Link
                  to={cat.path}
                  className="relative block aspect-[3/4] rounded-[20px] overflow-hidden no-underline shadow-[0_10px_30px_rgba(0,0,0,0.05)] transition-all duration-[400ms] ease-[cubic-bezier(0.165,0.84,0.44,1)] hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(10,18,42,0.15)] group"
                >
                  <img src={cat.img} alt={cat.name} loading="lazy" className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1000ms] ease-[cubic-bezier(0.165,0.84,0.44,1)] group-hover:scale-[1.06]" />

                  {/* Gradient Overlay */}
                  {/* <div className="absolute inset-0 z-[1] bg-gradient-to-t from-[#0f172a]/95 via-[#0f172a]/40 to-[#0f172a]/10" /> */}

                  <div className="absolute inset-0 z-[2] flex flex-col justify-between p-6">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/12 backdrop-blur-[12px] rounded-full flex items-center justify-center border border-white/20 transition-all duration-300 text-white group-hover:bg-amber-500 group-hover:border-amber-500 group-hover:scale-110 group-hover:shadow-[0_4px_12px_rgba(245,158,11,0.3)]">
                      {cat.icon}
                    </div>
                    <div className="transition-transform duration-300 ease-in-out group-hover:-translate-y-1">
                      <h3 className="text-[1.35rem] font-bold text-white m-0 tracking-[-0.01em] leading-[1.2]">{cat.name}</h3>
                    </div>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>


      </div>
    </section>
  );
}
