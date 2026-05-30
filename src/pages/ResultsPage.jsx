import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Footer from "../components/shared/Footer";
import { useNavigate } from "react-router-dom";
import LogoutButton from "../components/shared/LogoutButton";

import {
  getPolls,
  getPollResults,
  getQuestions,
  getFeedback,
  getEmails,
} from "../services/results";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";


function ResultsPage() {
  // Get event id from url
  const { eventId } = useParams();
  // Store api-driven results data
  const [pollResults, setPollResults] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [emailCount, setEmailCount] = useState(0);
  const [averageRating, setAverageRating] = useState(0);
    // React Router navigation hook
  const navigate = useNavigate();

  // Fetch event analytics data when page loads
  useEffect(() => {
  async function loadResults() {
    try {
      // Fetch all result-related data in parallel
      const [polls, questionData, feedbackData, emailData] =
        await Promise.all([
          getPolls(eventId),
          getQuestions(eventId),
          getFeedback(eventId),
          getEmails(eventId),
        ]);
      
      // Fetch poll response breakdown for first poll
      if (polls.length > 0) {
        const resultData = await getPollResults(polls[0].id);

        setPollResults(
          resultData.map((result) => ({
            option: result.option_text,
            votes: result.count,
          }))
        );
      }

      setQuestions(questionData.map((q) => q.question_text));
      setEmailCount(emailData.length);

      if (feedbackData.length > 0) {
        const total = feedbackData.reduce(
          (sum, item) => sum + Number(item.rating || 0),
          0
        );

        setAverageRating((total / feedbackData.length).toFixed(1));
      }
    } catch (err) {
      console.error(err);
    }
  }

  loadResults();
}, [eventId]);

const attendeeCount = emailCount;

const pollResponseCount = pollResults.reduce(
  (sum, row) => sum + row.votes,
  0
);

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
          <div className="app-logo"
          onClick={()=> navigate("/")}>
            Workshop Navigator
          </div>

          {/* Organiser account actions */}
          <div className="header-actions">
            <LogoutButton />
          </div>

          {/* Current page label
          <div className="event-code">
            Results
          </div> */}

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