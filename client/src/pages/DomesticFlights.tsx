import { Layout } from "@/components/Layout";
import { Plane, Clock, ArrowLeft, MapPin, Star, ChevronRight, ExternalLink } from "lucide-react";
import { Link } from "wouter";
import { useState } from "react";
import { getAirlineUrl } from "@/lib/airlines";

interface DomesticRoute {
  to: string;
  toCode: string;
  flightTime: string;
  economy: string;
  business: string;
  firstClass: string;
}

interface CityHub {
  city: string;
  country: string;
  countryCode: string;
  airportName: string;
  code: string;
  airlines: string[];
  routes: DomesticRoute[];
}

const cityHubs: CityHub[] = [
  {
    city: "New York / New Jersey",
    country: "USA",
    countryCode: "us",
    airportName: "John F. Kennedy International / Newark Liberty",
    code: "JFK / EWR",
    airlines: ["Delta", "United", "American", "JetBlue", "Southwest", "Spirit"],
    routes: [
      { to: "Los Angeles", toCode: "LAX", flightTime: "5h 30m", economy: "$150-380", business: "$450-850", firstClass: "$900-1,800" },
      { to: "Miami", toCode: "MIA", flightTime: "3h 15m", economy: "$120-280", business: "$350-650", firstClass: "$700-1,400" },
      { to: "Dallas", toCode: "DFW", flightTime: "3h 45m", economy: "$130-300", business: "$380-700", firstClass: "$750-1,500" },
      { to: "Atlanta", toCode: "ATL", flightTime: "2h 30m", economy: "$100-240", business: "$300-550", firstClass: "$600-1,200" },
      { to: "Houston", toCode: "IAH", flightTime: "3h 50m", economy: "$130-310", business: "$380-720", firstClass: "$760-1,520" },
      { to: "Seattle", toCode: "SEA", flightTime: "5h 45m", economy: "$160-400", business: "$470-900", firstClass: "$950-1,900" },
      { to: "San Francisco", toCode: "SFO", flightTime: "5h 40m", economy: "$155-390", business: "$460-880", firstClass: "$920-1,850" },
      { to: "Boston", toCode: "BOS", flightTime: "1h 20m", economy: "$80-180", business: "$220-420", firstClass: "$450-900" },
      { to: "Philadelphia", toCode: "PHL", flightTime: "1h 15m", economy: "$70-160", business: "$200-380", firstClass: "$400-800" },
      { to: "Kansas City", toCode: "MCI", flightTime: "3h 20m", economy: "$120-280", business: "$350-660", firstClass: "$700-1,400" },
      { to: "Toronto", toCode: "YYZ", flightTime: "1h 40m", economy: "$150-320", business: "$400-750", firstClass: "$800-1,600" },
      { to: "Vancouver", toCode: "YVR", flightTime: "5h 50m", economy: "$200-450", business: "$550-1,000", firstClass: "$1,100-2,200" },
      { to: "Mexico City", toCode: "MEX", flightTime: "4h 50m", economy: "$180-400", business: "$500-950", firstClass: "$1,000-2,000" },
      { to: "Guadalajara", toCode: "GDL", flightTime: "5h 00m", economy: "$200-420", business: "$520-980", firstClass: "$1,050-2,100" },
      { to: "Monterrey", toCode: "MTY", flightTime: "4h 20m", economy: "$180-380", business: "$480-900", firstClass: "$960-1,900" },
    ]
  },
  {
    city: "Los Angeles",
    country: "USA",
    countryCode: "us",
    airportName: "Los Angeles International Airport",
    code: "LAX",
    airlines: ["Delta", "American", "United", "Southwest", "Alaska Airlines", "JetBlue"],
    routes: [
      { to: "New York", toCode: "JFK", flightTime: "5h 30m", economy: "$150-380", business: "$450-850", firstClass: "$900-1,800" },
      { to: "Miami", toCode: "MIA", flightTime: "5h 00m", economy: "$140-350", business: "$420-800", firstClass: "$840-1,680" },
      { to: "Dallas", toCode: "DFW", flightTime: "3h 10m", economy: "$110-260", business: "$320-600", firstClass: "$640-1,280" },
      { to: "Atlanta", toCode: "ATL", flightTime: "4h 05m", economy: "$130-310", business: "$380-720", firstClass: "$760-1,520" },
      { to: "Houston", toCode: "IAH", flightTime: "3h 25m", economy: "$120-280", business: "$350-660", firstClass: "$700-1,400" },
      { to: "Seattle", toCode: "SEA", flightTime: "2h 45m", economy: "$90-220", business: "$270-500", firstClass: "$540-1,080" },
      { to: "San Francisco", toCode: "SFO", flightTime: "1h 20m", economy: "$70-170", business: "$200-380", firstClass: "$400-800" },
      { to: "Boston", toCode: "BOS", flightTime: "5h 40m", economy: "$160-400", business: "$470-900", firstClass: "$950-1,900" },
      { to: "Philadelphia", toCode: "PHL", flightTime: "5h 20m", economy: "$150-370", business: "$440-840", firstClass: "$880-1,760" },
      { to: "Kansas City", toCode: "MCI", flightTime: "3h 00m", economy: "$100-250", business: "$300-570", firstClass: "$600-1,200" },
      { to: "Toronto", toCode: "YYZ", flightTime: "4h 40m", economy: "$180-400", business: "$500-950", firstClass: "$1,000-2,000" },
      { to: "Vancouver", toCode: "YVR", flightTime: "2h 50m", economy: "$120-280", business: "$350-660", firstClass: "$700-1,400" },
      { to: "Mexico City", toCode: "MEX", flightTime: "3h 40m", economy: "$150-340", business: "$420-800", firstClass: "$840-1,680" },
      { to: "Guadalajara", toCode: "GDL", flightTime: "3h 00m", economy: "$130-300", business: "$380-720", firstClass: "$760-1,520" },
      { to: "Monterrey", toCode: "MTY", flightTime: "3h 15m", economy: "$140-320", business: "$400-760", firstClass: "$800-1,600" },
    ]
  },
  {
    city: "Miami",
    country: "USA",
    countryCode: "us",
    airportName: "Miami International Airport",
    code: "MIA",
    airlines: ["American", "Delta", "United", "JetBlue", "Spirit", "Southwest"],
    routes: [
      { to: "New York", toCode: "JFK", flightTime: "3h 15m", economy: "$120-280", business: "$350-650", firstClass: "$700-1,400" },
      { to: "Los Angeles", toCode: "LAX", flightTime: "5h 00m", economy: "$140-350", business: "$420-800", firstClass: "$840-1,680" },
      { to: "Dallas", toCode: "DFW", flightTime: "3h 00m", economy: "$110-260", business: "$320-600", firstClass: "$640-1,280" },
      { to: "Atlanta", toCode: "ATL", flightTime: "1h 50m", economy: "$80-190", business: "$240-450", firstClass: "$480-960" },
      { to: "Houston", toCode: "IAH", flightTime: "2h 45m", economy: "$100-240", business: "$300-560", firstClass: "$600-1,200" },
      { to: "Seattle", toCode: "SEA", flightTime: "6h 00m", economy: "$170-420", business: "$500-960", firstClass: "$1,000-2,000" },
      { to: "San Francisco", toCode: "SFO", flightTime: "5h 30m", economy: "$155-390", business: "$460-880", firstClass: "$920-1,840" },
      { to: "Boston", toCode: "BOS", flightTime: "3h 20m", economy: "$120-290", business: "$360-680", firstClass: "$720-1,440" },
      { to: "Philadelphia", toCode: "PHL", flightTime: "2h 50m", economy: "$110-260", business: "$320-600", firstClass: "$640-1,280" },
      { to: "Kansas City", toCode: "MCI", flightTime: "3h 30m", economy: "$130-310", business: "$380-720", firstClass: "$760-1,520" },
      { to: "Toronto", toCode: "YYZ", flightTime: "3h 20m", economy: "$160-360", business: "$450-860", firstClass: "$900-1,800" },
      { to: "Mexico City", toCode: "MEX", flightTime: "3h 00m", economy: "$140-320", business: "$400-760", firstClass: "$800-1,600" },
    ]
  },
  {
    city: "Dallas",
    country: "USA",
    countryCode: "us",
    airportName: "Dallas/Fort Worth International Airport",
    code: "DFW",
    airlines: ["American", "Southwest", "United", "Delta", "Spirit", "Frontier"],
    routes: [
      { to: "New York", toCode: "JFK", flightTime: "3h 45m", economy: "$130-300", business: "$380-700", firstClass: "$750-1,500" },
      { to: "Los Angeles", toCode: "LAX", flightTime: "3h 10m", economy: "$110-260", business: "$320-600", firstClass: "$640-1,280" },
      { to: "Miami", toCode: "MIA", flightTime: "3h 00m", economy: "$110-260", business: "$320-600", firstClass: "$640-1,280" },
      { to: "Atlanta", toCode: "ATL", flightTime: "2h 10m", economy: "$90-210", business: "$270-500", firstClass: "$540-1,080" },
      { to: "Houston", toCode: "IAH", flightTime: "1h 05m", economy: "$60-150", business: "$180-340", firstClass: "$360-720" },
      { to: "Seattle", toCode: "SEA", flightTime: "4h 00m", economy: "$130-320", business: "$390-740", firstClass: "$780-1,560" },
      { to: "San Francisco", toCode: "SFO", flightTime: "3h 30m", economy: "$120-290", business: "$360-680", firstClass: "$720-1,440" },
      { to: "Boston", toCode: "BOS", flightTime: "3h 50m", economy: "$130-310", business: "$390-740", firstClass: "$780-1,560" },
      { to: "Philadelphia", toCode: "PHL", flightTime: "3h 20m", economy: "$120-280", business: "$350-660", firstClass: "$700-1,400" },
      { to: "Kansas City", toCode: "MCI", flightTime: "1h 40m", economy: "$70-170", business: "$210-400", firstClass: "$420-840" },
      { to: "Toronto", toCode: "YYZ", flightTime: "3h 10m", economy: "$150-340", business: "$430-820", firstClass: "$860-1,720" },
      { to: "Vancouver", toCode: "YVR", flightTime: "4h 20m", economy: "$160-380", business: "$470-900", firstClass: "$940-1,880" },
      { to: "Mexico City", toCode: "MEX", flightTime: "2h 30m", economy: "$120-280", business: "$350-660", firstClass: "$700-1,400" },
      { to: "Guadalajara", toCode: "GDL", flightTime: "2h 30m", economy: "$130-300", business: "$380-720", firstClass: "$760-1,520" },
      { to: "Monterrey", toCode: "MTY", flightTime: "1h 45m", economy: "$100-240", business: "$300-560", firstClass: "$600-1,200" },
    ]
  },
  {
    city: "Atlanta",
    country: "USA",
    countryCode: "us",
    airportName: "Hartsfield-Jackson Atlanta International",
    code: "ATL",
    airlines: ["Delta", "Southwest", "American", "United", "Spirit", "Frontier"],
    routes: [
      { to: "New York", toCode: "JFK", flightTime: "2h 30m", economy: "$100-240", business: "$300-550", firstClass: "$600-1,200" },
      { to: "Los Angeles", toCode: "LAX", flightTime: "4h 05m", economy: "$130-310", business: "$380-720", firstClass: "$760-1,520" },
      { to: "Miami", toCode: "MIA", flightTime: "1h 50m", economy: "$80-190", business: "$240-450", firstClass: "$480-960" },
      { to: "Dallas", toCode: "DFW", flightTime: "2h 10m", economy: "$90-210", business: "$270-500", firstClass: "$540-1,080" },
      { to: "Houston", toCode: "IAH", flightTime: "2h 00m", economy: "$85-200", business: "$255-480", firstClass: "$510-1,020" },
      { to: "Seattle", toCode: "SEA", flightTime: "5h 00m", economy: "$150-370", business: "$440-840", firstClass: "$880-1,760" },
      { to: "San Francisco", toCode: "SFO", flightTime: "4h 40m", economy: "$140-340", business: "$410-780", firstClass: "$820-1,640" },
      { to: "Boston", toCode: "BOS", flightTime: "2h 40m", economy: "$110-260", business: "$320-600", firstClass: "$640-1,280" },
      { to: "Philadelphia", toCode: "PHL", flightTime: "2h 00m", economy: "$90-210", business: "$270-500", firstClass: "$540-1,080" },
      { to: "Kansas City", toCode: "MCI", flightTime: "2h 20m", economy: "$100-240", business: "$300-560", firstClass: "$600-1,200" },
      { to: "Toronto", toCode: "YYZ", flightTime: "2h 15m", economy: "$140-320", business: "$400-760", firstClass: "$800-1,600" },
      { to: "Mexico City", toCode: "MEX", flightTime: "3h 30m", economy: "$160-360", business: "$450-860", firstClass: "$900-1,800" },
    ]
  },
  {
    city: "Houston",
    country: "USA",
    countryCode: "us",
    airportName: "George Bush Intercontinental Airport",
    code: "IAH",
    airlines: ["United", "Southwest", "American", "Delta", "Spirit", "Frontier"],
    routes: [
      { to: "New York", toCode: "JFK", flightTime: "3h 50m", economy: "$130-310", business: "$380-720", firstClass: "$760-1,520" },
      { to: "Los Angeles", toCode: "LAX", flightTime: "3h 25m", economy: "$120-280", business: "$350-660", firstClass: "$700-1,400" },
      { to: "Miami", toCode: "MIA", flightTime: "2h 45m", economy: "$100-240", business: "$300-560", firstClass: "$600-1,200" },
      { to: "Dallas", toCode: "DFW", flightTime: "1h 05m", economy: "$60-150", business: "$180-340", firstClass: "$360-720" },
      { to: "Atlanta", toCode: "ATL", flightTime: "2h 00m", economy: "$85-200", business: "$255-480", firstClass: "$510-1,020" },
      { to: "Seattle", toCode: "SEA", flightTime: "4h 20m", economy: "$140-340", business: "$410-780", firstClass: "$820-1,640" },
      { to: "San Francisco", toCode: "SFO", flightTime: "3h 50m", economy: "$130-310", business: "$380-720", firstClass: "$760-1,520" },
      { to: "Boston", toCode: "BOS", flightTime: "4h 00m", economy: "$140-330", business: "$400-760", firstClass: "$800-1,600" },
      { to: "Philadelphia", toCode: "PHL", flightTime: "3h 30m", economy: "$125-300", business: "$370-700", firstClass: "$740-1,480" },
      { to: "Kansas City", toCode: "MCI", flightTime: "2h 10m", economy: "$90-220", business: "$270-510", firstClass: "$540-1,080" },
      { to: "Toronto", toCode: "YYZ", flightTime: "3h 30m", economy: "$160-370", business: "$460-880", firstClass: "$920-1,840" },
      { to: "Mexico City", toCode: "MEX", flightTime: "2h 15m", economy: "$110-260", business: "$320-600", firstClass: "$640-1,280" },
      { to: "Guadalajara", toCode: "GDL", flightTime: "2h 15m", economy: "$120-280", business: "$350-660", firstClass: "$700-1,400" },
      { to: "Monterrey", toCode: "MTY", flightTime: "1h 30m", economy: "$90-210", business: "$270-500", firstClass: "$540-1,080" },
    ]
  },
  {
    city: "Seattle",
    country: "USA",
    countryCode: "us",
    airportName: "Seattle-Tacoma International Airport",
    code: "SEA",
    airlines: ["Alaska Airlines", "Delta", "United", "Southwest", "American", "JetBlue"],
    routes: [
      { to: "New York", toCode: "JFK", flightTime: "5h 45m", economy: "$160-400", business: "$470-900", firstClass: "$950-1,900" },
      { to: "Los Angeles", toCode: "LAX", flightTime: "2h 45m", economy: "$90-220", business: "$270-500", firstClass: "$540-1,080" },
      { to: "Miami", toCode: "MIA", flightTime: "6h 00m", economy: "$170-420", business: "$500-960", firstClass: "$1,000-2,000" },
      { to: "Dallas", toCode: "DFW", flightTime: "4h 00m", economy: "$130-320", business: "$390-740", firstClass: "$780-1,560" },
      { to: "Atlanta", toCode: "ATL", flightTime: "5h 00m", economy: "$150-370", business: "$440-840", firstClass: "$880-1,760" },
      { to: "Houston", toCode: "IAH", flightTime: "4h 20m", economy: "$140-340", business: "$410-780", firstClass: "$820-1,640" },
      { to: "San Francisco", toCode: "SFO", flightTime: "2h 10m", economy: "$80-200", business: "$240-450", firstClass: "$480-960" },
      { to: "Boston", toCode: "BOS", flightTime: "5h 50m", economy: "$165-410", business: "$480-920", firstClass: "$960-1,920" },
      { to: "Philadelphia", toCode: "PHL", flightTime: "5h 30m", economy: "$155-390", business: "$460-880", firstClass: "$920-1,840" },
      { to: "Kansas City", toCode: "MCI", flightTime: "3h 30m", economy: "$120-290", business: "$360-680", firstClass: "$720-1,440" },
      { to: "Toronto", toCode: "YYZ", flightTime: "4h 40m", economy: "$180-420", business: "$520-1,000", firstClass: "$1,040-2,080" },
      { to: "Vancouver", toCode: "YVR", flightTime: "0h 50m", economy: "$60-150", business: "$180-340", firstClass: "$360-720" },
      { to: "Mexico City", toCode: "MEX", flightTime: "5h 00m", economy: "$180-420", business: "$520-1,000", firstClass: "$1,040-2,080" },
    ]
  },
  {
    city: "San Francisco Bay Area",
    country: "USA",
    countryCode: "us",
    airportName: "San Francisco International / San Jose",
    code: "SFO / SJC",
    airlines: ["United", "Alaska Airlines", "Southwest", "Delta", "American", "JetBlue"],
    routes: [
      { to: "New York", toCode: "JFK", flightTime: "5h 40m", economy: "$155-390", business: "$460-880", firstClass: "$920-1,850" },
      { to: "Los Angeles", toCode: "LAX", flightTime: "1h 20m", economy: "$70-170", business: "$200-380", firstClass: "$400-800" },
      { to: "Miami", toCode: "MIA", flightTime: "5h 30m", economy: "$155-390", business: "$460-880", firstClass: "$920-1,840" },
      { to: "Dallas", toCode: "DFW", flightTime: "3h 30m", economy: "$120-290", business: "$360-680", firstClass: "$720-1,440" },
      { to: "Atlanta", toCode: "ATL", flightTime: "4h 40m", economy: "$140-340", business: "$410-780", firstClass: "$820-1,640" },
      { to: "Houston", toCode: "IAH", flightTime: "3h 50m", economy: "$130-310", business: "$380-720", firstClass: "$760-1,520" },
      { to: "Seattle", toCode: "SEA", flightTime: "2h 10m", economy: "$80-200", business: "$240-450", firstClass: "$480-960" },
      { to: "Boston", toCode: "BOS", flightTime: "5h 50m", economy: "$160-400", business: "$470-900", firstClass: "$940-1,880" },
      { to: "Philadelphia", toCode: "PHL", flightTime: "5h 30m", economy: "$150-380", business: "$450-860", firstClass: "$900-1,800" },
      { to: "Kansas City", toCode: "MCI", flightTime: "3h 15m", economy: "$110-270", business: "$330-620", firstClass: "$660-1,320" },
      { to: "Toronto", toCode: "YYZ", flightTime: "5h 00m", economy: "$190-440", business: "$550-1,050", firstClass: "$1,100-2,200" },
      { to: "Vancouver", toCode: "YVR", flightTime: "2h 20m", economy: "$100-240", business: "$300-560", firstClass: "$600-1,200" },
      { to: "Mexico City", toCode: "MEX", flightTime: "4h 30m", economy: "$170-390", business: "$490-940", firstClass: "$980-1,960" },
    ]
  },
  {
    city: "Boston",
    country: "USA",
    countryCode: "us",
    airportName: "Boston Logan International Airport",
    code: "BOS",
    airlines: ["JetBlue", "Delta", "American", "United", "Southwest", "Spirit"],
    routes: [
      { to: "New York", toCode: "JFK", flightTime: "1h 20m", economy: "$80-180", business: "$220-420", firstClass: "$450-900" },
      { to: "Los Angeles", toCode: "LAX", flightTime: "5h 40m", economy: "$160-400", business: "$470-900", firstClass: "$950-1,900" },
      { to: "Miami", toCode: "MIA", flightTime: "3h 20m", economy: "$120-290", business: "$360-680", firstClass: "$720-1,440" },
      { to: "Dallas", toCode: "DFW", flightTime: "3h 50m", economy: "$130-310", business: "$390-740", firstClass: "$780-1,560" },
      { to: "Atlanta", toCode: "ATL", flightTime: "2h 40m", economy: "$110-260", business: "$320-600", firstClass: "$640-1,280" },
      { to: "Houston", toCode: "IAH", flightTime: "4h 00m", economy: "$140-330", business: "$400-760", firstClass: "$800-1,600" },
      { to: "Seattle", toCode: "SEA", flightTime: "5h 50m", economy: "$165-410", business: "$480-920", firstClass: "$960-1,920" },
      { to: "San Francisco", toCode: "SFO", flightTime: "5h 50m", economy: "$160-400", business: "$470-900", firstClass: "$940-1,880" },
      { to: "Philadelphia", toCode: "PHL", flightTime: "1h 30m", economy: "$80-190", business: "$240-450", firstClass: "$480-960" },
      { to: "Kansas City", toCode: "MCI", flightTime: "3h 40m", economy: "$125-300", business: "$370-700", firstClass: "$740-1,480" },
      { to: "Toronto", toCode: "YYZ", flightTime: "1h 45m", economy: "$140-320", business: "$400-760", firstClass: "$800-1,600" },
    ]
  },
  {
    city: "Philadelphia",
    country: "USA",
    countryCode: "us",
    airportName: "Philadelphia International Airport",
    code: "PHL",
    airlines: ["American", "Southwest", "Frontier", "Spirit", "Delta", "United"],
    routes: [
      { to: "New York", toCode: "JFK", flightTime: "1h 15m", economy: "$70-160", business: "$200-380", firstClass: "$400-800" },
      { to: "Los Angeles", toCode: "LAX", flightTime: "5h 20m", economy: "$150-370", business: "$440-840", firstClass: "$880-1,760" },
      { to: "Miami", toCode: "MIA", flightTime: "2h 50m", economy: "$110-260", business: "$320-600", firstClass: "$640-1,280" },
      { to: "Dallas", toCode: "DFW", flightTime: "3h 20m", economy: "$120-280", business: "$350-660", firstClass: "$700-1,400" },
      { to: "Atlanta", toCode: "ATL", flightTime: "2h 00m", economy: "$90-210", business: "$270-500", firstClass: "$540-1,080" },
      { to: "Houston", toCode: "IAH", flightTime: "3h 30m", economy: "$125-300", business: "$370-700", firstClass: "$740-1,480" },
      { to: "Seattle", toCode: "SEA", flightTime: "5h 30m", economy: "$155-390", business: "$460-880", firstClass: "$920-1,840" },
      { to: "San Francisco", toCode: "SFO", flightTime: "5h 30m", economy: "$150-380", business: "$450-860", firstClass: "$900-1,800" },
      { to: "Boston", toCode: "BOS", flightTime: "1h 30m", economy: "$80-190", business: "$240-450", firstClass: "$480-960" },
      { to: "Kansas City", toCode: "MCI", flightTime: "3h 00m", economy: "$110-260", business: "$320-600", firstClass: "$640-1,280" },
      { to: "Toronto", toCode: "YYZ", flightTime: "1h 40m", economy: "$130-300", business: "$380-720", firstClass: "$760-1,520" },
    ]
  },
  {
    city: "Kansas City",
    country: "USA",
    countryCode: "us",
    airportName: "Kansas City International Airport",
    code: "MCI",
    airlines: ["Southwest", "United", "American", "Delta", "Frontier", "Alaska Airlines"],
    routes: [
      { to: "New York", toCode: "JFK", flightTime: "3h 20m", economy: "$120-280", business: "$350-660", firstClass: "$700-1,400" },
      { to: "Los Angeles", toCode: "LAX", flightTime: "3h 00m", economy: "$100-250", business: "$300-570", firstClass: "$600-1,200" },
      { to: "Miami", toCode: "MIA", flightTime: "3h 30m", economy: "$130-310", business: "$380-720", firstClass: "$760-1,520" },
      { to: "Dallas", toCode: "DFW", flightTime: "1h 40m", economy: "$70-170", business: "$210-400", firstClass: "$420-840" },
      { to: "Atlanta", toCode: "ATL", flightTime: "2h 20m", economy: "$100-240", business: "$300-560", firstClass: "$600-1,200" },
      { to: "Houston", toCode: "IAH", flightTime: "2h 10m", economy: "$90-220", business: "$270-510", firstClass: "$540-1,080" },
      { to: "Seattle", toCode: "SEA", flightTime: "3h 30m", economy: "$120-290", business: "$360-680", firstClass: "$720-1,440" },
      { to: "San Francisco", toCode: "SFO", flightTime: "3h 15m", economy: "$110-270", business: "$330-620", firstClass: "$660-1,320" },
      { to: "Boston", toCode: "BOS", flightTime: "3h 40m", economy: "$125-300", business: "$370-700", firstClass: "$740-1,480" },
      { to: "Philadelphia", toCode: "PHL", flightTime: "3h 00m", economy: "$110-260", business: "$320-600", firstClass: "$640-1,280" },
      { to: "Denver", toCode: "DEN", flightTime: "1h 40m", economy: "$70-170", business: "$210-400", firstClass: "$420-840" },
    ]
  },
  {
    city: "Toronto",
    country: "Canada",
    countryCode: "ca",
    airportName: "Toronto Pearson International",
    code: "YYZ",
    airlines: ["Air Canada", "WestJet", "United", "American", "Delta", "Porter Airlines"],
    routes: [
      { to: "New York", toCode: "JFK", flightTime: "1h 40m", economy: "$150-320", business: "$400-750", firstClass: "$800-1,600" },
      { to: "Los Angeles", toCode: "LAX", flightTime: "4h 40m", economy: "$180-400", business: "$500-950", firstClass: "$1,000-2,000" },
      { to: "Miami", toCode: "MIA", flightTime: "3h 20m", economy: "$160-360", business: "$450-860", firstClass: "$900-1,800" },
      { to: "Dallas", toCode: "DFW", flightTime: "3h 10m", economy: "$150-340", business: "$430-820", firstClass: "$860-1,720" },
      { to: "Atlanta", toCode: "ATL", flightTime: "2h 15m", economy: "$140-320", business: "$400-760", firstClass: "$800-1,600" },
      { to: "Houston", toCode: "IAH", flightTime: "3h 30m", economy: "$160-370", business: "$460-880", firstClass: "$920-1,840" },
      { to: "Seattle", toCode: "SEA", flightTime: "4h 40m", economy: "$180-420", business: "$520-1,000", firstClass: "$1,040-2,080" },
      { to: "San Francisco", toCode: "SFO", flightTime: "5h 00m", economy: "$190-440", business: "$550-1,050", firstClass: "$1,100-2,200" },
      { to: "Boston", toCode: "BOS", flightTime: "1h 45m", economy: "$140-320", business: "$400-760", firstClass: "$800-1,600" },
      { to: "Philadelphia", toCode: "PHL", flightTime: "1h 40m", economy: "$130-300", business: "$380-720", firstClass: "$760-1,520" },
      { to: "Vancouver", toCode: "YVR", flightTime: "4h 45m", economy: "$170-380", business: "$480-920", firstClass: "$960-1,920" },
      { to: "Mexico City", toCode: "MEX", flightTime: "4h 30m", economy: "$200-450", business: "$560-1,080", firstClass: "$1,120-2,240" },
    ]
  },
  {
    city: "Vancouver",
    country: "Canada",
    countryCode: "ca",
    airportName: "Vancouver International Airport",
    code: "YVR",
    airlines: ["Air Canada", "WestJet", "United", "Alaska Airlines", "American", "Delta"],
    routes: [
      { to: "New York", toCode: "JFK", flightTime: "5h 50m", economy: "$200-450", business: "$550-1,000", firstClass: "$1,100-2,200" },
      { to: "Los Angeles", toCode: "LAX", flightTime: "2h 50m", economy: "$120-280", business: "$350-660", firstClass: "$700-1,400" },
      { to: "Dallas", toCode: "DFW", flightTime: "4h 20m", economy: "$160-380", business: "$470-900", firstClass: "$940-1,880" },
      { to: "Seattle", toCode: "SEA", flightTime: "0h 50m", economy: "$60-150", business: "$180-340", firstClass: "$360-720" },
      { to: "San Francisco", toCode: "SFO", flightTime: "2h 20m", economy: "$100-240", business: "$300-560", firstClass: "$600-1,200" },
      { to: "Toronto", toCode: "YYZ", flightTime: "4h 45m", economy: "$170-380", business: "$480-920", firstClass: "$960-1,920" },
      { to: "Mexico City", toCode: "MEX", flightTime: "5h 30m", economy: "$220-490", business: "$600-1,150", firstClass: "$1,200-2,400" },
    ]
  },
  {
    city: "Mexico City",
    country: "Mexico",
    countryCode: "mx",
    airportName: "Mexico City International (Benito Juárez)",
    code: "MEX",
    airlines: ["Aeroméxico", "Volaris", "VivaAerobus", "United", "American", "Delta"],
    routes: [
      { to: "New York", toCode: "JFK", flightTime: "4h 50m", economy: "$180-400", business: "$500-950", firstClass: "$1,000-2,000" },
      { to: "Los Angeles", toCode: "LAX", flightTime: "3h 40m", economy: "$150-340", business: "$420-800", firstClass: "$840-1,680" },
      { to: "Miami", toCode: "MIA", flightTime: "3h 00m", economy: "$140-320", business: "$400-760", firstClass: "$800-1,600" },
      { to: "Dallas", toCode: "DFW", flightTime: "2h 30m", economy: "$120-280", business: "$350-660", firstClass: "$700-1,400" },
      { to: "Atlanta", toCode: "ATL", flightTime: "3h 30m", economy: "$160-360", business: "$450-860", firstClass: "$900-1,800" },
      { to: "Houston", toCode: "IAH", flightTime: "2h 15m", economy: "$110-260", business: "$320-600", firstClass: "$640-1,280" },
      { to: "Seattle", toCode: "SEA", flightTime: "5h 00m", economy: "$180-420", business: "$520-1,000", firstClass: "$1,040-2,080" },
      { to: "San Francisco", toCode: "SFO", flightTime: "4h 30m", economy: "$170-390", business: "$490-940", firstClass: "$980-1,960" },
      { to: "Toronto", toCode: "YYZ", flightTime: "4h 30m", economy: "$200-450", business: "$560-1,080", firstClass: "$1,120-2,240" },
      { to: "Vancouver", toCode: "YVR", flightTime: "5h 30m", economy: "$220-490", business: "$600-1,150", firstClass: "$1,200-2,400" },
      { to: "Guadalajara", toCode: "GDL", flightTime: "1h 10m", economy: "$50-120", business: "$150-280", firstClass: "$300-600" },
      { to: "Monterrey", toCode: "MTY", flightTime: "1h 30m", economy: "$60-140", business: "$180-340", firstClass: "$360-700" },
    ]
  },
  {
    city: "Guadalajara",
    country: "Mexico",
    countryCode: "mx",
    airportName: "Guadalajara International (Miguel Hidalgo)",
    code: "GDL",
    airlines: ["Aeroméxico", "Volaris", "VivaAerobus", "United", "American", "Alaska Airlines"],
    routes: [
      { to: "New York", toCode: "JFK", flightTime: "5h 00m", economy: "$200-420", business: "$520-980", firstClass: "$1,050-2,100" },
      { to: "Los Angeles", toCode: "LAX", flightTime: "3h 00m", economy: "$130-300", business: "$380-720", firstClass: "$760-1,520" },
      { to: "Dallas", toCode: "DFW", flightTime: "2h 30m", economy: "$130-300", business: "$380-720", firstClass: "$760-1,520" },
      { to: "Houston", toCode: "IAH", flightTime: "2h 15m", economy: "$120-280", business: "$350-660", firstClass: "$700-1,400" },
      { to: "Mexico City", toCode: "MEX", flightTime: "1h 10m", economy: "$50-120", business: "$150-280", firstClass: "$300-600" },
      { to: "Monterrey", toCode: "MTY", flightTime: "1h 20m", economy: "$55-130", business: "$165-310", firstClass: "$330-660" },
    ]
  },
  {
    city: "Monterrey",
    country: "Mexico",
    countryCode: "mx",
    airportName: "Monterrey International (Gen. Mariano Escobedo)",
    code: "MTY",
    airlines: ["Aeroméxico", "Volaris", "VivaAerobus", "United", "American", "Delta"],
    routes: [
      { to: "New York", toCode: "JFK", flightTime: "4h 20m", economy: "$180-380", business: "$480-900", firstClass: "$960-1,900" },
      { to: "Los Angeles", toCode: "LAX", flightTime: "3h 15m", economy: "$140-320", business: "$400-760", firstClass: "$800-1,600" },
      { to: "Dallas", toCode: "DFW", flightTime: "1h 45m", economy: "$100-240", business: "$300-560", firstClass: "$600-1,200" },
      { to: "Houston", toCode: "IAH", flightTime: "1h 30m", economy: "$90-210", business: "$270-500", firstClass: "$540-1,080" },
      { to: "Mexico City", toCode: "MEX", flightTime: "1h 30m", economy: "$60-140", business: "$180-340", firstClass: "$360-700" },
      { to: "Guadalajara", toCode: "GDL", flightTime: "1h 20m", economy: "$55-130", business: "$165-310", firstClass: "$330-660" },
    ]
  },
];

