import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Event from "../components/shared/Event";
import "./DashboardPage.css";
import { getEventsPerFacilitator } from "../services/events";
import LogoutButton from "../components/shared/LogoutButton";
import Footer from "../components/shared/Footer";

function DashboardPage() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchEvents() {
      try {
        const data = await getEventsPerFacilitator();
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
    <>
    <header className="app-header">
        <div className="app-header-inner">
          {/* Application branding */}
          <div className="app-logo" 
          onClick={()=> navigate("/")}>
            Workshop Navigator
          </div>

          {/* Organiser account actions */}
          <div className="header-actions">
            <LogoutButton />
          </div>
        </div>
      </header>
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
            <p>Here you can view and manage all the events you've created. Click on an event to see more details, edit it, or view results.</p>

            {events.map((event) => (
              <Event
                key={event.id}
                event={event}
                onClick={() => navigate(`/dashboard/events/${event.event_code}`)}
              />
            ))}
          </div>
        )}
      </div>
    <Footer />
    </>
  );
}

export default DashboardPage;
