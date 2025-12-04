import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="py-12 bg-foreground text-background">
      <div className="container">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3 text-xl font-bold">
            <img
              src="/logo.png"
              alt="Street Sathi logo"
              className="w-12 h-12 object-contain drop-shadow"
            />
            <span>StreetSathi</span>
          </div>

          <p className="text-background/70 text-center md:text-left">
            Every Street Deserves to Live — Made with love in Nepal
          </p>

          <div className="flex items-center gap-4 text-sm text-background/60">
            <span>@{new Date().getFullYear()} StreetSathi</span>
            <Link
              to="/donate"
              className="px-4 py-2 rounded-lg bg-primary text-primary-foreground font-semibold shadow hover:shadow-lg transition"
            >
              Donate Now
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
