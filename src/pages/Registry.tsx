export default function Registry() {
  return (
    <section className="mx-auto max-w-2xl px-6 py-20 text-center">
      <h1 className="font-script text-5xl md:text-6xl text-black">Registry</h1>
      <p className="mt-8 text-lg text-neutral-600 leading-relaxed">
        Your presence at our wedding is the greatest gift of all. If you wish to
        honor us with a gift, our registry is linked below for you to browse.
      </p>
      <div className="mt-12 flex flex-col items-center gap-4">
        <a
          href="https://www.amazon.com/wedding/share/sofia-akrm"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full max-w-xs bg-black text-white text-sm tracking-widest uppercase py-4 rounded-sm hover:bg-neutral-800 transition-colors"
        >
          View Our Registry
        </a>
      </div>
    </section>
  );
}
