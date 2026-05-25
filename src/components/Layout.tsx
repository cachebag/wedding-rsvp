import { Outlet } from "react-router-dom";
import { useEvent } from "@/lib/event-context";
import Navbar from "./Navbar";

export default function Layout() {
  const isMexico = useEvent().event === "mexico";

  return (
    <div className={`min-h-screen ${isMexico ? "bg-stone-50" : "bg-white"}`}>
      <Navbar />
      <main>
        <Outlet />
      </main>
    </div>
  );
}
