import { createContext, useContext, useState, type ReactNode } from "react";

export type EventType = "auburn" | "mexico";
export type Locale = "en" | "es";

interface EventContextValue {
  event: EventType;
  setEvent: (e: EventType) => void;
  locale: Locale;
  setLocale: (l: Locale) => void;
}

const EventContext = createContext<EventContextValue | null>(null);

export function EventProvider({ children }: { children: ReactNode }) {
  const [event, setEvent] = useState<EventType>("auburn");
  const [locale, setLocale] = useState<Locale>("en");

  return (
    <EventContext.Provider value={{ event, setEvent, locale, setLocale }}>
      {children}
    </EventContext.Provider>
  );
}

export function useEvent() {
  const ctx = useContext(EventContext);
  if (!ctx) throw new Error("useEvent must be used within EventProvider");
  return ctx;
}
