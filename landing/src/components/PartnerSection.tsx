import { Handshake, Building2, Globe, ArrowRight } from "lucide-react";

const PartnerSection = () => {
  return (
    <section id="partners" className="py-20 bg-background relative overflow-hidden">
      {/* Interactive background pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-10 left-10 w-3 h-3 bg-primary/40 rounded-full animate-ping" />
        <div className="absolute top-32 right-20 w-2 h-2 bg-primary/30 rounded-full animate-ping" style={{ animationDelay: "0.5s" }} />
        <div className="absolute bottom-20 left-1/4 w-2 h-2 bg-primary/30 rounded-full animate-ping" style={{ animationDelay: "1s" }} />
        <div className="absolute bottom-40 right-1/3 w-3 h-3 bg-primary/40 rounded-full animate-ping" style={{ animationDelay: "1.5s" }} />
      </div>

      <div className="container relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Visual side */}
            <div className="relative">
              <div className="bg-gradient-to-br from-accent via-secondary to-accent rounded-2xl p-8 space-y-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="flex items-center gap-4 group">
                  <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:bg-primary/20 group-hover:scale-110">
                    <Building2 className="w-7 h-7 text-primary" />
                  </div>
                  <span className="text-lg font-semibold text-foreground">NGOs</span>
                  <ArrowRight className="w-5 h-5 text-primary/50 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="flex items-center gap-4 group">
                  <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:bg-primary/20 group-hover:scale-110">
                    <Globe className="w-7 h-7 text-primary" />
                  </div>
                  <span className="text-lg font-semibold text-foreground">INGOs</span>
                  <ArrowRight className="w-5 h-5 text-primary/50 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="flex items-center gap-4 group">
                  <div className="w-14 h-14 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/30 transition-all duration-300 group-hover:scale-110">
                    <Handshake className="w-7 h-7 text-primary-foreground" />
                  </div>
                  <span className="text-lg font-semibold text-primary">StreetSathi</span>
                  <ArrowRight className="w-5 h-5 text-primary ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                
                {/* Connection lines */}
                <div className="absolute left-[3.25rem] top-[4.5rem] w-0.5 h-[4.5rem] bg-gradient-to-b from-primary/20 to-primary/40 rounded-full" />
                <div className="absolute left-[3.25rem] top-[9rem] w-0.5 h-[4.5rem] bg-gradient-to-b from-primary/40 to-primary rounded-full" />
              </div>
              {/* Decorative */}
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-primary/10 rounded-full blur-xl animate-pulse" />
            </div>

            {/* Text content */}
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary font-semibold">
                <Handshake className="w-4 h-4" />
                Our Partners
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                Working Together for a Better Future
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                StreetSathi will collaborate with animal welfare NGOs and INGOs to make rescue responses faster. Whenever someone reports an injured or endangered dog, the platform will directly notify the partnered organizations so help can arrive as soon as possible.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PartnerSection;
