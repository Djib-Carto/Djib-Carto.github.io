// Chargement du fichier de configuration
fetch("config.json")
  .then(response => response.json())
  .then(config => initApp(config)) 
  .catch(err => {
      showError("Erreur lors du chargement de la configuration : " + err);
      setupPanelInteraction(); // S'assure que le panneau est interactif même si la config échoue
  });

function showError(message) {
  const errorDiv = document.getElementById("error-message");
  errorDiv.textContent = message;
  errorDiv.style.display = "block";
  setTimeout(() => { errorDiv.style.display = "none"; }, 5000);
}

// --- Fonctions d'Initialisation ---

function initApp(config) {
  // 1. Initialiser la carte et les fonds de carte
  const { map, defaultBaseLayer } = initMapAndBaseLayers(config);
  
  // 2. Initialiser le sélecteur de couches dans le panneau
  setupLayerSwitcher(map, config);

  // 3. Initialiser les outils
  if (config.tools.includes("geojson_upload")) setupGeoJSONUpload(map);
  setupLocateControl(map);
  setupMiniMap(map, defaultBaseLayer);
  setupScaleControl(map); 

  // 4. Initialiser l'interaction du panneau (boutons ouvrir/fermer)
  setupPanelInteraction();
}

function initMapAndBaseLayers(config) {
  const map = L.map("map", {
    center: config.map.center,
    zoom: config.map.zoom,
    maxZoom: config.map.maxZoom,
    zoomControl: false 
  });

  // Ajouter un contrôle de zoom stylé en bas à droite
  L.control.zoom({ position: "bottomright" }).addTo(map);

  // Définir le fond de carte par défaut et le stocker
  const defaultBaseMapConfig = config.basemaps[0];
  let defaultBaseLayer = L.tileLayer(defaultBaseMapConfig.url, {
      attribution: defaultBaseMapConfig.attribution,
      maxZoom: defaultBaseMapConfig.maxZoom
  }).addTo(map);

  return { map, defaultBaseLayer };
}

function setupLayerSwitcher(map, config) {
    // Préparer l'objet des fonds de carte pour le contrôle Leaflet
    const baseLayers = {};
    config.basemaps.forEach(b => {
      baseLayers[b.name] = L.tileLayer(b.url, {
        attribution: b.attribution,
        maxZoom: b.maxZoom
      });
    });
  
    // Contrôle des couches Leaflet
    const layerControl = L.control.layers(baseLayers, {}, { collapsed: false, autoZIndex: false });
    layerControl.addTo(map);
    
    // Déplace le contenu du contrôle de couche dans le panneau customisé
    const layersPanelDiv = document.getElementById("layers-panel");
    const leafletControlDiv = layerControl.getContainer();
    
    // IMPORTANT : On déplace la liste des radios buttons du Leaflet Control
    const radioList = leafletControlDiv.querySelector('.leaflet-control-layers-list');
    if (radioList) {
        layersPanelDiv.appendChild(radioList);
    }
    
    // Supprimer l'élément de contrôle Leaflet vide de la carte
    leafletControlDiv.remove();

    return baseLayers;
}

// --- Contrôle d'Échelle (Centrage géré par CSS) ---
function setupScaleControl(map) {
    L.control.scale({
        // Position par défaut. La règle CSS va la positionner au centre et la décaler si le panneau est ouvert.
        position: 'bottomleft', 
        metric: true,           
        imperial: false         
    }).addTo(map);
}

// --- Outils ---

let geojsonLayer;
function loadAndDisplayGeoJSON(map, data) {
    try {
        if (geojsonLayer) map.removeLayer(geojsonLayer);

        geojsonLayer = L.geoJSON(data, {
            style: feature => ({
                color: "#ff6347", 
                weight: 3,
                fillOpacity: 0.6
            }),
            onEachFeature: (feature, layer) => {
                if (feature.properties) {
                    const props = Object.entries(feature.properties)
                        .map(([k, v]) => `<b>${k}</b>: ${v}`)
                        .join("<br>");
                    layer.bindPopup(props);
                }
            }
        }).addTo(map);

        map.fitBounds(geojsonLayer.getBounds(), { padding: [50, 50] });
        showError("Fichier GeoJSON chargé avec succès !");

    } catch (err) {
        showError("Erreur : les données ne sont pas un GeoJSON valide.");
    }
}

