/**
 * CORALGUARD - Logique de l'application
 * Auteurs: Projet CoralGuard
 * Source de données: NOAA Coral Reef Watch REST API
 */

document.addEventListener('DOMContentLoaded', () => {
    // -------------------------------------------------------------------------
    // INITIALISATION DES VARIABLES ET CONFIGURATION
    // -------------------------------------------------------------------------
    
    // REST API endpoints
    const STATIONS_URL = 'https://services9.arcgis.com/RHVPKKiFTONKtxq3/arcgis/rest/services/Coral_Reef_Stations/FeatureServer/0/query?where=1%3D1&outFields=*&returnGeometry=true&f=geojson';
    const AREAS_URL = 'https://services9.arcgis.com/RHVPKKiFTONKtxq3/arcgis/rest/services/Coral_Reef_Stations/FeatureServer/1/query?where=1%3D1&outFields=*&returnGeometry=true&f=geojson';
    const NOAA_BASE_URL = 'https://coralreefwatch.noaa.gov/product/vs/';

    // Données globales
    let stationsGeoJSON = null;
    let areasGeoJSON = null;
    
    // Index pour la synchronisation
    const markersMap = new Map();  // Nom de station -> Instance de marker Leaflet
    const polygonsMap = new Map(); // Nom de station -> Instance de polygone Leaflet

    // Groupes de couches Leaflet
    let markersLayerGroup = L.layerGroup();
    let polygonsLayerGroup = L.layerGroup();
    
    // Station actuellement sélectionnée
    let selectedStationName = null;

    // -------------------------------------------------------------------------
    // INITIALISATION DE LA CARTE LEAFLET
    // -------------------------------------------------------------------------
    
    const map = L.map('map', {
        zoomControl: false, // On désactive pour repositionner plus tard
        minZoom: 2,
        maxZoom: 10,
        worldCopyJump: true
    }).setView([5, 0], 2.5);

    // Repositionnement du contrôle de zoom en haut à droite
    L.control.zoom({
        position: 'topright'
    }).addTo(map);

    // Fond de carte sombre de CartoDB (Dark Matter) - sans clé API, parfait pour notre thème
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 20
    }).addTo(map);

    // Création de fenêtres (panes) personnalisées pour gérer le z-index
    map.createPane('polygonsPane');
    map.getPane('polygonsPane').style.zIndex = 350; // Sous les marqueurs

    map.createPane('markersPane');
    map.getPane('markersPane').style.zIndex = 450; // Au-dessus des polygones

    // Ajout des groupes de couches à la carte
    polygonsLayerGroup.addTo(map);
    markersLayerGroup.addTo(map);

    // -------------------------------------------------------------------------
    // UTILS : COULEURS ET TRADUCTIONS DES ALERTES
    // -------------------------------------------------------------------------

    const ALERT_DETAILS = {
        0: {
            color: '#00F5FF', // Cyan
            label: 'Pas de stress',
            desc: 'Aucun stress thermique détecté. Les récifs sont dans des conditions optimales de température.',
            class: 'alert-0-glow',
            bannerClass: 'banner-0'
        },
        1: {
            color: '#FFEA00', // Jaune
            label: 'Surveillance',
            desc: 'Températures légèrement supérieures à la normale. Vigilance requise, un blanchissement est possible si le réchauffement persiste.',
            class: 'alert-1-glow',
            bannerClass: 'banner-1'
        },
        2: {
            color: '#FF9100', // Orange
            label: 'Avertissement',
            desc: 'Stress thermique modéré accumulé. Risque de blanchissement naissant sur les espèces les plus sensibles.',
            class: 'alert-2-glow',
            bannerClass: 'banner-2'
        },
        3: {
            color: '#FF3B30', // Rouge
            label: 'Alerte Niveau 1',
            desc: 'Stress thermique élevé. Un blanchissement significatif des coraux est attendu dans les semaines à venir.',
            class: 'alert-3-glow',
            bannerClass: 'banner-3'
        },
        4: {
            color: '#E040FB', // Magenta
            label: 'Alerte Niveau 2',
            desc: 'Stress thermique extrême. Blanchissement sévère généralisé et mortalité corallienne importante attendus.',
            class: 'alert-4-glow',
            bannerClass: 'banner-4'
        }
    };

    function getAlertConfig(level) {
        // En cas de nouveaux niveaux NOAA (Ex: niveau 3, 4 ou 5 récents), on sature à Alerte Niveau 2 (4)
        const safeLevel = Math.max(0, Math.min(parseInt(level) || 0, 4));
        return ALERT_DETAILS[safeLevel];
    }

    // -------------------------------------------------------------------------
    // RÉCUPÉRATION DES DONNÉES (FETCH API)
    // -------------------------------------------------------------------------

    async function loadData() {
        showLoadingState(true);
        try {
            // Chargement parallèle des points et polygones
            const [stationsResponse, areasResponse] = await Promise.all([
                fetch(STATIONS_URL),
                fetch(AREAS_URL)
            ]);

            if (!stationsResponse.ok || !areasResponse.ok) {
                throw new Error("Erreur lors de la récupération des données ArcGIS.");
            }

            stationsGeoJSON = await stationsResponse.ok ? await stationsResponse.json() : null;
            areasGeoJSON = await areasResponse.ok ? await areasResponse.json() : null;

            if (stationsGeoJSON) {
                processStats(stationsGeoJSON.features);
                renderMapLayers();
                setupAutocomplete(stationsGeoJSON.features);
                updateUpdateDate(stationsGeoJSON.features);
            }
        } catch (error) {
            console.error("Erreur de chargement :", error);
            alert("Impossible de charger les données NOAA en temps réel. Veuillez réessayer ultérieurement.");
        } finally {
            showLoadingState(false);
        }
    }

    // Indicateur visuel du chargement
    function showLoadingState(isLoading) {
        const countKPI = document.getElementById('kpi-stations-count');
        if (isLoading) {
            countKPI.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i>';
        }
    }

    // Mise à jour de la date de rafraîchissement
    function updateUpdateDate(features) {
        if (features.length > 0 && features[0].properties.date) {
            const dateStr = features[0].properties.date;
            try {
                // Évite le décalage de fuseau horaire en découpant la date YYYY-MM-DD
                const parts = dateStr.split('-');
                const year = parts[0];
                const monthIndex = parseInt(parts[1], 10) - 1;
                const day = parseInt(parts[2], 10);
                
                const months = [
                    'janvier', 'février', 'mars', 'avril', 'mai', 'juin', 
                    'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'
                ];
                
                const formattedDate = `${day} ${months[monthIndex]} ${year}`;
                document.getElementById('update-date').innerText = `Données NOAA du : ${formattedDate}`;
            } catch (e) {
                document.getElementById('update-date').innerText = `Date : ${dateStr}`;
            }
        }
    }

    // -------------------------------------------------------------------------
    // CALCUL DES STATISTIQUES GLOBAL (KPIs)
    // -------------------------------------------------------------------------

    function processStats(features) {
        const total = features.length;
        let atRiskCount = 0;
        let maxSSTA = -Infinity;
        let maxDHW = -Infinity;
        
        // Distribution des alertes (0 à 4)
        const distribution = { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0 };

        features.forEach(f => {
            const props = f.properties;
            
            // Alertes de niveau 3 (Alerte 1) et 4 (Alerte 2)
            const alert = parseInt(props.alert) || 0;
            if (alert >= 3) {
                atRiskCount++;
            }

            // Calcul distribution
            const safeAlert = Math.max(0, Math.min(alert, 4));
            distribution[safeAlert]++;

            // Calcul anomalie max
            const ssta = parseFloat(props.ssta);
            if (!isNaN(ssta) && ssta > maxSSTA) {
                maxSSTA = ssta;
            }

            // Calcul DHW max
            const dhw = parseFloat(props.dhw);
            if (!isNaN(dhw) && dhw > maxDHW) {
                maxDHW = dhw;
            }
        });

        // Calcul du pourcentage de stations en danger
        const percentRisk = total > 0 ? Math.round((atRiskCount / total) * 100) : 0;

        // Injection dans l'interface
        document.getElementById('kpi-stations-count').innerText = total;
        document.getElementById('kpi-stations-risk').innerText = `${atRiskCount} (${percentRisk}%)`;
        document.getElementById('kpi-max-ssta').innerText = `+${maxSSTA.toFixed(2)}`;
        document.getElementById('kpi-max-dhw').innerText = maxDHW.toFixed(1);

        // Remplir le tableau des points chauds critiques
        populateLeaderboard(features);
        
        // Remplir le graphique de répartition des alertes
        populateDistribution(distribution, total);
    }

    // Remplissage dynamique du tableau des risques globaux (Leaderboard DHW)
    function populateLeaderboard(features) {
        const container = document.getElementById('risk-leaderboard');
        if (!container) return;
        container.innerHTML = '';

        // Filtrer et trier par DHW descendant, puis prendre les 5 premiers
        const topStations = [...features]
            .map(f => ({
                name: f.properties.name,
                dhw: parseFloat(f.properties.dhw) || 0,
                alert: parseInt(f.properties.alert) || 0,
                ssta: parseFloat(f.properties.ssta) || 0
            }))
            .filter(s => s.dhw > 0)
            .sort((a, b) => b.dhw - a.dhw)
            .slice(0, 5);

        if (topStations.length === 0) {
            container.innerHTML = '<div class="leaderboard-item text-muted" style="justify-content: center; font-size: 0.8rem; padding: 1rem;">Aucun stress critique détecté</div>';
            return;
        }

        topStations.forEach((station, index) => {
            const config = getAlertConfig(station.alert);
            const item = document.createElement('div');
            item.className = 'leaderboard-item';
            item.innerHTML = `
                <div class="leader-rank">${index + 1}</div>
                <div class="leader-info">
                    <span class="leader-name">${station.name}</span>
                    <span class="leader-meta">Anomalie : +${station.ssta.toFixed(2)}°C</span>
                </div>
                <div class="leader-badge" style="background: ${config.color}15; color: ${config.color}; border: 1px solid ${config.color}30; box-shadow: 0 0 8px ${config.color}10">
                    ${station.dhw.toFixed(1)} DHW
                </div>
            `;
            
            item.addEventListener('click', () => {
                selectStation(station.name, true);
            });
            
            container.appendChild(item);
        });
    }

    // Remplissage dynamique de la barre de répartition des alertes
    function populateDistribution(dist, total) {
        const barContainer = document.getElementById('dist-bar');
        const legendContainer = document.getElementById('dist-legend');
        if (!barContainer || !legendContainer) return;
        
        barContainer.innerHTML = '';
        legendContainer.innerHTML = '';

        Object.keys(dist).forEach(level => {
            const count = dist[level];
            const percentage = total > 0 ? ((count / total) * 100) : 0;
            const config = getAlertConfig(level);

            if (count > 0) {
                // Créer le segment de barre empilée
                const segment = document.createElement('div');
                segment.className = 'dist-segment';
                segment.style.width = `${percentage}%`;
                segment.style.backgroundColor = config.color;
                segment.style.boxShadow = `0 0 10px ${config.color}80`;
                segment.title = `${config.label}: ${count} stations (${percentage.toFixed(0)}%)`;
                
                // Filtrer la carte en cliquant sur le segment
                segment.addEventListener('click', () => {
                    document.getElementById('filter-alert').value = level;
                    applyFilters(level);
                });

                barContainer.appendChild(segment);
            }

            // Créer l'élément de légende interactif
            const legendItem = document.createElement('div');
            legendItem.className = 'dist-legend-item';
            legendItem.style.cursor = 'pointer';
            legendItem.innerHTML = `
                <span class="dist-legend-dot" style="background-color: ${config.color}; box-shadow: 0 0 5px ${config.color}"></span>
                <span class="dist-legend-name">${config.label}</span>
                <span class="dist-legend-val">${count} <span style="font-size: 0.65rem; color: var(--text-secondary); font-weight: normal;">(${percentage.toFixed(0)}%)</span></span>
            `;
            
            legendItem.addEventListener('click', () => {
                const currentFilter = document.getElementById('filter-alert').value;
                const newFilter = currentFilter === String(level) ? 'all' : String(level);
                document.getElementById('filter-alert').value = newFilter;
                applyFilters(newFilter);
            });
            
            legendContainer.appendChild(legendItem);
        });
    }

    // -------------------------------------------------------------------------
    // RENDU DES COUCHES SUR LA CARTE
    // -------------------------------------------------------------------------

    function renderMapLayers() {
        // Vider les couches existantes
        polygonsLayerGroup.clearLayers();
        markersLayerGroup.clearLayers();
        markersMap.clear();
        polygonsMap.clear();

        // 1. Ajouter d'abord les Polygones de Zone d'alerte (si disponibles)
        if (areasGeoJSON && areasGeoJSON.features) {
            L.geoJSON(areasGeoJSON, {
                pane: 'polygonsPane',
                style: function (feature) {
                    const alertVal = feature.properties.alert !== undefined ? feature.properties.alert : 0;
                    const config = getAlertConfig(alertVal);
                    return {
                        fillColor: config.color,
                        fillOpacity: 0.1,
                        color: config.color,
                        weight: 1,
                        opacity: 0.4
                    };
                },
                onEachFeature: function (feature, layer) {
                    const name = feature.properties.name;
                    if (name) {
                        polygonsMap.set(name, layer);
                        
                        // Interactions au survol
                        layer.on({
                            mouseover: (e) => highlightStation(name, false),
                            mouseout: (e) => resetHighlight(name),
                            click: (e) => selectStation(name, true)
                        });
                    }
                }
            }).addTo(polygonsLayerGroup);
        }

        // 2. Ajouter les Marqueurs de Station (Points)
        if (stationsGeoJSON && stationsGeoJSON.features) {
            L.geoJSON(stationsGeoJSON, {
                pane: 'markersPane',
                pointToLayer: function (feature, latlng) {
                    const alertVal = feature.properties.alert !== undefined ? feature.properties.alert : 0;
                    const config = getAlertConfig(alertVal);
                    
                    // Création de l'icône HTML personnalisée et pulsante
                    const isHighStress = alertVal >= 3;
                    const markerHtml = `
                        <div class="custom-coral-marker" style="color: ${config.color}">
                            <div class="marker-dot" style="background-color: ${config.color}; box-shadow: 0 0 10px ${config.color}"></div>
                            ${isHighStress ? `<div class="marker-pulse" style="border-color: ${config.color}"></div>` : ''}
                        </div>
                    `;

                    const customIcon = L.divIcon({
                        className: 'leaflet-div-icon-reset',
                        html: markerHtml,
                        iconSize: [16, 16],
                        iconAnchor: [8, 8]
                    });

                    return L.marker(latlng, { icon: customIcon });
                },
                onEachFeature: function (feature, layer) {
                    const props = feature.properties;
                    const name = props.name;
                    
                    if (name) {
                        markersMap.set(name, layer);

                        // Remplacer le popup par un Tooltip au survol pour éviter la superposition avec le panneau latéral
                        const alertVal = props.alert !== undefined ? props.alert : 0;
                        const config = getAlertConfig(alertVal);
                        
                        layer.bindTooltip(`<strong>${name}</strong><br><span style="color: ${config.color}; font-weight: 600;">${config.label}</span>`, {
                            direction: 'top',
                            offset: L.point(0, -6),
                            className: 'custom-tooltip'
                        });

                        // Interactions
                        layer.on({
                            mouseover: (e) => highlightStation(name, false),
                            mouseout: (e) => resetHighlight(name),
                            click: (e) => selectStation(name, true) // Clic centre la carte et ouvre le panneau
                        });
                    }
                }
            }).addTo(markersLayerGroup);
        }
    }

    // -------------------------------------------------------------------------
    // SYNCHRONISATION ET INTERACTIONS DE SELECTION
    // -------------------------------------------------------------------------

    // Mettre en évidence une station (au survol)
    function highlightStation(name, zoomTo = false) {
        // Mettre en valeur le polygone
        const poly = polygonsMap.get(name);
        if (poly) {
            poly.setStyle({
                fillOpacity: 0.35,
                weight: 2.5,
                opacity: 0.8
            });
            poly.bringToFront();
        }

        // Mettre en valeur le marqueur (grossir le point en JS via CSS)
        const marker = markersMap.get(name);
        if (marker) {
            const el = marker.getElement();
            if (el) {
                const dot = el.querySelector('.marker-dot');
                if (dot) {
                    dot.style.transform = 'scale(1.4)';
                    dot.style.borderColor = '#ffffff';
                }
            }
        }
    }

    // Réinitialiser le style de survol
    function resetHighlight(name) {
        // Ne pas réinitialiser si c'est la station actuellement sélectionnée
        if (name === selectedStationName) return;

        const poly = polygonsMap.get(name);
        if (poly) {
            const alertVal = poly.feature.properties.alert !== undefined ? poly.feature.properties.alert : 0;
            const config = getAlertConfig(alertVal);
            poly.setStyle({
                fillColor: config.color,
                fillOpacity: 0.1,
                color: config.color,
                weight: 1,
                opacity: 0.4
            });
        }

        const marker = markersMap.get(name);
        if (marker) {
            const el = marker.getElement();
            if (el) {
                const dot = el.querySelector('.marker-dot');
                if (dot) {
                    dot.style.transform = 'none';
                    dot.style.borderColor = 'rgba(255, 255, 255, 0.8)';
                }
            }
        }
    }

    // Sélectionner une station (Clic / Recherche)
    function selectStation(name, flyTo = true) {
        // Nettoyer la sélection précédente
        if (selectedStationName && selectedStationName !== name) {
            const prevName = selectedStationName;
            selectedStationName = null;
            resetHighlight(prevName);
        }

        selectedStationName = name;
        highlightStation(name);

        const marker = markersMap.get(name);
        if (!marker) return;

        const props = marker.feature.properties;
        const latlng = marker.getLatLng();

        // Centrer la carte
        if (flyTo) {
            map.flyTo(latlng, 6, {
                animate: true,
                duration: 1.5
            });
        }

        // Remplir le panneau de détails
        updateDetailPanel(props, latlng);
    }

    // Remplissage dynamique du volet de détails de la station
    function updateDetailPanel(props, latlng) {
        const welcome = document.getElementById('detail-welcome');
        const content = document.getElementById('detail-content');
        const panel = document.getElementById('detail-panel');

        welcome.classList.add('hidden');
        content.classList.remove('hidden');
        panel.classList.remove('closed');

        // Textes principaux
        document.getElementById('detail-name').innerText = props.name;
        document.getElementById('detail-lat-lon').innerText = `${latlng.lat.toFixed(3)}°N, ${latlng.lng.toFixed(3)}°E`;

        // Alerte Config
        const alertVal = props.alert !== undefined ? props.alert : 0;
        const config = getAlertConfig(alertVal);

        // Mise à jour de la jauge circulaire
        const arc = document.getElementById('gauge-arc');
        const levelNum = document.getElementById('gauge-level-num');
        
        // Nettoyer les classes de lueur précédentes sur la jauge
        arc.className.baseVal = "gauge-progress";
        arc.classList.add(config.class);

        // Calcul du dashoffset (0 = pas de stress, 4 = max)
        const circumference = 251.2; // 2 * pi * 40
        const fillPercentage = alertVal === 0 ? 0.05 : (alertVal / 4); // 5% minimum pour visibilité
        const offset = circumference - (circumference * fillPercentage);
        
        arc.style.strokeDashoffset = offset;
        levelNum.innerText = alertVal;
        levelNum.style.color = config.color;

        // Bannière d'alerte
        const banner = document.getElementById('detail-alert-banner');
        banner.className = `alert-banner ${config.bannerClass}`;
        document.getElementById('detail-alert-text').innerText = config.label.toUpperCase();

        // Métriques
        const sst = parseFloat(props.sst);
        const ssta = parseFloat(props.ssta);
        const hs = parseFloat(props.hs);
        const dhw = parseFloat(props.dhw);

        document.getElementById('metric-sst').innerText = isNaN(sst) ? '-' : sst.toFixed(1);
        document.getElementById('metric-ssta').innerText = isNaN(ssta) ? '-' : (ssta > 0 ? `+${ssta.toFixed(2)}` : ssta.toFixed(2));
        document.getElementById('metric-hs').innerText = isNaN(hs) ? '-' : hs.toFixed(2);
        document.getElementById('metric-dhw').innerText = isNaN(dhw) ? '-' : dhw.toFixed(1);

        // Explications dynamiques
        document.getElementById('alert-explanation').innerText = config.desc;

        // Liens externes NOAA
        const pageBtn = document.getElementById('link-noaa-page');
        const detailsBtn = document.getElementById('link-noaa-details');

        if (props.ts_fig) {
            pageBtn.href = `${NOAA_BASE_URL}timeseries/${props.ts_fig}`;
            pageBtn.style.display = 'flex';
        } else {
            pageBtn.style.display = 'none';
        }

        if (props.gauge_page) {
            detailsBtn.href = `${NOAA_BASE_URL}gauges/${props.gauge_page}`;
            detailsBtn.style.display = 'flex';
        } else {
            detailsBtn.style.display = 'none';
        }
    }

    // Rendre la fonction de sélection accessible depuis le onclick du popup HTML
    window.triggerStationSelect = function(name) {
        selectStation(name, false);
    };

    // Fermeture du volet de détails
    document.getElementById('close-detail').addEventListener('click', () => {
        document.getElementById('detail-panel').classList.add('closed');
        if (selectedStationName) {
            const prev = selectedStationName;
            selectedStationName = null;
            resetHighlight(prev);
        }
        map.closePopup();
    });

    // -------------------------------------------------------------------------
    // SYSTEME DE FILTRES ET ZONES REGIONALES
    // -------------------------------------------------------------------------

    // Changement de filtre d'alerte
    document.getElementById('filter-alert').addEventListener('change', (e) => {
        const filterVal = e.target.value;
        applyFilters(filterVal);
    });

    function applyFilters(filterVal) {
        if (!stationsGeoJSON) return;

        // Fermer le panneau de détail en changeant de filtre
        document.getElementById('detail-panel').classList.add('closed');
        selectedStationName = null;
        map.closePopup();

        markersLayerGroup.clearLayers();
        polygonsLayerGroup.clearLayers();

        // Filtrer les stations et réafficher
        const filteredStations = {
            type: "FeatureCollection",
            features: stationsGeoJSON.features.filter(f => {
                if (filterVal === 'all') return true;
                return parseInt(f.properties.alert) === parseInt(filterVal);
            })
        };

        const filteredAreas = areasGeoJSON ? {
            type: "FeatureCollection",
            features: areasGeoJSON.features.filter(f => {
                if (filterVal === 'all') return true;
                return parseInt(f.properties.alert) === parseInt(filterVal);
            })
        } : null;

        // Reconstruction des couches
        // Polygones
        if (filteredAreas) {
            L.geoJSON(filteredAreas, {
                pane: 'polygonsPane',
                style: function (feature) {
                    const alertVal = feature.properties.alert !== undefined ? feature.properties.alert : 0;
                    const config = getAlertConfig(alertVal);
                    return {
                        fillColor: config.color,
                        fillOpacity: 0.1,
                        color: config.color,
                        weight: 1,
                        opacity: 0.4
                    };
                },
                onEachFeature: function (feature, layer) {
                    const name = feature.properties.name;
                    if (name) {
                        polygonsMap.set(name, layer);
                        layer.on({
                            mouseover: (e) => highlightStation(name, false),
                            mouseout: (e) => resetHighlight(name),
                            click: (e) => selectStation(name, true)
                        });
                    }
                }
            }).addTo(polygonsLayerGroup);
        }

        // Marqueurs
        L.geoJSON(filteredStations, {
            pane: 'markersPane',
            pointToLayer: function (feature, latlng) {
                const alertVal = feature.properties.alert !== undefined ? feature.properties.alert : 0;
                const config = getAlertConfig(alertVal);
                const isHighStress = alertVal >= 3;
                
                const markerHtml = `
                    <div class="custom-coral-marker" style="color: ${config.color}">
                        <div class="marker-dot" style="background-color: ${config.color}; box-shadow: 0 0 10px ${config.color}"></div>
                        ${isHighStress ? `<div class="marker-pulse" style="border-color: ${config.color}"></div>` : ''}
                    </div>
                `;

                const customIcon = L.divIcon({
                    className: 'leaflet-div-icon-reset',
                    html: markerHtml,
                    iconSize: [16, 16],
                    iconAnchor: [8, 8]
                });

                return L.marker(latlng, { icon: customIcon });
            },
            onEachFeature: function (feature, layer) {
                const props = feature.properties;
                const name = props.name;
                
                if (name) {
                    markersMap.set(name, layer);
                    
                    const alertVal = props.alert !== undefined ? props.alert : 0;
                    const config = getAlertConfig(alertVal);
                    
                    layer.bindTooltip(`<strong>${name}</strong><br><span style="color: ${config.color}; font-weight: 600;">${config.label}</span>`, {
                        direction: 'top',
                        offset: L.point(0, -6),
                        className: 'custom-tooltip'
                    });

                    layer.on({
                        mouseover: (e) => highlightStation(name, false),
                        mouseout: (e) => resetHighlight(name),
                        click: (e) => selectStation(name, true)
                    });
                }
            }
        }).addTo(markersLayerGroup);

        // Recalculer les suggestions d'autocomplétion basées sur le filtre actif
        setupAutocomplete(filteredStations.features);
    }

    // Gestionnaires de boutons de zoom régionaux
    const regionButtons = document.querySelectorAll('.region-btn');
    regionButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            // Retirer l'état actif de tous les boutons
            regionButtons.forEach(b => b.classList.remove('active'));
            
            const targetBtn = e.currentTarget;
            targetBtn.classList.add('active');

            const lat = parseFloat(targetBtn.dataset.lat);
            const lon = parseFloat(targetBtn.dataset.lon);
            const zoom = parseInt(targetBtn.dataset.zoom);

            map.flyTo([lat, lon], zoom, {
                animate: true,
                duration: 1.8
            });
        });
    });

    // -------------------------------------------------------------------------
    // SYSTEME D'AUTOCOMPLÉTION POUR LA RECHERCHE
    // -------------------------------------------------------------------------

    const searchInput = document.getElementById('station-search');
    const clearSearchBtn = document.getElementById('clear-search');
    const suggestionsBox = document.getElementById('search-suggestions');

    function setupAutocomplete(features) {
        searchInput.addEventListener('input', () => {
            const query = searchInput.value.toLowerCase().trim();
            suggestionsBox.innerHTML = '';

            if (query.length === 0) {
                clearSearchBtn.classList.add('hidden-btn');
                clearSearchBtn.style.display = 'none';
                suggestionsBox.classList.add('hidden');
                return;
            }

            clearSearchBtn.classList.remove('hidden-btn');
            clearSearchBtn.style.display = 'block';

            // Filtrer les correspondances (maximum 5 suggestions)
            const matches = features
                .filter(f => f.properties.name.toLowerCase().includes(query))
                .slice(0, 5);

            if (matches.length === 0) {
                suggestionsBox.innerHTML = '<div class="search-suggestion-item text-muted">Aucun résultat</div>';
                suggestionsBox.classList.remove('hidden');
                return;
            }

            matches.forEach(match => {
                const props = match.properties;
                const config = getAlertConfig(props.alert);
                
                const item = document.createElement('div');
                item.className = 'search-suggestion-item';
                item.innerHTML = `
                    <span>${props.name}</span>
                    <span class="item-alert-dot" style="background-color: ${config.color}; box-shadow: 0 0 6px ${config.color}"></span>
                `;
                
                item.addEventListener('click', () => {
                    searchInput.value = props.name;
                    suggestionsBox.classList.add('hidden');
                    selectStation(props.name, true);
                });

                suggestionsBox.appendChild(item);
            });

            suggestionsBox.classList.remove('hidden');
        });

        // Bouton de nettoyage de recherche
        clearSearchBtn.addEventListener('click', () => {
            searchInput.value = '';
            clearSearchBtn.style.display = 'none';
            suggestionsBox.classList.add('hidden');
            
            // Fermer le panneau de détail
            document.getElementById('detail-panel').classList.add('closed');
            if (selectedStationName) {
                const prev = selectedStationName;
                selectedStationName = null;
                resetHighlight(prev);
            }
            map.closePopup();
        });

        // Fermer les suggestions si on clique ailleurs sur la page
        document.addEventListener('click', (e) => {
            if (!searchInput.contains(e.target) && !suggestionsBox.contains(e.target)) {
                suggestionsBox.classList.add('hidden');
            }
        });
    }

    // -------------------------------------------------------------------------
    // DÉMARRAGE DE L'APPLICATION
    // -------------------------------------------------------------------------
    loadData();
});
