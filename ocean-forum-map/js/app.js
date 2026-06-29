/* ═══════════════════════════════════════════════════════════════
   CONFIGURATION & DATA
═══════════════════════════════════════════════════════════════ */
const TEX = {
  night:     '//unpkg.com/three-globe/example/img/earth-night.jpg',
  satellite: '//unpkg.com/three-globe/example/img/earth-blue-marble.jpg',
  bump:      '//unpkg.com/three-globe/example/img/earth-topology.png'
};

const DESTINATION = {
  name: "Gaspé, Québec, Canada",
  lat:  48.8333,
  lng:  -64.4833
};

const GEO_SOURCES = [
  'https://raw.githubusercontent.com/PublicaMundi/MappingAPI/master/data/geojson/countries.geojson',
  'https://raw.githubusercontent.com/datasets/geo-countries/master/data/countries.geojson',
  'https://unpkg.com/three-globe/example/img/ne_110m_admin_0_countries.geojson'
];

/* 23 Participating Nations (including Canada) */
const COUNTRIES_DATA = [
  {
    id: "canada", name: "Canada", nameEn: "Canada",
    capital: "Ottawa", code: "CA",
    lat: 45.4215, lng: -75.6972,
    delegates: 5,
    ocean: "Atlantique, Pacifique & Arctique",
    quote: "De l'Atlantique au Pacifique et à l'Arctique, nous portons la voix des écosystèmes côtiers canadiens."
  },
  {
    id: "senegal", name: "Sénégal", nameEn: "Senegal",
    capital: "Dakar", code: "SN",
    lat: 14.7167, lng: -17.4677,
    delegates: 5,
    ocean: "Atlantique",
    quote: "Protéger nos océans, c'est préserver la pêche artisanale et assurer l'avenir de nos communautés côtières."
  },
  {
    id: "benin", name: "Bénin", nameEn: "Benin",
    capital: "Porto-Novo", code: "BJ",
    lat: 6.4969, lng: 2.6289,
    delegates: 4,
    ocean: "Atlantique",
    quote: "La sauvegarde de nos lagunes et mangroves est essentielle pour la biodiversité marine et côtière du Bénin."
  },
  {
    id: "mauritanie", name: "Mauritanie", nameEn: "Mauritania",
    capital: "Nouakchott", code: "MR",
    lat: 18.0735, lng: -15.9582,
    delegates: 4,
    ocean: "Atlantique",
    quote: "Face à l'érosion côtière et à la surpêche, préserver l'océan est un enjeu de survie pour nos populations."
  },
  {
    id: "cote_divoire", name: "Côte d'Ivoire", nameEn: "Ivory Coast",
    capital: "Yamoussoukro", code: "CI",
    lat: 6.8276, lng: -5.2796,
    delegates: 4,
    ocean: "Atlantique",
    quote: "Restaurer nos plages et lutter contre la pollution plastique est notre engagement pour un littoral vivant."
  },
  {
    id: "togo", name: "Togo", nameEn: "Togo",
    capital: "Lomé", code: "TG",
    lat: 6.1375, lng: 1.2123,
    delegates: 4,
    ocean: "Atlantique",
    quote: "Nos rivages subissent de plein fouet l'érosion côtière. Agir pour l'océan, c'est protéger notre peuple."
  },
  {
    id: "guinee_bissau", name: "Guinée-Bissau", nameEn: "Guinea-Bissau",
    capital: "Bissau", code: "GW",
    lat: 11.8632, lng: -15.5982,
    delegates: 3,
    ocean: "Atlantique",
    quote: "L'archipel des Bijagós est une réserve de biosphère vitale. Protéger ses eaux, c'est protéger notre identité."
  },
  {
    id: "cap_vert", name: "Cap-Vert", nameEn: "Cape Verde",
    capital: "Praia", code: "CV",
    lat: 14.9330, lng: -23.5133,
    delegates: 3,
    ocean: "Atlantique",
    quote: "Entourés par l'Atlantique, notre économie bleue et notre culture dépendent entièrement de la santé de nos récifs."
  },
  {
    id: "gambie", name: "Gambie", nameEn: "Gambia",
    capital: "Banjul", code: "GM",
    lat: 13.4549, lng: -16.5790,
    delegates: 3,
    ocean: "Atlantique",
    quote: "Le fleuve Gambie et l'Atlantique forment un écosystème interconnecté. Luttons contre les déchets plastiques."
  },
  {
    id: "cameroun", name: "Cameroun", nameEn: "Cameroon",
    capital: "Yaoundé", code: "CM",
    lat: 3.8480, lng: 11.5021,
    delegates: 4,
    ocean: "Atlantique",
    quote: "Nos forêts équatoriales et nos océans sont les deux poumons de l'Afrique. Défendons-les ensemble."
  },
  {
    id: "tchad", name: "Tchad", nameEn: "Chad",
    capital: "N'Djamena", code: "TD",
    lat: 12.1348, lng: 15.0557,
    delegates: 3,
    ocean: "Bassin du lac Tchad (eaux douces)",
    quote: "Même sans littoral, nos eaux se jettent dans la mer. La préservation des océans commence au cœur des terres."
  },
  {
    id: "congo", name: "République du Congo", nameEn: "Republic of the Congo",
    capital: "Brazzaville", code: "CG",
    lat: -4.2634, lng: 15.2832,
    delegates: 3,
    ocean: "Atlantique",
    quote: "Le fleuve Congo alimente l'océan. Nous veillons sur nos mangroves pour préserver ce corridor biologique unique."
  },
  {
    id: "kenya", name: "Kenya", nameEn: "Kenya",
    capital: "Nairobi", code: "KE",
    lat: -1.2921, lng: 36.8219,
    delegates: 4,
    ocean: "Indien",
    quote: "Les communautés côtières sont les premières sentinelles de la mer. Donnons-leur les moyens d'agir."
  },
  {
    id: "djibouti", name: "Djibouti", nameEn: "Djibouti",
    capital: "Djibouti", code: "DJ",
    lat: 11.5890, lng: 43.1450,
    delegates: 3,
    ocean: "Mer Rouge & Océan Indien",
    quote: "Notre position en mer Rouge abrite des récifs résistants au climat. Il est vital de les préserver et les étudier."
  },
  {
    id: "maroc", name: "Maroc", nameEn: "Morocco",
    capital: "Rabat", code: "MA",
    lat: 34.0209, lng: -6.8416,
    delegates: 5,
    ocean: "Atlantique & Méditerranée",
    quote: "Restaurer les herbiers marins et stopper la pollution plastique sont nos priorités pour des côtes résilientes."
  },
  {
    id: "tunisie", name: "Tunisie", nameEn: "Tunisia",
    capital: "Tunis", code: "TN",
    lat: 36.8065, lng: 10.1815,
    delegates: 4,
    ocean: "Méditerranée",
    quote: "La Méditerranée est notre histoire commune. Nous militons pour une mer sans microplastiques ni pollution."
  },
  {
    id: "mali", name: "Mali", nameEn: "Mali",
    capital: "Bamako", code: "ML",
    lat: 12.6392, lng: -8.0029,
    delegates: 4,
    ocean: "Bassin du fleuve Niger (eaux douces)",
    quote: "L'eau est une ressource mondiale partagée. Protéger l'océan, c'est sauvegarder le cycle hydrologique mondial."
  },
  {
    id: "france", name: "France", nameEn: "France",
    capital: "Paris", code: "FR",
    lat: 48.8566, lng: 2.3522,
    delegates: 6,
    ocean: "Atlantique",
    quote: "La mer n'est pas un espace de division, mais le lien bleu qui unit nos destins climatiques et écologiques."
  },
  {
    id: "brazil", name: "Brésil", nameEn: "Brazil",
    capital: "Brasilia", code: "BR",
    lat: -15.7975, lng: -47.8919,
    delegates: 5,
    ocean: "Atlantique",
    quote: "De l'Amazone à l'Atlantique, la santé de nos fleuves dicte celle de nos océans. Tout est connecté."
  },
  {
    id: "ecuador", name: "Équateur", nameEn: "Ecuador",
    capital: "Quito", code: "EC",
    lat: -0.1807, lng: -78.4678,
    delegates: 4,
    ocean: "Pacifique (Galápagos)",
    quote: "Les îles Galápagos sont un trésor de l'humanité. Protéger leurs eaux, c'est sauvegarder la vie sur Terre."
  },
  {
    id: "uruguay", name: "Uruguay", nameEn: "Uruguay",
    capital: "Montevideo", code: "UY",
    lat: -34.9011, lng: -56.1645,
    delegates: 4,
    ocean: "Atlantique",
    quote: "Nous promouvons la pêche durable et les aires marines protégées pour un Atlantique sud en bonne santé."
  },
  {
    id: "indonesia", name: "Indonésie", nameEn: "Indonesia",
    capital: "Jakarta", code: "ID",
    lat: -6.2088, lng: 106.8456,
    delegates: 5,
    ocean: "Pacifique & Indien",
    quote: "En tant que plus grand archipel du monde, protéger le Triangle de Corail est une mission vitale pour notre génération."
  },
  {
    id: "philippines", name: "Philippines", nameEn: "Philippines",
    capital: "Manille", code: "PH",
    lat: 14.5995, lng: 120.9842,
    delegates: 5,
    ocean: "Pacifique",
    quote: "Au cœur de la biodiversité marine mondiale, nous défendons nos récifs contre la surpêche et l'acidification."
  }
];

