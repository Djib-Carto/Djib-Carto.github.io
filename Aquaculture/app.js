// ═══════════════════════════════════════════════
//  DATA
// ═══════════════════════════════════════════════
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
  RWA:{name:"Rwanda",flag:"🇷🇼",region:"Afrique de l'Est",prod:10200,growth:14.2,species:["Tilapia du Nil","Carpe"],note:"Plus forte croissance d'Afrique centrale/Est grâce aux cages lacustres.",src:"FAO FishStat 2026"},
  SDN:{name:"Soudan",flag:"🇸🇩",region:"Afrique de l'Est",prod:9800,growth:5.5,species:["Tilapia du Nil","Silure"],note:"Aquaculture fluviale le long du Nil Blanc et dans les retenues de barrages.",src:"FAO FishStat 2026"},
  CIV:{name:"Côte d'Ivoire",flag:"🇨🇮",region:"Afrique de l'Ouest",prod:9500,growth:9.2,species:["Tilapia","Silure"],note:"Production lagunaire en développement avec le programme national PONADEPA.",src:"FAO FishStat 2026"},
  ZWE:{name:"Zimbabwe",flag:"🇿🇼",region:"Afrique Australe",prod:8700,growth:7.2,species:["Tilapia du Nil"],note:"Aquaculture commerciale intensive de Tilapia concentrée sur le lac Kariba.",src:"World Bank / FAO 2023"},
  ZAF:{name:"Afrique du Sud",flag:"🇿🇦",region:"Afrique Australe",prod:5000,growth:4.5,species:["Ormeau Haliotis","Huîtres","Moules","Truite"],note:"Leader mondial de l'aquaculture d'ormeau en bassins terrestres fermés.",src:"DFFE / FAO FishStat 2026"},
  DZA:{name:"Algérie",flag:"🇩🇿",region:"Afrique du Nord",prod:5200,growth:6.2,species:["Carpe","Tilapia rouge","Daurade royale"],note:"Développement innovant de l'aquaculture en eaux sahariennes et oasiennes.",src:"FAO FishStat 2026"},
  SEN:{name:"Sénégal",flag:"🇸🇳",region:"Afrique de l'Ouest",prod:3800,growth:9.5,species:["Tilapia du Nil","Silure","Huîtres de mangrove"],note:"Stratégie nationale portée par l'ANA. Fort potentiel estuarien et côtier.",src:"USDA GAIN 2023 ; FAO FishStat 2026"},
  BEN:{name:"Bénin",flag:"🇧🇯",region:"Afrique de l'Ouest",prod:3100,growth:11.5,species:["Tilapia","Silure"],note:"Développement des enclos et cages sur les lacs Nokoué et Ahémé.",src:"FAO FishStat 2024"},
  MWI:{name:"Malawi",flag:"🇲🇼",region:"Afrique de l'Est",prod:9900,growth:8.5,species:["Tilapia Chambo","Carpe"],note:"Élevage de l'espèce endémique Chambo (Oreochromis karongae).",src:"FAO FishStat 2024"},
  ETH:{name:"Éthiopie",flag:"🇪🇹",region:"Afrique de l'Est",prod:1100,growth:6.5,species:["Tilapia du Nil"],note:"Aquaculture artisanale émergente dans les lacs de la vallée du Rift.",src:"FAO FishStat 2024"},
  CMR:{name:"Cameroun",flag:"🇨🇲",region:"Afrique Centrale",prod:2400,growth:8.8,species:["Silure africain","Tilapia","Carpe"],note:"Soutien gouvernemental pour réduire les importations massives de poissons gelés.",src:"FAO Country Profile 2024"},
  MOZ:{name:"Mozambique",flag:"🇲🇿",region:"Afrique Australe",prod:4800,growth:6.2,species:["Crevettes","Tilapia"],note:"Élevage de crevettes côtières et tilapia dans le lac Cahora Bassa.",src:"FAO FishStat 2024"},
  AGO:{name:"Angola",flag:"🇦🇴",region:"Afrique Australe",prod:4500,growth:7.0,species:["Tilapia","Silure"],note:"Secteur en reconstruction avec développement de stations pilotes publiques.",src:"FAO Country Profile 2024"},
  COD:{name:"RD Congo",flag:"🇨🇩",region:"Afrique Centrale",prod:3000,growth:5.5,species:["Tilapia","Silure"],note:"Immense réseau hydrographique propice, dominé par la pisciculture familiale.",src:"FAO FishStat 2024"},
  NAM:{name:"Namibie",flag:"🇳🇦",region:"Afrique Australe",prod:3200,growth:4.8,species:["Huîtres du Pacifique","Moules","Tilapia"],note:"Mariculture d'huîtres de haute qualité dans les eaux froides du courant de Benguela.",src:"FAO FishStat 2024"},
  TGO:{name:"Togo",flag:"🇹🇬",region:"Afrique de l'Ouest",prod:1500,growth:6.8,species:["Tilapia","Silure"],note:"Soutien à la pisciculture en étangs et promotion des cages lacustres.",src:"FAO/Tridge 2022"},
  SSD:{name:"Soudan du Sud",flag:"🇸🇸",region:"Afrique de l'Est",prod:1200,growth:4.0,species:["Tilapia","Silure"],note:"Aquaculture artisanale le long du bassin du Haut-Nil Blanc.",src:"FAO FishStat 2024"},
  GNB:{name:"Guinée-Bissau",flag:"🇬🇼",region:"Afrique de l'Ouest",prod:1100,growth:5.2,species:["Huîtres de mangrove"],note:"Collecte et culture pilote d'huîtres estuariennes.",src:"FAO FishStat 2024"},
  BFA:{name:"Burkina Faso",flag:"🇧🇫",region:"Afrique de l'Ouest",prod:900,growth:8.0,species:["Tilapia","Silure"],note:"Pisciculture associative d'eau douce dans les retenues collinaires.",src:"FAO Country Profile 2022"},
  MLI:{name:"Mali",flag:"🇲🇱",region:"Afrique de l'Ouest",prod:800,growth:4.5,species:["Tilapia","Silure"],note:"Projets d'aménagements piscicoles dans le delta central du fleuve Niger.",src:"FAO FishStat 2024"},
  GIN:{name:"Guinée",flag:"🇬🇳",region:"Afrique de l'Ouest",prod:700,growth:5.0,species:["Tilapia","Silure"],note:"Aquaculture en étangs en Guinée Forestière et mariculture pilote.",src:"FAO Country Profile 2021"},
  NER:{name:"Niger",flag:"🇳🇪",region:"Afrique de l'Ouest",prod:500,growth:3.5,species:["Tilapia"],note:"Élevage pilote en étangs argileux dans la vallée du fleuve Niger.",src:"FAO FishStat 2024"},
  TCD:{name:"Tchad",flag:"🇹🇩",region:"Afrique Centrale",prod:400,growth:3.0,species:["Tilapia","Silure"],note:"Secteur naissant visant à diversifier les revenus des pêcheurs du lac Tchad.",src:"FAO FishStat 2024"}
};
const CONTINENTS=[
  {name:"Asie",p24:130048023,p00:39031392,g:5.1,s:91.8,c:"#0095d5"},
  {name:"Am. Latine",p24:4458524,p00:872861,g:7.0,s:3.14,c:"#27ae60"},
  {name:"Europe",p24:3476974,p00:2056848,g:2.2,s:2.45,c:"#2471a3"},
  {name:"Afrique",p24:2732651,p00:452265,g:7.8,s:1.93,c:"#00ffcc"},
  {name:"Am. du Nord",p24:628165,p00:584495,g:0.3,s:0.44,c:"#f39c12"},
  {name:"Océanie",p24:251725,p00:138248,g:2.5,s:0.18,c:"#ca6f1e"}
];
const WORLD_TOP=[
  {rank:1,flag:"🇨🇳",name:"Chine",prod:"57,6 Mt",share:"56.1%",c:"#0095d5"},
  {rank:2,flag:"🇮🇳",name:"Inde",prod:"12,1 Mt",share:"11.8%",c:"#0095d5"},
  {rank:3,flag:"🇮🇩",name:"Indonésie",prod:"5,9 Mt",share:"5.7%",c:"#0095d5"},
  {rank:4,flag:"🇻🇳",name:"Vietnam",prod:"5,6 Mt",share:"5.5%",c:"#0095d5"},
  {rank:5,flag:"🇧🇩",name:"Bangladesh",prod:"3,0 Mt",share:"2.9%",c:"#0095d5"},
  {rank:6,flag:"🇳🇴",name:"Norvège",prod:"1,67 Mt",share:"1.6%",c:"#2471a3"},
  {rank:7,flag:"🇪🇬",name:"Égypte 🌍",prod:"1,60 Mt",share:"1.6%",c:"#00ffcc"},
  {rank:8,flag:"🇨🇱",name:"Chili",prod:"1,41 Mt",share:"1.4%",c:"#27ae60"},
  {rank:9,flag:"🇪🇨",name:"Équateur",prod:"1,24 Mt",share:"1.2%",c:"#27ae60"},
  {rank:10,flag:"🇲🇲",name:"Myanmar",prod:"1,21 Mt",share:"1.2%",c:"#0095d5"}
];
const ISO_NUM={
  "818":"EGY","566":"NGA","800":"UGA","288":"GHA","834":"TZA","894":"ZMB",
  "504":"MAR","646":"RWA","710":"ZAF","404":"KEN","788":"TUN","384":"CIV",
  "204":"BEN","454":"MWI","231":"ETH","120":"CMR","450":"MDG","686":"SEN",
  "508":"MOZ","024":"AGO","180":"COD","516":"NAM","768":"TGO","728":"SSD",
  "624":"GNB","854":"BFA","466":"MLI","324":"GIN","562":"NER","148":"TCD",
  "012":"DZA","716":"ZWE","729":"SDN"
};
const REAL_AF=new Set([12,24,72,86,108,120,132,140,148,174,178,180,204,231,232,262,266,270,288,
  324,334,384,404,426,430,434,450,454,466,478,504,508,516,562,566,624,646,678,
  686,694,706,710,716,724,728,729,732,740,768,788,800,818,834,854,894]);
