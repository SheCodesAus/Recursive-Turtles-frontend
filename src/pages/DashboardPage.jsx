import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Event from "../components/shared/Event";
import "./DashboardPage.css";
import { getEvents } from "../services/events";

function DashboardPage() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchEvents() {
      try {
        const data = await getEvents();
        setEvents(data);
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchEvents();
  }, []);

  return (
    <div className="dashboard-container">
      <div className="dashboard-title">
        <h1>Manage your Events</h1>
      </div>

      {/* CREATE EVENT BUTTON */}
      <button
        className="create-button"
        onClick={() => navigate("/dashboard/events/new")}
      >
        + Create New Event
      </button>

      {loading && (
        <div className="card card-centered">
          <div className="loading-spinner"></div>

          <p className="muted">Loading your workshop events...</p>
        </div>
      )}
      {!loading && events.length === 0 && <p>No events yet</p>}
      {!loading && events.length > 0 && (
        <div className="events-list">
          <h1>Existing Events</h1>
          {events.map((event) => (
            <Event
              key={event.id}
              event={event}
              onClick={() => navigate(`/dashboard/events/${event.id}`)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default DashboardPage;
