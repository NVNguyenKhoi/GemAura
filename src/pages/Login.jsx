import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // Redirect if already logged in
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/profile");
    }
  }, [isAuthenticated, navigate]);

  // Load remember me email if exists
  useEffect(() => {
    const savedEmail = localStorage.getItem("gemaura_remember_email");
    if (savedEmail) {
      setEmail(savedEmail);
      setRememberMe(true);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg("");

    if (!email.trim() || !password.trim()) {
      setErrorMsg("Please fill in all credentials.");
      return;
    }

    const result = login(email, password);
    if (result.success) {
      if (rememberMe) {
        localStorage.setItem("gemaura_remember_email", email);
      } else {
        localStorage.removeItem("gemaura_remember_email");
      }
      navigate("/profile");
    } else {
      setErrorMsg(result.message);
    }
  };

  return (
    <div className="container py-5 d-flex align-items-center justify-content-center" style={{ minHeight: "75vh" }}>
      <div className="bg-white border p-4 p-md-5 rounded-0 shadow-sm w-100" style={{ maxWidth: "450px" }}>
        
        {/* Header */}
        <div className="text-center mb-4">
          <i className="bi bi-gem text-warning" style={{ fontSize: "2rem" }}></i>
          <h2 className="font-editorial text-uppercase text-dark mt-2 mb-1" style={{ fontSize: "1.6rem" }}>
            Salon Member Sign In
          </h2>
          <p className="text-secondary text-uppercase tracking-wider" style={{ fontSize: "0.65rem", fontWeight: "600" }}>
            Unlock Private Collections & Aura Profiles
          </p>
        </div>

        {errorMsg && (
          <div className="alert alert-danger rounded-0 mb-4 d-flex align-items-center gap-2" style={{ fontSize: "0.8rem" }}>
            <i className="bi bi-exclamation-triangle-fill"></i>
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
          {/* Email */}
          <div>
            <label className="form-label text-uppercase text-secondary tracking-wider" style={{ fontSize: "0.65rem", fontWeight: "600" }}>
              Member Email
            </label>
            <div className="input-group rounded-0">
              <span className="input-group-text rounded-0 bg-light text-secondary border-end-0">
                <i className="bi bi-envelope"></i>
              </span>
              <input
                type="email"
                placeholder="aurelia@gemaura.com"
                className="form-control rounded-0 gemaura-input border-start-0"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <div className="d-flex justify-content-between mb-1">
              <label className="form-label text-uppercase text-secondary tracking-wider mb-0" style={{ fontSize: "0.65rem", fontWeight: "600" }}>
                Security Code (Password)
              </label>
              <a href="#" className="text-warning text-decoration-none" style={{ fontSize: "0.7rem", fontWeight: "600" }}>
                Forgot Code?
              </a>
            </div>
            <div className="input-group rounded-0">
              <span className="input-group-text rounded-0 bg-light text-secondary border-end-0">
                <i className="bi bi-lock"></i>
              </span>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter security code..."
                className="form-control rounded-0 gemaura-input border-start-0 border-end-0"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="input-group-text rounded-0 bg-light text-secondary border-start-0 hover-gold"
              >
                <i className={`bi ${showPassword ? 'bi-eye-slash' : 'bi-eye'}`}></i>
              </button>
            </div>
          </div>

          {/* Remember Me */}
          <div className="form-check my-1">
            <input
              type="checkbox"
              id="rememberMe"
              className="form-check-input rounded-0 border-secondary"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            <label htmlFor="rememberMe" className="form-check-label text-secondary" style={{ fontSize: "0.8rem" }}>
              Remember My Account
            </label>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="btn btn-gemaura w-100 mt-2"
          >
            Authenticate Profile
          </button>
        </form>

        {/* Demo Credentials Tip */}
        <div className="mt-4 p-3 bg-light border text-secondary" style={{ fontSize: "0.75rem", lineHeight: "1.5" }}>
          <span className="d-block text-warning font-bold text-uppercase tracking-wider mb-1" style={{ fontSize: "0.65rem" }}>
            🔑 TESTING CREDENTIALS
          </span>
          <span className="d-block">Email: <strong className="text-dark">aurelia@gemaura.com</strong></span>
          <span className="d-block">Code: <strong className="text-dark">GemAura123!</strong></span>
        </div>

        {/* Register link */}
        <div className="mt-4 text-center" style={{ fontSize: "0.8rem" }}>
          <span className="text-secondary">New to the salon? </span>
          <Link to="/register" className="text-warning text-decoration-none font-bold uppercase tracking-wider ms-1">
            Register Account
          </Link>
        </div>

      </div>
    </div>
  );
}