function isAF(n){return REAL_AF.has(parseInt(n));}
function getColor(iso){
  const d=AF[iso];if(!d)return null;
  if(d.prod>=1000000)return"#00ffcc";
  if(d.prod>=100000)return"#00d4ff";
  if(d.prod>=10000)return"#ffc947";
  if(d.prod>=1000)return"#ff7b35";
  return"#ff3d6e";
}
function fmtP(p){
  if(p>=1e6)return(p/1e6).toFixed(2)+' Mt';
  if(p>=1000)return(p/1000).toFixed(0)+' kt';
  return p+' t';
}

// ── PARTICLES ──
(()=>{
  const c=document.getElementById('ptl'),x=c.getContext('2d');
  let w,h,dots=[];
  function init(){w=c.width=innerWidth;h=c.height=innerHeight;dots=Array.from({length:70},()=>({x:Math.random()*w,y:Math.random()*h,r:Math.random()*.9+.2,vx:(Math.random()-.5)*.18,vy:(Math.random()-.5)*.18,a:Math.random()*.3+.05}));}
  function draw(){x.clearRect(0,0,w,h);dots.forEach(d=>{d.x=(d.x+d.vx+w)%w;d.y=(d.y+d.vy+h)%h;x.beginPath();x.arc(d.x,d.y,d.r,0,Math.PI*2);x.fillStyle=`rgba(0,200,255,${d.a})`;x.fill();});requestAnimationFrame(draw);}
  window.addEventListener('resize',init);init();draw();
})();

