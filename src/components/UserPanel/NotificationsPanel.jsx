import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { markAllNotificationsRead } from '../../store/slices/userPanelSlice';
import { IconTrendingDown, IconCheckCircle, IconStar, IconSparkles, IconSearchAlert } from '../../data/icons';

const ICON_MAP = {
  price_drop: <IconTrendingDown />,
  new_listing: <IconSparkles />,
  check: <IconCheckCircle />,
  star: <IconStar />,
  alert: <IconSearchAlert />
};

export default function NotificationsPanel() {
  const dispatch = useDispatch();
  const { notifications } = useSelector(state => state.userPanel);
  const unreadCount = notifications.filter(n => n.unread).length;

  return (
    <div className="up-card">
      <div className="up-section-header">
        <div>
          <div className="up-card-title">Notifications</div>
          <div className="up-card-sub">{unreadCount} unread alerts</div>
        </div>
        <button className="up-btn up-btn-ghost" style={{ fontSize: '0.75rem', padding: '6px 12px' }} onClick={() => dispatch(markAllNotificationsRead())}>
          Mark all read
        </button>
      </div>
      <div className="up-notif-list">
        {notifications.map((n, i) => (
          <div className={`up-notif-item ${n.unread ? 'unread' : ''}`} key={i}>
            <div className={`up-notif-dot ${n.unread ? '' : 'read'}`} />
            <div className="up-notif-icon-wrap" style={{ fontSize: '1.2rem', color: n.unread ? '#f59e0b' : '#94a3b8', display: 'flex' }}>
              {ICON_MAP[n.type] || '🔔'}
            </div>
            <div className="up-notif-body">
              <strong style={{ fontWeight: 600 }}>{n.title}</strong>
              <p style={{ fontWeight: 400 }}>{n.body}</p>
            </div>
            <div className="up-notif-time">{n.time}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