/* ═══════════════════════════════════════════════════════════════
   STATE
═══════════════════════════════════════════════════════════════ */
let globe, geoData = null;
let activeId = null;
let spinning = true;
let currentTex = 'night';
let tourOn = false, tourTimer = null, tourIdx = 0;

/* ═══════════════════════════════════════════════════════════════
   BOOT
═══════════════════════════════════════════════════════════════ */
window.addEventListener('load', () => {
  addFlags();          // compute flag CDN URLs
  addDistances();      // compute distances
  renderSidebar(COUNTRIES_DATA);
  buildGlobe();
  wireUI();
});

/* ═══════════════════════════════════════════════════════════════
   ENRICH DATA
═══════════════════════════════════════════════════════════════ */
function addFlags() {
  COUNTRIES_DATA.forEach(c => {
    c.flagUrl = `https://flagcdn.com/w40/${c.code.toLowerCase()}.png`;
    c.flagUrlMedium = `https://flagcdn.com/w80/${c.code.toLowerCase()}.png`;
    c.flagUrlLarge = `https://flagcdn.com/w160/${c.code.toLowerCase()}.png`;
  });
}
function addDistances() {
  COUNTRIES_DATA.forEach(c => {
    c.dist = haversine(c.lat, c.lng, DESTINATION.lat, DESTINATION.lng);
  });
}

