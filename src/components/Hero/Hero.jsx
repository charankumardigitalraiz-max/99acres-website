import { useState, useEffect } from 'react';
import SearchBar from '../SearchBar/SearchBar';
import './Hero.css';

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
    <section className="hero">
      {/* This background will use your custom 'hero_final_custom.png' image */}
      <div className="hero-background" />

      {/* Family Overlay on the Left Side */}
      <img
        src="/banners/family_1248x832_smaller_left (1).png"
        alt="Family Searching"
        className="hero-family-overlay"
      />

      {/* Removed 'container' class — using absolute positioning for right-side placement */}
      <div className="hero-content">
        <div className="hero-header">
          <h1 className="hero-title">
            Find <span className="highlight" key={words[index]}>{words[index]}</span> <br />
            Property Listings
          </h1>
        </div>

        <div className="hero-search-wrapper">
          <SearchBar />
        </div>
      </div>
    </section>
  );
}
