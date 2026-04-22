import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setBillingCycle, subscribeToPlan } from '../../store/slices/subscriptionSlice';
import { CheckCircle2, CreditCard, Zap, Crown } from 'lucide-react';

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
      <div className={`relative flex flex-col h-full bg-white border rounded-[20px] transition-all duration-300 overflow-hidden
        ${isPresent ? 'border-amber-500/30 bg-amber-50/5' : 'border-slate-100'}
        ${isPopular && !isPresent ? 'ring-2 ring-amber-500/20' : ''}
        ${!isPresent ? 'hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)] hover:-translate-y-1' : ''}
      `}>
        {isPresent && (
          <div className="absolute top-0 right-0 bg-amber-500 text-white text-[0.65rem] font-bold px-3 py-1 rounded-bl-xl flex items-center gap-1 z-10 shadow-sm transition-transform">
            <Crown size={12} /> Active Plan
          </div>
        )}
        {isPopular && !isPresent && (
          <div className="absolute top-0 inset-x-0 bg-amber-500 text-white text-[0.65rem] font-bold py-1 text-center uppercase tracking-widest z-10">
            Recommended Upgrade
          </div>
        )}

        <div className={`p-6 flex flex-col h-full ${isPopular && !isPresent ? 'pt-8' : ''}`}>
          <div className="mb-6">
            <h3 className="text-[1.1rem] font-bold text-slate-900 mb-2">{plan.name}</h3>
            <div className="flex items-baseline gap-1">
              <span className="text-[1rem] font-bold text-slate-400">₹</span>
              <span className="text-[2rem] font-extrabold text-slate-900 tracking-tight">{getDisplayPrice(plan, billingCycle === 'annual')}</span>
              <span className="text-[0.85rem] font-medium text-slate-400">/{billingCycle === 'annual' ? 'year' : 'month'}</span>
            </div>
          </div>

          <div className="flex flex-col gap-3.5 flex-1 mb-8">
            {plan.features.map((f, i) => (
              <div key={i} className={`flex items-start gap-2.5 text-[0.88rem] ${f.included ? 'text-slate-600' : 'text-slate-300'}`}>
                <CheckCircle2 size={16} className={`mt-0.5 shrink-0 ${f.included ? 'text-emerald-500' : 'text-slate-200'}`} />
                <span>{f.text}</span>
              </div>
            ))}
          </div>

          <div className="mt-auto pt-6 border-t border-slate-50">
            {!isPresent ? (
              <div className="flex flex-col gap-4">
                <p className="text-[0.8rem] text-slate-400 leading-normal">Unlock higher visibility and more leads with {plan.name}.</p>
                <button
                  className="w-full py-3 rounded-xl bg-amber-500 text-white font-bold text-[0.9rem] transition-all hover:bg-amber-600 hover:shadow-lg hover:shadow-amber-500/25 active:scale-[0.98] cursor-pointer"
                  onClick={() => dispatch(subscribeToPlan(plan.id))}
                >
                  Upgrade to {plan.name}
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-1">
                <span className="text-[0.7rem] font-bold text-slate-400 uppercase tracking-wider">Valid Until</span>
                <span className="text-[0.95rem] font-bold text-slate-900">{usage.validUntil}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };


  return (
    <div className="flex flex-col gap-6">
      {/* ── TOP SUMMARY BAR ── */}
      <div className="flex flex-col lg:flex-row items-center justify-between gap-6 p-6 bg-white border border-slate-100 rounded-[18px] shadow-[0_2px_12px_rgba(0,0,0,0.01)]">
        <div className="flex items-center gap-8 w-full lg:w-auto overflow-x-auto pb-2 lg:pb-0 scrollbar-hide">
          <div className="flex flex-col min-w-max">
            <span className="text-[0.65rem] font-bold text-slate-400 uppercase tracking-widest mb-1">Total Listings</span>
            <span className="text-[1.25rem] font-extrabold text-slate-900 leading-none">{usage.listings}</span>
          </div>
          <div className="w-px h-8 bg-slate-100 shrink-0" />
          <div className="flex flex-col min-w-max">
            <span className="text-[0.65rem] font-bold text-slate-400 uppercase tracking-widest mb-1">Used Listings</span>
            <span className="text-[1.25rem] font-extrabold text-slate-900 leading-none">{usage.used}<span className="text-slate-300 text-[0.8rem] font-bold">/{usage.listings}</span></span>
          </div>
          <div className="w-px h-8 bg-slate-100 shrink-0" />
          <div className="flex flex-col min-w-max">
            <span className="text-[0.65rem] font-bold text-slate-400 uppercase tracking-widest mb-1">Available</span>
            <span className={`text-[1.25rem] font-extrabold transition-colors leading-none ${available > 0 ? 'text-emerald-500' : 'text-red-500'}`}>{available}</span>
          </div>
        </div>

        <div className="bg-slate-50 p-1 rounded-xl flex self-stretch lg:self-auto min-w-[220px]">
          <button 
            className={`flex-1 py-2 px-4 text-[0.82rem] font-bold rounded-lg transition-all
              ${billingCycle === 'monthly' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`} 
            onClick={() => dispatch(setBillingCycle('monthly'))}
          >
            Monthly
          </button>
          <button 
            className={`flex-1 py-2 px-4 text-[0.82rem] font-bold rounded-lg flex items-center justify-center gap-1.5 transition-all
              ${billingCycle === 'annual' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`} 
            onClick={() => dispatch(setBillingCycle('annual'))}
          >
            Annual <span className="bg-emerald-500 text-white text-[0.6rem] px-1.5 py-0.5 rounded-full">-20%</span>
          </button>
        </div>
      </div>

      {/* ── PLANS GRID ── */}
      <div className="flex flex-col gap-6">
        <div className="flex flex-col">
          <h2 className="text-[1.15rem] font-bold text-slate-900 tracking-tight mb-1">Available Plans</h2>
          <span className="text-[0.85rem] text-slate-500 font-medium">Compare and manage your membership benefits</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <PlanVerticalCard plan={activePlan} type="present" />
          {upgradePlans.map(plan => <PlanVerticalCard key={plan.id} plan={plan} />)}
        </div>
      </div>

      {/* ── TOP-UP ALERT ── */}
      {isLimitReached && (
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 p-6 bg-slate-900 rounded-[18px] border border-slate-800 shadow-[0_20px_40px_rgba(0,0,0,0.15)] relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full -mr-16 -mt-16 blur-3xl" />
          <div className="flex items-center gap-5 z-10 w-full md:w-auto">
            <div className="w-12 h-12 rounded-2xl bg-amber-500 flex items-center justify-center text-slate-900 shadow-[0_4px_12px_rgba(245,158,11,0.3)] shrink-0 group-hover:scale-110 transition-transform">
              <Zap size={22} fill="currentColor" />
            </div>
            <div>
              <strong className="block text-white text-[1.1rem] font-bold mb-0.5 tracking-tight truncate">Listing Limit Reached</strong>
              <span className="text-slate-400 text-[0.88rem] block truncate">You've used all {usage.listings} listings on your plan.</span>
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-center gap-6 z-10 w-full md:w-auto md:ml-auto">
            <div className="text-center md:text-right w-full md:w-auto border-t md:border-t-0 md:border-l border-slate-800 pt-4 md:pt-0 md:pl-6 shrink-0">
              <span className="block text-white text-[0.95rem] font-bold mb-0.5">Single Property Post</span>
              <span className="block text-slate-400 text-[0.75rem] font-semibold uppercase tracking-wider">₹199 &bull; 30 Days</span>
            </div>
            <button className="w-full md:w-auto px-6 py-3 rounded-xl bg-amber-500 text-slate-900 font-extrabold text-[0.9rem] transition-all hover:bg-white hover:-translate-y-0.5 hover:shadow-xl active:scale-95 cursor-pointer shadow-lg shadow-amber-500/20">
              Buy Top-up
            </button>
          </div>
        </div>
      )}

      {/* ── BILLING CARD ── */}
      <div className="p-6 bg-white border border-slate-100 rounded-[18px] shadow-[0_2px_12px_rgba(0,0,0,0.01)] flex items-center gap-5 group cursor-pointer hover:border-slate-200 transition-colors">
        <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center text-slate-500 group-hover:bg-slate-900 group-hover:text-white transition-all">
          <CreditCard size={24} />
        </div>
        <div className="flex-1">
          <h4 className="text-[0.95rem] font-bold text-slate-900 mb-0.5">Billing & Payments</h4>
          <p className="text-[0.82rem] text-slate-500">Manage your payment methods and view subscription history.</p>
        </div>
        <button className="hidden sm:flex px-4 py-2 rounded-lg font-bold text-[0.82rem] bg-transparent border border-slate-200 text-slate-600 transition-all hover:bg-slate-50 hover:text-slate-900 cursor-pointer">
          Manage Billing
        </button>
      </div>
    </div>
  );
}
