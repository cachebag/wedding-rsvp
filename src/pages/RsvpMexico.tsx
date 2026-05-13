import { useState, useMemo, type FormEvent } from "react";
import { mightContain } from "@/lib/bloom";
import { plusOneFilter } from "@/lib/guests";
import { useEvent } from "@/lib/event-context";
import { ts } from "@/lib/i18n";

interface FormData {
  name: string;
  email: string;
  attending: string;
  dietary: string;
  message: string;
  plusFirstName: string;
  plusLastName: string;
}

const initial: FormData = {
  name: "",
  email: "",
  attending: "",
  dietary: "",
  message: "",
  plusFirstName: "",
  plusLastName: "",
};

export default function RsvpMexico() {
  const { locale } = useEvent();
  const [form, setForm] = useState<FormData>(initial);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const hasPlusOne = useMemo(() => {
    const trimmed = form.name.trim();
    const firstName = trimmed.split(/\s+/)[0] || "";
    return firstName.length >= 4 && mightContain(plusOneFilter, firstName);
  }, [form.name]);

  function update(field: keyof FormData, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMsg("");

    try {
      const res = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          attending: form.attending,
          plusFirstName: hasPlusOne ? form.plusFirstName : undefined,
          plusLastName: hasPlusOne ? form.plusLastName : undefined,
          dietary: form.dietary || undefined,
          message: form.message || undefined,
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

  return (
    <section className="bg-stone-50 min-h-screen">
      <div className="mx-auto max-w-xl px-6 py-20">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="w-12 border-b border-amber-300" />
            <span className="text-amber-700 text-xs tracking-[0.3em] uppercase">Mexico</span>
            <div className="w-12 border-b border-amber-300" />
          </div>
          <h1 className="font-script text-5xl md:text-6xl text-stone-900">
            {ts(locale, "rsvp")}
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm tracking-wide text-stone-500 mb-1">
              {ts(locale, "fullName")}
            </label>
            <input
              required
              type="text"
              value={form.name}
              onChange={(e) => update("name", e.target.value)}
              className="w-full border-b border-amber-200 py-2 text-stone-900 outline-none focus:border-amber-900 transition-colors bg-transparent"
            />
          </div>

          <div>
            <label className="block text-sm tracking-wide text-stone-500 mb-1">
              {ts(locale, "email")}
            </label>
            <input
              required
              type="email"
              value={form.email}
              onChange={(e) => update("email", e.target.value)}
              className="w-full border-b border-amber-200 py-2 text-stone-900 outline-none focus:border-amber-900 transition-colors bg-transparent"
            />
          </div>

          <div>
            <label className="block text-sm tracking-wide text-stone-500 mb-1">
              {ts(locale, "attendingLabel")}
            </label>
            <div className="flex gap-6 mt-2">
              {[acceptLabel, declineLabel].map((opt) => (
                <label key={opt} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="attending"
                    value={opt}
                    checked={form.attending === opt}
                    onChange={(e) => update("attending", e.target.value)}
                    className="accent-amber-900"
                    required
                  />
                  <span className="text-sm text-stone-700">{opt}</span>
                </label>
              ))}
            </div>
          </div>

          {hasPlusOne && (
            <div className="space-y-4 rounded-md border border-amber-200 p-5">
              <p className="text-sm tracking-wide text-stone-500">
                {ts(locale, "plusOneNote")}
              </p>
              <div>
                <label className="block text-sm tracking-wide text-stone-500 mb-1">
                  {ts(locale, "guestFirst")}
                </label>
                <input
                  type="text"
                  value={form.plusFirstName}
                  onChange={(e) => update("plusFirstName", e.target.value)}
                  className="w-full border-b border-amber-200 py-2 text-stone-900 outline-none focus:border-amber-900 transition-colors bg-transparent"
                />
              </div>
              <div>
                <label className="block text-sm tracking-wide text-stone-500 mb-1">
                  {ts(locale, "guestLast")}
                </label>
                <input
                  type="text"
                  value={form.plusLastName}
                  onChange={(e) => update("plusLastName", e.target.value)}
                  className="w-full border-b border-amber-200 py-2 text-stone-900 outline-none focus:border-amber-900 transition-colors bg-transparent"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-sm tracking-wide text-stone-500 mb-1">
              {ts(locale, "dietary")}
            </label>
            <input
              type="text"
              value={form.dietary}
              onChange={(e) => update("dietary", e.target.value)}
              placeholder={ts(locale, "dietaryPlaceholder")}
              className="w-full border-b border-amber-200 py-2 text-stone-900 outline-none focus:border-amber-900 transition-colors bg-transparent placeholder:text-stone-300"
            />
          </div>

          <div>
            <label className="block text-sm tracking-wide text-stone-500 mb-1">
              {ts(locale, "messageLabel")}
            </label>
            <textarea
              value={form.message}
              onChange={(e) => update("message", e.target.value)}
              rows={3}
              className="w-full border-b border-amber-200 py-2 text-stone-900 outline-none focus:border-amber-900 transition-colors bg-transparent resize-none"
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
