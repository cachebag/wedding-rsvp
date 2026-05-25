import MxRoomsFaqAnswer from "@/components/MxRoomsFaqAnswer";
import { useEvent } from "@/lib/event-context";
import { ts, type TranslationKey } from "@/lib/i18n";

type FaqEntry = { q: TranslationKey; a: TranslationKey; rooms?: boolean };

const auburnFaqs: FaqEntry[] = [
  { q: "faqArrivalQ", a: "faqArrivalA" },
  { q: "faqRsvpQ", a: "faqRsvpA" },
  { q: "faqLocationQ", a: "faqLocationA" },
  { q: "faqDressQ", a: "faqDressA" },
  { q: "faqPlusOneQ", a: "faqPlusOneA" },
  { q: "faqParkingQ", a: "faqParkingA" },
  { q: "faqVenueQ", a: "faqVenueA" },
];

const mexicoFaqs: FaqEntry[] = [
  { q: "mxFaqDressQ", a: "mxFaqDressA" },
  { q: "mxFaqTransportQ", a: "mxFaqTransportA" },
  { q: "mxFaqStayQ", a: "mxFaqStayA" },
  { q: "mxFaqRoomsQ", a: "mxFaqRoomsIntro", rooms: true },
  { q: "mxFaqRsvpQ", a: "mxFaqRsvpA" },
  { q: "mxFaqGuestsQ", a: "mxFaqGuestsA" },
  { q: "mxFaqVenueQ", a: "mxFaqVenueA" },
];

export default function Faqs() {
  const { event, locale } = useEvent();
  const isMexico = event === "mexico";
  const l = isMexico ? locale : "en";
  const faqs = isMexico ? mexicoFaqs : auburnFaqs;

  return (
    <section className="mx-auto max-w-2xl px-6 py-20">
      <h1 className={`font-script text-5xl md:text-6xl text-center ${isMexico ? "text-stone-900" : "text-black"}`}>
        {ts(l, "faqsTitle")}
      </h1>
      <div className={`mt-12 divide-y ${isMexico ? "divide-amber-200" : "divide-neutral-200"}`}>
        {faqs.map(({ q, a, rooms }) => (
          <div key={q} className="py-6">
            <h3 className={`text-lg font-medium ${isMexico ? "text-stone-900" : "text-black"}`}>{ts(l, q)}</h3>
            {rooms ? (
              <MxRoomsFaqAnswer locale={l} />
            ) : (
              <p className={`mt-2 leading-relaxed ${isMexico ? "text-stone-600" : "text-neutral-600"}`}>
                {ts(l, a)}
              </p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
