export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  comment: string;
  sentiment: {
    service: number; // 0 to 5
    design: number;
    location: number;
    wellness: number;
  };
}

export interface Room {
  id: string;
  name: string;
  description: string;
  pricePerNight: number;
  size: number; // in sqm
  maxOccupancy: number;
  bedType: string;
  amenities: string[];
  images: string[];
}

export interface Property {
  id: string;
  name: string;
  tagline: string;
  description: string;
  location: string;
  region: string;
  rating: number;
  stars: number;
  basePrice: number;
  images: string[];
  amenities: string[];
  rooms: Room[];
  reviews: Review[];
  featured?: boolean;
}

export interface SearchQuery {
  destination: string;
  startDate: string | null;
  endDate: string | null;
  guests: {
    adults: number;
    children: number;
    rooms: number;
  };
}

export interface FilterState {
  priceRange: [number, number];
  amenities: string[];
  stars: number[];
  rating: number | null;
}

export interface BookingDetails {
  propertyId: string;
  roomId: string;
  startDate: string;
  endDate: string;
  guests: {
    adults: number;
    children: number;
    rooms: number;
  };
  specialRequests: {
    pillowMenu: string;
    airportTransfer: boolean;
    butlerService: boolean;
    dietaryRestrictions: string;
  };
  guestDetails: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };
  payment: {
    cardNumber: string;
    cardHolder: string;
    expiryDate: string;
    cvv: string;
  };
}
