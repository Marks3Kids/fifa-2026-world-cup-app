import { Layout } from "@/components/Layout";
import { Car, ArrowLeft, MapPin, DollarSign, ChevronRight, ExternalLink, Smartphone } from "lucide-react";
import { Link } from "wouter";
import { useState } from "react";

interface RentalCompany {
  name: string;
  url: string;
  description: string;
}

interface RideshareApp {
  name: string;
  url: string;
  availability: string;
}

interface CityInfo {
  city: string;
  country: string;
  countryCode: string;
  rentalCompanies: RentalCompany[];
  rideshareApps: RideshareApp[];
  dailyRates: {
    economy: string;
    midsize: string;
    suv: string;
    luxury: string;
  };
  parkingInfo: string[];
  tips: string[];
}

const cities: CityInfo[] = [
  {
    city: "New York / New Jersey",
    country: "USA",
    countryCode: "us",
    rentalCompanies: [
      { name: "Hertz", url: "https://www.hertz.com", description: "Airport & city locations" },
      { name: "Enterprise", url: "https://www.enterprise.com", description: "Neighborhood pickup available" },
      { name: "Avis", url: "https://www.avis.com", description: "JFK, EWR, LGA locations" },
      { name: "Budget", url: "https://www.budget.com", description: "Affordable options" },
      { name: "National", url: "https://www.nationalcar.com", description: "Emerald Club benefits" },
      { name: "Sixt", url: "https://www.sixt.com", description: "Premium vehicle selection" },
    ],
    rideshareApps: [
      { name: "Uber", url: "https://www.uber.com", availability: "24/7 in all areas" },
      { name: "Lyft", url: "https://www.lyft.com", availability: "24/7 in all areas" },
      { name: "Via", url: "https://ridewithvia.com", availability: "Shared rides, lower cost" },
    ],
    dailyRates: { economy: "$45-75", midsize: "$55-95", suv: "$75-130", luxury: "$120-250" },
    parkingInfo: [
      "MetLife Stadium: $40-60 per event",
      "Limited street parking in Manhattan",
      "Use Park & Ride lots in NJ",
    ],
    tips: [
      "Consider public transit - driving in NYC is challenging",
      "Book parking in advance for match days",
      "Tolls add up quickly in the area",
    ]
  },
  {
    city: "Los Angeles",
    country: "USA",
    countryCode: "us",
    rentalCompanies: [
      { name: "Hertz", url: "https://www.hertz.com", description: "LAX and citywide locations" },
      { name: "Enterprise", url: "https://www.enterprise.com", description: "Free pickup service" },
      { name: "Avis", url: "https://www.avis.com", description: "Preferred at LAX" },
      { name: "Budget", url: "https://www.budget.com", description: "Good value options" },
      { name: "Turo", url: "https://www.turo.com", description: "Peer-to-peer car sharing" },
    ],
    rideshareApps: [
      { name: "Uber", url: "https://www.uber.com", availability: "24/7 everywhere" },
      { name: "Lyft", url: "https://www.lyft.com", availability: "24/7 everywhere" },
    ],
    dailyRates: { economy: "$40-65", midsize: "$50-85", suv: "$70-120", luxury: "$110-220" },
    parkingInfo: [
      "SoFi Stadium: $50-80 per event",
      "Pre-paid parking recommended",
      "Uber/Lyft drop-off zones available",
    ],
    tips: [
      "A car is essential for getting around LA",
      "Book well in advance during World Cup",
      "Allow extra time for traffic",
    ]
  },
  {
    city: "Miami",
    country: "USA",
    countryCode: "us",
    rentalCompanies: [
      { name: "Hertz", url: "https://www.hertz.com", description: "MIA airport location" },
      { name: "Enterprise", url: "https://www.enterprise.com", description: "South Beach locations" },
      { name: "Avis", url: "https://www.avis.com", description: "Cruise port pickup" },
      { name: "Dollar", url: "https://www.dollar.com", description: "Budget-friendly" },
      { name: "Alamo", url: "https://www.alamo.com", description: "Great for leisure" },
    ],
    rideshareApps: [
      { name: "Uber", url: "https://www.uber.com", availability: "24/7 all areas" },
      { name: "Lyft", url: "https://www.lyft.com", availability: "24/7 all areas" },
      { name: "Freebee", url: "https://ridefreebee.com", availability: "Free in select zones" },
    ],
    dailyRates: { economy: "$35-60", midsize: "$45-80", suv: "$65-110", luxury: "$100-200" },
    parkingInfo: [
      "Hard Rock Stadium: $40-60 per event",
      "Beach parking is limited and expensive",
      "Many hotels offer valet parking",
    ],
    tips: [
      "Convertibles popular but book early",
      "Consider staying near transit lines",
      "I-95 traffic can be intense",
    ]
  },
  {
    city: "Dallas",
    country: "USA",
    countryCode: "us",
    rentalCompanies: [
      { name: "Hertz", url: "https://www.hertz.com", description: "DFW Airport" },
      { name: "Enterprise", url: "https://www.enterprise.com", description: "Multiple locations" },
      { name: "Avis", url: "https://www.avis.com", description: "Business preferred" },
      { name: "National", url: "https://www.nationalcar.com", description: "Quick pickup" },
    ],
    rideshareApps: [
      { name: "Uber", url: "https://www.uber.com", availability: "24/7 DFW metro" },
      { name: "Lyft", url: "https://www.lyft.com", availability: "24/7 DFW metro" },
    ],
    dailyRates: { economy: "$35-55", midsize: "$45-75", suv: "$60-100", luxury: "$90-180" },
    parkingInfo: [
      "AT&T Stadium: $50-75 per event",
      "Private lots in Arlington available",
      "Free parking at DART stations",
    ],
    tips: [
      "Car is highly recommended in DFW",
      "Stadium is in Arlington - plan accordingly",
      "Download parking apps in advance",
    ]
  },
  {
    city: "Atlanta",
    country: "USA",
    countryCode: "us",
    rentalCompanies: [
      { name: "Hertz", url: "https://www.hertz.com", description: "ATL Rental Car Center" },
      { name: "Enterprise", url: "https://www.enterprise.com", description: "City locations" },
      { name: "Avis", url: "https://www.avis.com", description: "Buckhead area" },
      { name: "Budget", url: "https://www.budget.com", description: "Value options" },
    ],
    rideshareApps: [
      { name: "Uber", url: "https://www.uber.com", availability: "24/7 metro area" },
      { name: "Lyft", url: "https://www.lyft.com", availability: "24/7 metro area" },
    ],
    dailyRates: { economy: "$35-55", midsize: "$45-70", suv: "$60-100", luxury: "$85-170" },
    parkingInfo: [
      "Mercedes-Benz Stadium: $40-60",
      "MARTA parking: $5-8/day",
      "Downtown parking garages available",
    ],
    tips: [
      "MARTA rail is excellent for stadium access",
      "Avoid driving during rush hour",
      "Book early during major events",
    ]
  },
  {
    city: "Houston",
    country: "USA",
    countryCode: "us",
    rentalCompanies: [
      { name: "Hertz", url: "https://www.hertz.com", description: "IAH & HOU airports" },
      { name: "Enterprise", url: "https://www.enterprise.com", description: "Many locations" },
      { name: "Avis", url: "https://www.avis.com", description: "Galleria area" },
      { name: "Budget", url: "https://www.budget.com", description: "Affordable rates" },
    ],
    rideshareApps: [
      { name: "Uber", url: "https://www.uber.com", availability: "24/7 Greater Houston" },
      { name: "Lyft", url: "https://www.lyft.com", availability: "24/7 Greater Houston" },
    ],
    dailyRates: { economy: "$35-55", midsize: "$45-70", suv: "$55-95", luxury: "$80-160" },
    parkingInfo: [
      "NRG Stadium: $30-50 per event",
      "MetroRail parking free at Park & Rides",
      "Pre-paid parking saves time",
    ],
    tips: [
      "Car essential in sprawling Houston",
      "MetroRail serves NRG Stadium",
      "Watch for flash flooding",
    ]
  },
  {
    city: "Seattle",
    country: "USA",
    countryCode: "us",
    rentalCompanies: [
      { name: "Hertz", url: "https://www.hertz.com", description: "SEA-TAC Airport" },
      { name: "Enterprise", url: "https://www.enterprise.com", description: "Downtown & suburbs" },
      { name: "Avis", url: "https://www.avis.com", description: "Multiple locations" },
      { name: "Turo", url: "https://www.turo.com", description: "Local car sharing" },
    ],
    rideshareApps: [
      { name: "Uber", url: "https://www.uber.com", availability: "24/7 Puget Sound" },
      { name: "Lyft", url: "https://www.lyft.com", availability: "24/7 Puget Sound" },
    ],
    dailyRates: { economy: "$40-65", midsize: "$50-85", suv: "$70-115", luxury: "$100-200" },
    parkingInfo: [
      "Lumen Field: $40-60 per event",
      "Light Rail from airport",
      "Limited downtown parking",
    ],
    tips: [
      "Light Rail excellent for stadium",
      "Consider not renting in downtown",
      "Rain is common - drive carefully",
    ]
  },
  {
    city: "San Francisco Bay Area",
    country: "USA",
    countryCode: "us",
    rentalCompanies: [
      { name: "Hertz", url: "https://www.hertz.com", description: "SFO, OAK, SJC" },
      { name: "Enterprise", url: "https://www.enterprise.com", description: "Bay Area wide" },
      { name: "Avis", url: "https://www.avis.com", description: "Airport locations" },
      { name: "Getaround", url: "https://www.getaround.com", description: "Carshare by the hour" },
    ],
    rideshareApps: [
      { name: "Uber", url: "https://www.uber.com", availability: "24/7 Bay Area" },
      { name: "Lyft", url: "https://www.lyft.com", availability: "24/7 Bay Area" },
    ],
    dailyRates: { economy: "$45-75", midsize: "$55-95", suv: "$75-130", luxury: "$120-250" },
    parkingInfo: [
      "Levi's Stadium: $40-60 per event",
      "VTA Light Rail to stadium",
      "Caltrain + shuttle option",
    ],
    tips: [
      "BART + VTA for stadium access",
      "SF parking is expensive",
      "Consider staying near transit",
    ]
  },
  {
    city: "Toronto",
    country: "Canada",
    countryCode: "ca",
    rentalCompanies: [
      { name: "Enterprise", url: "https://www.enterprise.ca", description: "YYZ & downtown" },
      { name: "Hertz", url: "https://www.hertz.ca", description: "Airport location" },
      { name: "Avis", url: "https://www.avis.ca", description: "Union Station" },
      { name: "Budget", url: "https://www.budget.ca", description: "Value option" },
    ],
    rideshareApps: [
      { name: "Uber", url: "https://www.uber.com/ca", availability: "24/7 GTA" },
      { name: "Lyft", url: "https://www.lyft.com/rider/cities/toronto-on", availability: "24/7 GTA" },
    ],
    dailyRates: { economy: "CAD $50-80", midsize: "CAD $60-100", suv: "CAD $80-140", luxury: "CAD $130-260" },
    parkingInfo: [
      "BMO Field: CAD $25-40 per event",
      "TTC parking at subway stations",
      "Green P parking citywide",
    ],
    tips: [
      "TTC streetcar to BMO Field",
      "407 ETR is a toll highway",
      "Downtown parking is expensive",
    ]
  },
  {
    city: "Vancouver",
    country: "Canada",
    countryCode: "ca",
    rentalCompanies: [
      { name: "Enterprise", url: "https://www.enterprise.ca", description: "YVR & downtown" },
      { name: "Hertz", url: "https://www.hertz.ca", description: "Airport pickup" },
      { name: "Avis", url: "https://www.avis.ca", description: "Convention Centre" },
      { name: "Evo Car Share", url: "https://www.evo.ca", description: "Local carshare" },
    ],
    rideshareApps: [
      { name: "Uber", url: "https://www.uber.com/ca", availability: "24/7 Metro Vancouver" },
      { name: "Lyft", url: "https://www.lyft.com", availability: "24/7 Metro Vancouver" },
    ],
    dailyRates: { economy: "CAD $50-80", midsize: "CAD $60-95", suv: "CAD $80-130", luxury: "CAD $120-240" },
    parkingInfo: [
      "BC Place: CAD $20-35 per event",
      "SkyTrain to Stadium station",
      "EasyPark lots downtown",
    ],
    tips: [
      "SkyTrain perfect for BC Place",
      "Car not needed in downtown core",
      "Beautiful scenic drives nearby",
    ]
  },
  {
    city: "Mexico City",
    country: "Mexico",
    countryCode: "mx",
    rentalCompanies: [
      { name: "Hertz", url: "https://www.hertz.com.mx", description: "MEX Airport" },
      { name: "Enterprise", url: "https://www.enterprise.com.mx", description: "Multiple locations" },
      { name: "Avis", url: "https://www.avis.com.mx", description: "Major hotels" },
      { name: "Europcar", url: "https://www.europcar.com.mx", description: "Wide selection" },
    ],
    rideshareApps: [
      { name: "Uber", url: "https://www.uber.com/mx", availability: "24/7 CDMX" },
      { name: "DiDi", url: "https://www.didiglobal.com/mx", availability: "24/7 CDMX" },
      { name: "Cabify", url: "https://cabify.com/mx", availability: "Major areas" },
    ],
    dailyRates: { economy: "MXN $600-1,000", midsize: "MXN $800-1,400", suv: "MXN $1,200-2,000", luxury: "MXN $2,000-4,000" },
    parkingInfo: [
      "Estadio Azteca: MXN $100-200",
      "Metro is recommended",
      "Street parking limited",
    ],
    tips: [
      "Metro excellent for Estadio Azteca",
      "Uber/DiDi very affordable",
      "Hoy No Circula driving restrictions apply",
    ]
  },
  {
    city: "Guadalajara",
    country: "Mexico",
    countryCode: "mx",
    rentalCompanies: [
      { name: "Hertz", url: "https://www.hertz.com.mx", description: "GDL Airport" },
      { name: "Europcar", url: "https://www.europcar.com.mx", description: "Downtown" },
      { name: "National", url: "https://www.nationalcar.com.mx", description: "Airport" },
    ],
    rideshareApps: [
      { name: "Uber", url: "https://www.uber.com/mx", availability: "24/7 metro area" },
      { name: "DiDi", url: "https://www.didiglobal.com/mx", availability: "24/7 metro area" },
    ],
    dailyRates: { economy: "MXN $500-850", midsize: "MXN $700-1,200", suv: "MXN $1,000-1,700", luxury: "MXN $1,700-3,500" },
    parkingInfo: [
      "Estadio Akron: MXN $80-150",
      "Macrobús connections available",
      "Hotel parking typically free",
    ],
    tips: [
      "Uber is widely used and reliable",
      "Traffic can be heavy in Centro",
      "Macrobús for longer distances",
    ]
  },
  {
    city: "Monterrey",
    country: "Mexico",
    countryCode: "mx",
    rentalCompanies: [
      { name: "Hertz", url: "https://www.hertz.com.mx", description: "MTY Airport" },
      { name: "Avis", url: "https://www.avis.com.mx", description: "Downtown & airport" },
      { name: "Europcar", url: "https://www.europcar.com.mx", description: "San Pedro" },
    ],
    rideshareApps: [
      { name: "Uber", url: "https://www.uber.com/mx", availability: "24/7 metro area" },
      { name: "DiDi", url: "https://www.didiglobal.com/mx", availability: "24/7 metro area" },
    ],
    dailyRates: { economy: "MXN $500-800", midsize: "MXN $650-1,100", suv: "MXN $950-1,600", luxury: "MXN $1,600-3,200" },
    parkingInfo: [
      "Estadio BBVA: MXN $80-150",
      "Metrorrey stations have parking",
      "Shopping centers offer parking",
    ],
    tips: [
      "Car helpful for mountain excursions",
      "Rideshare very affordable",
      "Metrorrey serves stadium area",
    ]
  },
  {
    city: "Boston",
    country: "USA",
    countryCode: "us",
    rentalCompanies: [
      { name: "Hertz", url: "https://www.hertz.com", description: "BOS Airport" },
      { name: "Enterprise", url: "https://www.enterprise.com", description: "Back Bay & suburbs" },
      { name: "Avis", url: "https://www.avis.com", description: "Downtown locations" },
      { name: "Zipcar", url: "https://www.zipcar.com", description: "Hourly rentals" },
    ],
    rideshareApps: [
      { name: "Uber", url: "https://www.uber.com", availability: "24/7 Greater Boston" },
      { name: "Lyft", url: "https://www.lyft.com", availability: "24/7 Greater Boston" },
    ],
    dailyRates: { economy: "$45-70", midsize: "$55-90", suv: "$70-120", luxury: "$110-220" },
    parkingInfo: [
      "Gillette Stadium: $40-60 per event",
      "T stations have parking",
      "Boston parking is expensive",
    ],
    tips: [
      "Stadium is in Foxborough - 25mi from Boston",
      "Commuter Rail available on match days",
      "Consider staying in Providence",
    ]
  },
  {
    city: "Philadelphia",
    country: "USA",
    countryCode: "us",
    rentalCompanies: [
      { name: "Hertz", url: "https://www.hertz.com", description: "PHL Airport" },
      { name: "Enterprise", url: "https://www.enterprise.com", description: "Center City" },
      { name: "Avis", url: "https://www.avis.com", description: "30th Street Station" },
      { name: "Budget", url: "https://www.budget.com", description: "Value options" },
    ],
    rideshareApps: [
      { name: "Uber", url: "https://www.uber.com", availability: "24/7 Philadelphia" },
      { name: "Lyft", url: "https://www.lyft.com", availability: "24/7 Philadelphia" },
    ],
    dailyRates: { economy: "$40-65", midsize: "$50-80", suv: "$65-110", luxury: "$95-190" },
    parkingInfo: [
      "Lincoln Financial Field: $30-50",
      "Subway goes to Sports Complex",
      "Street parking with PPA app",
    ],
    tips: [
      "Broad Street Subway to stadium",
      "Car useful for exploring region",
      "I-76 traffic can be challenging",
    ]
  },
  {
    city: "Kansas City",
    country: "USA",
    countryCode: "us",
    rentalCompanies: [
      { name: "Hertz", url: "https://www.hertz.com", description: "MCI Airport" },
      { name: "Enterprise", url: "https://www.enterprise.com", description: "Downtown & suburbs" },
      { name: "Avis", url: "https://www.avis.com", description: "Airport location" },
      { name: "Budget", url: "https://www.budget.com", description: "Affordable rates" },
    ],
    rideshareApps: [
      { name: "Uber", url: "https://www.uber.com", availability: "24/7 KC metro" },
      { name: "Lyft", url: "https://www.lyft.com", availability: "24/7 KC metro" },
    ],
    dailyRates: { economy: "$30-50", midsize: "$40-65", suv: "$55-90", luxury: "$80-160" },
    parkingInfo: [
      "Arrowhead Stadium: $35-50 per event",
      "Tailgating lots available",
      "Downtown parking reasonable",
    ],
    tips: [
      "Car essential in Kansas City",
      "Stadium has ample parking",
      "Great BBQ spots worth driving to",
    ]
  },
];

