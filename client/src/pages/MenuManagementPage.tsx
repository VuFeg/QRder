import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoadingPage from "../components/common/LoadingPage";
import { useMenus } from "../hooks/useMenus";
import { Menu } from "../types/menu.type";
import MenuFilters from "../components/MenuManagement/MenuFilters";
import MenuCard from "../components/MenuManagement/MenuCard";

const categories = [
  { id: "all", name: "All Items" },
  { id: "appetizers", name: "Appetizers" },
  { id: "main-courses", name: "Main Courses" },
  { id: "desserts", name: "Desserts" },
  { id: "drinks", name: "Drinks" },
];

const MenuManagementPage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("name");

  const { menuItems, isLoading, deleteMenuMutation } = useMenus();

  const handleDeleteItem = (id: string) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      deleteMenuMutation.mutate(id);
    }
  };

  const filteredItems = menuItems
    .filter((item: Menu) =>
      selectedCategory === "all" ? true : item.category === selectedCategory
    )
    .filter(
      (item: Menu) =>
        item.name_en.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.name_vi.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a: Menu, b: Menu) =>
      sortBy === "price"
        ? a.price - b.price
        : a.name_en.localeCompare(b.name_en)
    );

  if (isLoading) return <LoadingPage />;

  return (
    <div className="min-h-screen bg-background p-6 max-w-7xl mx-auto">
      <h1 className="text-heading font-heading text-accent mb-8">
        Menu Management
      </h1>
      <MenuFilters
        {...{
          searchTerm,
          setSearchTerm,
          selectedCategory,
          setSelectedCategory,
          sortBy,
          setSortBy,
          categories,
        }}
        onAddNew={() => navigate("/menu/create")}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item: Menu) => (
          <MenuCard key={item.id} item={item} onDelete={handleDeleteItem} />
        ))}
      </div>
    </div>
  );
};

export default MenuManagementPage;
