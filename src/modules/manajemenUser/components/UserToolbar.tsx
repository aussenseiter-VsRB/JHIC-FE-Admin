import { Search } from "lucide-react";

interface UserToolbarProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  roleFilter: string;
  statusFilter: string;
  roles: string[];
  statuses: string[];
  onRoleFilterChange: (value: string) => void;
  onStatusFilterChange: (value: string) => void;
}

function UserToolbar({
  searchQuery,
  onSearchChange,
  roleFilter,
  statusFilter,
  roles,
  statuses,
  onRoleFilterChange,
  onStatusFilterChange,
}: UserToolbarProps) {
  return (
    <div className="manajemen-user-toolbar">
      <div className="manajemen-user-search">
        <Search className="manajemen-user-search-icon" size={16} />
        <input
          className="manajemen-user-search-input"
          type="text"
          placeholder="Cari email..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      <div className="manajemen-user-filter">
        <select
          className="manajemen-user-filter-select"
          value={roleFilter}
          onChange={(e) => onRoleFilterChange(e.target.value)}
        >
          {roles.map((role) => (
            <option key={role} value={role}>
              Role: {role}
            </option>
          ))}
        </select>
        <select
          className="manajemen-user-filter-select"
          value={statusFilter}
          onChange={(e) => onStatusFilterChange(e.target.value)}
        >
          {statuses.map((status) => (
            <option key={status} value={status}>
              Status: {status}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default UserToolbar;
