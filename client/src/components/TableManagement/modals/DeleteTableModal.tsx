import { Table } from "../../../types/table.type";
import { toast } from "react-toastify";
import { useTables } from "../../../hooks/useTables";

interface DeleteTableModalProps {
  table: Table;
  onClose: () => void;
}

const DeleteTableModal = ({ table, onClose }: DeleteTableModalProps) => {
  const { deleteTableMutation } = useTables();

  const handleDeleteTable = () => {
    if (table.status === "occupied") {
      toast.error("Cannot delete an occupied table.");
      onClose();
      return;
    }
    deleteTableMutation.mutate(table.id, {
      onSuccess: () => {
        onClose();
      },
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-card p-6 rounded-lg w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Confirm Deletion</h2>
        <p className="mb-4">
          Are you sure you want to delete Table {table.table_number}?
        </p>
        <div className="flex gap-2">
          <button
            onClick={handleDeleteTable}
            className="bg-destructive text-destructive-foreground px-4 py-2 rounded-md flex-1"
          >
            Delete
          </button>
          <button
            onClick={onClose}
            className="bg-muted text-muted-foreground px-4 py-2 rounded-md"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteTableModal;
