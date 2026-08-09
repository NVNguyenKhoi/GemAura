import React from "react";

const ELEMENTS = [
  {
    name: "Wood",
    label: "Wood Element",
    tagline: "Growth & Harmony",
    badgeClass: "bg-success text-white"
  },
  {
    name: "Fire",
    label: "Fire Element",
    tagline: "Passion & Vitality",
    badgeClass: "bg-danger text-white"
  },
  {
    name: "Earth",
    label: "Earth Element",
    tagline: "Stability & Trust",
    badgeClass: "bg-warning text-dark"
  },
  {
    name: "Metal",
    label: "Metal Element",
    tagline: "Clarity & Strength",
    badgeClass: "bg-secondary text-white"
  },
  {
    name: "Water",
    label: "Water Element",
    tagline: "Flow & Abundance",
    badgeClass: "bg-dark text-white"
  }
];

export default function BrandFilter({ selectedBrand, onSelectBrand }) {
  return (
    <div className="w-100 mb-5">
      <div className="text-center mb-4">
        <span className="text-uppercase text-secondary tracking-widest" style={{ fontSize: "0.75rem", letterSpacing: "0.2em" }}>
          Harmonize Your Energy
        </span>
        <h2 className="font-editorial text-uppercase text-dark mt-2" style={{ fontSize: "2rem" }}>
          Shop by Feng Shui Element
        </h2>
        <div className="mx-auto bg-warning mt-2" style={{ height: "1px", width: "80px" }}></div>
      </div>

      <div className="row g-2 justify-content-center px-3" style={{ maxWidth: "1000px", margin: "0 auto" }}>
        {/* All Elements */}
        <div className="col-6 col-md-2">
          <button
            onClick={() => onSelectBrand(null)}
            className={`w-100 p-3 text-center border transition-all rounded-0 btn d-flex flex-column justify-content-center align-items-center ${
              selectedBrand === null
                ? "btn-dark border-dark text-white"
                : "btn-light border-light text-secondary"
            }`}
            style={{ minHeight: "80px" }}
          >
            <span className="text-uppercase tracking-wider font-bold" style={{ fontSize: "0.8rem" }}>All Gems</span>
            <span className="text-secondary mt-1" style={{ fontSize: "0.6rem" }}>Universal Flow</span>
          </button>
        </div>

        {/* Element Buttons */}
        {ELEMENTS.map((el) => {
          const isActive = selectedBrand === el.name;
          return (
            <div key={el.name} className="col-6 col-md-2">
              <button
                onClick={() => onSelectBrand(el.name)}
                className={`w-100 p-3 text-center border transition-all rounded-0 btn d-flex flex-column justify-content-center align-items-center ${
                  isActive
                    ? "btn-dark border-dark text-white"
                    : "btn-light border-light text-secondary"
                }`}
                style={{ minHeight: "80px" }}
              >
                <span className="text-uppercase tracking-wider font-bold" style={{ fontSize: "0.8rem" }}>{el.name}</span>
                <span className="text-secondary mt-1" style={{ fontSize: "0.6rem" }}>{el.tagline}</span>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
