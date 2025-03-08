import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiSearch, FiShoppingCart, FiX } from "react-icons/fi";
import { useSearchParams } from "react-router-dom";
import { Menu } from "../types/menu.type";
import { useMenus } from "../hooks/useMenus";
import LoadingPage from "../components/common/LoadingPage";

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

const OrderPage = () => {
  const [searchParams] = useSearchParams();
  const tableNumber = searchParams.get("table");
  console.log(tableNumber);

  const [selectedCategory, setSelectedCategory] = useState("all");
  const [cart, setCart] = useState<Menu[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const { menuItems, isLoading } = useMenus();

  const addToCart = (item: Menu) => {
    setCart([...cart, item]);
  };

  const removeFromCart = (itemId: string) => {
    setCart(cart.filter((item) => item.id !== itemId));
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price, 0).toFixed(2);
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

  if (isLoading) return <LoadingPage />;

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
            {cart.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-primary text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                {cart.length}
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
            className="fixed top-0 right-0 h-full w-full md:w-96 bg-card shadow-lg z-20"
          >
            <div className="p-4">
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

              {cart.map((item: Menu) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="flex items-center justify-between py-3 border-b"
                >
                  <div>
                    <h3 className="font-medium text-foreground">
                      {item.name_en}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      ${item.price}
                    </p>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => removeFromCart(item.id)}
                    className="text-destructive"
                  >
                    <FiX />
                  </motion.button>
                </motion.div>
              ))}

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
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default OrderPage;
