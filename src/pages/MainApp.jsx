import { Route, Routes } from "react-router-dom";
import {
  Blog,
  Dashboard,
  Gejala,
  NotFound,
  Penyakit,
  Rule,
  SettingAccount,
  UserManagement,
} from "../pages";
import { Layout } from "../components";

function MainApp() {
  return (
    <Layout>
      <Routes>
        <Route exact path="/" element={<Dashboard />} />
        <Route exact path="/blog" element={<Blog />} />
        <Route exact path="/gejala" element={<Gejala />} />
        <Route exact path="/rule" element={<Rule />} />
        <Route exact path="/penyakit" element={<Penyakit />} />
        <Route exact path="/user-management" element={<UserManagement />} />
        <Route exact path="/setting-account" element={<SettingAccount />} />
        <Route exact path="/*" element={<NotFound />} />
      </Routes>
    </Layout>
  );
}

export default MainApp;