/* ═══════════════════════════════════════════════════════════════
   GLOBE CONSTRUCTION
═══════════════════════════════════════════════════════════════ */
function buildGlobe() {
  const wrap = document.getElementById('globe-wrap');

  globe = Globe()(wrap)
    .width(wrap.clientWidth)
    .height(wrap.clientHeight)
    .globeImageUrl(TEX.night)
    .bumpImageUrl(TEX.bump)
    .backgroundColor('#020810')
    .showAtmosphere(true)
    .atmosphereColor('rgba(0,187,249,.7)')
    .enablePointerInteraction(true);

  /* Controls */
  const ctrl = globe.controls();
  ctrl.autoRotate = true;
  ctrl.autoRotateSpeed = 0.5;
  ctrl.minDistance = 130;
  ctrl.maxDistance = 500;

  /* Build layers */
  buildArcs(null);
  buildMarkers();
  loadGeoJSON();

  /* Resize */
  window.addEventListener('resize', () =>
    globe.width(wrap.clientWidth).height(wrap.clientHeight));

  /* Home view */
  setTimeout(() =>
    globe.pointOfView({ lat: 18, lng: -8, altitude: 2.4 }, 1500), 700);
}

/* ── ARCS ────────────────────────────────────────────────────── */
function buildArcs(selectedId) {
  // Arcs are created only for actual foreign delegations to Gaspe
  const list = COUNTRIES_DATA.filter(c => c.id !== 'canada');
  globe
    .arcsData(list.map(c => ({
      slat: c.lat, slng: c.lng,
      elat: DESTINATION.lat, elng: DESTINATION.lng,
      isActive: c.id === selectedId,
      id: c.id
    })))
    .arcStartLat('slat').arcStartLng('slng')
    .arcEndLat('elat').arcEndLng('elng')
    .arcColor(d => {
      if (d.isActive) return ['#ffd60a','#ff6b6b'];
      if (selectedId) return ['rgba(0,245,212,.06)','rgba(0,245,212,.06)'];
      return ['rgba(0,245,212,.5)','rgba(0,187,249,.3)'];
    })
    .arcStroke(d => d.isActive ? 2.4 : selectedId ? 0.4 : 0.8)
    .arcAltitude(d => {
      const dx = d.slat - d.elat, dy = d.slng - d.elng;
      return Math.min(0.6, Math.max(0.12, Math.sqrt(dx*dx+dy*dy)*0.005));
    })
    .arcDashLength(0.4)
    .arcDashGap(1.2)
    .arcDashAnimateTime(d => {
      const dx = d.slat - d.elat, dy = d.slng - d.elng;
      return Math.max(800, Math.min(3500, Math.sqrt(dx*dx+dy*dy)*28));
    });
}

