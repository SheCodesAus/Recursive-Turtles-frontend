import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getEventById } from "../services/events";
import "./DashboardPage.css";

function EventDetailsPage() {
  const { eventId } = useParams();

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchEvent() {
      try {
        const data = await getEventById(eventId);
        setEvent(data);
      } catch (error) {
        console.error("Error fetching event:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchEvent();
  }, [eventId]);

  if (loading) {
    return (
      <div className="dashboard-page">
        <p>Loading workshop details...</p>
      </div>
    );
  }

  if (!event) {
  return (
    <div className="dashboard-page">
      <p>Event not found.</p>
    </div>
  );
}
  return (
    <>
      <header className="dashboard-header">
        <div className="dashboard-header-inner">
          <div>
            <p className="dashboard-label">Workshop Navigator</p>

            <h1 className="dashboard-title">
              {event?.title || "Loading..."}
            </h1>

            <p className="dashboard-subtitle">
              Current live workshop event
            </p>
          </div>

          <div className="live-badge">LIVE</div>
        </div>
      </header>

      <main className="dashboard-page">
        <section className="dashboard-card overview-card">
          <div>
            <p className="card-label">Event Code</p>

            <h2 className="event-code-text">
              {event?.event_code || "Loading..."}
            </h2>
          </div>

          <p className="event-time">
            {event?.created_at
              ? new Date(event.created_at).toLocaleString()
              : "Workshop event"}
          </p>
        </section>

        <section className="stats-grid">
          <div className="stat-card">
            <h2>42</h2>
            <p>Participants</p>
          </div>

          <div className="stat-card">
            <h2>77</h2>
            <p>Responses</p>
          </div>

          <div className="stat-card">
            <h2>12</h2>
            <p>Questions</p>
          </div>
        </section>

        <section className="dashboard-card">
          <p className="card-label">Facilitator Action</p>

          <button className="primary-button">
            + Create Live Poll
          </button>
        </section>

        <section className="dashboard-card">
          <p className="card-label">Active Poll</p>

          <h3 className="poll-title">
            How valuable is today’s workshop?
          </h3>

          <div className="poll-bar">
            <div
              className="poll-fill"
              style={{ width: "82%" }}
            ></div>
          </div>

          <p className="poll-result">
            82% Positive Feedback
          </p>
        </section>

        <section className="dashboard-card">
          <p className="card-label">Recent Questions</p>

          <div className="question-list">
            <div className="question-card">
              Can you share more examples of real-world leadership challenges?
            </div>

            <div className="question-card">
              What tools help build effective teams?
            </div>
          </div>
        </section>

        <section className="dashboard-card">
          <button className="secondary-button">
            Export Results CSV
          </button>
        </section>
      </main>
    </>
  );
}

export default EventDetailsPage;