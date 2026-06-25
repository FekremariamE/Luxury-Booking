import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ShieldCheck, ArrowLeft, ArrowRight, Check, CreditCard, Sparkles, MapPin, Calendar, Heart, Download, Users } from "lucide-react";
import { Property, Room, SearchQuery, BookingDetails } from "../types";

interface CheckoutFlowProps {
  property: Property;
  room: Room;
  searchQuery: SearchQuery;
  onCancel: () => void;
  onBookingComplete: () => void;
}

export default function CheckoutFlow({
  property,
  room,
  searchQuery,
  onCancel,
  onBookingComplete
}: CheckoutFlowProps) {
  const [step, setStep] = useState<1 | 2 | 3>(1);

  // Initialize booking details state
  const [booking, setBooking] = useState<BookingDetails>({
    propertyId: property.id,
    roomId: room.id,
    startDate: searchQuery.startDate || "2026-06-15",
    endDate: searchQuery.endDate || "2026-06-18",
    guests: searchQuery.guests,
    specialRequests: {
      pillowMenu: "Goose Down",
      airportTransfer: false,
      butlerService: false,
      dietaryRestrictions: ""
    },
    guestDetails: {
      firstName: "",
      lastName: "",
      email: "",
      phone: ""
    },
    payment: {
      cardNumber: "",
      cardHolder: "",
      expiryDate: "",
      cvv: ""
    }
  });

  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});

  const calculateNights = () => {
    const start = new Date(booking.startDate);
    const end = new Date(booking.endDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) || 3;
  };

  const nights = calculateNights();
  const subtotal = room.pricePerNight * nights * booking.guests.rooms;
  const premiumUpgrades = 
    (booking.specialRequests.airportTransfer ? 250 : 0) + 
    (booking.specialRequests.butlerService ? 500 : 0);
  const resortFee = Math.round(subtotal * 0.08);
  const localTax = Math.round(subtotal * 0.10);
  const total = subtotal + premiumUpgrades + resortFee + localTax;

  const validateStep1 = () => {
    const errors: { [key: string]: string } = {};
    if (!booking.guestDetails.firstName.trim()) errors.firstName = "First name required";
    if (!booking.guestDetails.lastName.trim()) errors.lastName = "Last name required";
    if (!booking.guestDetails.email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
      errors.email = "Valid email address required";
    }
    if (!booking.guestDetails.phone.trim()) errors.phone = "Phone number required";
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const validateStep2 = () => {
    const errors: { [key: string]: string } = {};
    const cardNo = booking.payment.cardNumber.replace(/\s+/g, "");
    if (cardNo.length < 15) errors.cardNumber = "Complete credit card number required";
    if (!booking.payment.cardHolder.trim()) errors.cardHolder = "Cardholder name required";
    if (!booking.payment.expiryDate.match(/^(0[1-9]|1[0-2])\/?([0-9]{2})$/)) {
      errors.expiryDate = "Valid MM/YY required";
    }
    if (booking.payment.cvv.length < 3) errors.cvv = "CVV required";

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleNextStep = () => {
    if (step === 1) {
      if (validateStep1()) setStep(2);
    } else if (step === 2) {
      if (validateStep2()) {
        setStep(3);
      }
    }
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length > 0) {
      return parts.join(" ");
    } else {
      return v;
    }
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  };

  // Generate a mock unique reference code
  const confirmationCode = "RES-2026-X" + Math.floor(1000 + Math.random() * 9000);

  return (
    <div className="bg-slate-950 text-slate-100 py-6 px-4 md:px-12 max-w-7xl mx-auto font-sans transition-colors duration-300" id="checkout-flow-module">
      {/* Editorial Navigation */}
      {step !== 3 && (
        <div className="flex items-center justify-between mb-10 border-b border-slate-900 pb-5">
          <button
            onClick={onCancel}
            className="flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-slate-100 transition-colors group"
          >
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
            <span>Cancel Reservation</span>
          </button>

          {/* Luxury Timeline indicators */}
          <div className="flex items-center gap-4 text-xs font-mono">
            <span className={step === 1 ? "text-amber-500 font-semibold" : "text-slate-500"}>01 Profile</span>
            <span className="text-slate-800">/</span>
            <span className={step === 2 ? "text-amber-500 font-semibold" : "text-slate-500"}>02 Guarantee</span>
            <span className="text-slate-800">/</span>
            <span className="text-slate-500">03 Receipt</span>
          </div>
        </div>
      )}

      {step === 3 ? (
        /* CONFIRMATION / RECEIPT SCREEN (Step 3) */
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto bg-slate-900/40 border border-slate-900 rounded-3xl p-8 md:p-12 text-center space-y-8"
          id="checkout-confirmation-screen"
        >
          <div className="w-16 h-16 bg-amber-500/10 border border-amber-500 rounded-full flex items-center justify-center mx-auto text-amber-500">
            <Check size={32} />
          </div>

          <div className="space-y-3">
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-amber-500">Sanctuary Reserved</span>
            <h2 className="text-3xl font-serif text-slate-100">Your Retreat is Prepared</h2>
            <p className="text-xs text-slate-400 font-light max-w-md mx-auto leading-relaxed">
              An editorial confirmation voucher has been transmitted to <span className="text-slate-100 font-medium">{booking.guestDetails.email}</span>. Your personal butler has been notified of your premium preferences.
            </p>
          </div>

          {/* Printable Receipt Voucher Card */}
          <div className="bg-slate-950 border border-slate-900 rounded-2xl p-6 text-left space-y-6 shadow-xl relative" id="receipt-voucher-card">
            {/* Elegant luxury background element */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 blur-3xl pointer-events-none" />

            <div className="flex justify-between items-start border-b border-slate-900 pb-4">
              <div>
                <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">Property Haven</span>
                <h4 className="text-base font-serif text-slate-100 font-semibold mt-0.5">{property.name}</h4>
                <p className="text-[10px] font-mono text-slate-400 mt-1 flex items-center gap-1">
                  <MapPin size={10} className="text-amber-500" /> {property.location}
                </p>
              </div>

              <div className="text-right">
                <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">Voucher Code</span>
                <div className="text-xs font-mono font-bold text-amber-500 mt-0.5">{confirmationCode}</div>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 text-xs border-b border-slate-900 pb-6 font-mono">
              <div>
                <span className="text-slate-500 block uppercase text-[10px]">Suite Reserved</span>
                <span className="text-slate-100 font-sans font-medium block mt-1">{room.name}</span>
              </div>
              <div>
                <span className="text-slate-500 block uppercase text-[10px]">Dates of stay</span>
                <span className="text-slate-100 font-medium block mt-1">{formatDate(booking.startDate)} - {formatDate(booking.endDate)}</span>
              </div>
              <div>
                <span className="text-slate-500 block uppercase text-[10px]">Accommodations</span>
                <span className="text-slate-100 font-medium block mt-1">{booking.guests.adults} Adults, {booking.guests.rooms} Room</span>
              </div>
            </div>

            {/* Selected luxury privileges */}
            <div className="text-xs">
              <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block mb-2">Bespoke Requests Selected</span>
              <div className="flex flex-wrap gap-2">
                <span className="bg-slate-900/80 border border-slate-800 text-slate-300 py-1 px-2.5 rounded-lg font-mono text-[10px]">
                  Pillow: {booking.specialRequests.pillowMenu}
                </span>
                {booking.specialRequests.airportTransfer && (
                  <span className="bg-amber-500/5 border border-amber-500/30 text-amber-500 py-1 px-2.5 rounded-lg font-mono text-[10px]">
                    + Private Airport Transfer
                  </span>
                )}
                {booking.specialRequests.butlerService && (
                  <span className="bg-amber-500/5 border border-amber-500/30 text-amber-500 py-1 px-2.5 rounded-lg font-mono text-[10px]">
                    + Dedicated Private Butler
                  </span>
                )}
                {!booking.specialRequests.airportTransfer && !booking.specialRequests.butlerService && (
                  <span className="text-slate-500 italic">No additional bespoke upgrades selected</span>
                )}
              </div>
            </div>

            <div className="pt-2 flex justify-between items-center text-xs font-mono">
              <span className="text-slate-500">Total Guaranteed</span>
              <span className="text-base font-semibold text-slate-100">ETB {total.toLocaleString()}</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <button
              onClick={() => {
                // Return home
                onBookingComplete();
              }}
              className="px-6 py-3.5 bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 rounded-xl text-xs font-mono uppercase tracking-wider transition-colors"
            >
              Back to Showroom
            </button>
            <button
              onClick={() => window.print()}
              className="px-6 py-3.5 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-xl text-xs font-semibold uppercase tracking-wider transition-colors flex items-center justify-center gap-2"
            >
              <Download size={14} />
              <span>Print Statement</span>
            </button>
          </div>
        </motion.div>
      ) : (
        /* STEP 1 & 2 FORM DETAILS */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* LEFT FORM FIELD CONTAINER */}
          <div className="lg:col-span-8 space-y-8">
            {step === 1 ? (
              /* STEP 1: Bespoke Details & Preferences */
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
                id="checkout-step1-profile"
              >
                <div>
                  <h3 className="text-xl font-serif text-slate-100 mb-2">Guest Profile</h3>
                  <p className="text-xs text-slate-400 font-light">Please input credentials for the primary account holder.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-xs">
                  <div>
                    <label className="block text-slate-400 font-mono uppercase tracking-wider mb-2">First Name *</label>
                    <input
                      type="text"
                      placeholder="e.g. Sterling"
                      value={booking.guestDetails.firstName}
                      onChange={(e) => setBooking({
                        ...booking,
                        guestDetails: { ...booking.guestDetails, firstName: e.target.value }
                      })}
                      className={`w-full bg-slate-900 border ${formErrors.firstName ? "border-rose-500" : "border-slate-800 focus:border-slate-600"} p-3 rounded-xl text-slate-100 outline-none font-sans`}
                    />
                    {formErrors.firstName && <span className="text-[10px] text-rose-500 mt-1 block">{formErrors.firstName}</span>}
                  </div>

                  <div>
                    <label className="block text-slate-400 font-mono uppercase tracking-wider mb-2">Last Name *</label>
                    <input
                      type="text"
                      placeholder="e.g. Archer"
                      value={booking.guestDetails.lastName}
                      onChange={(e) => setBooking({
                        ...booking,
                        guestDetails: { ...booking.guestDetails, lastName: e.target.value }
                      })}
                      className={`w-full bg-slate-900 border ${formErrors.lastName ? "border-rose-500" : "border-slate-800 focus:border-slate-600"} p-3 rounded-xl text-slate-100 outline-none font-sans`}
                    />
                    {formErrors.lastName && <span className="text-[10px] text-rose-500 mt-1 block">{formErrors.lastName}</span>}
                  </div>

                  <div>
                    <label className="block text-slate-400 font-mono uppercase tracking-wider mb-2">Email Address *</label>
                    <input
                      type="email"
                      placeholder="e.g. sterling@palace.com"
                      value={booking.guestDetails.email}
                      onChange={(e) => setBooking({
                        ...booking,
                        guestDetails: { ...booking.guestDetails, email: e.target.value }
                      })}
                      className={`w-full bg-slate-900 border ${formErrors.email ? "border-rose-500" : "border-slate-800 focus:border-slate-600"} p-3 rounded-xl text-slate-100 outline-none font-sans`}
                    />
                    {formErrors.email && <span className="text-[10px] text-rose-500 mt-1 block">{formErrors.email}</span>}
                  </div>

                  <div>
                    <label className="block text-slate-400 font-mono uppercase tracking-wider mb-2">Mobile Phone *</label>
                    <input
                      type="tel"
                      placeholder="e.g. +1 (555) 019-2831"
                      value={booking.guestDetails.phone}
                      onChange={(e) => setBooking({
                        ...booking,
                        guestDetails: { ...booking.guestDetails, phone: e.target.value }
                      })}
                      className={`w-full bg-slate-900 border ${formErrors.phone ? "border-rose-500" : "border-slate-800 focus:border-slate-600"} p-3 rounded-xl text-slate-100 outline-none font-sans`}
                    />
                    {formErrors.phone && <span className="text-[10px] text-rose-500 mt-1 block">{formErrors.phone}</span>}
                  </div>
                </div>

                {/* Bespoke Upgrades (Pillow, Butler, Transfers) */}
                <div className="pt-6 border-t border-slate-900 space-y-4">
                  <div>
                    <h4 className="text-sm font-mono text-slate-100 uppercase tracking-wider flex items-center gap-2">
                      <Sparkles size={14} className="text-amber-500" />
                      <span>Bespoke Guest Preferences</span>
                    </h4>
                    <p className="text-[11px] text-slate-500 mt-1">Enhance your quiet sanctuary stay with curated premium upgrades.</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Pillow Menu selection */}
                    <div className="p-4 bg-slate-900/30 border border-slate-900 rounded-xl space-y-2">
                      <label className="block text-[11px] text-slate-400 font-mono uppercase tracking-wider">Artisan Pillow Menu</label>
                      <select
                        value={booking.specialRequests.pillowMenu}
                        onChange={(e) => setBooking({
                          ...booking,
                          specialRequests: { ...booking.specialRequests, pillowMenu: e.target.value }
                        })}
                        className="w-full bg-slate-950 border border-slate-850 p-2 rounded-lg text-xs text-slate-100 focus:outline-none focus:border-amber-500 font-sans"
                      >
                        <option value="Goose Down">Ultra-soft Siberian Goose Down</option>
                        <option value="Lavender Memory">Lavender-infused Smart Memory Foam</option>
                        <option value="Buckwheat Organic">Heated Organic Buckwheat Hull</option>
                        <option value="Hypoallergenic">Premium Silk Hypoallergenic</option>
                      </select>
                    </div>

                    {/* Special requests comments */}
                    <div className="p-4 bg-slate-900/30 border border-slate-900 rounded-xl space-y-2">
                      <label className="block text-[11px] text-slate-400 font-mono uppercase tracking-wider">Dietary Preferences</label>
                      <input
                        type="text"
                        placeholder="e.g. Vegan, Gluten-free, Nut allergy..."
                        value={booking.specialRequests.dietaryRestrictions}
                        onChange={(e) => setBooking({
                          ...booking,
                          specialRequests: { ...booking.specialRequests, dietaryRestrictions: e.target.value }
                        })}
                        className="w-full bg-slate-950 border border-slate-850 p-2 rounded-lg text-xs text-slate-100 placeholder-slate-600 focus:outline-none focus:border-amber-500 font-sans"
                      />
                    </div>
                  </div>

                  <div className="space-y-3">
                    {/* Airport transfers */}
                    <div 
                      onClick={() => setBooking({
                        ...booking,
                        specialRequests: { ...booking.specialRequests, airportTransfer: !booking.specialRequests.airportTransfer }
                      })}
                      className={`p-4 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                        booking.specialRequests.airportTransfer 
                          ? "bg-amber-500/5 border-amber-500/50" 
                          : "bg-slate-900/20 border-slate-900 hover:border-slate-850"
                      }`}
                    >
                      <div>
                        <div className="text-xs font-semibold text-slate-100">Private Luxury Airport Pick-up & Transfer</div>
                        <div className="text-[10px] text-slate-400 font-light mt-0.5">Private Tesla Model S or luxury speedboat transfers depending on property location (+ ETB 250 flat fee)</div>
                      </div>
                      <div className={`w-4 h-4 rounded border flex items-center justify-center ${booking.specialRequests.airportTransfer ? "bg-amber-500 border-amber-500" : "border-slate-700 bg-slate-950"}`}>
                        {booking.specialRequests.airportTransfer && <Check size={10} className="text-slate-950 stroke-[3]" />}
                      </div>
                    </div>

                    {/* Private Butler services */}
                    <div 
                      onClick={() => setBooking({
                        ...booking,
                        specialRequests: { ...booking.specialRequests, butlerService: !booking.specialRequests.butlerService }
                      })}
                      className={`p-4 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                        booking.specialRequests.butlerService 
                          ? "bg-amber-500/5 border-amber-500/50" 
                          : "bg-slate-900/20 border-slate-900 hover:border-slate-850"
                      }`}
                    >
                      <div>
                        <div className="text-xs font-semibold text-slate-100">Bespoke 24/7 Personal Butler Access</div>
                        <div className="text-[10px] text-slate-400 font-light mt-0.5">A dedicated guild-certified professional assigned exclusively to your pavilion (+ ETB 500 flat fee)</div>
                      </div>
                      <div className={`w-4 h-4 rounded border flex items-center justify-center ${booking.specialRequests.butlerService ? "bg-amber-500 border-amber-500" : "border-slate-700 bg-slate-950"}`}>
                        {booking.specialRequests.butlerService && <Check size={10} className="text-slate-950 stroke-[3]" />}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-slate-900 flex justify-end">
                  <button
                    onClick={handleNextStep}
                    className="py-3 px-6 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-xl font-semibold text-xs tracking-wider uppercase transition-colors flex items-center gap-2"
                  >
                    <span>Proceed to Guarantee</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </motion.div>
            ) : (
              /* STEP 2: Payment Details with interactive mockup */
              <motion.div
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
                id="checkout-step2-payment"
              >
                <div>
                  <h3 className="text-xl font-serif text-slate-100 mb-2">Secure Guarantee</h3>
                  <p className="text-xs text-slate-400 font-light">Confirm with a credit or debit card. No charges applied until check-in checkout.</p>
                </div>

                {/* Animated Interactive Credit Card Mockup */}
                <div className="relative w-full max-w-sm aspect-[1.6/1] bg-gradient-to-tr from-slate-900 to-slate-800 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between shadow-2xl mx-auto md:mx-0 overflow-hidden group">
                  {/* Glass shimmer overlay */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 blur-3xl rounded-full" />
                  
                  <div className="flex justify-between items-start">
                    <div className="space-y-1">
                      <div className="text-[9px] font-mono tracking-widest text-slate-500 uppercase">Luxury Reserve Visa</div>
                      <div className="w-10 h-7 bg-amber-500/20 rounded border border-amber-500/20 flex items-center justify-center">
                        <CreditCard size={14} className="text-amber-500" />
                      </div>
                    </div>
                    
                    {/* Micro SSL Emblem */}
                    <div className="text-[9px] font-mono text-slate-400 flex items-center gap-1 bg-slate-950/60 py-1 px-2 rounded-md border border-slate-800">
                      <ShieldCheck size={10} className="text-amber-500" />
                      <span>SSL Secure</span>
                    </div>
                  </div>

                  {/* Card Number display */}
                  <div className="text-lg font-mono tracking-widest text-slate-100/95 text-center my-4">
                    {booking.payment.cardNumber || "••••  ••••  ••••  ••••"}
                  </div>

                  <div className="flex justify-between text-[11px] font-mono">
                    <div>
                      <span className="text-slate-500 block text-[8px] uppercase">Cardholder</span>
                      <span className="text-slate-100 uppercase truncate max-w-[180px] block mt-0.5">
                        {booking.payment.cardHolder || "Sterling Archer"}
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-slate-500 block text-[8px] uppercase">Expires</span>
                      <span className="text-slate-100 block mt-0.5">
                        {booking.payment.expiryDate || "MM/YY"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Payment Fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-xs pt-4 border-t border-slate-900">
                  <div className="col-span-1 sm:col-span-2">
                    <label className="block text-slate-400 font-mono uppercase tracking-wider mb-2">Cardholder Name *</label>
                    <input
                      type="text"
                      placeholder="e.g. STERLING ARCHER"
                      value={booking.payment.cardHolder}
                      onChange={(e) => setBooking({
                        ...booking,
                        payment: { ...booking.payment, cardHolder: e.target.value.toUpperCase() }
                      })}
                      className={`w-full bg-slate-900 border ${formErrors.cardHolder ? "border-rose-500" : "border-slate-800 focus:border-slate-600"} p-3 rounded-xl text-slate-100 outline-none font-sans uppercase`}
                    />
                    {formErrors.cardHolder && <span className="text-[10px] text-rose-500 mt-1 block">{formErrors.cardHolder}</span>}
                  </div>

                  <div>
                    <label className="block text-slate-400 font-mono uppercase tracking-wider mb-2">Card Number *</label>
                    <input
                      type="text"
                      placeholder="4000 1234 5678 9010"
                      maxLength={19}
                      value={booking.payment.cardNumber}
                      onChange={(e) => setBooking({
                        ...booking,
                        payment: { ...booking.payment, cardNumber: formatCardNumber(e.target.value) }
                      })}
                      className={`w-full bg-slate-900 border ${formErrors.cardNumber ? "border-rose-500" : "border-slate-800 focus:border-slate-600"} p-3 rounded-xl text-slate-100 outline-none font-mono`}
                    />
                    {formErrors.cardNumber && <span className="text-[10px] text-rose-500 mt-1 block">{formErrors.cardNumber}</span>}
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-slate-400 font-mono uppercase tracking-wider mb-2">Expiry Date *</label>
                      <input
                        type="text"
                        placeholder="MM/YY"
                        maxLength={5}
                        value={booking.payment.expiryDate}
                        onChange={(e) => setBooking({
                          ...booking,
                          payment: { ...booking.payment, expiryDate: e.target.value }
                        })}
                        className={`w-full bg-slate-900 border ${formErrors.expiryDate ? "border-rose-500" : "border-slate-800 focus:border-slate-600"} p-3 rounded-xl text-slate-100 outline-none font-mono`}
                      />
                      {formErrors.expiryDate && <span className="text-[10px] text-rose-500 mt-1 block">{formErrors.expiryDate}</span>}
                    </div>

                    <div>
                      <label className="block text-slate-400 font-mono uppercase tracking-wider mb-2">CVV / Code *</label>
                      <input
                        type="password"
                        placeholder="•••"
                        maxLength={4}
                        value={booking.payment.cvv}
                        onChange={(e) => setBooking({
                          ...booking,
                          payment: { ...booking.payment, cvv: e.target.value.replace(/\D/g, "") }
                        })}
                        className={`w-full bg-slate-900 border ${formErrors.cvv ? "border-rose-500" : "border-slate-800 focus:border-slate-600"} p-3 rounded-xl text-slate-100 outline-none font-mono`}
                      />
                      {formErrors.cvv && <span className="text-[10px] text-rose-500 mt-1 block">{formErrors.cvv}</span>}
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-slate-900 flex justify-between">
                  <button
                    onClick={() => setStep(1)}
                    className="py-3 px-6 bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-slate-100 rounded-xl font-mono text-xs uppercase tracking-wider transition-colors flex items-center gap-2"
                  >
                    <ArrowLeft size={14} />
                    <span>Back</span>
                  </button>
                  <button
                    onClick={handleNextStep}
                    className="py-3 px-8 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-xl font-semibold text-xs tracking-wider uppercase transition-colors flex items-center gap-2"
                  >
                    <span>Guarantee Retreat</span>
                    <ShieldCheck size={14} />
                  </button>
                </div>
              </motion.div>
            )}
          </div>

          {/* RIGHT SIDE SUMMARY / RECEIPT SECTION (Active in step 1 and 2) */}
          <div className="lg:col-span-4 bg-slate-900/60 border border-slate-850 rounded-2xl p-6" id="checkout-summary-widget">
            <div className="text-xs font-mono text-amber-500 uppercase tracking-widest mb-4">Summary Receipt</div>

            <div className="flex gap-4 items-center pb-4 border-b border-slate-800">
              <img 
                src={property.images[0]} 
                alt={property.name} 
                className="w-16 h-16 object-cover rounded-xl border border-slate-800" 
              />
              <div>
                <h4 className="text-sm font-serif text-slate-100 font-medium">{property.name}</h4>
                <p className="text-[10px] font-mono text-slate-500 flex items-center gap-1 mt-0.5">
                  <MapPin size={10} /> {property.location}
                </p>
              </div>
            </div>

            <div className="py-4 border-b border-slate-800 space-y-2 text-xs">
              <div className="flex justify-between items-center text-slate-400">
                <span className="flex items-center gap-1.5"><Calendar size={12} className="text-amber-500" /> Date range</span>
                <span className="text-slate-100 font-mono">{formatDate(booking.startDate)} - {formatDate(booking.endDate)}</span>
              </div>
              <div className="flex justify-between items-center text-slate-400">
                <span className="flex items-center gap-1.5"><Heart size={12} className="text-amber-500" /> Accommodation</span>
                <span className="text-slate-100 font-mono">{room.name}</span>
              </div>
              <div className="flex justify-between items-center text-slate-400">
                <span className="flex items-center gap-1.5"><Users size={12} className="text-amber-500" /> Total stay</span>
                <span className="text-slate-100 font-mono">{nights} night{nights > 1 ? "s" : ""}</span>
              </div>
            </div>

            {/* Pricing Details */}
            <div className="py-4 space-y-2.5 text-xs font-mono">
              <div className="flex justify-between text-slate-500">
                <span>Room Subtotal</span>
                <span className="text-slate-300">ETB {subtotal.toLocaleString()}</span>
              </div>

              {booking.specialRequests.airportTransfer && (
                <div className="flex justify-between text-amber-500/80">
                  <span>+ Private Luxury Transfer</span>
                  <span>ETB 250</span>
                </div>
              )}

              {booking.specialRequests.butlerService && (
                <div className="flex justify-between text-amber-500/80">
                  <span>+ Dedicated Private Butler</span>
                  <span>ETB 500</span>
                </div>
              )}

              <div className="flex justify-between text-slate-500">
                <span>Luxury Resort Fee (8%)</span>
                <span className="text-slate-300">ETB {resortFee.toLocaleString()}</span>
              </div>

              <div className="flex justify-between text-slate-500">
                <span>Local eco-tax (10%)</span>
                <span className="text-slate-300">ETB {localTax.toLocaleString()}</span>
              </div>

              <div className="flex justify-between text-slate-100 font-semibold pt-3 border-t border-slate-850 text-sm">
                <span className="font-sans">Total Guaranteed</span>
                <span>ETB {total.toLocaleString()}</span>
              </div>
            </div>

            <div className="bg-slate-950 border border-slate-900 rounded-xl p-4 text-center mt-4">
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block mb-1">Guarantee Policy</span>
              <p className="text-[9px] text-slate-500 leading-normal">
                Your guarantee secures the booking instantly. Zero cancellation fees apply before June 10, 2026.
              </p>
            </div>
          </div>

        </div>
      )}
    </div>
  );
}