/* ── HTML MARKERS (flag pins) ────────────────────────────────── */
function buildMarkers() {
  const data = [
    { lat: DESTINATION.lat, lng: DESTINATION.lng, isGaspe: true },
    ...COUNTRIES_DATA.map((c, i) => ({ ...c, isGaspe: false, idx: i }))
  ];

  globe
    .htmlElementsData(data)
    .htmlElement(d => {
      const el = document.createElement('div');
      if (d.isGaspe) {
        el.className = 'gaspe-pin';
        el.innerHTML = `<div class="gaspe-label">📍 Gaspé, QC</div><div class="gaspe-dot"></div>`;
        return el;
      }
      el.className = 'flag-pin';
      el.title = d.name;

      const img = document.createElement('img');
      img.className = 'flag-emoji';
      img.src = d.flagUrlMedium;
      img.alt = d.name;
      img.style.animationDelay = ((d.idx * 0.35) % 3) + 's';
      el.appendChild(img);

      el.addEventListener('click', e => { e.stopPropagation(); selectCountry(d.id); });
      return el;
    })
    .htmlAltitude(0.055);
}

/* ── GEOJSON POLYGON BORDERS ─────────────────────────────────── */
function loadGeoJSON() {
  let idx = 0;
  function next() {
    if (idx >= GEO_SOURCES.length) return;
    fetch(GEO_SOURCES[idx++])
      .then(r => { if (!r.ok) throw 0; return r.json(); })
      .then(applyGeoJSON)
      .catch(next);
  }
  next();
}

function applyGeoJSON(geojson) {
  geoData = geojson;

  const byCode = {}, byName = {};
  COUNTRIES_DATA.forEach(c => {
    byCode[c.code] = c;
    byName[c.name.toLowerCase()] = c;
    byName[c.nameEn.toLowerCase()] = c;
  });
  const ALIASES = {
    'ivory coast': 'cote_divoire',
    "cote d'ivoire": 'cote_divoire',
    'cape verde': 'cap_vert',
    'guinea-bissau': 'guinee_bissau',
    'gambia': 'gambie',
    'the gambia': 'gambie',
    'republic of the congo': 'congo',
    'congo': 'congo',
    'ecuador': 'ecuador',
    'brazil': 'brazil',
    'canada': 'canada'
  };

  geojson.features.forEach(f => {
    const p = f.properties;
    const iso = (f.id || p.ISO_A2 || p.iso_a2 || p.ISO2 || '').toString().toUpperCase().trim();
    const name = (p.name || p.NAME || p.ADMIN || '').toLowerCase().trim();
    const aliasId = ALIASES[name];
    const mc = byCode[iso] || byName[name] ||
                (aliasId ? COUNTRIES_DATA.find(c => c.id === aliasId) : null);

    if (mc) {
      p._id = mc.id; p._ok = true;
      p._flag = mc.flag; p._cap = mc.capital;
      p._ocean = mc.ocean; p._quote = mc.quote;
    } else {
      p._ok = false;
    }
  });

  renderPolygons();
}

