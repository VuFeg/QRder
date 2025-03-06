import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Tables from "./pages/Tables";

// Khởi tạo QueryClient
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/tables" element={<Tables />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
