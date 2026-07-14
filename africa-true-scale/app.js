/**
 * AFRICA TRUE SCALE — Projection Decision Intelligence Visualizer
 * Core Application Controller (French Version)
 */

/* ═══════════════════════════════════════════════════
   1. GLOBAL STATE & DATA DEFINITIONS
═══════════════════════════════════════════════════ */
const AFRICA_TRUE_AREA = 30370000; // km²
const AppState = {
  currentProjection: 'mercator',
  selectedCountry: null,
  comparePosition: 50, // percent
  isDraggingCompare: false,
  
  countriesData: [],
  worldTopojson: null,
  countryByIso3: {},
  countryByIsoNum: {},
  
  // Section 2: Puzzle Game
  puzzleSelected: new Set(),
  
  // Section 3: Duel Mode
  duelA: 'GRL', // Greenland default
  duelB: 'DZA', // Algeria default
  
  pledgeSubmitted: false
};

// Deck of comparison countries for Section 2 (Puzzle) in French with centered offsets to fit inside Africa
const PUZZLE_TERRITORIES = [
  { iso3: 'GRL', name: 'Groenland', area: 2166086, desc: 'Paraît de la même taille que l\'Afrique sur Mercator.', offset: {x: 5, y: -25}, color: '#ff5e57' },
  { iso3: 'USA', name: 'États-Unis', area: 9372610, desc: 'Inclut l\'Alaska et Hawaï.', offset: {x: -12, y: -5}, color: '#32ff7e' },
  { iso3: 'CHN', name: 'Chine', area: 9596960, desc: 'Masse continentale réelle.', offset: {x: 15, y: 5}, color: '#ffd32a' },
  { iso3: 'IND', name: 'Inde', area: 3287263, desc: 'Équivaut à environ 10% de l\'Afrique.', offset: {x: 10, y: 25}, color: '#ffb8b8' },
  { iso3: 'RUS', name: 'Russie', area: 17098242, desc: 'Extrêmement gonflée par la projection Mercator.', offset: {x: 0, y: 0}, color: '#ff3f34' },
  { iso3: 'CAN', name: 'Canada', area: 9984670, desc: 'Étiré par les hautes latitudes nordiques.', offset: {x: -5, y: -15}, color: '#18dcff' },
  { iso3: 'BRA', name: 'Brésil', area: 8515767, desc: 'Pays équatorial subissant très peu de déformation.', offset: {x: -12, y: 15}, color: '#7efff5' },
  { iso3: 'AUS', name: 'Australie', area: 7692024, desc: 'Continent massif de l\'Hémisphère Sud.', offset: {x: 15, y: 20}, color: '#ff9f1a' },
  { iso3: 'MEX', name: 'Mexique', area: 1964375, desc: 'Paraît minuscule près du Tropique du Cancer.', offset: {x: -20, y: 5}, color: '#ff9ff3' },
  { iso3: 'GBR', name: 'Royaume-Uni', area: 243610, desc: 'Paraît de la même taille que Madagascar.', offset: {x: -8, y: -35}, color: '#7d5fff' },
  { iso3: 'JPN', name: 'Japon', area: 377930, desc: 'Visuellement allongé par Mercator.', offset: {x: 25, y: -12}, color: '#c56cf0' },
  { iso3: 'DEU', name: 'Allemagne', area: 357022, desc: 'Paraît deux fois plus grande que sa proportion réelle.', offset: {x: 5, y: -30}, color: '#ffb8b8' }
];

/* ═══════════════════════════════════════════════════
   2. DATA INGESTION
═══════════════════════════════════════════════════ */
async function loadAllData() {
  const [countries, world] = await Promise.all([
    fetch('data/countries.json').then(r => r.json()),
    fetch('https://cdn.jsdelivr.net/npm/world-atlas@2.0.2/countries-110m.json').then(r => r.json())
  ]);

  // Merge Somaliland geometry into Somalia by setting its ID to 706 in geometries index
  if (world && world.objects && world.objects.countries) {
    world.objects.countries.geometries.forEach(g => {
      if (g.properties && (g.properties.name === 'Somaliland' || g.properties.name === 'Somalia')) {
        g.id = '706';
      }
    });
  }

  AppState.countriesData = countries.countries;
  AppState.worldTopojson = world;

  // Build lookup mapping
  AppState.countriesData.forEach(c => {
    // Translate common country names to French in memory if needed
    translateCountryName(c);
    AppState.countryByIso3[c.iso3] = c;
    AppState.countryByIsoNum[c.iso_num] = c;
  });

  return { countries, world };
}

