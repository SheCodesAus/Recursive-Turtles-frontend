import { useState } from "react";
import { useParams } from "react-router-dom";
import FeedbackForm from "../components/feedback/FeedbackForm";
import EmailCaptureForm from "../components/email/EmailCaptureForm";
import Footer from "../components/shared/Footer";
import ErrorAlert from "../components/shared/ErrorAlert";

function EventCompletePage() {
  const { eventId } = useParams();
  const [error, setError] = useState("");

  return (
    <>
      <ErrorAlert message={error} onClose={() => setError("")} />

      {/* Top application header */}
      <header className="app-header">
        <div className="app-header-inner">
          {/* Application branding */}
          <div className="app-logo">Workshop Navigator</div>
        </div>
      </header>

      <main className="page">
        {/* Event completion hero section */}
        <section className="end-hero">
          {/* Success indicator */}
          <div className="success-icon">✓</div>

          <h1 className="page-title">Thank you for joining!</h1>

          <p className="page-subtitle">We hope you found the event valuable.</p>
        </section>

        {/* Collect attendee feedback */}
        <FeedbackForm eventId={eventId} setError={setError} />

        {/* Capture attendee email for slides/resources */}
        <EmailCaptureForm eventId={eventId} setError={setError} />

        {/* Closing message */}
        <p className="end-note">Thanks again. See you in the next event.</p>
      </main>

      {/* Shared application footer */}
      <Footer />
    </>
  );
}

export default EventCompletePage;
