import { PlayCircle, StopCircle } from "lucide-react";

interface HeroCardProps {
  isOpen: boolean;
  toggleLabel: string;
  onToggle: () => void;
}

function HeroCard({ isOpen, toggleLabel, onToggle }: HeroCardProps) {
  return (
    <div
      className={`status-ppdb-card status-ppdb-card--hero ${
        isOpen ? "status-ppdb-card--open" : ""
      }`}
    >
      <div className="status-ppdb-hero-top">
        <span className="status-ppdb-hero-label">Status PPDB</span>
        <span
          className={`status-ppdb-hero-value ${
            isOpen ? "status-ppdb-hero-value--open" : ""
          }`}
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
          <span className="status-ppdb-toggle-label">{toggleLabel}</span>
          <label className="status-ppdb-toggle">
            <input
              type="checkbox"
              checked={isOpen}
              onChange={onToggle}
            />
            <span className="status-ppdb-toggle-track" />
            <span className="status-ppdb-toggle-knob" />
          </label>
        </div>

        <button
          className={`status-ppdb-btn ${
            isOpen ? "status-ppdb-btn--close" : "status-ppdb-btn--open"
          }`}
          type="button"
          onClick={onToggle}
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
  );
}

export default HeroCard;