function renderPolygons() {
  if (!geoData) return;
  globe
    .polygonsData(geoData.features)
    .polygonCapColor(f => {
      if (!f.properties._ok) return 'rgba(0,0,0,0)';
      if (f.properties._id === 'canada') {
        return f.properties._id === activeId ? 'rgba(255,107,107,.8)' : 'rgba(255,107,107,.32)';
      }
      return f.properties._id === activeId ? 'rgba(0,245,212,.82)' : 'rgba(0,245,212,.18)';
    })
    .polygonSideColor(f => {
      if (!f.properties._ok) return 'rgba(0,0,0,0)';
      return f.properties._id === 'canada' ? 'rgba(255,107,107,.22)' : 'rgba(0,245,212,.15)';
    })
    .polygonStrokeColor(f => {
      if (!f.properties._ok) return 'rgba(0,0,0,0)';
      if (f.properties._id === 'canada') return 'rgba(255,107,107,.9)';
      return f.properties._id === activeId ? '#00f5d4' : 'rgba(0,245,212,.45)';
    })
    .polygonAltitude(f => {
      if (!f.properties._ok) return 0;
      if (f.properties._id === activeId) return 0.1;
      return f.properties._id === 'canada' ? 0.04 : 0.02;
    })
    .polygonLabel(f => {
      if (!f.properties._ok) return '';
      return buildPopup(f);
    })
    .onPolygonClick((f, _e, _ll) => {
      if (!f.properties._ok) return;
      if (tourOn) stopTour();
      selectCountry(f.properties._id);
    });
}

function refreshPolygons() {
  if (!geoData) return;
  globe
    .polygonCapColor(f => {
      if (!f.properties._ok) return 'rgba(0,0,0,0)';
      if (f.properties._id === 'canada')
        return f.properties._id === activeId ? 'rgba(255,107,107,.8)' : 'rgba(255,107,107,.32)';
      return f.properties._id === activeId ? 'rgba(0,245,212,.82)' : 'rgba(0,245,212,.18)';
    })
    .polygonStrokeColor(f => {
      if (!f.properties._ok) return 'rgba(0,0,0,0)';
      if (f.properties._id === 'canada') return 'rgba(255,107,107,.9)';
      return f.properties._id === activeId ? '#00f5d4' : 'rgba(0,245,212,.45)';
    })
    .polygonAltitude(f => {
      if (!f.properties._ok) return 0;
      if (f.properties._id === activeId) return 0.1;
      return f.properties._id === 'canada' ? 0.04 : 0.02;
    });
}

/* ── POPUP HTML (hover on polygon, NO delegate count) ────────── */
function buildPopup(f) {
  const c = COUNTRIES_DATA.find(x => x.id === f.properties._id) || {};
  const isCA = f.properties._id === 'canada';
  const ac = isCA ? '#ff6b6b' : '#00f5d4';
  const q = (c.quote || '').substring(0, 160);
  return `
  <div style="
    font-family:Outfit,sans-serif;
    background:rgba(4,10,28,.96);
    border:1px solid ${ac};
    border-radius:16px;padding:18px 20px;
    min-width:260px;max-width:310px;
    box-shadow:0 16px 50px rgba(0,0,0,.8),0 0 30px rgba(0,245,212,.06);
    pointer-events:none;
  ">
    <div style="display:flex;align-items:center;gap:12px;margin-bottom:14px">
      <img src="${c.flagUrlMedium}" width="50" style="border-radius:4px;border:1px solid rgba(255,255,255,.15);box-shadow:0 2px 10px rgba(0,0,0,.5);" alt="Drapeau">
      <div>
        <div style="font-weight:800;font-size:1.05rem;color:#f0f4ff;margin-bottom:3px">${c.name||''}</div>
        <div style="font-size:.65rem;color:#7a8ba8;text-transform:uppercase;letter-spacing:1.5px">${f.properties._cap||c.capital||''}</div>
      </div>
    </div>
    <div style="background:rgba(0,187,249,.07);border:1px solid rgba(0,187,249,.18);border-radius:8px;padding:8px 12px;margin-bottom:12px;display:flex;align-items:center;gap:8px">
      <span style="font-size:1.1rem">🌊</span>
      <div>
        <div style="font-size:.58rem;color:#7a8ba8;text-transform:uppercase;letter-spacing:1px;margin-bottom:2px">Bassin océanique</div>
        <div style="font-size:.82rem;font-weight:600;color:#00bbf9">${c.ocean||''}</div>
      </div>
    </div>
    <div style="background:rgba(0,0,0,.3);border-left:3px solid ${ac};padding:10px 12px;border-radius:0 8px 8px 0;font-size:.8rem;font-style:italic;line-height:1.55;color:#dde8ff">${q}${c.quote&&c.quote.length>160?'…':''}</div>
  </div>`;
}

