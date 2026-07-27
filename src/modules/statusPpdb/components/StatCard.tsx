import type { LucideIcon } from "lucide-react";

interface StatCardProps {
  icon: LucideIcon;
  iconColor: string;
  progressColor: string;
  label: string;
  value: number;
  sub: string;
  progressPercent: number;
}

function StatCard({
  icon: Icon,
  iconColor,
  progressColor,
  label,
  value,
  sub,
  progressPercent,
}: StatCardProps) {
  return (
    <div className="status-ppdb-card status-ppdb-card--stat">
      <div className={`status-ppdb-stat-icon status-ppdb-stat-icon--${iconColor}`}>
        <Icon size={20} />
      </div>
      <div className="status-ppdb-stat-content">
        <span className="status-ppdb-stat-label">{label}</span>
        <span className="status-ppdb-stat-value">{value}</span>
        <span className="status-ppdb-stat-sub">{sub}</span>
      </div>
      <div className="status-ppdb-progress">
        <div
          className={`status-ppdb-progress-bar status-ppdb-progress-bar--${progressColor}`}
          style={{ width: `${progressPercent}%` }}
        />
      </div>
    </div>
  );
}

export default StatCard;
