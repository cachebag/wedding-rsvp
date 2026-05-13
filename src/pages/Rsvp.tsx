import { useState, useMemo, type FormEvent } from "react";
import { mightContain } from "@/lib/bloom";
import { plusOneFilter } from "@/lib/guests";

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

export default function Rsvp() {
  const [form, setForm] = useState<FormData>(initial);
  const [submitted, setSubmitted] = useState(false);

  const hasPlusOne = useMemo(
    () => form.name.trim().length > 0 && mightContain(plusOneFilter, form.name),
    [form.name]
  );

  function update(field: keyof FormData, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <section className="mx-auto max-w-xl px-6 py-20 text-center">
        <h1 className="font-script text-5xl md:text-6xl text-black">
          Thank You!
        </h1>
        <p className="mt-6 text-lg text-neutral-600">
          We've received your RSVP. We can't wait to celebrate with you!
        </p>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-xl px-6 py-20">
      <h1 className="font-script text-5xl md:text-6xl text-black text-center">
        RSVP
      </h1>
      <form onSubmit={handleSubmit} className="mt-12 space-y-6">
        <div>
          <label className="block text-sm tracking-wide text-neutral-500 mb-1">
            Full Name
          </label>
          <input
            required
            type="text"
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
            className="w-full border-b border-neutral-300 py-2 text-black outline-none focus:border-black transition-colors bg-transparent"
          />
        </div>

        <div>
          <label className="block text-sm tracking-wide text-neutral-500 mb-1">
            Email
          </label>
          <input
            required
            type="email"
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
            className="w-full border-b border-neutral-300 py-2 text-black outline-none focus:border-black transition-colors bg-transparent"
          />
        </div>

        <div>
          <label className="block text-sm tracking-wide text-neutral-500 mb-1">
            Will you be attending?
          </label>
          <div className="flex gap-6 mt-2">
            {["Joyfully Accepts", "Regretfully Declines"].map((opt) => (
              <label key={opt} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="attending"
                  value={opt}
                  checked={form.attending === opt}
                  onChange={(e) => update("attending", e.target.value)}
                  className="accent-black"
                  required
                />
                <span className="text-sm">{opt}</span>
              </label>
            ))}
          </div>
        </div>

        {hasPlusOne && (
          <div className="space-y-4 rounded-md border border-neutral-200 p-5">
            <p className="text-sm tracking-wide text-neutral-500">
              You're welcome to bring a guest! Please provide their details.
            </p>
            <div>
              <label className="block text-sm tracking-wide text-neutral-500 mb-1">
                Guest First Name
              </label>
              <input
                type="text"
                value={form.plusFirstName}
                onChange={(e) => update("plusFirstName", e.target.value)}
                className="w-full border-b border-neutral-300 py-2 text-black outline-none focus:border-black transition-colors bg-transparent"
              />
            </div>
            <div>
              <label className="block text-sm tracking-wide text-neutral-500 mb-1">
                Guest Last Name
              </label>
              <input
                type="text"
                value={form.plusLastName}
                onChange={(e) => update("plusLastName", e.target.value)}
                className="w-full border-b border-neutral-300 py-2 text-black outline-none focus:border-black transition-colors bg-transparent"
              />
            </div>
          </div>
        )}

        <div>
          <label className="block text-sm tracking-wide text-neutral-500 mb-1">
            Dietary Restrictions
          </label>
          <input
            type="text"
            value={form.dietary}
            onChange={(e) => update("dietary", e.target.value)}
            placeholder="e.g., vegetarian, gluten-free"
            className="w-full border-b border-neutral-300 py-2 text-black outline-none focus:border-black transition-colors bg-transparent placeholder:text-neutral-300"
          />
        </div>

        <div>
          <label className="block text-sm tracking-wide text-neutral-500 mb-1">
            Message for the Couple
          </label>
          <textarea
            value={form.message}
            onChange={(e) => update("message", e.target.value)}
            rows={3}
            className="w-full border-b border-neutral-300 py-2 text-black outline-none focus:border-black transition-colors bg-transparent resize-none"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-black text-white text-sm tracking-widest uppercase py-4 rounded-sm hover:bg-neutral-800 transition-colors mt-4"
        >
          Submit RSVP
        </button>
      </form>
    </section>
  );
}
