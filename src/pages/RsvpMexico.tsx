import { useState, type FormEvent } from "react";
import { useEvent } from "@/lib/event-context";
import { ts } from "@/lib/i18n";

interface Guest {
  firstName: string;
  lastName: string;
}

export default function RsvpMexico() {
  const { locale } = useEvent();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [attending, setAttending] = useState("");
  const [travelingFrom] = useState("");
  const [bringingGuests, setBringingGuests] = useState<"" | "yes" | "no">("");
  const [guests, setGuests] = useState<Guest[]>([{ firstName: "", lastName: "" }]);
  const [dietary, setDietary] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  function updateGuest(idx: number, field: keyof Guest, value: string) {
    setGuests((prev) => prev.map((g, i) => (i === idx ? { ...g, [field]: value } : g)));
  }

  function addGuest() {
    setGuests((prev) => [...prev, { firstName: "", lastName: "" }]);
  }

  function removeGuest(idx: number) {
    setGuests((prev) => prev.filter((_, i) => i !== idx));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMsg("");

    const guestList =
      bringingGuests === "yes"
        ? guests.filter((g) => g.firstName.trim() || g.lastName.trim())
        : [];

    try {
      const res = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          phone,
          attending,
          travelingFrom: travelingFrom || undefined,
          guests: guestList.length > 0 ? guestList : undefined,
          dietary: dietary || undefined,
          message: message || undefined,
          event: "mexico",
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Something went wrong");
      }

      setStatus("success");
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <section className="mx-auto max-w-xl px-6 py-20 text-center bg-stone-50 min-h-[60vh]">
        <h1 className="font-script text-5xl md:text-6xl text-stone-900">
          {ts(locale, "thankYou")}
        </h1>
        <p className="mt-6 text-lg text-stone-600">
          {ts(locale, "thankYouBody")}
        </p>
      </section>
    );
  }

  const acceptLabel = ts(locale, "accepts");
  const declineLabel = ts(locale, "declines");
  const inp = "w-full border-b border-amber-300 py-2.5 text-lg text-stone-900 outline-none focus:border-amber-900 transition-colors bg-transparent";

  return (
    <section className="bg-stone-50 min-h-screen">
      <div className="mx-auto max-w-xl px-6 py-20">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="w-12 border-b border-amber-300" />
            <span className="text-amber-700 text-xs tracking-[0.3em] uppercase">{ts(locale, "mexicoHero")}</span>
            <div className="w-12 border-b border-amber-300" />
          </div>
          <h1 className="font-script text-5xl md:text-6xl text-stone-900">
            {ts(locale, "rsvp")}
          </h1>
        </div>

        <div className="mb-12 space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="border border-amber-200 rounded-md p-5 text-center">
              {ts(locale, "travelTitle") && (
                <h3 className="text-xs tracking-[0.2em] uppercase text-amber-700 font-medium">
                  {ts(locale, "travelTitle")}
                </h3>
              )}
              <p className={`${ts(locale, "travelTitle") ? "mt-2" : ""} text-sm text-stone-700 leading-relaxed`}>
                {ts(locale, "travelBody")}
              </p>
            </div>
            <div className="border border-amber-200 rounded-md p-5 text-center">
              <h3 className="text-xs tracking-[0.2em] uppercase text-amber-700 font-medium">
                {ts(locale, "transportTitle")}
              </h3>
              <p className="mt-2 text-sm text-stone-700 leading-relaxed">
                {ts(locale, "transportBody")}
              </p>
            </div>
          </div>
          <div className="border border-amber-200 rounded-md p-5 text-center">
            <h3 className="text-xs tracking-[0.2em] uppercase text-amber-700 font-medium">
              {ts(locale, "accommodationsTitle")}
            </h3>
            <p className="mt-2 text-sm text-stone-700 leading-relaxed">{ts(locale, "mxFaqRoomsIntro")}</p>
            <ul className="mt-4 text-sm text-stone-800 leading-relaxed space-y-2 text-left list-disc list-inside">
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
              className="inline-flex items-center gap-2 mt-4 bg-amber-900 text-white text-xs tracking-widest uppercase px-8 py-2.5 rounded-sm hover:bg-amber-800 transition-colors"
            >
              {ts(locale, "mxFaqRoomsWhatsApp")}
            </a>
            <p className="mt-2 text-sm text-stone-500 tracking-wide">{ts(locale, "mxFaqRoomsPhone")}</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8 text-lg">
          <div>
            <label className="block text-lg tracking-wide text-stone-700 mb-1">
              {ts(locale, "fullName")}
            </label>
            <input required type="text" value={name} onChange={(e) => setName(e.target.value)} className={inp} />
          </div>

          <div>
            <label className="block text-lg tracking-wide text-stone-700 mb-1">
              {ts(locale, "phone")}
            </label>
            <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} className={inp} />
          </div>

          <div>
            <label className="block text-lg tracking-wide text-stone-700 mb-1">
              {ts(locale, "attendingLabel")}
            </label>
            <div className="flex gap-6 mt-2">
              {[acceptLabel, declineLabel].map((opt) => (
                <label key={opt} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="attending"
                    value={opt}
                    checked={attending === opt}
                    onChange={(e) => setAttending(e.target.value)}
                    className="accent-amber-900"
                    required
                  />
                  <span className="text-lg text-stone-800">{opt}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-lg tracking-wide text-stone-700 mb-1">
              {ts(locale, "bringingGuests")}
            </label>
            <div className="flex gap-6 mt-2">
              {[
                { value: "yes" as const, label: ts(locale, "yes") },
                { value: "no" as const, label: ts(locale, "no") },
              ].map(({ value, label }) => (
                <label key={value} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="bringingGuests"
                    value={value}
                    checked={bringingGuests === value}
                    onChange={() => setBringingGuests(value)}
                    className="accent-amber-900"
                  />
                  <span className="text-lg text-stone-800">{label}</span>
                </label>
              ))}
            </div>
          </div>

          {bringingGuests === "yes" && (
            <div className="space-y-4 rounded-md border border-amber-200 p-5">
              {guests.map((g, idx) => (
                <div key={idx} className="flex items-end gap-3">
                  <div className="flex-1">
                    <label className="block text-lg tracking-wide text-stone-700 mb-1">
                      {ts(locale, "guestFirst")}
                    </label>
                    <input
                      type="text"
                      value={g.firstName}
                      onChange={(e) => updateGuest(idx, "firstName", e.target.value)}
                      className={inp}
                    />
                  </div>
                  <div className="flex-1">
                    <label className="block text-lg tracking-wide text-stone-700 mb-1">
                      {ts(locale, "guestLast")}
                    </label>
                    <input
                      type="text"
                      value={g.lastName}
                      onChange={(e) => updateGuest(idx, "lastName", e.target.value)}
                      className={inp}
                    />
                  </div>
                  {guests.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeGuest(idx)}
                      className="text-sm text-red-500 hover:text-red-700 pb-2 whitespace-nowrap"
                    >
                      {ts(locale, "removeGuest")}
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={addGuest}
                className="text-base text-amber-800 hover:text-amber-950 tracking-wide"
              >
                {ts(locale, "addGuest")}
              </button>
            </div>
          )}

          <div>
            <label className="block text-lg tracking-wide text-stone-700 mb-1">
              {ts(locale, "dietary")}
            </label>
            <input
              type="text"
              value={dietary}
              onChange={(e) => setDietary(e.target.value)}
              placeholder={ts(locale, "dietaryPlaceholder")}
              className={`${inp} placeholder:text-stone-300`}
            />
          </div>

          <div>
            <label className="block text-lg tracking-wide text-stone-700 mb-1">
              {ts(locale, "messageLabel")}
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={3}
              className={`${inp} resize-none`}
            />
          </div>

          {status === "error" && (
            <p className="text-red-600 text-sm">{errorMsg}</p>
          )}

          <button
            type="submit"
            disabled={status === "submitting"}
            className="w-full bg-amber-900 text-white text-sm tracking-widest uppercase py-4 rounded-sm hover:bg-amber-800 transition-colors mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {status === "submitting" ? ts(locale, "submitting") : ts(locale, "submit")}
          </button>
        </form>
      </div>
    </section>
  );
}
