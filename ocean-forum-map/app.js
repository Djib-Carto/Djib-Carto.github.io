/* ==========================================================================
   Global State
   ========================================================================== */
let myGlobe;
let selectedCountryId   = null;
let autoRotationActive  = true;
let currentGlobeStyle   = 'night';
let countriesGeoJson    = null;
let tourInterval        = null;
let isTourActive        = false;
let tourIndex           = 0;

/* Texture map for globe skins */
const GLOBE_TEXTURES = {
  night:     '//unpkg.com/three-globe/example/img/earth-night.jpg',
  satellite: '//unpkg.com/three-globe/example/img/earth-blue-marble.jpg',
  dark:      '//unpkg.com/three-globe/example/img/earth-dark.jpg',
  bump:      '//unpkg.com/three-globe/example/img/earth-topology.png'
};

/* ==========================================================================
   Boot
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {
  initStatsAndData();
  renderCountryList(COUNTRIES_DATA);
  initGlobe();
  setupUIEventListeners();
  if (typeof lucide !== 'undefined') lucide.createIcons();
});

/* ==========================================================================
   Stats
   ========================================================================== */
function initStatsAndData() {
  let totalKm = 0;
  COUNTRIES_DATA.forEach(country => {
    country.flag     = getFlagEmoji(country.code);
    country.distance = calculateDistance(
      country.lat, country.lng,
      DESTINATION.lat, DESTINATION.lng
    );
    totalKm += Math.round(country.distance * country.delegates);
  });
  document.getElementById('stat-countries').innerText = COUNTRIES_DATA.length;
  document.getElementById('stat-delegates').innerText = '100';
  document.getElementById('stat-distance').innerText  = formatNumber(totalKm) + ' km';
  document.getElementById('stat-oceans').innerText    = '5';
}

/* ==========================================================================
   Globe initialisation
   ========================================================================== */