let cachedWorldFeatures = null;

function getWorldFeatures() {
  if (cachedWorldFeatures) return cachedWorldFeatures;

  const world = AppState.worldTopojson;
  const features = topojson.feature(world, world.objects.countries);

  const geoms = world.objects.countries.geometries;
  const somaliaGeom = geoms.find(g => g.properties && g.properties.name === 'Somalia');
  const somalilandGeom = geoms.find(g => g.properties && g.properties.name === 'Somaliland');

  if (somaliaGeom && somalilandGeom) {
    const mergedGeometry = topojson.merge(world, [somaliaGeom, somalilandGeom]);
    const somaliaFeature = features.features.find(f => f.id === '706' || f.id === 706);
    if (somaliaFeature) {
      somaliaFeature.geometry = mergedGeometry;
    }
    features.features = features.features.filter(f => f.properties && f.properties.name !== 'Somaliland');
  }

  cachedWorldFeatures = features;
  return cachedWorldFeatures;
}

function translateCountryName(c) {
  const frNames = {
    'Greenland': 'Groenland', 'United States': 'États-Unis', 'China': 'Chine', 'India': 'Inde',
    'Russia': 'Russie', 'Canada': 'Canada', 'Brazil': 'Brésil', 'Australia': 'Australie',
    'Mexico': 'Mexique', 'United Kingdom': 'Royaume-Uni', 'Japan': 'Japon', 'Germany': 'Allemagne',
    'Algeria': 'Algérie', 'Democratic Republic of the Congo': 'RD Congo', 'South Africa': 'Afrique du Sud',
    'Sudan': 'Soudan', 'Libya': 'Libye', 'Chad': 'Tchad', 'Niger': 'Niger', 'Angola': 'Angola',
    'Mali': 'Mali', 'Ethiopia': 'Éthiopie', 'Mauritania': 'Mauritanie', 'Egypt': 'Égypte',
    'Tanzania': 'Tanzanie', 'Nigeria': 'Nigeria', 'Namibia': 'Namibie', 'Mozambique': 'Mozambique',
    'Zambia': 'Zambie', 'Morocco': 'Maroc', 'Somalia': 'Somalie', 'Central African Republic': 'Centrafrique',
    'Madagascar': 'Madagascar', 'Botswana': 'Botswana', 'Kenya': 'Kenya', 'Cameroon': 'Cameroun',
    'Zimbabwe': 'Zimbabwe', 'Republic of the Congo': 'Congo-Brazzaville', 'Ghana': 'Ghana',
    'Senegal': 'Sénégal', 'Tunisia': 'Tunisie', 'Ivory Coast': 'Côte d\'Ivoire', 'Burkina Faso': 'Burkina Faso',
    'Guinea': 'Guinée', 'Uganda': 'Ouganda', 'Malawi': 'Malawi', 'South Sudan': 'Soudan du Sud',
    'Burundi': 'Burundi', 'Rwanda': 'Rwanda', 'Djibouti': 'Djibouti', 'Eritrea': 'Érythrée',
    'Gambia': 'Gambie', 'Guinea-Bissau': 'Guinée-Bissau', 'Sierra Leone': 'Sierra Leone',
    'Liberia': 'Libéria', 'Togo': 'Togo', 'Benin': 'Bénin', 'Equatorial Guinea': 'Guinée Équatoriale',
    'Gabon': 'Gabon', 'Sao Tome and Principe': 'Sao Tomé-et-Principe', 'Cape Verde': 'Cap-Vert',
    'Comoros': 'Comores', 'Mauritius': 'Maurice', 'Seychelles': 'Seychelles', 'Lesotho': 'Lesotho',
    'Swaziland': 'Eswatini', 'Western Sahara': 'Sahara Occidental', 'Western Europe': 'Europe de l\'Ouest', 'Sweden': 'Suède', 'France': 'France',
    'Italy': 'Italie', 'Spain': 'Espagne'
  };
  if (frNames[c.name]) {
    c.name = frNames[c.name];
  }
}

