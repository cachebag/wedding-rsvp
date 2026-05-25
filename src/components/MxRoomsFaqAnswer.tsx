import { ts, type Locale } from "@/lib/i18n";

const ROOMS_URL = "https://www.haciendacantalagua.com/rooms";
const WHATSAPP_URL = "https://wa.me/525549262133";

export default function MxRoomsFaqAnswer({ locale }: { locale: Locale }) {
  const l = locale;

  return (
    <div className="mt-2 text-stone-600 leading-relaxed">
      <p>{ts(l, "mxFaqRoomsIntro")}</p>
      <ul className="mt-4 space-y-2 list-disc list-inside text-stone-700">
        <li>{ts(l, "mxFaqRoomsItemNames")}</li>
        <li>{ts(l, "mxFaqRoomsItemDates")}</li>
        <li>{ts(l, "mxFaqRoomsItemEmail")}</li>
        <li>
          {ts(l, "mxFaqRoomsItemRoomBefore")}
          <a
            href={ROOMS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-amber-700 underline underline-offset-2 hover:text-amber-900"
          >
            {ts(l, "mxFaqRoomsBrowseLink")}
          </a>
        </li>
      </ul>
      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-5 inline-flex items-center gap-2 bg-amber-900 text-white text-sm tracking-widest uppercase px-8 py-3 rounded-sm hover:bg-amber-800 transition-colors"
      >
        {ts(l, "mxFaqRoomsWhatsApp")}
      </a>
      <p className="mt-2 text-sm text-stone-500 tracking-wide">{ts(l, "mxFaqRoomsPhone")}</p>
    </div>
  );
}
