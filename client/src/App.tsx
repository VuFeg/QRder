import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import TableManagementDashboard from "./pages/TableManagementDashboard";
import { ToastContainer } from "react-toastify";
import MenuManagementPage from "./pages/MenuManagementPage";
import CreateMenuPage from "./pages/CreateMenuPage";
import EditMenuPage from "./pages/EditMenuPage";

// Khởi tạo QueryClient
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/tables" element={<TableManagementDashboard />} />
          <Route path="/menus" element={<MenuManagementPage />} />
          <Route path="/menu/create" element={<CreateMenuPage />} />
          <Route path="/menu/edit/:id" element={<EditMenuPage />} />
        </Routes>
      </Router>
      <ToastContainer />
    </QueryClientProvider>
  );
}

export default App;
