import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Search, Calendar, Users, MapPin, ChevronDown, Plus, Minus, X } from "lucide-react";
import { SearchQuery } from "../types";
import { DESTINATIONS } from "../data";

interface HeroProps {
  onSearch: (query: SearchQuery) => void;
  activeQuery: SearchQuery;
}

export default function Hero({ onSearch, activeQuery }: HeroProps) {
  const [query, setQuery] = useState<SearchQuery>(activeQuery);
  const [activeDropdown, setActiveDropdown] = useState<"destination" | "dates" | "guests" | null>(null);
  const [destSearch, setDestSearch] = useState(activeQuery.destination);
  
  const destRef = useRef<HTMLDivElement>(null);
  const datesRef = useRef<HTMLDivElement>(null);
  const guestsRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (destRef.current && !destRef.current.contains(event.target as Node)) {
        if (activeDropdown === "destination") setActiveDropdown(null);
      }
      if (datesRef.current && !datesRef.current.contains(event.target as Node)) {
        if (activeDropdown === "dates") setActiveDropdown(null);
      }
      if (guestsRef.current && !guestsRef.current.contains(event.target as Node)) {
        if (activeDropdown === "guests") setActiveDropdown(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [activeDropdown]);

  // Sync state if parent query changes
  useEffect(() => {
    setQuery(activeQuery);
    setDestSearch(activeQuery.destination);
  }, [activeQuery]);

  // Simple custom June / July 2026 Calendar Generation
  const generateDays = (month: number, year: number) => {
    const firstDay = new Date(year, month, 1).getDay(); // 0 is Sunday
    const totalDays = new Date(year, month + 1, 0).getDate();
    
    const days: (number | null)[] = [];
    // Offset for starting day (adjusting Sunday=0 to Monday=1, or keep standard Sunday-first layout)
    // Standard Sunday-first calendar
    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }
    for (let d = 1; d <= totalDays; d++) {
      days.push(d);
    }
    return days;
  };

  const juneDays = generateDays(5, 2026); // June is index 5
  const julyDays = generateDays(6, 2026); // July is index 6

  const handleDateClick = (day: number, month: number, year: number) => {
    const dateString = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    
    if (!query.startDate || (query.startDate && query.endDate)) {
      setQuery({
        ...query,
        startDate: dateString,
        endDate: null,
      });
    } else {
      // If end date is selected before start date, make it start date
      if (new Date(dateString) < new Date(query.startDate)) {
        setQuery({
          ...query,
          startDate: dateString,
          endDate: null,
        });
      } else {
        setQuery({
          ...query,
          endDate: dateString,
        });
      }
    }
  };

  const isSelected = (day: number | null, month: number, year: number) => {
    if (!day) return false;
    const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    return query.startDate === dateStr || query.endDate === dateStr;
  };

  const isInRange = (day: number | null, month: number, year: number) => {
    if (!day || !query.startDate || !query.endDate) return false;
    const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    const d = new Date(dateStr);
    return d > new Date(query.startDate) && d < new Date(query.endDate);
  };

  const handleSearchSubmit = () => {
    onSearch(query);
    setActiveDropdown(null);
  };

  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  };

  const guestCountText = `${query.guests.adults + query.guests.children} Guest${query.guests.adults + query.guests.children > 1 ? "s" : ""}, ${query.guests.rooms} Room${query.guests.rooms > 1 ? "s" : ""}`;

  return (
    <div className="relative h-[80vh] md:h-[85vh] w-full flex items-center justify-center overflow-hidden bg-slate-950 font-sans transition-colors duration-300" id="hero-section">
      {/* Immersive background image slider / parallax effect */}
      <div className="absolute inset-0">
        <div 
          className="w-full h-full bg-cover bg-center opacity-40 scale-105 transition-transform duration-[10000ms] ease-out-sine"
          style={{ 
            backgroundImage: "url('https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&q=80&w=2000')" 
          }}
        />
        {/* Soft, custom gradient overlays for rich cinematics */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-slate-950/50" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/60 via-transparent to-slate-950/60" />
      </div>

      {/* Main Content container */}
      <div className="relative z-10 w-full max-w-6xl px-6 md:px-12 flex flex-col items-center justify-center text-center">
        {/* Header Branding Accent */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="mb-3 text-amber-500 font-mono tracking-[0.25em] text-xs uppercase"
          id="hero-header-label"
        >
          An Assembly of Rarities
        </motion.div>

        {/* Editorial Heading */}
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.1 }}
          className="text-4xl md:text-6xl font-serif text-slate-100 tracking-tight leading-[1.1] max-w-3xl mb-6"
          id="hero-title"
        >
          Slow luxury travel, <br />
          <span className="text-slate-300 font-light italic">curated for the quiet mind.</span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.25 }}
          className="text-sm md:text-base text-slate-400 font-light max-w-lg mb-12 tracking-wide leading-relaxed"
          id="hero-tagline"
        >
          Ditch the clutter. Browse an architectural portfolio of the world's finest boutique resorts, private islands, and mountain retreats.
        </motion.p>

        {/* Floating Search Utility */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="w-full max-w-4xl bg-slate-900/90 backdrop-blur-xl border border-slate-800 rounded-2xl shadow-2xl p-2 flex flex-col md:flex-row gap-1 items-stretch"
          id="floating-search-bar"
        >
          {/* Destination Autocomplete */}
          <div ref={destRef} className="relative flex-1 group" id="search-dest-container">
            <div 
              onClick={() => setActiveDropdown("destination")}
              className="h-full px-5 py-3 md:py-4 flex flex-col items-start justify-center cursor-pointer hover:bg-slate-800/50 rounded-xl transition-all duration-300"
            >
              <div className="flex items-center gap-2 text-xs text-amber-500 font-mono uppercase tracking-wider mb-1">
                <MapPin size={12} />
                <span>Destination</span>
              </div>
              <input 
                type="text"
                placeholder="Where to find sanctuary?"
                value={destSearch}
                onChange={(e) => {
                  setDestSearch(e.target.value);
                  setQuery({ ...query, destination: e.target.value });
                  if (activeDropdown !== "destination") setActiveDropdown("destination");
                }}
                className="bg-transparent text-sm font-medium text-slate-100 placeholder-slate-500 w-full focus:outline-none select-none"
              />
            </div>

            <AnimatePresence>
              {activeDropdown === "destination" && (
                <motion.div 
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute left-0 right-0 mt-2 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl overflow-hidden z-50 text-left"
                  id="dest-autocomplete-dropdown"
                >
                  <div className="p-3 border-b border-slate-800 text-xs font-mono text-slate-500 uppercase tracking-widest">
                    Recommended Havens
                  </div>
                  <div className="max-h-60 overflow-y-auto">
                    {DESTINATIONS.filter(d => 
                      d.name.toLowerCase().includes(destSearch.toLowerCase()) || 
                      d.region.toLowerCase().includes(destSearch.toLowerCase())
                    ).map((dest) => (
                      <div 
                        key={dest.name}
                        onClick={() => {
                          setQuery({ ...query, destination: dest.name });
                          setDestSearch(dest.name);
                          setActiveDropdown("dates"); // Move to next field naturally
                        }}
                        className="px-4 py-3 hover:bg-slate-800/80 cursor-pointer flex items-start gap-3 transition-colors duration-200 border-b border-slate-800/40 last:border-0"
                      >
                        <MapPin size={16} className="text-amber-500 mt-1 flex-shrink-0" />
                        <div>
                          <div className="text-sm font-medium text-slate-100">{dest.name}</div>
                          <div className="text-xs text-slate-400 font-light mt-0.5">{dest.description}</div>
                        </div>
                      </div>
                    ))}
                    {DESTINATIONS.filter(d => 
                      d.name.toLowerCase().includes(destSearch.toLowerCase())
                    ).length === 0 && (
                      <div className="p-4 text-center text-xs text-slate-500 italic">
                        No sanctuaries found matching your search.
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="hidden md:block w-[1px] bg-slate-800/70 self-stretch my-2" />

          {/* Date Picker */}
          <div ref={datesRef} className="relative flex-1" id="search-dates-container">
            <div 
              onClick={() => setActiveDropdown("dates")}
              className="h-full px-5 py-3 md:py-4 flex flex-col items-start justify-center cursor-pointer hover:bg-slate-800/50 rounded-xl transition-all duration-300"
            >
              <div className="flex items-center gap-2 text-xs text-amber-500 font-mono uppercase tracking-wider mb-1">
                <Calendar size={12} />
                <span>Travel Dates</span>
              </div>
              <div className="text-sm font-medium text-slate-100 truncate max-w-full">
                {query.startDate ? (
                  <span>
                    {formatDate(query.startDate)}
                    {query.endDate ? ` — ${formatDate(query.endDate)}` : " (Select end)"}
                  </span>
                ) : (
                  <span className="text-slate-500">When will you retreat?</span>
                )}
              </div>
            </div>

            <AnimatePresence>
              {activeDropdown === "dates" && (
                <motion.div 
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute left-1/2 -translate-x-1/2 md:translate-x-0 md:-left-40 lg:-left-20 w-[92vw] sm:w-[580px] md:w-[600px] mt-2 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl p-5 z-50 text-left"
                  id="dates-picker-dropdown"
                >
                  <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-800">
                    <div className="text-sm font-mono text-slate-100">Select Dates (Summer 2026)</div>
                    <button 
                      onClick={() => setQuery({ ...query, startDate: null, endDate: null })}
                      className="text-xs text-slate-500 hover:text-slate-100 transition-colors underline decoration-slate-600 underline-offset-2"
                    >
                      Clear dates
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* June 2026 */}
                    <div>
                      <div className="text-xs font-semibold text-slate-100 tracking-widest uppercase mb-3 text-center">June 2026</div>
                      <div className="grid grid-cols-7 gap-1 text-center text-[10px] font-mono text-slate-500 mb-2 uppercase">
                        <div>Su</div><div>Mo</div><div>Tu</div><div>We</div><div>Th</div><div>Fr</div><div>Sa</div>
                      </div>
                      <div className="grid grid-cols-7 gap-1">
                        {juneDays.map((day, idx) => {
                          const active = day ? isSelected(day, 5, 2026) : false;
                          const inRng = day ? isInRange(day, 5, 2026) : false;
                          return (
                            <div key={`june-${idx}`} className="h-8 flex items-center justify-center">
                              {day ? (
                                <button
                                  type="button"
                                  onClick={() => handleDateClick(day, 5, 2026)}
                                  className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-medium transition-all duration-150 ${
                                    active 
                                      ? "bg-amber-500 text-slate-950 font-bold scale-105" 
                                      : inRng 
                                        ? "bg-amber-500/20 text-amber-300" 
                                        : "text-slate-300 hover:bg-slate-800"
                                  }`}
                                >
                                  {day}
                                </button>
                              ) : null}
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* July 2026 */}
                    <div>
                      <div className="text-xs font-semibold text-slate-100 tracking-widest uppercase mb-3 text-center">July 2026</div>
                      <div className="grid grid-cols-7 gap-1 text-center text-[10px] font-mono text-slate-500 mb-2 uppercase">
                        <div>Su</div><div>Mo</div><div>Tu</div><div>We</div><div>Th</div><div>Fr</div><div>Sa</div>
                      </div>
                      <div className="grid grid-cols-7 gap-1">
                        {julyDays.map((day, idx) => {
                          const active = day ? isSelected(day, 6, 2026) : false;
                          const inRng = day ? isInRange(day, 6, 2026) : false;
                          return (
                            <div key={`july-${idx}`} className="h-8 flex items-center justify-center">
                              {day ? (
                                <button
                                  type="button"
                                  onClick={() => handleDateClick(day, 6, 2026)}
                                  className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-medium transition-all duration-150 ${
                                    active 
                                      ? "bg-amber-500 text-slate-950 font-bold scale-105" 
                                      : inRng 
                                        ? "bg-amber-500/20 text-amber-300" 
                                        : "text-slate-300 hover:bg-slate-800"
                                  }`}
                                >
                                  {day}
                                </button>
                              ) : null}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  <div className="mt-5 flex items-center justify-between pt-3 border-t border-slate-800 text-[11px] text-slate-500">
                    <div>*Dates constrained to exclusive Summer booking slots</div>
                    <button
                      type="button"
                      onClick={() => setActiveDropdown("guests")}
                      className="bg-slate-800 hover:bg-slate-700 text-slate-100 font-medium py-1.5 px-3 rounded-lg transition-colors duration-150"
                    >
                      Confirm Dates
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="hidden md:block w-[1px] bg-slate-800 self-stretch my-2" />

          {/* Guest/Room Counter */}
          <div ref={guestsRef} className="relative flex-1 animate-all" id="search-guests-container">
            <div 
              onClick={() => setActiveDropdown("guests")}
              className="h-full px-5 py-3 md:py-4 flex flex-col items-start justify-center cursor-pointer hover:bg-slate-800/50 rounded-xl transition-all duration-300"
            >
              <div className="flex items-center gap-2 text-xs text-amber-500 font-mono uppercase tracking-wider mb-1">
                <Users size={12} />
                <span>Accommodations</span>
              </div>
              <div className="text-sm font-medium text-slate-100 truncate max-w-full">
                {guestCountText}
              </div>
            </div>

            <AnimatePresence>
              {activeDropdown === "guests" && (
                <motion.div 
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 mt-2 w-80 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl p-5 z-50 text-left"
                  id="guests-dropdown"
                >
                  <div className="space-y-4">
                    {/* Adults */}
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-sm font-medium text-slate-100">Adults</div>
                        <div className="text-xs text-slate-500 font-light mt-0.5">Ages 13 or above</div>
                      </div>
                      <div className="flex items-center gap-3">
                        <button 
                          type="button"
                          onClick={() => setQuery({
                            ...query,
                            guests: { ...query.guests, adults: Math.max(1, query.guests.adults - 1) }
                          })}
                          className="w-8 h-8 rounded-lg border border-slate-700 flex items-center justify-center text-slate-400 hover:border-slate-100 hover:text-slate-100 transition-colors"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="text-sm font-mono font-medium text-slate-100 w-6 text-center">{query.guests.adults}</span>
                        <button 
                          type="button"
                          onClick={() => setQuery({
                            ...query,
                            guests: { ...query.guests, adults: Math.min(10, query.guests.adults + 1) }
                          })}
                          className="w-8 h-8 rounded-lg border border-slate-700 flex items-center justify-center text-slate-400 hover:border-slate-100 hover:text-slate-100 transition-colors"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                    </div>

                    {/* Children */}
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-sm font-medium text-slate-100">Children</div>
                        <div className="text-xs text-slate-500 font-light mt-0.5 font-sans">Ages 2 to 12</div>
                      </div>
                      <div className="flex items-center gap-3">
                        <button 
                          type="button"
                          onClick={() => setQuery({
                            ...query,
                            guests: { ...query.guests, children: Math.max(0, query.guests.children - 1) }
                          })}
                          className="w-8 h-8 rounded-lg border border-slate-700 flex items-center justify-center text-slate-400 hover:border-slate-100 hover:text-slate-100 transition-colors"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="text-sm font-mono font-medium text-slate-100 w-6 text-center">{query.guests.children}</span>
                        <button 
                          type="button"
                          onClick={() => setQuery({
                            ...query,
                            guests: { ...query.guests, children: Math.min(8, query.guests.children + 1) }
                          })}
                          className="w-8 h-8 rounded-lg border border-slate-700 flex items-center justify-center text-slate-400 hover:border-slate-100 hover:text-slate-100 transition-colors"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                    </div>

                    <div className="h-[1px] bg-slate-800 my-2" />

                    {/* Rooms */}
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-sm font-medium text-slate-100">Pavilions / Rooms</div>
                        <div className="text-xs text-slate-500 font-light mt-0.5">Individual reserves</div>
                      </div>
                      <div className="flex items-center gap-3">
                        <button 
                          type="button"
                          onClick={() => setQuery({
                            ...query,
                            guests: { ...query.guests, rooms: Math.max(1, query.guests.rooms - 1) }
                          })}
                          className="w-8 h-8 rounded-lg border border-slate-700 flex items-center justify-center text-slate-400 hover:border-slate-100 hover:text-slate-100 transition-colors"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="text-sm font-mono font-medium text-slate-100 w-6 text-center">{query.guests.rooms}</span>
                        <button 
                          type="button"
                          onClick={() => setQuery({
                            ...query,
                            guests: { ...query.guests, rooms: Math.min(6, query.guests.rooms + 1) }
                          })}
                          className="w-8 h-8 rounded-lg border border-slate-700 flex items-center justify-center text-slate-400 hover:border-slate-100 hover:text-slate-100 transition-colors"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-5 pt-3 border-t border-slate-800 flex justify-end">
                    <button 
                      type="button"
                      onClick={() => setActiveDropdown(null)}
                      className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold py-2 px-4 rounded-lg text-xs tracking-wider uppercase"
                    >
                      Apply Selection
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Search Trigger Button */}
          <div className="flex items-center justify-center p-2" id="search-button-container">
            <button
              onClick={handleSearchSubmit}
              className="w-full md:w-auto md:h-full px-6 py-4 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-xl font-medium flex items-center justify-center gap-2 transition-all duration-300 shadow-lg shadow-amber-500/20 active:scale-98 cursor-pointer"
              id="search-submit-btn"
            >
              <Search size={18} />
              <span className="md:hidden lg:inline text-sm font-semibold uppercase tracking-wider">Search Sanctuaries</span>
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
