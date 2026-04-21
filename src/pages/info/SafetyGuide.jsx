import React from 'react';
import InfoLayout from '../../components/InfoLayout/InfoLayout';

export default function SafetyGuide() {
  return (
    <InfoLayout title="Safety Guide">
      <h2>Your Safety is Our Priority</h2>
      <p>
        At Sherla Properties, we go to great lengths to verify listings, but it's important for you to stay vigilant and follow safe practices during your property search.
      </p>

      <h3>1. Verify Before Paying</h3>
      <p>
        Never pay "token money" or "visit charges" to an owner or agent before physically visiting the property and verifying the documents. Sherla Properties does not charge any fees to visit a property.
      </p>

      <h3>2. Meet in Public Places</h3>
      <p>
        When meeting a property owner or agent for the first time, try to bring a friend or family member along and meet during daylight hours.
      </p>

      <h3>3. Check the Documents</h3>
      <p>
        Always ask for the RERA registration number for new projects. For resale properties, verify the Sale Deed, Encumbrance Certificate (EC), and Tax Receipts.
      </p>

      <h3>4. Use Official Channels</h3>
      <p>
        Communicate through the Sherla Properties platform as much as possible. This helps us maintain a record of interactions in case of any disputes.
      </p>

      <h3>5. Report Suspicious Activity</h3>
      <p>
        If you find a listing that seems "too good to be true" or an agent who asks for upfront payment for suspicious reasons, report it immediately using our <a href="/report-problem" style={{ color: 'var(--primary)', fontWeight: '600' }}>Report a Problem</a> page.
      </p>

      <div style={{ marginTop: '40px', padding: '24px', background: '#fff9eb', border: '1px solid #ffeeba', borderRadius: 'var(--radius-sm)' }}>
        <h4 style={{ color: '#856404', marginBottom: '10px' }}>⚠️ Scam Alert</h4>
        <p style={{ margin: 0, color: '#856404', fontSize: '0.9rem' }}>
          Real estate scams often involve "overseas owners" who cannot meet in person. Always insist on seeing the property and meeting a local representative before making any payment.
        </p>
      </div>
    </InfoLayout>
  );
}
