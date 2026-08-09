import React, { useState } from "react";
import { productsData } from "../data/products";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    stoneInquiry: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  const validate = () => {
    const tempErrors = {};
    if (!formData.name.trim()) tempErrors.name = "Full name is required";
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      tempErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      tempErrors.email = "Invalid email format";
    }

    if (!formData.message.trim()) tempErrors.message = "Message cannot be empty";

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      // Save message in LocalStorage
      const savedMessages = localStorage.getItem("gemaura_messages");
      const messages = savedMessages ? JSON.parse(savedMessages) : [];
      const newMsg = {
        ...formData,
        id: Date.now(),
        date: new Date().toISOString()
      };
      localStorage.setItem("gemaura_messages", JSON.stringify([...messages, newMsg]));

      setSuccess(true);
      setFormData({
        name: "",
        email: "",
        stoneInquiry: "",
        message: "",
      });
      setErrors({});
      setTimeout(() => setSuccess(false), 5000);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="container py-5">
      
      {/* Page Header */}
      <div className="text-center mb-5 mt-3">
        <span className="text-uppercase text-secondary tracking-widest" style={{ fontSize: "0.75rem" }}>
          Contact Our Salon
        </span>
        <h1 className="font-editorial text-uppercase text-dark mt-2 display-5">
          GemAura Concierge Desk
        </h1>
        <div className="mx-auto bg-warning mt-2" style={{ height: "1px", width: "80px" }}></div>
      </div>

      <div className="row g-5 mb-5 justify-content-between">
        
        {/* Support details */}
        <div className="col-12 col-lg-4 d-flex flex-column gap-4">
          
          <div className="p-4 border bg-white rounded-0 d-flex gap-3 align-items-start">
            <div className="bg-light p-2 text-warning d-flex align-items-center justify-content-center" style={{ width: "40px", height: "40px" }}>
              <i className="bi bi-geo-alt" style={{ fontSize: "1.2rem" }}></i>
            </div>
            <div>
              <h4 className="font-editorial text-uppercase text-dark mb-1" style={{ fontSize: "1.1rem" }}>FLAGSHIP SALON</h4>
              <p className="text-secondary mb-0" style={{ fontSize: "0.85rem", lineHeight: "1.5" }}>
                742 Lapis Lazuli Way, Emerald Hills, CA 90210
              </p>
            </div>
          </div>

          <div className="p-4 border bg-white rounded-0 d-flex gap-3 align-items-start">
            <div className="bg-light p-2 text-warning d-flex align-items-center justify-content-center" style={{ width: "40px", height: "40px" }}>
              <i className="bi bi-telephone" style={{ fontSize: "1.2rem" }}></i>
            </div>
            <div>
              <h4 className="font-editorial text-uppercase text-dark mb-1" style={{ fontSize: "1.1rem" }}>CONCIERGE DESK</h4>
              <p className="text-secondary mb-0" style={{ fontSize: "0.85rem", lineHeight: "1.5" }}>
                Hotline: +1 (555) 839-2001<br />
                Toll Free: 1-800-GEMAURA (10 AM - 6 PM PST)
              </p>
            </div>
          </div>

          <div className="p-4 border bg-white rounded-0 d-flex gap-3 align-items-start">
            <div className="bg-light p-2 text-warning d-flex align-items-center justify-content-center" style={{ width: "40px", height: "40px" }}>
              <i className="bi bi-envelope" style={{ fontSize: "1.2rem" }}></i>
            </div>
            <div>
              <h4 className="font-editorial text-uppercase text-dark mb-1" style={{ fontSize: "1.1rem" }}>GENERAL & PRIVATE</h4>
              <p className="text-secondary mb-0" style={{ fontSize: "0.85rem", lineHeight: "1.5" }}>
                Client Relations: concierge@gemaura.com<br />
                Certifications: certificates@gemaura.com
              </p>
            </div>
          </div>

          <div className="p-4 border bg-white rounded-0 d-flex gap-3 align-items-start">
            <div className="bg-light p-2 text-warning d-flex align-items-center justify-content-center" style={{ width: "40px", height: "40px" }}>
              <i className="bi bi-clock" style={{ fontSize: "1.2rem" }}></i>
            </div>
            <div>
              <h4 className="font-editorial text-uppercase text-dark mb-1" style={{ fontSize: "1.1rem" }}>SALON OPERATION</h4>
              <p className="text-secondary mb-0" style={{ fontSize: "0.85rem", lineHeight: "1.5" }}>
                Monday - Sunday: 10:00 AM - 8:00 PM PST<br />
                Ritual Consultations: By Private Booking only.
              </p>
            </div>
          </div>

        </div>

        {/* Form Column */}
        <div className="col-12 col-lg-7">
          <div className="p-4 p-md-5 border bg-white rounded-0">
            <h3 className="font-editorial text-uppercase mb-2 text-dark">Send Salon Inquiry</h3>
            <p className="text-secondary mb-4" style={{ fontSize: "0.85rem" }}>
              Request custom wrist string resizing, private element consultation bookings, or specific gemstone certification copies.
            </p>

            {success && (
              <div className="alert alert-success rounded-0 mb-4 d-flex align-items-center gap-2" style={{ fontSize: "0.85rem" }}>
                <i className="bi bi-check-circle-fill"></i>
                <span>Inquiry saved successfully! Our boutique assistants will get in touch within 24 hours.</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
              <div className="row g-3">
                <div className="col-12 col-md-6">
                  <label className="form-label text-uppercase text-secondary tracking-wider" style={{ fontSize: "0.65rem", fontWeight: "600" }}>Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    placeholder="e.g. Aurelia Sterling"
                    className={`form-control rounded-0 gemaura-input ${errors.name ? 'is-invalid' : ''}`}
                    value={formData.name}
                    onChange={handleInputChange}
                  />
                  {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                </div>

                <div className="col-12 col-md-6">
                  <label className="form-label text-uppercase text-secondary tracking-wider" style={{ fontSize: "0.65rem", fontWeight: "600" }}>Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="e.g. client@domain.com"
                    className={`form-control rounded-0 gemaura-input ${errors.email ? 'is-invalid' : ''}`}
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                  {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                </div>
              </div>

              <div>
                <label className="form-label text-uppercase text-secondary tracking-wider" style={{ fontSize: "0.65rem", fontWeight: "600" }}>Stone or Element Interest (optional)</label>
                <select
                  name="stoneInquiry"
                  className="form-select rounded-0 gemaura-input"
                  style={{ cursor: "pointer" }}
                  value={formData.stoneInquiry}
                  onChange={handleInputChange}
                >
                  <option value="">-- Choose General or Specific Gem --</option>
                  {productsData.map((p) => (
                    <option key={p.id} value={p.name}>
                      [{p.element}] {p.name} - ${p.price}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="form-label text-uppercase text-secondary tracking-wider" style={{ fontSize: "0.65rem", fontWeight: "600" }}>Detailed Message *</label>
                <textarea
                  name="message"
                  rows="4"
                  placeholder="Specify gemstone length customizations or element inquiries..."
                  className={`form-control rounded-0 gemaura-input ${errors.message ? 'is-invalid' : ''}`}
                  value={formData.message}
                  onChange={handleInputChange}
                ></textarea>
                {errors.message && <div className="invalid-feedback">{errors.message}</div>}
              </div>

              <button
                type="submit"
                className="btn btn-gemaura mt-3"
              >
                Send Inquiry
              </button>
            </form>
          </div>
        </div>

      </div>

      {/* Showroom Interactive Map Placeholder */}
      <div className="w-100 mt-5 border p-2 bg-white">
        <div className="bg-light" style={{ height: "350px", overflow: "hidden" }}>
          <iframe
            title="GemAura HCMC Flagship Location Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.4241674409363!2d106.69741537480499!3d10.778794389370126!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752928589c316f%3A0x7d9796e6d1e44f8f!2zTmjDoCBo4bqndSBHcmFuZCBDaGVm!5e0!3m2!1sen!2s!4v1700000000000!5m2!1sen!2s"
            width="100%"
            height="100%"
            style={{ border: 0, filter: "grayscale(100%) contrast(90%) brightness(100%)" }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>

    </div>
  );
}
