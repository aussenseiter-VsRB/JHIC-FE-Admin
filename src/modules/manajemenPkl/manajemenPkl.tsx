import { useState, useMemo, useEffect, useRef } from "react";
import { Plus, Download, Upload } from "lucide-react";
import * as XLSX from "xlsx";
import pageData from "./manajemenPkl.json";
import "./css/manajemenPkl.css";
import Toolbar from "./components/Toolbar";
import SiswaTable from "./components/SiswaTable";
import Toast from "../../components/Toast";
import Pagination from "../../components/Pagination";

type Siswa = (typeof pageData.siswa)[number];
type SortKey = "id" | "nama" | "nis" | "kelas" | "jurusan" | "status";
type SortDirection = "asc" | "desc";

interface SortConfig {
  key: SortKey;
  direction: SortDirection;
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
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);
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
          s.nis.toLowerCase().includes(query),
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
    currentPage * pagination.perPage,
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
    const exportData = filteredSiswa.map(({ id: _, ...rest }) => rest);
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

  return (
    <div className="manajemen-pkl">
      <div className="manajemen-pkl-header">
        <h1 className="manajemen-pkl-title">{page.title}</h1>
        <div className="manajemen-pkl-header-actions">
          <button className="manajemen-pkl-export-btn" type="button" onClick={handleExport}>
            <Download size={16} />
            Export Excel
          </button>
          <button
            className="manajemen-pkl-import-btn"
            type="button"
            onClick={() => fileInputRef.current?.click()}
          >
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

      <Toolbar
        searchPlaceholder="Cari nama atau NIS..."
        searchQuery={searchQuery}
        onSearchChange={(v) => { setSearchQuery(v); setCurrentPage(1); }}
        filters={[
          { label: "Jurusan", value: jurusanFilter, options: filters.jurusan },
          { label: "Status", value: statusFilter, options: filters.statuses },
        ]}
        onFilterChange={(i, v) => {
          if (i === 0) setJurusanFilter(v);
          else setStatusFilter(v);
          setCurrentPage(1);
        }}
      />

      <div className="manajemen-pkl-table-wrapper">
        <SiswaTable
          columns={table.columns}
          siswaList={paginatedSiswa}
          sortConfig={sortConfig}
          onSort={handleSort}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />

        <div className="manajemen-pkl-footer">
          <span className="manajemen-pkl-pagination-info">
            Showing {startItem}-{endItem} of {filteredSiswa.length}
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

export default ManajemenPkl;
