import { useEffect, useState } from "react";
import { UserPlus, X } from "lucide-react";

interface TambahUserModalProps {
  saving: boolean;
  apiError: string | null;
  onSave: (email: string, password: string, name: string) => void;
  onClose: () => void;
}

function TambahUserModal({ saving, apiError, onSave, onClose }: TambahUserModalProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !saving) onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [saving, onClose]);

  const handleSubmit = () => {
    setError(null);
    if (!name.trim() || !email.trim() || !password) {
      setError("Nama, email, dan password wajib diisi.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError("Format email tidak valid.");
      return;
    }
    onSave(email.trim(), password, name.trim());
  };

  const shownError = error ?? apiError;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
      onClick={() => !saving && onClose()}
    >
      <div
        className="w-full max-w-lg rounded-xl bg-white shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 border-b border-[#f1f5f9] px-6 py-4">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#eff6ff] text-[#3b82f6]">
            <UserPlus size={18} />
          </div>
          <h2 className="text-base font-semibold text-[#1a1a2e]">Tambah User</h2>
          <button
            type="button"
            onClick={onClose}
            disabled={saving}
            className="ml-auto flex h-8 w-8 items-center justify-center rounded-lg text-[#94a3b8] transition-colors hover:bg-[#f8fafc] hover:text-[#334155] disabled:cursor-not-allowed disabled:opacity-60"
          >
            <X size={18} />
          </button>
        </div>

        <div className="flex flex-col gap-4 px-6 py-5">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="add-name" className="text-sm font-medium text-[#1a1a2e]">
              Nama
            </label>
            <input
              id="add-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Masukkan nama lengkap"
              disabled={saving}
              className="rounded-lg border border-[#f1f5f9] bg-[#fafbfc] px-3.5 py-2.5 text-sm text-[#1a1a2e] outline-none transition-colors focus:border-[#3b82f6] focus:bg-white"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="add-email" className="text-sm font-medium text-[#1a1a2e]">
              Email
            </label>
            <input
              id="add-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="nama@email.com"
              disabled={saving}
              className="rounded-lg border border-[#f1f5f9] bg-[#fafbfc] px-3.5 py-2.5 text-sm text-[#1a1a2e] outline-none transition-colors focus:border-[#3b82f6] focus:bg-white"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="add-password" className="text-sm font-medium text-[#1a1a2e]">
              Password
            </label>
            <input
              id="add-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Masukkan password"
              disabled={saving}
              className="rounded-lg border border-[#f1f5f9] bg-[#fafbfc] px-3.5 py-2.5 text-sm text-[#1a1a2e] outline-none transition-colors focus:border-[#3b82f6] focus:bg-white"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-[#1a1a2e]">Role</label>
            <div className="rounded-lg border border-[#f1f5f9] bg-[#f8fafc] px-3.5 py-2.5 text-sm text-[#64748b]">
              User
            </div>
          </div>

          {shownError && (
            <p className="rounded-lg bg-[#fef2f2] px-3.5 py-2.5 text-sm text-[#991b1b]">
              {shownError}
            </p>
          )}
        </div>

        <div className="flex justify-end gap-3 border-t border-[#f1f5f9] px-6 py-4">
          <button
            type="button"
            onClick={onClose}
            disabled={saving}
            className="rounded-lg border border-[#e2e8f0] bg-white px-5 py-2.5 text-sm font-medium text-[#64748b] transition-colors hover:bg-[#f8fafc] disabled:cursor-not-allowed disabled:opacity-60"
          >
            Batal
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={saving}
            className="rounded-lg bg-[#3b82f6] px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#2563eb] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {saving ? "Menyimpan..." : "Simpan"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default TambahUserModal;