import { useEvent } from "@/lib/event-context";
import { ts } from "@/lib/i18n";

export default function Registry() {
  const { event, locale } = useEvent();
  const isMexico = event === "mexico";
  const l = isMexico ? locale : "en";

  return (
    <section className="mx-auto max-w-2xl px-6 py-20 text-center">
      <h1 className={`font-script text-5xl md:text-6xl ${isMexico ? "text-stone-900" : "text-black"}`}>
        {ts(l, "registryTitle")}
      </h1>
      <p className={`mt-8 text-lg leading-relaxed ${isMexico ? "text-stone-600" : "text-neutral-600"}`}>
        {ts(l, "registryBody")}
      </p>

      <aside
        className={`mt-10 mx-auto max-w-xl rounded-md border-2 px-8 py-8 md:px-10 md:py-10 shadow-sm ${
          isMexico
            ? "border-amber-300 bg-white/80"
            : "border-neutral-300 bg-neutral-50"
        }`}
      >
        {l === "en" && (
          <>
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className={`flex-1 max-w-12 border-b ${isMexico ? "border-amber-400" : "border-neutral-400"}`} />
              <div className={`w-1.5 h-1.5 rotate-45 shrink-0 ${isMexico ? "bg-amber-600" : "bg-neutral-500"}`} />
              <div className={`flex-1 max-w-12 border-b ${isMexico ? "border-amber-400" : "border-neutral-400"}`} />
            </div>
            <p
              className={`text-lg md:text-xl font-medium tracking-wide leading-snug ${
                isMexico ? "text-amber-900" : "text-black"
              }`}
            >
              {ts(l, "registryNoteTitle")}
            </p>
          </>
        )}
        <p
          className={`${l === "en" ? "mt-5" : ""} text-base md:text-lg leading-relaxed ${
            isMexico ? "text-stone-700" : "text-neutral-700"
          }`}
        >
          {ts(l, "registryNote")}
        </p>
      </aside>

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
