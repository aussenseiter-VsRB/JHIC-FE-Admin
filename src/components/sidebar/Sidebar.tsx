import { NavLink } from "react-router-dom";
import { Zap, LayoutDashboard, Users, GraduationCap } from "lucide-react";
import "./Sidebar.css";

const menuItems = [
  { path: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { path: "/manajemen-user", label: "Manajemen User", icon: Users },
  { path: "/manajemen-pkl", label: "Manajemen PKL", icon: GraduationCap },
];

function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <Zap className="sidebar-logo" size={24} />
        <h1 className="sidebar-title">Admin Panel</h1>
      </div>

      <nav className="sidebar-nav">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `sidebar-link${isActive ? " sidebar-link--active" : ""}`
            }
          >
            <item.icon className="sidebar-icon" size={20} />
            <span className="sidebar-label">{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}

export default Sidebar;
