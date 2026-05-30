import { useState } from "react";
import { captureEmail } from "../../services/emails";


function EmailCaptureForm({ eventId }) {
  const [email, setEmail] = useState("");
  const [err, setErr] = useState(""); 
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
      e.preventDefault();

      //empty email validation
      if (!email || !email.includes("@")) {
        setErr("Please enter a valid email address.");
        return;
      }

      setLoading(true);
      setErr("");
      setMessage("");

      try {
        await captureEmail(eventId,email);
        setMessage("Your email has been submitted successfully!");
        setEmail("");

      } catch (err) {
        setErr("We couldn't submit your email. Please try again.");
        console.log(err);       
      }finally{
        setLoading(false);
      }
    };

  return (
    <section className="card">
      <p className="card-label">Resources</p>
      <h2>Get the Slides</h2>

      <form onSubmit={handleSubmit}>
      {err && <p className="error-message">{err}</p>}
        <input
          className="input"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email address"
        />

        <button type="submit" className="button-primary">
          Send Me the Slides
        </button>
        {message && <p className="success-message">{message}</p>}
      </form>
    </section>
  );
}

export default EmailCaptureForm;