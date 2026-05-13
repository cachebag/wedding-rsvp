import { useEvent } from "@/lib/event-context";
import { ts, type TranslationKey } from "@/lib/i18n";

const auburnSchedule: { time: TranslationKey; title: TranslationKey; desc: TranslationKey }[] = [
  { time: "ceremonyTime", title: "ceremonyLabel", desc: "ceremonyDesc" },
  { time: "cocktailTime", title: "cocktailLabel", desc: "cocktailDesc" },
  { time: "receptionTime", title: "receptionLabel", desc: "receptionDesc" },
];

const mexicoSchedule: { time: TranslationKey; title: TranslationKey; desc: TranslationKey }[] = [
  { time: "mxCeremonyTime", title: "mxCeremonyLabel", desc: "mxCeremonyDesc" },
  { time: "mxCocktailTime", title: "mxCocktailLabel", desc: "mxCocktailDesc" },
  { time: "mxReceptionTime", title: "mxReceptionLabel", desc: "mxReceptionDesc" },
];

export default function Schedule() {
  const { event, locale } = useEvent();
  const isMexico = event === "mexico";
  const l = isMexico ? locale : "en";
  const items = isMexico ? mexicoSchedule : auburnSchedule;

  return (
    <section className={`mx-auto max-w-2xl px-6 py-20 text-center ${isMexico ? "bg-stone-50 min-h-screen" : ""}`}>
      <h1 className={`font-script text-5xl md:text-6xl ${isMexico ? "text-stone-900" : "text-black"}`}>
        {ts(l, "scheduleTitle")}
      </h1>
      <div className="mt-12 space-y-10">
        {items.map(({ time, title, desc }) => (
          <div key={title}>
            <p className={`text-sm tracking-widest uppercase ${isMexico ? "text-amber-700" : "text-neutral-400"}`}>
              {ts(l, time)}
            </p>
            <h3 className={`mt-2 text-xl font-medium ${isMexico ? "text-stone-900" : ""}`}>{ts(l, title)}</h3>
            <p className={`mt-1 ${isMexico ? "text-stone-600" : "text-neutral-600"}`}>{ts(l, desc)}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
