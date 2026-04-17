import { FOOTER_LINKS } from '../../data/constants';
import { Send, Mail } from 'lucide-react';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">

      <div className="footer-main">
        <div className="container">
          <div className="footer-grid">
            {/* Brand Column */}
            <div className="footer-brand">
              <div className="footer-logo">
                <img src="/sherla-properties-text.png" alt="Sherla Properties" className="footer-logo-img" />
                Sherla Properties
              </div>
              <p className="footer-desc">
                The most trusted platform for premium real estate. Connecting you with verified listings and top-rated builders across India.
              </p>
              <div className="footer-awards">
                <span className="award-badge">★ Trusted Since 2008</span>
                <span className="award-badge">✓ 100% RERA Certified</span>
              </div>
            </div>

            {/* Special Products Column */}
            {/* <div className="footer-col">
              <h4>Elite Collections</h4>
              <ul>
                <li><a href="/category/Apartments">Premium Apartments</a></li>
                <li><a href="/category/Villas">Luxury Villas</a></li>
                <li><a href="/category/Commercial">Office & Retail</a></li>
                <li><a href="/category/New Projects">New Launch Phase</a></li>
                <li><a href="/category/Plots / Land">Investment Plots</a></li>
              </ul>
            </div> */}

            {/* Dynamic Link Columns */}
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

          {/* Bottom Bar */}
          <div className="footer-bottom">
            <p>© {new Date().getFullYear()} Sherla Properties Pvt. Ltd. All rights reserved.</p>
            <div className="footer-legal">
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Service</a>
              <a href="#">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
