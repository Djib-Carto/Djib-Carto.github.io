// ═══════════════════════════════════════════════════
//  DATA
// ═══════════════════════════════════════════════════
const AF = {
  EGY:{name:"Égypte",flag:"🇪🇬",region:"Afrique du Nord",prod:1600000,growth:9.2,species:["Tilapia du Nil","Mulet gris","Carpe","Crevettes","Bar"],note:"1er producteur africain. 80% de la production nationale provient de l'aquaculture. Grands projets Fayrouz & Ghalyoun.",src:"FAO SOFIA 2026 ; FishStat 2026"},
  NGA:{name:"Nigéria",flag:"🇳🇬",region:"Afrique de l'Ouest",prod:258000,growth:7.5,species:["Silure africain (Clarias)","Tilapia","Crevettes d'eau douce"],note:"2e producteur africain, 1er en Afrique subsaharienne. Leader mondial de l'élevage de silure.",src:"FAO FishStat 2026"},
  UGA:{name:"Ouganda",flag:"🇺🇬",region:"Afrique de l'Est",prod:103000,growth:10.5,species:["Tilapia du Nil","Silure africain"],note:"3e producteur africain. Élevage intensif en cages sur le Lac Victoria.",src:"FAO FishStat 2026 ; WorldFish 2026"},
  GHA:{name:"Ghana",flag:"🇬🇭",region:"Afrique de l'Ouest",prod:122000,growth:12.0,species:["Tilapia","Silure africain","Crevettes"],note:"Croissance rapide tirée par l'aquaculture industrielle en cage sur le lac Volta.",src:"FAO FishStat 2026"},
  ZMB:{name:"Zambie",flag:"🇿🇲",region:"Afrique Australe",prod:75600,growth:9.8,species:["Tilapia du Nil","Carpe commune"],note:"4e producteur subsaharien. Développement majeur de cages commerciales sur le lac Kariba.",src:"FAO FishStat 2026"},
  TZA:{name:"Tanzanie",flag:"🇹🇿",region:"Afrique de l'Est",prod:43600,growth:8.3,species:["Tilapia","Silure","Algues (Zanzibar)","Crevettes"],note:"Forte croissance en eau douce (Lac Victoria), mariculture côtière et algues rouges.",src:"FAO FishStat 2026"},
  MAR:{name:"Maroc",flag:"🇲🇦",region:"Afrique du Nord",prod:42000,growth:6.5,species:["Huîtres","Moules","Bar","Daurade royale"],note:"Leader de la mariculture atlantique / méditerranéenne nord-africaine.",src:"FAO FishStat 2024; APEBI Maroc"},
  KEN:{name:"Kenya",flag:"🇰🇪",region:"Afrique de l'Est",prod:27900,growth:7.8,species:["Tilapia","Truite arc-en-ciel"],note:"Programmes nationaux de soutien aux pisciculteurs (étangs et cages).",src:"FAO FishStat 2026"},
  TUN:{name:"Tunisie",flag:"🇹🇳",region:"Afrique du Nord",prod:21000,growth:5.1,species:["Bar","Daurade","Palourdes","Huîtres"],note:"Spécialisation dans la mariculture méditerranéenne en cages flottantes.",src:"FAO FishStat 2026"},
  MDG:{name:"Madagascar",flag:"🇲🇬",region:"Afrique de l'Est",prod:18000,growth:5.5,species:["Crevettes marines","Tilapia","Algues"],note:"Pionnier de l'aquaculture de crevettes certifiée bio pour l'exportation.",src:"FAO FishStat 2026"},
  MWI:{name:"Malawi",flag:"🇲🇼",region:"Afrique de l'Est",prod:9900,growth:8.5,species:["Tilapia Chambo","Carpe"],note:"Élevage de l'espèce endémique Chambo (Oreochromis karongae).",src:"FAO FishStat 2024"},
  RWA:{name:"Rwanda",flag:"🇷🇼",region:"Afrique de l'Est",prod:10200,growth:14.2,species:["Tilapia du Nil","Carpe"],note:"Plus forte croissance d'Afrique centrale/Est grâce aux cages lacustres.",src:"FAO FishStat 2026"},
  SDN:{name:"Soudan",flag:"🇸🇩",region:"Afrique de l'Est",prod:9800,growth:5.5,species:["Tilapia du Nil","Silure"],note:"Aquaculture fluviale le long du Nil Blanc et dans les retenues de barrages.",src:"FAO FishStat 2026"},
  CIV:{name:"Côte d'Ivoire",flag:"🇨🇮",region:"Afrique de l'Ouest",prod:9500,growth:9.2,species:["Tilapia","Silure"],note:"Production lagunaire en développement avec le programme national PONADEPA.",src:"FAO FishStat 2026"},
  ZWE:{name:"Zimbabwe",flag:"🇿🇼",region:"Afrique Australe",prod:8700,growth:7.2,species:["Tilapia du Nil"],note:"Aquaculture commerciale intensive de Tilapia concentrée sur le lac Kariba.",src:"World Bank / FAO 2023"},
  DZA:{name:"Algérie",flag:"🇩🇿",region:"Afrique du Nord",prod:5200,growth:6.2,species:["Carpe","Tilapia rouge","Daurade royale"],note:"Développement innovant de l'aquaculture en eaux sahariennes et oasiennes.",src:"FAO FishStat 2026"},
  ZAF:{name:"Afrique du Sud",flag:"🇿🇦",region:"Afrique Australe",prod:5000,growth:4.5,species:["Ormeau Haliotis","Huîtres","Moules","Truite"],note:"Leader mondial de l'aquaculture d'ormeau en bassins terrestres fermés.",src:"DFFE / FAO FishStat 2026"},
  MOZ:{name:"Mozambique",flag:"🇲🇿",region:"Afrique Australe",prod:4800,growth:6.2,species:["Crevettes","Tilapia"],note:"Élevage de crevettes côtières et tilapia dans le lac Cahora Bassa.",src:"FAO FishStat 2024"},
  AGO:{name:"Angola",flag:"🇦🇴",region:"Afrique Australe",prod:4500,growth:7.0,species:["Tilapia","Silure"],note:"Secteur en reconstruction avec développement de stations pilotes publiques.",src:"FAO Country Profile 2024"},
  NAM:{name:"Namibie",flag:"🇳🇦",region:"Afrique Australe",prod:3200,growth:4.8,species:["Huîtres du Pacifique","Moules","Tilapia"],note:"Mariculture d'huîtres de haute qualité dans les eaux froides du courant de Benguela.",src:"FAO FishStat 2024"},
  SEN:{name:"Sénégal",flag:"🇸🇳",region:"Afrique de l'Ouest",prod:3800,growth:9.5,species:["Tilapia du Nil","Silure","Huîtres de mangrove"],note:"Stratégie nationale portée par l'ANA. Fort potentiel estuarien et côtier.",src:"USDA GAIN 2023 ; FAO FishStat 2026"},
  COD:{name:"RD Congo",flag:"🇨🇩",region:"Afrique Centrale",prod:3000,growth:5.5,species:["Tilapia","Silure"],note:"Immense réseau hydrographique propice, dominé par la pisciculture familiale.",src:"FAO FishStat 2024"},
  BEN:{name:"Bénin",flag:"🇧🇯",region:"Afrique de l'Ouest",prod:3100,growth:11.5,species:["Tilapia","Silure"],note:"Développement des enclos et cages sur les lacs Nokoué et Ahémé.",src:"FAO FishStat 2024"},
  CMR:{name:"Cameroun",flag:"🇨🇲",region:"Afrique Centrale",prod:2400,growth:8.8,species:["Silure africain","Tilapia","Carpe"],note:"Soutien gouvernemental pour réduire les importations massives de poissons gelés.",src:"FAO Country Profile 2024"},
  ETH:{name:"Éthiopie",flag:"🇪🇹",region:"Afrique de l'Est",prod:1100,growth:6.5,species:["Tilapia du Nil"],note:"Aquaculture artisanale émergente dans les lacs de la vallée du Rift.",src:"FAO FishStat 2024"},
  TGO:{name:"Togo",flag:"🇹🇬",region:"Afrique de l'Ouest",prod:1500,growth:6.8,species:["Tilapia","Silure"],note:"Soutien à la pisciculture en étangs et promotion des cages lacustres.",src:"FAO/Tridge 2022"},
  SSD:{name:"Soudan du Sud",flag:"🇸🇸",region:"Afrique de l'Est",prod:1200,growth:4.0,species:["Tilapia","Silure"],note:"Aquaculture artisanale le long du bassin du Haut-Nil Blanc.",src:"FAO FishStat 2024"},
  GNB:{name:"Guinée-Bissau",flag:"🇬🇼",region:"Afrique de l'Ouest",prod:1100,growth:5.2,species:["Huîtres de mangrove"],note:"Collecte et culture pilote d'huîtres estuariennes.",src:"FAO FishStat 2024"},
  BFA:{name:"Burkina Faso",flag:"🇧🇫",region:"Afrique de l'Ouest",prod:900,growth:8.0,species:["Tilapia","Silure"],note:"Pisciculture associative d'eau douce dans les retenues collinaires.",src:"FAO Country Profile 2022"},
  MLI:{name:"Mali",flag:"🇲🇱",region:"Afrique de l'Ouest",prod:800,growth:4.5,species:["Tilapia","Silure"],note:"Projets d'aménagements piscicoles dans le delta central du fleuve Niger.",src:"FAO FishStat 2024"},
  GIN:{name:"Guinée",flag:"🇬🇳",region:"Afrique de l'Ouest",prod:700,growth:5.0,species:["Tilapia","Silure"],note:"Aquaculture en étangs en Guinée Forestière et mariculture pilote.",src:"FAO Country Profile 2021"},
  NER:{name:"Niger",flag:"🇳🇪",region:"Afrique de l'Ouest",prod:500,growth:3.5,species:["Tilapia"],note:"Élevage pilote en étangs argileux dans la vallée du fleuve Niger.",src:"FAO FishStat 2024"},
  TCD:{name:"Tchad",flag:"🇹🇩",region:"Afrique Centrale",prod:400,growth:3.0,species:["Tilapia","Silure"],note:"Secteur naissant visant à diversifier les revenus des pêcheurs du lac Tchad.",src:"FAO FishStat 2024"}
};