export default function CarRentals() {
  const [selectedCity, setSelectedCity] = useState<CityInfo | null>(null);

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
                  <Car className="w-4 h-4 inline mr-1" />
                  Car Rentals & Rideshare
                </p>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h2 className="text-lg font-display font-bold text-white mb-3">Rental Car Companies</h2>
            <div className="space-y-2">
              {selectedCity.rentalCompanies.map((company, index) => (
                <a
                  key={index}
                  href={company.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block bg-card border border-white/5 rounded-xl p-4 hover:border-purple-500/30 transition-colors group"
                  data-testid={`link-rental-${company.name.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-bold text-white group-hover:text-purple-400 transition-colors flex items-center gap-2">
                        {company.name}
                        <ExternalLink className="w-3 h-3 opacity-50 group-hover:opacity-100" />
                      </h3>
                      <p className="text-sm text-muted-foreground">{company.description}</p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-purple-400" />
                  </div>
                </a>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <div className="flex items-center space-x-2 mb-4">
              <DollarSign className="w-5 h-5 text-accent" />
              <h2 className="text-lg font-display font-bold text-white">Daily Rental Rates</h2>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-card border border-white/5 rounded-xl p-4 text-center">
                <span className="block text-[10px] uppercase tracking-wider text-muted-foreground mb-1">Economy</span>
                <span className="block text-lg font-bold text-white">{selectedCity.dailyRates.economy}</span>
              </div>
              <div className="bg-card border border-white/5 rounded-xl p-4 text-center">
                <span className="block text-[10px] uppercase tracking-wider text-muted-foreground mb-1">Midsize</span>
                <span className="block text-lg font-bold text-white">{selectedCity.dailyRates.midsize}</span>
              </div>
              <div className="bg-purple-500/10 border border-purple-500/20 rounded-xl p-4 text-center">
                <span className="block text-[10px] uppercase tracking-wider text-purple-400 mb-1">SUV</span>
                <span className="block text-lg font-bold text-purple-400">{selectedCity.dailyRates.suv}</span>
              </div>
              <div className="bg-accent/10 border border-accent/20 rounded-xl p-4 text-center">
                <span className="block text-[10px] uppercase tracking-wider text-accent mb-1">Luxury</span>
                <span className="block text-lg font-bold text-accent">{selectedCity.dailyRates.luxury}</span>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <div className="flex items-center space-x-2 mb-4">
              <Smartphone className="w-5 h-5 text-green-400" />
              <h2 className="text-lg font-display font-bold text-white">Rideshare Apps</h2>
            </div>
            <div className="space-y-2">
              {selectedCity.rideshareApps.map((app, index) => (
                <a
                  key={index}
                  href={app.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block bg-card border border-white/5 rounded-xl p-4 hover:border-green-500/30 transition-colors group"
                  data-testid={`link-rideshare-${app.name.toLowerCase()}`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-bold text-white group-hover:text-green-400 transition-colors flex items-center gap-2">
                        {app.name}
                        <ExternalLink className="w-3 h-3 opacity-50 group-hover:opacity-100" />
                      </h3>
                      <p className="text-sm text-muted-foreground">{app.availability}</p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-green-400" />
                  </div>
                </a>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <div className="flex items-center space-x-2 mb-4">
              <MapPin className="w-5 h-5 text-amber-400" />
              <h2 className="text-lg font-display font-bold text-white">Parking Info</h2>
            </div>
            <div className="bg-card border border-white/5 rounded-xl p-4">
              <ul className="space-y-2">
                {selectedCity.parkingInfo.map((info, index) => (
                  <li key={index} className="text-sm text-gray-300 flex items-start">
                    <span className="text-amber-400 mr-2">•</span>
                    {info}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div>
            <h2 className="text-lg font-display font-bold text-white mb-3">Local Tips</h2>
            <div className="bg-card border border-white/5 rounded-xl p-4">
              <ul className="space-y-2">
                {selectedCity.tips.map((tip, index) => (
                  <li key={index} className="text-sm text-gray-300 flex items-start">
                    <span className="text-primary mr-2">•</span>
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-6 bg-white/5 border border-white/10 rounded-xl p-4">
            <p className="text-xs text-muted-foreground leading-relaxed">
              Prices shown are estimated daily rates and may vary based on season, availability, and vehicle type. Book in advance for best rates during the World Cup period.
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
          <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center">
            <Car className="w-6 h-6 text-purple-400" />
          </div>
          <div>
            <h1 className="text-3xl font-display font-bold text-white" data-testid="text-page-title">
              Car Rentals & Rideshare
            </h1>
            <p className="text-sm text-muted-foreground">Flexible driving options for every city</p>
          </div>
        </div>
      </div>

      <div className="px-6 pb-24">
        <h2 className="text-lg font-display font-bold text-white mb-4">Select a City</h2>
        
        <div className="space-y-3">
          {cities.map((city, index) => (
            <button
              key={index}
              onClick={() => setSelectedCity(city)}
              className="w-full bg-card border border-white/5 rounded-xl p-4 hover:border-purple-500/30 transition-all group text-left"
              data-testid={`button-car-city-${city.countryCode}-${index}`}
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
                    <p className="text-sm text-muted-foreground">{city.rentalCompanies.length} rental companies</p>
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