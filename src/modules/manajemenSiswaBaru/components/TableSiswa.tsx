import { Pencil, Trash2, ChevronUp, ChevronDown } from "lucide-react";

type Siswa = Record<string, string | number>;

interface TableSiswaProps {
  columns: string[];
  data: Siswa[];
  sortConfig: { key: string; direction: "asc" | "desc" };
  onSort: (key: string) => void;
  onEdit: (item: Siswa) => void;
  onDelete: (item: Siswa) => void;
  sortableKeys: string[];
  statusKey?: string;
}

const statusColors: Record<string, string> = {
  proses: "msb-badge--proses",
  approve: "msb-badge--approve",
  cancel: "msb-badge--cancel",
};

function TableSiswa({
  columns,
  data,
  sortConfig,
  onSort,
  onEdit,
  onDelete,
  sortableKeys,
  statusKey,
}: TableSiswaProps) {
  const renderSortIcon = (key: string) => {
    if (sortConfig.key !== key) return null;
    return sortConfig.direction === "asc" ? (
      <ChevronUp size={14} />
    ) : (
      <ChevronDown size={14} />
    );
  };

  return (
    <table className="msb-table">
      <thead>
        <tr>
          {columns.map((col) => {
            const key = col.toLowerCase().replace(/\s/g, "");
            const isSortable = sortableKeys.includes(key);
            return (
              <th
                key={col}
                onClick={isSortable ? () => onSort(key) : undefined}
                style={{ cursor: isSortable ? "pointer" : "default" }}
              >
                <div className="msb-table-th-content">
                  {col}
                  {isSortable && renderSortIcon(key)}
                </div>
              </th>
            );
          })}
        </tr>
      </thead>
      <tbody>
        {data.length === 0 ? (
          <tr>
            <td colSpan={columns.length} className="msb-empty">
              Tidak ada data ditemukan
            </td>
          </tr>
        ) : (
          data.map((item) => (
            <tr key={item.id}>
              {columns.map((col) => {
                const key = col.toLowerCase().replace(/\s/g, "");
                if (key === "action") {
                  return (
                    <td key="action">
                      <div className="msb-actions">
                        <button
                          className="msb-action-btn msb-action-btn--edit"
                          type="button"
                          title="Edit"
                          onClick={() => onEdit(item)}
                        >
                          <Pencil size={14} />
                        </button>
                        <button
                          className="msb-action-btn msb-action-btn--delete"
                          type="button"
                          title="Hapus"
                          onClick={() => onDelete(item)}
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  );
                }
                if (key === statusKey) {
                  const val = String(item[key]);
                  return (
                    <td key={key}>
                      <span className={`msb-badge ${statusColors[val.toLowerCase()] || ""}`}>
                        {val}
                      </span>
                    </td>
                  );
                }
                return <td key={key}>{item[key]}</td>;
              })}
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
}

export default TableSiswa;
