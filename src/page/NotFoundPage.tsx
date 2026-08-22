// pages/NotFoundPage.tsx

import { Link } from "react-router-dom";
import { PackageX } from "lucide-react";

const NotFoundPage = () => {
  return (
    <main className="flex flex-col items-center justify-center text-center px-4 py-24 min-h-[60vh]">
      <PackageX size={64} className="text-gray-400 mb-6" aria-hidden="true" />

      <h1 className="text-6xl font-bold mb-2">404</h1>
      <p className="text-xl font-medium mb-2">Page not found</p>
      <p className="text-gray-500 max-w-md mb-8">
        The page you're looking for doesn't exist or may have been moved.
      </p>

      <div className="flex flex-col sm:flex-row gap-3">
        <Link
          to="/"
          className="px-6 py-3 rounded-md bg-black text-white text-sm font-medium hover:opacity-90"
        >
          Back to home
        </Link>
        <Link
          to="/category/clothing"
          className="px-6 py-3 rounded-md border text-sm font-medium hover:bg-gray-50"
        >
          Browse products
        </Link>
      </div>
    </main>
  );
};

export default NotFoundPage;
