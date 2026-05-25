export const galleryImages = [
  { src: "/hands.jpg", alt: "Sofia and Akrm", objectPosition: "center center" },
  { src: "/wall.jpg", alt: "Sofia and Akrm", objectPosition: "center 12%" },
  { src: "/behind.jpg", alt: "Sofia and Akrm", objectPosition: "center 58%" },
  { src: "/walking.jpg", alt: "Sofia and Akrm", objectPosition: "center" },
  { src: "/standing.jpg", alt: "Sofia and Akrm", objectPosition: "center top" },
  { src: "/closeup.jpg", alt: "Sofia and Akrm", objectPosition: "center 32%" },
  { src: "/stairs.jpg", alt: "Sofia and Akrm", objectPosition: "center" },
] as const;

/** Mosaic tile spans — same layout for MI and MX */
export const galleryTileSpans = [
  "col-span-2 row-span-2",
  "col-span-1 row-span-1",
  "col-span-1 row-span-1",
  "col-span-2 row-span-1",
  "col-span-1 row-span-2",
  "col-span-1 row-span-1",
  "col-span-1 row-span-1",
] as const;
