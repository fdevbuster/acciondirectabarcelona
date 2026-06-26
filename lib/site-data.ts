// WhatsApp group invitation link.
export const whatsappUrl = "https://chat.whatsapp.com/HVlcLTdjQMmKCG0zF0Gk1j?mode=gi_t"

export type CollectionPoint = {
  name: string
  address: string
  // Coordinates are optional: only points with verified coordinates show a precise map marker.
  coords?: { lat: number; lng: number }
}

export const collectionPoints: CollectionPoint[] = [
  {
    name: "Academia Odontología",
    address: "Carrer de Juan Sada 55",
  },
  {
    name: "Rest. Tío Papelón",
    address: "Carrer Sicilia 247",
    coords: { lat: 41.4027923, lng: 2.171687 },
  },
  {
    name: "Rest. El Tequeñón",
    address: "Carrer del Pantá de Tremp 47",
    coords: { lat: 41.4259226, lng: 2.1530438 },
  },
  {
    name: "Rest. Rincón de la Abuela",
    address: "Carrer Mallorca 470",
    coords: { lat: 41.4058359, lng: 2.1788147 },
  },
  {
    name: "Rest. Los Panas",
    address: "Carrer Aragó 40",
    coords: { lat: 41.3810298, lng: 2.1503986 },
  },
]

// Needed medical supplies, with a translation key for each language.
export const neededItems: { es: string; ca: string; en: string }[] = [
  { es: "Agua oxigenada", ca: "Aigua oxigenada", en: "Hydrogen peroxide" },
  { es: "Alcohol", ca: "Alcohol", en: "Alcohol" },
  { es: "Guantes descartables", ca: "Guants d'un sol ús", en: "Disposable gloves" },
  { es: "Guantes estériles", ca: "Guants estèrils", en: "Sterile gloves" },
  { es: "Gasas estériles", ca: "Gases estèrils", en: "Sterile gauze" },
  { es: "Equipos de infusión", ca: "Equips d'infusió", en: "Infusion sets" },
  { es: "Micro goteros", ca: "Microgoters", en: "Micro drip sets" },
  { es: "Macro goteros", ca: "Macrogoters", en: "Macro drip sets" },
  { es: "Paracetamol", ca: "Paracetamol", en: "Paracetamol" },
  { es: "Ibuprofeno", ca: "Ibuprofèn", en: "Ibuprofen" },
  { es: "Mascarillas", ca: "Mascaretes", en: "Face masks" },
  { es: "Solución salina", ca: "Solució salina", en: "Saline solution" },
  { es: "Termómetros", ca: "Termòmetres", en: "Thermometers" },
  { es: "Inyectadoras", ca: "Xeringues", en: "Syringes" },
  { es: "Vitamina K", ca: "Vitamina K", en: "Vitamin K" },
]

// Other important pages and emergency resources for Venezuela.
export const resourceLinks: {
  url: string
  domain: string
  desc: { es: string; ca: string; en: string }
}[] = [
  {
    url: "https://terremotovenezuela.app",
    domain: "terremotovenezuela.app",
    desc: {
      es: "Reportes, desaparecidos y mapa de emergencia.",
      ca: "Informes, desapareguts i mapa d'emergència.",
      en: "Reports, missing persons and emergency map.",
    },
  },
  {
    url: "https://venezuelatebusca.com",
    domain: "venezuelatebusca.com",
    desc: {
      es: "Busca familiares o amigos desaparecidos.",
      ca: "Cerca familiars o amics desapareguts.",
      en: "Search for missing family or friends.",
    },
  },
  {
    url: "https://sismovenezuela.com",
    domain: "sismovenezuela.com",
    desc: {
      es: "Mapa de calor consolidando múltiples fuentes.",
      ca: "Mapa de calor que consolida múltiples fonts.",
      en: "Heat map consolidating multiple sources.",
    },
  },
  {
    url: "https://venezuelareporta.org",
    domain: "venezuelareporta.org",
    desc: {
      es: "Registro y consulta de personas desaparecidas.",
      ca: "Registre i consulta de persones desaparegudes.",
      en: "Register and look up missing persons.",
    },
  },
  {
    url: "https://desaparecidosterremotovenezuela.com",
    domain: "desaparecidosterremotovenezuela.com",
    desc: {
      es: "Directorio de desaparecidos tras el terremoto.",
      ca: "Directori de desapareguts després del terratrèmol.",
      en: "Directory of people missing after the earthquake.",
    },
  },
  {
    url: "https://ayudavenezuela.app",
    domain: "ayudavenezuela.app",
    desc: {
      es: "Coordinación de ayuda y emergencias.",
      ca: "Coordinació d'ajuda i emergències.",
      en: "Aid and emergency coordination.",
    },
  },
  {
    url: "https://ayudasismo.org",
    domain: "ayudasismo.org",
    desc: {
      es: "Ayuda y coordinación ante sismos.",
      ca: "Ajuda i coordinació davant sismes.",
      en: "Help and coordination for earthquakes.",
    },
  },
]
