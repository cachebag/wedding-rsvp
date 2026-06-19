import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { useLocation } from "react-router-dom";
import { SPANISH_ONLY } from "@/lib/site-config";

export type EventType = "auburn" | "mexico";
export type Locale = "en" | "es";
export type EventScope = "both" | "auburn" | "mexico";

const EVENT_KEY = "wedding-event";
const SCOPE_KEY = "wedding-scope";

function readStoredEvent(): EventType {
  if (SPANISH_ONLY) return "mexico";
  const stored = sessionStorage.getItem(EVENT_KEY);
  return stored === "mexico" ? "mexico" : "auburn";
}

function readStoredScope(): EventScope {
  if (SPANISH_ONLY) return "mexico";
  const stored = sessionStorage.getItem(SCOPE_KEY);
  if (stored === "auburn" || stored === "mexico") return stored;
  return "both";
}

export function homePathForScope(scope: EventScope): string {
  if (SPANISH_ONLY) return "/";
  if (scope === "auburn") return "/mi";
  if (scope === "mexico") return "/mx";
  return "/";
}

interface EventContextValue {
  event: EventType;
  setEvent: (e: EventType) => void;
  locale: Locale;
  setLocale: (l: Locale) => void;
  localeLocked: boolean;
  scope: EventScope;
  setScope: (s: EventScope) => void;
  homePath: string;
}

const EventContext = createContext<EventContextValue | null>(null);

export function EventProvider({ children }: { children: ReactNode }) {
  const [event, setEventState] = useState<EventType>(readStoredEvent);
  const [locale, setLocaleState] = useState<Locale>(SPANISH_ONLY ? "es" : "en");
  const [scope, setScopeState] = useState<EventScope>(readStoredScope);

  function setEvent(e: EventType) {
    if (SPANISH_ONLY) return;
    setEventState(e);
    sessionStorage.setItem(EVENT_KEY, e);
    if (e === "auburn") setLocaleState("en");
  }

  function setLocale(l: Locale) {
    if (SPANISH_ONLY) return;
    setLocaleState(l);
  }

  function setScope(s: EventScope) {
    if (SPANISH_ONLY) return;
    setScopeState(s);
    sessionStorage.setItem(SCOPE_KEY, s);
  }

  const homePath = homePathForScope(scope);

  return (
    <EventContext.Provider
      value={{
        event,
        setEvent,
        locale,
        setLocale,
        localeLocked: SPANISH_ONLY,
        scope,
        setScope,
        homePath,
      }}
    >
      {children}
    </EventContext.Provider>
  );
}

export function EventRouteSync() {
  const { pathname } = useLocation();
  const { setEvent, setScope } = useEvent();

  useEffect(() => {
    if (SPANISH_ONLY) {
      setScope("mexico");
      setEvent("mexico");
      return;
    }
    if (pathname === "/") {
      setScope("both");
    } else if (pathname === "/mi") {
      setScope("auburn");
      setEvent("auburn");
    } else if (pathname === "/mx") {
      setScope("mexico");
      setEvent("mexico");
    }
  }, [pathname, setEvent, setScope]);

  return null;
}

export function useEvent() {
  const ctx = useContext(EventContext);
  if (!ctx) throw new Error("useEvent must be used within EventProvider");
  return ctx;
}
