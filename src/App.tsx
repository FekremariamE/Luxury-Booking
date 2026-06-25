import React, { useState, useMemo, useEffect } from "react";
import { PROPERTIES } from "./data";
import { Property, Room, SearchQuery, FilterState } from "./types";
import Hero from "./components/Hero";
import PropertyGrid from "./components/PropertyGrid";
import PropertyDetail from "./components/PropertyDetail";
import CheckoutFlow from "./components/CheckoutFlow";
import { Heart, Sparkles, Shield, Compass, BookOpen, User, Sun, Moon } from "lucide-react";

export default function App() {
  const [activeView, setActiveView] = useState<"home" | "detail" | "checkout">("home");
  const [theme, setTheme] = useState<"dark" | "light">(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("ethiopian_luxe_theme");
      if (saved === "light" || saved === "dark") return saved;
      return "dark"; // Default is dark (premium)
    }
    return "dark";
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === "light") {
      root.classList.add("light");
    } else {
      root.classList.remove("light");
    }
    localStorage.setItem("ethiopian_luxe_theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  // App-level state for active search query
  const [searchQuery, setSearchQuery] = useState<SearchQuery>({
    destination: "",
    startDate: "2026-06-15", // default high-season start
    endDate: "2026-06-18",   // default high-season end
    guests: {
      adults: 2,
      children: 0,
      rooms: 1
    }
  });

  // App-level state for filters
  const [filters, setFilters] = useState<FilterState>({
    priceRange: [500, 6000],
    amenities: [],
    stars: [],
    rating: null
  });

  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);

  // Saved properties state (fully operational heart-micro interaction)
  const [favorites, setFavorites] = useState<string[]>([]);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

  // Initialize favorites from localStorage on mount if available
  useEffect(() => {
    try {
      const saved = localStorage.getItem("Ethiopian Luxe_favs");
      if (saved) {
        setFavorites(JSON.parse(saved));
      }
    } catch (e) {
      console.warn("Storage access not available.", e);
    }
  }, []);

  const handleToggleFavorite = (id: string) => {
    let updated;
    if (favorites.includes(id)) {
      updated = favorites.filter((favId) => favId !== id);
    } else {
      updated = [...favorites, id];
    }
    setFavorites(updated);
    try {
      localStorage.setItem("Ethiopian Luxe_favs", JSON.stringify(updated));
    } catch (e) {
      console.warn("Unable to save favorites to storage.", e);
    }
  };

  const handleSearch = (query: SearchQuery) => {
    setSearchQuery(query);
    // Scroll smoothly to results list
    const resultsElement = document.getElementById("property-grid-module");
    if (resultsElement) {
      resultsElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleSelectProperty = (property: Property) => {
    setSelectedProperty(property);
    setSelectedRoom(property.rooms[0]); // default to first room
    setActiveView("detail");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleInitiateBooking = (room: Room) => {
    setSelectedRoom(room);
    setActiveView("checkout");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBookingComplete = () => {
    // Reset view states on complete
    setActiveView("home");
    setSelectedProperty(null);
    setSelectedRoom(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Live filtered properties based on search text, price range, stars, and amenities
  const filteredProperties = useMemo(() => {
    return PROPERTIES.filter((property) => {
      // 1. Destination Match
      if (searchQuery.destination) {
        const destLower = searchQuery.destination.toLowerCase();
        const matchesLoc = property.location.toLowerCase().includes(destLower);
        const matchesReg = property.region.toLowerCase().includes(destLower);
        const matchesName = property.name.toLowerCase().includes(destLower);
        if (!matchesLoc && !matchesReg && !matchesName) return false;
      }

      // 2. Favorites only toggle filter
      if (showFavoritesOnly && !favorites.includes(property.id)) {
        return false;
      }

      // 3. Price Filter (checking against property basePrice)
      if (property.basePrice > filters.priceRange[1]) {
        return false;
      }

      // 4. Star Filter
      if (filters.stars.length > 0 && !filters.stars.includes(property.stars)) {
        return false;
      }

      // 5. Amenities Filter (property must have ALL selected amenities)
      if (filters.amenities.length > 0) {
        const hasAllAmenities = filters.amenities.every((amenity) =>
          property.amenities.includes(amenity)
        );
        if (!hasAllAmenities) return false;
      }

      return true;
    });
  }, [searchQuery.destination, showFavoritesOnly, favorites, filters]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-amber-500 selection:text-slate-950 flex flex-col justify-between">
      {/* Editorial Luxury Header / Top Bar */}
      <header className="sticky top-0 z-40 bg-slate-950/80 backdrop-blur-md border-b border-slate-900 px-6 py-4 md:px-12 flex justify-between items-center max-w-7xl mx-auto w-full">
        {/* Luxury Wide Logo spacing */}
        <div
          onClick={() => {
            setActiveView("home");
            setSelectedProperty(null);
            setShowFavoritesOnly(false);
          }}
          className="cursor-pointer group flex items-center gap-2"
          id="app-header-logo"
        >
          <Compass className="text-amber-500 transition-transform duration-700 group-hover:rotate-180" size={18} />
          <span className="font-serif text-lg tracking-[0.25em] text-amber-500 uppercase font-semibold group-hover:text-slate-100 transition-colors">
            ETHIOPIAN LUXE
          </span>
        </div>

        {/* Minimal Nav menu */}
        <nav className="flex items-center gap-6 text-[11px] uppercase tracking-[0.2em] text-slate-400">
          <button
            onClick={() => {
              setActiveView("home");
              setSelectedProperty(null);
              setShowFavoritesOnly(false);
            }}
            className={`hover:text-slate-100 transition-colors cursor-pointer pb-1 ${activeView === "home" && !showFavoritesOnly ? "text-slate-100 border-b border-amber-500" : ""}`}
          >
            Portfolio
          </button>

          {/* Interactive Favorites Selector */}
          <button
            onClick={() => {
              setActiveView("home");
              setSelectedProperty(null);
              setShowFavoritesOnly(true);
            }}
            className={`hover:text-slate-100 transition-colors cursor-pointer flex items-center gap-1.5 pb-1 ${showFavoritesOnly ? "text-slate-100 border-b border-amber-500" : ""}`}
            id="favorites-nav-trigger"
          >
            <Heart size={10} className={favorites.length > 0 ? "fill-amber-500 text-amber-500" : ""} />
            <span>Saved {favorites.length > 0 && `(${favorites.length})`}</span>
          </button>

          <span className="hidden md:inline text-slate-800">|</span>

          {/* User profile mockup link */}
          <div className="hidden md:flex items-center gap-2 text-slate-300 hover:text-slate-100 transition-colors cursor-pointer">
            <User size={12} className="text-amber-500" />
            <span className="normal-case text-[11px] tracking-widest uppercase">M. Sterling</span>
          </div>

          <span className="text-slate-800">|</span>

          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className="w-8 h-8 rounded-full border border-slate-850 hover:border-slate-700 hover:text-slate-100 flex items-center justify-center transition-all cursor-pointer text-slate-400"
            aria-label="Toggle Theme"
          >
            {theme === "dark" ? <Sun size={14} className="text-amber-500" /> : <Moon size={14} className="text-amber-500" />}
          </button>
        </nav>
      </header>

      {/* Main View Portals */}
      <main className="flex-grow">
        {activeView === "home" && (
          <div>
            {/* A. Immersive Hero & Floating Search */}
            <Hero onSearch={handleSearch} activeQuery={searchQuery} />

            {/* B. Dynamic Property Grid & Filters */}
            <PropertyGrid
              properties={filteredProperties}
              favorites={favorites}
              onToggleFavorite={handleToggleFavorite}
              onSelectProperty={handleSelectProperty}
              filters={filters}
              onFilterChange={setFilters}
            />
          </div>
        )}

        {activeView === "detail" && selectedProperty && (
          /* C. Interactive Property Detail View */
          <PropertyDetail
            property={selectedProperty}
            onBack={() => {
              setActiveView("home");
              window.scrollTo({ top: 300, behavior: "smooth" });
            }}
            searchQuery={searchQuery}
            favorites={favorites}
            onToggleFavorite={handleToggleFavorite}
            onInitiateBooking={handleInitiateBooking}
          />
        )}

        {activeView === "checkout" && selectedProperty && selectedRoom && (
          /* D. Frictionless Checkout Flow */
          <CheckoutFlow
            property={selectedProperty}
            room={selectedRoom}
            searchQuery={searchQuery}
            onCancel={() => {
              setActiveView("detail");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            onBookingComplete={handleBookingComplete}
          />
        )}
      </main>

      {/* Clean Architectural Footer */}
      <footer className="bg-slate-950 border-t border-slate-900 py-12 px-6 md:px-12 text-center text-slate-500 mt-20 max-w-7xl mx-auto w-full">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-8 text-[11px] font-mono uppercase tracking-wider">
          <div className="flex items-center gap-2">
            <Compass size={14} className="text-amber-500" />
            <span className="text-slate-100">Luxe Reserves</span>
          </div>

          <div className="flex gap-6">
            <span className="flex items-center gap-1"><Shield size={12} className="text-amber-500" /> Secure Guarantee</span>
            <span className="flex items-center gap-1"><Sparkles size={12} className="text-amber-500" /> Eco-Certified Haven</span>
          </div>
        </div>

        <div className="text-xs text-slate-600 font-light flex flex-col md:flex-row justify-between items-center gap-4">
          <p>© 2026 Ethiopian Luxe. All rights reserved. For quiet travel aficionados only.</p>
          <div className="flex gap-4 font-mono text-[10px]">
            <a href="#terms" className="hover:text-slate-400 transition-colors">Voucher Terms</a>
            <span>•</span>
            <a href="#privacy" className="hover:text-slate-400 transition-colors">Privacy Charter</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
