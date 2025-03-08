import { motion } from "framer-motion";
import {
  FiHome,
  FiBook,
  FiMenu,
  FiDollarSign,
  FiUsers,
  FiTable,
} from "react-icons/fi";

interface SidebarProps {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (isOpen: boolean) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Sidebar = ({
  isSidebarOpen,
  setIsSidebarOpen,
  activeTab,
  setActiveTab,
}: SidebarProps) => {
  const sidebarItems = [
    { icon: <FiHome className="w-6 h-6" />, label: "Overview", navigate: "/" },
    {
      icon: <FiTable className="w-6 h-6" />,
      label: "Tables",
      navigate: "/tables",
    },
    {
      icon: <FiBook className="w-6 h-6" />,
      label: "Menus",
      navigate: "/menus",
    },
    { icon: <FiDollarSign className="w-6 h-6" />, label: "Revenue Analytics" },
    { icon: <FiUsers className="w-6 h-6" />, label: "Staff Management" },
  ];

  return (
    <motion.div
      initial={{ width: isSidebarOpen ? 240 : 80 }}
      animate={{ width: isSidebarOpen ? 240 : 80 }}
      transition={{ duration: 0.3 }}
      className="bg-card shadow-sm h-full fixed left-0 top-0"
    >
      <div className="p-4 flex items-center justify-between">
        {isSidebarOpen && (
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-xl font-bold text-primary"
          >
            Restaurant
          </motion.h1>
        )}
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2 rounded-lg hover:bg-muted transition-colors"
        >
          <FiMenu className="w-6 h-6 text-foreground" />
        </button>
      </div>

      <nav className="mt-6">
        {sidebarItems.map((item, index) => (
          <motion.button
            key={index}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              setActiveTab(item.label.toLocaleLowerCase());
              window.location.href = item.navigate || "/";
            }}
            className={`w-full flex items-center p-4 ${
              activeTab === item.label.toLocaleLowerCase()
                ? "bg-primary text-primary-foreground"
                : "text-foreground hover:bg-muted"
            }`}
          >
            {item.icon}
            {isSidebarOpen && (
              <span className="ml-4 font-medium">{item.label}</span>
            )}
          </motion.button>
        ))}
      </nav>
    </motion.div>
  );
};

export default Sidebar;