/* ═══════════════════════════════════════════════════
   3. INTRO SYSTEM
═══════════════════════════════════════════════════ */
function initIntro() {
  const intro = document.getElementById('intro');
  const dashboard = document.getElementById('dashboard');
  const cta = document.getElementById('intro-cta');
  const lines = ['intro-line-1', 'intro-line-2', 'intro-line-3'];

  // Draw simple intro map in background
  const svg = d3.select('#intro-map');
  const w = window.innerWidth;
  const h = window.innerHeight;
  svg.attr('width', w).attr('height', h);

  if (AppState.worldTopojson) {
    const projection = d3.geoMercator()
      .scale(w / 6.8)
      .translate([w / 2, h / 1.7])
      .clipExtent([[0, 0], [w, h]]);

    const path = d3.geoPath().projection(projection);
    const countries = getWorldFeatures();

    svg.selectAll('path')
      .data(countries.features)
      .join('path')
      .attr('d', path)
      .attr('fill', d => {
        const c = AppState.countryByIsoNum[+d.id];
        return c && c.continent === 'Africa' ? 'rgba(201,168,76,0.35)' : 'rgba(255,255,255,0.04)';
      })
      .attr('stroke', 'rgba(255,255,255,0.02)')
      .attr('stroke-width', 0.5);
  }

  // Trigger sequential intro texts
  lines.forEach((id, i) => {
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) el.classList.add('visible');
    }, i * 1500 + 400);
  });

  setTimeout(() => {
    if (cta) cta.classList.add('visible');
  }, 4800);

  // Transition to visualizer
  cta.addEventListener('click', () => {
    intro.classList.add('exiting');
    dashboard.classList.remove('hidden');
    setTimeout(() => {
      intro.classList.add('gone');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      triggerMapResize();
    }, 1000);
  });
}

/* ═══════════════════════════════════════════════════
   4. D3 WEBGIS MAP ENGINE
═══════════════════════════════════════════════════ */
let mapSvg, mapG, mapPath, mapProjection;
let compareMercatorG, compareEEG;
let mapW, mapH;

function getProjection(type, w, h) {
  if (type === 'equalearth') {
    return d3.geoEqualEarth().fitExtent([[20, 20], [w - 20, h - 20]], { type: 'Sphere' });
  }
  return d3.geoMercator()
    .scale(w / 6.4)
    .translate([w / 2, h / 1.7])
    .clipExtent([[0, 0], [w, h]]);
}

function initMap() {
  const container = document.getElementById('map-container');
  mapW = container.clientWidth || window.innerWidth;
  mapH = container.clientHeight || 600;

  mapSvg = d3.select('#main-map')
    .attr('width', mapW)
    .attr('height', mapH);

  // Ocean fill
  mapSvg.append('rect')
    .attr('width', mapW)
    .attr('height', mapH)
    .attr('fill', '#040406');

  const graticule = d3.geoGraticule()();
  
  mapSvg.append('path')
    .datum(graticule)
    .attr('class', 'graticule')
    .attr('fill', 'none')
    .attr('stroke', 'rgba(255,255,255,0.015)')
    .attr('stroke-width', 0.5);

  compareMercatorG = mapSvg.append('g').attr('class', 'compare-mercator').style('display', 'none');
  compareEEG = mapSvg.append('g').attr('class', 'compare-ee').style('display', 'none');
  mapG = mapSvg.append('g').attr('class', 'main-map');

  mapProjection = getProjection('mercator', mapW, mapH);
  mapPath = d3.geoPath().projection(mapProjection);

  renderCountries(mapG, mapProjection, false);
  renderCountries(compareMercatorG, getProjection('mercator', mapW, mapH), true);
  renderCountries(compareEEG, getProjection('equalearth', mapW, mapH), true);

  // Sphere outline
  mapSvg.append('path')
    .datum({ type: 'Sphere' })
    .attr('class', 'globe-outline')
    .attr('d', mapPath)
    .attr('fill', 'none');

  // De-select on map ocean click
  mapSvg.on('click', (e) => {
    if (e.target.tagName === 'rect' || e.target.classList.contains('graticule')) {
      resetMapSelection();
    }
  });
}

