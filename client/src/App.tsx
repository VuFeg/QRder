import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import TableManagementDashboard from "./pages/TableManagementDashboard";
import { ToastContainer } from "react-toastify";
import MenuManagementPage from "./pages/MenuManagementPage";
import CreateMenuPage from "./pages/CreateMenuPage";
import EditMenuPage from "./pages/EditMenuPage";
import OrderPage from "./pages/OrderPage";
import NotFoundPage from "./pages/NotFoundPage";
import Dashboard from "./pages/DashBoardPage";
import MainLayout from "./layout/MainLayout";
// Khởi tạo QueryClient
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/tables" element={<TableManagementDashboard />} />
            <Route path="/menus" element={<MenuManagementPage />} />
            <Route path="/menu/create" element={<CreateMenuPage />} />
            <Route path="/menu/edit/:id" element={<EditMenuPage />} />
          </Route>

          <Route path="/order" element={<OrderPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>
      <ToastContainer />
    </QueryClientProvider>
  );
}

export default App;
