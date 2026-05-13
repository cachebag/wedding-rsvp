import { useEffect, useState } from "react";

const WEDDING_DATE = new Date("2026-11-21T16:00:00-05:00");

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function calcTimeLeft(): TimeLeft {
  const diff = Math.max(0, WEDDING_DATE.getTime() - Date.now());
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

export default function Countdown() {
  const [time, setTime] = useState(calcTimeLeft);

  useEffect(() => {
    const id = setInterval(() => setTime(calcTimeLeft()), 1000);
    return () => clearInterval(id);
  }, []);

  const segments: { value: number; label: string }[] = [
    { value: time.days, label: "days" },
    { value: time.hours, label: "hours" },
    { value: time.minutes, label: "minutes" },
    { value: time.seconds, label: "seconds" },
  ];

  return (
    <div className="flex items-center justify-center gap-4 md:gap-6 text-base md:text-lg tracking-wide">
      {segments.map(({ value, label }) => (
        <span key={label} className="tabular-nums">
          {value} {label}
        </span>
      ))}
    </div>
  );
}
