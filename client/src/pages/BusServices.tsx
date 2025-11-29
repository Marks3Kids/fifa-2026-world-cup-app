import { Layout } from "@/components/Layout";
import { Bus, Clock, ArrowLeft, MapPin, ChevronRight, ExternalLink } from "lucide-react";
import { Link } from "wouter";
import { useState } from "react";

interface BusRoute {
  to: string;
  duration: string;
  frequency: string;
  price: string;
}

interface BusHub {
  city: string;
  country: string;
  countryCode: string;
  station: string;
  operators: { name: string; url: string }[];
  routes: BusRoute[];
  matchDayServices: string[];
}

const busHubs: BusHub[] = [
  {
    city: "New York / New Jersey",
    country: "USA",
    countryCode: "us",
    station: "Port Authority Bus Terminal / Newark Penn Station",
    operators: [
      { name: "Greyhound", url: "https://www.greyhound.com" },
      { name: "FlixBus", url: "https://www.flixbus.com" },
      { name: "Megabus", url: "https://www.megabus.com" },
      { name: "Peter Pan", url: "https://peterpanbus.com" },
      { name: "NJ Transit Bus", url: "https://www.njtransit.com" },
    ],
    routes: [
      { to: "Boston", duration: "4h 15m", frequency: "Hourly", price: "$15-45" },
      { to: "Philadelphia", duration: "2h 00m", frequency: "Every 30 min", price: "$10-30" },
      { to: "Washington DC", duration: "4h 30m", frequency: "Hourly", price: "$20-50" },
      { to: "Baltimore", duration: "3h 30m", frequency: "Every 2 hours", price: "$15-40" },
      { to: "Atlantic City", duration: "2h 30m", frequency: "Hourly", price: "$10-25" },
    ],
    matchDayServices: [
      "NJ Transit express buses to MetLife Stadium",
      "Private charter shuttles from Manhattan",
      "Park & Ride services from various NJ locations",
    ]
  },
  {
    city: "Los Angeles",
    country: "USA",
    countryCode: "us",
    station: "Union Station / Downtown LA",
    operators: [
      { name: "Greyhound", url: "https://www.greyhound.com" },
      { name: "FlixBus", url: "https://www.flixbus.com" },
      { name: "Megabus", url: "https://www.megabus.com" },
      { name: "LA Metro Bus", url: "https://www.metro.net" },
    ],
    routes: [
      { to: "San Diego", duration: "2h 30m", frequency: "Hourly", price: "$12-35" },
      { to: "Las Vegas", duration: "5h 00m", frequency: "Every 2 hours", price: "$20-55" },
      { to: "San Francisco", duration: "7h 00m", frequency: "4x daily", price: "$25-65" },
      { to: "Phoenix", duration: "6h 00m", frequency: "3x daily", price: "$25-55" },
    ],
    matchDayServices: [
      "Metro express buses to SoFi Stadium",
      "LAX FlyAway shuttle connections",
      "Private charter services from major hotels",
    ]
  },
  {
    city: "Miami",
    country: "USA",
    countryCode: "us",
    station: "Miami Central Station",
    operators: [
      { name: "Greyhound", url: "https://www.greyhound.com" },
      { name: "FlixBus", url: "https://www.flixbus.com" },
      { name: "RedCoach", url: "https://www.redcoachusa.com" },
      { name: "Miami-Dade Transit", url: "https://www.miamidade.gov/transit" },
    ],
    routes: [
      { to: "Orlando", duration: "4h 00m", frequency: "Hourly", price: "$15-40" },
      { to: "Tampa", duration: "5h 00m", frequency: "Every 2 hours", price: "$20-50" },
      { to: "Fort Lauderdale", duration: "0h 45m", frequency: "Every 20 min", price: "$5-15" },
      { to: "West Palm Beach", duration: "1h 30m", frequency: "Hourly", price: "$10-25" },
    ],
    matchDayServices: [
      "Express shuttles to Hard Rock Stadium",
      "Park & Ride from Aventura and FIU",
      "Beach resort shuttle packages",
    ]
  },
  {
    city: "Dallas",
    country: "USA",
    countryCode: "us",
    station: "Dallas Greyhound Station",
    operators: [
      { name: "Greyhound", url: "https://www.greyhound.com" },
      { name: "FlixBus", url: "https://www.flixbus.com" },
      { name: "Megabus", url: "https://www.megabus.com" },
      { name: "DART Bus", url: "https://www.dart.org" },
    ],
    routes: [
      { to: "Houston", duration: "4h 00m", frequency: "Hourly", price: "$15-40" },
      { to: "Austin", duration: "3h 30m", frequency: "Every 2 hours", price: "$15-35" },
      { to: "San Antonio", duration: "5h 00m", frequency: "3x daily", price: "$20-45" },
      { to: "Oklahoma City", duration: "3h 30m", frequency: "3x daily", price: "$20-40" },
    ],
    matchDayServices: [
      "DART express routes to AT&T Stadium",
      "Arlington shuttle from Downtown Dallas",
      "TRE connection with shuttle service",
    ]
  },
  {
    city: "Atlanta",
    country: "USA",
    countryCode: "us",
    station: "Atlanta Greyhound Station",
    operators: [
      { name: "Greyhound", url: "https://www.greyhound.com" },
      { name: "FlixBus", url: "https://www.flixbus.com" },
      { name: "Megabus", url: "https://www.megabus.com" },
      { name: "MARTA Bus", url: "https://www.itsmarta.com" },
    ],
    routes: [
      { to: "Charlotte", duration: "4h 00m", frequency: "Every 2 hours", price: "$20-45" },
      { to: "Nashville", duration: "4h 00m", frequency: "3x daily", price: "$20-45" },
      { to: "Birmingham", duration: "2h 30m", frequency: "4x daily", price: "$15-35" },
      { to: "Jacksonville", duration: "5h 30m", frequency: "3x daily", price: "$25-50" },
    ],
    matchDayServices: [
      "MARTA rail + shuttle to Mercedes-Benz Stadium",
      "Georgia Dome/GWCC station nearby",
      "Hotel shuttle packages from Buckhead",
    ]
  },
  {
    city: "Houston",
    country: "USA",
    countryCode: "us",
    station: "Houston Greyhound Station",
    operators: [
      { name: "Greyhound", url: "https://www.greyhound.com" },
      { name: "FlixBus", url: "https://www.flixbus.com" },
      { name: "Megabus", url: "https://www.megabus.com" },
      { name: "METRO Bus", url: "https://www.ridemetro.org" },
    ],
    routes: [
      { to: "Dallas", duration: "4h 00m", frequency: "Hourly", price: "$15-40" },
      { to: "San Antonio", duration: "3h 00m", frequency: "Every 2 hours", price: "$15-35" },
      { to: "Austin", duration: "2h 45m", frequency: "Every 2 hours", price: "$15-35" },
      { to: "New Orleans", duration: "5h 30m", frequency: "3x daily", price: "$25-55" },
    ],
    matchDayServices: [
      "METRORail to NRG Stadium",
      "Park & Ride express shuttles",
      "Galleria area hotel shuttles",
    ]
  },
  {
    city: "Seattle",
    country: "USA",
    countryCode: "us",
    station: "Seattle Greyhound Station",
    operators: [
      { name: "Greyhound", url: "https://www.greyhound.com" },
      { name: "FlixBus", url: "https://www.flixbus.com" },
      { name: "BoltBus", url: "https://www.boltbus.com" },
      { name: "King County Metro", url: "https://kingcounty.gov/metro" },
    ],
    routes: [
      { to: "Portland", duration: "3h 30m", frequency: "Hourly", price: "$15-35" },
      { to: "Vancouver BC", duration: "4h 00m", frequency: "4x daily", price: "$25-50" },
      { to: "Spokane", duration: "5h 00m", frequency: "2x daily", price: "$25-50" },
    ],
    matchDayServices: [
      "Sound Transit express to Lumen Field",
      "Stadium station light rail",
      "Eastside shuttle from Bellevue",
    ]
  },
  {
    city: "San Francisco Bay Area",
    country: "USA",
    countryCode: "us",
    station: "San Francisco Transbay Terminal",
    operators: [
      { name: "Greyhound", url: "https://www.greyhound.com" },
      { name: "FlixBus", url: "https://www.flixbus.com" },
      { name: "Megabus", url: "https://www.megabus.com" },
      { name: "AC Transit", url: "https://www.actransit.org" },
    ],
    routes: [
      { to: "Los Angeles", duration: "7h 00m", frequency: "Hourly", price: "$25-60" },
      { to: "Sacramento", duration: "2h 00m", frequency: "Hourly", price: "$10-30" },
      { to: "San Jose", duration: "1h 15m", frequency: "Every 30 min", price: "$8-20" },
      { to: "Reno", duration: "4h 30m", frequency: "3x daily", price: "$20-45" },
    ],
    matchDayServices: [
      "VTA express to Levi's Stadium",
      "BART connection from SF to Milpitas",
      "Caltrain + shuttle service",
    ]
  },
  {
    city: "Toronto",
    country: "Canada",
    countryCode: "ca",
    station: "Toronto Coach Terminal",
    operators: [
      { name: "Greyhound Canada", url: "https://www.greyhound.ca" },
      { name: "FlixBus", url: "https://www.flixbus.ca" },
      { name: "Megabus", url: "https://ca.megabus.com" },
      { name: "GO Bus", url: "https://www.gotransit.com" },
    ],
    routes: [
      { to: "Montreal", duration: "6h 00m", frequency: "Hourly", price: "CAD $35-75" },
      { to: "Ottawa", duration: "5h 00m", frequency: "Every 2 hours", price: "CAD $30-65" },
      { to: "Niagara Falls", duration: "2h 00m", frequency: "Every 2 hours", price: "CAD $15-35" },
      { to: "Buffalo", duration: "2h 30m", frequency: "3x daily", price: "CAD $25-50" },
    ],
    matchDayServices: [
      "TTC streetcar to BMO Field",
      "GO Transit from Union Station",
      "Express shuttles from Pearson Airport",
    ]
  },
  {
    city: "Vancouver",
    country: "Canada",
    countryCode: "ca",
    station: "Pacific Central Station",
    operators: [
      { name: "Greyhound Canada", url: "https://www.greyhound.ca" },
      { name: "FlixBus", url: "https://www.flixbus.ca" },
      { name: "BC Transit", url: "https://www.bctransit.com" },
      { name: "TransLink", url: "https://www.translink.ca" },
    ],
    routes: [
      { to: "Seattle", duration: "4h 00m", frequency: "4x daily", price: "CAD $30-60" },
      { to: "Whistler", duration: "2h 30m", frequency: "5x daily", price: "CAD $25-50" },
      { to: "Victoria (via ferry)", duration: "4h 00m", frequency: "Hourly", price: "CAD $40-70" },
    ],
    matchDayServices: [
      "SkyTrain to BC Place Stadium Station",
      "Event shuttles from Park & Rides",
      "YVR airport express connection",
    ]
  },
  {
    city: "Mexico City",
    country: "Mexico",
    countryCode: "mx",
    station: "TAPO / Terminal Norte / Sur / Poniente",
    operators: [
      { name: "ADO", url: "https://www.ado.com.mx" },
      { name: "ETN", url: "https://www.etn.com.mx" },
      { name: "Primera Plus", url: "https://www.primeraplus.com.mx" },
      { name: "Estrella Roja", url: "https://www.estrellaroja.com.mx" },
    ],
    routes: [
      { to: "Guadalajara", duration: "7h 00m", frequency: "Hourly", price: "MXN $800-1,400" },
      { to: "Monterrey", duration: "12h 00m", frequency: "Every 2 hours", price: "MXN $1,200-2,000" },
      { to: "Puebla", duration: "2h 00m", frequency: "Every 15 min", price: "MXN $200-400" },
      { to: "Querétaro", duration: "3h 00m", frequency: "Every 30 min", price: "MXN $350-600" },
    ],
    matchDayServices: [
      "Metrobús to Estadio Azteca area",
      "Special event buses from terminals",
      "Hotel shuttle services",
    ]
  },
  {
    city: "Guadalajara",
    country: "Mexico",
    countryCode: "mx",
    station: "Central Vieja / Nueva Central",
    operators: [
      { name: "ETN", url: "https://www.etn.com.mx" },
      { name: "Primera Plus", url: "https://www.primeraplus.com.mx" },
      { name: "Omnibus de Mexico", url: "https://www.odm.com.mx" },
    ],
    routes: [
      { to: "Mexico City", duration: "7h 00m", frequency: "Hourly", price: "MXN $800-1,400" },
      { to: "Monterrey", duration: "10h 00m", frequency: "3x daily", price: "MXN $1,000-1,800" },
      { to: "Puerto Vallarta", duration: "5h 00m", frequency: "Hourly", price: "MXN $500-900" },
    ],
    matchDayServices: [
      "SITEUR buses to Estadio Akron",
      "Macrobús rapid transit connection",
      "Shuttle from Zona Rosa hotels",
    ]
  },
  {
    city: "Monterrey",
    country: "Mexico",
    countryCode: "mx",
    station: "Central de Autobuses",
    operators: [
      { name: "ETN", url: "https://www.etn.com.mx" },
      { name: "Omnibus de Mexico", url: "https://www.odm.com.mx" },
      { name: "Senda", url: "https://www.senda.com.mx" },
    ],
    routes: [
      { to: "Mexico City", duration: "12h 00m", frequency: "Every 2 hours", price: "MXN $1,200-2,000" },
      { to: "Guadalajara", duration: "10h 00m", frequency: "3x daily", price: "MXN $1,000-1,800" },
      { to: "Saltillo", duration: "1h 30m", frequency: "Every 30 min", price: "MXN $150-300" },
    ],
    matchDayServices: [
      "Metrorrey connection to stadium",
      "Ecovía BRT service",
      "Hotel district shuttles",
    ]
  },
  {
    city: "Boston",
    country: "USA",
    countryCode: "us",
    station: "South Station Bus Terminal",
    operators: [
      { name: "Greyhound", url: "https://www.greyhound.com" },
      { name: "Peter Pan", url: "https://peterpanbus.com" },
      { name: "FlixBus", url: "https://www.flixbus.com" },
      { name: "MBTA Bus", url: "https://www.mbta.com" },
    ],
    routes: [
      { to: "New York", duration: "4h 15m", frequency: "Every 30 min", price: "$15-45" },
      { to: "Providence", duration: "1h 00m", frequency: "Hourly", price: "$10-25" },
      { to: "Hartford", duration: "2h 00m", frequency: "Hourly", price: "$15-30" },
    ],
    matchDayServices: [
      "MBTA buses to Gillette Stadium shuttle",
      "Foxborough express from South Station",
      "Providence Line bus bridge",
    ]
  },
  {
    city: "Philadelphia",
    country: "USA",
    countryCode: "us",
    station: "Philadelphia Greyhound Terminal",
    operators: [
      { name: "Greyhound", url: "https://www.greyhound.com" },
      { name: "FlixBus", url: "https://www.flixbus.com" },
      { name: "Megabus", url: "https://www.megabus.com" },
      { name: "SEPTA Bus", url: "https://www.septa.org" },
    ],
    routes: [
      { to: "New York", duration: "2h 00m", frequency: "Every 30 min", price: "$10-30" },
      { to: "Washington DC", duration: "3h 00m", frequency: "Hourly", price: "$15-35" },
      { to: "Baltimore", duration: "2h 00m", frequency: "Hourly", price: "$12-30" },
    ],
    matchDayServices: [
      "SEPTA stadium express buses",
      "Sports Complex shuttle from Center City",
      "Broad Street Subway connection",
    ]
  },
  {
    city: "Kansas City",
    country: "USA",
    countryCode: "us",
    station: "Kansas City Bus Station",
    operators: [
      { name: "Greyhound", url: "https://www.greyhound.com" },
      { name: "FlixBus", url: "https://www.flixbus.com" },
      { name: "Burlington Trailways", url: "https://www.burlingtontrailways.com" },
    ],
    routes: [
      { to: "St. Louis", duration: "4h 00m", frequency: "3x daily", price: "$20-45" },
      { to: "Omaha", duration: "3h 00m", frequency: "2x daily", price: "$20-40" },
      { to: "Denver", duration: "9h 00m", frequency: "1x daily", price: "$40-80" },
    ],
    matchDayServices: [
      "Express shuttles to Arrowhead Stadium",
      "Park & Ride from Power & Light District",
      "Independence Avenue corridor buses",
    ]
  },
];

