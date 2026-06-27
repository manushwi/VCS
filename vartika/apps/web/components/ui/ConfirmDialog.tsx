"use client";

interface ConfirmDialogProps {
  open: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
  loading?: boolean;
}

export default function ConfirmDialog({
  open,
  title,
  message,
  confirmLabel = "Delete",
  cancelLabel = "Cancel",
  onConfirm,
  onCancel,
  loading = false,
}: ConfirmDialogProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60">
      <div className="bg-[#161714] border border-white/6 rounded-16 p-6 w-full max-w-sm mx-4">
        <h3 className="text-base font-semibold text-white/85 mb-2">{title}</h3>
        <p className="text-sm text-white/50 mb-6">{message}</p>
        <div className="flex gap-2 justify-end">
          <button
            className="px-4 py-2 bg-white/5 border border-white/6 text-white/50 rounded-full text-xs hover:text-white/70 transition-all cursor-pointer"
            onClick={onCancel}
            disabled={loading}
          >
            {cancelLabel}
          </button>
          <button
            className={`px-4 py-2 rounded-full text-xs font-medium transition-all cursor-pointer ${
              loading
                ? "bg-[rgba(239,68,68,0.15)] text-[#EF4444]/50 animate-pulse"
                : "bg-[rgba(239,68,68,0.15)] border border-[rgba(239,68,68,0.3)] text-[#EF4444] hover:bg-[rgba(239,68,68,0.25)]"
            }`}
            onClick={onConfirm}
            disabled={loading}
          >
            {loading ? "Deleting..." : confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