const CONTINENTS = [
  {name:"Asie",       s:91.8, c:"#0095d5"},
  {name:"Am. Latine", s:3.14, c:"#27ae60"},
  {name:"Europe",     s:2.45, c:"#2471a3"},
  {name:"Afrique",    s:1.93, c:"#00ffcc"},
  {name:"Am. Nord",   s:0.44, c:"#f39c12"},
  {name:"Océanie",    s:0.18, c:"#ca6f1e"}
];

const ISO_NUM = {
  "818":"EGY","566":"NGA","800":"UGA","288":"GHA","834":"TZA","894":"ZMB",
  "504":"MAR","646":"RWA","710":"ZAF","404":"KEN","788":"TUN","384":"CIV",
  "204":"BEN","454":"MWI","231":"ETH","120":"CMR","450":"MDG","686":"SEN",
  "508":"MOZ","024":"AGO","180":"COD","516":"NAM","768":"TGO","728":"SSD",
  "624":"GNB","854":"BFA","466":"MLI","324":"GIN","562":"NER","148":"TCD",
  "012":"DZA","716":"ZWE","729":"SDN"
};

const REAL_AF = new Set([12,24,72,86,108,120,132,140,148,174,178,180,204,231,232,262,266,270,288,
  324,334,384,404,426,430,434,450,454,466,478,504,508,516,562,566,624,646,678,
  686,694,706,710,716,724,728,729,732,740,768,788,800,818,834,854,894]);

