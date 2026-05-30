import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { postLogin } from "../services/post-login";

// Shared footer component
import Footer from "../components/shared/Footer";

import ErrorAlert from "../components/shared/ErrorAlert";

function LoginPage() {

  // Store organiser email input
  const [email, setEmail] = useState("");
  const [err, setErr] = useState("");

  // Store organiser password input
  const [password, setPassword] = useState("");

  // React Router navigation hook
  const navigate = useNavigate();
  
  const [error, setError] = useState("");


  const handleSubmit = (event) => {
    event.preventDefault();
    if (!email || !password) {
      setErr("Please enter your email and password to log in.");
      return;
    }
    if(email && password) {
      // Perform login logic here
      postLogin(email, password)
        .then((response) => {
          window.localStorage.setItem("access", response.access); // Save token to local storage
          // Handle successful login, e.g., save token, redirect, etc.
          console.log("Login successful:", response);
          console.log("Token saved to localStorage:", response.access);
          navigate("/dashboard");
        })
        .catch((error) => {
          // Handle login error, e.g., show error message
          console.error("Login failed:", error);
          setErr("Login failed. Please check your credentials and try again.");
        });
    }
  };


  return (
    <>
      <ErrorAlert message={error} onClose={() => setError("")} />

      {/* Top application header */}
      <header className="app-header">
        <div className="app-header-inner">

          {/* Application branding */}
          <div className="app-logo"
          onClick={()=> navigate("/")}>
            Workshop Navigator
          </div>

        </div>
      </header>

      <main className="page">

        {/* Page introduction */}
        <div className="page-header">

          <h1 className="page-title">
            Facilitatir Login
          </h1>

          <p className="page-subtitle">
            Access your events and dashboard
          </p>

        </div>

        {/* Login form card */}
        <section className="card">

          <form onSubmit={handleSubmit}>
            {err && <p className="error-message">{err}</p>}
            
            {/* Email field label */}
            <label className="form-label">
              Email
            </label>

            {/* Email input */}
            <input
              className="input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              id="email"
              placeholder="Enter your email"
            />

            {/* Password field label */}
            <label className="form-label">
              Password
            </label>

            {/* Password input */}
            <input
              type="password"
              className="input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              id="password"
              placeholder="Enter your password"
            />

            {/* Submit login form */}
            <button type="submit" 
              className="button-primary">
              Login
            </button>

            {/* Navigate to password reset page */}
            <button type="button"
              className="secondary-button"
              onClick={() => navigate("/reset-password")}
            >
              Forgot password?
            </button>

          </form>
        </section>
      </main>

      {/* Shared application footer */}
      <Footer />

    </>
  );
}

export default LoginPage;