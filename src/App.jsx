import { Routes, Route } from "react-router-dom";
import DashboardPage from "./pages/DashboardPage";
import JoinEventPage from "./pages/JoinEventPage";
import EventCompletePage from "./pages/EventCompletePage";
import AttendeeSessionPage from "./pages/AttendeeSessionPage";
import ResultsPage from "./pages/ResultsPage";
import HomePage from "./pages/Homepage";
import LoginPage from "./pages/LoginPage";
import CreateEventPage from "./pages/CreateEventPage";
import "./App.css";
import EventDetailsPage from "./pages/EventDetailsPage";
import FacilitatorEventDetailsPage from "./pages/FacilitatorEventDetailsPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import SignupPage from "./pages/SignupPage";
import ResetPasswordConfirmPage from "./pages/ResetPasswordConfirmPage";

function App() {
  return (
    <Routes>

      <Route path="/" element={<HomePage />} />

      <Route path="/login" element={<LoginPage />} />

      <Route path="/signup" element={<SignupPage />} />

      {/* RESET PASSWORD */}
      <Route
        path="/reset-password"
        element={<ResetPasswordPage />}
      />
      {/* RESET PASSWORD CONFIRM */}
      <Route
        path="/reset-password-confirm"
        element={<ResetPasswordConfirmPage />}
      />

      {/* JOIN EVENT */}
      <Route
        path="/join/:eventCode"
        element={<JoinEventPage />}
      />

      {/* CREATE EVENT */}
      <Route
        path="/dashboard/events/new"
        element={<CreateEventPage />}
      />

      {/* ATTENDEE EVENT */}
      <Route
        path="/event/:eventCode"
        element={<AttendeeSessionPage />}
      />

      {/* EVENT COMPLETE */}
      <Route
        path="/event/:eventId/complete"
        element={<EventCompletePage />}
      />

      {/* DASHBOARD */}
      <Route
        path="/dashboard"
        element={<DashboardPage />}
      />

      {/* EVENT DETAILS */}
      <Route path="/dashboard/eventmon/:eventId" element={<EventDetailsPage />} />
      <Route path="/dashboard/eventshan/:eventId" element={<FacilitatorEventDetailsPage />} />
      <Route
        path="/dashboard/events/:eventId"
        element={<EventDetailsPage />}
      />

      {/* RESULTS */}
      <Route
        path="/results/:eventId"
        element={<ResultsPage />}
      />

    </Routes>
  );
}

export default App;