function triggerMapResize() {
  const container = document.getElementById('map-container');
  if (!container) return;
  mapW = container.clientWidth;
  mapH = container.clientHeight;

  mapSvg.attr('width', mapW).attr('height', mapH);
  mapSvg.select('rect').attr('width', mapW).attr('height', mapH);

  mapProjection = getProjection(AppState.currentProjection, mapW, mapH);
  mapPath = d3.geoPath().projection(mapProjection);

  mapG.selectAll('.country-path').attr('d', mapPath);
  compareMercatorG.selectAll('.country-path').attr('d', d3.geoPath().projection(getProjection('mercator', mapW, mapH)));
  compareEEG.selectAll('.country-path').attr('d', d3.geoPath().projection(getProjection('equalearth', mapW, mapH)));
  mapSvg.select('.globe-outline').attr('d', mapPath);
  
  if (AppState.currentProjection === 'compare') {
    updateCompareSliderPosition(AppState.comparePosition);
  }
}

function renderCountries(group, projection, isSilent) {
  const pathGen = d3.geoPath().projection(projection);
  const countries = getWorldFeatures();

  group.selectAll('path')
    .data(countries.features)
    .join('path')
    .attr('class', d => {
      const c = AppState.countryByIsoNum[+d.id];
      const isAfrica = c && c.continent === 'Africa';
      return `country-path${isAfrica ? ' africa' : ''}`;
    })
    .attr('d', pathGen)
    .on('click', function(event, d) {
      if (isSilent) return;
      event.stopPropagation();
      const c = AppState.countryByIsoNum[+d.id];
      if (!c) return;
      selectCountry(c, d3.select(this));
    });
}

function selectCountry(country, d3Path) {
  mapG.selectAll('.country-path').classed('selected', false);
  d3Path.classed('selected', true);
  AppState.selectedCountry = country;

  // Toggle info panel
  document.querySelector('.info-default').classList.add('hidden');
  const details = document.querySelector('.info-country');
  details.classList.remove('hidden');

  document.getElementById('panel-country-name').textContent = country.name;
  document.getElementById('panel-country-continent').textContent = country.continent.toUpperCase();
  document.getElementById('panel-true-area').textContent = country.area_km2.toLocaleString() + ' km²';
  
  const inflation = ((country.mercator_scale - 1) * 100).toFixed(0);
  document.getElementById('panel-mercator-inflation').textContent = `+${inflation}%`;
  document.getElementById('panel-cdi-score').textContent = country.cdi_norm.toFixed(0);

  // Dynamic sentence in French (grammatically perfect for all countries)
  let desc = '';
  if (country.area_error_pct < 5) {
    desc = "Ce territoire se situe près de l'Équateur. Sa superficie est représentée avec une fidélité optimale sur toutes les projections.";
  } else {
    desc = `Ce territoire subit une inflation visuelle de +${inflation}% sur une carte Mercator. Sa superficie réelle est en réalité ${(country.mercator_scale).toFixed(1)}× plus petite.`;
  }
  document.getElementById('panel-country-desc').textContent = desc;
}

function resetMapSelection() {
  mapG.selectAll('.country-path').classed('selected', false);
  AppState.selectedCountry = null;
  document.querySelector('.info-default').classList.remove('hidden');
  document.querySelector('.info-country').classList.add('hidden');
}

