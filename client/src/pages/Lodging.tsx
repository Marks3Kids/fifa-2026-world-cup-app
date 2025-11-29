import { Layout } from "@/components/Layout";
import { Hotel, ArrowLeft, MapPin, DollarSign, ChevronRight, ExternalLink, Star, Wifi, Car, Dumbbell } from "lucide-react";
import { Link } from "wouter";
import { useState } from "react";

interface Accommodation {
  name: string;
  type: string;
  priceRange: string;
  neighborhood: string;
  description: string;
  website: string;
  amenities: string[];
}

interface PriceCategory {
  category: string;
  priceRange: string;
  color: string;
  bgColor: string;
  accommodations: Accommodation[];
}

interface CityLodging {
  city: string;
  country: string;
  countryCode: string;
  categories: PriceCategory[];
}

const lodgingData: CityLodging[] = [
  {
    city: "New York / New Jersey",
    country: "USA",
    countryCode: "us",
    categories: [
      {
        category: "Budget",
        priceRange: "$100-200/night",
        color: "text-green-400",
        bgColor: "bg-green-500/10 border-green-500/20",
        accommodations: [
          { name: "Pod 51", type: "Pod Hotel", priceRange: "$", neighborhood: "Midtown East", description: "Compact modern rooms, great value", website: "https://www.thepodhotel.com", amenities: ["WiFi", "Rooftop"] },
          { name: "The Jane Hotel", type: "Boutique Hotel", priceRange: "$", neighborhood: "West Village", description: "Historic hotel with cabin-style rooms", website: "https://www.thejanenyc.com", amenities: ["WiFi", "Bar"] },
          { name: "HI NYC Hostel", type: "Hostel", priceRange: "$", neighborhood: "Upper West Side", description: "Clean, social hostel on UWS", website: "https://www.hiusa.org/hostels/new-york/new-york/hi-new-york-city", amenities: ["WiFi", "Kitchen"] },
          { name: "YOTEL New York", type: "Pod Hotel", priceRange: "$", neighborhood: "Times Square", description: "Futuristic smart rooms", website: "https://www.yotel.com/en/hotels/yotel-new-york", amenities: ["WiFi", "Gym"] },
          { name: "Freehand New York", type: "Hybrid Hotel", priceRange: "$", neighborhood: "Flatiron", description: "Hostel-hotel hybrid", website: "https://www.freehandhotels.com/new-york", amenities: ["WiFi", "Bar", "Restaurant"] },
        ]
      },
      {
        category: "Mid-Range",
        priceRange: "$200-400/night",
        color: "text-blue-400",
        bgColor: "bg-blue-500/10 border-blue-500/20",
        accommodations: [
          { name: "citizenM Times Square", type: "Design Hotel", priceRange: "$$", neighborhood: "Times Square", description: "Dutch design hotel chain", website: "https://www.citizenm.com/new-york", amenities: ["WiFi", "24hr Food", "Rooftop"] },
          { name: "The Renwick Hotel", type: "Boutique Hotel", priceRange: "$$", neighborhood: "Midtown East", description: "Art Deco charm, Curio Collection", website: "https://www.renwickhotel.com", amenities: ["WiFi", "Gym", "Bar"] },
          { name: "Hotel 50 Bowery", type: "Boutique Hotel", priceRange: "$$", neighborhood: "Chinatown", description: "Hip Chinatown hotel with rooftop", website: "https://www.hotel50bowery.com", amenities: ["WiFi", "Rooftop", "Restaurant"] },
          { name: "The William Vale", type: "Design Hotel", priceRange: "$$", neighborhood: "Brooklyn", description: "Brooklyn views, rooftop pool", website: "https://www.thewilliamvale.com", amenities: ["Pool", "WiFi", "Gym"] },
          { name: "Arlo NoMad", type: "Boutique Hotel", priceRange: "$$", neighborhood: "NoMad", description: "Modern micro-rooms with style", website: "https://www.arlohotels.com/arlo-nomad", amenities: ["WiFi", "Rooftop", "Restaurant"] },
        ]
      },
      {
        category: "Upscale",
        priceRange: "$400-700/night",
        color: "text-purple-400",
        bgColor: "bg-purple-500/10 border-purple-500/20",
        accommodations: [
          { name: "The Standard High Line", type: "Design Hotel", priceRange: "$$$", neighborhood: "Meatpacking", description: "Iconic hotel over High Line", website: "https://www.standardhotels.com/new-york", amenities: ["Pool", "Spa", "Nightclub"] },
          { name: "1 Hotel Brooklyn Bridge", type: "Eco-Luxury", priceRange: "$$$", neighborhood: "Brooklyn", description: "Sustainable luxury with views", website: "https://www.1hotels.com/brooklyn-bridge", amenities: ["Pool", "Spa", "Gym"] },
          { name: "The Ludlow", type: "Boutique Hotel", priceRange: "$$$", neighborhood: "Lower East Side", description: "Rock n roll meets luxury", website: "https://www.ludlowhotel.com", amenities: ["Pool", "Restaurant", "Bar"] },
          { name: "Park Hyatt New York", type: "Luxury Hotel", priceRange: "$$$", neighborhood: "Midtown", description: "Carnegie Hall views", website: "https://www.hyatt.com/en-US/hotel/new-york/park-hyatt-new-york", amenities: ["Spa", "Pool", "Fine Dining"] },
          { name: "The Langham New York", type: "Luxury Hotel", priceRange: "$$$", neighborhood: "Fifth Avenue", description: "Elegant Fifth Avenue address", website: "https://www.langhamhotels.com/en/the-langham/new-york", amenities: ["Spa", "Restaurant", "Bar"] },
        ]
      },
      {
        category: "Luxury",
        priceRange: "$700+/night",
        color: "text-amber-400",
        bgColor: "bg-amber-500/10 border-amber-500/20",
        accommodations: [
          { name: "The Plaza", type: "Landmark Hotel", priceRange: "$$$$", neighborhood: "Central Park South", description: "NYC's most iconic hotel", website: "https://www.theplazany.com", amenities: ["Spa", "Fine Dining", "Butler Service"] },
          { name: "Four Seasons New York", type: "Luxury Hotel", priceRange: "$$$$", neighborhood: "Midtown", description: "Sophisticated elegance", website: "https://www.fourseasons.com/newyork", amenities: ["Spa", "Pool", "Fine Dining"] },
          { name: "The St. Regis New York", type: "Luxury Hotel", priceRange: "$$$$", neighborhood: "Midtown", description: "Gilded Age grandeur", website: "https://www.marriott.com/hotels/travel/nycxr-the-st-regis-new-york", amenities: ["Butler", "Spa", "Fine Dining"] },
          { name: "Mandarin Oriental", type: "Luxury Hotel", priceRange: "$$$$", neighborhood: "Columbus Circle", description: "Asian elegance with park views", website: "https://www.mandarinoriental.com/new-york", amenities: ["Spa", "Pool", "Fine Dining"] },
          { name: "The Peninsula New York", type: "Luxury Hotel", priceRange: "$$$$", neighborhood: "Fifth Avenue", description: "Belle Époque landmark", website: "https://www.peninsula.com/en/new-york", amenities: ["Rooftop", "Spa", "Pool"] },
        ]
      }
    ]
  },
  {
    city: "Los Angeles",
    country: "USA",
    countryCode: "us",
    categories: [
      {
        category: "Budget",
        priceRange: "$100-200/night",
        color: "text-green-400",
        bgColor: "bg-green-500/10 border-green-500/20",
        accommodations: [
          { name: "Freehand Los Angeles", type: "Hybrid Hotel", priceRange: "$", neighborhood: "Downtown", description: "Hostel-hotel with rooftop pool", website: "https://www.freehandhotels.com/los-angeles", amenities: ["Pool", "WiFi", "Bar"] },
          { name: "The LINE LA", type: "Design Hotel", priceRange: "$", neighborhood: "Koreatown", description: "Hip K-Town hotel", website: "https://www.thelinehotel.com/los-angeles", amenities: ["Pool", "WiFi", "Restaurant"] },
          { name: "Mama Shelter Los Angeles", type: "Boutique Hotel", priceRange: "$", neighborhood: "Hollywood", description: "Playful design hotel", website: "https://www.mamashelter.com/los-angeles", amenities: ["Rooftop", "WiFi", "Restaurant"] },
          { name: "The Hoxton Downtown LA", type: "Boutique Hotel", priceRange: "$", neighborhood: "Downtown", description: "UK brand's LA outpost", website: "https://www.thehoxton.com/los-angeles/downtown-la", amenities: ["Pool", "WiFi", "Restaurant"] },
          { name: "Hollywood Roosevelt", type: "Historic Hotel", priceRange: "$", neighborhood: "Hollywood", description: "Historic Hollywood landmark", website: "https://www.thehollywoodroosevelt.com", amenities: ["Pool", "Nightclub", "Bar"] },
        ]
      },
      {
        category: "Mid-Range",
        priceRange: "$200-400/night",
        color: "text-blue-400",
        bgColor: "bg-blue-500/10 border-blue-500/20",
        accommodations: [
          { name: "The Ace Hotel Downtown LA", type: "Boutique Hotel", priceRange: "$$", neighborhood: "Downtown", description: "Hip creative hub", website: "https://www.acehotel.com/losangeles", amenities: ["Pool", "Restaurant", "Theater"] },
          { name: "Palihouse Santa Monica", type: "Aparthotel", priceRange: "$$", neighborhood: "Santa Monica", description: "Residential-style suites", website: "https://www.palisociety.com/hotels/santa-monica", amenities: ["Kitchen", "WiFi", "Courtyard"] },
          { name: "Hotel Figueroa", type: "Boutique Hotel", priceRange: "$$", neighborhood: "Downtown", description: "Spanish Colonial Revival beauty", website: "https://www.hotelfigueroa.com", amenities: ["Pool", "Restaurant", "Bar"] },
          { name: "The Kimpton Everly", type: "Boutique Hotel", priceRange: "$$", neighborhood: "Hollywood", description: "Modern Hollywood base", website: "https://www.everlyhotelhollywood.com", amenities: ["Pool", "Gym", "Restaurant"] },
          { name: "Dream Hollywood", type: "Design Hotel", priceRange: "$$", neighborhood: "Hollywood", description: "Rooftop pool and TAO", website: "https://www.dreamhotels.com/hollywood", amenities: ["Pool", "Nightclub", "Restaurant"] },
        ]
      },
      {
        category: "Upscale",
        priceRange: "$400-700/night",
        color: "text-purple-400",
        bgColor: "bg-purple-500/10 border-purple-500/20",
        accommodations: [
          { name: "Shutters on the Beach", type: "Beach Resort", priceRange: "$$$", neighborhood: "Santa Monica", description: "Beachfront luxury", website: "https://www.shuttersonthebeach.com", amenities: ["Beach", "Spa", "Pool"] },
          { name: "The Edition West Hollywood", type: "Boutique Luxury", priceRange: "$$$", neighborhood: "West Hollywood", description: "Ian Schrager's latest", website: "https://www.editionhotels.com/weho", amenities: ["Pool", "Spa", "Nightclub"] },
          { name: "Fairmont Miramar", type: "Historic Luxury", priceRange: "$$$", neighborhood: "Santa Monica", description: "Oceanfront luxury resort", website: "https://www.fairmont.com/santa-monica", amenities: ["Pool", "Spa", "Restaurant"] },
          { name: "SLS Hotel Beverly Hills", type: "Design Hotel", priceRange: "$$$", neighborhood: "Beverly Hills", description: "Philippe Starck design", website: "https://www.sbe.com/hotels/sls-hotels/beverly-hills", amenities: ["Pool", "Spa", "Restaurant"] },
          { name: "NoMad Los Angeles", type: "Boutique Luxury", priceRange: "$$$", neighborhood: "Downtown", description: "Elegant NYC import", website: "https://www.thenomadhotel.com/los-angeles", amenities: ["Pool", "Restaurant", "Bar"] },
        ]
      },
      {
        category: "Luxury",
        priceRange: "$700+/night",
        color: "text-amber-400",
        bgColor: "bg-amber-500/10 border-amber-500/20",
        accommodations: [
          { name: "The Beverly Hills Hotel", type: "Legendary Hotel", priceRange: "$$$$", neighborhood: "Beverly Hills", description: "The Pink Palace", website: "https://www.dorchestercollection.com/en/los-angeles/the-beverly-hills-hotel", amenities: ["Pool", "Spa", "Bungalows"] },
          { name: "Hotel Bel-Air", type: "Luxury Resort", priceRange: "$$$$", neighborhood: "Bel-Air", description: "Swan Lake elegance", website: "https://www.dorchestercollection.com/en/los-angeles/hotel-bel-air", amenities: ["Spa", "Pool", "Fine Dining"] },
          { name: "Four Seasons Beverly Wilshire", type: "Luxury Hotel", priceRange: "$$$$", neighborhood: "Beverly Hills", description: "Rodeo Drive landmark", website: "https://www.fourseasons.com/beverlywilshire", amenities: ["Spa", "Pool", "Fine Dining"] },
          { name: "The Peninsula Beverly Hills", type: "Luxury Hotel", priceRange: "$$$$", neighborhood: "Beverly Hills", description: "Garden rooftop villas", website: "https://www.peninsula.com/en/beverly-hills", amenities: ["Rooftop", "Spa", "Pool"] },
          { name: "Waldorf Astoria Beverly Hills", type: "Luxury Hotel", priceRange: "$$$$", neighborhood: "Beverly Hills", description: "Modern Beverly Hills luxury", website: "https://www.waldorfastoria.com/beverly-hills", amenities: ["Rooftop", "Spa", "Pool"] },
        ]
      }
    ]
  },
  {
    city: "Miami",
    country: "USA",
    countryCode: "us",
    categories: [
      {
        category: "Budget",
        priceRange: "$100-200/night",
        color: "text-green-400",
        bgColor: "bg-green-500/10 border-green-500/20",
        accommodations: [
          { name: "Generator Miami", type: "Design Hostel", priceRange: "$", neighborhood: "Miami Beach", description: "Stylish hostel with pool", website: "https://www.staygenerator.com/destinations/miami", amenities: ["Pool", "WiFi", "Bar"] },
          { name: "The Freehand Miami", type: "Hybrid Hotel", priceRange: "$", neighborhood: "Miami Beach", description: "Hip hostel-hotel hybrid", website: "https://www.freehandhotels.com/miami", amenities: ["Pool", "Bar", "Restaurant"] },
          { name: "The Vagabond Hotel", type: "Retro Motel", priceRange: "$", neighborhood: "MiMo District", description: "Mid-century modern gem", website: "https://www.thevagabondhotel.com", amenities: ["Pool", "Bar", "Restaurant"] },
          { name: "The Clay Hotel", type: "Historic Hotel", priceRange: "$", neighborhood: "South Beach", description: "Spanish-style in SoBe", website: "https://www.clayhotel.com", amenities: ["WiFi", "Garden", "Bar"] },
          { name: "Life House Little Havana", type: "Boutique Hotel", priceRange: "$", neighborhood: "Little Havana", description: "Cuban-inspired design", website: "https://www.lifehousehotels.com/little-havana", amenities: ["Pool", "WiFi", "Restaurant"] },
        ]
      },
      {
        category: "Mid-Range",
        priceRange: "$200-400/night",
        color: "text-blue-400",
        bgColor: "bg-blue-500/10 border-blue-500/20",
        accommodations: [
          { name: "The Plymouth Hotel", type: "Art Deco", priceRange: "$$", neighborhood: "South Beach", description: "Art Deco elegance", website: "https://www.theplymouthmiami.com", amenities: ["Pool", "Restaurant", "Bar"] },
          { name: "The Confidante Miami Beach", type: "Beach Hotel", priceRange: "$$", neighborhood: "Mid-Beach", description: "Beachfront boutique", website: "https://www.theconfidantemiamibeach.com", amenities: ["Beach", "Pool", "Spa"] },
          { name: "The Gabriel Miami", type: "Boutique Hotel", priceRange: "$$", neighborhood: "Downtown", description: "Downtown sophistication", website: "https://www.thegabrielmiami.com", amenities: ["Pool", "Gym", "Restaurant"] },
          { name: "Kimpton EPIC Hotel", type: "Boutique Hotel", priceRange: "$$", neighborhood: "Downtown", description: "Waterfront with views", website: "https://www.epichotel.com", amenities: ["Pool", "Spa", "Restaurant"] },
          { name: "The Standard Spa Miami Beach", type: "Spa Hotel", priceRange: "$$", neighborhood: "Belle Isle", description: "Wellness-focused escape", website: "https://www.standardhotels.com/miami", amenities: ["Spa", "Pool", "Restaurant"] },
        ]
      },
      {
        category: "Upscale",
        priceRange: "$400-700/night",
        color: "text-purple-400",
        bgColor: "bg-purple-500/10 border-purple-500/20",
        accommodations: [
          { name: "Faena Hotel Miami Beach", type: "Luxury Beach", priceRange: "$$$", neighborhood: "Mid-Beach", description: "Theatrical luxury", website: "https://www.faena.com/miami-beach", amenities: ["Beach", "Spa", "Theater"] },
          { name: "The Setai Miami Beach", type: "Luxury Resort", priceRange: "$$$", neighborhood: "South Beach", description: "Asian-inspired oceanfront", website: "https://www.thesetaihotel.com", amenities: ["Beach", "Spa", "Pool"] },
          { name: "1 Hotel South Beach", type: "Eco-Luxury", priceRange: "$$$", neighborhood: "South Beach", description: "Sustainable beachfront", website: "https://www.1hotels.com/south-beach", amenities: ["Beach", "Spa", "Pool"] },
          { name: "W South Beach", type: "Design Hotel", priceRange: "$$$", neighborhood: "South Beach", description: "Scene-y beachfront", website: "https://www.marriott.com/wsob", amenities: ["Beach", "Pool", "Nightclub"] },
          { name: "The Edition Miami Beach", type: "Boutique Luxury", priceRange: "$$$", neighborhood: "Mid-Beach", description: "Ian Schrager masterpiece", website: "https://www.editionhotels.com/miami-beach", amenities: ["Beach", "Spa", "Bowling"] },
        ]
      },
      {
        category: "Luxury",
        priceRange: "$700+/night",
        color: "text-amber-400",
        bgColor: "bg-amber-500/10 border-amber-500/20",
        accommodations: [
          { name: "Four Seasons Surf Club", type: "Legendary Resort", priceRange: "$$$$", neighborhood: "Surfside", description: "Historic glamour restored", website: "https://www.fourseasons.com/surfside", amenities: ["Beach", "Spa", "Fine Dining"] },
          { name: "Acqualina Resort", type: "Beachfront Resort", priceRange: "$$$$", neighborhood: "Sunny Isles", description: "Mediterranean oasis", website: "https://www.acqualinaresort.com", amenities: ["Beach", "Spa", "Pool"] },
          { name: "The St. Regis Bal Harbour", type: "Luxury Resort", priceRange: "$$$$", neighborhood: "Bal Harbour", description: "Oceanfront butler service", website: "https://www.stregisbalharbour.com", amenities: ["Beach", "Spa", "Butler"] },
          { name: "The Ritz-Carlton South Beach", type: "Luxury Hotel", priceRange: "$$$$", neighborhood: "South Beach", description: "Art Deco meets luxury", website: "https://www.ritzcarlton.com/southbeach", amenities: ["Beach", "Spa", "Pool"] },
          { name: "Mandarin Oriental Miami", type: "Luxury Hotel", priceRange: "$$$$", neighborhood: "Brickell Key", description: "Private island luxury", website: "https://www.mandarinoriental.com/miami", amenities: ["Spa", "Pool", "Beach"] },
        ]
      }
    ]
  },
  {
    city: "Dallas",
    country: "USA",
    countryCode: "us",
    categories: [
      {
        category: "Budget",
        priceRange: "$80-150/night",
        color: "text-green-400",
        bgColor: "bg-green-500/10 border-green-500/20",
        accommodations: [
          { name: "Nylo Las Colinas", type: "Boutique Hotel", priceRange: "$", neighborhood: "Irving", description: "Modern loft-style rooms", website: "https://www.nylohotels.com", amenities: ["Pool", "WiFi", "Gym"] },
          { name: "Aloft Dallas Downtown", type: "Design Hotel", priceRange: "$", neighborhood: "Downtown", description: "W Hotels' younger sibling", website: "https://www.aloftdallasdowntown.com", amenities: ["Pool", "WiFi", "Bar"] },
          { name: "Home2 Suites by Hilton", type: "Extended Stay", priceRange: "$", neighborhood: "Multiple locations", description: "All-suite eco-friendly", website: "https://www.home2suites.com", amenities: ["Kitchen", "Pool", "Gym"] },
          { name: "La Quinta Inn & Suites", type: "Value Hotel", priceRange: "$", neighborhood: "Multiple locations", description: "Reliable value option", website: "https://www.wyndhamhotels.com/laquinta", amenities: ["WiFi", "Breakfast", "Pool"] },
          { name: "The Highland Dallas", type: "Boutique Hotel", priceRange: "$", neighborhood: "Highland Park", description: "Curio Collection hotel", website: "https://www.thehighlanddallas.com", amenities: ["Pool", "Spa", "Restaurant"] },
        ]
      },
      {
        category: "Mid-Range",
        priceRange: "$150-300/night",
        color: "text-blue-400",
        bgColor: "bg-blue-500/10 border-blue-500/20",
        accommodations: [
          { name: "The Statler Dallas", type: "Historic Hotel", priceRange: "$$", neighborhood: "Downtown", description: "Revived 1956 landmark", website: "https://www.thestatlerdallas.com", amenities: ["Pool", "Spa", "Restaurant"] },
          { name: "Hotel ZaZa Dallas", type: "Boutique Hotel", priceRange: "$$", neighborhood: "Uptown", description: "Eclectic luxury", website: "https://www.hotelzaza.com/dallas", amenities: ["Pool", "Spa", "Restaurant"] },
          { name: "The Adolphus Hotel", type: "Historic Hotel", priceRange: "$$", neighborhood: "Downtown", description: "Beaux-Arts landmark", website: "https://www.theadolphus.com", amenities: ["Restaurant", "Spa", "Bar"] },
          { name: "The Joule", type: "Design Hotel", priceRange: "$$", neighborhood: "Downtown", description: "Iconic cantilevered pool", website: "https://www.thejouledallas.com", amenities: ["Pool", "Spa", "Restaurant"] },
          { name: "Warwick Melrose Dallas", type: "Historic Hotel", priceRange: "$$", neighborhood: "Oak Lawn", description: "1920s elegance", website: "https://www.warwickmelrose.com", amenities: ["Restaurant", "Bar", "Gym"] },
        ]
      },
      {
        category: "Upscale",
        priceRange: "$300-500/night",
        color: "text-purple-400",
        bgColor: "bg-purple-500/10 border-purple-500/20",
        accommodations: [
          { name: "The Ritz-Carlton Dallas", type: "Luxury Hotel", priceRange: "$$$", neighborhood: "Uptown", description: "Classic luxury", website: "https://www.ritzcarlton.com/dallas", amenities: ["Spa", "Pool", "Restaurant"] },
          { name: "Four Seasons Resort Dallas", type: "Luxury Resort", priceRange: "$$$", neighborhood: "Las Colinas", description: "Resort experience in the city", website: "https://www.fourseasons.com/dallas", amenities: ["Golf", "Spa", "Pool"] },
          { name: "The Mansion on Turtle Creek", type: "Historic Luxury", priceRange: "$$$", neighborhood: "Turtle Creek", description: "Dallas institution", website: "https://www.rosewoodhotels.com/dallas", amenities: ["Spa", "Restaurant", "Pool"] },
          { name: "W Dallas Victory", type: "Design Hotel", priceRange: "$$$", neighborhood: "Victory Park", description: "Downtown hotspot", website: "https://www.marriott.com/wdal", amenities: ["Pool", "Spa", "Bar"] },
          { name: "Hotel Crescent Court", type: "Luxury Hotel", priceRange: "$$$", neighborhood: "Uptown", description: "European-style luxury", website: "https://www.crescentcourt.com", amenities: ["Spa", "Pool", "Restaurant"] },
        ]
      },
      {
        category: "Luxury",
        priceRange: "$500+/night",
        color: "text-amber-400",
        bgColor: "bg-amber-500/10 border-amber-500/20",
        accommodations: [
          { name: "The Mansion on Turtle Creek", type: "Historic Mansion", priceRange: "$$$$", neighborhood: "Turtle Creek", description: "Rosewood flagship", website: "https://www.rosewoodhotels.com/dallas", amenities: ["Butler", "Spa", "Fine Dining"] },
          { name: "Four Seasons Resort", type: "Luxury Resort", priceRange: "$$$$", neighborhood: "Las Colinas", description: "Championship golf", website: "https://www.fourseasons.com/dallas", amenities: ["Golf", "Spa", "Pool"] },
          { name: "The Virgin Hotels Dallas", type: "Lifestyle Hotel", priceRange: "$$$$", neighborhood: "Design District", description: "Richard Branson's vision", website: "https://www.virginhotels.com/dallas", amenities: ["Pool", "Rooftop", "Spa"] },
          { name: "Thompson Dallas", type: "Boutique Luxury", priceRange: "$$$$", neighborhood: "The Arts District", description: "Arts District sophistication", website: "https://www.thompsonhotels.com/dallas", amenities: ["Pool", "Rooftop", "Spa"] },
          { name: "The Rosewood Mansion", type: "Ultra-Luxury", priceRange: "$$$$", neighborhood: "Turtle Creek", description: "Ultimate Dallas luxury", website: "https://www.rosewoodhotels.com", amenities: ["Butler", "Spa", "Dining"] },
        ]
      }
    ]
  },
  {
    city: "Atlanta",
    country: "USA",
    countryCode: "us",
    categories: [
      {
        category: "Budget",
        priceRange: "$80-150/night",
        color: "text-green-400",
        bgColor: "bg-green-500/10 border-green-500/20",
        accommodations: [
          { name: "Hotel Indigo Atlanta Downtown", type: "Boutique Hotel", priceRange: "$", neighborhood: "Downtown", description: "Colorful boutique option", website: "https://www.ihg.com/hotelindigo/atlanta", amenities: ["WiFi", "Gym", "Restaurant"] },
          { name: "Aloft Atlanta Downtown", type: "Design Hotel", priceRange: "$", neighborhood: "Downtown", description: "Modern and playful", website: "https://www.marriott.com/aloft-atlanta", amenities: ["Pool", "WiFi", "Bar"] },
          { name: "The Social Goat B&B", type: "Bed & Breakfast", priceRange: "$", neighborhood: "East Atlanta", description: "Quirky B&B with goats", website: "https://www.thesocialgoat.com", amenities: ["Breakfast", "WiFi", "Garden"] },
          { name: "Hotel Clermont", type: "Boutique Hotel", priceRange: "$", neighborhood: "Poncey-Highland", description: "Revived Atlanta icon", website: "https://www.hotelclermont.com", amenities: ["Rooftop", "Bar", "Restaurant"] },
          { name: "Home2 Suites Atlanta Downtown", type: "Extended Stay", priceRange: "$", neighborhood: "Downtown", description: "All-suite value", website: "https://www.home2suites.com", amenities: ["Kitchen", "Pool", "Gym"] },
        ]
      },
      {
        category: "Mid-Range",
        priceRange: "$150-300/night",
        color: "text-blue-400",
        bgColor: "bg-blue-500/10 border-blue-500/20",
        accommodations: [
          { name: "The Ellis Hotel", type: "Boutique Hotel", priceRange: "$$", neighborhood: "Downtown", description: "Women-friendly floor option", website: "https://www.ellishotel.com", amenities: ["Gym", "Restaurant", "Bar"] },
          { name: "Loews Atlanta Hotel", type: "Luxury Hotel", priceRange: "$$", neighborhood: "Midtown", description: "Midtown sophistication", website: "https://www.loewshotels.com/atlanta", amenities: ["Pool", "Spa", "Restaurant"] },
          { name: "W Atlanta Midtown", type: "Design Hotel", priceRange: "$$", neighborhood: "Midtown", description: "Scene-y and stylish", website: "https://www.marriott.com/watl", amenities: ["Pool", "Bar", "Gym"] },
          { name: "The Georgian Terrace", type: "Historic Hotel", priceRange: "$$", neighborhood: "Midtown", description: "Gone with the Wind history", website: "https://www.thegeorgianterrace.com", amenities: ["Pool", "Restaurant", "Bar"] },
          { name: "Kimpton Sylvan Hotel", type: "Boutique Hotel", priceRange: "$$", neighborhood: "Buckhead", description: "Buckhead boutique gem", website: "https://www.thesylvanhotel.com", amenities: ["Pool", "Restaurant", "Bar"] },
        ]
      },
      {
        category: "Upscale",
        priceRange: "$300-500/night",
        color: "text-purple-400",
        bgColor: "bg-purple-500/10 border-purple-500/20",
        accommodations: [
          { name: "Four Seasons Atlanta", type: "Luxury Hotel", priceRange: "$$$", neighborhood: "Midtown", description: "Classic Five-star service", website: "https://www.fourseasons.com/atlanta", amenities: ["Spa", "Pool", "Restaurant"] },
          { name: "The St. Regis Atlanta", type: "Luxury Hotel", priceRange: "$$$", neighborhood: "Buckhead", description: "Buckhead elegance", website: "https://www.stregisatlanta.com", amenities: ["Butler", "Spa", "Pool"] },
          { name: "The Ritz-Carlton Atlanta", type: "Luxury Hotel", priceRange: "$$$", neighborhood: "Downtown", description: "Downtown landmark", website: "https://www.ritzcarlton.com/atlanta", amenities: ["Spa", "Restaurant", "Bar"] },
          { name: "Waldorf Astoria Atlanta Buckhead", type: "Luxury Hotel", priceRange: "$$$", neighborhood: "Buckhead", description: "Art Deco splendor", website: "https://www.waldorfastoria.com/atlanta", amenities: ["Spa", "Pool", "Restaurant"] },
          { name: "InterContinental Buckhead", type: "Luxury Hotel", priceRange: "$$$", neighborhood: "Buckhead", description: "Refined luxury", website: "https://www.ihg.com/intercontinental/buckhead", amenities: ["Pool", "Spa", "Restaurant"] },
        ]
      },
      {
        category: "Luxury",
        priceRange: "$500+/night",
        color: "text-amber-400",
        bgColor: "bg-amber-500/10 border-amber-500/20",
        accommodations: [
          { name: "The St. Regis Atlanta", type: "Ultra-Luxury", priceRange: "$$$$", neighborhood: "Buckhead", description: "Butler service perfection", website: "https://www.stregisatlanta.com", amenities: ["Butler", "Spa", "Fine Dining"] },
          { name: "Mandarin Oriental Atlanta", type: "Luxury Hotel", priceRange: "$$$$", neighborhood: "Buckhead", description: "Asian-inspired luxury", website: "https://www.mandarinoriental.com/atlanta", amenities: ["Spa", "Pool", "Fine Dining"] },
          { name: "Four Seasons Atlanta", type: "Luxury Hotel", priceRange: "$$$$", neighborhood: "Midtown", description: "Ultimate service", website: "https://www.fourseasons.com/atlanta", amenities: ["Spa", "Pool", "Fine Dining"] },
          { name: "The Whitley Atlanta Buckhead", type: "Luxury Hotel", priceRange: "$$$$", neighborhood: "Buckhead", description: "Marriott Luxury Collection", website: "https://www.thewhitleyhotel.com", amenities: ["Spa", "Pool", "Restaurant"] },
          { name: "JW Marriott Atlanta Buckhead", type: "Luxury Hotel", priceRange: "$$$$", neighborhood: "Buckhead", description: "Upscale sophistication", website: "https://www.marriott.com/jwatlanta", amenities: ["Spa", "Pool", "Restaurant"] },
        ]
      }
    ]
  },
  {
    city: "Houston",
    country: "USA",
    countryCode: "us",
    categories: [
      {
        category: "Budget",
        priceRange: "$80-150/night",
        color: "text-green-400",
        bgColor: "bg-green-500/10 border-green-500/20",
        accommodations: [
          { name: "Hotel Granduca Houston", type: "Boutique Hotel", priceRange: "$", neighborhood: "Uptown", description: "Italian-inspired boutique", website: "https://www.granducahouston.com", amenities: ["Pool", "Restaurant", "Gym"] },
          { name: "Aloft Houston Downtown", type: "Design Hotel", priceRange: "$", neighborhood: "Downtown", description: "Modern and tech-forward", website: "https://www.marriott.com/aloft-houston", amenities: ["Pool", "WiFi", "Bar"] },
          { name: "La Colombe d'Or Hotel", type: "Mansion Hotel", priceRange: "$", neighborhood: "Montrose", description: "Art-filled mansion", website: "https://www.lacolombedor.com", amenities: ["Garden", "WiFi", "Art"] },
          { name: "The Lancaster Hotel", type: "Historic Hotel", priceRange: "$", neighborhood: "Downtown", description: "1926 theatrical history", website: "https://www.thelancaster.com", amenities: ["Restaurant", "Bar", "WiFi"] },
          { name: "Hotel Icon", type: "Historic Hotel", priceRange: "$", neighborhood: "Downtown", description: "1911 bank building", website: "https://www.hotelicon.com", amenities: ["Pool", "Spa", "Restaurant"] },
        ]
      },
      {
        category: "Mid-Range",
        priceRange: "$150-300/night",
        color: "text-blue-400",
        bgColor: "bg-blue-500/10 border-blue-500/20",
        accommodations: [
          { name: "The Sam Houston Hotel", type: "Boutique Hotel", priceRange: "$$", neighborhood: "Downtown", description: "Curio Collection gem", website: "https://www.thesamhoustonhotel.com", amenities: ["Pool", "Restaurant", "Bar"] },
          { name: "Hotel ZaZa Houston", type: "Boutique Hotel", priceRange: "$$", neighborhood: "Museum District", description: "Glamorous boutique", website: "https://www.hotelzaza.com/houston", amenities: ["Pool", "Spa", "Restaurant"] },
          { name: "The Whitehall Houston", type: "Boutique Hotel", priceRange: "$$", neighborhood: "Downtown", description: "Art-focused boutique", website: "https://www.thewhitehallhouston.com", amenities: ["Restaurant", "Bar", "Gym"] },
          { name: "Marriott Marquis Houston", type: "Convention Hotel", priceRange: "$$", neighborhood: "Downtown", description: "Texas-shaped rooftop pool", website: "https://www.marriott.com/mrkqm", amenities: ["Pool", "Spa", "Restaurant"] },
          { name: "The Magnolia Hotel Houston", type: "Historic Hotel", priceRange: "$$", neighborhood: "Downtown", description: "1926 landmark", website: "https://www.magnoliahotels.com/houston", amenities: ["Gym", "Bar", "WiFi"] },
        ]
      },
      {
        category: "Upscale",
        priceRange: "$300-500/night",
        color: "text-purple-400",
        bgColor: "bg-purple-500/10 border-purple-500/20",
        accommodations: [
          { name: "The Post Oak Hotel", type: "Luxury Hotel", priceRange: "$$$", neighborhood: "Uptown", description: "Houston's newest luxury", website: "https://www.thepostoak.com", amenities: ["Spa", "Pool", "Rolls-Royce"] },
          { name: "Four Seasons Houston", type: "Luxury Hotel", priceRange: "$$$", neighborhood: "Downtown", description: "Classic luxury downtown", website: "https://www.fourseasons.com/houston", amenities: ["Spa", "Pool", "Restaurant"] },
          { name: "The St. Regis Houston", type: "Luxury Hotel", priceRange: "$$$", neighborhood: "Galleria", description: "Butler service excellence", website: "https://www.stregishouston.com", amenities: ["Butler", "Spa", "Restaurant"] },
          { name: "Hotel Granduca Houston", type: "Luxury Hotel", priceRange: "$$$", neighborhood: "Uptown", description: "Italian villa experience", website: "https://www.granducahouston.com", amenities: ["Pool", "Restaurant", "Spa"] },
          { name: "La Colombe d'Or", type: "Boutique Luxury", priceRange: "$$$", neighborhood: "Montrose", description: "Mansion meets museum", website: "https://www.lacolombedor.com", amenities: ["Art", "Garden", "Restaurant"] },
        ]
      },
      {
        category: "Luxury",
        priceRange: "$500+/night",
        color: "text-amber-400",
        bgColor: "bg-amber-500/10 border-amber-500/20",
        accommodations: [
          { name: "The Post Oak Hotel", type: "Ultra-Luxury", priceRange: "$$$$", neighborhood: "Uptown", description: "Tilman Fertitta's flagship", website: "https://www.thepostoak.com", amenities: ["Rolls-Royce", "Spa", "Fine Dining"] },
          { name: "The St. Regis Houston", type: "Ultra-Luxury", priceRange: "$$$$", neighborhood: "Galleria", description: "Ultimate butler service", website: "https://www.stregishouston.com", amenities: ["Butler", "Spa", "Fine Dining"] },
          { name: "Four Seasons Houston", type: "Luxury Hotel", priceRange: "$$$$", neighborhood: "Downtown", description: "Five-star perfection", website: "https://www.fourseasons.com/houston", amenities: ["Spa", "Pool", "Fine Dining"] },
          { name: "JW Marriott Houston Downtown", type: "Luxury Hotel", priceRange: "$$$$", neighborhood: "Downtown", description: "Sophisticated downtown", website: "https://www.marriott.com/jwhouston", amenities: ["Spa", "Pool", "Restaurant"] },
          { name: "The Houstonian", type: "Resort Hotel", priceRange: "$$$$", neighborhood: "Memorial", description: "Urban resort retreat", website: "https://www.houstonian.com", amenities: ["Spa", "Golf", "Pool"] },
        ]
      }
    ]
  },
  {
    city: "Seattle",
    country: "USA",
    countryCode: "us",
    categories: [
      {
        category: "Budget",
        priceRange: "$100-180/night",
        color: "text-green-400",
        bgColor: "bg-green-500/10 border-green-500/20",
        accommodations: [
          { name: "Ace Hotel Seattle", type: "Boutique Hotel", priceRange: "$", neighborhood: "Belltown", description: "Original Ace location", website: "https://www.acehotel.com/seattle", amenities: ["WiFi", "Restaurant", "Bar"] },
          { name: "The State Hotel", type: "Boutique Hotel", priceRange: "$", neighborhood: "Downtown", description: "Pike Place adjacent", website: "https://www.thestatehotel.com", amenities: ["WiFi", "Restaurant", "Bar"] },
          { name: "Staypineapple Hotel FIVE", type: "Boutique Hotel", priceRange: "$", neighborhood: "Downtown", description: "Fun and colorful", website: "https://www.staypineapple.com/hotel-five", amenities: ["WiFi", "Gym", "Bikes"] },
          { name: "Hotel Max", type: "Art Hotel", priceRange: "$", neighborhood: "Downtown", description: "Art-forward boutique", website: "https://www.hotelmaxseattle.com", amenities: ["WiFi", "Art", "Gym"] },
          { name: "Moore Hotel", type: "Historic Hotel", priceRange: "$", neighborhood: "Belltown", description: "1907 theater building", website: "https://www.moorehotel.com", amenities: ["WiFi", "Theater"] },
        ]
      },
      {
        category: "Mid-Range",
        priceRange: "$180-350/night",
        color: "text-blue-400",
        bgColor: "bg-blue-500/10 border-blue-500/20",
        accommodations: [
          { name: "The Edgewater", type: "Waterfront Hotel", priceRange: "$$", neighborhood: "Waterfront", description: "Beatles stayed here", website: "https://www.edgewaterhotel.com", amenities: ["Waterfront", "Restaurant", "Spa"] },
          { name: "Thompson Seattle", type: "Design Hotel", priceRange: "$$", neighborhood: "Downtown", description: "Rooftop with views", website: "https://www.thompsonseattle.com", amenities: ["Rooftop", "Restaurant", "Spa"] },
          { name: "Hotel Theodore", type: "Boutique Hotel", priceRange: "$$", neighborhood: "Downtown", description: "Museum-worthy design", website: "https://www.hoteltheodore.com", amenities: ["WiFi", "Restaurant", "Bar"] },
          { name: "Lotte Hotel Seattle", type: "Luxury Hotel", priceRange: "$$", neighborhood: "Downtown", description: "Korean elegance", website: "https://www.lottehotel.com/seattle", amenities: ["Spa", "Pool", "Restaurant"] },
          { name: "Kimpton Palladian Hotel", type: "Boutique Hotel", priceRange: "$$", neighborhood: "Belltown", description: "1910 building charm", website: "https://www.palladianhotel.com", amenities: ["Restaurant", "Bar", "Gym"] },
        ]
      },
      {
        category: "Upscale",
        priceRange: "$350-550/night",
        color: "text-purple-400",
        bgColor: "bg-purple-500/10 border-purple-500/20",
        accommodations: [
          { name: "Four Seasons Seattle", type: "Luxury Hotel", priceRange: "$$$", neighborhood: "Downtown", description: "Waterfront luxury", website: "https://www.fourseasons.com/seattle", amenities: ["Spa", "Pool", "Restaurant"] },
          { name: "The Fairmont Olympic", type: "Historic Luxury", priceRange: "$$$", neighborhood: "Downtown", description: "1924 landmark hotel", website: "https://www.fairmont.com/seattle", amenities: ["Spa", "Pool", "Restaurant"] },
          { name: "Inn at the Market", type: "Boutique Hotel", priceRange: "$$$", neighborhood: "Pike Place", description: "Pike Place hideaway", website: "https://www.innatthemarket.com", amenities: ["Views", "Restaurant", "Rooftop"] },
          { name: "The Charter Hotel Seattle", type: "Boutique Hotel", priceRange: "$$$", neighborhood: "Downtown", description: "Curio Collection", website: "https://www.thecharterhotel.com", amenities: ["Rooftop", "Restaurant", "Bar"] },
          { name: "Kimpton Hotel Vintage", type: "Boutique Hotel", priceRange: "$$$", neighborhood: "Downtown", description: "Wine-themed boutique", website: "https://www.hotelvintage-seattle.com", amenities: ["Wine Hour", "Restaurant", "Gym"] },
        ]
      },
      {
        category: "Luxury",
        priceRange: "$550+/night",
        color: "text-amber-400",
        bgColor: "bg-amber-500/10 border-amber-500/20",
        accommodations: [
          { name: "Four Seasons Seattle", type: "Ultra-Luxury", priceRange: "$$$$", neighborhood: "Downtown", description: "Waterfront excellence", website: "https://www.fourseasons.com/seattle", amenities: ["Spa", "Pool", "Fine Dining"] },
          { name: "The Fairmont Olympic", type: "Grand Hotel", priceRange: "$$$$", neighborhood: "Downtown", description: "Historic grandeur", website: "https://www.fairmont.com/seattle", amenities: ["Spa", "Pool", "Fine Dining"] },
          { name: "Rosewood Seattle", type: "Ultra-Luxury", priceRange: "$$$$", neighborhood: "Downtown", description: "New luxury landmark", website: "https://www.rosewoodhotels.com/seattle", amenities: ["Spa", "Pool", "Fine Dining"] },
          { name: "The Willows Lodge", type: "Wine Country", priceRange: "$$$$", neighborhood: "Woodinville", description: "Wine country retreat", website: "https://www.willowslodge.com", amenities: ["Spa", "Restaurant", "Gardens"] },
          { name: "Canlis Cottage", type: "Private Estate", priceRange: "$$$$", neighborhood: "Queen Anne", description: "Exclusive private rental", website: "https://www.canlis.com", amenities: ["Private", "Views", "Kitchen"] },
        ]
      }
    ]
  },
  {
    city: "San Francisco Bay Area",
    country: "USA",
    countryCode: "us",
    categories: [
      {
        category: "Budget",
        priceRange: "$120-200/night",
        color: "text-green-400",
        bgColor: "bg-green-500/10 border-green-500/20",
        accommodations: [
          { name: "HI San Francisco Fisherman's Wharf", type: "Hostel", priceRange: "$", neighborhood: "Fisherman's Wharf", description: "Historic Fort Mason hostel", website: "https://www.hiusa.org/hostels/california/san-francisco", amenities: ["WiFi", "Kitchen", "Views"] },
          { name: "Hotel Triton", type: "Boutique Hotel", priceRange: "$", neighborhood: "Union Square", description: "Eclectic and fun", website: "https://www.hoteltriton.com", amenities: ["WiFi", "Yoga", "Bar"] },
          { name: "Phoenix Hotel", type: "Motel", priceRange: "$", neighborhood: "Tenderloin", description: "Rock and roll motel", website: "https://www.jdvhotels.com/phoenix", amenities: ["Pool", "Bar", "Music"] },
          { name: "Hotel Bohème", type: "Boutique Hotel", priceRange: "$", neighborhood: "North Beach", description: "Beat Generation vibes", website: "https://www.hotelboheme.com", amenities: ["WiFi", "Character"] },
          { name: "Hotel Carlton", type: "Eco Hotel", priceRange: "$", neighborhood: "Nob Hill", description: "Green boutique hotel", website: "https://www.jdvhotels.com/carlton", amenities: ["WiFi", "Eco-Friendly"] },
        ]
      },
      {
        category: "Mid-Range",
        priceRange: "$200-400/night",
        color: "text-blue-400",
        bgColor: "bg-blue-500/10 border-blue-500/20",
        accommodations: [
          { name: "Hotel Vitale", type: "Waterfront Hotel", priceRange: "$$", neighborhood: "Embarcadero", description: "Bay views and spa", website: "https://www.hotelvitale.com", amenities: ["Spa", "Views", "Restaurant"] },
          { name: "The Line San Francisco", type: "Design Hotel", priceRange: "$$", neighborhood: "Tenderloin", description: "Trendy Tenderloin base", website: "https://www.thelinehotel.com/san-francisco", amenities: ["Restaurant", "Bar", "Gym"] },
          { name: "Proper Hotel San Francisco", type: "Boutique Hotel", priceRange: "$$", neighborhood: "Mid-Market", description: "Kelly Wearstler design", website: "https://www.properhotel.com/san-francisco", amenities: ["Rooftop", "Restaurant", "Gym"] },
          { name: "Hotel Zeppelin", type: "Boutique Hotel", priceRange: "$$", neighborhood: "Union Square", description: "Counterculture spirit", website: "https://www.hotelzeppelin.com", amenities: ["Bar", "Game Room", "Music"] },
          { name: "The Battery", type: "Members Club", priceRange: "$$", neighborhood: "Financial District", description: "Private club with rooms", website: "https://www.thebatterysf.com", amenities: ["Pool", "Spa", "Restaurant"] },
        ]
      },
      {
        category: "Upscale",
        priceRange: "$400-700/night",
        color: "text-purple-400",
        bgColor: "bg-purple-500/10 border-purple-500/20",
        accommodations: [
          { name: "Four Seasons San Francisco", type: "Luxury Hotel", priceRange: "$$$", neighborhood: "SoMa", description: "Five-star service", website: "https://www.fourseasons.com/sanfrancisco", amenities: ["Spa", "Pool", "Restaurant"] },
          { name: "The Ritz-Carlton San Francisco", type: "Luxury Hotel", priceRange: "$$$", neighborhood: "Nob Hill", description: "Nob Hill landmark", website: "https://www.ritzcarlton.com/sanfrancisco", amenities: ["Spa", "Restaurant", "Club Floor"] },
          { name: "Fairmont San Francisco", type: "Historic Luxury", priceRange: "$$$", neighborhood: "Nob Hill", description: "Iconic hilltop hotel", website: "https://www.fairmont.com/san-francisco", amenities: ["Spa", "Restaurant", "Bar"] },
          { name: "Palace Hotel", type: "Historic Luxury", priceRange: "$$$", neighborhood: "SoMa", description: "1875 landmark hotel", website: "https://www.sfpalace.com", amenities: ["Pool", "Spa", "Garden Court"] },
          { name: "St. Regis San Francisco", type: "Luxury Hotel", priceRange: "$$$", neighborhood: "SoMa", description: "Museum-adjacent luxury", website: "https://www.stregissanfrancisco.com", amenities: ["Butler", "Spa", "Restaurant"] },
        ]
      },
      {
        category: "Luxury",
        priceRange: "$700+/night",
        color: "text-amber-400",
        bgColor: "bg-amber-500/10 border-amber-500/20",
        accommodations: [
          { name: "Rosewood Sand Hill", type: "Resort", priceRange: "$$$$", neighborhood: "Menlo Park", description: "Silicon Valley retreat", website: "https://www.rosewoodhotels.com/sandhill", amenities: ["Spa", "Pool", "Fine Dining"] },
          { name: "Cavallo Point Lodge", type: "Historic Lodge", priceRange: "$$$$", neighborhood: "Sausalito", description: "Golden Gate views", website: "https://www.cavallopoint.com", amenities: ["Spa", "Restaurant", "Views"] },
          { name: "The Ritz-Carlton San Francisco", type: "Ultra-Luxury", priceRange: "$$$$", neighborhood: "Nob Hill", description: "Legendary service", website: "https://www.ritzcarlton.com/sanfrancisco", amenities: ["Spa", "Fine Dining", "Club"] },
          { name: "Four Seasons Embarcadero", type: "Urban Luxury", priceRange: "$$$$", neighborhood: "Embarcadero", description: "Waterfront elegance", website: "https://www.fourseasons.com/sanfranciscoe", amenities: ["Spa", "Pool", "Views"] },
          { name: "Meadowood Napa Valley", type: "Wine Resort", priceRange: "$$$$", neighborhood: "Napa Valley", description: "Wine country luxury", website: "https://www.meadowood.com", amenities: ["Golf", "Spa", "Fine Dining"] },
        ]
      }
    ]
  },
  {
    city: "Boston",
    country: "USA",
    countryCode: "us",
    categories: [
      {
        category: "Budget",
        priceRange: "$100-200/night",
        color: "text-green-400",
        bgColor: "bg-green-500/10 border-green-500/20",
        accommodations: [
          { name: "HI Boston Hostel", type: "Hostel", priceRange: "$", neighborhood: "Chinatown", description: "Clean, central hostel", website: "https://www.hiusa.org/hostels/massachusetts/boston", amenities: ["WiFi", "Kitchen", "Lounge"] },
          { name: "The Revolution Hotel", type: "Boutique Hotel", priceRange: "$", neighborhood: "South End", description: "Micro-rooms, big style", website: "https://www.therevolutionhotel.com", amenities: ["WiFi", "Rooftop", "Bikes"] },
          { name: "The Verb Hotel", type: "Boutique Hotel", priceRange: "$", neighborhood: "Fenway", description: "Rock and roll themed", website: "https://www.theverbhotel.com", amenities: ["Pool", "Music", "Bar"] },
          { name: "Hotel Commonwealth", type: "Boutique Hotel", priceRange: "$", neighborhood: "Kenmore Square", description: "Near Fenway Park", website: "https://www.hotelcommonwealth.com", amenities: ["Restaurant", "Gym", "Bar"] },
          { name: "The Godfrey Hotel Boston", type: "Boutique Hotel", priceRange: "$", neighborhood: "Downtown Crossing", description: "Modern and stylish", website: "https://www.godfreyhotelboston.com", amenities: ["WiFi", "Restaurant", "Gym"] },
        ]
      },
      {
        category: "Mid-Range",
        priceRange: "$200-400/night",
        color: "text-blue-400",
        bgColor: "bg-blue-500/10 border-blue-500/20",
        accommodations: [
          { name: "The Liberty Hotel", type: "Historic Hotel", priceRange: "$$", neighborhood: "Beacon Hill", description: "Former jail, now luxury", website: "https://www.libertyhotel.com", amenities: ["Restaurant", "Bar", "Gym"] },
          { name: "Kimpton Onyx Hotel", type: "Boutique Hotel", priceRange: "$$", neighborhood: "North Station", description: "Modern luxury near TD Garden", website: "https://www.onyxhotel.com", amenities: ["WiFi", "Wine Hour", "Gym"] },
          { name: "The Envoy Hotel", type: "Waterfront Hotel", priceRange: "$$", neighborhood: "Seaport", description: "Seaport innovation hub", website: "https://www.theenvoyhotel.com", amenities: ["Rooftop", "Restaurant", "Views"] },
          { name: "The Boxer Boston", type: "Boutique Hotel", priceRange: "$$", neighborhood: "North End", description: "Intimate boutique", website: "https://www.theboxerboston.com", amenities: ["WiFi", "Gym", "Restaurant"] },
          { name: "XV Beacon", type: "Boutique Hotel", priceRange: "$$", neighborhood: "Beacon Hill", description: "Townhouse luxury", website: "https://www.xvbeacon.com", amenities: ["Fireplace", "Library", "Restaurant"] },
        ]
      },
      {
        category: "Upscale",
        priceRange: "$400-650/night",
        color: "text-purple-400",
        bgColor: "bg-purple-500/10 border-purple-500/20",
        accommodations: [
          { name: "Four Seasons Boston", type: "Luxury Hotel", priceRange: "$$$", neighborhood: "Back Bay", description: "Public Garden views", website: "https://www.fourseasons.com/boston", amenities: ["Spa", "Pool", "Restaurant"] },
          { name: "Mandarin Oriental Boston", type: "Luxury Hotel", priceRange: "$$$", neighborhood: "Back Bay", description: "Asian elegance on Boylston", website: "https://www.mandarinoriental.com/boston", amenities: ["Spa", "Pool", "Restaurant"] },
          { name: "The Ritz-Carlton Boston", type: "Luxury Hotel", priceRange: "$$$", neighborhood: "Back Bay", description: "Classic luxury", website: "https://www.ritzcarlton.com/boston", amenities: ["Spa", "Pool", "Restaurant"] },
          { name: "The Newbury Boston", type: "Luxury Hotel", priceRange: "$$$", neighborhood: "Back Bay", description: "Reimagined Ritz", website: "https://www.thenewburyboston.com", amenities: ["Rooftop", "Spa", "Restaurant"] },
          { name: "Boston Harbor Hotel", type: "Waterfront Luxury", priceRange: "$$$", neighborhood: "Waterfront", description: "Harbor views", website: "https://www.bhh.com", amenities: ["Spa", "Marina", "Restaurant"] },
        ]
      },
      {
        category: "Luxury",
        priceRange: "$650+/night",
        color: "text-amber-400",
        bgColor: "bg-amber-500/10 border-amber-500/20",
        accommodations: [
          { name: "Four Seasons One Dalton", type: "Ultra-Luxury", priceRange: "$$$$", neighborhood: "Back Bay", description: "Boston's tallest residential tower", website: "https://www.fourseasons.com/onedalton", amenities: ["Spa", "Pool", "Views"] },
          { name: "Mandarin Oriental Boston", type: "Ultra-Luxury", priceRange: "$$$$", neighborhood: "Back Bay", description: "Award-winning spa", website: "https://www.mandarinoriental.com/boston", amenities: ["Spa", "Pool", "Fine Dining"] },
          { name: "Raffles Boston", type: "Ultra-Luxury", priceRange: "$$$$", neighborhood: "Back Bay", description: "New global luxury brand", website: "https://www.raffles.com/boston", amenities: ["Spa", "Pool", "Butler"] },
          { name: "The Langham Boston", type: "Historic Luxury", priceRange: "$$$$", neighborhood: "Financial District", description: "Former Federal Reserve", website: "https://www.langhamhotels.com/boston", amenities: ["Spa", "Restaurant", "Bar"] },
          { name: "XV Beacon", type: "Boutique Luxury", priceRange: "$$$$", neighborhood: "Beacon Hill", description: "Intimate townhouse luxury", website: "https://www.xvbeacon.com", amenities: ["Fireplace", "Leopard Robes", "Library"] },
        ]
      }
    ]
  },
  {
    city: "Philadelphia",
    country: "USA",
    countryCode: "us",
    categories: [
      {
        category: "Budget",
        priceRange: "$80-150/night",
        color: "text-green-400",
        bgColor: "bg-green-500/10 border-green-500/20",
        accommodations: [
          { name: "Apple Hostels Philadelphia", type: "Hostel", priceRange: "$", neighborhood: "Old City", description: "Social hostel near attractions", website: "https://www.applehostels.com", amenities: ["WiFi", "Kitchen", "Bar"] },
          { name: "Lokal Hotel Old City", type: "Boutique Hotel", priceRange: "$", neighborhood: "Old City", description: "Apartment-style rooms", website: "https://www.staystay.com/lokal-hotel-old-city", amenities: ["Kitchen", "WiFi", "Modern"] },
          { name: "Home2 Suites", type: "Extended Stay", priceRange: "$", neighborhood: "Convention Center", description: "All-suite value", website: "https://www.home2suites.com", amenities: ["Kitchen", "Pool", "Gym"] },
          { name: "Study at University City", type: "Boutique Hotel", priceRange: "$", neighborhood: "University City", description: "Academic chic", website: "https://www.thestudyatuniversitycity.com", amenities: ["WiFi", "Library", "Restaurant"] },
          { name: "Aloft Philadelphia Downtown", type: "Design Hotel", priceRange: "$", neighborhood: "Center City", description: "Modern W sister brand", website: "https://www.marriott.com/aloft-philadelphia", amenities: ["Pool", "WiFi", "Bar"] },
        ]
      },
      {
        category: "Mid-Range",
        priceRange: "$150-300/night",
        color: "text-blue-400",
        bgColor: "bg-blue-500/10 border-blue-500/20",
        accommodations: [
          { name: "Kimpton Hotel Monaco", type: "Boutique Hotel", priceRange: "$$", neighborhood: "Old City", description: "Historic Lafayette Building", website: "https://www.monaco-philadelphia.com", amenities: ["Wine Hour", "Restaurant", "Gym"] },
          { name: "The Logan Hotel", type: "Boutique Hotel", priceRange: "$$", neighborhood: "Logan Square", description: "Modern luxury", website: "https://www.theloganhotel.com", amenities: ["Pool", "Spa", "Restaurant"] },
          { name: "Hotel Palomar", type: "Boutique Hotel", priceRange: "$$", neighborhood: "Rittenhouse", description: "Art Deco beauty", website: "https://www.hotelpalomar-philadelphia.com", amenities: ["Pool", "Restaurant", "Gym"] },
          { name: "AKA Rittenhouse Square", type: "Extended Stay", priceRange: "$$", neighborhood: "Rittenhouse", description: "Luxury apartment living", website: "https://www.stayaka.com/rittenhouse", amenities: ["Kitchen", "Gym", "Concierge"] },
          { name: "Sofitel Philadelphia", type: "Luxury Hotel", priceRange: "$$", neighborhood: "Rittenhouse", description: "French elegance", website: "https://www.sofitel.com/philadelphia", amenities: ["Restaurant", "Bar", "Gym"] },
        ]
      },
      {
        category: "Upscale",
        priceRange: "$300-500/night",
        color: "text-purple-400",
        bgColor: "bg-purple-500/10 border-purple-500/20",
        accommodations: [
          { name: "Four Seasons Philadelphia", type: "Luxury Hotel", priceRange: "$$$", neighborhood: "Center City", description: "Comcast Center tower", website: "https://www.fourseasons.com/philadelphia", amenities: ["Spa", "Pool", "Restaurant"] },
          { name: "The Rittenhouse Hotel", type: "Luxury Hotel", priceRange: "$$$", neighborhood: "Rittenhouse", description: "Overlooking the Square", website: "https://www.rfrittenhousehotel.com", amenities: ["Spa", "Pool", "Restaurant"] },
          { name: "Ritz-Carlton Philadelphia", type: "Luxury Hotel", priceRange: "$$$", neighborhood: "Center City", description: "Historic bank building", website: "https://www.ritzcarlton.com/philadelphia", amenities: ["Spa", "Restaurant", "Club"] },
          { name: "Kimpton Hotel Palomar", type: "Boutique Luxury", priceRange: "$$$", neighborhood: "Rittenhouse", description: "Design-forward luxury", website: "https://www.hotelpalomar-philadelphia.com", amenities: ["Pool", "Restaurant", "Spa"] },
          { name: "The Windsor Suites", type: "All-Suite Hotel", priceRange: "$$$", neighborhood: "Parkway", description: "Spacious suites", website: "https://www.thewindsorsuites.com", amenities: ["Kitchen", "Pool", "Gym"] },
        ]
      },
      {
        category: "Luxury",
        priceRange: "$500+/night",
        color: "text-amber-400",
        bgColor: "bg-amber-500/10 border-amber-500/20",
        accommodations: [
          { name: "Four Seasons Philadelphia", type: "Ultra-Luxury", priceRange: "$$$$", neighborhood: "Center City", description: "57th-floor views", website: "https://www.fourseasons.com/philadelphia", amenities: ["Spa", "Pool", "Jean-Georges"] },
          { name: "The Rittenhouse Hotel", type: "Grand Hotel", priceRange: "$$$$", neighborhood: "Rittenhouse", description: "Philadelphia institution", website: "https://www.rfrittenhousehotel.com", amenities: ["Spa", "Pool", "Fine Dining"] },
          { name: "Ritz-Carlton Philadelphia", type: "Historic Luxury", priceRange: "$$$$", neighborhood: "Center City", description: "1908 marble masterpiece", website: "https://www.ritzcarlton.com/philadelphia", amenities: ["Spa", "Restaurant", "Club"] },
          { name: "The Bellevue Hotel", type: "Historic Luxury", priceRange: "$$$$", neighborhood: "Center City", description: "1904 grandeur", website: "https://www.bellevuehotel.com", amenities: ["Spa", "Restaurant", "Bar"] },
          { name: "Le Meridien Philadelphia", type: "Luxury Hotel", priceRange: "$$$$", neighborhood: "Center City", description: "Georgian Revival beauty", website: "https://www.lemeridienphiladelphia.com", amenities: ["Restaurant", "Bar", "Library"] },
        ]
      }
    ]
  },
  {
    city: "Kansas City",
    country: "USA",
    countryCode: "us",
    categories: [
      {
        category: "Budget",
        priceRange: "$70-130/night",
        color: "text-green-400",
        bgColor: "bg-green-500/10 border-green-500/20",
        accommodations: [
          { name: "21c Museum Hotel", type: "Art Hotel", priceRange: "$", neighborhood: "Crossroads", description: "Contemporary art museum hotel", website: "https://www.21cmuseumhotels.com/kansascity", amenities: ["Art", "Restaurant", "Bar"] },
          { name: "Hotel Phillips", type: "Historic Hotel", priceRange: "$", neighborhood: "Downtown", description: "1931 Art Deco landmark", website: "https://www.hotelphillips.com", amenities: ["Restaurant", "Bar", "Gym"] },
          { name: "Aloft Kansas City", type: "Design Hotel", priceRange: "$", neighborhood: "Country Club Plaza", description: "Modern and playful", website: "https://www.aloftkansascity.com", amenities: ["Pool", "Bar", "Gym"] },
          { name: "The Fontaine", type: "Boutique Hotel", priceRange: "$", neighborhood: "Country Club Plaza", description: "European elegance", website: "https://www.thefontainehotel.com", amenities: ["Pool", "Spa", "Restaurant"] },
          { name: "Holiday Inn Country Club Plaza", type: "Standard Hotel", priceRange: "$", neighborhood: "Country Club Plaza", description: "Reliable chain option", website: "https://www.ihg.com/holidayinn/kansascity", amenities: ["Pool", "Restaurant", "Gym"] },
        ]
      },
      {
        category: "Mid-Range",
        priceRange: "$130-250/night",
        color: "text-blue-400",
        bgColor: "bg-blue-500/10 border-blue-500/20",
        accommodations: [
          { name: "The Raphael Hotel", type: "Boutique Hotel", priceRange: "$$", neighborhood: "Country Club Plaza", description: "European charm on the Plaza", website: "https://www.raphaelkc.com", amenities: ["Restaurant", "Bar", "Gym"] },
          { name: "Crossroads Hotel", type: "Boutique Hotel", priceRange: "$$", neighborhood: "Crossroads", description: "Arts district cool", website: "https://www.crossroadshotelkc.com", amenities: ["Rooftop", "Restaurant", "Bar"] },
          { name: "Hotel Indigo", type: "Boutique Hotel", priceRange: "$$", neighborhood: "Country Club Plaza", description: "Colorful boutique", website: "https://www.ihg.com/hotelindigo/kansascity", amenities: ["Pool", "Restaurant", "Bar"] },
          { name: "Ambassador Hotel", type: "Historic Hotel", priceRange: "$$", neighborhood: "Downtown", description: "1925 landmark", website: "https://www.ambassadorkansascity.com", amenities: ["Restaurant", "Bar", "Gym"] },
          { name: "The Aladdin Hotel", type: "Historic Hotel", priceRange: "$$", neighborhood: "Downtown", description: "Jazz Age glamour", website: "https://www.aladdinkc.com", amenities: ["Restaurant", "Bar", "Gym"] },
        ]
      },
      {
        category: "Upscale",
        priceRange: "$250-400/night",
        color: "text-purple-400",
        bgColor: "bg-purple-500/10 border-purple-500/20",
        accommodations: [
          { name: "InterContinental Kansas City", type: "Luxury Hotel", priceRange: "$$$", neighborhood: "Country Club Plaza", description: "Plaza sophistication", website: "https://www.ihg.com/intercontinental/kansascity", amenities: ["Spa", "Pool", "Restaurant"] },
          { name: "Loews Kansas City", type: "Convention Hotel", priceRange: "$$$", neighborhood: "Downtown", description: "Convention center connected", website: "https://www.loewshotels.com/kansascity", amenities: ["Pool", "Spa", "Restaurant"] },
          { name: "The Westin Crown Center", type: "Landmark Hotel", priceRange: "$$$", neighborhood: "Crown Center", description: "Indoor waterfall lobby", website: "https://www.westinkansascity.com", amenities: ["Pool", "Restaurant", "Tennis"] },
          { name: "Marriott Kansas City Downtown", type: "Full-Service Hotel", priceRange: "$$$", neighborhood: "Downtown", description: "Connected to convention", website: "https://www.marriott.com/mkcdt", amenities: ["Pool", "Restaurant", "Gym"] },
          { name: "Sheraton Crown Center", type: "Conference Hotel", priceRange: "$$$", neighborhood: "Crown Center", description: "Atrium hotel", website: "https://www.sheratonkansascity.com", amenities: ["Pool", "Restaurant", "Gym"] },
        ]
      },
      {
        category: "Luxury",
        priceRange: "$400+/night",
        color: "text-amber-400",
        bgColor: "bg-amber-500/10 border-amber-500/20",
        accommodations: [
          { name: "InterContinental Kansas City", type: "Premier Hotel", priceRange: "$$$$", neighborhood: "Country Club Plaza", description: "Plaza's finest", website: "https://www.ihg.com/intercontinental/kansascity", amenities: ["Spa", "Pool", "Fine Dining"] },
          { name: "The Fontaine", type: "Boutique Luxury", priceRange: "$$$$", neighborhood: "Country Club Plaza", description: "European elegance", website: "https://www.thefontainehotel.com", amenities: ["Spa", "Pool", "Restaurant"] },
          { name: "21c Museum Hotel", type: "Art Luxury", priceRange: "$$$$", neighborhood: "Crossroads", description: "Contemporary art experience", website: "https://www.21cmuseumhotels.com/kansascity", amenities: ["Art", "Restaurant", "Spa"] },
          { name: "The Raphael Hotel", type: "Classic Luxury", priceRange: "$$$$", neighborhood: "Country Club Plaza", description: "Kansas City's grande dame", website: "https://www.raphaelkc.com", amenities: ["Restaurant", "Bar", "Concierge"] },
          { name: "Hotel Kansas City", type: "Historic Luxury", priceRange: "$$$$", neighborhood: "Downtown", description: "Restored club building", website: "https://www.hotelkansascity.com", amenities: ["Pool", "Rooftop", "Restaurant"] },
        ]
      }
    ]
  },
  {
    city: "Toronto",
    country: "Canada",
    countryCode: "ca",
    categories: [
      {
        category: "Budget",
        priceRange: "CAD $120-200/night",
        color: "text-green-400",
        bgColor: "bg-green-500/10 border-green-500/20",
        accommodations: [
          { name: "HI Toronto Hostel", type: "Hostel", priceRange: "$", neighborhood: "Church-Wellesley", description: "Central and social", website: "https://www.hihostels.ca/toronto", amenities: ["WiFi", "Kitchen", "Lounge"] },
          { name: "The Drake Hotel", type: "Boutique Hotel", priceRange: "$", neighborhood: "West Queen West", description: "Art and culture hub", website: "https://www.thedrake.ca", amenities: ["Restaurant", "Bar", "Rooftop"] },
          { name: "Gladstone Hotel", type: "Art Hotel", priceRange: "$", neighborhood: "West Queen West", description: "Artist-designed rooms", website: "https://www.gladstonehotel.com", amenities: ["Art", "Bar", "Events"] },
          { name: "The Annex Hotel", type: "Boutique Hotel", priceRange: "$", neighborhood: "The Annex", description: "Neighborhood boutique", website: "https://www.theannexhotel.com", amenities: ["WiFi", "Bar", "Restaurant"] },
          { name: "Hotel Ocho", type: "Boutique Hotel", priceRange: "$", neighborhood: "Chinatown", description: "Intimate boutique", website: "https://www.hotelocho.com", amenities: ["Restaurant", "Bar", "Rooftop"] },
        ]
      },
      {
        category: "Mid-Range",
        priceRange: "CAD $200-350/night",
        color: "text-blue-400",
        bgColor: "bg-blue-500/10 border-blue-500/20",
        accommodations: [
          { name: "The Broadview Hotel", type: "Boutique Hotel", priceRange: "$$", neighborhood: "Riverside", description: "Revived Victorian landmark", website: "https://www.thebroadviewhotel.ca", amenities: ["Rooftop", "Restaurant", "Bar"] },
          { name: "1 Hotel Toronto", type: "Eco-Luxury", priceRange: "$$", neighborhood: "King West", description: "Sustainable luxury", website: "https://www.1hotels.com/toronto", amenities: ["Spa", "Restaurant", "Gym"] },
          { name: "Kimpton Saint George", type: "Boutique Hotel", priceRange: "$$", neighborhood: "Yorkville", description: "Yorkville glamour", website: "https://www.thesaintgeorge.com", amenities: ["Restaurant", "Wine Hour", "Gym"] },
          { name: "Bisha Hotel", type: "Design Hotel", priceRange: "$$", neighborhood: "Entertainment District", description: "Scene-y and stylish", website: "https://www.bishahoteltoronto.com", amenities: ["Pool", "Restaurant", "Nightclub"] },
          { name: "The Hazelton Hotel", type: "Boutique Luxury", priceRange: "$$", neighborhood: "Yorkville", description: "Celebrity favorite", website: "https://www.thehazeltonhotel.com", amenities: ["Spa", "Restaurant", "Bar"] },
        ]
      },
      {
        category: "Upscale",
        priceRange: "CAD $350-550/night",
        color: "text-purple-400",
        bgColor: "bg-purple-500/10 border-purple-500/20",
        accommodations: [
          { name: "Four Seasons Toronto", type: "Luxury Hotel", priceRange: "$$$", neighborhood: "Yorkville", description: "Yorkville landmark", website: "https://www.fourseasons.com/toronto", amenities: ["Spa", "Pool", "Restaurant"] },
          { name: "The Ritz-Carlton Toronto", type: "Luxury Hotel", priceRange: "$$$", neighborhood: "Entertainment District", description: "Downtown luxury", website: "https://www.ritzcarlton.com/toronto", amenities: ["Spa", "Restaurant", "Bar"] },
          { name: "Shangri-La Toronto", type: "Luxury Hotel", priceRange: "$$$", neighborhood: "University", description: "Asian-inspired luxury", website: "https://www.shangri-la.com/toronto", amenities: ["Spa", "Pool", "Restaurant"] },
          { name: "Park Hyatt Toronto", type: "Luxury Hotel", priceRange: "$$$", neighborhood: "Yorkville", description: "Bloor Street elegance", website: "https://www.hyatt.com/parktoronto", amenities: ["Spa", "Restaurant", "Rooftop"] },
          { name: "The St. Regis Toronto", type: "Luxury Hotel", priceRange: "$$$", neighborhood: "Financial District", description: "Butler service", website: "https://www.stregistoronto.com", amenities: ["Butler", "Spa", "Restaurant"] },
        ]
      },
      {
        category: "Luxury",
        priceRange: "CAD $550+/night",
        color: "text-amber-400",
        bgColor: "bg-amber-500/10 border-amber-500/20",
        accommodations: [
          { name: "Four Seasons Toronto", type: "Ultra-Luxury", priceRange: "$$$$", neighborhood: "Yorkville", description: "Toronto's finest", website: "https://www.fourseasons.com/toronto", amenities: ["Spa", "Pool", "Fine Dining"] },
          { name: "The Ritz-Carlton Toronto", type: "Ultra-Luxury", priceRange: "$$$$", neighborhood: "Entertainment District", description: "Five-star service", website: "https://www.ritzcarlton.com/toronto", amenities: ["Spa", "Cheese Cave", "Restaurant"] },
          { name: "The St. Regis Toronto", type: "Ultra-Luxury", priceRange: "$$$$", neighborhood: "Financial District", description: "Butler perfection", website: "https://www.stregistoronto.com", amenities: ["Butler", "Spa", "Louix Louis"] },
          { name: "The Hazelton Hotel", type: "Boutique Ultra-Luxury", priceRange: "$$$$", neighborhood: "Yorkville", description: "Private and exclusive", website: "https://www.thehazeltonhotel.com", amenities: ["Spa", "Restaurant", "Screening Room"] },
          { name: "Rosalie at The Ritz", type: "Residence Club", priceRange: "$$$$", neighborhood: "Downtown", description: "Private residence experience", website: "https://www.ritzcarlton.com/toronto", amenities: ["Kitchen", "Butler", "Spa"] },
        ]
      }
    ]
  },
  {
    city: "Vancouver",
    country: "Canada",
    countryCode: "ca",
    categories: [
      {
        category: "Budget",
        priceRange: "CAD $120-200/night",
        color: "text-green-400",
        bgColor: "bg-green-500/10 border-green-500/20",
        accommodations: [
          { name: "HI Vancouver Central", type: "Hostel", priceRange: "$", neighborhood: "Downtown", description: "Central and social", website: "https://www.hihostels.ca/vancouver", amenities: ["WiFi", "Kitchen", "Tours"] },
          { name: "YWCA Hotel Vancouver", type: "Budget Hotel", priceRange: "$", neighborhood: "Downtown", description: "Clean and central", website: "https://www.ywcavan.org/hotel", amenities: ["WiFi", "Gym", "Kitchen"] },
          { name: "The Burrard", type: "Retro Motel", priceRange: "$", neighborhood: "Downtown", description: "Retro-modern motor inn", website: "https://www.theburrard.com", amenities: ["Bikes", "WiFi", "Courtyard"] },
          { name: "St. Regis Hotel Vancouver", type: "Budget Hotel", priceRange: "$", neighborhood: "Downtown", description: "Not the luxury chain", website: "https://www.stregishotel.com", amenities: ["Restaurant", "Bar", "WiFi"] },
          { name: "Victorian Hotel", type: "Historic Hotel", priceRange: "$", neighborhood: "Downtown", description: "European-style B&B feel", website: "https://www.victorianhotel.ca", amenities: ["WiFi", "Breakfast"] },
        ]
      },
      {
        category: "Mid-Range",
        priceRange: "CAD $200-350/night",
        color: "text-blue-400",
        bgColor: "bg-blue-500/10 border-blue-500/20",
        accommodations: [
          { name: "Loden Hotel", type: "Boutique Hotel", priceRange: "$$", neighborhood: "Coal Harbour", description: "Boutique luxury", website: "https://www.theloden.com", amenities: ["Spa", "Restaurant", "Gym"] },
          { name: "Opus Hotel", type: "Design Hotel", priceRange: "$$", neighborhood: "Yaletown", description: "Hip Yaletown base", website: "https://www.opushotel.com", amenities: ["Restaurant", "Bar", "Gym"] },
          { name: "Wedgewood Hotel", type: "Boutique Hotel", priceRange: "$$", neighborhood: "Downtown", description: "European elegance", website: "https://www.wedgewoodhotel.com", amenities: ["Spa", "Restaurant", "Bar"] },
          { name: "Fairmont Hotel Vancouver", type: "Historic Hotel", priceRange: "$$", neighborhood: "Downtown", description: "Castle in the city", website: "https://www.fairmont.com/hotelvancouver", amenities: ["Spa", "Restaurant", "Gym"] },
          { name: "JW Marriott Parq Vancouver", type: "Luxury Hotel", priceRange: "$$", neighborhood: "Yaletown", description: "Modern luxury resort", website: "https://www.marriott.com/jwparq", amenities: ["Spa", "Pool", "Casino"] },
        ]
      },
      {
        category: "Upscale",
        priceRange: "CAD $350-550/night",
        color: "text-purple-400",
        bgColor: "bg-purple-500/10 border-purple-500/20",
        accommodations: [
          { name: "Fairmont Pacific Rim", type: "Luxury Hotel", priceRange: "$$$", neighborhood: "Coal Harbour", description: "Waterfront luxury", website: "https://www.fairmont.com/pacificrim", amenities: ["Spa", "Pool", "Restaurant"] },
          { name: "Rosewood Hotel Georgia", type: "Historic Luxury", priceRange: "$$$", neighborhood: "Downtown", description: "1927 landmark restored", website: "https://www.rosewoodhotels.com/georgia", amenities: ["Spa", "Pool", "Restaurant"] },
          { name: "Four Seasons Vancouver", type: "Luxury Hotel", priceRange: "$$$", neighborhood: "Downtown", description: "Pacific Centre location", website: "https://www.fourseasons.com/vancouver", amenities: ["Spa", "Pool", "Restaurant"] },
          { name: "Shangri-La Vancouver", type: "Luxury Hotel", priceRange: "$$$", neighborhood: "Downtown", description: "City's tallest building", website: "https://www.shangri-la.com/vancouver", amenities: ["Spa", "Pool", "Restaurant"] },
          { name: "Pan Pacific Vancouver", type: "Waterfront Luxury", priceRange: "$$$", neighborhood: "Canada Place", description: "Cruise ship views", website: "https://www.panpacific.com/vancouver", amenities: ["Spa", "Pool", "Restaurant"] },
        ]
      },
      {
        category: "Luxury",
        priceRange: "CAD $550+/night",
        color: "text-amber-400",
        bgColor: "bg-amber-500/10 border-amber-500/20",
        accommodations: [
          { name: "Fairmont Pacific Rim", type: "Ultra-Luxury", priceRange: "$$$$", neighborhood: "Coal Harbour", description: "Vancouver's finest", website: "https://www.fairmont.com/pacificrim", amenities: ["Spa", "Pool", "Fine Dining"] },
          { name: "Rosewood Hotel Georgia", type: "Historic Ultra-Luxury", priceRange: "$$$$", neighborhood: "Downtown", description: "Timeless elegance", website: "https://www.rosewoodhotels.com/georgia", amenities: ["Spa", "Pool", "Hawksworth"] },
          { name: "Four Seasons Vancouver", type: "Ultra-Luxury", priceRange: "$$$$", neighborhood: "Downtown", description: "Five-star perfection", website: "https://www.fourseasons.com/vancouver", amenities: ["Spa", "Pool", "YEW"] },
          { name: "The Douglas at Parq", type: "Modern Luxury", priceRange: "$$$$", neighborhood: "Yaletown", description: "Autograph Collection", website: "https://www.thedouglasvancouver.com", amenities: ["Spa", "Pool", "D/6"] },
          { name: "L'Hermitage Hotel", type: "Boutique Luxury", priceRange: "$$$$", neighborhood: "Downtown", description: "Intimate luxury", website: "https://www.lhermitagehotel.com", amenities: ["Pool", "Spa", "Restaurant"] },
        ]
      }
    ]
  },
  {
    city: "Mexico City",
    country: "Mexico",
    countryCode: "mx",
    categories: [
      {
        category: "Budget",
        priceRange: "MXN $1,000-2,500/night",
        color: "text-green-400",
        bgColor: "bg-green-500/10 border-green-500/20",
        accommodations: [
          { name: "Chaya B&B", type: "Bed & Breakfast", priceRange: "$", neighborhood: "Roma Norte", description: "Cozy Roma Norte home", website: "https://www.chayabb.com", amenities: ["Breakfast", "WiFi", "Garden"] },
          { name: "Casa de los Amigos", type: "Guesthouse", priceRange: "$", neighborhood: "Centro", description: "Quaker-run guesthouse", website: "https://www.casadelosamigos.org", amenities: ["WiFi", "Kitchen", "Community"] },
          { name: "Hostel Home", type: "Hostel", priceRange: "$", neighborhood: "Roma Norte", description: "Social Roma hostel", website: "https://www.hostelhome.com.mx", amenities: ["WiFi", "Bar", "Kitchen"] },
          { name: "Suites del Angel", type: "Aparthotel", priceRange: "$", neighborhood: "Zona Rosa", description: "Near Angel of Independence", website: "https://www.suitesdelangel.com", amenities: ["Kitchen", "WiFi", "Gym"] },
          { name: "Hotel Milan", type: "Budget Hotel", priceRange: "$", neighborhood: "Roma Norte", description: "Art Deco gem", website: "https://www.hotelmilan.com.mx", amenities: ["WiFi", "Restaurant"] },
        ]
      },
      {
        category: "Mid-Range",
        priceRange: "MXN $2,500-5,000/night",
        color: "text-blue-400",
        bgColor: "bg-blue-500/10 border-blue-500/20",
        accommodations: [
          { name: "Condesa DF", type: "Design Hotel", priceRange: "$$", neighborhood: "Condesa", description: "Iconic design hotel", website: "https://www.condesadf.com", amenities: ["Rooftop", "Restaurant", "Bar"] },
          { name: "Hotel Carlota", type: "Design Hotel", priceRange: "$$", neighborhood: "Cuauhtémoc", description: "Pool and modern art", website: "https://www.hotelcarlota.com.mx", amenities: ["Pool", "Restaurant", "Bar"] },
          { name: "Nima Local House Hotel", type: "Boutique Hotel", priceRange: "$$", neighborhood: "Roma Norte", description: "Hip Roma spot", website: "https://www.nimalocalhouse.com", amenities: ["Rooftop", "Bar", "Restaurant"] },
          { name: "Casa Goliana", type: "Boutique Hotel", priceRange: "$$", neighborhood: "Roma Norte", description: "Intimate townhouse", website: "https://www.casagoliana.com", amenities: ["Garden", "WiFi", "Breakfast"] },
          { name: "Ignacia Guest House", type: "Design B&B", priceRange: "$$", neighborhood: "Roma Norte", description: "Design-forward B&B", website: "https://www.ignaciaguesthouse.com", amenities: ["Breakfast", "Garden", "WiFi"] },
        ]
      },
      {
        category: "Upscale",
        priceRange: "MXN $5,000-10,000/night",
        color: "text-purple-400",
        bgColor: "bg-purple-500/10 border-purple-500/20",
        accommodations: [
          { name: "Las Alcobas", type: "Luxury Hotel", priceRange: "$$$", neighborhood: "Polanco", description: "Intimate luxury in Polanco", website: "https://www.lasalcobas.com", amenities: ["Spa", "Restaurant", "Bar"] },
          { name: "Four Seasons Mexico City", type: "Luxury Hotel", priceRange: "$$$", neighborhood: "Reforma", description: "Grand hacienda style", website: "https://www.fourseasons.com/mexicocity", amenities: ["Spa", "Pool", "Restaurant"] },
          { name: "St. Regis Mexico City", type: "Luxury Hotel", priceRange: "$$$", neighborhood: "Reforma", description: "Butler service luxury", website: "https://www.stregismexicocity.com", amenities: ["Butler", "Spa", "Restaurant"] },
          { name: "JW Marriott Mexico City", type: "Luxury Hotel", priceRange: "$$$", neighborhood: "Polanco", description: "Polanco sophistication", website: "https://www.marriott.com/jwmexicocity", amenities: ["Spa", "Pool", "Restaurant"] },
          { name: "Hyatt Regency Mexico City", type: "Luxury Hotel", priceRange: "$$$", neighborhood: "Polanco", description: "Tower in Polanco", website: "https://www.hyatt.com/regency/mexicocity", amenities: ["Pool", "Spa", "Restaurant"] },
        ]
      },
      {
        category: "Luxury",
        priceRange: "MXN $10,000+/night",
        color: "text-amber-400",
        bgColor: "bg-amber-500/10 border-amber-500/20",
        accommodations: [
          { name: "Four Seasons Mexico City", type: "Ultra-Luxury", priceRange: "$$$$", neighborhood: "Reforma", description: "CDMX's finest", website: "https://www.fourseasons.com/mexicocity", amenities: ["Spa", "Pool", "Fine Dining"] },
          { name: "St. Regis Mexico City", type: "Ultra-Luxury", priceRange: "$$$$", neighborhood: "Reforma", description: "35 floors of luxury", website: "https://www.stregismexicocity.com", amenities: ["Butler", "Spa", "Diana Restaurant"] },
          { name: "Las Alcobas Mexico City", type: "Boutique Ultra-Luxury", priceRange: "$$$$", neighborhood: "Polanco", description: "Intimate and refined", website: "https://www.lasalcobas.com", amenities: ["Spa", "Restaurant", "Bar"] },
          { name: "Sofitel Mexico City Reforma", type: "French Luxury", priceRange: "$$$$", neighborhood: "Reforma", description: "French elegance", website: "https://www.sofitel.com/mexicocity", amenities: ["Spa", "Restaurant", "Bar"] },
          { name: "W Mexico City", type: "Design Luxury", priceRange: "$$$$", neighborhood: "Polanco", description: "Scene and style", website: "https://www.marriott.com/wmexicocity", amenities: ["Spa", "Pool", "Living Room"] },
        ]
      }
    ]
  },
  {
    city: "Guadalajara",
    country: "Mexico",
    countryCode: "mx",
    categories: [
      {
        category: "Budget",
        priceRange: "MXN $800-2,000/night",
        color: "text-green-400",
        bgColor: "bg-green-500/10 border-green-500/20",
        accommodations: [
          { name: "Hostel Lit", type: "Hostel", priceRange: "$", neighborhood: "Centro", description: "Social downtown hostel", website: "https://www.hostellit.com", amenities: ["WiFi", "Bar", "Kitchen"] },
          { name: "Casa Pedro Loza", type: "Boutique Hotel", priceRange: "$", neighborhood: "Centro", description: "Historic center gem", website: "https://www.casapedroloza.com", amenities: ["WiFi", "Restaurant", "Terrace"] },
          { name: "Hotel Morales", type: "Historic Hotel", priceRange: "$", neighborhood: "Centro", description: "Colonial charm", website: "https://www.hotelmorales.com.mx", amenities: ["Pool", "Restaurant", "Bar"] },
          { name: "Hotel De Mendoza", type: "Colonial Hotel", priceRange: "$", neighborhood: "Centro", description: "Near Teatro Degollado", website: "https://www.hoteldemendoza.com.mx", amenities: ["Pool", "Restaurant", "Bar"] },
          { name: "Hotel Dali Plaza", type: "Budget Hotel", priceRange: "$", neighborhood: "Centro", description: "Simple and central", website: "https://www.hoteldali.com", amenities: ["WiFi", "Restaurant"] },
        ]
      },
      {
        category: "Mid-Range",
        priceRange: "MXN $2,000-4,000/night",
        color: "text-blue-400",
        bgColor: "bg-blue-500/10 border-blue-500/20",
        accommodations: [
          { name: "Hotel Demetria", type: "Design Hotel", priceRange: "$$", neighborhood: "Lafayette", description: "Modern design hotel", website: "https://www.hoteldemetria.com", amenities: ["Pool", "Restaurant", "Spa"] },
          { name: "Krystal Urban Guadalajara", type: "Business Hotel", priceRange: "$$", neighborhood: "Providencia", description: "Modern business hotel", website: "https://www.krystal-hotels.com", amenities: ["Pool", "Gym", "Restaurant"] },
          { name: "NH Collection Guadalajara", type: "Business Hotel", priceRange: "$$", neighborhood: "Providencia", description: "Spanish chain elegance", website: "https://www.nh-hotels.com", amenities: ["Pool", "Restaurant", "Gym"] },
          { name: "Fiesta Americana", type: "Luxury Hotel", priceRange: "$$", neighborhood: "Centro", description: "Grand downtown hotel", website: "https://www.fiestamericana.com", amenities: ["Pool", "Spa", "Restaurant"] },
          { name: "Hotel Riu Plaza Guadalajara", type: "Chain Hotel", priceRange: "$$", neighborhood: "Providencia", description: "Reliable chain option", website: "https://www.riu.com", amenities: ["Pool", "Gym", "Restaurant"] },
        ]
      },
      {
        category: "Upscale",
        priceRange: "MXN $4,000-7,000/night",
        color: "text-purple-400",
        bgColor: "bg-purple-500/10 border-purple-500/20",
        accommodations: [
          { name: "Quinta Real Guadalajara", type: "Luxury Hotel", priceRange: "$$$", neighborhood: "Minerva", description: "Hacienda-style luxury", website: "https://www.quintareal.com", amenities: ["Pool", "Spa", "Restaurant"] },
          { name: "Casa Fayette", type: "Design Hotel", priceRange: "$$$", neighborhood: "Lafayette", description: "Design destination", website: "https://www.casafayette.com", amenities: ["Pool", "Restaurant", "Spa"] },
          { name: "Hotel Presidente InterContinental", type: "Luxury Hotel", priceRange: "$$$", neighborhood: "Expo", description: "Near Expo center", website: "https://www.ihg.com/intercontinental", amenities: ["Pool", "Spa", "Restaurant"] },
          { name: "Hilton Guadalajara", type: "Luxury Hotel", priceRange: "$$$", neighborhood: "Providencia", description: "Modern luxury", website: "https://www.hilton.com", amenities: ["Pool", "Spa", "Restaurant"] },
          { name: "Hyatt Regency Andares", type: "Luxury Hotel", priceRange: "$$$", neighborhood: "Andares", description: "Shopping mall adjacent", website: "https://www.hyatt.com", amenities: ["Pool", "Spa", "Restaurant"] },
        ]
      },
      {
        category: "Luxury",
        priceRange: "MXN $7,000+/night",
        color: "text-amber-400",
        bgColor: "bg-amber-500/10 border-amber-500/20",
        accommodations: [
          { name: "Quinta Real Guadalajara", type: "Grand Hacienda", priceRange: "$$$$", neighborhood: "Minerva", description: "Ultimate GDL luxury", website: "https://www.quintareal.com", amenities: ["Spa", "Pool", "Fine Dining"] },
          { name: "Casa Fayette", type: "Design Luxury", priceRange: "$$$$", neighborhood: "Lafayette", description: "Design excellence", website: "https://www.casafayette.com", amenities: ["Pool", "Spa", "Restaurant"] },
          { name: "Hotel Demetria", type: "Boutique Luxury", priceRange: "$$$$", neighborhood: "Lafayette", description: "Art meets hospitality", website: "https://www.hoteldemetria.com", amenities: ["Pool", "Spa", "Restaurant"] },
          { name: "One Guadalajara Periférico", type: "Modern Luxury", priceRange: "$$$$", neighborhood: "Providencia", description: "Contemporary luxury", website: "https://www.onehotels.com", amenities: ["Pool", "Spa", "Restaurant"] },
          { name: "Grand Fiesta Americana", type: "Premium Chain", priceRange: "$$$$", neighborhood: "Country Club", description: "Golf club location", website: "https://www.fiestamericana.com", amenities: ["Golf", "Spa", "Restaurant"] },
        ]
      }
    ]
  },
  {
    city: "Monterrey",
    country: "Mexico",
    countryCode: "mx",
    categories: [
      {
        category: "Budget",
        priceRange: "MXN $800-2,000/night",
        color: "text-green-400",
        bgColor: "bg-green-500/10 border-green-500/20",
        accommodations: [
          { name: "Ibis Monterrey", type: "Budget Hotel", priceRange: "$", neighborhood: "Centro", description: "Reliable French chain", website: "https://www.ibis.com", amenities: ["WiFi", "Restaurant", "Bar"] },
          { name: "City Express", type: "Business Budget", priceRange: "$", neighborhood: "Multiple locations", description: "Mexican business chain", website: "https://www.cityexpress.com", amenities: ["WiFi", "Breakfast", "Gym"] },
          { name: "Hotel Quinta Avenida", type: "Budget Hotel", priceRange: "$", neighborhood: "Centro", description: "Simple downtown option", website: "https://www.hotelquintaavenida.com", amenities: ["WiFi", "Restaurant"] },
          { name: "One Monterrey Aeropuerto", type: "Airport Hotel", priceRange: "$", neighborhood: "Airport", description: "Convenient for flights", website: "https://www.onehotels.com", amenities: ["WiFi", "Restaurant", "Shuttle"] },
          { name: "Fiesta Inn Centro", type: "Mid-Range Chain", priceRange: "$", neighborhood: "Centro", description: "Reliable chain hotel", website: "https://www.fiestainn.com", amenities: ["Pool", "Restaurant", "Gym"] },
        ]
      },
      {
        category: "Mid-Range",
        priceRange: "MXN $2,000-4,000/night",
        color: "text-blue-400",
        bgColor: "bg-blue-500/10 border-blue-500/20",
        accommodations: [
          { name: "Krystal Monterrey", type: "Business Hotel", priceRange: "$$", neighborhood: "Centro", description: "Downtown business hotel", website: "https://www.krystal-hotels.com", amenities: ["Pool", "Restaurant", "Gym"] },
          { name: "NH Collection Monterrey", type: "Business Hotel", priceRange: "$$", neighborhood: "San Pedro", description: "Spanish chain quality", website: "https://www.nh-hotels.com", amenities: ["Pool", "Restaurant", "Spa"] },
          { name: "Holiday Inn Monterrey", type: "Chain Hotel", priceRange: "$$", neighborhood: "Centro", description: "Familiar reliability", website: "https://www.ihg.com/holidayinn", amenities: ["Pool", "Restaurant", "Gym"] },
          { name: "Safi Royal Luxury Centro", type: "Boutique Hotel", priceRange: "$$", neighborhood: "Centro", description: "Luxury downtown", website: "https://www.safihoteles.com", amenities: ["Pool", "Spa", "Restaurant"] },
          { name: "Galería Plaza Monterrey", type: "Business Hotel", priceRange: "$$", neighborhood: "San Pedro", description: "San Pedro business hotel", website: "https://www.brisas.com.mx/galeria-plaza", amenities: ["Pool", "Restaurant", "Gym"] },
        ]
      },
      {
        category: "Upscale",
        priceRange: "MXN $4,000-7,000/night",
        color: "text-purple-400",
        bgColor: "bg-purple-500/10 border-purple-500/20",
        accommodations: [
          { name: "Quinta Real Monterrey", type: "Luxury Hotel", priceRange: "$$$", neighborhood: "Valle Oriente", description: "Hacienda elegance", website: "https://www.quintareal.com", amenities: ["Pool", "Spa", "Restaurant"] },
          { name: "JW Marriott Monterrey", type: "Luxury Hotel", priceRange: "$$$", neighborhood: "Valle Oriente", description: "Business luxury", website: "https://www.marriott.com/jwmonterrey", amenities: ["Pool", "Spa", "Restaurant"] },
          { name: "Live Aqua Urban Resort", type: "Urban Resort", priceRange: "$$$", neighborhood: "San Pedro", description: "Hip urban resort", website: "https://www.liveaqua.com", amenities: ["Pool", "Spa", "Restaurant"] },
          { name: "Grand Fiesta Americana", type: "Luxury Hotel", priceRange: "$$$", neighborhood: "Valle Oriente", description: "Grand hotel", website: "https://www.fiestamericana.com", amenities: ["Pool", "Spa", "Restaurant"] },
          { name: "Hilton Monterrey", type: "Luxury Hotel", priceRange: "$$$", neighborhood: "Centro", description: "Downtown luxury", website: "https://www.hilton.com", amenities: ["Pool", "Spa", "Restaurant"] },
        ]
      },
      {
        category: "Luxury",
        priceRange: "MXN $7,000+/night",
        color: "text-amber-400",
        bgColor: "bg-amber-500/10 border-amber-500/20",
        accommodations: [
          { name: "Quinta Real Monterrey", type: "Ultimate Luxury", priceRange: "$$$$", neighborhood: "Valle Oriente", description: "Monterrey's finest", website: "https://www.quintareal.com", amenities: ["Spa", "Pool", "Fine Dining"] },
          { name: "JW Marriott Monterrey Valle", type: "Business Luxury", priceRange: "$$$$", neighborhood: "Valle Oriente", description: "Five-star service", website: "https://www.marriott.com/jwmonterrey", amenities: ["Spa", "Pool", "Restaurant"] },
          { name: "Live Aqua Urban Resort", type: "Design Luxury", priceRange: "$$$$", neighborhood: "San Pedro", description: "Contemporary cool", website: "https://www.liveaqua.com", amenities: ["Spa", "Pool", "Restaurant"] },
          { name: "Camino Real Monterrey", type: "Classic Luxury", priceRange: "$$$$", neighborhood: "Centro", description: "Established elegance", website: "https://www.caminoreal.com", amenities: ["Pool", "Spa", "Restaurant"] },
          { name: "Westin Monterrey Valle", type: "Premium Chain", priceRange: "$$$$", neighborhood: "Valle Oriente", description: "Marriott premium", website: "https://www.westin.com", amenities: ["Spa", "Pool", "Restaurant"] },
        ]
      }
    ]
  }
];