// ── DYNAMIC DATA CALCULATIONS ──
let globalAFRegs = [];
let totalAfricaProdVal = 0;

const sortedAF = Object.entries(AF).sort((a,b) => b[1].prod - a[1].prod);
const totalAfricaProd = sortedAF.reduce((sum, [_, d]) => sum + d.prod, 0);
totalAfricaProdVal = totalAfricaProd;

sortedAF.forEach(([iso, d], index) => {
  d.rank = index + 1;
  d.share = (d.prod / totalAfricaProd) * 100;
});

const regionMap = {};
Object.entries(AF).forEach(([iso, d]) => {
  if (!regionMap[d.region]) {
    regionMap[d.region] = { prod: 0, countries: [] };
  }
  regionMap[d.region].prod += d.prod;
  regionMap[d.region].countries.push(d);
});

const regionColors = {
  "Afrique du Nord": "#00ffcc",
  "Afrique de l'Ouest": "#00d4ff",
  "Afrique de l'Est": "#ffc947",
  "Afrique Australe": "#ff7b35",
  "Afrique Centrale": "#ff3d6e"
};

const regionLabelsShort = {
  "Afrique du Nord": "Af. Nord",
  "Afrique de l'Ouest": "Af. Ouest",
  "Afrique de l'Est": "Af. Est",
  "Afrique Australe": "Af. Australe",
  "Afrique Centrale": "Centrale"
};