function setupGeoJSONUpload(map) {
  const panel = document.getElementById("geojson-panel");
  
  const sectionTitle = document.createElement("h4");
  sectionTitle.textContent = "Importation GeoJSON";
  panel.prepend(sectionTitle); 

  // --- 1. Importation par Fichier Local ---

  const fileLabel = document.createElement("label");
  fileLabel.textContent = "1. Importer par Fichier Local (.geojson/.json) :";
  fileLabel.style.marginTop = "10px";

  const fileInput = document.createElement("input");
  fileInput.type = "file";
  fileInput.accept = ".geojson,.json";
  fileInput.style.marginBottom = "10px";

  const fileLoadButton = document.createElement("button");
  fileLoadButton.textContent = "Charger le fichier sur la carte";
  fileLoadButton.id = "load-geojson-file-btn";
  fileLoadButton.disabled = true;
  fileLoadButton.className = "geojson-btn";

  panel.appendChild(fileLabel);
  panel.appendChild(fileInput);
  panel.appendChild(fileLoadButton);
  
  const separator = document.createElement("hr");
  separator.style.cssText = "border: none; border-top: 1px solid #eee; margin: 20px 0;";
  panel.appendChild(separator);


  // --- 2. Importation par URL ---

  const urlLabel = document.createElement("label");
  urlLabel.textContent = "2. Importer par URL distante :";
  urlLabel.style.marginTop = "10px";

  const urlInput = document.createElement("input");
  urlInput.type = "text";
  urlInput.placeholder = "Ex: https://exemple.com/data.geojson";
  urlInput.id = "geojson-url-input";
  urlInput.style.cssText = "width: 100%; padding: 8px; margin-top: 5px; margin-bottom: 10px; border: 1px solid #ddd; border-radius: 4px;";


  const urlLoadButton = document.createElement("button");
  urlLoadButton.textContent = "Charger l'URL sur la carte";
  urlLoadButton.id = "load-geojson-url-btn";
  urlLoadButton.className = "geojson-btn";


  panel.appendChild(urlLabel);
  panel.appendChild(urlInput);
  panel.appendChild(urlLoadButton);


  // --- Logique du Fichier Local ---
  let selectedFile = null;

  fileInput.addEventListener("change", event => {
    selectedFile = event.target.files[0];
    fileLoadButton.disabled = !selectedFile;
    fileLoadButton.textContent = selectedFile ? `Charger ${selectedFile.name.substring(0, 20)}... sur la carte` : "Charger le fichier sur la carte";
  });

  fileLoadButton.addEventListener("click", () => {
    if (!selectedFile) return showError("Veuillez d'abord sélectionner un fichier.");

    const reader = new FileReader();
    reader.onload = e => {
      try {
        const data = JSON.parse(e.target.result);
        loadAndDisplayGeoJSON(map, data);
      } catch (err) {
        showError("Erreur : le fichier local n'est pas un JSON/GeoJSON valide.");
      }
    };
    reader.readAsText(selectedFile);
  });
  
  // --- Logique de l'URL Distante ---
  urlLoadButton.addEventListener("click", () => {
      const url = urlInput.value.trim();
      if (!url) return showError("Veuillez entrer une URL GeoJSON valide.");
      
      urlLoadButton.textContent = "Chargement en cours...";
      urlLoadButton.disabled = true;

      fetch(url)
          .then(response => {
              if (!response.ok) {
                  throw new Error(`Erreur HTTP: ${response.status}`);
              }
              return response.json();
          })
          .then(data => {
              loadAndDisplayGeoJSON(map, data);
              urlLoadButton.textContent = "Charger l'URL sur la carte";
              urlLoadButton.disabled = false;
          })
          .catch(error => {
              showError(`Erreur lors du chargement de l'URL : ${error.message}. Assurez-vous que l'URL est accessible et que le fichier est valide.`);
              urlLoadButton.textContent = "Charger l'URL sur la carte";
              urlLoadButton.disabled = false;
          });
  });
}

function setupLocateControl(map) {
  L.control.locate({
    position: "topright",
    setView: "always",
    flyTo: true,
    showCompass: true,
    strings: {
        title: "Montrer ma position",
        popup: "Vous êtes ici !"
    },
    drawCircle: true,
    initialZoomLevel: 14
  }).addTo(map);
}

function setupMiniMap(map, baseLayer) {
    const miniMapLayer = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
        attribution: 'MiniMap',
        maxZoom: 19
    });

    const miniMap = new L.Control.MiniMap(miniMapLayer, { 
        toggleDisplay: true,
        position: 'bottomleft',
        collapsedWidth: 19,
        collapsedHeight: 19,
        width: 150,
        height: 150
    }).addTo(map);
}

function setupPanelInteraction() {
    const sidePanel = document.getElementById("side-panel");
    const toggleBtn = document.getElementById("toggle-panel-btn");
    const closeBtn = document.getElementById("close-panel-btn");
    
    // Sélection des conteneurs de contrôle en position 'left' (à décaler)
    // Ceci inclut la MiniMap.
    const mapLeftControls = [
        document.querySelector('.leaflet-top.leaflet-left'),
        document.querySelector('.leaflet-bottom.leaflet-left')
    ].filter(el => el != null);

    if (!sidePanel || !toggleBtn || !closeBtn) {
        console.error("Erreur: Éléments du panneau introuvables. Le panneau ne sera pas fonctionnel.");
        return;
    }

    toggleBtn.addEventListener('click', () => {
        sidePanel.classList.add('open');
        
        // Décaler les contrôles de gauche (y compris la carte miniature)
        const newLeft = '365px'; // 350px (largeur du panneau) + 15px (marge)
        mapLeftControls.forEach(el => {
            el.style.left = newLeft;
        });
    });
    
    closeBtn.addEventListener('click', () => {
        sidePanel.classList.remove('open');
        
        // Ramener les contrôles à leur position par défaut
        const defaultLeft = '15px'; 
        mapLeftControls.forEach(el => {
            el.style.left = defaultLeft;
        });
    });
    
    L.DomEvent.disableClickPropagation(sidePanel);
    L.DomEvent.disableScrollPropagation(sidePanel);
}