function initGlobe() {
  const container = document.getElementById('globe-container');

  myGlobe = Globe()(container)
    .width(container.clientWidth)
    .height(container.clientHeight)
    .globeImageUrl(GLOBE_TEXTURES[currentGlobeStyle])
    .bumpImageUrl(GLOBE_TEXTURES.bump)
    .backgroundColor('#020612')
    .showAtmosphere(true)
    .atmosphereColor('#00bbf9')
    .enablePointerInteraction(true);

  /* Orbit controls */
  const ctrl = myGlobe.controls();
  ctrl.enableZoom     = true;
  ctrl.autoRotate     = true;
  ctrl.autoRotateSpeed = 0.45;
  ctrl.maxDistance    = 450;
  ctrl.minDistance    = 120;

  /* ── Animated flow arcs ── */
  const arcs = COUNTRIES_DATA.map(c => ({
    startLat:  c.lat,  startLng:  c.lng,
    endLat: DESTINATION.lat, endLng: DESTINATION.lng,
    color:   ['#00f5d4', '#ff6b6b'],
    countryId: c.id
  }));

  myGlobe
    .arcsData(arcs)
    .arcColor('color')
    .arcAltitude(d => {
      const dist = Math.sqrt(
        Math.pow(d.startLat - d.endLat, 2) + Math.pow(d.startLng - d.endLng, 2)
      );
      return Math.min(0.55, Math.max(0.12, dist * 0.005));
    })
    .arcStroke(d => d._active ? 2.2 : 1.0)
    .arcDashLength(0.35)
    .arcDashGap(1.2)
    .arcDashAnimateTime(d => {
      const dist = Math.sqrt(
        Math.pow(d.startLat - d.endLat, 2) + Math.pow(d.startLng - d.endLng, 2)
      );
      return Math.max(900, Math.min(3200, dist * 28));
    });

  /* ── HTML Markers ── */
  const markers = [
    { lat: DESTINATION.lat, lng: DESTINATION.lng, isDestination: true, name: 'Gaspé, QC', id: 'gaspe' },
    ...COUNTRIES_DATA.map(c => ({
      lat: c.lat, lng: c.lng,
      isDestination: false,
      name: c.name, flag: c.flag, id: c.id, delegates: c.delegates
    }))
  ];

  myGlobe
    .htmlElementsData(markers)
    .htmlElement(d => {
      const el = document.createElement('div');
      if (d.isDestination) {
        el.className = 'destination-marker';
        el.innerHTML = `<div class="destination-label">${d.name}</div>`;
      } else {
        const sz = 12 + d.delegates * 2;
        el.className = 'origin-marker-container';
        el.style.cssText = `width:${sz}px;height:${sz}px`;
        el.innerHTML = `
          <div class="origin-pulse-ring" style="animation-duration:${Math.max(1.5, 4 - d.delegates * 0.2)}s"></div>
          <div class="origin-dot"></div>
          <div class="origin-tooltip">
            <span class="flag-emoji">${d.flag}</span>
            <span class="tooltip-name">${d.name}</span>
            <span class="tooltip-badge">${d.delegates} délégué${d.delegates > 1 ? 's' : ''}</span>
          </div>`;
        el.addEventListener('click', e => { e.stopPropagation(); if (isTourActive) stopTour(); selectCountry(d.id); });
      }
      return el;
    });

  /* ── Country Polygon Borders ── */
  fetch('https://unpkg.com/three-globe/example/img/ne_110m_admin_0_countries.geojson')
    .then(r => r.json())
    .then(geojson => {
      countriesGeoJson = geojson;

      /* Tag each feature with participant info */
      geojson.features.forEach(feat => {
        const iso  = (feat.properties.ISO_A2 || feat.properties.iso_a2 || '').toUpperCase();
        const match = COUNTRIES_DATA.find(c => c.code === iso);
        if (match) {
          feat.properties.isParticipant  = true;
          feat.properties.participantId  = match.id;
          feat.properties.delegates      = match.delegates;
          feat.properties.ocean          = match.ocean;
          feat.properties.quote          = match.quote;
          feat.properties.flag           = match.flag;
          feat.properties.capital        = match.capital;
        } else {
          feat.properties.isParticipant  = false;
        }
      });

      myGlobe
        /* Cap colour */
        .polygonsData(geojson.features)
        .polygonCapColor(d => polyCapColor(d, selectedCountryId))
        /* Side / wall */
        .polygonSideColor(d => {
          if (!d.properties.isParticipant) return 'rgba(255,255,255,0.01)';
          return d.properties.participantId === 'canada'
            ? 'rgba(255,107,107,0.25)'
            : 'rgba(0,245,212,0.18)';
        })
        /* Stroke */
        .polygonStrokeColor(d => {
          if (!d.properties.isParticipant) return 'rgba(255,255,255,0.07)';
          if (d.properties.participantId === 'canada') return 'rgba(255,107,107,0.9)';
          return d.properties.participantId === selectedCountryId
            ? '#00f5d4'
            : 'rgba(0,245,212,0.55)';
        })
        /* 3-D extrusion height */
        .polygonAltitude(d => polyAltitude(d, selectedCountryId))
        /* Rich hover tooltip / popup */
        .polygonLabel(d => buildPopup(d))
        /* Click → select */
        .onPolygonClick((polygon, _evt, _coords) => {
          if (!polygon.properties.isParticipant) return;
          if (isTourActive) stopTour();
          selectCountry(polygon.properties.participantId);
        });
    })
    .catch(err => console.error('GeoJSON load error:', err));

  /* Resize */
  window.addEventListener('resize', () => {
    myGlobe.width(container.clientWidth).height(container.clientHeight);
  });

  /* Initial overview */
  setTimeout(() => myGlobe.pointOfView({ lat: 30, lng: -30, altitude: 2.3 }, 1500), 800);
}

/* ==========================================================================
   Polygon color / altitude helpers
   ========================================================================== */