globalAFRegs = Object.entries(regionMap).map(([name, r]) => {
  const v = (r.prod / totalAfricaProd) * 100;
  r.countries.sort((a,b) => b.prod - a.prod);
  const note = r.countries.slice(0, 3).map(c => `${c.name} ${(c.prod/totalAfricaProd*100).toFixed(1)}%`).join(', ');
  return {
    name: name,
    short: regionLabelsShort[name] || name,
    v: parseFloat(v.toFixed(1)),
    c: regionColors[name] || "#ffffff",
    note: note
  };
}).sort((a,b) => b.v - a.v);

// ── SIDEBAR LIST ──
function buildList(){
  const list=document.getElementById('c-list');
  const sorted=Object.entries(AF).sort((a,b)=>b[1].prod-a[1].prod);
  const maxP=sorted[0][1].prod;
  sorted.forEach(([iso,d],i)=>{
    const cl=getColor(iso);const pct=d.prod/maxP*100;
    const el=document.createElement('div');el.className='c-item';el.dataset.iso=iso;
    el.innerHTML=`<div class="c-rank" style="background:${cl}18;color:${cl};">${i+1}</div><div class="c-info"><div class="c-name">${d.name}</div><div class="c-sub">${d.region}</div></div><div class="c-bw"><div class="c-bg"><div class="c-bf" style="width:${pct}%;background:${cl};"></div></div><div class="c-val">${fmtP(d.prod)}</div></div>`;
    el.addEventListener('click',()=>selCountry(iso));
    list.appendChild(el);
  });
}
buildList();

// ── COMPARISON ──
function buildCmp(){
  const maxP=Math.max(...CONTINENTS.map(c=>c.p24));
  const cbList=document.getElementById('cb-list');
  CONTINENTS.forEach(c=>{
    const pct=c.p24/maxP*100;const mult=((c.p24/c.p00)).toFixed(1);
    const el=document.createElement('div');el.className='cb-item';
    el.innerHTML=`<div class="cb-hdr"><span class="n">${c.name}</span><span class="vv">${(c.p24/1e6).toFixed(2)} Mt</span></div><div class="cb-track"><div class="cb-fill" style="width:${pct}%;background:${c.c};"></div></div><div class="cb-sub">+${c.g}%/an · Part mondiale: ${c.s}% · ×${mult} depuis 2000</div>`;
    cbList.appendChild(el);
  });
  const tbody=document.getElementById('top-body');
  WORLD_TOP.forEach(p=>{
    const sp=parseFloat(p.share)/36*100;
    const tr=document.createElement('tr');
    tr.innerHTML=`<td><span class="rb" style="background:${p.c}22;color:${p.c}">${p.rank}</span></td><td>${p.name}</td><td style="font-family:'Space Mono';color:#00ffcc;font-size:.63rem">${p.prod}</td><td style="color:var(--mut)">${p.share}</td><td style="width:40px"><div class="pb" style="width:${sp}%;background:${p.c}"></div></td>`;
    tbody.appendChild(tr);
  });
  const afEl=document.getElementById('af-regs');
  globalAFRegs.forEach(r=>{
    const el=document.createElement('div');el.className='cb-item';
    el.innerHTML=`<div class="cb-hdr"><span class="n">${r.name}</span><span class="vv">${r.v}%</span></div><div class="cb-track"><div class="cb-fill" style="width:${r.v}%;background:${r.c}"></div></div><div class="cb-sub">${r.note}</div>`;
    afEl.appendChild(el);
  });
}
buildCmp();

// ── BOTTOM CHARTS ──
function buildMiniBar(){
  const el=document.getElementById('mb-wrap');
  el.innerHTML = '';
  const data = [
    { name: "Poissons", val: 2405988, color: "var(--c1)", icon: `<i data-lucide="fish" style="width:10px;height:10px;stroke-width:2.2;"></i>` },
    { name: "Algues", val: 310587, color: "var(--gold)", icon: `<i data-lucide="leaf" style="width:10px;height:10px;stroke-width:2.2;"></i>` },
    { name: "Mollusques", val: 8108, color: "var(--pur)", icon: `<i data-lucide="shell" style="width:10px;height:10px;stroke-width:2.2;"></i>` },
    { name: "Crustacés", val: 7894, color: "var(--org)", icon: `<i data-lucide="shrimp" style="width:10px;height:10px;stroke-width:2.2;"></i>` }
  ];
  const maxP = data[0].val;
  data.forEach((d) => {
    // Square root scale to make smaller bars visible but proportional
    const pct = Math.max(Math.sqrt(d.val) / Math.sqrt(maxP) * 100, 4);
    const cl = d.color;
    
    let valStr = d.val >= 1000 ? (d.val/1000).toFixed(0) + ' kt' : d.val.toFixed(0) + ' t';
    if (d.val >= 1000000) valStr = (d.val/1000000).toFixed(2) + ' Mt';
    
    const div = document.createElement('div');
    div.className = 'sp-row';
    div.style.setProperty('--cl', cl);
    div.style.setProperty('--cl-t', cl + '15');
    
    div.innerHTML = `
      <div class="sp-icon-w" style="color:${cl};">${d.icon}</div>
      <div class="sp-name">${d.name}</div>
      <div class="sp-bar-w">
        <div class="sp-bar-fill" style="width:${pct}%;background:${cl};"></div>
      </div>
      <div class="sp-val">${valStr}</div>
    `;
    el.appendChild(div);
  });
  lucide.createIcons();
}
buildMiniBar();

