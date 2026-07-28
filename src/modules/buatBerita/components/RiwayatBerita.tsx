import { Clock } from "lucide-react";

interface RiwayatItem {
  id: number;
  judul: string;
  penulis: string;
  tanggal: string;
  status: string;
}

interface RiwayatBeritaProps {
  title: string;
  columns: string[];
  items: RiwayatItem[];
}

function RiwayatBerita({ title, columns, items }: RiwayatBeritaProps) {
  return (
    <div className="buat-berita-card buat-berita-card--full">
      <div className="buat-berita-card-header">
        <div className="buat-berita-card-icon">
          <Clock size={18} />
        </div>
        <span className="buat-berita-card-title">{title}</span>
        <span className="ml-auto text-xs text-[#94a3b8]">{items.length} item</span>
      </div>

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
            {items.map((item) => (
              <tr key={item.id}>
                <td className="text-[#94a3b8]">{item.id}</td>
                <td className="font-medium">{item.judul}</td>
                <td className="text-[#64748b]">{item.penulis}</td>
                <td className="text-[#64748b]">{item.tanggal}</td>
                <td>
                  <span
                    className={`buat-berita-status buat-berita-status--${item.status === "Aktif" ? "aktif" : "draft"}`}
                  >
                    {item.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {items.length === 0 && (
        <p className="py-8 text-center text-sm text-[#94a3b8]">Belum ada riwayat berita</p>
      )}
    </div>
  );
}

export default RiwayatBerita;
