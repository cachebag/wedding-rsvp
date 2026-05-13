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
    thankYouBody: "Hemos recibido tu confirmacion. No podemos esperar para celebrar contigo!",
    guestFirst: "Nombre del Invitado",
    guestLast: "Apellido del Invitado",
    plusOneNote: "Puedes traer un acompanante! Por favor proporciona sus datos.",
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