function buildDonut(){
  const svg=document.getElementById('donut'),leg=document.getElementById('dl');
  const segs=globalAFRegs.map(r => ({ l: r.short, v: r.v, c: r.c }));
  const cx=39,cy=39,R=33,r=21;let ang=-Math.PI/2;
  const tot=segs.reduce((s,x)=>s+x.v,0);
  segs.forEach(seg=>{
    const th=seg.v/tot*2*Math.PI;
    const x1=cx+R*Math.cos(ang),y1=cy+R*Math.sin(ang);
    const x2=cx+R*Math.cos(ang+th),y2=cy+R*Math.sin(ang+th);
    const x3=cx+r*Math.cos(ang+th),y3=cy+r*Math.sin(ang+th);
    const x4=cx+r*Math.cos(ang),y4=cy+r*Math.sin(ang);
    const la=th>Math.PI?1:0;
    const p=document.createElementNS("http://www.w3.org/2000/svg","path");
    p.setAttribute("d",`M${x1},${y1} A${R},${R} 0 ${la},1 ${x2},${y2} L${x3},${y3} A${r},${r} 0 ${la},0 ${x4},${y4} Z`);
    p.setAttribute("fill",seg.c);p.setAttribute("opacity","0.9");p.setAttribute("stroke","#020b18");p.setAttribute("stroke-width","1");
    svg.appendChild(p);ang+=th;
    const li=document.createElement('div');li.className='dl-i';
    li.innerHTML=`<div class="dl-d" style="background:${seg.c}"></div><span>${seg.l} <b>${seg.v}%</b></span>`;
    leg.appendChild(li);
  });
  const tAfrica = (totalAfricaProdVal / 1e6).toFixed(2) + " Mt";
  [[tAfrica,"#00ffcc","7","37"],["Afrique","#5a8ba8","4.8","47"]].forEach(([t,c,fs,y])=>{
    const tx=document.createElementNS("http://www.w3.org/2000/svg","text");
    tx.setAttribute("x","39");tx.setAttribute("y",y);tx.setAttribute("text-anchor","middle");tx.setAttribute("fill",c);tx.setAttribute("font-size",fs);tx.setAttribute("font-family","Space Mono,monospace");tx.textContent=t;
    svg.appendChild(tx);
  });
}
buildDonut();

function buildTrend(){
  const el=document.getElementById('tr-wrap');
  const data=[{yr:"00",v:.45},{yr:"02",v:.53},{yr:"04",v:.64},{yr:"06",v:.81},{yr:"08",v:1.05},{yr:"10",v:1.39},{yr:"12",v:1.61},{yr:"14",v:1.83},{yr:"16",v:2.05},{yr:"18",v:2.26},{yr:"20",v:2.46},{yr:"22",v:2.53},{yr:"24",v:2.73}];
  const maxV=Math.max(...data.map(d=>d.v));
  data.forEach((d,i)=>{
    const pct=d.v/maxV*100;
    const last=i===data.length-1;
    const bar=document.createElement('div');bar.className='tr-b';
    bar.style.height=pct+'%';
    bar.style.background=`linear-gradient(to top,${last?'#00ffcc55':'#00d4ff22'},${last?'#00ffcc':'#00d4ff'})`;
    bar.style.opacity=.35+(i/data.length)*.65;
    bar.innerHTML=`<span class="tr-l">'${d.yr}</span><span class="tr-v">${d.v}</span>`;
    bar.title=`20${d.yr}: ${d.v} Mt`;
    el.appendChild(bar);
  });
}
buildTrend();

