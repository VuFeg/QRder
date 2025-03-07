import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080/api";

export const api = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json" },
});

export const uploadImage = async (file: FormData) => {
  const res = await api.post("/admin/media/upload", file, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};

export const deleteImage = async (filename: string) => {
  const res = await api.delete(`/admin/media`, { data: { filename } });
  return res.data;
};
