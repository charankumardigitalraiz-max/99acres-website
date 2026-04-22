import { useSelector } from 'react-redux';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import { Link } from 'react-router-dom';
import PropertyCard from '../../PropertyCard/PropertyCard';
import { ArrowR, ChevronL, ChevronR } from '../../../data/icons';
import 'swiper/css';
import 'swiper/css/navigation';

export default function PropertyListings({ isSidebarOpen }) {
  const { buyProperties, rentProperties } = useSelector(state => state.properties);
  const activeTab = useSelector(state => state.search.activeTab);

  // activeTab is now a string: 'Buy' | 'Rent' | 'Commercial'
  const currentTabName = activeTab || 'Buy';

  let propertiesToShow = [];
  let title = '';
  let sub = '';

  if (currentTabName === 'Buy' || currentTabName === 'New Projects') {
    propertiesToShow = buyProperties;
    title = 'Properties for Sale';
    sub = 'Handpicked exclusive properties for buyers';
  } else if (currentTabName === 'Rent') {
    propertiesToShow = rentProperties;
    title = 'Properties for Rent';
    sub = 'Verified, move-in ready homes';
  } else {
    propertiesToShow = buyProperties;
    title = 'Commercial Properties';
    sub = 'Premium office spaces and shops';
  }

  return (
    <section className="py-6 bg-white !mt-[10px]">
      <div className="container mx-auto px-4 lg:px-[22px] max-w-[1350px]">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-5 md:mb-[14px] gap-3.5 md:gap-0">
          <div>
            <div className="inline-block text-amber-500 text-[0.72rem] font-medium uppercase tracking-[0.1em] mb-1.5">{currentTabName}</div>
            <div className="text-[1.35rem] sm:text-2xl md:text-[1.35rem] font-medium text-[#0f172a] tracking-[-0.01em] mb-0.5">{title}</div>
            <div className="text-[0.88rem] text-slate-600 mt-0.5 max-w-[600px] font-normal">{sub}</div>
          </div>
          <div className="flex items-center justify-between md:justify-end gap-3 w-full md:w-auto mt-1 md:mt-0">
            <div className="flex items-center gap-3">
              <button className="prop-prev-btn w-10 h-10 rounded-full border border-slate-200 bg-white flex items-center justify-center text-[#0f172a] transition-all duration-300 hover:bg-[#0f172a] hover:text-white hover:border-[#0f172a] hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(0,0,0,0.15)] disabled:opacity-30 disabled:pointer-events-none group shadow-[0_2px_8px_rgba(0,0,0,0.05)]">
                <ChevronL />
              </button>
              <button className="prop-next-btn w-10 h-10 rounded-full border border-slate-200 bg-white flex items-center justify-center text-[#0f172a] transition-all duration-300 hover:bg-[#0f172a] hover:text-white hover:border-[#0f172a] hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(0,0,0,0.15)] disabled:opacity-30 disabled:pointer-events-none group shadow-[0_2px_8px_rgba(0,0,0,0.05)]">
                <ChevronR />
              </button>
              <div className="w-[1px] height-6 bg-slate-200 mx-2 hidden md:block"></div>
            </div>
            <Link to="/plots-land-properties" className="flex items-center gap-2 text-amber-500 text-[0.85rem] font-medium transition-all duration-200 hover:gap-3 hover:opacity-80">
              View All <ArrowR />
            </Link>
          </div>
        </div>

        <div className="mx-[-20px] px-5 py-2">
          <Swiper
            key={isSidebarOpen ? 'open' : 'closed'}
            modules={[Navigation, Autoplay]}
            spaceBetween={16}
            slidesPerView={1.2}
            navigation={{
              prevEl: '.prop-prev-btn',
              nextEl: '.prop-next-btn',
            }}
            pagination={{ clickable: true }}
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            loop
            breakpoints={{
              640: { slidesPerView: 2.2, spaceBetween: 20 },
              1024: { slidesPerView: 3, spaceBetween: 24 },
              1280: { slidesPerView: isSidebarOpen ? 3 : 5, spaceBetween: 15 },
            }}
            className="!p-[8px_4px] !m-[-8px_-4px] [&_.swiper-wrapper]:flex [&_.swiper-wrapper]:flex-row [&_.swiper-wrapper]:!items-stretch [&_.swiper-slide]:h-auto [&_.swiper-slide]:flex-shrink-0"
          >
            {propertiesToShow.map(property => (
              <SwiperSlide key={property.id}>
                <PropertyCard property={property} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {propertiesToShow.length === 0 && (
          <div className="text-center py-10 text-slate-400">
            No properties found for this category.
          </div>
        )}
      </div>
    </section>
  );
}
