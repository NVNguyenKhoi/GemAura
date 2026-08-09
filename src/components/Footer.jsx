import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  return (
    <footer className="w-full bg-[#121212] text-white border-top border-secondary py-5 px-3 px-md-5 mt-auto" style={{ color: "#f5f5f5" }}>
      <div className="container-fluid py-4">
        <div className="row g-4 justify-content-between mb-5">
          {/* Brand Info */}
          <div className="col-12 col-md-4">
            <Link to="/" className="d-flex align-items-center text-white text-decoration-none mb-3" style={{ letterSpacing: "0.15em", fontWeight: "700" }}>
              <i className="bi bi-gem me-2 text-warning" style={{ fontSize: "1.3rem" }}></i>
              <span className="font-editorial text-uppercase" style={{ fontSize: "1.4rem" }}>GemAura</span>
            </Link>
            <p className="text-secondary text-xs" style={{ fontSize: "0.8rem", lineHeight: "1.6" }}>
              GemAura is a digital sanctuary for authentic natural gemstones and exquisite Feng Shui accessories. Every piece is meticulously handcrafted, blending timeless luxury with spiritual energy.
            </p>
            {/* Social Icons */}
            <div className="d-flex align-items-center gap-3 mt-4">
              <a href="#" className="text-white hover-gold text-decoration-none border border-secondary rounded-circle d-flex align-items-center justify-content-center" style={{ width: "36px", height: "36px" }}>
                <i className="bi bi-instagram"></i>
              </a>
              <a href="#" className="text-white hover-gold text-decoration-none border border-secondary rounded-circle d-flex align-items-center justify-content-center" style={{ width: "36px", height: "36px" }}>
                <i className="bi bi-facebook"></i>
              </a>
              <a href="#" className="text-white hover-gold text-decoration-none border border-secondary rounded-circle d-flex align-items-center justify-content-center" style={{ width: "36px", height: "36px" }}>
                <i className="bi bi-pinterest"></i>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-6 col-md-2">
            <h5 className="text-warning text-uppercase font-editorial tracking-wider mb-4" style={{ fontSize: "1.1rem" }}>Collections</h5>
            <ul className="list-unstyled d-flex flex-col gap-2" style={{ fontSize: "0.8rem" }}>
              <li><Link to="/?category=Bracelets" className="text-secondary text-decoration-none hover-white">Bracelets</Link></li>
              <li><Link to="/?category=Necklaces" className="text-secondary text-decoration-none hover-white">Necklaces</Link></li>
              <li><Link to="/?category=Rings" className="text-secondary text-decoration-none hover-white">Rings</Link></li>
              <li><Link to="/?category=Pendants" className="text-secondary text-decoration-none hover-white">Pendants</Link></li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="col-6 col-md-3">
            <h5 className="text-warning text-uppercase font-editorial tracking-wider mb-4" style={{ fontSize: "1.1rem" }}>Flagship Salon</h5>
            <ul className="list-unstyled d-flex flex-col gap-3 text-secondary" style={{ fontSize: "0.8rem" }}>
              <li className="d-flex align-items-start gap-2">
                <i className="bi bi-geo-alt text-warning"></i>
                <span>742 Lapis Lazuli Way, Emerald Hills, CA 90210</span>
              </li>
              <li className="d-flex align-items-center gap-2">
                <i className="bi bi-telephone text-warning"></i>
                <span>+1 (555) 839-2001</span>
              </li>
              <li className="d-flex align-items-center gap-2">
                <i className="bi bi-envelope text-warning"></i>
                <span>concierge@gemaura.com</span>
              </li>
              <li className="d-flex align-items-center gap-2">
                <i className="bi bi-clock text-warning"></i>
                <span>Mon - Sun: 10:00 AM - 8:00 PM</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="col-12 col-md-3">
            <h5 className="text-warning text-uppercase font-editorial tracking-wider mb-4" style={{ fontSize: "1.1rem" }}>The Guild Journal</h5>
            <p className="text-secondary text-xs mb-3" style={{ fontSize: "0.8rem" }}>
              Join our mailing list to receive notices on rare stone acquisitions, ritual timing guide, and private promotions.
            </p>
            <form onSubmit={handleSubscribe} className="d-flex border-bottom border-light pb-2">
              <input
                type="email"
                placeholder="Email Address"
                className="bg-transparent border-0 w-100 text-white outline-none"
                style={{ fontSize: "0.8rem", outline: "none" }}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button type="submit" className="btn btn-link text-white p-0 text-decoration-none">
                <i className="bi bi-arrow-right"></i>
              </button>
            </form>
            {subscribed && (
              <span className="text-success text-xs mt-2 d-block" style={{ fontSize: "0.75rem" }}>
                ✓ Subscribed to the Journal.
              </span>
            )}
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="border-top border-secondary pt-4 d-flex flex-column flex-md-row justify-content-between align-items-center text-secondary gap-3" style={{ fontSize: "0.75rem" }}>
          <span>© {new Date().getFullYear()} GemAura Flagship E-commerce. Crafted for purity and authenticity.</span>
          <div className="d-flex gap-4">
            <a href="#" className="text-secondary text-decoration-none hover-white">Authenticity Guarantee</a>
            <a href="#" className="text-secondary text-decoration-none hover-white">Privacy & Ritual Terms</a>
            <a href="#" className="text-secondary text-decoration-none hover-white">Gem Certification Info</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
