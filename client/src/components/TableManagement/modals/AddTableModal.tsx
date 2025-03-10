import { useState } from "react";
import { useTables } from "../../../hooks/useTables";

interface AddTableModalProps {
  onClose: () => void;
}

const AddTableModal = ({ onClose }: AddTableModalProps) => {
  const [tableNumber, setTableNumber] = useState("");

  const { createTableMutation } = useTables();

  const handleAddTable = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createTableMutation.mutate(
      { table_number: tableNumber },
      {
        onSuccess: () => {
          onClose();
        },
      }
    );
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-card p-6 rounded-lg w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Add New Table</h2>
        <form onSubmit={handleAddTable}>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Table Number"
              value={tableNumber}
              onChange={(e) =>
                setTableNumber(e.target.value.replace(/\D/g, ""))
              }
              className="w-full p-2 border rounded-md"
              required
            />
          </div>
          <div className="flex gap-2 mt-4">
            <button
              type="submit"
              className="bg-primary text-primary-foreground px-4 py-2 rounded-md flex-1"
            >
              Add Table
            </button>
            <button
              type="button"
              onClick={onClose}
              className="bg-muted text-muted-foreground px-4 py-2 rounded-md"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTableModal;
