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
    <div className="bg-white border border-slate-100 rounded-[16px] p-[28px_32px] mb-6 shadow-[0_2px_12px_rgba(0,0,0,0.01)]">
      <div className="flex items-center justify-between gap-4 mb-6">
        <div>
          <div className="text-[1.15rem] font-semibold text-slate-900 mb-1.5 tracking-tight">Notifications</div>
          <div className="text-[0.88rem] text-slate-500">{unreadCount} unread alerts</div>
        </div>
        <button className="px-3 py-1.5 rounded-lg font-bold text-[0.75rem] border border-slate-200 text-slate-600 transition-all hover:bg-slate-50 hover:text-slate-900 cursor-pointer" onClick={() => dispatch(markAllNotificationsRead())}>
          Mark all read
        </button>
      </div>
      <div className="flex flex-col gap-1">
        {notifications.map((n, i) => (
          <div className={`flex items-start gap-4 p-4 rounded-xl transition-all duration-200 hover:bg-slate-50 ${n.unread ? 'bg-amber-50/50' : 'bg-transparent'}`} key={i}>
            <div className={`w-2 h-2 rounded-full mt-[6px] shrink-0 ${n.unread ? 'bg-amber-500' : 'bg-transparent'}`} />
            <div className={`text-[1.2rem] flex shrink-0 ${n.unread ? 'text-amber-500' : 'text-slate-400'}`}>
              {ICON_MAP[n.type] || '🔔'}
            </div>
            <div className="flex-1">
              <strong className="text-[0.92rem] font-bold text-slate-900 block mb-0.5 leading-tight">{n.title}</strong>
              <p className="text-[0.82rem] text-slate-500 leading-normal">{n.body}</p>
            </div>
            <div className="text-[0.75rem] font-medium text-slate-400 whitespace-nowrap">{n.time}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
