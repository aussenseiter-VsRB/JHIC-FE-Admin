import { useState, useEffect } from "react";
import { Users, CheckCircle, Clock, Target } from "lucide-react";
import pageData from "./statusPpdb.json";
import "./css/statusPpdb.css";
import HeroCard from "./components/HeroCard";
import StatCard from "./components/StatCard";
import Toast from "../../components/Toast";

function StatusPpdb() {
  const { page, stats, toggle } = pageData;

  const [isOpen, setIsOpen] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

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
    (stats.diterima / stats.kuotaTotal) * 100,
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
        <HeroCard
          isOpen={isOpen}
          toggleLabel={isOpen ? toggle.closeLabel : toggle.openLabel}
          onToggle={handleToggle}
        />

        <StatCard
          icon={Users}
          iconColor="blue"
          progressColor="blue"
          label="Total Pendaftar"
          value={stats.totalPendaftar}
          sub={`dari ${stats.kuotaTotal} kuota`}
          progressPercent={Math.round((stats.totalPendaftar / stats.kuotaTotal) * 100)}
        />

        <StatCard
          icon={CheckCircle}
          iconColor="green"
          progressColor="green"
          label="Diterima"
          value={stats.diterima}
          sub={`${persentaseDiterima}% dari kuota`}
          progressPercent={persentaseDiterima}
        />

        <StatCard
          icon={Clock}
          iconColor="amber"
          progressColor="amber"
          label="Pending"
          value={stats.pending}
          sub="menunggu verifikasi"
          progressPercent={Math.round((stats.pending / stats.totalPendaftar) * 100)}
        />

        <StatCard
          icon={Target}
          iconColor="purple"
          progressColor="purple"
          label="Kuota Tersisa"
          value={kuotaTersisa}
          sub={`dari ${stats.kuotaTotal} total`}
          progressPercent={Math.round((kuotaTersisa / stats.kuotaTotal) * 100)}
        />
      </div>

      {toast && (
        <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />
      )}
    </div>
  );
}

export default StatusPpdb;