function isAF(n) { return REAL_AF.has(parseInt(n)); }
function getColor(iso) {
  const d = AF[iso]; if (!d) return null;
  if (d.prod >= 1000000) return "#00ffcc";
  if (d.prod >= 100000)  return "#3dd6ff";
  if (d.prod >= 10000)   return "#f5c542";
  if (d.prod >= 1000)    return "#ff8c42";
  return "#ff4d6d";
}
function fmtP(p) {
  if (p >= 1e6) return (p/1e6).toFixed(2) + ' Mt';
  if (p >= 1000) return (p/1000).toFixed(0) + ' kt';
  return p + ' t';
}

// Pre-compute ranks
const sortedAF = Object.entries(AF).sort((a,b) => b[1].prod - a[1].prod);
const totalAF  = sortedAF.reduce((s,[,d]) => s + d.prod, 0);
sortedAF.forEach(([,d], i) => { d.rank = i+1; d.share = (d.prod/totalAF*100); });

// ═══════════════════════════════════════════════════
//  MAP
// ═══════════════════════════════════════════════════
let projection, geoPath, zoom, currentCountries;
let selectedISO = null;

function initMap() {
  const svg = d3.select('#map-svg');
  const W   = window.innerWidth;
  const H   = window.innerHeight;

  projection = d3.geoMercator().scale(180).center([20, 5]).translate([W/2, H/2]);
  geoPath    = d3.geoPath().projection(projection);

  zoom = d3.zoom()
    .scaleExtent([0.8, 25])
    .on('zoom', e => {
      d3.select('#map-g').attr('transform', e.transform);
      d3.select('#bubbles-g').attr('transform', e.transform);
      d3.select('#labels-g').attr('transform', e.transform);
      updateLabels(e.transform.k);
    });
  svg.call(zoom);

  document.getElementById('btn-zi').onclick = () => svg.transition().duration(300).call(zoom.scaleBy, 1.5);
  document.getElementById('btn-zo').onclick = () => svg.transition().duration(300).call(zoom.scaleBy, 0.67);
  document.getElementById('btn-zr').onclick = () => focusAfrica(svg);

  fetch('https://cdn.jsdelivr.net/npm/world-atlas@2.0.2/countries-110m.json')
    .then(r => r.json())
    .then(world => {
      currentCountries = topojson.feature(world, world.objects.countries);
      drawMap(svg, currentCountries);
      buildChartPanel();
      buildDonut();
      setTimeout(() => focusAfrica(svg), 300);
    })
    .catch(() => {
      d3.select('#map-g').append('text')
        .attr('x', W/2).attr('y', H/2)
        .attr('text-anchor','middle').attr('fill','#5a8ba8')
        .attr('font-size', 16)
        .text('Impossible de charger la carte.');
    });

  window.addEventListener('resize', () => {
    const nW = window.innerWidth, nH = window.innerHeight;
    projection.translate([nW/2, nH/2]);
    geoPath = d3.geoPath().projection(projection);
    d3.selectAll('.land-path').attr('d', geoPath);
    if (currentCountries) redrawBubbles();
  });
}

