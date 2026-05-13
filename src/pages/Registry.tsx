import { useEvent } from "@/lib/event-context";
import { ts } from "@/lib/i18n";

export default function Registry() {
  const { event, locale } = useEvent();
  const isMexico = event === "mexico";
  const l = isMexico ? locale : "en";

  return (
    <section className={`mx-auto max-w-2xl px-6 py-20 text-center ${isMexico ? "bg-stone-50 min-h-screen" : ""}`}>
      <h1 className={`font-script text-5xl md:text-6xl ${isMexico ? "text-stone-900" : "text-black"}`}>
        {ts(l, "registryTitle")}
      </h1>
      <p className={`mt-8 text-lg leading-relaxed ${isMexico ? "text-stone-600" : "text-neutral-600"}`}>
        {ts(l, "registryBody")}
      </p>
      <div className="mt-12 flex flex-col items-center gap-4">
        <a
          href="https://www.amazon.com/wedding/share/sofia-akrm"
          target="_blank"
          rel="noopener noreferrer"
          className={`w-full max-w-xs text-sm tracking-widest uppercase py-4 rounded-sm transition-colors ${
            isMexico
              ? "bg-amber-900 text-white hover:bg-amber-800"
              : "bg-black text-white hover:bg-neutral-800"
          }`}
        >
          {ts(l, "viewRegistry")}
        </a>
      </div>
    </section>
  );
}
