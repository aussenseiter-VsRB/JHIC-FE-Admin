import { Users, UserCheck, Briefcase, GraduationCap, ArrowRight } from "lucide-react";
import pageData from "./dashboard.json";
import "./css/dashboard.css";
import HeroCard from "./components/HeroCard";
import StatCard from "./components/StatCard";
import ListCard from "./components/ListCard";
import ChartCard from "./components/ChartCard";

function Dashboard() {
  const { page, stats, actions, recentStudents } = pageData;

  const icons = [Users, UserCheck, Briefcase, GraduationCap];
  const colors = ["blue", "green", "amber", "purple"];

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1 className="dashboard-title">
          {page.title} <span className="dashboard-subtitle">{page.welcome}</span>
        </h1>
      </div>

      <div className="dashboard-bento">
        <HeroCard
          label="Ringkasan Sekolah"
          value="SMK Nusantara"
          description="Sistem informasi manajemen sekolah terpadu"
        >
          <div className="dashboard-action-list">
            {actions.map((action, index) => (
              <div
                key={`${action.label}-${index}`}
                className="dashboard-action-item"
                onClick={() => window.location.href = action.href}
              >
                <div className={`dashboard-action-icon dashboard-action-icon--${colors[index % colors.length]}`}>
                  {index === 0 && <Users size={18} />}
                  {index === 1 && <Briefcase size={18} />}
                  {index === 2 && <GraduationCap size={18} />}
                </div>
                <div className="dashboard-action-text">
                  <span className="dashboard-action-label">{action.label}</span>
                  <span className="dashboard-action-desc">{action.description}</span>
                </div>
                <ArrowRight size={16} className="dashboard-action-arrow" />
              </div>
            ))}
          </div>
        </HeroCard>

        {stats.map((stat, index) => (
          <StatCard
            key={`${stat.label}-${index}`}
            icon={icons[index]}
            iconColor={colors[index]}
            progressColor={colors[index]}
            label={stat.label}
            value={stat.value}
            sub={stat.sub}
            progressPercent={stat.progressPercent}
          />
        ))}

        <ChartCard title="Statistik Pendaftar" subtitle="6 bulan terakhir">
          <div style={{ display: "flex", alignItems: "flex-end", gap: "8px", height: "100%", padding: "16px 0" }}>
            {[65, 45, 80, 55, 90, 70].map((height, index) => (
              <div
                key={`bar-${index}`}
                style={{
                  width: "24px",
                  height: `${height}%`,
                  backgroundColor: index === 4 ? "#3b82f6" : "#e2e8f0",
                  borderRadius: "4px 4px 0 0",
                  transition: "background-color 0.2s"
                }}
              />
            ))}
          </div>
        </ChartCard>

        <ListCard
          title="Siswa Terbaru"
          items={recentStudents.map((s) => ({
            avatar: s.name.charAt(0),
            name: s.name,
            detail: s.detail,
            badge: s.badge,
            badgeVariant: s.badge === "Aktif" ? "success" : s.badge === "PKL" ? "warning" : "info"
          }))}
          onMore={() => window.location.href = "/manajemen-user"}
        />
      </div>
    </div>
  );
}

export default Dashboard;
