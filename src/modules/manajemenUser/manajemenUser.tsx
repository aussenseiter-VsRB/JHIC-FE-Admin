import { useState, useMemo, useEffect } from "react";
import {
  Plus,
  Search,
  Pencil,
  Trash2,
  ChevronUp,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  X,
} from "lucide-react";
import pageData from "./manajemenUser.json";
import "./css/manajemenUser.css";

type User = (typeof pageData.users)[number];
type SortKey = "id" | "nama" | "email" | "role" | "status";
type SortDirection = "asc" | "desc";

interface SortConfig {
  key: SortKey;
  direction: SortDirection;
}

interface Toast {
  message: string;
  type: "success" | "error";
}

function ManajemenUser() {
  const { page, users, table, filters, pagination } = pageData;

  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: "id",
    direction: "asc",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [toast, setToast] = useState<Toast | null>(null);

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const filteredUsers = useMemo(() => {
    let result = [...users];

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (u) =>
          u.nama.toLowerCase().includes(query) ||
          u.email.toLowerCase().includes(query)
      );
    }

    if (roleFilter !== "All") {
      result = result.filter((u) => u.role === roleFilter);
    }

    if (statusFilter !== "All") {
      result = result.filter((u) => u.status === statusFilter);
    }

    result.sort((a, b) => {
      const aVal = a[sortConfig.key];
      const bVal = b[sortConfig.key];
      const modifier = sortConfig.direction === "asc" ? 1 : -1;
      if (aVal < bVal) return -1 * modifier;
      if (aVal > bVal) return 1 * modifier;
      return 0;
    });

    return result;
  }, [users, searchQuery, roleFilter, statusFilter, sortConfig]);

  const totalPages = Math.ceil(filteredUsers.length / pagination.perPage);
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * pagination.perPage,
    currentPage * pagination.perPage
  );

  const startItem = filteredUsers.length === 0 ? 0 : (currentPage - 1) * pagination.perPage + 1;
  const endItem = Math.min(currentPage * pagination.perPage, filteredUsers.length);

  const handleSort = (key: SortKey) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc",
    }));
  };

  const showToast = (message: string, type: "success" | "error" = "success") => {
    setToast({ message, type });
  };

  const handleEdit = (user: User) => {
    showToast(`Mengedit user: ${user.nama}`);
  };

  const handleDelete = (user: User) => {
    showToast(`User "${user.nama}" berhasil dihapus`);
  };

  const renderSortIcon = (key: SortKey) => {
    if (sortConfig.key !== key) return null;
    return sortConfig.direction === "asc" ? (
      <ChevronUp size={14} />
    ) : (
      <ChevronDown size={14} />
    );
  };

  const visiblePages = (): (number | "...")[] => {
    const pages: (number | "...")[] = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (currentPage > 3) pages.push("...");
      for (
        let i = Math.max(2, currentPage - 1);
        i <= Math.min(totalPages - 1, currentPage + 1);
        i++
      ) {
        pages.push(i);
      }
      if (currentPage < totalPages - 2) pages.push("...");
      pages.push(totalPages);
    }
    return pages;
  };

  return (
    <div className="manajemen-user">
      <div className="manajemen-user-header">
        <h1 className="manajemen-user-title">{page.title}</h1>
        <button className="manajemen-user-add-btn" type="button">
          <Plus size={18} />
          {page.addButtonLabel}
        </button>
      </div>

      <div className="manajemen-user-toolbar">
        <div className="manajemen-user-search">
          <Search className="manajemen-user-search-icon" size={16} />
          <input
            className="manajemen-user-search-input"
            type="text"
            placeholder="Cari nama atau email..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>
        <div className="manajemen-user-filter">
          <select
            className="manajemen-user-filter-select"
            value={roleFilter}
            onChange={(e) => {
              setRoleFilter(e.target.value);
              setCurrentPage(1);
            }}
          >
            {filters.roles.map((role) => (
              <option key={role} value={role}>
                Role: {role}
              </option>
            ))}
          </select>
          <select
            className="manajemen-user-filter-select"
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setCurrentPage(1);
            }}
          >
            {filters.statuses.map((status) => (
              <option key={status} value={status}>
                Status: {status}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="manajemen-user-table-wrapper">
        <table className="manajemen-user-table">
          <thead>
            <tr>
              {table.columns.map((col) => {
                const sortKey = col.toLowerCase() as SortKey;
                const isSortable = ["id", "nama", "email", "role", "status"].includes(sortKey);
                return (
                  <th
                    key={col}
                    onClick={isSortable ? () => handleSort(sortKey) : undefined}
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
            {paginatedUsers.length === 0 ? (
              <tr>
                <td colSpan={table.columns.length} className="manajemen-user-empty">
                  Tidak ada data ditemukan
                </td>
              </tr>
            ) : (
              paginatedUsers.map((user) => (
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
                        onClick={() => handleEdit(user)}
                      >
                        <Pencil size={14} />
                      </button>
                      <button
                        className="manajemen-user-action-btn manajemen-user-action-btn--delete"
                        type="button"
                        title="Hapus"
                        onClick={() => handleDelete(user)}
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

        <div className="manajemen-user-footer">
          <span className="manajemen-user-pagination-info">
            Showing {startItem}-{endItem} of {filteredUsers.length}
          </span>
          <div className="manajemen-user-pagination">
            <button
              className="manajemen-user-pagination-btn"
              type="button"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => p - 1)}
            >
              <ChevronLeft size={16} />
            </button>
            {visiblePages().map((page, i) =>
              page === "..." ? (
                <span key={`dots-${i}`} style={{ padding: "0 4px", color: "#94a3b8" }}>
                  ...
                </span>
              ) : (
                <button
                  key={page}
                  className={`manajemen-user-pagination-btn${currentPage === page ? " manajemen-user-pagination-btn--active" : ""}`}
                  type="button"
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </button>
              )
            )}
            <button
              className="manajemen-user-pagination-btn"
              type="button"
              disabled={currentPage === totalPages || totalPages === 0}
              onClick={() => setCurrentPage((p) => p + 1)}
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>

      {toast && (
        <div className={`manajemen-user-toast${toast.type === "error" ? " manajemen-user-toast--error" : ""}`}>
          <CheckCircle size={18} />
          {toast.message}
          <button
            className="manajemen-user-toast-close"
            type="button"
            onClick={() => setToast(null)}
          >
            <X size={14} />
          </button>
        </div>
      )}
    </div>
  );
}

export default ManajemenUser;
