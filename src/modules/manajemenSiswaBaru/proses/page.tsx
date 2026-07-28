import { useState, useMemo, useEffect, useRef } from "react";
import { Plus, Download, Upload } from "lucide-react";
import * as XLSX from "xlsx";
import pageData from "../proses/proses.json";
import "./css/page.css";
import ToolbarSiswa from "../components/ToolbarSiswa";
import TableSiswa from "../components/TableSiswa";
import Toast from "../../../components/Toast";
import Pagination from "../../../components/Pagination";

type Siswa = (typeof pageData.siswa)[number];

function Proses() {
  const { page, table, filters, pagination } = pageData;

  const [searchQuery, setSearchQuery] = useState("");
  const [jurusanFilter, setJurusanFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: "asc" | "desc" }>({ key: "id", direction: "asc" });
  const [currentPage, setCurrentPage] = useState(1);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);
  const [siswaList, setSiswaList] = useState<Siswa[]>(pageData.siswa);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const filteredData = useMemo(() => {
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
      const aVal = a[sortConfig.key as keyof Siswa];
      const bVal = b[sortConfig.key as keyof Siswa];
      const modifier = sortConfig.direction === "asc" ? 1 : -1;
      if (String(aVal) < String(bVal)) return -1 * modifier;
      if (String(aVal) > String(bVal)) return 1 * modifier;
      return 0;
    });

    return result;
  }, [siswaList, searchQuery, jurusanFilter, statusFilter, sortConfig]);

  const totalPages = Math.ceil(filteredData.length / pagination.perPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * pagination.perPage,
    currentPage * pagination.perPage,
  );

  const startItem = filteredData.length === 0 ? 0 : (currentPage - 1) * pagination.perPage + 1;
  const endItem = Math.min(currentPage * pagination.perPage, filteredData.length);

  const handleSort = (key: string) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc",
    }));
  };

  const showToast = (message: string, type: "success" | "error" = "success") => {
    setToast({ message, type });
  };

  const handleEdit = (item: Record<string, string | number>) => {
    showToast(`Mengedit siswa: ${item.nama}`);
  };

  const handleDelete = (item: Record<string, string | number>) => {
    setSiswaList((prev) => prev.filter((s) => s.id !== item.id));
    showToast(`Siswa "${item.nama}" berhasil dihapus`);
  };

  const handleExport = () => {
    const exportData = filteredData.map(({ id: _id, tglDaftar, ...rest }) => {
      void _id;
      return { ...rest, "Tgl. Daftar": tglDaftar };
    });
    const ws = XLSX.utils.json_to_sheet(exportData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Siswa Baru");
    XLSX.writeFile(wb, "siswa-baru-proses.xlsx");
    showToast(`${filteredData.length} data berhasil diexport`);
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
          tglDaftar: row["Tgl. Daftar"] || row["tglDaftar"] || "",
          status: row["Status"] || row["status"] || "Proses",
        }));

        showToast(`${imported.length} data berhasil diimport`);
      } catch {
        showToast("Gagal membaca file Excel", "error");
      }
    };
    reader.readAsArrayBuffer(file);
    e.target.value = "";
  };

  return (
    <div className="msb">
      <div className="msb-header">
        <h1 className="msb-title">{page.title}</h1>
        <div className="msb-header-actions">
          <button className="msb-export-btn" type="button" onClick={handleExport}>
            <Download size={16} />
            Export Excel
          </button>
          <button className="msb-import-btn" type="button" onClick={() => fileInputRef.current?.click()}>
            <Upload size={16} />
            Import Excel
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept=".xlsx,.xls,.csv"
            className="msb-file-input"
            onChange={handleImport}
          />
          <button className="msb-add-btn" type="button">
            <Plus size={18} />
            {page.addButtonLabel}
          </button>
        </div>
      </div>

      <ToolbarSiswa
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

      <div className="msb-table-wrapper">
        <TableSiswa
          columns={table.columns}
          data={paginatedData}
          sortConfig={sortConfig}
          onSort={handleSort}
          onEdit={handleEdit}
          onDelete={handleDelete}
          sortableKeys={["id", "nama", "nis", "kelas", "jurusan", "tgl. daftar", "status"]}
          statusKey="status"
        />

        <div className="msb-footer">
          <span className="msb-pagination-info">
            Showing {startItem}-{endItem} of {filteredData.length}
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

export default Proses;
