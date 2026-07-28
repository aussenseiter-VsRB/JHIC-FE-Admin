import { Search } from "lucide-react";

interface FilterConfig {
  label: string;
  value: string;
  options: string[];
}

interface ToolbarSiswaProps {
  searchPlaceholder: string;
  searchQuery: string;
  onSearchChange: (value: string) => void;
  filters: FilterConfig[];
  onFilterChange: (index: number, value: string) => void;
}

function ToolbarSiswa({
  searchPlaceholder,
  searchQuery,
  onSearchChange,
  filters,
  onFilterChange,
}: ToolbarSiswaProps) {
  return (
    <div className="msb-toolbar">
      <div className="msb-search">
        <Search className="msb-search-icon" size={16} />
        <input
          className="msb-search-input"
          type="text"
          placeholder={searchPlaceholder}
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      <div className="msb-filter">
        {filters.map((f, i) => (
          <select
            key={f.label}
            className="msb-filter-select"
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

export default ToolbarSiswa;
