import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useWishlist } from "../context/WishlistContext";
import { Link } from "react-router-dom";

export default function Profile() {
  const { user, updateProfile, orders, recentlyViewed, logout } = useAuth();
  const { wishlistItems, removeFromWishlist } = useWishlist();

  const [activeTab, setActiveTab] = useState("settings"); // settings | orders | wishlist | viewed
  const [formData, setFormData] = useState({
    name: user.name || "",
    email: user.email || "",
    phone: user.phone || "",
    address: user.address || "",
    billingAddress: user.billingAddress || "",
  });

  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateProfile(formData);
    setSuccess(true);
    setTimeout(() => setSuccess(false), 4000);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="container py-5">
      
      {/* Upper header */}
      <div className="bg-white border p-4 d-flex flex-column flex-md-row justify-content-between align-items-center gap-4 mb-4">
        <div className="d-flex align-items-center gap-3">
          <div className="rounded-circle border border-warning d-flex align-items-center justify-content-center text-white bg-dark" style={{ width: "60px", height: "60px", fontSize: "1.4rem", fontWeight: "700" }}>
            {user.name.charAt(0)}
          </div>
          <div>
            <h2 className="font-editorial text-uppercase text-dark mb-1" style={{ fontSize: "1.5rem" }}>
              {user.name}
            </h2>
            <div className="d-flex align-items-center gap-1.5 text-secondary" style={{ fontSize: "0.75rem", letterSpacing: "0.05em" }}>
              <i className="bi bi-patch-check text-warning"></i>
              <span>ACTIVE GUILD MEMBER</span>
            </div>
          </div>
        </div>

        {/* Tab Selection */}
        <div className="d-flex flex-wrap border bg-light p-1">
          <button
            onClick={() => setActiveTab("settings")}
            className={`btn rounded-0 text-uppercase tracking-wider py-2 px-3 ${activeTab === "settings" ? "btn-dark text-white" : "btn-light text-secondary border-0"}`}
            style={{ fontSize: "0.7rem", fontWeight: "600" }}
          >
            Settings
          </button>
          <button
            onClick={() => setActiveTab("orders")}
            className={`btn rounded-0 text-uppercase tracking-wider py-2 px-3 ${activeTab === "orders" ? "btn-dark text-white" : "btn-light text-secondary border-0"}`}
            style={{ fontSize: "0.7rem", fontWeight: "600" }}
          >
            Orders ({orders.length})
          </button>
          <button
            onClick={() => setActiveTab("wishlist")}
            className={`btn rounded-0 text-uppercase tracking-wider py-2 px-3 ${activeTab === "wishlist" ? "btn-dark text-white" : "btn-light text-secondary border-0"}`}
            style={{ fontSize: "0.7rem", fontWeight: "600" }}
          >
            Wishlist ({wishlistItems.length})
          </button>
          <button
            onClick={() => setActiveTab("viewed")}
            className={`btn rounded-0 text-uppercase tracking-wider py-2 px-3 ${activeTab === "viewed" ? "btn-dark text-white" : "btn-light text-secondary border-0"}`}
            style={{ fontSize: "0.7rem", fontWeight: "600" }}
          >
            Recent viewed
          </button>
        </div>
      </div>

      {/* Main Panel */}
      <div className="bg-white border p-4 p-md-5">
        
        {activeTab === "settings" && (
          <div style={{ maxWidth: "700px", margin: "0 auto" }}>
            <h3 className="font-editorial text-uppercase text-dark mb-2">Aura Member Profile</h3>
            <p className="text-secondary mb-4" style={{ fontSize: "0.85rem" }}>
              Update default delivery information to guarantee smooth certification delivery and packaging.
            </p>

            {success && (
              <div className="alert alert-success rounded-0 mb-4" style={{ fontSize: "0.8rem" }}>
                ✓ Profile successfully updated. Changes persisted in local registry.
              </div>
            )}

            <form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
              <div className="row g-3">
                <div className="col-12 col-md-6">
                  <label className="form-label text-uppercase text-secondary tracking-wider" style={{ fontSize: "0.65rem", fontWeight: "600" }}>Full Name</label>
                  <input
                    type="text"
                    name="name"
                    className="form-control rounded-0 gemaura-input"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="col-12 col-md-6">
                  <label className="form-label text-uppercase text-secondary tracking-wider" style={{ fontSize: "0.65rem", fontWeight: "600" }}>Account Email</label>
                  <input
                    type="email"
                    name="email"
                    className="form-control rounded-0 gemaura-input bg-light"
                    value={formData.email}
                    disabled
                  />
                </div>

                <div className="col-12 col-md-6">
                  <label className="form-label text-uppercase text-secondary tracking-wider" style={{ fontSize: "0.65rem", fontWeight: "600" }}>Contact Phone</label>
                  <input
                    type="text"
                    name="phone"
                    className="form-control rounded-0 gemaura-input"
                    value={formData.phone}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div>
                <label className="form-label text-uppercase text-secondary tracking-wider" style={{ fontSize: "0.65rem", fontWeight: "600" }}>Shipping Destination Address</label>
                <textarea
                  name="address"
                  rows="3"
                  className="form-control rounded-0 gemaura-input"
                  value={formData.address}
                  onChange={handleInputChange}
                ></textarea>
              </div>

              <div>
                <div className="d-flex justify-content-between">
                  <label className="form-label text-uppercase text-secondary tracking-wider" style={{ fontSize: "0.65rem", fontWeight: "600" }}>Billing Address</label>
                  <button
                    type="button"
                    onClick={() => setFormData((prev) => ({ ...prev, billingAddress: prev.address }))}
                    className="btn btn-link p-0 text-warning text-decoration-none"
                    style={{ fontSize: "0.7rem", fontWeight: "600" }}
                  >
                    Same as Shipping
                  </button>
                </div>
                <textarea
                  name="billingAddress"
                  rows="3"
                  className="form-control rounded-0 gemaura-input"
                  value={formData.billingAddress}
                  onChange={handleInputChange}
                ></textarea>
              </div>

              <div className="d-flex justify-content-between align-items-center mt-3">
                <button
                  type="submit"
                  className="btn btn-gemaura"
                >
                  Save Profile Settings
                </button>
                <button
                  type="button"
                  onClick={logout}
                  className="btn btn-outline-danger rounded-0"
                  style={{ fontSize: "0.8rem", letterSpacing: "0.05em" }}
                >
                  LOGOUT
                </button>
              </div>
            </form>
          </div>
        )}

        {activeTab === "orders" && (
          <div>
            <h3 className="font-editorial text-uppercase text-dark mb-2">Acquisition History Logs</h3>
            <p className="text-secondary mb-4" style={{ fontSize: "0.85rem" }}>
              Review the shipping and preparation stages of your orders.
            </p>

            {orders.length === 0 ? (
              <div className="text-center py-5 border bg-light">
                <i className="bi bi-journal-text text-muted display-5 mb-2 d-block"></i>
                <span className="text-secondary" style={{ fontSize: "0.85rem" }}>No orders placed under this account.</span>
              </div>
            ) : (
              <div className="table-responsive">
                <table className="table table-bordered align-middle" style={{ fontSize: "0.85rem" }}>
                  <thead className="table-light text-uppercase tracking-wider" style={{ fontSize: "0.7rem" }}>
                    <tr>
                      <th>Order ID</th>
                      <th>Date</th>
                      <th>Acquired Items</th>
                      <th className="text-end">Grand Total</th>
                      <th className="text-center">Order Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order) => (
                      <tr key={order.id}>
                        <td className="font-bold text-dark">{order.id}</td>
                        <td className="text-secondary">{order.date}</td>
                        <td>
                          {order.items.map((item, idx) => (
                            <div key={idx}>
                              {item.name} <span className="text-secondary">x{item.qty || item.quantity}</span>
                            </div>
                          ))}
                        </td>
                        <td className="text-end font-bold">${order.total}</td>
                        <td className="text-center">
                          <span className={`badge ${order.status === 'Shipped' || order.status === 'Delivered' ? 'bg-success' : 'bg-warning text-dark'}`}>
                            {order.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {activeTab === "wishlist" && (
          <div>
            <h3 className="font-editorial text-uppercase text-dark mb-2">Your Saved Wishlist</h3>
            <p className="text-secondary mb-4" style={{ fontSize: "0.85rem" }}>
              Gemstones that resonate with your inner flow. Add to your bag to acquire them.
            </p>

            {wishlistItems.length === 0 ? (
              <div className="text-center py-5 border bg-light">
                <i className="bi bi-heart text-muted display-5 mb-2 d-block"></i>
                <span className="text-secondary" style={{ fontSize: "0.85rem" }}>No items saved in wishlist.</span>
              </div>
            ) : (
              <div className="row g-3">
                {wishlistItems.map((item) => (
                  <div key={item.id} className="col-12 col-md-4">
                    <div className="border p-3 d-flex align-items-center gap-3">
                      <img src={item.image} alt={item.name} style={{ width: "60px", height: "60px", objectFit: "cover" }} />
                      <div className="flex-grow-1 min-w-0">
                        <h5 className="font-editorial text-dark text-truncate mb-1" style={{ fontSize: "1rem" }}>{item.name}</h5>
                        <span className="text-secondary d-block" style={{ fontSize: "0.8rem" }}>${item.price}</span>
                      </div>
                      <button onClick={() => removeFromWishlist(item.id)} className="btn btn-sm btn-outline-danger rounded-0">
                        <i className="bi bi-trash"></i>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === "viewed" && (
          <div>
            <h3 className="font-editorial text-uppercase text-dark mb-2">Recently Viewed Gems</h3>
            <p className="text-secondary mb-4" style={{ fontSize: "0.85rem" }}>
              Explore pieces you previously inspected.
            </p>

            {recentlyViewed.length === 0 ? (
              <div className="text-center py-5 border bg-light">
                <i className="bi bi-eye text-muted display-5 mb-2 d-block"></i>
                <span className="text-secondary" style={{ fontSize: "0.85rem" }}>No stones viewed in this session.</span>
              </div>
            ) : (
              <div className="row g-3">
                {recentlyViewed.map((item) => (
                  <div key={item.id} className="col-12 col-md-4">
                    <div className="border p-3 d-flex align-items-center gap-3">
                      <img src={item.image} alt={item.name} style={{ width: "60px", height: "60px", objectFit: "cover" }} />
                      <div className="flex-grow-1 min-w-0">
                        <h5 className="font-editorial text-dark text-truncate mb-1" style={{ fontSize: "1rem" }}>{item.name}</h5>
                        <span className="text-secondary d-block" style={{ fontSize: "0.8rem" }}>${item.price}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

      </div>

    </div>
  );
}
