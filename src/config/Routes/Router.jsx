import { Route, Routes } from "react-router-dom";
import { Dashboard, Login } from "../../pages";

export default function Router() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
}
