import { Heart } from "lucide-react";
import streetCats from "@/assets/street-cats.jpg";

const AboutSection = () => {
  return (
    <section id="about" className="py-20 animated-bg-alt relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />

      <div className="container relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          {/* Image side */}
          <div className="relative group order-2 lg:order-1">
            <img
              src={streetCats}
              alt="Street cats in the community"
              className="w-full h-80 md:h-96 object-cover rounded-2xl shadow-xl transition-transform duration-500 group-hover:scale-[1.02]"
            />
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-primary/20 to-transparent" />
            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-primary/10 rounded-full blur-xl animate-pulse" />
          </div>

          {/* Text side */}
          <div className="space-y-6 order-1 lg:order-2">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary font-semibold">
              <Heart className="w-4 h-4" />
              About Us
            </div>
            
            <p className="text-lg text-muted-foreground leading-relaxed">
              We're a passionate team of animal lovers working to protect street & domestic animals across Nepal. StreetSathi was founded with a mission to connect compassion with action — rescuing, treating, and caring for our four-legged friends who deserve love and safety. Through community engagement, rapid response, and medical care, we strive to create a safer world for animals.
            </p>

            <div className="pt-6 border-t border-border/50">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                Every Street Deserves to Live
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                StreetSathi connects compassionate people with street dogs needing rescue and care. Together we're building a safer, healthier community for our four-legged friends.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
