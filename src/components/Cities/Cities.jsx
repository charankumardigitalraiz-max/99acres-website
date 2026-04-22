import { useState, useMemo, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { ArrowR, ChevronL, ChevronR, CloseIco, SearchIco } from '../../data/icons';
import 'swiper/css';
import 'swiper/css/navigation';
import './Cities.css';

export default function Cities({ isSidebarOpen }) {
  const cities = useSelector(state => state.properties.cities);
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleCityClick = (cityName) => {
    navigate(`/city/${cityName}`);
    setIsModalOpen(false);
  };

  // Disable scroll when modal is open
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isModalOpen]);

  const filteredCities = useMemo(() => {
    return cities.filter(city =>
      city.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [cities, searchQuery]);

  return (
    <section className="mb-2 w-full pt-10 ">
      <div className="max-w-[1350px] mx-auto px-[22px] mb-10">
        <div className="flex justify-between items-end mb-10 max-md:flex-col max-md:items-start max-md:gap-6">
          <div>
            <div className="text-amber-600 text-[0.7rem] font-bold uppercase tracking-[0.2em] mb-3">Explore Cities</div>
            <h2 className="text-[1.35rem] font-medium text-[#0f172a] tracking-[-0.01em] m-0 leading-[1.2]">Top Real Estate Markets</h2>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <button className="city-prev-btn w-10 h-10 rounded-full border border-[#f1f5f9] bg-white flex items-center justify-center text-[#0f172a] transition-all hover:bg-[#0f172a] hover:text-white hover:shadow-lg disabled:opacity-30 disabled:pointer-events-none"><ChevronL className="w-4 h-4" /></button>
              <button className="city-next-btn w-10 h-10 rounded-full border border-[#f1f5f9] bg-white flex items-center justify-center text-[#0f172a] transition-all hover:bg-[#0f172a] hover:text-white hover:shadow-lg disabled:opacity-30 disabled:pointer-events-none"><ChevronR className="w-4 h-4" /></button>
            </div>
            <div className="h-8 w-px bg-[#f1f5f9]" />
            <button
              className="group flex items-center gap-2 text-[0.9rem] font-bold text-amber-600 bg-transparent py-2 px-3 rounded-xl transition-all hover:bg-amber-50"
              onClick={() => setIsModalOpen(true)}
            >
              All Cities <ArrowR className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>

        <div className="relative">
          <Swiper
            key={isSidebarOpen ? 'open' : 'close'}
            modules={[Navigation]}
            spaceBetween={16}
            slidesPerView={2.2}
            navigation={{
              prevEl: '.city-prev-btn',
              nextEl: '.city-next-btn',
            }}
            breakpoints={{
              480: { slidesPerView: 3.2, spaceBetween: 16 },
              768: { slidesPerView: 4.2, spaceBetween: 20 },
              1024: { slidesPerView: 5.2, spaceBetween: 20 },
              1280: { slidesPerView: isSidebarOpen ? 5 : 6, spaceBetween: 15 },
              1536: { slidesPerView: isSidebarOpen ? 6 : 7, spaceBetween: 15 },
            }}
            className="rounded-[24px]"
          >
            {cities.map(city => (
              <SwiperSlide key={city.name}>
                <div 
                  className="group relative h-[220px] rounded-[24px] overflow-hidden cursor-pointer bg-[#0f172a] shadow-sm transition-all duration-500 hover:-translate-y-1.5 hover:shadow-xl max-md:h-[160px]"
                  onClick={() => handleCityClick(city.name)}
                >
                  <img
                    src={city.img}
                    alt={city.name}
                    loading="lazy"
                    className="w-full h-full object-cover opacity-90 transition-all duration-700 group-hover:scale-110 group-hover:opacity-100"
                  />

                  {/* Clean Minimal Overlay */}
                  <div className="absolute inset-x-0 bottom-0 p-5 bg-gradient-to-t from-[#0f172a] via-[#0f172a]/40 to-transparent z-10 transition-all duration-300 group-hover:pb-6">
                    <div className="text-white text-[1rem] font-bold leading-tight mb-1">{city.name}</div>
                    <div className="text-white/60 text-[0.65rem] font-bold uppercase tracking-wider">{city.count} listings</div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      {/* Modern Cities Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-[#0f172a]/40 backdrop-blur-md z-[9999] flex items-center justify-center p-6 animate-in fade-in duration-300"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="bg-white w-full max-w-[850px] max-height-[90vh] rounded-[32px] shadow-2xl flex flex-col overflow-hidden relative animate-in slide-in-from-bottom-5 duration-500"
            onClick={e => e.stopPropagation()}
          >
            <div className="px-10 py-8 flex items-start justify-between max-md:px-6 max-md:py-6">
              <div>
                <h3 className="text-[1.75rem] font-bold text-[#0f172a] mb-1 tracking-tight max-md:text-[1.4rem]">Explore All Cities</h3>
                <p className="text-[#64748b] text-[0.9rem] font-medium">Discover properties in {cities.length} major Indian cities</p>
              </div>
              <button
                className="w-10 h-10 rounded-full bg-[#f1f5f9] flex items-center justify-center text-[#64748b] transition-all hover:bg-[#0f172a] hover:text-white hover:rotate-90"
                onClick={() => setIsModalOpen(false)}
              >
                <CloseIco className="w-5 h-5" />
              </button>
            </div>

            <div className="px-10 pb-6 max-md:px-6">
              <div className="bg-[#f8fafc] border border-[#e2e8f0] rounded-xl px-4 flex items-center gap-3 h-11 focus-within:bg-white focus-within:border-amber-500 focus-within:ring-2 focus-within:ring-amber-500/10 transition-all">
                <SearchIco className="w-4 h-4 text-[#94a3b8]" />
                <input
                  type="text"
                  placeholder="Search your city..."
                  className="flex-1 bg-transparent border-none outline-none text-[0.9rem] font-medium text-[#0f172a] placeholder:text-[#94a3b8]"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                />
                {searchQuery && (
                  <button className="w-5 h-5 rounded-full bg-[#e2e8f0] flex items-center justify-center text-[#64748b] hover:bg-[#0f172a] hover:text-white" onClick={() => setSearchQuery('')}>
                    <CloseIco className="w-3 h-3" />
                  </button>
                )}
              </div>
            </div>

            <div className="flex-1 overflow-y-auto px-10 pb-10 scrollbar-hide max-md:px-6">
              {filteredCities.length > 0 ? (
                <div className="grid grid-cols-4 gap-4 max-lg:grid-cols-3 max-md:grid-cols-2">
                  {filteredCities.map(city => (
                    <div 
                      key={city.name} 
                      className="flex items-center gap-4 p-3 rounded-2xl border border-[#f1f5f9] hover:border-amber-500 hover:bg-amber-50 hover:translate-x-1.5 transition-all cursor-pointer group"
                      onClick={() => handleCityClick(city.name)}
                    >
                      <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0 shadow-sm">
                        <img src={city.img} alt={city.name} className="w-full h-full object-cover transition-transform group-hover:scale-110" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[0.95rem] font-bold text-[#0f172a] leading-tight">{city.name}</span>
                        <span className="text-[0.7rem] font-bold text-[#64748b] uppercase tracking-wider mt-0.5">{city.count} Listings</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-20 text-center text-[#94a3b8]">
                  <div className="text-4xl mb-4 grayscale opacity-30">🔍</div>
                  <h4 className="text-[1.2rem] font-bold text-[#0f172a] mb-2">No cities found</h4>
                  <p className="text-[0.9rem]">Try searching for a different city name</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

