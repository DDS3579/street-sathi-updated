import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import streetDog1 from "@/assets/street-dog-1.jpg";
import streetDog2 from "@/assets/street-dog-2.jpg";
import streetDogs3 from "@/assets/street-dogs-3.jpg";

const HeroSection = () => {
  return (
    <section id="donate" className="min-h-screen pt-24 pb-16 flex items-center relative overflow-hidden animated-bg">

      <div className="container relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="space-y-6 opacity-0 animate-fade-in">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-foreground leading-tight">
              Street साथी —{" "}
              <span className="text-primary relative">
                Every Street Animal Deserves to Live
                <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 300 12" fill="none">
                  <path d="M2 8C50 4 100 2 150 6C200 10 250 4 298 8" stroke="hsl(161 67% 33%)" strokeWidth="3" strokeLinecap="round" className="animate-pulse" />
                </svg>
              </span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-xl">
              Street dogs can get hurt anytime and sometimes we can't reach them.
              StreetSathi helps make the rescue process easier so we can save more
              dogs.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <Button
                asChild
                variant="heroOutline"
                size="xl"
                className="bg-white text-primary border-white/80 shadow-xl !hover:bg-white !hover:text-primary"
              >
                {/* Temporary URL Connection change later on */}
                <Link to="http://localhost:5173/login">Rescue Now</Link>
              </Button>
              <Button asChild variant="hero" size="xl">
                <Link to="/donate">Donate Now</Link>
              </Button>
            </div>
          </div>

          {/* Image Collage */}
          <div className="relative opacity-0 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <div className="grid grid-cols-2 gap-4">
              {/* Main large image */}
              <div className="col-span-2 relative group">
                <img
                  src={streetDogs3}
                  alt="Three adorable street puppies looking at the camera"
                  className="w-full h-64 md:h-80 object-cover rounded-2xl shadow-xl transition-transform duration-500 group-hover:scale-[1.02]"
                />
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-primary/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              {/* Two smaller images */}
              <div className="relative group animate-float" style={{ animationDelay: "0.5s" }}>
                <img
                  src={streetDog1}
                  alt="A brown and white street dog sitting against a wall"
                  className="w-full h-40 md:h-48 object-cover rounded-xl shadow-lg transition-all duration-500 group-hover:shadow-2xl group-hover:-translate-y-1"
                />
                <div className="absolute inset-0 rounded-xl bg-gradient-to-t from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <div className="relative group animate-float" style={{ animationDelay: "1s" }}>
                <img
                  src={streetDog2}
                  alt="A resting street dog with soulful eyes"
                  className="w-full h-40 md:h-48 object-cover rounded-xl shadow-lg transition-all duration-500 group-hover:shadow-2xl group-hover:-translate-y-1"
                />
                <div className="absolute inset-0 rounded-xl bg-gradient-to-t from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
