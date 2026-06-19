import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useEvent } from "@/lib/event-context";
import { ts, type TranslationKey } from "@/lib/i18n";

const subLinks: { to: string; labelKey: TranslationKey }[] = [
  { to: "/schedule", labelKey: "navSchedule" },
  { to: "/gallery", labelKey: "navGallery" },
  { to: "/registry", labelKey: "navRegistry" },
  { to: "/faqs", labelKey: "navFaqs" },
];

const HOME_PATHS = ["/", "/mi", "/mx"];

function LanguageToggle() {
  const { locale, setLocale } = useEvent();

  return (
    <div className="flex items-center text-xs tracking-wide">
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
  const { event, homePath, locale, localeLocked } = useEvent();
  const { pathname } = useLocation();
  const isMexico = event === "mexico";
  const isHome = HOME_PATHS.includes(pathname);
  const l = isMexico ? locale : "en";
  const [open, setOpen] = useState(false);

  const navLinks = [
    { to: homePath, label: ts(l, "navHome"), isHomeLink: true },
    ...subLinks.map(({ to, labelKey }) => ({ to, label: ts(l, labelKey), isHomeLink: false })),
    { to: isMexico ? "/rsvp-mexico" : "/rsvp", label: ts(l, "rsvp"), isHomeLink: false },
  ];

  const linkClass = (active: boolean) =>
    `transition-colors ${
      active
        ? isMexico
          ? "text-amber-900 font-medium"
          : "text-black font-medium"
        : isMexico
          ? "text-stone-500 hover:text-amber-900"
          : "text-neutral-600 hover:text-black"
    }`;

  return (
    <header className={`w-full sticky top-0 z-50 ${isMexico ? "bg-stone-50" : "bg-white"}`}>
      {/* ── desktop ── */}
      <div className="hidden md:flex relative flex-col items-center pt-8 pb-4">
        <NavLink
          to={homePath}
          className={`font-script text-5xl ${isMexico ? "text-stone-900" : "text-black"}`}
        >
          Sofia & Akrm
        </NavLink>
        <nav className="mt-5 flex items-center gap-8 text-base tracking-wide">
          {navLinks.map(({ to, label, isHomeLink }) => (
            <NavLink
              key={`${label}-${to}`}
              to={to}
              end={isHomeLink}
              className={({ isActive }) => {
                const active = isHomeLink ? isHome : isActive;
                return `pb-0.5 border-b border-transparent ${linkClass(active)} ${
                  active ? (isMexico ? "border-amber-900" : "border-black") : ""
                }`;
              }}
            >
              {label}
            </NavLink>
          ))}
        </nav>
        <div className={`mt-3 w-6 border-b ${isMexico ? "border-amber-300" : "border-neutral-300"}`} />
        {isMexico && !localeLocked && (
          <div className="absolute right-4 top-1/2 -translate-y-1/2">
            <LanguageToggle />
          </div>
        )}
      </div>

      {/* ── mobile ── */}
      <div className="md:hidden">
        <div className="flex items-center justify-between px-5 pt-6 pb-3">
          <NavLink
            to={homePath}
            className={`font-script text-3xl ${isMexico ? "text-stone-900" : "text-black"}`}
          >
            Sofia & Akrm
          </NavLink>
          <div className="flex items-center gap-3">
            {isMexico && !localeLocked && <LanguageToggle />}
            <button
              onClick={() => setOpen((o) => !o)}
              aria-label="Toggle menu"
              className={`flex items-center gap-1.5 p-1 text-xs tracking-widest uppercase ${isMexico ? "text-stone-600" : "text-neutral-600"}`}
            >
              {open ? (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  <span>{ts(l, "navMenuClose")}</span>
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                  </svg>
                  <span>{ts(l, "navMenuOpen")}</span>
                </>
              )}
            </button>
          </div>
        </div>
        <div className={`mt-3 mx-5 border-b ${isMexico ? "border-amber-200" : "border-neutral-200"}`} />

        {open && (
          <nav className="flex flex-col px-5 py-4 gap-5 text-base tracking-wide">
            {navLinks.map(({ to, label, isHomeLink }) => (
              <NavLink
                key={`${label}-${to}`}
                to={to}
                end={isHomeLink}
                onClick={() => setOpen(false)}
                className={({ isActive }) => {
                  const active = isHomeLink ? isHome : isActive;
                  return linkClass(active);
                }}
              >
                {label}
              </NavLink>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}