// ── COUNTRY SELECTION ──
let selectedISO=null;
function selCountry(iso){
  const d=AF[iso];if(!d)return;
  selectedISO=iso;
  document.querySelectorAll('.c-item').forEach(el=>el.classList.toggle('active',el.dataset.iso===iso));
  const cl=getColor(iso);
  document.getElementById('ic-name').innerHTML=`<span>${d.flag}</span> ${d.name}`;
  const v=document.getElementById('ic-prod');v.textContent=fmtP(d.prod);v.style.color=cl;
  document.getElementById('ic-growth').textContent='+'+d.growth+'%/an';
  document.getElementById('ic-rank').textContent='#'+d.rank;
  document.getElementById('ic-share').textContent=d.share.toFixed(2)+'%';
  document.getElementById('ic-species').innerHTML=d.species.map(s=>`<span class="tag">${s}</span>`).join('');
  document.getElementById('ic-note').textContent=d.note+' · '+d.src;
  // Highlight on map
  d3.selectAll('.cp')
    .attr('fill',dd=>{
      const num=dd.id,i=ISO_NUM[String(num).padStart(3,'0')];
      if(i===iso)return cl;
      if(i&&AF[i])return getColor(i)+'bb';
      if(isAF(num))return'rgba(0,120,90,0.1)';
      return'rgba(12,38,70,0.32)';
    })
    .classed('sel',dd=>ISO_NUM[String(dd.id).padStart(3,'0')]===iso);
}

// ── COMPARISON PANEL ──
let cmpOpen=false;
function toggleCmp(){
  cmpOpen=!cmpOpen;
  document.getElementById('cmp').classList.toggle('open',cmpOpen);
  document.getElementById('tab-cmp').classList.toggle('active',cmpOpen);
  if(cmpOpen && srcOpen) toggleSrc();
}

let srcOpen=false;
function toggleSrc(){
  srcOpen=!srcOpen;
  document.getElementById('src-panel').classList.toggle('open',srcOpen);
  document.getElementById('tab-src').classList.toggle('active',srcOpen);
  if(srcOpen && cmpOpen) toggleCmp();
}

// ── MAP ──
let view='monde',projection,geoPath,zoom;

function initMap(){
  const svg=d3.select('#map-svg');
  const rect=document.getElementById('map-svg').getBoundingClientRect();
  const W=rect.width||900,H=rect.height||380;
  projection=d3.geoNaturalEarth1().scale(W/6.2).translate([W/2,H/2]);
  geoPath=d3.geoPath().projection(projection);
  zoom=d3.zoom().scaleExtent([.5,20]).on('zoom',e=>{
    d3.select('#map-g').attr('transform',e.transform);
    d3.select('#labels-g').attr('transform',e.transform);
    d3.selectAll('.pill-g').attr('transform', function() {
      const dx = this.getAttribute('data-dx');
      const dy = this.getAttribute('data-dy');
      return `translate(${dx}, ${dy}) scale(${1 / e.transform.k})`;
    });
    d3.selectAll('.pill-line')
      .attr('stroke-width', 0.6 / e.transform.k)
      .attr('stroke-dasharray', `${1.4 / e.transform.k} ${1.4 / e.transform.k}`);
  });
  svg.call(zoom);
  document.getElementById('zi').onclick=()=>svg.transition().duration(320).call(zoom.scaleBy,1.55);
  document.getElementById('zo').onclick=()=>svg.transition().duration(320).call(zoom.scaleBy,.65);
  document.getElementById('zr').onclick=()=>{if(view==='afrique')focusAfrica();else svg.transition().duration(600).call(zoom.transform,d3.zoomIdentity);};
  fetch('https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json')
    .then(r=>r.json())
    .then(world=>{
      const countries=topojson.feature(world,world.objects.countries);
      drawMap(svg,countries);
    })
    .catch(()=>d3.select('#map-g').append('text').attr('x','50%').attr('y','50%').attr('fill','#5a8ba8').attr('text-anchor','middle').attr('font-size','13').attr('font-family','Outfit').text('Connexion requise pour charger la carte.'));
}

