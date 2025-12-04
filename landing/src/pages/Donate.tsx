import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import { cn } from "@/lib/utils";

const Donate = () => {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const timeout = window.setTimeout(() => setIsReady(true), 60);
    return () => window.clearTimeout(timeout);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#f7fdfa] via-[#eef6f1] to-[#f7fdfa] text-[#113228]">
      <CustomCursor />
      <Navbar />
      <main
        className={cn(
          "flex-1 w-full pt-32 pb-16 px-4 transition-all duration-700",
          isReady ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
        )}
      >
        <section className="max-w-4xl mx-auto text-center space-y-4 bg-white/70 border border-white/60 rounded-[32px] shadow-xl shadow-primary/10 backdrop-blur-sm px-8 py-10">
          <p className="uppercase tracking-[0.35em] text-xs text-[#4a5d55] font-semibold">We&rsquo;re on a mission</p>
          <h1 className="text-3xl md:text-5xl font-extrabold text-[#0f2a1f]">
            Support Our Mission &mdash; Donate Now
          </h1>
          <p className="text-base md:text-lg text-[#4a5d55] max-w-2xl mx-auto">
            Every rupee helps us rescue, treat, and rehabilitate more street companions across Nepal. Scan the QR or
            use the bank details below to keep lifesaving work moving.
          </p>
        </section>

        <section className="max-w-5xl mx-auto mt-10 grid gap-6 md:gap-8 md:grid-cols-2">
          <article className="bg-white rounded-[28px] shadow-2xl shadow-primary/10 border border-white/80 p-8 text-center flex flex-col items-center">
            <div className="inline-flex items-center gap-2 text-primary font-semibold uppercase tracking-[0.25em] text-xs">
              Scan &amp; Give
            </div>
            <h2 className="text-2xl font-bold mt-2 mb-3 text-[#113228]">Instant Mobile Banking</h2>
            <div className="w-full bg-primary/5 rounded-[24px] p-6 flex items-center justify-center">
              <img src="/frame.png" alt="StreetSathi donation QR" className="max-w-[260px] w-full" />
            </div>
            <p className="text-[#4a5d55] text-sm mt-5">
              Open your preferred mobile banking app, scan the QR code, and confirm your contribution in seconds.
            </p>
          </article>

          <article className="bg-white rounded-[28px] shadow-2xl shadow-primary/10 border border-white/80 p-8">
            <div className="inline-flex items-center gap-2 text-primary font-semibold uppercase tracking-[0.25em] text-xs">
              Bank Transfer
            </div>
            <h2 className="text-2xl font-bold mt-2 mb-6 text-[#113228]">Account Details</h2>
            <ul className="space-y-4 text-sm md:text-base">
              <li className="flex flex-col bg-primary/5 rounded-2xl p-4">
                <span className="text-[#4a5d55] text-xs uppercase tracking-wide">Bank Name</span>
                <strong className="text-lg text-[#113228]">Nepal Animal Welfare Bank</strong>
              </li>
              <li className="flex flex-col bg-primary/5 rounded-2xl p-4">
                <span className="text-[#4a5d55] text-xs uppercase tracking-wide">Account Name</span>
                <strong className="text-lg text-[#113228]">StreetSathi Foundation</strong>
              </li>
              <li className="flex flex-col bg-primary/5 rounded-2xl p-4">
                <span className="text-[#4a5d55] text-xs uppercase tracking-wide">Account Number</span>
                <strong className="text-lg text-[#113228]">123456789012345</strong>
              </li>
              <li className="flex flex-col bg-primary/5 rounded-2xl p-4">
                <span className="text-[#4a5d55] text-xs uppercase tracking-wide">SWIFT Code</span>
                <strong className="text-lg text-[#113228]">NAWBNEPK</strong>
              </li>
              <li className="flex flex-col bg-primary/5 rounded-2xl p-4">
                <span className="text-[#4a5d55] text-xs uppercase tracking-wide">Branch</span>
                <strong className="text-lg text-[#113228]">Kathmandu</strong>
              </li>
            </ul>
          </article>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Donate;
