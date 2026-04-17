import { useSelector } from 'react-redux';
import PropertyCard from '../PropertyCard/PropertyCard';
import { ArrowR } from '../../data/icons';
import { Link } from 'react-router-dom';

export default function FeaturedProperties() {
  const featured = useSelector(state => state.properties.featured);

  return (
    <section className="section">
      <div className="container">
        <div className="section-head">
          <div>
            <div className="section-label">Properties for Sale</div>
            <div className="section-title">Handpicked for You</div>
            <div className="section-sub">Exclusively sourced from verified builders</div>
          </div>
          <Link to="/featured-properties" className="view-all">View All <ArrowR /></Link>
        </div>
        <div className="prop-grid">
          {featured.map(property => ( 
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </div>
    </section>
  );
}
