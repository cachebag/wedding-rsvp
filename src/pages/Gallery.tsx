import { useState } from "react";
import GalleryLightbox from "@/components/GalleryLightbox";
import { useEvent } from "@/lib/event-context";
import { galleryImages } from "@/lib/gallery";

export default function Gallery() {
  const { event } = useEvent();
  const isMexico = event === "mexico";
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <>
      <section className="px-4 py-10 md:px-8 md:py-14">
        <div className="mx-auto flex w-full max-w-3xl flex-col gap-8 md:gap-12">
          {galleryImages.map((img, i) => (
            <button
              key={img.src}
              type="button"
              onClick={() => setOpenIndex(i)}
              className={`group relative block w-full overflow-hidden rounded-sm md:rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${
                isMexico ? "focus-visible:ring-amber-800" : "focus-visible:ring-black"
              }`}
            >
              <img
                src={img.src}
                alt={img.alt}
                loading={i < 2 ? "eager" : "lazy"}
                className="block w-full h-auto transition-transform duration-500 ease-out group-hover:scale-[1.01] group-active:scale-[1.005]"
              />
              <div className="pointer-events-none absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/10" />
              <span
                className={`absolute bottom-3 right-3 flex h-9 w-9 items-center justify-center rounded-full border opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:opacity-100 ${
                  isMexico
                    ? "border-white/30 bg-amber-900/60 text-white"
                    : "border-white/35 bg-black/45 text-white"
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
