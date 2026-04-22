import { useState, useEffect } from 'react';
import SearchBar from '../SearchBar/SearchBar';
import './Hero.css'; // Minimal: keyframes + height media queries only

export default function Hero() {
  const words = ['Legit', 'Hassle-free', 'Trusted'];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="hero relative w-full flex-1 min-h-[480px] flex items-center justify-end overflow-visible bg-[#f8fafc] z-[10]">

      {/* Background image layer */}
      <div className="hero-bg-layer absolute inset-0 bg-[url('/banners/clean_background_1248x832.png')] bg-cover bg-center z-[1]" />

      {/* Family overlay image — bottom-left */}
      <img
        src="/banners/family_1248x832_smaller_left (1).png"
        alt="Family Searching"
        className="hero-family-overlay absolute left-0 bottom-0 h-[90%] max-w-[50%] object-contain object-left z-[5] pointer-events-none translate-x-[-2%] translate-y-[2%] transition-all duration-500 max-lg:h-[40%] max-lg:left-[3%] max-lg:bottom-[5%] max-lg:max-w-[60%] max-lg:opacity-15 max-md:h-[35%] max-md:opacity-10"
      />

      {/* Hero content — right-pinned on desktop, centered on tablet/mobile */}
      <div className="hero-content absolute right-10 top-[60%] [transform:translateY(-50%)_perspective(1800px)] z-[20] w-[60%] max-w-[900px] text-center px-[30px] mt-10 transition-all duration-500 max-lg:relative max-lg:right-auto max-lg:top-auto max-lg:[transform:none] max-lg:w-[90%] max-lg:max-w-[640px] max-lg:mx-auto max-lg:px-5 max-lg:mt-5 max-md:w-[94%] max-md:px-3 max-[480px]:w-[96%] max-[480px]:px-2">

        {/* Title block */}
        <div className="mb-10 max-lg:mb-6 max-[480px]:mb-5">
          <h1 className="text-[clamp(2.2rem,4.5vw,3.5rem)] font-extrabold text-[#0f172a] leading-[1.1] mb-4 tracking-[-0.03em] max-lg:text-[2rem] max-lg:text-white max-md:text-[1.8rem] max-[480px]:text-[1.55rem] max-[480px]:tracking-[-0.02em]">
            Find{' '}
            <span
              key={words[index]}
              className="text-amber-500 inline-block animate-[wordFade_0.5s_ease-out_forwards]"
            >
              {words[index]}
            </span>{' '}
            <br />
            Property Listings
          </h1>
        </div>

        {/* Search bar */}
        <div className="w-full max-w-[900px] mx-auto relative z-[10] animate-[heroFadeUp_0.8s_ease-out_0.2s_both] rounded-2xl max-lg:max-w-full">
          <SearchBar />
        </div>
      </div>

    </section>
  );
}
