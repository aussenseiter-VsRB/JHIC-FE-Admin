import { useRef, useState, type ChangeEvent } from "react";
import { Image } from "lucide-react";

interface UploadFotoProps {
  label: string;
  hint: string;
  imageUrl: string | null;
  disabled: boolean;
  disabledHint: string;
  uploading: boolean;
  onUpload: (file: File) => void;
}

function UploadFoto({
  label,
  hint,
  imageUrl,
  disabled,
  disabledHint,
  uploading,
  onUpload,
}: UploadFotoProps) {
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
    onUpload(file);
    e.target.value = "";
  };

  const displayed = imageUrl ?? preview;

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
          disabled={disabled || uploading}
          className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-[#e2e8f0] bg-[#fafbfc] px-4 py-10 text-center transition-colors hover:border-[#3b82f6] hover:bg-[#eff6ff] disabled:cursor-not-allowed disabled:opacity-60"
        >
          <Image size={32} className="text-[#94a3b8]" />
          <span className="text-sm font-medium text-[#64748b]">
            {uploading ? "Mengunggah..." : "Klik untuk upload foto"}
          </span>
          <span className="text-xs text-[#94a3b8]">{disabled ? disabledHint : hint}</span>
        </button>

        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png,image/gif,image/webp"
          onChange={handleFile}
          disabled={disabled || uploading}
          className="hidden"
        />

        {disabled && !displayed && (
          <p className="rounded-lg bg-[#fefce8] px-3.5 py-2.5 text-xs text-[#854d0e]">
            {disabledHint}
          </p>
        )}

        {displayed && (
          <div className="overflow-hidden rounded-lg border border-[#f1f5f9]">
            <img
              src={displayed}
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