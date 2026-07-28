import { useState, useRef, type ChangeEvent } from "react";
import { Image } from "lucide-react";

interface UploadFotoProps {
  label: string;
  hint: string;
}

function UploadFoto({ label, hint }: UploadFotoProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      setPreview(null);
      return;
    }
    const reader = new FileReader();
    reader.onload = () => setPreview(reader.result as string);
    reader.readAsDataURL(file);
  };

  return (
    <div className="buat-berita-card">
      <div className="buat-berita-card-header">
        <div className="buat-berita-card-icon">
          <Image size={18} />
        </div>
        <span className="buat-berita-card-title">{label}</span>
      </div>

      <div className="flex flex-col gap-4">
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-[#e2e8f0] bg-[#fafbfc] px-4 py-10 text-center transition-colors hover:border-[#3b82f6] hover:bg-[#eff6ff]"
        >
          <Image size={32} className="text-[#94a3b8]" />
          <span className="text-sm font-medium text-[#64748b]">Klik untuk upload foto</span>
          <span className="text-xs text-[#94a3b8]">{hint}</span>
        </button>

        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png"
          onChange={handleFile}
          className="hidden"
        />

        {preview && (
          <div className="overflow-hidden rounded-lg border border-[#f1f5f9]">
            <img
              src={preview}
              alt="Preview"
              className="h-auto max-h-56 w-full object-cover"
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default UploadFoto;