function polyCapColor(d, activeId) {
  if (!d.properties.isParticipant) return 'rgba(255,255,255,0.02)';
  if (d.properties.participantId === 'canada') {
    return d.properties.participantId === activeId
      ? 'rgba(255,107,107,0.7)'
      : 'rgba(255,107,107,0.38)';
  }
  return d.properties.participantId === activeId
    ? 'rgba(0,245,212,0.75)'
    : 'rgba(0,245,212,0.22)';
}

function polyAltitude(d, activeId) {
  if (!d.properties.isParticipant) return 0.003;
  if (d.properties.participantId === activeId) return 0.09;
  if (d.properties.participantId === 'canada') return 0.04;
  return 0.02;
}

/* Rich HTML popup shown on polygon hover */
function buildPopup(d) {
  if (!d.properties.isParticipant) {
    return `<div style="background:rgba(8,18,36,.85);color:#9ca3af;padding:6px 10px;border-radius:6px;font-size:12px;font-family:Outfit,sans-serif;border:1px solid rgba(255,255,255,.08)">${d.properties.NAME || d.properties.name}</div>`;
  }
  const pid   = d.properties.participantId;
  const isCA  = pid === 'canada';
  const accentColor = isCA ? '#ff6b6b' : '#00f5d4';
  const c = COUNTRIES_DATA.find(x => x.id === pid) || {};
  return `
    <div style="
      background:rgba(6,15,35,.94);
      border:1px solid ${accentColor};
      border-radius:12px;
      padding:14px 16px;
      min-width:230px;
      max-width:290px;
      font-family:Outfit,sans-serif;
      color:#f3f4f6;
      box-shadow:0 10px 30px rgba(0,0,0,.6);
      pointer-events:none;
    ">
      <div style="display:flex;align-items:center;gap:10px;margin-bottom:10px">
        <span style="font-size:1.7rem">${d.properties.flag || ''}</span>
        <div>
          <div style="font-weight:700;font-size:.95rem">${d.properties.NAME || d.properties.name}</div>
          <div style="font-size:.72rem;color:#9ca3af;text-transform:uppercase;letter-spacing:1px">${d.properties.capital || ''}</div>
        </div>
      </div>
      <div style="display:flex;gap:10px;margin-bottom:10px;padding-bottom:10px;border-bottom:1px solid rgba(255,255,255,.08)">
        <div style="flex:1;text-align:center;background:rgba(255,255,255,.04);border-radius:8px;padding:6px 4px">
          <div style="font-size:1.3rem;font-weight:700;color:${accentColor}">${d.properties.delegates || '—'}</div>
          <div style="font-size:.65rem;color:#9ca3af;text-transform:uppercase">Délégués</div>
        </div>
        <div style="flex:2;background:rgba(255,255,255,.04);border-radius:8px;padding:6px 8px">
          <div style="font-size:.65rem;color:#9ca3af;text-transform:uppercase;margin-bottom:2px">Bassin</div>
          <div style="font-size:.8rem;font-weight:500;color:#00bbf9">${d.properties.ocean || c.ocean || '—'}</div>
        </div>
      </div>
      <div style="
        background:rgba(0,0,0,.3);
        border-left:3px solid ${accentColor};
        padding:8px 10px;
        border-radius:0 6px 6px 0;
        font-size:.8rem;
        font-style:italic;
        color:#e2e8f0;
        line-height:1.45;
      ">${(d.properties.quote || c.quote || '').substring(0, 130)}${(d.properties.quote || c.quote || '').length > 130 ? '…' : ''}</div>
      <div style="margin-top:8px;font-size:.68rem;color:${accentColor};text-align:right;font-weight:600;text-transform:uppercase">Cliquez pour explorer →</div>
    </div>`;
}

