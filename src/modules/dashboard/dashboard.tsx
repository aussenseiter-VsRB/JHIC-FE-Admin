import { Users, UserCheck, Briefcase, GraduationCap, Monitor, Network, Calculator, Building2, TrendingUp, School } from "lucide-react";
import pageData from "./dashboard.json";
import "./css/dashboard.css";
import HeroCard from "./components/HeroCard";
import StatCard from "./components/StatCard";
import ListCard from "./components/ListCard";
import ChartCard from "./components/ChartCard";
import ActionCard from "./components/ActionCard";

function Dashboard() {
  const { page, school, stats, programKeahlian, chart, actions, recentStudents } = pageData;

  const statIcons = [Users, UserCheck, Briefcase, GraduationCap];
  const statColors = ["blue", "green", "amber", "purple"];

  const actionIconMap = [Users, Briefcase, GraduationCap, School];
  const actionColors = ["blue", "green", "purple", "blue"];

  const programIcons = [Monitor, Network, Calculator, Building2, TrendingUp] as const;
  const programColors = ["#3b82f6", "#16a34a", "#f59e0b", "#a855f7", "#ef4444"];

  const maxProgramSiswa = Math.max(...programKeahlian.map((p) => p.siswa));

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div>
          <h1 className="dashboard-title">{page.title}</h1>
          <p className="dashboard-welcome">{page.welcome} — {school.tahunAjaran}</p>
        </div>
        <div className="dashboard-header-badge">
          <span className="dashboard-akreditasi">Akreditasi {school.akreditasi}</span>
        </div>
      </div>

      <div className="dashboard-bento">
        <HeroCard
          label=""
          value={school.name}
          description={school.tagline}
        >
          <div className="dashboard-hero-stats">
            <div className="dashboard-hero-stat">
              <span className="dashboard-hero-stat-value">{stats[0].value}</span>
              <span className="dashboard-hero-stat-label">Total Siswa</span>
            </div>
            <div className="dashboard-hero-stat">
              <span className="dashboard-hero-stat-value">{programKeahlian.length}</span>
              <span className="dashboard-hero-stat-label">Program</span>
            </div>
            <div className="dashboard-hero-stat">
              <span className="dashboard-hero-stat-value">{Math.ceil(stats[0].value / 36)}</span>
              <span className="dashboard-hero-stat-label">Rombel</span>
            </div>
          </div>
        </HeroCard>

        {stats.map((stat, index) => (
          <StatCard
            key={stat.label}
            icon={statIcons[index]}
            iconColor={statColors[index]}
            progressColor={statColors[index]}
            label={stat.label}
            value={stat.value}
            sub={stat.sub}
            progressPercent={stat.progressPercent}
          />
        ))}

        <ChartCard title={chart.title} subtitle={chart.subtitle}>
          <div className="dashboard-chart-bars">
            {chart.bars.map((bar) => (
              <div key={bar.label} className="dashboard-chart-bar-group">
                <span className="dashboard-chart-bar-label">{bar.label}</span>
                <div className="dashboard-chart-bar-track">
                  <div
                    className="dashboard-chart-bar-fill"
                    style={{ height: `${bar.value}%` }}
                  />
                </div>
                <span className="dashboard-chart-bar-value">{bar.value}</span>
              </div>
            ))}
          </div>
        </ChartCard>

        <div className="dashboard-card dashboard-card--program">
          <div className="dashboard-card-header">
            <span className="dashboard-card-title">Program Keahlian</span>
          </div>
          <div className="dashboard-program-list">
            {programKeahlian.map((prog, idx) => (
              <div key={prog.singkatan} className="dashboard-program-item">
                <div className="dashboard-program-icon" style={{ color: programColors[idx] }}>
                  {(() => {
                    const Icon = programIcons[idx % programIcons.length];
                    return <Icon size={18} />;
                  })()}
                </div>
                <div className="dashboard-program-info">
                  <div className="dashboard-program-top">
                    <span className="dashboard-program-name">{prog.singkatan}</span>
                    <span className="dashboard-program-count">{prog.siswa}</span>
                  </div>
                  <div className="dashboard-program-bar">
                    <div
                      className="dashboard-program-bar-fill"
                      style={{ width: `${(prog.siswa / maxProgramSiswa) * 100}%`, backgroundColor: programColors[idx] }}
                    />
                  </div>
                  <span className="dashboard-program-fullname">{prog.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <ActionCard
          title="Akses Cepat"
          items={actions.map((action, i) => ({
            icon: actionIconMap[i % actionIconMap.length],
            iconColor: actionColors[i % actionColors.length],
            label: action.label,
            description: action.description,
            onClick: () => { window.location.href = action.href; },
          }))}
        />

        <ListCard
          title="Siswa Terbaru"
          items={recentStudents.map((s) => ({
            avatar: s.name.charAt(0),
            name: s.name,
            detail: s.detail,
            badge: s.badge,
            badgeVariant: s.badge === "Aktif" ? "success" : s.badge === "Prakerin" ? "warning" : "info",
          }))}
          onMore={() => window.location.href = "/manajemen-user"}
        />
      </div>
    </div>
  );
}

export default Dashboard;
