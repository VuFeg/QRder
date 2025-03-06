import { useState } from "react";
import { useMutation, QueryClient } from "@tanstack/react-query";
import { Table } from "../../../types/table.type";
import { updateTable } from "../../../apis/table.api";
import { toast } from "react-toastify";

interface EditTableModalProps {
  table: Table;
  onClose: () => void;
  queryClient: QueryClient;
}

const EditTableModal = ({
  table,
  onClose,
  queryClient,
}: EditTableModalProps) => {
  const [tableNumber, setTableNumber] = useState(table.table_number);
  const [status, setStatus] = useState(table.status);

  const mutation = useMutation({
    mutationFn: updateTable,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tables"] });
      toast.success("Table updated successfully");
      onClose();
    },
    onError: (error) => {
      console.error("Failed to update table:", error);
    },
  });

  const handleEditTable = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutation.mutate({ id: table.id, table_number: tableNumber, status });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-card p-6 rounded-lg w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Edit Table</h2>
        <form onSubmit={handleEditTable}>
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
            <select
              value={status}
              onChange={(e) =>
                setStatus(
                  e.target.value as "available" | "occupied" | "reserved"
                )
              }
              className="w-full p-2 border rounded-md"
            >
              <option value="available">Available</option>
              <option value="occupied">Occupied</option>
              <option value="reserved">Reserved</option>
            </select>
          </div>
          <div className="flex gap-2 mt-4">
            <button
              type="submit"
              className="bg-primary text-primary-foreground px-4 py-2 rounded-md flex-1"
            >
              Save Changes
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

export default EditTableModal;