export default function BusServices() {
  const [selectedHub, setSelectedHub] = useState<BusHub | null>(null);

  if (selectedHub) {
    return (
      <Layout>
        <div className="pt-6 px-6 pb-24">
          <button 
            onClick={() => setSelectedHub(null)}
            className="flex items-center space-x-2 text-primary mb-6 hover:text-primary/80 transition-colors"
            data-testid="button-back"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-medium">Back to All Cities</span>
          </button>

          <div className="bg-gradient-to-br from-orange-500/20 to-primary/10 border border-orange-500/20 rounded-2xl p-6 mb-6">
            <div className="flex items-start space-x-4">
              <div className="w-16 h-16 rounded-xl overflow-hidden border-2 border-white/20 flex-shrink-0">
                <img 
                  src={`https://flagcdn.com/w160/${selectedHub.countryCode}.png`}
                  alt={`${selectedHub.country} flag`}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <h1 className="text-2xl font-display font-bold text-white mb-1" data-testid="text-city-name">
                  {selectedHub.city}
                </h1>
                <p className="text-orange-400 font-medium text-sm mb-1">
                  <Bus className="w-4 h-4 inline mr-1" />
                  {selectedHub.station}
                </p>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h2 className="text-lg font-display font-bold text-white mb-3">Bus Operators</h2>
            <div className="flex flex-wrap gap-2">
              {selectedHub.operators.map((operator, index) => (
                <a
                  key={index}
                  href={operator.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 bg-card border border-white/10 rounded-full text-xs font-medium text-gray-300 hover:bg-orange-500/20 hover:border-orange-500/30 hover:text-white transition-all flex items-center gap-1.5 group"
                  data-testid={`link-bus-operator-${operator.name.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  {operator.name}
                  <ExternalLink className="w-3 h-3 opacity-50 group-hover:opacity-100" />
                </a>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <div className="flex items-center space-x-2 mb-4">
              <MapPin className="w-5 h-5 text-accent" />
              <h2 className="text-lg font-display font-bold text-white">Intercity Bus Routes</h2>
            </div>
            
            <div className="space-y-3">
              {selectedHub.routes.map((route, index) => (
                <div 
                  key={index}
                  className="bg-card border border-white/5 rounded-xl p-4 hover:border-orange-500/30 transition-colors"
                  data-testid={`card-bus-route-${route.to.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <Bus className="w-4 h-4 text-orange-400" />
                      <span className="font-bold text-white">{route.to}</span>
                    </div>
                    <span className="text-lg font-bold text-orange-400">{route.price}</span>
                  </div>
                  <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{route.duration}</span>
                    </div>
                    <span className="text-orange-400/70">{route.frequency}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-lg font-display font-bold text-white mb-3">Match Day Services</h2>
            <div className="bg-card border border-white/5 rounded-xl p-4">
              <ul className="space-y-2">
                {selectedHub.matchDayServices.map((service, index) => (
                  <li key={index} className="text-sm text-gray-300 flex items-start">
                    <span className="text-orange-400 mr-2">•</span>
                    {service}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-6 bg-white/5 border border-white/10 rounded-xl p-4">
            <p className="text-xs text-muted-foreground leading-relaxed">
              Prices shown are estimated fares and may vary. Book in advance for best rates during the World Cup period. Special event services may require separate tickets.
            </p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="pt-8 px-6 pb-6">
        <Link href="/transportation" className="flex items-center space-x-2 text-primary mb-4 hover:text-primary/80 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm font-medium">Back to Transportation</span>
        </Link>

        <div className="flex items-center space-x-3 mb-2">
          <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center">
            <Bus className="w-6 h-6 text-orange-400" />
          </div>
          <div>
            <h1 className="text-3xl font-display font-bold text-white" data-testid="text-page-title">
              Bus & Coach Services
            </h1>
            <p className="text-sm text-muted-foreground">Affordable intercity travel options</p>
          </div>
        </div>
      </div>

      <div className="px-6 pb-24">
        <h2 className="text-lg font-display font-bold text-white mb-4">Select a City</h2>
        
        <div className="space-y-3">
          {busHubs.map((hub, index) => (
            <button
              key={index}
              onClick={() => setSelectedHub(hub)}
              className="w-full bg-card border border-white/5 rounded-xl p-4 hover:border-orange-500/30 transition-all group text-left"
              data-testid={`button-bus-city-${hub.countryCode}-${index}`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-lg overflow-hidden border border-white/10 flex-shrink-0">
                    <img 
                      src={`https://flagcdn.com/w80/${hub.countryCode}.png`}
                      alt={`${hub.country} flag`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-bold text-white group-hover:text-orange-400 transition-colors">{hub.city}</h3>
                    <p className="text-sm text-muted-foreground truncate max-w-[180px]">{hub.station}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-muted-foreground">{hub.routes.length} routes</span>
                  <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-orange-400 transition-colors" />
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </Layout>
  );
}