function getCountryFill(d) {
  const iso = ISO_NUM[String(d.id).padStart(3,'0')];
  if (iso && AF[iso]) return getColor(iso) + 'cc';
  if (isAF(d.id)) return 'rgba(60,180,150,0.12)';
  return 'rgba(20,60,100,0.35)';
}

function drawMap(svg, countries) {
  const g = d3.select('#map-g');
  g.selectAll('.land-path')
    .data(countries.features)
    .enter().append('path')
    .attr('class', d => {
      const iso = ISO_NUM[String(d.id).padStart(3,'0')];
      return 'land-path' + (iso && AF[iso] ? ' af-doc' : '');
    })
    .attr('d', geoPath)
    .attr('fill', getCountryFill)
    .attr('filter', d => {
      const iso = ISO_NUM[String(d.id).padStart(3,'0')];
      return (iso && AF[iso]) ? 'url(#glow)' : null;
    })
    .on('mousemove', (ev, d) => {
      const iso = ISO_NUM[String(d.id).padStart(3,'0')];
      if (iso && AF[iso]) showTooltip(ev, AF[iso], iso);
      else hideTooltip();
    })
    .on('mouseleave', hideTooltip)
    .on('click', (ev, d) => {
      const iso = ISO_NUM[String(d.id).padStart(3,'0')];
      if (iso && AF[iso]) selectCountry(iso);
    });
  drawBubbles(countries);
  drawLabels(countries);
}

// ── Proportional Bubbles
function drawBubbles(countries) {
  const g    = d3.select('#bubbles-g');
  g.selectAll('*').remove();
  const maxP = Math.max(...Object.values(AF).map(d => d.prod));
  countries.features.forEach(f => {
    const iso = ISO_NUM[String(f.id).padStart(3,'0')];
    if (!iso || !AF[iso]) return;
    const d = AF[iso];
    const centroid = geoPath.centroid(f);
    if (!centroid || isNaN(centroid[0]) || isNaN(centroid[1])) return;
    const r   = Math.max(3, Math.sqrt(d.prod / maxP) * 16);
    const col = getColor(iso);
    const grp = g.append('g')
      .attr('class', 'map-bubble')
      .attr('transform', `translate(${centroid[0]},${centroid[1]})`)
      .style('cursor', 'pointer')
      .on('click', () => selectCountry(iso))
      .on('mousemove', ev => showTooltip(ev, d, iso))
      .on('mouseleave', hideTooltip);
    grp.append('circle').attr('r', r+2).attr('fill','none')
      .attr('stroke', col).attr('stroke-width', 0.8).attr('opacity', 0.22);
    grp.append('circle').attr('class','bubble-circle').attr('r', r)
      .attr('fill', col+'25').attr('stroke', col).attr('stroke-width', 1.2);
  });
}

function redrawBubbles() { if (currentCountries) drawBubbles(currentCountries); }

// ── Country Labels (adaptive size + zoom-aware visibility)
const SHORT = {
  'CIV':"Côte d'Ivoire", 'ZAF':'Afrique du Sud', 'GNB':'Guinée-Bissau',
  'SSD':'Soudan du Sud', 'COD':'RD Congo',       'MDG':'Madagascar',
  'MOZ':'Mozambique',  'CMR':'Cameroun',        'AGO':'Angola'
};

function drawLabels(countries) {
  const lg = d3.select('#labels-g');
  lg.selectAll('*').remove();

  countries.features.forEach(f => {
    const iso = ISO_NUM[String(f.id).padStart(3,'0')];
    if (!iso || !AF[iso]) return;
    const d   = AF[iso];
    const cen = geoPath.centroid(f);
    if (!cen || isNaN(cen[0]) || isNaN(cen[1])) return;

    // Bounding-box size as proxy for country visual size (px at zoom=1)
    const b   = geoPath.bounds(f);
    if (!b) return;
    const area = Math.sqrt((b[1][0]-b[0][0]) * (b[1][1]-b[0][1]));

    const label = SHORT[iso] || d.name;

    // Each label group: text with outline stroke for legibility
    const grp = lg.append('g')
      .attr('class', 'map-label')
      .attr('data-area', area)
      .attr('transform', `translate(${cen[0]},${cen[1]})`);

    // Outline (thicker, black)
    grp.append('text')
      .attr('class', 'lbl-stroke')
      .attr('text-anchor', 'middle')
      .attr('dominant-baseline', 'middle')
      .attr('fill', 'none')
      .attr('stroke', 'rgba(0,0,0,0.65)')
      .attr('stroke-linejoin', 'round')
      .style('font-family', 'system-ui, sans-serif')
      .style('font-weight', '700')
      .style('pointer-events', 'none')
      .text(label);

    // Fill text (white)
    grp.append('text')
      .attr('class', 'lbl-fill')
      .attr('text-anchor', 'middle')
      .attr('dominant-baseline', 'middle')
      .attr('fill', '#ffffff')
      .style('font-family', 'system-ui, sans-serif')
      .style('font-weight', '700')
      .style('pointer-events', 'none')
      .text(label);
  });
}

