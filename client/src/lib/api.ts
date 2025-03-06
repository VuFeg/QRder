import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080/api";

export interface TableData {
  id?: string;
  tableNumber: string;
  qrCodeUrl: string;
  qrCodePath: string;
  status?: "active" | "inactive";
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
