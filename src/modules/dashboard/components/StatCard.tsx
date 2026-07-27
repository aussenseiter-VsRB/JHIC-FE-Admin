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
    <div className="dashboard-card dashboard-card--stat">
      <div className={`dashboard-stat-icon dashboard-stat-icon--${iconColor}`}>
        <Icon size={20} />
      </div>
      <div className="dashboard-stat-content">
        <span className="dashboard-stat-label">{label}</span>
        <span className="dashboard-stat-value">{value}</span>
        <span className="dashboard-stat-sub">{sub}</span>
      </div>
      <div className="dashboard-progress">
        <div
          className={`dashboard-progress-bar dashboard-progress-bar--${progressColor}`}
          style={{ width: `${progressPercent}%` }}
        />
      </div>
    </div>
  );
}

export default StatCard;
