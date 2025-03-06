export interface Table {
  id: string;
  table_number: string;
  status: "available" | "occupied" | "reserved";
}
