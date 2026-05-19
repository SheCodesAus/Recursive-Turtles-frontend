import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ErrorAlert from "../components/shared/ErrorAlert";
import Footer from "../components/shared/Footer";
import { signupFacilitator } from "../services/auth";

function SignupPage() {
  // React Router navigation hook
  const navigate = useNavigate();

  // Store facilitator signup form data
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  // Handle updates to form input fields
  function handleChange(e) {
    // Update matching form field dynamically
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  // Handle facilitator account creation
  async function handleSubmit(e) {
    e.preventDefault();

    // Prevent incomplete form submission
    if (!formData.username || !formData.email || !formData.password) {
      setError("Please complete all required fields.");
      return;
    }

    try {
      const data = await signupFacilitator({
        username: formData.username,
        email: formData.email,
        password: formData.password,
      });

      window.localStorage.setItem("access", data.access);
      window.localStorage.setItem("refresh", data.refresh);

      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      setError("We couldn't create your account. Please try again.");
    }
  }

  return (
    <>
      <ErrorAlert message={error} onClose={() => setError("")} />

      {/* Top application header */}
      <header className="app-header">
        <div className="app-header-inner">
          <div className="app-logo">Workshop Navigator</div>

          <div className="header-actions">
            <button
              className="secondary-button"
              onClick={() => navigate("/login")}
            >
              Facilitator Login
            </button>

            <button className="button-primary" onClick={() => navigate("/")}>
              Join Workshop
            </button>
          </div>
        </div>
      </header>
      <main className="page">
        {/* Page introduction */}
        <div className="page-header">
          <h1 className="page-title">Create Facilitator Account</h1>

          <p className="page-subtitle">
            Sign up to create and manage workshop events.
          </p>
        </div>

        {/* Signup form card */}
        <section className="card">
          <form className="stack" onSubmit={handleSubmit}>
            {/* Username input field */}
            <label className="form-label">
              Username
              <input
                className="input"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Enter a username"
              />
            </label>

            {/* Email input field */}
            <label className="form-label">
              Email
              <input
                className="input"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
              />
            </label>

            {/* Password input field */}
            <label className="form-label">
              Password
              <input
                className="input"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
              />
            </label>

            {/* Submit facilitator account creation */}
            <button className="button-primary" type="submit">
              Create Facilitator Account
            </button>
          </form>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default SignupPage;
