import React from 'react';
import InfoLayout from '../../components/InfoLayout/InfoLayout';

export default function RequestInfo() {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Request submitted! One of our property consultants will reach out to you within 24 hours.');
  };

  return (
    <InfoLayout title="Request Info">
      <h2>Need Specific Details?</h2>
      <p>
        If you're looking for detailed brochures, floor plans, or pricing for a specific project or locality that you haven't found on our platform yet, use this form.
      </p>

      <form className="info-form" onSubmit={handleSubmit} style={{ marginTop: '40px' }}>
        <div className="form-group">
          <label>Project / Locality Name</label>
          <input type="text" placeholder="e.g. Prestige Highfield or Jubilee Hills" required />
        </div>
        
        <div className="form-group">
          <label>Information Needed</label>
          <select required>
            <option value="">Select an option</option>
            <option value="brochure">Project Brochure</option>
            <option value="pricing">Full Price List</option>
            <option value="plans">Floor Plans</option>
            <option value="visit">Schedule a Site Visit</option>
            <option value="other">Other Details</option>
          </select>
        </div>

        <div className="form-group">
          <label>Your Name</label>
          <input type="text" placeholder="Full Name" required />
        </div>

        <div className="form-group">
          <label>Phone Number</label>
          <input type="tel" placeholder="+91 00000 00000" required />
        </div>

        <button type="submit" className="btn-submit">Request Information</button>
      </form>
    </InfoLayout>
  );
}
