import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080/api";

export interface TableData {
  id?: string;
  table_number: string;
  status?: string;
  createdAt?: string;
  updatedAt?: string;
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
export const createTable = async (tableData: TableData) => {
  const res = await api.post("/admin/table", tableData);
  return res.data;
};

export const updateTable = async (tableData: TableData) => {
  const res = await api.put(`/admin/table/${tableData.id}`, tableData);
  return res.data;
};

export const deleteTable = async (tableId: string) => {
  const res = await api.delete(`/admin/table/${tableId}`);
  return res.data;
};
