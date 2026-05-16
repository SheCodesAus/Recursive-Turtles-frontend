import { Routes, Route } from "react-router-dom";
import DashboardPage from "./pages/DashboardPage";
<<<<<<< HEAD
// import JoinEventPage from "./pages/JoinEventPage";
import SessionCompletePage from "./pages/SessionCompletePage";
import AttendeeSessionPage from "./pages/AttendeeSessionPage";
=======
import JoinEventPage from "./pages/JoinEventPage";
import EventCompletePage from "./pages/EventCompletePage";
>>>>>>> febe6ab (Standardise session terminology to event across frontend)
import ResultsPage from "./pages/ResultsPage";
import HomePage from "./pages/Homepage";
import LoginPage from "./pages/LoginPage";
import CreateEventPage from "./pages/CreateEventPage";
import "./App.css";
import EventDetailsPage from "./pages/EventDetailsPage";
<<<<<<< HEAD
import ResetPasswordPage from "./pages/ResetPasswordPage";
import SignupPage from "./pages/SignupPage";
=======
import AttendeeEventPage from "./pages/AttendeeSessionPage";
>>>>>>> febe6ab (Standardise session terminology to event across frontend)

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      {/* <Route path="/join/:eventCode" element={<JoinEventPage />} /> */}
      <Route path="/reset-password" element={<ResetPasswordPage />} />
      <Route path='/signup' element={<SignupPage />} />

      {/* CREATE EVENT */}
      <Route path="/dashboard/events/new" element={<CreateEventPage />} />

<<<<<<< HEAD
      {/* SESSION */}
      {/* <Route path="/event/:eventId" element={<AttendeeSessionPage />} /> */}
      <Route path="/event/:eventCode" element={<AttendeeSessionPage />} />
=======
      {/* EVENT */}
      <Route path="/event/:eventId" element={<AttendeeEventPage />} />
>>>>>>> febe6ab (Standardise session terminology to event across frontend)
      <Route
        path="/event/:eventId/complete"
        element={<EventCompletePage />}
      />

      {/* DASHBOARD */}
      <Route path="/dashboard" element={<DashboardPage />} />

      {/* EVENT DETAILS */}
      <Route path="/dashboard/events/:eventId" element={<EventDetailsPage />} />

      {/* RESULTS */}
      <Route path="/results/:eventId" element={<ResultsPage />} />
    </Routes>
  );
}

export default App;
