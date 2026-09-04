import { Routes, Route } from "react-router-dom";
import { AppHeader } from "./components/header";
import HomePage from "./pages/HomePage";
import PayPage from "./pages/PayPage";
import "./App.css";
import "./index.css";

const App = () => {
  return (
    <div style={{ minHeight: "100vh", width: "100%", background: "transparent" }}>
      <AppHeader />
      <div className="page-container">
        <div style={{ width: "100%", maxWidth: "1200px" }}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/pay/:address" element={<PayPage />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default App;