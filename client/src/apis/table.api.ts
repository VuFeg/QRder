import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080/api";

interface createTable {
  table_number: string;
}

interface updateTable {
  id: string;
  table_number: string;
  order_id?: string | null;
  status?: string;
}

export const api = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json" },
});

// API lấy danh sách bàn
export const getTables = async () => {
  const res = await api.get("/admin/tables");
  return res.data;
};

export const getTable = async (tableId: string) => {
  const res = await api.get(`/admin/table/${tableId}`);
  return res.data;
};

// API tạo bàn mới
export const createTable = async (tableData: createTable) => {
  const res = await api.post("/admin/table", tableData);
  return res.data;
};

export const updateTable = async (tableData: updateTable) => {
  const res = await api.put(`/admin/table/${tableData.id}`, tableData);
  return res.data;
};

export const deleteTable = async (tableId: string) => {
  const res = await api.delete(`/admin/table/${tableId}`);
  return res.data;
};
