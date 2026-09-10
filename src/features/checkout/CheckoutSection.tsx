// features/checkout/CheckoutSection.tsx
import { useEffect, useState } from "react";
import type { CartItem } from "../../types/cartType";
import type { Address } from "../../types/addressType";
import BillingAddress from "./BillingAddress";
import CheckoutItems from "./CheckoutItems";
import AddressForm from "./AddressForm ";
import Model from "../../components/ui/Model";

interface CheckoutSectionProps {
  items: CartItem[];
}

const CheckoutSection = ({ items }: CheckoutSectionProps) => {
  const [addresses, setAddresses] = useState<Address[]>(() => {
    const stored = localStorage.getItem("checkout");
    return stored ? JSON.parse(stored) : [];
  });
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(
    null,
  );
  const [modalOpen, setModalOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);

  function selectAddress(id: string) {
    setSelectedAddressId(id);
  }

  useEffect(() => {
    localStorage.setItem("checkout", JSON.stringify(addresses));
  }, [addresses]);

  function handleAddOrEditAddress(data: Omit<Address, "id">) {
    if (editingAddress) {
      setAddresses((prev) =>
        prev.map((a) =>
          a.id === editingAddress.id ? { ...data, id: a.id } : a,
        ),
      );
    } else {
      const newAddress: Address = { ...data, id: crypto.randomUUID() };

      setAddresses((prev) => [...prev, newAddress]);
      selectAddress(newAddress.id);
    }
    setModalOpen(false);
    setEditingAddress(null);
  }

  function handleDeleteAddress(id: string) {
    setAddresses((prev) => prev.filter((a) => a.id !== id));

    if (selectedAddressId === id) {
      setSelectedAddressId(null);
    }
  }
  return (
    <div className="max-w-6xl mx-auto py-6 bg-white shadow-2xs px-4">
      <BillingAddress
        addresses={addresses}
        selectedId={selectedAddressId}
        onSelect={selectAddress}
        onEdit={(addr) => {
          setEditingAddress(addr);
          setModalOpen(true);
        }}
        onAddNew={() => {
          setEditingAddress(null);
          setModalOpen(true);
        }}
        onDelete={handleDeleteAddress}
      />

      <CheckoutItems items={items} />

      {modalOpen && (
        <Model
          onClose={() => {
            setModalOpen(false);
            setEditingAddress(null);
          }}
        >
          <AddressForm
            initialValues={editingAddress ?? undefined}
            onSubmit={handleAddOrEditAddress}
            onCancel={() => {
              setModalOpen(false);
              setEditingAddress(null);
            }}
          />
        </Model>
      )}
    </div>
  );
};

export default CheckoutSection;
