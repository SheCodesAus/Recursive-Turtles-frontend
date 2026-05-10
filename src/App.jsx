import { Routes, Route } from "react-router-dom";

import DashboardPage from "./pages/DashboardPage";
import JoinEventPage from "./pages/JoinEventPage";
import SessionCompletePage from "./pages/SessionCompletePage";

import "./App.css";

function App() {
  return (
    <Routes>

      <Route
        path="/"
        element={<DashboardPage />}
      />

      <Route
        path="/dashboard"
        element={<DashboardPage />}
      />

      <Route
        path="/join/:eventCode"
        element={<JoinEventPage />}
      />

      <Route
        path="/complete"
        element={<SessionCompletePage />}
      />

    </Routes>
  );
}

export default App;