import { Layout } from "@/components/Layout";
import { Plane, Train, Bus, Car, MapPin, Clock, DollarSign, Info, AlertTriangle, ChevronRight } from "lucide-react";
import { Link } from "wouter";
import transportHero from "@assets/generated_images/multi-modal_transportation_travel_scene.png";

interface TransportMode {
  icon: typeof Plane;
  title: string;
  description: string;
  details: string[];
  link?: string;
}

export default function Transportation() {
  const transportModes: TransportMode[] = [
    {
      icon: Plane,
      title: "International Flights",
      description: "Major international airports in all host cities with direct connections from every continent",
      details: [
        "JFK, LAX, MIA, ORD - Major US hubs",
        "Mexico City (MEX), Guadalajara (GDL)",
        "Toronto Pearson (YYZ), Vancouver (YVR)",
        "Pre-book for best rates during tournament"
      ],
      link: "/transportation/international-flights"
    },
    {
      icon: Plane,
      title: "Domestic Flights",
      description: "Extensive domestic flight networks connecting all 16 host cities",
      details: [
        "United, American, Delta, Southwest (USA)",
        "Air Canada, WestJet (Canada)",
        "Aeromexico, Volaris (Mexico)",
        "Book early for match day travel"
      ],
      link: "/transportation/domestic-flights"
    },
    {
      icon: Train,
      title: "Rail Services",
      description: "Efficient rail connections available in select regions",
      details: [
        "Amtrak Northeast Corridor (NYC, Boston, Philadelphia)",
        "Brightline Florida (Miami)",
        "VIA Rail (Toronto, Vancouver)",
        "Mexico City Metro and suburban rail"
      ],
      link: "/transportation/rail-services"
    },
    {
      icon: Bus,
      title: "Bus & Coach Services",
      description: "Affordable inter-city bus services across North America",
      details: [
        "Greyhound, FlixBus (USA & Canada)",
        "ADO, ETN (Mexico)",
        "Match day shuttle services at venues",
        "Airport express buses available"
      ],
      link: "/transportation/bus-services"
    },
    {
      icon: Car,
      title: "Car Rentals & Rideshare",
      description: "Flexible driving options with rental cars and rideshare apps",
      details: [
        "Hertz, Enterprise, Avis (nationwide)",
        "Uber, Lyft available in all US cities",
        "DiDi, Uber in Mexico",
        "Consider traffic on match days"
      ],
      link: "/transportation/car-rentals"
    }
  ];

  const travelTips = [
    {
      icon: Clock,
      title: "Plan Ahead",
      tip: "Book transportation 3-6 months before tournament dates for best availability and pricing"
    },
    {
      icon: DollarSign,
      title: "Budget Wisely",
      tip: "Prices surge during World Cup. Compare options and consider multi-city passes"
    },
    {
      icon: MapPin,
      title: "Know Your Venue",
      tip: "Each host city has different transit options. Research local transport before arrival"
    },
    {
      icon: Info,
      title: "Stay Informed",
      tip: "Download local transit apps and follow official FIFA transportation updates"
    }
  ];

  const TransportCard = ({ mode, index }: { mode: TransportMode; index: number }) => {
    const content = (
      <div className="flex items-start space-x-4">
        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
          <mode.icon className="w-6 h-6 text-primary" />
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-white mb-1">{mode.title}</h3>
            {mode.link && <ChevronRight className="w-5 h-5 text-primary" />}
          </div>
          <p className="text-sm text-muted-foreground mb-3">{mode.description}</p>
          <ul className="space-y-1.5">
            {mode.details.map((detail, i) => (
              <li key={i} className="text-sm text-gray-400 flex items-start">
                <span className="text-primary mr-2">•</span>
                {detail}
              </li>
            ))}
          </ul>
          {mode.link && (
            <div className="mt-3 pt-3 border-t border-white/5">
              <span className="text-sm text-primary font-medium">View details, options & pricing →</span>
            </div>
          )}
        </div>
      </div>
    );

    if (mode.link) {
      return (
        <Link 
          href={mode.link}
          className="block bg-card border border-white/5 rounded-xl p-5 hover:border-primary/30 transition-colors cursor-pointer"
          data-testid={`card-transport-${index}`}
        >
          {content}
        </Link>
      );
    }

    return (
      <div 
        className="bg-card border border-white/5 rounded-xl p-5 hover:border-primary/30 transition-colors"
        data-testid={`card-transport-${index}`}
      >
        {content}
      </div>
    );
  };

  return (
    <Layout>
      {/* Hero Section */}
      <div className="relative w-full">
        <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-transparent to-background z-10" />
        <img 
          src={transportHero} 
          alt="Transportation - Planes, Trains, Buses, Cars" 
          className="w-full h-64 object-cover"
          data-testid="img-transport-hero"
        />
        <div className="absolute inset-0 z-20 flex flex-col justify-end p-6">
          <h1 className="text-4xl font-display font-bold text-white drop-shadow-2xl" data-testid="text-page-title">
            Plan Your Journey
          </h1>
        </div>
      </div>

      {/* Intro Section */}
      <div className="px-6 py-6">
        <p className="text-gray-300 leading-relaxed" data-testid="text-intro">
          Comprehensive transportation guide including local transit, domestic flights, international flights, and travel tips for all host cities.
        </p>
      </div>

      {/* Transportation Modes */}
      <div className="px-6 pb-6">
        <h2 className="text-2xl font-display font-bold text-white mb-4" data-testid="text-section-modes">
          Transportation Options
        </h2>
        <div className="space-y-4">
          {transportModes.map((mode, index) => (
            <TransportCard key={index} mode={mode} index={index} />
          ))}
        </div>
      </div>

      {/* Travel Tips */}
      <div className="px-6 pb-6">
        <h2 className="text-2xl font-display font-bold text-white mb-4" data-testid="text-section-tips">
          Travel Tips
        </h2>
        <div className="grid grid-cols-2 gap-3">
          {travelTips.map((tip, index) => (
            <div 
              key={index}
              className="bg-card border border-white/5 rounded-xl p-4"
              data-testid={`card-tip-${index}`}
            >
              <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center mb-3">
                <tip.icon className="w-5 h-5 text-accent" />
              </div>
              <h3 className="text-sm font-bold text-white mb-1">{tip.title}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">{tip.tip}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Disclaimer */}
      <div className="px-6 pb-24">
        <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4" data-testid="card-disclaimer">
          <div className="flex items-start space-x-3">
            <AlertTriangle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="text-sm font-bold text-amber-500 mb-2">Disclaimer</h3>
              <p className="text-xs text-amber-200/80 leading-relaxed">
                All transportation pricing, flight schedules, availability, and route information displayed herein is provided for general informational purposes only and is subject to change without prior notice. Fares, timetables, and service availability may fluctuate based on carrier policies, seasonal demand, operational conditions, and other factors beyond our control. We make no warranties or representations regarding the accuracy, timeliness, or completeness of any transportation information presented. Users are strongly advised to independently verify all details, including current fares, schedules, and booking terms, directly with the respective transportation providers or authorized booking agents prior to making any travel arrangements or financial commitments.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}