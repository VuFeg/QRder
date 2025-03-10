import { Menu } from "./menu.type";

export interface Order {
  id: string;
  total_amount: number;
  status: "pending" | "ordering" | "served" | "attention";
  payment_method: string;
  note: string;
  created_at: string;
  updated_at: string;
  order_items: OrderItem[];
}

export interface OrderItem {
  id: string;
  order_id: string;
  menu_id: string;
  quantity: number;
  price: number;
  created_at: string;
  updated_at: string;
  status: "pending" | "cancelled" | "completed";
  menu: Menu;
}
