import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  plans: [
    {
      id: 'basic',
      name: 'Basic',
      price: '0',
      popular: false,
      features: [
        { text: 'Post 1 property', included: true },
        { text: 'Standard visibility', included: true },
        { text: 'Email support', included: true },
        { text: 'Verified buyer tags', included: false },
        { text: 'Dedicated account manager', included: false },
        { text: 'Premium high-rated placement', included: false }
      ],
      cta: 'Get Started Free',
      btnClass: 'btn-plan-outline'
    },
    {
      id: 'premium',
      name: 'Premium',
      price: '999',
      popular: true,
      features: [
        { text: 'Post up to 5 properties', included: true },
        { text: 'Top page visibility', included: true },
        { text: 'Priority email & chat support', included: true },
        { text: 'Verified buyer tags', included: true },
        { text: 'High-quality lead alerts', included: true },
        { text: 'Dedicated account manager', included: false }
      ],
      cta: 'Choose Premium',
      btnClass: 'btn-primary'
    },
    {
      id: 'pro',
      name: 'Pro Builder',
      price: '2999',
      popular: false,
      features: [
        { text: 'Unlimited property posts', included: true },
        { text: 'Premium high-rated placement', included: true },
        { text: '24/7 priority phone support', included: true },
        { text: 'Verified buyer tags', included: true },
        { text: 'High-quality lead alerts', included: true },
        { text: 'Dedicated account manager', included: true }
      ],
      cta: 'Contact Sales',
      btnClass: 'btn-plan-outline'
    }
  ],
  billingCycle: 'monthly', // 'monthly' | 'annual'
  activeSubscriptionId: null, // The currently purchased plan ID
};

const subscriptionSlice = createSlice({
  name: 'subscription',
  initialState,
  reducers: {
    setBillingCycle(state, action) {
      state.billingCycle = action.payload;
    },
    subscribeToPlan(state, action) {
      state.activeSubscriptionId = action.payload;
    }
  }
});

export const { setBillingCycle, subscribeToPlan } = subscriptionSlice.actions;
export default subscriptionSlice.reducer;
