import { Clock, Pencil, Trash2 } from "lucide-react";
import type { Berita } from "../../../api/types";

function fmtDate(s: string): string {
  return new Date(s).toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

interface RiwayatBeritaProps {
  title: string;
  columns: string[];
  items: Berita[];
  loading: boolean;
  error: string | null;
  deletingId: string | null;
  onEdit: (berita: Berita) => void;
  onDelete: (id: string) => void;
}

function RiwayatBerita({
  title,
  columns,
  items,
  loading,
  error,
  deletingId,
  onEdit,
  onDelete,
}: RiwayatBeritaProps) {
  return (
    <div className="buat-berita-card buat-berita-card--full">
      <div className="buat-berita-card-header">
        <div className="buat-berita-card-icon">
          <Clock size={18} />
        </div>
        <span className="buat-berita-card-title">{title}</span>
        <span className="ml-auto text-xs text-[#94a3b8]">{items.length} item</span>
      </div>

      {error && (
        <p className="mb-4 rounded-lg bg-[#fef2f2] px-3.5 py-2.5 text-sm text-[#991b1b]">
          {error}
        </p>
      )}

      <div className="buat-berita-table-wrapper">
        <table className="buat-berita-table">
          <thead>
            <tr>
              {columns.map((col) => (
                <th key={col}>{col}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={item.id}>
                <td className="text-[#94a3b8]">{index + 1}</td>
                <td className="font-medium">{item.title}</td>
                <td className="text-[#64748b]">{fmtDate(item.created_at)}</td>
                <td>
                  <div className="flex gap-1.5">
                    <button
                      type="button"
                      className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium text-[#3b82f6] transition-colors hover:bg-[#eff6ff] disabled:cursor-not-allowed disabled:opacity-60"
                      disabled={deletingId === item.id}
                      onClick={() => onEdit(item)}
                    >
                      <Pencil size={14} />
                      Edit
                    </button>
                    <button
                      type="button"
                      className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium text-[#dc2626] transition-colors hover:bg-[#fef2f2] disabled:cursor-not-allowed disabled:opacity-60"
                      disabled={deletingId === item.id}
                      onClick={() => onDelete(item.id)}
                    >
                      <Trash2 size={14} />
                      {deletingId === item.id ? "Menghapus..." : "Hapus"}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {loading && (
        <p className="py-8 text-center text-sm text-[#94a3b8]">Memuat data...</p>
      )}

      {!loading && items.length === 0 && (
        <p className="py-8 text-center text-sm text-[#94a3b8]">Belum ada riwayat berita</p>
      )}
    </div>
  );
}

export default RiwayatBerita;
