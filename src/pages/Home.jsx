import { useState } from "react";
import Hero from "../components/Hero/Hero";
import Categories from "../components/HomeScreen/Categories/Categories";
import PropertyListings from "../components/HomeScreen/PropertyListings/PropertyListings";
import HighRatedProperties from "../components/HomeScreen/HighRatedProperties/HighRatedProperties";
import LandProperties from "../components/HomeScreen/LandProperties/LandProperties";
import StatsStrip from "../components/StatsStrip/StatsStrip";
import Cities from "../components/Cities/Cities";
import Localities from "../components/HomeScreen/Localities/Localities";
import PromoBannerSlider from "../components/HomeScreen/PromoBannerSlider/PromoBannerSlider";
import FloatingVideo from "../components/HomeScreen/FloatingVideo/FloatingVideo";
import "./Home.css";

export default function Home() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <>
      <div className="home-top-fold">
        <Hero />
        <PromoBannerSlider isSidebarOpen={isSidebarOpen} />
      </div>
      {/* Two Column Layout Wrapper */}
      <div
        className={`container home-layout ${!isSidebarOpen ? "home-layout--collapsed" : ""}`}
      >
        {/* Main Feed */}
        <div className="home-main">
          {/* Categories section */}

          <Categories />

          <PropertyListings isSidebarOpen={isSidebarOpen} />
          <Localities isSidebarOpen={isSidebarOpen} />
          <HighRatedProperties isSidebarOpen={isSidebarOpen} />
          <LandProperties isSidebarOpen={isSidebarOpen} />
          {/* <StatsStrip /> */}
          <Cities isSidebarOpen={isSidebarOpen} />
        </div>

        {/* Sidebar Ads */}
        {/* <div className="home-sidebar">
          <SidebarAds isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
        </div> */}
      </div>
      {/* <div className="home-sidebar">
        <FloatingVideo />
      </div> */}
    </>
  );
}
