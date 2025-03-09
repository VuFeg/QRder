import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080/api";

export const api = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json" },
});

interface CreateOrderData {
  table_id: string;
  note: string;
  payment_method: string;
}

interface UpdateOrderData {
  id: string;
  table_id: string;
  note: string;
  payment_method: string;
}

export const getOrders = async () => {
  const res = await api.get("/admin/orders");
  return res.data;
};

export const getOrder = async (orderId: string) => {
  const res = await api.get(`/admin/orders/${orderId}`);
  return res.data;
};

export const createOrder = async (orderData: CreateOrderData) => {
  const res = await api.post("/admin/orders", orderData);
  return res.data;
};

export const updateOrder = async (orderData: UpdateOrderData) => {
  const res = await api.put(`/admin/orders/${orderData.id}`, orderData);
  return res.data;
};

export const deleteOrder = async (orderId: string) => {
  const res = await api.delete(`/admin/orders/${orderId}`);
  return res.data;
};
