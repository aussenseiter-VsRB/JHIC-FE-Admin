interface ListItem {
  avatar: string;
  name: string;
  detail: string;
  badge?: string;
  badgeVariant?: "success" | "warning" | "info";
}

interface ListCardProps {
  title: string;
  items: ListItem[];
  moreLabel?: string;
  onMore?: () => void;
}

function ListCard({ title, items, moreLabel = "Lihat Semua", onMore }: ListCardProps) {
  return (
    <div className="dashboard-card dashboard-card--list">
      <div className="dashboard-list-header">
        <span className="dashboard-list-title">{title}</span>
        <span className="dashboard-list-more" onClick={onMore}>
          {moreLabel}
        </span>
      </div>
      <div className="dashboard-list-items">
        {items.map((item, index) => (
          <div key={`${item.name}-${index}`} className="dashboard-list-item">
            <div className="dashboard-list-avatar">{item.avatar}</div>
            <div className="dashboard-list-info">
              <span className="dashboard-list-name">{item.name}</span>
              <span className="dashboard-list-detail">{item.detail}</span>
            </div>
            {item.badge && (
              <span className={`dashboard-list-badge dashboard-list-badge--${item.badgeVariant || "info"}`}>
                {item.badge}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ListCard;
