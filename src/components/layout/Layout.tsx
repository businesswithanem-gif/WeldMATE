import { Link, useLocation } from "wouter";
import { ReactNode } from "react";
import { Gauge, Activity, BookOpen, Wrench, Menu, FlaskConical, Zap } from "lucide-react";
import { useUnits } from "@/hooks/use-units";
import { Switch } from "@/components/ui/switch";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

const navItems = [
  { href: "/", label: "Calculator", icon: Gauge },
  { href: "/profiles", label: "Profiles", icon: BookOpen },
  { href: "/reference", label: "Reference", icon: Activity },
  { href: "/troubleshooting", label: "Troubleshooting", icon: Wrench },
  { href: "/indian-standards", label: "IS Standards", icon: FlaskConical },
];

export function Layout({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  const { system, toggleSystem } = useUnits();

  const isMetric = system === "metric";

  const NavLinks = ({ onClick }: { onClick?: () => void }) => (
    <>
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={`flex items-center gap-3 px-4 py-3 rounded-md transition-colors font-medium tracking-wide ${
            location === item.href
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:bg-secondary hover:text-foreground"
          }`}
          onClick={onClick}
          data-testid={`nav-${item.label.toLowerCase().replace(/\s+/g, "-")}`}
        >
          <item.icon className="h-5 w-5" />
          {item.label}
        </Link>
      ))}
    </>
  );

  return (
    <div className="flex min-h-screen bg-background text-foreground selection:bg-primary/30">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-64 border-r border-border bg-sidebar shadow-xl z-10">
        <div className="p-6 flex items-center gap-3">
          <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-primary/15 border border-primary/30">
            <Zap className="h-5 w-5 text-primary" strokeWidth={2.5} />
          </div>
          <h1 className="text-2xl font-display font-bold tracking-tight text-foreground uppercase">
            WELD<span className="text-primary">MATE</span>
          </h1>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-1">
          <NavLinks />
        </nav>

        <div className="p-6 border-t border-border/50">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium tracking-wide uppercase text-muted-foreground">Units</span>
            <div className="flex items-center gap-2 text-sm font-bold font-mono">
              <span className={!isMetric ? "text-primary" : "text-muted-foreground"}>IN</span>
              <Switch
                checked={isMetric}
                onCheckedChange={toggleSystem}
                data-testid="toggle-units"
                className="data-[state=checked]:bg-primary"
              />
              <span className={isMetric ? "text-primary" : "text-muted-foreground"}>MM</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile Header & Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="md:hidden flex items-center justify-between p-4 border-b border-border bg-sidebar">
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center w-7 h-7 rounded-md bg-primary/15 border border-primary/30">
              <Zap className="h-4 w-4 text-primary" strokeWidth={2.5} />
            </div>
            <h1 className="text-xl font-display font-bold tracking-tight uppercase">
              WELD<span className="text-primary">MATE</span>
            </h1>
          </div>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" data-testid="button-mobile-menu">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64 p-0 bg-sidebar border-r border-border">
              <div className="p-6 border-b border-border/50 flex items-center gap-3">
                <div className="flex items-center justify-center w-8 h-8 rounded-md bg-primary/15 border border-primary/30">
                  <Zap className="h-4 w-4 text-primary" strokeWidth={2.5} />
                </div>
                <h1 className="text-2xl font-display font-bold uppercase">
                  WELD<span className="text-primary">MATE</span>
                </h1>
              </div>
              <nav className="p-4 space-y-1">
                <NavLinks />
              </nav>
              <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-border/50 bg-sidebar">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium uppercase text-muted-foreground">Units</span>
                  <div className="flex items-center gap-2 text-sm font-bold font-mono">
                    <span className={!isMetric ? "text-primary" : "text-muted-foreground"}>IN</span>
                    <Switch checked={isMetric} onCheckedChange={toggleSystem} className="data-[state=checked]:bg-primary" />
                    <span className={isMetric ? "text-primary" : "text-muted-foreground"}>MM</span>
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </header>

        <main className="flex-1 p-4 md:p-8 overflow-y-auto">
          <div className="max-w-6xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