/* Push polygon colours and heights to the globe after a selection change */
function refreshPolygons() {
  if (!countriesGeoJson) return;
  myGlobe
    .polygonCapColor(d   => polyCapColor(d, selectedCountryId))
    .polygonStrokeColor(d => {
      if (!d.properties.isParticipant) return 'rgba(255,255,255,0.07)';
      if (d.properties.participantId === 'canada') return 'rgba(255,107,107,0.9)';
      return d.properties.participantId === selectedCountryId
        ? '#00f5d4'
        : 'rgba(0,245,212,0.55)';
    })
    .polygonAltitude(d  => polyAltitude(d, selectedCountryId));
}

/* Refresh arc colours (dim all except selected) */
function refreshArcs() {
  myGlobe.arcsData(COUNTRIES_DATA.map(c => ({
    startLat: c.lat, startLng: c.lng,
    endLat: DESTINATION.lat, endLng: DESTINATION.lng,
    color: !selectedCountryId
      ? ['#00f5d4', '#ff6b6b']
      : c.id === selectedCountryId
        ? ['#00f5d4', '#ff6b6b']
        : ['rgba(0,245,212,0.1)', 'rgba(255,107,107,0.1)'],
    _active: c.id === selectedCountryId
  })));
}

/* ==========================================================================
   Country list (sidebar)
   ========================================================================== */
function renderCountryList(countries) {
  const ul = document.getElementById('country-list');
  ul.innerHTML = '';
  countries.forEach(c => {
    const item = document.createElement('div');
    item.className = 'country-item';
    item.id = `sidebar-item-${c.id}`;
    item.innerHTML = `
      <div class="country-info">
        <span class="flag-emoji">${c.flag}</span>
        <span class="country-name">${c.name}</span>
      </div>
      <span class="country-badge">${c.delegates}</span>`;
    item.addEventListener('click', () => {
      if (isTourActive) stopTour();
      selectCountry(c.id);
    });
    ul.appendChild(item);
  });
}

/* ==========================================================================
   Select / deselect a country
   ========================================================================== */
function selectCountry(countryId) {
  /* Toggle off if already selected */
  if (selectedCountryId === countryId) { resetCamera(); return; }

  selectedCountryId = countryId;

  /* Sidebar highlight */
  document.querySelectorAll('.country-item').forEach(el => el.classList.remove('active'));
  const li = document.getElementById(`sidebar-item-${countryId}`);
  if (li) { li.classList.add('active'); li.scrollIntoView({ behavior: 'smooth', block: 'nearest' }); }

  const country = COUNTRIES_DATA.find(c => c.id === countryId);
  if (!country) return;

  /* Camera fly-to */
  myGlobe.pointOfView({ lat: country.lat, lng: country.lng, altitude: 1.3 }, 1800);

  /* Pause auto-rotation */
  myGlobe.controls().autoRotate = false;
  document.getElementById('btn-rotate').classList.remove('active');

  /* Refresh arcs & polygons */
  refreshArcs();
  refreshPolygons();

  /* Details card */
  document.getElementById('details-flag').innerText           = country.flag;
  document.getElementById('details-country-name').innerText   = country.name;
  document.getElementById('details-capital').innerText        = country.capital;
  document.getElementById('details-delegates-count').innerText = `${country.delegates} délégué${country.delegates > 1 ? 's' : ''}`;
  document.getElementById('details-ocean-basin').innerText    = country.ocean;
  document.getElementById('details-distance').innerText       = `${Math.round(country.distance).toLocaleString()} km`;
  document.getElementById('details-quote').innerText          = country.quote;
  document.getElementById('details-card').classList.add('show');
}

/* ==========================================================================
   Reset / overview
   ========================================================================== */
function resetCamera() {
  selectedCountryId = null;
  document.querySelectorAll('.country-item').forEach(el => el.classList.remove('active'));
  document.getElementById('details-card').classList.remove('show');
  refreshArcs();
  refreshPolygons();
  if (autoRotationActive) {
    myGlobe.controls().autoRotate = true;
    document.getElementById('btn-rotate').classList.add('active');
  }
  myGlobe.pointOfView({ lat: 30, lng: -30, altitude: 2.3 }, 1500);
}

