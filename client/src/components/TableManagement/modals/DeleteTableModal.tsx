import { useMutation, QueryClient } from "@tanstack/react-query";
import { Table } from "../../../types/table.type";
import { deleteTable } from "../../../apis/table.api";
import { toast } from "react-toastify";

interface DeleteTableModalProps {
  table: Table;
  onClose: () => void;
  queryClient: QueryClient;
}

const DeleteTableModal = ({
  table,
  onClose,
  queryClient,
}: DeleteTableModalProps) => {
  const mutation = useMutation({
    mutationFn: deleteTable,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tables"] });
      toast.success("Table deleted successfully!");
      onClose();
    },
    onError: (error) => {
      toast.error("Failed to delete table.");
      console.error("Failed to delete table:", error);
    },
  });

  const handleDeleteTable = () => {
    if (table.status === "occupied") {
      toast.error("Cannot delete an occupied table.");
      onClose();
      return;
    }
    mutation.mutate(table.id);
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
