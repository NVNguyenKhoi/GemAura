import React from "react";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";

export default function SpecsModal({ laptop: product, onClose }) {
  if (!product) return null;
  const { addToCart } = useCart();
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();

  const inWish = isInWishlist(product.id);

  const handleAddToCart = () => {
    addToCart(product);
    onClose();
  };

  const toggleWishlist = () => {
    if (inWish) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  return (
    <div className="fixed-top w-100 h-100 d-flex align-items-center justify-content-center px-3 px-md-5" style={{ zIndex: 1050, backgroundColor: "rgba(0,0,0,0.6)", backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)" }}>
      <div className="bg-white text-dark rounded-0 p-4 p-md-5 position-relative border" style={{ maxWidth: "800px", width: "100%", maxHeight: "90vh", overflowY: "auto" }}>
        
        {/* Close Button */}
        <button onClick={onClose} className="btn p-2 border-0 position-absolute top-0 end-0 m-3 text-secondary hover-gold" style={{ fontSize: "1.5rem" }}>
          <i className="bi bi-x"></i>
        </button>

        <div className="row g-4 mt-1">
          {/* Left: Product Image */}
          <div className="col-12 col-md-5 d-flex align-items-center justify-content-center bg-light p-3">
            <img
              src={product.image}
              alt={product.name}
              className="img-fluid object-cover w-100"
              style={{ maxHeight: "350px" }}
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&q=80&w=600";
              }}
            />
          </div>

          {/* Right: Gem Details */}
          <div className="col-12 col-md-7 d-flex flex-column gap-3">
            <div>
              <div className="d-flex align-items-center gap-2 mb-2">
                <span className="badge bg-dark text-uppercase" style={{ fontSize: "0.65rem", letterSpacing: "0.1em" }}>
                  {product.category}
                </span>
                <span className="badge bg-warning text-dark text-uppercase" style={{ fontSize: "0.65rem", letterSpacing: "0.1em" }}>
                  {product.element} Element
                </span>
              </div>
              <h2 className="font-editorial text-uppercase text-dark mb-1" style={{ fontSize: "1.8rem" }}>
                {product.name}
              </h2>
              <div className="d-flex align-items-center gap-2 text-secondary" style={{ fontSize: "0.8rem" }}>
                <i className="bi bi-patch-check text-success"></i>
                <span>GIA Certified Natural Gemstone</span>
              </div>
            </div>

            <div className="border-top border-bottom py-3 my-1">
              <span className="text-secondary d-block uppercase tracking-wider mb-1" style={{ fontSize: "0.7rem", fontWeight: "600" }}>Spiritual Attributes</span>
              <p className="mb-0 text-dark" style={{ fontSize: "0.85rem", lineHeight: "1.5" }}>{product.spiritualAttributes}</p>
            </div>

            <div>
              <span className="text-secondary d-block uppercase tracking-wider mb-1" style={{ fontSize: "0.7rem", fontWeight: "600" }}>Craftsmanship Details</span>
              <p className="mb-0 text-secondary" style={{ fontSize: "0.8rem", lineHeight: "1.5" }}>{product.craftDetails}</p>
            </div>

            <div>
              <span className="text-secondary d-block uppercase tracking-wider mb-1" style={{ fontSize: "0.7rem", fontWeight: "600" }}>Collector's Description</span>
              <p className="mb-0 text-secondary" style={{ fontSize: "0.8rem", lineHeight: "1.5" }}>{product.description}</p>
            </div>

            {/* Price & Actions */}
            <div className="border-top pt-3 d-flex flex-column sm-flex-row justify-content-between align-items-sm-center gap-3 mt-auto">
              <div>
                <span className="text-secondary d-block" style={{ fontSize: "0.65rem" }}>VALUATION</span>
                <span className="font-editorial text-dark text-2xl font-semibold" style={{ fontSize: "1.6rem" }}>
                  ${product.price}
                </span>
              </div>

              <div className="d-flex gap-2">
                <button
                  onClick={toggleWishlist}
                  className="btn btn-outline-dark rounded-0 px-3 py-2"
                  style={{ fontSize: "0.8rem", letterSpacing: "0.05em" }}
                >
                  <i className={`bi ${inWish ? 'bi-heart-fill text-danger' : 'bi-heart'} me-1`}></i>
                  WISHLIST
                </button>
                <button
                  onClick={handleAddToCart}
                  className="btn btn-dark rounded-0 px-4 py-2"
                  style={{ fontSize: "0.8rem", letterSpacing: "0.05em" }}
                >
                  ACQUIRE PIECE
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