/* ==========================================================================
   UI Event Listeners
   ========================================================================== */
function setupUIEventListeners() {
  /* Reset */
  document.getElementById('btn-reset').addEventListener('click', () => {
    if (isTourActive) stopTour();
    resetCamera();
  });

  /* Auto-rotate */
  const btnRotate = document.getElementById('btn-rotate');
  btnRotate.classList.add('active');
  btnRotate.addEventListener('click', () => {
    if (isTourActive) stopTour();
    autoRotationActive = !autoRotationActive;
    myGlobe.controls().autoRotate = autoRotationActive;
    btnRotate.classList.toggle('active', autoRotationActive);
  });

  /* Guided tour */
  document.getElementById('btn-tour').addEventListener('click', toggleTour);

  /* Globe style switchers */
  document.querySelectorAll('.style-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.style-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentGlobeStyle = btn.dataset.style;
      myGlobe.globeImageUrl(GLOBE_TEXTURES[currentGlobeStyle]);
      myGlobe.atmosphereColor(
        currentGlobeStyle === 'satellite' ? '#ffffff'
        : currentGlobeStyle === 'dark'    ? '#00f5d4'
        : '#00bbf9'
      );
    });
  });

  /* Search */
  document.getElementById('search-country').addEventListener('input', e => {
    const t = e.target.value.toLowerCase().trim();
    renderCountryList(COUNTRIES_DATA.filter(c =>
      c.name.toLowerCase().includes(t) || c.capital.toLowerCase().includes(t)
    ));
  });

  /* Close details */
  document.getElementById('close-details').addEventListener('click', () => {
    if (isTourActive) stopTour();
    resetCamera();
  });
}

/* ==========================================================================
   Guided Tour – "Voyage des Jeunes"
   ========================================================================== */
function toggleTour() {
  if (isTourActive) { stopTour(); resetCamera(); } else { startTour(); }
}

function startTour() {
  isTourActive = true;
  tourIndex = 0;

  const btn = document.getElementById('btn-tour');
  btn.classList.add('active');
  btn.querySelector('span').innerText = 'Arrêter Voyage';
  btn.querySelector('i').setAttribute('data-lucide', 'square');
  if (typeof lucide !== 'undefined') lucide.createIcons();

  myGlobe.controls().autoRotate = false;
  document.getElementById('btn-rotate').classList.remove('active');

  /* Cycle through non-host countries */
  const tourCountries = COUNTRIES_DATA.filter(c => c.id !== 'canada');

  function step() {
    if (!isTourActive) return;
    if (tourIndex >= tourCountries.length) { stopTour(); resetCamera(); return; }
    selectCountry(tourCountries[tourIndex].id);
    tourIndex++;
    tourInterval = setTimeout(step, 5000);
  }
  step();
}

function stopTour() {
  isTourActive = false;
  if (tourInterval) { clearTimeout(tourInterval); tourInterval = null; }
  const btn = document.getElementById('btn-tour');
  if (btn) {
    btn.classList.remove('active');
    btn.querySelector('span').innerText = 'Voyage des Jeunes';
    btn.querySelector('i').setAttribute('data-lucide', 'plane');
    if (typeof lucide !== 'undefined') lucide.createIcons();
  }
}

/* ==========================================================================
   Utilities
   ========================================================================== */
function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371, dLat = degToRad(lat2 - lat1), dLon = degToRad(lon2 - lon1);
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(degToRad(lat1)) * Math.cos(degToRad(lat2)) * Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}
function degToRad(d) { return d * Math.PI / 180; }
function formatNumber(n) { return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' '); }
function getFlagEmoji(code) {
  return String.fromCodePoint(...code.toUpperCase().split('').map(c => 127397 + c.charCodeAt(0)));
}
