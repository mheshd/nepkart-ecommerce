import { Pencil, Trash2 } from "lucide-react";
import type { Address } from "../../types/addressType";

interface BillingAddressProps {
  addresses: Address[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  onEdit: (address: Address) => void;
  onDelete: (id: string) => void;
  onAddNew: () => void;
}

const BillingAddress = ({
  addresses,
  selectedId,
  onSelect,
  onEdit,
  onDelete,
  onAddNew,
}: BillingAddressProps) => {
  return (
    <div className=" mb-5 ">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-heading font-semibold">Billing Address</h2>
        <button
          type="button"
          onClick={onAddNew}
          className="text-sm font-medium text-[#F85606] hover:text-[#e04d04]"
        >
          + Add Address
        </button>
      </div>

      {addresses.length === 0 ? (
        <div className="border border-dashed border-gray-300 rounded-md py-8 text-center">
          <p className="text-sm text-gray-500">
            You have not added a billing address yet.
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {addresses.map((addr) => (
            <label
              key={addr.id}
              className={`flex items-start gap-3 border rounded-md p-3 cursor-pointer transition-colors ${
                selectedId === addr.id
                  ? "border-[#F85606] bg-orange-50"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <input
                type="radio"
                name="billing-address"
                checked={selectedId === addr.id}
                onChange={() => onSelect(addr.id)}
                className="mt-1"
                aria-label={`Select address for ${addr.fullName}`}
              />
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-800">
                  {addr.fullName}
                </p>
                <p className="text-sm text-gray-600">{addr.address}</p>
                <p className="text-sm text-gray-500">
                  {addr.city}, {addr.province}
                </p>
                <p className="text-sm text-gray-500">{addr.phone}</p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    onEdit(addr);
                  }}
                  aria-label={`Edit address for ${addr.fullName}`}
                  className="text-gray-400 hover:text-gray-700"
                >
                  <Pencil size={16} />
                </button>
                {addresses.length > 1 && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      onDelete(addr.id);
                    }}
                    aria-label={`Delete address for ${addr.fullName}`}
                    className="text-gray-400 hover:text-red-600"
                  >
                    <Trash2 size={16} />
                  </button>
                )}
              </div>
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

export default BillingAddress;
