import React from 'react';
import InfoLayout from '../../components/InfoLayout/InfoLayout';

export default function PrivacyPolicy() {
  return (
    <InfoLayout title="Privacy Policy">
      <h2>Your Privacy Matters</h2>
      <p>Last updated: April 21, 2026</p>
      
      <p>
        At Sherla Properties, we are committed to protecting your personal data. This policy explains how we collect, use, and safeguard your information.
      </p>

      <h3>Information We Collect</h3>
      <ul>
        <li><strong>Personal Details:</strong> Name, email, and phone number when you register or enquire.</li>
        <li><strong>Usage Data:</strong> Browsing history, search preferences, and interaction with physical listings.</li>
        <li><strong>Cookies:</strong> Small data files stored on your device to remember your preferences and improve performance.</li>
      </ul>

      <h3>How We Use Your Data</h3>
      <p>
        Your data is used to personalize your property search, facilitate communication with agents, and send relevant alerts about price drops or new listings.
      </p>

      <h3>Data Protection</h3>
      <p>
        We implement industry-standard encryption and security measures to protect your data from unauthorized access or disclosure. We never sell your personal information to third-party marketing agencies.
      </p>

      <h3>Your Choices</h3>
      <p>
        You can opt-out of newsletters and marketing alerts at any time through your profile settings. You also have the right to request the deletion of your account and personal data.
      </p>
    </InfoLayout>
  );
}
