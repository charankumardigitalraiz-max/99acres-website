import { useSelector } from 'react-redux';
import PropertyCard from '../../PropertyCard/PropertyCard';
import { ArrowR } from '../../../data/icons';
import { Link } from 'react-router-dom';

export default function FeaturedProperties() {
  const featured = useSelector(state => state.properties.featured);

  return (
    <section className="py-6">
      <div className="container mx-auto px-4 lg:px-[22px] max-w-[1350px]">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-[14px] gap-3.5 md:gap-0">
          <div>
            <div className="inline-block text-amber-500 text-[0.72rem] font-medium uppercase tracking-[0.1em] mb-1.5">Properties for Sale</div>
            <div className="text-[1.35rem] sm:text-2xl md:text-[1.35rem] font-medium text-[#0f172a] tracking-[-0.01em] mb-0.5">Handpicked for You</div>
            <div className="text-[0.88rem] text-slate-600 mt-0.5 max-w-[600px] font-normal">Exclusively sourced from verified builders</div>
          </div>
          <Link to="/featured-properties" className="flex items-center gap-2 text-amber-500 text-[0.85rem] font-medium transition-all duration-200 hover:gap-3 hover:opacity-80">
            View All <ArrowR />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 py-2.5">
          {featured.map(property => ( 
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </div>
    </section>
  );
}
