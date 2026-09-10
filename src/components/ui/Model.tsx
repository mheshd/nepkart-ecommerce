import type { ReactNode } from "react";
import { X } from "lucide-react";

interface ModelProps {
  children: ReactNode;
  className?: string;
  onClose?: () => void;
}

const Model = ({ children, onClose, className = "" }: ModelProps) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 p-4">
      <div
        className={`relative w-full max-w-3xl rounded-lg bg-white shadow-xl py-8 px-2 ${className}`}
      >
        <button
          type="button"
          onClick={onClose}
          className=" absolute top-3 right-2 rounded-full p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-800"
          aria-label="Close modal"
        >
          <X size={20} />
        </button>
        {children}
      </div>
    </div>
  );
};

export default Model;
