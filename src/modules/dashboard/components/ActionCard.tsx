import { ChevronRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface ActionItem {
  icon: LucideIcon;
  iconColor: string;
  label: string;
  description: string;
  onClick?: () => void;
}

interface ActionCardProps {
  title: string;
  items: ActionItem[];
}

function ActionCard({ title, items }: ActionCardProps) {
  return (
    <div className="dashboard-card dashboard-card--action">
      <span className="dashboard-action-title">{title}</span>
      <div className="dashboard-action-list">
        {items.map((item, index) => (
          <div
            key={`${item.label}-${index}`}
            className="dashboard-action-item"
            onClick={item.onClick}
          >
            <div className={`dashboard-action-icon dashboard-action-icon--${item.iconColor}`}>
              <item.icon size={18} />
            </div>
            <div className="dashboard-action-text">
              <span className="dashboard-action-label">{item.label}</span>
              <span className="dashboard-action-desc">{item.description}</span>
            </div>
            <ChevronRight size={16} className="dashboard-action-arrow" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ActionCard;
