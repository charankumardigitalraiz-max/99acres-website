import { useDispatch, useSelector } from 'react-redux';
import { setBillingCycle, subscribeToPlan } from '../store/slices/subscriptionSlice';
import { CheckCircle2, X } from 'lucide-react';
import './Subscription.css';

export default function Subscription() {
  const dispatch = useDispatch();
  const { plans, billingCycle, activeSubscriptionId } = useSelector(state => state.subscription);

  const getDisplayPrice = (plan, isAnnual) => {
    if (plan.price === '0') return '0';
    const basePrice = parseInt(plan.price.replace(',', ''), 10);
    if (isAnnual) {
      const discountedMonthly = Math.round(basePrice * 0.8);
      return discountedMonthly.toLocaleString('en-IN');
    }
    return basePrice.toLocaleString('en-IN');
  };

  const getAnnualTotal = (plan) => {
    if (plan.price === '0') return 'Free forever';
    const basePrice = parseInt(plan.price.replace(',', ''), 10);
    const total = Math.round(basePrice * 0.8 * 12);
    return `Billed annually at ₹${total.toLocaleString('en-IN')}`;
  };

  return (
    <div className="sub-premium-page">
      {/* Dynamic Background Elements */}
      <div className="sub-bg-glow glow-1"></div>
      <div className="sub-bg-glow glow-2"></div>
      
      <div className="sub-container">
        <header className="sub-header-modern">
          <div className="sub-badge">Agent & Developer Portal</div>
          <h1 className="sub-hero-title">Scale your real estate empire.</h1>
          <p className="sub-hero-desc">
            Unlock premium buyer leads, dominate search visibility, and post unlimited properties with our specialized growth plans.
          </p>

          <div className="sub-toggle-modern" data-active={billingCycle}>
            <div className="sub-toggle-pill"></div>
            <button 
              className={`sub-toggle-btn ${billingCycle === 'monthly' ? 'active' : ''}`}
              onClick={() => dispatch(setBillingCycle('monthly'))}
            >
              Billed Monthly
            </button>
            <button 
              className={`sub-toggle-btn ${billingCycle === 'annual' ? 'active' : ''}`}
              onClick={() => dispatch(setBillingCycle('annual'))}
            >
              Billed Annually <span className="save-badge">Save 20%</span>
            </button>
          </div>
        </header>

        <div className="sub-pricing-grid">
          {plans.map(plan => {
            const isPopular = plan.popular;
            const isActive = activeSubscriptionId === plan.id;
            
            return (
              <div key={plan.id} className={`sub-card ${isPopular ? 'sub-card-popular' : ''}`}>
                {isPopular && (
                  <div className="sub-popular-stripe">
                    <span className="stripe-text">Recommended</span>
                  </div>
                )}
                
                <div className="sub-card-header">
                  <h3 className="sub-tier-name">{plan.name}</h3>
                  <div className="sub-price-block">
                    <span className="sub-currency">₹</span>
                    <span className="sub-amount">{getDisplayPrice(plan, billingCycle === 'annual')}</span>
                    <span className="sub-duration">{plan.price !== '0' ? '/mo' : ''}</span>
                  </div>
                  <div className="sub-annual-calc">
                    {billingCycle === 'annual' && plan.price !== '0' ? getAnnualTotal(plan) : '\u00A0'}
                  </div>
                </div>

                <div className="sub-card-body">
                  <ul className="sub-features-list">
                    {plan.features.map((feature, i) => (
                      <li key={i} className={`sub-feature-item ${!feature.included ? 'sub-excluded' : ''}`}>
                        <div className="sub-feature-icon">
                          {feature.included ? <CheckCircle2 size={18} strokeWidth={2.5}/> : <X size={18} strokeWidth={2.5}/>}
                        </div>
                        <span className="sub-feature-text">{feature.text}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="sub-card-footer">
                  <button 
                    className={`sub-action-btn ${isPopular ? 'btn-glow' : 'btn-ghost'} ${isActive ? 'btn-active' : ''}`}
                    onClick={() => dispatch(subscribeToPlan(plan.id))}
                  >
                    {isActive ? 'Current Plan' : plan.cta}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
