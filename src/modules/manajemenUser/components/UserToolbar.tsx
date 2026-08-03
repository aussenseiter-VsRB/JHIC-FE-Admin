import { Search } from "lucide-react";

interface UserToolbarProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  roleFilter: string;
  roles: string[];
  onRoleFilterChange: (value: string) => void;
}

function UserToolbar({
  searchQuery,
  onSearchChange,
  roleFilter,
  roles,
  onRoleFilterChange,
}: UserToolbarProps) {
  return (
    <div className="manajemen-user-toolbar">
      <div className="manajemen-user-search">
        <Search className="manajemen-user-search-icon" size={16} />
        <input
          className="manajemen-user-search-input"
          type="text"
          placeholder="Cari nama/email..."
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
      </div>
    </div>
  );
}

export default UserToolbar;