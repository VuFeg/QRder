import axios from "axios";
import { CreateMenuForm, MenuItem } from "../types/menu.type";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080/api";

export const api = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json" },
});

export const getMenus = async () => {
  const res = await api.get("/admin/menu");
  return res.data;
};

export const getMenu = async (id: string) => {
  const res = await api.get(`/admin/menu/${id}`);
  return res.data;
};

export const createMenu = async (menu: CreateMenuForm) => {
  const res = await api.post("/admin/menu", menu);
  return res.data;
};

export const updateMenu = async (id: string, menu: MenuItem) => {
  const res = await api.put(`/admin/menu/${id}`, menu);
  return res.data;
};

export const deleteMenu = async (id: string) => {
  const res = await api.delete(`/admin/menu/${id}`);
  return res.data;
};
