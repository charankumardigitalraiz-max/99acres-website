import { STATS } from '../../data/constants';
import './StatsStrip.css';

export default function StatsStrip() {
  return (
    <div className="stats-strip">
      <div className="container">
        <div className="stats-grid">
          {STATS.map(stat => (
            <div key={stat.label} className="stat-item">
              <div className="stat-num">{stat.num}</div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
