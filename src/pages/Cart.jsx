import React, { useState } from "react";
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
    // Generate a temporary order ID for payment transfers reference
    const tempId = `GEM-${Math.floor(1000 + Math.random() * 9000)}`;
    setRecentOrderId(tempId);
    setCheckoutStep("payment");
  };

  const validatePayment = () => {
    if (paymentMethod !== "card") return true; // Other methods validated via simulation

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
      
      // Simulate gateway authorization time
      setTimeout(() => {
        const orderItems = cartItems.map(item => ({
          id: item.id,
          name: item.name,
          qty: item.quantity,
          price: item.price
        }));
        
        // Save the order to auth orders database
        addOrder(orderItems, total);
        
        setIsProcessing(false);
        clearCart();
        setCheckoutStep("success");
      }, 2500);
    }
  };

  const handlePaymentInputChange = (e) => {
    const { name, value } = e.target;
    setPaymentData((prev) => ({ ...prev, [name]: value }));
  };

  // Convert USD price to approximate VND for QR Codes (1 USD = 25,000 VND)
  const exchangeRate = 25000;
  const totalInVND = total * exchangeRate;

  // Generate VietQR API image url
  const bankId = "vietinbank";
  const accountNumber = "113366668888";
  const accountName = "GEMAURA JEWELRY";
  const vietQrUrl = `https://img.vietqr.io/image/${bankId}-${accountNumber}-compact2.png?amount=${totalInVND}&addInfo=${recentOrderId}&accountName=${encodeURIComponent(accountName)}`;

  if (checkoutStep === "success") {
    return (
      <div className="container py-5 text-center d-flex flex-column align-items-center justify-content-center" style={{ minHeight: "70vh" }}>
        <div className="rounded-circle border border-success d-flex align-items-center justify-content-center text-success bg-light mb-4" style={{ width: "80px", height: "80px", fontSize: "2.5rem" }}>
          <i className="bi bi-patch-check"></i>
        </div>
        <h2 className="font-editorial text-uppercase text-dark display-5">Aura Transacted Successfully</h2>
        <div className="bg-warning my-3" style={{ height: "1px", width: "80px" }}></div>
        <p className="text-secondary text-uppercase tracking-wider mb-4" style={{ fontSize: "0.8rem", maxWidth: "500px" }}>
          Your payment has been authorized. The jewelry workshop has queued your order under reference code:
          <span className="text-dark d-block mt-2 font-monospace font-bold" style={{ fontSize: "1.1rem" }}>{recentOrderId}</span>
        </p>
        <div className="d-flex gap-3">
          <Link to="/profile" className="btn btn-outline-dark rounded-0 px-4 py-2" style={{ fontSize: "0.8rem", letterSpacing: "0.05em" }}>
            Track Staging Queue
          </Link>
          <Link to="/" className="btn btn-dark rounded-0 px-4 py-2" style={{ fontSize: "0.8rem", letterSpacing: "0.05em" }}>
            Continue Exploring
          </Link>
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
