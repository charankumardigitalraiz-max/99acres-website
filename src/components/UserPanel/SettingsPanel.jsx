import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleSetting } from '../../store/slices/userPanelSlice';

export default function SettingsPanel() {
  const dispatch = useDispatch();
  const { settings } = useSelector(state => state.userPanel);

  const rows = [
    { key: 'emailAlerts', label: 'Email Alerts', desc: 'Receive property updates via email' },
    { key: 'pushNotifs', label: 'Push Notifications', desc: 'Browser & mobile push alerts' },
    { key: 'priceDrops', label: 'Price Drop Alerts', desc: 'Notify when saved property prices fall' },
    { key: 'newListings', label: 'New Listing Alerts', desc: 'Get notified for new matching properties' },
    { key: 'newsletter', label: 'Monthly Newsletter', desc: 'Market trends and tips from our experts' },
    { key: 'twoFactor', label: 'Two-Factor Authentication', desc: 'Add extra security to your account' },
  ];

  return (
    <>
      <div className="up-card">
        <div className="up-card-title">Preferences & Notifications</div>
        <div className="up-card-sub">Manage your notification and account settings</div>
        <div className="up-settings-list">
          {rows.map(r => (
            <div className="up-setting-row" key={r.key}>
              <div className="up-setting-info">
                <strong style={{ fontWeight: 600 }}>{r.label}</strong>
                <p>{r.desc}</p>
              </div>
              <label className="up-toggle">
                <input type="checkbox" checked={settings[r.key]} onChange={() => dispatch(toggleSetting(r.key))} />
                <span className="up-toggle-slider" />
              </label>
            </div>
          ))}
        </div>
      </div>

      <div className="up-card">
        <div className="up-card-title">Change Password</div>
        <div className="up-card-sub">Choose a strong, unique password</div>
        <div className="up-form-grid">
          <div className="up-form-group full">
            <label>Current Password</label>
            <input type="password" placeholder="••••••••" />
          </div>
          <div className="up-form-group">
            <label>New Password</label>
            <input type="password" placeholder="••••••••" />
          </div>
          <div className="up-form-group">
            <label>Confirm Password</label>
            <input type="password" placeholder="••••••••" />
          </div>
        </div>
        <div className="up-form-actions">
          <button className="up-btn up-btn-primary">Update Password</button>
        </div>
      </div>

      <div className="up-card">
        <div className="up-card-title">Legal & Regulatory</div>
        <div className="up-card-sub">Important documents and company information</div>
        <div className="up-settings-list">
          {[
            { label: 'Terms and Conditions', desc: 'Read our service usage rules' },
            { label: 'Privacy Policy', desc: 'How we handle your personal data' },
            { label: 'Cookie Policy', desc: 'Management of browser tracking' },
            { label: 'Community Guidelines', desc: 'Rules for interacting with other users' },
            { label: 'Help Center', desc: 'Frequently asked questions and support' },
          ].map((item, i) => (
            <div className="up-setting-row" key={i} style={{ cursor: 'pointer' }}>
              <div className="up-setting-info">
                <strong style={{ fontWeight: 600 }}>{item.label}</strong>
                <p>{item.desc}</p>
              </div>
              <div style={{ color: '#94a3b8' }}>
                <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7" /></svg>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="up-danger-zone">
        <h3>Danger Zone</h3>
        <p>Once you delete your account, all your data will be permanently removed. This action cannot be undone.</p>
        <button className="up-btn-danger">Delete My Account</button>
      </div>
    </>
  );
}
