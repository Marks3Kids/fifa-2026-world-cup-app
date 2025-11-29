import { Layout } from "@/components/Layout";
import { Plane, Clock, ArrowLeft, Globe, Star, ChevronRight, ExternalLink } from "lucide-react";
import { Link } from "wouter";
import { useState } from "react";
import { getAirlineUrl } from "@/lib/airlines";

interface Airport {
  city: string;
  country: string;
  countryCode: string;
  airportName: string;
  code: string;
  airlines: string[];
  continentConnections: {
    continent: string;
    routes: {
      from: string;
      flightTime: string;
      economy: string;
      business: string;
      firstClass: string;
    }[];
  }[];
}

const airports: Airport[] = [
  {
    city: "New York / New Jersey",
    country: "USA",
    countryCode: "us",
    airportName: "John F. Kennedy International / Newark Liberty",
    code: "JFK / EWR",
    airlines: ["Delta", "United", "American", "JetBlue", "British Airways", "Emirates", "Lufthansa", "Air France", "Qatar Airways"],
    continentConnections: [
      {
        continent: "Europe",
        routes: [
          { from: "London (LHR)", flightTime: "7h 30m", economy: "$450-850", business: "$3,500-6,000", firstClass: "$8,000-15,000" },
          { from: "Paris (CDG)", flightTime: "7h 45m", economy: "$500-900", business: "$3,800-6,500", firstClass: "$9,000-16,000" },
          { from: "Frankfurt (FRA)", flightTime: "8h 15m", economy: "$480-870", business: "$3,600-6,200", firstClass: "$8,500-14,500" },
        ]
      },
      {
        continent: "South America",
        routes: [
          { from: "São Paulo (GRU)", flightTime: "9h 45m", economy: "$600-1,100", business: "$3,200-5,500", firstClass: "$7,500-12,000" },
          { from: "Buenos Aires (EZE)", flightTime: "10h 30m", economy: "$650-1,200", business: "$3,400-5,800", firstClass: "$8,000-13,000" },
        ]
      },
      {
        continent: "Middle East",
        routes: [
          { from: "Dubai (DXB)", flightTime: "13h 30m", economy: "$700-1,300", business: "$4,500-8,000", firstClass: "$12,000-22,000" },
          { from: "Doha (DOH)", flightTime: "13h 00m", economy: "$680-1,250", business: "$4,200-7,500", firstClass: "$11,000-20,000" },
        ]
      },
      {
        continent: "Asia",
        routes: [
          { from: "Tokyo (NRT)", flightTime: "14h 00m", economy: "$800-1,400", business: "$5,000-9,000", firstClass: "$14,000-25,000" },
          { from: "Seoul (ICN)", flightTime: "14h 30m", economy: "$750-1,350", business: "$4,800-8,500", firstClass: "$13,000-23,000" },
        ]
      },
    ]
  },
  {
    city: "Los Angeles",
    country: "USA",
    countryCode: "us",
    airportName: "Los Angeles International Airport",
    code: "LAX",
    airlines: ["Delta", "American", "United", "Qantas", "Singapore Airlines", "Cathay Pacific", "ANA", "Korean Air", "Air New Zealand"],
    continentConnections: [
      {
        continent: "Asia Pacific",
        routes: [
          { from: "Sydney (SYD)", flightTime: "15h 00m", economy: "$900-1,600", business: "$5,500-9,500", firstClass: "$15,000-28,000" },
          { from: "Tokyo (NRT)", flightTime: "11h 30m", economy: "$700-1,200", business: "$4,500-8,000", firstClass: "$12,000-22,000" },
          { from: "Singapore (SIN)", flightTime: "17h 30m", economy: "$850-1,500", business: "$5,200-9,000", firstClass: "$14,000-26,000" },
        ]
      },
      {
        continent: "Oceania",
        routes: [
          { from: "Auckland (AKL)", flightTime: "12h 45m", economy: "$800-1,400", business: "$4,800-8,500", firstClass: "$13,000-24,000" },
          { from: "Melbourne (MEL)", flightTime: "15h 30m", economy: "$880-1,550", business: "$5,400-9,200", firstClass: "$14,500-27,000" },
        ]
      },
      {
        continent: "Europe",
        routes: [
          { from: "London (LHR)", flightTime: "10h 30m", economy: "$500-950", business: "$4,000-7,000", firstClass: "$10,000-18,000" },
          { from: "Paris (CDG)", flightTime: "11h 00m", economy: "$550-1,000", business: "$4,200-7,200", firstClass: "$10,500-19,000" },
        ]
      },
    ]
  },
  {
    city: "Miami",
    country: "USA",
    countryCode: "us",
    airportName: "Miami International Airport",
    code: "MIA",
    airlines: ["American", "LATAM", "Avianca", "Copa Airlines", "Iberia", "British Airways", "Lufthansa", "Air France"],
    continentConnections: [
      {
        continent: "South America",
        routes: [
          { from: "São Paulo (GRU)", flightTime: "8h 15m", economy: "$500-900", business: "$2,800-4,800", firstClass: "$6,500-11,000" },
          { from: "Buenos Aires (EZE)", flightTime: "9h 00m", economy: "$550-950", business: "$3,000-5,200", firstClass: "$7,000-12,000" },
          { from: "Bogotá (BOG)", flightTime: "3h 30m", economy: "$300-550", business: "$1,800-3,200", firstClass: "$4,500-7,500" },
        ]
      },
      {
        continent: "Europe",
        routes: [
          { from: "Madrid (MAD)", flightTime: "8h 45m", economy: "$480-880", business: "$3,500-6,000", firstClass: "$8,500-15,000" },
          { from: "London (LHR)", flightTime: "9h 00m", economy: "$500-900", business: "$3,700-6,300", firstClass: "$9,000-16,000" },
        ]
      },
      {
        continent: "Caribbean",
        routes: [
          { from: "San Juan (SJU)", flightTime: "2h 30m", economy: "$150-350", business: "$800-1,500", firstClass: "$2,000-3,500" },
          { from: "Havana (HAV)", flightTime: "1h 15m", economy: "$200-400", business: "$900-1,600", firstClass: "$2,200-4,000" },
        ]
      },
    ]
  },
  {
    city: "Dallas",
    country: "USA",
    countryCode: "us",
    airportName: "Dallas/Fort Worth International Airport",
    code: "DFW",
    airlines: ["American", "Southwest", "United", "Qatar Airways", "Emirates", "Lufthansa", "British Airways", "Japan Airlines"],
    continentConnections: [
      {
        continent: "Europe",
        routes: [
          { from: "London (LHR)", flightTime: "9h 30m", economy: "$500-920", business: "$3,800-6,500", firstClass: "$9,500-17,000" },
          { from: "Frankfurt (FRA)", flightTime: "10h 15m", economy: "$520-950", business: "$4,000-6,800", firstClass: "$10,000-18,000" },
        ]
      },
      {
        continent: "Middle East",
        routes: [
          { from: "Doha (DOH)", flightTime: "15h 00m", economy: "$750-1,300", business: "$5,500-9,500", firstClass: "$14,000-25,000" },
          { from: "Dubai (DXB)", flightTime: "15h 30m", economy: "$780-1,350", business: "$5,800-9,800", firstClass: "$15,000-27,000" },
        ]
      },
      {
        continent: "Asia",
        routes: [
          { from: "Tokyo (NRT)", flightTime: "13h 00m", economy: "$750-1,300", business: "$4,800-8,500", firstClass: "$13,000-24,000" },
          { from: "Seoul (ICN)", flightTime: "13h 30m", economy: "$720-1,250", business: "$4,600-8,200", firstClass: "$12,500-23,000" },
        ]
      },
    ]
  },
  {
    city: "Atlanta",
    country: "USA",
    countryCode: "us",
    airportName: "Hartsfield-Jackson Atlanta International",
    code: "ATL",
    airlines: ["Delta", "Southwest", "United", "Air France", "KLM", "Lufthansa", "British Airways", "Korean Air"],
    continentConnections: [
      {
        continent: "Europe",
        routes: [
          { from: "Paris (CDG)", flightTime: "9h 00m", economy: "$520-950", business: "$3,900-6,700", firstClass: "$9,800-17,500" },
          { from: "Amsterdam (AMS)", flightTime: "9h 15m", economy: "$500-920", business: "$3,800-6,500", firstClass: "$9,500-17,000" },
        ]
      },
      {
        continent: "Africa",
        routes: [
          { from: "Johannesburg (JNB)", flightTime: "16h 30m", economy: "$900-1,600", business: "$5,500-9,500", firstClass: "$15,000-28,000" },
          { from: "Lagos (LOS)", flightTime: "11h 00m", economy: "$800-1,400", business: "$4,500-8,000", firstClass: "$12,000-22,000" },
        ]
      },
    ]
  },
  {
    city: "Mexico City",
    country: "Mexico",
    countryCode: "mx",
    airportName: "Mexico City International (Benito Juárez)",
    code: "MEX",
    airlines: ["Aeroméxico", "Volaris", "United", "American", "Delta", "Iberia", "Air France", "Lufthansa", "British Airways"],
    continentConnections: [
      {
        continent: "Europe",
        routes: [
          { from: "Madrid (MAD)", flightTime: "10h 30m", economy: "$550-1,000", business: "$3,500-6,000", firstClass: "$8,500-15,000" },
          { from: "Paris (CDG)", flightTime: "11h 15m", economy: "$600-1,100", business: "$3,800-6,500", firstClass: "$9,500-17,000" },
          { from: "London (LHR)", flightTime: "10h 45m", economy: "$580-1,050", business: "$3,700-6,300", firstClass: "$9,000-16,500" },
        ]
      },
      {
        continent: "South America",
        routes: [
          { from: "São Paulo (GRU)", flightTime: "9h 30m", economy: "$500-900", business: "$2,800-4,800", firstClass: "$6,500-11,000" },
          { from: "Buenos Aires (EZE)", flightTime: "10h 00m", economy: "$550-950", business: "$3,000-5,000", firstClass: "$7,000-12,000" },
          { from: "Lima (LIM)", flightTime: "5h 30m", economy: "$350-650", business: "$2,000-3,500", firstClass: "$5,000-8,500" },
        ]
      },
    ]
  },
  {
    city: "Toronto",
    country: "Canada",
    countryCode: "ca",
    airportName: "Toronto Pearson International",
    code: "YYZ",
    airlines: ["Air Canada", "WestJet", "United", "American", "British Airways", "Lufthansa", "Air France", "Emirates", "Turkish Airlines"],
    continentConnections: [
      {
        continent: "Europe",
        routes: [
          { from: "London (LHR)", flightTime: "7h 15m", economy: "$500-920", business: "$3,600-6,200", firstClass: "$8,800-16,000" },
          { from: "Paris (CDG)", flightTime: "7h 30m", economy: "$520-950", business: "$3,800-6,500", firstClass: "$9,200-17,000" },
          { from: "Frankfurt (FRA)", flightTime: "8h 00m", economy: "$480-890", business: "$3,500-6,000", firstClass: "$8,500-15,500" },
        ]
      },
      {
        continent: "Middle East",
        routes: [
          { from: "Dubai (DXB)", flightTime: "13h 00m", economy: "$700-1,250", business: "$4,500-7,800", firstClass: "$12,000-21,000" },
          { from: "Istanbul (IST)", flightTime: "10h 00m", economy: "$600-1,100", business: "$3,800-6,500", firstClass: "$9,500-17,000" },
        ]
      },
    ]
  },
  {
    city: "Vancouver",
    country: "Canada",
    countryCode: "ca",
    airportName: "Vancouver International Airport",
    code: "YVR",
    airlines: ["Air Canada", "WestJet", "United", "Cathay Pacific", "ANA", "Japan Airlines", "Korean Air", "Air China"],
    continentConnections: [
      {
        continent: "Asia Pacific",
        routes: [
          { from: "Tokyo (NRT)", flightTime: "9h 30m", economy: "$650-1,150", business: "$4,200-7,500", firstClass: "$11,000-20,000" },
          { from: "Hong Kong (HKG)", flightTime: "12h 00m", economy: "$700-1,250", business: "$4,500-8,000", firstClass: "$12,000-22,000" },
          { from: "Seoul (ICN)", flightTime: "10h 30m", economy: "$680-1,200", business: "$4,300-7,700", firstClass: "$11,500-21,000" },
        ]
      },
      {
        continent: "Oceania",
        routes: [
          { from: "Sydney (SYD)", flightTime: "15h 30m", economy: "$850-1,500", business: "$5,200-9,000", firstClass: "$14,000-26,000" },
          { from: "Auckland (AKL)", flightTime: "13h 15m", economy: "$780-1,380", business: "$4,800-8,400", firstClass: "$13,000-24,000" },
        ]
      },
    ]
  },
  {
    city: "Guadalajara",
    country: "Mexico",
    countryCode: "mx",
    airportName: "Guadalajara International (Miguel Hidalgo)",
    code: "GDL",
    airlines: ["Aeroméxico", "Volaris", "VivaAerobus", "United", "American", "Delta", "Alaska Airlines"],
    continentConnections: [
      {
        continent: "North America",
        routes: [
          { from: "Los Angeles (LAX)", flightTime: "3h 00m", economy: "$200-400", business: "$800-1,500", firstClass: "$2,000-3,800" },
          { from: "Dallas (DFW)", flightTime: "2h 30m", economy: "$180-350", business: "$750-1,400", firstClass: "$1,800-3,500" },
          { from: "Houston (IAH)", flightTime: "2h 15m", economy: "$170-330", business: "$700-1,300", firstClass: "$1,700-3,200" },
        ]
      },
      {
        continent: "Central America",
        routes: [
          { from: "San José (SJO)", flightTime: "3h 30m", economy: "$250-450", business: "$1,000-1,800", firstClass: "$2,500-4,500" },
          { from: "Panama City (PTY)", flightTime: "4h 30m", economy: "$300-550", business: "$1,200-2,200", firstClass: "$3,000-5,500" },
        ]
      },
    ]
  },
  {
    city: "Monterrey",
    country: "Mexico",
    countryCode: "mx",
    airportName: "Monterrey International (Gen. Mariano Escobedo)",
    code: "MTY",
    airlines: ["Aeroméxico", "Volaris", "VivaAerobus", "United", "American", "Delta"],
    continentConnections: [
      {
        continent: "North America",
        routes: [
          { from: "Houston (IAH)", flightTime: "1h 30m", economy: "$150-300", business: "$600-1,100", firstClass: "$1,500-2,800" },
          { from: "Dallas (DFW)", flightTime: "1h 45m", economy: "$160-320", business: "$650-1,200", firstClass: "$1,600-3,000" },
          { from: "Chicago (ORD)", flightTime: "3h 00m", economy: "$220-420", business: "$850-1,600", firstClass: "$2,100-4,000" },
        ]
      },
    ]
  },
  {
    city: "Houston",
    country: "USA",
    countryCode: "us",
    airportName: "George Bush Intercontinental Airport",
    code: "IAH",
    airlines: ["United", "Southwest", "American", "Spirit", "Emirates", "Qatar Airways", "Lufthansa", "British Airways"],
    continentConnections: [
      {
        continent: "Europe",
        routes: [
          { from: "London (LHR)", flightTime: "9h 45m", economy: "$520-960", business: "$3,900-6,700", firstClass: "$9,800-17,500" },
          { from: "Frankfurt (FRA)", flightTime: "10h 30m", economy: "$540-1,000", business: "$4,100-7,000", firstClass: "$10,200-18,500" },
        ]
      },
      {
        continent: "Middle East",
        routes: [
          { from: "Doha (DOH)", flightTime: "15h 30m", economy: "$780-1,350", business: "$5,700-9,700", firstClass: "$14,500-26,000" },
          { from: "Dubai (DXB)", flightTime: "16h 00m", economy: "$800-1,400", business: "$5,900-10,000", firstClass: "$15,000-27,000" },
        ]
      },
      {
        continent: "South America",
        routes: [
          { from: "São Paulo (GRU)", flightTime: "10h 00m", economy: "$580-1,050", business: "$3,200-5,500", firstClass: "$7,800-13,500" },
          { from: "Bogotá (BOG)", flightTime: "4h 30m", economy: "$320-600", business: "$1,800-3,200", firstClass: "$4,500-8,000" },
        ]
      },
    ]
  },
  {
    city: "Seattle",
    country: "USA",
    countryCode: "us",
    airportName: "Seattle-Tacoma International Airport",
    code: "SEA",
    airlines: ["Alaska Airlines", "Delta", "United", "Emirates", "Korean Air", "ANA", "Lufthansa", "British Airways"],
    continentConnections: [
      {
        continent: "Asia Pacific",
        routes: [
          { from: "Tokyo (NRT)", flightTime: "10h 00m", economy: "$700-1,200", business: "$4,500-8,000", firstClass: "$12,000-22,000" },
          { from: "Seoul (ICN)", flightTime: "10h 30m", economy: "$680-1,180", business: "$4,400-7,800", firstClass: "$11,500-21,000" },
        ]
      },
      {
        continent: "Europe",
        routes: [
          { from: "London (LHR)", flightTime: "9h 30m", economy: "$520-950", business: "$3,900-6,700", firstClass: "$9,800-17,500" },
          { from: "Paris (CDG)", flightTime: "10h 00m", economy: "$550-1,000", business: "$4,100-7,000", firstClass: "$10,200-18,500" },
        ]
      },
    ]
  },
  {
    city: "San Francisco Bay Area",
    country: "USA",
    countryCode: "us",
    airportName: "San Francisco International / San Jose",
    code: "SFO / SJC",
    airlines: ["United", "Alaska Airlines", "Southwest", "Singapore Airlines", "Cathay Pacific", "ANA", "Korean Air", "Lufthansa"],
    continentConnections: [
      {
        continent: "Asia Pacific",
        routes: [
          { from: "Singapore (SIN)", flightTime: "16h 30m", economy: "$850-1,500", business: "$5,200-9,000", firstClass: "$14,000-26,000" },
          { from: "Hong Kong (HKG)", flightTime: "13h 30m", economy: "$750-1,300", business: "$4,700-8,300", firstClass: "$12,500-23,000" },
          { from: "Tokyo (NRT)", flightTime: "11h 00m", economy: "$700-1,200", business: "$4,500-8,000", firstClass: "$12,000-22,000" },
        ]
      },
      {
        continent: "Europe",
        routes: [
          { from: "London (LHR)", flightTime: "10h 30m", economy: "$520-950", business: "$4,000-7,000", firstClass: "$10,000-18,000" },
          { from: "Frankfurt (FRA)", flightTime: "11h 15m", economy: "$540-1,000", business: "$4,200-7,300", firstClass: "$10,500-19,000" },
        ]
      },
    ]
  },
  {
    city: "Boston",
    country: "USA",
    countryCode: "us",
    airportName: "Boston Logan International Airport",
    code: "BOS",
    airlines: ["JetBlue", "Delta", "American", "United", "British Airways", "Lufthansa", "Aer Lingus", "Icelandair"],
    continentConnections: [
      {
        continent: "Europe",
        routes: [
          { from: "London (LHR)", flightTime: "6h 45m", economy: "$450-850", business: "$3,400-5,900", firstClass: "$8,500-15,000" },
          { from: "Dublin (DUB)", flightTime: "6h 00m", economy: "$400-780", business: "$3,000-5,200", firstClass: "$7,500-13,500" },
          { from: "Reykjavik (KEF)", flightTime: "5h 00m", economy: "$350-680", business: "$2,500-4,500", firstClass: "$6,000-11,000" },
        ]
      },
    ]
  },
  {
    city: "Philadelphia",
    country: "USA",
    countryCode: "us",
    airportName: "Philadelphia International Airport",
    code: "PHL",
    airlines: ["American", "Southwest", "Frontier", "Spirit", "British Airways", "Lufthansa", "Qatar Airways"],
    continentConnections: [
      {
        continent: "Europe",
        routes: [
          { from: "London (LHR)", flightTime: "7h 15m", economy: "$460-870", business: "$3,500-6,000", firstClass: "$8,700-15,500" },
          { from: "Paris (CDG)", flightTime: "7h 45m", economy: "$500-920", business: "$3,800-6,500", firstClass: "$9,200-16,500" },
        ]
      },
      {
        continent: "Middle East",
        routes: [
          { from: "Doha (DOH)", flightTime: "12h 30m", economy: "$700-1,250", business: "$4,500-7,800", firstClass: "$11,500-20,500" },
        ]
      },
    ]
  },
  {
    city: "Kansas City",
    country: "USA",
    countryCode: "us",
    airportName: "Kansas City International Airport",
    code: "MCI",
    airlines: ["Southwest", "United", "American", "Delta", "Frontier", "Alaska Airlines"],
    continentConnections: [
      {
        continent: "North America Hubs",
        routes: [
          { from: "Chicago (ORD)", flightTime: "1h 30m", economy: "$120-280", business: "$500-950", firstClass: "$1,200-2,200" },
          { from: "Dallas (DFW)", flightTime: "1h 45m", economy: "$140-300", business: "$550-1,000", firstClass: "$1,300-2,400" },
          { from: "Denver (DEN)", flightTime: "1h 40m", economy: "$130-290", business: "$520-980", firstClass: "$1,250-2,300" },
        ]
      },
    ]
  },
];

