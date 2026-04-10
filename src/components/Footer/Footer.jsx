import { FOOTER_LINKS } from '../../data/constants';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          {/* Brand */}
          <div>
            <div className="footer-logo">
              <img src="/sherla-properties-text.png" alt="Sherla Properties" className="footer-logo-img" />
              Sherla Properties
            </div>
            <p className="footer-desc">
              India's premium real estate marketplace connecting buyers,
              renters, and builders across the country.
            </p>
            <div className="footer-socials">
              {['FB', 'TW', 'IG', 'IN'].map(s => (
                <a key={s} href="#" className="social-btn">{s}</a>
              ))}
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(FOOTER_LINKS).map(([heading, items]) => (
            <div key={heading} className="footer-col">
              <h4>{heading}</h4>
              <ul>
                {items.map(item => (
                  <li key={item}><a href="#">{item}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} EstatePrime Technologies Pvt. Ltd. All rights reserved.</p>
          <p style={{ color: '#475569' }}>Made with ❤️ for India</p>
        </div>
      </div>
    </footer>
  );
}
