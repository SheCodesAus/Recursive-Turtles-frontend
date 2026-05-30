import { useState } from "react";
import { postCreateEvent } from "../services/events";
import { useNavigate } from "react-router-dom";
import { QRCodeCanvas } from "qrcode.react";
import LogoutButton from "../components/shared/LogoutButton";
import Footer from "../components/shared/Footer";

function CreateEventPage() {
  const navigate = useNavigate();
  const [err,setErr] = useState("");

  const [title, setTitle] = useState("");
  const [createdEvent, setCreatedEvent] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!title.trim()) {
      setErr("Please enter an event title");
      return;
    }

    try {
      setIsLoading(true);

      const response = await postCreateEvent({ title });
      setCreatedEvent(response);
      setTitle("");
      setErr("");
    } catch (err) {
      console.error(err);
      setErr("We couldn't create the event. Please try again.");
    } finally {      
      setIsLoading(false);
    }

  };

  return (
    <>
    <header className="app-header">
        <div className="app-header-inner">
          {/* Application branding */}
          <div className="app-logo">
            Workshop Navigator
          </div>

          {/* Organiser account actions */}
          <div className="header-actions">
            <LogoutButton />
          </div>
        </div>
      </header>
      <main className="page">
        <div className="page-header">
          <h1 className="page-title">Create Event</h1>
          <p className="page-subtitle">Set up a new workshop event</p>
        </div>

        {!createdEvent && (
          <section className="card">
            <h2>Event Details</h2>

          <form onSubmit={handleSubmit}>
            {err && <p className="error-message">{err}</p>}
            <label className="form-label">Event Title</label>

              <input
                className="input"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Gen Z Leadership Workshop"
              />

              <button className="button-primary" type="submit">
                {isLoading ? "Creating..." : "Create Event"}
              </button>

              <button className="secondary-button" type="button" onClick={() => navigate("/dashboard")}>
                Back to Dashboard
              </button>
            </form>
          </section>
        )}

        {createdEvent && (
          <section className="card card-centered">
            <button className="secondary-button" onClick={() => navigate("/dashboard")}>
              ← Back to Dashboard
            </button>
            <p className="card-label">Event created</p>

            <h2>{createdEvent.title}</h2>

            <p className="muted">Event Code</p>
            <h2>{createdEvent.event_code}</h2>

            <p className="muted" style={{ marginTop: "16px" }}>
              Share this link
            </p>

            <div className="share-link">
              {`${window.location.origin}/join/${createdEvent.event_code}`}
            </div>

            <button
              className="button-primary"
              onClick={() => {
                navigator.clipboard.writeText(
                  `${window.location.origin}/join/${createdEvent.event_code}`);
                alert("Link copied!");
              }}
            >
              Copy Link
            </button>

            <div style={{ marginTop: "20px" }}>
              <QRCodeCanvas
                value={`${window.location.origin}/join/${createdEvent.event_code}`} 
                size={180}
                bgColor="#ffffff"
                fgColor="#000000"
              />
            </div>

            <button
              className="button-primary"
              style={{ marginTop: "20px" }}
              onClick={() => setCreatedEvent(null)}
            >
              Create Another Event
            </button>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}

export default CreateEventPage;