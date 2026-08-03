import { useEffect, useState } from "react";
import { Pencil, X } from "lucide-react";
import type { UserRow } from "./UserTable";

interface EditUserModalProps {
  user: UserRow | null;
  saving: boolean;
  apiError: string | null;
  onSave: (name: string, userClass: string, jurusan: string) => void;
  onClose: () => void;
}

function EditUserModal({ user, saving, apiError, onSave, onClose }: EditUserModalProps) {
  const [name, setName] = useState(() => user?.name ?? "");
  const [userClass, setUserClass] = useState(() => user?.class ?? "");
  const [jurusan, setJurusan] = useState(() => user?.jurusan ?? "");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !saving) onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [saving, onClose]);

  if (!user) return null;

  const handleSubmit = () => {
    setError(null);
    if (!name.trim()) {
      setError("Nama wajib diisi.");
      return;
    }
    onSave(name.trim(), userClass.trim(), jurusan.trim());
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
            <Pencil size={18} />
          </div>
          <h2 className="text-base font-semibold text-[#1a1a2e]">Edit User</h2>
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
            <label htmlFor="edit-name" className="text-sm font-medium text-[#1a1a2e]">
              Nama
            </label>
            <input
              id="edit-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Masukkan nama lengkap"
              disabled={saving}
              className="rounded-lg border border-[#f1f5f9] bg-[#fafbfc] px-3.5 py-2.5 text-sm text-[#1a1a2e] outline-none transition-colors focus:border-[#3b82f6] focus:bg-white"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="edit-email" className="text-sm font-medium text-[#1a1a2e]">
              Email
            </label>
            <input
              id="edit-email"
              type="email"
              value={user.email}
              readOnly
              disabled
              className="rounded-lg border border-[#f1f5f9] bg-[#f8fafc] px-3.5 py-2.5 text-sm text-[#94a3b8]"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="edit-class" className="text-sm font-medium text-[#1a1a2e]">
              Kelas
            </label>
            <input
              id="edit-class"
              type="text"
              value={userClass}
              onChange={(e) => setUserClass(e.target.value)}
              placeholder="Misal: X PPLG 1"
              disabled={saving}
              className="rounded-lg border border-[#f1f5f9] bg-[#fafbfc] px-3.5 py-2.5 text-sm text-[#1a1a2e] outline-none transition-colors focus:border-[#3b82f6] focus:bg-white"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="edit-jurusan" className="text-sm font-medium text-[#1a1a2e]">
              Jurusan
            </label>
            <input
              id="edit-jurusan"
              type="text"
              value={jurusan}
              onChange={(e) => setJurusan(e.target.value)}
              placeholder="Misal: PPLG"
              disabled={saving}
              className="rounded-lg border border-[#f1f5f9] bg-[#fafbfc] px-3.5 py-2.5 text-sm text-[#1a1a2e] outline-none transition-colors focus:border-[#3b82f6] focus:bg-white"
            />
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
            {saving ? "Menyimpan..." : "Perbarui"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditUserModal;