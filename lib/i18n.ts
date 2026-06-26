export type Lang = "es" | "ca" | "en"

export const LANGS: { code: Lang; label: string }[] = [
  { code: "es", label: "Español" },
  { code: "ca", label: "Català" },
  { code: "en", label: "English" },
]

export type Dict = {
  nav: {
    home: string
    points: string
    needs: string
    request: string
    resources: string
    admin: string
  }
  hero: {
    badge: string
    title: string
    subtitle: string
    ctaPoints: string
    ctaRequest: string
    schedule: string
  }
  whatsapp: {
    nav: string
    join: string
    cta: string
  }
  points: {
    title: string
    subtitle: string
    schedule: string
    address: string
    directions: string
    mapTitle: string
  }
  needs: {
    title: string
    subtitle: string
    note: string
  }
  request: {
    title: string
    subtitle: string
    name: string
    namePh: string
    contact: string
    contactPh: string
    location: string
    locationPh: string
    items: string
    itemsPh: string
    notes: string
    notesPh: string
    submit: string
    submitting: string
    success: string
    successMsg: string
    error: string
    another: string
  }
  distribution: {
    title: string
    body: string
    partner: string
    partnerDesc: string
    visit: string
  }
  about: {
    title: string
    body: string
  }
  resources: {
    title: string
    subtitle: string
    visit: string
  }
  footer: {
    tagline: string
    rights: string
  }
}

export const translations: Record<Lang, Dict> = {
  es: {
    nav: {
      home: "Inicio",
      points: "Puntos de recogida",
      needs: "Qué necesitamos",
      request: "Solicitar ayuda",
      resources: "Recursos",
      admin: "Administración",
    },
    hero: {
      badge: "Acción Directa Barcelona",
      title: "Ayuda directa para los afectados por el terremoto en Venezuela",
      subtitle:
        "Somos un grupo de personas en Barcelona que recogemos artículos de primera necesidad para enviarlos a Venezuela. Cada donación cuenta.",
      ctaPoints: "Ver puntos de recogida",
      ctaRequest: "Solicitar ayuda desde Venezuela",
      schedule: "Recogidas de 10h a 13h",
    },
    whatsapp: {
      nav: "WhatsApp",
      join: "Unirse al grupo de WhatsApp",
      cta: "Coordínate con nosotros: únete al grupo de WhatsApp para estar al día de recogidas y envíos.",
    },
    points: {
      title: "Puntos de recogida en Barcelona",
      subtitle: "Acércate a cualquiera de estos puntos en horario de 10h a 13h.",
      schedule: "10h - 13h",
      address: "Dirección",
      directions: "Cómo llegar",
      mapTitle: "Mapa de puntos de recogida",
    },
    needs: {
      title: "Qué necesitamos",
      subtitle: "Estos son los materiales médicos que estamos recogiendo ahora mismo.",
      note: "Campaña: \"Medicinas YA\" — Acopio de medicinas para los heridos en Venezuela.",
    },
    request: {
      title: "Solicitar ayuda desde Venezuela",
      subtitle:
        "Si estás en Venezuela y necesitas alguno de estos materiales, rellena el formulario y nos pondremos en contacto contigo.",
      name: "Nombre completo",
      namePh: "Tu nombre",
      contact: "Contacto (teléfono / email / WhatsApp)",
      contactPh: "Cómo podemos contactarte",
      location: "Ubicación en Venezuela",
      locationPh: "Ciudad, estado, zona",
      items: "Materiales que necesitas",
      itemsPh: "Describe qué necesitas y la cantidad aproximada",
      notes: "Notas adicionales (opcional)",
      notesPh: "Cualquier información que nos ayude",
      submit: "Enviar solicitud",
      submitting: "Enviando...",
      success: "¡Solicitud recibida!",
      successMsg: "Hemos recibido tu solicitud. Nuestro equipo la revisará y te contactará.",
      error: "Hubo un problema al enviar. Inténtalo de nuevo.",
      another: "Enviar otra solicitud",
    },
    distribution: {
      title: "¿Cómo llega la ayuda a Venezuela?",
      body: "Las medicinas recogidas se entregarán a través de una ONG de confianza con amplia experiencia en envíos humanitarios a Venezuela.",
      partner: "Meals4Hope",
      partnerDesc: "Llevan años trabajando con envíos humanitarios a Venezuela. Gente de nuestro equipo les conoce de hace tiempo y responden impecablemente. Nos garantizan que los insumos llegan a quienes los necesitan.",
      visit: "Ver su web",
    },
    about: {
      title: "Quiénes somos",
      body:
        "Acción Directa Barcelona es un grupo de voluntarios que organiza la recogida y el envío de artículos de primera necesidad a las personas afectadas por el terremoto en Venezuela. Trabajamos con total transparencia: registramos lo que recibimos y lo que enviamos, y a quién.",
    },
    resources: {
      title: "Otras páginas importantes",
      subtitle:
        "Recursos y plataformas de emergencia para reportar, buscar y coordinar ayuda en Venezuela.",
      visit: "Visitar sitio",
    },
    footer: {
      tagline: "Hasta el final, junto a Venezuela.",
      rights: "Acción Directa Barcelona. Hecho con solidaridad.",
    },
  },
  ca: {
    nav: {
      home: "Inici",
      points: "Punts de recollida",
      needs: "Què necessitem",
      request: "Sol·licitar ajuda",
      resources: "Recursos",
      admin: "Administració",
    },
    hero: {
      badge: "Acció Directa Barcelona",
      title: "Ajuda directa per als afectats pel terratrèmol a Veneçuela",
      subtitle:
        "Som un grup de persones a Barcelona que recollim articles de primera necessitat per enviar-los a Veneçuela. Cada donació compta.",
      ctaPoints: "Veure punts de recollida",
      ctaRequest: "Sol·licitar ajuda des de Veneçuela",
      schedule: "Recollides de 10h a 13h",
    },
    whatsapp: {
      nav: "WhatsApp",
      join: "Unir-se al grup de WhatsApp",
      cta: "Coordina't amb nosaltres: uneix-te al grup de WhatsApp per estar al dia de recollides i enviaments.",
    },
    points: {
      title: "Punts de recollida a Barcelona",
      subtitle: "Acosta't a qualsevol d'aquests punts en horari de 10h a 13h.",
      schedule: "10h - 13h",
      address: "Adreça",
      directions: "Com arribar",
      mapTitle: "Mapa de punts de recollida",
    },
    needs: {
      title: "Què necessitem",
      subtitle: "Aquests són els materials mèdics que estem recollint ara mateix.",
      note: "Campanya: \"Medicines JA\" — Recollida de medicines per als ferits a Veneçuela.",
    },
    request: {
      title: "Sol·licitar ajuda des de Veneçuela",
      subtitle:
        "Si ets a Veneçuela i necessites algun d'aquests materials, omple el formulari i ens posarem en contacte amb tu.",
      name: "Nom complet",
      namePh: "El teu nom",
      contact: "Contacte (telèfon / email / WhatsApp)",
      contactPh: "Com podem contactar-te",
      location: "Ubicació a Veneçuela",
      locationPh: "Ciutat, estat, zona",
      items: "Materials que necessites",
      itemsPh: "Descriu què necessites i la quantitat aproximada",
      notes: "Notes addicionals (opcional)",
      notesPh: "Qualsevol informació que ens ajudi",
      submit: "Enviar sol·licitud",
      submitting: "Enviant...",
      success: "Sol·licitud rebuda!",
      successMsg: "Hem rebut la teva sol·licitud. El nostre equip la revisarà i et contactarà.",
      error: "Hi ha hagut un problema en enviar. Torna-ho a provar.",
      another: "Enviar una altra sol·licitud",
    },
    distribution: {
      title: "Com arriba l'ajuda a Veneçuela?",
      body: "Les medicines recollides es lliuraran a través d'una ONG de confiança amb àmplia experiència en enviaments humanitaris a Veneçuela.",
      partner: "Meals4Hope",
      partnerDesc: "Porten anys treballant amb enviaments humanitaris a Veneçuela. Gent del nostre equip els coneix de fa temps i responen impecablement. Ens garanteixen que els insumos arriben a qui els necessita.",
      visit: "Veure el seu web",
    },
    about: {
      title: "Qui som",
      body:
        "Acció Directa Barcelona és un grup de voluntaris que organitza la recollida i l'enviament d'articles de primera necessitat a les persones afectades pel terratrèmol a Veneçuela. Treballem amb total transparència: registrem el que rebem i el que enviem, i a qui.",
    },
    resources: {
      title: "Altres pàgines importants",
      subtitle:
        "Recursos i plataformes d'emergència per informar, cercar i coordinar ajuda a Veneçuela.",
      visit: "Visitar lloc",
    },
    footer: {
      tagline: "Fins al final, al costat de Veneçuela.",
      rights: "Acció Directa Barcelona. Fet amb solidaritat.",
    },
  },
  en: {
    nav: {
      home: "Home",
      points: "Collection points",
      needs: "What we need",
      request: "Request aid",
      resources: "Resources",
      admin: "Admin",
    },
    hero: {
      badge: "Acción Directa Barcelona",
      title: "Direct aid for those affected by the earthquake in Venezuela",
      subtitle:
        "We are a group of people in Barcelona collecting essential supplies to send to Venezuela. Every donation counts.",
      ctaPoints: "See collection points",
      ctaRequest: "Request aid from Venezuela",
      schedule: "Drop-offs 10am to 1pm",
    },
    whatsapp: {
      nav: "WhatsApp",
      join: "Join the WhatsApp group",
      cta: "Coordinate with us: join the WhatsApp group to stay up to date on drop-offs and shipments.",
    },
    points: {
      title: "Collection points in Barcelona",
      subtitle: "Drop by any of these points between 10am and 1pm.",
      schedule: "10am - 1pm",
      address: "Address",
      directions: "Get directions",
      mapTitle: "Collection points map",
    },
    needs: {
      title: "What we need",
      subtitle: "These are the medical supplies we are collecting right now.",
      note: "Campaign: \"Medicines NOW\" — Collecting medicine for the injured in Venezuela.",
    },
    request: {
      title: "Request aid from Venezuela",
      subtitle:
        "If you are in Venezuela and need any of these supplies, fill out the form and we will get in touch with you.",
      name: "Full name",
      namePh: "Your name",
      contact: "Contact (phone / email / WhatsApp)",
      contactPh: "How we can reach you",
      location: "Location in Venezuela",
      locationPh: "City, state, area",
      items: "Supplies you need",
      itemsPh: "Describe what you need and approximate quantities",
      notes: "Additional notes (optional)",
      notesPh: "Anything that helps us",
      submit: "Submit request",
      submitting: "Submitting...",
      success: "Request received!",
      successMsg: "We have received your request. Our team will review it and contact you.",
      error: "There was a problem submitting. Please try again.",
      another: "Submit another request",
    },
    distribution: {
      title: "How does aid reach Venezuela?",
      body: "The collected medicines will be delivered through a trusted NGO with extensive experience in humanitarian shipments to Venezuela.",
      partner: "Meals4Hope",
      partnerDesc: "They have been working with humanitarian shipments to Venezuela for years. Members of our team have known them for a long time and they operate impeccably. They ensure the supplies reach those who need them.",
      visit: "Visit their website",
    },
    about: {
      title: "Who we are",
      body:
        "Acción Directa Barcelona is a group of volunteers organizing the collection and shipment of essential supplies to people affected by the earthquake in Venezuela. We work with full transparency: we log what we receive and what we send, and to whom.",
    },
    resources: {
      title: "Other important pages",
      subtitle:
        "Emergency resources and platforms to report, search and coordinate aid in Venezuela.",
      visit: "Visit site",
    },
    footer: {
      tagline: "To the end, alongside Venezuela.",
      rights: "Acción Directa Barcelona. Made with solidarity.",
    },
  },
}
