import { useState, useEffect, useCallback } from "react";

interface Rsvp {
  id: number;
  name: string;
  email: string;
  attending: string;
  plus_first_name: string | null;
  plus_last_name: string | null;
  dietary: string | null;
  message: string | null;
  created_at: string;
}

function downloadCsv(rows: Rsvp[]) {
  const headers = [
    "Name",
    "Email",
    "Attending",
    "Plus-One First",
    "Plus-One Last",
    "Dietary",
    "Message",
    "Submitted",
  ];
  const escape = (v: string | null) => {
    if (!v) return "";
    const s = v.replace(/"/g, '""');
    return s.includes(",") || s.includes('"') || s.includes("\n")
      ? `"${s}"`
      : s;
  };
  const lines = rows.map((r) =>
    [
      r.name,
      r.email,
      r.attending,
      r.plus_first_name,
      r.plus_last_name,
      r.dietary,
      r.message,
      new Date(r.created_at).toLocaleDateString(),
    ]
      .map(escape)
      .join(",")
  );
  const csv = [headers.join(","), ...lines].join("\n");
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "rsvps.csv";
  a.click();
  URL.revokeObjectURL(url);
}

export default function Dashboard() {
  const [authed, setAuthed] = useState<boolean | null>(null);
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [rsvps, setRsvps] = useState<Rsvp[]>([]);
  const [loading, setLoading] = useState(false);

  const checkAuth = useCallback(async () => {
    const res = await fetch("/api/auth");
    const data = await res.json();
    setAuthed(data.authenticated);
  }, []);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const fetchRsvps = useCallback(async () => {
    setLoading(true);
    const res = await fetch("/api/rsvp");
    if (res.ok) {
      setRsvps(await res.json());
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    if (authed) fetchRsvps();
  }, [authed, fetchRsvps]);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoginError("");
    const res = await fetch("/api/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    if (res.ok) {
      setAuthed(true);
      setPassword("");
    } else {
      setLoginError("Invalid password");
    }
  }

  if (authed === null) {
    return (
      <div className="flex items-center justify-center py-32">
        <p className="text-neutral-400 text-lg">Loading...</p>
      </div>
    );
  }

  if (!authed) {
    return (
      <section className="mx-auto max-w-sm px-6 py-32">
        <h1 className="font-script text-4xl text-black text-center mb-10">
          Dashboard
        </h1>
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm tracking-wide text-neutral-500 mb-1">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border-b border-neutral-300 py-2 text-black outline-none focus:border-black transition-colors bg-transparent"
            />
          </div>
          {loginError && (
            <p className="text-red-600 text-sm">{loginError}</p>
          )}
          <button
            type="submit"
            className="w-full bg-black text-white text-sm tracking-widest uppercase py-3 rounded-sm hover:bg-neutral-800 transition-colors"
          >
            Sign In
          </button>
        </form>
      </section>
    );
  }

  const attending = rsvps.filter((r) => r.attending === "Joyfully Accepts");
  const declined = rsvps.filter((r) => r.attending === "Regretfully Declines");
  const totalGuests =
    attending.length +
    attending.filter((r) => r.plus_first_name).length;

  return (
    <section className="mx-auto max-w-5xl px-6 py-12">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-10">
        <h1 className="font-script text-4xl text-black">RSVPs</h1>
        <div className="flex gap-3">
          <button
            onClick={fetchRsvps}
            className="text-sm border border-neutral-300 px-4 py-2 rounded-sm hover:border-black transition-colors"
          >
            Refresh
          </button>
          <button
            onClick={() => downloadCsv(rsvps)}
            className="text-sm bg-black text-white px-4 py-2 rounded-sm hover:bg-neutral-800 transition-colors"
          >
            Download CSV
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
        <Stat label="Total RSVPs" value={rsvps.length} />
        <Stat label="Attending" value={attending.length} />
        <Stat label="Declined" value={declined.length} />
        <Stat label="Total Guests" value={totalGuests} />
      </div>

      {loading ? (
        <p className="text-neutral-400">Loading...</p>
      ) : rsvps.length === 0 ? (
        <p className="text-neutral-400 text-center py-12">
          No RSVPs yet.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-neutral-200">
                <Th>Name</Th>
                <Th>Email</Th>
                <Th>Status</Th>
                <Th>Plus-One</Th>
                <Th>Dietary</Th>
                <Th>Message</Th>
                <Th>Date</Th>
              </tr>
            </thead>
            <tbody>
              {rsvps.map((r) => (
                <tr key={r.id} className="border-b border-neutral-100">
                  <Td>{r.name}</Td>
                  <Td>{r.email}</Td>
                  <Td>
                    <span
                      className={
                        r.attending === "Joyfully Accepts"
                          ? "text-emerald-700"
                          : "text-red-600"
                      }
                    >
                      {r.attending === "Joyfully Accepts"
                        ? "Attending"
                        : "Declined"}
                    </span>
                  </Td>
                  <Td>
                    {r.plus_first_name
                      ? `${r.plus_first_name} ${r.plus_last_name ?? ""}`.trim()
                      : "—"}
                  </Td>
                  <Td>{r.dietary || "—"}</Td>
                  <Td className="max-w-[200px] truncate">
                    {r.message || "—"}
                  </Td>
                  <Td>{new Date(r.created_at).toLocaleDateString()}</Td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="border border-neutral-200 rounded-md p-4">
      <p className="text-xs tracking-widest uppercase text-neutral-400">
        {label}
      </p>
      <p className="mt-1 text-2xl font-medium text-black">{value}</p>
    </div>
  );
}

function Th({ children }: { children: React.ReactNode }) {
  return (
    <th className="py-3 pr-4 text-xs tracking-widest uppercase text-neutral-400 font-normal whitespace-nowrap">
      {children}
    </th>
  );
}

function Td({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <td className={`py-3 pr-4 whitespace-nowrap ${className}`}>{children}</td>
  );
}
