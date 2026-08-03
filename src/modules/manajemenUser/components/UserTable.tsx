import { Pencil, Trash2, ChevronUp, ChevronDown } from "lucide-react";

export type UserRow = {
  id: string;
  email: string;
  name: string;
  role: string;
  class?: string;
  jurusan?: string;
};

export type SortKey = "id" | "name" | "email" | "role";
export type SortDirection = "asc" | "desc";

interface UserTableProps {
  columns: string[];
  userList: UserRow[];
  sortConfig: { key: SortKey; direction: SortDirection };
  onSort: (key: SortKey) => void;
  onEdit: (user: UserRow) => void;
  onDelete: (user: UserRow) => void;
  deletingId?: string | null;
}

function UserTable({
  columns,
  userList,
  sortConfig,
  onSort,
  onEdit,
  onDelete,
  deletingId,
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
            const lower = col.toLowerCase();
            const sortKey = (lower === "nama" ? "name" : lower) as SortKey;
            const isSortable = ["id", "name", "email", "role"].includes(
              sortKey,
            );
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
              <td>{user.name || "-"}</td>
              <td>{user.email}</td>
              <td>
                <span
                  className={`manajemen-user-role manajemen-user-role--${user.role.toLowerCase()}`}
                >
                  {user.role}
                </span>
              </td>
              <td>
                <div className="manajemen-user-actions">
                  <button
                    className="manajemen-user-action-btn manajemen-user-action-btn--edit"
                    type="button"
                    title="Edit"
                    disabled={deletingId === user.id}
                    onClick={() => onEdit(user)}
                  >
                    <Pencil size={14} />
                  </button>
                  <button
                    className="manajemen-user-action-btn manajemen-user-action-btn--delete"
                    type="button"
                    title="Hapus"
                    disabled={deletingId === user.id}
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