export default function DomesticFlights() {
  const [selectedCity, setSelectedCity] = useState<CityHub | null>(null);

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

          <div className="bg-gradient-to-br from-primary/20 to-accent/10 border border-primary/20 rounded-2xl p-6 mb-6">
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
                <p className="text-primary font-bold text-lg mb-1" data-testid="text-city-code">
                  {selectedCity.code}
                </p>
                <p className="text-sm text-muted-foreground">{selectedCity.airportName}</p>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h2 className="text-lg font-display font-bold text-white mb-3">Airlines Serving This Hub</h2>
            <div className="flex flex-wrap gap-2">
              {selectedCity.airlines.map((airline, index) => {
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

          <div>
            <div className="flex items-center space-x-2 mb-4">
              <MapPin className="w-5 h-5 text-accent" />
              <h2 className="text-lg font-display font-bold text-white">Flights to Host Cities</h2>
            </div>
            
            <div className="space-y-3">
              {selectedCity.routes.map((route, index) => (
                <div 
                  key={index}
                  className="bg-card border border-white/5 rounded-xl p-4 hover:border-primary/30 transition-colors"
                  data-testid={`card-route-${index}`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <Plane className="w-4 h-4 text-primary" />
                      <span className="font-bold text-white">{route.to}</span>
                      <span className="text-xs text-muted-foreground font-mono">({route.toCode})</span>
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
              Domestic Flights
            </h1>
            <p className="text-sm text-muted-foreground">Flights between all 16 host cities</p>
          </div>
        </div>
      </div>

      <div className="px-6 pb-24">
        <h2 className="text-lg font-display font-bold text-white mb-4">Select a Departure City</h2>
        
        <div className="space-y-3">
          {cityHubs.map((city, index) => (
            <button
              key={index}
              onClick={() => setSelectedCity(city)}
              className="w-full bg-card border border-white/5 rounded-xl p-4 hover:border-primary/30 transition-all group text-left"
              data-testid={`button-city-${index}`}
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
                    <h3 className="font-bold text-white group-hover:text-primary transition-colors">{city.city}</h3>
                    <p className="text-sm text-primary font-mono">{city.code}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-muted-foreground">{city.routes.length} routes</span>
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