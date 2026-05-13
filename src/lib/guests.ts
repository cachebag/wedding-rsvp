import { createFilter } from "./bloom";

const PLUS_ONE_NAMES = [
  "Carlos",
  "Adam",
  "Rola",
  "Yousef",
  "Nowar",
  "Kent",
  "Omair",
  "Max",
  "Ahmed",
  "Kylie",
  "Arun",
];

export const plusOneFilter = createFilter(PLUS_ONE_NAMES);