/* ═══════════════════════════════════════════════════
   5. PROJECTION TOGGLES & SWIPE COMPARE
═══════════════════════════════════════════════════ */
function initProjectionToggles() {
  const btns = document.querySelectorAll('.toggle-btn');
  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      btns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const mode = btn.dataset.mode;
      switchMode(mode);
    });
  });

  // Slider events
  const handle = document.querySelector('.swipe-handle');
  const container = document.getElementById('map-container');

  handle.addEventListener('mousedown', () => AppState.isDraggingCompare = true);
  document.addEventListener('mouseup', () => AppState.isDraggingCompare = false);
  
  document.addEventListener('mousemove', (e) => {
    if (!AppState.isDraggingCompare) return;
    const rect = container.getBoundingClientRect();
    const pct = Math.max(5, Math.min(95, ((e.clientX - rect.left) / rect.width) * 100));
    updateCompareSliderPosition(pct);
  });
}

function switchMode(mode) {
  AppState.currentProjection = mode;

  if (mode === 'compare') {
    mapG.style('display', 'none');
    compareMercatorG.style('display', 'block');
    compareEEG.style('display', 'block');
    document.getElementById('swipe-divider').classList.remove('hidden');
    updateCompareSliderPosition(50);
  } else {
    mapG.style('display', 'block');
    compareMercatorG.style('display', 'none');
    compareEEG.style('display', 'none');
    document.getElementById('swipe-divider').classList.add('hidden');

    const targetProj = getProjection(mode, mapW, mapH);
    
    // Transition projection
    mapG.selectAll('.country-path')
      .transition()
      .duration(800)
      .attr('d', d3.geoPath().projection(targetProj));

    mapProjection = targetProj;
    mapPath = d3.geoPath().projection(mapProjection);
    mapSvg.select('.globe-outline').transition().duration(800).attr('d', mapPath);
  }
}

function updateCompareSliderPosition(pct) {
  AppState.comparePosition = pct;
  const divider = document.getElementById('swipe-divider');
  divider.style.left = `${pct}%`;

  // Apply clip-paths
  compareEEG.attr('clip-path', `inset(0 0 0 ${pct}%)`);
  compareMercatorG.attr('clip-path', `inset(0 ${100 - pct}% 0 0)`);
}

/* ═══════════════════════════════════════════════════
   6. THE AFRICA PUZZLE GAME
═══════════════════════════════════════════════════ */
let puzzleProjection, puzzlePath, puzzleAfricaFeatures;

function initPuzzleGame() {
  const deck = document.getElementById('territory-deck');
  if (!deck) return;

  // Initialize D3 canvas for Africa silhouette
  const pSvg = d3.select('#puzzle-map');
  const canvasEl = document.getElementById('puzzle-map');
  const w = canvasEl.clientWidth || 320;
  const h = 250;
  pSvg.attr('width', w).attr('height', h);

  const geoObj = getWorldFeatures();
  puzzleAfricaFeatures = geoObj.features.filter(f => AppState.countryByIsoNum[+f.id]?.continent === 'Africa');

  // Fit projection exactly to Africa's boundaries
  puzzleProjection = d3.geoEqualEarth().fitSize([w, h], { type: 'FeatureCollection', features: puzzleAfricaFeatures });
  puzzlePath = d3.geoPath().projection(puzzleProjection);

  // Draw background Africa outline
  pSvg.append('g')
    .attr('class', 'africa-group')
    .selectAll('path')
    .data(puzzleAfricaFeatures)
    .join('path')
    .attr('class', 'puzzle-africa-shadow')
    .attr('d', puzzlePath);

  // Draw empty group for injected countries
  pSvg.append('g').attr('class', 'injected-group');

  PUZZLE_TERRITORIES.forEach(t => {
    const card = document.createElement('div');
    card.className = 'territory-card';
    card.dataset.iso3 = t.iso3;
    card.innerHTML = `
      <span class="tc-checkmark">✓</span>
      <div class="tc-name">${t.name}</div>
      <div class="tc-area">${(t.area / 1000000).toFixed(2)} M km²</div>
      <div class="tc-share">${((t.area / AFRICA_TRUE_AREA) * 100).toFixed(1)}% de l'Afrique</div>
    `;
    card.addEventListener('click', () => togglePuzzleCountry(t, card));
    deck.appendChild(card);
  });

  document.getElementById('reset-puzzle-btn').addEventListener('click', resetPuzzle);
}

