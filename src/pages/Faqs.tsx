const faqs = [
  {
    q: "What time should I arrive by?",
    a: "Please arrive by 4:15-4:30 PM for the ceremony.",
  },
  {
    q: "When should I RSVP by?",
    a: "Please RSVP by September 1, 2026.",
  },
  {
    q: "Where is the venue located?",
    a: "The venue is located at 3391 Cross Creek Pkwy, Auburn Hills, MI 48326.",
  },
  {
    q: "What is the dress code?",
    a: "Formal attire. Kindly refrain from red or white.",
  },
  {
    q: "Can I bring a plus one?",
    a: "We kindly ask that only those listed on the invitation attend. If you received a plus one, it will be noted on your invite.",
  },
  {
    q: "Will there be parking?",
    a: "Yes, complimentary parking is available on-site at the venue.",
  },
  {
    q: "Is the venue indoors or outdoors?",
    a: "The ceremony and reception will both be held indoors.",
  },
];

export default function Faqs() {
  return (
    <section className="mx-auto max-w-2xl px-6 py-20">
      <h1 className="font-script text-5xl md:text-6xl text-black text-center">
        FAQs
      </h1>
      <div className="mt-12 divide-y divide-neutral-200">
        {faqs.map(({ q, a }) => (
          <div key={q} className="py-6">
            <h3 className="text-lg font-medium text-black">{q}</h3>
            <p className="mt-2 text-neutral-600 leading-relaxed">{a}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
