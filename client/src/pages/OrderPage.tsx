import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiMinus,
  FiPlus,
  FiSearch,
  FiShoppingCart,
  FiTrash2,
  FiX,
} from "react-icons/fi";
import { useSearchParams } from "react-router-dom";
import { Menu } from "../types/menu.type";
import { useMenus } from "../hooks/useMenus";
import LoadingPage from "../components/common/LoadingPage";
import { useOrder } from "../hooks/useOrder";
import { useTables } from "../hooks/useTables";
import { useOrderItems } from "../hooks/useOrderItems";
import { Order } from "../types/order.type";

const categories = [
  { id: "all", name: "All Items" },
  { id: "appetizers", name: "Appetizers" },
  { id: "main-courses", name: "Main Courses" },
  { id: "desserts", name: "Desserts" },
  { id: "drinks", name: "Drinks" },
];

const pageVariants = {
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 20 },
};

interface OrderItems {
  name_en: string;
  price: number;
  quantity: number;
  image_url: string;
  menu_id: string;
  id?: string;
}

const OrderPage = () => {
  const [searchParams] = useSearchParams();
  const tableId = searchParams.get("table");
  const { useGetTable } = useTables();
  const { data: table, isLoading: isLoadingTable } = useGetTable(tableId ?? "");
  const { createOrderMutation, updateOrderMutation, useGetOrder } = useOrder();
  const [note, setNote] = useState("");

  const {
    data: order,
    isLoading: isLoadingOrder,
  }: {
    data: Order | undefined;
    isLoading: boolean;
  } = useGetOrder(table?.order_id ?? "");

  const [orderItems, setOrderItems] = useState<OrderItems[]>(() => {
    const savedOrderItems = localStorage.getItem("orderItems");
    return savedOrderItems ? JSON.parse(savedOrderItems) : [];
  });

  useEffect(() => {
    localStorage.setItem("orderItems", JSON.stringify(orderItems));
  }, [orderItems]);

  useEffect(() => {
    if (!table?.order_id && !isLoadingTable) {
      if (tableId) {
        createOrderMutation.mutate({
          table_id: tableId,
          note: "",
          payment_method: "",
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [table]);

  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const { menuItems, isLoading } = useMenus();
  const { createOrderItemMutation } = useOrderItems();

  const addToCart = (item: Menu) => {
    const existingItem = orderItems.find(
      (orderItem) => orderItem.menu_id === item.id
    );
    if (existingItem) {
      setOrderItems((prevItems) =>
        prevItems.map((orderItem) =>
          orderItem.menu_id === item.id
            ? {
                ...orderItem,
                quantity: orderItem.quantity + 1,
              }
            : orderItem
        )
      );
    } else {
      setOrderItems((prevItems) => [
        ...prevItems,
        {
          name_en: item.name_en,
          price: item.price,
          quantity: 1,
          image_url: item.image_url,
          menu_id: item.id,
        },
      ]);
    }
  };

  const removeItem = (itemId: string) => {
    setOrderItems((prevItems) =>
      prevItems.filter((item) => item.menu_id !== itemId)
    );
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    setOrderItems((prevItems) =>
      prevItems.map((item) =>
        item.menu_id === itemId
          ? {
              ...item,
              quantity: item.quantity + quantity,
            }
          : item
      )
    );
  };

  const getTotalPrice = () => {
    return orderItems
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  };

  const filteredItems = menuItems
    .filter((item: Menu) =>
      selectedCategory === "all" ? true : item.category === selectedCategory
    )
    .filter(
      (item: Menu) =>
        item.name_en.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.name_vi.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const handleCheckout = () => {
    orderItems.forEach((orderItem) => {
      createOrderItemMutation.mutate({
        order_id: order?.id ?? "",
        menu_id: orderItem.menu_id,
        quantity: orderItem.quantity,
        price: orderItem.price,
      });
    });
    updateOrderMutation.mutate({
      id: order?.id ?? "",
      table_id: tableId ?? "",
      note: note,
      payment_method: "cash",
    });
    setOrderItems([]);
    setNote("");
    setIsCartOpen(false);
  };

  if (isLoading || isLoadingOrder) return <LoadingPage />;

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
      className="min-h-screen bg-background"
    >
      <header className="bg-card shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-foreground">Digital Menu</h1>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsCartOpen(true)}
            className="relative p-2"
          >
            <FiShoppingCart className="text-2xl text-foreground" />
            {orderItems.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-primary text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                {orderItems.length}
              </span>
            )}
          </motion.button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="mb-6 relative">
          <input
            type="text"
            placeholder="Search for dishes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-3 pl-10 border rounded-md focus:ring-2 focus:ring-primary focus:outline-none"
          />
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>

        <div className="flex overflow-x-auto pb-4 mb-6 categories-scroll">
          {categories.map((category) => (
            <motion.button
              key={category.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-6 py-2 rounded-full mr-3 whitespace-nowrap ${
                selectedCategory === category.id
                  ? "bg-primary text-white"
                  : "bg-secondary text-foreground"
              }`}
            >
              {category.name}
            </motion.button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item: Menu) => (
            <motion.div
              key={item.id}
              whileHover={{ scale: 1.02 }}
              className="bg-card rounded-lg overflow-hidden shadow-lg flex flex-col"
            >
              <img
                src={item.image_url}
                alt={item.name_en}
                className="w-full h-48 object-cover"
                loading="lazy"
              />
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-foreground">
                    {item.name_en}
                  </h3>
                  <p className="text-muted-foreground text-sm mt-1">
                    {item.description}
                  </p>
                </div>
                <div className="flex justify-between items-center mt-4">
                  <span className="text-lg font-bold text-foreground">
                    ${item.price}
                  </span>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => addToCart(item)}
                    className="bg-primary text-white px-4 py-2 rounded-md"
                  >
                    Add to Cart
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {isCartOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            className="fixed top-0 right-0 h-full w-full md:w-96 bg-card shadow-lg z-20 p-4"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-foreground">Your Cart</h2>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsCartOpen(false)}
              >
                <FiX className="text-2xl text-foreground" />
              </motion.button>
            </div>

            {orderItems.map((orderItem) => (
              <div
                key={orderItem.menu_id}
                className="bg-white p-4 rounded-lg shadow-sm"
              >
                <div className="flex gap-4">
                  <img
                    src={orderItem.image_url}
                    alt={orderItem.name_en}
                    className="w-20 h-20 object-cover rounded"
                  />
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <h3 className="font-semibold">{orderItem.name_en}</h3>
                      <button
                        onClick={() => removeItem(orderItem.menu_id ?? "")}
                        className="text-destructive hover:bg-destructive hover:bg-opacity-10 p-1 rounded-full transition-colors duration-200"
                        aria-label="Remove item"
                      >
                        <FiTrash2 className="w-5 h-5" />
                      </button>
                    </div>
                    <p className="text-accent font-semibold">
                      ${orderItem.price.toFixed(2)}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() =>
                          updateQuantity(orderItem.menu_id ?? "", -1)
                        }
                        className="p-1 hover:bg-muted rounded-full transition-colors duration-200"
                        disabled={orderItem.quantity <= 0}
                        aria-label="Decrease quantity"
                      >
                        <FiMinus className="w-4 h-4" />
                      </button>
                      <span className="w-8 text-center">
                        {orderItem.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(orderItem.menu_id ?? "", 1)
                        }
                        className="p-1 hover:bg-muted rounded-full transition-colors duration-200"
                        aria-label="Increase quantity"
                      >
                        <FiPlus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <input
              type="text"
              onChange={(e) => setNote(e.target.value)}
              placeholder="Add a note (max 100 characters)"
              className="mt-2 w-full p-2 text-sm border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              maxLength={100}
            />
            <div className="mt-6">
              <div className="flex justify-between items-center mb-4">
                <span className="font-bold text-foreground">Total:</span>
                <span className="font-bold text-foreground">
                  ${getTotalPrice()}
                </span>
              </div>
              <div className="flex gap-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleCheckout}
                  className="w-full bg-primary text-white py-3 rounded-md font-medium"
                >
                  Proceed to Checkout
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setIsCartOpen(false)}
                  className="w-full bg-secondary text-primary py-3 rounded-md font-bold"
                >
                  Continue
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default OrderPage;
