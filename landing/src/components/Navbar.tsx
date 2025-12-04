import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 24);
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 border-b backdrop-blur-md transition-all duration-300",
        isScrolled ? "bg-background/95 border-border/80 shadow-lg" : "bg-background/60 border-transparent",
      )}
    >
      <div className="container flex items-center justify-between h-16">
        <Link
          to="/"
          className="flex items-center text-foreground transition-transform duration-300 hover:scale-105"
          aria-label="StreetSathi home"
        >
          <img
            src="/logo.png"
            alt="Street Sathi logo"
            className="w-20 h-20 -my-2 object-contain drop-shadow"
          />
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <a href="/#about" className="text-muted-foreground hover:text-primary transition-colors font-medium">
            About
          </a>
          <a href="/#partners" className="text-muted-foreground hover:text-primary transition-colors font-medium">
            Partners
          </a>
          <a href="/#mission" className="text-muted-foreground hover:text-primary transition-colors font-medium">
            Mission
          </a>
        </div>

        <Button variant="hero" size="sm" asChild>
          {/* Temporary Button Connection change later on */}
          <Link to="http://localhost:5173/login">Rescue Now</Link>
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;