export default function Lodging() {
  const [selectedCity, setSelectedCity] = useState<CityLodging | null>(null);
  const [expandedCategory, setExpandedCategory] = useState<string | null>("Mid-Range");

  if (selectedCity) {
    return (
      <Layout>
        <div className="pt-6 px-6 pb-24">
          <button 
            onClick={() => setSelectedCity(null)}
            className="flex items-center space-x-2 text-primary mb-6 hover:text-primary/80 transition-colors"
            data-testid="button-back"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-medium">Back to All Cities</span>
          </button>

          <div className="bg-gradient-to-br from-purple-500/20 to-primary/10 border border-purple-500/20 rounded-2xl p-6 mb-6">
            <div className="flex items-start space-x-4">
              <div className="w-16 h-16 rounded-xl overflow-hidden border-2 border-white/20 flex-shrink-0">
                <img 
                  src={`https://flagcdn.com/w160/${selectedCity.countryCode}.png`}
                  alt={`${selectedCity.country} flag`}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <h1 className="text-2xl font-display font-bold text-white mb-1" data-testid="text-city-name">
                  {selectedCity.city}
                </h1>
                <p className="text-purple-400 font-medium text-sm">
                  <Hotel className="w-4 h-4 inline mr-1" />
                  20 Accommodation Options
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {selectedCity.categories.map((category, catIndex) => (
              <div key={catIndex} className="bg-card border border-white/5 rounded-xl overflow-hidden">
                <button
                  onClick={() => setExpandedCategory(expandedCategory === category.category ? null : category.category)}
                  className="w-full p-4 flex items-center justify-between hover:bg-white/5 transition-colors"
                  data-testid={`button-category-${category.category.toLowerCase()}`}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-10 h-10 rounded-lg ${category.bgColor} flex items-center justify-center border`}>
                      <DollarSign className={`w-5 h-5 ${category.color}`} />
                    </div>
                    <div className="text-left">
                      <h3 className={`font-bold ${category.color}`}>{category.category}</h3>
                      <p className="text-xs text-muted-foreground">{category.priceRange}</p>
                    </div>
                  </div>
                  <ChevronRight className={`w-5 h-5 text-muted-foreground transition-transform ${expandedCategory === category.category ? 'rotate-90' : ''}`} />
                </button>
                
                {expandedCategory === category.category && (
                  <div className="px-4 pb-4 space-y-3">
                    {category.accommodations.map((hotel, hotelIndex) => (
                      <a
                        key={hotelIndex}
                        href={hotel.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block bg-background/50 border border-white/5 rounded-lg p-4 hover:border-purple-500/30 transition-colors group"
                        data-testid={`link-hotel-${hotel.name.toLowerCase().replace(/\s+/g, '-')}`}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h4 className="font-bold text-white group-hover:text-purple-400 transition-colors flex items-center gap-2">
                              {hotel.name}
                              <ExternalLink className="w-3 h-3 opacity-50 group-hover:opacity-100" />
                            </h4>
                            <div className="flex items-center space-x-2 mt-1">
                              <span className={`text-xs ${category.color} font-medium`}>{hotel.type}</span>
                              <span className="text-xs text-muted-foreground">•</span>
                              <span className="text-xs text-muted-foreground">{hotel.neighborhood}</span>
                            </div>
                            <p className="text-sm text-gray-400 mt-2">{hotel.description}</p>
                            <div className="flex flex-wrap gap-1.5 mt-2">
                              {hotel.amenities.map((amenity, amenityIndex) => (
                                <span 
                                  key={amenityIndex}
                                  className="px-2 py-0.5 bg-white/5 rounded-full text-[10px] text-gray-400"
                                >
                                  {amenity}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-6 bg-white/5 border border-white/10 rounded-xl p-4">
            <p className="text-xs text-muted-foreground leading-relaxed">
              Prices shown are estimated nightly rates and may vary based on dates and availability. Book well in advance for World Cup dates as demand will be extremely high.
            </p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="pt-8 px-6 pb-6">
        <Link href="/menu" className="flex items-center space-x-2 text-primary mb-4 hover:text-primary/80 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm font-medium">Back to Menu</span>
        </Link>

        <div className="flex items-center space-x-3 mb-2">
          <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center">
            <Hotel className="w-6 h-6 text-purple-400" />
          </div>
          <div>
            <h1 className="text-3xl font-display font-bold text-white" data-testid="text-page-title">
              Lodging Guide
            </h1>
            <p className="text-sm text-muted-foreground">20 accommodations per city across all price ranges</p>
          </div>
        </div>
      </div>

      <div className="px-6 pb-6">
        <div className="grid grid-cols-4 gap-2 mb-6">
          <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-2 text-center">
            <span className="text-[10px] text-green-400 font-medium">Budget</span>
          </div>
          <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-2 text-center">
            <span className="text-[10px] text-blue-400 font-medium">Mid-Range</span>
          </div>
          <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-2 text-center">
            <span className="text-[10px] text-purple-400 font-medium">Upscale</span>
          </div>
          <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-2 text-center">
            <span className="text-[10px] text-amber-400 font-medium">Luxury</span>
          </div>
        </div>
      </div>

      <div className="px-6 pb-24">
        <h2 className="text-lg font-display font-bold text-white mb-4">Select a Host City</h2>
        
        <div className="space-y-3">
          {lodgingData.map((city, index) => (
            <button
              key={index}
              onClick={() => setSelectedCity(city)}
              className="w-full bg-card border border-white/5 rounded-xl p-4 hover:border-purple-500/30 transition-all group text-left"
              data-testid={`button-lodging-city-${city.countryCode}-${index}`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-lg overflow-hidden border border-white/10 flex-shrink-0">
                    <img 
                      src={`https://flagcdn.com/w80/${city.countryCode}.png`}
                      alt={`${city.country} flag`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-bold text-white group-hover:text-purple-400 transition-colors">{city.city}</h3>
                    <p className="text-sm text-muted-foreground">20 hotels</p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-purple-400 transition-colors" />
              </div>
            </button>
          ))}
        </div>
      </div>
    </Layout>
  );
}