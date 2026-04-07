import HeroSlider from '../components/HeroSlider/HeroSlider';
import SearchBar from '../components/SearchBar/SearchBar';
import Categories from '../components/Categories/Categories';
import PropertyListings from '../components/PropertyListings/PropertyListings';
import HighRatedProperties from '../components/HighRatedProperties/HighRatedProperties';
import LandProperties from '../components/LandProperties/LandProperties';
import PromoBannerSlider from '../components/PromoBannerSlider/PromoBannerSlider';
import StatsStrip from '../components/StatsStrip/StatsStrip';
import Cities from '../components/Cities/Cities';
import Localities from '../components/Localities/Localities';

export default function Home() {
  return (
    <>
      <HeroSlider />

      {/* Search & Categories wrapper */}
      <SearchBar />
      <Categories />

      <PropertyListings />
      <PromoBannerSlider />
      <Localities />
      <HighRatedProperties />
      <LandProperties />
      <StatsStrip />
      <Cities />

    </>
  );
}
