import { Route, Routes } from "react-router-dom";
import { Dashboard } from "../pages";

function MainApp() {
  return (
    <Routes>
      <Route exact path="/" element={<Dashboard />} />
      <Route exact path="/certificate" element={<Dashboard />} />
      <Route exact path="/project" element={<Dashboard />} />
      <Route exact path="/skill" element={<Dashboard />} />
      <Route exact path="/*" element={<Dashboard />} />
    </Routes>
  );
}

export default MainApp;
