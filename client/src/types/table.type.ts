import { Order } from "./order.type";

export interface Table {
  id: string;
  table_number: string;
  order_id: string;
  order: Order;
  status: "available" | "occupied" | "reserved" | "ordering";
}
