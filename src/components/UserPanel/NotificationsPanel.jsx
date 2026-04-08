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
        <button className="up-btn up-btn-ghost" style={{ fontSize: '0.78rem' }} onClick={() => dispatch(markAllNotificationsRead())}>
          Mark all read
        </button>
      </div>
      <div className="up-notif-list">
        {notifications.map((n, i) => (
          <div className={`up-notif-item ${n.unread ? 'unread' : ''}`} key={i}>
            <div className={`up-notif-dot ${n.unread ? '' : 'read'}`} />
            <div style={{ fontSize: '1.3rem', lineHeight: 1 }}>{ICON_MAP[n.type] || '🔔'}</div>
            <div className="up-notif-body">
              <strong>{n.title}</strong>
              <p>{n.body}</p>
            </div>
            <div className="up-notif-time">{n.time}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
