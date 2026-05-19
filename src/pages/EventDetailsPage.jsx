import { useEffect, useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { getEventById } from "../services/events";
import "./DashboardPage.css";
import { useParams, useNavigate } from "react-router-dom";
import { getPollsByEvent, createPoll } from "../services/polls";

function EventDetailsPage() {
  const { eventId } = useParams();
  const navigate = useNavigate();

  const [event, setEvent] = useState(null);
  const [polls, setPolls] = useState([]);
  const [newPollQuestion, setNewPollQuestion] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchEvent() {
      try {
        const data = await getEventById(eventId);
        setEvent(data);

        const pollData = await getPollsByEvent(eventId);
        setPolls(pollData);
      } catch (error) {
        console.error("Error fetching event:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchEvent();
  }, [eventId]);

  async function handleCreatePoll(e) {
    e.preventDefault();

    if (!newPollQuestion.trim()) return;

    try {
      const createdPoll = await createPoll(eventId, {
        question: newPollQuestion,
      });

      setPolls([...polls, createdPoll]);
      setNewPollQuestion("");
    } catch (error) {
      console.error("Error creating poll:", error);
    }
  }

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
      <h2>Event not found</h2>

      <button
        className="create-button"
        onClick={() => navigate("/dashboard")}
      >
        Back to Dashboard
      </button>
    </div>
  );
}
  return (
    <>
      <header className="dashboard-header">
        <div className="dashboard-header-inner">
          <div>
            <p className="dashboard-label">Workshop Navigator</p>

            <h1 className="dashboard-title">{event.title}</h1>

            <p className="dashboard-subtitle">Current live workshop event</p>
          </div>

          <div className="live-badge">LIVE</div>
        </div>
      </header>

      <main className="dashboard-page">
        {/* EVENT INFO */}
        {/* QR CODE */}
        <section className="dashboard-card card-centered">
          <p className="card-label">Workshop Join QR</p>

          <div style={{ marginTop: "16px" }}>
            <QRCodeCanvas
              value={`${window.location.origin}/join/${event.event_code}`}
              size={180}
              bgColor="#ffffff"
              fgColor="#000000"
            />
          </div>

          <p className="muted" style={{ marginTop: "16px" }}>
            Share this QR code for attendees to join the workshop
          </p>
        </section>

        <section className="dashboard-card overview-card">
          <div>
            <p className="card-label">Event Code</p>

            <h2 className="event-code-text">{event.event_code}</h2>
          </div>

          <p className="event-time">
            {event.created_at
              ? new Date(event.created_at).toLocaleString()
              : "Workshop event"}
          </p>
        </section>

        {/* STATS */}
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

        {/* FACILITATOR ACTIONS */}
        <section className="dashboard-card">
          <p className="card-label">Facilitator Actions</p>

          <div className="action-buttons">
            <button
              className="primary-button"
              onClick={() => navigate(`/results/${eventId}`)}
            >
              View Results
            </button>

            <button
              className="secondary-button"
              onClick={() => navigate("/dashboard")}
            >
              Back to Dashboard
            </button>
          </div>
        </section>

        {/* CREATE POLL */}
        <section className="dashboard-card">
          <p className="card-label">Create Poll</p>

          <form onSubmit={handleCreatePoll}>
            <input
              type="text"
              placeholder="Enter poll question"
              value={newPollQuestion}
              onChange={(e) => setNewPollQuestion(e.target.value)}
              className="poll-input"
            />

            <button
              type="submit"
              className="primary-button"
              style={{ marginTop: "12px" }}
            >
              Create Poll
            </button>
          </form>
        </section>

        {/* ACTIVE POLLS */}
        <section className="dashboard-card">
          <p className="card-label">Active Polls</p>

          {polls.length === 0 ? (
            <p className="muted">No polls created yet.</p>
          ) : (
            polls.map((poll) => (
              <div key={poll.id} className="question-card">
                <h3 className="poll-title">{poll.question}</h3>

                <p className="muted">
                  {poll.is_active ? "Live Poll" : "Closed Poll"}
                </p>
              </div>
            ))
          )}
        </section>

        {/* QUESTIONS */}
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

        {/* EXPORT */}
        <section className="dashboard-card">
          <button className="secondary-button">Export Results CSV</button>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default EventDetailsPage;
