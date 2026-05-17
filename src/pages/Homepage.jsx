import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/shared/Footer";
import ErrorAlert from "../components/shared/ErrorAlert";
// import JoinEventPage from "./JoinEventPage";

function HomePage() {

  // Store attendee event code input
  const [code, setCode] = useState("");

  // Store optional attendee name input
  const [name, setName] = useState("");

  // React Router navigation hook
  const navigate = useNavigate();


  const [error, setError] = useState("");

  // Handle attendee joining a workshop session

  // Handle attendee joining a workshop event

  function handleJoin(e) {
    e.preventDefault();

    // Prevent empty event code submission
    if (!code.trim()) {
      setError("Please enter an event code to join.");
      return;
    }

    // Navigate attendee to event join page
    // navigate(`/join/${code}`);
    navigate(`/event/${code}`); // updated skip JoinEventPage
  }

  return (
    <>
      <ErrorAlert message={error} onClose={() => setError("")} />

      {/* Top application header */}
      <header className="app-header">
        <div className="app-header-inner">

          {/* Application branding */}
          <div className="app-logo">
            Workshop Navigator
          </div>

          {/* Organiser account actions */}
          <div className="header-actions">

            {/* Navigate to organiser login */}
            <button
              className="button-primary"
              onClick={() => navigate("/login")}
            >
              Facilitator Login
            </button>

            {/* Navigate to account creation */}
            <button
              className="button-primary"
              onClick={() => navigate("/signup")}
            >
              Create Account
            </button>

          </div>
        </div>
      </header>

      {/* Landing page content */}
      <main className="page landing">
        <div className="landing-content card">

          {/* Main page heading */}
          <h1 className="landing-title">
            Join a Workshop
          </h1>

          {/* Page instruction text */}
          <p className="landing-subtitle">
            Enter your event code to participate
          </p>

          {/* Supporting helper text */}
          <p className="landing-helper">
            Join live polls and ask questions.
          </p>

          {/* Optional attendee name input */}
          <input
            className="input"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name (optional)"
          />

          {/* Event code join form */}
          <form
            onSubmit={handleJoin}
            className="landing-form"
          >

            {/* Event code input */}
            <input
              className="input landing-input"
              value={code}
              onChange={(e) =>
                setCode(e.target.value.toUpperCase())
              }
              placeholder="Enter event code (e.g. 015B9F)"
            />

            {/* Submit join request */}
            <button className="button-primary">
              Join Event
            </button>

          </form>
        </div>
      </main>
      <Footer />
    </>
    
  );
}

export default HomePage;