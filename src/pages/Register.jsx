import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Register() {
  const { register, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // Strength Check states
  const [strength, setStrength] = useState({ score: 0, label: "Empty", colorClass: "bg-secondary" });

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/profile");
    }
  }, [isAuthenticated, navigate]);

  // Compute password strength
  useEffect(() => {
    if (!password) {
      setStrength({ score: 0, label: "Empty", colorClass: "bg-secondary" });
      return;
    }

    let score = 0;
    if (password.length >= 6) score += 1;
    if (password.length >= 8) score += 1;
    if (/[A-Z]/.test(password)) score += 1;
    if (/[0-9]/.test(password)) score += 1;
    if (/[^A-Za-z0-9]/.test(password)) score += 1;

    let label = "Weak";
    let colorClass = "bg-danger";

    if (score >= 4) {
      label = "Strong Guild Protection";
      colorClass = "bg-success";
    } else if (score >= 3) {
      label = "Moderate";
      colorClass = "bg-warning";
    } else if (score >= 2) {
      label = "Fair";
      colorClass = "bg-warning";
    }

    setStrength({ score, label, colorClass });
  }, [password]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg("");

    if (!name.trim() || !email.trim() || !password.trim()) {
      setErrorMsg("Required input fields are empty.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorMsg("Invalid email format.");
      return;
    }

    if (password.length < 6) {
      setErrorMsg("Security code must contain at least 6 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMsg("Passwords do not match.");
      return;
    }

    const result = register(name, email, phone, password);
    if (result.success) {
      navigate("/profile");
    } else {
      setErrorMsg(result.message);
    }
  };

  return (
    <div className="container py-5 d-flex align-items-center justify-content-center" style={{ minHeight: "85vh" }}>
      <div className="bg-white border p-4 p-md-5 rounded-0 shadow-sm w-100" style={{ maxWidth: "480px" }}>
        
        {/* Header */}
        <div className="text-center mb-4">
          <h2 className="font-editorial text-uppercase text-dark mb-1" style={{ fontSize: "1.6rem" }}>
            Create Guild Account
          </h2>
          <p className="text-secondary text-uppercase tracking-wider" style={{ fontSize: "0.65rem", fontWeight: "600" }}>
            Join GemAura Exclusive Client Circle
          </p>
        </div>

        {errorMsg && (
          <div className="alert alert-danger rounded-0 mb-4 d-flex align-items-center gap-2" style={{ fontSize: "0.8rem" }}>
            <i className="bi bi-exclamation-triangle-fill"></i>
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
          {/* Full Name */}
          <div>
            <label className="form-label text-uppercase text-secondary tracking-wider" style={{ fontSize: "0.65rem", fontWeight: "600" }}>
              Full Name *
            </label>
            <div className="input-group rounded-0">
              <span className="input-group-text rounded-0 bg-light text-secondary border-end-0">
                <i className="bi bi-person"></i>
              </span>
              <input
                type="text"
                placeholder="Aurelia Sterling"
                className="form-control rounded-0 gemaura-input border-start-0"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="form-label text-uppercase text-secondary tracking-wider" style={{ fontSize: "0.65rem", fontWeight: "600" }}>
              Email Address *
            </label>
            <div className="input-group rounded-0">
              <span className="input-group-text rounded-0 bg-light text-secondary border-end-0">
                <i className="bi bi-envelope"></i>
              </span>
              <input
                type="email"
                placeholder="client@domain.com"
                className="form-control rounded-0 gemaura-input border-start-0"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Phone */}
          <div>
            <label className="form-label text-uppercase text-secondary tracking-wider" style={{ fontSize: "0.65rem", fontWeight: "600" }}>
              Contact Number
            </label>
            <div className="input-group rounded-0">
              <span className="input-group-text rounded-0 bg-light text-secondary border-end-0">
                <i className="bi bi-telephone"></i>
              </span>
              <input
                type="text"
                placeholder="+1 (555) 000-0000"
                className="form-control rounded-0 gemaura-input border-start-0"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="form-label text-uppercase text-secondary tracking-wider" style={{ fontSize: "0.65rem", fontWeight: "600" }}>
              Security Code (Password) *
            </label>
            <div className="input-group rounded-0">
              <span className="input-group-text rounded-0 bg-light text-secondary border-end-0">
                <i className="bi bi-lock"></i>
              </span>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Minimum 6 characters..."
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

          {/* Password Strength Indicator */}
          {password && (
            <div className="px-1 py-1">
              <div className="d-flex justify-content-between align-items-center mb-1" style={{ fontSize: "0.7rem" }}>
                <span className="text-secondary uppercase">Code Strength:</span>
                <span className={`font-bold ${strength.score >= 4 ? 'text-success' : 'text-warning'}`}>
                  {strength.label}
                </span>
              </div>
              <div className="progress rounded-0" style={{ height: "4px" }}>
                <div
                  className={`progress-bar ${strength.colorClass}`}
                  role="progressbar"
                  style={{ width: `${(strength.score / 5) * 100}%` }}
                ></div>
              </div>
            </div>
          )}

          {/* Confirm Password */}
          <div>
            <label className="form-label text-uppercase text-secondary tracking-wider" style={{ fontSize: "0.65rem", fontWeight: "600" }}>
              Verify Security Code *
            </label>
            <div className="input-group rounded-0">
              <span className="input-group-text rounded-0 bg-light text-secondary border-end-0">
                <i className="bi bi-lock-fill"></i>
              </span>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Re-enter security code..."
                className="form-control rounded-0 gemaura-input border-start-0"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="btn btn-gemaura w-100 mt-2"
          >
            Create Faction Profile
          </button>
        </form>

        {/* Login link */}
        <div className="mt-4 text-center" style={{ fontSize: "0.8rem" }}>
          <span className="text-secondary">Already have an account? </span>
          <Link to="/login" className="text-warning text-decoration-none font-bold uppercase tracking-wider ms-1">
            Access System
          </Link>
        </div>

      </div>
    </div>
  );
}
