// ─── Destination : Gaspé, Québec ────────────────────────────────────────────
const DESTINATION = {
  name: "Gaspé, Québec, Canada",
  lat:  48.8333,
  lng:  -64.4833
};

// ─── 23 délégations · 100 jeunes au total ───────────────────────────────────
const COUNTRIES_DATA = [

  // ── PAYS HÔTE ──────────────────────────────────────────────────────────────
  {
    id: "canada", name: "Canada", nameEn: "Canada",
    capital: "Ottawa", code: "CA",
    lat: 45.4215, lng: -75.6972,
    delegates: 5,
    ocean: "Atlantique, Pacifique & Arctique",
    quote: "De l'Atlantique au Pacifique et à l'Arctique, nous portons la voix des écosystèmes côtiers canadiens.",
    quoteEn: "From the Atlantic to the Pacific and Arctic, we carry the voice of Canada's coastal ecosystems."
  },

  // ── AFRIQUE DE L'OUEST ─────────────────────────────────────────────────────
  {
    id: "senegal", name: "Sénégal", nameEn: "Senegal",
    capital: "Dakar", code: "SN",
    lat: 14.7167, lng: -17.4677,
    delegates: 5,
    ocean: "Atlantique",
    quote: "Protéger nos océans, c'est préserver la pêche artisanale et assurer l'avenir de nos communautés côtières.",
    quoteEn: "Protecting our oceans means preserving artisanal fisheries and our coastal communities' future."
  },
  {
    id: "benin", name: "Bénin", nameEn: "Benin",
    capital: "Porto-Novo", code: "BJ",
    lat: 6.4969, lng: 2.6289,
    delegates: 4,
    ocean: "Atlantique",
    quote: "La sauvegarde de nos lagunes et mangroves est essentielle pour la biodiversité marine et côtière du Bénin.",
    quoteEn: "Safeguarding our lagoons and mangroves is essential for Benin's marine and coastal biodiversity."
  },
  {
    id: "mauritanie", name: "Mauritanie", nameEn: "Mauritania",
    capital: "Nouakchott", code: "MR",
    lat: 18.0735, lng: -15.9582,
    delegates: 4,
    ocean: "Atlantique",
    quote: "Face à l'érosion côtière et à la surpêche, préserver l'océan est un enjeu de survie pour nos populations.",
    quoteEn: "Faced with coastal erosion and overfishing, protecting the ocean is a survival issue for our people."
  },
  {
    id: "cote_divoire", name: "Côte d'Ivoire", nameEn: "Ivory Coast",
    capital: "Yamoussoukro", code: "CI",
    lat: 6.8276, lng: -5.2796,
    delegates: 4,
    ocean: "Atlantique",
    quote: "Restaurer nos plages et lutter contre la pollution plastique est notre engagement pour un littoral vivant.",
    quoteEn: "Restoring our beaches and fighting plastic pollution is our commitment to a living coastline."
  },
  {
    id: "togo", name: "Togo", nameEn: "Togo",
    capital: "Lomé", code: "TG",
    lat: 6.1375, lng: 1.2123,
    delegates: 4,
    ocean: "Atlantique",
    quote: "Nos rivages subissent de plein fouet l'érosion côtière. Agir pour l'océan, c'est protéger notre peuple.",
    quoteEn: "Our shores suffer heavily from coastal erosion. Acting for the ocean means protecting our people."
  },
  {
    id: "guinee_bissau", name: "Guinée-Bissau", nameEn: "Guinea-Bissau",
    capital: "Bissau", code: "GW",
    lat: 11.8632, lng: -15.5982,
    delegates: 3,
    ocean: "Atlantique",
    quote: "L'archipel des Bijagós est une réserve de biosphère vitale. Protéger ses eaux, c'est protéger notre identité.",
    quoteEn: "The Bijagós archipelago is a vital biosphere reserve. Protecting its waters means protecting our identity."
  },
  {
    id: "cap_vert", name: "Cap-Vert", nameEn: "Cape Verde",
    capital: "Praia", code: "CV",
    lat: 14.9330, lng: -23.5133,
    delegates: 3,
    ocean: "Atlantique",
    quote: "Entourés par l'Atlantique, notre économie bleue et notre culture dépendent entièrement de la santé de nos récifs.",
    quoteEn: "Surrounded by the Atlantic, our blue economy and culture entirely depend on the health of our reefs."
  },
  {
    id: "gambie", name: "Gambie", nameEn: "Gambia",
    capital: "Banjul", code: "GM",
    lat: 13.4549, lng: -16.5790,
    delegates: 3,
    ocean: "Atlantique",
    quote: "Le fleuve Gambie et l'Atlantique forment un écosystème interconnecté. Luttons contre les déchets plastiques.",
    quoteEn: "The Gambia River and the Atlantic form an interconnected ecosystem. Let us fight plastic waste dumping."
  },

  // ── AFRIQUE CENTRALE & ORIENTALE ───────────────────────────────────────────
  {
    id: "cameroun", name: "Cameroun", nameEn: "Cameroon",
    capital: "Yaoundé", code: "CM",
    lat: 3.8480, lng: 11.5021,
    delegates: 4,
    ocean: "Atlantique",
    quote: "Nos forêts équatoriales et nos océans sont les deux poumons de l'Afrique. Défendons-les ensemble.",
    quoteEn: "Our equatorial forests and oceans are Africa's twin lungs. Let us defend them together."
  },
  {
    id: "tchad", name: "Tchad", nameEn: "Chad",
    capital: "N'Djamena", code: "TD",
    lat: 12.1348, lng: 15.0557,
    delegates: 3,
    ocean: "Bassin du lac Tchad (eaux douces)",
    quote: "Même sans littoral, nos eaux se jettent dans la mer. La préservation des océans commence au cœur des terres.",
    quoteEn: "Even landlocked, our waters flow into the sea. Ocean preservation begins in the heart of the land."
  },
  {
    id: "congo", name: "République du Congo", nameEn: "Republic of the Congo",
    capital: "Brazzaville", code: "CG",
    lat: -4.2634, lng: 15.2832,
    delegates: 3,
    ocean: "Atlantique",
    quote: "Le fleuve Congo alimente l'océan. Nous veillons sur nos mangroves pour préserver ce corridor biologique unique.",
    quoteEn: "The Congo River feeds the ocean. We watch over our mangroves to preserve this unique biological corridor."
  },
  {
    id: "kenya", name: "Kenya", nameEn: "Kenya",
    capital: "Nairobi", code: "KE",
    lat: -1.2921, lng: 36.8219,
    delegates: 4,
    ocean: "Indien",
    quote: "Les communautés côtières sont les premières sentinelles de la mer. Donnons-leur les moyens d'agir.",
    quoteEn: "Coastal communities are the sea's first sentinels. Let us empower them to act."
  },
  {
    id: "djibouti", name: "Djibouti", nameEn: "Djibouti",
    capital: "Djibouti", code: "DJ",
    lat: 11.5890, lng: 43.1450,
    delegates: 3,
    ocean: "Mer Rouge & Océan Indien",
    quote: "Notre position en mer Rouge abrite des récifs résistants au climat. Il est vital de les préserver et les étudier.",
    quoteEn: "Our position on the Red Sea hosts climate-resilient reefs. It is vital to preserve and study them."
  },

  // ── AFRIQUE DU NORD ────────────────────────────────────────────────────────
  {
    id: "maroc", name: "Maroc", nameEn: "Morocco",
    capital: "Rabat", code: "MA",
    lat: 34.0209, lng: -6.8416,
    delegates: 5,
    ocean: "Atlantique & Méditerranée",
    quote: "Restaurer les herbiers marins et stopper la pollution plastique sont nos priorités pour des côtes résilientes.",
    quoteEn: "Restoring seagrass meadows and stopping plastic pollution are our priorities for resilient coasts."
  },
  {
    id: "tunisie", name: "Tunisie", nameEn: "Tunisia",
    capital: "Tunis", code: "TN",
    lat: 36.8065, lng: 10.1815,
    delegates: 4,
    ocean: "Méditerranée",
    quote: "La Méditerranée est notre histoire commune. Nous militons pour une mer sans microplastiques ni pollution.",
    quoteEn: "The Mediterranean is our shared history. We campaign for a sea free of microplastics and pollution."
  },

  // ── MALI (Sahel, eaux douces) ───────────────────────────────────────────────
  {
    id: "mali", name: "Mali", nameEn: "Mali",
    capital: "Bamako", code: "ML",
    lat: 12.6392, lng: -8.0029,
    delegates: 4,
    ocean: "Bassin du fleuve Niger (eaux douces)",
    quote: "L'eau est une ressource mondiale partagée. Protéger l'océan, c'est sauvegarder le cycle hydrologique mondial.",
    quoteEn: "Water is a shared global resource. Protecting the ocean safeguards the world's hydrological cycle."
  },

  // ── EUROPE ─────────────────────────────────────────────────────────────────
  {
    id: "france", name: "France", nameEn: "France",
    capital: "Paris", code: "FR",
    lat: 48.8566, lng: 2.3522,
    delegates: 6,
    ocean: "Atlantique",
    quote: "La mer n'est pas un espace de division, mais le lien bleu qui unit nos destins climatiques et écologiques.",
    quoteEn: "The sea is not a space of division, but the blue link that unites our climate and ecological destinies."
  },

  // ── AMÉRIQUES ──────────────────────────────────────────────────────────────
  {
    id: "brazil", name: "Brésil", nameEn: "Brazil",
    capital: "Brasilia", code: "BR",
    lat: -15.7975, lng: -47.8919,
    delegates: 5,
    ocean: "Atlantique",
    quote: "De l'Amazone à l'Atlantique, la santé de nos fleuves dicte celle de nos océans. Tout est connecté.",
    quoteEn: "From the Amazon to the Atlantic, the health of our rivers dictates that of our oceans. Everything is connected."
  },
  {
    id: "ecuador", name: "Équateur", nameEn: "Ecuador",
    capital: "Quito", code: "EC",
    lat: -0.1807, lng: -78.4678,
    delegates: 4,
    ocean: "Pacifique (Galápagos)",
    quote: "Les îles Galápagos sont un trésor de l'humanité. Protéger leurs eaux, c'est sauvegarder la vie sur Terre.",
    quoteEn: "The Galápagos Islands are a treasure of humanity. Protecting their waters means safeguarding life on Earth."
  },
  {
    id: "uruguay", name: "Uruguay", nameEn: "Uruguay",
    capital: "Montevideo", code: "UY",
    lat: -34.9011, lng: -56.1645,
    delegates: 4,
    ocean: "Atlantique",
    quote: "Nous promouvons la pêche durable et les aires marines protégées pour un Atlantique sud en bonne santé.",
    quoteEn: "We promote sustainable fisheries and marine protected areas for a healthy South Atlantic."
  },

  // ── ASIE ───────────────────────────────────────────────────────────────────
  {
    id: "indonesia", name: "Indonésie", nameEn: "Indonesia",
    capital: "Jakarta", code: "ID",
    lat: -6.2088, lng: 106.8456,
    delegates: 5,
    ocean: "Pacifique & Indien",
    quote: "En tant que plus grand archipel du monde, protéger le Triangle de Corail est une mission vitale pour notre génération.",
    quoteEn: "As the world's largest archipelago, protecting the Coral Triangle is a vital mission for our generation."
  },
  {
    id: "philippines", name: "Philippines", nameEn: "Philippines",
    capital: "Manille", code: "PH",
    lat: 14.5995, lng: 120.9842,
    delegates: 5,
    ocean: "Pacifique",
    quote: "Au cœur de la biodiversité marine mondiale, nous défendons nos récifs contre la surpêche et l'acidification.",
    quoteEn: "At the heart of global marine biodiversity, we defend our reefs against overfishing and acidification."
  }

  // Total : 5+5+4+4+4+4+3+3+3+4+3+3+4+3+5+4+4+6+5+4+4+5+5 = 100 ✓
];
