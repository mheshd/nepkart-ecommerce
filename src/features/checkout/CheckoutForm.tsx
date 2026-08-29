import React, { useState } from "react";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";

export interface ShippingDetails {
  fullName: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  postalCode: string;
  province: string;
}

interface CheckoutFormProps {
  onSubmit: (details: ShippingDetails) => void;
}

const provinces = [
  "Koshi Province",
  "Madhesh Province",
  "Bagmati Province",
  "Gandaki Province",
  "Lumbini Province",
  "Karnali Province",
  "Sudurpashchim Province",
];

const CheckoutForm = ({ onSubmit }: CheckoutFormProps) => {
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [province, setProvince] = useState("");
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!fullName.trim() || !phone.trim() || !address.trim() || !city.trim()) {
      setError("Please fill in all required fields.");
      return;
    }
    const phonePattern = /^[0-9+\-\s]{7,15}$/;
    if (!phonePattern.test(phone)) {
      setError("Enter a valid phone number.");
      return;
    }

    setError(null);
    onSubmit({ fullName, phone, email, address, city, postalCode, province });
  }
  const labelClass = "block text-sm mb-1 text-gray-600";
  return (
    <form
      onSubmit={handleSubmit}
      className=" max-w-6xl mx-auto  py-8 bg-white shadow-2xs px-4"
    >
      <h2 className="font-heading mb-3">Shipping details</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-4 mb-5">
        <div>
          <label htmlFor="fullName" className={labelClass}>
            Full Name *
          </label>
          <Input
            id="fullName"
            placeholder="e.g. Ram Sharma"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
            className="placeholder:text-gray-600"
          />
        </div>

        <div>
          <label htmlFor="phone" className={labelClass}>
            Phone number *
          </label>
          <Input
            id="phone"
            type="tel"
            placeholder="98XXXXXXXX"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            className="placeholder:text-gray-600"
          />
        </div>

        <div>
          <label htmlFor="email" className={labelClass}>
            Email (optional)
          </label>
          <Input
            id="email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="placeholder:text-gray-600"
          />
        </div>

        <div>
          <label htmlFor="province" className={labelClass}>
            Province *
          </label>
          <select
            id="province"
            value={province}
            onChange={(e) => setProvince(e.target.value)}
            required
            className="w-full border rounded-md px-3 py-2 text-sm text-gray-600 focus:outline-none focus:border-[#F85606] focus:ring-1 focus:ring-[#F85606]"
          >
            <option value="">Select province</option>
            {provinces.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="address" className={labelClass}>
            Address *
          </label>
          <Input
            id="address"
            placeholder="Street, ward, landmark"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
            className="placeholder:text-gray-600"
          />
        </div>

        <div>
          <label htmlFor="city" className={labelClass}>
            City *
          </label>
          <Input
            id="city"
            placeholder="e.g. Kathmandu"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
            className="placeholder:text-gray-600"
          />
        </div>

        <div>
          <label htmlFor="postalCode" className={labelClass}>
            Postal code (optional)
          </label>
          <Input
            id="postalCode"
            placeholder="e.g. 44600"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
            className="placeholder:text-gray-600"
          />
        </div>
      </div>

      {error && (
        <p role="alert" className="text-sm text-red-500 mb-3">
          {error}
        </p>
      )}

      <Button type="submit">submit</Button>
    </form>
  );
};

export default CheckoutForm;
