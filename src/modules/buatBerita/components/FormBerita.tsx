import { FileText } from "lucide-react";

interface FormBeritaProps {
  authorName: string;
  title: string;
  content: string;
  error: string | null;
  loading: boolean;
  onTitleChange: (value: string) => void;
  onContentChange: (value: string) => void;
  onSubmit: () => void;
}

function FormBerita({
  authorName,
  title,
  content,
  error,
  loading,
  onTitleChange,
  onContentChange,
  onSubmit,
}: FormBeritaProps) {
  return (
    <div className="buat-berita-card">
      <div className="buat-berita-card-header">
        <div className="buat-berita-card-icon">
          <FileText size={18} />
        </div>
        <span className="buat-berita-card-title">Form Berita</span>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="author" className="text-sm font-medium text-[#1a1a2e]">
            Penulis
          </label>
          <input
            id="author"
            value={authorName}
            readOnly
            className="cursor-not-allowed rounded-lg border border-[#f1f5f9] bg-[#f8fafc] px-3.5 py-2.5 text-sm text-[#64748b] outline-none"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="title" className="text-sm font-medium text-[#1a1a2e]">
            Judul Berita
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => onTitleChange(e.target.value)}
            placeholder="Masukkan judul berita"
            disabled={loading}
            className="rounded-lg border border-[#f1f5f9] bg-[#fafbfc] px-3.5 py-2.5 text-sm text-[#1a1a2e] outline-none transition-colors focus:border-[#3b82f6] focus:bg-white"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="content" className="text-sm font-medium text-[#1a1a2e]">
            Berita
          </label>
          <textarea
            id="content"
            rows={8}
            value={content}
            onChange={(e) => onContentChange(e.target.value)}
            placeholder="Tulis berita di sini..."
            disabled={loading}
            className="resize-none rounded-lg border border-[#f1f5f9] bg-[#fafbfc] px-3.5 py-2.5 text-sm text-[#1a1a2e] outline-none transition-colors focus:border-[#3b82f6] focus:bg-white"
          />
        </div>

        {error && (
          <p className="rounded-lg bg-[#fef2f2] px-3.5 py-2.5 text-sm text-[#991b1b]">
            {error}
          </p>
        )}

        <button
          type="button"
          onClick={onSubmit}
          disabled={loading}
          className="self-start rounded-lg bg-[#3b82f6] px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#2563eb] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Menyimpan..." : "Simpan"}
        </button>
      </div>
    </div>
  );
}

export default FormBerita;
