import { Link } from "react-router-dom";
import Countdown from "@/components/Countdown";

export default function Home() {
  return (
    <>
      <section className="w-full">
        <img
          src="/hero.jpg"
          alt="Sofia and Akrm engagement photo"
          className="w-full h-[55vh] md:h-[70vh] object-cover object-[center_45%]"
        />
      </section>

      <section className="flex flex-col items-center px-6 py-16 md:py-24 text-center">
        <h1 className="font-script text-5xl md:text-7xl lg:text-8xl text-black leading-tight">
          Sofia Ruiz-Sierra
        </h1>
        <p className="mt-4 text-lg md:text-xl text-neutral-500 tracking-widest">
          and
        </p>
        <h1 className="mt-4 font-script text-5xl md:text-7xl lg:text-8xl text-black leading-tight">
          Akrm Al-Hakimi
        </h1>
      </section>

      <section className="flex flex-col items-center px-6 pb-16 md:pb-24 text-center gap-5">
        <p className="font-script text-3xl md:text-4xl text-black">
          November 21, 2026
        </p>
        <p className="text-base md:text-lg tracking-wide text-neutral-700">
          Auburn Hills, MI
        </p>
        <Countdown />
        <Link
          to="/rsvp"
          className="mt-4 inline-block bg-black text-white text-sm md:text-base tracking-widest uppercase px-16 py-4 rounded-sm hover:bg-neutral-800 transition-colors"
        >
          RSVP
        </Link>
      </section>

      <section className="flex justify-center px-6 pb-20 md:pb-28">
        <img
          src="/bottom.jpg"
          alt="Sofia and Akrm together"
          className="w-full max-w-3xl h-[50vh] md:h-[60vh] rounded-lg shadow-sm object-cover object-[center_58%]"
        />
      </section>
    </>
  );
}
