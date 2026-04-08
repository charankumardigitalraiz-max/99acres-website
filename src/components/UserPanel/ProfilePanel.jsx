import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateProfile } from '../../store/slices/userPanelSlice';

export default function ProfilePanel() {
  const dispatch = useDispatch();
  const { profile } = useSelector(state => state.userPanel);
  
  const [form, setForm] = useState({ ...profile });
  const [saved, setSaved] = useState(false);

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  
  const handleSave = () => {
    dispatch(updateProfile(form));
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="up-card">
      <div className="up-card-title">My Profile</div>
      <div className="up-card-sub">Update your personal information</div>

      <div className="up-avatar-edit">
        <div className="up-avatar-large">
          {(form.firstName[0] || '?').toUpperCase()}
        </div>
        <div className="up-avatar-info">
          <strong>{form.firstName} {form.lastName}</strong>
          <p>Premium Member · Since {profile.memberSince}</p>
        </div>
      </div>

      <div className="up-divider" />

      <div className="up-form-grid">
        <div className="up-form-group">
          <label>First Name</label>
          <input name="firstName" value={form.firstName} onChange={handleChange} placeholder="First name" />
        </div>
        <div className="up-form-group">
          <label>Last Name</label>
          <input name="lastName" value={form.lastName} onChange={handleChange} placeholder="Last name" />
        </div>
        <div className="up-form-group">
          <label>Email</label>
          <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="Email" />
        </div>
        <div className="up-form-group">
          <label>Phone</label>
          <input name="phone" value={form.phone} onChange={handleChange} placeholder="+91 XXXXX XXXXX" />
        </div>
        <div className="up-form-group">
          <label>City</label>
          <select name="city" value={form.city} onChange={handleChange}>
            {['Mumbai', 'Bangalore', 'Delhi NCR', 'Hyderabad', 'Chennai', 'Pune'].map(c => <option key={c}>{c}</option>)}
          </select>
        </div>
        <div className="up-form-group full">
          <label>Bio</label>
          <textarea name="bio" value={form.bio} onChange={handleChange} />
        </div>
      </div>

      <div className="up-form-actions" style={{ marginTop: 20 }}>
        <button className="up-btn up-btn-primary" onClick={handleSave}>
          {saved ? '✓ Saved!' : 'Save Changes'}
        </button>
        <button className="up-btn up-btn-ghost" onClick={() => setForm({ ...profile })}>Cancel</button>
      </div>
    </div>
  );
}
