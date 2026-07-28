import type { ChangeEvent } from "react";
import { FileText } from "lucide-react";

interface FormBeritaProps {
  author: string;
  content: string;
  onAuthorChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onContentChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  authorPlaceholder: string;
  contentPlaceholder: string;
  authorLabel: string;
  contentLabel: string;
  submitLabel: string;
  onSubmit: () => void;
}

function FormBerita({
  author,
  content,
  onAuthorChange,
  onContentChange,
  authorPlaceholder,
  contentPlaceholder,
  authorLabel,
  contentLabel,
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
          <label htmlFor="content" className="text-sm font-medium text-[#1a1a2e]">
            {contentLabel}
          </label>
          <textarea
            id="content"
            rows={6}
            value={content}
            onChange={onContentChange}
            placeholder={contentPlaceholder}
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
