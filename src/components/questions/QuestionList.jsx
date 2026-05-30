import { useState } from "react";
import { getQuestions } from "../../services/questions";
import { useEffect } from "react";

function QuestionList({ eventId , refresh }) {
  const [questions, setQuestions] = useState([]);


  useEffect(() => {
    async function fetchQuestions() {
      try {
        const data = await getQuestions(eventId);
        setQuestions(data);
      } catch (err) {
        console.error(err);
      }
    }

    fetchQuestions();
  }, [eventId, refresh]);
  
  return (
    <section className="card">
      <p className="card-label">Live questions</p>
      <h2>Audience Questions</h2>

      <div className="stack">
        {questions.map((question) => (
          <div key={question.id} className="question-item">
            <p>{question.question_text}</p>

            <div className="question-meta">
              <span>{question.anonymous ? "Anonymous" : "Named User"}</span>

              <button className="upvote-button">
                ▲ {question.upvotes}
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default QuestionList;