export default function InternationalFlights() {
  const [selectedAirport, setSelectedAirport] = useState<Airport | null>(null);

  if (selectedAirport) {
    return (
      <Layout>
        {/* Airport Detail View */}
        <div className="pt-6 px-6 pb-24">
          <button 
            onClick={() => setSelectedAirport(null)}
            className="flex items-center space-x-2 text-primary mb-6 hover:text-primary/80 transition-colors"
            data-testid="button-back"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-medium">Back to All Airports</span>
          </button>

          {/* Airport Header */}
          <div className="bg-gradient-to-br from-primary/20 to-accent/10 border border-primary/20 rounded-2xl p-6 mb-6">
            <div className="flex items-start space-x-4">
              <div className="w-16 h-16 rounded-xl overflow-hidden border-2 border-white/20 flex-shrink-0">
                <img 
                  src={`https://flagcdn.com/w160/${selectedAirport.countryCode}.png`}
                  alt={`${selectedAirport.country} flag`}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <h1 className="text-2xl font-display font-bold text-white mb-1" data-testid="text-airport-city">
                  {selectedAirport.city}
                </h1>
                <p className="text-primary font-bold text-lg mb-1" data-testid="text-airport-code">
                  {selectedAirport.code}
                </p>
                <p className="text-sm text-muted-foreground">{selectedAirport.airportName}</p>
              </div>
            </div>
          </div>

          {/* Airlines */}
          <div className="mb-6">
            <h2 className="text-lg font-display font-bold text-white mb-3">Major Airlines</h2>
            <div className="flex flex-wrap gap-2">
              {selectedAirport.airlines.map((airline, index) => {
                const url = getAirlineUrl(airline);
                if (url) {
                  return (
                    <a
                      key={index}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 bg-card border border-white/10 rounded-full text-xs font-medium text-gray-300 hover:bg-primary/20 hover:border-primary/30 hover:text-white transition-all flex items-center gap-1.5 group"
                      data-testid={`link-airline-${index}`}
                    >
                      {airline}
                      <ExternalLink className="w-3 h-3 opacity-50 group-hover:opacity-100" />
                    </a>
                  );
                }
                return (
                  <span 
                    key={index}
                    className="px-3 py-1.5 bg-card border border-white/10 rounded-full text-xs font-medium text-gray-300"
                  >
                    {airline}
                  </span>
                );
              })}
            </div>
          </div>

          {/* Routes by Continent */}
          <div className="space-y-6">
            {selectedAirport.continentConnections.map((continent, cIndex) => (
              <div key={cIndex}>
                <div className="flex items-center space-x-2 mb-4">
                  <Globe className="w-5 h-5 text-accent" />
                  <h2 className="text-lg font-display font-bold text-white">{continent.continent}</h2>
                </div>
                
                <div className="space-y-3">
                  {continent.routes.map((route, rIndex) => (
                    <div 
                      key={rIndex}
                      className="bg-card border border-white/5 rounded-xl p-4 hover:border-primary/30 transition-colors"
                      data-testid={`card-route-${cIndex}-${rIndex}`}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-2">
                          <Plane className="w-4 h-4 text-primary" />
                          <span className="font-bold text-white">{route.from}</span>
                        </div>
                        <div className="flex items-center space-x-1.5 text-muted-foreground">
                          <Clock className="w-3.5 h-3.5" />
                          <span className="text-xs">{route.flightTime}</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-2">
                        <div className="bg-background/50 rounded-lg p-3 text-center">
                          <span className="block text-[10px] uppercase tracking-wider text-muted-foreground mb-1">Economy</span>
                          <span className="block text-sm font-bold text-white">{route.economy}</span>
                        </div>
                        <div className="bg-primary/10 border border-primary/20 rounded-lg p-3 text-center">
                          <span className="block text-[10px] uppercase tracking-wider text-primary mb-1">Business</span>
                          <span className="block text-sm font-bold text-primary">{route.business}</span>
                        </div>
                        <div className="bg-accent/10 border border-accent/20 rounded-lg p-3 text-center">
                          <div className="flex items-center justify-center space-x-1 mb-1">
                            <Star className="w-2.5 h-2.5 text-accent" />
                            <span className="text-[10px] uppercase tracking-wider text-accent">First</span>
                          </div>
                          <span className="block text-sm font-bold text-accent">{route.firstClass}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Pricing Note */}
          <div className="mt-6 bg-white/5 border border-white/10 rounded-xl p-4">
            <p className="text-xs text-muted-foreground leading-relaxed">
              Prices shown are estimated round-trip fares and may vary based on booking date, season, and availability. All prices in USD. Book early for best rates during the World Cup period.
            </p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Header */}
      <div className="pt-8 px-6 pb-6">
        <Link href="/transportation" className="flex items-center space-x-2 text-primary mb-4 hover:text-primary/80 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm font-medium">Back to Transportation</span>
        </Link>

        <div className="flex items-center space-x-3 mb-2">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
            <Plane className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-display font-bold text-white" data-testid="text-page-title">
              International Flights
            </h1>
            <p className="text-sm text-muted-foreground">Direct connections to all 16 host cities</p>
          </div>
        </div>
      </div>

      {/* Airport List */}
      <div className="px-6 pb-24">
        <h2 className="text-lg font-display font-bold text-white mb-4">Select a Host City Airport</h2>
        
        <div className="space-y-3">
          {airports.map((airport, index) => (
            <button
              key={index}
              onClick={() => setSelectedAirport(airport)}
              className="w-full bg-card border border-white/5 rounded-xl p-4 hover:border-primary/30 transition-all group text-left"
              data-testid={`button-airport-${index}`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-lg overflow-hidden border border-white/10 flex-shrink-0">
                    <img 
                      src={`https://flagcdn.com/w80/${airport.countryCode}.png`}
                      alt={`${airport.country} flag`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-bold text-white group-hover:text-primary transition-colors">{airport.city}</h3>
                    <p className="text-sm text-primary font-mono">{airport.code}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-muted-foreground">{airport.continentConnections.length} regions</span>
                  <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </Layout>
  );
}