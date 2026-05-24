import { Routes, Route } from "react-router-dom";
import Layout from "@/components/Layout";
import Home from "@/pages/Home";
import Schedule from "@/pages/Schedule";
import Registry from "@/pages/Registry";
import Faqs from "@/pages/Faqs";
import Rsvp from "@/pages/Rsvp";
import RsvpMexico from "@/pages/RsvpMexico";
import Dashboard from "@/pages/Dashboard";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="mi" element={<Home />} />
        <Route path="mx" element={<Home />} />
        <Route path="schedule" element={<Schedule />} />
        <Route path="registry" element={<Registry />} />
        <Route path="faqs" element={<Faqs />} />
        <Route path="rsvp" element={<Rsvp />} />
        <Route path="rsvp-mexico" element={<RsvpMexico />} />
        <Route path="dashboard" element={<Dashboard />} />
      </Route>
    </Routes>
  );
}
