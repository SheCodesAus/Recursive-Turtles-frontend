import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function ResultsPage() {

  // Temporary mock poll result data
  // This will later be replaced with backend/API data
  const pollResults = [
    { option: "Communication", votes: 12 },
    { option: "Motivation", votes: 8 },
    { option: "Retention", votes: 6 },
    { option: "Conflict", votes: 5 },
  ];

  // Temporary mock question data
  const questions = [
    "How do you improve Gen Z engagement?",
    "What leadership styles work best?",
  ];

  // Temporary mock summary values
  const attendeeCount = 42;
  const emailCount = 18;
  const pollResponseCount = 31;
  const averageRating = 4.2;

  // Export event results into a downloadable CSV file
  function exportCSV() {

    // Build summary section of CSV
    let csv = "Event Summary\n";
    csv += `Attendees,${attendeeCount}\n`;
    csv += `Poll Responses,${pollResponseCount}\n`;
    csv += `Questions,${questions.length}\n`;
    csv += `Emails Captured,${emailCount}\n`;
    csv += `Average Rating,${averageRating}\n\n`;

    // Build poll results section of CSV
    csv += "Poll Results\nOption,Votes\n";

    pollResults.forEach((row) => {
      csv += `${row.option},${row.votes}\n`;
    });

    // Build question section of CSV
    csv += "\nQuestions\n";

    questions.forEach((q) => {
      csv += `${q}\n`;
    });

    // Create downloadable CSV file in browser
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);

    // Create temporary download link
    const a = document.createElement("a");
    a.href = url;
    a.download = "event-results.csv";

    // Trigger file download
    a.click();
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

          {/* Current page label */}
          <div className="event-code">
            Results
          </div>

        </div>
      </header>

      <main className="page">

        {/* Page introduction */}
        <div className="page-header">

          <h1 className="page-title">
            Event Results
          </h1>

          <p className="page-subtitle">
            Summary of audience engagement and insights
          </p>

        </div>

        {/* Event summary section */}
        <section className="card">

          <p className="card-label">
            Summary
          </p>

          <h2>Event Overview</h2>

          {/* Summary metric rows */}
          <div className="stack">

            <div className="result-row">
              <span>Attendees</span>
              <span>{attendeeCount}</span>
            </div>

            <div className="result-row">
              <span>Poll Responses</span>
              <span>{pollResponseCount}</span>
            </div>

            <div className="result-row">
              <span>Questions</span>
              <span>{questions.length}</span>
            </div>

            <div className="result-row">
              <span>Emails Captured</span>
              <span>{emailCount}</span>
            </div>

            <div className="result-row">
              <span>Average Rating</span>
              <span>{averageRating} / 5</span>
            </div>

          </div>
        </section>

        {/* Poll result chart section */}
        <section className="card">

          <p className="card-label">
            Poll Results
          </p>

          <h2>Audience Responses</h2>

          {/* Responsive bar chart container */}
          <div style={{ width: "100%", height: 300 }}>

            <ResponsiveContainer>
              <BarChart data={pollResults}>

                {/* Poll option labels */}
                <XAxis dataKey="option" />

                {/* Vote count axis */}
                <YAxis />

                {/* Hover tooltip */}
                <Tooltip />

                {/* Vote result bars */}
                <Bar dataKey="votes" />

              </BarChart>
            </ResponsiveContainer>

          </div>
        </section>

        {/* Submitted questions section */}
        <section className="card">

          <p className="card-label">
            Questions
          </p>

          <h2>All Questions</h2>

          <div className="stack">

            {/* Show empty state if no questions exist */}
            {questions.length === 0 ? (
              <p className="muted">
                No questions submitted yet
              </p>
            ) : (

              // Render submitted questions
              questions.map((q, i) => (
                <div
                  key={i}
                  className="question-item"
                >
                  {q}
                </div>
              ))
            )}

          </div>
        </section>

        {/* Export results section */}
        <section className="card card-centered">

          <p className="card-label">
            Export
          </p>

          <h2>Download Results</h2>

          {/* Download CSV button */}
          <button
            className="button-primary"
            onClick={exportCSV}
          >
            Export CSV
          </button>

        </section>
      </main>
      <Footer />
    </>
  );
}

export default ResultsPage;