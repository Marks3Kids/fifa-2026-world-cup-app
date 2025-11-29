import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { SubscriptionProvider } from "@/contexts/SubscriptionContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import Home from "@/pages/Home";
import Matches from "@/pages/Matches";
import Teams from "@/pages/Teams";
import Cities from "@/pages/Cities";
import Transportation from "@/pages/Transportation";
import InternationalFlights from "@/pages/InternationalFlights";
import DomesticFlights from "@/pages/DomesticFlights";
import RailServices from "@/pages/RailServices";
import BusServices from "@/pages/BusServices";
import CarRentals from "@/pages/CarRentals";
import Dining from "@/pages/Dining";
import Lodging from "@/pages/Lodging";
import Planner from "@/pages/Planner";
import CriticalInfo from "@/pages/CriticalInfo";
import Concierge from "@/pages/Concierge";
import Profile from "@/pages/Profile";
import Settings from "@/pages/Settings";
import Menu from "@/pages/Menu";
import Pricing from "@/pages/Pricing";
import CheckoutSuccess from "@/pages/CheckoutSuccess";
import Upgrade from "@/pages/Upgrade";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      {/* Public routes */}
      <Route path="/pricing" component={Pricing} />
      <Route path="/checkout/success" component={CheckoutSuccess} />
      <Route path="/upgrade" component={Upgrade} />

      {/* Basic tier routes - accessible with any subscription */}
      <Route path="/">
        <ProtectedRoute requiredTier="basic">
          <Home />
        </ProtectedRoute>
      </Route>
      <Route path="/teams">
        <ProtectedRoute requiredTier="basic">
          <Teams />
        </ProtectedRoute>
      </Route>
      <Route path="/cities">
        <ProtectedRoute requiredTier="basic">
          <Cities />
        </ProtectedRoute>
      </Route>
      <Route path="/menu">
        <ProtectedRoute requiredTier="basic">
          <Menu />
        </ProtectedRoute>
      </Route>
      <Route path="/profile">
        <ProtectedRoute requiredTier="basic">
          <Profile />
        </ProtectedRoute>
      </Route>
      <Route path="/settings">
        <ProtectedRoute requiredTier="basic">
          <Settings />
        </ProtectedRoute>
      </Route>

      {/* Premier tier routes - require Premier Pass */}
      <Route path="/matches">
        <ProtectedRoute requiredTier="premier">
          <Matches />
        </ProtectedRoute>
      </Route>
      <Route path="/transportation">
        <ProtectedRoute requiredTier="premier">
          <Transportation />
        </ProtectedRoute>
      </Route>
      <Route path="/transportation/international-flights">
        <ProtectedRoute requiredTier="premier">
          <InternationalFlights />
        </ProtectedRoute>
      </Route>
      <Route path="/transportation/domestic-flights">
        <ProtectedRoute requiredTier="premier">
          <DomesticFlights />
        </ProtectedRoute>
      </Route>
      <Route path="/transportation/rail-services">
        <ProtectedRoute requiredTier="premier">
          <RailServices />
        </ProtectedRoute>
      </Route>
      <Route path="/transportation/bus-services">
        <ProtectedRoute requiredTier="premier">
          <BusServices />
        </ProtectedRoute>
      </Route>
      <Route path="/transportation/car-rentals">
        <ProtectedRoute requiredTier="premier">
          <CarRentals />
        </ProtectedRoute>
      </Route>
      <Route path="/dining">
        <ProtectedRoute requiredTier="premier">
          <Dining />
        </ProtectedRoute>
      </Route>
      <Route path="/lodging">
        <ProtectedRoute requiredTier="premier">
          <Lodging />
        </ProtectedRoute>
      </Route>
      <Route path="/planner">
        <ProtectedRoute requiredTier="premier">
          <Planner />
        </ProtectedRoute>
      </Route>
      <Route path="/critical-info">
        <ProtectedRoute requiredTier="premier">
          <CriticalInfo />
        </ProtectedRoute>
      </Route>
      <Route path="/critical">
        <ProtectedRoute requiredTier="premier">
          <CriticalInfo />
        </ProtectedRoute>
      </Route>
      <Route path="/concierge">
        <ProtectedRoute requiredTier="premier">
          <Concierge />
        </ProtectedRoute>
      </Route>

      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <SubscriptionProvider>
        <Router />
        <Toaster />
      </SubscriptionProvider>
    </QueryClientProvider>
  );
}

export default App;
