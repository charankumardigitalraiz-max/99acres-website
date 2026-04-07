import { useDispatch, useSelector } from 'react-redux';
import { setBillingCycle, subscribeToPlan } from '../store/slices/subscriptionSlice';
import { Check, X } from 'lucide-react';

export default function Subscription() {
  const dispatch = useDispatch();
  const { plans, billingCycle, activeSubscriptionId } = useSelector(state => state.subscription);

  // Helper function to calculate and format prices cleanly
  const getDisplayPrice = (plan, isAnnual) => {
    if (plan.price === '0') return '0';
    
    // Parse the raw price
    const basePrice = parseInt(plan.price.replace(',', ''), 10);
    
    // Most SaaS platforms show the "Monthly Equivalent" discounted rate for Annual plans
    if (isAnnual) {
      const discountedMonthly = Math.round(basePrice * 0.8);
      return discountedMonthly.toLocaleString('en-IN');
    }
    
    // If monthly, just format the base price
    return basePrice.toLocaleString('en-IN');
  };

  // Helper to show the annual total in small text beneath the rate
  const getAnnualTotal = (plan) => {
    if (plan.price === '0') return 'Free forever';
    const basePrice = parseInt(plan.price.replace(',', ''), 10);
    const total = Math.round(basePrice * 0.8 * 12);
    return `Billed annually at ₹${total.toLocaleString('en-IN')}`;
  };

  return (
    <div className="sub-page">
      <div className="container">
        
        <div className="sub-header">
          <h1 className="sub-title">Post Properties & Find Buyers Faster</h1>
          <p className="sub-desc">Select a plan that suits your needs. Scale your real estate business with our premium tools.</p>
          
          <div style={{ display: 'inline-flex', background: 'var(--white)', border: '1px solid var(--border)', borderRadius: '30px', padding: '4px', marginTop: '24px' }}>
            <button 
              onClick={() => dispatch(setBillingCycle('monthly'))}
              style={{ padding: '8px 24px', borderRadius: '24px', fontSize: '0.9rem', fontWeight: 600, background: billingCycle === 'monthly' ? 'var(--primary)' : 'transparent', color: billingCycle === 'monthly' ? 'var(--dark)' : 'var(--text-2)', transition: 'all 0.2s' }}
            >
              Monthly
            </button>
            <button 
              onClick={() => dispatch(setBillingCycle('annual'))}
              style={{ padding: '8px 24px', borderRadius: '24px', fontSize: '0.9rem', fontWeight: 600, background: billingCycle === 'annual' ? 'var(--primary)' : 'transparent', color: billingCycle === 'annual' ? 'var(--dark)' : 'var(--text-2)', display: 'flex', alignItems: 'center', gap: '6px', transition: 'all 0.2s' }}
            >
              Annual <span style={{ background: '#ecfdf5', color: '#059669', fontSize: '0.65rem', padding: '2px 6px', borderRadius: '4px' }}>Save 20%</span>
            </button>
          </div>
        </div>

        <div className="pricing-grid">
          {plans.map(plan => (
            <div key={plan.id} className={`pricing-card ${plan.popular ? 'popular' : ''}`}>
              {plan.popular && <div className="pricing-badge">Most Popular</div>}
              
              <div className="plan-name">{plan.name}</div>
              <div className="plan-price" style={{ marginBottom: '0' }}>
                <span className="price-currency">₹</span>
                {getDisplayPrice(plan, billingCycle === 'annual')}
                <span className="price-duration">
                  {plan.price !== '0' ? '/mo' : ''}
                </span>
              </div>
              
              {/* Show the annual explicit total directly below if toggled */}
              <div style={{ fontSize: '0.75rem', color: 'var(--text-3)', height: '20px', marginTop: '4px' }}>
                {billingCycle === 'annual' && plan.price !== '0' ? getAnnualTotal(plan) : ''}
              </div>
              
              <div className="plan-features">
                {plan.features.map((feature, i) => (
                  <div key={i} className={`feature-item ${!feature.included ? 'disabled' : ''}`}>
                    <span className="feature-icon">
                      {feature.included ? <Check size={18} /> : <X size={18} />}
                    </span>
                    {feature.text}
                  </div>
                ))}
              </div>
              
              <button 
                className={`plan-btn ${plan.btnClass}`}
                onClick={() => dispatch(subscribeToPlan(plan.id))}
              >
                {activeSubscriptionId === plan.id ? 'Active Plan ✓' : plan.cta}
              </button>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
