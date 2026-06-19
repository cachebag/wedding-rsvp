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
              {ts(locale, "joinUsIn")}
            </p>
            <h2 className="font-script text-5xl md:text-7xl lg:text-8xl text-white leading-tight drop-shadow-lg">
              {ts(locale, "mexicoHero")}
            </h2>
            <div className="mt-4 mx-auto w-16 border-b border-amber-300" />
          </div>
        </div>
      </section>

      <section className="flex flex-col items-center px-6 py-16 md:py-24 text-center">
        <div className="mb-6 flex items-center gap-4">
          <div className="w-12 border-b border-amber-300" />
          <span className="text-amber-700 text-xs tracking-[0.3em] uppercase">
            {ts(locale, "celebrationOf")}
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
          <div className="w-10 border-b border-amber-300" />
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          <InfoCard title={ts(locale, "travelTitle")} body={ts(locale, "travelBody")} />
          <InfoCard title={ts(locale, "transportTitle")} body={ts(locale, "transportBody")} />
        </div>
        <div className="mt-6">
          <div className="border border-amber-200 rounded-md p-6 md:p-8 text-center">
            <h3 className="text-xs tracking-[0.2em] uppercase text-amber-700 font-medium">
              {ts(locale, "accommodationsTitle")}
            </h3>
            <p className="mt-3 text-stone-700 leading-relaxed">{ts(locale, "mxFaqRoomsIntro")}</p>
            <ul className="mt-5 text-base text-stone-800 leading-relaxed space-y-2 text-left list-disc list-inside">
              <li>{ts(locale, "mxFaqRoomsItemNames")}</li>
              <li>{ts(locale, "mxFaqRoomsItemDates")}</li>
              <li>{ts(locale, "mxFaqRoomsItemEmail")}</li>
              <li>
                {ts(locale, "mxFaqRoomsItemRoomBefore")}
                <a
                  href="https://www.haciendacantalagua.com/rooms"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-amber-700 underline underline-offset-2 hover:text-amber-900"
                >
                  {ts(locale, "mxFaqRoomsBrowseLink")}
                </a>
              </li>
            </ul>
            <a
              href="https://wa.me/525549262133"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 bg-amber-900 text-white text-sm tracking-widest uppercase px-10 py-3 rounded-sm hover:bg-amber-800 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.126.555 4.126 1.526 5.858L.057 23.571a.75.75 0 00.92.92l5.713-1.469A11.94 11.94 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75a9.726 9.726 0 01-4.976-1.364l-.357-.213-3.712.954.972-3.712-.234-.371A9.726 9.726 0 012.25 12C2.25 6.615 6.615 2.25 12 2.25S21.75 6.615 21.75 12 17.385 21.75 12 21.75z"/>
              </svg>
              {ts(locale, "mxFaqRoomsWhatsApp")}
            </a>
            <p className="mt-2 text-sm text-stone-500 tracking-wide">{ts(locale, "mxFaqRoomsPhone")}</p>
          </div>
        </div>
      </section>

      <section className="flex justify-center px-6 pb-20 md:pb-28">
        <img
          src="/bottom.jpg"
          alt="Sofia and Akrm together"
          className="w-full max-w-3xl h-[50vh] md:h-[60vh] rounded-lg shadow-sm object-cover object-[center_58%]"
        />
      </section>
    </div>
  );
}

export default function Home() {
  const { event, scope } = useEvent();

  return (
    <>
      {scope === "both" && <EventToggle />}
      {event === "auburn" ? <AuburnHome /> : <MexicoHome />}
    </>
  );
}
