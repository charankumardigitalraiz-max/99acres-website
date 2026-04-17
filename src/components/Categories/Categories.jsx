import { Link } from 'react-router-dom';
import './Categories.css';

const CATEGORIES_ELITE = [
  {
    name: 'Apartments',
    count: '42,000+',
    img: '/categories/apartments.png',
    path: '/category/Apartments',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="22" height="22">
        <rect x="2" y="3" width="20" height="18" rx="2" />
        <line x1="8" y1="3" x2="8" y2="21" /><line x1="16" y1="3" x2="16" y2="21" />
        <line x1="2" y1="9" x2="22" y2="9" /><line x1="2" y1="15" x2="22" y2="15" />
      </svg>
    ),
  },
  {
    name: 'Villas',
    count: '8,500+',
    img: '/categories/villas.png',
    path: '/category/Villas',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="22" height="22">
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
  },
  {
    name: 'Commercial',
    count: '15,000+',
    img: '/categories/commercial.png',
    path: '/category/Commercial',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="22" height="22">
        <rect x="2" y="7" width="20" height="14" rx="2" />
        <path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16" />
      </svg>
    ),
  },
  {
    name: 'New Projects',
    count: '1,200+',
    img: '/categories/projects.png',
    path: '/category/New Projects',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="22" height="22">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ),
  },
  {
    name: 'Plots & Land',
    count: '22,000+',
    img: '/categories/land.png',
    path: '/category/Plots / Land',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="22" height="22">
        <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0118 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
  },
];

export default function Categories() {
  return (
    <section className="cat-elite-section">
      <div className="container">

        <div className="cat-elite-header">
          <div className="cat-elite-header-left">
            <span className="cat-elite-eyebrow">Curated Collections</span>
            <h2 className="section-title">Discover Your Aesthetic</h2>
          </div>
          {/* <Link to="/properties" className="cat-elite-viewall">
            Explore Gallery &rarr;
          </Link> */}
        </div>

        <div className="cat-elite-grid">
          {CATEGORIES_ELITE.map(cat => (
            <Link
              key={cat.name}
              to={cat.path}
              className="cat-elite-card"
            >
              <img src={cat.img} alt={cat.name} className="cat-elite-img" loading="lazy" />
              {/* <div className="cat-elite-overlay" /> */}

              <div className="cat-elite-content">
                <div className="cat-elite-icon">
                  {cat.icon}
                </div>
                <div className="cat-elite-bottom">
                  <h3 className="cat-elite-name">{cat.name}</h3>
                  <div className="cat-elite-count">{cat.count} Signature Listings</div>
                </div>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
