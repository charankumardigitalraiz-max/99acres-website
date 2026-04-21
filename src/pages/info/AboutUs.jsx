import React from 'react';
import InfoLayout from '../../components/InfoLayout/InfoLayout';

export default function AboutUs() {
  return (
    <InfoLayout title="About Us">
      <h2>Welcome to Sherla Properties</h2>
      <p>
        Founded in 2008, Sherla Properties has grown from a local boutique agency to one of India's most trusted real estate platforms. Our mission is simple: to bring transparency, efficiency, and elite service to the property buying and renting experience.
      </p>
      
      <h3>Our Vision</h3>
      <p>
        To redefine the real estate landscape in India by empowering every individual with verified information and seamless digital tools to find their dream home or investment.
      </p>

      <h3>Why Choose Us?</h3>
      <ul>
        <li><strong>Verified Listings:</strong> Every property on our platform undergoes a multi-step verification process.</li>
        <li><strong>Elite Partnerships:</strong> We work directly with RERA-certified builders and premium developers.</li>
        <li><strong>Customer-First Approach:</strong> Our dedicated support teams are available around the clock to assist you.</li>
        <li><strong>Cutting-Edge Tech:</strong> From 3D tours to real-time market data, we provide the best tools in the industry.</li>
      </ul>

      <h3>Our Journey</h3>
      <p>
        What started as a small team in Bangalore has now expanded to over 50 cities, serving millions of happy customers. We take pride in our heritage of trust and our commitment to the future of real estate.
      </p>
    </InfoLayout>
  );
}
