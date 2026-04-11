import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setBillingCycle, subscribeToPlan } from '../../store/slices/subscriptionSlice';
import { CheckCircle2, CreditCard, ShieldCheck, Zap, ArrowUpRight, Crown } from 'lucide-react';

export default function SubscriptionPanel() {
  const dispatch = useDispatch();
  const { plans, billingCycle, activeSubscriptionId } = useSelector(state => state.subscription);

  // Status defaults
  const activePlan = plans.find(p => p.id === (activeSubscriptionId || 'basic'));
  const upgradePlans = plans.filter(p => p.id !== activePlan?.id);

  // Mock usage data
  const usage = {
    listings: 10,
    used: 10,
    validUntil: 'May 15, 2026'
  };

  const available = Math.max(0, usage.listings - usage.used);
  const isLimitReached = usage.used >= usage.listings;

  const getDisplayPrice = (plan, isAnnual) => {
    if (plan.price === '0') return '0';
    const basePrice = parseInt(plan.price.replace(',', ''), 10);
    return isAnnual ? Math.round(basePrice * 0.8).toLocaleString('en-IN') : basePrice.toLocaleString('en-IN');
  };

  const PlanVerticalCard = ({ plan, type = 'upgrade' }) => {
    const isPopular = plan.popular;
    const isPresent = type === 'present';

    return (
      <div className={`up-vertical-card ${isPresent ? 'present' : 'upgrade'} ${isPopular ? 'popular' : ''}`}>
        {isPresent && <div className="present-tag"><Crown size={12} /> Your Active Plan</div>}
        {isPopular && !isPresent && <div className="popular-tag">Recommended Upgrade</div>}

        <div className="card-main-content vertical">
          <div className="card-header-v">
            <h3 className="plan-name">{plan.name}</h3>
            <div className="plan-price-block">
              <span className="currency">₹</span>
              <span className="amount">{getDisplayPrice(plan, billingCycle === 'annual')}</span>
              <span className="period">/{billingCycle === 'annual' ? 'year' : 'mo'}</span>
            </div>
          </div>

          <div className="card-body-v">
            <div className="plan-features-list vertical">
              {plan.features.map((f, i) => (
                <div key={i} className={`feature-item ${f.included ? '' : 'disabled'}`}>
                  <CheckCircle2 size={16} className="feature-icon" />
                  <span>{f.text}</span>
                </div>
              ))}
            </div>

            <div className="card-footer-v">
              {!isPresent ? (
                <div className="upgrade-actions">
                  <p className="benefit-text">Unlock higher visibility and more leads with {plan.name}.</p>
                  <button
                    className="up-btn up-btn-amber full-width"
                    onClick={() => dispatch(subscribeToPlan(plan.id))}
                  >
                    Upgrade to {plan.name}
                  </button>
                </div>
              ) : (
                <div className="active-status-details">
                  <div className="validity-box">
                    <span className="label">Expires on</span>
                    <span className="value">{usage.validUntil}</span>
                  </div>
                  {/* <button className="up-btn up-btn-ghost full-width" disabled>Current Plan</button> */}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };


  return (
    <div className="up-panel-fade-in subscription-vertical-layout">
      {/* ── TOP SUMMARY BAR ── */}
      <div className="up-sub-summary-bar">
        <div className='summary-stats-row'>
          <div className="summary-stat">
            <span className="label">Total Listings</span>
            <span className="value">{usage.listings}</span>
          </div>
          <div className="summary-stat available">
            <span className="label">Used Listings</span>
            <span className="value">{usage.used}/{usage.listings}</span>
          </div>
          <div className="summary-stat available">
            <span className="label">Available Listings</span>
            <span className="value">{available}</span>
          </div>
        </div>

        <div className="summary-toggle-wrapper">
          <div className="up-sub-toggle small">
            <button className={billingCycle === 'monthly' ? 'active' : ''} onClick={() => dispatch(setBillingCycle('monthly'))}>Monthly</button>
            <button className={billingCycle === 'annual' ? 'active' : ''} onClick={() => dispatch(setBillingCycle('annual'))}>Annual <span>-20%</span></button>
          </div>
        </div>
      </div>

      {/* ── PLANS ROW ── */}
      <div className="plans-horizontal-section">
        <div className="plans-section-label">
          <h2>Your Plans</h2>
          <span>Compare and manage your membership</span>
        </div>
        <div className="plans-grid-row">
          <PlanVerticalCard plan={activePlan} type="present" />
          {upgradePlans.map(plan => <PlanVerticalCard key={plan.id} plan={plan} />)}
        </div>
      </div>

      {/* ── TOP-UP / ADD-ONS (Below Plans) ── */}
      {isLimitReached && (
        <div className="topup-alert-card">
          <div className="topup-alert-left">
            <div className="topup-alert-icon"><Zap size={16} /></div>
            <div className="topup-alert-text">
              <strong>Listing Limit Reached</strong>
              <span>You've used all {usage.listings} listings on your plan.</span>
            </div>
          </div>
          <div className="topup-offer-block">
            <div className="topup-offer-info">
              <span className="topup-offer-name">Single Property Post</span>
              <span className="topup-offer-meta">₹199 &nbsp;•&nbsp; 30 days validity</span>
            </div>
            <button className="up-btn up-btn-amber">Buy Top-up</button>
          </div>
        </div>
      )}

      <div className="up-card sub-billing-card">
        <div className="up-billing-info">
          <CreditCard size={24} />
          <div>
            <h4>Billing & Payments</h4>
            <p>Manage your payment methods and view subscription history.</p>
          </div>
          <button className="up-btn up-btn-ghost" style={{ marginLeft: 'auto' }}>Manage Billing</button>
        </div>
      </div>
    </div>
  );

}


