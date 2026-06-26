import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Login";
import DashboardPage from "./pages/DashboardPage";
import ProtectedRoute from "./components/ProtectedRoute";
import Register from "./Register";

function App() {
  return (
    <BrowserRouter>
     <Routes>
  <Route path="/" element={<Login />} />
  <Route path="/register" element={<Register />} />

  <Route
    path="/dashboard"
    element={
      <ProtectedRoute>
        <DashboardPage />
      </ProtectedRoute>
    }
  />
</Routes>
    </BrowserRouter>
  );
}

export default App;