function togglePuzzleCountry(country, cardEl) {
  if (AppState.puzzleSelected.has(country.iso3)) {
    AppState.puzzleSelected.delete(country.iso3);
    cardEl.classList.remove('selected');
  } else {
    AppState.puzzleSelected.add(country.iso3);
    cardEl.classList.add('selected');
  }
  updatePuzzleMetrics();
}

function updatePuzzleMetrics() {
  const selectedList = PUZZLE_TERRITORIES.filter(t => AppState.puzzleSelected.has(t.iso3));
  const totalArea = selectedList.reduce((sum, t) => sum + t.area, 0);
  const pct = Math.min(100, Math.round((totalArea / AFRICA_TRUE_AREA) * 100));
  const remaining = Math.max(0, AFRICA_TRUE_AREA - totalArea);

  // Update metrics UI
  document.getElementById('puzzle-bar').style.width = `${pct}%`;
  document.getElementById('puzzle-filled-pct').textContent = pct;
  document.getElementById('puzzle-countries-count').textContent = selectedList.length;
  document.getElementById('puzzle-remaining-area').textContent = (remaining / 1000000).toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' M';

  // Render silhouettes inside Africa container
  const pSvg = d3.select('#puzzle-map');
  const injectedG = pSvg.select('.injected-group');
  injectedG.selectAll('*').remove();

  const canvasEl = document.getElementById('puzzle-map');
  const w = canvasEl.clientWidth || 320;
  const h = 250;

  selectedList.forEach(t => {
    const geoObj = getWorldFeatures();
    const feature = geoObj.features.find(f => AppState.countryByIsoNum[+f.id]?.iso3 === t.iso3);
    if (!feature) return;

    // Centroid of country geometry
    const centroid = d3.geoCentroid(feature);
    
    // Create translation projection using standard scale factor of Africa map
    const cProj = d3.geoEqualEarth()
      .scale(puzzleProjection.scale())
      .center(centroid)
      .translate([w / 2 + (t.offset?.x || 0), h / 2 + (t.offset?.y || 0)]);

    const cPath = d3.geoPath().projection(cProj);

    injectedG.append('path')
      .datum(feature)
      .attr('class', 'puzzle-injected-path')
      .attr('d', cPath)
      .attr('stroke', t.color || 'var(--gold)')
      .style('stroke', t.color || 'var(--gold)')
      .style('--glow-color', t.color || 'var(--gold)');
  });
}

function resetPuzzle() {
  AppState.puzzleSelected.clear();
  document.querySelectorAll('.territory-card').forEach(c => c.classList.remove('selected'));
  updatePuzzleMetrics();
}

/* ═══════════════════════════════════════════════════
   7. THE DISTORTION DUEL
═══════════════════════════════════════════════════ */
function initDuelSystem() {
  const selA = document.getElementById('duel-sel-a');
  const selB = document.getElementById('duel-sel-b');

  // Populate dropdown lists
  const sorted = [...AppState.countriesData].sort((a, b) => a.name.localeCompare(b.name));
  sorted.forEach(c => {
    const optA = document.createElement('option');
    const optB = document.createElement('option');
    optA.value = c.iso3;
    optA.textContent = c.name;
    optB.value = c.iso3;
    optB.textContent = c.name;
    
    selA.appendChild(optA);
    selB.appendChild(optB.cloneNode(true));
  });

  selA.value = AppState.duelA;
  selB.value = AppState.duelB;

  selA.addEventListener('change', (e) => { AppState.duelA = e.target.value; triggerDuel(); });
  selB.addEventListener('change', (e) => { AppState.duelB = e.target.value; triggerDuel(); });

  // Prefill buttons
  document.querySelectorAll('.btn-quick-duel').forEach(btn => {
    btn.addEventListener('click', () => {
      selA.value = btn.dataset.a;
      selB.value = btn.dataset.b;
      AppState.duelA = btn.dataset.a;
      AppState.duelB = btn.dataset.b;
      triggerDuel();
    });
  });

  triggerDuel();
}

