import { useEffect, useState, useCallback } from "react";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function calcTimeLeft(target: Date): TimeLeft {
  const diff = Math.max(0, target.getTime() - Date.now());
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

interface CountdownProps {
  targetDate?: Date;
  className?: string;
}

const AUBURN_DATE = new Date("2026-11-21T16:00:00-05:00");

export default function Countdown({ targetDate = AUBURN_DATE, className = "" }: CountdownProps) {
  const calc = useCallback(() => calcTimeLeft(targetDate), [targetDate]);
  const [time, setTime] = useState(calc);

  useEffect(() => {
    setTime(calc());
    const id = setInterval(() => setTime(calc()), 1000);
    return () => clearInterval(id);
  }, [calc]);

  const segments: { value: number; label: string }[] = [
    { value: time.days, label: "days" },
    { value: time.hours, label: "hours" },
    { value: time.minutes, label: "minutes" },
    { value: time.seconds, label: "seconds" },
  ];

  return (
    <div className={`flex items-center justify-center gap-4 md:gap-6 text-base md:text-lg tracking-wide ${className}`}>
      {segments.map(({ value, label }) => (
        <span key={label} className="tabular-nums">
          {value} {label}
        </span>
      ))}
    </div>
  );
}
