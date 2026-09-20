import { useState, useRef, useEffect } from "react";
import { MdAccountCircle } from "react-icons/md";
import { LogIn, UserPlus, ChevronDown } from "lucide-react";

interface AccountMenuProps {
  variant?: "desktop" | "mobile";
  onOpenLogin: () => void;
  onOpenSingup: () => void;
}

const AccountMenu = ({
  variant = "desktop",
  onOpenSingup,
  onOpenLogin,
}: AccountMenuProps) => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const isMobile = variant === "mobile";
  return (
    <div ref={menuRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        aria-haspopup="true"
        className={
          isMobile
            ? "flex flex-col items-center text-xs gap-1"
            : "flex items-center gap-1 text-sm cursor-pointer"
        }
      >
        <MdAccountCircle size={isMobile ? 22 : 25} />
        Account
        {!isMobile && (
          <ChevronDown
            size={14}
            className={`transition-transform ${open ? "rotate-180" : ""}`}
          />
        )}
      </button>
      {open && (
        <div
          className={`absolute right-0 w-48 bg-white border border-gray-100 rounded-lg shadow-xl overflow-hidden z-50 ${
            isMobile ? "bottom-full mb-2" : "top-full mt-2"
          }`}
        >
          <button
            onClick={() => {
              setOpen(false);
              onOpenLogin();
            }}
            className="flex items-center gap-3 px-4 py-3 text-sm hover:bg-gray-50 transition-colors"
          >
            <LogIn size={16} className="text-gray-500" />
            Login
          </button>
          <div className="border-t border-gray-100" />
          <button
            onClick={() => {
              setOpen(false);
              onOpenSingup();
            }}
            className="flex items-center gap-3 px-4 py-3 text-sm hover:bg-gray-50 transition-colors"
          >
            <UserPlus size={16} className="text-gray-500" />
            Sign up
          </button>
        </div>
      )}
    </div>
  );
};

export default AccountMenu;
