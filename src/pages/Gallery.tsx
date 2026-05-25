import { useState } from "react";
import GalleryLightbox from "@/components/GalleryLightbox";
import { useEvent } from "@/lib/event-context";
import { galleryImages, galleryTileSpans } from "@/lib/gallery";

export default function Gallery() {
  const { event } = useEvent();
  const isMexico = event === "mexico";
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <>
      <section className="min-h-[calc(100vh-12rem)] px-3 py-8 md:px-10 md:py-14">
        <div className="mx-auto max-w-5xl grid grid-cols-2 gap-1.5 md:gap-2 auto-rows-[minmax(9.5rem,38vw)] sm:auto-rows-[minmax(11rem,32vw)] md:auto-rows-[minmax(9rem,16vw)]">
          {galleryImages.map((img, i) => (
            <button
              key={img.src}
              type="button"
              onClick={() => setOpenIndex(i)}
              className={`group relative overflow-hidden rounded-sm md:rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${
                galleryTileSpans[i]
              } ${isMexico ? "focus-visible:ring-amber-800" : "focus-visible:ring-black"}`}
            >
              <img
                src={img.src}
                alt={img.alt}
                loading={i < 2 ? "eager" : "lazy"}
                style={{ objectPosition: img.objectPosition }}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-[650ms] ease-out group-hover:scale-[1.04] group-active:scale-[1.02]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-black/5 opacity-80 transition-opacity duration-300 group-hover:opacity-100" />
              <div className="absolute inset-0 ring-1 ring-inset ring-black/10 pointer-events-none" />
              <span
                className={`absolute bottom-2.5 right-2.5 flex h-8 w-8 items-center justify-center rounded-full border backdrop-blur-sm transition-transform duration-300 group-hover:scale-110 ${
                  isMexico
                    ? "border-white/30 bg-amber-900/50 text-white"
                    : "border-white/35 bg-black/35 text-white"
                }`}
                aria-hidden
              >
                <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M8 4H4v4M20 4h-4v4M4 16v4h4M16 20h4v-4" strokeLinecap="round" />
                </svg>
              </span>
            </button>
          ))}
        </div>
      </section>

      {openIndex !== null && (
        <GalleryLightbox
          index={openIndex}
          isMexico={isMexico}
          onClose={() => setOpenIndex(null)}
          onIndexChange={setOpenIndex}
        />
      )}
    </>
  );
}
