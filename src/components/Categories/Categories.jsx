import { CATEGORIES } from '../../data/constants';
import { Link } from 'react-router-dom';
import './Categories.css';

export default function Categories() {
  return (
    <section className="section" style={{ background: '#fff', borderBottom: '1px solid var(--border)' }}>
      <div className="container">
        <div className="section-head">
          <div>
            <div className="section-label">Browse by Category</div>
            <div className="section-title">What are you looking for?</div>
          </div>
        </div>
        <div className="categories-grid">
          {CATEGORIES.map(cat => (

            <Link to={`/category/${cat.name}`} key={cat.name} className="cat-card-v4">
              <img src={cat.img} alt={cat.name} className="cat-img-bg" />
              <div className="cat-content-v4">
                <div className="cat-name-v4">{cat.name}</div>
                <div className="cat-count-v4">{cat.count} listings</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
