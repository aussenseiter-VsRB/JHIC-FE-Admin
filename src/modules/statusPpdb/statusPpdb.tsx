import { useState, useEffect } from "react";
import {
  Users,
  CheckCircle,
  Clock,
  Target,
  X,
  PlayCircle,
  StopCircle,
} from "lucide-react";
import pageData from "./statusPpdb.json";
import "./css/statusPpdb.css";

interface Toast {
  message: string;
  type: "success" | "error";
}

function StatusPpdb() {
  const { page, stats, toggle } = pageData;

  const [isOpen, setIsOpen] = useState(false);
  const [toast, setToast] = useState<Toast | null>(null);

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const handleToggle = () => {
    setIsOpen((prev) => {
      const next = !prev;
      setToast({
        message: next ? "PPDB telah dibuka" : "PPDB telah ditutup",
        type: "success",
      });
      return next;
    });
  };

  const kuotaTersisa = stats.kuotaTotal - stats.diterima;
  const persentaseDiterima = Math.round(
    (stats.diterima / stats.kuotaTotal) * 100
  );

  return (
    <div className="status-ppdb">
      <div className="status-ppdb-header">
        <h1 className="status-ppdb-title">{page.title}</h1>
        <span
          className={`status-ppdb-badge ${isOpen ? "status-ppdb-badge--open" : "status-ppdb-badge--closed"}`}
        >
          <span className="status-ppdb-badge-dot" />
          {isOpen ? "Aktif" : "Tidak Aktif"}
        </span>
      </div>

      <div className="status-ppdb-bento">
        <div
          className={`status-ppdb-card status-ppdb-card--hero ${isOpen ? "status-ppdb-card--open" : ""}`}
        >
          <div className="status-ppdb-hero-top">
            <span className="status-ppdb-hero-label">Status PPDB</span>
            <span
              className={`status-ppdb-hero-value ${isOpen ? "status-ppdb-hero-value--open" : ""}`}
            >
              {isOpen ? "Buka" : "Tutup"}
            </span>
            <span className="status-ppdb-hero-desc">
              {isOpen
                ? "Pendaftaran sedang berjalan. Siswa dapat mendaftar secara online."
                : "Pendaftaran belum dimulai atau sudah ditutup."}
            </span>
          </div>

          <div className="status-ppdb-hero-bottom">
            <div className="status-ppdb-toggle-row">
              <span className="status-ppdb-toggle-label">
                {isOpen ? toggle.closeLabel : toggle.openLabel}
              </span>
              <label className="status-ppdb-toggle">
                <input
                  type="checkbox"
                  checked={isOpen}
                  onChange={handleToggle}
                />
                <span className="status-ppdb-toggle-track" />
                <span className="status-ppdb-toggle-knob" />
              </label>
            </div>

            <button
              className={`status-ppdb-btn ${isOpen ? "status-ppdb-btn--close" : "status-ppdb-btn--open"}`}
              type="button"
              onClick={handleToggle}
            >
              {isOpen ? (
                <>
                  <StopCircle size={18} />
                  Tutup PPDB
                </>
              ) : (
                <>
                  <PlayCircle size={18} />
                  Mulai PPDB
                </>
              )}
            </button>
          </div>
        </div>

        <div className="status-ppdb-card status-ppdb-card--stat">
          <div className="status-ppdb-stat-icon status-ppdb-stat-icon--blue">
            <Users size={20} />
          </div>
          <div className="status-ppdb-stat-content">
            <span className="status-ppdb-stat-label">Total Pendaftar</span>
            <span className="status-ppdb-stat-value">{stats.totalPendaftar}</span>
            <span className="status-ppdb-stat-sub">dari {stats.kuotaTotal} kuota</span>
          </div>
          <div className="status-ppdb-progress">
            <div
              className="status-ppdb-progress-bar status-ppdb-progress-bar--blue"
              style={{ width: `${Math.round((stats.totalPendaftar / stats.kuotaTotal) * 100)}%` }}
            />
          </div>
        </div>

        <div className="status-ppdb-card status-ppdb-card--stat">
          <div className="status-ppdb-stat-icon status-ppdb-stat-icon--green">
            <CheckCircle size={20} />
          </div>
          <div className="status-ppdb-stat-content">
            <span className="status-ppdb-stat-label">Diterima</span>
            <span className="status-ppdb-stat-value">{stats.diterima}</span>
            <span className="status-ppdb-stat-sub">{persentaseDiterima}% dari kuota</span>
          </div>
          <div className="status-ppdb-progress">
            <div
              className="status-ppdb-progress-bar status-ppdb-progress-bar--green"
              style={{ width: `${persentaseDiterima}%` }}
            />
          </div>
        </div>

        <div className="status-ppdb-card status-ppdb-card--stat">
          <div className="status-ppdb-stat-icon status-ppdb-stat-icon--amber">
            <Clock size={20} />
          </div>
          <div className="status-ppdb-stat-content">
            <span className="status-ppdb-stat-label">Pending</span>
            <span className="status-ppdb-stat-value">{stats.pending}</span>
            <span className="status-ppdb-stat-sub">menunggu verifikasi</span>
          </div>
          <div className="status-ppdb-progress">
            <div
              className="status-ppdb-progress-bar status-ppdb-progress-bar--amber"
              style={{ width: `${Math.round((stats.pending / stats.totalPendaftar) * 100)}%` }}
            />
          </div>
        </div>

        <div className="status-ppdb-card status-ppdb-card--stat">
          <div className="status-ppdb-stat-icon status-ppdb-stat-icon--purple">
            <Target size={20} />
          </div>
          <div className="status-ppdb-stat-content">
            <span className="status-ppdb-stat-label">Kuota Tersisa</span>
            <span className="status-ppdb-stat-value">{kuotaTersisa}</span>
            <span className="status-ppdb-stat-sub">dari {stats.kuotaTotal} total</span>
          </div>
          <div className="status-ppdb-progress">
            <div
              className="status-ppdb-progress-bar status-ppdb-progress-bar--purple"
              style={{ width: `${Math.round((kuotaTersisa / stats.kuotaTotal) * 100)}%` }}
            />
          </div>
        </div>
      </div>

      {toast && (
        <div
          className={`status-ppdb-toast${toast.type === "error" ? " status-ppdb-toast--error" : ""}`}
        >
          <CheckCircle size={18} />
          {toast.message}
          <button
            className="status-ppdb-toast-close"
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

export default StatusPpdb;
