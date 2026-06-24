export const CITIES = [
  "Delhi",
  "Noida",
  "Gurgaon",
  "Faridabad",
  "Ghaziabad",
  "Greater Noida",
] as const;

export type City = (typeof CITIES)[number];
