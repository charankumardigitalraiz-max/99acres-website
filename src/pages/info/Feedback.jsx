import React from 'react';
import InfoLayout from '../../components/InfoLayout/InfoLayout';

export default function Feedback() {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Thank you for your valuable feedback!');
  };

  return (
    <InfoLayout title="Feedback">
      <h2>Help Us Improve</h2>
      <p>
        Your feedback is crucial to making Sherla Properties the best real estate platform in India. Whether it's a suggestion, a compliment, or a critique, we want to hear it.
      </p>

      <form className="info-form" onSubmit={handleSubmit} style={{ marginTop: '40px' }}>
        <div className="form-group">
          <label>Overall Satisfaction</label>
          <select required>
            <option value="">Select an option</option>
            <option value="5">Very Satisfied</option>
            <option value="4">Satisfied</option>
            <option value="3">Neutral</option>
            <option value="2">Unsatisfied</option>
            <option value="1">Very Unsatisfied</option>
          </select>
        </div>
        
        <div className="form-group">
          <label>What do you like most about our platform?</label>
          <input type="text" placeholder="e.g. Verified listings, Ease of use" />
        </div>

        <div className="form-group">
          <label>Your Feedback</label>
          <textarea rows="6" placeholder="Tell us more about your experience..." required></textarea>
        </div>

        <button type="submit" className="btn-submit">Submit Feedback</button>
      </form>
    </InfoLayout>
  );
}
