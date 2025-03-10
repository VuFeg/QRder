import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "../components/common/Sidebar";
import { useEffect, useState } from "react";

const MainLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname.split("/")[1];
    setActiveTab(path || "overview");
  }, [location]);

  return (
    <div className="flex min-h-screen">
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      <div
        className={`flex-1 p-8 ${
          isSidebarOpen ? "ml-60" : "ml-20"
        } transition-all`}
      >
        <Outlet /> {/* Hiển thị nội dung từng trang */}
      </div>
    </div>
  );
};

export default MainLayout;
