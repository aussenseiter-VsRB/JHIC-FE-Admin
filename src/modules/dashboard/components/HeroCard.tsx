interface HeroCardProps {
  label: string;
  value: string;
  description: string;
  children: React.ReactNode;
}

function HeroCard({ label, value, description, children }: HeroCardProps) {
  return (
    <div className="dashboard-card dashboard-card--hero">
      <div className="dashboard-hero-top">
        <span className="dashboard-hero-label">{label}</span>
        <span className="dashboard-hero-value">{value}</span>
        <span className="dashboard-hero-desc">{description}</span>
      </div>
      <div className="dashboard-hero-bottom">{children}</div>
    </div>
  );
}

export default HeroCard;
