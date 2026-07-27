import { CheckCircle, X } from "lucide-react";

interface ToastProps {
  message: string;
  type?: "success" | "error";
  onClose: () => void;
}

function Toast({ message, type = "success", onClose }: ToastProps) {
  return (
    <div
      className={`fixed bottom-6 right-6 z-50 flex items-center gap-2.5 rounded-lg px-4 py-3 text-sm text-white shadow-lg ${
        type === "error" ? "bg-red-800" : "bg-green-800"
      }`}
    >
      <CheckCircle size={18} />
      {message}
      <button
        type="button"
        onClick={onClose}
        className="flex h-5 w-5 items-center justify-center rounded bg-transparent text-white opacity-70 transition-opacity hover:opacity-100"
      >
        <X size={14} />
      </button>
    </div>
  );
}

export default Toast;
