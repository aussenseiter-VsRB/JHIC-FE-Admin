import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  Zap,
  LayoutDashboard,
  Users,
  GraduationCap,
  ClipboardCheck,
  UserPlus,
  Newspaper,
  LogOut,
  ChevronDown,
} from "lucide-react";
import { getRole } from "../../modules/login/services/loginService";
import "./Sidebar.css";

type Role = "admin" | "jurnal" | "guru" | "user";

interface MenuItem {
  path?: string;
  label: string;
  icon: typeof LayoutDashboard;
  roles: Role[];
  children?: { path: string; label: string }[];
}

const menuItems: MenuItem[] = [
  { path: "/dashboard", label: "Dashboard", icon: LayoutDashboard, roles: ["admin", "guru"] },
  { path: "/buat-berita", label: "Buat Berita", icon: Newspaper, roles: ["admin", "jurnal"] },
  { path: "/status-ppdb", label: "Status PPDB", icon: ClipboardCheck, roles: ["admin", "guru"] },
  { path: "/manajemen-user", label: "Manajemen User", icon: Users, roles: ["admin"] },
  { path: "/manajemen-pkl", label: "Manajemen PKL", icon: GraduationCap, roles: ["admin", "guru"] },
  {
    label: "Manajemen Siswa Baru",
    icon: UserPlus,
    roles: ["admin"],
    children: [
      { path: "/manajemen-siswa-baru/proses", label: "Proses" },
      { path: "/manajemen-siswa-baru/approve", label: "Approve" },
      { path: "/manajemen-siswa-baru/cancel", label: "Cancel" },
    ],
  },
];

function Sidebar() {
  const { pathname } = useLocation();
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const role = getRole() as Role | null;

  const toggleDropdown = (label: string) => {
    setOpenDropdown((prev) => (prev === label ? null : label));
  };

  const isDropdownActive = (children: { path: string }[]) =>
    children.some((c) => pathname.startsWith(c.path));

  const visibleItems = menuItems.filter((item) => item.roles.includes(role ?? "user"));

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <Zap className="sidebar-logo" size={24} />
        <h1 className="sidebar-title">Admin Panel</h1>
      </div>

      <nav className="sidebar-nav">
        {visibleItems.map((item) =>
          item.children ? (
            <div
              key={item.label}
              className={`sidebar-dropdown${isDropdownActive(item.children) ? " sidebar-dropdown--active" : ""}`}
            >
              <button
                type="button"
                className="sidebar-dropdown-header"
                onClick={() => toggleDropdown(item.label)}
              >
                <item.icon className="sidebar-icon" size={20} />
                <span className="sidebar-label">{item.label}</span>
                <ChevronDown
                  size={16}
                  className={`sidebar-dropdown-chevron${openDropdown === item.label ? " sidebar-dropdown-chevron--open" : ""}`}
                />
              </button>
              {(openDropdown === item.label || isDropdownActive(item.children)) && (
                <div className="sidebar-submenu">
                  {item.children.map((child) => (
                    <NavLink
                      key={child.path}
                      to={child.path}
                      className={({ isActive }) =>
                        `sidebar-sublink${isActive ? " sidebar-sublink--active" : ""}`
                      }
                    >
                      {child.label}
                    </NavLink>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <NavLink
              key={item.path}
              to={item.path!}
              className={({ isActive }) =>
                `sidebar-link${isActive ? " sidebar-link--active" : ""}`
              }
            >
              <item.icon className="sidebar-icon" size={20} />
              <span className="sidebar-label">{item.label}</span>
            </NavLink>
          ),
        )}

        <div className="sidebar-spacer" />

        <NavLink
          to="/"
          className={({ isActive }) =>
            `sidebar-link sidebar-link--logout${isActive ? " sidebar-link--active" : ""}`
          }
        >
          <LogOut className="sidebar-icon" size={20} />
          <span className="sidebar-label">Keluar</span>
        </NavLink>
      </nav>
    </aside>
  );
}

export default Sidebar;
