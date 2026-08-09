import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { productsData } from "../data/products";
import BrandFilter from "../components/BrandFilter";
import ProductCard from "../components/ProductCard";
import SpecsModal from "../components/SpecsModal";

export default function Home() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedElement, setSelectedElement] = useState(searchParams.get("element") || null);
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get("category") || null);
  const [searchQuery, setSearchQuery] = useState(searchParams.get("search") || "");
  const [sortBy, setSortBy] = useState("default");
  
  // Modals state
  const [activeProduct, setActiveProduct] = useState(null);

  // Sync parameters
  useEffect(() => {
    const element = searchParams.get("element");
    const category = searchParams.get("category");
    const search = searchParams.get("search");
    setSelectedElement(element || null);
    setSelectedCategory(category || null);
    setSearchQuery(search || "");
  }, [searchParams]);

  const handleElementSelect = (elementName) => {
    const params = {};
    if (elementName) params.element = elementName;
    if (selectedCategory) params.category = selectedCategory;
    if (searchQuery) params.search = searchQuery;
    setSearchParams(params);
    setSelectedElement(elementName);
  };

  const handleCategorySelect = (categoryName) => {
    const params = {};
    if (selectedElement) params.element = selectedElement;
    if (categoryName) params.category = categoryName;
    if (searchQuery) params.search = searchQuery;
    setSearchParams(params);
    setSelectedCategory(categoryName);

    // Scroll to catalog section after selecting a category
    setTimeout(() => {
      const el = document.getElementById("catalog-section");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const handleSearchChange = (e) => {
    const val = e.target.value;
    setSearchQuery(val);
    const params = {};
    if (selectedElement) params.element = selectedElement;
    if (selectedCategory) params.category = selectedCategory;
    if (val.trim()) params.search = val.trim();
    setSearchParams(params);
  };

  // Filter & Sort Products
  const filteredProducts = productsData
    .filter((product) => {
      const matchElement = selectedElement ? product.element.toLowerCase() === selectedElement.toLowerCase() : true;
      const matchCategory = selectedCategory ? product.category.toLowerCase() === selectedCategory.toLowerCase() : true;
      const matchSearch = searchQuery
        ? product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.element.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.description.toLowerCase().includes(searchQuery.toLowerCase())
        : true;
      return matchElement && matchCategory && matchSearch;
    })
    .sort((a, b) => {
      if (sortBy === "price-low") return a.price - b.price;
      if (sortBy === "price-high") return b.price - a.price;
      if (sortBy === "rating") return b.rating - a.rating;
      return 0; // default order
    });

  // Featured products (top 4 best sellers or new arrivals)
  const featuredProducts = productsData.filter(p => p.isBestSeller).slice(0, 4);

  return (
    <div className="w-100 min-h-screen bg-light">
      
      {/* 1. Hero Section - Timeless Elegance (Centered Editorial Banner) */}
      <section 
        className="d-flex align-items-center justify-content-center text-center py-5 border-bottom"
        style={{ minHeight: "60vh", backgroundColor: "#F5F2EB" }}
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

      {/* 2. Featured Best Sellers - 4 Columns Layout */}
      <section className="py-5 bg-white border-bottom">
        <div className="container py-4">
          <div className="mb-4 text-center">
            <span className="text-uppercase text-secondary tracking-widest" style={{ fontSize: "0.75rem" }}>
              Selected Masterpieces
            </span>
            <h2 className="font-editorial text-uppercase text-dark mt-2 display-6">
              Best Sellers
            </h2>
            <div className="mx-auto bg-warning mt-2" style={{ height: "1px", width: "60px" }}></div>
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
            <div className="col-12 col-md-4" onClick={() => handleCategorySelect("Rings")}>
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
                onClick={() => handleCategorySelect("Necklaces")}
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

              {/* Two Square Cards side by side (Pendants & Bracelets) */}
              <div className="row g-3">
                <div className="col-12 col-sm-6" onClick={() => handleCategorySelect("Pendants")}>
                  <div 
                    className="position-relative overflow-hidden border bg-white d-flex align-items-center justify-content-center text-center cursor-pointer"
                    style={{ height: "224px" }}
                  >
                    <img 
                      src="https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&q=80&w=600" 
                      alt="Pendants Category" 
                      className="position-absolute w-100 h-100 object-cover opacity-75"
                      style={{ transition: "all 0.5s ease" }}
                      onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.05)"}
                      onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
                    />
                    <div className="position-relative bg-white px-4 py-2 border shadow-sm z-3">
                      <span className="text-dark font-editorial text-uppercase tracking-wider font-bold" style={{ fontSize: "1rem" }}>Pendants</span>
                    </div>
                  </div>
                </div>

                <div className="col-12 col-sm-6" onClick={() => handleCategorySelect("Bracelets")}>
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

      {/* 4. Interactive Product Catalog (Unified Filter, Search, Sort & Grid) */}
      <section className="py-5 bg-white border-bottom" id="catalog-section">
        <div className="container">
          
          {/* Feng Shui Element Filter Bar */}
          <div className="mb-4">
            <BrandFilter selectedBrand={selectedElement} onSelectBrand={handleElementSelect} />
          </div>

          <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 border-top border-bottom py-3 mb-5">
            <div>
              <h3 className="font-editorial text-uppercase text-dark mb-1" style={{ fontSize: "1.5rem" }}>
                {selectedCategory ? `${selectedCategory} Collection` : "All Precious Stones"}
              </h3>
              <p className="text-secondary mb-0 text-uppercase font-semibold" style={{ fontSize: "0.7rem", letterSpacing: "0.05em" }}>
                Found {filteredProducts.length} GIA certified gemstone items
              </p>
            </div>

            {/* Catalog search/sort controls */}
            <div className="d-flex flex-wrap align-items-center gap-3">
              <div className="d-flex align-items-center bg-light border px-3 py-1.5" style={{ width: "260px" }}>
                <input
                  type="text"
                  placeholder="Filter stone details..."
                  className="border-0 bg-transparent w-100 text-dark outline-none"
                  style={{ fontSize: "0.8rem" }}
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
                <i className="bi bi-search text-secondary"></i>
              </div>

              <div className="d-flex align-items-center bg-light border px-3 py-1.5">
                <i className="bi bi-funnel text-warning me-2" style={{ fontSize: "0.85rem" }}></i>
                <select
                  className="border-0 bg-transparent text-dark cursor-pointer font-medium"
                  style={{ fontSize: "0.8rem", outline: "none" }}
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="default">Sort: Default</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Rating: Highest First</option>
                </select>
              </div>

              {(selectedElement || selectedCategory || searchQuery) && (
                <button 
                  onClick={() => {
                    setSearchParams({});
                    setSelectedElement(null);
                    setSelectedCategory(null);
                    setSearchQuery("");
                    setSortBy("default");
                  }}
                  className="btn btn-outline-danger btn-sm rounded-0 text-uppercase"
                  style={{ fontSize: "0.75rem" }}
                >
                  Reset Filters
                </button>
              )}
            </div>
          </div>

          {/* Empty Inventory State */}
          {filteredProducts.length === 0 ? (
            <div className="text-center py-5 border bg-light my-5" style={{ maxWidth: "600px", margin: "0 auto" }}>
              <i className="bi bi-gem text-muted display-4 mb-3 d-block"></i>
              <h3 className="font-editorial text-uppercase">No Stones Match Your Aura</h3>
              <p className="text-secondary text-xs max-w-md mx-auto my-3 px-3">
                No items align with your current element filter criteria. Try resetting the filters to explore our universal collection.
              </p>
              <button
                onClick={() => {
                  setSearchParams({});
                  setSelectedElement(null);
                  setSelectedCategory(null);
                  setSearchQuery("");
                  setSortBy("default");
                }}
                className="btn btn-gemaura"
              >
                Reset Aura Filters
              </button>
            </div>
          ) : (
            <div className="row g-4 row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4">
              {filteredProducts.map((product) => (
                <div key={product.id} className="col">
                  <ProductCard
                    product={product}
                    onViewSpecs={setActiveProduct}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 5. Our Heritage Section - Split Content Layout */}
      <section className="py-5 bg-white border-bottom">
        <div className="container py-4">
          <div className="row g-5 align-items-center justify-content-between">
            {/* Left side: Workshop Image */}
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

      {/* 6. Customer Testimonials Section */}
      <section className="py-5 bg-light">
        <div className="container py-4">
          <div className="text-center mb-5">
            <span className="text-secondary text-uppercase tracking-widest" style={{ fontSize: "0.75rem" }}>
              Collector Testimonials
            </span>
            <h2 className="font-editorial text-uppercase text-dark mt-2 display-6">
              Aura Reviews
            </h2>
            <div className="mx-auto bg-warning mt-2" style={{ height: "1px", width: "60px" }}></div>
          </div>

          <div className="row g-4">
            <div className="col-12 col-md-4">
              <div className="p-4 border bg-white h-100">
                <div className="text-warning mb-2">
                  <i className="bi bi-star-fill"></i> <i className="bi bi-star-fill"></i> <i className="bi bi-star-fill"></i> <i className="bi bi-star-fill"></i> <i className="bi bi-star-fill"></i>
                </div>
                <h4 className="font-editorial mb-3" style={{ fontSize: "1.15rem" }}>"Magnificent energy balance"</h4>
                <p className="text-secondary text-sm" style={{ fontSize: "0.85rem", lineHeight: "1.6" }}>
                  "The Burmese Jade bracelet is breathtaking. I felt an immediate calming presence upon wearing it. Excellent authenticity documents included."
                </p>
                <span className="d-block mt-3 text-uppercase tracking-wider text-dark font-bold" style={{ fontSize: "0.75rem" }}>— Marcus Sterling, San Francisco</span>
              </div>
            </div>
            <div className="col-12 col-md-4">
              <div className="p-4 border bg-white h-100">
                <div className="text-warning mb-2">
                  <i className="bi bi-star-fill"></i> <i className="bi bi-star-fill"></i> <i className="bi bi-star-fill"></i> <i className="bi bi-star-fill"></i> <i className="bi bi-star-fill"></i>
                </div>
                <h4 className="font-editorial mb-3" style={{ fontSize: "1.15rem" }}>"Exquisite high polish"</h4>
                <p className="text-secondary text-sm" style={{ fontSize: "0.85rem", lineHeight: "1.6" }}>
                  "The Imperial Amethyst ring is a work of art. The detailed gold-plating on silver highlights the deep violet stone perfectly. Pure luxury."
                </p>
                <span className="d-block mt-3 text-uppercase tracking-wider text-dark font-bold" style={{ fontSize: "0.75rem" }}>— Sofia Sofia, Paris</span>
              </div>
            </div>
            <div className="col-12 col-md-4">
              <div className="p-4 border bg-white h-100">
                <div className="text-warning mb-2">
                  <i className="bi bi-star-fill"></i> <i className="bi bi-star-fill"></i> <i className="bi bi-star-fill"></i> <i className="bi bi-star-fill"></i> <i className="bi bi-star-fill"></i>
                </div>
                <h4 className="font-editorial mb-3" style={{ fontSize: "1.15rem" }}>"True manifestation stone"</h4>
                <p className="text-secondary text-sm" style={{ fontSize: "0.85rem", lineHeight: "1.6" }}>
                  "My solar plexus energies feel aligned since acquiring the Golden Citrine Pendant. Truly premium and the gold chain has an unmatched luster."
                </p>
                <span className="d-block mt-3 text-uppercase tracking-wider text-dark font-bold" style={{ fontSize: "0.75rem" }}>— Harrison V., New York</span>
              </div>
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
