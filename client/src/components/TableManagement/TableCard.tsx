// src/components/table-management/TableCard.tsx
import { FaEdit, FaTrash, FaQrcode } from "react-icons/fa";
import { Table } from "../../types/table.type";

interface TableCardProps {
  table: Table;
  onEdit: () => void;
  onDelete: () => void;
  onQRCode: () => void;
}

const TableCard = ({ table, onEdit, onDelete, onQRCode }: TableCardProps) => {
  return (
    <div className="bg-card p-4 rounded-lg shadow-sm">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold">Table {table.table_number}</h3>
        </div>
        <div
          className={`px-3 py-1 rounded-full ${
            table.status === "available"
              ? "bg-chart-2 text-white"
              : table.status === "occupied"
              ? "bg-destructive text-white"
              : "bg-chart-4 text-black"
          }`}
        >
          {table.status}
        </div>
      </div>
      <div className="flex gap-2">
        <button
          onClick={onEdit}
          className="p-2 text-accent hover:bg-muted rounded-md"
        >
          <FaEdit />
        </button>
        <button
          onClick={onDelete}
          className="p-2 text-destructive hover:bg-muted rounded-md"
        >
          <FaTrash />
        </button>
        <button
          onClick={onQRCode}
          className="p-2 text-accent hover:bg-muted rounded-md"
        >
          <FaQrcode />
        </button>
      </div>
    </div>
  );
};

export default TableCard;
