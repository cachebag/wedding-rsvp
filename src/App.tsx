import { Routes, Route } from "react-router-dom";
import Layout from "@/components/Layout";
import Home from "@/pages/Home";
import Schedule from "@/pages/Schedule";
import Registry from "@/pages/Registry";
import Faqs from "@/pages/Faqs";
import Rsvp from "@/pages/Rsvp";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="schedule" element={<Schedule />} />
        <Route path="registry" element={<Registry />} />
        <Route path="faqs" element={<Faqs />} />
        <Route path="rsvp" element={<Rsvp />} />
      </Route>
    </Routes>
  );
}
