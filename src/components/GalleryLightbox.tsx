import { useCallback, useEffect, useRef } from "react";
import { galleryImages } from "@/lib/gallery";

type Props = {
  index: number;
  isMexico: boolean;
  onClose: () => void;
  onIndexChange: (index: number) => void;
};

export default function GalleryLightbox({ index, isMexico, onClose, onIndexChange }: Props) {
  const touchStartX = useRef<number | null>(null);
  const count = galleryImages.length;

  const go = useCallback(
    (delta: number) => {
      onIndexChange((index + delta + count) % count);
    },
    [index, count, onIndexChange]
  );

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") go(-1);
      if (e.key === "ArrowRight") go(1);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go, onClose]);

  const btn = "bg-white/10 hover:bg-white/20 text-white border-white/20";

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col bg-black/95 backdrop-blur-md"
      role="dialog"
      aria-modal="true"
      aria-label="Photo gallery"
      onClick={onClose}
    >
      <div
        className="relative flex flex-1 min-h-0 flex-col"
        onClick={(e) => e.stopPropagation()}
        onTouchStart={(e) => {
          touchStartX.current = e.touches[0].clientX;
        }}
        onTouchEnd={(e) => {
          if (touchStartX.current === null) return;
          const diff = e.changedTouches[0].clientX - touchStartX.current;
          if (Math.abs(diff) > 48) go(diff > 0 ? -1 : 1);
          touchStartX.current = null;
        }}
      >
        <div className="flex items-center justify-between px-4 pt-4 pb-2">
          <p className="text-white/70 text-xs tracking-[0.25em] uppercase tabular-nums">
            {index + 1} / {count}
          </p>
          <button
            type="button"
            onClick={onClose}
            className={`rounded-full border px-3 py-1.5 text-xs tracking-widest uppercase transition-colors ${btn}`}
            aria-label="Close gallery"
          >
            Close
          </button>
        </div>

        <div className="relative flex flex-1 items-center justify-center px-2 md:px-16 min-h-0">
          <button
            type="button"
            onClick={() => go(-1)}
            className={`absolute left-2 md:left-6 z-10 h-11 w-11 rounded-full border flex items-center justify-center transition-colors ${btn}`}
            aria-label="Previous photo"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M15 6l-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          <img
            key={galleryImages[index].src}
            src={galleryImages[index].src}
            alt={galleryImages[index].alt}
            className="max-h-[min(72vh,720px)] max-w-full w-auto object-contain animate-[fadeIn_0.35s_ease-out]"
            draggable={false}
          />

          <button
            type="button"
            onClick={() => go(1)}
            className={`absolute right-2 md:right-6 z-10 h-11 w-11 rounded-full border flex items-center justify-center transition-colors ${btn}`}
            aria-label="Next photo"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>

        <div className="px-3 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-3">
          <div className="flex gap-2 overflow-x-auto snap-x snap-mandatory scrollbar-hide justify-start md:justify-center max-w-3xl mx-auto">
            {galleryImages.map((img, i) => (
              <button
                key={img.src}
                type="button"
                onClick={() => onIndexChange(i)}
                className={`snap-center shrink-0 overflow-hidden rounded-sm transition-all ${
                  i === index
                    ? isMexico
                      ? "ring-2 ring-amber-400 opacity-100 w-14 h-14 md:w-16 md:h-16"
                      : "ring-2 ring-white opacity-100 w-14 h-14 md:w-16 md:h-16"
                    : "opacity-45 hover:opacity-70 w-11 h-11 md:w-12 md:h-12"
                }`}
                aria-label={`View photo ${i + 1}`}
                aria-current={i === index}
              >
                <img src={img.src} alt="" className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
