import { Pencil, Trash2, ChevronUp, ChevronDown } from "lucide-react";

type Siswa = {
  id: number;
  nama: string;
  nis: string;
  kelas: string;
  jurusan: string;
  status: string;
};

type SortKey = "id" | "nama" | "nis" | "kelas" | "jurusan" | "status";
type SortDirection = "asc" | "desc";

interface SiswaTableProps {
  columns: string[];
  siswaList: Siswa[];
  sortConfig: { key: SortKey; direction: SortDirection };
  onSort: (key: SortKey) => void;
  onEdit: (item: Siswa) => void;
  onDelete: (item: Siswa) => void;
}

function SiswaTable({
  columns,
  siswaList,
  sortConfig,
  onSort,
  onEdit,
  onDelete,
}: SiswaTableProps) {
  const renderSortIcon = (key: SortKey) => {
    if (sortConfig.key !== key) return null;
    return sortConfig.direction === "asc" ? (
      <ChevronUp size={14} />
    ) : (
      <ChevronDown size={14} />
    );
  };

  return (
    <table className="manajemen-pkl-table">
      <thead>
        <tr>
          {columns.map((col) => {
            const sortKey = col.toLowerCase() as SortKey;
            const isSortable = [
              "id",
              "nama",
              "nis",
              "kelas",
              "jurusan",
              "status",
            ].includes(sortKey);
            return (
              <th
                key={col}
                onClick={isSortable ? () => onSort(sortKey) : undefined}
                style={{ cursor: isSortable ? "pointer" : "default" }}
              >
                <div className="manajemen-pkl-table-th-content">
                  {col}
                  {isSortable && renderSortIcon(sortKey)}
                </div>
              </th>
            );
          })}
        </tr>
      </thead>
      <tbody>
        {siswaList.length === 0 ? (
          <tr>
            <td
              colSpan={columns.length}
              className="manajemen-pkl-empty"
            >
              Tidak ada data ditemukan
            </td>
          </tr>
        ) : (
          siswaList.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.nama}</td>
              <td>{item.nis}</td>
              <td>{item.kelas}</td>
              <td>{item.jurusan}</td>
              <td>
                <span
                  className={`manajemen-pkl-status manajemen-pkl-status--${item.status.toLowerCase()}`}
                >
                  {item.status}
                </span>
              </td>
              <td>
                <div className="manajemen-pkl-actions">
                  <button
                    className="manajemen-pkl-action-btn manajemen-pkl-action-btn--edit"
                    type="button"
                    title="Edit"
                    onClick={() => onEdit(item)}
                  >
                    <Pencil size={14} />
                  </button>
                  <button
                    className="manajemen-pkl-action-btn manajemen-pkl-action-btn--delete"
                    type="button"
                    title="Hapus"
                    onClick={() => onDelete(item)}
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
}

export default SiswaTable;
