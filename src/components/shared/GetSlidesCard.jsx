function GetSlidesCard() {
  return (
    <section className="card card-centered">
      <p className="card-label">
        Workshop Resources
      </p>

      <h2>Get the Slides</h2>

      <p className="muted">
        Access presentation slides, workshop materials and additional learning resources after the event.
      </p>

      <div className="event-actions-preview">

        <div className="event-action-chip">
          Presentation Slides
        </div>

        <div className="event-action-chip">
          Workshop Resources
        </div>

        <div className="event-action-chip">
          Follow-up Materials
        </div>

      </div>

      <button className="button-primary">
        Access Slides
      </button>
    </section>
  );
}

export default GetSlidesCard;