/* ═══════════════════════════════════════════════════════════════
   SELECTION
═══════════════════════════════════════════════════════════════ */
function selectCountry(id) {
  if (activeId === id) { clearSelection(); return; }
  activeId = id;

  document.querySelectorAll('.nation-item').forEach(e => e.classList.remove('active'));
  const li = document.getElementById('ni-' + id);
  if (li) { li.classList.add('active'); li.scrollIntoView({ behavior:'smooth', block:'nearest' }); }

  const c = COUNTRIES_DATA.find(x => x.id === id);
  if (!c) return;

  globe.pointOfView({ lat: c.lat, lng: c.lng, altitude: 1.2 }, 1800);
  globe.controls().autoRotate = false;
  document.getElementById('btn-rotate').classList.remove('on');

  buildArcs(id);
  refreshPolygons();

  document.getElementById('d-flag').src = c.flagUrlLarge;
  document.getElementById('d-flag').style.animation = 'none';
  requestAnimationFrame(() => {
    document.getElementById('d-flag').style.animation = '';
  });
  document.getElementById('d-country').textContent = c.name;
  document.getElementById('d-capital').textContent  = c.capital;
  document.getElementById('d-ocean').textContent   = c.ocean;
  document.getElementById('d-quote').textContent   = c.quote;
  document.getElementById('d-dist').textContent    = Math.round(c.dist).toLocaleString('fr-CA') + ' km';
  document.getElementById('detail').classList.add('show');
}

function clearSelection() {
  activeId = null;
  document.querySelectorAll('.nation-item').forEach(e => e.classList.remove('active'));
  document.getElementById('detail').classList.remove('show');
  buildArcs(null);
  refreshPolygons();
  if (spinning) {
    globe.controls().autoRotate = true;
    document.getElementById('btn-rotate').classList.add('on');
  }
  globe.pointOfView({ lat: 18, lng: -8, altitude: 2.4 }, 1500);
}

/* ═══════════════════════════════════════════════════════════════
   SIDEBAR
═══════════════════════════════════════════════════════════════ */
function renderSidebar(arr) {
  const ul = document.getElementById('nation-list');
  ul.innerHTML = '';
  // Pin Canada (host/participant) at top, sort others A-Z
  const sorted = [
    ...arr.filter(c => c.id === 'canada'),
    ...arr.filter(c => c.id !== 'canada').sort((a,b) => a.name.localeCompare(b.name,'fr'))
  ];
  sorted.forEach(c => {
    const el = document.createElement('div');
    el.className = 'nation-item' + (c.id === 'canada' ? ' host' : '');
    el.id = 'ni-' + c.id;
    el.innerHTML = `
      <img class="nation-flag" src="${c.flagUrl}" alt="${c.name}">
      <div>
        <div class="nation-name">${c.name}</div>
        ${c.id === 'canada' ? '<div class="nation-host-tag" style="font-size:.55rem;font-weight:700;color:var(--coral);text-transform:uppercase;letter-spacing:.5px;">🏠 Pays hôte</div>' : ''}
      </div>`;
    el.addEventListener('click', () => { if (tourOn) stopTour(); selectCountry(c.id); });
    ul.appendChild(el);
  });
}

