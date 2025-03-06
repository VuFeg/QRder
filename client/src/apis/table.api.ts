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
  const res = await api.get("/api/tables");
  return res.data;
};

// API tạo bàn mới
export const createTable = async (tableData: TableData) => {
  const res = await api.post("/api/table", tableData);
  return res.data;
};

export const updateTable = async (tableData: TableData) => {
  const res = await api.put(`/api/table/${tableData.id}`, tableData);
  return res.data;
};

export const deleteTable = async (tableId: string) => {
  const res = await api.delete(`/api/table/${tableId}`);
  return res.data;
};
