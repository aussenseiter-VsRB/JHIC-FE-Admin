import { useEffect, useState } from "react";
import { FileText, X } from "lucide-react";
import type { Berita } from "../../../api/types";

interface EditBeritaModalProps {
  berita: Berita | null;
  saving: boolean;
  apiError: string | null;
  onSave: (title: string, content: string) => void;
  onClose: () => void;
}

function EditBeritaModal({ berita, saving, apiError, onSave, onClose }: EditBeritaModalProps) {
  const [title, setTitle] = useState(() => berita?.title ?? "");
  const [content, setContent] = useState(() => berita?.content ?? "");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !saving) onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [saving, onClose]);

  if (!berita) return null;

  const handleSubmit = () => {
    setError(null);
    if (!title.trim() || !content.trim()) {
      setError("Judul dan isi berita wajib diisi.");
      return;
    }
    onSave(title.trim(), content.trim());
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
            <FileText size={18} />
          </div>
          <h2 className="text-base font-semibold text-[#1a1a2e]">Edit Berita</h2>
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
            <label htmlFor="edit-title" className="text-sm font-medium text-[#1a1a2e]">
              Judul Berita
            </label>
            <input
              id="edit-title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Masukkan judul berita"
              disabled={saving}
              className="rounded-lg border border-[#f1f5f9] bg-[#fafbfc] px-3.5 py-2.5 text-sm text-[#1a1a2e] outline-none transition-colors focus:border-[#3b82f6] focus:bg-white"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="edit-content" className="text-sm font-medium text-[#1a1a2e]">
              Berita
            </label>
            <textarea
              id="edit-content"
              rows={7}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Tulis berita di sini..."
              disabled={saving}
              className="resize-none rounded-lg border border-[#f1f5f9] bg-[#fafbfc] px-3.5 py-2.5 text-sm text-[#1a1a2e] outline-none transition-colors focus:border-[#3b82f6] focus:bg-white"
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

export default EditBeritaModal;
