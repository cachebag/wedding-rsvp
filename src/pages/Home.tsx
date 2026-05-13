import { Link } from "react-router-dom";
import Countdown from "@/components/Countdown";
import { useEvent } from "@/lib/event-context";
import { ts } from "@/lib/i18n";

const MEXICO_DATE = new Date("2026-12-19T16:00:00-06:00");

function EventToggle() {
  const { event, setEvent, setLocale } = useEvent();

  function select(e: "auburn" | "mexico") {
    setEvent(e);
    if (e === "auburn") setLocale("en");
  }

  return (
    <div className="flex justify-center py-6 px-4">
      <div className="inline-flex rounded-full border border-neutral-200 p-1 text-sm">
        <button
          onClick={() => select("auburn")}
          className={`px-5 py-2 rounded-full transition-all ${
            event === "auburn"
              ? "bg-black text-white shadow-sm"
              : "text-neutral-500 hover:text-black"
          }`}
        >
          Auburn Hills, MI
        </button>
        <button
          onClick={() => select("mexico")}
          className={`px-5 py-2 rounded-full transition-all ${
            event === "mexico"
              ? "bg-amber-900 text-white shadow-sm shadow-amber-900/20"
              : "text-neutral-500 hover:text-amber-900"
          }`}
        >
          Hacienda Cantalagua, MX
        </button>
      </div>
    </div>
  );
}

function AuburnHome() {
  return (
    <>
      <section className="w-full">
        <img
          src="/hero.jpg"
          alt="Sofia and Akrm engagement photo"
          className="w-full h-[55vh] md:h-[70vh] object-cover object-[center_45%]"
        />
      </section>

      <section className="flex flex-col items-center px-6 py-16 md:py-24 text-center">
        <h1 className="font-script text-5xl md:text-7xl lg:text-8xl text-black leading-tight">
          Sofia Ruiz-Sierra
        </h1>
        <p className="mt-4 text-lg md:text-xl text-neutral-500 tracking-widest">
          and
        </p>
        <h1 className="mt-4 font-script text-5xl md:text-7xl lg:text-8xl text-black leading-tight">
          Akrm Al-Hakimi
        </h1>
      </section>

      <section className="flex flex-col items-center px-6 pb-16 md:pb-24 text-center gap-5">
        <p className="font-script text-3xl md:text-4xl text-black">
          November 21, 2026
        </p>
        <p className="text-base md:text-lg tracking-wide text-neutral-700">
          Auburn Hills, MI
        </p>
        <Countdown />
        <Link
          to="/rsvp"
          className="mt-4 inline-block bg-black text-white text-sm md:text-base tracking-widest uppercase px-16 py-4 rounded-sm hover:bg-neutral-800 transition-colors"
        >
          RSVP
        </Link>
      </section>

      <section className="flex justify-center px-6 pb-20 md:pb-28">
        <img
          src="/bottom.jpg"
          alt="Sofia and Akrm together"
          className="w-full max-w-3xl h-[50vh] md:h-[60vh] rounded-lg shadow-sm object-cover object-[center_58%]"
        />
      </section>
    </>
  );
}

function InfoCard({ title, body }: { title: string; body: string }) {
  return (
    <div className="border border-amber-200 rounded-md p-6 md:p-8 text-center">
      <h3 className="text-xs tracking-[0.2em] uppercase text-amber-700 font-medium">
        {title}
      </h3>
      <p className="mt-3 text-stone-700 leading-relaxed">{body}</p>
    </div>
  );
}

