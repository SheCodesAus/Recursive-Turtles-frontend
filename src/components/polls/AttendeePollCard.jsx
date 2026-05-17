import { useState } from "react";

function AttendeePollCard({
  question = "How are you finding the session so far?",
  options = ["Great", "Good", "Unsure"],
}) {
  const [selectedOption, setSelectedOption] = useState("");
  const [hasSubmitted, setHasSubmitted] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();

    if (!selectedOption) {
      alert("Please select an answer");
      return;
    }

    setHasSubmitted(true);
  }

  return (
    <article className="card attendee-poll-card">
      <p className="card-label">LIVE POLL</p>

      <h2>{question}</h2>

      {!hasSubmitted ? (
        <form onSubmit={handleSubmit} className="attendee-poll-form">
          {options.map((option) => (
            <button
              type="button"
              key={option}
              className={`option-button ${
                selectedOption === option ? "selected" : ""
              }`}
              onClick={() => setSelectedOption(option)}
            >
              {option}
            </button>
          ))}

          <button className="button-primary">
            Submit Answer
          </button>
        </form>
      ) : (
        <p className="muted">
          Thanks — your response has been submitted.
        </p>
      )}
    </article>
  );
}

export default AttendeePollCard;