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
      <footer style={{ marginTop: 'auto', padding: '1rem', borderTop: '1px solid rgba(255, 255, 255, 0.1)', textAlign: 'center', fontSize: '0.875rem', zIndex: 10, position: 'relative', opacity: 0.8 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
          <span>Ecosystem Partner Botchain</span>
          <img src="https://botchain.ai/favicon.ico" alt="Botchain Logo" width={20} height={20} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
          <a href="https://botchain.ai" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'underline' }}>BOT Chain Official Website</a>
          <a href="https://scan.botchain.ai" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'underline' }}>BOT Chain Explorer</a>
        </div>
      </footer>
    </div>
  );
};

export default App;