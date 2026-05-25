import { NavLink, useLocation } from "react-router-dom";
import { useEvent } from "@/lib/event-context";

const subLinks = [
  { to: "/schedule", label: "Schedule" },
  { to: "/gallery", label: "Gallery" },
  { to: "/registry", label: "Registry" },
  { to: "/faqs", label: "FAQs" },
] as const;

const HOME_PATHS = ["/", "/mi", "/mx"];

function LanguageToggle() {
  const { locale, setLocale } = useEvent();

  return (
    <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center text-xs tracking-wide">
      <button
        onClick={() => setLocale("en")}
        className={`px-2 py-1 rounded-l-full border border-r-0 transition-colors ${
          locale === "en"
            ? "bg-amber-900 text-white border-amber-900"
            : "text-amber-700 border-amber-300 hover:bg-amber-50"
        }`}
      >
        EN
      </button>
      <button
        onClick={() => setLocale("es")}
        className={`px-2 py-1 rounded-r-full border transition-colors ${
          locale === "es"
            ? "bg-amber-900 text-white border-amber-900"
            : "text-amber-700 border-amber-300 hover:bg-amber-50"
        }`}
      >
        ES
      </button>
    </div>
  );
}

export default function Navbar() {
  const { event, homePath } = useEvent();
  const { pathname } = useLocation();
  const isMexico = event === "mexico";
  const isHome = HOME_PATHS.includes(pathname);

  const navLinks = [
    { to: homePath, label: "Home" },
    ...subLinks,
    { to: isMexico ? "/rsvp-mexico" : "/rsvp", label: "RSVP" },
  ];

  return (
    <header className={`w-full ${isMexico ? "bg-stone-50" : "bg-white"}`}>
      <div className="relative flex flex-col items-center pt-8 pb-4">
        <NavLink
          to={homePath}
          className={`font-script text-4xl md:text-5xl ${isMexico ? "text-stone-900" : "text-black"}`}
        >
          Sofia & Akrm
        </NavLink>
        <nav className="mt-5 flex items-center gap-6 md:gap-8 text-sm md:text-base tracking-wide">
          {navLinks.map(({ to, label }) => (
            <NavLink
              key={`${label}-${to}`}
              to={to}
              end={label === "Home"}
              className={({ isActive }) => {
                const active = label === "Home" ? isHome : isActive;
                return `pb-0.5 transition-colors ${
                  active
                    ? isMexico
                      ? "text-amber-900 border-b border-amber-900 font-medium"
                      : "text-black border-b border-black font-medium"
                    : isMexico
                      ? "text-stone-500 hover:text-amber-900"
                      : "text-neutral-600 hover:text-black"
                }`;
              }}
            >
              {label}
            </NavLink>
          ))}
        </nav>
        <div className={`mt-3 w-6 border-b ${isMexico ? "border-amber-300" : "border-neutral-300"}`} />
        {isMexico && <LanguageToggle />}
      </div>
    </header>
  );
}