/* ═══════════════════════════════════════════════════════════════
   UI WIRING
═══════════════════════════════════════════════════════════════ */
function wireUI() {
  document.getElementById('btn-rotate').addEventListener('click', function() {
    if (tourOn) { stopTour(); return; }
    spinning = !spinning;
    globe.controls().autoRotate = spinning;
    this.classList.toggle('on', spinning);
  });

  document.getElementById('btn-reset').addEventListener('click', () => {
    if (tourOn) stopTour();
    clearSelection();
  });

  document.getElementById('btn-tour').addEventListener('click', () =>
    tourOn ? (stopTour(), clearSelection()) : startTour());

  document.getElementById('btn-night').addEventListener('click', () => {
    globe.globeImageUrl(TEX.night).atmosphereColor('rgba(0,187,249,.7)');
    currentTex = 'night';
  });
  document.getElementById('btn-sat').addEventListener('click', () => {
    globe.globeImageUrl(TEX.satellite).atmosphereColor('rgba(200,220,255,.5)');
    currentTex = 'satellite';
  });

  document.getElementById('btn-zoom-in').addEventListener('click', () => {
    const pov = globe.pointOfView();
    globe.pointOfView({ altitude: Math.max(1.25, pov.altitude - 0.25) }, 350);
  });
  document.getElementById('btn-zoom-out').addEventListener('click', () => {
    const pov = globe.pointOfView();
    globe.pointOfView({ altitude: Math.min(4.5, pov.altitude + 0.25) }, 350);
  });

  document.getElementById('d-close').addEventListener('click', () => {
    if (tourOn) stopTour();
    clearSelection();
  });

  document.getElementById('search').addEventListener('input', function() {
    const t = this.value.toLowerCase().trim();
    renderSidebar(
      t ? COUNTRIES_DATA.filter(c =>
        c.name.toLowerCase().includes(t) ||
        c.nameEn.toLowerCase().includes(t) ||
        c.capital.toLowerCase().includes(t))
      : COUNTRIES_DATA
    );
  });
}

/* ═══════════════════════════════════════════════════════════════
   GUIDED TOUR
═══════════════════════════════════════════════════════════════ */
function startTour() {
  tourOn = true; tourIdx = 0;
  const btn = document.getElementById('btn-tour');
  btn.classList.add('tour-on');
  btn.textContent = '■ Arrêter le voyage';
  globe.controls().autoRotate = false;
  document.getElementById('btn-rotate').classList.remove('on');

  const list = COUNTRIES_DATA.filter(c => c.id !== 'canada')
                              .sort((a,b) => a.name.localeCompare(b.name,'fr'));
  function step() {
    if (!tourOn || tourIdx >= list.length) { stopTour(); clearSelection(); return; }
    selectCountry(list[tourIdx++].id);
    const bar = document.getElementById('tour-bar');
    bar.style.transition = 'none';
    bar.style.width = '0';
    bar.classList.add('run');
    requestAnimationFrame(() => requestAnimationFrame(() => {
      bar.style.transition = 'width 4.7s linear';
      bar.style.width = '100%';
    }));
    tourTimer = setTimeout(step, 5000);
  }
  step();
}

function stopTour() {
  tourOn = false;
  if (tourTimer) { clearTimeout(tourTimer); tourTimer = null; }
  const btn = document.getElementById('btn-tour');
  btn.classList.remove('tour-on');
  btn.textContent = '✈ Voyage des Nations';
  const bar = document.getElementById('tour-bar');
  bar.classList.remove('run');
  bar.style.width = '0';
}

/* ═══════════════════════════════════════════════════════════════
   UTILS
═══════════════════════════════════════════════════════════════ */
function haversine(la1,lo1,la2,lo2){
  const R=6371,d2r=Math.PI/180;
  const dL=(la2-la1)*d2r,dO=(lo2-lo1)*d2r;
  const a=Math.sin(dL/2)**2+Math.cos(la1*d2r)*Math.cos(la2*d2r)*Math.sin(dO/2)**2;
  return R*2*Math.atan2(Math.sqrt(a),Math.sqrt(1-a));
}
