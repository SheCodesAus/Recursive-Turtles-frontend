import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ErrorAlert from "../components/shared/ErrorAlert";
import { getEventByCode } from "../services/events";

// Interactive attendee session components
import LivePollCard from "../components/polls/AttendeePollCard";
import QuestionForm from "../components/questions/QuestionForm";
import EmailCaptureForm from "../components/email/EmailCaptureForm";
// Interactive attendee event components
import Footer from "../components/shared/Footer";
import QuestionList from "../components/questions/QuestionList";
import GetSlidesCard from "../components/shared/GetSlidesCard";
function AttendeeEventPage() {
  // Get event ID from route parameters
  const { eventCode } = useParams();

  // Store selected event data
  const [event, setEvent] = useState(null);

  // Track loading state while fetching event
  const [isLoading, setIsLoading] = useState(true);

  const [error, setError] = useState("");

  // Load event information when page opens
  useEffect(() => {
    async function loadEvent() {
      try {
        // Fetch all available events

        const data = await getEventByCode(eventCode);

        setEvent(data); // Set the fetched event data into state
      } catch (err) {
        // Log any fetch errors
        console.error(err);
      } finally {
        // Stop loading spinner
        setIsLoading(false);
      }
    }

    loadEvent();
  }, [eventCode]);

  // Display loading screen while event data is loading
  if (isLoading) {
    return (
      <main className="loading-screen">
        <div className="card loading-card">
          {/* Animated loading spinner */}
          <div className="loading-spinner"></div>

          <h2>Loading event...</h2>

          <p className="muted">Preparing your live workshop experience</p>
        </div>
      </main>
    );
  }

  // Display fallback screen if event cannot be found
  if (!event) {
    return (
      <main className="page">
        <section className="card card-centered">
          <p className="card-label">Event Error</p>

          <h2>Event not found</h2>

          <p className="muted">This workshop event could not be loaded.</p>

          <p className="muted">Please check the event code and try again.</p>
        </section>
      </main>
    );
  }

  return (
    <>
      <ErrorAlert message={error} onClose={() => setError("")} />

      {/* Top application header */}
      <header className="app-header">
        <div className="app-header-inner">
          {/* Application branding */}
          <div className="app-logo">Workshop Navigator</div>

          {/* Event status and event code */}
          <div className="event-header-actions">
            {/* Live event indicator */}
            <span className="live-badge">+ Live</span>

            {/* Display attendee event code */}
            <span className="event-code-pill">{event.event_code}</span>
          </div>
        </div>
      </header>

      <main className="page event-page">
        {/* Welcome section for attendees */}

        <section className="event-welcome card">
          <p className="card-label">Live Workshop Event</p>

          <h1>{event.title}</h1>

          <p className="muted">You have successfully joined the workshop.</p>

          <div className="event-actions-preview">
            <span>Ask Questions</span>
            <span>Polls</span>
            <span>Slides</span>
          </div>
        </section>

        {/* Live polling component */}
        <LivePollCard eventId={event.id} />

        {/* Question submission form */}
        <QuestionForm setError={setError} />

        {/* Display attendee questions */}
        <QuestionList />
        <GetSlidesCard />
      {/* Email capture for workshop slides */}
        <EmailCaptureForm />
      </main>

      {/* Global application footer */}
      <Footer />
    </>
  );
}

export default AttendeeEventPage;
