import type { PropsWithChildren } from "react";

type ModalProps = PropsWithChildren<{ open: boolean; title: string; onClose: () => void }>;

export function Modal({ open, title, onClose, children }: ModalProps) {
  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 backdrop-blur-sm" role="dialog" aria-modal="true" aria-label={title}>
      <div
        className="w-full max-w-md rounded-xl p-6 shadow-xl"
        style={{ background: "var(--card-bg)", border: "1px solid var(--border)" }}
      >
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold" style={{ color: "var(--text)" }}>{title}</h2>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg transition-colors"
            style={{ color: "var(--muted)" }}
            aria-label="Close modal"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
