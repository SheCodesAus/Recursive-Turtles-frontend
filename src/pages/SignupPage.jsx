import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ErrorAlert from "../components/shared/ErrorAlert";

function SignupPage() {

  // React Router navigation hook
  const navigate = useNavigate();

  // Store organiser signup form data
  const [formData, setFormData] = useState({
    name: "",
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

  // Handle organiser account creation
  function handleSubmit(e) {
    e.preventDefault();

    // Prevent incomplete form submission
    if (
      !formData.name ||
      !formData.email ||
      !formData.password
    ) {
      setError("Please complete all required fields.");
      return;
    }

    // Temporary MVP redirect after signup
    navigate("/dashboard");
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
            Create Organiser Account
          </h1>

          <p className="page-subtitle">
            Sign up to create and manage workshop events.
          </p>

        </div>

        {/* Signup form card */}
        <section className="card">

          <form
            className="stack"
            onSubmit={handleSubmit}
          >

            {/* Full name input field */}
            <label className="form-label">

              Full Name

              <input
                className="input"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
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

            {/* Submit organiser account creation */}
            <button
              className="button-primary"
              type="submit"
            >
              Create Organiser Account
            </button>

          </form>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default SignupPage;