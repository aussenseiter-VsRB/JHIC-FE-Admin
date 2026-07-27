interface ChartCardProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}

function ChartCard({ title, subtitle, children }: ChartCardProps) {
  return (
    <div className="dashboard-card dashboard-card--chart">
      <div className="dashboard-chart-header">
        <span className="dashboard-chart-title">{title}</span>
        {subtitle && <span className="dashboard-chart-subtitle">{subtitle}</span>}
      </div>
      <div className="dashboard-chart-content">{children}</div>
    </div>
  );
}

export default ChartCard;
