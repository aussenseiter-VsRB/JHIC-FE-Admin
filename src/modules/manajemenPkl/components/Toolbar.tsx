import { Search } from "lucide-react";

interface ToolbarProps {
  searchPlaceholder: string;
  searchQuery: string;
  onSearchChange: (value: string) => void;
  filters: { label: string; value: string; options: string[] }[];
  onFilterChange: (index: number, value: string) => void;
}

function Toolbar({
  searchPlaceholder,
  searchQuery,
  onSearchChange,
  filters,
  onFilterChange,
}: ToolbarProps) {
  return (
    <div className="manajemen-pkl-toolbar">
      <div className="manajemen-pkl-search">
        <Search className="manajemen-pkl-search-icon" size={16} />
        <input
          className="manajemen-pkl-search-input"
          type="text"
          placeholder={searchPlaceholder}
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      <div className="manajemen-pkl-filter">
        {filters.map((f, i) => (
          <select
            key={f.label}
            className="manajemen-pkl-filter-select"
            value={f.value}
            onChange={(e) => onFilterChange(i, e.target.value)}
          >
            {f.options.map((opt) => (
              <option key={opt} value={opt}>
                {f.label}: {opt}
              </option>
            ))}
          </select>
        ))}
      </div>
    </div>
  );
}

export default Toolbar;
