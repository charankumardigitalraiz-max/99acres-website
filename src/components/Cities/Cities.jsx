import { useState, useMemo, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { ArrowR, ChevronL, ChevronR, CloseIco, SearchIco } from '../../data/icons';
import 'swiper/css';
import 'swiper/css/navigation';
import './Cities.css';

export default function Cities({ isSidebarOpen }) {
  const cities = useSelector(state => state.properties.cities);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

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
    <section className="section">
      <div className="container">
        <div className="section-head">
          <div>
            <div className="section-label">Explore Cities</div>
            <div className="section-title">Top Real Estate Markets</div>
          </div>
          <div className="slider-controls">
            <button className="city-prev-btn"><ChevronL /></button>
            <button className="city-next-btn"><ChevronR /></button>
            <div className="divider-v"></div>
            <button
              className="view-all-btn"
              onClick={() => setIsModalOpen(true)}
            >
              All Cities <ArrowR />
            </button>
          </div>
        </div>

        <div className="carousel-wrapper">
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
              1280: { slidesPerView: isSidebarOpen ? 5 : 6, spaceBetween: 24 },
              1536: { slidesPerView: isSidebarOpen ? 6 : 7, spaceBetween: 20 },
            }}
            className="cities-swiper"
          >
            {cities.map(city => (
              <SwiperSlide key={city.name}>
                <div className="city-card">
                  <img src={city.img} alt={city.name} loading="lazy" />
                  <div className="city-overlay">
                    <div className="city-name">{city.name}</div>
                    <div className="city-count">{city.count} properties</div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      {/* Modern Cities Modal */}
      {isModalOpen && (
        <div className="cities-modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="cities-modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-title-group">
                <h3>Explore All Cities</h3>
                <p>Discover properties in {cities.length} major Indian cities</p>
              </div>
              <button className="modal-close-btn" onClick={() => setIsModalOpen(false)}>
                <CloseIco />
              </button>
            </div>

            <div className="modal-search-wrapper">
              <div className="modal-search-bar">
                <SearchIco />
                <input
                  type="text"
                  placeholder="Search your city..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                />
                {searchQuery && (
                  <button className="search-clear" onClick={() => setSearchQuery('')}>
                    <CloseIco />
                  </button>
                )}
              </div>
            </div>

            <div className="modal-cities-grid">
              {filteredCities.length > 0 ? (
                filteredCities.map(city => (
                  <div key={city.name} className="modal-city-item">
                    <div className="modal-city-img">
                      <img src={city.img} alt={city.name} />
                    </div>
                    <div className="modal-city-info">
                      <span className="name">{city.name}</span>
                      <span className="count">{city.count} Listings</span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="no-results">
                  <div className="no-results-icon">🔍</div>
                  <h4>No cities found</h4>
                  <p>Try searching for a different city name</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

