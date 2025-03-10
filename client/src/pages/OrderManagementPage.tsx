import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaUtensils, FaCheck, FaTimes } from "react-icons/fa";
import { useTables } from "../hooks/useTables";
import { Table } from "../types/table.type";
import { OrderItem } from "../types/order.type";
import dayjs from "dayjs";
import { useOrderItems } from "../hooks/useOrderItems";

const OrderManagementPage = () => {
  const { tables, refetch } = useTables();
  const { updateOrderItemMutation } = useOrderItems();
  const [activeTab, setActiveTab] = useState("tables");
  const [selectedTable, setSelectedTable] = useState<Table>();
  const [showModal, setShowModal] = useState(false);

  const handleTableClick = (table: Table) => {
    setSelectedTable(table);
    setShowModal(true);
  };

  const handleStatusChange = (id: string, newStatus: string) => {
    updateOrderItemMutation.mutate({
      id,
      status: newStatus,
    });
  };

  const handleOrderStatusChange = (
    filteredItems: OrderItem[],
    status: string
  ) => {
    filteredItems.forEach((item: OrderItem) => {
      console.log(item);
      updateOrderItemMutation.mutate(
        {
          id: item.id,
          status,
        },
        {
          onSuccess: () => {
            refetch();
          },
        }
      );
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-background p-6"
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-heading font-heading text-accent">
            Restaurant Management
          </h1>
          <div className="flex space-x-4">
            <button
              onClick={() => setActiveTab("tables")}
              className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                activeTab === "tables"
                  ? "bg-primary text-white"
                  : "bg-secondary text-foreground"
              }`}
            >
              Tables
            </button>
            <button
              onClick={() => setActiveTab("orders")}
              className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                activeTab === "orders"
                  ? "bg-primary text-white"
                  : "bg-secondary text-foreground"
              }`}
            >
              Orders
            </button>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {activeTab === "tables" ? (
            <motion.div
              key="tables"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {tables.map((table: Table) => (
                <motion.div
                  key={table.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`p-6 rounded-lg shadow-lg cursor-pointer ${
                    table.status === "occupied"
                      ? "bg-destructive/10"
                      : "bg-card"
                  }`}
                  onClick={() => handleTableClick(table)}
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold">
                      Table {table.table_number}
                    </h3>
                    <span
                      className={`px-3 py-1 rounded-full text-sm ${
                        !table.order
                          ? "bg-destructive text-white"
                          : "bg-chart-2 text-white"
                      }`}
                    >
                      {table.order ? "Actived" : "Not Actived"}
                    </span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <FaUtensils className="text-accent" />
                    <span>
                      {table.order?.order_items.length > 0
                        ? table.order?.order_items.length
                        : 0}{" "}
                      orders
                    </span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="orders"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-6"
            >
              {["pending", "completed", "cancelled"].map((status) => (
                <div key={status} className="bg-card p-6 rounded-lg shadow-lg">
                  <h2
                    className={`text-lg font-semibold mb-4 capitalize ${
                      status === "cancelled" ? "text-chart-1" : ""
                    } ${status === "completed" ? "text-chart-3" : ""}
                     ${status === "pending" ? "text-chart-2" : ""}`}
                  >
                    {status} Orders
                  </h2>
                  <div className="space-y-4">
                    {tables
                      // Chỉ lọc các bàn có đơn hàng và có ít nhất một order_item với status tương ứng
                      .filter(
                        (table: Table) =>
                          table.order &&
                          table.order.order_items.some(
                            (item: OrderItem) => item.status === status
                          )
                      )
                      .map((table: Table) => {
                        // Lấy ra các order_items của bàn có status tương ứng
                        const filteredItems = table.order.order_items.filter(
                          (item: OrderItem) => item.status === status
                        );

                        return (
                          <motion.div
                            key={table.order?.id + status} // sử dụng thêm status để đảm bảo key là duy nhất
                            whileHover={{ scale: 1.01 }}
                            className="bg-muted p-4 rounded-lg"
                          >
                            <div className="flex items-center justify-between mb-2">
                              <span className="font-semibold">
                                Table {table.table_number}
                              </span>
                            </div>
                            <div className="mb-2">
                              {filteredItems.map((item: OrderItem) => (
                                <div
                                  key={item.id}
                                  className="flex justify-between"
                                >
                                  <span>
                                    {item.menu.name_en} x {item.quantity}
                                  </span>
                                  <span className="text-sm text-muted-foreground">
                                    {dayjs(item.updated_at).format("h:mm A")}
                                  </span>
                                </div>
                              ))}
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="font-bold">
                                $
                                {filteredItems.reduce(
                                  (acc, item) =>
                                    acc + item.menu.price * item.quantity,
                                  0
                                )}
                              </span>
                              {status !== "completed" &&
                                status !== "cancelled" && (
                                  <div className="flex space-x-2">
                                    <button
                                      onClick={() =>
                                        handleOrderStatusChange(
                                          filteredItems,
                                          "completed"
                                        )
                                      }
                                      className="p-2 text-chart-2 hover:bg-chart-2 hover:text-white rounded transition-colors"
                                    >
                                      <FaCheck />
                                    </button>
                                    <button
                                      onClick={() =>
                                        handleOrderStatusChange(
                                          filteredItems,
                                          "cancelled"
                                        )
                                      }
                                      className="p-2 text-destructive hover:bg-destructive hover:text-white rounded transition-colors"
                                    >
                                      <FaTimes />
                                    </button>
                                  </div>
                                )}
                            </div>
                          </motion.div>
                        );
                      })}
                  </div>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {showModal && selectedTable && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center"
          >
            <div className="bg-card p-6 rounded-lg w-full max-w-md">
              <h2 className="text-lg font-semibold mb-4">
                Table {selectedTable.table_number} Details
              </h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span>Status:</span>
                  <select
                    value={selectedTable.status}
                    onChange={(e) =>
                      handleStatusChange(selectedTable.order_id, e.target.value)
                    }
                    className="border rounded p-2"
                  >
                    <option value="vacant">Vacant</option>
                    <option value="occupied">Occupied</option>
                  </select>
                </div>
                <div className="flex items-center justify-between">
                  <span>Orders:</span>
                  <span>
                    {selectedTable.order?.order_items.length > 0
                      ? selectedTable.order?.order_items.length
                      : 0}
                  </span>
                </div>
                <div className="flex justify-end space-x-2">
                  <button
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 bg-secondary text-foreground rounded hover:bg-secondary/80 transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default OrderManagementPage;
