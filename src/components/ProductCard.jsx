import React from "react";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";

export default function ProductCard({ product, onViewSpecs }) {
  const { addToCart } = useCart();
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();

  const inWish = isInWishlist(product.id);

  const toggleWishlist = (e) => {
    e.stopPropagation();
    if (inWish) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  // Class for Feng Shui elements
  const getElementColorClass = (element) => {
    switch (element) {
      case "Wood": return "bg-success text-white";
      case "Fire": return "bg-danger text-white";
      case "Earth": return "bg-warning text-dark";
      case "Metal": return "bg-secondary text-white";
      case "Water": return "bg-dark text-white";
      default: return "bg-light text-dark";
    }
  };

  return (
    <div className="gemaura-card p-3 position-relative d-flex flex-column h-100">
      {/* Wishlist toggle */}
      <button
        onClick={toggleWishlist}
        className="btn p-2 position-absolute top-0 end-0 m-3 rounded-circle bg-white shadow-sm border-0 text-danger"
        style={{ zIndex: 10, width: "36px", height: "36px", display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <i className={`bi ${inWish ? 'bi-heart-fill' : 'bi-heart'}`} style={{ fontSize: "1rem" }}></i>
      </button>

      {/* Product Image */}
      <div 
        className="position-relative overflow-hidden mb-3 bg-light cursor-pointer" 
        style={{ height: "240px", width: "100%" }}
        onClick={() => onViewSpecs(product)}
      >
        <img
          src={product.image}
          alt={product.name}
          className="w-100 h-100 object-cover"
          style={{ transition: "transform 0.6s ease" }}
          onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.08)"}
          onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&q=80&w=600";
          }}
        />
        {product.stock <= 2 && (
          <span className="position-absolute bottom-0 start-0 m-2 badge bg-dark text-white" style={{ fontSize: "0.65rem", letterSpacing: "0.1em" }}>
            LIMITED PIECES
          </span>
        )}
      </div>

      {/* Details */}
      <div className="d-flex flex-column flex-grow-1">
        <div className="d-flex justify-content-between align-items-center mb-1">
          <span className="text-secondary text-uppercase" style={{ fontSize: "0.7rem", letterSpacing: "0.1em" }}>{product.category}</span>
          <span className={`badge ${getElementColorClass(product.element)}`} style={{ fontSize: "0.6rem", letterSpacing: "0.05em" }}>
            {product.element}
          </span>
        </div>
        
        <h4 className="font-editorial text-dark mb-2 text-truncate" style={{ fontSize: "1.15rem" }}>
          {product.name}
        </h4>
        
        <p className="text-secondary text-xs mb-3 text-clamp-2" style={{ fontSize: "0.8rem", flexGrow: 1 }}>
          {product.description}
        </p>

        {/* Rating */}
        <div className="d-flex align-items-center gap-1 mb-3" style={{ fontSize: "0.75rem" }}>
          <i className="bi bi-star-fill text-warning"></i>
          <span className="text-dark font-bold">{product.rating.toFixed(1)}</span>
          <span className="text-secondary">(Authentic Certified)</span>
        </div>

        {/* Price and Cart Action */}
        <div className="border-top pt-3 d-flex align-items-center justify-content-between mt-auto">
          <span className="font-editorial text-dark" style={{ fontSize: "1.2rem", fontWeight: "600" }}>
            ${product.price}
          </span>
          <div className="d-flex gap-2">
            <button
              onClick={() => onViewSpecs(product)}
              className="btn btn-outline-dark rounded-0 px-2 py-1"
              style={{ fontSize: "0.7rem", letterSpacing: "0.05em" }}
            >
              DETAILS
            </button>
            <button
              onClick={() => addToCart(product)}
              className="btn btn-dark rounded-0 px-3 py-1"
              style={{ fontSize: "0.7rem", letterSpacing: "0.05em" }}
            >
              ADD BAG
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
