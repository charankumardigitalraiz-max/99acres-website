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
              <div className="footer-awards" style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginTop: '20px' }}>
                <span className="award-badge" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 14px', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '100px', fontSize: '12px', fontWeight: 'bold', color: '#475569' }}>
                  <svg viewBox="0 0 24 24" width="14" height="14" fill="#f59e0b" style={{ marginRight: '6px' }}><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
                  Trusted Since 2008
                </span>
                <span className="award-badge" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 14px', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '100px', fontSize: '12px', fontWeight: 'bold', color: '#475569' }}>
                  <svg viewBox="0 0 24 24" width="14" height="14" fill="#10b981" style={{ marginRight: '6px' }}><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" /></svg>
                  100% RERA Certified
                </span>
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
