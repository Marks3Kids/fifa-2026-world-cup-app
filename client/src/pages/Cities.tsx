import { Layout } from "@/components/Layout";
import { MapPin, Calendar, Info } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function Cities() {
  const cities = [
    // USA
    { 
      name: "New York/New Jersey", 
      stadium: "MetLife Stadium", 
      capacity: "82,500", 
      country: "USA",
      matches: [
        "Group Stage Match", "Group Stage Match", "Group Stage Match", "Group Stage Match", "Group Stage Match", 
        "Round of 32", "Round of 16", "Final (July 19)"
      ],
      description: "Hosting the Grand Final, New York/New Jersey offers an unparalleled experience. As a world-class hub for entertainment, dining, and shopping, visitors can explore iconic attractions from the Manhattan skyline to the Jersey Shore. \n\nThe region boasts Michelin-starred restaurants, Broadway shows, and a vibrant cultural scene that never sleeps. It is the perfect backdrop for the tournament's climax."
    },
    { 
      name: "Dallas", 
      stadium: "AT&T Stadium", 
      capacity: "80,000", 
      country: "USA",
      matches: [
        "Group Stage Match", "Group Stage Match", "Group Stage Match", "Group Stage Match", "Group Stage Match",
        "Round of 32", "Round of 16", "Round of 16", "Semi-Final (July 14)"
      ],
      description: "Hosting the most matches of any venue (9 total), Dallas is a sports mecca. The city features a vibrant arts scene, sprawling entertainment districts, and authentic Tex-Mex cuisine that defines the region's flavor.\n\nVisitors can explore historic landmarks and enjoy true Southern hospitality in a city that blends modern innovation with cowboy culture."
    },
    { 
      name: "Los Angeles", 
      stadium: "SoFi Stadium", 
      capacity: "70,240", 
      country: "USA",
      matches: [
        "USA Opening Match (June 12)", "Group Stage Match", "Group Stage Match", "Group Stage Match", "Group Stage Match",
        "Round of 32", "Round of 32", "Quarter-Final"
      ],
      description: "The entertainment capital of the world, Los Angeles will host the USA's opening match. With year-round sunshine and blue skies, fans can enjoy endless attractions from Hollywood to beautiful beaches.\n\nSoFi Stadium is a revolutionary indoor-outdoor venue that perfectly reflects the city's innovative spirit and glamorous lifestyle."
    },
    { 
      name: "Atlanta", 
      stadium: "Mercedes-Benz Stadium", 
      capacity: "71,000", 
      country: "USA",
      matches: [
        "Group Stage Match", "Group Stage Match", "Group Stage Match", "Group Stage Match", "Group Stage Match",
        "Round of 32", "Round of 16", "Semi-Final (July 15)"
      ],
      description: "Atlanta, hosting a Semi-Final, is a city of rich history and modern energy. Known for its thriving arts scene and diverse neighborhoods, it offers a unique blend of Southern charm and urban sophistication.\n\nMercedes-Benz Stadium is an architectural marvel with a retractable roof, located in the heart of a city filled with historic landmarks and family-friendly attractions."
    },
    { 
      name: "Miami", 
      stadium: "Hard Rock Stadium", 
      capacity: "64,767", 
      country: "USA",
      matches: [
        "Group Stage Match", "Group Stage Match", "Group Stage Match", "Group Stage Match",
        "Round of 32", "Quarter-Final", "Bronze Final (July 18)"
      ],
      description: "Hosting the Bronze Final, Miami is an oceanfront hotspot known for its legendary nightlife, unique Art Deco architecture, and fantastic dining scene. \n\nWith great weather and a vibrant Latin influence, South Beach offers a party atmosphere like no other, making it a top destination for fans looking for sun and fun."
    },
    { 
      name: "San Francisco Bay Area", 
      stadium: "Levi's Stadium", 
      capacity: "68,500", 
      country: "USA",
      matches: [
        "Group Stage Match", "Group Stage Match", "Group Stage Match", "Group Stage Match", "Group Stage Match",
        "Round of 32"
      ],
      description: "The San Francisco Bay Area is a global hub of tech innovation and cultural diversity. Visitors can enjoy the stunning bay views, world-class wine country nearby, and a progressive culinary scene.\n\nLevi's Stadium is a high-tech, LEED Gold certified venue that mirrors the region's commitment to sustainability and innovation."
    },
    { 
      name: "Seattle", 
      stadium: "Lumen Field", 
      capacity: "69,000", 
      country: "USA",
      matches: [
        "Group Stage Match", "Group Stage Match", "Group Stage Match", "Group Stage Match",
        "Round of 32", "Round of 16"
      ],
      description: "Seattle offers unique Pacific Northwest charm, surrounded by water, mountains, and evergreen forests. Known for its coffee culture and tech industry, it has a passionate soccer fan base.\n\nLumen Field is famous for its deafening atmosphere, providing an intense and exciting environment for World Cup matches."
    },
    { 
      name: "Houston", 
      stadium: "NRG Stadium", 
      capacity: "72,220", 
      country: "USA",
      matches: [
        "Group Stage Match", "Group Stage Match", "Group Stage Match", "Group Stage Match", "Group Stage Match",
        "Round of 32", "Round of 16"
      ],
      description: "Houston is a diverse metropolis with a vibrant restaurant scene and nightlife. Home to the Space Center Houston and a renowned Museum District, it offers plenty of cultural exploration.\n\nThe city is known for its Southern hospitality and energy, making it a welcoming host for fans from around the world."
    },
    { 
      name: "Philadelphia", 
      stadium: "Lincoln Financial Field", 
      capacity: "67,594", 
      country: "USA",
      matches: [
        "Group Stage Match", "Group Stage Match", "Group Stage Match", "Group Stage Match", "Group Stage Match",
        "Round of 16"
      ],
      description: "Where history meets innovation, Philadelphia is the birthplace of the United States. Visitors can tour Independence Hall and enjoy the city's famous cheesesteaks and Tastykakes.\n\nLincoln Financial Field hosts matches in a city with a passionate sports culture and a deep historical significance."
    },
    { 
      name: "Kansas City", 
      stadium: "Arrowhead Stadium", 
      capacity: "76,416", 
      country: "USA",
      matches: [
        "Group Stage Match", "Group Stage Match", "Group Stage Match", "Group Stage Match",
        "Round of 32", "Quarter-Final"
      ],
      description: "The 'Soccer Capital of America' in the Midwest, Kansas City is famous for its BBQ and jazz heritage. Arrowhead Stadium holds the Guinness World Record for the loudest crowd roar.\n\nFans can expect an electric atmosphere and a warm welcome in this sport-loving city."
    },
    { 
      name: "Boston", 
      stadium: "Gillette Stadium", 
      capacity: "65,878", 
      country: "USA",
      matches: [
        "Group Stage Match", "Group Stage Match", "Group Stage Match", "Group Stage Match", "Group Stage Match",
        "Round of 32", "Quarter-Final"
      ],
      description: "A cultural and historical hub, Boston offers a rich Revolutionary War heritage and picturesque New England scenery. \n\nGillette Stadium will host a Quarter-Final match, bringing world-class soccer to a region known for its championship sports history."
    },
    // Mexico
    { 
      name: "Mexico City", 
      stadium: "Estadio Azteca", 
      capacity: "87,523", 
      country: "Mexico",
      matches: [
        "Opening Match (June 11)", "Group Stage Match", "Group Stage Match",
        "Round of 32", "Round of 16"
      ],
      description: "Hosting the Opening Match, Mexico City is a historic capital rich in cultural heritage. Estadio Azteca is a legendary venue, the only one to host three World Cup openers.\n\nVisitors can explore ancient Aztec ruins, colonial architecture, and a vibrant street food scene in one of the world's largest and most dynamic cities."
    },
    { 
      name: "Monterrey", 
      stadium: "Estadio BBVA", 
      capacity: "53,500", 
      country: "Mexico",
      matches: [
        "Group Stage Match", "Group Stage Match", "Group Stage Match",
        "Round of 32"
      ],
      description: "Known as an industrial hub with modern infrastructure, Monterrey offers stunning mountain views and a passionate football culture.\n\nEstadio BBVA, nicknamed 'The Steel Giant', is a modern architectural marvel set against a dramatic natural backdrop."
    },
    { 
      name: "Guadalajara", 
      stadium: "Estadio Akron", 
      capacity: "49,850", 
      country: "Mexico",
      matches: [
        "Group Stage Match", "Group Stage Match", "Group Stage Match", "Group Stage Match"
      ],
      description: "Guadalajara is the heart of Mexican tradition, known for mariachi music, tequila, and colonial architecture. \n\nEstadio Akron features a unique volcano-inspired design. The city offers a festive atmosphere and a deep connection to Mexico's cultural roots."
    },
    // Canada
    { 
      name: "Toronto", 
      stadium: "BMO Field", 
      capacity: "45,500", 
      country: "Canada",
      matches: [
        "Canada Opening Match (June 12)", "Group Stage Match", "Group Stage Match", "Group Stage Match", "Group Stage Match",
        "Round of 32"
      ],
      description: "A cosmopolitan metropolis on the shores of Lake Ontario, Toronto is known for its diversity and culture. It will host Canada's opening match.\n\nThe city offers a vibrant arts scene, diverse dining, and iconic landmarks like the CN Tower. BMO Field provides an intimate and energetic soccer experience."
    },
    { 
      name: "Vancouver", 
      stadium: "BC Place", 
      capacity: "54,500", 
      country: "Canada",
      matches: [
        "Group Stage Match", "Group Stage Match", "Group Stage Match", "Group Stage Match", "Group Stage Match",
        "Round of 32", "Round of 16"
      ],
      description: "Nestled between mountains and the ocean, Vancouver offers stunning Pacific Northwest scenery and a laid-back vibe.\n\nBC Place features a beautiful retractable roof. Visitors can enjoy outdoor adventures, a thriving food scene, and the natural beauty that surrounds this coastal city."
    },
  ];

  return (
    <Layout>
      <div className="pt-12 px-6 pb-24">
        <h1 className="text-4xl font-display font-bold text-white mb-2">Host Cities</h1>
        <p className="text-muted-foreground mb-8">Explore the 16 Host Cities and their match schedules.</p>
        
        <div className="space-y-4">
          {cities.map((city, i) => (
            <Dialog key={i}>
              <DialogTrigger asChild>
                <div className="relative overflow-hidden rounded-xl h-40 group cursor-pointer border border-white/5 hover:border-primary/50 transition-all">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent z-10" />
                  <div className="absolute inset-0 bg-card z-0 group-hover:scale-105 transition-transform duration-700" /> 
                  
                  <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
                    <div className="flex items-center space-x-2 text-primary mb-1">
                      <MapPin className="w-3 h-3" />
                      <span className="text-[10px] uppercase tracking-wider font-bold">{city.country}</span>
                    </div>
                    <h3 className="text-xl font-bold text-white leading-none mb-1">{city.name}</h3>
                    <p className="text-xs text-gray-300">{city.stadium} • {city.capacity}</p>
                  </div>
                </div>
              </DialogTrigger>
              <DialogContent className="bg-card/95 backdrop-blur-xl border-white/10 text-white max-h-[85vh] p-0 overflow-hidden flex flex-col">
                <div className="p-6 pb-0">
                  <DialogHeader>
                    <div className="flex items-center space-x-2 text-primary mb-2">
                      <MapPin className="w-4 h-4" />
                      <span className="text-xs uppercase tracking-wider font-bold">{city.country}</span>
                    </div>
                    <DialogTitle className="text-3xl font-display font-bold">{city.name}</DialogTitle>
                    <DialogDescription className="text-muted-foreground">
                      {city.stadium} • Capacity: {city.capacity}
                    </DialogDescription>
                  </DialogHeader>
                </div>

                <ScrollArea className="flex-1 p-6 pt-4">
                  <div className="space-y-6">
                    <div className="bg-white/5 rounded-xl p-4 border border-white/5">
                      <div className="flex items-center space-x-2 mb-3 text-accent">
                        <Calendar className="w-4 h-4" />
                        <span className="text-sm font-bold uppercase tracking-wide">Match Schedule</span>
                      </div>
                      <ul className="space-y-2">
                        {city.matches.map((match, idx) => (
                          <li key={idx} className="text-sm text-gray-300 flex items-center">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary/50 mr-2"></span>
                            {match}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <div className="flex items-center space-x-2 mb-3 text-accent">
                        <Info className="w-4 h-4" />
                        <span className="text-sm font-bold uppercase tracking-wide">About the City</span>
                      </div>
                      <div className="space-y-4 text-sm leading-relaxed text-gray-300">
                        {city.description.split('\n\n').map((paragraph, idx) => (
                          <p key={idx}>{paragraph}</p>
                        ))}
                      </div>
                    </div>
                  </div>
                </ScrollArea>
              </DialogContent>
            </Dialog>
          ))}
        </div>
      </div>
    </Layout>
  );
}