function updateLabels(k) {
  d3.selectAll('.map-label').each(function() {
    const el   = d3.select(this);
    const area = parseFloat(el.attr('data-area'));
    // Visual size of country at current zoom
    const vis  = area * k;

    // Hide if country too small on screen
    if (vis < 22) {
      el.style('display', 'none');
      return;
    }
    el.style('display', null);

    // Font size: proportional to country size but constant on screen
    const fs = Math.max(7, Math.min(13, area * 0.1)) / k;
    const sw = (2.4 / k);

    el.select('.lbl-stroke')
      .attr('font-size', fs + 'px')
      .attr('stroke-width', sw + 'px');
    el.select('.lbl-fill')
      .attr('font-size', fs + 'px');
  });
}

// ── Focus Africa
function focusAfrica(svg) {
  const W = window.innerWidth, H = window.innerHeight;
  const p1 = projection([-22, 40]), p2 = projection([55, -37]);
  if (!p1 || !p2) return;
  const s  = Math.min((W * 0.68) / (p2[0]-p1[0]), (H * 0.88) / (p2[1]-p1[1]));
  const tx = W * 0.44 - s * (p1[0]+p2[0])/2;
  const ty = H * 0.50 - s * (p1[1]+p2[1])/2;
  svg.transition().duration(1400).ease(d3.easeCubicInOut)
    .call(zoom.transform, d3.zoomIdentity.translate(tx, ty).scale(s));
}

// ── Country Selection
function selectCountry(iso) {
  const d = AF[iso]; if (!d) return;
  selectedISO = iso;
  const col = getColor(iso);
  d3.selectAll('.land-path')
    .attr('fill', f => {
      const fi = ISO_NUM[String(f.id).padStart(3,'0')];
      if (fi === iso) return col;
      if (fi && AF[fi]) return getColor(fi) + 'cc';
      if (isAF(f.id)) return 'rgba(60,180,150,0.12)';
      return 'rgba(20,60,100,0.35)';
    })
    .classed('selected', f => ISO_NUM[String(f.id).padStart(3,'0')] === iso);
  document.getElementById('info-flag').textContent   = d.flag;
  document.getElementById('info-name').textContent   = d.name;
  document.getElementById('info-region').textContent = d.region;
  const pEl = document.getElementById('info-prod');
  pEl.textContent = fmtP(d.prod); pEl.style.color = col;
  document.getElementById('info-growth').textContent = '+' + d.growth + '%';
  document.getElementById('info-rank').textContent   = '#' + d.rank;
  document.getElementById('info-share').textContent  = d.share.toFixed(2) + '%';
  document.getElementById('info-species').innerHTML  = d.species.map(s => `<span class="sp-tag">${s}</span>`).join('');
  document.getElementById('info-note').textContent   = d.note;
  document.getElementById('info-src').textContent    = d.src;
  document.getElementById('info-panel').classList.remove('hidden');
}

document.getElementById('info-close').onclick = () => {
  document.getElementById('info-panel').classList.add('hidden');
  selectedISO = null;
  d3.selectAll('.land-path').attr('fill', getCountryFill).classed('selected', false);
};

// ── Tooltip
function showTooltip(ev, data, iso) {
  const col = getColor(iso);
  document.getElementById('tt-name').textContent = data.flag + '  ' + data.name;
  const pe = document.getElementById('tt-prod');
  pe.textContent = fmtP(data.prod); pe.style.color = col;
  document.getElementById('tooltip').classList.remove('hidden');
  positionTooltip(ev);
}
function positionTooltip(ev) {
  const tt = document.getElementById('tooltip');
  let x = ev.clientX + 14, y = ev.clientY + 14;
  const r = tt.getBoundingClientRect();
  if (x + r.width  > window.innerWidth)  x = ev.clientX - r.width  - 14;
  if (y + r.height > window.innerHeight) y = ev.clientY - r.height - 14;
  tt.style.left = x + 'px'; tt.style.top = y + 'px';
}
document.getElementById('map-svg').addEventListener('mousemove', ev => {
  if (!document.getElementById('tooltip').classList.contains('hidden')) positionTooltip(ev);
});
function hideTooltip() { document.getElementById('tooltip').classList.add('hidden'); }

// ═══════════════════════════════════════════════════
//  CHART PANEL — Top 10
// ═══════════════════════════════════════════════════
function buildChartPanel() {
  const container = document.getElementById('chart-bars');
  const top10 = sortedAF.slice(0, 10);
  const maxP = top10[0][1].prod;
  top10.forEach(([iso, d]) => {
    const col = getColor(iso);
    const pct = d.prod / maxP * 100;
    const row = document.createElement('div');
    row.className = 'bar-row'; row.style.cursor = 'pointer';
    row.addEventListener('click', () => selectCountry(iso));
    row.innerHTML = `
      <div class="bar-row-hdr">
        <span class="bar-label">${d.name}</span>
        <span class="bar-value" style="color:${col}">${fmtP(d.prod)}</span>
      </div>
      <div class="bar-track">
        <div class="bar-fill" style="width:${pct}%;background:${col};"></div>
      </div>`;
    container.appendChild(row);
  });
}

