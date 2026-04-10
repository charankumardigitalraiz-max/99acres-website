import { FOOTER_LINKS } from '../../data/constants';
import { Send, Mail } from 'lucide-react';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      {/* ── Pre-Footer Newsletter ── */}
      <div className="footer-pre">
        <div className="container">
          {/* <div className="footer-pre-content">
            <div className="footer-pre-info">
              <h3>Stay ahead of the market</h3>
              <p>Join 50,000+ subscribers for exclusive property insights and early access deals.</p>
            </div>
            <div className="footer-newsletter">
              <input type="email" placeholder="Enter your email address" />
              <button className="btn-subscribe">
                Subscribe <Send size={16} style={{ marginLeft: '8px', display: 'inline' }} />
              </button>
            </div>
          </div> */}
        </div>
      </div>

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
              <div className="footer-socials">
                {/* <a href="#" className="social-btn" title="Facebook"><Facebook size={18} /></a>
                <a href="#" className="social-btn" title="Twitter"><Twitter size={18} /></a>
                <a href="#" className="social-btn" title="Instagram"><Instagram size={18} /></a>
                <a href="#" className="social-btn" title="LinkedIn"><Linkedin size={18} /></a> */}
              </div>
            </div>

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
