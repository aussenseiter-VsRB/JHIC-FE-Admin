import { useState, useMemo, useEffect } from "react";
import { Plus } from "lucide-react";
import pageData from "./manajemenUser.json";
import "./css/manajemenUser.css";
import UserToolbar from "./components/UserToolbar";
import UserTable from "./components/UserTable";
import Toast from "../../components/Toast";
import Pagination from "../../components/Pagination";

type User = (typeof pageData.users)[number];
type SortKey = "id" | "email" | "role" | "status";
type SortDirection = "asc" | "desc";

interface SortConfig {
  key: SortKey;
  direction: SortDirection;
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
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

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
      result = result.filter((u) =>
        u.email.toLowerCase().includes(query),
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
    currentPage * pagination.perPage,
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
    showToast(`Mengedit user: ${user.email}`);
  };

  const handleDelete = (user: User) => {
    showToast(`User "${user.email}" berhasil dihapus`);
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

      <UserToolbar
        searchQuery={searchQuery}
        onSearchChange={(v) => { setSearchQuery(v); setCurrentPage(1); }}
        roleFilter={roleFilter}
        statusFilter={statusFilter}
        roles={filters.roles}
        statuses={filters.statuses}
        onRoleFilterChange={(v) => { setRoleFilter(v); setCurrentPage(1); }}
        onStatusFilterChange={(v) => { setStatusFilter(v); setCurrentPage(1); }}
      />

      <div className="manajemen-user-table-wrapper">
        <UserTable
          columns={table.columns}
          userList={paginatedUsers}
          sortConfig={sortConfig}
          onSort={handleSort}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />

        <div className="manajemen-user-footer">
          <span className="manajemen-user-pagination-info">
            Showing {startItem}-{endItem} of {filteredUsers.length}
          </span>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>

      {toast && (
        <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />
      )}
    </div>
  );
}

export default ManajemenUser;
