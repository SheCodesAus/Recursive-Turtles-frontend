import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getEventByCode } from "../services/events";
import Footer from "../components/shared/Footer";

function JoinEventPage() {

  // Get event code from URL parameters
  const { eventCode } = useParams();

  // React Router navigation hook
  const navigate = useNavigate();

  // Store matched event data
  const [event, setEvent] = useState(null);

  // Store error message if event cannot be found
  const [error, setError] = useState("");

  // Track loading state while fetching event
  const [isLoading, setIsLoading] = useState(true);

  // Load event using the code from the URL
  useEffect(() => {

    async function loadEvent() {
      try {

        // Fetch event details from backend/API
        const data = await getEventByCode(eventCode);

        // Save event data into state
        setEvent(data);

      } catch (err) {

        // Show user-friendly error if event lookup fails
        setError("Event not found. Please check your code.");

      } finally {

        // Stop loading screen
        setIsLoading(false);
      }
    }

    loadEvent();

  }, [eventCode]);

  // Display loading screen while event is being fetched
  if (isLoading) {
    return (
      <main className="loading-screen">
        <div className="card loading-card">

          {/* Animated loading spinner */}
          <div className="loading-spinner"></div>

          <h2>Loading event...</h2>

          <p className="muted">
            Getting your workshop ready
          </p>

        </div>
      </main>
    );
  }

  // Display error state if event code is invalid
  if (error) {
    return (
      <main className="page">
        <div className="card">

          <h2>Event not found</h2>

          <p className="muted">
            {error}
          </p>

        </div>
      </main>
    );
  }

  return (
    <>
      {/* Top application header */}
      <header className="app-header">
        <div className="app-header-inner">

          {/* Application branding */}
          <div className="app-logo">
            Workshop Navigator
          </div>

        </div>
      </header>

      <main className="page">

        {/* Event join introduction */}
        <div className="page-header">

          {/* Display selected event title */}
          <h1 className="page-title">
            {event.title}
          </h1>

          <p className="page-subtitle">
            You’re about to join this live workshop event
          </p>

        </div>

        {/* Event confirmation card */}
        <div className="card card-centered">

          <p className="muted">
            Event Code
          </p>

          {/* Display event code */}
          <h2>{event.event_code}</h2>

          {/* Navigate attendee into live event */}
          <button
            className="button-primary"
            onClick={() => navigate(`/event/${event.id}`)}
          >
            Join Event
          </button>

        </div>
      </main>

      {/* Shared application footer */}
      <Footer />

    </>
  );
}

export default JoinEventPage;