function drawMap(svg,countries){
  const g=d3.select('#map-g');

  g.selectAll('.cp').data(countries.features).enter().append('path')
    .attr('class',d=>{
      const num=d.id,iso=ISO_NUM[String(num).padStart(3,'0')];
      let cls='cp';
      if(isAF(num))cls+=' af-q';
      return cls;
    })
    .attr('d',geoPath)
    .attr('fill',d=>{
      const num=d.id,iso=ISO_NUM[String(num).padStart(3,'0')];
      if(iso&&AF[iso])return getColor(iso)+'bb';
      if(isAF(num))return'rgba(0,120,90,0.1)';
      return'rgba(12,38,70,0.32)';
    })
    .attr('filter',d=>{const iso=ISO_NUM[String(d.id).padStart(3,'0')];return(iso&&AF[iso])?'url(#glow)':null;})
    .on('mousemove',(ev,d)=>showTT(ev,d))
    .on('mouseleave',()=>hideTT())
    .on('click',(ev,d)=>{const iso=ISO_NUM[String(d.id).padStart(3,'0')];if(iso&&AF[iso])selCountry(iso);});

  drawLabels(countries);
}

// Custom offsets to spread labels for readability (only shown in Africa view)
const LABEL_CFG={
  EGY:{dx:0,dy:0},MAR:{dx:0,dy:0},TUN:{dx:0,dy:-20},
  SEN:{dx:-30,dy:-6},CIV:{dx:-26,dy:20},GHA:{dx:2,dy:28},
  NGA:{dx:26,dy:-22},CMR:{dx:28,dy:12},UGA:{dx:-30,dy:-22},
  RWA:{dx:-32,dy:8},KEN:{dx:30,dy:-8},TZA:{dx:26,dy:22},
  ZMB:{dx:-26,dy:14},ZAF:{dx:0,dy:0},MDG:{dx:32,dy:14},
  ETH:{dx:0,dy:0},MOZ:{dx:28,dy:10},MWI:{dx:30,dy:-6},
  DZA:{dx:0,dy:10},ZWE:{dx:-20,dy:-18},SDN:{dx:-15,dy:15}
};

const SHOW_ISO=['EGY','NGA','UGA','GHA','TZA','ZMB','MAR','RWA','ZAF','KEN','TUN','CIV','SEN','CMR','MDG','ETH','MOZ','MWI','DZA','ZWE','SDN'];

function drawLabels(countries){
  const labG=d3.select('#labels-g');
  labG.html('');
  if(view!=='afrique')return; // Only show labels in Africa mode

  countries.features.forEach(f=>{
    const num=String(f.id).padStart(3,'0'),iso=ISO_NUM[num];
    if(!iso||!AF[iso]||!SHOW_ISO.includes(iso))return;
    const c=geoPath.centroid(f);
    if(!c||isNaN(c[0])||isNaN(c[1]))return;
    const d=AF[iso];
    const col=getColor(iso);
    const cfg=LABEL_CFG[iso]||{dx:0,dy:0};

    const grp=labG.append('g').attr('transform',`translate(${c[0]},${c[1]})`);

    const svgNode = d3.select('#map-svg').node();
    const currentK = d3.zoomTransform(svgNode).k || 1;

    if(cfg.dx!==0||cfg.dy!==0){
      grp.append('line')
        .attr('class','pill-line')
        .attr('x1',0).attr('y1',0).attr('x2',cfg.dx).attr('y2',cfg.dy)
        .attr('stroke',col).attr('stroke-width',1.2 / currentK)
        .attr('stroke-dasharray',`${3.2 / currentK} ${3.2 / currentK}`).attr('opacity',.75);
    }

    const pill=grp.append('g')
      .attr('class','pill-g')
      .attr('data-dx',cfg.dx).attr('data-dy',cfg.dy)
      .attr('transform',`translate(${cfg.dx},${cfg.dy}) scale(${1 / currentK})`)
      .style('cursor','pointer').attr('pointer-events','all')
      .on('click',()=>selCountry(iso));

    // Production value string
    const prodStr=fmtP(d.prod);
    const nameStr=d.name.length>8?d.name.substring(0,8)+'…':d.name;
    const W2=Math.max(prodStr.length*6.8+nameStr.length*7.8+15,85);
    const H2=28;

    // Background
    pill.append('rect')
      .attr('x',-W2/2).attr('y',-H2/2).attr('width',W2).attr('height',H2)
      .attr('rx',6).attr('ry',6)
      .attr('fill','rgba(2,8,20,0.92)')
      .attr('stroke',col).attr('stroke-width',1.2).attr('stroke-opacity',.85);

    // Country name (top line)
    pill.append('text')
      .attr('x',0).attr('y',-4.2)
      .attr('text-anchor','middle').attr('dominant-baseline','middle')
      .attr('font-size','10.5').attr('font-family','Outfit,sans-serif').attr('font-weight','700')
      .attr('fill','#ffffff').text(nameStr);

    // Production value (bottom line, colored)
    pill.append('text')
      .attr('x',0).attr('y',7.8)
      .attr('text-anchor','middle').attr('dominant-baseline','middle')
      .attr('font-size','9.5').attr('font-family','Space Mono,monospace').attr('font-weight','700')
      .attr('fill',col).text(prodStr);
  });
}

