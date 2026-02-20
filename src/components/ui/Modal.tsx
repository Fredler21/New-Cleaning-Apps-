import type { PropsWithChildren } from "react";

type ModalProps = PropsWithChildren<{ open: boolean; title: string; onClose: () => void }>;

export function Modal({ open, title, onClose, children }: ModalProps) {
  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4" role="dialog" aria-modal="true" aria-label={title}>
      <div className="w-full max-w-md rounded-premium border border-white/20 bg-premium-charcoal p-6 shadow-premium">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-white">{title}</h2>
          <button onClick={onClose} className="rounded p-1 text-slate-300 hover:text-white" aria-label="Close modal">
            ✕
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
