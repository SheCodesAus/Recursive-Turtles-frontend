import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ErrorAlert from "../components/shared/ErrorAlert";

function ResetPasswordPage() {

  // React Router navigation hook
  const navigate = useNavigate();

  // Store email input value
  const [email, setEmail] = useState("");

  const [error, setError] = useState("");

  // Handle reset password form submission
  function handleSubmit(e) {
    e.preventDefault();

    // Prevent empty email submissions
    if (!email) {
      setError("Please enter your email address.");
      return;
    }

    // Temporary MVP success message
    alert("Password reset link sent");

    // Redirect user back to login page
    navigate("/login");
  }

  return (
    <>
      <ErrorAlert message={error} onClose={() => setError("")} />
      {/* Top application header */}
      <header className="app-header">
        <div className="app-header-inner">

          {/* Application branding */}
          <div className="app-logo">
            Workshop Navigator
          </div>

        </div>
      </header>

      <main className="page">

        {/* Page introduction */}
        <div className="page-header">

          <h1 className="page-title">
            Reset Password
          </h1>

          <p className="page-subtitle">
            Enter your email and we’ll send you a reset link.
          </p>

        </div>

        {/* Password reset form */}
        <section className="card">

          <form
            className="stack"
            onSubmit={handleSubmit}
          >

            {/* Email input field */}
            <label className="form-label">

              Email

              <input
                className="input"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
              />

            </label>

            {/* Submit password reset request */}
            <button
              className="button-primary"
              type="submit"
            >
              Send Reset Link
            </button>

            {/* Navigate back to login page */}
            <button
              className="secondary-button"
              type="button"
              onClick={() => navigate("/login")}
            >
              Back to Login
            </button>

          </form>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default ResetPasswordPage;