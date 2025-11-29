import { useState, useEffect } from "react";
import { Layout } from "@/components/Layout";
import { 
  Utensils, Hotel, Train, Info, Calendar, User, Settings, LogOut, Sparkles, ChevronRight
} from "lucide-react";
import { Link, useLocation } from "wouter";

export default function Menu() {
  const [, setLocation] = useLocation();
  const [showSignOut, setShowSignOut] = useState(false);
  const [userName, setUserName] = useState("World Cup Fan");

  useEffect(() => {
    const profile = localStorage.getItem("wc2026_profile");
    if (profile) {
      try {
        const parsed = JSON.parse(profile);
        if (parsed.displayName) {
          setUserName(parsed.displayName);
        }
      } catch (e) {}
    }
  }, []);

  const menuItems = [
    { icon: Train, label: "Transportation", color: "text-blue-400", href: "/transportation", active: true },
    { icon: Hotel, label: "Lodging", color: "text-purple-400", href: "/lodging", active: true },
    { icon: Utensils, label: "Dining", color: "text-orange-400", href: "/dining", active: true },
    { icon: Info, label: "Critical Info", color: "text-red-400", href: "/critical-info", active: true },
    { icon: Calendar, label: "Planner", color: "text-green-400", href: "/planner", active: true },
    { icon: Sparkles, label: "AI Concierge", color: "text-yellow-400", href: "/concierge", active: true },
  ];

  const handleSignOut = () => {
    localStorage.removeItem("wc2026_profile");
    localStorage.removeItem("wc2026_settings");
    setUserName("World Cup Fan");
    setShowSignOut(false);
    setLocation("/");
  };

  return (
    <Layout>
      <div className="pt-12 px-6 pb-8">
        <h1 className="text-4xl font-display font-bold text-white mb-8">Menu</h1>
        
        <div className="grid grid-cols-2 gap-4 mb-8">
          {menuItems.map((item, i) => (
            item.active ? (
              <Link 
                key={i} 
                href={item.href} 
                className="bg-card border border-white/5 p-4 rounded-xl flex flex-col items-center justify-center h-32 hover:bg-white/5 hover:border-white/10 transition-all active:scale-95"
                data-testid={`menu-item-${item.label.toLowerCase().replace(/\s+/g, '-')}`}
              >
                <item.icon className={`w-8 h-8 ${item.color} mb-3`} />
                <span className="font-bold text-white text-sm">{item.label}</span>
              </Link>
            ) : (
              <div 
                key={i} 
                className="bg-card border border-white/5 p-4 rounded-xl flex flex-col items-center justify-center h-32 opacity-50 cursor-not-allowed relative"
                data-testid={`menu-item-${item.label.toLowerCase().replace(/\s+/g, '-')}`}
              >
                <item.icon className={`w-8 h-8 ${item.color} mb-3`} />
                <span className="font-bold text-white text-sm">{item.label}</span>
                <span className="absolute bottom-2 text-[10px] text-muted-foreground">Coming Soon</span>
              </div>
            )
          ))}
        </div>

        <h2 className="text-xl font-display font-bold text-white mb-4">Account</h2>
        <div className="space-y-2">
          <Link 
            href="/profile" 
            className="w-full bg-card border border-white/5 p-4 rounded-xl flex items-center justify-between hover:bg-white/5 transition-colors"
            data-testid="menu-item-profile"
          >
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-emerald-600 flex items-center justify-center">
                <User className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="font-medium text-white block">{userName}</span>
                <span className="text-xs text-muted-foreground">View and edit profile</span>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          </Link>

          <Link 
            href="/settings" 
            className="w-full bg-card border border-white/5 p-4 rounded-xl flex items-center justify-between hover:bg-white/5 transition-colors"
            data-testid="menu-item-settings"
          >
            <div className="flex items-center space-x-3">
              <Settings className="w-5 h-5 text-muted-foreground" />
              <span className="font-medium text-white">Settings</span>
            </div>
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          </Link>

          {!showSignOut ? (
            <button 
              onClick={() => setShowSignOut(true)}
              className="w-full bg-card border border-white/5 p-4 rounded-xl flex items-center justify-between hover:bg-white/5 transition-colors"
              data-testid="menu-item-signout"
            >
              <div className="flex items-center space-x-3">
                <LogOut className="w-5 h-5 text-red-400" />
                <span className="font-medium text-red-400">Sign Out</span>
              </div>
            </button>
          ) : (
            <div className="bg-card border border-white/5 p-4 rounded-xl">
              <p className="text-white font-medium mb-2">Sign out?</p>
              <p className="text-sm text-muted-foreground mb-4">This will clear your profile and settings data.</p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowSignOut(false)}
                  className="flex-1 py-2 px-4 rounded-lg bg-white/10 text-white font-medium"
                  data-testid="button-cancel-signout"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSignOut}
                  className="flex-1 py-2 px-4 rounded-lg bg-red-500 text-white font-medium"
                  data-testid="button-confirm-signout"
                >
                  Sign Out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}