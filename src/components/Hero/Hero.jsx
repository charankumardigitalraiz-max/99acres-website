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
      <div className="hero-background" />
      <div className="hero-content container">
        <div className="hero-header">
          <span className="hero-label">Real Estate Excellence</span>
          <h1 className="hero-title">
            Find <span className="highlight" key={words[index]}>{words[index]}</span> <br />
            Property Listings
          </h1>
        </div>

        <div className="hero-search-wrapper">
          <SearchBar />
        </div>
      </div>

      {/* <img
        src="/banners/people_group_transparent_v2.png"
        alt="People exploring real estate"
        className="hero-people-overlay"
      /> */}
    </section>
  );
}
