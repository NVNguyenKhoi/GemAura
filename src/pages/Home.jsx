import React, { useState } from "react";
import { productsData } from "../data/products";
import ProductCard from "../components/ProductCard";
import SpecsModal from "../components/SpecsModal";

export default function Home() {
  // Modals state
  const [activeProduct, setActiveProduct] = useState(null);

  // Filter products for the featured list (top 4 items)
  const featuredProducts = productsData.slice(0, 4);

  return (
    <div className="w-100 min-h-screen bg-light">
      
      {/* 1. Hero Section - Timeless Elegance (Centered Editorial Banner) */}
      <section 
        className="d-flex align-items-center justify-content-center text-center py-5 border-bottom"
        style={{ minHeight: "65vh", backgroundColor: "#F5F2EB" }}
      >
        <div className="container py-5" style={{ maxWidth: "800px" }}>
          <h1 className="font-editorial text-uppercase text-dark display-3 mb-3" style={{ letterSpacing: "0.05em" }}>
            Timeless Elegance
          </h1>
          <p className="text-secondary mb-4 px-3" style={{ fontSize: "1.1rem", lineHeight: "1.6" }}>
            A curated Collection of fine jewelry designed to elevate your everyday moments and celebrate extraordinary milestones. Precision-crafted for the modern collector.
          </p>
          <button 
            onClick={() => {
              const element = document.getElementById("catalog-section");
              if (element) element.scrollIntoView({ behavior: "smooth" });
            }}
            className="btn btn-dark rounded-0 px-5 py-3 text-uppercase font-bold" 
            style={{ fontSize: "0.85rem", letterSpacing: "0.15em" }}
          >
            Shop Now
          </button>
        </div>
      </section>

      {/* 2. Featured Products Section - 4 Columns Layout */}
      <section className="py-5 bg-white border-bottom" id="catalog-section">
        <div className="container py-4">
          <div className="mb-4">
            <h2 className="font-editorial text-uppercase text-dark mb-1" style={{ fontSize: "1.8rem" }}>
              Featured Products
            </h2>
            <p className="text-secondary text-uppercase tracking-wider" style={{ fontSize: "0.75rem", fontWeight: "600" }}>
              Our most sought-after pieces this season
            </p>
          </div>

          <div className="row g-4 row-cols-1 row-cols-sm-2 row-cols-md-4">
            {featuredProducts.map((product) => (
              <div key={product.id} className="col">
                <ProductCard
                  product={product}
                  onViewSpecs={setActiveProduct}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Shop by Category - Collage Grid Layout */}
      <section className="py-5 bg-light border-bottom">
        <div className="container py-4">
          <div className="text-center mb-5">
            <span className="text-uppercase text-secondary tracking-widest" style={{ fontSize: "0.75rem" }}>
              Curated Selection
            </span>
            <h2 className="font-editorial text-uppercase text-dark mt-2 display-6">
              Shop by Category
            </h2>
            <div className="mx-auto bg-warning mt-2" style={{ height: "1px", width: "60px" }}></div>
          </div>

          <div className="row g-3">
            {/* Left Column: 1 Tall Card (Rings) */}
            <div className="col-12 col-md-4">
              <div 
                className="position-relative overflow-hidden border bg-white d-flex align-items-center justify-content-center text-center cursor-pointer"
                style={{ height: "460px" }}
              >
                <img 
                  src="https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&q=80&w=600" 
                  alt="Rings Category" 
                  className="position-absolute w-100 h-100 object-cover opacity-75"
                  style={{ transition: "all 0.5s ease" }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.05)"}
                  onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
                />
                <div className="position-relative bg-white px-4 py-2 border shadow-sm z-3">
                  <span className="text-dark font-editorial text-uppercase tracking-wider font-bold" style={{ fontSize: "1rem" }}>Rings</span>
                </div>
              </div>
            </div>

            {/* Right Column: 1 Wide Card Top, 2 Square Cards Bottom */}
            <div className="col-12 col-md-8 d-flex flex-column gap-3">
              {/* Wide Card (Necklaces) */}
              <div 
                className="position-relative overflow-hidden border bg-white d-flex align-items-center justify-content-center text-center cursor-pointer"
                style={{ height: "220px" }}
              >
                <img 
                  src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&q=80&w=800" 
                  alt="Necklaces Category" 
                  className="position-absolute w-100 h-100 object-cover opacity-75"
                  style={{ transition: "all 0.5s ease" }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.05)"}
                  onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
                />
                <div className="position-relative bg-white px-4 py-2 border shadow-sm z-3">
                  <span className="text-dark font-editorial text-uppercase tracking-wider font-bold" style={{ fontSize: "1rem" }}>Necklaces</span>
                </div>
              </div>

              {/* Two Square Cards side by side (Earrings & Bracelets) */}
              <div className="row g-3">
                <div className="col-12 col-sm-6">
                  <div 
                    className="position-relative overflow-hidden border bg-white d-flex align-items-center justify-content-center text-center cursor-pointer"
                    style={{ height: "224px" }}
                  >
                    <img 
                      src="https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&q=80&w=600" 
                      alt="Earrings Category" 
                      className="position-absolute w-100 h-100 object-cover opacity-75"
                      style={{ transition: "all 0.5s ease" }}
                      onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.05)"}
                      onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
                    />
                    <div className="position-relative bg-white px-4 py-2 border shadow-sm z-3">
                      <span className="text-dark font-editorial text-uppercase tracking-wider font-bold" style={{ fontSize: "1rem" }}>Earrings</span>
                    </div>
                  </div>
                </div>

                <div className="col-12 col-sm-6">
                  <div 
                    className="position-relative overflow-hidden border bg-white d-flex align-items-center justify-content-center text-center cursor-pointer"
                    style={{ height: "224px" }}
                  >
                    <img 
                      src="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&q=80&w=600" 
                      alt="Bracelets Category" 
                      className="position-absolute w-100 h-100 object-cover opacity-75"
                      style={{ transition: "all 0.5s ease" }}
                      onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.05)"}
                      onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
                    />
                    <div className="position-relative bg-white px-4 py-2 border shadow-sm z-3">
                      <span className="text-dark font-editorial text-uppercase tracking-wider font-bold" style={{ fontSize: "1rem" }}>Bracelets</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Our Heritage Section - Split Content Layout */}
      <section className="py-5 bg-white">
        <div className="container py-4">
          <div className="row g-5 align-items-center justify-content-between">
            {/* Left side: Workshop Image / Blueprint */}
            <div className="col-12 col-md-5">
              <div className="border p-2 bg-light">
                <img
                  src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&q=80&w=600"
                  alt="Our Heritage Gem Studio"
                  className="img-fluid"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&q=80&w=600";
                  }}
                />
              </div>
            </div>

            {/* Right side: Story Content */}
            <div className="col-12 col-md-6 d-flex flex-column gap-3">
              <h2 className="font-editorial text-uppercase text-dark display-5">
                Our Heritage
              </h2>
              <p className="text-secondary" style={{ fontSize: "1rem", lineHeight: "1.7" }}>
                Established with a commitment to uncompromising quality, GemAura has spent decades refining the absolute integrity and aesthetic purity of fine jewelry. Our design philosophy merges traditional craftsmanship with contemporary, architectural sensibilities.
              </p>
              <button 
                onClick={() => {
                  window.location.href = "/contact";
                }}
                className="btn btn-gemaura-outline mt-3 self-start"
              >
                Read Our Story
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Product Details Modal Component */}
      {activeProduct && (
        <SpecsModal
          laptop={activeProduct}
          onClose={() => setActiveProduct(null)}
        />
      )}
    </div>
  );
}
