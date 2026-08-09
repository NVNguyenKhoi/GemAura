import React, { useState } from "react";
import { Link, useNavigate, useSearchParams, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

export default function Navbar() {
  const { isAuthenticated, user, logout } = useAuth();
  const { cartItems } = useCart();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchVal, setSearchVal] = useState(searchParams.get("search") || "");

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchVal.trim()) {
      navigate(`/?search=${encodeURIComponent(searchVal.trim())}`);
    } else {
      navigate("/");
    }
  };

  const handleLogoutClick = () => {
    logout();
    navigate("/login");
  };

  // Helper to determine if path is active
  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="navbar navbar-expand-lg sticky-top luxury-navbar py-3 px-3 px-md-5">
      <div className="container-fluid d-flex justify-content-between align-items-center">
        {/* Brand Logo */}
        <Link to="/" className="navbar-brand d-flex align-items-center text-dark" style={{ letterSpacing: "0.15em", fontWeight: "700" }}>
          <i className="bi bi-gem me-2 text-warning" style={{ fontSize: "1.3rem" }}></i>
          <span className="font-editorial text-uppercase" style={{ fontSize: "1.4rem" }}>GemAura</span>
        </Link>

        {/* Search Bar - Desktop */}
        <form onSubmit={handleSearchSubmit} className="d-none d-lg-flex align-items-center bg-white border px-3 py-1.5" style={{ width: "300px", borderRadius: "0px" }}>
          <input
            type="text"
            placeholder="Search gems, elements..."
            className="border-0 bg-transparent text-sm w-100 outline-none"
            style={{ fontSize: "0.85rem", outline: "none" }}
            value={searchVal}
            onChange={(e) => setSearchVal(e.target.value)}
          />
          <button type="submit" className="btn p-0 border-0 text-secondary hover-gold">
            <i className="bi bi-search"></i>
          </button>
        </form>

        {/* Navigation Items (Home, Shop, Contact, Login/Profile) */}
        <div className="d-none d-lg-flex align-items-center gap-4 text-uppercase" style={{ fontSize: "0.8rem", letterSpacing: "0.15em", fontWeight: "600" }}>
          
          {/* Home Link */}
          <Link 
            to="/" 
            className="text-dark text-decoration-none py-1 transition-colors"
            style={{ 
              borderBottom: isActive("/") && !location.hash ? "2px solid var(--color-charcoal-black)" : "2px solid transparent",
              fontWeight: isActive("/") && !location.hash ? "700" : "600"
            }}
          >
            Home
          </Link>

          {/* Shop Link (scrolls to catalog) */}
          <a 
            href="#catalog-section"
            onClick={(e) => {
              e.preventDefault();
              navigate("/");
              setTimeout(() => {
                const el = document.getElementById("catalog-section");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }, 100);
            }}
            className="text-dark text-decoration-none py-1 transition-colors"
            style={{ 
              borderBottom: location.hash === "#catalog-section" ? "2px solid var(--color-charcoal-black)" : "2px solid transparent"
            }}
          >
            Shop
          </a>

          {/* Contact Link */}
          <Link 
            to="/contact" 
            className="text-dark text-decoration-none py-1 transition-colors"
            style={{ 
              borderBottom: isActive("/contact") ? "2px solid var(--color-charcoal-black)" : "2px solid transparent",
              fontWeight: isActive("/contact") ? "700" : "600"
            }}
          >
            Contact
          </Link>

          {/* Auth Link (Login / Profile) */}
          {isAuthenticated ? (
            <Link 
              to="/profile" 
              className="text-dark text-decoration-none py-1 transition-colors"
              style={{ 
                borderBottom: isActive("/profile") ? "2px solid var(--color-charcoal-black)" : "2px solid transparent",
                fontWeight: isActive("/profile") ? "700" : "600"
              }}
            >
              Profile ({user.name.split(" ")[0]})
            </Link>
          ) : (
            <Link 
              to="/login" 
              className="text-dark text-decoration-none py-1 transition-colors"
              style={{ 
                borderBottom: isActive("/login") ? "2px solid var(--color-charcoal-black)" : "2px solid transparent",
                fontWeight: isActive("/login") ? "700" : "600"
              }}
            >
              Login
            </Link>
          )}

          {/* Cart Icon */}
          <Link to="/cart" className="text-dark text-decoration-none position-relative py-2 ms-2">
            <i className="bi bi-bag" style={{ fontSize: "1.2rem" }}></i>
            {cartCount > 0 && (
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-circle bg-dark text-white" style={{ fontSize: "0.6rem", padding: "0.3em 0.5em" }}>
                {cartCount}
              </span>
            )}
          </Link>

          {/* Logout Button if authenticated */}
          {isAuthenticated && (
            <button
              onClick={handleLogoutClick}
              className="btn p-0 border-0 text-secondary hover-gold cursor-pointer ms-2"
              title="Sign Out"
            >
              <i className="bi bi-box-arrow-right" style={{ fontSize: "1.1rem" }}></i>
            </button>
          )}
        </div>

        {/* Mobile Control Buttons */}
        <div className="d-flex d-lg-none align-items-center gap-3">
          <Link to="/cart" className="text-dark text-decoration-none position-relative">
            <i className="bi bi-bag" style={{ fontSize: "1.3rem" }}></i>
            {cartCount > 0 && (
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-circle bg-dark text-white" style={{ fontSize: "0.55rem", padding: "0.3em 0.5em" }}>
                {cartCount}
              </span>
            )}
          </Link>
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="btn p-0 border-0 text-dark">
            <i className={`bi ${mobileMenuOpen ? 'bi-x' : 'bi-list'}`} style={{ fontSize: "1.6rem" }}></i>
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="w-100 bg-white border-top mt-3 py-4 px-3 d-flex flex-column gap-3 d-lg-none">
          <form onSubmit={handleSearchSubmit} className="d-flex align-items-center bg-light border px-3 py-2">
            <input
              type="text"
              placeholder="Search gems..."
              className="border-0 bg-transparent w-100 outline-none"
              style={{ fontSize: "0.85rem" }}
              value={searchVal}
              onChange={(e) => setSearchVal(e.target.value)}
            />
            <button type="submit" className="btn p-0 border-0 text-secondary">
              <i className="bi bi-search"></i>
            </button>
          </form>

          <div className="d-flex flex-column gap-3 text-uppercase font-semibold" style={{ fontSize: "0.85rem", letterSpacing: "0.1em" }}>
            <Link to="/" onClick={() => setMobileMenuOpen(false)} className="text-dark text-decoration-none">
              Home
            </Link>
            <a 
              href="#catalog-section" 
              onClick={(e) => {
                e.preventDefault();
                setMobileMenuOpen(false);
                navigate("/");
                setTimeout(() => {
                  const el = document.getElementById("catalog-section");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }, 100);
              }} 
              className="text-dark text-decoration-none"
            >
              Shop
            </a>
            <Link to="/contact" onClick={() => setMobileMenuOpen(false)} className="text-dark text-decoration-none">
              Contact
            </Link>
            {isAuthenticated ? (
              <>
                <Link to="/profile" onClick={() => setMobileMenuOpen(false)} className="text-dark text-decoration-none">
                  Profile ({user.name})
                </Link>
                <button
                  onClick={() => {
                    handleLogoutClick();
                    setMobileMenuOpen(false);
                  }}
                  className="btn btn-outline-dark rounded-0 text-start py-2 text-uppercase"
                  style={{ fontSize: "0.75rem", letterSpacing: "0.1em" }}
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="btn btn-dark rounded-0 text-center py-2 text-uppercase text-white"
                style={{ fontSize: "0.75rem", letterSpacing: "0.1em" }}
              >
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
