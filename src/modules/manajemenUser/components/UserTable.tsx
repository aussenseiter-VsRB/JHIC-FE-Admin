import { Pencil, Trash2, ChevronUp, ChevronDown } from "lucide-react";

type User = {
  id: number;
  nama: string;
  email: string;
  role: string;
  status: string;
};

type SortKey = "id" | "nama" | "email" | "role" | "status";
type SortDirection = "asc" | "desc";

interface UserTableProps {
  columns: string[];
  userList: User[];
  sortConfig: { key: SortKey; direction: SortDirection };
  onSort: (key: SortKey) => void;
  onEdit: (user: User) => void;
  onDelete: (user: User) => void;
}

function UserTable({
  columns,
  userList,
  sortConfig,
  onSort,
  onEdit,
  onDelete,
}: UserTableProps) {
  const renderSortIcon = (key: SortKey) => {
    if (sortConfig.key !== key) return null;
    return sortConfig.direction === "asc" ? (
      <ChevronUp size={14} />
    ) : (
      <ChevronDown size={14} />
    );
  };

  return (
    <table className="manajemen-user-table">
      <thead>
        <tr>
          {columns.map((col) => {
            const sortKey = col.toLowerCase() as SortKey;
            const isSortable = [
              "id",
              "nama",
              "email",
              "role",
              "status",
            ].includes(sortKey);
            return (
              <th
                key={col}
                onClick={isSortable ? () => onSort(sortKey) : undefined}
                style={{ cursor: isSortable ? "pointer" : "default" }}
              >
                <div className="manajemen-user-table-th-content">
                  {col}
                  {isSortable && renderSortIcon(sortKey)}
                </div>
              </th>
            );
          })}
        </tr>
      </thead>
      <tbody>
        {userList.length === 0 ? (
          <tr>
            <td
              colSpan={columns.length}
              className="manajemen-user-empty"
            >
              Tidak ada data ditemukan
            </td>
          </tr>
        ) : (
          userList.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.nama}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                <span
                  className={`manajemen-user-status manajemen-user-status--${user.status.toLowerCase()}`}
                >
                  {user.status}
                </span>
              </td>
              <td>
                <div className="manajemen-user-actions">
                  <button
                    className="manajemen-user-action-btn manajemen-user-action-btn--edit"
                    type="button"
                    title="Edit"
                    onClick={() => onEdit(user)}
                  >
                    <Pencil size={14} />
                  </button>
                  <button
                    className="manajemen-user-action-btn manajemen-user-action-btn--delete"
                    type="button"
                    title="Hapus"
                    onClick={() => onDelete(user)}
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

export default UserTable;
