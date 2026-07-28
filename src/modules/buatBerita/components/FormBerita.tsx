import type { ChangeEvent } from "react";
import { FileText } from "lucide-react";

interface FormBeritaProps {
  author: string;
  awal: string;
  orientasi: string;
  penutup: string;
  onAuthorChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onAwalChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  onOrientasiChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  onPenutupChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  authorPlaceholder: string;
  authorLabel: string;
  awalLabel: string;
  awalPlaceholder: string;
  orientasiLabel: string;
  orientasiPlaceholder: string;
  penutupLabel: string;
  penutupPlaceholder: string;
  submitLabel: string;
  onSubmit: () => void;
}

function FormBerita({
  author,
  awal,
  orientasi,
  penutup,
  onAuthorChange,
  onAwalChange,
  onOrientasiChange,
  onPenutupChange,
  authorPlaceholder,
  authorLabel,
  awalLabel,
  awalPlaceholder,
  orientasiLabel,
  orientasiPlaceholder,
  penutupLabel,
  penutupPlaceholder,
  submitLabel,
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
            {authorLabel}
          </label>
          <input
            id="author"
            type="text"
            value={author}
            onChange={onAuthorChange}
            placeholder={authorPlaceholder}
            className="rounded-lg border border-[#f1f5f9] bg-[#fafbfc] px-3.5 py-2.5 text-sm text-[#1a1a2e] outline-none transition-colors focus:border-[#3b82f6] focus:bg-white"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="awal" className="text-sm font-medium text-[#1a1a2e]">
            {awalLabel}
          </label>
          <textarea
            id="awal"
            rows={4}
            value={awal}
            onChange={onAwalChange}
            placeholder={awalPlaceholder}
            className="resize-none rounded-lg border border-[#f1f5f9] bg-[#fafbfc] px-3.5 py-2.5 text-sm text-[#1a1a2e] outline-none transition-colors focus:border-[#3b82f6] focus:bg-white"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="orientasi" className="text-sm font-medium text-[#1a1a2e]">
            {orientasiLabel}
          </label>
          <textarea
            id="orientasi"
            rows={4}
            value={orientasi}
            onChange={onOrientasiChange}
            placeholder={orientasiPlaceholder}
            className="resize-none rounded-lg border border-[#f1f5f9] bg-[#fafbfc] px-3.5 py-2.5 text-sm text-[#1a1a2e] outline-none transition-colors focus:border-[#3b82f6] focus:bg-white"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="penutup" className="text-sm font-medium text-[#1a1a2e]">
            {penutupLabel}
          </label>
          <textarea
            id="penutup"
            rows={4}
            value={penutup}
            onChange={onPenutupChange}
            placeholder={penutupPlaceholder}
            className="resize-none rounded-lg border border-[#f1f5f9] bg-[#fafbfc] px-3.5 py-2.5 text-sm text-[#1a1a2e] outline-none transition-colors focus:border-[#3b82f6] focus:bg-white"
          />
        </div>

        <button
          type="button"
          onClick={onSubmit}
          className="self-start rounded-lg bg-[#3b82f6] px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#2563eb]"
        >
          {submitLabel}
        </button>
      </div>
    </div>
  );
}

export default FormBerita;
