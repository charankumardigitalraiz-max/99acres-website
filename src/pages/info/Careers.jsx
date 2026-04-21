import React from 'react';
import InfoLayout from '../../components/InfoLayout/InfoLayout';

export default function Careers() {
  const positions = [
    { title: 'Real Estate Consultant', location: 'Hyderabad', type: 'Full-time' },
    { title: 'Senior Software Engineer (Frontend)', location: 'Remote / Bangalore', type: 'Full-time' },
    { title: 'Customer Success Associate', location: 'Mumbai', type: 'Full-time' },
    { title: 'Market Research Analyst', location: 'Delhi NCR', type: 'Contract' },
  ];

  return (
    <InfoLayout title="Careers with us">
      <h2>Join the Elite Team</h2>
      <p>
        Building the future of real estate requires the brightest minds across technology, sales, and operations. At Sherla Properties, we offer an environment of growth, innovation, and "Quiet Luxury".
      </p>

      <h3>Why Work With Us?</h3>
      <ul>
        <li><strong>Innovation First:</strong> Work on industry-leading search algorithms and digital property tools.</li>
        <li><strong>Growth & Learning:</strong> Dedicated mentorship and training budgets for every employee.</li>
        <li><strong>Competitive Benefits:</strong> Comprehensive health insurance and performance-based bonuses.</li>
        <li><strong>Culture of Excellence:</strong> Join a team that values integrity and premium service delivery.</li>
      </ul>

      <h3>Open Positions</h3>
      <div className="positions-list" style={{ marginTop: '30px' }}>
        {positions.map((job, index) => (
          <div key={index} style={{ padding: '20px', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', marginBottom: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h4 style={{ color: 'var(--dark)' }}>{job.title}</h4>
              <p style={{ margin: 0, fontSize: '0.9rem' }}>{job.location} • {job.type}</p>
            </div>
            <button className="btn-submit" style={{ padding: '8px 20px', fontSize: '0.85rem' }}>Apply Now</button>
          </div>
        ))}
      </div>
      
      <p style={{ marginTop: '40px' }}>
        Don't see a position that fits? Send your resume to <a href="mailto:careers@sherlaproperties.com" style={{ color: 'var(--primary)', fontWeight: '600' }}>careers@sherlaproperties.com</a> and we'll reach out when something matches.
      </p>
    </InfoLayout>
  );
}
