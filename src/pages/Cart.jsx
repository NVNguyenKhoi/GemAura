import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

export default function Cart() {
  const { cartItems, updateQuantity, removeFromCart, clearCart, applyCouponCode, removeCoupon, appliedCoupon, subtotal, discount, shippingCost, tax, total } = useCart();
  const { isAuthenticated, addOrder } = useAuth();
  const navigate = useNavigate();

  const [couponCode, setCouponCode] = useState("");
  const [couponError, setCouponError] = useState("");
  const [couponSuccess, setCouponSuccess] = useState("");

  const [checkoutStep, setCheckoutStep] = useState("cart"); // cart | payment | success
  
  // Payment methods: 'card' | 'vietqr' | 'momo' | 'paypal'
  const [paymentMethod, setPaymentMethod] = useState("card");

  const [paymentData, setPaymentData] = useState({
    cardName: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
  });
  const [paymentErrors, setPaymentErrors] = useState({});
  const [recentOrderId, setRecentOrderId] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  // Live Shipping Simulation States
  const [shippingProgress, setShippingProgress] = useState(0); // 0 to 100%
  const [shippingStage, setShippingStage] = useState("preparing"); // preparing | picked_up | shipping | arrived
  const [eta, setEta] = useState(45); // countdown in seconds

  // Handle countdown and progress simulation
  useEffect(() => {
    if (checkoutStep !== "success") return;

    // Reset simulator values
    setShippingProgress(0);
    setShippingStage("preparing");
    setEta(45);

    // Stages timeline: 
    // 0s - 8s: preparing (0% to 15%)
    // 8s - 15s: picked_up (15% to 35%)
    // 15s - 40s: shipping (35% to 90%)
    // 40s+: arrived (100%)
    const interval = setInterval(() => {
      setEta((prevEta) => {
        if (prevEta <= 1) {
          clearInterval(interval);
          setShippingStage("arrived");
          setShippingProgress(100);
          return 0;
        }
        
        const nextEta = prevEta - 1;
        const elapsedTime = 45 - nextEta;

        // Calculate progress percentage and stage
        if (elapsedTime < 8) {
          setShippingStage("preparing");
          setShippingProgress(Math.round((elapsedTime / 8) * 15));
        } else if (elapsedTime < 15) {
          setShippingStage("picked_up");
          setShippingProgress(15 + Math.round(((elapsedTime - 8) / 7) * 20));
        } else if (elapsedTime < 42) {
          setShippingStage("shipping");
          setShippingProgress(35 + Math.round(((elapsedTime - 15) / 27) * 55));
        } else {
          setShippingStage("arrived");
          setShippingProgress(100);
        }

        return nextEta;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [checkoutStep]);

  const handleCouponSubmit = (e) => {
    e.preventDefault();
    setCouponError("");
    setCouponSuccess("");

    if (!couponCode.trim()) return;

    const res = applyCouponCode(couponCode);
    if (res.success) {
      setCouponSuccess(res.message);
      setCouponCode("");
    } else {
      setCouponError(res.message);
    }
  };

  const handleCheckoutClick = () => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    const tempId = `GEM-${Math.floor(1000 + Math.random() * 9000)}`;
    setRecentOrderId(tempId);
    setCheckoutStep("payment");
  };

  const validatePayment = () => {
    if (paymentMethod !== "card") return true;

    const errs = {};
    if (!paymentData.cardName.trim()) errs.cardName = "Cardholder name is required";
    
    const cardRegex = /^\d{16}$/;
    if (!cardRegex.test(paymentData.cardNumber.replace(/\s+/g, ""))) {
      errs.cardNumber = "Valid 16-digit card number is required";
    }

    const expiryRegex = /^(0[1-9]|1[0-2])\/?([0-9]{2})$/;
    if (!expiryRegex.test(paymentData.expiry)) {
      errs.expiry = "MM/YY expiry format required";
    }

    const cvvRegex = /^\d{3}$/;
    if (!cvvRegex.test(paymentData.cvv)) {
      errs.cvv = "3-digit CVV required";
    }

    setPaymentErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    if (validatePayment()) {
      setIsProcessing(true);
      
      setTimeout(() => {
        const orderItems = cartItems.map(item => ({
          id: item.id,
          name: item.name,
          qty: item.quantity,
          price: item.price
        }));
        
        addOrder(orderItems, total);
        setIsProcessing(false);
        clearCart();
        setCheckoutStep("success");
      }, 2000);
    }
  };

  const handlePaymentInputChange = (e) => {
    const { name, value } = e.target;
    setPaymentData((prev) => ({ ...prev, [name]: value }));
  };

  const exchangeRate = 25000;
  const totalInVND = total * exchangeRate;

  const bankId = "vietinbank";
  const accountNumber = "113366668888";
  const accountName = "GEMAURA JEWELRY";
  const vietQrUrl = `https://img.vietqr.io/image/${bankId}-${accountNumber}-compact2.png?amount=${totalInVND}&addInfo=${recentOrderId}&accountName=${encodeURIComponent(accountName)}`;

  // SVG Coordinates for the live shipping courier bike animation path
  // Start: (40, 180) -> Mid 1: (150, 180) -> Mid 2: (150, 60) -> End: (360, 60)
  const getBikeX = () => {
    const p = shippingProgress / 100;
    if (p < 0.35) {
      // Segment 1: horizontal
      return 40 + (p / 0.35) * 110;
    } else if (p < 0.65) {
      // Segment 2: vertical
      return 150;
    } else {
      // Segment 3: horizontal
      return 150 + ((p - 0.65) / 0.35) * 210;
    }
  };

  const getBikeY = () => {
    const p = shippingProgress / 100;
    if (p < 0.35) {
      return 180;
    } else if (p < 0.65) {
      // Segment 2: vertical
      return 180 - ((p - 0.35) / 0.30) * 120;
    } else {
      return 60;
    }
  };

  if (checkoutStep === "success") {
    return (
      <div className="container py-5">
        <div className="row g-4 justify-content-center">
          <div className="col-12 col-lg-8">
            <div className="bg-white border p-4 p-md-5 text-center">
              
              {/* Stepper Progress Header */}
              <div className="rounded-circle border border-success d-flex align-items-center justify-content-center text-success bg-light mx-auto mb-3" style={{ width: "60px", height: "60px", fontSize: "2rem" }}>
                <i className={`bi ${shippingStage === 'arrived' ? 'bi-check-all' : 'bi-bicycle text-warning animate-pulse'}`}></i>
              </div>
              <h2 className="font-editorial text-uppercase text-dark mb-1">
                {shippingStage === "arrived" ? "Order Delivered Successfully!" : "Grab Express Shipping Active"}
              </h2>
              <p className="text-secondary text-uppercase tracking-wider" style={{ fontSize: "0.7rem" }}>
                Order Ref: <span className="font-monospace text-dark font-bold">{recentOrderId}</span>
              </p>

              {/* LIVE MAP TRACKING BOX (SVG ROAD SYSTEM AND MOCK DRIVER) */}
              <div className="border bg-dark my-4 p-3 position-relative overflow-hidden" style={{ height: "240px" }}>
                {/* Background Grid Roads */}
                <svg className="w-100 h-100" style={{ opacity: 0.85 }}>
                  {/* Road Lines */}
                  <line x1="40" y1="180" x2="150" y2="180" stroke="#444" strokeWidth="18" strokeLinecap="round" />
                  <line x1="150" y1="180" x2="150" y2="60" stroke="#444" strokeWidth="18" strokeLinecap="round" />
                  <line x1="150" y1="60" x2="360" y2="60" stroke="#444" strokeWidth="18" strokeLinecap="round" />
                  
                  {/* Road Center dashes */}
                  <line x1="40" y1="180" x2="150" y2="180" stroke="#fff" strokeWidth="2" strokeDasharray="6,6" />
                  <line x1="150" y1="180" x2="150" y2="60" stroke="#fff" strokeWidth="2" strokeDasharray="6,6" />
                  <line x1="150" y1="60" x2="360" y2="60" stroke="#fff" strokeWidth="2" strokeDasharray="6,6" />

                  {/* Start Point Pin (GemAura Vault) */}
                  <circle cx="40" cy="180" r="10" fill="var(--color-luxury-gold)" />
                  <text x="35" y="210" fill="#FDFBF7" fontSize="10" className="font-sans font-bold">GEM VAULT</text>

                  {/* End Point Pin (Client Home) */}
                  <circle cx="360" cy="60" r="10" fill="#198754" />
                  <text x="325" y="40" fill="#FDFBF7" fontSize="10" className="font-sans font-bold">YOUR HOME</text>

                  {/* Dynamic Courier Grab Rider Icon */}
                  {shippingStage !== "arrived" && (
                    <g transform={`translate(${getBikeX() - 12}, ${getBikeY() - 25})`}>
                      <circle cx="12" cy="12" r="14" fill="#198754" stroke="#fff" strokeWidth="1" />
                      {/* Courier Bike Icon */}
                      <text x="5" y="18" fill="#fff" fontSize="14">🏍️</text>
                    </g>
                  )}
                </svg>

                {/* Arrived Celebration Banner */}
                {shippingStage === "arrived" && (
                  <div className="position-absolute top-50 start-50 translate-middle bg-success text-white px-4 py-3 shadow-lg border" style={{ zIndex: 10 }}>
                    <h5 className="font-editorial text-uppercase mb-1" style={{ fontSize: "1.1rem" }}>Courier Arrived!</h5>
                    <span style={{ fontSize: "0.75rem" }}>Your GIA Certified gemstones have been securely delivered.</span>
                  </div>
                )}
              </div>

              {/* DRIVER AND DELIVERY STATUS TIMELINE */}
              <div className="row g-3 text-start mb-4">
                <div className="col-12 col-md-6 border-end">
                  <span className="text-uppercase text-secondary d-block tracking-wider mb-2" style={{ fontSize: "0.65rem", fontWeight: "600" }}>
                    Live Delivery Status
                  </span>
                  
                  {/* Status Stages Steps */}
                  <div className="d-flex flex-column gap-2" style={{ fontSize: "0.8rem" }}>
                    <div className="d-flex align-items-center gap-2">
                      <i className={`bi ${shippingProgress >= 10 ? 'bi-check-circle-fill text-success' : 'bi-circle text-muted'}`}></i>
                      <span className={shippingStage === 'preparing' ? 'font-bold text-dark' : 'text-secondary'}>Preparing premium order packaging</span>
                    </div>
                    <div className="d-flex align-items-center gap-2">
                      <i className={`bi ${shippingProgress >= 35 ? 'bi-check-circle-fill text-success' : 'bi-circle text-muted'}`}></i>
                      <span className={shippingStage === 'picked_up' ? 'font-bold text-dark' : 'text-secondary'}>Grab Rider picked up from GemAura Salon</span>
                    </div>
                    <div className="d-flex align-items-center gap-2">
                      <i className={`bi ${shippingProgress >= 85 ? 'bi-check-circle-fill text-success' : 'bi-circle text-muted'}`}></i>
                      <span className={shippingStage === 'shipping' ? 'font-bold text-dark' : 'text-secondary'}>Courier shipping package to your destination</span>
                    </div>
                    <div className="d-flex align-items-center gap-2">
                      <i className={`bi ${shippingStage === 'arrived' ? 'bi-check-circle-fill text-success' : 'bi-circle text-muted'}`}></i>
                      <span className={shippingStage === 'arrived' ? 'font-bold text-success' : 'text-secondary'}>Delivered to your hands</span>
                    </div>
                  </div>
                </div>

                <div className="col-12 col-md-6 ps-md-4">
                  <span className="text-uppercase text-secondary d-block tracking-wider mb-2" style={{ fontSize: "0.65rem", fontWeight: "600" }}>
                    Courier Details
                  </span>
                  <div className="d-flex align-items-center gap-3">
                    {/* Grab Driver Avatar */}
                    <div className="rounded-circle bg-light border d-flex align-items-center justify-content-center text-secondary" style={{ width: "50px", height: "50px", fontSize: "1.5rem" }}>
                      <i className="bi bi-person-badge"></i>
                    </div>
                    <div style={{ fontSize: "0.8rem", lineHeight: "1.4" }}>
                      <strong className="text-dark d-block">Nguyen Quoc Huy (GrabExpress)</strong>
                      <span className="text-secondary d-block">License: 59-X3 982.71</span>
                      <span className="text-success d-block"><i className="bi bi-star-fill text-warning me-1"></i> 5.0 Rating</span>
                    </div>
                  </div>

                  <div className="mt-3 p-2 bg-light border text-center">
                    <span className="text-secondary text-uppercase d-block" style={{ fontSize: "0.6rem" }}>ESTIMATED COURIER ARRIVAL</span>
                    <strong className="text-dark font-monospace" style={{ fontSize: "1.3rem" }}>
                      {shippingStage === "arrived" ? "ARRIVED" : `${Math.floor(eta / 60)}m ${eta % 60}s`}
                    </strong>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="d-flex gap-3 justify-content-center border-top pt-4">
                <Link to="/profile" className="btn btn-outline-dark rounded-0 px-4 py-2" style={{ fontSize: "0.8rem", letterSpacing: "0.05em" }}>
                  View All Orders
                </Link>
                <Link to="/" className="btn btn-dark rounded-0 px-4 py-2" style={{ fontSize: "0.8rem", letterSpacing: "0.05em" }}>
                  Return to Home
                </Link>
              </div>

            </div>
          </div>
        </div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="container py-5 text-center d-flex flex-column align-items-center justify-content-center" style={{ minHeight: "65vh" }}>
        <i className="bi bi-bag text-muted display-3 mb-3"></i>
        <h2 className="font-editorial text-uppercase text-dark">Your Shopping Bag is Vacant</h2>
        <p className="text-secondary text-uppercase tracking-wider mb-4" style={{ fontSize: "0.75rem" }}>
          No premium gemstones or bracelets have been added to your order staging.
        </p>
        <Link to="/" className="btn btn-dark rounded-0 px-5 py-2.5" style={{ fontSize: "0.8rem", letterSpacing: "0.05em" }}>
          Explore Collections
        </Link>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <div className="text-center mb-5 mt-3">
        <span className="text-uppercase text-secondary tracking-widest" style={{ fontSize: "0.75rem" }}>
          Sacred Inventory
        </span>
        <h2 className="font-editorial text-uppercase text-dark mt-2 display-5">
          {checkoutStep === "payment" ? "Secure Payment Gateway" : "Your Shopping Bag"}
        </h2>
        <div className="mx-auto bg-warning mt-2" style={{ height: "1px", width: "80px" }}></div>
      </div>

      {checkoutStep === "cart" ? (
        <div className="row g-4 justify-content-between">
          {/* Cart List */}
          <div className="col-12 col-lg-8 d-flex flex-column gap-3">
            {cartItems.map((item) => (
              <div key={item.id} className="border p-4 bg-white d-flex flex-column flex-sm-row align-items-center gap-4 justify-content-between">
                <div className="d-flex align-items-center gap-3 flex-grow-1 min-w-0">
                  <img src={item.image} alt={item.name} className="object-cover" style={{ width: "80px", height: "80px" }} />
                  <div className="min-w-0">
                    <h4 className="font-editorial text-dark mb-1 text-truncate" style={{ fontSize: "1.2rem" }}>{item.name}</h4>
                    <div className="d-flex gap-2">
                      <span className="badge bg-light text-secondary border uppercase" style={{ fontSize: "0.6rem" }}>{item.element}</span>
                      <span className="badge bg-light text-secondary border uppercase" style={{ fontSize: "0.6rem" }}>{item.category}</span>
                    </div>
                  </div>
                </div>

                <div className="d-flex align-items-center justify-content-between justify-content-sm-end gap-4 w-100 w-sm-auto">
                  {/* Quantity selector */}
                  <div className="d-flex align-items-center bg-light border p-1">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="btn btn-sm p-1 text-secondary"
                      disabled={item.quantity <= 1}
                    >
                      <i className="bi bi-dash"></i>
                    </button>
                    <span className="px-3 font-monospace" style={{ fontSize: "0.85rem" }}>{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="btn btn-sm p-1 text-secondary"
                    >
                      <i className="bi bi-plus"></i>
                    </button>
                  </div>

                  {/* Price */}
                  <div className="text-end">
                    <span className="text-secondary d-block" style={{ fontSize: "0.65rem" }}>SUBTOTAL</span>
                    <span className="font-editorial text-dark font-bold" style={{ fontSize: "1.1rem" }}>
                      ${item.price * item.quantity}
                    </span>
                  </div>

                  {/* Remove */}
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="btn btn-outline-danger border-0 rounded-0"
                  >
                    <i className="bi bi-trash"></i>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Invoice Spec Panel */}
          <div className="col-12 col-lg-4">
            <div className="border p-4 bg-white d-flex flex-column gap-4">
              <h3 className="font-editorial text-uppercase text-dark mb-0" style={{ fontSize: "1.3rem" }}>Invoice Specifications</h3>
              
              {/* Coupon inputs */}
              <form onSubmit={handleCouponSubmit} className="d-flex border pb-1">
                <input
                  type="text"
                  placeholder="PROMO CODE (AURAGOLD)"
                  className="bg-transparent border-0 px-2 py-2 w-100 text-dark outline-none text-uppercase"
                  style={{ fontSize: "0.75rem", outline: "none" }}
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  disabled={!!appliedCoupon}
                />
                <button
                  type="submit"
                  className="btn btn-dark rounded-0 px-3"
                  style={{ fontSize: "0.7rem", letterSpacing: "0.05em" }}
                  disabled={!!appliedCoupon}
                >
                  APPLY
                </button>
              </form>

              {couponError && <span className="text-danger mt-1" style={{ fontSize: "0.75rem" }}>{couponError}</span>}
              {couponSuccess && <span className="text-success mt-1" style={{ fontSize: "0.75rem" }}>{couponSuccess}</span>}

              {appliedCoupon && (
                <div className="d-flex justify-content-between align-items-center bg-light p-2">
                  <span className="text-success" style={{ fontSize: "0.8rem" }}>Code {appliedCoupon.code} Active</span>
                  <button onClick={removeCoupon} className="btn btn-sm btn-link text-danger p-0 text-decoration-none">
                    <i className="bi bi-x-circle"></i>
                  </button>
                </div>
              )}

              {/* Invoice calculation breakdown */}
              <div className="d-flex flex-column gap-3 border-top border-bottom py-3" style={{ fontSize: "0.85rem" }}>
                <div className="d-flex justify-content-between text-secondary">
                  <span>Bag Subtotal</span>
                  <span className="text-dark font-monospace">${subtotal}</span>
                </div>
                {discount > 0 && (
                  <div className="d-flex justify-content-between text-success">
                    <span>Discount Applied</span>
                    <span className="font-monospace">-${discount}</span>
                  </div>
                )}
                <div className="d-flex justify-content-between text-secondary">
                  <span>8% VAT Tax</span>
                  <span className="text-dark font-monospace">${tax}</span>
                </div>
                <div className="d-flex justify-content-between text-secondary">
                  <span>Concierge Shipping</span>
                  <span className="text-dark font-monospace">
                    {shippingCost === 0 ? "FREE" : `$${shippingCost}`}
                  </span>
                </div>
              </div>

              {/* Net total */}
              <div className="d-flex justify-content-between align-items-end">
                <div>
                  <span className="text-secondary d-block" style={{ fontSize: "0.65rem" }}>GRAND TOTAL</span>
                  <span className="font-editorial text-dark font-bold" style={{ fontSize: "1.6rem" }}>
                    ${total}
                  </span>
                </div>
                <span className="text-secondary" style={{ fontSize: "0.75rem" }}>USD</span>
              </div>

              <button
                onClick={handleCheckoutClick}
                className="btn btn-gemaura w-100 py-3"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* Secure Checkout Payment Form with Dynamic Gateway Selection */
        <div className="border p-4 p-md-5 bg-white mx-auto" style={{ maxWidth: "700px" }}>
          
          {/* Method Selection Bar */}
          <div className="mb-4">
            <label className="form-label text-uppercase text-secondary tracking-wider d-block mb-3" style={{ fontSize: "0.7rem", fontWeight: "600" }}>
              Select Payment Method
            </label>
            <div className="row g-2">
              <div className="col-6 col-sm-3">
                <button 
                  type="button"
                  onClick={() => setPaymentMethod("card")}
                  className={`btn w-100 py-3 rounded-0 border d-flex flex-column align-items-center gap-1 ${paymentMethod === 'card' ? 'btn-dark' : 'btn-light border-light text-secondary'}`}
                  style={{ fontSize: "0.75rem" }}
                >
                  <i className="bi bi-credit-card" style={{ fontSize: "1.2rem" }}></i>
                  <span>Card</span>
                </button>
              </div>
              <div className="col-6 col-sm-3">
                <button 
                  type="button"
                  onClick={() => setPaymentMethod("vietqr")}
                  className={`btn w-100 py-3 rounded-0 border d-flex flex-column align-items-center gap-1 ${paymentMethod === 'vietqr' ? 'btn-dark' : 'btn-light border-light text-secondary'}`}
                  style={{ fontSize: "0.75rem" }}
                >
                  <i className="bi bi-qr-code-scan" style={{ fontSize: "1.2rem" }}></i>
                  <span>VietQR</span>
                </button>
              </div>
              <div className="col-6 col-sm-3">
                <button 
                  type="button"
                  onClick={() => setPaymentMethod("momo")}
                  className={`btn w-100 py-3 rounded-0 border d-flex flex-column align-items-center gap-1 ${paymentMethod === 'momo' ? 'btn-dark' : 'btn-light border-light text-secondary'}`}
                  style={{ fontSize: "0.75rem" }}
                >
                  <i className="bi bi-phone" style={{ fontSize: "1.2rem" }}></i>
                  <span>MoMo</span>
                </button>
              </div>
              <div className="col-6 col-sm-3">
                <button 
                  type="button"
                  onClick={() => setPaymentMethod("paypal")}
                  className={`btn w-100 py-3 rounded-0 border d-flex flex-column align-items-center gap-1 ${paymentMethod === 'paypal' ? 'btn-dark' : 'btn-light border-light text-secondary'}`}
                  style={{ fontSize: "0.75rem" }}
                >
                  <i className="bi bi-paypal" style={{ fontSize: "1.2rem" }}></i>
                  <span>PayPal</span>
                </button>
              </div>
            </div>
          </div>

          <h3 className="font-editorial text-uppercase text-dark mb-2 d-flex align-items-center gap-2">
            <i className="bi bi-shield-lock text-warning"></i>
            <span>Secure Gate: {paymentMethod.toUpperCase()}</span>
          </h3>
          <p className="text-secondary mb-4" style={{ fontSize: "0.85rem" }}>
            Net total to authorize: <strong>${total}</strong> (approx. <strong>{totalInVND.toLocaleString()} VND</strong>). Order ID: <strong>{recentOrderId}</strong>.
          </p>

          <form onSubmit={handlePaymentSubmit} className="d-flex flex-column gap-3">
            
            {/* 1. CREDIT CARD FORM */}
            {paymentMethod === "card" && (
              <div className="d-flex flex-column gap-3">
                <div>
                  <label className="form-label text-uppercase text-secondary tracking-wider" style={{ fontSize: "0.65rem", fontWeight: "600" }}>Cardholder Name *</label>
                  <input
                    type="text"
                    name="cardName"
                    className={`form-control rounded-0 gemaura-input ${paymentErrors.cardName ? 'is-invalid' : ''}`}
                    placeholder="Aurelia Sterling"
                    value={paymentData.cardName}
                    onChange={handlePaymentInputChange}
                  />
                  {paymentErrors.cardName && <div className="invalid-feedback">{paymentErrors.cardName}</div>}
                </div>

                <div>
                  <label className="form-label text-uppercase text-secondary tracking-wider" style={{ fontSize: "0.65rem", fontWeight: "600" }}>Credit Card Number *</label>
                  <input
                    type="text"
                    name="cardNumber"
                    className={`form-control rounded-0 gemaura-input ${paymentErrors.cardNumber ? 'is-invalid' : ''}`}
                    placeholder="1111222233334444"
                    value={paymentData.cardNumber}
                    onChange={handlePaymentInputChange}
                  />
                  {paymentErrors.cardNumber && <div className="invalid-feedback">{paymentErrors.cardNumber}</div>}
                </div>

                <div className="row g-3">
                  <div className="col-6">
                    <label className="form-label text-uppercase text-secondary tracking-wider" style={{ fontSize: "0.65rem", fontWeight: "600" }}>Expiry Date (MM/YY) *</label>
                    <input
                      type="text"
                      name="expiry"
                      className={`form-control rounded-0 gemaura-input ${paymentErrors.expiry ? 'is-invalid' : ''}`}
                      placeholder="12/28"
                      value={paymentData.expiry}
                      onChange={handlePaymentInputChange}
                    />
                    {paymentErrors.expiry && <div className="invalid-feedback">{paymentErrors.expiry}</div>}
                  </div>

                  <div className="col-6">
                    <label className="form-label text-uppercase text-secondary tracking-wider" style={{ fontSize: "0.65rem", fontWeight: "600" }}>Security Code (CVV) *</label>
                    <input
                      type="password"
                      name="cvv"
                      maxLength="3"
                      className={`form-control rounded-0 gemaura-input ${paymentErrors.cvv ? 'is-invalid' : ''}`}
                      placeholder="***"
                      value={paymentData.cvv}
                      onChange={handlePaymentInputChange}
                    />
                    {paymentErrors.cvv && <div className="invalid-feedback">{paymentErrors.cvv}</div>}
                  </div>
                </div>
              </div>
            )}

            {/* 2. VIETQR BANK TRANSFER (Dynamic QR Code Generation) */}
            {paymentMethod === "vietqr" && (
              <div className="text-center p-4 border bg-light d-flex flex-column align-items-center gap-3">
                <span className="text-uppercase text-secondary font-bold" style={{ fontSize: "0.75rem" }}>
                  Scan VietQR to Pay via Mobile Banking App
                </span>
                
                {/* VietQR Dynamic QR Image */}
                <div className="p-2 bg-white border" style={{ maxWidth: "220px" }}>
                  <img 
                    src={vietQrUrl} 
                    alt="VietQR Bank Transfer" 
                    className="img-fluid" 
                    style={{ minHeight: "200px" }}
                  />
                </div>
                
                <div className="text-start w-100" style={{ fontSize: "0.8rem", lineHeight: "1.6" }}>
                  <div className="d-flex justify-content-between border-bottom py-1.5">
                    <span className="text-secondary">Bank Name:</span>
                    <strong className="text-dark">VietinBank (ICB)</strong>
                  </div>
                  <div className="d-flex justify-content-between border-bottom py-1.5">
                    <span className="text-secondary">Account Number:</span>
                    <strong className="text-dark">{accountNumber}</strong>
                  </div>
                  <div className="d-flex justify-content-between border-bottom py-1.5">
                    <span className="text-secondary">Account Name:</span>
                    <strong className="text-dark">{accountName}</strong>
                  </div>
                  <div className="d-flex justify-content-between border-bottom py-1.5">
                    <span className="text-secondary">Transfer Amount:</span>
                    <strong className="text-dark">{totalInVND.toLocaleString()} VND</strong>
                  </div>
                  <div className="d-flex justify-content-between py-1.5">
                    <span className="text-secondary">Message Content:</span>
                    <strong className="text-warning font-monospace">{recentOrderId}</strong>
                  </div>
                </div>
                
                <small className="text-secondary" style={{ fontSize: "0.7rem" }}>
                  * Please input the exact transfer message. Click the authorize button below after completion.
                </small>
              </div>
            )}

            {/* 3. MOMO WALLET MOCKUP */}
            {paymentMethod === "momo" && (
              <div className="text-center p-4 border bg-light d-flex flex-column align-items-center gap-3">
                <span className="text-uppercase text-danger font-bold" style={{ fontSize: "0.75rem" }}>
                  Scan MoMo Wallet QR Code
                </span>
                
                {/* Simulated MoMo QR Code */}
                <div className="p-3 bg-white border d-flex flex-column align-items-center gap-2" style={{ maxWidth: "220px" }}>
                  <img 
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=momo://pay?phone=0987654321&amount=${totalInVND}&note=${recentOrderId}`}
                    alt="MoMo Wallet QR"
                    className="img-fluid"
                  />
                  <span className="text-danger font-bold" style={{ fontSize: "0.8rem" }}>MoMo e-Wallet</span>
                </div>

                <div className="text-start w-100" style={{ fontSize: "0.8rem", lineHeight: "1.6" }}>
                  <div className="d-flex justify-content-between border-bottom py-1.5">
                    <span className="text-secondary">MoMo Wallet Phone:</span>
                    <strong className="text-dark">0555 839 200</strong>
                  </div>
                  <div className="d-flex justify-content-between border-bottom py-1.5">
                    <span className="text-secondary">Wallet Name:</span>
                    <strong className="text-dark">GEMAURA JEWELRY</strong>
                  </div>
                  <div className="d-flex justify-content-between border-bottom py-1.5">
                    <span className="text-secondary">Transfer Message:</span>
                    <strong className="text-warning font-monospace">{recentOrderId}</strong>
                  </div>
                </div>
              </div>
            )}

            {/* 4. PAYPAL SANDBOX SIMULATION */}
            {paymentMethod === "paypal" && (
              <div className="p-4 border bg-light text-center d-flex flex-column align-items-center gap-3">
                <span className="text-uppercase text-primary font-bold" style={{ fontSize: "0.75rem" }}>
                  PayPal Secure Checkout Gateway
                </span>
                
                {/* Simulated PayPal Buttons */}
                <div className="w-100 d-flex flex-column gap-2" style={{ maxWidth: "320px" }}>
                  <div className="p-3 bg-warning text-dark font-bold text-center border cursor-pointer" style={{ borderRadius: "4px" }}>
                    <i className="bi bi-paypal me-2"></i>
                    PayPal
                  </div>
                  <div className="p-3 bg-dark text-white font-bold text-center border cursor-pointer" style={{ borderRadius: "4px" }}>
                    Debit or Credit Card
                  </div>
                </div>

                <p className="text-secondary mb-0" style={{ fontSize: "0.75rem", lineHeight: "1.5" }}>
                  Integrates with PayPal SandBox developers account. Press the confirmation button below to complete mock verification.
                </p>
              </div>
            )}

            {/* Secure lock details */}
            <div className="d-flex align-items-center gap-2 text-secondary my-2" style={{ fontSize: "0.75rem" }}>
              <i className="bi bi-lock-fill text-success"></i>
              <span>SSL 256-bit secure gateway connection. Encrypted transaction log.</span>
            </div>

            {/* Form actions */}
            <div className="row g-3 mt-2">
              <div className="col-6">
                <button
                  type="button"
                  onClick={() => setCheckoutStep("cart")}
                  className="btn btn-outline-dark rounded-0 w-100 py-3 text-uppercase"
                  style={{ fontSize: "0.75rem", letterSpacing: "0.05em" }}
                  disabled={isProcessing}
                >
                  Back to Bag
                </button>
              </div>
              <div className="col-6">
                <button
                  type="submit"
                  className="btn btn-dark rounded-0 w-100 py-3 text-uppercase d-flex align-items-center justify-content-center gap-2"
                  style={{ fontSize: "0.75rem", letterSpacing: "0.05em" }}
                  disabled={isProcessing}
                >
                  {isProcessing ? (
                    <>
                      <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                      <span>Verifying...</span>
                    </>
                  ) : (
                    <span>Confirm Payment</span>
                  )}
                </button>
              </div>
            </div>

          </form>
        </div>
      )}
    </div>
  );
}
