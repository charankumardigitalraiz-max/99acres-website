import React from 'react';
import InfoLayout from '../../components/InfoLayout/InfoLayout';

export default function Grievances() {
  return (
    <InfoLayout title="Grievances">
      <h2>Grievance Redressal Mechanism</h2>
      <p>
        Sherla Properties is committed to resolving any complaints or grievances you may have regarding our services or platform in a timely and fair manner.
      </p>

      <h3>Grievance Officer</h3>
      <p>
        In accordance with the Information Technology Act and rules made thereunder, the name and contact details of the Grievance Officer are provided below:
      </p>
      
      <div style={{ background: '#f8fafc', padding: '24px', borderRadius: 'var(--radius-sm)', borderLeft: '4px solid var(--primary)', margin: '30px 0' }}>
        <p style={{ fontWeight: '700', marginBottom: '8px', color: 'var(--dark)' }}>Mr. Rajesh Varma</p>
        <p style={{ margin: 0 }}>Grievance Officer, Sherla Properties Pvt. Ltd.</p>
        <p style={{ margin: 0 }}>Email: <a href="mailto:grievance@sherlaproperties.com" style={{ color: 'var(--primary)' }}>grievance@sherlaproperties.com</a></p>
        <p style={{ margin: 0 }}>Phone: +91 93815 59642 (Ext: 404)</p>
      </div>

      <h3>Escalation Matrix</h3>
      <ol style={{ paddingLeft: '20px' }}>
        <li><strong>Level 1 (Support):</strong> Contact our customer support team via the Help Center.</li>
        <li><strong>Level 2 (Grievance Officer):</strong> If you are not satisfied with the Level 1 response, escalate to the Grievance Officer.</li>
        <li><strong>Level 3 (Management):</strong> If the issue remains unresolved after 15 days, it will be reviewed by our senior management.</li>
      </ol>

      <p>
        We target to resolve all grievances within 15 business days from the date of receipt of the complaint.
      </p>
    </InfoLayout>
  );
}
