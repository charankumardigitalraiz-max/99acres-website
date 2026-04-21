import React from 'react';
import InfoLayout from '../../components/InfoLayout/InfoLayout';

export default function ContactUs() {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Thank you for contacting us! We will get back to you shortly.');
  };

  return (
    <InfoLayout title="Contact Us">
      <h2>Get in Touch</h2>
      <p>
        Have questions about a listing, or need assistance with your property search? Our team of real estate experts is ready to help you.
      </p>

      <div className="contact-info-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px', margin: '40px 0' }}>
        <div className="contact-method">
          <h4 style={{ color: 'var(--dark)', marginBottom: '10px' }}>Our Office</h4>
          <p>Sherla Properties Pvt. Ltd.<br />12th Floor, Elite Towers, Jubilee Hills<br />Hyderabad, Telangana - 500033</p>
        </div>
        <div className="contact-method">
          <h4 style={{ color: 'var(--dark)', marginBottom: '10px' }}>Call Us</h4>
          <p>Support: +91 93815 59642<br />Sales: +91 98765 43210</p>
        </div>
      </div>

      <h3>Send us a Message</h3>
      <form className="info-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Full Name</label>
          <input type="text" placeholder="Enter your full name" required />
        </div>
        <div className="form-group">
          <label>Email Address</label>
          <input type="email" placeholder="example@gmail.com" required />
        </div>
        <div className="form-group">
          <label>Phone Number</label>
          <input type="tel" placeholder="+91 00000 00000" required />
        </div>
        <div className="form-group">
          <label>Message</label>
          <textarea rows="5" placeholder="How can we help you?" required></textarea>
        </div>
        <button type="submit" className="btn-submit">Submit Message</button>
      </form>
    </InfoLayout>
  );
}
