import { useEvent } from "@/lib/event-context";
import { ts } from "@/lib/i18n";

export default function Schedule() {
  const { event, locale } = useEvent();
  const isMexico = event === "mexico";
  const l = isMexico ? locale : "en";

  const items = [
    { time: ts(l, "ceremonyTime"), title: ts(l, "ceremonyLabel"), desc: ts(l, "ceremonyDesc") },
    { time: ts(l, "cocktailTime"), title: ts(l, "cocktailLabel"), desc: ts(l, "cocktailDesc") },
    { time: ts(l, "receptionTime"), title: ts(l, "receptionLabel"), desc: ts(l, "receptionDesc") },
  ];

  return (
    <section className={`mx-auto max-w-2xl px-6 py-20 text-center ${isMexico ? "bg-stone-50 min-h-screen" : ""}`}>
      <h1 className={`font-script text-5xl md:text-6xl ${isMexico ? "text-stone-900" : "text-black"}`}>
        {ts(l, "scheduleTitle")}
      </h1>
      <div className="mt-12 space-y-10">
        {items.map(({ time, title, desc }) => (
          <div key={title}>
            <p className={`text-sm tracking-widest uppercase ${isMexico ? "text-amber-700" : "text-neutral-400"}`}>
              {time}
            </p>
            <h3 className={`mt-2 text-xl font-medium ${isMexico ? "text-stone-900" : ""}`}>{title}</h3>
            <p className={`mt-1 ${isMexico ? "text-stone-600" : "text-neutral-600"}`}>{desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
