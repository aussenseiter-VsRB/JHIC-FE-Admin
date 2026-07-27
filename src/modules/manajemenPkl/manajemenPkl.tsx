import { useState, useMemo, useEffect, useRef } from "react";
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
  Download,
  Upload,
} from "lucide-react";
import * as XLSX from "xlsx";
import pageData from "./manajemenPkl.json";
import "./css/manajemenPkl.css";

type Siswa = (typeof pageData.siswa)[number];
type SortKey = "id" | "nama" | "nis" | "kelas" | "jurusan" | "status";
type SortDirection = "asc" | "desc";

interface SortConfig {
  key: SortKey;
  direction: SortDirection;
}

interface Toast {
  message: string;
  type: "success" | "error";
}

function ManajemenPkl() {
  const { page, table, filters, pagination } = pageData;

  const [siswaList, setSiswaList] = useState<Siswa[]>(pageData.siswa);
  const [searchQuery, setSearchQuery] = useState("");
  const [jurusanFilter, setJurusanFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: "id",
    direction: "asc",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [toast, setToast] = useState<Toast | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const filteredSiswa = useMemo(() => {
    let result = [...siswaList];

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (s) =>
          s.nama.toLowerCase().includes(query) ||
          s.nis.toLowerCase().includes(query)
      );
    }

    if (jurusanFilter !== "All") {
      result = result.filter((s) => s.jurusan === jurusanFilter);
    }

    if (statusFilter !== "All") {
      result = result.filter((s) => s.status === statusFilter);
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
  }, [siswaList, searchQuery, jurusanFilter, statusFilter, sortConfig]);

  const totalPages = Math.ceil(filteredSiswa.length / pagination.perPage);
  const paginatedSiswa = filteredSiswa.slice(
    (currentPage - 1) * pagination.perPage,
    currentPage * pagination.perPage
  );

  const startItem = filteredSiswa.length === 0 ? 0 : (currentPage - 1) * pagination.perPage + 1;
  const endItem = Math.min(currentPage * pagination.perPage, filteredSiswa.length);

  const handleSort = (key: SortKey) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc",
    }));
  };

  const showToast = (message: string, type: "success" | "error" = "success") => {
    setToast({ message, type });
  };

  const handleEdit = (item: Siswa) => {
    showToast(`Mengedit siswa: ${item.nama}`);
  };

  const handleDelete = (item: Siswa) => {
    setSiswaList((prev) => prev.filter((s) => s.id !== item.id));
    showToast(`Siswa "${item.nama}" berhasil dihapus`);
  };

  const handleExport = () => {
    const exportData = filteredSiswa.map(({ id, ...rest }) => rest);
    const ws = XLSX.utils.json_to_sheet(exportData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Data Siswa");
    XLSX.writeFile(wb, "manajemen-pkl.xlsx");
    showToast(`${filteredSiswa.length} data berhasil diexport`);
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = new Uint8Array(event.target?.result as ArrayBuffer);
        const wb = XLSX.read(data, { type: "array" });
        const ws = wb.Sheets[wb.SheetNames[0]];
        const jsonData = XLSX.utils.sheet_to_json<Record<string, string>>(ws);

        const imported: Siswa[] = jsonData.map((row, index) => ({
          id: (siswaList.length > 0 ? Math.max(...siswaList.map((s) => s.id)) : 0) + index + 1,
          nama: row["Nama"] || row["nama"] || "",
          nis: row["NIS"] || row["nis"] || "",
          kelas: row["Kelas"] || row["kelas"] || "",
          jurusan: row["Jurusan"] || row["jurusan"] || "",
          status: row["Status"] || row["status"] || "Pending",
        }));

        setSiswaList((prev) => [...prev, ...imported]);
        showToast(`${imported.length} data berhasil diimport`);
      } catch {
        showToast("Gagal membaca file Excel", "error");
      }
    };
    reader.readAsArrayBuffer(file);
    e.target.value = "";
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
    <div className="manajemen-pkl">
      <div className="manajemen-pkl-header">
        <h1 className="manajemen-pkl-title">{page.title}</h1>
        <div className="manajemen-pkl-header-actions">
          <button className="manajemen-pkl-export-btn" type="button" onClick={handleExport}>
            <Download size={16} />
            Export Excel
          </button>
          <button className="manajemen-pkl-import-btn" type="button" onClick={() => fileInputRef.current?.click()}>
            <Upload size={16} />
            Import Excel
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept=".xlsx,.xls,.csv"
            className="manajemen-pkl-file-input"
            onChange={handleImport}
          />
          <button className="manajemen-pkl-add-btn" type="button">
            <Plus size={18} />
            {page.addButtonLabel}
          </button>
        </div>
      </div>

      <div className="manajemen-pkl-toolbar">
        <div className="manajemen-pkl-search">
          <Search className="manajemen-pkl-search-icon" size={16} />
          <input
            className="manajemen-pkl-search-input"
            type="text"
            placeholder="Cari nama atau NIS..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>
        <div className="manajemen-pkl-filter">
          <select
            className="manajemen-pkl-filter-select"
            value={jurusanFilter}
            onChange={(e) => {
              setJurusanFilter(e.target.value);
              setCurrentPage(1);
            }}
          >
            {filters.jurusan.map((j) => (
              <option key={j} value={j}>
                Jurusan: {j}
              </option>
            ))}
          </select>
          <select
            className="manajemen-pkl-filter-select"
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setCurrentPage(1);
            }}
          >
            {filters.statuses.map((s) => (
              <option key={s} value={s}>
                Status: {s}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="manajemen-pkl-table-wrapper">
        <table className="manajemen-pkl-table">
          <thead>
            <tr>
              {table.columns.map((col) => {
                const sortKey = col.toLowerCase() as SortKey;
                const isSortable = ["id", "nama", "nis", "kelas", "jurusan", "status"].includes(sortKey);
                return (
                  <th
                    key={col}
                    onClick={isSortable ? () => handleSort(sortKey) : undefined}
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
            {paginatedSiswa.length === 0 ? (
              <tr>
                <td colSpan={table.columns.length} className="manajemen-pkl-empty">
                  Tidak ada data ditemukan
                </td>
              </tr>
            ) : (
              paginatedSiswa.map((item) => (
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
                        onClick={() => handleEdit(item)}
                      >
                        <Pencil size={14} />
                      </button>
                      <button
                        className="manajemen-pkl-action-btn manajemen-pkl-action-btn--delete"
                        type="button"
                        title="Hapus"
                        onClick={() => handleDelete(item)}
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

        <div className="manajemen-pkl-footer">
          <span className="manajemen-pkl-pagination-info">
            Showing {startItem}-{endItem} of {filteredSiswa.length}
          </span>
          <div className="manajemen-pkl-pagination">
            <button
              className="manajemen-pkl-pagination-btn"
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
                  className={`manajemen-pkl-pagination-btn${currentPage === page ? " manajemen-pkl-pagination-btn--active" : ""}`}
                  type="button"
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </button>
              )
            )}
            <button
              className="manajemen-pkl-pagination-btn"
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
        <div className={`manajemen-pkl-toast${toast.type === "error" ? " manajemen-pkl-toast--error" : ""}`}>
          <CheckCircle size={18} />
          {toast.message}
          <button
            className="manajemen-pkl-toast-close"
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

export default ManajemenPkl;
