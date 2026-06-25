import React, { useState } from "react";
import { motion } from "motion/react";
import { ArrowLeft, Star, Calendar, Users, Home, MapPin, Maximize2, Coffee, ShieldCheck, Heart, Sparkles, BookOpen } from "lucide-react";
import { Property, Room, SearchQuery } from "../types";

interface PropertyDetailProps {
  property: Property;
  onBack: () => void;
  searchQuery: SearchQuery;
  favorites: string[];
  onToggleFavorite: (id: string) => void;
  onInitiateBooking: (selectedRoom: Room) => void;
}

export default function PropertyDetail({
  property,
  onBack,
  searchQuery,
  favorites,
  onToggleFavorite,
  onInitiateBooking
}: PropertyDetailProps) {
  // Local active room selection (defaults to first room)
  const [selectedRoom, setSelectedRoom] = useState<Room>(property.rooms[0]);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  const isFavorite = favorites.includes(property.id);

  // Calculate length of stay (or default to 3 nights if not set)
  const calculateNights = () => {
    if (searchQuery.startDate && searchQuery.endDate) {
      const start = new Date(searchQuery.startDate);
      const end = new Date(searchQuery.endDate);
      const diffTime = Math.abs(end.getTime() - start.getTime());
      return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    }
    return 3; // default preview duration
  };

  const nights = calculateNights();
  const subtotal = selectedRoom.pricePerNight * nights * searchQuery.guests.rooms;
  const resortFee = Math.round(subtotal * 0.08); // 8% luxury resort fee
  const localTax = Math.round(subtotal * 0.10); // 10% local eco-tax
  const total = subtotal + resortFee + localTax;

  const formatDate = (dateStr: string | null, fallback: string) => {
    if (!dateStr) return fallback;
    return new Date(dateStr).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  };

  // Compute aggregate review sentiment from the property reviews list
  const aggregateSentiment = () => {
    if (property.reviews.length === 0) return { service: 5, design: 5, location: 5, wellness: 5 };
    
    let service = 0, design = 0, location = 0, wellness = 0;
    property.reviews.forEach((r) => {
      service += r.sentiment.service;
      design += r.sentiment.design;
      location += r.sentiment.location;
      wellness += r.sentiment.wellness;
    });
    
    const count = property.reviews.length;
    return {
      service: Number((service / count).toFixed(1)),
      design: Number((design / count).toFixed(1)),
      location: Number((location / count).toFixed(1)),
      wellness: Number((wellness / count).toFixed(1)),
    };
  };

  const sentiment = aggregateSentiment();

  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen py-6 px-4 md:px-12 max-w-7xl mx-auto font-sans" id="property-detail-module">
      {/* Editorial Navigation breadcrumb */}
      <div className="flex items-center justify-between mb-8" id="detail-nav-bar">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-white transition-colors group"
        >
          <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
          <span>Back to Portfolio</span>
        </button>

        <div className="flex items-center gap-4">
          <span className="text-xs font-mono text-slate-500">
            Property ID: <span className="text-slate-300 uppercase">{property.id}</span>
          </span>
          <button
            onClick={() => onToggleFavorite(property.id)}
            className="flex items-center gap-1.5 text-xs font-mono text-slate-400 hover:text-white transition-colors"
          >
            <Heart size={14} className={isFavorite ? "fill-amber-500 text-amber-500" : ""} />
            <span>{isFavorite ? "Saved" : "Save to Favorites"}</span>
          </button>
        </div>
      </div>

      {/* Editorial Photo Gallery Grid (Module C Requirement) */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-3 mb-12" id="editorial-gallery">
        {/* Large Hero Image */}
        <div className="col-span-1 md:col-span-8 relative aspect-[16/10] overflow-hidden rounded-2xl bg-slate-900 group">
          <img
            src={property.images[0]}
            alt={property.name}
            className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-[4000ms] ease-out-quad cursor-pointer"
            onClick={() => setLightboxImage(property.images[0])}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent pointer-events-none" />
          <button 
            onClick={() => setLightboxImage(property.images[0])}
            className="absolute bottom-4 left-4 bg-slate-950/80 backdrop-blur-md border border-slate-800 text-white/90 p-2.5 rounded-xl text-xs flex items-center gap-2 hover:bg-slate-900 transition-all shadow-md"
          >
            <Maximize2 size={12} />
            <span className="font-mono text-[10px] uppercase tracking-wider">Enlarge Space</span>
          </button>
        </div>

        {/* Stacked Side Images */}
        <div className="col-span-1 md:col-span-4 grid grid-cols-2 md:grid-cols-1 gap-3 h-full">
          {property.images.slice(1, 3).map((img, idx) => (
            <div 
              key={idx} 
              className="relative aspect-[4/3] md:aspect-auto md:h-[calc(50%-6px)] overflow-hidden rounded-2xl bg-slate-900 group cursor-pointer"
              onClick={() => setLightboxImage(img)}
            >
              <img
                src={img}
                alt={`${property.name} detail ${idx + 1}`}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
              />
              <div className="absolute inset-0 bg-slate-950/10 group-hover:bg-transparent transition-colors duration-300" />
            </div>
          ))}
        </div>
      </div>

      {/* Detail Layout split: Left (descriptions, room matrix, reviews) | Right (sticky checkout widget) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        <div className="lg:col-span-8 space-y-12">
          {/* Header Description */}
          <div id="detail-description">
            <div className="flex items-center gap-2 text-xs font-mono text-amber-500 uppercase tracking-widest mb-3">
              <Sparkles size={12} />
              <span>{property.region}</span>
              <span className="text-slate-700">•</span>
              <span className="flex items-center gap-1">
                <MapPin size={10} />
                {property.location}
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl font-serif text-white tracking-tight leading-tight mb-4">
              {property.name}
            </h1>
            
            <p className="text-lg font-serif italic text-amber-500/90 font-light leading-relaxed mb-6">
              "{property.tagline}"
            </p>

            <p className="text-sm text-slate-400 font-light leading-relaxed tracking-wide">
              {property.description}
            </p>

            {/* General Highlights bar */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 pt-6 border-t border-slate-900">
              <div className="p-4 bg-slate-900/30 border border-slate-900 rounded-xl flex flex-col justify-between">
                <span className="text-[10px] font-mono uppercase text-slate-500 mb-1">Standard Rating</span>
                <span className="text-sm font-medium text-white flex items-center gap-1 font-mono">
                  ★ {property.rating.toFixed(2)}
                </span>
              </div>
              <div className="p-4 bg-slate-900/30 border border-slate-900 rounded-xl flex flex-col justify-between">
                <span className="text-[10px] font-mono uppercase text-slate-500 mb-1">Class</span>
                <span className="text-sm font-medium text-white font-mono">
                  {property.stars} Star Luxury
                </span>
              </div>
              <div className="p-4 bg-slate-900/30 border border-slate-900 rounded-xl flex flex-col justify-between">
                <span className="text-[10px] font-mono uppercase text-slate-500 mb-1">Total Pavilions</span>
                <span className="text-sm font-medium text-white font-mono">
                  {property.rooms.length} Suites Available
                </span>
              </div>
              <div className="p-4 bg-slate-900/30 border border-slate-900 rounded-xl flex flex-col justify-between">
                <span className="text-[10px] font-mono uppercase text-slate-500 mb-1">Concierge</span>
                <span className="text-sm font-medium text-white font-mono">
                  Fully Serviced
                </span>
              </div>
            </div>
          </div>

          {/* Interactive Room Selection Matrix (Module C Requirement) */}
          <div id="room-selection-matrix">
            <div className="flex items-center justify-between mb-6 pb-3 border-b border-slate-900">
              <h3 className="text-lg font-serif text-white tracking-tight flex items-center gap-2">
                <Home size={18} className="text-amber-500" />
                <span>Suite & Pavilion Matrix</span>
              </h3>
              <span className="text-xs font-mono text-slate-400">Select accommodation tier below</span>
            </div>

            <div className="space-y-4">
              {property.rooms.map((room) => {
                const isCurrent = selectedRoom.id === room.id;
                return (
                  <div
                    key={room.id}
                    onClick={() => setSelectedRoom(room)}
                    className={`p-6 rounded-2xl border transition-all duration-300 cursor-pointer flex flex-col md:flex-row justify-between items-start md:items-center gap-6 ${
                      isCurrent 
                        ? "bg-amber-500/5 border-amber-500 shadow-xl shadow-amber-500/5" 
                        : "bg-slate-900/20 border-slate-900 hover:border-slate-800 hover:bg-slate-900/30"
                    }`}
                  >
                    <div className="flex-1 space-y-3">
                      <div className="flex items-center gap-3">
                        <h4 className="text-base font-serif text-white font-medium">{room.name}</h4>
                        <span className="text-[10px] font-mono text-slate-400 bg-slate-950 border border-slate-900 py-0.5 px-2 rounded-md flex items-center gap-1">
                          <Maximize2 size={8} />
                          {room.size} sqm
                        </span>
                        <span className="text-[10px] font-mono text-slate-400 bg-slate-950 border border-slate-900 py-0.5 px-2 rounded-md flex items-center gap-1">
                          <Users size={8} />
                          Max {room.maxOccupancy}
                        </span>
                      </div>
                      
                      <p className="text-xs text-slate-400 font-light leading-relaxed">{room.description}</p>
                      
                      {/* Room Amenities list */}
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {room.amenities.map((item) => (
                          <span 
                            key={item} 
                            className="text-[9px] font-mono text-slate-500 border border-slate-900 bg-slate-950/20 px-2 py-0.5 rounded"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex md:flex-col items-end justify-between w-full md:w-auto border-t md:border-t-0 border-slate-900 pt-4 md:pt-0 gap-4">
                      <div className="text-left md:text-right">
                        <div className="text-[9px] font-mono text-slate-500 uppercase tracking-widest">Rate per night</div>
                        <div className="text-xl font-mono text-white mt-1">
                          ${room.pricePerNight.toLocaleString()}
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedRoom(room);
                        }}
                        className={`px-4 py-2 rounded-lg text-xs font-mono uppercase tracking-wider transition-all duration-300 font-semibold ${
                          isCurrent 
                            ? "bg-amber-500 text-slate-950" 
                            : "bg-slate-950 border border-slate-800 text-slate-300 hover:border-slate-600"
                        }`}
                      >
                        {isCurrent ? "Selected" : "Select Tier"}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Luxury Property Amenities Grid */}
          <div id="property-amenities">
            <h3 className="text-lg font-serif text-white tracking-tight mb-4 pb-3 border-b border-slate-900">
              Sanctuary Standards & Privileges
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {property.amenities.map((item) => (
                <div key={item} className="flex items-center gap-3 p-3 bg-slate-900/30 border border-slate-900 rounded-xl text-xs font-mono text-slate-300">
                  <Coffee size={14} className="text-amber-500" />
                  <span>{item}</span>
                </div>
              ))}
              <div className="flex items-center gap-3 p-3 bg-slate-900/30 border border-slate-900 rounded-xl text-xs font-mono text-slate-300">
                <ShieldCheck size={14} className="text-amber-500" />
                <span>Eco-Certified Sanctuary</span>
              </div>
            </div>
          </div>

          {/* Polished Reviews Section with Sentiment Bars (Module C Requirement) */}
          <div id="reviews-section" className="space-y-6">
            <h3 className="text-lg font-serif text-white tracking-tight pb-3 border-b border-slate-900">
              Guest Testimonials & Sentiments
            </h3>

            {/* Granular Sentiment Metrics Bar Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-4 p-6 bg-slate-900/20 border border-slate-900/70 rounded-2xl">
              <div>
                <div className="flex justify-between text-xs font-mono mb-1.5">
                  <span className="text-slate-400">Curated Butler Service</span>
                  <span className="text-white font-medium">{sentiment.service} / 5.0</span>
                </div>
                <div className="h-1 bg-slate-850 rounded-full overflow-hidden">
                  <div className="h-full bg-amber-500 rounded-full" style={{ width: `${(sentiment.service / 5) * 100}%` }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-mono mb-1.5">
                  <span className="text-slate-400">Architectural Design & Space</span>
                  <span className="text-white font-medium">{sentiment.design} / 5.0</span>
                </div>
                <div className="h-1 bg-slate-850 rounded-full overflow-hidden">
                  <div className="h-full bg-amber-500 rounded-full" style={{ width: `${(sentiment.design / 5) * 100}%` }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-mono mb-1.5">
                  <span className="text-slate-400">Solitude & Geographic Location</span>
                  <span className="text-white font-medium">{sentiment.location} / 5.0</span>
                </div>
                <div className="h-1 bg-slate-850 rounded-full overflow-hidden">
                  <div className="h-full bg-amber-500 rounded-full" style={{ width: `${(sentiment.location / 5) * 100}%` }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-mono mb-1.5">
                  <span className="text-slate-400">Wellness, Hydrotherapy & Spa</span>
                  <span className="text-white font-medium">{sentiment.wellness} / 5.0</span>
                </div>
                <div className="h-1 bg-slate-850 rounded-full overflow-hidden">
                  <div className="h-full bg-amber-500 rounded-full" style={{ width: `${(sentiment.wellness / 5) * 100}%` }} />
                </div>
              </div>
            </div>

            {/* Individual Reviews */}
            <div className="space-y-4 pt-2">
              {property.reviews.map((review) => (
                <div key={review.id} className="p-6 bg-slate-900/10 border border-slate-900 rounded-xl space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-medium text-white">{review.author}</h4>
                      <span className="text-[10px] font-mono text-slate-500">{review.date}</span>
                    </div>
                    <div className="flex items-center gap-1 text-xs font-mono text-amber-500 bg-amber-500/5 px-2 py-0.5 rounded">
                      <Star size={10} className="fill-amber-500 text-amber-500" />
                      <span>{review.rating.toFixed(1)}</span>
                    </div>
                  </div>
                  <p className="text-xs text-slate-400 font-light leading-relaxed italic">
                    "{review.comment}"
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sticky Booking Widget (Module C Requirement) */}
        <div className="lg:col-span-4 sticky top-28 bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-2xl p-6 shadow-2xl" id="sticky-booking-widget">
          <div className="text-xs font-mono text-amber-500 uppercase tracking-widest mb-4">Reservation Statement</div>
          
          <div className="border-b border-slate-800/80 pb-4 mb-4">
            <div className="text-[10px] font-mono text-slate-500 uppercase">Selected Accommodation</div>
            <div className="text-base font-serif text-white mt-1">{selectedRoom.name}</div>
            <div className="text-xs text-slate-400 font-mono mt-0.5">${selectedRoom.pricePerNight.toLocaleString()} / night</div>
          </div>

          <div className="space-y-3 mb-6">
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-400 flex items-center gap-1.5">
                <Calendar size={12} className="text-amber-500" />
                Check-in
              </span>
              <span className="text-white font-mono">{formatDate(searchQuery.startDate, "June 15, 2026")}</span>
            </div>

            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-400 flex items-center gap-1.5">
                <Calendar size={12} className="text-amber-500" />
                Check-out
              </span>
              <span className="text-white font-mono">{formatDate(searchQuery.endDate, "June 18, 2026")}</span>
            </div>

            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-400 flex items-center gap-1.5">
                <Users size={12} className="text-amber-500" />
                Guests
              </span>
              <span className="text-white font-mono">
                {searchQuery.guests.adults} Adults
                {searchQuery.guests.children > 0 && `, ${searchQuery.guests.children} Children`}
              </span>
            </div>
          </div>

          {/* Pricing Breakdown */}
          <div className="border-t border-b border-slate-850 py-4 mb-6 space-y-2.5 text-xs font-mono">
            <div className="flex justify-between text-slate-400">
              <span>${selectedRoom.pricePerNight.toLocaleString()} × {nights} nights</span>
              <span className="text-white">${subtotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Luxury Resort Fee (8%)</span>
              <span className="text-white">${resortFee.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Local eco-tax (10%)</span>
              <span className="text-white">${localTax.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-white font-semibold pt-2 border-t border-slate-850 text-sm">
              <span className="font-sans">Total Statement</span>
              <span>${total.toLocaleString()}</span>
            </div>
          </div>

          <button
            onClick={() => onInitiateBooking(selectedRoom)}
            className="w-full py-4 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-xl font-semibold text-xs tracking-widest uppercase transition-all shadow-lg shadow-amber-500/10 cursor-pointer text-center"
            id="book-reserve-btn"
          >
            Initiate Luxury Booking
          </button>
          
          <div className="text-center mt-4">
            <p className="text-[10px] text-slate-500 font-mono">
              Frictionless, secure luxury check-out. No card charged until arrival.
            </p>
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightboxImage && (
        <div 
          onClick={() => setLightboxImage(null)}
          className="fixed inset-0 bg-slate-950/95 backdrop-blur-md z-[100] flex items-center justify-center p-4 cursor-zoom-out animate-fade-in"
        >
          <img 
            src={lightboxImage} 
            alt="Expanded view" 
            className="max-w-full max-h-[85vh] object-contain rounded-xl shadow-2xl" 
          />
          <button 
            onClick={() => setLightboxImage(null)}
            className="absolute top-6 right-6 w-10 h-10 rounded-full bg-slate-900 border border-slate-800 text-white flex items-center justify-center"
          >
            <ArrowLeft size={16} />
          </button>
        </div>
      )}
    </div>
  );
}
