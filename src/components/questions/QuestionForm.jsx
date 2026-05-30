import { useState } from "react";
import { postQuestion } from "../../services/questions";

function QuestionForm({ eventId, onSuccess }) {
  const [question, setQuestion] = useState("");
  const [anonymous, setAnonymous] = useState(true);
  const [message, setMessage] = useState("");
  const [err, setErr] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    if (!question.trim()) {
      setErr("Please enter your question.");
      return;
    }

    try {
      await postQuestion(eventId, { text: question, anonymous });
      setMessage("Your question has been submitted.");
      setAnonymous(true);
      if (onSuccess) {
        onSuccess();
      }
    } catch (err) {
      console.error(err);
      setErr("Failed to submit question. Please try again.");
      return ;
    }
    setQuestion("");
  }

  return (
    <section className="card">
      <p className="card-label">Audience Q&A</p>
      <h2>Ask a Question</h2>

      <form onSubmit={handleSubmit}>
        {err && <p className="error-message">{err}</p>}
        <textarea
          className="textarea"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Type your question..."
          rows="4"
        />

        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={anonymous}
            onChange={() => setAnonymous(!anonymous)}
          />
          Ask anonymously
        </label>

        <button type="submit" className="button-primary">
          Submit Question
        </button>
        {message && <p className="success-message">{message}</p>}
      </form>
    </section>
  );
}
export default QuestionForm;