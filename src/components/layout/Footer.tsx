// components/layout/Footer.tsx

import { Link } from "react-router-dom";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="border-t mt-10">
      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        <div>
          <h2 className="font-semibold mb-3">NOVA</h2>
          <p className="text-sm text-gray-500">
            Everyday essentials — clothing, shoes, bags, and more.
          </p>
        </div>

        <nav aria-label="Shop">
          <h3 className="font-medium mb-3">Shop</h3>
          <ul className="space-y-2 text-sm text-gray-500">
            <li>
              <Link to="/category/clothing">Clothing</Link>
            </li>
            <li>
              <Link to="/category/shoes">Shoes</Link>
            </li>
            <li>
              <Link to="/category/bags">Bags</Link>
            </li>
            <li>
              <Link to="/category/accessories">Accessories</Link>
            </li>
          </ul>
        </nav>

        <nav aria-label="Customer service">
          <h3 className="font-medium mb-3">Customer service</h3>
          <ul className="space-y-2 text-sm text-gray-500">
            <li>
              <Link to="/contact">Contact us</Link>
            </li>
            <li>
              <Link to="/shipping">Shipping info</Link>
            </li>
            <li>
              <Link to="/returns">Returns</Link>
            </li>
            <li>
              <Link to="/faq">FAQ</Link>
            </li>
          </ul>
        </nav>

        <div>
          <h3 className="font-medium mb-3">Follow us</h3>
          <div className="flex gap-4">
            <a href="#" aria-label="Facebook">
              <FaFacebook size={18} aria-hidden="true" />
            </a>
            <a href="#" aria-label="Instagram">
              <FaInstagram size={18} aria-hidden="true" />
            </a>
            <a href="#" aria-label="Twitter">
              <FaTwitter size={18} aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t py-4 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} NOVA. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