// ═══════════════════════════════════════════════════
//  DONUT — Part Mondiale
// ═══════════════════════════════════════════════════
function buildDonut() {
  const svg = d3.select('#mini-donut');
  const leg = document.getElementById('donut-legend');
  const cx = 35, cy = 35, R = 28, r = 16;
  let ang = -Math.PI / 2;
  const tot = CONTINENTS.reduce((s, c) => s + c.s, 0);
  CONTINENTS.forEach(c => {
    const th = c.s / tot * 2 * Math.PI;
    const x1 = cx + R*Math.cos(ang), y1 = cy + R*Math.sin(ang);
    const x2 = cx + R*Math.cos(ang+th), y2 = cy + R*Math.sin(ang+th);
    const x3 = cx + r*Math.cos(ang+th), y3 = cy + r*Math.sin(ang+th);
    const x4 = cx + r*Math.cos(ang), y4 = cy + r*Math.sin(ang);
    const la = th > Math.PI ? 1 : 0;
    const p = document.createElementNS('http://www.w3.org/2000/svg','path');
    p.setAttribute('d', `M${x1},${y1} A${R},${R} 0 ${la},1 ${x2},${y2} L${x3},${y3} A${r},${r} 0 ${la},0 ${x4},${y4} Z`);
    p.setAttribute('fill', c.c); p.setAttribute('opacity','0.9');
    p.setAttribute('stroke','#0a1628'); p.setAttribute('stroke-width','1');
    svg.node().appendChild(p); ang += th;
  });
  const mk = (x,y,s,w,col,txt) => {
    const el = document.createElementNS('http://www.w3.org/2000/svg','text');
    el.setAttribute('x',x); el.setAttribute('y',y); el.setAttribute('text-anchor','middle');
    el.setAttribute('fill',col); el.setAttribute('font-size',s); el.setAttribute('font-weight',w);
    el.setAttribute('font-family','Inter,sans-serif'); el.textContent = txt;
    svg.node().appendChild(el);
  };
  mk('35','33','7.5','700','#00ffcc','1.93%');
  mk('35','41','5.5','400','#6b9ab8','Afrique');
  CONTINENTS.forEach(c => {
    const row = document.createElement('div');
    row.className = 'dl-row';
    row.innerHTML = `<span class="dl-dot" style="background:${c.c}"></span><span>${c.name}</span><span style="margin-left:auto;font-weight:600;color:#e8f4ff;">${c.s}%</span>`;
    leg.appendChild(row);
  });
}

// ═══════════════════════════════════════════════════
//  EXPORT — Canvas HD 1920×1080
// ═══════════════════════════════════════════════════
document.getElementById('btn-export').addEventListener('click', exportMap);

