import { useQuery } from "@tanstack/react-query";
import { getTables } from "../lib/api";

interface Table {
  id: number;
  table_number: number;
  status: string;
}

const Tables = () => {
  const {
    data: tables,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["tables"],
    queryFn: getTables,
  });

  if (isLoading) return <p>Đang tải...</p>;
  if (error) return <p>Có lỗi xảy ra!</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Danh sách bàn</h1>
      <ul>
        {tables.map((table: Table) => (
          <li key={table.id} className="p-2 border mb-2">
            Bàn {table.table_number} - Trạng thái: {table.status}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Tables;
