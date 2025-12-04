import { Shield, Stethoscope, Users, Sparkles } from "lucide-react";

const missions = [
  {
    icon: Shield,
    title: "Rescue & Protection",
    description:
      "Protecting street dogs from harm and ensuring they receive proper care. We respond quickly to reports of dogs in danger, providing immediate rescue.",
  },
  {
    icon: Stethoscope,
    title: "Medical Care",
    description:
      "Every rescued dog receives full medical treatment, vaccines, and ongoing care.",
  },
  {
    icon: Users,
    title: "Community Building",
    description:
      "We educate communities on compassion and create networks of caring individuals.",
  },
];

const MissionSection = () => {
  return (
    <section id="mission" className="py-20 animated-bg-alt relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-20 right-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl animate-blob" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-accent/10 rounded-full blur-3xl animate-blob animation-delay-2000" />

      <div className="container relative z-10">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary font-semibold mb-4">
            <Sparkles className="w-4 h-4" />
            Our Mission
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            What We Do
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {missions.map((mission, index) => (
            <div
              key={mission.title}
              className="group bg-card p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2 opacity-0 animate-fade-in border border-border/50 hover:border-primary/20 relative overflow-hidden"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              {/* Hover gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative z-10">
                <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-6 transition-all duration-300 group-hover:bg-primary group-hover:shadow-lg group-hover:shadow-primary/30">
                  <mission.icon className="w-7 h-7 text-primary transition-colors duration-300 group-hover:text-primary-foreground" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">
                  {mission.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {mission.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MissionSection;
