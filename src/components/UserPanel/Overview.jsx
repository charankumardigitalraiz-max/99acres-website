import React from 'react';
import { useSelector } from 'react-redux';

export default function Overview() {
  const { activities } = useSelector(state => state.userPanel);
  const { wishlist } = useSelector(state => state.properties);

  return (
    <>
      <div className="up-stats-row">
        {[
          { icon: '❤️', cls: 'amber', num: wishlist.length, label: 'Saved' },
          { icon: '🏠', cls: 'blue', num: 12, label: 'Viewed' },
          { icon: '🔍', cls: 'green', num: 4, label: 'Searches' },
          { icon: '📧', cls: 'red', num: 2, label: 'Enquiries' },
        ].map(s => (
          <div className="up-stat-card" key={s.label}>
            <div className={`up-stat-icon ${s.cls}`}>{s.icon}</div>
            <div className="up-stat-num">{s.num}</div>
            <div className="up-stat-label">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="up-card">
        <div className="up-card-title">Recent Activity</div>
        <div className="up-card-sub">Your latest interactions and updates</div>
        <div className="up-activity-list">
          {activities.map((a, i) => (
            <div className="up-activity-item" key={i}>
              <div className="up-activity-icon" style={{ background: '#f8fafc', color: '#64748b' }}>{a.icon}</div>
              <div className="up-activity-text">
                <strong>{a.text}</strong>
                <span>{a.time}</span>
              </div>
              <div className="up-activity-time">{a.time}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
