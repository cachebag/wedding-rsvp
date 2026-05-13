const translations = {
  en: {
    names: ["Sofia Ruiz-Sierra", "Akrm Al-Hakimi"],
    and: "and",
    date: "December 19, 2026",
    location: "Hacienda Cantalagua, Contepec, Michoacan",
    rsvp: "RSVP",
    travelTitle: "Travel Dates",
    travelBody: "Plan to arrive December 18 and depart December 20",
    transportTitle: "Transportation",
    transportBody:
      "Airport transportation to and from Hacienda Cantalagua will be arranged for all guests",
    accommodationsTitle: "Accommodations",
    accommodationsBody:
      "Rooms are available at the hacienda for the duration of your stay",
    bookRoom: "Book Your Room",
    moreDetails: "More details to come",
    fullName: "Full Name",
    email: "Email",
    attendingLabel: "Will you be attending?",
    accepts: "Joyfully Accepts",
    declines: "Regretfully Declines",
    dietary: "Dietary Restrictions",
    dietaryPlaceholder: "e.g., vegetarian, gluten-free",
    messageLabel: "Message for the Couple",
    submit: "Submit RSVP",
    submitting: "Submitting...",
    thankYou: "Thank You!",
    thankYouBody: "We've received your RSVP. We can't wait to celebrate with you!",
    guestFirst: "Guest First Name",
    guestLast: "Guest Last Name",
    plusOneNote: "You're welcome to bring a guest! Please provide their details.",
    travelingFrom: "Where will you be traveling from?",
    fromMexico: "Mexico",
    fromUS: "United States",
    scheduleTitle: "Schedule",
    ceremonyTime: "4:00 PM",
    ceremonyLabel: "Ceremony",
    ceremonyDesc: "Gather as we celebrate the union of Sofia & Akrm.",
    cocktailTime: "5:00 PM",
    cocktailLabel: "Cocktail Hour",
    cocktailDesc: "Enjoy drinks and hors d'oeuvres while we take photos.",
    receptionTime: "6:30 PM",
    receptionLabel: "Reception",
    receptionDesc: "Dinner, dancing, and celebration!",
    registryTitle: "Registry",
    registryBody:
      "Your presence at our wedding is the greatest gift of all. If you wish to honor us with a gift, our registry is linked below for you to browse.",
    viewRegistry: "View Our Registry",
  },
  es: {
    names: ["Sofia Ruiz-Sierra", "Akrm Al-Hakimi"],
    and: "y",
    date: "19 de Diciembre, 2026",
    location: "Hacienda Cantalagua, Contepec, Michoacan",
    rsvp: "Confirmar Asistencia",
    travelTitle: "Fechas de Viaje",
    travelBody: "Planea llegar el 18 de diciembre y salir el 20 de diciembre",
    transportTitle: "Transporte",
    transportBody:
      "Se organizara transporte desde el aeropuerto a la Hacienda Cantalagua para todos los invitados",
    accommodationsTitle: "Hospedaje",
    accommodationsBody:
      "Hay habitaciones disponibles en la hacienda durante su estancia",
    bookRoom: "Reserva Tu Habitacion",
    moreDetails: "Mas detalles por venir",
    fullName: "Nombre Completo",
    email: "Correo Electronico",
    attendingLabel: "Asistiras?",
    accepts: "Acepta con Gusto",
    declines: "Declina con Pesar",
    dietary: "Restricciones Alimentarias",
    dietaryPlaceholder: "ej., vegetariano, sin gluten",
    messageLabel: "Mensaje para la Pareja",
    submit: "Enviar Confirmacion",
    submitting: "Enviando...",
    thankYou: "Gracias!",
    thankYouBody:
      "Hemos recibido tu confirmacion. No podemos esperar para celebrar contigo!",
    guestFirst: "Nombre del Invitado",
    guestLast: "Apellido del Invitado",
    plusOneNote: "Puedes traer un acompanante! Por favor proporciona sus datos.",
    travelingFrom: "Desde donde viajaras?",
    fromMexico: "Mexico",
    fromUS: "Estados Unidos",
    scheduleTitle: "Itinerario",
    ceremonyTime: "4:00 PM",
    ceremonyLabel: "Ceremonia",
    ceremonyDesc: "Reunanse mientras celebramos la union de Sofia y Akrm.",
    cocktailTime: "5:00 PM",
    cocktailLabel: "Hora del Coctel",
    cocktailDesc:
      "Disfruten de bebidas y aperitivos mientras tomamos fotos.",
    receptionTime: "6:30 PM",
    receptionLabel: "Recepcion",
    receptionDesc: "Cena, baile y celebracion!",
    registryTitle: "Mesa de Regalos",
    registryBody:
      "Su presencia en nuestra boda es el mejor regalo de todos. Si desean honrarnos con un obsequio, nuestra mesa de regalos esta disponible a continuacion.",
    viewRegistry: "Ver Mesa de Regalos",
  },
} as const;

export type TranslationKey = keyof (typeof translations)["en"];

export function t(locale: "en" | "es", key: TranslationKey): string | readonly string[] {
  return translations[locale][key];
}

export function ts(locale: "en" | "es", key: TranslationKey): string {
  const val = translations[locale][key];
  return Array.isArray(val) ? val.join(", ") : val as string;
}
