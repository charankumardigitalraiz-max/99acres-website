import { useSelector } from 'react-redux';
import PropertyCard from '../PropertyCard/PropertyCard';
import { ArrowR } from '../../data/icons';

export default function RentProperties() {
  const rentals = useSelector(state => state.properties.rentals);

  return (
    <section
      className="section"
      style={{ background: '#fff', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}
    >
      <div className="container">
        <div className="section-head">
          <div>
            <div className="section-label">Properties for Rent</div>
            <div className="section-title">Rentals in Top Cities</div>
            <div className="section-sub">Verified, move-in ready homes</div>
          </div>
          <a href="#" className="view-all">View All <ArrowR /></a>
        </div>
        <div className="prop-grid">
          {rentals.map(property => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </div>
    </section>
  );
}
