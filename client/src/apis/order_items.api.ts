import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080/api";

interface CreateOrderItem {
  order_id: string;
  menu_id: string;
  quantity: number;
  price: number;
}

interface UpdateOrderItem {
  id: string;
  order_id: string;
  menu_id: string;
  quantity: number;
  price: number;
}

export const api = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json" },
});

export const createOrderItem = async (orderItemData: CreateOrderItem) => {
  const res = await api.post("/admin/order_items", orderItemData);
  return res.data;
};

export const updateOrderItem = async (orderItemData: UpdateOrderItem) => {
  const res = await api.put(
    `/admin/order_items/${orderItemData.id}`,
    orderItemData
  );
  return res.data;
};

export const deleteOrderItem = async (orderItemId: string) => {
  const res = await api.delete(`/admin/order_items/${orderItemId}`);
  return res.data;
};
