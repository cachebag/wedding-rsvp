import { createFilter } from "./bloom";

const raw = import.meta.env.VITE_PLUS_ONE_NAMES ?? "";
const names = raw
  .split(",")
  .map((n: string) => n.trim())
  .filter(Boolean);

export const plusOneFilter = createFilter(names);