// ── TOOLTIP ──
function showTT(ev,d){
  const tt=document.getElementById('tt');
  const num=String(d.id).padStart(3,'0'),iso=ISO_NUM[num];
  const data=iso?AF[iso]:null;
  if(data){
    document.getElementById('tt-marker').style.color=getColor(iso);
    document.getElementById('tt-nm').textContent=data.name;
    document.getElementById('tt-rg').textContent=data.region;
    const p=document.getElementById('tt-prod');p.textContent=fmtP(data.prod);p.style.color=getColor(iso);
    document.getElementById('tt-gr').textContent='+'+data.growth+'%/an';
    document.getElementById('tt-sh').textContent=data.share.toFixed(2)+'%';
    document.getElementById('tt-rk').textContent='#'+data.rank;
    const bi=document.getElementById('tt-bi');
    bi.style.width=Math.min(data.share,100)+'%';
    bi.style.background=`linear-gradient(to right,${getColor(iso)},${getColor(iso)}55)`;
    document.getElementById('tt-tags').innerHTML=data.species.map(s=>`<span class="tt-tag">${s}</span>`).join('');
    document.getElementById('tt-spl').style.display='block';
    document.getElementById('tt-tags').style.display='flex';
  }else{
    document.getElementById('tt-marker').style.color='var(--mut)';
    document.getElementById('tt-nm').textContent=isAF(d.id)?'Pays africain (non documenté)':'Pays';
    document.getElementById('tt-rg').textContent=isAF(d.id)?'Afrique':'Monde';
    document.getElementById('tt-prod').textContent='—';
    document.getElementById('tt-prod').style.color='var(--mut)';
    document.getElementById('tt-gr').textContent='—';
    document.getElementById('tt-sh').textContent='—';
    document.getElementById('tt-rk').textContent='—';
    document.getElementById('tt-bi').style.width='0%';
    document.getElementById('tt-spl').style.display='none';
    document.getElementById('tt-tags').style.display='none';
  }
  tt.classList.add('show');
  const x=ev.clientX,y=ev.clientY;
  let l=x+16,t=y+16;
  if(l+220>innerWidth)l=x-220-16;
  if(t+230>innerHeight)t=y-230-16;
  tt.style.left=l+'px';tt.style.top=t+'px';
}
function hideTT(){document.getElementById('tt').classList.remove('show');}

// ── VIEW TABS ──
let _countries=null;
function setTab(v){
  view=v;
  document.getElementById('tab-monde').classList.toggle('active',v==='monde');
  document.getElementById('tab-afrique').classList.toggle('active',v==='afrique');
  document.getElementById('view-badge').classList.toggle('show',v==='afrique');
  document.getElementById('tb-hint').style.display=v==='afrique'?'none':'';
  if(_countries){drawLabels(_countries);}
  if(v==='afrique')focusAfrica();else resetView();
}
function focusAfrica(){
  const svg=d3.select('#map-svg');
  const rect=document.getElementById('map-svg').getBoundingClientRect();
  const W=rect.width,H=rect.height;
  if(!projection)return;
  const p1=projection([-22,38]),p2=projection([56,-37]);
  if(!p1||!p2)return;
  const scale=Math.min(W/(p2[0]-p1[0]),H/(p2[1]-p1[1]))*.78;
  const tx=W/2-scale*(p1[0]+p2[0])/2,ty=H/2-scale*(p1[1]+p2[1])/2;
  d3.select('#map-svg').transition().duration(800).call(zoom.transform,d3.zoomIdentity.translate(tx,ty).scale(scale));
}
function resetView(){
  d3.select('#map-svg').transition().duration(700).call(zoom.transform,d3.zoomIdentity);
}

window.addEventListener('load',()=>setTimeout(()=>{
  initMap();
  lucide.createIcons();
  // Patch: after map loads, store countries ref for redrawing labels
  fetch('https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json')
    .then(r=>r.json()).then(world=>{_countries=topojson.feature(world,world.objects.countries);});
},80));
window.addEventListener('resize',()=>{
  const r=document.getElementById('map-svg').getBoundingClientRect();
  d3.select('#map-svg rect').attr('width',r.width).attr('height',r.height);
});