function triggerDuel() {
  const countryA = AppState.countryByIso3[AppState.duelA];
  const countryB = AppState.countryByIso3[AppState.duelB];
  if (!countryA || !countryB) return;

  // Update text values
  document.getElementById('duel-name-a').textContent = countryA.name;
  document.getElementById('duel-area-a').textContent = (countryA.area_km2 / 1000000).toFixed(2) + ' M km²';
  document.getElementById('duel-scale-a').textContent = `${countryA.mercator_scale.toFixed(1)}×`;

  document.getElementById('duel-name-b').textContent = countryB.name;
  document.getElementById('duel-area-b').textContent = (countryB.area_km2 / 1000000).toFixed(2) + ' M km²';
  document.getElementById('duel-scale-b').textContent = `${countryB.mercator_scale.toFixed(1)}×`;

  // Draw silhouettes
  drawSilhouette(countryA, '#duel-svg-a', 'silhouette-path-mercator');
  drawSilhouette(countryB, '#duel-svg-b', 'silhouette-path-equalearth');

  // Comparison sentence
  let sentence = '';
  const areaRatio = countryA.area_km2 / countryB.area_km2;
  const percRatio = (countryA.area_km2 * countryA.mercator_scale) / (countryB.area_km2 * countryB.mercator_scale);

  if (areaRatio > 1) {
    sentence = `En réalité, ${countryA.name} est ${(areaRatio).toFixed(1)}× plus grand que ${countryB.name}. Pourtant, sur Mercator, l'effet d'optique le fait paraître ${(percRatio).toFixed(1)}× plus grand.`;
  } else {
    sentence = `En réalité, ${countryA.name} est ${(1/areaRatio).toFixed(1)}× plus petit que ${countryB.name}. Pourtant, sur Mercator, il apparaît ${(percRatio).toFixed(1)}× plus grand.`;
  }
  document.getElementById('duel-outcome-sentence').textContent = sentence;
}

function drawSilhouette(country, svgId, pathClass) {
  const svg = d3.select(svgId);
  svg.selectAll('*').remove();

  // Find geojson geometry feature
  const geoObj = getWorldFeatures();
  const feature = geoObj.features.find(f => AppState.countryByIsoNum[+f.id]?.iso3 === country.iso3);

  if (!feature) return;

  const w = 200, h = 200;
  // Fit shape with a 20px padding to avoid any clipping issues at borders
  const proj = d3.geoEqualEarth().fitExtent([[20, 20], [w - 20, h - 20]], feature);
  const path = d3.geoPath().projection(proj);

  svg.append('path')
    .datum(feature)
    .attr('class', pathClass)
    .attr('d', path);
}

/* ═══════════════════════════════════════════════════
   8. PLEDGE EVENT & BOOT
═══════════════════════════════════════════════════ */
function initActionCenter() {
  const btn = document.getElementById('submit-pledge-btn');
  if (!btn) return;
  btn.addEventListener('click', () => {
    if (AppState.pledgeSubmitted) return;
    AppState.pledgeSubmitted = true;
    
    btn.textContent = 'Serment Signé ! ✓';
    btn.style.background = 'var(--green)';
    btn.style.color = '#fff';

    const countEl = document.getElementById('pledge-count');
    if (!countEl) return;
    const startVal = parseInt(countEl.textContent.replace(/\s/g, ''));
    
    let progress = 0;
    const interval = setInterval(() => {
      progress += 42;
      countEl.textContent = (startVal + progress).toLocaleString('fr-FR');
      if (progress >= 300) clearInterval(interval);
    }, 30);
  });
}

// Close panel listener
document.querySelector('.close-panel-btn')?.addEventListener('click', resetMapSelection);

async function boot() {
  try {
    await loadAllData();
    initIntro();
    initMap();
    initProjectionToggles();
    initPuzzleGame();
    initDuelSystem();
    initActionCenter();
    
    if (window.initAllWow) window.initAllWow();
    
    window.addEventListener('resize', triggerMapResize);
  } catch (e) {
    console.error('Boot failure:', e);
  }
}

document.addEventListener('DOMContentLoaded', boot);
