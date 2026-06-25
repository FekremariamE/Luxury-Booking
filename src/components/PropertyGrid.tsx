import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Heart, Star, SlidersHorizontal, ChevronLeft, ChevronRight, Check, X, MapPin } from "lucide-react";
import { Property, FilterState } from "../types";
import { ALL_AMENITIES } from "../data";

interface PropertyGridProps {
  properties: Property[];
  favorites: string[];
  onToggleFavorite: (id: string) => void;
  onSelectProperty: (property: Property) => void;
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
}

export default function PropertyGrid({
  properties,
  favorites,
  onToggleFavorite,
  onSelectProperty,
  filters,
  onFilterChange
}: PropertyGridProps) {
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [activeCarousels, setActiveCarousels] = useState<{ [key: string]: number }>({});

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const maxVal = parseInt(e.target.value);
    onFilterChange({
      ...filters,
      priceRange: [filters.priceRange[0], maxVal]
    });
  };

  const handleAmenityToggle = (amenity: string) => {
    const exists = filters.amenities.includes(amenity);
    const updated = exists
      ? filters.amenities.filter((a) => a !== amenity)
      : [...filters.amenities, amenity];
    
    onFilterChange({ ...filters, amenities: updated });
  };

  const handleStarToggle = (star: number) => {
    const exists = filters.stars.includes(star);
    const updated = exists
      ? filters.stars.filter((s) => s !== star)
      : [...filters.stars, star];
    
    onFilterChange({ ...filters, stars: updated });
  };

  const resetFilters = () => {
    onFilterChange({
      priceRange: [500, 6000],
      amenities: [],
      stars: [],
      rating: null
    });
  };

  // Carousel Navigation helpers
  const nextImage = (e: React.MouseEvent, propId: string, maxImages: number) => {
    e.stopPropagation();
    const current = activeCarousels[propId] || 0;
    setActiveCarousels({
      ...activeCarousels,
      [propId]: (current + 1) % maxImages
    });
  };

  const prevImage = (e: React.MouseEvent, propId: string, maxImages: number) => {
    e.stopPropagation();
    const current = activeCarousels[propId] || 0;
    setActiveCarousels({
      ...activeCarousels,
      [propId]: (current - 1 + maxImages) % maxImages
    });
  };

  const activeFiltersCount = 
    (filters.priceRange[1] < 6000 ? 1 : 0) + 
    filters.amenities.length + 
    filters.stars.length;

  return (
    <div className="w-full bg-slate-950 px-6 py-12 md:py-16 md:px-12 max-w-7xl mx-auto font-sans" id="property-grid-module">
      {/* Module Title / Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 border-b border-slate-900 pb-6" id="grid-header">
        <div>
          <div className="text-amber-500 font-mono tracking-widest text-xs uppercase mb-2">Architectural Portfolio</div>
          <h2 className="text-3xl font-serif text-white">Select Your Sanctuary</h2>
        </div>
        
        {/* Mobile Filter Toggle & Quick Info */}
        <div className="flex items-center gap-4 mt-4 md:mt-0">
          <p className="text-xs text-slate-400 font-mono">
            Showing <span className="text-white font-medium">{properties.length}</span> exceptional property matches
          </p>
          <button
            onClick={() => setShowMobileFilters(true)}
            className="md:hidden flex items-center gap-2 bg-slate-900 border border-slate-800 text-white px-4 py-2.5 rounded-xl text-xs font-medium uppercase tracking-wider hover:bg-slate-800 transition-colors"
          >
            <SlidersHorizontal size={14} />
            <span>Filters {activeFiltersCount > 0 && `(${activeFiltersCount})`}</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 items-start">
        {/* Desktop Sidebar Filters */}
        <div className="hidden md:block col-span-1 sticky top-28 bg-slate-900/40 border border-slate-900 rounded-2xl p-6" id="desktop-filters">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xs font-mono font-semibold uppercase tracking-widest text-white">Refine Search</h3>
            {activeFiltersCount > 0 && (
              <button 
                onClick={resetFilters}
                className="text-[11px] text-amber-500/80 hover:text-amber-500 font-mono hover:underline transition-all"
              >
                Reset All
              </button>
            )}
          </div>

          {/* Price Range Filter */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-3">
              <span className="text-xs text-slate-300 font-medium">Max Price / Night</span>
              <span className="text-xs text-amber-500 font-mono font-semibold">${filters.priceRange[1].toLocaleString()}</span>
            </div>
            <input
              type="range"
              min="500"
              max="6000"
              step="100"
              value={filters.priceRange[1]}
              onChange={handlePriceChange}
              className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-1.5">
              <span>$500</span>
              <span>$6,000+</span>
            </div>
          </div>

          {/* Luxury Amenities Filter */}
          <div className="mb-8">
            <h4 className="text-xs text-slate-300 font-semibold mb-3 uppercase tracking-wider">Luxury Amenities</h4>
            <div className="space-y-2.5">
              {ALL_AMENITIES.map((amenity) => {
                const checked = filters.amenities.includes(amenity);
                return (
                  <label key={amenity} className="flex items-center gap-3 cursor-pointer group text-xs text-slate-400 hover:text-white transition-colors">
                    <div 
                      onClick={() => handleAmenityToggle(amenity)}
                      className={`w-4 h-4 rounded border flex items-center justify-center transition-all duration-150 ${
                        checked ? "bg-amber-500 border-amber-500" : "border-slate-700 bg-slate-950"
                      }`}
                    >
                      {checked && <Check size={10} className="text-slate-950 stroke-[3]" />}
                    </div>
                    <span>{amenity}</span>
                  </label>
                );
              })}
            </div>
          </div>

          {/* Rating / Tier Filter */}
          <div>
            <h4 className="text-xs text-slate-300 font-semibold mb-3 uppercase tracking-wider">Property Class</h4>
            <div className="grid grid-cols-2 gap-2">
              {[5, 4].map((star) => {
                const checked = filters.stars.includes(star);
                return (
                  <button
                    key={star}
                    type="button"
                    onClick={() => handleStarToggle(star)}
                    className={`py-2 px-3 rounded-lg border text-xs font-mono flex items-center justify-center gap-1.5 transition-all duration-200 ${
                      checked 
                        ? "bg-amber-500/10 border-amber-500 text-amber-500" 
                        : "bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700"
                    }`}
                  >
                    <Star size={12} className={checked ? "fill-amber-500 text-amber-500" : ""} />
                    <span>{star} Star</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Property Grid List */}
        <div className="col-span-1 md:col-span-3">
          {properties.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center bg-slate-900/20 border border-slate-900/60 rounded-3xl p-8">
              <p className="text-sm text-slate-500 font-mono mb-4">No quiet havens found matching your filters</p>
              <button 
                onClick={resetFilters}
                className="bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs tracking-wider uppercase font-semibold py-2.5 px-6 rounded-xl transition-all"
              >
                Clear all filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8" id="grid-cards-list">
              {properties.map((property) => {
                const activeImgIdx = activeCarousels[property.id] || 0;
                const isFavorite = favorites.includes(property.id);

                return (
                  <motion.div
                    key={property.id}
                    layoutId={`prop-card-${property.id}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    onClick={() => onSelectProperty(property)}
                    className="group bg-slate-900/30 border border-slate-900 rounded-2xl overflow-hidden hover:border-slate-800 transition-all duration-300 cursor-pointer flex flex-col h-full shadow-lg"
                  >
                    {/* Image Carousel Area */}
                    <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-950">
                      {/* Image Slide */}
                      <div className="w-full h-full relative">
                        <img
                          src={property.images[activeImgIdx]}
                          alt={property.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                          loading="lazy"
                        />
                      </div>

                      {/* Heart Toggle Indicator */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onToggleFavorite(property.id);
                        }}
                        className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-slate-950/40 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:bg-slate-900 transition-colors"
                        id={`favorite-toggle-${property.id}`}
                      >
                        <Heart
                          size={15}
                          className={`transition-transform duration-300 active:scale-125 ${
                            isFavorite ? "fill-amber-500 text-amber-500" : "text-white"
                          }`}
                        />
                      </button>

                      {/* Hover Arrow Controls */}
                      <div className="absolute inset-x-3 top-1/2 -translate-y-1/2 flex justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
                        <button
                          type="button"
                          onClick={(e) => prevImage(e, property.id, property.images.length)}
                          className="w-8 h-8 rounded-full bg-slate-950/60 border border-white/5 flex items-center justify-center text-white hover:bg-slate-950 transition-colors"
                        >
                          <ChevronLeft size={16} />
                        </button>
                        <button
                          type="button"
                          onClick={(e) => nextImage(e, property.id, property.images.length)}
                          className="w-8 h-8 rounded-full bg-slate-950/60 border border-white/5 flex items-center justify-center text-white hover:bg-slate-950 transition-colors"
                        >
                          <ChevronRight size={16} />
                        </button>
                      </div>

                      {/* Dots indicators */}
                      <div className="absolute bottom-4 inset-x-0 flex justify-center gap-1.5 z-10">
                        {property.images.map((_, idx) => (
                          <div
                            key={idx}
                            className={`h-1 rounded-full transition-all duration-300 ${
                              idx === activeImgIdx ? "w-4 bg-amber-500" : "w-1.5 bg-white/45"
                            }`}
                          />
                        ))}
                      </div>

                      {/* Tiny subtle luxury overlay for pricing */}
                      <div className="absolute bottom-4 right-4 z-10 bg-slate-950/85 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-800/80 text-xs font-mono text-white">
                        From <span className="font-semibold text-amber-500">${property.basePrice.toLocaleString()}</span> / night
                      </div>
                    </div>

                    {/* Meta details */}
                    <div className="p-6 flex flex-col flex-grow">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-mono tracking-widest text-slate-500 flex items-center gap-1">
                          <MapPin size={10} className="text-amber-500" />
                          {property.location}
                        </span>
                        
                        <div className="flex items-center gap-1 text-[10px] font-mono text-slate-300">
                          <Star size={10} className="fill-amber-500 text-amber-500" />
                          <span>{property.rating.toFixed(2)}</span>
                        </div>
                      </div>

                      <h3 className="font-serif text-lg text-white mb-1 tracking-tight group-hover:text-amber-500 transition-colors">
                        {property.name}
                      </h3>
                      
                      <p className="text-xs text-slate-400 font-light line-clamp-2 leading-relaxed mb-4 flex-grow">
                        {property.tagline}
                      </p>

                      {/* Display key amenities icons/badges */}
                      <div className="flex flex-wrap gap-1.5 mt-auto pt-4 border-t border-slate-900">
                        {property.amenities.slice(0, 3).map((amenity) => (
                          <span 
                            key={amenity} 
                            className="text-[9px] font-mono text-slate-500 bg-slate-950/60 border border-slate-900 py-0.5 px-2 rounded-md"
                          >
                            {amenity}
                          </span>
                        ))}
                        {property.amenities.length > 3 && (
                          <span className="text-[9px] font-mono text-amber-500/80 py-0.5 px-1 bg-amber-500/5 rounded">
                            +{property.amenities.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Slide-out Mobile Filters Drawer */}
      <AnimatePresence>
        {showMobileFilters && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowMobileFilters(false)}
              className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 md:hidden"
            />

            {/* Content panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 right-0 w-full sm:w-80 bg-slate-900 border-l border-slate-800 p-6 z-50 overflow-y-auto md:hidden"
              id="mobile-filters-drawer"
            >
              <div className="flex items-center justify-between mb-6 border-b border-slate-800 pb-4">
                <h3 className="text-sm font-mono font-bold uppercase tracking-wider text-white flex items-center gap-2">
                  <SlidersHorizontal size={14} />
                  <span>Filters</span>
                </h3>
                <button
                  onClick={() => setShowMobileFilters(false)}
                  className="w-8 h-8 rounded-full bg-slate-950 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white"
                >
                  <X size={14} />
                </button>
              </div>

              {/* Price range inside mobile filters */}
              <div className="mb-8">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-xs text-slate-300 font-medium">Max Price / Night</span>
                  <span className="text-xs text-amber-500 font-mono font-semibold">${filters.priceRange[1].toLocaleString()}</span>
                </div>
                <input
                  type="range"
                  min="500"
                  max="6000"
                  step="100"
                  value={filters.priceRange[1]}
                  onChange={handlePriceChange}
                  className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
                />
              </div>

              {/* Amenities inside mobile filters */}
              <div className="mb-8">
                <h4 className="text-xs text-slate-300 font-semibold mb-3 uppercase tracking-wider">Amenities</h4>
                <div className="space-y-3">
                  {ALL_AMENITIES.map((amenity) => {
                    const checked = filters.amenities.includes(amenity);
                    return (
                      <label key={amenity} className="flex items-center gap-3 cursor-pointer text-xs text-slate-400 hover:text-white">
                        <div 
                          onClick={() => handleAmenityToggle(amenity)}
                          className={`w-4 h-4 rounded border flex items-center justify-center transition-all ${
                            checked ? "bg-amber-500 border-amber-500" : "border-slate-700 bg-slate-950"
                          }`}
                        >
                          {checked && <Check size={10} className="text-slate-950 stroke-[3]" />}
                        </div>
                        <span>{amenity}</span>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Rating inside mobile filters */}
              <div className="mb-8">
                <h4 className="text-xs text-slate-300 font-semibold mb-3 uppercase tracking-wider font-mono">Hotel Rating</h4>
                <div className="grid grid-cols-2 gap-2">
                  {[5, 4].map((star) => {
                    const checked = filters.stars.includes(star);
                    return (
                      <button
                        key={star}
                        type="button"
                        onClick={() => handleStarToggle(star)}
                        className={`py-2 px-3 rounded-lg border text-xs font-mono flex items-center justify-center gap-1.5 transition-all ${
                          checked 
                            ? "bg-amber-500/10 border-amber-500 text-amber-500" 
                            : "bg-slate-950 border-slate-800 text-slate-400"
                        }`}
                      >
                        <Star size={12} className={checked ? "fill-amber-500 text-amber-500" : ""} />
                        <span>{star} Star</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Sticky bottom actions inside mobile filters */}
              <div className="pt-4 border-t border-slate-800 flex gap-3">
                <button
                  onClick={resetFilters}
                  className="flex-1 py-3 bg-slate-950 border border-slate-800 text-slate-400 rounded-xl text-xs font-semibold uppercase tracking-wider font-mono"
                >
                  Reset
                </button>
                <button
                  onClick={() => setShowMobileFilters(false)}
                  className="flex-1 py-3 bg-amber-500 text-slate-950 rounded-xl text-xs font-semibold uppercase tracking-wider font-mono font-bold"
                >
                  Apply
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
