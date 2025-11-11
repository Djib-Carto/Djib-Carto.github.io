// Chargement du fichier de configuration
fetch("config.json")
  .then(response => response.json())
  .then(config => initApp(config))
  .catch(err => {
      showError("Erreur lors du chargement de la configuration : " + err);
      // Assurer que le setup du panneau se fait même en cas d'erreur de config
      setupPanelInteraction(); 
  });

function showError(message) {
  const errorDiv = document.getElementById("error-message");
  errorDiv.textContent = message;
  errorDiv.style.display = "block";
  setTimeout(() => { errorDiv.style.display = "none"; }, 5000);
}

function initApp(config) {
  const map = initMap(config);
  
  // Configuration du fond de carte initial et du contrôle des couches
  const { baseLayers, defaultBaseLayer } = setupLayerSwitcher(map, config);

  // Configuration des outils dans le panneau
  if (config.tools.includes("geojson_upload")) setupGeoJSONUpload(map);
  
  // Outils Leaflet restants
  setupLocateControl(map);
  setupMiniMap(map, defaultBaseLayer);

  // Configuration de l'interaction du panneau
  setupPanelInteraction();
}

function initMap(config) {
  const map = L.map("map", {
    center: config.map.center,
    zoom: config.map.zoom,
    maxZoom: config.map.maxZoom,
    zoomControl: false 
  });

  // Ajouter un contrôle de zoom stylé en bas à droite
  L.control.zoom({ position: "bottomright" }).addTo(map);

  return map;
}

function setupLayerSwitcher(map, config) {
    // Fonds de carte
    const baseLayers = {};
    config.basemaps.forEach(b => {
      baseLayers[b.name] = L.tileLayer(b.url, {
        attribution: b.attribution,
        maxZoom: b.maxZoom
      });
    });
    
    // Base Layer par défaut
    const defaultBaseLayer = baseLayers[config.basemaps[0].name];
    defaultBaseLayer.addTo(map);
  
    // Contrôle des couches Leaflet
    const layerControl = L.control.layers(baseLayers, {}, { collapsed: false, autoZIndex: false });
    layerControl.addTo(map);
    
    // Déplace le contenu du contrôle de couche dans le panneau customisé
    const layersPanelDiv = document.getElementById("layers-panel");
    const leafletControlDiv = layerControl.getContainer();
    
    const radioList = leafletControlDiv.querySelector('.leaflet-control-layers-list');
    if (radioList) {
        layersPanelDiv.appendChild(radioList);
    }
    
    leafletControlDiv.remove();

    return { baseLayers, defaultBaseLayer };
}

function setupGeoJSONUpload(map) {
  const panel = document.getElementById("geojson-panel");
  
  const label = document.createElement("label");
  label.textContent = "Importer un fichier GeoJSON :";
  
  const input = document.createElement("input");
  input.type = "file";
  input.accept = ".geojson,.json";
  
  // Titre de section
  const sectionTitle = document.createElement("h4");
  sectionTitle.textContent = "Importation GeoJSON";
  panel.prepend(sectionTitle); 
  
  panel.appendChild(label);
  panel.appendChild(input);

  let geojsonLayer;

  input.addEventListener("change", event => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = e => {
      try {
        const data = JSON.parse(e.target.result);
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
        showError("Erreur : le fichier n’est pas un GeoJSON valide.");
      }
    };
    reader.readAsText(file);
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
    
    // NOUVEAU: Sélection des conteneurs de contrôle en position 'left' (où se trouve la carte miniature)
    const mapLeftControls = [
        document.querySelector('.leaflet-top.leaflet-left'),
        document.querySelector('.leaflet-bottom.leaflet-left')
    ].filter(el => el != null); // Filtrer les éléments nuls s'ils n'existent pas

    if (!sidePanel || !toggleBtn || !closeBtn) {
        console.error("Erreur: Éléments du panneau introuvables. Le panneau ne sera pas fonctionnel.");
        return;
    }

    toggleBtn.addEventListener('click', () => {
        sidePanel.classList.add('open');
        
        // Déplacer les contrôles de gauche pour qu'ils ne soient pas cachés par le panneau
        const newLeft = '365px'; // 350px (panneau) + 15px (marge)
        mapLeftControls.forEach(el => {
            el.style.left = newLeft;
        });
    });
    
    closeBtn.addEventListener('click', () => {
        sidePanel.classList.remove('open');
        
        // Ramener les contrôles à leur position par défaut (géré par le CSS à 15px)
        const defaultLeft = '15px'; 
        mapLeftControls.forEach(el => {
            el.style.left = defaultLeft;
        });
    });
    
    L.DomEvent.disableClickPropagation(sidePanel);
    L.DomEvent.disableScrollPropagation(sidePanel);
}