async function exportMap() {
  const overlay = document.getElementById('export-overlay');
  const exTxt   = document.getElementById('export-text');
  overlay.classList.remove('hidden');
  exTxt.textContent = 'Rendu haute résolution…';
  try {
    await new Promise(r => setTimeout(r, 120));

    const W = window.innerWidth, H = window.innerHeight;
    const EW = 1920, EH = 1080;
    const canvas = document.createElement('canvas');
    canvas.width = EW; canvas.height = EH;
    const ctx = canvas.getContext('2d');

    // Scale viewport → 1920×1080
    const sr = Math.min(EW / W, EH / H);
    const ox = (EW - W * sr) / 2;
    const oy = (EH - H * sr) / 2;
    const t  = d3.zoomTransform(document.getElementById('map-svg'));

    // 1. Background
    ctx.fillStyle = '#0a1628';
    ctx.fillRect(0, 0, EW, EH);
    const bg = ctx.createRadialGradient(EW/2, EH*0.4, 80, EW/2, EH*0.45, EH*0.8);
    bg.addColorStop(0, 'rgba(13,34,64,0)');
    bg.addColorStop(1, 'rgba(3,7,20,0.62)');
    ctx.fillStyle = bg; ctx.fillRect(0, 0, EW, EH);

    // 2. Map paths via D3 canvas renderer
    ctx.save();
    ctx.translate(ox, oy); ctx.scale(sr, sr);
    ctx.save();
    ctx.translate(t.x, t.y); ctx.scale(t.k, t.k);
    const cp = d3.geoPath().projection(projection).context(ctx);
    if (currentCountries) {
      // Undocumented first
      currentCountries.features.forEach(f => {
        const iso = ISO_NUM[String(f.id).padStart(3,'0')];
        if (iso && AF[iso]) return;
        ctx.beginPath(); cp(f);
        ctx.fillStyle = isAF(f.id) ? 'rgba(55,170,140,0.11)' : 'rgba(16,48,85,0.42)';
        ctx.fill();
        ctx.strokeStyle = 'rgba(60,140,180,0.13)';
        ctx.lineWidth = 0.35 / t.k; ctx.stroke();
      });
      // Documented African countries (bright)
      currentCountries.features.forEach(f => {
        const iso = ISO_NUM[String(f.id).padStart(3,'0')];
        if (!iso || !AF[iso]) return;
        const hex = getColor(iso);
        ctx.beginPath(); cp(f);
        ctx.fillStyle = h2r(hex, 0.84); ctx.fill();
        ctx.strokeStyle = 'rgba(255,255,255,0.38)';
        ctx.lineWidth = 0.8 / t.k; ctx.stroke();
        if (AF[iso].prod >= 100000) {
          ctx.strokeStyle = h2r(hex, 0.55);
          ctx.lineWidth = 3.0 / t.k; ctx.stroke();
        }
      });

      // Country name labels on export canvas
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.lineJoin = 'round';
      currentCountries.features.forEach(f => {
        const iso = ISO_NUM[String(f.id).padStart(3,'0')];
        if (!iso || !AF[iso]) return;
        const cen = geoPath.centroid(f);
        if (!cen || isNaN(cen[0]) || isNaN(cen[1])) return;
        const b = geoPath.bounds(f);
        if (!b) return;
        const area = Math.sqrt((b[1][0]-b[0][0]) * (b[1][1]-b[0][1]));
        if (area * t.k < 22) return; // same threshold as live map
        const label = SHORT[iso] || AF[iso].name;
        const fs    = Math.max(7, Math.min(13, area * 0.1)) / t.k;
        const sw    = 2.4 / t.k;
        ctx.font = `bold ${fs}px system-ui,sans-serif`;
        ctx.lineWidth   = sw;
        ctx.strokeStyle = 'rgba(0,0,0,0.65)';
        ctx.strokeText(label, cen[0], cen[1]);
        ctx.fillStyle = '#ffffff';
        ctx.fillText(label, cen[0], cen[1]);
      });
      ctx.textAlign    = 'left';
      ctx.textBaseline = 'alphabetic';
    }
    ctx.restore(); // undo zoom

    // 3. Overlays in screen-coordinate space (will be scaled by sr)
    // Title bar
    ctx.fillStyle = 'rgba(4,11,28,0.88)';
    rr(ctx, W/2-268, 18, 536, 62, 14); ctx.fill();
    ctx.strokeStyle = 'rgba(0,200,255,0.24)'; ctx.lineWidth = 1;
    rr(ctx, W/2-268, 18, 536, 62, 14); ctx.stroke();
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 26px system-ui,sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('Aquaculture en Afrique', W/2, 48);
    ctx.fillStyle = 'rgba(107,154,184,0.92)';
    ctx.font = '12.5px system-ui,sans-serif';
    ctx.fillText('Données FAO SOFIA 2026  ·  33 pays documentés  ·  Production 2024', W/2, 70);
    ctx.textAlign = 'left';

    // Legend
    expLegend(ctx, 22, H - 222);
    // Top 10 chart (shifted up to account for extra height)
    expChart(ctx, W - 250, H - 380);

    ctx.restore(); // undo sr + ox/oy

    // 4. Attribution bar (full export width)
    ctx.fillStyle = 'rgba(3,8,22,0.88)';
    ctx.fillRect(0, EH-32, EW, 32);
    ctx.fillStyle = 'rgba(0,200,255,0.17)';
    ctx.fillRect(0, EH-32, EW, 1);
    ctx.fillStyle = 'rgba(107,154,184,0.72)';
    ctx.font = '11.5px system-ui,sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(
      'Moustapha Farah & Marico  ·  2026  ·  Données FAO SOFIA 2026  ·  FishStat  ·  WorldFish',
      EW/2, EH-11
    );

    // 5. FAO badge
    ctx.textAlign = 'left';
    ctx.fillStyle = 'rgba(0,255,204,0.09)';
    rr(ctx, 18, 18, 134, 32, 7); ctx.fill();
    ctx.strokeStyle = 'rgba(0,255,204,0.30)'; ctx.lineWidth = 1;
    rr(ctx, 18, 18, 134, 32, 7); ctx.stroke();
    ctx.fillStyle = 'rgba(0,255,204,0.78)';
    ctx.font = 'bold 11px system-ui,sans-serif';
    ctx.fillText('FAO SOFIA 2026', 30, 38);

    // 6. Download
    exTxt.textContent = 'Téléchargement…';
    await new Promise(r => setTimeout(r, 140));
    const a = document.createElement('a');
    a.download = 'aquaculture-afrique-' + new Date().toISOString().slice(0,10) + '.png';
    a.href = canvas.toDataURL('image/png', 1.0);
    a.click();

  } catch(e) {
    console.error('Export error:', e);
    alert("Erreur lors de l'export. Veuillez réessayer.");
  } finally {
    overlay.classList.add('hidden');
  }
}

// ── Hex → rgba
function h2r(hex, a) {
  return `rgba(${parseInt(hex.slice(1,3),16)},${parseInt(hex.slice(3,5),16)},${parseInt(hex.slice(5,7),16)},${a})`;
}

