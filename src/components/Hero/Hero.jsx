import { useState, useEffect } from 'react';
import SearchBar from '../SearchBar/SearchBar';
import './Hero.css';

export default function Hero() {
  const words = ['Property', 'Home', 'Villa', 'Apartment', 'Plot'];
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
            Find Your <span className="highlight" key={words[index]}>{words[index]}</span>
          </h1>
          {/* <p className="hero-desc">
            Verified properties from trusted developers and owners across India.
          </p> */}
        </div>

        <div className="hero-search-wrapper">
          <SearchBar />
        </div>
      </div>
    </section>
  );
}
