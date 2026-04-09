import Hero from '../components/Hero/Hero';
import Categories from '../components/Categories/Categories';
import PropertyListings from '../components/PropertyListings/PropertyListings';
import HighRatedProperties from '../components/HighRatedProperties/HighRatedProperties';
import LandProperties from '../components/LandProperties/LandProperties';
import StatsStrip from '../components/StatsStrip/StatsStrip';
import Cities from '../components/Cities/Cities';
import Localities from '../components/Localities/Localities';
import PromoBannerSlider from '../components/PromoBannerSlider/PromoBannerSlider';

export default function Home() {
  return (
    <>
      <Hero />

      {/* Categories section */}
      <Categories />
      <PromoBannerSlider />

      <PropertyListings />
      <Localities />
      <HighRatedProperties />
      <LandProperties />
      {/* <StatsStrip /> */}
      <Cities />

    </>
  );
}
