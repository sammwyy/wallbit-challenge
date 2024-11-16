import { X } from "lucide-react";
import { PropsWithChildren } from "react";

export interface ModalProps extends PropsWithChildren {
  isOpen: boolean;
  onClose: () => void;
  title: string;
}

export function Modal({ isOpen, onClose, title, children }: ModalProps) {
  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center"
      onClick={() => {
        onClose();
      }}
    >
      <div
        className="bg-gray-900/95 rounded-xl border border-white/10 w-full max-w-3xl max-h-[80vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-4 border-b border-white/10">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-white">{title}</h2>
            <button
              onClick={onClose}
              className="p-1 rounded-full hover:bg-white/10 transition-colors"
            >
              <X className="w-6 h-6 text-white" />
            </button>
          </div>

          {children}
        </div>
      </div>
    </div>
  );
}
