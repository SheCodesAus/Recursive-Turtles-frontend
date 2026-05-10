import "./DashboardPage.css";

function DashboardPage() {
  return (
    <>
      <header className="dashboard-header">

        <div className="dashboard-header-inner">

          <div>
            <p className="dashboard-label">
              Workshop Navigator
            </p>

            <h1 className="dashboard-title">
              Workshop Title
            </h1>

            <p className="dashboard-subtitle">
              Current live workshop session
            </p>
          </div>

          <div className="live-badge">
            LIVE
          </div>

        </div>

      </header>

      <main className="dashboard-page">

        {/* OVERVIEW */}
        <section className="dashboard-card overview-card">

          <div>
            <p className="card-label">
              Event Code
            </p>

            <h2 className="event-code-text">
              AB12CD
            </h2>
          </div>

          <p className="event-time">
            May 22, 2026 • 10:00 AM
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

        {/* CREATE POLL */}
        <section className="dashboard-card">

          <p className="card-label">
            Facilitator Action
          </p>

          <button className="primary-button">
            + Create Live Poll
          </button>

        </section>

        {/* ACTIVE POLL */}
        <section className="dashboard-card">

          <p className="card-label">
            Active Poll
          </p>

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

        {/* QUESTIONS */}
        <section className="dashboard-card">

          <p className="card-label">
            Recent Questions
          </p>

          <div className="question-list">

            <div className="question-card">
              Can you share more examples of
              real-world leadership challenges?
            </div>

            <div className="question-card">
              What tools help build effective teams?
            </div>

          </div>

        </section>

        {/* EXPORT */}
        <section className="dashboard-card">

          <button className="secondary-button">
            Export Results CSV
          </button>

        </section>

      </main>
    </>
  );
}

export default DashboardPage;