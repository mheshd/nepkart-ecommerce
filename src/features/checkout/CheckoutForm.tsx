import { useState, type FormEvent } from "react";
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

  function handleSubmit(e: FormEvent) {
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

  return (
    <form onSubmit={handleSubmit} className=" max-w-6xl mx-auto  py-32">
      <h2 className="font-semibold">Shipping details</h2>

      <div className="grid grid-cols-2 gap-2">
        <div>
          <label htmlFor="fullName" className="block text-sm mb-1">
            Full Name
          </label>
          <Input
            id="fullName"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm mb-1">
            Phone number *
          </label>
          <Input
            id="phone"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm mb-1">
            Email (optional)
          </label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="province" className="block text-sm mb-1">
            Province *
          </label>
          <select
            id="province"
            value={province}
            onChange={(e) => setProvince(e.target.value)}
            required
            className="w-full border rounded-md px-3 py-2 text-sm"
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
          <label htmlFor="address" className="block text-sm mb-1">
            Address *
          </label>
          <Input
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="city" className="block text-sm mb-1">
            City *
          </label>
          <Input
            id="city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="postalCode" className="block text-sm mb-1">
            Postal code
          </label>
          <Input
            id="postalCode"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
          />
        </div>
      </div>

      {error && (
        <p role="alert" className="text-sm text-red-500">
          {error}
        </p>
      )}
      <Button type="submit" className="w-full px-6 py-2 font-medium">
        Place Order
      </Button>
    </form>
  );
};

export default CheckoutForm;