function MexicoHome() {
  const { locale } = useEvent();

  return (
    <div className="bg-stone-50 min-h-screen">
      <section className="relative w-full h-[55vh] md:h-[70vh] overflow-hidden">
        <img
          src="/hero.jpg"
          alt="Sofia and Akrm"
          className="absolute inset-0 w-full h-full object-cover object-[center_45%]"
        />
        <div className="absolute inset-0 bg-amber-900/60 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-b from-amber-900/30 via-transparent to-stone-900/50" />
        <div className="absolute inset-0 opacity-15">
          <div className="absolute inset-4 md:inset-8 border border-amber-300" />
          <div className="absolute inset-6 md:inset-12 border border-amber-300" />
        </div>
        <div className="relative z-10 flex items-center justify-center h-full text-center px-6">
          <div>
            <p className="text-amber-200 text-xs md:text-sm tracking-[0.3em] uppercase mb-4">
              {locale === "es" ? "Los Esperamos En" : "Join Us In"}
            </p>
            <h2 className="font-script text-5xl md:text-7xl lg:text-8xl text-white leading-tight drop-shadow-lg">
              Mexico
            </h2>
            <div className="mt-4 mx-auto w-16 border-b border-amber-300" />
          </div>
        </div>
      </section>

      <section className="flex flex-col items-center px-6 py-16 md:py-24 text-center">
        <div className="mb-6 flex items-center gap-4">
          <div className="w-12 border-b border-amber-300" />
          <span className="text-amber-700 text-xs tracking-[0.3em] uppercase">
            {locale === "es" ? "La Celebracion De" : "The Celebration Of"}
          </span>
          <div className="w-12 border-b border-amber-300" />
        </div>
        <h1 className="font-script text-5xl md:text-7xl lg:text-8xl text-stone-900 leading-tight">
          Sofia Ruiz-Sierra
        </h1>
        <p className="mt-4 text-lg md:text-xl text-amber-700 tracking-widest">
          {ts(locale, "and")}
        </p>
        <h1 className="mt-4 font-script text-5xl md:text-7xl lg:text-8xl text-stone-900 leading-tight">
          Akrm Al-Hakimi
        </h1>
      </section>

      <section className="flex flex-col items-center px-6 pb-16 md:pb-24 text-center gap-5">
        <p className="font-script text-3xl md:text-4xl text-stone-900">
          {ts(locale, "date")}
        </p>
        <p className="text-base md:text-lg tracking-wide text-stone-600">
          {ts(locale, "location")}
        </p>
        <Countdown targetDate={MEXICO_DATE} className="text-stone-700" />
        <Link
          to="/rsvp-mexico"
          className="mt-4 inline-block bg-amber-900 text-white text-sm md:text-base tracking-widest uppercase px-16 py-4 rounded-sm hover:bg-amber-800 transition-colors"
        >
          {ts(locale, "rsvp")}
        </Link>
      </section>

      <section className="max-w-2xl mx-auto px-6 pb-16 md:pb-24">
        <div className="flex items-center gap-4 mb-8 justify-center">
          <div className="w-10 border-b border-amber-300" />
          <p className="text-xs tracking-[0.2em] uppercase text-amber-700 font-medium">
            {ts(locale, "visitingFromUS")}
          </p>
          <div className="w-10 border-b border-amber-300" />
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          <InfoCard title={ts(locale, "travelTitle")} body={ts(locale, "travelBody")} />
          <InfoCard title={ts(locale, "transportTitle")} body={ts(locale, "transportBody")} />
        </div>
        <div className="mt-6">
          <InfoCard title={ts(locale, "accommodationsTitle")} body={ts(locale, "accommodationsBody")} />
        </div>
        <div className="mt-6 flex justify-center">
          <a
            href="https://www.haciendacantalagua.com/rooms"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block border-2 border-amber-900 text-amber-900 text-sm tracking-widest uppercase px-12 py-4 rounded-sm hover:bg-amber-900 hover:text-white transition-colors"
          >
            {ts(locale, "bookRoom")}
          </a>
        </div>
      </section>

      <section className="pb-20 md:pb-28">
        <div className="max-w-lg mx-auto px-6">
          <div className="border border-dashed border-amber-300 rounded-md p-8 md:p-12 text-center">
            <div className="text-amber-700 text-xs tracking-[0.3em] uppercase mb-3">
              {locale === "es" ? "Proximamente" : "Stay Tuned"}
            </div>
            <p className="font-script text-2xl md:text-3xl text-stone-800">
              {ts(locale, "moreDetails")}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default function Home() {
  const { event } = useEvent();

  return (
    <>
      <EventToggle />
      {event === "auburn" ? <AuburnHome /> : <MexicoHome />}
    </>
  );
}
