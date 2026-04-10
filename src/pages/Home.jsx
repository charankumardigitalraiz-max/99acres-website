import { useState } from 'react';
import Hero from '../components/Hero/Hero';
import Categories from '../components/Categories/Categories';
import PropertyListings from '../components/PropertyListings/PropertyListings';
import HighRatedProperties from '../components/HighRatedProperties/HighRatedProperties';
import LandProperties from '../components/LandProperties/LandProperties';
import StatsStrip from '../components/StatsStrip/StatsStrip';
import Cities from '../components/Cities/Cities';
import Localities from '../components/Localities/Localities';
import PromoBannerSlider from '../components/PromoBannerSlider/PromoBannerSlider';
import SidebarAds from '../components/SidebarAds/SidebarAds';
import './Home.css';

export default function Home() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <>
      <Hero />

      {/* Two Column Layout Wrapper */}
      <div className={`container home-layout ${!isSidebarOpen ? 'home-layout--collapsed' : ''}`}>

        {/* Main Feed */}
        <div className="home-main">
          {/* Categories section */}
          <Categories />
          <PromoBannerSlider isSidebarOpen={isSidebarOpen} />

          <PropertyListings isSidebarOpen={isSidebarOpen} />
          <Localities isSidebarOpen={isSidebarOpen} />
          <HighRatedProperties isSidebarOpen={isSidebarOpen} />
          <LandProperties isSidebarOpen={isSidebarOpen} />
          {/* <StatsStrip /> */}
          <Cities isSidebarOpen={isSidebarOpen} />
        </div>

        {/* Sidebar Ads */}
        <div className="home-sidebar">
          <SidebarAds isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
        </div>

      </div>
    </>
  );
}
