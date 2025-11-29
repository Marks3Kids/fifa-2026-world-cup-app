import { Link, useLocation } from "wouter";
import { Home, Calendar, Flag, MapPin, Menu } from "lucide-react";
import { cn } from "@/lib/utils";

export function Navigation() {
  const [location] = useLocation();

  const items = [
    { icon: Home, label: "Home", path: "/" },
    { icon: Calendar, label: "Matches", path: "/matches" },
    { icon: Flag, label: "Teams", path: "/teams" },
    { icon: MapPin, label: "Cities", path: "/cities" },
    { icon: Menu, label: "More", path: "/menu" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-lg border-t border-white/10 pb-safe">
      <div className="flex items-center justify-around h-16 px-2 max-w-md mx-auto">
        {items.map(({ icon: Icon, label, path }) => {
          const isActive = location === path;
          return (
            <Link key={path} href={path} className={cn(
                "flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors duration-200",
                isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
              )}>
                <Icon className={cn("h-5 w-5", isActive && "fill-current")} />
                <span className="text-[10px] font-medium uppercase tracking-wide">{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}