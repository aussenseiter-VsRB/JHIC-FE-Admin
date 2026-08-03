import { useState, useMemo, useEffect } from "react";
import { Plus } from "lucide-react";
import pageData from "./manajemenUser.json";
import "./css/manajemenUser.css";
import UserToolbar from "./components/UserToolbar";
import UserTable, { type UserRow, type SortKey } from "./components/UserTable";
import TambahUserModal from "./components/TambahUserModal";
import EditUserModal from "./components/EditUserModal";
import Toast from "../../components/Toast";
import Pagination from "../../components/Pagination";
import type { User } from "../../api/types";
import { createUser, deleteUser, listUsers, updateUser } from "./services/userService";
import { getUser } from "../login/services/loginService";

type SortDirection = "asc" | "desc";

interface SortConfig {
  key: SortKey;
  direction: SortDirection;
}

function capitalizeRole(role: string): string {
  return role.charAt(0).toUpperCase() + role.slice(1);
}

function toRow(user: User): UserRow {
  return {
    id: user.id,
    email: user.email,
    name: user.name,
    role: capitalizeRole(user.role),
    class: user.class,
    jurusan: user.jurusan,
  };
}

function ManajemenUser() {
  const { page, table, filters, pagination } = pageData;

  const [users, setUsers] = useState<UserRow[]>([]);
  const [listLoading, setListLoading] = useState(true);
  const [listError, setListError] = useState<string | null>(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: "id",
    direction: "asc",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  const [showAddModal, setShowAddModal] = useState(false);
  const [addSaving, setAddSaving] = useState(false);
  const [addError, setAddError] = useState<string | null>(null);

  const [editingUser, setEditingUser] = useState<UserRow | null>(null);
  const [editSaving, setEditSaving] = useState(false);
  const [editError, setEditError] = useState<string | null>(null);

  const [deletingId, setDeletingId] = useState<string | null>(null);
  const currentUserEmail = getUser()?.email;

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const refreshUsers = async () => {
    const res = await listUsers();
    if (res.ok) {
      setUsers(((res.data as User[] | null) ?? []).map(toRow));
      setListError(null);
    } else {
      setListError(res.error);
    }
  };

  useEffect(() => {
    void (async () => {
      setListLoading(true);
      await refreshUsers();
      setListLoading(false);
    })();
  }, []);

  const filteredUsers = useMemo(() => {
    let result = [...users];

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (u) =>
          u.email.toLowerCase().includes(query) ||
          u.name.toLowerCase().includes(query),
      );
    }

    if (roleFilter !== "All") {
      result = result.filter((u) => u.role === roleFilter);
    }

    result.sort((a, b) => {
      const modifier = sortConfig.direction === "asc" ? 1 : -1;
      if (sortConfig.key === "id") {
        return (Number(a.id) - Number(b.id)) * modifier;
      }
      const aVal = a[sortConfig.key];
      const bVal = b[sortConfig.key];
      if (aVal < bVal) return -1 * modifier;
      if (aVal > bVal) return 1 * modifier;
      return 0;
    });

    return result;
  }, [users, searchQuery, roleFilter, sortConfig]);

  const totalPages = Math.max(1, Math.ceil(filteredUsers.length / pagination.perPage));
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

  const handleOpenAdd = () => {
    setAddError(null);
    setShowAddModal(true);
  };

  const handleSaveAdd = async (email: string, password: string, name: string) => {
    setAddSaving(true);
    setAddError(null);
    const res = await createUser({ email, password, name });
    if (res.ok) {
      setShowAddModal(false);
      void refreshUsers();
      showToast(`User "${email}" berhasil ditambahkan`);
    } else {
      setAddError(res.error);
    }
    setAddSaving(false);
  };

  const handleEdit = (user: UserRow) => {
    setEditError(null);
    setEditingUser(user);
  };

  const handleSaveEdit = async (name: string, userClass: string, jurusan: string) => {
    if (!editingUser) return;

    setEditSaving(true);
    setEditError(null);
    const res = await updateUser(editingUser.id, { name, class: userClass, jurusan });
    if (res.ok) {
      setEditingUser(null);
      void refreshUsers();
      showToast(`User "${editingUser.email}" berhasil diperbarui`);
    } else {
      setEditError(res.error);
    }
    setEditSaving(false);
  };

  const handleDelete = async (user: UserRow) => {
    const isSelf = user.email === currentUserEmail;
    const message = isSelf
      ? "Anda akan menghapus akun yang sedang dipakai! Lanjutkan?"
      : `Hapus user "${user.email}"?`;
    if (!window.confirm(message)) return;

    setDeletingId(user.id);
    const res = await deleteUser(user.id);
    if (res.ok) {
      setUsers((prev) => prev.filter((u) => u.id !== user.id));
      showToast(`User "${user.email}" berhasil dihapus`);
    } else {
      setListError(res.error);
      showToast(res.error ?? "Gagal menghapus user", "error");
    }
    setDeletingId(null);
  };

  return (
    <div className="manajemen-user">
      <div className="manajemen-user-header">
        <h1 className="manajemen-user-title">{page.title}</h1>
        <button className="manajemen-user-add-btn" type="button" onClick={handleOpenAdd}>
          <Plus size={18} />
          {page.addButtonLabel}
        </button>
      </div>

      <UserToolbar
        searchQuery={searchQuery}
        onSearchChange={(v) => { setSearchQuery(v); setCurrentPage(1); }}
        roleFilter={roleFilter}
        roles={filters.roles}
        onRoleFilterChange={(v) => { setRoleFilter(v); setCurrentPage(1); }}
      />

      {listError && (
        <div className="manajemen-user-error-banner">
          {listError}
        </div>
      )}

      <div className="manajemen-user-table-wrapper">
        {listLoading ? (
          <div className="manajemen-user-empty">Memuat data...</div>
        ) : (
          <UserTable
            columns={table.columns}
            userList={paginatedUsers}
            sortConfig={sortConfig}
            onSort={handleSort}
            onEdit={handleEdit}
            onDelete={handleDelete}
            deletingId={deletingId}
          />
        )}

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

      {showAddModal && (
        <TambahUserModal
          saving={addSaving}
          apiError={addError}
          onSave={(e, p, n) => void handleSaveAdd(e, p, n)}
          onClose={() => setShowAddModal(false)}
        />
      )}

      {editingUser && (
        <EditUserModal
          key={editingUser.id}
          user={editingUser}
          saving={editSaving}
          apiError={editError}
          onSave={(n, c, j) => void handleSaveEdit(n, c, j)}
          onClose={() => setEditingUser(null)}
        />
      )}

      {toast && (
        <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />
      )}
    </div>
  );
}

export default ManajemenUser;