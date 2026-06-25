import { Property } from "./types";

export const DESTINATIONS = [
  { name: "Addis Ababa", region: "East Africa", description: "Diplomatic heart & vibrant culinary sanctuaries" },
  { name: "Simien Mountains", region: "East Africa", description: "Dramatic mountain peaks & sustainable eco-luxury" },
  { name: "Bishoftu", region: "East Africa", description: "Serene volcanic crater lakes & thermal spas" },
  { name: "Lalibela", region: "East Africa", description: "Ancient rock-hewn wonders & valley vistas" },
  { name: "Bahir Dar", region: "East Africa", description: "Source of the Blue Nile & historic monasteries" },
  { name: "Hawassa", region: "East Africa", description: "Lakeside serenity & tropical bird sanctuaries" },
  { name: "Gondar", region: "East Africa", description: "Royal castles & historic imperial elegance" }
];

export const ALL_AMENITIES = [
  "Infinity Pool",
  "Michelin Dining",
  "Lakeside Spa",
  "Volcanic Clay Bath",
  "Helipad Access",
  "24/7 Butler Service",
  "Nile Boat Cruise",
  "Wine Cellar",
  "Traditional Coffee Ceremony",
  "Equestrian Trails"
];

export const PROPERTIES: Property[] = [
  {
    id: "prop-1",
    name: "Sheraton Addis, a Luxury Collection Hotel",
    tagline: "A majestic sanctuary of diplomatic grandeur and botanical luxury",
    description: "Centrally perched on a hilltop overlooking the capital, Sheraton Addis is an icon of African luxury. Framed by nine acres of beautifully manicured botanical gardens, the property blends classical architecture with rich Ethiopian heritage. Celebrated for its legendary thermal-fed swimming pool with subterranean underwater music, this sanctuary hosts international heads of state, diplomats, and discerning travelers. Indulge in premier global dining, high-contrast visual lounge experiences, and unrivaled hospitality.",
    location: "Addis Ababa",
    region: "East Africa",
    rating: 4.92,
    stars: 5,
    basePrice: 5000,
    images: [
      "https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&q=80&w=1200", // Grand palace facade look
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80&w=1200", // Palace architecture lounge look
      "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&q=80&w=1200", // Premium luxury pool
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&q=80&w=1200"  // Elegant dining setup
    ],
    amenities: ["Infinity Pool", "Michelin Dining", "Lakeside Spa", "24/7 Butler Service", "Traditional Coffee Ceremony"],
    rooms: [
      {
        id: "room-1a",
        name: "Executive Club Room",
        description: "Elegant modern guestroom featuring rich mahogany furnishings, plush bedding, and sliding French doors opening to spectacular vistas of the Addis Ababa skyline or the lush hotel pools.",
        pricePerNight: 5000,
        size: 55,
        maxOccupancy: 2,
        bedType: "King Bed",
        amenities: ["Club Lounge Access", "Italian Marble Bath", "Private Balcony", "Premium Coffee Station"],
        images: ["https://images.unsplash.com/photo-1611891404724-59912444e687?auto=format&fit=crop&q=80&w=800"]
      },
      {
        id: "room-1b",
        name: "The Presidential Royal Suite",
        description: "The peak of diplomatic luxury. Features a grand dining room for twelve, full private kitchen, executive desk, separate living quarters, and a fully private personal butler.",
        pricePerNight: 12000,
        size: 195,
        maxOccupancy: 4,
        bedType: "Emperor King",
        amenities: ["Private Kitchen", "Dining Saloon", "24/7 Personal Butler", "Airport Luxury Shuttle"],
        images: ["https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&q=80&w=800"]
      }
    ],
    reviews: [
      {
        id: "rev-1-1",
        author: "Marcus Vance",
        rating: 5,
        date: "May 10, 2026",
        comment: "The garden landscape is simply breathtaking and the service is truly world-class. Swimming in the geothermal-heated pool while classical music played underwater was an unforgettable experience.",
        sentiment: { service: 5.0, design: 4.8, location: 4.9, wellness: 5.0 }
      },
      {
        id: "rev-1-2",
        author: "Almaz Kebede",
        rating: 4.8,
        date: "April 22, 2026",
        comment: "Excellent hospitality. The traditional coffee ceremony in the lobby was a wonderfully authentic touch. Perfect location for business and leisure alike.",
        sentiment: { service: 4.9, design: 4.7, location: 5.0, wellness: 4.6 }
      }
    ]
  },
  {
    id: "prop-2",
    name: "Limalimo Lodge",
    tagline: "Sustainable luxury suspended over the breathtaking Simien Escarpment",
    description: "Perched high on the edge of the UNESCO-listed Simien Mountains National Park, Limalimo Lodge defines eco-luxury. Constructed using traditional rammed-earth techniques and thatched roofs, the lodge beautifully blends into the dramatic mountainous landscape. Wake up to panoramic views of deep valleys where Gelada baboons roam freely, enjoy fine organic meals cooked over wood fires, and watch spectacular African sunrises from our cliffside wooden yoga platform.",
    location: "Simien Mountains",
    region: "East Africa",
    rating: 4.96,
    stars: 5,
    basePrice: 6499,
    images: [
      "https://images.unsplash.com/photo-1454496522488-7a8e488e8606?auto=format&fit=crop&q=80&w=1200", // Dramatic mountain range
      "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&q=80&w=1200", // Sustainable forest lodge exterior
      "https://images.unsplash.com/photo-1449034446853-66c86144b0ad?auto=format&fit=crop&q=80&w=1200", // High canyon wood overlook
      "https://images.unsplash.com/photo-1502784444187-359ac186c5bb?auto=format&fit=crop&q=80&w=1200"  // Cliffside natural wood platform
    ],
    amenities: ["Lakeside Spa", "Michelin Dining", "Traditional Coffee Ceremony", "Equestrian Trails", "Helipad Access"],
    rooms: [
      {
        id: "room-2a",
        name: "Escarpment Luxury Twin",
        description: "Features floor-to-ceiling wooden framed windows opening to a private wooden deck hovering over the dramatic gorge. Built from natural local stone and eucalyptus wood, complete with warm native textiles.",
        pricePerNight: 6499,
        size: 50,
        maxOccupancy: 2,
        bedType: "Twin Luxury Beds",
        amenities: ["Private View Deck", "Handwoven Linens", "Organic Spa Soaps", "Wood Stove Heater"],
        images: ["https://images.unsplash.com/photo-1598928506311-c55ded91a20a?auto=format&fit=crop&q=80&w=800"]
      },
      {
        id: "room-2b",
        name: "Limalimo Master Suite",
        description: "Isolated from the main lodge for ultimate privacy, this suite offers unmatched 270-degree views of the rugged peaks, a hand-carved stone bath, and an outdoor fireplace area.",
        pricePerNight: 7000,
        size: 95,
        maxOccupancy: 2,
        bedType: "Cal-King Bed",
        amenities: ["Outdoor Firepit", "Stone Soak Bath", "Private Guide Companion", "Fresh Mountain Cider Basket"],
        images: ["https://images.unsplash.com/photo-1591088398332-8a7791972843?auto=format&fit=crop&q=80&w=800"]
      }
    ],
    reviews: [
      {
        id: "rev-2-1",
        author: "Julian Thorne",
        rating: 5,
        date: "June 14, 2026",
        comment: "One of the most extraordinary places I've ever stayed. Sipping local wine by the open campfire while looking at the infinite mountain horizon was pure magic. Gelada baboons literally grazed near our deck!",
        sentiment: { service: 4.9, design: 5.0, location: 5.0, wellness: 4.8 }
      }
    ]
  },
  {
    id: "prop-3",
    name: "Hyatt Regency Addis Ababa",
    tagline: "Vibrant contemporary architecture framing historic Meskel Square",
    description: "Located at the iconic intersection of Meskel Square and the diplomatic avenue, the Hyatt Regency is a hub of modern sophistication. Its striking modern design centered around an expansive, glass-roofed central courtyard offers a stylish resort oasis in the middle of the city. With vibrant dining options, a gorgeous heated pool patio, and high-performance spa facilities, it provides the perfect base for exploring the rich culinary and historical culture of Addis Ababa.",
    location: "Addis Ababa",
    region: "East Africa",
    rating: 4.89,
    stars: 5,
    basePrice: 5200,
    images: [
      "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&q=80&w=1200", // Modern courtyard entryway
      "https://images.unsplash.com/photo-1568495248636-6432b97bd949?auto=format&fit=crop&q=80&w=1200", // Contemporary glass lounge interior
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=1200", // Heated pool patio setup
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=1200"  // Vibrant central courtyard bar
    ],
    amenities: ["Infinity Pool", "Michelin Dining", "Lakeside Spa", "Wine Cellar", "Traditional Coffee Ceremony"],
    rooms: [
      {
        id: "room-3a",
        name: "Regency King Terrace",
        description: "Sleek, light-filled modern guestroom featuring soundproof triple-glazed windows and a private, beautifully furnished walk-out terrace looking towards Meskel Square.",
        pricePerNight: 5200,
        size: 46,
        maxOccupancy: 2,
        bedType: "King Bed",
        amenities: ["Private Terrace", "Rain Shower", "Espresso Machine", "Media Hub Panel"],
        images: ["https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&q=80&w=800"]
      },
      {
        id: "room-3b",
        name: "Regency Executive Suite",
        description: "Spacious luxury layout featuring a separate workspace, dining table, lounge area, and full access to the VIP Regency Club Lounge with daily complimentary cocktails.",
        pricePerNight: 6499,
        size: 88,
        maxOccupancy: 3,
        bedType: "Grand King Bed",
        amenities: ["VIP Club Access", "Deep Soak Tub", "Local Artisanal Coffee Bar", "Walk-in Dressing Wardrobe"],
        images: ["https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=800"]
      }
    ],
    reviews: [
      {
        id: "rev-3-1",
        author: "Sophia Laurent",
        rating: 4.8,
        date: "May 29, 2026",
        comment: "Extremely helpful staff, flawless business amenities, and the central courtyard terrace is easily the best place in town to grab an evening drink and listen to live jazz.",
        sentiment: { service: 4.9, design: 4.9, location: 4.9, wellness: 4.6 }
      }
    ]
  },
  {
    id: "prop-4",
    name: "Kuriftu Resort & Spa Bishoftu",
    tagline: "Rustic-chic stone-walled bungalows cradling a volcanic crater lake",
    description: "Nestled on the volcanic lip of Lake Babogaya in Bishoftu, Kuriftu Resort & Spa is a beautiful paradise of tranquility. Constructed from local volcanic stones, organic clay, and fragrant native wood, the resort’s signature thatched-roof bungalows evoke traditional architecture on an opulent scale. Experience luxurious thermal therapies, enjoy fresh organic lakeside dining, and witness spectacular flamingos and birdlife returning to the crater lake at twilight.",
    location: "Bishoftu",
    region: "East Africa",
    rating: 4.91,
    stars: 5,
    basePrice: 4000,
    images: [
      "https://images.unsplash.com/photo-1439066615861-d1af74d74000?auto=format&fit=crop&q=80&w=1200", // Serene lake-facing view
      "https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&q=80&w=1200", // Tropical lakeside pool scene
      "https://images.unsplash.com/photo-1583037189850-1921ae7c6c22?auto=format&fit=crop&q=80&w=1200", // Volcanic stone garden walkway
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=1200"  // Lakeside sunset terrace deck
    ],
    amenities: ["Infinity Pool", "Lakeside Spa", "Volcanic Clay Bath", "Traditional Coffee Ceremony", "Wine Cellar"],
    rooms: [
      {
        id: "room-4a",
        name: "Lakeside King Bungalow",
        description: "Handcrafted wooden furniture, local tapestries, and a private stone balcony directly overlooking the glass-like waters of Lake Babogaya. Features a traditional brick fireplace for cozy evenings.",
        pricePerNight: 3999,
        size: 70,
        maxOccupancy: 2,
        bedType: "Four-Poster King",
        amenities: ["Fireplace", "Lakeside Balcony", "Organic Clay Bath Products", "Handwoven Slippers"],
        images: ["https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&q=80&w=800"]
      },
      {
        id: "room-4b",
        name: "The Royal Lakeside Villa",
        description: "An incredibly spacious villa featuring a private plunge pool on a wide wooden deck, an integrated steam massage room, and curated volcanic stone garden baths.",
        pricePerNight: 7999,
        size: 140,
        maxOccupancy: 4,
        bedType: "Grand Emperor King",
        amenities: ["Private Plunge Pool", "In-Room Private Steam Room", "Lakefront Dining Gazebo", "Personal Chef on Call"],
        images: ["https://images.unsplash.com/photo-1512915922686-57c11dde9b6b?auto=format&fit=crop&q=80&w=800"]
      }
    ],
    reviews: [
      {
        id: "rev-4-1",
        author: "Samuel Peterson",
        rating: 5,
        date: "March 18, 2026",
        comment: "A magnificent oasis less than an hour from the capital. The Sweden-style massage and the organic volcanic clay wraps were outstanding. Waking up to the mist rising from Babogaya is serene.",
        sentiment: { service: 4.8, design: 5.0, location: 5.0, wellness: 5.0 }
      }
    ]
  },
  {
    id: "prop-5",
    name: "Ethiopian Skylight Hotel",
    tagline: "The towering, glass-crowned epicentre of modern African hospitality",
    description: "Located just steps from Bole International Airport, the Ethiopian Skylight Hotel is a spectacular architectural landmark. With a striking exterior of soaring curved glass and a dramatic monumental atrium lobby, it serves as the ultimate modern hub for global travelers. Featuring a state-of-the-art rooftop sky lounge, several fine-dining restaurants, and a magnificent temperature-controlled outdoor pool, this hotel represents the vibrant modern energy of Ethiopia.",
    location: "Addis Ababa",
    region: "East Africa",
    rating: 4.93,
    stars: 5,
    basePrice: 3499,
    images: [
      "https://images.unsplash.com/photo-1541976590-7139414bc5c6?auto=format&fit=crop&q=80&w=1200", // Curved glass high-rise facade
      "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&q=80&w=1200", // Soaring monumental glass atrium lobby
      "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&q=80&w=1200", // Rooftop penthouse lounge look
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&q=80&w=1200"  // Grand luxury temperature pool
    ],
    amenities: ["Infinity Pool", "Michelin Dining", "Lakeside Spa", "Wine Cellar", "Helipad Access"],
    rooms: [
      {
        id: "room-5a",
        name: "Premium Skyline Deluxe",
        description: "Spacious modern room featuring floor-to-ceiling glass windows offering breathtaking panoramas of the mountains and Addis skyline. Furnished in high-end minimalist design.",
        pricePerNight: 3499,
        size: 50,
        maxOccupancy: 2,
        bedType: "King Bed",
        amenities: ["Skyline Views", "Sleek Rain Shower", "Interactive Smart TV", "Acoustic Noise Control"],
        images: ["https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?auto=format&fit=crop&q=80&w=800"]
      },
      {
        id: "room-5b",
        name: "Skylight Penthouse Suite",
        description: "The crown jewel of the hotel, featuring an expansive private dining room, full-size kitchen, private office, marble spa bathroom with jacuzzi, and a wide viewing deck.",
        pricePerNight: 9999,
        size: 165,
        maxOccupancy: 4,
        bedType: "Imperial King",
        amenities: ["Sky View Jacuzzi", "Private Executive Office", "Butlers Pantry", "Complimentary Executive Lounge"],
        images: ["https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=800"]
      }
    ],
    reviews: [
      {
        id: "rev-5-1",
        author: "Chen Wei",
        rating: 4.9,
        date: "May 03, 2026",
        comment: "Excellent convenience for transit or long-term stays. The Chinese restaurant inside serves some of the finest authentic dim sum in East Africa. Exceptional beds.",
        sentiment: { service: 4.9, design: 4.9, location: 5.0, wellness: 4.7 }
      }
    ]
  },
  {
    id: "prop-6",
    name: "Haile Resort Hawassa",
    tagline: "Panoramic lakeside luxury looking out across the historic Great Rift Valley",
    description: "Founded by the legendary Olympic champion Haile Gebrselassie, this premium lakefront resort is an oasis of active luxury and wellness. Sprawled along the shores of Lake Hawassa, the resort combines modern high-end architectural design with athletic-grade wellness centers. Stroll through beautifully manicured gardens populated by colobus monkeys, sample fresh-caught Tilapia prepared by expert chefs, and enjoy spectacular African sunsets from our lakeside sunloungers.",
    location: "Hawassa",
    region: "East Africa",
    rating: 4.86,
    stars: 4,
    basePrice: 2999,
    images: [
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&q=80&w=1200", // Palms surrounding lakeside resort pool
      "https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&q=80&w=1200", // Wide lake horizon view
      "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&q=80&w=1200", // Lakeside grass-roof villa exterior
      "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&q=80&w=1200"  // African lakeside evening sunset
    ],
    amenities: ["Infinity Pool", "Lakeside Spa", "Traditional Coffee Ceremony", "Equestrian Trails", "Nile Boat Cruise"],
    rooms: [
      {
        id: "room-6a",
        name: "Lakeside Horizon Room",
        description: "Comfortable organic wooden styling with a wide patio opening to soft green lawns that stretch directly to Lake Hawassa's shore. Includes beautiful views of the local hills.",
        pricePerNight: 2999,
        size: 45,
        maxOccupancy: 2,
        bedType: "King Bed",
        amenities: ["Lakefront Patio", "Organic Herbal Teas", "Deep Clawfoot Tub", "Complimentary Kayak Pass"],
        images: ["https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&q=80&w=800"]
      },
      {
        id: "room-6b",
        name: "The Emperor Haile Suite",
        description: "Opulent master suite named in honour of the founder. Features dual aspect windows overlooking both the pool and the lake, a private gym nook, and premium wellness facilities.",
        pricePerNight: 5499,
        size: 110,
        maxOccupancy: 3,
        bedType: "Athletic Master King",
        amenities: ["Private Infrared Sauna", "Lakeside Deck Lounge", "Gym Nook", "In-Suite Athlete Massage Therapy"],
        images: ["https://images.unsplash.com/photo-1556784344-ad913c73cfc6?auto=format&fit=crop&q=80&w=800"]
      }
    ],
    reviews: [
      {
        id: "rev-6-1",
        author: "Emma Watson",
        rating: 4.8,
        date: "February 12, 2026",
        comment: "A wonderful stay with extremely positive energy. The fitness track is fantastic, and watching the fishermen on Lake Hawassa in the early morning fog from my balcony was beautiful.",
        sentiment: { service: 4.8, design: 4.7, location: 5.0, wellness: 5.0 }
      }
    ]
  },
  {
    id: "prop-7",
    name: "Maribela Hotel Lalibela",
    tagline: "Earthy stone architecture overlooking the sacred Lasta Mountain valleys",
    description: "Framed by the rugged, epic mountain terrain of Lalibela, Maribela Hotel is a tribute to raw structural beauty. Named after King Lalibela’s legendary wife, the hotel’s rustic-chic design utilizes hand-carved local tuff stone, volcanic mud plasters, and native olive wood. Its iconic wide terraces feature suspended daybeds where guests can lounge over deep mountain valleys, reflecting on the historical mystery of the 12th-century rock-hewn churches nearby.",
    location: "Lalibela",
    region: "East Africa",
    rating: 4.89,
    stars: 4,
    basePrice: 2999,
    images: [
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=1200", // Grand mountain canyon gorge
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&q=80&w=1200", // Earthy stone luxury villa structure
      "https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&q=80&w=1200", // Spectacular open stone daybed terrace
      "https://images.unsplash.com/photo-1508333706533-1ab43ecb1606?auto=format&fit=crop&q=80&w=1200"  // Handcrafted clay-stone interior design
    ],
    amenities: ["Michelin Dining", "Lakeside Spa", "Traditional Coffee Ceremony", "Equestrian Trails"],
    rooms: [
      {
        id: "room-7a",
        name: "Valley View Terrace Suite",
        description: "Features a magnificent semi-sheltered terrace with a custom suspended daybed. Stone-tiled floors and local traditional Gabi blankets provide rich comfort and warmth.",
        pricePerNight: 2999,
        size: 48,
        maxOccupancy: 2,
        bedType: "Queen Bed",
        amenities: ["Suspended Valley Daybed", "Local Stone Fireplace", "Traditional Spiced Honey Wine", "Telescope Star Setup"],
        images: ["https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&q=80&w=800"]
      }
    ],
    reviews: [
      {
        id: "rev-7-1",
        author: "Klaus Webber",
        rating: 4.9,
        date: "January 14, 2026",
        comment: "The views are simply spiritual. Sleeping on the swinging daybed on the private terrace overlooking the deep Abyss at sunset was one of the highlights of my trip to Africa. Excellent staff.",
        sentiment: { service: 4.9, design: 4.9, location: 5.0, wellness: 4.6 }
      }
    ]
  },
  {
    id: "prop-8",
    name: "Radisson Blu Hotel, Addis Ababa",
    tagline: "Ultra-sleek modern luxury nestled in the diplomatic capital quarter",
    description: "Resting adjacent to the United Nations Economic Commission for Africa (UNECA), the Radisson Blu is an epitome of business-luxury. The hotel features clean, sharp modern lines warmed by beautiful Ethiopian accents and fine paintings from legendary local artists. With a world-class French-bistro restaurant, a state-of-the-art thermal spa facility, and professional business infrastructure, it is a preferred residence for global dignitaries.",
    location: "Addis Ababa",
    region: "East Africa",
    rating: 4.87,
    stars: 5,
    basePrice: 3999,
    images: [
      "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200", // Corporate-luxury grand atrium lobby
      "https://images.unsplash.com/photo-1560624052-449f5ddf0c31?auto=format&fit=crop&q=80&w=1200", // High-end contemporary hotel lounge bar
      "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&q=80&w=1200", // Fine French bistro dining design
      "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&q=80&w=1200"  // Contemporary building structure
    ],
    amenities: ["Infinity Pool", "Michelin Dining", "Lakeside Spa", "Wine Cellar", "Traditional Coffee Ceremony"],
    rooms: [
      {
        id: "room-8a",
        name: "Diplomatic Suite",
        description: "Spacious layout with a dedicated business meeting desk, private living lounge, and a luxurious Italian marble bathroom featuring high-end organic therapeutic items.",
        pricePerNight: 3999,
        size: 65,
        maxOccupancy: 2,
        bedType: "King Bed",
        amenities: ["Diplomatic Desk", "Spaced Living Lounge", "VIP Lounge Access", "High-Speed Secured Fiber"],
        images: ["https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&q=80&w=800"]
      }
    ],
    reviews: [
      {
        id: "rev-8-1",
        author: "Arnaud Dubois",
        rating: 4.8,
        date: "April 08, 2026",
        comment: "Flawless internet connectivity, very secure diplomatic location, and the French bakery in the lobby serves the best chocolate croissants in East Africa.",
        sentiment: { service: 4.9, design: 4.8, location: 4.9, wellness: 4.7 }
      }
    ]
  },
  {
    id: "prop-9",
    name: "Kuriftu Resort & Spa Lake Tana",
    tagline: "Rustic luxury bungalows nestled at the legendary source of the Blue Nile",
    description: "Spread along the shores of Lake Tana in Bahir Dar, Kuriftu's sister property offers historic, lakeside rustic charm. Bungalows constructed of indigenous materials, high-vaulted thatched ceilings, and massive heavy-wood columns blend perfectly with the rich foliage of the Nile basin. Take a private wooden launch to ancient island monasteries, watch hippos at the historic outlet of the Nile, and return for soothing therapies at our award-winning spa.",
    location: "Bahir Dar",
    region: "East Africa",
    rating: 4.91,
    stars: 4,
    basePrice: 3999,
    images: [
      "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&q=80&w=1200", // Lakeside thatched stone terrace
      "https://images.unsplash.com/photo-1473448912268-2022ce9509d8?auto=format&fit=crop&q=80&w=1200", // Lush Nile foliage/vegetation look
      "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&q=80&w=1200", // Blue Nile waters lakeside pool
      "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?auto=format&fit=crop&q=80&w=1200"  // Tropical forest river setting
    ],
    amenities: ["Infinity Pool", "Lakeside Spa", "Nile Boat Cruise", "Traditional Coffee Ceremony", "Equestrian Trails"],
    rooms: [
      {
        id: "room-9a",
        name: "Nile Shore Bungalow",
        description: "Rustic mud-brick walled bungalow featuring massive organic logs, traditional carvings, and a direct water-facing porch. Wake up to the sound of soft lake waves.",
        pricePerNight: 4000,
        size: 78,
        maxOccupancy: 2,
        bedType: "Four-Poster King",
        amenities: ["Nile Shore Porch", "Traditional Stone Basin Tub", "Organic Nile Papyrus Soaps", "Daily Nile Sunset Boat Pass"],
        images: ["https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&q=80&w=800"]
      }
    ],
    reviews: [
      {
        id: "rev-9-1",
        author: "Oliver Graham",
        rating: 4.9,
        date: "March 02, 2026",
        comment: "Truly unforgettable. Taking the boat to the 14th-century island monastery of Ura Kidane Mehret, then returning for a massage and a spectacular Nile-side tilapia dinner under the stars is unmatched.",
        sentiment: { service: 4.9, design: 4.8, location: 5.0, wellness: 4.9 }
      }
    ]
  },
  {
    id: "prop-10",
    name: "Hilton Addis Ababa",
    tagline: "Mid-century modernist luxury nestled within natural geothermic springs",
    description: "Designed by the legendary architect Warner Burns, the Hilton Addis Ababa is an architectural masterpiece of mid-century design. Standing as a monument to modernism, the hotel is famous for its cross-shaped swimming pool which is naturally heated by deep thermal volcanic geothermic springs. Surrounded by grand palm trees, thermal gazebos, and clay-court tennis facilities, this historic hotel offers a classic, highly polished getaway.",
    location: "Addis Ababa",
    region: "East Africa",
    rating: 4.81,
    stars: 4,
    basePrice: 3999,
    images: [
      "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&q=80&w=1200", // Mid-century modernist building structure
      "https://images.unsplash.com/photo-1554009975-d74653b879f1?auto=format&fit=crop&q=80&w=1200", // Famed pool with palms
      "https://images.unsplash.com/photo-1508672019048-805c876b67e2?auto=format&fit=crop&q=80&w=1200", // Thermal/volcanic spa treatments
      "https://images.unsplash.com/photo-1470240731273-7821a6eeb6bd?auto=format&fit=crop&q=80&w=1200"  // Historic hotel garden view
    ],
    amenities: ["Infinity Pool", "Lakeside Spa", "Volcanic Clay Bath", "Traditional Coffee Ceremony", "Wine Cellar"],
    rooms: [
      {
        id: "room-10a",
        name: "Classic Thermal View Deluxe",
        description: "Features mid-century clean wood accents, a private balcony overlooking the iconic cross-shaped geothermal pool, and full access to the natural hot-spring spa.",
        pricePerNight: 3999,
        size: 42,
        maxOccupancy: 2,
        bedType: "King Bed",
        amenities: ["Geothermal Pool View Balcony", "Mid-Century Furnishings", "Traditional Spiced Honey Wine Basket", "Hot Spring Spa Pass"],
        images: ["https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&q=80&w=800"]
      }
    ],
    reviews: [
      {
        id: "rev-10-1",
        author: "William Hayes",
        rating: 4.7,
        date: "May 15, 2026",
        comment: "Fascinating architecture. The geothermal pool is phenomenal — natural hot mineral water right in the middle of a major African metropolis. Truly relaxing.",
        sentiment: { service: 4.7, design: 4.8, location: 4.9, wellness: 4.8 }
      }
    ]
  }
];