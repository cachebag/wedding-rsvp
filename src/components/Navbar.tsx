import { NavLink } from "react-router-dom";

const links = [
  { to: "/", label: "Home" },
  { to: "/schedule", label: "Schedule" },
  { to: "/registry", label: "Registry" },
  { to: "/faqs", label: "FAQs" },
  { to: "/rsvp", label: "RSVP" },
] as const;

export default function Navbar() {
  return (
    <header className="w-full bg-white">
      <div className="flex flex-col items-center pt-8 pb-4">
        <NavLink to="/" className="font-script text-4xl md:text-5xl text-black">
          Akrm & Sofia
        </NavLink>
        <nav className="mt-5 flex items-center gap-6 md:gap-8 text-sm md:text-base tracking-wide">
          {links.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === "/"}
              className={({ isActive }) =>
                `pb-0.5 transition-colors ${
                  isActive
                    ? "text-black border-b border-black font-medium"
                    : "text-neutral-600 hover:text-black"
                }`
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>
        <div className="mt-3 w-6 border-b border-neutral-300" />
      </div>
    </header>
  );
}
