import { useEffect, useState } from "react";
import {
  getPollsByEvent,
  submitPollResponse,
} from "../../services/polls";

function LivePollCard({ eventId }) {
  const [polls, setPolls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submittedPolls, setSubmittedPolls] = useState([]);

  useEffect(() => {
    async function loadPolls() {
      try {
        const data = await getPollsByEvent(eventId);

        // Only show active polls
        const activePolls = data.filter((poll) => poll.is_active);

        setPolls(activePolls);
      } catch (error) {
        console.error("Error loading polls:", error);
      } finally {
        setLoading(false);
      }
    }

    loadPolls();
  }, [eventId]);

  async function handleVote(pollId, option) {
    try {
      await submitPollResponse(pollId, {
        selected_option: option,
      });

      setSubmittedPolls([...submittedPolls, pollId]);
    } catch (error) {
      console.error("Error submitting vote:", error);
    }
  }

  if (loading) {
    return (
      <section className="card">
        <p>Loading live polls...</p>
      </section>
    );
  }

  if (polls.length === 0) {
    return (
      <section className="card">
        <h2>Live Polls</h2>

        <p className="muted">No active polls right now.</p>
      </section>
    );
  }

  return (
    <>
      {polls.map((poll) => (
        <section className="card" key={poll.id}>
          <div className="section-header">
            <div>
              <h2>Live Poll</h2>

              <p>{poll.question}</p>
            </div>
          </div>

          {submittedPolls.includes(poll.id) ? (
            <p className="muted">Your response has been submitted.</p>
          ) : (
            <div className="poll-options">
              {poll.options?.map((option, index) => (
                <button
                  key={index}
                  className="poll-option-button"
                  onClick={() => handleVote(poll.id, option)}
                >
                  {option}
                </button>
              ))}
            </div>
          )}
        </section>
      ))}
    </>
  );
}

export default LivePollCard;