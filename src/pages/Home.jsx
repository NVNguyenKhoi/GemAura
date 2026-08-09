import React, { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { productsData } from "../data/products";
import BrandFilter from "../components/BrandFilter";
import ProductCard from "../components/ProductCard";
import SpecsModal from "../components/SpecsModal";

const HERO_SLIDES = [
  {
    category: "Imperial Jade",
    title: "The Purity of Emerald Jade",
    tagline: "Experience the eternal balance of body, mind, and fortune.",
    price: "$380",
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&q=80&w=600",
    productId: "gem-001"
  },
  {
    category: "Uruguay Amethyst",
    title: "Mystic Amethyst Majesty",
    tagline: "Awaken your crown chakra and welcome absolute mental clarity.",
    price: "$490",
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&q=80&w=600",
    productId: "gem-002"
  },
  {
    category: "Brazilian Citrine",
    title: "Golden Solar Manifestation",
    tagline: "The stone of success, abundance, and magnetic confidence.",
    price: "$320",
    image: "https://images.unsplash.com/photo-1599643477877-530eb83abc8e?auto=format&fit=crop&q=80&w=600",
    productId: "gem-003"
  }
];

export default function Home() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedElement, setSelectedElement] = useState(searchParams.get("element") || null);
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get("category") || null);
  const [searchQuery, setSearchQuery] = useState(searchParams.get("search") || "");
  const [sortBy, setSortBy] = useState("default");
  
  // Modals state
  const [activeProduct, setActiveProduct] = useState(null);

  // Hero carousel state
  const [currentSlide, setCurrentSlide] = useState(0);

  // Sync parameters
  useEffect(() => {
    const element = searchParams.get("element");
    const category = searchParams.get("category");
    const search = searchParams.get("search");
    setSelectedElement(element || null);
    setSelectedCategory(category || null);
    setSearchQuery(search || "");
  }, [searchParams]);

  // Auto rotate hero slides
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

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

  const viewProductDetails = (productId) => {
    const product = productsData.find((p) => p.id === productId);
    if (product) {
      setActiveProduct(product);
      // Track as recently viewed
      const viewed = localStorage.getItem("gemaura_viewed");
      const list = viewed ? JSON.parse(viewed) : [];
      const filtered = list.filter(item => item.id !== product.id);
      localStorage.setItem("gemaura_viewed", JSON.stringify([product, ...filtered].slice(0, 4)));
    }
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

  return (
    <div className="w-100 min-h-screen position-relative bg-light">
      
      {/* Editorial Luxury Hero Section - Alternate Slide Show */}
      <section className="position-relative py-5 overflow-hidden" style={{ minHeight: "70vh", backgroundColor: "#F5F2EB" }}>
        <div className="container h-100 py-md-5">
          <div className="row h-100 align-items-center justify-content-between g-5">
            {/* Left Content Column */}
            <div className="col-12 col-lg-5 d-flex flex-column gap-3 z-2">
              <span className="text-uppercase tracking-widest text-warning font-editorial" style={{ fontSize: "0.85rem", fontWeight: "600" }}>
                {HERO_SLIDES[currentSlide].category} Collection
              </span>
              <h1 className="font-editorial text-uppercase text-dark display-4 leading-tight mb-2">
                {HERO_SLIDES[currentSlide].title}
              </h1>
              <p className="text-secondary leading-relaxed mb-4" style={{ fontSize: "1rem" }}>
                {HERO_SLIDES[currentSlide].tagline}
              </p>
              <div className="d-flex align-items-center gap-4">
                <button
                  onClick={() => viewProductDetails(HERO_SLIDES[currentSlide].productId)}
                  className="btn btn-gemaura"
                >
                  Acquire Piece
                </button>
                <Link to="/contact" className="text-dark font-bold text-uppercase tracking-wider text-decoration-none border-bottom pb-1" style={{ fontSize: "0.8rem" }}>
                  Consult Concierge
                </Link>
              </div>
            </div>

            {/* Right Image Box Column */}
            <div className="col-12 col-lg-6 position-relative d-flex justify-content-center align-items-center z-1">
              <div className="position-relative p-2 bg-white shadow-lg border" style={{ maxWidth: "420px" }}>
                <img
                  src={HERO_SLIDES[currentSlide].image}
                  alt="Elite Gemstone"
                  className="img-fluid"
                  style={{ transition: "all 1s ease", transform: "scale(1)" }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Carousel indicators */}
        <div className="position-absolute bottom-0 start-50 translate-middle-x mb-4 d-flex gap-2">
          {HERO_SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              className="border-0 rounded-circle"
              style={{
                width: "8px",
                height: "8px",
                backgroundColor: currentSlide === i ? "var(--color-luxury-gold)" : "rgba(0,0,0,0.2)",
                transition: "all 0.3s ease"
              }}
            ></button>
          ))}
        </div>
      </section>

      {/* Editorial Category Section */}
      <section className="py-5 bg-white border-bottom">
        <div className="container">
          <div className="text-center mb-4">
            <span className="text-secondary text-uppercase tracking-widest" style={{ fontSize: "0.75rem" }}>Curated Artifacts</span>
            <h2 className="font-editorial text-uppercase text-dark mt-2" style={{ fontSize: "2rem" }}>Shop by Category</h2>
          </div>
          <div className="row g-3 justify-content-center text-center">
            {["Bracelets", "Necklaces", "Rings", "Pendants"].map((cat) => (
              <div key={cat} className="col-6 col-md-3">
                <button
                  onClick={() => handleCategorySelect(selectedCategory === cat ? null : cat)}
                  className={`btn w-100 py-3 rounded-0 border text-uppercase tracking-widest ${selectedCategory === cat ? 'btn-dark text-white' : 'btn-light border-light text-secondary'}`}
                  style={{ fontSize: "0.8rem", fontWeight: "600" }}
                >
                  {cat}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Feng Shui Element Filter Bar */}
      <section className="py-5 bg-light">
        <div className="container">
          <BrandFilter selectedBrand={selectedElement} onSelectBrand={handleElementSelect} />
        </div>
      </section>

      {/* Product Catalog Grid */}
      <section className="py-5 bg-white">
        <div className="container">
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 border-bottom pb-4 mb-5">
            <div>
              <h3 className="font-editorial text-uppercase text-dark mb-1" style={{ fontSize: "1.6rem" }}>
                Sacred Gemstone Collection
              </h3>
              <p className="text-secondary mb-0 text-uppercase font-semibold" style={{ fontSize: "0.7rem", letterSpacing: "0.05em" }}>
                Presenting {filteredProducts.length} certified precious stone items
              </p>
            </div>

            {/* Catalog search/sort controls */}
            <div className="d-flex flex-wrap align-items-center gap-3">
              <div className="d-flex align-items-center bg-light border px-3 py-1.5" style={{ width: "260px" }}>
                <input
                  type="text"
                  placeholder="Filter stone details..."
                  className="border-0 bg-transparent w-100 outline-none"
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

      {/* Brand Story Editorial Section */}
      <section className="py-5 bg-light border-top border-bottom">
        <div className="container">
          <div className="row g-5 align-items-center justify-content-between">
            <div className="col-12 col-md-5">
              <img
                src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&q=80&w=600"
                alt="Gem Artisan Studio"
                className="img-fluid border"
              />
            </div>
            <div className="col-12 col-md-6 d-flex flex-column gap-3">
              <span className="text-warning text-uppercase tracking-widest font-editorial" style={{ fontSize: "0.8rem", fontWeight: "600" }}>
                Our Lineage & Origin
              </span>
              <h2 className="font-editorial text-uppercase text-dark display-5">
                The Heritage of Spiritual Craft
              </h2>
              <p className="text-secondary" style={{ fontSize: "0.9rem", lineHeight: "1.7" }}>
                At GemAura, we believe that gemstones are not merely ornaments, but sacred repositories of geological memory and terrestrial energy. Every natural stone is carefully selected in accordance with stringent clarity benchmarks, and hand-strung by master artisans during optimal lunar transitions to maximize its protective vibrations.
              </p>
              <p className="text-secondary" style={{ fontSize: "0.9rem", lineHeight: "1.7" }}>
                We work directly with certified family-run mines in Myanmar, Brazil, and Uruguay, guaranteeing 100% authenticity and ecological mining practices.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-5 bg-white">
        <div className="container">
          <div className="text-center mb-5">
            <span className="text-secondary text-uppercase tracking-widest" style={{ fontSize: "0.75rem" }}>Collector Testimonials</span>
            <h2 className="font-editorial text-uppercase text-dark mt-2" style={{ fontSize: "2rem" }}>Aura Testimonials</h2>
          </div>
          <div className="row g-4">
            <div className="col-12 col-md-4">
              <div className="p-4 border bg-light h-100">
                <div className="text-warning mb-2">
                  <i className="bi bi-star-fill"></i> <i className="bi bi-star-fill"></i> <i className="bi bi-star-fill"></i> <i className="bi bi-star-fill"></i> <i className="bi bi-star-fill"></i>
                </div>
                <h4 className="font-editorial mb-3">"Magnificent energy balance"</h4>
                <p className="text-secondary text-sm" style={{ fontSize: "0.85rem" }}>
                  "The Burmese Jade bracelet is breathtaking. I felt an immediate calming presence upon wearing it. Excellent authenticity documents included."
                </p>
                <span className="d-block mt-3 text-uppercase tracking-wider text-dark font-bold" style={{ fontSize: "0.75rem" }}>— Marcus Sterling, San Francisco</span>
              </div>
            </div>
            <div className="col-12 col-md-4">
              <div className="p-4 border bg-light h-100">
                <div className="text-warning mb-2">
                  <i className="bi bi-star-fill"></i> <i className="bi bi-star-fill"></i> <i className="bi bi-star-fill"></i> <i className="bi bi-star-fill"></i> <i className="bi bi-star-fill"></i>
                </div>
                <h4 className="font-editorial mb-3">"Exquisite high polish"</h4>
                <p className="text-secondary text-sm" style={{ fontSize: "0.85rem" }}>
                  "The Imperial Amethyst ring is a work of art. The detailed gold-plating on silver highlights the deep violet stone perfectly. Pure luxury."
                </p>
                <span className="d-block mt-3 text-uppercase tracking-wider text-dark font-bold" style={{ fontSize: "0.75rem" }}>— Sofia Laurent, Paris</span>
              </div>
            </div>
            <div className="col-12 col-md-4">
              <div className="p-4 border bg-light h-100">
                <div className="text-warning mb-2">
                  <i className="bi bi-star-fill"></i> <i className="bi bi-star-fill"></i> <i className="bi bi-star-fill"></i> <i className="bi bi-star-fill"></i> <i className="bi bi-star-fill"></i>
                </div>
                <h4 className="font-editorial mb-3">"True manifestation stone"</h4>
                <p className="text-secondary text-sm" style={{ fontSize: "0.85rem" }}>
                  "My solar plexus energies feel aligned since acquiring the Golden Citrine Pendant. Truly premium and the gold chain has an unmatched luster."
                </p>
                <span className="d-block mt-3 text-uppercase tracking-wider text-dark font-bold" style={{ fontSize: "0.75rem" }}>— Harrison V., New York</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Specification Details Modal Overlay */}
      {activeProduct && (
        <SpecsModal
          laptop={activeProduct}
          onClose={() => setActiveProduct(null)}
        />
      )}
    </div>
  );
}
