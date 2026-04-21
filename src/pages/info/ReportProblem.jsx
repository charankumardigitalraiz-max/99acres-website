import React from 'react';
import InfoLayout from '../../components/InfoLayout/InfoLayout';

export default function ReportProblem() {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Thank you for reporting this issue. Our technical team has been notified.');
  };

  return (
    <InfoLayout title="Report a problem">
      <h2>Found a Glitch?</h2>
      <p>
        If you've encountered a technical issue, a bug, or incorrect information on our platform, please let us know so we can fix it immediately.
      </p>

      <form className="info-form" onSubmit={handleSubmit} style={{ marginTop: '40px' }}>
        <div className="form-group">
          <label>Type of Problem</label>
          <select required>
            <option value="">Select an option</option>
            <option value="technical">Technical Bug (Site not working)</option>
            <option value="listing">Listing Issue (Incorrect details)</option>
            <option value="account">Account / Login Issue</option>
            <option value="other">Other Issue</option>
          </select>
        </div>
        
        <div className="form-group">
          <label>Description of the issue</label>
          <textarea rows="6" placeholder="Please describe what happened and include any error messages you saw..." required></textarea>
        </div>

        <div className="form-group">
          <label>URL where the issue occurred (optional)</label>
          <input type="text" placeholder="https://sherla-properties.com/..." />
        </div>

        <button type="submit" className="btn-submit">Report Problem</button>
      </form>
    </InfoLayout>
  );
}
