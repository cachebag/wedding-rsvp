import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { EventProvider, EventRouteSync } from "@/lib/event-context";
import App from "./App";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <EventProvider>
        <EventRouteSync />
        <App />
      </EventProvider>
    </BrowserRouter>
  </StrictMode>
);
