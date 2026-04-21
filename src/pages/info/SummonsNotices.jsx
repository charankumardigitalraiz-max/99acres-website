import React from 'react';
import InfoLayout from '../../components/InfoLayout/InfoLayout';

export default function SummonsNotices() {
  return (
    <InfoLayout title="Summons/Notices">
      <h2>Legal Correspondence</h2>
      <p>
        This section is dedicated to the receipt of legal summons, judicial notices, and official government correspondence addressed to Sherla Properties Pvt. Ltd.
      </p>

      <h3>How to Serve a Notice</h3>
      <p>
        To ensure prompt processing of any legal document, please serve all official notices to our registered corporate office or via our dedicated legal email address:
      </p>
      
      <ul>
        <li><strong>Corporate Office:</strong> 12th Floor, Elite Towers, Jubilee Hills, Hyderabad - 500033</li>
        <li><strong>Legal Email:</strong> <a href="mailto:legal@sherlaproperties.com" style={{ color: 'var(--primary)', fontWeight: '600' }}>legal@sherlaproperties.com</a></li>
      </ul>

      <h3>Required Information</h3>
      <p>
        All summons or notices must include:
      </p>
      <ul>
        <li>Case Number or Reference Number.</li>
        <li>Full contact information of the serving party or their legal representative.</li>
        <li>A clear subject line indicating the nature of the notice.</li>
      </ul>

      <h3>Response Time</h3>
      <p>
        Our legal department acknowledges all receipt within 48 business hours. For urgent matters, please mark the email subject as "URGENT".
      </p>
    </InfoLayout>
  );
}