// ── Rounded rect
function rr(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x+r, y);
  ctx.lineTo(x+w-r, y); ctx.quadraticCurveTo(x+w, y, x+w, y+r);
  ctx.lineTo(x+w, y+h-r); ctx.quadraticCurveTo(x+w, y+h, x+w-r, y+h);
  ctx.lineTo(x+r, y+h); ctx.quadraticCurveTo(x, y+h, x, y+h-r);
  ctx.lineTo(x, y+r); ctx.quadraticCurveTo(x, y, x+r, y);
  ctx.closePath();
}
function roundRect(c, x, y, w, h, r) { rr(c, x, y, w, h, r); }

// ── Legend panel on export canvas
function expLegend(ctx, x, y) {
  const items = [
    { c:'#00ffcc', l:'> 1 000 000 t',   tag:'Leader'        },
    { c:'#3dd6ff', l:'100 000 – 1 Mt',  tag:'Majeur'        },
    { c:'#f5c542', l:'10 000 – 100 kt', tag:'Émergent'      },
    { c:'#ff8c42', l:'1 000 – 10 kt',   tag:'Débutant'      },
    { c:'#ff4d6d', l:'< 1 000 t',        tag:'Embryonnaire'  },
  ];
  const pw = 202, ph = 34 + items.length * 26 + 20;
  ctx.fillStyle = 'rgba(5,13,34,0.92)';
  rr(ctx, x, y, pw, ph, 11); ctx.fill();
  ctx.strokeStyle = 'rgba(0,200,255,0.22)'; ctx.lineWidth = 1;
  rr(ctx, x, y, pw, ph, 11); ctx.stroke();
  ctx.fillStyle = '#3dd6ff';
  ctx.font = 'bold 9.5px system-ui,sans-serif';
  ctx.textAlign = 'left';
  ctx.fillText('PRODUCTION AQUACOLE 2024', x+13, y+18);
  items.forEach((it, i) => {
    const iy = y + 30 + i * 26;
    ctx.fillStyle = it.c; rr(ctx, x+13, iy+2, 12, 12, 3); ctx.fill();
    ctx.fillStyle = '#bdd6ea'; ctx.font = '10.5px system-ui,sans-serif';
    ctx.textAlign = 'left'; ctx.fillText(it.l, x+33, iy+12);
    ctx.fillStyle = 'rgba(100,180,210,0.55)';
    ctx.font = 'bold 9px system-ui,sans-serif';
    ctx.textAlign = 'right'; ctx.fillText(it.tag, x+pw-11, iy+12);
    ctx.textAlign = 'left';
  });
  ctx.fillStyle = 'rgba(107,154,184,0.5)';
  ctx.font = 'italic 8.5px system-ui,sans-serif';
  ctx.fillText('Source : FAO FishStat 2026 · SOFIA 2026', x+13, y+ph-7);
}

// ── Top 10 chart on export canvas
function expChart(ctx, x, y) {
  const top10 = sortedAF.slice(0, 10);
  const maxP = top10[0][1].prod;
  // Compact row spacing (30px) so Top 10 fits beautifully
  const pw = 238, ph = 34 + top10.length * 30 + 10;
  ctx.fillStyle = 'rgba(5,13,34,0.92)';
  rr(ctx, x, y, pw, ph, 11); ctx.fill();
  ctx.strokeStyle = 'rgba(0,200,255,0.22)'; ctx.lineWidth = 1;
  rr(ctx, x, y, pw, ph, 11); ctx.stroke();
  ctx.fillStyle = '#3dd6ff';
  ctx.font = 'bold 9.5px system-ui,sans-serif';
  ctx.textAlign = 'left';
  ctx.fillText('TOP 10 PRODUCTEURS AFRICAINS', x+13, y+19);
  top10.forEach(([iso, d], i) => {
    const col = getColor(iso);
    const iy  = y + 29 + i * 30;
    const bw  = (pw - 26) * (d.prod / maxP);
    ctx.fillStyle = '#e4f0fb'; ctx.font = 'bold 11px system-ui,sans-serif';
    ctx.textAlign = 'left'; ctx.fillText(d.name, x+13, iy+12);
    ctx.fillStyle = col; ctx.font = 'bold 10px "Courier New",monospace';
    ctx.textAlign = 'right'; ctx.fillText(fmtP(d.prod), x+pw-10, iy+12);
    ctx.textAlign = 'left';
    ctx.fillStyle = 'rgba(255,255,255,0.06)';
    rr(ctx, x+13, iy+17, pw-26, 6, 3); ctx.fill();
    if (bw > 3) {
      ctx.fillStyle = h2r(col, 0.88);
      rr(ctx, x+13, iy+17, bw, 6, 3); ctx.fill();
      ctx.fillStyle = 'rgba(255,255,255,0.28)';
      rr(ctx, x+13, iy+17, bw, 2, 1.5); ctx.fill();
    }
  });
}

// ═══════════════════════════════════════════════════
//  INIT
// ═══════════════════════════════════════════════════
window.addEventListener('load', () => { initMap(); });